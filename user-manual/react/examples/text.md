# Text

Render screen-space UI text by attaching a `Screen` to one entity and a text `Element` to a child entity. Both come from `@playcanvas/react/components`, and the font is an MSDF asset created with [font-tools](https://developer.playcanvas.com/user-manual/user-interface/fonts.md) and loaded with [`useFont`](https://developer.playcanvas.com/user-manual/react/api/hooks/use-asset.md#usefont).

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

The demo renders [Source Sans 3](https://github.com/adobe-fonts/source-sans) (SIL Open Font License).
