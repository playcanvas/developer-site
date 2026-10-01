---
title: Troubleshooting
description: Find the cause of common user interface problems, such as invisible text, ignored clicks, buttons that don't change, tiny or huge interfaces, scroll views that won't scroll, empty masks, text that won't wrap, untranslated keys, and interfaces drawn twice or through walls.
---

Each section below starts from what you see, lists the usual causes, most likely first, and links to the page that explains each one.

## Text {#text}

### Text Doesn't Appear {#text-doesnt-appear}

- **No font.** A text element draws nothing without a loaded [font asset](/user-manual/user-interface/fonts/#using-a-font-asset). In the Engine, the application needs `pc.FontHandler`, and the font must have finished loading.
- **Missing characters.** Characters that aren't in the font are drawn as spaces, and the console warns about each one. Add them to the font. See [Choosing Characters](/user-manual/user-interface/fonts/#choosing-characters).
- **Its color or opacity.** Text of the same color as the panel behind it, or with an `opacity` of 0, is there but can't be seen.
- **Outside the screen.** An element created without an anchor sits at the bottom-left corner of its parent, and can be off the visible area. See [Anchor](/user-manual/user-interface/elements/#anchor).

### Text Doesn't Wrap {#text-doesnt-wrap}

Wrapping needs **Wrap Lines**, and a width to wrap at: turn **Auto Width** off and set a width, or split the element's anchor horizontally. See [Sizing, Wrapping and Line Limits](/user-manual/user-interface/text-elements/#sizing-wrapping-and-line-limits).

### Text Doesn't Shrink to Fit {#text-doesnt-shrink}

**Auto Fit Width** and **Auto Fit Height** only work with **Auto Width** and **Auto Height** off. See [Shrinking to Fit](/user-manual/user-interface/text-elements/#shrinking-to-fit).

### Markup Shows as Text {#markup-shows-as-text}

Markup needs **Enable Markup**. With it on, a text with a markup error, such as an unclosed tag, is drawn as written, and the console reports the error. See [Markup](/user-manual/user-interface/text-elements/#markup).

## Input {#input}

### Clicks Are Ignored {#clicks-are-ignored}

- **No `ElementInput`.** In the Engine, the application needs one. See [Setting Up](/user-manual/user-interface/user-interface-basics/#setting-up).
- **Input is off.** Only elements with **Use Input** on receive input. See [Enabling UI Input](/user-manual/user-interface/input/#enabling-ui-input).
- **Another element is on top.** An element with input enabled that is drawn over it, such as an invisible group, receives the click instead. See [Which Element Gets the Event](/user-manual/user-interface/input/#hit-testing).
- **The camera doesn't render its layer.** Elements are tested only through the cameras that render their layers.
- **A mask clips it.** Inside a mask, only the part within the mask's rectangle receives input. See [Masks and Input](/user-manual/user-interface/masks/#masks-and-input).
- **The pointer is locked.** Mouse presses are ignored while the pointer is locked. See [Pointer Lock](/user-manual/user-interface/input/#pointer-lock).
- **The button is inactive.** A button with `active` off fires no button events. See [Disabling a Button](/user-manual/user-interface/buttons/#disabling-a-button).
- **It's the Editor's viewport.** UI doesn't respond to input in the viewport. Launch the scene.

### A Click on the UI Also Reaches the Game {#click-reaches-the-game}

Stop the event from propagating in the UI's `mousedown` and `touchstart` handlers, and create the `ElementInput` before the mouse and touch devices. See [Keeping UI Input from Reaching the Game](/user-manual/user-interface/input/#blocking-game-input). For HTML over the canvas, see [Keeping HTML Input Away from the Game](/user-manual/user-interface/html-and-css/#keeping-input-away).

### A Tap Clicks What Is Behind a Button {#tap-clicks-behind}

After a tap, the browser sends emulated mouse events, which reach what is behind a button that hid itself when it was tapped. Cancel the canvas's `touchend` events. See [Touch Screens](/user-manual/user-interface/input/#touch-screens).

## Buttons {#buttons}

### A Button Doesn't Change When Hovered or Pressed {#button-doesnt-change}

- **No image entity.** In the Engine, a button's `imageEntity` is `null` until you set it, and a button without one never changes its look. See [The Image](/user-manual/user-interface/buttons/#the-image).
- **Touch.** A touch has no hover state. See [Touch and XR](/user-manual/user-interface/buttons/#touch-and-xr).

### A Button Turns Grey or Opaque When Hovered {#button-turns-grey}

A tint replaces the image's color and opacity, and the default tints are grey and opaque. Set tints that match the button. See [Tint](/user-manual/user-interface/buttons/#tint).

## Size and Scale {#size-and-scale}

### The Interface Is Tiny, Huge or Doesn't Fit {#interface-size}

- **Scale Mode None.** Without Blend, an interface is built in pixels and doesn't follow the size of the canvas. See [Scaling with Blend](/user-manual/user-interface/screens/#scaling-with-blend).
- **The pixel ratio.** With Scale Mode None, a higher pixel ratio makes the interface smaller. See [Pixel Ratio](/user-manual/user-interface/screens/#pixel-ratio).
- **The Scale Blend.** In portrait, a Scale Blend of 1 makes an interface designed for landscape too wide. See [Choosing the Scale Blend](/user-manual/user-interface/screens/#scale-blend).
- **A world-space screen's scale.** Its size in meters is its resolution times its entity's scale. See [Size and Scale](/user-manual/user-interface/world-space-ui/#size-and-scale).

### The Interface Is Squashed {#interface-squashed}

The camera has a `rect` that covers only part of the canvas, which squashes screen-space screens into it. See [Layers and Cameras](/user-manual/user-interface/draw-order-and-performance/#layers-and-cameras).

## Scroll Views and Layouts {#scroll-views-and-layouts}

### A Scroll View Doesn't Scroll {#scroll-view-doesnt-scroll}

- **The content has no input.** The content element needs **Use Input** on to be dragged by its empty areas.
- **The content isn't larger than the viewport.** A scroll view never sizes its content. See [Sizing the Content](/user-manual/user-interface/scroll-views/#sizing-the-content).
- **No axis, scroll mode or friction.** A scroll view created in code has none of them until you set them. See [Creating a Scroll View](/user-manual/user-interface/scroll-views/#creating-a-scroll-view).
- **No mouse device.** In the Engine, dragging with the mouse needs a `pc.Mouse`.

### Part of the Scrolled Content Is Out of View {#scroll-content-out-of-view}

The scroll view places the content by its pivot, which must be the content's top-left corner, `[0, 1]`. With a centered pivot, half of the content starts off the viewport's left or top edge. See [Scroll Views](/user-manual/user-interface/scroll-views/).

### Elements Ignore Their Anchors or Positions in a Layout Group {#layout-ignores-anchors}

A layout group sets the anchors, positions and calculated sizes of its children. Exclude a child with a layout child whose **Exclude from Layout** is on. See [How Children Are Placed](/user-manual/user-interface/layout-groups/#how-children-are-placed).

## Images and Masks {#images-and-masks}

### A Mask Shows Nothing {#mask-shows-nothing}

- **Its opacity is below 1.** A mask with an opacity below 1 hides all of its children. See [Shaped Masks](/user-manual/user-interface/masks/#shaped-masks).
- **Its children are on another layer.** A mask and the elements it clips must be on the same layer. See [Masks and Layers](/user-manual/user-interface/masks/#masks-and-layers).
- **Its texture is partly transparent.** Only the fully opaque pixels of a mask's texture show its children.

### A Custom Material Is Invisible {#material-invisible}

The UI layer draws only transparent materials. Set the material's `blendType` so that it blends. See [Custom Materials](/user-manual/user-interface/image-elements/#custom-materials).

### Images Have Dark or Light Edges {#dark-edges}

The transparent pixels of the texture have a color that filtering blends into the visible edges. See [Avoiding Dark Edges](/user-manual/user-interface/image-elements/#dark-edges).

## Localization {#localization}

### A Localized Text Shows Its Key {#text-shows-key}

- **No message for the key,** in the current locale or its fallbacks.
- **The files haven't loaded.** `app.i18n` doesn't load localization files. In the Editor, keep **Preload** on for them. See [Loading the Files](/user-manual/user-interface/localization/#loading-the-files).

### A Localized Text Shows `{number}` {#text-shows-number}

The key is that of a plural message. A text element with such a key shows the message's first form, with `{number}` left in. Set the text from a script with `getPluralText` instead. See [Strings in Scripts](/user-manual/user-interface/localization/#strings-in-scripts).

### Text Disappears When the Locale Changes {#text-disappears-on-locale-change}

The locale has its own font, and the text is not drawn until that font has loaded. See [Localized Fonts](/user-manual/user-interface/localization/#localized-fonts).

## Drawing {#drawing}

### The Interface Is Drawn Twice {#drawn-twice}

Two cameras render the UI layer. Remove it from the other camera. See [Layers and Cameras](/user-manual/user-interface/draw-order-and-performance/#layers-and-cameras).

### Elements Are Drawn in the Wrong Order {#wrong-order}

Elements are drawn in the order of the hierarchy, so move the element that should be on top after the others. See [Draw Order](/user-manual/user-interface/draw-order-and-performance/#draw-order). In React, `<Entity>` adds new entities after their siblings, whatever their place in the JSX. When screens overlap, give them different priorities. See [Multiple Screens and Priority](/user-manual/user-interface/draw-order-and-performance/#multiple-screens).

### A World-Space Interface Disappears from Behind {#world-ui-disappears}

World-space screens are one-sided. See [Seen from Behind](/user-manual/user-interface/world-space-ui/#seen-from-behind).

### A World-Space Interface Shows Through Walls {#world-ui-through-walls}

The camera renders through a CameraFrame, which draws the UI layer without the scene's depth. See [World-Space UI and Post-Processing](/user-manual/user-interface/draw-order-and-performance/#world-space-ui).

## See Also

- [Getting Started](/user-manual/user-interface/user-interface-basics/) - Setting up UI on each surface
- [Input](/user-manual/user-interface/input/) - How UI input works
- [Draw Order and Performance](/user-manual/user-interface/draw-order-and-performance/) - How UI is drawn
