# Editing and Publishing Splats

Raw Gaussian Splat files often need editing and optimization before they're ready for production use — removing unwanted elements, compressing file sizes, and tuning the viewing experience. PlayCanvas provides two complementary toolsets:

- **The [SuperSplat](https://developer.playcanvas.com/user-manual/supersplat.md) platform** — visual, browser-based, hosted at [superspl.at](https://superspl.at). The end-to-end home for editing, publishing, managing, curating, sharing, and discovering splats.
- **The [splat-transform](https://developer.playcanvas.com/user-manual/splat-transform.md) CLI** — open-source command-line tool for scripted, reproducible conversions and batch processing.

## Why Edit Gaussian Splats?

Generated splat files typically have several issues that need addressing:

- **Floaters** - Stray splats in wrong locations from reconstruction errors
- **Background noise** - Unwanted environmental elements captured during scanning
- **Oversized files** - Too many splats for real-time rendering
- **Poor performance** - Suboptimal splat distribution affecting frame rates
- **Visual artifacts** - Rendering glitches that need manual cleanup

## The SuperSplat platform

[SuperSplat](https://developer.playcanvas.com/user-manual/supersplat.md) covers the whole lifecycle of a splat from raw capture to a polished, shareable scene:

- **[Editor](https://developer.playcanvas.com/user-manual/supersplat/editor.md)** — open-source, browser-based editor for cleaning, cropping, color-adjusting, and animating splats. Publishes to superspl.at.
- **[Direct Upload](https://developer.playcanvas.com/user-manual/supersplat/upload.md)** — skip the Editor and publish a finished splat file directly with the orange **Upload Splat** button on the home page.
- **[Manage](https://developer.playcanvas.com/user-manual/supersplat/manage.md)** — your library: edit metadata, change visibility, choose downloadable + license, delete, open in Studio.
- **[Studio](https://developer.playcanvas.com/user-manual/supersplat/studio.md)** — curate the published viewing experience: cameras, animations, annotations, post effects, skybox, collision.
- **[Scene page](https://developer.playcanvas.com/user-manual/supersplat/scene-page.md)** — the public page where visitors view, share, embed, like, comment on, and (if you allow it) download your splat.
- **[Explore](https://developer.playcanvas.com/user-manual/supersplat/explore.md)** — the public gallery of every shared splat, with sort, time, feature filters, and search.
- **[Viewer](https://developer.playcanvas.com/user-manual/supersplat/viewer.md)** — the open-source web viewer that powers scene pages, exportable as a single-file HTML or embeddable via the `@playcanvas/supersplat-viewer` npm package.
- **[Convert](https://developer.playcanvas.com/user-manual/supersplat/convert.md)** — in-browser format conversion and transforms (translate / rotate / scale / filters), powered by splat-transform.

## SplatTransform CLI

The [splat-transform CLI](https://developer.playcanvas.com/user-manual/splat-transform.md) is the right choice when you need:

- Scripted, reproducible transformations
- Batch processing across many files
- Automated filtering and optimization
- Integration into build pipelines
- Combining and merging splat files programmatically

Both the Convert page and the splat-transform CLI use the same underlying library, so anything you can do interactively in Convert you can also automate from the command line.
