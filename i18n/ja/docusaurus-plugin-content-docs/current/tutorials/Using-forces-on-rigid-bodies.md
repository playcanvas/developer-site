---
title: 力と衝撃
tags: [physics, collision]
thumb: "https://s3-eu-west-1.amazonaws.com/images.playcanvas.com/projects/12/405828/95F429-image-75.jpg"
---

<div className='iframe-container'>
    <iframe src="https://playcanv.as/p/8LTSuf4F/" title="Forces and Impulses" />
</div>

*カーソルキーを使用してインパルスを適用し、WASDキーを使用してトルクを適用し、キューブを回転させることができます。Fキーを押し続けると、重力の影響をキャンセルするために一定の上向きの力が適用されます。*
*Rキーを押すと、キューブがリセットされます。*

*キューブを角で立たせ回転させてみましょう！**使用されている完全なコードはこのページの下部に表示されています。*

このチュートリアルでは、力を使用して動的なリジッドボディを制御し、上に示したデモを生成する方法を説明します。力、衝動、トルクの利用とリジッドボディコンポーネントUIを使用して動作をカスタマイズする方法を簡単に説明します。

## 力のスクリプティング

### 一定の力を適用

```javascript
if (app.keyboard.isPressed(pc.KEY_F) ) {
    this.entity.rigidbody.applyForce(0, 9.8, 0);
}
```

