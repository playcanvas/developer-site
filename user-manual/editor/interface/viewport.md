# Viewport

[Image: Viewport]

The viewport shows your scene as currently rendered. You can freely move around the scene by manipulating the Editor's current camera.

## Cameras

Initially the Editor is set to use the **Perspective** camera. This camera is as if a movie camera was floating in your scene. You can use the camera dropdown menu to view the scene using various other cameras.

[Image: Camera Dropdown]

The **orthographic** cameras: Top, Bottom, Front, Back, Left, Right, let you view a version of the scene with no perspective. Useful for fine-tuning positions.

You can also use the camera menu to select any of the camera Entities in your scene. This way you can position your in-game camera exactly as required.

## Gizmos

[Image: Gizmos]

The 3-Colored Axis you can see in the screenshot above is called a [Gizmo](https://developer.playcanvas.com/user-manual/glossary.md#gizmo). This is used to manipulate the transform matrix of the selected Entity. There are three types of Gizmo: Translate (with arrows on the ends of the axes); Rotate (which is made up of three colored rings) and Scale (with cubes on the ends of the axes).

## Entity Icons

Some components have no visible geometry of their own, so the Editor draws an icon in the viewport to mark the Entity's position when it is not selected. Click an icon to select that Entity in the [Hierarchy](https://developer.playcanvas.com/user-manual/editor/interface/hierarchy.md) and [Inspector](https://developer.playcanvas.com/user-manual/editor/interface/inspector.md) panels.

| Component | Icon |
| --------- | ---- |
| [Camera](https://developer.playcanvas.com/user-manual/editor/scenes/components/camera.md) | [Image: Camera icon] |
| [Light](https://developer.playcanvas.com/user-manual/editor/scenes/components/light.md) — directional | [Image: Directional light icon] |
| [Light](https://developer.playcanvas.com/user-manual/editor/scenes/components/light.md) — omni | [Image: Omni light icon] |
| [Light](https://developer.playcanvas.com/user-manual/editor/scenes/components/light.md) — spot | [Image: Spot light icon] |
| [Script](https://developer.playcanvas.com/user-manual/editor/scenes/components/script.md) | [Image: Script icon] |
| [Animation](https://developer.playcanvas.com/user-manual/editor/scenes/components/animation.md) | [Image: Animation icon] |

When an Entity has several of these components, the icon shown follows this priority order: camera, light, script, animation. Light icons are also tinted to match the light's color.

## Render Mode

You can modify the viewport render mode using this drop-down menu in the top-right of the viewport:

[Image: Viewport Render Mode Menu]

It allows you to toggle wireframe rendering:

[Image: Viewport Wireframe]

You can also visualize your scene in various debug render modes. This restricts the rendered scene to just show albedo, normals, AO, emission and more.

[Image: Viewport Render Modes]
