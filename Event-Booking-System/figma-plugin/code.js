// Native Figma document generator for the current G1 Event Booking UI.
// Run from Figma Desktop: Plugins > Development > Import plugin from manifest.

const C = {
  bg: { r: 0.043, g: 0.043, b: 0.047 },
  surface: { r: 0.078, g: 0.078, b: 0.086 },
  surface2: { r: 0.11, g: 0.11, b: 0.122 },
  gold: { r: 0.953, g: 0.776, b: 0.31 },
  goldHover: { r: 0.878, g: 0.698, b: 0.227 },
  magenta: { r: 0.62, g: 0.11, b: 0.306 },
  text: { r: 0.957, g: 0.957, b: 0.961 },
  muted: { r: 0.612, g: 0.639, b: 0.686 },
  border: { r: 0.25, g: 0.25, b: 0.27 },
};

const paint = (color, opacity = 1) => ({ type: 'SOLID', color, opacity });
const solid = (node, color) => { node.fills = [paint(color)]; };

let regularFont = { family: 'Inter', style: 'Regular' };
let boldFont = { family: 'Inter', style: 'Bold' };
async function loadFonts() {
  try {
    await figma.loadFontAsync(regularFont);
    await figma.loadFontAsync(boldFont);
  } catch (error) {
    // Inter is normally bundled with Figma. If a local setup does not expose it,
    // fall back to Arial so the generator still produces a native document.
    regularFont = { family: 'Arial', style: 'Regular' };
    boldFont = { family: 'Arial', style: 'Bold' };
    await figma.loadFontAsync(regularFont);
    await figma.loadFontAsync(boldFont);
  }
}

function rect(parent, x, y, w, h, color, radius = 0, name = 'Rectangle') {
  const n = figma.createRectangle(); n.name = name; n.x = x; n.y = y; n.resize(w, h); solid(n, color);
  if (radius) n.cornerRadius = radius; parent.appendChild(n); return n;
}
function text(parent, value, x, y, size, color = C.text, isBold = false, name = 'Text') {
  const n = figma.createText(); n.name = name; n.fontName = isBold ? boldFont : regularFont;
  n.fontSize = size; n.characters = value; n.fills = [paint(color)]; n.x = x; n.y = y; parent.appendChild(n); return n;
}
function frame(name, x = 0, y = 0, w = 1440, h = 900) {
  const f = figma.createFrame(); f.name = name; f.x = x; f.y = y; f.resize(w, h); solid(f, C.bg); f.clipsContent = false; return f;
}
function nav(f) {
  rect(f, 0, 0, f.width, 72, C.surface, 0, 'Navbar');
  text(f, 'G1', 40, 20, 30, C.gold, true, 'Logo'); text(f, 'EVENT BOOKING', 92, 28, 13, C.text, true);
  text(f, 'Home', 430, 29, 16, C.text); text(f, 'Events', 520, 29, 16, C.muted);
  text(f, 'Membership', 610, 29, 16, C.muted); text(f, 'About', 750, 29, 16, C.muted);
  rect(f, 1080, 18, 190, 36, C.bg, 18, 'Search'); text(f, 'Search events', 1105, 28, 14, C.muted);
  const avatar = figma.createEllipse(); avatar.name = 'User avatar'; avatar.resize(36, 36); avatar.x = 1300; avatar.y = 18; solid(avatar, C.gold); f.appendChild(avatar);
}
function button(f, label, x, y, w, primary = true) {
  rect(f, x, y, w, 46, primary ? C.gold : C.surface2, 8, label); text(f, label, x + 20, y + 15, 13, primary ? C.bg : C.text, true);
}
function eventCard(f, x, y, title, meta, price, tone) {
  rect(f, x, y, 400, 220, C.surface, 12, 'Event card'); rect(f, x, y, 400, 92, tone, 12, 'Event image placeholder');
  text(f, title, x + 22, y + 126, 22, C.text, true); text(f, meta, x + 22, y + 158, 14, C.muted); text(f, price, x + 22, y + 194, 13, C.gold, true);
}
function home() { const f = frame('01 · Home'); nav(f); rect(f, 28, 98, 1384, 460, C.surface, 16, 'Hero'); rect(f, 28, 98, 1384, 4, C.gold, 0, 'Hero accent');
  rect(f, 70, 165, 230, 30, C.magenta, 15, 'Category badge'); text(f, 'LIVE CONCERT · NOV 21', 88, 174, 12, C.text, true);
  text(f, 'Neon Noir Symphony:', 70, 255, 48, C.text, true); text(f, 'Manila Edition', 70, 312, 48, C.text, true);
  text(f, 'The Palace Pool Club, BGC, Taguig · 8:00 PM PHT', 70, 365, 16, C.muted);
  text(f, 'An immersive nocturnal audiovisual takeover blending live strings with deep melodic synth sets.', 70, 410, 16, C.text);
  button(f, 'BUY TICKETS', 70, 470, 150); button(f, 'EXPLORE DETAILS', 236, 470, 180, false);
  text(f, 'Featured Events', 40, 625, 28, C.text, true); eventCard(f, 40, 660, 'Solitary Harmonics', 'NOV 28 · Samsung Performing Arts', 'FROM ₱3,600', { r: .20, g: .15, b: .22 });
  eventCard(f, 470, 660, 'Winter Masquerade', 'DEC 05 · Shangri-La Ballroom', 'FROM ₱8,500', { r: .14, g: .25, b: .29 }); eventCard(f, 900, 660, 'Midnight Saxophone', 'DEC 12 · The Spirits Library', 'FROM ₱2,800', { r: .24, g: .16, b: .24 }); return f; }
