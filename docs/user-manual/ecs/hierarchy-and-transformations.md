---
title: Hierarchy and Transformations
sidebar_label: Hierarchy & Transforms
---

Entities can be arranged in a **parent-child hierarchy**. The `Entity` class inherits its transform capabilities from the [`GraphNode`](https://api.playcanvas.com/engine/classes/GraphNode.html) superclass.

## Key points

- **Transforms are relative** to the parent.
- **World transforms** are calculated by combining local transforms through the hierarchy.
- Moving a parent affects all its children.

:::tip
Minimize deep hierarchies. Shallower hierarchies are easier to manage and can perform better.
:::

## Example

```javascript
childEntity.setLocalPosition(1, 0, 0); // relative to parent
console.log(childEntity.getWorldPosition()); // global position
```

See [`setLocalPosition`](https://api.playcanvas.com/engine/classes/GraphNode.html#setlocalposition) and [`getWorldPosition`](https://api.playcanvas.com/engine/classes/GraphNode.html#getworldposition).

## Re-parenting

```javascript
newParent.addChild(childEntity);
```

## Scaling considerations

- Non-uniform scaling can cause visual or physics issues.
- Avoid scaling physics-enabled entities unless necessary.
