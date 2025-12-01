---
title: Calling the ammo.js API
---

The PlayCanvas integration with ammo.js does not expose the full capability of the ammo.js API. However, it is possible to call the ammo.js API directly from your PlayCanvas scripts.

PlayCanvas currently uses [this build][1] of ammo.js. The API exposed by this build can be found [here][2]. Although there is no official documentation for ammo.js, you can refer to the [Bullet Physics User Guide][3] to learn more.

## Joint Constraints

There are currently no PlayCanvas components which implement physics constraints (sometimes known as physics joints). However, it is easy to leverage the ammo.js API to create scripts that implement constraints.

Here is the script for a point-to-point constraint (essentially a ball and socket joint):

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs defaultValue="classic" groupId='script-code'>
<TabItem  value="esm" label="ESM">

```javascript
import { Script, Vec3, Entity, Color } from 'playcanvas';

export class PointToPointConstraint extends Script {
    static scriptName = "pointToPointConstraint";

    /**
     * Position of the constraint in the local space of this entity.
     * 
     * @attribute
     * @title Pivot
     * @type {Vec3}
     */
    pivotA = new pc.Vec3(0, 0, 0);

    /**
     * Optional second entity.
     * 
     * @attribute
     * @title Connected Entity
     * @type {Entity}
     */
    entityB = null;

    /**
     * Position of the constraint in the local space of entity B (if specified).
     * 
     * @attribute
     * @title Connected Pivot
     * @type {Vec3}
     */
    pivotB = new pc.Vec3(0, 0, 0);

    /**
     * Maximum breaking impulse threshold required to break the constraint.
     * 
     * @attribute
     * @title Break Threshold
     * @type {number}
     */
    breakingThreshold = 3.4e+38;

    /**
     * Enable collision between linked rigid bodies.
     * 
     * @attribute
     * @title Enable Collision
     * @type {boolean}
     */
    enableCollision = true;

    /**
     * Enable to render a representation of the constraint.
     * 
     * @attribute
     * @title Debug Render
     * @type {boolean}
     */
    debugRender = false;

    /**
     * The color of the debug rendering of the constraint.
     * 
     * @attribute
     * @title Debug Color
     * @type {Color}
     */
    debugColor = new Color(1, 0, 0);

    initialize() {
        this.createConstraint();

        this.on('attr', (name, value, prev) => {
            // If any constraint properties change, recreate the constraint
            if (name === 'pivotA' || name === 'entityB' || name === 'pivotB') {
                this.createConstraint();
            } else if (name === 'breakingThreshold') {
                this.constraint.setBreakingImpulseThreshold(this.breakingThreshold);
                this.activate();
            }
        });
        this.on('enable', () => {
            this.createConstraint();
        });
        this.on('disable', () => {
            this.destroyConstraint();
        });
        this.on('destroy', () => {
            this.destroyConstraint();
        });
    }

    createConstraint() {
        if (this.constraint) {
            this.destroyConstraint();
        }

        var bodyA = this.entity.rigidbody.body;
        var pivotA = new Ammo.btVector3(this.pivotA.x, this.pivotA.y, this.pivotA.z);
        if (this.entityB && this.entityB.rigidbody) {
            var bodyB = this.entityB.rigidbody.body;
            var pivotB = new Ammo.btVector3(this.pivotB.x, this.pivotB.y, this.pivotB.z);
            this.constraint = new Ammo.btPoint2PointConstraint(bodyA, bodyB, pivotA, pivotB);
        } else {
            this.constraint = new Ammo.btPoint2PointConstraint(bodyA, pivotA);
        }

        var dynamicsWorld = this.app.systems.rigidbody.dynamicsWorld;
        dynamicsWorld.addConstraint(this.constraint, !this.enableCollision);

        this.activate();
    }

    destroyConstraint() {
        if (this.constraint) {
            const dynamicsWorld = this.app.systems.rigidbody.dynamicsWorld;
            dynamicsWorld.removeConstraint(this.constraint);
            Ammo.destroy(this.constraint);
            this.constraint = null;
        }
    }

    activate() {
        this.entity.rigidbody.activate();
        if (this.entityB) {
            this.entityB.rigidbody.activate();
        }
    }

    update(dt) {
        if (this.debugRender) {
        // Note that it's generally bad to allocate new objects in an update function
        // but this is just for debug rendering and will normally be disabled
        var tempVecA = new Vec3();
        this.entity.getWorldTransform().transformPoint(this.pivotA, tempVecA);
        this.app.renderLine(this.entity.getPosition(), tempVecA, this.debugColor);
        if (this.entityB) {
            this.app.renderLine(this.entityB.getPosition(), tempVecA, this.debugColor);
        }
    }
    }
}

```

