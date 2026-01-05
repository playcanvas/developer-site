---
title: ammo.jsのAPIを呼び出す方法
---

PlayCanvas の ammo.js 連携により、ammo.js API のすべての機能が公開されるわけではありません。ただし、PlayCanvas スクリプトから直接 ammo.js API を呼び出すことができます。

現在、PlayCanvas は ammo.js の [このビルド](https://github.com/kripken/ammo.js/commit/dcab07bf0e7f2b4b64c01dc45da846344c8f50be) を使用しています。このビルドが公開する API は [こちら](https://github.com/kripken/ammo.js/blob/dcab07bf0e7f2b4b64c01dc45da846344c8f50be/ammo.idl) で確認できます。ammo.js の公式ドキュメントはありませんが、[Bullet Physics User Guide](https://github.com/bulletphysics/bullet3/blob/master/docs/Bullet_User_Manual.pdf) を参照してください。

## ジョイント・コンストレイント (Joint Constraints)

現在、物理的制約（物理ジョイントとも呼ばれる）を実装するPlayCanvasのコンポーネントは存在しません。しかし、ammo.jsのAPIを利用して制約を実装するスクリプトを作成するのは容易です。

以下は、ポイント・トゥ・ポイント制約（基本的にはボールアンドソケットジョイント）のスクリプトです。

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

ammo.jsを使用したすべての制約タイプを実装したプロジェクトは、[こちら](https://playcanvas.com/project/618829/overview/physics-constraints)で見つけることができます。

## 連続衝突検出 (Continuous Collision Detection)

時には、シミュレーション内の高速移動する剛体同士が互いに通り抜けてしまうことがあります。これを克服するために、ammo.jsでは連続衝突検出（Continuous Collision Detection、略してCCD）という概念を提供しています。これにより、RigidBodyの前回と現在の位置の間に球体のボリュームをスイープし、他の物体のボリュームとの交差を検出することで、衝突の追加チェックが可能になります。

以下のスクリプトを使用することで、PlayCanvasの任意のRigidBodyにCCDを有効にすることができます。

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

[こちら](https://playcanvas.com/project/447023/overview/physics-with-ccd)でCCDを実装したプロジェクトを見つけることができます。

これらは、ammo.js APIを直接使用する例のほんの一部です。これを利用すると、他の機能も実装することができます。

* Compound collision shapes
* Soft body simulation
* Cloth simulation
* Vehicles
