---
title: Colyseusを使ったリアルタイムマルチプレイヤー
tags: [multiplayer, networking]
thumb: "https://avatars.githubusercontent.com/u/28384334?s=300&v=4"
description: PlayCanvas を Colyseus サーバーに接続し、シンプルなクリック移動デモでルーム状態の同期、メッセージング、マッチメイキングを行います。
---

<div className="iframe-container">
  <iframe src="https://playcanv.as/p/1QoAsx7r/" title="Real-time Multiplayer with Colyseus" allow="camera; microphone; xr-spatial-tracking; fullscreen; loopback-network; local-network-access" allowfullscreen></iframe>
</div>

> *このデモは、あなたのコンピューター上のColyseusサーバーに接続します。[サーバーの実行](#running-the-server)の手順でサーバーを起動してから、**CREATE GAME** を選択し、床のいずれかをクリックして移動してください。2つ目のブラウザタブでデモを開いて **JOIN EXISTING GAME** を選択すると、両方のプレイヤーが動く様子を確認できます。*

[Colyseus](https://colyseus.io/)は、Node.js向けのオープンソースのマルチプレイヤーフレームワークです。サーバーが正となるゲームの状態を保持し、接続しているすべてのクライアントをその状態と同期させます。このチュートリアルでは、Colyseusを使って複数のプレイヤーを同じルームに入れ、各プレイヤーが床をクリックして移動できるPlayCanvasプロジェクトを順に見ていきます。

## このチュートリアルで学ぶこと {#on-this-tutorial-you-will-learn}

- Colyseusサーバーの実行
- サーバーとクライアント間での状態同期
- クライアントからサーバーへのメッセージ送信
- マッチメイキング: ゲームの作成、参加、利用可能なゲームの一覧表示

## 必要なもの {#materials}

- [PlayCanvasプロジェクト (クライアントサイド)](https://playcanvas.com/project/859259/overview/colyseus-demo)
- [Colyseus TypeScriptプロジェクト (サーバーサイド)](https://github.com/colyseus/tutorial-playcanvas-server)

Editorで手順を追うには、PlayCanvasプロジェクトをフォークしてください。このページのコードは、プロジェクト内のコードそのものです。

## 開始する前に {#before-you-start}

### 前提知識 {#prior-knowledge-expected}

- 基本的なPlayCanvasの知識 ([はじめに](/user-manual/getting-started/))
- 基本的なJavaScript/TypeScriptの理解 ([TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/intro.html))
- 基本的なNode.jsの理解 ([Introduction to Node.js](https://nodejs.org/en/learn/getting-started/introduction-to-nodejs))

### ソフトウェア要件 {#software-requirements}

- [Node.js](https://nodejs.org/en/download/) 22以降
- [Visual Studio Code](https://code.visualstudio.com/download)などのコードエディター

## サーバーの実行 {#running-the-server}

このチュートリアルのサーバーは、小さなColyseusプロジェクトです。[サーバーのリポジトリ](https://github.com/colyseus/tutorial-playcanvas-server)をクローンまたはダウンロードし、コマンドラインから依存関係をインストールして起動します。

```sh
cd tutorial-playcanvas-server
npm install
npm start
```

サーバーは `ws://localhost:2567` でWebSocket接続を待ち受けます。サーバーが動いている間は、Editorから起動したプロジェクトでも、このページの上部にあるデモでも、PlayCanvasプロジェクトがサーバーに接続できます。

インターネット上のページが自分のコンピューター上のプログラムに接続しようとするため、ページがデバイス上のアプリやサービスにアクセスしてよいかどうかを、ブラウザが確認する場合があります。**許可**（Allow）を選択します。

:::note

Safariは、インターネット上のページが `localhost` に接続することを拒否する場合があります。プロジェクトが接続できない場合は、Chrome、Edge、Firefoxのいずれかを使ってください。ブラウザの確認をブロックしてしまった場合は、アドレスバーの左端にあるアイコンを選択してサイトの権限をリセットし、ページを再読み込みします。

:::

代わりに独自のサーバーを一から作成するには、`npm create colyseus-app@latest ./my-server` を実行し、表示される質問に答えてください。

### ルームの定義 {#defining-the-rooms}

クライアントはColyseusサーバー全体に接続するのではなく、**ルーム**に参加します。各ルームでは、それぞれ独立したゲームが動きます。クライアントが参加できるルームの種類は、サーバーの `src/app.config.ts` で定義します。

```typescript
// app.config.ts
initializeGameServer: (gameServer) => {
    // Expose MyRoom with realtime listing (lobby listing)
    gameServer
        .define('my_room', MyRoom)
        .enableRealtimeListing();

    // Expose LobbyRoom
    gameServer
        .define('lobby', LobbyRoom);
},
```

`my_room` はゲーム本体です。`lobby` はColyseusに組み込まれたルームの種類で、どのゲームルームが開いているかをクライアントに伝えます。`enableRealtimeListing()` により、`my_room` の各ルームは作成、変更、終了のたびにロビーへ通知されます。

## ルーム状態とスキーマ {#room-state-and-schema}

Colyseusでは、共有するゲームの状態を `Schema` クラスで定義します。

> `Schema`はColyseusの特別なデータ型で、その変更/変異を*増分的に*エンコードできます。エンコードとデコードの処理は、フレームワークとそのSDKによって内部で行われます。

状態同期のループは次のようになります。

1. サーバーが状態を変更すると、Colyseusはその変更をルーム内のすべてのクライアントに送信します。
2. クライアントは、ローカルにある*読み取り専用*の状態のコピーにコールバックをアタッチして変更を監視し、それに合わせてシーンを更新します。
3. クライアントはサーバーにメッセージを送信します。サーバーはそれをどう扱うかを決め、状態を変更することがあります（ステップ **1.** に戻ります）。

`my_room` の状態は、各クライアントのセッションIDをキーとするプレイヤーのマップです。各 `Player` は `x`、`y`、`z` 座標を持ちます。

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

ルームは、クライアントが参加するたびに床のランダムな位置に `Player` を作成し、クライアントが退出すると削除します。最大5つのクライアントが参加できます。

```typescript
// MyRoom.ts
export class MyRoom extends Room<MyRoomState> {
  maxClients = 5;
  state = new MyRoomState();

  // ...

  onJoin(client: Client, options: any) {
    console.log(client.sessionId, "joined!");

    // create Player instance
    const player = new Player();

    // place Player at a random position in the floor
    const FLOOR_SIZE = 4;
    player.x = -(FLOOR_SIZE / 2) + (Math.random() * FLOOR_SIZE);
    player.y = 1.031;
    player.z = -(FLOOR_SIZE / 2) + (Math.random() * FLOOR_SIZE);

    // place player in the map of players by its sessionId
    // (client.sessionId is unique per connection!)
    this.state.players.set(client.sessionId, player);
  }

  onLeave(client: Client, consented: boolean) {
    this.state.players.delete(client.sessionId);
    console.log(client.sessionId, "left!");
  }
}
```

サーバー側で行った状態の変更は、クライアント側で**監視できます**。PlayCanvasプロジェクトはこれを利用しています。

## PlayCanvasプロジェクト {#the-playcanvas-project}

プロジェクトには3つのシーンがあります。各シーンには、シーン名と同じ名前のルートエンティティと、そのシーン専用のスクリプトがあります。

| シーン | 役割 | スクリプト |
| --- | --- | --- |
| MainMenu | Colyseusクライアントを作成し、4つのメニューボタンを表示する | ルートエンティティの `mainMenu.mjs`、各ボタンのボタンハンドラースクリプト |
| GamePlay | ゲームルームに参加し、床の上にプレイヤーを表示する | ルートエンティティの `gameplay.mjs`、**BACK** ボタンの `backButtonHandler.mjs` |
| RoomList | 開いているゲームルームを一覧表示する | ルートエンティティの `roomList.mjs`、**BACK** ボタンの `backButtonHandler.mjs` |

プロジェクトは [`loadSceneHierarchy`](/user-manual/editor/scenes/loading-scenes/) でシーンを切り替えます。新しいシーンの階層を読み込み、古いシーンの階層を破棄します。Colyseusクライアントは MainMenu シーンで一度だけ作成され、他のシーンからも使えるようにアプリケーションに保存されます。

GamePlay シーンには次のエンティティがあります。

- **Plane**: 床です。クライアントがルームに参加するまで無効になっています。
- **Player1**: 現在のプレイヤーを表す青いカプセルです。クライアントが参加するまで無効になっています。
- **Player2**: 無効にされた濃いグレーのカプセルです。プロジェクトはルーム内の他のプレイヤーごとにこれを複製します。

## Colyseus SDKの読み込み {#including-the-colyseus-javascript-sdk}

プロジェクトのESMスクリプトは、[Colyseus JavaScript SDK](https://docs.colyseus.io/sdk)をCDNから直接インポートします。

```javascript
import { Client } from 'https://esm.sh/colyseus.js@0.16';
```

SDKからインポートするすべてのスクリプトで同じURLを使い、全スクリプトがSDKの同じコピーを共有するようにしてください。[インポートマップ](/user-manual/editor/scripting/import-maps/)で短い名前をURLに割り当てることもできます。

:::note[Classicスクリプト]

Classicスクリプトを使うプロジェクトでは、プロジェクトの[設定](/user-manual/editor/interface/settings/)の **External Scripts** に `https://unpkg.com/colyseus.js@^0.16.0/dist/colyseus.js` を追加します。すると、SDKはグローバルな `Colyseus` オブジェクトとして使えるようになります。例えば `new Colyseus.Client(...)` や `Colyseus.getStateCallbacks(room)` のように使います。

:::

## サーバーへの接続 {#establishing-a-client-server-connection}

`mainMenu.mjs` スクリプトは `Client` を作成し、メニューボタンを待ち受けます。各ボタンのハンドラースクリプトは、読み込むシーンとそこで行う処理を含むイベントを発火します。

```javascript
import { Script } from 'playcanvas';
import { Client } from 'https://esm.sh/colyseus.js@0.16';

/**
 * MainMenu handles Colyseus client initialization and scene transitions
 * when a user chooses to create, join, or view available rooms.
 */
export class MainMenu extends Script {
    static scriptName = 'mainMenu';

    initialize() {
        // Connect to the Colyseus server running on your computer.
        // (no connection is established until you join a room)
        this.app.colyseus = new Client('ws://localhost:2567');
        this.app.roomName = 'my_room';

        // Scene transition event listeners
        this.app.on('createButtonHandler:clicked', this.loadScene, this);
        this.app.on('joinButtonHandler:clicked', this.loadScene, this);
        this.app.on('joinOrCreateButtonHandler:clicked', this.loadScene, this);
        this.app.on('roomListButtonHandler:clicked', this.loadScene, this);

        this.on('destroy', () => {
            this.app.off('createButtonHandler:clicked', this.loadScene, this);
            this.app.off('joinButtonHandler:clicked', this.loadScene, this);
            this.app.off('joinOrCreateButtonHandler:clicked', this.loadScene, this);
            this.app.off('roomListButtonHandler:clicked', this.loadScene, this);
        });
    }

    loadScene(data) {
        this.app.action = data.action;

        // Disable all buttons to prevent further interaction
        const buttons = this.app.root.findByTag('button');
        buttons.forEach((btn) => {
            btn.button.active = false;
        });

        const oldHierarchy = this.app.root.findByName('MainMenu');
        const scene = this.app.scenes.find(data.sceneName);

        this.app.scenes.loadSceneHierarchy(scene.url, (err) => {
            if (!err) {
                oldHierarchy.destroy();
            } else {
                console.error(err);
            }
        });
    }
}
```

例えば、**CREATE GAME** ボタンのスクリプト `createButtonHandler.mjs` は次のとおりです。

```javascript
import { Script } from 'playcanvas';

/**
 * CreateButtonHandler listens for button clicks and fires a custom event
 * with scene and action info.
 */
export class CreateButtonHandler extends Script {
    static scriptName = 'createButtonHandler';

    initialize() {
        this.entity.button.on('click', () => {
            this.app.fire('createButtonHandler:clicked', {
                sceneName: 'GamePlay',
                action: 'create'
            });
        });
    }
}
```

> プロジェクトはローカルの `ws://localhost:2567` エンドポイントに接続します。他の人とオンラインでプレイするには、[サーバーをデプロイ](https://docs.colyseus.io/deployment/)して公開インターネットに置き、そのアドレスを使ってください。

## マッチメイキング {#matchmaking}

GamePlay シーンが読み込まれると、`gameplay.mjs` はプレイヤーが押したボタンに応じてルームに参加します。

```javascript
// Attempt to create or join room
try {
    switch (this.app.action) {
        case 'create':
            this.room = await this.app.colyseus.create(this.app.roomName);
            break;
        case 'join':
            this.room = await this.app.colyseus.join(this.app.roomName);
            break;
        case 'joinOrCreate':
            this.room = await this.app.colyseus.joinOrCreate(this.app.roomName);
            break;
        default:
            this.loadingMessage.enabled = false;
            this.displayError('GAME LOGIC ERROR!');
            return;
    }
} catch (err) {
    this.errMessage = err.message;
}
```

- `create()` は常に新しいルームを作成して参加します。
- `join()` は空きのある既存のルームに参加します。該当するルームがなければ失敗します。
- `joinOrCreate()` は空きのある既存のルームに参加し、なければ新しいルームを作成します。

各呼び出しは、クライアントがルームに参加すると `Room` を返します。サーバーが動いていない場合や参加できるルームがない場合など、失敗したときは代わりにエラーメッセージを表示します。成功すると、床とルームの名前とID（`room.name` と `room.roomId`）を表示し、状態の変更の監視を始めます。

ここでプロジェクトを起動すると、参加したクライアントがサーバーログに表示されます。

```none
19U8WkmoK joined!
```

## 状態の変更を監視する {#listening-for-state-changes}

クライアントがルームに参加すると、状態の変更を監視してシーンを同期させることができます。コールバックは、SDKからインポートした `getStateCallbacks()` を通して状態にアタッチします。

```javascript
import { getStateCallbacks } from 'https://esm.sh/colyseus.js@0.16';

// ...

// Attach callbacks to the room state through getStateCallbacks()
const $ = getStateCallbacks(room);
```

### 新しいプレイヤーの追加 {#adding-new-players}

[ルーム状態とスキーマ](#room-state-and-schema)で説明したとおり、サーバーの `onJoin()` メソッドは参加したクライアントごとに `Player` を状態に追加します。`onAdd()` は、ルームにすでにいるプレイヤーごとにコールバックを呼び出し、その後に参加したプレイヤーごとにも呼び出します。

```javascript
// Called for every player already in the room, then for each player who joins
$(room.state).players.onAdd((player, sessionId) => {
    if (this.playerObjects[sessionId]) {
        return;
    }

    const playerObj = {
        distanceToTravel: 0,
        direction: new Vec3(),
        targetPosition: new Vec3(),
        newPosition: new Vec3()
    };

    if (sessionId === room.sessionId) {
        // This is the current player
        this.mainPlayer.enabled = true;
        playerObj.entity = this.mainPlayer;
    } else {
        // Clone the template entity for each other player
        const newPlayer = this.otherPlayer.clone();
        newPlayer.enabled = true;
        this.otherPlayer.parent.addChild(newPlayer);
        playerObj.entity = newPlayer;
    }

    // Start at the position the server gave the player
    playerObj.entity.setPosition(player.x, player.y, player.z);

    this.playerObjects[sessionId] = playerObj;

    // Move towards the new position whenever the server changes it
    $(player).onChange(() => {
        this.movePlayerTo(playerObj, new Vec3(player.x, player.y, player.z));
    });
});
```

スクリプトは各プレイヤーのオブジェクトをセッションIDをキーにして `this.playerObjects` に保持します。そこにはプレイヤーのエンティティと、移動に必要なデータが入ります。

現在のプレイヤーを見分けるために、各プレイヤーのセッションIDを、このクライアント自身のセッションIDである `room.sessionId` と比較します。現在のプレイヤーは青い **Player1** エンティティで、他のプレイヤーはそれぞれ濃いグレーの **Player2** の複製で表示されます。

### プレイヤーの位置の更新 {#updating-players-visual-representation}

`$(player).onChange()` は、サーバーがそのプレイヤーのいずれかのプロパティを変更するたびに呼び出されます。スクリプトはそこで、プレイヤーのエンティティを新しい位置に向けて動かし始めます。

- `$(player).onChange()` は**スキーマインスタンスごと**に呼び出されます
- `$(player).listen(prop)` は**プロパティごと**の変更で呼び出されます

どの座標が変わっても3つの座標がまとめて必要なため、スクリプトは `onChange()` を使っています。1つのプロパティだけに反応するには `listen()` を使います。

```javascript
$(player).listen('x', (newX, prevX) => console.log(newX, prevX));
```

> [スキーマのコールバック](https://docs.colyseus.io/state/schema/#client-side)についても参照してください。

### 切断したプレイヤーの削除 {#removing-disconnected-players}

プレイヤーが（サーバーの `onLeave()` によって）状態から削除されると、スクリプトはそのエンティティも破棄します。

```javascript
$(room.state).players.onRemove((player, sessionId) => {
    this.playerObjects[sessionId]?.entity.destroy();
    delete this.playerObjects[sessionId];
});
```

## プレイヤーの移動 {#moving-the-players}

### 新しい位置をサーバーに送信する {#sending-the-new-position-to-the-server}

プレイヤーが床をクリックまたはタップすると、スクリプトは[レイキャスト](/user-manual/physics/ray-casting/)でポインターの下の `Vec3` 位置を求め、それを `updatePosition` メッセージでサーバーに送信します。

```javascript
doRayCast(player, screenPosition) {
    if (!player) {
        return;
    }

    const ray = Gameplay.ray;
    const hitPosition = new Vec3();

    // Cast a ray from the camera through the clicked point
    const camera = this.cameraEntity.camera;
    camera.screenToWorld(screenPosition.x, screenPosition.y, camera.farClip, ray.direction);
    ray.origin.copy(this.cameraEntity.getPosition());
    ray.direction.sub(ray.origin).normalize();

    // Test the ray against the floor
    if (this.groundShape.intersectsRay(ray, hitPosition)) {
        hitPosition.y = 1.031;

        // Send the new target position to the server
        this.room.send('updatePosition', {
            x: hitPosition.x,
            y: hitPosition.y,
            z: hitPosition.z
        });

        // Start moving right away rather than waiting for the server
        this.movePlayerTo(player, hitPosition);
    }
}
```

`this.groundShape` は床と同じ大きさの `BoundingBox` なので、レイキャストに物理システムは必要ありません。現在のプレイヤーは、サーバーが新しい位置を確定するのを待たずにすぐ動き始めます。

### サーバーでメッセージを受信する {#receiving-the-message-from-the-server}

サーバーは `updatePosition` メッセージを受信すると、クライアントの `sessionId` で送信元のプレイヤーを見つけ、その位置を変更します。

```typescript
// MyRoom.ts
onCreate(options: any) {
  this.onMessage("updatePosition", (client, data) => {
    const player = this.state.players.get(client.sessionId);
    player.x = data["x"];
    player.y = data["y"];
    player.z = data["z"];
  });
}
```

Colyseusはこの変更をルーム内のすべてのクライアントに送信し、各クライアントの `onChange()` コールバックがそのプレイヤーのエンティティを動かします。`gameplay.mjs` の `update()` メソッドは、毎フレーム各エンティティを目標位置に向けて少しずつ動かすので、プレイヤーは瞬間移動せずに新しい位置まで滑らかに移動します。

## 利用可能なルームの一覧表示 {#listing-available-rooms}

RoomList シーンは、開いているゲームルームを表示します。その `roomList.mjs` スクリプトはサーバーの `lobby` ルームに参加します。ロビーはクライアントにルームの一覧を送り、その後はルームが作成、変更、終了されるたびにメッセージを送ります。

```javascript
try {
    this.lobby = await this.app.colyseus.joinOrCreate('lobby');
} catch (err) {
    this.tableData.element.text = err.message ? `ERROR: ${err.message}` : 'ERROR FINDING GAMES!';
    return;
}

// The full list of rooms, sent when we join the lobby
this.lobby.onMessage('rooms', (rooms) => {
    this.rooms = rooms;
    this.showRooms();
});

// A room was created or changed
this.lobby.onMessage('+', ([roomId, room]) => {
    const index = this.rooms.findIndex(r => r.roomId === roomId);
    if (index !== -1) {
        this.rooms[index] = room;
    } else {
        this.rooms.push(room);
    }
    this.showRooms();
});

// A room was closed
this.lobby.onMessage('-', (roomId) => {
    this.rooms = this.rooms.filter(r => r.roomId !== roomId);
    this.showRooms();
});
```

一覧の各ルームには、`name`、`roomId`、`clients`（接続数）、`maxClients` があります。`showRooms()` は `my_room` のルームをテキスト要素に書き込みます。

## ルームからの退出 {#leaving-a-room}

**BACK** ボタンは MainMenu シーンに戻ります。メニューを読み込む前に、`gameplay.mjs` はルームから、`roomList.mjs` はロビーから退出します。

```javascript
async loadMenu() {
    if (this.room) {
        await this.room.leave(true);
    }

    // ... load the MainMenu scene
}
```

`true` を渡すと、クライアントが意図して退出したことが `onLeave()` の `consented` 引数としてサーバーに伝わります。サーバーはプレイヤーを状態から削除し、他のクライアントはそのエンティティを削除します。

接続が切れた場合は、ルームの `onLeave` コールバックがエラーを表示します。

```javascript
room.onLeave(() => {
    this.displayError('CLIENT DISCONNECTED!');
});
```

## おまけ: ルームと接続の監視 {#extra-monitoring-rooms-and-connections}

Colyseusには、ゲーム開発中に役立つオプションの監視パネルがあります。

ローカルサーバーの監視パネルを表示するには、`http://localhost:2567/monitor` にアクセスしてください。

![monitor](/img/tutorials/multiplayer-colyseus/monitor.webp)

このパネルから、作成されたすべてのルームとアクティブなクライアント接続を確認し、操作できます。

> 詳細は[監視パネルの説明](https://docs.colyseus.io/tools/monitoring)を参照してください。

サーバーは `http://localhost:2567` でColyseus Playgroundも提供しています。ゲームクライアントなしで、ブラウザからルームに参加したりメッセージを送信したりできます。

## さらに詳しく {#more}

このチュートリアルがお役に立てば幸いです。Colyseusについてさらに学ぶには、[Colyseusのドキュメント](https://docs.colyseus.io/)をご覧いただき、[ColyseusのDiscordコミュニティ](https://discord.gg/RY8rRS7)にもぜひ参加してください。
