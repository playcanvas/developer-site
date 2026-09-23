# Interactivity

Once you have a scene, you'll want to make it interactive. You can do this in a number of ways depending on your use case.

### Pointer Events

You can attach pointer events to an `Entity` to respond to user interaction. It's a simple way to handle user input in a reactive way.

:::tip

Pointer events bubble up. You can attach events to a parent `Entity` and events will propagate up through the React tree.

:::

Let's make a sphere that changes color when you click it.

**Using pointer events**

```jsx title="interactivity.jsx"
import { useState } from 'react'
import { Entity } from '@playcanvas/react'
import { Render } from '@playcanvas/react/components'
import { useMaterial } from '@playcanvas/react/hooks'

export const Interactivity = () => {
  const colors = [
    'lavender', 'lightsteelblue', 'powderblue', 'rebeccapurple'
  ]

  // Create the initial diffuse color and create the material
  const [diffuse, setDiffuse] = useState('lightsteelblue')
  const material = useMaterial({ diffuse })

  const onRequestRandomColor = () => {
    setDiffuse(colors[Math.floor(Math.random() * colors.length)])
  }

  // Attach hover and leave handlers to the sphere
  const onHover = () => document.body.style.cursor = 'pointer'
  const onLeave = () => document.body.style.cursor = 'default'

  return (
    // Attach an onClick handler to the sphere to request a color change
    <Entity
      name="sphere"
      onClick={onRequestRandomColor}
      onPointerOver={onHover}
      onPointerOut={onLeave} >
        <Render type="sphere" material={material} />
    </Entity>
  )
}
```

Entities support the following pointer events which closely match the behavior of the DOM Pointer Events API.

- `onPointerUp`
- `onPointerDown`
- `onPointerOver`
- `onPointerOut`
- `onClick`

### The `Script` component

The `Script` component is a handy way to add custom behavior to an `Entity`. It's a convenient way to attach any ESM PlayCanvas [Script](https://api.playcanvas.com/engine/classes/Script.html) to an `Entity`. This is useful for interactivity or animations or anything that needs to happen outside the React render loop.

You assign an ESM PlayCanvas [Script](https://api.playcanvas.com/engine/classes/Script.html) to the `script` prop of a `<Script>` component.

**Rotating a cube with a Script**

```jsx title="scripting.jsx"
import { Entity } from '@playcanvas/react'
import { Render } from '@playcanvas/react/components'
import { Script } from '@playcanvas/react/components'
import { Script as PcScript } from 'playcanvas'

/**
 * A simple script that rotates the entity it's attached to.
 */
class SpinningCube extends PcScript {
    static scriptName = 'spinningCube'
    speed = 10
    update(dt) {
        this.entity.rotate(0, dt * this.speed, dt * this.speed * 2)
    }
}

export const Scripting = () => (
    <Entity>
        <Render type="box" />
        <Script script={SpinningCube} speed={10} />
    </Entity>
)
```

PlayCanvas Scripts are ESM modules that extend the `Script` class. You can use any existing Script or create your own, or any from the engine repository for [existing Scripts](https://github.com/playcanvas/engine/tree/main/scripts/esm).

:::tip

If you need to animate something every frame, using a `<Script>` component is generally more performant than re-rendering the React tree, however a Script can override Entity props.

:::

You can read more about [Scripts in the docs](https://developer.playcanvas.com/user-manual/scripting.md).

### Application events

A more React-like way to handle interactivity is to use the `useAppEvent` hook. This hook allows you to subscribe to PlayCanvas application events with proper TypeScript support. It supports both built-in events and custom events with their specific callback signatures.

The following example hooks into the `update` event using the `useAppEvent` and rotates the capsule.

**Rotating a capsule using useAppEvent**

```jsx title="app-events.jsx"
import { useAppEvent } from '@playcanvas/react/hooks'
import { Entity } from '@playcanvas/react'
import { Render } from '@playcanvas/react/components'
import { useRef } from 'react'

export const AppEvents = () => {
  const speed = 10;
  const boxRef = useRef(null);

  useAppEvent('update', (dt) => {
    boxRef.current?.rotate(0, dt * speed, dt * speed * 2);
  });

  const onEntityClick = () => {
    console.log('Entity clicked');
  }

  return (
    <Entity ref={boxRef}>
      <Render type='capsule' />
    </Entity>
  )
}
```

There are various application events that you can hook into, each with a specific callback signature. It's worth checking the [Engine Application API](https://api.playcanvas.com/engine/classes/Application.html) to see what events are available.

You can also fire your own events using the `app.fire` method.

```jsx
import { useAppEvent } from '@playcanvas/react/hooks'

const MyComponent = () => {
  useAppEvent('myEvent', (message) => {
    console.log('My event fired.', message);
  });
}

app.fire('myEvent', 'Hello, world!');
```

## Next steps

Now that you've learned about interactivity, you can learn about [Physics](https://developer.playcanvas.com/user-manual/react/guide/physics.md) and [Materials](https://developer.playcanvas.com/user-manual/react/guide/materials.md).