</TabItem>
<TabItem value="classic" label="Classic">

```javascript
var PointToPointConstraint = pc.createScript('pointToPointConstraint');

PointToPointConstraint.attributes.add('pivotA', {
    title: 'Pivot',
    description: 'Position of the constraint in the local space of this entity.',
    type: 'vec3',
    default: [0, 0, 0]
});
PointToPointConstraint.attributes.add('entityB', {
    title: 'Connected Entity',
    description: 'Optional second entity',
    type: 'entity'
});
PointToPointConstraint.attributes.add('pivotB', {
    title: 'Connected Pivot',
    description: 'Position of the constraint in the local space of entity B (if specified).',
    type: 'vec3',
    default: [0, 0, 0]
});
PointToPointConstraint.attributes.add('breakingThreshold', {
    title: 'Break Threshold',
    description: 'Maximum breaking impulse threshold required to break the constraint.',
    type: 'number',
    default: 3.4e+38
});
PointToPointConstraint.attributes.add('enableCollision', {
    title: 'Enable Collision',
    description: 'Enable collision between linked rigid bodies.',
    type: 'boolean',
    default: true
});
PointToPointConstraint.attributes.add('debugRender', {
    title: 'Debug Render',
    description: 'Enable to render a representation of the constraint.',
    type: 'boolean',
    default: false
});
PointToPointConstraint.attributes.add('debugColor', {
    title: 'Debug Color',
    description: 'The color of the debug rendering of the constraint.',
    type: 'rgb',
    default: [1, 0, 0]
});

// initialize code called once per entity
PointToPointConstraint.prototype.initialize = function() {
    this.createConstraint();

    this.on('attr', function(name, value, prev) {
        // If any constraint properties change, recreate the constraint
        if (name === 'pivotA' || name === 'entityB' || name === 'pivotB') {
            this.createConstraint();
        } else if (name === 'breakingThreshold') {
            this.constraint.setBreakingImpulseThreshold(this.breakingThreshold);
            this.activate();
        }
    });
    this.on('enable', function () {
        this.createConstraint();
    });
    this.on('disable', function () {
        this.destroyConstraint();
    });
    this.on('destroy', function () {
        this.destroyConstraint();
    });
};

PointToPointConstraint.prototype.createConstraint = function() {
    if (this.constraint) {
        this.destroyConstraint();
    }

    var bodyA = this.entity.rigidbody.body;
    var pivotA = new Ammo.btVector3(this.pivotA.x, this.pivotA.y, this.pivotA.z);
    if (this.entityB && this.entityB.rigidbody) {
        var bodyB = this.entityB.rigidbody.body;
        var pivotB = new Ammo.btVector3(this.pivotB.x, this.pivotB.y, this.pivotB.z);
        this.constraint = new Ammo.btPoint2PointConstraint(bodyA, bodyB, pivotA, pivotB);
    } else {
        this.constraint = new Ammo.btPoint2PointConstraint(bodyA, pivotA);
    }

    var dynamicsWorld = this.app.systems.rigidbody.dynamicsWorld;
    dynamicsWorld.addConstraint(this.constraint, !this.enableCollision);

    this.activate();
};

PointToPointConstraint.prototype.destroyConstraint = function() {
    if (this.constraint) {
        var dynamicsWorld = this.app.systems.rigidbody.dynamicsWorld;
        dynamicsWorld.removeConstraint(this.constraint);
        Ammo.destroy(this.constraint);
        this.constraint = null;
    }
};

PointToPointConstraint.prototype.activate = function() {
    this.entity.rigidbody.activate();
    if (this.entityB) {
        this.entityB.rigidbody.activate();
    }
};

// update code called every frame
PointToPointConstraint.prototype.update = function(dt) {
    if (this.debugRender) {
        // Note that it's generally bad to allocate new objects in an update function
        // but this is just for debug rendering and will normally be disabled
        var tempVecA = new pc.Vec3();
        this.entity.getWorldTransform().transformPoint(this.pivotA, tempVecA);
        this.app.renderLine(this.entity.getPosition(), tempVecA, this.debugColor);
        if (this.entityB) {
            this.app.renderLine(this.entityB.getPosition(), tempVecA, this.debugColor);
        }
    }
};
```

