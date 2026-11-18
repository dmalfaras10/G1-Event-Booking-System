# Import the faithful website captures into a native Figma file

This importer converts the generated PNG captures into native Figma frames containing image layers. It preserves the exact rendered website appearance and creates a real Figma document that can be saved as `.fig`.

## Steps

1. Open Figma Desktop and create a blank design file.
2. Select **Plugins → Development → Import plugin from manifest…**.
3. Choose `figma-capture-importer/manifest.json`.
4. Run **Plugins → Development → G1 · Import Website Captures**.
5. Select all PNG files in `browser-captures/`.
6. Click **Import captures into Figma**.
7. Save the document with **File → Save local copy**.

The saved result is the actual `.fig` file. The imported screenshot frames are native Figma objects, although the pixels inside each frame remain image layers rather than individually editable HTML/text layers.
