---
title: RigidBody
description: Static、Dynamic、Kinematic の rigid body、質量、摩擦、反発、ダンピング、ファクターのプロパティ、スリープ、テレポート、コリジョングループ。
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

RigidBodyは、物理シミュレーションに参加するエンティティです。2つのコンポーネントが必要です。物理エンジンがエンティティをどう扱うかを決める[RigidBody](/user-manual/editor/scenes/components/rigidbody/)コンポーネントと、形状を与える[Collision](/user-manual/editor/scenes/components/collision/)コンポーネントです。Collisionコンポーネントのないrigidbodyコンポーネントには衝突する形がなく、何もしません。形状は[コリジョン形状](/user-manual/physics/collision-shapes/)のページで扱います。このページはボディそのものについてです。

## ボディのタイプ {#body-types}

RigidBodyの`type`は、誰がそれを動かすかを決めます。

- **Static** - 決して動きません。地面や壁など、環境の一部となるものに使います。Staticなボディは低コストで、エンジンはそれらが動かないことを前提とします。
- **Dynamic** - 完全にシミュレートされます。重力で落下し、衝突や[力とインパルス](/user-manual/physics/forces-and-impulses/)に応答し、位置と回転は物理エンジンが所有します。
- **Kinematic** - エンティティのトランスフォームを通して開発者が動かします。Dynamicなボディを押しのけますが、それらや重力の影響は受けません。動くプラットフォーム、アニメーションで駆動されるドアなど、物理法則ではなくスクリプトに従うものに使います。

下にあるものの上に落ちる、1メートルのDynamicな箱の例です。

<Tabs groupId="workflow" defaultValue="engine">
<TabItem value="engine" label="Engine">

```javascript
const box = new pc.Entity('box');
box.addComponent('render', { type: 'box' });
box.addComponent('collision', { type: 'box' });
box.addComponent('rigidbody', { type: pc.BODYTYPE_DYNAMIC, mass: 2 });
box.setPosition(0, 5, 0);
app.root.addChild(box);
```

</TabItem>
<TabItem value="editor" label="Editor">

エンティティを選択し、**Add Component**をクリックしてPhysicsグループから**Rigid Body**と**Collision**の両方を追加します。Rigid Bodyの**Type**を**Dynamic**に設定すると、インスペクターに後述の質量やマテリアルのプロパティが表示されます。デフォルトのボックスコリジョン形状（Half Extentsが0.5）は、1ユニットのレンダーボックスに一致します。

</TabItem>
<TabItem value="react" label="React">

```jsx
import { Entity } from '@playcanvas/react';
import { Render, Collision, RigidBody } from '@playcanvas/react/components';

<Entity name="box" position={[0, 5, 0]}>
  <Render type="box" />
  <Collision type="box" />
  <RigidBody type="dynamic" mass={2} />
</Entity>
```

</TabItem>
<TabItem value="web-components" label="Web Components">

```html
<pc-entity name="box" position="0 5 0">
    <pc-render type="box"></pc-render>
    <pc-collision type="box"></pc-collision>
    <pc-rigid-body type="dynamic" mass="2"></pc-rigid-body>
</pc-entity>
```

</TabItem>
</Tabs>

<EngineExample id="physics/falling-shapes" title="Falling Shapes" />

## 質量とマテリアル {#mass-and-materials}

4つのプロパティが、ボディの重さと接触時の表面の振る舞いを決めます。

| プロパティ | 説明 |
| --- | --- |
| **Mass** | Dynamicなボディの質量（キログラム）。重いボディは加速により大きな力を必要とし、軽いボディを押しのけます。デフォルトは1で、StaticとKinematicのボディでは無視されます |
| **Friction** | 表面が滑りにどれだけ強く抵抗するか（0から1）。デフォルトは0.5 |
| **Rolling Friction** | 転がりに対する抵抗。球や円柱が永遠に転がり続けるのを防ぎます。デフォルトは0 |
| **Restitution** | 弾力性（0から1）。デフォルトは0。接触する2つのボディの値は掛け合わされるため、反発係数1のボールも反発係数0の床では跳ねません |

