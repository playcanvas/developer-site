---
title: Forces and Impulses
description: Apply continuous forces and one-frame impulses to dynamic rigid bodies using RigidBodyComponent APIs.
---

:::ai

- **[Engine Development](/user-manual/ai/developing-with-engine/):** Apply continuous forces and one-frame impulses to dynamic rigid bodies using RigidBodyComponent APIs; launch the application, exercise the behavior, and inspect positions, collisions, or runtime logs.
- **[VS Code Extension](/user-manual/ai/vscode-extension/):** Implement the Forces and Impulses behavior in the relevant physics scripts so it satisfies this requirement: apply continuous forces and one-frame impulses to dynamic rigid bodies using RigidBodyComponent APIs; review the complete diff and diagnostics before Push.
- **[Editor MCP Server](/user-manual/ai/editor-mcp-server/):** Configure the Collision, Rigidbody, and script data needed for Forces and Impulses so it satisfies this requirement: apply continuous forces and one-frame impulses to dynamic rigid bodies using RigidBodyComponent APIs; launch the scene, exercise the behavior, and inspect runtime state or logs.

:::

Dynamic rigid bodies move in response to forces and impulses. A force is applied to a body over a period of time whereas an impulse is a force that is applied in an instant.

To apply a force or an impulse to a rigid body, you must use the [pc.RigidBodyComponent scripting API](https://api.playcanvas.com/engine/classes/RigidBodyComponent.html).

Let's consider a couple of examples. If you want to push a heavy weight across the floor, you would apply a force over an amount of time:

```javascript
MyScript.prototype.update = function(dt) {
    // While the right arrow key is pressed, apply a force to the right
    if (app.keyboard.isPressed(pc.KEY_RIGHT)) {
        this.entity.rigidbody.applyForce(10, 0, 0);
    }
};
```

If you want to fire a cannonball from a cannon, you would apply a single impulse:

```javascript
MyScript.prototype.update = function(dt) {
    // If the space bar was pressed, apply an impulse up and to the right
    if (app.keyboard.wasPressed(pc.KEY_SPACE)) {
        this.entity.rigidbody.applyImpulse(10, 10, 0);
    }
};
```
