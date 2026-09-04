---
title: コリジョン形状
description: box、sphere、capsule、cylinder、cone、mesh、compound のコリジョン形状で rigid body とトリガーに物理的な形状を与え、形状をエンティティからオフセットし、スケールの扱いを理解します。
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

[Collision](/user-manual/editor/scenes/components/collision/)コンポーネントは、エンティティに物理的な形状を与えます。rigidbodyコンポーネントと組み合わせるとその[RigidBody](/user-manual/physics/rigid-bodies/)の形状を定義し、単独では[トリガーボリューム](/user-manual/physics/trigger-volumes/)として機能します。形状はエンティティの見た目と一致する必要はなく、通常は一致させるべきではありません。物理エンジンは1秒間に何度も形状同士を判定するため、細かいモデルを囲む単純なボックスやカプセルの方が、すべてのポリゴンをなぞるメッシュより高速かつ安定します。

## 形状のタイプ {#shape-types}

| タイプ | プロパティ | 備考 |
| --- | --- | --- |
| **Box** | Half Extents | デフォルト。ボックスの幅、高さ、奥行きの半分。`0.5, 0.5, 0.5`で1ユニットの立方体になります |
| **Sphere** | Radius | |
| **Capsule** | Radius、Height、Axis | 両端が丸い円柱で、キャラクターによく使われます。Heightは選択したローカル軸に沿った端から端までの長さです |
| **Cylinder** | Radius、Height、Axis | |
| **Cone** | Radius、Height、Axis | |
| **Mesh** | Model AssetまたはRender Asset、Convex Hull | アセットのジオメトリ。後述の[メッシュコライダー](#mesh-colliders)を参照 |
| **Compound** | | 子エンティティの形状を1つのボディに組み合わせたもの。後述の[複合形状](#compound-shapes)を参照 |

プリミティブ形状はメッシュよりもはるかに低コストでシミュレートできるため、オブジェクトに無理なく合う最も単純な形状を使用してください。Y軸方向に立てたカプセルはキャラクターの標準的な選択です。

<Tabs groupId="workflow" defaultValue="engine">
<TabItem value="engine" label="Engine">

```javascript
player.addComponent('collision', {
    type: 'capsule',
    radius: 0.5,
    height: 2,
    axis: 1 // 0 = X、1 = Y（デフォルト）、2 = Z
});
```

</TabItem>
<TabItem value="editor" label="Editor">

[Collision](/user-manual/editor/scenes/components/collision/)コンポーネントの**Type**ドロップダウンから形状を選びます。その下のフィールドはタイプに応じて変わります。ボックスには**Half Extents**、球には**Radius**、カプセル、円柱、円錐には**Radius**、**Height**、**Axis**が表示されます。

</TabItem>
<TabItem value="react" label="React">

```jsx
<Collision type="capsule" radius={0.5} height={2} axis={1} />
```

`type`を省略すると、コンポーネントは兄弟の`<Render>`プリミティブのタイプを使用するため、レンダーボックスにはボックスコライダーが付きます。

</TabItem>
<TabItem value="web-components" label="Web Components">

```html
<pc-collision type="capsule" radius="0.5" height="2" axis="1"></pc-collision>
```

</TabItem>
</Tabs>

## メッシュコライダー {#mesh-colliders}

メッシュコライダーは、通常はエンティティが描画するものと同じモデルアセットまたはレンダーアセットからジオメトリを取得します。2種類あります。

- **トライアングルメッシュ**（デフォルト）は、凹んだ部分も含めてジオメトリを正確になぞります。StaticとKinematicのボディ、およびトリガーでのみ使用できます。
- **凸包 (Convex Hull)** は、ジオメトリを包含する最小の凸形状で包みます。ボウルの内側のような凹みは失われますが、Dynamicなボディが持てる唯一のメッシュ形状です。

大きなモデルからメッシュ形状を構築するには時間とメモリがかかるため、動くものにはプリミティブや[複合形状](#compound-shapes)を優先し、トライアングルメッシュは環境用にとどめてください。

<Tabs groupId="workflow" defaultValue="engine">
<TabItem value="engine" label="Engine">

```javascript
// 環境：描画に使うレンダーアセットから構築したStaticなトライアングルメッシュ
ground.addComponent('collision', {
    type: 'mesh',
    renderAsset: groundAsset
});

// Dynamicな小物には凸包が必要
crate.addComponent('collision', {
    type: 'mesh',
    renderAsset: crateAsset,
    convexHull: true
});
```

</TabItem>
<TabItem value="editor" label="Editor">

**Type**を**Mesh**に設定し、**Model Asset**または**Render Asset**（インポートしたGLBが生成するもの）を割り当てます。形状がDynamicなボディに属する場合は**Convex Hull**にチェックを入れます。

</TabItem>
<TabItem value="react" label="React">

読み込んだレンダーアセットを`renderAsset`プロパティに渡し、Dynamicなボディには`convexHull`を設定します。

```jsx
<Collision type="mesh" renderAsset={crateAsset} convexHull />
```

</TabItem>
<TabItem value="web-components" label="Web Components">

ジオメトリを指定する属性はありません。`type="mesh"`はエンティティ自身の`<pc-render>`のメッシュを使用するため、読み込んだモデル内の[`<pc-node>`](/user-manual/web-components/tags/pc-node/)で使うのが自然です。

```html
<pc-model asset="car">
    <pc-node name="Body">
        <pc-collision type="mesh" convex-hull></pc-collision>
        <pc-rigid-body type="dynamic" mass="1200"></pc-rigid-body>
    </pc-node>
</pc-model>
```

</TabItem>
</Tabs>

## 形状のオフセット {#offsetting-a-shape}

すべての形状には、エンティティの原点に対して形状を移動させる**Position Offset**と**Rotation Offset**があります。例えば原点が足元にあるキャラクターモデルでは、カプセルをその高さの半分だけ持ち上げる必要があります。オフセットを使えば、コライダーをずらすためだけに子エンティティを追加する必要がなくなります。

<Tabs groupId="workflow" defaultValue="engine">
<TabItem value="engine" label="Engine">

```javascript
// エンティティの原点がキャラクターの足元に来るようにカプセルを持ち上げる
player.addComponent('collision', {
    type: 'capsule',
    radius: 0.5,
    height: 2,
    linearOffset: new pc.Vec3(0, 1, 0)
});

// エンティティのY軸を中心にボックスを45度傾ける
crate.collision.angularOffset = new pc.Quat().setFromEulerAngles(0, 45, 0);
```

</TabItem>
<TabItem value="editor" label="Editor">

[Collision](/user-manual/editor/scenes/components/collision/)コンポーネントで**Position Offset**と**Rotation Offset**（度）を設定します。どちらもすべての形状タイプで使用できます。

</TabItem>
<TabItem value="react" label="React">

```jsx
<Collision type="capsule" radius={0.5} height={2} linearOffset={[0, 1, 0]} angularOffset={[0, 45, 0]} />
```

</TabItem>
<TabItem value="web-components" label="Web Components">

```html
<pc-collision type="capsule" radius="0.5" height="2" linear-offset="0 1 0" angular-offset="0 45 0"></pc-collision>
```

</TabItem>
</Tabs>

<EngineExample id="physics/offset-collision" title="Offset Collision" />

## 複合形状 {#compound-shapes}

複合形状 (Compound) は、エンティティの子のコリジョン形状を1つのボディに組み合わせます。メッシュコライダーを使わずにDynamicなボディに複雑な輪郭を与えられます。椅子を座面、背もたれ、4本の脚のすべてボックスで構成しても、凹面メッシュではできない他のDynamicなボディとの衝突が可能です。複合形状はメッシュ形状よりもはるかに低コストでシミュレートできます。

親はrigidbodyコンポーネントと共に、タイプが**Compound**のCollisionコンポーネントを持ちます。各子はプリミティブ形状のCollisionコンポーネントを持ち、親に対する相対的な位置と回転で配置されます。子エンティティ自身にrigidbodyコンポーネントは必要ありません。形状全体を所有するのは親のボディです。独自のrigidbodyコンポーネントを持つ子孫は別のボディとして扱われ、複合形状には含まれません。

<Tabs groupId="workflow" defaultValue="engine">
<TabItem value="engine" label="Engine">

```javascript
// 親がボディを所有し、子の形状を組み合わせる
const chair = new pc.Entity('chair');
chair.addComponent('collision', { type: 'compound' });
chair.addComponent('rigidbody', { type: pc.BODYTYPE_DYNAMIC, mass: 5 });

// 子が形状を持ち、親に対する相対位置に配置される。rigidbodyは不要
const seat = new pc.Entity('seat');
seat.addComponent('collision', { type: 'box', halfExtents: new pc.Vec3(0.25, 0.025, 0.25) });
seat.setLocalPosition(0, 0.45, 0);
chair.addChild(seat);
```

</TabItem>
<TabItem value="editor" label="Editor">

親に**Type**を**Compound**にした**Collision**コンポーネントと**Rigid Body**コンポーネントを付けます。部品ごとに子エンティティを追加し、プリミティブタイプの**Collision**コンポーネントを付けて、親に対する位置と回転を設定します。

![Compound shapes setup](/img/user-manual/physics/compound-shape-chair-setup.png)

</TabItem>
<TabItem value="react" label="React">

```jsx
<Entity name="chair">
  <Collision type="compound" />
  <RigidBody type="dynamic" mass={5} />
  <Entity name="seat" position={[0, 0.45, 0]}>
    <Collision type="box" halfExtents={[0.25, 0.025, 0.25]} />
  </Entity>
</Entity>
```

</TabItem>
<TabItem value="web-components" label="Web Components">

```html
<pc-entity name="chair">
    <pc-collision type="compound"></pc-collision>
    <pc-rigid-body type="dynamic" mass="5"></pc-rigid-body>
    <pc-entity name="seat" position="0 0.45 0">
        <pc-collision type="box" half-extents="0.25 0.025 0.25"></pc-collision>
    </pc-entity>
</pc-entity>
```

</TabItem>
</Tabs>

![Compound shapes chair](/img/user-manual/physics/compound-shape-chair.gif)

子エンティティは実行時に移動できます。子のトランスフォームが変わると、エンジンは複合形状内のその形状のオフセットを更新し、親のボディをスリープから復帰させます。親エンティティはボディの重心でもあるため、形状の範囲内（通常は中心）に置いてください。そうでない場合、力やトルクが加わったときに、見えないピボットを中心に回転するなど、ボディが不思議な挙動を示す可能性があります。

<EngineExample id="physics/compound-collision" title="Compound Collision" />

上の椅子は[Compound Physics Shapes](/tutorials/compound-physics-shapes/)チュートリアルプロジェクトのものです。

## スケール {#scale}

プリミティブ形状はエンティティのスケールを無視します。ボックスコライダーは常にワールド単位でのHalf Extentsの大きさなので、エンティティを拡大してもコライダーは大きくなりません。代わりにHalf ExtentsやRadiusを変更してください。メッシュ形状は例外で、構築元のエンティティ（またはモデルノード）のワールドスケールに従います。複合形状の子は、親に対する相対的なローカル位置と回転で配置されます。

## 形状の可視化 {#visualizing-shapes}

エディターは選択中のエンティティのコリジョン形状をビューポートに輪郭表示するため、形状のサイズやオフセットを確認する最も手早い方法です。どの環境でも、アプリケーションの実行中にすべての形状を見るには、エンジンの[render-physics.js](https://github.com/playcanvas/engine/blob/main/scripts/physics/render-physics.js)スクリプトをエンティティに追加し、その**Draw Shapes**アトリビュートを有効にします。シーン内の各コリジョン形状が半透明のメッシュとして描画されます。

## 関連情報 {#see-also}

- [RigidBody](/user-manual/physics/rigid-bodies/) - 形状が属するボディ
- [トリガーボリューム](/user-manual/physics/trigger-volumes/) - ボディを持たない形状
- [Collisionコンポーネント](/user-manual/editor/scenes/components/collision/) - すべてのプロパティのエディターリファレンス
- [CollisionComponent](https://api.playcanvas.com/engine/classes/CollisionComponent.html) - APIリファレンス
- [Compound Physics Shapes](/tutorials/compound-physics-shapes/) - 上記の椅子のチュートリアルプロジェクト