</TabItem>
</Tabs>

You can find a project that implements all of the constraint types from ammo.js [here][4].

## Continuous Collision Detection

Sometimes, you might find that fast moving rigid bodies in your simulations pass through one another. To overcome this, ammo.js provides a concept called Continuous Collision Detection (or CCD for short). This enables additional checks for collisions by sweeping a sphere volume between the previous and current positions of a rigid body and looking for intersections with the volumes of other bodies.

You can enable CCD for any PlayCanvas rigid body using the following script:

<Tabs defaultValue="classic" groupId='script-code'>
<TabItem  value="esm" label="ESM">

```javascript
import { Script } from 'playcanvas';

export class Ccd extends Script {
    static scriptName = "ccd";

    /**
     * Number of meters moved in one frame before CCD is enabled.
     * 
     * @attribute
     * @title Motion Threshold
     * @type {number}
     */
    motionThreshold = 1;

    /**
     * This should be below the half extent of the collision volume. E.g., For an object of dimensions 1 meter, try 0.2.
     * 
     * @attribute
     * @title Swept Sphere Radius
     * @type {number}
     */
    sweptSphereRadius = 0.2;

    initialize() {
        const body = this.entity.rigidbody.body;
        body.setCcdMotionThreshold(this.motionThreshold);
        body.setCcdSweptSphereRadius(this.sweptSphereRadius);

        this.on('attr:motionThreshold', function(value) {
            body = this.entity.rigidbody.body;
            body.setCcdMotionThreshold(value);
        });
        this.on('attr:sweptSphereRadius', function(value) {
            body = this.entity.rigidbody.body;
            body.setCcdSweptSphereRadius(value);
        });
    }
}
```

</TabItem>
<TabItem value="classic" label="Classic">

```javascript
var Ccd = pc.createScript('ccd');

Ccd.attributes.add('motionThreshold', {
    type: 'number',
    default: 1,
    title: 'Motion Threshold',
    description: 'Number of meters moved in one frame before CCD is enabled'
});

Ccd.attributes.add('sweptSphereRadius', {
    type: 'number',
    default: 0.2,
    title: 'Swept Sphere Radius',
    description: 'This should be below the half extent of the collision volume. E.g For an object of dimensions 1 meter, try 0.2'
});

// initialize code called once per entity
Ccd.prototype.initialize = function() {
    var body; // Type btRigidBody

    body = this.entity.rigidbody.body;
    body.setCcdMotionThreshold(this.motionThreshold);
    body.setCcdSweptSphereRadius(this.sweptSphereRadius);

    this.on('attr:motionThreshold', function(value, prev) {
        body = this.entity.rigidbody.body;
        body.setCcdMotionThreshold(value);
    });
    this.on('attr:sweptSphereRadius', function(value, prev) {
        body = this.entity.rigidbody.body;
        body.setCcdSweptSphereRadius(value);
    });
};
```

</TabItem>
</Tabs>

You can find a project that implements CCD [here][5].

These are just two examples of using the ammo.js API directly. You can also use it to implement additional things like:

- Compound collision shapes
- Soft body simulation
- Cloth simulation
- Vehicles

[1]: https://github.com/kripken/ammo.js/commit/dcab07bf0e7f2b4b64c01dc45da846344c8f50be
[2]: https://github.com/kripken/ammo.js/blob/dcab07bf0e7f2b4b64c01dc45da846344c8f50be/ammo.idl
[3]: https://github.com/bulletphysics/bullet3/blob/master/docs/Bullet_User_Manual.pdf
[4]: https://playcanvas.com/project/618829/overview/physics-constraints
[5]: https://playcanvas.com/project/447023/overview/physics-with-ccd
