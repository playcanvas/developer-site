# Hooks

PlayCanvas React provides a comprehensive set of React hooks that make it easy to integrate PlayCanvas functionality into your React applications. These hooks handle the complex lifecycle management and provide a clean, React-friendly API.

## Available Hooks

### Core Hooks

- **[useApp](https://developer.playcanvas.com/user-manual/react/api/hooks/use-app.md)** - Access the PlayCanvas Application instance
- **[useParent](https://developer.playcanvas.com/user-manual/react/api/hooks/use-parent.md)** - Get the parent Entity from context

### Asset Loading Hooks

- **[useAsset](https://developer.playcanvas.com/user-manual/react/api/hooks/use-asset.md)** - Load any type of PlayCanvas asset
- **[useModel](https://developer.playcanvas.com/user-manual/react/api/hooks/use-asset.md#usemodel)** - Load 3D models (GLB/GLTF)
- **[useTexture](https://developer.playcanvas.com/user-manual/react/api/hooks/use-asset.md#usetexture)** - Load texture assets
- **[useSplat](https://developer.playcanvas.com/user-manual/react/api/hooks/use-asset.md#usesplat)** - Load Gaussian splat assets
- **[useEnvAtlas](https://developer.playcanvas.com/user-manual/react/api/hooks/use-asset.md#useenvatlas)** - Load environment atlas textures
- **[useFont](https://developer.playcanvas.com/user-manual/react/api/hooks/use-asset.md#usefont)** - Load font assets

### Event and Animation Hooks

- **[useAppEvent](https://developer.playcanvas.com/user-manual/react/api/hooks/use-app-event.md)** - Subscribe to PlayCanvas application events

### Material and Physics Hooks

- **[useMaterial](https://developer.playcanvas.com/user-manual/react/api/hooks/use-material.md)** - Create and manage materials
- **[usePhysics](https://developer.playcanvas.com/user-manual/react/api/hooks/use-physics.md)** - Access physics context and state

## Usage Pattern

Most hooks follow a consistent pattern:

```jsx
import { useApp, useAsset } from '@playcanvas/react/hooks'

function MyComponent() {
  const app = useApp()
  const { asset, loading, error } = useAsset('model.glb', 'container')
  
  if (loading) return <div>Loading...</div>
  if (error) return <div>Error: {error}</div>
  
  return <Container asset={asset} />
}
```

## Context Requirements

Many hooks require specific React contexts to be available:

- **useApp** requires an `<Application>` component in the component tree
- **useParent** requires an `<Entity>` component in the component tree
- **usePhysics** requires physics to be enabled on the Application

## TypeScript Support

All hooks are fully typed with TypeScript and provide excellent IntelliSense support. The hooks automatically infer types from the PlayCanvas engine types.

```tsx
// Fully typed with PlayCanvas types
const app = useApp() // Application
const entity = useParent() // Entity
const { asset } = useAsset('texture.jpg', 'texture') // Asset | null
```

## Best Practices

1. **Always check loading states** when using asset hooks
2. **Handle errors gracefully** for better user experience
3. **Use the appropriate hook** for your specific use case
4. **Clean up subscriptions** are handled automatically by the hooks
5. **Follow React rules** - hooks should only be called at the top level of components
