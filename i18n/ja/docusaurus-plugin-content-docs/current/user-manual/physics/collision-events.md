---
title: 衝突イベント
description: contact、collisionstart、collisionend イベントで rigid body 同士の物理的な接触に応答し、接触点とインパルスを読み取り、シーン内のすべての接触を監視します。
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

2つのRigidBodyが接触すると、物理エンジンはその接触を両方のエンティティに通知します。サウンドを再生したり、ダメージを与えたり、パーティクルを生成したり、ゲームの状態を変えたりして応答できます。イベントは、関係する各エンティティの[Collision](/user-manual/editor/scenes/components/collision/)コンポーネントと[RigidBody](/user-manual/editor/scenes/components/rigidbody/)コンポーネントの両方で発火するため、都合のよい方で監視できます。

## イベント {#events}

| イベント | 発火するタイミング | ハンドラーの引数 |
| --- | --- | --- |
| `collisionstart` | 2つのボディが接触し始めた物理ステップで1回 | [ContactResult](https://api.playcanvas.com/engine/classes/ContactResult.html) |
| `contact` | ボディが接触している間、毎物理ステップ | [ContactResult](https://api.playcanvas.com/engine/classes/ContactResult.html) |
| `collisionend` | ボディの接触が終わったときに1回 | 相手の[Entity](https://api.playcanvas.com/engine/classes/Entity.html) |

接触が通知されるのは、2つのボディのうち少なくとも1つがDynamicな場合だけです。StaticなボディとKinematicなボディが互いに衝突することはありません。[トリガーボリューム](/user-manual/physics/trigger-volumes/)との重なりでは、これらのイベントの代わりに`triggerenter`と`triggerleave`が発火します。

## 衝突の監視 {#listening-for-collisions}

`on`で購読し、返されたハンドルを保持して、リスナーが不要になったらそのハンドルの`off()`を呼び出します。衝突音のような1回限りの反応には`collisionstart`を、毎ステップ更新される接触の詳細が必要な場合には`contact`を使用します。

```javascript
const handle = entity.collision.on('collisionstart', (result) => {
    console.log(`${entity.name} hit ${result.other.name}`);
});

// 後で、エンティティが破棄されたときやリスナーが不要になったときに
handle.off();
```

このコードをどこに置くかは、構築方法によって異なります。

<Tabs groupId="workflow" defaultValue="engine">
<TabItem value="engine" label="Engine">

上記のようにエンティティにコンポーネントが揃った後で購読するか、Editorタブに示すようにエンティティにアタッチしたScriptから購読します。スクリプトについては[スクリプティング](/user-manual/scripting/)セクションを参照してください。

</TabItem>
<TabItem value="editor" label="Editor">

エンティティにScriptコンポーネントを追加し、`initialize`で購読して破棄時に購読を解除するスクリプトをアタッチします。

```javascript
import { Script } from 'playcanvas';

export class ImpactSound extends Script {
    static scriptName = 'impactSound';

    initialize() {
        const handle = this.entity.collision.on('collisionstart', this.onCollisionStart, this);
        this.on('destroy', () => handle.off());
    }

    onCollisionStart(result) {
        // 同じエンティティのSoundコンポーネントの 'hit' スロットを再生する
        this.entity.sound.play('hit');
    }
}
```

`on`の3番目の引数は、ハンドラー内の`this`をスクリプトインスタンスにバインドします。

</TabItem>
<TabItem value="react" label="React">

`<Entity>`の中、その`<Collision>`の後にコンポーネントを配置し、物理演算の読み込み後にエフェクトで購読します。

```jsx
import { useEffect } from 'react';
import { useParent, usePhysics } from '@playcanvas/react/hooks';

function ImpactSound() {
  const entity = useParent();
  const { isPhysicsLoaded } = usePhysics();

  useEffect(() => {
    if (!isPhysicsLoaded || !entity.collision) return;
    const handle = entity.collision.on('collisionstart', (result) => {
      console.log(`${entity.name} hit ${result.other.name}`);
    });
    return () => handle.off();
  }, [entity, isPhysicsLoaded]);

  return null;
}
```

</TabItem>
<TabItem value="web-components" label="Web Components">

Editorタブに示した`ImpactSound`スクリプトを[`<pc-script>`](/user-manual/web-components/tags/pc-script/)でアタッチするか、アプリの準備ができた後に要素の`entity`プロパティを通してページのJavaScriptから購読します。

```html
<script type="module">
    import { whenReady } from '@playcanvas/web-components';

    await whenReady('pc-app');
    const { entity } = document.querySelector('pc-entity[name="crate"]');
    entity.collision.on('collisionstart', (result) => {
        console.log(`${entity.name} hit ${result.other.name}`);
    });
</script>
```

`whenReady`の仕組みは[プログラムからのアクセス](/user-manual/web-components/programmatic-access/)を参照してください。

</TabItem>
</Tabs>

## 接触データ {#contact-data}

`collisionstart`と`contact`は、2つのプロパティを持つ[ContactResult](https://api.playcanvas.com/engine/classes/ContactResult.html)を渡します。

- `other` - このボディが衝突した相手のエンティティ。
- `contacts` - [ContactPoint](https://api.playcanvas.com/engine/classes/ContactPoint.html)オブジェクトの配列。2つの形状が触れている点ごとに1つ。

各接触点には次の情報が含まれます。

| プロパティ | 説明 |
| --- | --- |
| `point` | このエンティティ上の接触点（ワールド空間） |
| `pointOther` | 相手のエンティティ上の接触点（ワールド空間） |
| `localPoint` | このエンティティのローカル空間での接触点 |
| `localPointOther` | 相手のエンティティのローカル空間での接触点 |
| `normal` | ワールド空間での接触法線。接触点において相手のエンティティの表面から離れる方向を指します |
| `impulse` | 物理エンジンがボディを分離するために加えたインパルス。値が大きいほど強い衝突です |

インパルスは、2つのボディがどれだけ強くぶつかったかを表す便利な指標です。サウンドの音量やダメージ量のスケーリングに使ったり、かすっただけの接触を無視したりできます。

```javascript
entity.collision.on('collisionstart', (result) => {
    let strongest = 0;
    for (const contact of result.contacts) {
        strongest = Math.max(strongest, contact.impulse);
    }
    if (strongest > 5) {
        entity.sound.play('crash');
    }
});
```

## シーン全体の接触 {#scene-wide-contacts}

例えば集中管理型のオーディオやダメージのマネージャーのように、すべての接触を1か所で処理するには、個々のエンティティではなくRigidBodyコンポーネントシステムの`contact`イベントを監視します。このイベントは接触点ごとに1回発火し、両方のエンティティを示す[SingleContactResult](https://api.playcanvas.com/engine/classes/SingleContactResult.html)を渡します。

```javascript
app.systems.rigidbody.on('contact', (result) => {
    // result.a と result.b が2つのエンティティ
    // result.pointA、result.pointB、result.normal はワールド空間
    if (result.impulse > 5) {
        console.log(`${result.a.name} and ${result.b.name} collided hard`);
    }
});
```

:::tip

`contact`は2つのボディが触れている間、毎物理ステップ発火します。床の上に置かれた箱の場合、これは毎フレームということです。1回限りのエフェクトには`collisionstart`を使い、`contact`のハンドラーは軽く保ってください。

:::

## 関連情報 {#see-also}

- [トリガーボリューム](/user-manual/physics/trigger-volumes/) - 動きを遮らない領域の重なりイベント
- [衝突とトリガー](/tutorials/collision-and-triggers/) - 衝突時にサウンドを再生するチュートリアル
- [イベント](/user-manual/scripting/events/) - スクリプティングのイベントシステムの仕組み
- [CollisionComponent](https://api.playcanvas.com/engine/classes/CollisionComponent.html)と[RigidBodyComponent](https://api.playcanvas.com/engine/classes/RigidBodyComponent.html) - 各コンポーネントのイベントのAPIリファレンス
