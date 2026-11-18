# Native Figma file generator

This plugin creates a new native Figma document from the current codebase’s visual system. It generates editable Figma frames for:

- Home
- Event listings
- Seat selection and checkout
- Foundations/design tokens

## Run in Figma Desktop

1. Install Figma Desktop from <https://www.figma.com/downloads/> and sign in.
2. Open Figma and create a new blank design file.
3. Open **Plugins → Development → Import plugin from manifest…**.
4. Select `figma-plugin/manifest.json` from this repository.
5. Run it from **Plugins → Development → G1 Event Booking · Codebase UI Generator**.
6. Save the generated document with **File → Save local copy** to download a real `.fig` file, or keep it in your Figma account.

The generator should finish within a few seconds. If it does not, stop the plugin and run it again from the Development plugins menu. The plugin now falls back to Arial if Inter is unavailable and displays an error notification instead of silently remaining active.

The generated objects are native Figma frames, rectangles, ellipses, and text layers—not a screenshot or imported SVG. The generator is intentionally dependency-free so it can be imported directly from the manifest.