<Tabs groupId="workflow" defaultValue="engine">
<TabItem value="engine" label="Engine">

```javascript
entity.rigidbody.mass = 5;
entity.rigidbody.friction = 0.8;
entity.rigidbody.rollingFriction = 0.1;
entity.rigidbody.restitution = 0.6;
```

</TabItem>
<TabItem value="editor" label="Editor">

[Rigid Body](/user-manual/editor/scenes/components/rigidbody/)コンポーネントで**Mass**、**Friction**、**Rolling Friction**、**Restitution**を設定します。MassはDynamicなボディでのみ表示されます。

</TabItem>
<TabItem value="react" label="React">

```jsx
<RigidBody type="dynamic" mass={5} friction={0.8} rollingFriction={0.1} restitution={0.6} />
```

</TabItem>
<TabItem value="web-components" label="Web Components">

```html
<pc-rigid-body type="dynamic" mass="5" friction="0.8" rolling-friction="0.1" restitution="0.6"></pc-rigid-body>
```

</TabItem>
</Tabs>

## ダンピングとファクター {#damping-and-factors}

2組のプロパティが、動き始めたDynamicなボディの運動を調整します。

- **Linear Damping**と**Angular Damping**は、空気抵抗のように、ボディが毎秒失う速度の割合（0から1）です。デフォルトは0です。
- **Linear Factor**と**Angular Factor**は、ワールド軸ごとに移動と回転をスケーリングします。ファクターが0の軸はロックされます。Angular Factorを`0, 0, 0`にするとキャラクターが直立を保ち、Linear Factorを`1, 1, 0`、Angular Factorを`0, 0, 1`にすると2Dゲーム用にボディをXY平面に閉じ込められます。デフォルトは`1, 1, 1`です。

<Tabs groupId="workflow" defaultValue="engine">
<TabItem value="engine" label="Engine">

```javascript
// 空気抵抗のように、時間とともにボディを減速させる
entity.rigidbody.linearDamping = 0.2;
entity.rigidbody.angularDamping = 0.2;

// キャラクターを直立させる：どの軸でも回転しない
entity.rigidbody.angularFactor = new pc.Vec3(0, 0, 0);

// 2DゲームのXY平面にボディを閉じ込める
entity.rigidbody.linearFactor = new pc.Vec3(1, 1, 0);
```

</TabItem>
<TabItem value="editor" label="Editor">

[Rigid Body](/user-manual/editor/scenes/components/rigidbody/)コンポーネントで**Linear Damping**、**Angular Damping**、**Linear Factor**、**Angular Factor**を設定します。これらはDynamicなボディでのみ表示されます。

</TabItem>
<TabItem value="react" label="React">

```jsx
<RigidBody type="dynamic" linearDamping={0.2} angularDamping={0.2} angularFactor={[0, 0, 0]} />
```

</TabItem>
<TabItem value="web-components" label="Web Components">

```html
<pc-rigid-body type="dynamic" linear-damping="0.2" angular-damping="0.2" angular-factor="0 0 0"></pc-rigid-body>
```

</TabItem>
</Tabs>

## スリープ {#sleeping}

静止したDynamicなボディは物理エンジンによってスリープ状態にされ、何かに乱されるまでシミュレーションが止まります。力、インパルス、トルクを加えたり、速度を代入したり、テレポートしたりすると自動的に復帰し、他のボディにぶつかられた場合も同様です。自分で復帰させることもできます。

```javascript
if (!entity.rigidbody.isActive()) {
    entity.rigidbody.activate();
}
```

## 移動とテレポート {#moving-and-teleporting}

