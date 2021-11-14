---
title: Collision and Triggers
template: tutorial-page.tmpl.html
tags: collision, physics
thumb: https://s3-eu-west-1.amazonaws.com/images.playcanvas.com/projects/12/405871/0D7E2F-image-75.jpg
---

<iframe src="https://playcanv.as/p/1Hj5fX2I/"></iframe>

*剛体が互いに衝突すると音がなります。剛体がトリガーボリュームに当たると元の場所に戻ります。*

このチュートリアルでは剛体の物理、当たり判定とトリガーボリュームの基礎を紹介します。[チュートリアルプロジェクト][1]を参照してください。

## コリジョンコンポーネント

*コリジョン - 当たり判定*コンポーネントは二つの用途に使うことができる形状を定義します。一つは他のエンティティが形状の中に入ってきたり出て行った時にイベントを発生させるトリガーボリュームと呼ばれる用途、もう一つは*rigidbody*コンポーネントと組み合わせて、エンティティに弾むボールや重い箱のような物理的な性質をゲーム内で与える用途です。

*コリジョン*コンポーネントで最も重要なプロパティは、その**タイプ**です。これは使用する当たり判定の形状を決定します。全部で四種類があります:

* **Box** A simple box
* **Sphere** A simple sphere
* **Capsule** A pill-shaped capsule. Useful for characters, as it can be tall and thin, but has a nice rounded-base with a single contact point.
* **Mesh** Use any arbitrary mesh shape for the volume. **Note** There are some limitations to the mesh collision, in particular, when using it with the *rigidbody* component, they must be **Static**.

### トリガーボリューム

トリガーボリュームは、エンティティに*collision*コンポーネントを追加することで作ることができます。このチュートリアルでは大きな箱型のトリガーボリュームを坂道の下に置き、落ちてきた物体を検出して元の場所に戻すために使います。

![当たり判定とトリガー][3]

ブルーの枠線で表示されたトリガーボリュームが、坂道の下に表示されているのがわかります。

### Rigid Bodies - 剛体

Rigid Body - 剛体はゲーム世界の中の物理的な存在をあらわします。重量や摩擦などの物理的な性質を設定することができ、自分以外の剛体を衝突したとき、現実的な反応をします。

剛体をシーン内に作るには、エンティティを選択して*rigidbody*コンポーネントと*collision*コンポーネントを追加してください。デフォルトでは**static box**が作られます。**rigidbody**コンポーネントは物体の性質を調整するために様々な設定を行うことができます。

![rigidbodyコンポーネント][4]

各プロパティの詳細は[*rigidbody* ドキュメント][5]をご確認ください。

このデモで重要なプロパティは**Type**です。以下の三種類があります。

* **Static** this Entity will never move.
* **Dynamic** this Entity will move under gravity and any other forces that you apply to it.
* **Kinematic** this Entity will not respond to forces, but will move if you directly set it's position or velocity.

## 地面の設定

チュートリアルのはじめの一歩として、地面となる緑色のブロックを作ります。

<img src="/images/tutorials/collision/ground_setup.png" width="300px">

You can see in the attribute panel, that it has *render*, *collision* and *rigidbody* components. We've increased the Entity and the *collision* box properties so that it is nice and large. And we've also slightly increased the friction and restitution properties. This means that the surface is slightly rougher and slightly bouncier than the defaults.

## トリガーの設定

次にトリガーとなるエンティティを作成します。

![トリガーエンティティ][7]

このエンティティは*collision*コンポーネントはありますが、*rigidbody*コンポーネントはありません。そのためこのエンティティはトリガーとして振る舞います。このトリガーエンティティにはコードが書き込まれた*script*コンポーネントが与えられています。トリガーは発生した時に何らかの処理を行った時はじめて意味があるものになります。そのため、処理を行うコードとトリガーが発生した際のイベントを監視するコードを追加する必要があります。

```javascript
var Trigger = pc.createScript('trigger');

// initialize code called once per entity
Trigger.prototype.initialize = function() {
    this.entity.collision.on('triggerenter', this.onTriggerEnter, this);
};

Trigger.prototype.onTriggerEnter = function(entity) {
    entity.rigidbody.linearVelocity = pc.Vec3.ZERO;
    entity.rigidbody.angularVelocity = pc.Vec3.ZERO;
    // Reset back to roughly the position the entity started in.
    var position = entity.getPosition();
    entity.rigidbody.teleport(position.x, 10, 0);
};
```

