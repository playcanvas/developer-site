---
title: ボディを動かす
description: 力、インパルス、トルクで動的な rigid body を動かし、速度を直接設定し、Kinematic なボディをトランスフォームで駆動し、各環境で物理コードをどこで実行するかを確認します。
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

DynamicなRigidBodyは、力とインパルスに応答して移動します。力は一定の時間にわたってボディに加えられるのに対して、インパルスはボディの速度を瞬間的に変化させます。どちらも[RigidBodyComponent](https://api.playcanvas.com/engine/classes/RigidBodyComponent.html)のメソッドで、Dynamicなボディにのみ影響します。Staticなボディは決して動かず、Kinematicなボディは開発者が位置を決めるため、どちらに対して呼び出しても効果はありません。

このページのすべては、どの環境でも同一のrigidbodyコンポーネントへの呼び出しです。異なるのは、コードをどこで実行するかだけです。

## 物理コードの実行 {#running-physics-code}

力は通常、キーが押されている間に毎フレーム加えるため、エンティティにアクセスできる毎フレームのコードを実行する場所が必要です。

<Tabs groupId="workflow" defaultValue="engine">
<TabItem value="engine" label="Engine">

アプリケーションの`update`イベントを購読するか、[スクリプティング](/user-manual/scripting/)セクションで説明しているようにエンティティにScriptをアタッチします。

```javascript
app.on('update', (dt) => {
    // 右矢印キーが押されている間、ワールドX軸に沿って箱を押す
    if (app.keyboard.isPressed(pc.KEY_RIGHT)) {
        box.rigidbody.applyForce(10, 0, 0);
    }
});
```

</TabItem>
<TabItem value="editor" label="Editor">

エンティティにScriptコンポーネントを追加し、`update`メソッドでボディを駆動するスクリプトをアタッチします。

```javascript
import { Script, KEY_RIGHT } from 'playcanvas';

export class Push extends Script {
    static scriptName = 'push';

    update(dt) {
        // 右矢印キーが押されている間、ワールドX軸に沿ってボディを押す
        if (this.app.keyboard.isPressed(KEY_RIGHT)) {
            this.entity.rigidbody.applyForce(10, 0, 0);
        }
    }
}
```

スクリプトの作成とアタッチについては[スクリプティングをはじめる](/user-manual/scripting/getting-started/)を参照してください。

</TabItem>
<TabItem value="react" label="React">

`<Entity>`の中にコンポーネントを配置し、`useParent`でエンティティを取得して、`useAppEvent`で毎フレームコードを実行します。

```jsx
import { KEY_RIGHT } from 'playcanvas';
import { useApp, useParent, useAppEvent } from '@playcanvas/react/hooks';

function Push() {
  const app = useApp();
  const entity = useParent();
  useAppEvent('update', (dt) => {
    // 右矢印キーが押されている間、ワールドX軸に沿ってボディを押す
    if (app.keyboard.isPressed(KEY_RIGHT)) {
      entity.rigidbody?.applyForce(10, 0, 0);
    }
  });
  return null;
}

<Entity name="box">
  <Collision type="box" />
  <RigidBody type="dynamic" />
  <Push />
</Entity>
```

</TabItem>
<TabItem value="web-components" label="Web Components">

Editorタブに示した`Push`クラスをエクスポートするスクリプトファイルを読み込み、エンティティにアタッチします。

```html
<pc-asset src="push.mjs"></pc-asset>

<pc-entity name="box">
    <pc-collision type="box"></pc-collision>
    <pc-rigid-body type="dynamic"></pc-rigid-body>
    <pc-script>
        <pc-script-instance name="push"></pc-script-instance>
    </pc-script>
</pc-entity>
```

[スクリプトで振る舞いを追加する](/user-manual/web-components/scripting/)を参照してください。あるいは、[プログラムからのアクセス](/user-manual/web-components/programmatic-access/)で説明しているように、アプリの準備ができた後に要素の`entity`プロパティを通してページのJavaScriptからエンティティにアクセスすることもできます。

</TabItem>
</Tabs>

## 力 {#forces}

重い重りを床の上で押しやるには、押している間ずっと力を加えます。力は次の物理ステップまで蓄積されるため、毎フレーム力を加えると一定の加速が得られ、同じ力でも重いボディは軽いボディよりゆっくり加速します。

```javascript
// 押している間、毎フレームワールドX軸に沿って押す
entity.rigidbody.applyForce(10, 0, 0);
```

## インパルス {#impulses}

大砲から砲弾を発射するには、1回のインパルスを加えます。インパルスは運動量の瞬間的な変化なので、毎フレームではなく1回だけ加えます。

```javascript
// 右上に一度だけ打ち上げる
entity.rigidbody.applyImpulse(10, 10, 0);
```

どちらのメソッドも[Vec3](https://api.playcanvas.com/engine/classes/Vec3.html)を受け取れるため、実行時に方向を計算する場合に便利です。

```javascript
// ボディが向いている方向に打ち出す
const impulse = entity.forward.clone().mulScalar(10);
entity.rigidbody.applyImpulse(impulse);
```

## 作用点の指定 {#applying-at-a-point}

デフォルトでは、力やインパルスはボディの重心を通って作用するため、ボディを回転させることなく速度を変化させます。オプションの作用点を渡すと中心から外れた位置に作用し、ボディは回転もします。2つのメソッドではこの作用点の測り方が異なります。

- `applyForce(force, point)`の作用点は、ボディの位置からの**ワールド空間**でのオフセットです。
- `applyImpulse(impulse, point)`の作用点は、**エンティティのローカル空間**で指定します。

```javascript
// インパルス：作用点はエンティティのローカル空間なので、エンティティのローカルZ軸に沿って
// 1ユニット離れた点を上に押し上げ、ボディを倒す
entity.rigidbody.applyImpulse(new pc.Vec3(0, 10, 0), new pc.Vec3(0, 0, 1));

// 力：作用点はボディからのワールド空間でのオフセットなので、
// 同じローカルの点を先にワールド空間に変換する
const offset = entity.getWorldTransform().transformVector(new pc.Vec3(0, 0, 1));
entity.rigidbody.applyForce(new pc.Vec3(0, 10, 0), offset);
```

どちらのメソッドも、力またはインパルスに続けて作用点を並べた6つの数値でも呼び出せます。

## トルク {#torque}

ボディを移動させずに回転させるには、トルクを加えます。`applyTorque`は力の回転版、`applyTorqueImpulse`はインパルスの回転版です。どちらもVec3（または3つの数値）を受け取り、その方向が回転させるワールド空間の軸、長さが強さになります。

```javascript
// 毎フレーム呼び出して、ワールドY軸を中心にボディを回し続ける
entity.rigidbody.applyTorque(0, 5, 0);

// ワールドX軸を中心に、一度だけ回転を加える
entity.rigidbody.applyTorqueImpulse(2, 0, 0);
```

## 速度を直接設定する {#setting-velocity-directly}

質量に関係なく正確な速度でボディを動かしたい場合もあります。例えば、すぐに最高速度に達するべきキャラクターや、リセットが必要な弾丸などです。その場合は`linearVelocity`と`angularVelocity`を直接代入します。

```javascript
// 現在の垂直方向の速度を保ちながら、ワールドX軸に沿って毎秒5ユニットで移動する
const velocity = entity.rigidbody.linearVelocity;
entity.rigidbody.linearVelocity = new pc.Vec3(5, velocity.y, 0);

// すべての動きを止める
entity.rigidbody.linearVelocity = pc.Vec3.ZERO;
entity.rigidbody.angularVelocity = pc.Vec3.ZERO;
```

速度のゲッターは読み取り専用のスナップショットを返すため、返されたベクトルをその場で変更しても効果はありません。必ず新しい値を代入してください。この方法で操作する完全なキャラクターの例は、エンジンの[一人称](https://github.com/playcanvas/engine/blob/main/scripts/esm/first-person-controller.mjs)および[三人称](https://github.com/playcanvas/engine/blob/main/scripts/esm/third-person-controller.mjs)コントローラースクリプトを参照してください。

## Kinematicな運動 {#kinematic-motion}

Kinematicなボディは力、インパルス、速度を無視します。エンティティを動かすことでボディを動かし、物理エンジンは各ステップの開始時に新しいトランスフォームを読み取ります。Kinematicなプラットフォームの上に立つDynamicなボディは、一緒に運ばれます。

```javascript
// ワールドX軸に沿ってプラットフォームを前後に滑らせる
let time = 0;
app.on('update', (dt) => {
    time += dt;
    platform.setPosition(Math.sin(time) * 2, 0.5, 0);
});
```

:::tip

[ダンピングとファクター](/user-manual/physics/rigid-bodies/#damping-and-factors)は、このページのすべてに対するボディの応答を調整します。ダンピングは時間とともにボディを減速させ、ある軸のファクターを0にするとその軸での移動や回転が止まります。これがキャラクターを直立させたり、ボディを2D平面に閉じ込めたりする方法です。

:::

## 関連情報 {#see-also}

- [RigidBody](/user-manual/physics/rigid-bodies/) - ボディのタイプ、質量、ダンピング、ファクター
- [衝突イベント](/user-manual/physics/collision-events/) - ボディ同士がぶつかったときの応答
- [力とインパルス](/tutorials/using-forces-on-rigid-bodies/) - RigidBodyに力、インパルス、トルクを加えるチュートリアルプロジェクト
- [RigidBodyComponent](https://api.playcanvas.com/engine/classes/RigidBodyComponent.html) - このページのすべてのメソッドのAPIリファレンス
