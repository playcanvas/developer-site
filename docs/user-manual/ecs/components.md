---
title: Components
---

A **[`Component`](https://api.playcanvas.com/engine/classes/Component.html)** adds data and behavior to an Entity.

## Examples

- [`CameraComponent`](https://api.playcanvas.com/engine/classes/CameraComponent.html)
- [`LightComponent`](https://api.playcanvas.com/engine/classes/LightComponent.html)
- [`RenderComponent`](https://api.playcanvas.com/engine/classes/RenderComponent.html)
- [`RigidBodyComponent`](https://api.playcanvas.com/engine/classes/RigidBodyComponent.html) & [`CollisionComponent`](https://api.playcanvas.com/engine/classes/CollisionComponent.html)
- [`ScriptComponent`](https://api.playcanvas.com/engine/classes/ScriptComponent.html)

:::tip
Only add components you actually need, and remove unused ones to keep Entities lean.
:::

## Adding a Component in code

```javascript
entity.addComponent('camera', {
    nearClip: 1,
    farClip: 100,
    fov: 55
});
```

See [`addComponent`](https://api.playcanvas.com/engine/classes/Entity.html#addcomponent).

## Accessing a Component

```javascript
const camera = entity.camera;
```

## Removing a Component

```javascript
entity.removeComponent('camera');
```

See [`removeComponent`](https://api.playcanvas.com/engine/classes/Entity.html#removecomponent).

## Enabling / Disabling Components

```javascript
entity.model.enabled = false;
```

See [`enabled`](https://api.playcanvas.com/engine/classes/Component.html#enabled).

:::tip
If a component is temporarily not needed, consider disabling it instead of removing it.
:::
