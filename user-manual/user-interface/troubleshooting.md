# Troubleshooting

Each section below starts from what you see, lists the usual causes, most likely first, and links to the page that explains each one.

## Text

### Text Doesn't Appear

- **No font.** A text element draws nothing without a loaded [font asset](https://developer.playcanvas.com/user-manual/user-interface/fonts.md#using-a-font-asset). In the Engine, the application needs `pc.FontHandler`, and the font must have finished loading.
- **Missing characters.** Characters that aren't in the font are drawn as spaces, and the console warns about each one. Add them to the font. See [Choosing Characters](https://developer.playcanvas.com/user-manual/user-interface/fonts.md#choosing-characters).
- **Its color or opacity.** Text of the same color as the panel behind it, or with an `opacity` of 0, is there but can't be seen.
- **Outside the screen.** An element created without an anchor sits at the bottom-left corner of its parent, and can be off the visible area. See [Anchor](https://developer.playcanvas.com/user-manual/user-interface/elements.md#anchor).

### Text Doesn't Wrap

Wrapping needs **Wrap Lines**, and a width to wrap at: turn **Auto Width** off and set a width, or split the element's anchor horizontally. See [Sizing, Wrapping and Line Limits](https://developer.playcanvas.com/user-manual/user-interface/text-elements.md#sizing-wrapping-and-line-limits).

### Text Doesn't Shrink to Fit

**Auto Fit Width** and **Auto Fit Height** only work with **Auto Width** and **Auto Height** off. See [Shrinking to Fit](https://developer.playcanvas.com/user-manual/user-interface/text-elements.md#shrinking-to-fit).

### Markup Shows as Text

Markup needs **Enable Markup**. With it on, a text with a markup error, such as an unclosed tag, is drawn as written, and the console reports the error. See [Markup](https://developer.playcanvas.com/user-manual/user-interface/text-elements.md#markup).

## Input

### Clicks Are Ignored

- **No `ElementInput`.** In the Engine, the application needs one. See [Setting Up](https://developer.playcanvas.com/user-manual/user-interface/user-interface-basics.md#setting-up).
- **Input is off.** Only elements with **Use Input** on receive input. See [Enabling UI Input](https://developer.playcanvas.com/user-manual/user-interface/input.md#enabling-ui-input).
- **Another element is on top.** An element with input enabled that is drawn over it, such as an invisible group, receives the click instead. See [Which Element Gets the Event](https://developer.playcanvas.com/user-manual/user-interface/input.md#hit-testing).
- **The camera doesn't render its layer.** Elements are tested only through the cameras that render their layers.
- **A mask clips it.** Inside a mask, only the part within the mask's rectangle receives input. See [Masks and Input](https://developer.playcanvas.com/user-manual/user-interface/masks.md#masks-and-input).
- **The pointer is locked.** Mouse presses are ignored while the pointer is locked. See [Pointer Lock](https://developer.playcanvas.com/user-manual/user-interface/input.md#pointer-lock).
- **The button is inactive.** A button with `active` off fires no button events. See [Disabling a Button](https://developer.playcanvas.com/user-manual/user-interface/buttons.md#disabling-a-button).
- **It's the Editor's viewport.** UI doesn't respond to input in the viewport. Launch the scene.

### A Click on the UI Also Reaches the Game

Stop the event from propagating in the UI's `mousedown` and `touchstart` handlers, and create the `ElementInput` before the mouse and touch devices. See [Keeping UI Input from Reaching the Game](https://developer.playcanvas.com/user-manual/user-interface/input.md#blocking-game-input). For HTML over the canvas, see [Keeping HTML Input Away from the Game](https://developer.playcanvas.com/user-manual/user-interface/html-and-css.md#keeping-input-away).

### A Tap Clicks What Is Behind a Button

After a tap, the browser sends emulated mouse events, which reach what is behind a button that hid itself when it was tapped. Cancel the canvas's `touchend` events. See [Touch Screens](https://developer.playcanvas.com/user-manual/user-interface/input.md#touch-screens).

## Buttons

### A Button Doesn't Change When Hovered or Pressed

- **No image entity.** In the Engine, a button's `imageEntity` is `null` until you set it, and a button without one never changes its look. See [The Image](https://developer.playcanvas.com/user-manual/user-interface/buttons.md#the-image).
- **Touch.** A touch has no hover state. See [Touch and XR](https://developer.playcanvas.com/user-manual/user-interface/buttons.md#touch-and-xr).

### A Button Turns Grey or Opaque When Hovered

A tint replaces the image's color and opacity, and the default tints are grey and opaque. Set tints that match the button. See [Tint](https://developer.playcanvas.com/user-manual/user-interface/buttons.md#tint).

## Size and Scale

### The Interface Is Tiny, Huge or Doesn't Fit

- **Scale Mode None.** Without Blend, an interface is built in pixels and doesn't follow the size of the canvas. See [Scaling with Blend](https://developer.playcanvas.com/user-manual/user-interface/screens.md#scaling-with-blend).
- **The pixel ratio.** With Scale Mode None, a higher pixel ratio makes the interface smaller. See [Pixel Ratio](https://developer.playcanvas.com/user-manual/user-interface/screens.md#pixel-ratio).
- **The Scale Blend.** In portrait, a Scale Blend of 1 makes an interface designed for landscape too wide. See [Choosing the Scale Blend](https://developer.playcanvas.com/user-manual/user-interface/screens.md#scale-blend).
- **A world-space screen's scale.** Its size in meters is its resolution times its entity's scale. See [Size and Scale](https://developer.playcanvas.com/user-manual/user-interface/world-space-ui.md#size-and-scale).

### The Interface Is Squashed

The camera has a `rect` that covers only part of the canvas, which squashes screen-space screens into it. See [Layers and Cameras](https://developer.playcanvas.com/user-manual/user-interface/draw-order-and-performance.md#layers-and-cameras).

## Scroll Views and Layouts

### A Scroll View Doesn't Scroll

- **The content has no input.** The content element needs **Use Input** on to be dragged by its empty areas.
- **The content isn't larger than the viewport.** A scroll view never sizes its content. See [Sizing the Content](https://developer.playcanvas.com/user-manual/user-interface/scroll-views.md#sizing-the-content).
- **No axis, scroll mode or friction.** A scroll view created in code has none of them until you set them. See [Creating a Scroll View](https://developer.playcanvas.com/user-manual/user-interface/scroll-views.md#creating-a-scroll-view).
- **No mouse device.** In the Engine, dragging with the mouse needs a `pc.Mouse`.

### Part of the Scrolled Content Is Out of View

The scroll view places the content by its pivot, which must be the content's top-left corner, `[0, 1]`. With a centered pivot, half of the content starts off the viewport's left or top edge. See [Scroll Views](https://developer.playcanvas.com/user-manual/user-interface/scroll-views.md).

### Elements Ignore Their Anchors or Positions in a Layout Group

A layout group sets the anchors, positions and calculated sizes of its children. Exclude a child with a layout child whose **Exclude from Layout** is on. See [How Children Are Placed](https://developer.playcanvas.com/user-manual/user-interface/layout-groups.md#how-children-are-placed).

## Images and Masks

### A Mask Shows Nothing

- **Its opacity is below 1.** A mask with an opacity below 1 hides all of its children. See [Shaped Masks](https://developer.playcanvas.com/user-manual/user-interface/masks.md#shaped-masks).
- **Its children are on another layer.** A mask and the elements it clips must be on the same layer. See [Masks and Layers](https://developer.playcanvas.com/user-manual/user-interface/masks.md#masks-and-layers).
- **Its texture is partly transparent.** Only the fully opaque pixels of a mask's texture show its children.

### A Custom Material Is Invisible

The UI layer draws only transparent materials. Set the material's `blendType` so that it blends. See [Custom Materials](https://developer.playcanvas.com/user-manual/user-interface/image-elements.md#custom-materials).

### Images Have Dark or Light Edges

The transparent pixels of the texture have a color that filtering blends into the visible edges. See [Avoiding Dark Edges](https://developer.playcanvas.com/user-manual/user-interface/image-elements.md#dark-edges).

## Localization

### A Localized Text Shows Its Key

- **No message for the key,** in the current locale or its fallbacks.
- **The files haven't loaded.** `app.i18n` doesn't load localization files. In the Editor, keep **Preload** on for them. See [Loading the Files](https://developer.playcanvas.com/user-manual/user-interface/localization.md#loading-the-files).

### A Localized Text Shows `{number}`

The key is that of a plural message. A text element with such a key shows the message's first form, with `{number}` left in. Set the text from a script with `getPluralText` instead. See [Strings in Scripts](https://developer.playcanvas.com/user-manual/user-interface/localization.md#strings-in-scripts).

### Text Disappears When the Locale Changes

The locale has its own font, and the text is not drawn until that font has loaded. See [Localized Fonts](https://developer.playcanvas.com/user-manual/user-interface/localization.md#localized-fonts).

## Drawing

### The Interface Is Drawn Twice

Two cameras render the UI layer. Remove it from the other camera. See [Layers and Cameras](https://developer.playcanvas.com/user-manual/user-interface/draw-order-and-performance.md#layers-and-cameras).

### Elements Are Drawn in the Wrong Order

Elements are drawn in the order of the hierarchy, so move the element that should be on top after the others. See [Draw Order](https://developer.playcanvas.com/user-manual/user-interface/draw-order-and-performance.md#draw-order). In React, `<Entity>` adds new entities after their siblings, whatever their place in the JSX. When screens overlap, give them different priorities. See [Multiple Screens and Priority](https://developer.playcanvas.com/user-manual/user-interface/draw-order-and-performance.md#multiple-screens).

### A World-Space Interface Disappears from Behind

World-space screens are one-sided. See [Seen from Behind](https://developer.playcanvas.com/user-manual/user-interface/world-space-ui.md#seen-from-behind).

### A World-Space Interface Shows Through Walls

The camera renders through a CameraFrame, which draws the UI layer without the scene's depth. See [World-Space UI and Post-Processing](https://developer.playcanvas.com/user-manual/user-interface/draw-order-and-performance.md#world-space-ui).

## See Also

- [Getting Started](https://developer.playcanvas.com/user-manual/user-interface/user-interface-basics.md) - Setting up UI on each surface
- [Input](https://developer.playcanvas.com/user-manual/user-interface/input.md) - How UI input works
- [Draw Order and Performance](https://developer.playcanvas.com/user-manual/user-interface/draw-order-and-performance.md) - How UI is drawn
