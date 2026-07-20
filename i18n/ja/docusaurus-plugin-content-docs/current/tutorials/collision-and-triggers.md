---
title: 衝突とトリガーの処理
tags: [collision, physics]
thumb: "https://s3-eu-west-1.amazonaws.com/images.playcanvas.com/projects/12/405871/0D7E2F-image-75.jpg"
description: Rigid Body付きのコリジョン形状で物理接触を処理し、動きを妨げないトリガーボリュームを作成します。
---

<div className="iframe-container">
    <iframe src="https://playcanv.as/p/1Hj5fX2I/" title="Collision and Triggers" allow="camera; microphone; xr-spatial-tracking; fullscreen" allowFullScreen></iframe>
</div>

*剛体同士が衝突すると効果音が再生され、トリガーボリュームに入るとランプの上へ戻ります。*

このチュートリアルでは、剛体物理、衝突イベント、トリガーボリュームの基本を紹介します。完成したシーンは[チュートリアルプロジェクト](https://playcanvas.com/project/405871)で確認できます。

新しいプロジェクトでシーンを再現する場合は、剛体を追加する前に[物理機能を有効化](/user-manual/physics/physics-basics/#enabling-physics)してください。

## コリジョン形状

[Collisionコンポーネント](/user-manual/editor/scenes/components/collision/)は、エンティティを囲むボリュームを定義します。単独で使用するとトリガーボリュームとして機能し、[Rigid Bodyコンポーネント](/user-manual/editor/scenes/components/rigidbody/)と組み合わせると剛体の物理形状を定義します。

**Type**プロパティでは、次の7種類のコリジョン形状を選択できます。

- **Box** - 直方体です。
- **Sphere** - 球体です。
- **Capsule** - 両端が丸い円柱で、キャラクターによく使用されます。
- **Cylinder** - 選択したローカル軸に沿った円柱です。
- **Cone** - 選択したローカル軸に沿った円錐です。
- **Mesh** - ModelまたはRenderアセットから生成するコリジョン形状です。動的剛体でメッシュを使用する場合は、**Convex Hull**を有効にします。
- **Compound** - 子孫エンティティ上のプリミティブ形状を組み合わせた形状です。

一般に、プリミティブ形状はメッシュ形状よりもシミュレーションの負荷が低いため、オブジェクトに無理なく合う最も単純な形状を使用してください。

### トリガーボリューム

トリガーボリュームを作成するには、エンティティにCollisionコンポーネントを追加し、Rigid Bodyコンポーネントは追加しません。トリガーは他の剛体の動きを物理的に遮りません。代わりに、動的またはキネマティック剛体が境界を横切ると、`triggerenter`イベントと`triggerleave`イベントを発生させます。

このチュートリアルでは、ランプの下に大きなボックス形状のトリガーを配置し、落下した剛体をランプの上へ戻します。

![EditorのPhysics表示モードで見たチュートリアルシーン](/img/tutorials/collision/viewport-physics-mode.png)

EditorのPhysics表示モードを使用すると、ビューポート内でコリジョンボリュームとトリガーボリュームを確認できます。

### 剛体

Rigid Bodyコンポーネントは、エンティティを物理シミュレーションに参加させます。質量、摩擦、反発、減衰などのプロパティを設定できます。形状を定義するには、同じエンティティにCollisionコンポーネントも必要です。

両方のコンポーネントを追加すると、デフォルトでは静的なボックス形状の剛体が作成されます。

![Dynamicに設定したRigid Bodyコンポーネント](/img/user-manual/editor/scenes/components/component-rigid-body-dynamic.png)

Rigid Bodyの**Type**は、剛体の動き方を決定します。

- **Static** - 移動しません。通常は地形などの環境に使用します。
- **Dynamic** - 物理シミュレーションによって制御され、重力、力、衝突に反応します。
- **Kinematic** - コードから明示的に移動します。動的剛体には影響を与えますが、力には反応しません。

## 地面の設定

地面は、ランプの下にある大きな緑色のブロックです。

![地面エンティティのコンポーネント設定](/img/tutorials/collision/ground-setup.png)

Render、Collision、Rigid Bodyコンポーネントを追加します。CollisionのTypeを**Box**、**Half Extents**を`10, 1, 10`に設定し、Rigid BodyのTypeを**Static**に設定します。この例では、摩擦を`0.9`、反発を`0.5`に設定し、滑りにくく少し弾む表面にしています。

## トリガーの設定

ランプの下にトリガー用のエンティティを作成します。

![トリガーエンティティのコンポーネント設定](/img/tutorials/collision/trigger-setup.png)

BoxのCollisionコンポーネントを追加し、**Half Extents**を`20, 2, 20`に設定します。Rigid Bodyコンポーネントは追加しません。Scriptコンポーネントを追加し、次の`trigger`スクリプトをアタッチして、剛体がボリュームに入るイベントを監視します。

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs defaultValue="esm" groupId="script-code">
<TabItem value="esm" label="ESM">

```javascript
import { Script, Vec3 } from 'playcanvas';

export class Trigger extends Script {
    static scriptName = 'trigger';

    initialize() {
        const triggerEnterEvent = this.entity.collision.on('triggerenter', this.onTriggerEnter, this);

        this.on('destroy', () => {
            triggerEnterEvent.off();
        });
    }

    onTriggerEnter(entity) {
        entity.rigidbody.linearVelocity = Vec3.ZERO;
        entity.rigidbody.angularVelocity = Vec3.ZERO;

        // Return the body to the top of the ramp.
        const position = entity.getPosition();
        entity.rigidbody.teleport(position.x, 10, 0);
    }
}
```

</TabItem>
<TabItem value="classic" label="Classic">

```javascript
var Trigger = pc.createScript('trigger');

Trigger.prototype.initialize = function () {
    var triggerEnterEvent = this.entity.collision.on('triggerenter', this.onTriggerEnter, this);

    this.on('destroy', function () {
        triggerEnterEvent.off();
    });
};

Trigger.prototype.onTriggerEnter = function (entity) {
    entity.rigidbody.linearVelocity = pc.Vec3.ZERO;
    entity.rigidbody.angularVelocity = pc.Vec3.ZERO;

    // Return the body to the top of the ramp.
    var position = entity.getPosition();
    entity.rigidbody.teleport(position.x, 10, 0);
};
```

</TabItem>
</Tabs>

`triggerenter`イベントは、剛体がボリュームに入ったときに一度発生します。コールバックには、ボリュームに入った[Entity](https://api.playcanvas.com/engine/classes/Entity.html)が渡されます。つまり、`this.entity`はトリガーエンティティであり、コールバックの`entity`引数は落下してきた剛体です。`on`の3番目の引数は、コールバック内の`this`をスクリプトインスタンスに設定します。

スクリプトが破棄されると、イベントハンドルも解除されます。`onTriggerEnter`では、剛体の直線速度と角速度を消去し、現在のX位置を保ったまま、`rigidbody.teleport`でランプの上へ移動します。動的剛体の位置は、エンティティのTransformを直接設定するのではなく、Rigid Body APIを使用して変更する必要があります。対応する`triggerleave`イベントは、剛体がボリュームから出たときに同じ仕組みで発生します。

## 動的剛体の設定

ボックス、球体、カプセルにRigid BodyコンポーネントとCollisionコンポーネントを追加します。それぞれのRigid BodyのTypeを**Dynamic**に設定し、形状に対応するCollisionのTypeを選択します。

![動的ボックスのRigid Body設定](/img/tutorials/collision/box-setup.png)

この例のボックスでは、質量を`1`、摩擦を`0.5`、反発を`0.5`に設定しています。球体とカプセルにも同じRigid Body設定を使用します。

## 衝突イベントの処理

Collisionコンポーネントは、剛体同士の物理接触に対して3つのイベントを発生させます。

- `contact` - 剛体が接触している間、物理ステップごとに発生します。結果には、そのステップのすべての接触点が含まれます。
- `collisionstart` - 剛体が接触し始めたときに一度だけ発生します。
- `collisionend` - 剛体が接触しなくなったときに一度だけ発生します。

継続的に更新される接触情報が必要な場合は`contact`を使用します。衝突音のように一度だけ実行する処理では、物理ステップごとに効果が繰り返されないように`collisionstart`を使用します。

<Tabs defaultValue="esm" groupId="script-code">
<TabItem value="esm" label="ESM">

```javascript
import { Script } from 'playcanvas';

export class Collider extends Script {
    static scriptName = 'collider';

    initialize() {
        const collisionStartEvent = this.entity.collision.on('collisionstart', this.onCollisionStart, this);

        this.on('destroy', () => {
            collisionStartEvent.off();
        });
    }

    onCollisionStart() {
        this.entity.sound.play('hit');
    }
}
```

</TabItem>
<TabItem value="classic" label="Classic">

```javascript
var Collider = pc.createScript('collider');

Collider.prototype.initialize = function () {
    var collisionStartEvent = this.entity.collision.on('collisionstart', this.onCollisionStart, this);

    this.on('destroy', function () {
        collisionStartEvent.off();
    });
};

Collider.prototype.onCollisionStart = function () {
    this.entity.sound.play('hit');
};
```

</TabItem>
</Tabs>

`hit`という名前のスロットを持つSoundコンポーネントを各落下エンティティに追加し、このスクリプトをアタッチします。物理衝突が始まるとハンドラーが一度実行され、そのスロットを再生します。トリガーとの重なりではトリガーイベントが発生するため、この衝突ハンドラーは呼び出されません。

これで、静的な地面、動的な落下オブジェクト、それらをリセットするトリガー、衝突音を再生するイベントが揃いました。詳細については、[物理の基本](/user-manual/physics/physics-basics/)と[CollisionコンポーネントAPI](https://api.playcanvas.com/engine/classes/CollisionComponent.html)を参照してください。
