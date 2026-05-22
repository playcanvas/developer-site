---
title: Editing and Publishing Splats
description: "Edit, publish, curate, share, and discover Gaussian Splats with the SuperSplat platform — and use the splat-transform CLI for scripted workflows."
---

Raw Gaussian Splat files often need editing and optimization before they're ready for production use — removing unwanted elements, compressing file sizes, and tuning the viewing experience. PlayCanvas provides two complementary toolsets:

- **The [SuperSplat](/user-manual/supersplat/) platform** — visual, browser-based, hosted at [superspl.at](https://superspl.at). The end-to-end home for editing, publishing, managing, curating, sharing, and discovering splats.
- **The [splat-transform](/user-manual/splat-transform/) CLI** — open-source command-line tool for scripted, reproducible conversions and batch processing.

## Why Edit Gaussian Splats?

Generated splat files typically have several issues that need addressing:

- **Floaters** - Stray splats in wrong locations from reconstruction errors
- **Background noise** - Unwanted environmental elements captured during scanning
- **Oversized files** - Too many splats for real-time rendering
- **Poor performance** - Suboptimal splat distribution affecting frame rates
- **Visual artifacts** - Rendering glitches that need manual cleanup

## The SuperSplat platform

[SuperSplat](/user-manual/supersplat/) covers the whole lifecycle of a splat from raw capture to a polished, shareable scene:

- **[Editor](/user-manual/supersplat/editor/)** — open-source, browser-based editor for cleaning, cropping, color-adjusting, and animating splats. Publishes to superspl.at.
- **[Direct Upload](/user-manual/supersplat/upload)** — skip the Editor and publish a finished splat file directly with the orange **Upload Splat** button on the home page.
- **[Manage](/user-manual/supersplat/manage)** — your library: edit metadata, change visibility, choose downloadable + license, delete, open in Studio.
- **[Studio](/user-manual/supersplat/studio/)** — curate the published viewing experience: cameras, animations, annotations, post effects, skybox, collision.
- **[Scene page](/user-manual/supersplat/scene-page)** — the public page where visitors view, share, embed, like, comment on, and (if you allow it) download your splat.
- **[Explore](/user-manual/supersplat/explore)** — the public gallery of every shared splat, with sort, time, feature filters, and search.
- **[Viewer](/user-manual/supersplat/viewer/)** — the open-source web viewer that powers scene pages, exportable as a single-file HTML or embeddable via the `@playcanvas/supersplat-viewer` npm package.
- **[Convert](/user-manual/supersplat/convert)** — in-browser format conversion and transforms (translate / rotate / scale / filters), powered by splat-transform.

## SplatTransform CLI

The [splat-transform CLI](/user-manual/splat-transform/) is the right choice when you need:

- Scripted, reproducible transformations
- Batch processing across many files
- Automated filtering and optimization
- Integration into build pipelines
- Combining and merging splat files programmatically

Both the Convert page and the splat-transform CLI use the same underlying library, so anything you can do interactively in Convert you can also automate from the command line.
