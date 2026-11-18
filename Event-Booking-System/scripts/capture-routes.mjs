import { mkdir, writeFile } from 'node:fs/promises'
import { spawn } from 'node:child_process'
import { resolve } from 'node:path'
import process from 'node:process'
import { chromium } from 'playwright'

const port = Number(process.env.CAPTURE_PORT || 4173)
const baseUrl = process.env.CAPTURE_BASE_URL || `http://127.0.0.1:${port}`
const outputDirectory = resolve(process.env.CAPTURE_OUTPUT || 'browser-captures')
const viewports = [
  { name: 'desktop', width: 1440, height: 1200 },
  { name: 'mobile', width: 390, height: 844 },
]

// Matches the concrete routes currently declared in src/main.js.
const routes = [
  '/', '/register', '/login', '/profile', '/forgot-password', '/logout',
  '/event/event-details1', '/events',
  '/events/evt-001', '/events/evt-002', '/events/evt-003',
  '/events/evt-004', '/events/evt-005', '/events/evt-006',
  '/vip', '/about', '/contact', '/AdminEventList', '/AdminUserBookings',
  '/AdminSubscriptions', '/this-route-does-not-exist',
]

const filenameForRoute = (route) => route === '/'
  ? 'home'
  : route.replace(/^\//, '').replace(/[^a-zA-Z0-9]+/g, '-').replace(/^-|-$/g, '').toLowerCase()

const waitForServer = async (url, timeoutMs = 30_000) => {
  const startedAt = Date.now()
  while (Date.now() - startedAt < timeoutMs) {
    try {
      if ((await fetch(url)).ok) return
    } catch {
      // Vite is still starting.
    }
    await new Promise((resolvePromise) => setTimeout(resolvePromise, 250))
  }
  throw new Error(`Timed out waiting for Vite at ${url}`)
}

const npmCommand = process.platform === 'win32' ? 'npm.cmd' : 'npm'
const server = process.env.CAPTURE_BASE_URL
  ? null
  : spawn(npmCommand, ['run', 'dev', '--', '--host', '127.0.0.1', '--port', String(port)], {
      stdio: 'inherit',
      shell: process.platform === 'win32',
    })

const stopServer = () => {
  if (server && !server.killed) server.kill()
}
process.on('SIGINT', () => { stopServer(); process.exit(130) })
process.on('SIGTERM', () => { stopServer(); process.exit(143) })

try {
  await mkdir(outputDirectory, { recursive: true })
  await waitForServer(baseUrl)
  const browser = await chromium.launch()
  const capturedAt = new Date().toISOString()
  const captures = []

  for (const viewport of viewports) {
    const context = await browser.newContext({
      viewport: { width: viewport.width, height: viewport.height },
      deviceScaleFactor: 1,
    })
    const page = await context.newPage()
    for (const route of routes) {
      const url = new URL(route, baseUrl).toString()
      await page.goto(url, { waitUntil: 'networkidle' })
      const file = `${filenameForRoute(route)}-${viewport.name}.png`
      await page.screenshot({ path: resolve(outputDirectory, file), fullPage: true })
      captures.push({ route, viewport: viewport.name, url, file, title: await page.title(), capturedAt })
    }
    await context.close()
  }

  await writeFile(resolve(outputDirectory, 'manifest.json'), `${JSON.stringify({
    baseUrl, viewports, captures,
  }, null, 2)}\n`)
  await browser.close()
  console.log(`Captured ${routes.length} routes in ${outputDirectory}`)
} catch (error) {
  console.error(error instanceof Error ? error.message : error)
  process.exitCode = 1
} finally {
  stopServer()
}
