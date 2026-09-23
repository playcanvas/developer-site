# `<Element/>`

The `<Element/>` component draws 2D UI content — text, an image, or an invisible group — on an [`<Entity/>`](https://developer.playcanvas.com/user-manual/react/api/entity.md). Elements live under a [`<Screen/>`](https://developer.playcanvas.com/user-manual/react/api/screen.md), which positions them in screen or world space. Set the `type` prop to `"text"`, `"image"` or `"group"`, and use `anchor` and `pivot` to control how the element is positioned and resized within its parent.

## Usage

Add an `<Element/>` to an [`<Entity/>`](https://developer.playcanvas.com/user-manual/react/api/entity.md) that descends from a [`<Screen/>`](https://developer.playcanvas.com/user-manual/react/api/screen.md). For text, set `type="text"` and supply a font via `fontAsset` (load one with [`useFont`](https://developer.playcanvas.com/user-manual/react/api/hooks/use-asset.md#usefont)).

```tsx
<Entity name="label">
  <Element
    type="text"
    fontAsset={font}
    text="Hello, World!"
    fontSize={84}
    anchor={[0.5, 0.5, 0.5, 0.5]}
    pivot={[0.5, 0.5]}
  />
</Entity>
```

The example below renders screen-space text. The font is an MSDF asset created with [font-tools](https://developer.playcanvas.com/user-manual/user-interface/fonts.md) and loaded with [`useFont`](https://developer.playcanvas.com/user-manual/react/api/hooks/use-asset.md#usefont).

**Screen-space text**

```jsx title="TextExample.jsx"
import { Application, Entity } from '@playcanvas/react';
import { Camera, Screen, Element } from '@playcanvas/react/components';
import { useFont } from '@playcanvas/react/hooks';

const TextScene = () => {
  // An MSDF font asset generated with font-tools (https://playcanvas.github.io/font-tools/).
  // Loading the .json automatically pulls in the sibling .png atlas page(s).
  const { asset: font } = useFont('/assets/fonts/source-sans.json');

  if (!font) return null;

  return (
    <Entity>
      {/* A camera to render the UI */}
      <Entity name="camera">
        <Camera clearColor="#1a1a2e" />
      </Entity>

      {/* A screen-space UI screen with a centred line of text */}
      <Entity name="screen">
        <Screen referenceResolution={[1280, 720]} />
        <Entity name="label">
          <Element
            type="text"
            fontAsset={font}
            text="Hello, World!"
            fontSize={84}
            anchor={[0.5, 0.5, 0.5, 0.5]}
            pivot={[0.5, 0.5]}
          />
        </Entity>
      </Entity>
    </Entity>
  );
};

const TextExample = () => (
  <Application>
    <TextScene />
  </Application>
);

export default TextExample;
```

Learn more about the [Element Component](https://api.playcanvas.com/engine/classes/ElementComponent.html) in the PlayCanvas documentation.

## Properties

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `screen?` | `Entity \| null` | - | The Entity with a ScreenComponent that this component belongs to. This is automatically set when the component is a child of a ScreenComponent. |
| `anchor?` | `[number, number, number, number]` | - | Sets the anchor for this element component. Specifies where the left, bottom, right and top edges of the component are anchored relative to its parent. Each value ranges from 0 to 1. e.g. a value of `[0, 0, 0, 0]` means that the element will be anchored to the bottom left of its parent. A value of `[1, 1, 1, 1]` means it will be anchored to the top right. A split anchor is when the left-right or top-bottom pairs of the anchor are not equal. In that case, the component will be resized to cover that entire area. For example, a value of `[0, 0, 1, 1]` will make the component resize exactly as its parent. Gets the anchor for this element component. Use the setter to update the anchor. |
| `batchGroupId?` | `number` | - | Sets the batch group (see BatchGroup) for this element. Default is -1 (no group). Gets the batch group (see BatchGroup) for this element. |
| `bottom?` | `number` | - | Sets the distance from the bottom edge of the anchor. Can be used in combination with a split anchor to make the component's top edge always be 'top' units away from the top. Gets the distance from the bottom edge of the anchor. |
| `calculatedWidth?` | `number` | - | Sets the width at which the element will be rendered. In most cases this will be the same as width. However, in some cases the engine may calculate a different width for the element, such as when the element is under the control of a LayoutGroupComponent. In these scenarios, `calculatedWidth` may be smaller or larger than the width that was set in the editor. Gets the width at which the element will be rendered. |
| `calculatedHeight?` | `number` | - | Sets the height at which the element will be rendered. In most cases this will be the same as height. However, in some cases the engine may calculate a different height for the element, such as when the element is under the control of a LayoutGroupComponent. In these scenarios, `calculatedHeight` may be smaller or larger than the height that was set in the editor. Gets the height at which the element will be rendered. |
| `drawOrder?` | `number` | - | Sets the draw order of the component. A higher value means that the component will be rendered on top of other components. Gets the draw order of the component. |
| `height?` | `number` | - | Sets the height of the element as set in the editor. Note that in some cases this may not reflect the true height at which the element is rendered, such as when the element is under the control of a LayoutGroupComponent. See calculatedHeight in order to ensure you are reading the true height at which the element will be rendered. Gets the height of the element. |
| `layers?` | `readonly number[]` | - | Sets the array of layer IDs (Layer#id ) to which this element should belong. Don't push, pop, splice or modify this array. If you want to change it, set a new one instead. Gets the array of layer IDs (Layer#id ) to which this element belongs. |
| `left?` | `number` | - | Sets the distance from the left edge of the anchor. Can be used in combination with a split anchor to make the component's left edge always be 'left' units away from the left. Gets the distance from the left edge of the anchor. |
| `margin?` | `[number, number, number, number]` | - | Sets the distance from the left, bottom, right and top edges of the anchor. For example, if we are using a split anchor like `[0, 0, 1, 1]` and the margin is `[0, 0, 0, 0]` then the component will be the same width and height as its parent. Gets the distance from the left, bottom, right and top edges of the anchor. Use the setter to update the margin. |
| `pivot?` | `[number, number]` | - | Sets the position of the pivot of the component relative to its anchor. Each value ranges from 0 to 1 where `[0, 0]` is the bottom left and `[1, 1]` is the top right. Gets the position of the pivot of the component relative to its anchor. Use the setter to update the pivot. |
| `right?` | `number` | - | Sets the distance from the right edge of the anchor. Can be used in combination with a split anchor to make the component's right edge always be 'right' units away from the right. Gets the distance from the right edge of the anchor. |
| `top?` | `number` | - | Sets the distance from the top edge of the anchor. Can be used in combination with a split anchor to make the component's bottom edge always be 'bottom' units away from the bottom. Gets the distance from the top edge of the anchor. |
| `type?` | `string` | - | Sets the type of the ElementComponent. Can be: - ELEMENTTYPE_GROUP: The component can be used as a layout mechanism to create groups of ElementComponents e.g. panels. - ELEMENTTYPE_IMAGE: The component will render an image - ELEMENTTYPE_TEXT: The component will render text Gets the type of the ElementComponent. |
| `useInput?` | `boolean` | - | Sets whether the component will receive mouse and touch input events. Gets whether the component will receive mouse and touch input events. |
| `fitMode?` | `string` | - | Sets the fit mode of the element. Controls how the content should be fitted and preserve the aspect ratio of the source texture or sprite. Only works for ELEMENTTYPE_IMAGE elements. Can be: - FITMODE_STRETCH: Fit the content exactly to Element's bounding box. - FITMODE_CONTAIN: Fit the content within the Element's bounding box while preserving its Aspect Ratio. - FITMODE_COVER: Fit the content to cover the entire Element's bounding box while preserving its Aspect Ratio. Gets the fit mode of the element. |
| `width?` | `number` | - | Sets the width of the element as set in the editor. Note that in some cases this may not reflect the true width at which the element is rendered, such as when the element is under the control of a LayoutGroupComponent. See calculatedWidth in order to ensure you are reading the true width at which the element will be rendered. Gets the width of the element. |
| `fontSize?` | `number` | - | Sets the size of the font. Measured in the same units as the element's width and height, so its on-screen size depends on whether the element is screen-space or in world space. Defaults to 32. Only works for ELEMENTTYPE_TEXT elements. Gets the size of the font. |
| `minFontSize?` | `number` | - | Sets the minimum size that the font can scale to when autoFitWidth or autoFitHeight are true. Defaults to 8. Gets the minimum size that the font can scale to when autoFitWidth or autoFitHeight are true. |
| `maxFontSize?` | `number` | - | Sets the maximum size that the font can scale to when autoFitWidth or autoFitHeight are true. Defaults to 32. Gets the maximum size that the font can scale to when autoFitWidth or autoFitHeight are true. |
| `maxLines?` | `number \| null` | - | Sets the maximum number of lines that the Element can wrap to. Any leftover text will be appended to the last line. Set this to null to allow unlimited lines. Gets the maximum number of lines that the Element can wrap to. Returns -1 if there is no limit. |
| `autoFitWidth?` | `boolean` | - | Sets whether the font size and line height will scale so that the text fits inside the width of the Element. The font size will be scaled between minFontSize and maxFontSize. The value of autoFitWidth will be ignored if autoWidth is true. Gets whether the font size and line height will scale so that the text fits inside the width of the Element. |
| `autoFitHeight?` | `boolean` | - | Sets whether the font size and line height will scale so that the text fits inside the height of the Element. The font size will be scaled between minFontSize and maxFontSize. The value of autoFitHeight will be ignored if autoHeight is true. Gets whether the font size and line height will scale so that the text fits inside the height of the Element. |
| `color?` | `string` | - | Sets the color of the image for ELEMENTTYPE_IMAGE elements or the color of the text for ELEMENTTYPE_TEXT elements, specified in sRGB color space. Only the RGB channels are used; the alpha channel is ignored, so use opacity to control transparency. Gets the color of the element. Use the setter to update the color. |
| `font?` | `Font \| CanvasFont` | - | Sets the font used for rendering the text. Only works for ELEMENTTYPE_TEXT elements. Gets the font used for rendering the text. |
| `fontAsset?` | `number \| Asset \| null` | - | Sets the font asset used for rendering the text, as either an Asset or an asset id. Only works for ELEMENTTYPE_TEXT elements. Gets the id of the font asset used for rendering the text. |
| `spacing?` | `number` | - | Sets the spacing between the letters of the text, as a multiplier on the default character advance, defaulting to 1 (normal spacing). Values below 1 tighten the text and values above 1 spread it out. Only works for ELEMENTTYPE_TEXT elements. Gets the spacing between the letters of the text. |
| `lineHeight?` | `number` | - | Sets the height of each line of text, measured in the same units as fontSize. This is independent of fontSize, so it can be used to tighten or loosen vertical line spacing. Defaults to 32. Only works for ELEMENTTYPE_TEXT elements. Gets the height of each line of text. |
| `wrapLines?` | `boolean` | - | Sets whether to automatically wrap lines based on the element width. Only works for ELEMENTTYPE_TEXT elements, and when autoWidth is set to false. Gets whether to automatically wrap lines based on the element width. |
| `justify?` | `boolean` | - | Sets whether wrapped lines are stretched to be flush with both edges of the element, by widening the gaps between their words. The last line of the text and any line ended by an explicit line break are not stretched, and follow alignment instead - as does a line with no gaps to widen. Only works for ELEMENTTYPE_TEXT elements, and only has an effect when wrapLines is set to true and the element has a fixed width. Gets whether wrapped lines are stretched to be flush with both edges of the element. |
| `alignment?` | `[number, number]` | - | Sets the horizontal and vertical alignment of the text. Values range from 0 to 1 where `[0, 0]` is the bottom left and `[1, 1]` is the top right. Only works for ELEMENTTYPE_TEXT elements. Gets the horizontal and vertical alignment of the text. |
| `autoWidth?` | `boolean` | - | Sets whether to automatically set the width of the component to be the same as the textWidth. Only works for ELEMENTTYPE_TEXT elements. Gets whether to automatically set the width of the component to be the same as the textWidth. |
| `autoHeight?` | `boolean` | - | Sets whether to automatically set the height of the component to be the same as the textHeight. Only works for ELEMENTTYPE_TEXT elements. Gets whether to automatically set the height of the component to be the same as the textHeight. |
| `rtlReorder?` | `boolean` | - | Sets whether to reorder the text for RTL languages. The reordering uses a function registered by `app.systems.element.registerRtlReorder`. Gets whether to reorder the text for RTL languages. |
| `unicodeConverter?` | `boolean` | - | Sets whether to convert unicode characters. This uses a function registered by `app.systems.element.registerUnicodeConverter`. Gets whether to convert unicode characters. |
| `text?` | `string` | - | Sets the text to render. Only works for ELEMENTTYPE_TEXT elements. To override certain text styling properties on a per-character basis, the text can optionally include markup tags contained within square brackets. Supported tags are: 1. `color` - override the element's color property. Examples: - `[color="#ff0000"]red text[/color]` - `[color="#00ff00"]green text[/color]` - `[color="#0000ff"]blue text[/color]` 2. `outline` - override the element's outlineColor and outlineThickness properties. Example: - `[outline color="#ffffff" thickness="0.5"]text[/outline]` 3. `shadow` - override the element's shadowColor and shadowOffset properties. Examples: - `[shadow color="#ffffff" offset="0.5"]text[/shadow]` - `[shadow color="#000000" offsetX="0.1" offsetY="0.2"]text[/shadow]` Note that markup tags are only processed if the text element's enableMarkup property is set to true. Gets the text to render. |
| `key?` | `string` | - | Sets the localization key to use to get the localized text from Application#i18n . Only works for ELEMENTTYPE_TEXT elements. Gets the localization key to use to get the localized text from Application#i18n . |
| `texture?` | `Texture` | - | Sets the texture to render. Only works for ELEMENTTYPE_IMAGE elements. Gets the texture to render. |
| `textureAsset?` | `number \| Asset \| null` | - | Sets the texture asset to render, as either an Asset or an asset id. Only works for ELEMENTTYPE_IMAGE elements. Gets the id of the texture asset to render. |
| `material?` | `Material` | - | Sets the material to use when rendering an image. Only works for ELEMENTTYPE_IMAGE elements. Gets the material to use when rendering an image. |
| `materialAsset?` | `number \| Asset \| null` | - | Sets the material asset to use when rendering an image, as either an Asset or an asset id. Only works for ELEMENTTYPE_IMAGE elements. Gets the id of the material asset to use when rendering an image. |
| `sprite?` | `Sprite` | - | Sets the sprite to render. Only works for ELEMENTTYPE_IMAGE elements that can render either a texture or a sprite. Gets the sprite to render. |
| `spriteAsset?` | `number \| Asset \| null` | - | Sets the sprite asset to render, as either an Asset or an asset id. Only works for ELEMENTTYPE_IMAGE elements that can render either a texture or a sprite. Gets the id of the sprite asset to render. |
| `spriteFrame?` | `number` | - | Sets the frame of the sprite to render. Only works for ELEMENTTYPE_IMAGE elements that have a sprite assigned. Gets the frame of the sprite to render. |
| `pixelsPerUnit?` | `number \| null` | - | Sets the number of pixels that map to one PlayCanvas unit. Only affects ELEMENTTYPE_IMAGE elements with a sliced or tiled sprite assigned. Set to null to use the sprite's own pixels-per-unit value. Gets the number of pixels that map to one PlayCanvas unit. |
| `opacity?` | `number` | - | Sets the opacity of the element. This works for both ELEMENTTYPE_IMAGE and ELEMENTTYPE_TEXT elements. Gets the opacity of the element. |
| `rect?` | `Readonly<Vec4> \| null` | - | Sets the region of the texture to use in order to render an image. Values range from 0 to 1 and indicate u, v, width, height. Only works for ELEMENTTYPE_IMAGE elements. Gets the region of the texture to use in order to render an image. Use the setter to update the region. |
| `mask?` | `boolean` | - | Sets whether the Image Element should be treated as a mask. Masks do not render into the scene, but instead limit child elements to only be rendered where this element is rendered. Gets whether the Image Element should be treated as a mask. |
| `outlineColor?` | `string` | - | Sets the text outline effect color and opacity, with the color specified in sRGB color space. Only works for ELEMENTTYPE_TEXT elements. Gets the text outline effect color and opacity. |
| `outlineThickness?` | `number` | - | Sets the width of the text outline effect, ranging from 0 (no outline) to 1 (maximum thickness). Defaults to 0. Combine with outlineColor to style the outline. Only works for ELEMENTTYPE_TEXT elements. Gets the width of the text outline effect. |
| `shadowColor?` | `string` | - | Sets the text shadow effect color and opacity, with the color specified in sRGB color space. Only works for ELEMENTTYPE_TEXT elements. Gets the text shadow effect color and opacity. |
| `shadowOffset?` | `[number, number]` | - | Sets the offset of the text shadow, relative to the text. The shadow is a second copy of the text, tinted with shadowColor and displaced by this amount. Each component ranges from -1 to 1 and is proportional to the font size, so the shadow stays consistent as the text scales; positive x shifts the shadow right and positive y shifts it up. The shadow is only drawn where it extends past the glyph, so the default of `[0, 0]` produces no visible shadow and a non-zero offset is required to display one. Only works for ELEMENTTYPE_TEXT elements. Gets the offset of the text shadow, relative to the text. |
| `enableMarkup?` | `boolean` | - | Sets whether markup processing is enabled for this element. Only works for ELEMENTTYPE_TEXT elements. Defaults to false. Gets whether markup processing is enabled for this element. |
| `rangeStart?` | `number` | - | Sets the index of the first character to render. Only works for ELEMENTTYPE_TEXT elements. Gets the index of the first character to render. |
| `rangeEnd?` | `number` | - | Sets the index of the last character to render. Only works for ELEMENTTYPE_TEXT elements. Gets the index of the last character to render. |
| `system?` | `ComponentSystem` | - | The ComponentSystem used to create this Component. |
| `entity?` | `Entity` | - | The Entity that this Component is attached to. |
| `enabled?` | `boolean` | - | Sets the enabled state of the component. Gets the enabled state of the component. |
