---
title: Skybox & Background
description: "Set a background color or upload an equirectangular skybox for a published splat in SuperSplat Studio."
---

The **Skybox** and **Background** controls in [Studio](/user-manual/supersplat/studio/) let you set what fills the space *around* your splat in the viewer. The simplest option is a flat background color; for environment scenes you can also upload an equirectangular skybox image.

<!-- TODO: media — /img/user-manual/supersplat/studio/skybox-upload.png — the skybox upload dialog and preview -->

## Background color

The **Background** control, in the **Scene** tab's *Look & Tone* section, takes an RGB color in the `0–1` range, applied as a solid color behind the splat. It's used whenever no skybox is uploaded, and as the clear color even when a skybox is present (it shows through anywhere the skybox isn't visible).

## Skybox image

In [Studio](/user-manual/supersplat/studio/#launching-studio), open the **Assets** tab in the left panel to find the Skybox controls. The upload dialog accepts a single `.webp` image. For best results the image should be **equirectangular** — a 2:1 panoramic projection that maps cleanly onto the surrounding sphere.

Each scene can have one skybox. Uploading a new image replaces the previous one.

Before uploading, the dialog shows a 2:1 preview of the selected image so you can check it. The upload happens immediately, and the new skybox is live on the next viewer reload. If the file isn't a `.webp`, or the upload fails, the dialog shows an error message.

## When to use one or the other

- **Background color only** — for studio-style presentations where you want focus on the splat itself.
- **Skybox** — for scenes captured outdoors or in believable environments where matching the surrounding lighting and horizon matters.

## See also

- [Post Effects](/user-manual/supersplat/studio/post-effects) — tonemapping shapes how the skybox is lit
- [Experience Settings](/user-manual/supersplat/studio/experience-settings) — the JSON contract that stores background color and skybox URL
