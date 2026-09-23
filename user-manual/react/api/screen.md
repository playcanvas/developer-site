# `<Screen/>`

The `<Screen/>` component turns an [`<Entity/>`](https://developer.playcanvas.com/user-manual/react/api/entity.md) into a 2D UI screen that lays out [`<Element/>`](https://developer.playcanvas.com/user-manual/react/api/element.md) children. By default it renders in screen space (a 2D overlay), but it can also be placed in world space for in-scene UI. Use `referenceResolution` and `scaleMode` to control how the UI scales across different display sizes.

## Usage

Attach a `<Screen/>` to an [`<Entity/>`](https://developer.playcanvas.com/user-manual/react/api/entity.md), then nest entities carrying an [`<Element/>`](https://developer.playcanvas.com/user-manual/react/api/element.md) to draw text or images.

```tsx
<Entity name="screen">
  <Screen referenceResolution={[1280, 720]} />
  <Entity name="label">
    <Element type="text" text="Hello, World!" />
  </Entity>
</Entity>
```

This example renders a centred line of screen-space text using a `<Screen/>` and a text [`<Element/>`](https://developer.playcanvas.com/user-manual/react/api/element.md).

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

Learn more about the [Screen Component](https://api.playcanvas.com/engine/classes/ScreenComponent.html) in the PlayCanvas documentation.

## Properties

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `screenSpace?` | `boolean` | `true` | Whether the screen is rendered in screen space. |
| `referenceResolution?` | `[number, number]` | `[1280, 720]` | The reference resolution of the screen. |
| `scaleMode?` | `"blend" \| "stretch" \| "fit"` | `"blend"` | The scale mode of the screen. |
| `cull?` | `boolean` | - | If true, then elements inside this screen will not be rendered when outside of the screen (only valid when screenSpace is true). |
| `resolution?` | `[number, number]` | - | Sets the width and height of the ScreenComponent. When screenSpace is true, the resolution will always be equal to GraphicsDevice#width  by GraphicsDevice#height . Gets the width and height of the ScreenComponent. |
| `scaleBlend?` | `number` | - | Sets the scale blend. This is a value between 0 and 1 that is used when scaleMode is equal to SCALEMODE_BLEND. Scales the ScreenComponent with width as a reference (when value is 0), the height as a reference (when value is 1) or anything in between. Defaults to 0.5. Gets the scale blend. |
| `priority?` | `number` | - | Sets the screen's render priority. Priority determines the order in which ScreenComponents in the same layer are rendered. Number must be an integer between 0 and 127. Priority is set into the top 8 bits of the ElementComponent#drawOrder  property. Defaults to 0. Gets the screen's render priority. |
| `system?` | `ComponentSystem` | - | The ComponentSystem used to create this Component. |
| `entity?` | `Entity` | - | The Entity that this Component is attached to. |
| `enabled?` | `boolean` | - | Sets the enabled state of the component. Gets the enabled state of the component. |
