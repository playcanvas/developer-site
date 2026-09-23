# Loading Assets

Whether its textures, materials or 3D models, assets are a key part of any 3D app. And generally speaking, they take the most time to load. PlayCanvas React provides a set of specialized hooks for loading different types of assets, as well as a utility function for loading assets. This helps you get up to speed quickly but with granular control of how and when assets are loaded.

## Basic Usage

The simplest way to load an asset is to use one of the specialized hooks. There are special hooks for [models](https://developer.playcanvas.com/user-manual/react/api/hooks/use-asset.md#usemodel), [gaussian splats](https://developer.playcanvas.com/user-manual/react/api/hooks/use-asset.md#usesplat), [textures](https://developer.playcanvas.com/user-manual/react/api/hooks/use-asset.md#usetexture), [environment map](https://developer.playcanvas.com/user-manual/react/api/hooks/use-asset.md#useenvatlas), [fonts](https://developer.playcanvas.com/user-manual/react/api/hooks/use-asset.md#usefont) and more. They all have a similar shape and return a PlayCanvas [`Asset`](https://api.playcanvas.com/engine/classes/Asset.html).

For GLB models, use the [`<Gltf>`](https://developer.playcanvas.com/user-manual/react/guide/modifying-glb-models.md) component:

```tsx
import { useModel } from '@playcanvas/react/hooks';
import { Gltf } from '@playcanvas/react';

const { asset } = useModel('model.glb');
return <Gltf asset={asset} key={asset.id} />;
```

The `<Gltf>` component is the recommended way to load and render GLB models. It gives you access to the model's internal structure, making it easy to modify components, add animations, or attach physics. For simple cases without modifications, you can also use [`<Render asset={asset} />`](https://developer.playcanvas.com/user-manual/react/api/render.md), but `<Gltf>` provides more flexibility.

Learn more about [modifying GLB models](https://developer.playcanvas.com/user-manual/react/guide/modifying-glb-models.md) to add animations, remove lights, or attach physics components.

**Loading a model with useModel**

```jsx title="model-loading.jsx"
import { Entity } from '@playcanvas/react';
import { useModel } from '@playcanvas/react/hooks';
import { Gltf } from '@playcanvas/react';

export const ModelLoading = () => {
  // Load the selected model
  const { asset, error } = useModel('/assets/statue.glb');

  // If there is an error, log it
  if (error) {
    console.error('Error loading model:', error);
    return null;
  }

  // If the asset is not loaded, return null
  if (!asset) return null;

  // Match the original example framing so the shared staging camera starts outside the model.
  return (
    <Entity position={[0, -0.5, 0]} scale={[0.1, 0.1, 0.1]}>
      <Gltf asset={asset} key={asset.id} />
    </Entity>
  );
};
```

## Preloading

The asset hooks also return additional loading info and error states, so you can fallback to a preloader while loading or display an error message if the asset fails to load.

```tsx title="model-viewer.tsx"
import { useModel } from '@playcanvas/react/hooks';
import { Gltf } from '@playcanvas/react';

export function ModelViewer() {
  const { asset, loading, error } = useModel('model.glb');

  // If the asset is still loading, show a loading spinner
  if (loading) return <LoadingSpinner />;

  // If there is an error, show an error message
  if (error) return <ErrorMessage message={error} />;

  // If the asset is loaded, render it
  return <Gltf asset={asset} key={asset.id} />;
}
```

## Loading with Props

Some assets accept additional properties to customize how they are loaded. You can pass these properties to the hook as a second argument.

```tsx
// Load a texture with specific settings
const { asset } = useTexture('texture.jpg', {
    mipmaps: true,
    anisotropy: 16,
    type: 'rgba'
});
```

## Asset hooks

There are different hooks for loading different types of assets. You can create more advanced hooks by wrapping the `useAsset` hook.

- [`useModel`](https://developer.playcanvas.com/user-manual/react/api/hooks/use-asset.md#usemodel) for loading 3D GLTF/GLB models
- [`useTexture`](https://developer.playcanvas.com/user-manual/react/api/hooks/use-asset.md#usetexture) for loading textures
- [`useSplat`](https://developer.playcanvas.com/user-manual/react/api/hooks/use-asset.md#usesplat) for loading Gaussian Splats
- [`useEnvAtlas`](https://developer.playcanvas.com/user-manual/react/api/hooks/use-asset.md#useenvatlas) for loading environment atlases
- [`useAsset`](https://developer.playcanvas.com/user-manual/react/api/hooks/use-asset.md#useasset) for loading any type of asset
- [`useFont`](https://developer.playcanvas.com/user-manual/react/api/hooks/use-asset.md#usefont) for loading fonts

### Asset Caching

Assets are cached by default to avoid reloading the same file multiple times. This means you're not duplicating on memory, but you'll need to ensure assets are correctly unloaded when they're no longer needed.

```tsx title="unloading-model-viewer.tsx"
import { useModel } from '@playcanvas/react/hooks';
import { useEffect } from 'react';

export function UnloadingModelViewer() {
  const { asset, loading, error } = useModel('model.glb');

  useEffect(() => {
    return () => asset?.unload();
  }, [asset]);

  if (!asset) return null;

  return <Gltf asset={asset} key={asset.id} />;
}
```

:::warning
**Unloading an asset will remove it globally.** This will affect other components that are using the same asset.
:::

### Custom Loading States

You can use placeholders or custom loaders while assets load by checking the loading state of an asset. This gives you granular control.

```tsx title="loading-spinner.tsx"
import { useModel } from '@playcanvas/react/hooks';
import { Gltf } from '@playcanvas/react';

// A component that displays a model with a custom loading state
export function ModelWithCustomLoading() {
  const { asset: plane, loading: planeLoading } = useModel('plane.glb');
  const { asset: car, loading: carLoading } = useModel('car.glb');
    
  if (planeLoading || carLoading) return <LoadingSpinner />;

  return <>
    <Gltf asset={car} key={car.id} />
    <Gltf asset={plane} key={plane.id} />
  </>
}
```

### Progressive Loading

The loading hooks also provide a simple mechanic to progressively load assets, so you can prioritize rendering quickly following up with high quality content later.

```tsx title="progressive-loading.tsx"
import { Entity } from '@playcanvas/react';
import { GSplat } from '@playcanvas/react/components';
import { useSplat } from '@playcanvas/react/hooks';

// A component that displays a splat with progressive loading
export function ProgressiveAsset() {
  const { asset: low } = useSplat('./low-quality-model.sog'); // load the low quality asset
  const { asset: high } = useSplat(low && './high-quality-model.sog'); // load the high quality asset, when the low quality is loaded
  
  if (!low && !high ) return null;

  return <GSplat asset={high || low} />
}
```

### Data Fetching Libraries

If you need more advanced caching or loading strategies, you can integrate with libraries like **[React Query](https://tanstack.com/query/latest)** or **[SWR](https://swr.vercel.app/)** or any other Promise based library using the `fetchAsset` utility.

```tsx title="model-with-query.tsx"
import { fetchAsset } from '@playcanvas/react/utils';
import { useQuery } from '@tanstack/react-query';

function useQueryModel(src: string) {
  const query = useQuery({
    queryKey: ['asset', src],
    // 'container' is the type of asset we're loading (e.g., model, texture, etc.)
    queryFn: () => fetchAsset({ app, url: src, type: 'container' })
  });

  return query;
}

export function ModelWithQuery() {
  const { data: asset, isLoading } = useQueryModel('model.glb');

  if (isLoading) return <LoadingSpinner />;
  return <Gltf asset={asset} key={asset.id} />;
}
```

See the [React Query documentation](https://tanstack.com/query/latest) and [SWR documentation](https://swr.vercel.app/) for more information on how to use it.

### Suspense Integration

React Query and SWR have built-in support for Suspense, which allows you to handle loading states in a more declarative way.

```tsx
import { fetchAsset } from '@playcanvas/react/utils';
import { Gltf } from '@playcanvas/react';
import { useQuery } from '@tanstack/react-query';

function useSuspendedQueryModel(src: string) {
  const query = useQuery({
    queryKey: ['asset', src],
    queryFn: () => fetchAsset({ app, url: src, type: 'container' }),
    suspense: true
  });

  return query;
}

export function ModelWithQuery() {
  const { data: asset } = useSuspendedQueryModel('model.glb');
  return <Gltf asset={asset} key={asset.id} />;
}
```

You can read more about Suspense in the [React documentation](https://react.dev/reference/react/Suspense), as well as the [React Query documentation](https://tanstack.com/query/v4/docs/framework/react/guides/suspense) and [SWR documentation](https://swr.vercel.app/docs/suspense).
