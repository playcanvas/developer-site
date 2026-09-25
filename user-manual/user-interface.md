# User Interface

Almost every application needs an interface: a HUD, menus, buttons, dialogs, labels in the scene, or a panel in XR. PlayCanvas lets you build them inside the canvas, from entities, as part of the scene, or outside it with HTML and CSS, and many applications combine the two.

[Image: A game interface over a 3D scene: a list in a scrolling panel, a round portrait, health and energy bars, a row of buttons and a toolbar]

In-canvas UI is built from components. A [screen](https://developer.playcanvas.com/user-manual/user-interface/screens.md) is the root of an interface, and [elements](https://developer.playcanvas.com/user-manual/user-interface/elements.md) below it are its images, text and groups. Components such as buttons, layout groups and scroll views add behavior on top. They are available whichever way you build: in the Editor, directly against the engine, in [PlayCanvas React](https://developer.playcanvas.com/user-manual/react.md) and in [Web Components](https://developer.playcanvas.com/user-manual/web-components.md). Each page in this section explains a concept once and then shows how to apply it on each of those surfaces.

## Two Ways to Build UI

| | In-canvas UI | HTML and CSS |
| --- | --- | --- |
| **World space and XR** | Screens can be placed in the scene, and work in XR | Only over the canvas |
| **Text input** | None built in | Text fields, autocomplete, the on-screen keyboard |
| **Accessibility** | Not visible to screen readers or keyboard navigation | Accessible with the right elements |
| **Styling and layout** | Anchors, layout groups, 9-sliced sprites | CSS, with the browser's layout and animation |
| **Fonts and emoji** | MSDF fonts made from your font files, emoji through a canvas font | Every web font and emoji |
| **Editor** | Built and previewed in the Editor | Written as HTML and CSS assets or files |
| **Canvas capture** | Part of screenshots and video captures of the canvas | Not in captures of the canvas |
| **Performance** | Drawn with the scene, and batched | Laid out and painted by the browser beside the canvas |

In-canvas UI suits HUDs, interfaces in the scene or in XR, and anything that must be part of what the canvas shows. HTML suits menus, settings, forms and long text. They mix well: an HTML settings screen can pause an application whose HUD is in the canvas. See [HTML and CSS](https://developer.playcanvas.com/user-manual/user-interface/html-and-css.md).

## Building Blocks

| Component | Role | Editor | React | Web Components | API |
| --- | --- | --- | --- | --- | --- |
| Screen | The root of an interface, over the view or in the scene | [Screen](https://developer.playcanvas.com/user-manual/editor/scenes/components/screen.md) | [`<Screen>`](https://developer.playcanvas.com/user-manual/react/api/screen.md) | [`<pc-screen>`](https://developer.playcanvas.com/user-manual/web-components/tags/pc-screen.md) | [ScreenComponent](https://api.playcanvas.com/engine/classes/ScreenComponent.html) |
| Element | An image, a text or a group | [Element](https://developer.playcanvas.com/user-manual/editor/scenes/components/element.md) | [`<Element>`](https://developer.playcanvas.com/user-manual/react/api/element.md) | [`<pc-element>`](https://developer.playcanvas.com/user-manual/web-components/tags/pc-element.md) | [ElementComponent](https://api.playcanvas.com/engine/classes/ElementComponent.html) |
| Button | Hover and press states, and click events | [Button](https://developer.playcanvas.com/user-manual/editor/scenes/components/button.md) | [Engine component](https://developer.playcanvas.com/user-manual/user-interface/buttons.md#creating-a-button) | [`<pc-button>`](https://developer.playcanvas.com/user-manual/web-components/tags/pc-button.md) | [ButtonComponent](https://api.playcanvas.com/engine/classes/ButtonComponent.html) |
| Layout Group | Arranges children in rows, columns and grids | [Layout Group](https://developer.playcanvas.com/user-manual/editor/scenes/components/layoutgroup.md) | [Engine component](https://developer.playcanvas.com/user-manual/user-interface/layout-groups.md#creating-a-layout-group) | [`<pc-layout-group>`](https://developer.playcanvas.com/user-manual/web-components/tags/pc-layout-group.md) | [LayoutGroupComponent](https://api.playcanvas.com/engine/classes/LayoutGroupComponent.html) |
| Layout Child | Overrides how a layout group sizes a child | [Layout Child](https://developer.playcanvas.com/user-manual/editor/scenes/components/layoutchild.md) | [Engine component](https://developer.playcanvas.com/user-manual/user-interface/layout-groups.md#layout-children) | [`<pc-layout-child>`](https://developer.playcanvas.com/user-manual/web-components/tags/pc-layout-child.md) | [LayoutChildComponent](https://api.playcanvas.com/engine/classes/LayoutChildComponent.html) |
| Scroll View | Scrolls content inside a masked viewport | [Scroll View](https://developer.playcanvas.com/user-manual/editor/scenes/components/scrollview.md) | [Engine component](https://developer.playcanvas.com/user-manual/user-interface/scroll-views.md#creating-a-scroll-view) | [`<pc-scroll-view>`](https://developer.playcanvas.com/user-manual/web-components/tags/pc-scroll-view.md) | [ScrollViewComponent](https://api.playcanvas.com/engine/classes/ScrollViewComponent.html) |
| Scrollbar | A draggable handle on a track, for scroll views and sliders | [Scrollbar](https://developer.playcanvas.com/user-manual/editor/scenes/components/scrollbar.md) | [Engine component](https://developer.playcanvas.com/user-manual/user-interface/scroll-views.md#creating-a-scroll-view) | [`<pc-scrollbar>`](https://developer.playcanvas.com/user-manual/web-components/tags/pc-scrollbar.md) | [ScrollbarComponent](https://api.playcanvas.com/engine/classes/ScrollbarComponent.html) |

PlayCanvas React has components for screens and elements. The others are added as engine components, with a small helper that each page shows.

## In This Section

- [Getting Started](https://developer.playcanvas.com/user-manual/user-interface/user-interface-basics.md) - Setting up UI on each surface, and a first interface.
- **Layout**
  - [Screens](https://developer.playcanvas.com/user-manual/user-interface/screens.md) - Screen space and world space, scaling to any canvas, pixel ratio and priority.
  - [Elements](https://developer.playcanvas.com/user-manual/user-interface/elements.md) - Anchors, pivots, margins, sizes and group elements.
  - [Layout Groups](https://developer.playcanvas.com/user-manual/user-interface/layout-groups.md) - Rows, columns and grids that arrange their children.
  - [Safe Areas](https://developer.playcanvas.com/user-manual/user-interface/safe-area.md) - Keeping an interface clear of notches and rounded corners.
- **Images**
  - [Image Elements](https://developer.playcanvas.com/user-manual/user-interface/image-elements.md) - Colors, textures, sprites, 9-slicing, 3D in an image and custom materials.
  - [Masks](https://developer.playcanvas.com/user-manual/user-interface/masks.md) - Clipping children to a rectangle or a shape.
- **Text**
  - [Text Elements](https://developer.playcanvas.com/user-manual/user-interface/text-elements.md) - Size, wrapping, fitting, justification, markup, outlines and shadows.
  - [Fonts](https://developer.playcanvas.com/user-manual/user-interface/fonts.md) - Creating and loading font assets, and choosing their characters.
  - [Localization](https://developer.playcanvas.com/user-manual/user-interface/localization.md) - Translations, plurals, locales and fonts for each language.
- **Interaction**
  - [Input](https://developer.playcanvas.com/user-manual/user-interface/input.md) - Mouse, touch and XR events, bubbling, and keeping UI input from the game.
  - [Buttons](https://developer.playcanvas.com/user-manual/user-interface/buttons.md) - Hover and press states, tints, sprites and events.
  - [Scroll Views](https://developer.playcanvas.com/user-manual/user-interface/scroll-views.md) - Scrolling content by dragging, the wheel and scrollbars.
- [Common Widgets](https://developer.playcanvas.com/user-manual/user-interface/common-widgets.md) - Progress bars, sliders, toggles, dialogs, lists, drag and drop and more.
- **World Space and XR**
  - [World-Space UI](https://developer.playcanvas.com/user-manual/user-interface/world-space-ui.md) - Interfaces in the scene, and labels over characters.
  - [UI in XR](https://developer.playcanvas.com/user-manual/user-interface/xr.md) - Panels, pointing, hands and menus in immersive sessions.
- [HTML and CSS](https://developer.playcanvas.com/user-manual/user-interface/html-and-css.md) - Interfaces built with the DOM over the canvas.
- [Draw Order and Performance](https://developer.playcanvas.com/user-manual/user-interface/draw-order-and-performance.md) - How UI is drawn, and keeping it fast.
- [Troubleshooting](https://developer.playcanvas.com/user-manual/user-interface/troubleshooting.md) - Common problems and their causes.

## See Also

- [User Interface - Buttons](https://developer.playcanvas.com/tutorials/ui-elements-buttons/), [Leaderboard](https://developer.playcanvas.com/tutorials/ui-elements-leaderboard/) and [Progress Bar](https://developer.playcanvas.com/tutorials/ui-elements-progress/) - Tutorials that build interfaces in the Editor
- [User Interface - Text Input](https://developer.playcanvas.com/tutorials/ui-text-input/) - Tutorial that builds a text field
- [Touchscreen Joypad Controls](https://developer.playcanvas.com/tutorials/touch-joypad/) - Tutorial that builds on-screen joysticks
- [2D](https://developer.playcanvas.com/user-manual/2D.md) - Sprites, texture atlases and 9-slicing
- [PCUI](https://playcanvas.github.io/pcui/) - The HTML component library for building tools and editors
