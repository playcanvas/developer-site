---
title: ジョイント
description: アルファ版の JointComponent を使い、fixed、ball、hinge、slider、6dof ジョイントで rigid body 同士を拘束します。リミット、モーター、スプリング、壊れる拘束にも対応します。
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

:::warning[アルファ版]

Jointコンポーネントはアルファ版のため、その挙動やAPIは変わる可能性があります。すべての環境でコードから利用でき、Web Componentsではタグとしても利用できますが、エディターにはまだ専用のインスペクターがなく、PlayCanvas Reactには対応するコンポーネントがありません。

:::

ジョイントは2つのRigidBodyの相対的な動きを拘束します。ヒンジで回るドア、レールの上を滑る引き出し、リンクの連なった鎖、スプリングで上下に揺れる木箱、あるいは何かが強くぶつかって溶接が壊れるまで一体になっているブロックの塔などです。

<EngineExample id="physics/joints" title="Joints" />

## ジョイントの仕組み {#how-joints-work}

ジョイントは、独自のエンティティに付いた[JointComponent](https://api.playcanvas.com/engine/classes/JointComponent.html)です。そのエンティティ自身は拘束**されません**。そのワールドトランスフォームが*ジョイントフレーム*を定義します。位置は拘束が作用するアンカーポイントで、ローカルX軸が主軸です。ヒンジはXを中心に回転し、スライダーはXに沿って移動し、ボールジョイントはXを中心にひねります。ジョイントの向きを決めるには、ジョイントのエンティティを回転させます。

拘束する2つのボディは`entityA`と`entityB`で設定し、どちらにも[rigidbodyコンポーネント](/user-manual/physics/rigid-bodies/)が必要です。`entityB`を空にすると、`entityA`はワールド空間の固定点に拘束されます。これが何もないところに物を吊り下げる方法です。よくある構成は、ジョイントのエンティティをピボット位置で`entityA`の子にすることで、ピボットが属する部品と一緒に動くようになります。

つまずきやすい点が2つあります。

- **フレームは一度だけ取得されます。** 取得は拘束が作成されるときで、通常はコンポーネントが有効になり、両方のボディがシミュレーションに存在した時点です。その後にジョイントのエンティティを動かしても、コンポーネントの`refreshFrames()`を呼び出して現在のトランスフォームからフレームを再取得するまで何も変わりません。エンティティのスケールはRigidBodyと同様、全体を通して無視されます。
- **リミットは開始時の姿勢を基準に測られます。** ジョイントのエンティティが基準ではありません。拘束が作成された瞬間に2つのジョイントフレームは一致するため、すべての自由度はそこで0になります。ヒンジのリミット`0`から`110`度は「ボディの開始位置からさらに110度まで」という意味であり、絶対的な角度ではありません。

## ジョイントのタイプ {#joint-types}

`type`プロパティで拘束の種類を選び、それによって他のどのプロパティが意味を持つかが決まります。

| タイプ | 定数 | 拘束する内容 | 使用するプロパティ |
| --- | --- | --- | --- |
| `fixed` | `JOINTTYPE_FIXED` | ボディ同士を剛体的に固定する | なし |
| `ball` | `JOINTTYPE_BALL` | ボールソケット：アンカーを中心に自由に回転し、オプションでスイングとツイストのリミットを持つ | `swingLimitY`、`swingLimitZ`、`twistLimit` |
| `hinge` | `JOINTTYPE_HINGE` | フレームのX軸を中心とした回転。オプションでリミットとモーターを持つ | `limits`、`motorSpeed`、`maxMotorForce` |
| `slider` | `JOINTTYPE_SLIDER` | フレームのX軸に沿った移動。オプションでリミットとモーターを持つ | `limits`、`motorSpeed`、`maxMotorForce` |
| `6dof` | `JOINTTYPE_6DOF` | 各直線軸と回転軸を個別にロック、制限、自由に設定し、オプションでスプリングを持つ | `linearMotionX/Y/Z`、`angularMotionX/Y/Z`、`linearLimitsX/Y/Z`、`angularLimitsX/Y/Z`、`linearStiffness`、`angularStiffness`、`linearDamping`、`angularDamping`、`linearEquilibrium`、`angularEquilibrium` |

すべてのタイプは、2つのボディが互いに衝突し続けるかどうかを決める`enableCollision`（デフォルトはオフ）と、`breakImpulse`も受け付けます。

`6dof`ジョイントでは各軸が`MOTION_LOCKED`から始まるため、他に何も設定しなければfixedジョイントと同じように振る舞います。動かしたい軸を`MOTION_FREE`または`MOTION_LIMITED`で開放し、制限した軸には対応するリミットを設定します。ある軸に0より大きい剛性を設定すると、その軸は平衡値に向かって引き戻すスプリングになります。

## ジョイントの追加 {#adding-a-joint}

このドアヒンジは、Dynamicなドアを Staticなドア枠に拘束します。ジョイントのエンティティはヒンジの線上に置き、ローカルX軸が上を向くように回転させ、`0`から`110`度のリミットでドアが一方向にだけ開くようにします。

<Tabs groupId="workflow" defaultValue="engine">
<TabItem value="engine" label="Engine">

```javascript
const hinge = new pc.Entity('hinge');
hinge.setPosition(1, 1, 0);
hinge.setEulerAngles(0, 0, 90); // ローカルX軸が上を向く
hinge.addComponent('joint', {
    type: pc.JOINTTYPE_HINGE,
    entityA: door,
    entityB: doorFrame,
    enableLimits: true,
    limits: new pc.Vec2(0, 110)
});
app.root.addChild(hinge);
```

`pc.Application`はJointコンポーネントシステムを登録します。`pc.AppBase`から構築する場合は、CollisionとRigidBodyのシステムと共に`pc.JointComponentSystem`を`AppOptions.componentSystems`に追加してください。

</TabItem>
<TabItem value="editor" label="Editor">

Jointのインスペクターはまだないため、ヒンジのエンティティにアタッチしたスクリプトからコンポーネントを追加します。エンティティの位置と回転はいつもどおりビューポートで設定し、2つのボディをスクリプトのアトリビュートに割り当てます。

```javascript
import { Script, Vec2, JOINTTYPE_HINGE } from 'playcanvas';

export class DoorHinge extends Script {
    static scriptName = 'doorHinge';

    /**
     * ドア。DynamicなRigidBody。
     *
     * @attribute
     * @type {Entity}
     */
    door;

    /**
     * ドアを吊るドア枠。StaticなRigidBody。
     *
     * @attribute
     * @type {Entity}
     */
    frame;

    initialize() {
        this.entity.addComponent('joint', {
            type: JOINTTYPE_HINGE,
            entityA: this.door,
            entityB: this.frame,
            enableLimits: true,
            limits: new Vec2(0, 110)
        });
    }
}
```

</TabItem>
<TabItem value="react" label="React">

`<Joint>`コンポーネントはまだありません。物理演算の読み込み後に、ヒンジの`<Entity>`の中のエフェクトからエンジンのコンポーネントを追加し、refで2つのボディにアクセスします。

```jsx
import { useEffect, useRef } from 'react';
import { JOINTTYPE_HINGE, Vec2 } from 'playcanvas';
import { Entity } from '@playcanvas/react';
import { useParent, usePhysics } from '@playcanvas/react/hooks';

function Hinge({ door, frame }) {
  const entity = useParent();
  const { isPhysicsLoaded } = usePhysics();

  useEffect(() => {
    if (!isPhysicsLoaded || !door.current || !frame.current) return;
    entity.addComponent('joint', {
      type: JOINTTYPE_HINGE,
      entityA: door.current,
      entityB: frame.current,
      enableLimits: true,
      limits: new Vec2(0, 110)
    });
    return () => entity.removeComponent('joint');
  }, [entity, isPhysicsLoaded, door, frame]);

  return null;
}

function Door() {
  const door = useRef();
  const frame = useRef();
  return (
    <>
      <Entity ref={frame} name="frame" position={[1, 1, 0]}>{/* コリジョンとStaticなRigidBody */}</Entity>
      <Entity ref={door} name="door" position={[1.9, 1, 0]}>{/* コリジョンとDynamicなRigidBody */}</Entity>
      <Entity name="hinge" position={[1, 1, 0]} rotation={[0, 0, 90]}>
        <Hinge door={door} frame={frame} />
      </Entity>
    </>
  );
}
```

</TabItem>
<TabItem value="web-components" label="Web Components">

```html
<pc-entity name="hinge" position="1 1 0" rotation="0 0 90">
    <pc-joint type="hinge" entity-a="#door" entity-b="#door-frame"
              enable-limits limits="0 110"></pc-joint>
</pc-entity>
```

すべての属性と各ジョイントタイプのライブ例は[`<pc-joint>`](/user-manual/web-components/tags/pc-joint/)リファレンスを参照してください。

</TabItem>
</Tabs>

## モーター、リミット、破断 {#motors-limits-and-breaking}

リミットは二重にオプトインです。`enableLimits`を設定し、**かつ**リミット値を指定する必要があります。`limits`を設定しても`enableLimits`がfalseのままのヒンジは自由に回ります。

ヒンジとスライダーにはモーターがあります。モーターは`maxMotorForce`が0より大きい間だけ作動し、`motorSpeed`の速さでジョイントを駆動します。単位はヒンジでは度/秒、スライダーではユニット/秒です。リミットが有効なモーターはストッパーで止まります。

```javascript
// 風車：ヒンジ軸を中心にローターを毎秒90度で回す
hinge.joint.motorSpeed = 90;
hinge.joint.maxMotorForce = 100;
```

どのジョイントも壊れることがあります。`breakImpulse`に拘束が壊れるインパルスのしきい値を設定します。デフォルトは`Infinity`で、決して壊れません。壊れるとコンポーネントは`break`イベントを発火し、`isBroken`がtrueになり、ボディは独立して動くようになります。`refreshFrames()`を呼び出すと、ボディの現在のトランスフォームからジョイントが再接続されます。

```javascript
const weld = jointEntity.joint;
weld.breakImpulse = 60;
weld.on('break', () => {
    console.log('The weld snapped');
});
```

:::note

拘束の状態を公開していないammo.jsのビルドでは、`6dof`ジョイントの破断を検出できないため、これらのジョイントでは`break`イベントが発火しません。他のジョイントタイプには影響しません。

:::

## 関連情報 {#see-also}

- [JointComponent](https://api.playcanvas.com/engine/classes/JointComponent.html) - すべてのジョイントプロパティのAPIリファレンス
- [`<pc-joint>`](/user-manual/web-components/tags/pc-joint/) - Web Componentsでの同じジョイント。各タイプのライブ例付き
- [Ragdoll](https://playcanvas.github.io/#/physics/ragdoll) - ボールジョイントとヒンジジョイントでキャラクターを組み立てるエンジンの例
- [RigidBody](/user-manual/physics/rigid-bodies/) - すべてのジョイントが拘束するボディ
