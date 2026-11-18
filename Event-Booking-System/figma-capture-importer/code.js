figma.showUI(__html__, { width: 420, height: 300, title: 'Import G1 website captures' });

let page;
let x = 0;
let y = 0;
let rowHeight = 0;
let imported = 0;

figma.ui.onmessage = async (message) => {
  if (message.type === 'import-start') {
    page = figma.createPage();
    page.name = 'G1 Website Captures';
    x = 0; y = 0; rowHeight = 0; imported = 0;
    figma.ui.postMessage({ type: 'ready-for-file' });
    return;
  }
  if (message.type === 'import-complete') {
    figma.currentPage = page;
    figma.viewport.scrollAndZoomIntoView(page.children);
    figma.notify(`Imported ${imported} website captures`);
    figma.closePlugin();
    return;
  }
  if (message.type !== 'import-file') return;
  try {
    const gap = 80;
    const bytes = new Uint8Array(message.file.bytes);
    const image = figma.createImage(bytes);
    const size = await image.getSizeAsync();
    const frame = figma.createFrame();
    frame.name = message.file.name.replace(/\.png$/i, '');
    frame.resize(size.width, size.height);
    frame.fills = [{ type: 'IMAGE', imageHash: image.hash, scaleMode: 'FILL' }];
    page.appendChild(frame);
    frame.x = x; frame.y = y;
    x += size.width + gap;
    rowHeight = Math.max(rowHeight, size.height);
    if (x > 5000) { x = 0; y += rowHeight + gap; rowHeight = 0; }
    imported += 1;
    figma.ui.postMessage({ type: 'file-accepted' });
  } catch (error) {
    figma.notify(`Import failed: ${error.message || error}`, { error: true });
  }
};
