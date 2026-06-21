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