Dynamicなボディの位置と回転は物理エンジンが所有するため、エンティティのトランスフォームに設定した値は次のステップで上書きされます。Dynamicなボディを動かすには、[力や速度](/user-manual/physics/forces-and-impulses/)を使うか、リスポーン時のようにどこかへ瞬間移動させる必要があるときにrigidbodyコンポーネントの`teleport`を呼び出します。テレポートはボディの速度をクリアしないため、静止した状態で到着させたい場合は先に速度をリセットしてください。

```javascript
// 現在の回転を保ったまま位置を移動する
entity.rigidbody.teleport(0, 10, 0);

// 移動と回転。回転はオイラー角（度）で指定
entity.rigidbody.teleport(new pc.Vec3(0, 10, 0), new pc.Vec3(0, 90, 0));

// 静止した状態でリスポーンする：以前の動きをクリアし、クォータニオンで移動と回転を行う
entity.rigidbody.linearVelocity = pc.Vec3.ZERO;
entity.rigidbody.angularVelocity = pc.Vec3.ZERO;
entity.rigidbody.teleport(spawn.getPosition(), spawn.getRotation());
```

Kinematicなボディは逆の仕組みです。`setPosition`、`setRotation`、`lookAt`などのトランスフォームAPIでエンティティを動かすと、ボディは次のステップで追従し、その上に乗っているDynamicなボディを運びます。

```javascript
// X軸に沿って前後に滑るプラットフォーム
platform.setPosition(Math.sin(time) * 2, 0.5, 0);
```

`linearVelocity`や`angularFactor`などのベクトルプロパティは、読み取り専用のスナップショットを返します。返されたベクトルを編集するのではなく、新しいベクトルを代入してください。

これらの呼び出しは、どの方法で構築しても同じです。Reactでは`<Entity>`の中に配置したコンポーネントから[`useParent`](/user-manual/react/api/hooks/use-parent/)フックでエンティティを取得し、Web Componentsでは[`<pc-entity>`](/user-manual/web-components/tags/pc-entity/)要素の`entity`プロパティから取得します。[ボディを動かす](/user-manual/physics/forces-and-impulses/#running-physics-code)では、各環境で毎フレームのコードをどこで実行するかを示しています。

## コリジョングループとマスク {#collision-groups-and-masks}

すべてのボディはコリジョン**グループ**に属し、衝突する相手のグループを表す**マスク**を持ちます。2つのボディは、それぞれのグループが相手のマスクに含まれているときにだけ相互作用します。エンジンはボディのタイプが設定されたときに両方を割り当てます。Dynamicなボディはすべてと衝突し、StaticとKinematicのボディは互いに衝突しません。例えば弾丸同士が当たらないようにするなど、コードからこれを絞り込むことができます。

```javascript
// ボディをユーザーグループに入れ、同じグループの他のメンバーと衝突しないようにする。
// タイプを変更するとリセットされるため、タイプの後に設定する。
entity.rigidbody.group = pc.BODYGROUP_USER_1;
entity.rigidbody.mask = pc.BODYMASK_ALL ^ pc.BODYGROUP_USER_1;
```

`pc.BODYGROUP_USER_1`から`pc.BODYGROUP_USER_8`までの8つのユーザーグループを自由に使用できます。同じグループとマスクで[レイキャスト](/user-manual/physics/ray-casting/#filtering-ray-casts)をフィルタリングすることもできます。

## 関連情報 {#see-also}

- [コリジョン形状](/user-manual/physics/collision-shapes/) - すべてのRigidBodyに必要な形状
- [ボディを動かす](/user-manual/physics/forces-and-impulses/) - 力、インパルス、トルク、速度
- [Rigid Bodyコンポーネント](/user-manual/editor/scenes/components/rigidbody/) - すべてのプロパティのエディターリファレンス
- [RigidBodyComponent](https://api.playcanvas.com/engine/classes/RigidBodyComponent.html) - APIリファレンス
- [コードでRigidBodyを作成する](/tutorials/creating-rigid-bodies-in-code/) - スクリプトから両方のコンポーネントを追加するチュートリアル
