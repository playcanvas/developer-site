---
title: API
description: API reference for PlayCanvas React components and hooks
---

PlayCanvas React provides a declarative, component-based API for building 3D applications. The API is organized into core components, engine components and hooks.

## Core

- **[`<Application/>`](./application)** - Root component that initializes the PlayCanvas engine and provides a rendering context
- **[`<Entity/>`](./entity)** - Fundamental scene graph building block with position, rotation and scale
- **[`<Gltf/>`](./gltf)** - Load and instantiate GLB/GLTF scenes
- **[`<Modify.*>`](./modify)** - Declaratively modify entities and components inside an imported GLB

## Components

Components add behavior to entities. Nest them inside an `<Entity/>` to attach the corresponding PlayCanvas component.

- **[`<Anim/>`](./anim)** - State-based animation
- **[`<Align/>`](./align)** - Alignment helper
- **[`<Camera/>`](./camera)** - Camera and viewport
- **[`<Collision/>`](./collision)** - Physics collision shapes
- **[`<Environment/>`](./environment)** - Scene environment and skybox
- **[`<GSplat/>`](./gsplat)** - Gaussian splat rendering
- **[`<Light/>`](./light)** - Directional, point and spot lights
- **[`<Render/>`](./render)** - Mesh rendering (primitives and assets)
- **[`<Rigidbody/>`](./rigidbody)** - Physics rigid bodies
- **[`<Script/>`](./script)** - Custom script components

## Hooks

React hooks for integrating with the PlayCanvas engine lifecycle. See the [Hooks overview](./hooks/) for usage patterns and best practices.

- **[useApp](./hooks/use-app)** - Access the PlayCanvas Application instance
- **[useParent](./hooks/use-parent)** - Get the parent Entity from context
- **[useAsset](./hooks/use-asset)** - Load any type of PlayCanvas asset
- **[useAppEvent](./hooks/use-app-event)** - Subscribe to application events
- **[useMaterial](./hooks/use-material)** - Create and manage materials
- **[usePhysics](./hooks/use-physics)** - Access physics context and state
