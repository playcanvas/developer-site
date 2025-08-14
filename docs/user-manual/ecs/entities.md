---
title: Entities
---

An **Entity** is the basic building block of your PlayCanvas scene ([`Entity`](https://api.playcanvas.com/engine/classes/Entity.html)).

## Key characteristics

- An Entity can have **zero or more components**.
- Entities can be **parented** to form a hierarchy ([`addChild`](https://api.playcanvas.com/engine/classes/GraphNode.html#addchild), [`removeChild`](https://api.playcanvas.com/engine/classes/GraphNode.html#removechild)).
- Entities can be **enabled** or **disabled** ([`enabled`](https://api.playcanvas.com/engine/classes/GraphNode.html#enabled)).

:::tip
Keep Entities lightweight — avoid adding unnecessary components.
:::

## Creating an Entity in code

```javascript
const entity = new pc.Entity("MyEntity");
app.root.addChild(entity);
```

## Enabling / Disabling Entities

```javascript
entity.enabled = false; // Disables the Entity and all its components
```

:::tip
Disable Entities when not in use to reduce processing and improve performance.
:::

## Lifecycle

- **Creation** — [`Entity constructor`](https://api.playcanvas.com/engine/classes/Entity.html#constructor).
- **Parenting** — [`addChild`](https://api.playcanvas.com/engine/classes/GraphNode.html#addchild) / [`removeChild`](https://api.playcanvas.com/engine/classes/GraphNode.html#removechild).
- **Destruction** — [`destroy`](https://api.playcanvas.com/engine/classes/GraphNode.html#destroy).

:::tip
When an Entity is no longer needed, call `destroy` to free resources and detach it from the hierarchy.
:::
