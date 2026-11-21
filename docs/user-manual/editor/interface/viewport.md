---
title: Viewport
description: Use viewport cameras gizmos and render modes from wireframe to material debug views like albedo normals or emission to validate lighting before shipping.
---

![The Editor with its panels hidden, so that the viewport fills the window](/img/user-manual/editor/viewport/viewport.webp)

The viewport shows your scene as currently rendered. You can freely move around the scene by manipulating the Editor's current camera. To give it the whole window, as above, press <kbd>Space</kbd> or click the button beside **Launch** to hide the panels, and do the same again to bring them back.

## Cameras {#cameras}

Initially the Editor is set to use the **Perspective** camera. This camera is as if a movie camera was floating in your scene. You can use the camera dropdown menu to view the scene using various other cameras.

![The camera menu, listing the Perspective and orthographic cameras of the Editor and the two camera entities of the scene](/img/user-manual/editor/viewport/camera-menu.webp)

The **orthographic** cameras: Top, Bottom, Front, Back, Left, Right, let you view a version of the scene with no perspective. Useful for fine-tuning positions.

You can also use the camera menu to select any of the camera Entities in your scene. This way you can position your in-game camera exactly as required.

To switch cameras from the keyboard, use the numeric keypad. See [Viewport Cameras](keyboard-shortcuts.md#viewport-cameras).

## View Cube {#view-cube}

The View Cube in the bottom-right corner of the viewport shows the orientation of the camera. Each axis ends in a circle: the colored circles labeled X, Y and Z mark the positive axes, and the gray circles with a colored outline mark the negative axes.

![The View Cube, with labeled circles on the positive X, Y and Z axes and outlined circles on the negative axes](/img/user-manual/editor/viewport/view-cube.webp)

Click a circle to view the scene from that side. The camera swings round onto that axis and looks back at the point it orbits around, keeping its distance and its perspective projection, so you can carry on orbiting from the new view. For example, click Y to look straight down on the scene, or Z to view it from the front.

The View Cube is hidden while you use one of the orthographic cameras. To turn it off or change its size, use **Show View Cube** and **View Cube Size** in the [Editor settings](settings/editor.md).

## Gizmos {#gizmos}

![The translate, rotate and scale gizmos on a selected chess piece, with its collision shape and bounds drawn around it](/img/user-manual/editor/viewport/gizmos.webp)

The 3-Colored Axis you can see in the screenshot above is called a [Gizmo](/user-manual/glossary#gizmo). This is used to manipulate the transform matrix of the selected Entity. There are three types of transform Gizmo: Translate (with arrows on the ends of the axes); Rotate (which is made up of three colored rings) and Scale (with cubes on the ends of the axes). A fourth gizmo, Resize Element, changes the width and height of a [UI element](/user-manual/user-interface/elements/#element-resizing). Switch between them with the [Toolbar](toolbar.md) or the <kbd>1</kbd>, <kbd>2</kbd>, <kbd>3</kbd> and <kbd>4</kbd> keys.

Selecting an Entity also shows helper gizmos for some of its components:

- **Camera**: the view frustum, with handles that drag the near and far clip planes and the field of view (or the orthographic height).
- **Light**: an arrow for a directional light, the range of an omni light, the cone of a spot light or the shape of an area light, with handles that drag the range, the cone angles or the area light's size.
- **Collision**: the collision shape, with handles that resize it. Shown when a single Entity is selected.
- **Bounds**: corner brackets around the selection, with face and corner handles that resize it. When the Entity has a collision shape, its handles take over.

A label shows the value while you drag a handle, and each drag can be undone in one step. The handles need write access to the project.

To change the size and style of the gizmos, use **Gizmo Size** and **Gizmo Preset** in the [Editor settings](settings/editor.md). The Classic preset draws the helper gizmos as thin white lines with no handles, and the bounds as a plain box.

## Entity Icons {#entity-icons}

Some components have no visible geometry of their own, so the Editor draws an icon in the viewport to mark where their Entity is. Click an icon to select that Entity in the [Hierarchy](/user-manual/editor/interface/hierarchy) and [Inspector](/user-manual/editor/interface/inspector) panels. Icons are picked along with the scene, so geometry in front of an icon is picked instead, and a rectangle selection includes the Entities whose icons it covers.

| Component | Icon |
| --------- | ---- |
| [Camera](/user-manual/editor/scenes/components/camera) | ![Camera icon](/img/user-manual/editor/viewport/entity-icons/camera.webp) |
| [Light](/user-manual/editor/scenes/components/light) | ![Light icon](/img/user-manual/editor/viewport/entity-icons/light.webp) |
| [Audio Listener](/user-manual/editor/scenes/components/audiolistener) | ![Audio Listener icon](/img/user-manual/editor/viewport/entity-icons/audio-listener.webp) |
| [Sound](/user-manual/editor/scenes/components/sound) | ![Sound icon](/img/user-manual/editor/viewport/entity-icons/sound.webp) |
| [Particle System](/user-manual/editor/scenes/components/particlesystem) | ![Particle System icon](/img/user-manual/editor/viewport/entity-icons/particle-system.webp) |
| [Anim](/user-manual/editor/scenes/components/anim) and [Animation](/user-manual/editor/scenes/components/animation) | ![Anim icon](/img/user-manual/editor/viewport/entity-icons/anim.webp) |
| [Script](/user-manual/editor/scenes/components/script) | ![Script icon](/img/user-manual/editor/viewport/entity-icons/script.webp) |

An Entity with several of these components shows the icon that comes first in the table. An Entity shows no icon when it is disabled, or when it has something to see: an enabled Render or Model component with meshes, or an enabled Sprite or Element component.

A selected Entity's icon hides under the transform gizmo. Icons behind scene geometry are drawn faded. With the Default **Gizmo Preset**, light icons take the color of their light. To resize the icons, change **Icons Size** in the [Editor settings](settings/editor.md). The default is 0.2, and 0 hides them.

## Render Mode {#render-mode}

To change how the viewport renders the scene, hover over the render button in the top-right of the viewport. The button shows the current render mode, **Standard** unless you change it.

![The render menu, with the Wireframe option above the list of render modes](/img/user-manual/editor/viewport/render-menu.webp)

Tick **Wireframe** to draw the meshes of the scene as wireframes:

![The games room drawn in wireframe](/img/user-manual/editor/viewport/wireframe.webp)

The other options are debug render modes. Each shows one input or result of the materials and lighting in place of the final image: **Albedo**, **Opacity**, **World Normal**, **Specularity**, **Gloss**, **Metalness**, **AO**, **Emission**, **Lighting** and **UV0**. Select **Standard** to return to the normal render. Below, from the top left, are Albedo, World Normal, Lighting and UV0:

![Two chess pieces in the Albedo, World Normal, Lighting and UV0 render modes](/img/user-manual/editor/viewport/render-modes.webp)
