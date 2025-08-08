---
title: Forces and Impulses
---

Dynamic rigid bodies move in response to forces and impulses. A force is applied to a body over a period of time whereas an impulse is a force that is applied in an instant.

To apply a force or an impulse to a rigid body, you must use the [pc.RigidBodyComponent scripting API][1].

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

[1]: https://api.playcanvas.com/engine/classes/RigidBodyComponent.html
