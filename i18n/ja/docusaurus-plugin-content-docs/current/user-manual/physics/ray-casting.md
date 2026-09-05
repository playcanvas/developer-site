---
title: レイキャスティング
description: raycastFirst と raycastAll で直線に沿って物理シーンを問い合わせ、ヒットしたエンティティ、位置、法線を読み取り、タグ、グループ、コールバックでヒットを絞り込み、ポインターの下のエンティティをピッキングします。
---

PlayCanvas物理エンジンを使用すると、レイキャストを実行できます。レイキャストは、2つの3Dポイント間の直線がコリジョン形状と交差するかどうか、またどこで交差するかを判定するクエリです。レイキャストはRigidBodyコンポーネントシステム`app.systems.rigidbody`のメソッドなので、どの方法で構築しても同じように機能します。必要なのはアプリケーションと2つの点だけです。

## レイキャストによるピッキング {#picking-with-a-ray-cast}

レイキャスティングの用途の一つはピッキングです。ユーザーが画面をタッチまたはクリックしてエンティティを選択できます。以下の例では、カメラからポインターの位置を通してレイを飛ばし、最も近くでヒットしたボディを報告します。

<EngineExample id="physics/raycast" title="Raycast" />

レイはカメラから始まり、ポインターの位置がカメラのファークリップ面に当たる場所で終わるため、ポインターの下にあるものを通過します。

```javascript
function pick(screenX, screenY) {
    // カメラの位置から...
    const from = cameraEntity.getPosition();

    // ...ポインターの位置をファークリップ面に投影した点まで
    const to = cameraEntity.camera.screenToWorld(screenX, screenY, cameraEntity.camera.farClip);

    // 最も近いヒットを返す。なければ null
    const result = app.systems.rigidbody.raycastFirst(from, to);
    if (result) {
        console.log(`You selected ${result.entity.name}`);
    }
}

app.mouse.on(pc.EVENT_MOUSEDOWN, (event) => pick(event.x, event.y));
app.touch?.on(pc.EVENT_TOUCHSTART, (event) => pick(event.touches[0].x, event.touches[0].y));
```

エディターでは、このコードはカメラのエンティティに付けたスクリプトの中に置き、`app`と`cameraEntity`の代わりに`this.app`と`this.entity`を使います。完全なスクリプトは[物理演算によるエンティティのピッキング](/tutorials/entity-picking-using-physics/)チュートリアルにあります。Reactでは`useApp()`が、Web Componentsでは`whenReady('pc-app')`がアプリケーションを返します。これらのパターンは[ボディを動かす](/user-manual/physics/forces-and-impulses/#running-physics-code)を参照してください。

## レイキャストの結果 {#raycast-results}

RigidBodyコンポーネントシステムは、2つのクエリメソッドを提供します。

- [`raycastFirst(start, end, options)`](https://api.playcanvas.com/engine/classes/RigidBodyComponentSystem.html#raycastfirst)は最も近いヒットを返し、何もヒットしなければ`null`を返します。
- [`raycastAll(start, end, options)`](https://api.playcanvas.com/engine/classes/RigidBodyComponentSystem.html#raycastall)はレイに沿ったすべてのヒットの配列を返し、何もヒットしなければ空の配列を返します。`sort: true`を渡さない限り配列の順序は不定で、渡すと近い順に並びます。

各ヒットは[RaycastResult](https://api.playcanvas.com/engine/classes/RaycastResult.html)です。

| プロパティ | 説明 |
| --- | --- |
| `entity` | コリジョン形状がヒットしたエンティティ |
| `point` | ヒットしたワールド空間の位置 |
| `normal` | ヒット位置におけるワールド空間の表面法線 |
| `hitFraction` | レイ上のヒット位置の割合。`start`で0、`end`で1 |

レイキャストはRigidBodyだけでなく[トリガーボリューム](/user-manual/physics/trigger-volumes/)にもヒットします。トリガーを除外するには、以下のフィルターのいずれかを使用してください。

## レイキャストのフィルタリング {#filtering-ray-casts}

どちらのメソッドもオプションオブジェクトを受け取ります。

| オプション | 説明 |
| --- | --- |
| `filterTags` | [タグ](https://api.playcanvas.com/engine/classes/Tags.html)が一致するエンティティのヒットだけを報告します。`Tags#has`の引数と同じ書き方を配列の中に記述します。`['enemy']`はそのタグを必須にし、`['enemy', 'boss']`は両方を必須にし、`[['red', 'blue']]`はどちらか一方を必須にします |
| `filterCallback` | ヒットした各エンティティを受け取り、そのヒットを残す場合に`true`を返す関数 |
| `filterCollisionGroup` | レイの[コリジョングループ](/user-manual/physics/rigid-bodies/#collision-groups-and-masks)。各ボディのマスクと照合されます |
| `filterCollisionMask` | レイのコリジョンマスク。各ボディのグループと照合されます |
| `sort` | `raycastAll`のみ。ヒットを近い順に並べ替えます |

```javascript
// 弾が貫通するすべての敵を、近い順に見つける
const hits = app.systems.rigidbody.raycastAll(from, to, {
    filterTags: ['enemy'],
    sort: true
});
for (const hit of hits) {
    hit.entity.script.health.damage(10 * (1 - hit.hitFraction));
}

// プレイヤー自身のボディ以外をピッキングする
const result = app.systems.rigidbody.raycastFirst(from, to, {
    filterCallback: (entity) => entity !== player
});
```

タグやコールバックによるフィルタリングにはレイに沿ったすべてのヒットが必要なため、これらのオプションを付けた`raycastFirst`は`raycastAll`と同じ処理を行います。グループとマスクによるフィルタリングは物理エンジン内部で行われるため、より低コストです。[タグによる物理レイキャスティング](/tutorials/physics-raycasting-by-tag/)チュートリアルでは、完全なプロジェクトでタグのフィルタリングを紹介しています。

## 環境の探査 {#probing-the-environment}

レイキャスティングには他の用途もあります。エンティティはレイキャストを飛ばすことで周囲を探査できます。たとえば、キャラクターが地面に立っているかどうかを判定するには、その位置から真下に短いレイを飛ばし、キャラクター自身以外の何かにヒットするかを確認します。

```javascript
const from = player.getPosition();
const to = new pc.Vec3(from.x, from.y - 1.1, from.z);
const hit = app.systems.rigidbody.raycastFirst(from, to, {
    filterCallback: (entity) => entity !== player
});
const onGround = hit !== null;
```

## 関連情報 {#see-also}

- [物理演算によるエンティティのピッキング](/tutorials/entity-picking-using-physics/) - エディター向けの完全なピッキングスクリプトを含むチュートリアル
- [タグによる物理レイキャスティング](/tutorials/physics-raycasting-by-tag/) - `filterTags`でヒットを絞り込むチュートリアル
- [物理演算でエンティティを配置する](/tutorials/place-an-entity-with-physics/) - レイが地面にヒットした位置にオブジェクトを生成するチュートリアル
- [RigidBodyComponentSystem](https://api.playcanvas.com/engine/classes/RigidBodyComponentSystem.html) - `raycastFirst`と`raycastAll`のAPIリファレンス
