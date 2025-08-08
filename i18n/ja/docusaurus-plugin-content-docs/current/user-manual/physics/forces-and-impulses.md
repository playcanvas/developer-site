---
title: 力と衝撃
---

ダイナミックなRigidBodyは力 (Force) や衝撃 (Impulse) に応答して移動します。力は一定の時間内にRigidBodyに加えられるのに対して、衝撃は瞬間的に加えられる力です。

RigidBodyに力や衝撃を加えるには、[pc.RigidBodyComponent scripting API][1] を使用する必要があります。

以下にいくつかの例を考えてみましょう。重い重りを床の上を押しやるためには、時間内に力を加えます。

```javascript
MyScript.prototype.update = function(dt) {
    // 右矢印キーが押されている場合、右に力を加える
    if (app.keyboard.isPressed(pc.KEY_RIGHT)) {
        this.entity.rigidbody.applyForce(10, 0, 0);
    }
};
```

大砲から砲弾を発射するには、一回の衝撃を加えます。

```javascript
MyScript.prototype.update = function(dt) {
    // スペースバーが押されたら、右上に衝撃を加える
    if (app.keyboard.wasPressed(pc.KEY_SPACE)) {
        this.entity.rigidbody.applyImpulse(10, 10, 0);
    }
};
```

[1]: https://api.playcanvas.com/engine/classes/RigidBodyComponent.html
