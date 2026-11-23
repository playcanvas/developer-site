---
title: What is Gaussian Splatting?
description: "A hands-on introduction to 3D Gaussian splatting: what a splat is made of, how one is trained from photos, how it is drawn in real time, and where it works best."
---

import { SplatExplorer, GaussianPlayground } from '@site/src/components/GaussianSplatDemo';

3D Gaussian Splatting (3DGS) is a way to capture a real object or place and draw it photorealistically, in real time. Most 3D scenes are built from meshes of triangles, with textures and materials. A splat is built from a cloud of small, soft, semi-transparent blobs called **Gaussians** instead, each with nothing more than a position, a shape, a color and an opacity. Drawn together, they add up to an image that can be hard to tell apart from a photo.

<SplatExplorer />

## A Cloud of Blobs

The toy cat above is a typical small splat. Drag it to look around, then try the controls:

- Drag **Gaussian size** down. As each Gaussian shrinks, the cat dissolves into the separate blobs it's made of. At full size they overlap and blend, and the result looks like a solid surface.
- Select **Random colors** to draw every Gaussian as a solid shape, in a color of its own. You can now see where each one is and how big it is: large Gaussians cover smooth areas, and small ones crowd together where there's fine detail.

There are no triangles, textures, materials or lights here. Everything you see, shading and highlights included, is stored in the Gaussians' colors.

:::note[Splats and Gaussians]

People use the word **splat** in two ways: for one Gaussian, and for a whole scene made of them, as in "a splat of a toy cat". Which one is meant is usually clear from context.

:::

## What is a Gaussian?

The name comes from the Gaussian function, the bell curve of statistics, also called the normal distribution. It's highest in the middle and falls away smoothly on either side, without ever quite reaching zero. Spin it around its center and you get a soft, round blob. Stretch that blob by different amounts along three axes and you get a soft ellipsoid: a **3D Gaussian**.

A 3D Gaussian is densest at its center and fades smoothly toward its edges, so neighboring Gaussians blend into each other without visible seams. In a splat, each one is defined by a handful of numbers:

| Property | Numbers | What it controls |
| --- | --- | --- |
| Position | 3 | Where its center is (x, y, z) |
| Scale | 3 | How far it stretches along each of its three axes |
| Rotation | 4 | Which way those axes point, as a [quaternion](https://en.wikipedia.org/wiki/Quaternions_and_spatial_rotation) |
| Opacity | 1 | How solid it is at its center |
| Color | 3 | Its base color (red, green, blue) |

Here they are on a single Gaussian. The colored rods are the Gaussian's own axes: scale stretches it along them, and rotation turns them.

<GaussianPlayground />

Orbit around it and you'll notice that from every angle, it looks like a soft 2D ellipse. That's what makes Gaussians quick to draw, as [How a Splat is Drawn](#how-a-splat-is-drawn) explains.

### Color That Changes With the View

Real surfaces don't look the same from every direction. Highlights slide across shiny objects as you move around them, and some materials shift color with the angle. To capture this, each Gaussian can store **spherical harmonics**: extra numbers that describe how its color changes with the direction it's seen from.

In the toy cat demo, clear **View-dependent color** and look at the cat's eyes. They lose their glassy shine, because the reflections in them were stored as view-dependent color.

Spherical harmonics come in bands, and each band adds finer detail. Most splats use three, which add 45 numbers to each Gaussian, 15 for each color channel. That's most of a splat's data: in an uncompressed [PLY](formats/ply.md) file, 45 of the 59 numbers for each Gaussian are spherical harmonics. Leaving them out makes a splat far smaller, at the cost of its view-dependent effects.

## How a Splat is Made

Nobody places Gaussians by hand. A splat is **trained** from photos or video frames of the real thing:

1. You take dozens to hundreds of overlapping photos, from all around the subject.
2. Software works out where each photo was taken from, and finds a sparse cloud of points on the subject's surfaces. This step is called structure from motion. Each point becomes a Gaussian.
3. The trainer draws the Gaussians from the viewpoint of one of the photos, compares the result with the photo, and nudges every Gaussian's position, scale, rotation, opacity and color to make them match more closely. It repeats this thousands of times, cycling through the photos.
4. Along the way, it splits Gaussians where detail is missing, and removes ones that hardly contribute.

Every number in every Gaussian affects the image smoothly, so for each one, the trainer can work out which way to nudge it, and by how much. This is gradient descent, the technique used to train neural networks.

This video shows a simplified 2D version of training, in which Gaussians learn a single picture of the toy cat:

<video autoPlay muted loop controls playsInline src="/video/gaussian-splatting-training-2d.mp4" style={{width: '100%', height: 'auto'}} />

On the left is the picture. In the middle are the Gaussians as training goes on, and on the right each Gaussian is drawn as a solid shape in a random color, as in the toy cat demo. Training starts with a few dozen large Gaussians and splits them where the picture has detail, ending with a few thousand. The ones that fade away, such as those in the background, are removed. In 3D, the Gaussians must match every photo at once, which puts each one at the right depth as well.

Training takes from a few minutes to several hours, depending on the tool, the hardware and the size of the scene. To make your own splats, see [Creating Splats](creating/index.md).

## How a Splat is Drawn

To draw a frame, the renderer does three things:

![Drawing a splat in three steps: project each 3D Gaussian to a 2D ellipse on the screen, sort the ellipses by distance from the camera, then blend them from back to front](/img/user-manual/gaussian-splatting/what-is-gaussian-splatting/drawing.svg)

1. **Project.** Seen from any viewpoint, a 3D Gaussian looks like a 2D one: a soft ellipse. The renderer works out where each Gaussian's ellipse falls on the screen, and draws it as a single rectangle that covers it.
2. **Sort.** The Gaussians are semi-transparent, so the order they're drawn in matters. The renderer sorts them by their distance from the camera, and sorts again as the camera moves.
3. **Blend.** It draws them from back to front. Each one covers part of what's behind it, according to its opacity and how far each pixel is from its center.

No lighting is calculated along the way, and there are no rays to trace and no neural network to run. That's why a splat with millions of Gaussians can be drawn many times a second, even in a browser. To learn how PlayCanvas does this, see [Rendering Architecture](rendering-architecture/index.md).

## Splats and Meshes

Splats don't replace meshes, and the two work well together. PlayCanvas can draw both in the same scene, for example mesh characters walking through a splat environment.

| | Mesh | Gaussian splat |
| --- | --- | --- |
| **Made from** | Triangles, with textures and materials | Soft, semi-transparent Gaussians |
| **Created by** | Modeling by hand, or reconstruction from photos | Training on photos or video |
| **Lighting** | Calculated as it's drawn, so it can change | Captured in the colors, so it's fixed |
| **Fine detail** | Fur, foliage and fuzzy edges are hard to model | Fur, foliage and fuzzy edges come out naturally |
| **Surfaces** | Well-defined, for collision and physics | None: a collision mesh must be made separately |
| **Animation** | Skinning and morph targets | Mostly static |
| **Size** | Usually compact | Large, unless compressed |

## Strengths and Limitations

Splats are at their best when you want a real place or object to look exactly as it does in life:

- **Photorealism without modeling.** A capture session and a training run can stand in for weeks of modeling and texturing.
- **Detail that's hard to model.** Foliage, hair, fur, fabric and soft edges look natural.
- **Running on the web.** Compressed splats load and run in a browser, including on many phones.

They're used for real estate and architecture, construction site records, cultural heritage, e-commerce, virtual tourism, film and virtual production, and game environments.

They also have limits to plan around:

- **Lighting is baked in.** A splat looks the way its subject looked when it was photographed. To light it differently, see [Relighting](building/relighting.md).
- **There are no surfaces.** Collision and physics need a separate mesh or voxel data. See [Collision Mesh Generation](/user-manual/splat-transform/collision).
- **A splat is a snapshot.** It captures a moment, so moving parts aren't animated the way a rigged mesh is.
- **Splats are large.** Millions of Gaussians make for big files and a lot of drawing. Compressed formats such as [SOG](formats/sog.md) and [level-of-detail streaming](building/lod-streaming.md) help, and [Performance](building/performance.md) has more tips.
- **Capture flaws show.** Areas the photos didn't cover come out blurry or with stray, floating Gaussians called floaters. Mirrors, glass and very thin objects are hard to reconstruct. Tools such as the [SuperSplat Editor](/user-manual/supersplat/editor/) help clean splats up.

## Where It Came From

3D Gaussian Splatting was introduced in 2023, in the paper [3D Gaussian Splatting for Real-Time Radiance Field Rendering](https://repo-sam.inria.fr/fungraph/3d-gaussian-splatting/) by researchers at Inria and the Max Planck Institute for Informatics. It built on two older ideas. Neural radiance fields (NeRFs) also learn a scene from photos, but store it inside a neural network that is slow to draw. Splatting, a rendering technique from the early 1990s, draws each point as a soft footprint on the screen, like a snowball thrown at a wall. Combining a learned set of Gaussians with fast splatting is what made photorealistic captures drawable in real time.

## Next Steps

- Learn about the [file formats](formats/index.md) splats are stored in.
- [Create your own splats](creating/index.md) from photos or video.
- [View](viewing.md), [edit and publish](editing/index.md) them.
- [Build your first splat app](building/your-first-app/index.md) with PlayCanvas.