function listings() { const f = frame('02 · Event Listings', 1540); nav(f); text(f, 'Discover Events', 48, 130, 48, C.text, true); text(f, 'Find your next unforgettable night.', 48, 188, 16, C.muted);
  rect(f, 48, 230, 480, 48, C.surface, 8, 'Search field'); text(f, 'Search by event, artist, or venue', 72, 246, 15, C.muted); rect(f, 548, 230, 170, 48, C.surface, 8, 'Category filter'); text(f, 'All categories', 570, 246, 15, C.muted); rect(f, 738, 230, 160, 48, C.surface, 8, 'Location filter'); text(f, 'Any location', 760, 246, 15, C.muted);
  text(f, 'ALL EVENTS', 48, 330, 13, C.gold, true); text(f, 'LIVE CONCERT', 170, 330, 13, C.muted, true); text(f, 'CLASSICAL & GALA', 330, 330, 13, C.muted, true);
  eventCard(f, 48, 370, 'Neon Noir Symphony', 'NOV 21 · The Palace Pool Club', 'FROM ₱4,800', { r: .32, g: .13, b: .24 }); eventCard(f, 500, 370, 'Solitary Harmonics', 'NOV 28 · Samsung Performing Arts', 'FROM ₱3,600', { r: .14, g: .25, b: .29 }); eventCard(f, 952, 370, 'Winter Masquerade', 'DEC 05 · Shangri-La Ballroom', 'FROM ₱8,500', { r: .24, g: .16, b: .24 }); return f; }
function checkout() { const f = frame('03 · Seat Selection & Checkout', 80, 980); text(f, 'Complete your booking', 50, 55, 42, C.text, true); text(f, 'Neon Noir Symphony · Sat, Nov 21 · The Palace Pool Club', 50, 110, 16, C.muted);
  rect(f, 50, 150, 850, 650, C.surface, 14, 'Seat selection panel'); text(f, '1. Choose your seats', 84, 195, 26, C.text, true); text(f, 'Select available seats on the venue map.', 84, 230, 15, C.muted); rect(f, 140, 275, 670, 44, C.bg, 22, 'Stage'); text(f, 'STAGE', 430, 290, 12, C.gold, true);
  for (let row = 0; row < 3; row++) for (let col = 0; col < 10; col++) { const s = figma.createEllipse(); s.name = 'Seat'; s.resize(26, 26); s.x = 200 + col * 52; s.y = 360 + row * 60; solid(s, row === 1 && col > 4 ? C.magenta : row === 2 ? C.surface2 : C.gold); f.appendChild(s); }
  text(f, '● Available     ● Selected     ● Unavailable', 84, 590, 14, C.muted); rect(f, 84, 650, 300, 50, C.surface2, 8, 'Hold timer'); text(f, 'Hold expires in 09:42', 106, 667, 15, C.text);
  rect(f, 940, 150, 440, 650, C.surface, 14, 'Order summary'); text(f, 'Order summary', 978, 195, 26, C.text, true); text(f, 'Silver Sky-Deck · 2 tickets', 978, 260, 15, C.text); text(f, '₱9,600', 1250, 260, 15, C.text); text(f, 'Member discount', 978, 300, 15, C.muted); text(f, '−₱960', 1260, 300, 15, C.gold); text(f, 'Total', 978, 390, 24, C.text, true); text(f, '₱8,640', 1220, 390, 24, C.gold, true); button(f, 'CONTINUE TO PAYMENT', 978, 700, 364); return f; }
function foundations() { const f = frame('00 · Foundations', 1540, 980); text(f, 'G1 Design System', 50, 60, 42, C.text, true); text(f, 'Extracted from src/assets/main.css and event detail styles.', 50, 110, 16, C.muted); text(f, 'Color tokens', 50, 180, 26, C.text, true); const colors = [['BG PRIMARY', C.bg], ['SURFACE', C.surface], ['GOLD ACCENT', C.gold], ['MAGENTA BADGE', C.magenta], ['TEXT MAIN', C.text]]; colors.forEach((v, i) => { rect(f, 50 + i * 220, 220, 180, 100, v[1], 10, v[0]); text(f, v[0], 50 + i * 220, 340, 12, C.text, true); }); text(f, 'Typography', 50, 430, 26, C.text, true); text(f, 'Inter / Display 48 / Bold', 50, 480, 42, C.text, true); text(f, 'Inter / Body 16 / Regular', 50, 545, 16, C.text); text(f, '8px spacing base · 12px card radius · subtle borders', 50, 620, 16, C.muted); return f; }

(async () => {
  try {
    figma.notify('G1 generator started…');
    await loadFonts();
    const page = figma.createPage();
    page.name = 'G1 Event Booking · Generated UI';
    page.appendChild(home());
    page.appendChild(listings());
    page.appendChild(checkout());
    page.appendChild(foundations());
    figma.currentPage = page;
    figma.viewport.scrollAndZoomIntoView(page.children);
    figma.notify('Generated native G1 Event Booking UI frames');
    figma.closePlugin();
  } catch (error) {
    console.error(error);
    figma.notify('G1 generator failed: ' + (error && error.message ? error.message : String(error)), { error: true });
    figma.closePlugin();
  }
})();
