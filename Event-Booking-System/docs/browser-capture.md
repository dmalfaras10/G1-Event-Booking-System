# Browser captures for Figma import

This pipeline uses Playwright and Chromium to capture the Vue app after it has rendered in a real browser. It is separate from the Figma plugin and does not modify application source or plugin files.

## Setup and run

From `Event-Booking-System/`:

```bash
npm install
npm run capture:install
npm run capture:routes
```

The script starts Vite on `http://127.0.0.1:4173`, opens every route currently declared in `src/main.js` in fresh browser contexts, waits for network idle, and writes full-page PNGs plus `manifest.json` to `browser-captures/`. It captures both **1440 × 1200 desktop** and **390 × 844 mobile** CSS-pixel viewports, with device scale factor 1.

To capture from an already-running app instead of starting Vite:

```powershell
$env:CAPTURE_BASE_URL = "http://127.0.0.1:5173"
npm run capture:routes
```

`CAPTURE_PORT` changes the temporary Vite port. `CAPTURE_OUTPUT` changes the output directory.

## Routes captured

The current list includes home, authentication/account pages, the standalone event-details page, event listings, all six `evt-001` through `evt-006` detail routes, VIP, about, contact, the three admin pages, and a not-found route. The route list is intentionally explicit so each image has a stable filename and manifest entry.

## Figma import

Use the PNGs as visual references or place them on Figma frames for tracing. Each route has `-desktop.png` and `-mobile.png` variants; `manifest.json` maps each route and viewport to its image. These are raster screenshots of real rendered output, not editable Figma layers and not native Figma objects.

## Limitations

- A Chromium browser download and local Node/Vite environment are required.
- Captures use local mock data and a fresh context; no login or authenticated state is supplied.
- Only the configured desktop viewport is captured. Modals, hover/focus states, form submissions, and other interactive states are not exercised.
- Animations, external resources, fonts, and machine/browser differences may cause visual variation.
- The route list must be updated manually when `src/main.js` adds or removes routes.
