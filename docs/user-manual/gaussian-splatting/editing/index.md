---
title: Editing Splats
---

Raw Gaussian Splat files often need editing and optimization before they're ready for production use. This process involves removing unwanted elements, compressing file sizes, and optimizing performance for real-time rendering in PlayCanvas.

## Why Edit Gaussian Splats?

Generated splat files typically have several issues that need addressing:

- **Floaters** - Stray splats in wrong locations from reconstruction errors
- **Background noise** - Unwanted environmental elements captured during scanning
- **Oversized files** - Too many splats for real-time rendering
- **Poor performance** - Suboptimal splat distribution affecting frame rates
- **Visual artifacts** - Rendering glitches that need manual cleanup

## Editing Tools Overview

PlayCanvas provides both visual and command-line tools for editing Gaussian Splats:

### [SuperSplat Editor](supersplat)

The **SuperSplat Editor** is a powerful, browser-based visual editor designed specifically for interactive splat editing. It's perfect for:

- Manual cleanup and artistic editing
- Removing unwanted background elements
- Fine-tuning splat positioning and colors
- Creating camera animations and flythroughs
- Publishing splats to the web

### [splat-transform CLI](splat-transform)

The **splat-transform CLI** is a command-line tool for batch processing and automated transformations. It excels at:

- Scripted, reproducible transformations
- Batch processing multiple files
- Automated filtering and optimization
- Integration into build pipelines
- Combining and merging splat files