上記のコードには大きく分けて二つの機能があります。

まず、```initialize```メソッド内で**triggerenter**イベントの監視を始めます。このイベントは剛体がトリガーボリューム(collisionコンポーネントのみを持ち、rigidbodyコンポーネントを持たないエンティティ)に入った時に発生します。対応する反対のイベントは**triggerleave**イベントで、これは剛体がトリガーボリュームの外に出た時に発生します。

```javascript
this.entity.collision.on('triggerenter', this.onTriggerEnter, this);
```

三番目の引数である```this```はイベントリスナーで使われる'scope'であることに注意してください。通常は三番目の引数として、現在のスクリプトオブジェクトを与えます。これはイベントリスナー内の```this```の値をイベントリスナーを設定しているスクリプトオブジェクトと同じものにするためです。

このコードの二番目の部分は、イベント処理部分の```onTriggerEnter```.です。トリガーが発生すると、この関数が呼び出されてトリガーボリュームに入ってくる[```Entity```][8]オブジェクトが渡されます。

このサンプルでトリガーが発生した場合は、トリガーボリュームに侵入したエンティティを初期位置にリセットし、同時に速度もリセットしています。

## Rigid Bodies - 剛体

地面は**Static**な剛体として設定します。さらに、落ちてくるオブジェクトを作成し、**Dynamic**として設定します。

<img src="/images/tutorials/collision/box_setup.png" width="300px">

ボックスコンポーネント用の*rigidbody*と*collision*設定を行います。球とカプセルについても同様に設定します。

## 接触イベント

*collision*コンポーネントには三種類のイベントが用意されています。

* **contact** - fires for every point of contact when two rigid bodies touch.
* **collisionstart** - fires at the start of a collision when two rigid bodies touch.
* **collisionend** - fires when two rigid bodies separate.

**contact**と**collisionstart**の違いはささいなことですが重要なものです。立方体が一定の角度で平面に落ちるとします。立方体の辺が平面に触ったとき、立方体の二つの頂点が同時に平面に当たります。この状態では、三つのイベントが発生します。二つの**contact**イベントがそれぞれの頂点向けに発生し、さらに一つの**collisionstart**イベントが発生します。そして立方体は平面上に静止するまで回転して落ち続けます。その間ずっと平面上と何らかの形で接触し続けるものとします。平面上に静止したとき、頂点が平面に触った時、さらに二つの**contact**イベントが発生します。しかし、立方体は平面に触れ続けているので、**collisionstart**が追加で発生することはありません。

どちらのイベントも便利ですが、このデモでは**collisionstart**イベントを地面に触れた時の効果音を鳴らすトリガーとして使用しています。以下がコードです:

```javascript
var Collider = pc.createScript('collider');

// initialize code called once per entity
Collider.prototype.initialize = function () {
    this.entity.collision.on('collisionstart', this.onCollisionStart, this);
};

Collider.prototype.onCollisionStart = function (result) {
    if (result.other.rigidbody) {
        this.entity.sound.play("hit");
    }
};
```

In the ```initialize``` method we set up the event listener, and then in the event handler we check to see if the other entity has a **rigidbody** component (this is to avoid playing a sound when we enter a trigger volume) and then we play the "hit" sound effect. So now, every time an Entity with the collider script attached collides with another rigid body, it will play the hit sound.

これでPlayCanvasでの当たり判定とトリガーの扱い方の説明を終わります。

[1]: https://playcanvas.com/project/405871
[3]: /images/tutorials/collision/collision_and_triggers.jpg
[4]: /images/user-manual/scenes/components/component-rigid-body-dynamic.png
[5]: /user-manual/packs/components/rigidbody/
[6]: /images/tutorials/collision/ground_setup.png
[7]: /images/tutorials/collision/trigger_setup.jpg
[8]: /engine/api/stable/symbols/pc.Entity.html
[9]: /images/tutorials/collision/box_setup.png

