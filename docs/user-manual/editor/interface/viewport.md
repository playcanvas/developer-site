---
title: Viewport
description: Use viewport cameras gizmos and render modes from wireframe to material debug views like albedo normals or emission to validate lighting before shipping.
---

![Viewport](/img/user-manual/editor/viewport/viewport.jpg)

The viewport shows your scene as currently rendered. You can freely move around the scene by manipulating the Editor's current camera.

## Cameras {#cameras}

Initially the Editor is set to use the **Perspective** camera. This camera is as if a movie camera was floating in your scene. You can use the camera dropdown menu to view the scene using various other cameras.

![Camera Dropdown](/img/user-manual/editor/viewport/camera-dropdown.jpg)

The **orthographic** cameras: Top, Bottom, Front, Back, Left, Right, let you view a version of the scene with no perspective. Useful for fine-tuning positions.

You can also use the camera menu to select any of the camera Entities in your scene. This way you can position your in-game camera exactly as required.

## Gizmos {#gizmos}

![Gizmos](/img/user-manual/editor/viewport/gizmos.jpg)

The 3-Colored Axis you can see in the screenshot above is called a [Gizmo](/user-manual/glossary#gizmo). This is used to manipulate the transform matrix of the selected Entity. There are three types of Gizmo: Translate (with arrows on the ends of the axes); Rotate (which is made up of three colored rings) and Scale (with cubes on the ends of the axes).

## Entity Icons {#entity-icons}

Some components have no visible geometry of their own, so the Editor draws an icon in the viewport to mark the Entity's position when it is not selected. Click an icon to select that Entity in the [Hierarchy](/user-manual/editor/interface/hierarchy) and [Inspector](/user-manual/editor/interface/inspector) panels.

| Component | Icon |
| --------- | ---- |
| [Camera](/user-manual/editor/scenes/components/camera) | ![Camera icon](/img/user-manual/editor/viewport/entity-icons/camera.png) |
| [Light](/user-manual/editor/scenes/components/light) — directional | ![Directional light icon](/img/user-manual/editor/viewport/entity-icons/light-directional.png) |
| [Light](/user-manual/editor/scenes/components/light) — omni | ![Omni light icon](/img/user-manual/editor/viewport/entity-icons/light-point.png) |
| [Light](/user-manual/editor/scenes/components/light) — spot | ![Spot light icon](/img/user-manual/editor/viewport/entity-icons/light-spot.png) |
| [Audio Listener](/user-manual/editor/scenes/components/audiolistener) | ![Audio listener icon](/img/user-manual/editor/viewport/entity-icons/audiolistener.png) |
| Audio Source | ![Audio source icon](/img/user-manual/editor/viewport/entity-icons/audiosource.png) |
| [Sound](/user-manual/editor/scenes/components/sound) | ![Sound icon](/img/user-manual/editor/viewport/entity-icons/sound.png) |
| [Particle System](/user-manual/editor/scenes/components/particlesystem) | ![Particle system icon](/img/user-manual/editor/viewport/entity-icons/particlesystem.png) |
| [Script](/user-manual/editor/scenes/components/script) | ![Script icon](/img/user-manual/editor/viewport/entity-icons/script.png) |
| [Animation](/user-manual/editor/scenes/components/animation) | ![Animation icon](/img/user-manual/editor/viewport/entity-icons/animation.png) |
| [Collision](/user-manual/editor/scenes/components/collision) | ![Collision icon](/img/user-manual/editor/viewport/entity-icons/collision.png) |
| [Rigid Body](/user-manual/editor/scenes/components/rigidbody) | ![Rigid body icon](/img/user-manual/editor/viewport/entity-icons/rigidbody.png) |
| Fallback (unrecognized component) | ![Unknown component icon](/img/user-manual/editor/viewport/entity-icons/unknown.png) |

When an Entity has several of these components, the icon shown follows this priority order: camera, light, audio listener, audio source, sound, particle system, script, animation. Light icons are also tinted to match the light's color.

## Render Mode {#render-mode}

You can modify the viewport render mode using this drop-down menu in the top-right of the viewport:

![Viewport Render Mode Menu](/img/user-manual/editor/viewport/render-mode-menu.png)

It allows you to toggle wireframe rendering:

![Viewport Wireframe](/img/user-manual/editor/viewport/wireframe.png)

You can also visualize your scene in various debug render modes. This restricts the rendered scene to just show albedo, normals, AO, emission and more.

![Viewport Render Modes](/img/user-manual/editor/viewport/render-modes.png)
