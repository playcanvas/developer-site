---
title: User Interface
description: "Overview of PlayCanvas user interfaces: in-canvas UI built from screens and elements compared with HTML and CSS, the UI components on every authoring surface, and a map of this section."
---

Almost every application needs an interface: a HUD, menus, buttons, dialogs, labels in the scene, or a panel in XR. PlayCanvas lets you build them inside the canvas, from entities, as part of the scene, or outside it with HTML and CSS, and many applications combine the two.

![A game interface over a 3D scene: a list in a scrolling panel, a round portrait, health and energy bars, a row of buttons and a toolbar](/img/user-manual/user-interface/index/hero.webp)

In-canvas UI is built from components. A [screen](/user-manual/user-interface/screens/) is the root of an interface, and [elements](/user-manual/user-interface/elements/) below it are its images, text and groups. Components such as buttons, layout groups and scroll views add behavior on top. They are available whichever way you build: in the Editor, directly against the engine, in [PlayCanvas React](/user-manual/react/) and in [Web Components](/user-manual/web-components/). Each page in this section explains a concept once and then shows how to apply it on each of those surfaces.

## Two Ways to Build UI {#two-ways-to-build-ui}

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

In-canvas UI suits HUDs, interfaces in the scene or in XR, and anything that must be part of what the canvas shows. HTML suits menus, settings, forms and long text. They mix well: an HTML settings screen can pause an application whose HUD is in the canvas. See [HTML and CSS](/user-manual/user-interface/html-and-css/).

## Building Blocks {#building-blocks}

| Component | Role | Editor | React | Web Components | API |
| --- | --- | --- | --- | --- | --- |
| Screen | The root of an interface, over the view or in the scene | [Screen](/user-manual/editor/scenes/components/screen/) | [`<Screen>`](/user-manual/react/api/screen/) | [`<pc-screen>`](/user-manual/web-components/tags/pc-screen/) | [ScreenComponent](https://api.playcanvas.com/engine/classes/ScreenComponent.html) |
| Element | An image, a text or a group | [Element](/user-manual/editor/scenes/components/element/) | [`<Element>`](/user-manual/react/api/element/) | [`<pc-element>`](/user-manual/web-components/tags/pc-element/) | [ElementComponent](https://api.playcanvas.com/engine/classes/ElementComponent.html) |
| Button | Hover and press states, and click events | [Button](/user-manual/editor/scenes/components/button/) | [Engine component](/user-manual/user-interface/buttons/#creating-a-button) | [`<pc-button>`](/user-manual/web-components/tags/pc-button/) | [ButtonComponent](https://api.playcanvas.com/engine/classes/ButtonComponent.html) |
| Layout Group | Arranges children in rows, columns and grids | [Layout Group](/user-manual/editor/scenes/components/layoutgroup/) | [Engine component](/user-manual/user-interface/layout-groups/#creating-a-layout-group) | [`<pc-layout-group>`](/user-manual/web-components/tags/pc-layout-group/) | [LayoutGroupComponent](https://api.playcanvas.com/engine/classes/LayoutGroupComponent.html) |
| Layout Child | Overrides how a layout group sizes a child | [Layout Child](/user-manual/editor/scenes/components/layoutchild/) | [Engine component](/user-manual/user-interface/layout-groups/#layout-children) | [`<pc-layout-child>`](/user-manual/web-components/tags/pc-layout-child/) | [LayoutChildComponent](https://api.playcanvas.com/engine/classes/LayoutChildComponent.html) |
| Scroll View | Scrolls content inside a masked viewport | [Scroll View](/user-manual/editor/scenes/components/scrollview/) | [Engine component](/user-manual/user-interface/scroll-views/#creating-a-scroll-view) | [`<pc-scroll-view>`](/user-manual/web-components/tags/pc-scroll-view/) | [ScrollViewComponent](https://api.playcanvas.com/engine/classes/ScrollViewComponent.html) |
| Scrollbar | A draggable handle on a track, for scroll views and sliders | [Scrollbar](/user-manual/editor/scenes/components/scrollbar/) | [Engine component](/user-manual/user-interface/scroll-views/#creating-a-scroll-view) | [`<pc-scrollbar>`](/user-manual/web-components/tags/pc-scrollbar/) | [ScrollbarComponent](https://api.playcanvas.com/engine/classes/ScrollbarComponent.html) |

PlayCanvas React has components for screens and elements. The others are added as engine components, with a small helper that each page shows.

## In This Section {#in-this-section}

- [Getting Started](/user-manual/user-interface/user-interface-basics/) - Setting up UI on each surface, and a first interface.
- **Layout**
  - [Screens](/user-manual/user-interface/screens/) - Screen space and world space, scaling to any canvas, pixel ratio and priority.
  - [Elements](/user-manual/user-interface/elements/) - Anchors, pivots, margins, sizes and group elements.
  - [Layout Groups](/user-manual/user-interface/layout-groups/) - Rows, columns and grids that arrange their children.
  - [Safe Areas](/user-manual/user-interface/safe-area/) - Keeping an interface clear of notches and rounded corners.
- **Images**
  - [Image Elements](/user-manual/user-interface/image-elements/) - Colors, textures, sprites, 9-slicing, 3D in an image and custom materials.
  - [Masks](/user-manual/user-interface/masks/) - Clipping children to a rectangle or a shape.
- **Text**
  - [Text Elements](/user-manual/user-interface/text-elements/) - Size, wrapping, fitting, justification, markup, outlines and shadows.
  - [Fonts](/user-manual/user-interface/fonts/) - Creating and loading font assets, and choosing their characters.
  - [Localization](/user-manual/user-interface/localization/) - Translations, plurals, locales and fonts for each language.
- **Interaction**
  - [Input](/user-manual/user-interface/input/) - Mouse, touch and XR events, bubbling, and keeping UI input from the game.
  - [Buttons](/user-manual/user-interface/buttons/) - Hover and press states, tints, sprites and events.
  - [Scroll Views](/user-manual/user-interface/scroll-views/) - Scrolling content by dragging, the wheel and scrollbars.
- [Common Widgets](/user-manual/user-interface/common-widgets/) - Progress bars, sliders, toggles, dialogs, lists, drag and drop and more.
- **World Space and XR**
  - [World-Space UI](/user-manual/user-interface/world-space-ui/) - Interfaces in the scene, and labels over characters.
  - [UI in XR](/user-manual/user-interface/xr/) - Panels, pointing, hands and menus in immersive sessions.
- [HTML and CSS](/user-manual/user-interface/html-and-css/) - Interfaces built with the DOM over the canvas.
- [Draw Order and Performance](/user-manual/user-interface/draw-order-and-performance/) - How UI is drawn, and keeping it fast.
- [Troubleshooting](/user-manual/user-interface/troubleshooting/) - Common problems and their causes.

## See Also

- [User Interface - Buttons](/tutorials/ui-elements-buttons/), [Leaderboard](/tutorials/ui-elements-leaderboard/) and [Progress Bar](/tutorials/ui-elements-progress/) - Tutorials that build interfaces in the Editor
- [User Interface - Text Input](/tutorials/ui-text-input/) - Tutorial that builds a text field
- [Touchscreen Joypad Controls](/tutorials/touch-joypad/) - Tutorial that builds on-screen joysticks
- [2D](/user-manual/2D/) - Sprites, texture atlases and 9-slicing
- [PCUI](https://playcanvas.github.io/pcui/) - The HTML component library for building tools and editors
