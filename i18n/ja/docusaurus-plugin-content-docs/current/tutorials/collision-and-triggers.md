---
title: 衝突とトリガーの処理
tags: [collision, physics]
thumb: "https://s3-eu-west-1.amazonaws.com/images.playcanvas.com/projects/12/405871/0D7E2F-image-75.jpg"
---

<div className="iframe-container">
    <iframe src="https://playcanv.as/p/1Hj5fX2I/" title="Collision and Triggers" allow="camera; microphone; xr-spatial-tracking; fullscreen" allowfullscreen></iframe>
</div>

*RigidBodyが互いに衝突すると、衝突音が再生され、トリガーボリュームが形状をリセットします。*

このチュートリアルでは、剛体物理、衝突検出、およびトリガーボリュームの基本を紹介します。これらの概念を探索するために、[チュートリアルプロジェクト](https://playcanvas.com/project/405871)をご覧ください。

## Collisionコンポーネント

*Collision* コンポーネントは、他のエンティティがその形状に入ったり出たりしたときにイベントをトリガーするために使用することができます（これをトリガーボリュームと呼びます）。また、*RigidBody* コンポーネントと組み合わせて、ゲーム内のエンティティに物理的な特性を与えることもできます。たとえば、跳ねるボールや重い木箱などです。

*Collision*コンポーネントの最も重要なプロパティは、その **Type**です。これは使用されるボリュームの形状を決定します。以下の4つのオプションがあります。

- **Box** シンプルなボックス
- **Sphere** シンプルな球体
- **Capsule** ピル形のカプセル。キャラクターには有用で、高くて細長く、丸いベースと単一の接触点があります。
- **Mesh**: 任意のメッシュ形状をボリュームに使用することができます。
**注意** ただし、メッシュコリジョンの使用にはいくつかの制限があります。特に、*RigidBody* コンポーネントと組み合わせて使用する場合、メッシュは**Static**に設定する必要があります。

### トリガーボリューム

トリガーボリュームを作成するには、単にエンティティに *Collision* コンポーネントを追加するだけです。このチュートリアルでは、斜面の下に大きなボックス形状のトリガーボリュームを追加して、落ちてくるオブジェクトをキャッチし、位置をリセットします。

![Collisions & Triggers](/img/tutorials/collision/collision_and_triggers.jpg)

ランプの下にあるトリガーボリュームを青い外枠で表示しています。

### RigidBody

Rigid Body (剛体) は、ゲーム世界における物理的なオブジェクトを表します。質量や摩擦などの実際の物理特性を設定することができます。他の剛体と衝突し、物理法則に基づいて現実的な反応を示します。

シーン内で剛体を作成するには、エンティティを選択し、 *RigidBody* コンポーネントと *Collision* コンポーネントを追加します。デフォルトでは、これにより **static box** の剛体が作成されます。 *RigidBody*  コンポーネントには、オブジェクトのプロパティを調整するために使用できるさまざまなオプションが提供されています。

![rigidbody component](/img/user-manual/editor/scenes/components/component-rigid-body-dynamic.png)

各プロパティの詳細については、[*RigidBody*のドキュメント](/user-manual/editor/scenes/components/rigidbody/)を参照してください。

このデモでは、重要なプロパティは **Type** です。3つのオプションのうち1つを選択できます。

- **Static** このエンティティは移動しません。
- **Dynamic** このエンティティは、それに適用する重力や他の力の下で移動します。
- **Kinematic** このエンティティは力に反応しないが、直接位置や速度を設定すると移動します。

## 地面の設定

最初に必要なのは、地面を形成する緑色のブロックです。

<img loading="lazy" src="/img/tutorials/collision/ground_setup.png" width="300" />

属性パネルで、*render*、*collision*、*rigidbody*コンポーネントを持つのが見えます。エンティティと*collision*全体のプロパティを増やしています。また、摩擦力と反発力のプロパティもわずかに増加しています。これにより、表面がデフォルトよりもやや粗く、やや弾力性がある状態になります。

## トリガーの設定

次に必要なのはトリガーです。

![Trigger Entity](/img/tutorials/collision/trigger_setup.jpg)

このエンティティには*collision*コンポーネントがありますが、*rigidbody*がないためトリガーとして機能します。トリガーEntityには、コードが添付された*script*コンポーネントもあります。トリガーは、トリガーがアクティブになったときに何かが起こる場合のみ有用であるため、トリガーがアクティブになったときにf音声効果が再生されるように、いくつかのコードを追加する必要があります。

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

下記のコードには2つの重要なパートがあります。

```initialize``` メソッドでは、**triggerenter** イベントのリスニングを開始します。このイベントは、剛体がトリガーボリュームに入ったときに一度だけトリガーされます。トリガーボリュームは、コリジョンコンポーネントを持つが剛体コンポーネントを持たないエンティティを指します。対応するイベントは **triggerleave** であり、侵入していた剛体がトリガーボリュームから離れたときに一度だけ発火します。

```javascript
this.entity.collision.on('triggerenter', this.onTriggerEnter, this);
```

注意してください、三番目の引数の ```this``` は、イベントリスナーで使用される「スコープ」を表します。通常、現在のスクリプトオブジェクトを三番目の引数として追加することで、イベントリスナー内の ```this``` の値が同じスクリプトオブジェクトを参照するようにします。

このコードの2番目の部分は、イベントを処理する関数であり、 ```onTriggerEnter``` です。トリガーが入力されると、この関数が呼び出され、トリガーボリュームに入る[```Entity```](https://api.playcanvas.com/engine/classes/Entity.html)オブジェクトが渡されます。

この場合、トリガーが発火したときに、貫通するエンティティをスタート地点にリセットし、その速度をリセットします。

## 動的オブジェクトの設定

地面を **Static** に設定しました。次に、落下するオブジェクトを作成し、それらが **Dynamic** であることを確認します。

<img loading="lazy" src="/img/tutorials/collision/box_setup.png" width="300" />

これは、ボックスの *rigidbody* と *collision* の設定です。球体とカプセルも同じように設定されています。

## 衝突イベント (Contact Events)

*collision*コンポーネントには3つのイベントがあります。

- **contact** 2つのRigidBodyが触れたときに発生するそれぞれの接触点のために発生します。
- **collisionstart** 2つのRigidBodyが接触して最初に発生するときに発生します。
- **collisionend** 2つのRigidBodyが分離するときに発生します。

**contact**と**collisionstart**の違いは微妙ですが重要です。平面に対して角度を持った立方体が着地する場合を想像してみましょう。立方体の辺が平面に触れる瞬間、立方体の2つの角が同時に接触します。この場合、3つのイベントが発生します。立方体の各角に対して2つの**contact**イベントと1つの**collisionstart**イベントです。立方体が回転し続けて落ちる間、そのまま平面と接触し続けます。最終的に平面に平らに着地したとき、立方体の辺が平面に接触するためにさらに2つの**contact**イベントが発生します。ただし、立方体はその間ずっと平面と接触し続けているため、追加の**collisionstart**イベントは発生しません。

両方のイベントは有用ですが、このデモでは **collisionstart** イベントを使用して、オブジェクトが地面に衝突したときに再生される効果音をトリガーします。以下にコードを示します。

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

```initialize``` メソッドでは、イベントリスナーを設定し、その後、イベントハンドラーで他のエンティティが **rigidbody** コンポーネントを持っているかどうかをチェックします（これはトリガーボリュームに入ったときにサウンドが再生されるのを避けるためです）。そして、"hit" サウンドエフェクトを再生します。したがって、コライダースクリプトがアタッチされたエンティティが他の剛体と衝突するたびに、ヒット音が再生されます。

以上がPlayCanvasでの衝突とトリガーの処理方法です。
