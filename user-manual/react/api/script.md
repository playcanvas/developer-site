# `<Script/>`

The `<Script/>` component provides a simple imperative way to add behaviors to an [`<Entity/>`](https://developer.playcanvas.com/user-manual/react/api/entity.md).

This is useful for things like [physics](https://developer.playcanvas.com/user-manual/react/guide/physics.md), animation, and [interactivity](https://developer.playcanvas.com/user-manual/react/guide/interactivity.md) where, for performance reasons, you want to bypass updating React props. It allows you to hook into the engine's update loop outside of React, which is useful for performance-critical code. You can also leverage existing Scripts from PlayCanvas Editor Projects.

You can find more information about [Scripts](https://developer.playcanvas.com/user-manual/scripting.md) in the Engine documentation.

## Usage

The `Script` component takes a class that extends the PlayCanvas [Script](https://api.playcanvas.com/engine/classes/Script.html) class and attaches it to the `Entity`. Any additional props are passed to the Script class directly and can be used as properties on the class.

```tsx
import { Script } from '@playcanvas/react/components'
import { CameraControls } from 'playcanvas/scripts/esm/camera-controls.mjs'

return <Script script={CameraControls} />
```

The following examples adds a `SpinMe` script to the entity that rotates the entity every frame.

**Script component with rotation behavior**

```jsx title="script-example.jsx"
import { Entity } from '@playcanvas/react';
import { Script, Render } from '@playcanvas/react/components';
import { Script as PcScript } from 'playcanvas';
import { useControls } from 'leva';


const vars = {
  speed: { value: 10, min: 0, max: 100, step: 1 }
};
// ↑ imports hidden

// This class runs in the scope of the entity it's attached to
class SpinMe extends PcScript {
  update(dt) {
    this.entity.rotate(0, dt * this.speed, 0);
  }
}

export const ScriptExample = () => {
  const { speed } = useControls(vars);

  return (
    <Entity>
      <Render type="box" castShadows receiveShadows />
      <Script script={SpinMe} speed={speed} />
    </Entity>
  );
};
```

You can use any existing Script or create your own, or any from the engine repository for [existing Scripts](https://github.com/playcanvas/engine/tree/main/scripts/esm).

:::tip
The PlayCanvas engine contains a number of useful scripts that you can use in your projects. **Find them [here](https://github.com/playcanvas/engine/tree/main/scripts/esm)**.
:::

You can learn more about the anatomy of a ESM Script in the [Scripting documentation](https://developer.playcanvas.com/user-manual/scripting/esm-scripts.md).

## Properties

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `script` | `SubclassOf<Script>` | - | The Script class to attach to the entity |
