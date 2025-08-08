---
title: Viewing Splats
---

Once you've created a Gaussian splat, you'll want to preview and evaluate it before proceeding to editing or integration into your projects. The **PlayCanvas Model Viewer** provides a convenient way to quickly view and inspect your splat files without needing to set up a full PlayCanvas project.

## PlayCanvas Model Viewer

The [PlayCanvas Model Viewer](https://playcanvas.com/viewer) is a web-based tool that allows you to instantly preview 3D content, including Gaussian splats, directly in your browser.

<video autoPlay muted loop controls src='/video/playcanvas-splat-viewer.mp4' style={{width: '100%', height: 'auto'}} />

### Supported Splat Formats

The Model Viewer supports three commonly used Gaussian splat formats:

- **PLY files** (`.ply`) - Standard uncompressed splat format
- **Compressed PLY files** (`.compressed.ply`) - PlayCanvas compressed (quantized) format
- **SOGS format** (`meta.json` + WebP images) - Super-compressed format

### How to View Your Splats

1. **Visit** [playcanvas.com/viewer](https://playcanvas.com/viewer)
2. **Drag and drop** your splat onto the viewer
   - For **PLY** and **Compressed PLY** files: drag the individual file
   - For **SOGS** format: drag the parent folder containing `meta.json` and WebP images
3. **Navigate** the 3D scene:

   | Control | Action |
   |---------|--------|
   | Left double click | Set orbit point |
   | Left click + drag | Orbit around the splat |
   | Right click + drag | Look around |
   | Shift + click + drag | Pan the view |
   | Mouse wheel | Zoom in/out |
   | WASD or Arrow keys | Move forwards/backwards/left/right |

## Open Source and Customization

The PlayCanvas Model Viewer is **open source** and available on [GitHub](https://github.com/playcanvas/model-viewer). This means you can:

- **Host your own version** - Use a local server or deploy to your own infrastructure for complete control
- **Add new functionality** - Add support for additional file formats or custom UI
- **Contribute back** - Submit issues and pull requests to help improve the viewer for everyone

## Next Steps

After previewing your splats in the Model Viewer:

- If cleanup is needed → continue to [Editing Splats](../editing) for optimization and refinement
- If the quality meets your needs → proceed directly to [Building Splat-based Apps](../building)
