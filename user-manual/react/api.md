# API

PlayCanvas React provides a declarative, component-based API for building 3D applications. The API is organized into core components, engine components and hooks.

## Core

- **[`<Application/>`](https://developer.playcanvas.com/user-manual/react/api/application.md)** - Root component that initializes the PlayCanvas engine and provides a rendering context
- **[`<Entity/>`](https://developer.playcanvas.com/user-manual/react/api/entity.md)** - Fundamental scene graph building block with position, rotation and scale
- **[`<Gltf/>`](https://developer.playcanvas.com/user-manual/react/api/gltf.md)** - Load and instantiate GLB/GLTF scenes
- **[`<Modify.*>`](https://developer.playcanvas.com/user-manual/react/api/modify.md)** - Declaratively modify entities and components inside an imported GLB

## Components

Components add behavior to entities. Nest them inside an `<Entity/>` to attach the corresponding PlayCanvas component.

- **[`<Anim/>`](https://developer.playcanvas.com/user-manual/react/api/anim.md)** - State-based animation
- **[`<Align/>`](https://developer.playcanvas.com/user-manual/react/api/align.md)** - Alignment helper
- **[`<Camera/>`](https://developer.playcanvas.com/user-manual/react/api/camera.md)** - Camera and viewport
- **[`<Collision/>`](https://developer.playcanvas.com/user-manual/react/api/collision.md)** - Physics collision shapes
- **[`<Element/>`](https://developer.playcanvas.com/user-manual/react/api/element.md)** - 2D UI content (text, image or group)
- **[`<Environment/>`](https://developer.playcanvas.com/user-manual/react/api/environment.md)** - Scene environment and skybox
- **[`<GSplat/>`](https://developer.playcanvas.com/user-manual/react/api/gsplat.md)** - Gaussian splat rendering
- **[`<Light/>`](https://developer.playcanvas.com/user-manual/react/api/light.md)** - Directional, point and spot lights
- **[`<Render/>`](https://developer.playcanvas.com/user-manual/react/api/render.md)** - Mesh rendering (primitives and assets)
- **[`<Rigidbody/>`](https://developer.playcanvas.com/user-manual/react/api/rigidbody.md)** - Physics rigid bodies
- **[`<Screen/>`](https://developer.playcanvas.com/user-manual/react/api/screen.md)** - 2D UI screen (screen or world space)
- **[`<Script/>`](https://developer.playcanvas.com/user-manual/react/api/script.md)** - Custom script components

## Hooks

React hooks for integrating with the PlayCanvas engine lifecycle. See the [Hooks overview](https://developer.playcanvas.com/user-manual/react/api/hooks.md) for usage patterns and best practices.

- **[useApp](https://developer.playcanvas.com/user-manual/react/api/hooks/use-app.md)** - Access the PlayCanvas Application instance
- **[useParent](https://developer.playcanvas.com/user-manual/react/api/hooks/use-parent.md)** - Get the parent Entity from context
- **[useAsset](https://developer.playcanvas.com/user-manual/react/api/hooks/use-asset.md)** - Load any type of PlayCanvas asset
- **[useAppEvent](https://developer.playcanvas.com/user-manual/react/api/hooks/use-app-event.md)** - Subscribe to application events
- **[useMaterial](https://developer.playcanvas.com/user-manual/react/api/hooks/use-material.md)** - Create and manage materials
- **[usePhysics](https://developer.playcanvas.com/user-manual/react/api/hooks/use-physics.md)** - Access physics context and state
