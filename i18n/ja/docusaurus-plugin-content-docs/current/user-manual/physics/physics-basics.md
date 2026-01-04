---
title: 物理の基本
---

PlayCanvasには、[ammo.js][1]という非常に強力な物理エンジンが組み込まれています。これは、オープンソースのC++ Bullet物理エンジンのブラウザポートです。

PlayCanvasには、物理シミュレーションをセットアップするための[RigidBody][2] および[Collision][3] コンポーネントがあります。

## 物理を有効化 {#enabling-physics}

デフォルトでは、新しいPlayCanvasプロジェクトにはammo.jsモジュールは含まれません。これは、ammo.jsが数百キロバイトあり、アプリがこのライブラリを必要としない場合は読み込む必要がないためです。

Scene Settingsパネルのインポートボタンを使用して、ammo.jsモジュールをプロジェクトにインポートできます。

![Physics Settings](/img/user-manual/physics/physics-settings.png)

これにより、PlayCanvasが提供するammo.jsのデフォルトビルドがインポートされます。独自のバージョンのammo.jsをコンパイルし、代わりにプロジェクトに追加することもできます。詳細は、[このページ][11]を参照してください。

従来のプロジェクトを最新のammo.jsに移行する方法の詳細は、 [このページ][10]を参照してください。

## 重力 (Gravity) {#gravity}

同じ設定パネルで、物理シミュレーションのグローバルな重力を設定できます。重力はシーン内のすべてのRigidBodyに適用される一定の力です。デフォルトでは、ワールドの負のY軸に-9.81に設定されています(つまり、直下)。このデフォルトは、地球の重力に近い値です。この値を増減することもできます。例えば、宇宙設定のゲームでは重力をゼロに設定することも可能です。

## 測定の単位 {#units-of-measurement}

デフォルトでは、PlayCanvas物理エンジンは1メートルを1 unit（単位）としています。オブジェクトを物理的に正確な速度で落下させるには、シーンのオブジェクトサイズが適切であることを確認する必要があります。

たとえば、高さ1.8mのキャラクターがゲームに登場する場合、エディターの3Dビューでの高さは1.8ユニットである必要があります。

## RigidBody {#rigid-bodies}

シーン内の任意のエンティティを物理シミュレーションに参加させることができます。RigidBodyコンポーネントとCollisionコンポーネントを追加するだけです。RigidBodyコンポーネントはタイプを指定します：

- Static - 移動しない物理オブジェクト
- Dynamic - 適用された力に応じて移動する物理オブジェクト
- Kinematic - APIを介して明示的にのみ配置できる物理オブジェクト

また、質量、摩擦、反発などの物理的プロパティも指定されます（本質的に「弾力性」の計測）。

Collisionコンポーネントは、ボディの物理的な形状を指定します。RigidBodyの物理的な形状は、グラフィカルな形状と一致している必要はありません。一般的に、オブジェクトの物理的な表現は、グラフィックよりもはるかに単純です。使用可能なCollisionコンポーネントのタイプは次のとおりです。

- Box
- Sphere
- Capsule
- Cylinder
- Mesh
- Cone
- [Compound][12]

## Staticなグラウンドの作成 {#creating-a-static-ground}

ほとんどの場合、何らかのStaticな物理環境を作成する必要があります。たとえば、競馬場やサッカー場などです。最も単純な例は平面です。PlayCanvasは平面タイプのCollisionプリミティブを公開しませんが、ボックスのプリミティブを提供します。StaticなRigidBodyである1単位の高さの10x10ボックスを設定する方法は次のとおりです。

![Static Ground](/img/user-manual/physics/static-ground.png)

より複雑なものが必要な場合は、CollisionコンポーネントタイプをMeshに設定し、モデルアセットを割り当てることもできます。

## Dynamicボディの作成 {#creating-dynamic-bodies}

物理は動きに関連するものです。DynamicなRigidBodyを作成するとより面白くなります。Dynamicな1x1x1ボックスを作成してみましょう：

![Dynamic Box](/img/user-manual/physics/dynamic-box.png)

ボックスは、Staticな地面と衝突したときに興味深い方法で跳ね返るように回転されています。

![Falling Box](/img/user-manual/physics/falling-box.gif)

## Kinematicボディの作成 {#creating-kinematic-bodies}

場合によっては、シーン内の物理オブジェクトの動きを明示的に制御し、これらのオブジェクトが他の物理オブジェクトに対して抵抗できない力を発揮できるようにするべきです。たとえば、プレイヤーを別の階に運ぶための動くプラットフォームを作るとします。これを実現するためには、RigidBodyのタイプをKinematicに設定します。それでは、Kinematicボックスを作成してみましょう。

![Kinematic Box](/img/user-manual/physics/kinematic-box.png)

Kinematicボディのアニメーション化が自身で行う必要があります。上記のKinematicボックスには、movement.jsというスクリプトが割り当てられた、スクリプトコンポーネントも含まれています。

```javascript
var Movement = pc.createScript('movement');

// initialize code called once per entity
Movement.prototype.initialize = function() {

};

// update code called every frame
Movement.prototype.update = function(dt) {
    this.entity.setPosition(Math.sin(Date.now() / 1000), 0.5, 0);
};
```

このスクリプトは、正弦関数を使用して、ワールドのX軸に沿ってボックスをアニメーション化します。Kinematicボディを移動するには、 `setPosition`、`setRotation`および `setEulerAngles`のようなエンティティ上の標準の変換関数を使用します。シーンを実行すると、ダイナミックボックスがKinematicボックスの上に落ち、その上に乗ったまま運ばれます。

![Kinematic Box](/img/user-manual/physics/kinematic-box.gif)

## Dynamicボディのテレポート {#teleporting-dynamic-bodies}

Kinematicボディで標準エンティティ変換関数を使用することはできますが、ダイナミックボディでは許可されていません。DynamicRigidBodyを作成するとき、そのエンティティの位置と方向の設定は物理エンジンが行うようになります。つまり、pc.Entity APIを使用してスクリプト内のエンティティの位置または方向を更新しようとすると、関数の効果は無効になります。代わりに、RigidBodyのテレポート機能を呼び出して、RigidBodyの位置や方向を瞬間的に更新する物理エンジンに明示的に通知する必要があります。

[1]: https://github.com/kripken/ammo.js
[2]: /user-manual/editor/scenes/components/rigidbody/
[3]: /user-manual/editor/scenes/components/collision/
[10]: /user-manual/physics/physics-migration/
[11]: /user-manual/editor/assets/inspectors/wasm/
[12]: /user-manual/physics/compound-shapes/
