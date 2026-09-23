# PlayCanvas React

[@playcanvas/react](https://github.com/playcanvas/react) brings PlayCanvas to the React ecosystem. It provides a declarative, component-based approach to building interactive 3D applications using familiar React patterns and a powerful ECS architecture. It's a thin wrapper around PlayCanvas - a batteries-included library for building interactive 3D content in React.

[Getting Started →](https://developer.playcanvas.com/user-manual/react/getting-started.md)  
[View on GitHub ↗](https://github.com/playcanvas/react)

## How does it Work?

PlayCanvas has a powerful ECS architecture that aligns perfectly with React's declarative nature. You create Entities, add Components to them, and load assets. That's it. No more worrying about the underlying engine, just build your scene.

Here's how you load and render a 3D model and create an orbit camera.

```tsx
export const Lambo = () => {
  // Load an asset
  const { asset: model } = useModel('/assets/lambo.glb');

  // If the asset is not loaded, return null
  if (!model) return null;

  return <>    
    {/* create and position a camera entity */}
    <Entity name='camera' position={[4, 1, 4]}>
      {/* Add a camera component */}
      <Camera clearColor='#090707' fov={28} />
      {/* Add an orbit controls component */}
      <OrbitControls zoomRange={[3, 6]} pitchRange={[-90, -5]}/>
    </Entity>

    {/* render the asset */}
    <Render type='asset' asset={model}/>
  </>
}
```

## Full Engine Power, React Simplicity

PlayCanvas React gives you access to the **entire** PlayCanvas Engine - no third-party libraries required. If it's possible in PlayCanvas, it's possible in PlayCanvas React.

On top of that, PlayCanvas React adds a set of **React-first features** to make development faster and more ergonomic:

- **Asset Loading** – React-style asset loading with Suspense. Fine-grained control over when and how assets are fetched.
- **Pointer Events** – Familiar event bubbling for clicks, drags and gestures. Attach listeners to any entity and handle events naturally.
- **Physics** – Lazy-loaded physics engine that integrates cleanly with React's lifecycle.
- **Hooks** – Convenient hooks for engine events, materials, asset state and more.

## Getting Started

Follow our [Getting Started](https://developer.playcanvas.com/user-manual/react/getting-started.md) guide which will walk you through your first PlayCanvas React project.

Alternatively, you can spin up a new project in seconds with our [StackBlitz template](https://playcanvas-react.vercel.app/new)

## Examples

But less talking, more doing. Here are a couple of examples you can try with PlayCanvas React:

[Physics Example](https://developer.playcanvas.com/user-manual/react/examples/physics.md): Physics Disturb rigid bodies in zero gravity.
[Clock Example](https://stackblitz.com/edit/pc-react-tick-tock?file=src%2FScene.tsx): Clock Open a simple PlayCanvas React template in StackBlitz.

## Learn More

- [Getting Started Guide](https://developer.playcanvas.com/user-manual/react/getting-started.md) - Set up your first project
- [Building a Scene](https://developer.playcanvas.com/user-manual/react/building-a-scene.md) - Learn the fundamentals of scene composition
- [Features Showcase](https://playcanvas-react.vercel.app/docs#features) - Explore all capabilities
- [Interactive Playground](https://playcanvas-react.vercel.app/examples) - Learn by doing
- [API Reference](https://playcanvas-react.vercel.app/docs/api) - Complete component documentation

Explore the [official documentation](https://playcanvas-react.vercel.app/docs) or browse the [GitHub repository](https://github.com/playcanvas/react) for more.