ユーザーがFキーを押すと、[`applyForce(x, y, z)`](https://api.playcanvas.com/engine/classes/RigidBodyComponent.html#applyforce)を介して、グローバルy軸に沿った力がアクセスされたエンティティに適用されます。また、力ベクトルの適用ポイントも設定できます。

### インパルス (Impulses)

```javascript
if (app.keyboard.isPressed(pc.KEY_LEFT) ) {
    this.entity.rigidbody.applyImpulse(-1, 0, 0);
}
```

[`applyImpulse(x, y, z)`](https://api.playcanvas.com/engine/classes/RigidBodyComponent.html#applyimpulse)を介して、キューブにx軸のインパルスを与えて、瞬時の速度変化を与えます。

### トルク (Torques)

```javascript
if (app.keyboard.isPressed(pc.KEY_W) ) {
    this.entity.rigidbody.applyTorque(-this.torque, 0, 0);
}
```

[トルク](https://en.wikipedia.org/wiki/Torque) (回転力)は、[`applyTorque(x, y, z)`](https://api.playcanvas.com/engine/classes/RigidBodyComponent.html#applytorque)を介してエンティティに適用されます。

### トルクインパルス (TorqueImpulses)

```javascript
this.entity.rigidbody.applyTorqueImpulse(x, y, z)
```

瞬間的な角速度の変化は、[`applyTorqueImpulse(x, y, z)`](https://api.playcanvas.com/engine/classes/RigidBodyComponent.html#applytorqueimpulse)を介して適用されます。これは、上記のデモのコードでは使用されませんでした。

## RigidBodyの移動

RigidyBodyを移動するには、上記のメソッドを使用して線形力と回転力(トルク)を適用します。オブジェクトが衝突する場合、直接位置や速度を変更することは避けるべきであり、これによりシミュレーションが上書きされ、特にオブジェクトが衝突する場合に奇妙な効果が生じる可能性があります。

ただし、必要な場合は、`entity.rigidbody.linearVelocity`または`entity.rigidbody.angularVelocity`に新しい '[pc.Vec3](https://api.playcanvas.com/engine/classes/Vec3.html)'の値を直接割り当てることで、速度を上書きできます。

RigidBodyの詳細については、[CollisionのAPIページ](https://api.playcanvas.com/engine/classes/CollisionComponent.html)、[pcの名前空間ページ](https://api.playcanvas.com/engine/)、[一人称視点の移動](/tutorials/first-person-movement/)、[Collisionのチュートリアル](/tutorials/collision-and-triggers/)を参照してください。

## 一般的なセットアップ

スポットライト、キューブ(モデル、剛体、衝突、スクリプトコンポーネントを持つエンティティ)、フロア(モデル、剛体、衝突コンポーネントを持つ)を含む基本シーンをセットアップしました。立方体の剛体は動的に設定され、フロアの剛体は静的に設定されました。それぞれの箱に対していくつかのマテリアルを作成し、拡散色を変更して視覚的に見やすくしました。SpotLightとDynamicBodyの両方で "キャストシャドウ"オプションをアクティブにしました。完全な 'usingForces'シーンとコードについては、[このPlayCanvasアプリ](https://playcanvas.com/project/405828/overview/tutorial-forces--impulses)で確認できます。

## 制限と制御

一定のバランスのとれていない力を継続的に適用することを防ぎ、(物体が継続的に加速して制御を失うことを防ぐために)エディタ設定を行いました。立方体の属性エディタで角速度減衰を有効にし、立方体とフロアの両方で摩擦を有効にしました。ここでは線形減衰は使用されていませんが、空気抵抗をシミュレートするために使用でき、必要に応じて減速をコードで適用できます。

<img loading="lazy" src="/img/tutorials/forces/rigidbody_settings.jpg" alt="rigidbody_settings" />

## RigidBodyのテレポート

RigidBodyを瞬時に新しい位置にテレポートするには、pc.Entity APIのsetPosition関数を使用できません。これは、物理エンジンがまだボディが古い位置にあると思っているためです。代わりに、RigidBodyコンポーネントのteleport関数を使用する必要があります。

```javascript
//code within the update function
this.playerPos = this.entity.getLocalPosition();

// Keeping the cube on screen - cube moves off of one screen edge then appears from the opposite edge.
if (this.playerPos.x < -9.0) {
    this.entity.rigidbody.teleport(8.8, this.playerPos.y, this.playerPos.z);
}
if (this.playerPos.x > 9.0) {
    this.entity.rigidbody.teleport(-8.8, this.playerPos.y, this.playerPos.z);
}
```

キューブがx方向の可視範囲を超えると、teleport関数が呼び出され、立方体エンティティが画面を横切ってテレポートされます。エンティティを連続的に`if()`文をアクティブ化することを防ぐために、エンティティをより左右に移動するようにテレポートされます。

## キューブのコードをリセット

```javascript
if (app.keyboard.wasPressed(pc.KEY_R)) {
    this.reset();
}
```

```javascript
reset: function () {
    this.entity.rigidbody.teleport(0, 2, 0);
    this.entity.rigidbody.linearVelocity = pc.Vec3.ZERO;
    this.entity.rigidbody.angularVelocity = pc.Vec3.ZERO;
}
```

上記に加えて、キューブを元の位置に戻すリセット機能が含まれています。上記のように、RigidBodyの場所をテレポートされたエンティティの場所に同期させます。リセット関数の最後の2行は、RigidBodyの線形および角速度をゼロにリセットします。オブジェクトの向きもリセットできますが、このコードでは実行されていません。

## 完全なコードリスト

```javascript
var DynamicBody = pc.createScript('dynamicBody');

// initialize code called once per entity
DynamicBody.prototype.initialize = function() {
    this.torque = 7;
    this.app.keyboard.on(pc.EVENT_KEYDOWN, this.onKeyDown, this);

    this.on('destroy', function() {
        this.app.keyboard.off(pc.EVENT_KEYDOWN, this.onKeyDown, this);
    }, this);
};

DynamicBody.prototype.onKeyDown = function (event) {
    event.event.preventDefault();
};

// update code called every frame
DynamicBody.prototype.update = function(dt) {
    //update player's position
    this.playerPos = this.entity.getLocalPosition();

    var app = this.app;

    //keyboard controls and applying forces and moments.
    if (app.keyboard.isPressed(pc.KEY_LEFT) ) {
        this.entity.rigidbody.applyImpulse(-1, 0, 0);
    }
    if (app.keyboard.isPressed(pc.KEY_RIGHT) ) {
        this.entity.rigidbody.applyImpulse(1, 0, 0);
    }
    if (app.keyboard.isPressed(pc.KEY_UP) ) {
        this.entity.rigidbody.applyImpulse(0, 1, 0);
    }
    if (app.keyboard.isPressed(pc.KEY_A) ) {
        this.entity.rigidbody.applyTorque(0, this.torque, 0);
    }
    if (app.keyboard.isPressed(pc.KEY_D) ) {
        this.entity.rigidbody.applyTorque(0, -this.torque, 0);
    }
    if (app.keyboard.isPressed(pc.KEY_W) ) {
        this.entity.rigidbody.applyTorque(-this.torque, 0, 0);
    }
    if (app.keyboard.isPressed(pc.KEY_S) ) {
        this.entity.rigidbody.applyTorque(this.torque, 0, 0);
    }
    if (app.keyboard.isPressed(pc.KEY_F) ) {
        this.entity.rigidbody.applyForce(0, 9.8, 0);
    }

    // Keeping the cube on screen - cube moves off of one screen edge then appears from the opposite edge.
    if (this.playerPos.x < -9.0) {
        this.entity.rigidbody.teleport(8.8, this.playerPos.y, this.playerPos.z);
    }
    if (this.playerPos.x > 9.0) {
        this.entity.rigidbody.teleport(-8.8, this.playerPos.y, this.playerPos.z);
    }

    // cube reset control
    if (app.keyboard.wasPressed(pc.KEY_R) ) {
        this.reset();
    }
};

DynamicBody.prototype.reset = function () {
    this.entity.rigidbody.teleport(0, 2, 0);
    this.entity.rigidbody.linearVelocity = pc.Vec3.ZERO;
    this.entity.rigidbody.angularVelocity = pc.Vec3.ZERO;
};
```
