---
title: Colyseusを使ったリアルタイムマルチプレイヤー
tags: [multiplayer, networking]
thumb: "https://avatars.githubusercontent.com/u/28384334?s=300&v=4"
---

<div className="iframe-container">
  <iframe src="https://playcanv.as/p/1QoAsx7r/" title="Real-time Multiplayer with Colyseus" allow="camera; microphone; xr-spatial-tracking; fullscreen" allowfullscreen></iframe>
</div>

> *「create game」を選択し、新しいゲームを立ち上げます。床のいずれかをクリックしてオブジェクトを移動します。*

## このチュートリアルでは、次のことを学びます: {#on-this-tutorial-you-will-learn}

- Colyseusサーバーの設定
- サーバーとクライアント間での状態同期
- クライアントとサーバー間でのメッセージ交換
- マッチメイキング: ゲームの作成、参加、利用可能なゲームのリストアップ

## 必要なもの {#materials}

- [PlayCanvasプロジェクト (クライアントサイド)](https://playcanvas.com/project/859259/overview/colyseus-demo)
- [Colyseus TypeScriptプロジェクト (サーバーサイド)](https://github.com/colyseus/tutorial-playcanvas-server)

## 開始する前に {#before-you-start}

### 前提知識 {#prior-knowledge-expected}

- 基本的なPlayCanvasの知識 ([PlayCanvas開発者リソースを参照してください](https://developer.playcanvas.com/))
- 基本的なJavaScript/TypeScriptの理解 ([TypeScript Handbookを参照してください](https://www.typescriptlang.org/docs/handbook/intro.html))
- 基本的なNode.jsの理解 ([Introduction to Node.jsを参照してください](https://nodejs.dev/en/learn/))

### ソフトウェア要件 {#software-requirements}

- [Node.js LTS](https://nodejs.org/en/download/)
- [Visual Studio Code](https://code.visualstudio.com/download)

## サーバーの作成 {#creating-the-server}

プレイヤーの状態を保持するために、基本的なサーバーをローカルに作成します。変更はクライアントと自動的に同期されます。

新しいColyseusサーバーを作成するには、コマンドラインから以下を実行します:

```sh
npm init colyseus-app ./playcanvas-demo-server
```

次に`npm start`を実行して、ローカルでサーバーを動かすことができるか確認しましょう。

```sh
cd playcanvas-demo-server
npm start
```

成功すれば、コマンドラインに以下のような出力が表示されます。

```sh
> my-app@1.0.0 start
> ts-node-dev --respawn --transpile-only src/index.ts

✅ development.env loaded.
✅ Express initialized
🏟 Your Colyseus App
⚔️ Listening on ws://localhost:2567
```

## Colyseus JavaScript SDKのインポート {#including-the-colyseus-javascript-sdk}

PlayCanvasにColyseus JavaScript SDKを追加する必要があります。

"PlayCanvasプロジェクトの設定"を使用して、"外部スクリプト"として追加できます。

**「メニュー」→ 「設定」**を開いてください:

![settings](/img/tutorials/multiplayer-colyseus/settings.png)

設定パネルから、**「外部スクリプト」**を展開し、**「URL」**の数を増やします。

![CDN](/img/tutorials/multiplayer-colyseus/ext_script.png)

新しい**「URL」**フィールドに、CDNからColyseus JavaScript SDKを含めてください:

```none
https://unpkg.com/colyseus.js@^0.16.0/dist/colyseus.js
```

これにより、PlayCanvasスクリプトの `Colyseus` [JavaScript SDK](https://docs.colyseus.io/getting-started/javascript-client/) を使用できます。

## クライアント - サーバー接続の確立 {#establishing-a-client-server-connection}

Now, from a new PlayCanvas Script, let's instantiate our `Colyseus.Client` instance. ([see "Creating new scripts"](/user-manual/editor/scripting/managing-scripts/))

このスクリプトは、「NetworkManager」という新しい空のエンティティにアタッチできます。

```javascript
var NetworkManager = pc.createScript('networkManager');

NetworkManager.prototype.initialize = async function () {
  //
  // SDKをインスタンス化します
  //(接続はまだ確立されていません)
  //
  this.app.colyseus = new Colyseus.Client("ws://localhost:2567");

  //
  // ルーム「my_room」を作成または参加するようにリクエストします
  //(サーバーとの接続を確立します)
  //
  this.room = await this.app.colyseus.joinOrCreate("my_room");
}
```

> ここで、ローカルの `ws://localhost:2567` エンドポイントを使用しています。他の人とオンラインでプレイするには、 [サーバーをデプロイ](https://docs.colyseus.io/deployment/)して、公共のインターネットを使用する必要があります。[Glitch](https://glitch.com/edit/#!/tutorial-playcanvas-server)を使ってサーバーを公開することもできます。

PlayCanvasプロジェクトを**「起動」**すると、クライアントはサーバーと接続し、サーバーは必要に応じて`my_room`という部屋を作成します。

`my_room` は、Colyseusサーバーのデフォルトのルーム識別子です。 `arena.config.ts` ファイルでこの識別子を変更することができます。

クライアントがルームに正常に参加したことを意味するサーバーログに以下のメッセージが表示されます。

```none
19U8WkmoK joined!
```

## ルーム状態とスキーマ {#room-state-and-schema}

Colyseusでは、共有データを `Schema` 構造を使用して定義します。

> `Schema`はColyseusからの特別なデータ型で、その変更/変異を_増分的に_エンコードする能力があります。エンコードとデコードのプロセスはフレームワークとそのSDKによって内部的に行われます。

ステート同期のループは次のようになります。

1. 状態の変更(変異)は、サーバー→クライアント間で自動的に同期されます。
2. クライアントは、ローカルの_読み取り専用_の`Schema`構造体にコールバックをアタッチすることで、状態の変化を観察し、それに対応することができます。
3. クライアントは任意のメッセージをサーバーに送信することができます - それが何をするかはサーバーが決定します - そして状態を変化させることができます（ステップ**1.**に戻ります）

---

サーバーコードを編集して、サーバー側でのルーム状態を定義しましょう。

複数の `Player` インスタンスを処理する必要があります。各 `Player` には、 `x`、`y`、`z`座標があります。

```typescript
// MyRoomState.ts
import { MapSchema, Schema, type } from "@colyseus/schema";

export class Player extends Schema {
    @type("number") x: number;
    @type("number") y: number;
    @type("number") z: number;
}

export class MyRoomState extends Schema {
    @type({ map: Player }) players = new MapSchema<Player>();
}
```

> [スキーマ構造について](https://docs.colyseus.io/state/schema/)もご覧ください。

次に、サーバーサイドで `onJoin()` メソッドを変更して、ルームとの新しい接続が確立されるたびに `Player` インスタンスを作成します。

```typescript
// MyRoom.ts
// ...
    onJoin(client: Client, options: any) {
        console.log(client.sessionId, "joined!");

        // create Player instance
        const player = new Player();

        // place Player at a random position
        const FLOOR_SIZE = 4;
        player.x = -(FLOOR_SIZE/2) + (Math.random() * FLOOR_SIZE);
        player.y = 1.031;
        player.z = -(FLOOR_SIZE/2) + (Math.random() * FLOOR_SIZE);

        // place player in the map of players by its sessionId
        // (client.sessionId is unique per connection!)
        this.state.players.set(client.sessionId, player);
    }
// ...
}
```

また、クライアントが切断された場合には、プレイヤーをプレイヤーマップから削除するようにしましょう。

```typescript
// MyRoom.ts
// ...
    onLeave(client: Client, consented: boolean) {
        console.log(client.sessionId, "left!");

        this.state.players.delete(client.sessionId);
    }
// ...
```

サーバーサイドで行った状態変化は、クライアントサイドで **観察できます** 。次のセクションでやることです。

## 同期のためのシーンのセットアップ {#setting-up-the-scene-for-synchronization}

このデモ用に、シーンに2つのオブジェクトを作成する必要があります。

- 床を表す Plane
- プレイヤーを表す Capsule。新しいプレイヤーがルームに参加するたびに複製します。

### Planeの作成 {#creating-the-plane}

スケール`8`のPlaneを作成しましょう。

![Plane](/img/tutorials/multiplayer-colyseus/plane.jpg)

### Playerの作成 {#creating-the-player}

スケール`1`のPlayerカプセルを作成しましょう。

`"Enabled"`プロパティのチェックを外すことを確認してください。サーバーとのアクティブな接続があるまでは、Playerのインスタンスは有効化されません。

![Player](/img/tutorials/multiplayer-colyseus/player.png)

## Stateの変更を監視 {#listening-for-state-changes}

ルームとの接続が確立した後、クライアント側はStateの変更を監視し、サーバー上のデータの視覚的な表現を作成できます。

### Playerの追加 {#adding-new-players}

[Room State and Schema](#room-state-and-schema)セクションによると、サーバーが新しい接続を受け入れると、 `onJoin()` メソッドがState内に新しいPlayerインスタンスを作成します。

これをクライアント側でリッスンするようにします。

```typescript
//
// In order to attach callbacks to the state, we need to use the `getStateCallbacks()` method
//
const $ = Colyseus.getStateCallbacks(this.room);

// ...
$(this.room.state).players.onAdd((player, sessionId) => {
  //
  // A player has joined!
  //
  console.log("A player has joined! Their unique session id is", sessionId);
});
// ...
```

Sceneをプレイすると、新しいクライアントがルームに参加するたびに、ブラウザのコンソールにメッセージが表示されます。

視覚的な表現については、"Player"オブジェクトをクローンし、その`sessionId`に基づいてクローンされたオブジェクトのローカル参照を保持しておく必要があります。これにより、後で操作できます。

```typescript
// ...

// we will assign each player visual representation here
// by their `sessionId`
this.playerEntities = {};

// listen for new players
$(this.room.state).players.onAdd((player, sessionId) => {
  // find the base Player representation (not enabled)
  const playerEntityToClone = this.app.root.findByName("Player");

  // clone the Player representation, and enabled it!
  const entity = playerEntityToClone.clone();
  entity.enabled = true;

  // set position based on server data
  entity.setPosition(player.x, player.y, player.z);

  // add clone to the Scene
  playerEntityToClone.parent.addChild(entity);

  // assign visual representation by their `sessionId`
  this.playerEntities[sessionId] = entity;
});
// ...
```

### 現在のプレイヤー {#the-current-player}

`sessionId`を接続された`room.sessionId`と照合して、現在のプレイヤーオブジェクトに対する特別な参照を保持することができます。

```typescript
// ...
$(this.room.state).players.onAdd((player, sessionId) => {
  // ...
  if (this.room.sessionId === sessionId) {
    this.currentPlayerEntity = this.playerEntities[sessionId];
  }
  // ...
});
```

### 接続が切断されたプレイヤーの削除 {#removing-disconnected-players}

プレイヤーがStateから削除された場合（サーバーサイドで `onLeave()` が呼び出された場合）、その視覚的な表現も削除する必要があります。

```javascript
// ...
$(this.room.state).players.onRemove((player, sessionId) => {
  // destroy entity
  this.playerEntities[sessionId].destroy();

  // clear local reference
  delete this.playerEntities[sessionId];
});
// ...
```

## プレイヤーの移動 {#moving-the-players}

### 新しい位置をサーバーに送信する {#sending-the-new-position-to-the-server}

マウスダウンイベントを許可し、[ray cast](/user-manual/physics/ray-casting/)を使用して、プレイヤーが移動するべき正確な`Vec3`位置を決定し、それをメッセージとしてサーバーに送信するようにします。

```typescript
// ...
this.app.mouse.on(pc.EVENT_MOUSEDOWN, (event) => {
  // 床の「バウンディングボックス」を作成します
  const boundingBox = new pc.BoundingBox(new pc.Vec3(0, 0, 0), new pc.Vec3(4, 0.001, 4));;

  // rayを初期化し、rayの方向を決定します
  // スクリーン位置からのrayの方向を決定します
  const ray = new pc.Ray();
  const targetPosition = new pc.Vec3();

  const cameraEntity = this.app.root.findByName("Camera");
  cameraEntity.camera.screenToWorld(event.x, event.y, cameraEntity.camera.farClip, ray.direction);
  ray.origin.copy(cameraEntity.getPosition());
  ray.direction.sub(ray.origin).normalize();

  // 地面に対してrayをテストします
  const result = boundingBox.intersectsRay(ray, targetPosition);

  if (result) {
    // 位置の高さを調整
    targetPosition.y = 1.031;

    //
    // 新しい目標プレイヤー位置をサーバーに送信します。
    //
    this.room.send("updatePosition", {
        x: targetPosition.x,
        y: targetPosition.y,
        z: targetPosition.z,
    });
  }
});
```

### サーバーからのメッセージの受信 {#receiving-the-message-from-the-server}

サーバーから `"updatePosition"` メッセージを受信するたびに、メッセージを送信したプレイヤーをその`sessionId`を通じて変更します。

```typescript
// MyRoom.ts
// ...
  onCreate(options: any) {
    this.setState(new MyRoomState());

    this.onMessage("updatePosition", (client, data) => {
      const player = this.state.players.get(client.sessionId);
      player.x = data.x;
      player.y = data.y;
      player.z = data.z;
    });
  }
// ...
```

### プレイヤーの視覚表現の更新 {#updating-players-visual-representation}

Having the mutation on the server, we can detect it on the client-side via `$(player).onChange()`, or `$(player).listen()`.

- `$(player).onChange()` is triggered **per schema instance**
- `$(player).listen(prop)` is triggered **per property** change

1つずつ変更があった場合でも、すべての新しい座標が同時に必要なため、 `.onChange()` を使用する必要があります。

```typescript
// ...
$(this.room.state).players.onAdd((player, sessionId) => {
  // ...
  $(player).onChange(() => {
    this.playerEntities[sessionId].setPosition(player.x, player.y, player.z);
  });

  // Alternative, listening to individual properties:
  // $(player).listen("x", (newX, prevX) => console.log(newX, prevX));
  // $(player).listen("y", (newY, prevY) => console.log(newY, prevY));
  // $(player).listen("z", (newZ, prevZ) => console.log(newZ, prevZ));
});
```

> [スキーマコールバックについてもっと読む](https://docs.colyseus.io/state/schema/#client-side)

## 追加: ルームと接続のモニタリング {#extra-monitoring-rooms-and-connections}

Colyseusには、ゲーム開発中に役立つオプションのモニタリングパネルが付属しています。

ローカルサーバーからモニターパネルを表示するには、`http://localhost:2567/colyseus` にアクセスしてください。

![monitor](/img/tutorials/multiplayer-colyseus/monitor.png)

このパネルを通じて、スポーンしたすべてのルームやアクティブなクライアント接続を見ることができ、相互作用することができます。

> [モニタリングパネルの詳細についてはこちらをご覧ください。](https://docs.colyseus.io/tools/monitor/)

## さらに詳しく {#more}

このチュートリアルが役立ったことを願っています。Colyseusについてもっと学びたい場合は、[Colyseusドキュメント](https://docs.colyseus.io/)を参照して、[Colyseus Discordコミュニティ](https://discord.gg/RY8rRS7)に参加してください。
