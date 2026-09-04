---
title: トリガーボリューム
description: RigidBody を持たない Collision コンポーネントで、Dynamic または Kinematic な rigid body が領域に出入りしたことを検出し、triggerenter と triggerleave イベントに応答します。
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

トリガーボリュームは、RigidBodyがボリューム内に入ったり出たりしたときにイベントを発生させるコリジョン形状で、何かを物理的に遮ることはありません。サッカーの試合でゴールが決まったとき、レースカーがゴールラインを越えたとき、プレイヤーが部屋に入ったときなどの検出に役立ちます。

## トリガーボリュームの作成 {#creating-a-trigger-volume}

トリガーは、rigidbodyコンポーネントを持たないエンティティに付いた[Collision](/user-manual/editor/scenes/components/collision/)コンポーネントにすぎません。メッシュ形状や複合形状を含め、どの[コリジョン形状](/user-manual/physics/collision-shapes/)でも使えます。ボックス型のゴールマウスの例です。

<Tabs groupId="workflow" defaultValue="engine">
<TabItem value="engine" label="Engine">

```javascript
const goal = new pc.Entity('goal');
goal.addComponent('collision', {
    type: 'box',
    halfExtents: new pc.Vec3(2, 1, 0.5)
});
goal.setPosition(0, 1, -10);
app.root.addChild(goal);
```

</TabItem>
<TabItem value="editor" label="Editor">

エンティティに**Collision**コンポーネントを追加して形状を設定しますが、**Rigid Body**コンポーネントは追加しないでください。エンティティを選択している間、エディターはビューポートに形状を描画するため、シーンに合わせてボリュームのサイズを調整しやすくなります。

</TabItem>
<TabItem value="react" label="React">

```jsx
<Entity name="goal" position={[0, 1, -10]}>
  <Collision type="box" halfExtents={[2, 1, 0.5]} />
</Entity>
```

</TabItem>
<TabItem value="web-components" label="Web Components">

```html
<pc-entity name="goal" position="0 1 -10">
    <pc-collision type="box" half-extents="2 1 0.5"></pc-collision>
</pc-entity>
```

</TabItem>
</Tabs>

トリガーにはRigidBodyがないため、`setPosition`や`setRotation`など、[Entity](https://api.playcanvas.com/engine/classes/Entity.html)の通常のトランスフォームAPIで他のエンティティと同じように移動できます。物理エンジンは次のステップで新しいトランスフォームを取り込みます。

## トリガーイベントの監視 {#listening-for-trigger-events}

トリガーのCollisionコンポーネントは、RigidBodyがボリュームと重なり始めたときに`triggerenter`を、重なりが終わったときに`triggerleave`を発火します。どちらのイベントも、出入りしたボディのエンティティを引数として渡します。

```javascript
goal.collision.on('triggerenter', (entity) => {
    console.log(`${entity.name} has entered ${goal.name}.`);
});

goal.collision.on('triggerleave', (entity) => {
    console.log(`${entity.name} has left ${goal.name}.`);
});
```

反対側のRigidBodyも、自身のCollisionコンポーネントとrigidbodyコンポーネントから同じ2つのイベントを受け取ります。そのハンドラーにはトリガーのエンティティが渡されるため、ボディ側で通過したボリュームに反応することもできます。

```javascript
player.rigidbody.on('triggerenter', (trigger) => {
    if (trigger.tags.has('checkpoint')) {
        lastCheckpoint = trigger.getPosition().clone();
    }
});
```

購読の方法は衝突イベントとまったく同じです。`on`が返すハンドルを保持し、リスナーが不要になったら`off()`を呼び出します。[衝突イベント](/user-manual/physics/collision-events/#listening-for-collisions)では、エディター、React、Web Componentsでそのコードをどこに置くかを示しています。

## トリガーを発火させられるもの {#what-can-trigger-a-volume}

トリガーイベントを発火させるのは、DynamicとKinematicのRigidBodyだけです。Staticなボディは決して動かないため重なりの判定から除外され、トリガー同士が互いを検出することもありません。トリガーが発火しないように見える場合は、通過するエンティティにrigidbodyコンポーネントがあり、そのタイプがDynamicまたはKinematicになっているか確認してください。

トリガーとの重なりでは、`contact`、`collisionstart`、`collisionend`イベントは発火しません。これらはRigidBody同士の物理的な接触のためのもので、[衝突イベント](/user-manual/physics/collision-events/)で説明しています。

## 関連情報 {#see-also}

- [衝突イベント](/user-manual/physics/collision-events/) - RigidBody同士の物理的な接触のイベントと、各環境での購読方法
- [コリジョン形状](/user-manual/physics/collision-shapes/) - トリガーが取れる形状
- [衝突とトリガー](/tutorials/collision-and-triggers/) - 落下するボディをトリガーでリセットするチュートリアル
