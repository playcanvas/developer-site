---
title: Photonを使用したリアルタイムマルチプレイヤー
tags: [multiplayer, networking]
thumb: "https://s3-eu-west-1.amazonaws.com/images.playcanvas.com/projects/12/926999/90AE0A-image-75.jpg"
description: Photon のネットワークを統合し、PlayCanvas の HTML5 クライアントからサーバー権威の移動、マッチメイキング、ルーム参加を行います。
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import StepVideo from '@site/src/components/StepVideo';

<div className="iframe-container">
    <iframe src="https://playcanv.as/e/p/dvJYXs1Y/" title="Real-time Multiplayer with Photon - including matchmaking" allow="camera; microphone; xr-spatial-tracking; fullscreen" allowfullscreen></iframe>
</div>

:::info

このデモは[マッチメイキングを含む完全なプロジェクト](https://playcanvas.com/project/926999/)です。チュートリアルのプロジェクトにはPhoton SDKとApp IDが含まれていないため、公開されたままでは接続できません。どちらも、ご自身のアカウントでPhotonから入手します。プレイするには、プロジェクトをフォークし、[セットアップ](#セットアップ)の手順で両方を追加してください。その後、床をクリックすると移動できます。

:::

[Photon](https://www.photonengine.com/)は多くのゲームで使われているホスト型のマルチプレイヤーサービスです。Realtime JavaScript SDKはHTML5ゲームで動作するので、独自のサーバーを動かさずにPlayCanvasで使用できます。

Photonの無料プランでは、最大20人の同時接続ユーザー(CCU)に対応しています。

## 学習内容

- Photon SDKをPlayCanvasに追加する方法
- Photonを用いたマルチプレイヤー実装

## セットアップ

### PlayCanvasプロジェクト

[チュートリアルプロジェクト](https://playcanvas.com/project/954410/)をフォークします。シーンには、Light、Plane、Camera、そして **Player** という名前の赤いカプセルがあります。

![Tutorial Project](/img/tutorials/multiplayer-photon/1.png)

プロジェクトには、このチュートリアルで完成する2つのスクリプト **photon-loadbalancing-playcanvas.mjs** と **player.mjs** も含まれています。手順に沿って自分で書く場合は、先にフォークからこれらを削除してください。完成したプロジェクトをそのまま動かす場合は、以下の手順でSDKとApp IDを追加してください。

### Photonアカウント

SDKの使用とドキュメンテーションの閲覧にはアカウントの登録が必要です。

[こちら](https://www.photonengine.com/)からPhotonアカウントを作成してください。

#### 新しいアプリを作成

ダッシュボードから**CREATE NEW APP**をクリックします。

![Create New Application](/img/tutorials/multiplayer-photon/2.png)

#### Photonタイプとアプリケーション名を選択

以下を入力してください。

- Photon Type: RealTime
- Name: PlayCanvas-Photon など

![Create Real Time Project](/img/tutorials/multiplayer-photon/3.png)

#### AppIDをコピー

AppIDをメモしておいてください。後日必要になります。

![App Id](/img/tutorials/multiplayer-photon/4.png)

### SDKをダウンロード

ダッシュボードからSDKをダウンロードします。

#### SDKをクリック

![SDK](/img/tutorials/multiplayer-photon/5.png)

#### RealTime JavaScriptを選択

![JavaScript SDK](/img/tutorials/multiplayer-photon/6.png)

#### SDKをダウンロードをクリック

![Download SDK](/img/tutorials/multiplayer-photon/7.png)

#### SDKを解凍

![Unzip SDK](/img/tutorials/multiplayer-photon/8.png)

SDKはZIP形式でダウンロードされます。解凍してください: `photon-javascript-sdk_vX-X-X-X` → `lib` → **`Photon-Javascript_SDK.min.js`**。

### SDKのインポート

ダウンロードしたSDKをPlayCanvasエディターにインポートします。

#### エディタにSDKをアップロード

![Upload SDK](/img/tutorials/multiplayer-photon/9.jpg)

SDKをエディタのアセットにドラッグ&ドロップしてください。

#### Loading Typeを「Asset」から「Before Engine」に変更

![Change Loading Type](/img/tutorials/multiplayer-photon/10.png)

## マルチプレイヤー実装

マルチプレイヤー実装では、以下の機能を実行します。

1. リアルタイム通信と負荷分散のためにPhotonクラスを使用
2. Photonマスターサーバに接続
3. ルームの作成または参加
4. 他のプレイヤーの動作と移動の同期

[APIリファレンス](https://doc-api.photonengine.com/en/javascript/current/Photon.LoadBalancing.LoadBalancingClient.html)と[用語集](https://doc.photonengine.com/ja-jp/quantum/v1/reference/glossary)は、Photonのサイトで利用可能です。

### PlayCanvasでPhotonを使用

#### PlayCanvasからPhotonをインスタンス化するクラスを生成

Photonを初期化するために、**photon-loadbalancing-playcanvas.mjs**（Classicスクリプトの場合は **photon-loadbalancing-playcanvas.js**）というスクリプトアセットを作成します。

<Tabs defaultValue="esm" groupId='script-code'>
<TabItem value="esm" label="ESM">

```javascript
import { Script } from 'playcanvas';

/** @enum {string} */
const Region = {
    'Select Region': 'default',
    'Asia, Singapore': 'asia',
    'Australia, Melbourne': 'au',
    'Canada, East Montreal': 'cae',
    'Chinese Mainland (See Instructions) Shanghai': 'cn',
    'Europe, Amsterdam': 'eu',
    'India, Chennai': 'in',
    'Japan, Tokyo': 'jp',
    'Russia Moscow': 'ru',
    'Russia, East Khabarovsk': 'rue',
    'South Africa Johannesburg': 'za',
    'South America, Sao Paulo': 'sa',
    'South Korea, Seoul': 'kr',
    'Turkey Istanbul': 'tr',
    'USA, East Washington': 'us',
    'USA, West San José': 'usw'
};

export class PhotonLoadBalancingPlayCanvas extends Script {
    static scriptName = 'photonLoadBalancingPlayCanvas';

    /**
     * The App ID of your Photon application.
     *
     * @attribute
     * @title App Id
     * @type {string}
     */
    appId = '';

    /**
     * Clients can only play with clients that use the same version.
     *
     * @attribute
     * @title App Version
     * @type {string}
     */
    appVersion = '1.0';

    /**
     * Connect with secure WebSockets.
     *
     * @attribute
     * @title Wss
     * @type {boolean}
     */
    wss = true;

    /**
     * Photon Cloud has servers in several regions, distributed across multiple hosting centers over the world. You can choose optimized region for you.
     *
     * @attribute
     * @title Region
     * @type {Region}
     */
    region = Region['Japan, Tokyo'];

    initialize() {
        // The Photon SDK must be in the project, loaded before the engine
        if (!window.Photon) {
            console.error('Photon is not defined. Add the Photon Realtime JavaScript SDK to the project: https://developer.playcanvas.com/tutorials/real-time-multiplayer-photon/');
            return;
        }

        // Photon Settings
        this.loadBalancingClient = new Photon.LoadBalancing.LoadBalancingClient(this.wss ? 1 : 0, this.appId, this.appVersion);
    }
}
```

</TabItem>
<TabItem value="classic" label="Classic">

```javascript
// photon-loadbalancing-playcanvas.js
const PhotonLoadBalancingPlayCanvas = pc.createScript("photonLoadBalancingPlayCanvas");
PhotonLoadBalancingPlayCanvas.attributes.add("appId", { type: "string" });
PhotonLoadBalancingPlayCanvas.attributes.add("appVersion", { type: "string", default: "1.0" });
PhotonLoadBalancingPlayCanvas.attributes.add("wss", { type: "boolean", default: true });
PhotonLoadBalancingPlayCanvas.attributes.add("region", {
    type: "string", default: "jp",
    description: "Photon Cloud has servers in several regions, distributed across multiple hosting centers over the world.You can choose optimized region for you.",
    enum: [
        { "Select Region": "default" },
        { "Asia, Singapore": "asia" },
        { "Australia, Melbourne": "au" },
        { "Canada, East Montreal": "cae" },
        { "Chinese Mainland (See Instructions) Shanghai": "cn" },
        { "Europe, Amsterdam": "eu" },
        { "India, Chennai": "in" },
        { "Japan, Tokyo": "jp" },
        { "Russia Moscow": "ru" },
        { "Russia, East Khabarovsk": "rue" },
        { "South Africa Johannesburg": "za" },
        { "South America, Sao Paulo": "sa" },
        { "South Korea, Seoul": "kr" },
        { "Turkey Istanbul": "tr" },
        { "USA, East Washington": "us" },
        { "USA, West San José": "usw" },
    ],
});

PhotonLoadBalancingPlayCanvas.prototype.initialize = function () {

    // Photon Settings
    this.loadBalancingClient = new Photon.LoadBalancing.LoadBalancingClient(this.wss ? 1 : 0, this.appId, this.appVersion);

    // pc.Application
    this.loadBalancingClient.app = this.app;
};
```

</TabItem>
</Tabs>

- **Photon.LoadBalancing.LoadBalancingClient**  このクラスには、リアルタイム通信のためのPhoton SDKの多くの機能が含まれています。
- **window.Photon** SDKはグローバルな `Photon` オブジェクトを定義します。ESMスクリプトでは、SDKがない場合、エラーを投げる代わりにエラーをログに出力して処理を止めます。

#### Root entityのスクリプトを設定する

エディタで **photon-loadbalancing-playcanvas** スクリプトをRootエンティティに添付します。

![Root Entity - Inspector](/img/tutorials/multiplayer-photon/11.png)

#### スクリプト属性にAppIdを貼り付ける

スクリプト属性にAppIdを入力してください。

![Script Attributes](/img/tutorials/multiplayer-photon/12.png)

```javascript
this.loadBalancingClient = new Photon.LoadBalancing.LoadBalancingClient( this.wss ? 1 : 0, this.appId, this.appVersion );
```

- **wss** WebSocketを介した安全な接続。
- **appId** アプリケーション識別子の値。
- **appVersion** バージョニングに使用されます。異なるバージョンは互いに接続できません。

### マスターサーバに接続する

#### `connectToRegionMaster` を使用してマスターサーバに接続する

<Tabs defaultValue="esm" groupId='script-code'>
<TabItem value="esm" label="ESM">

```javascript
initialize() {
    // The Photon SDK must be in the project, loaded before the engine
    if (!window.Photon) {
        console.error('Photon is not defined. Add the Photon Realtime JavaScript SDK to the project: https://developer.playcanvas.com/tutorials/real-time-multiplayer-photon/');
        return;
    }

    // Photon Settings
    this.loadBalancingClient = new Photon.LoadBalancing.LoadBalancingClient(this.wss ? 1 : 0, this.appId, this.appVersion);

    // Connect to the master server
    if (!this.loadBalancingClient.isInLobby()) {
        this.loadBalancingClient.connectToRegionMaster(this.region);
    }
}
```

</TabItem>
<TabItem value="classic" label="Classic">

```javascript
PhotonLoadBalancingPlayCanvas.prototype.initialize = function () {

    // Photon Settings
    this.loadBalancingClient = new Photon.LoadBalancing.LoadBalancingClient(this.wss ? 1 : 0, this.appId, this.appVersion);

    // pc.Application
    this.loadBalancingClient.app = this.app;

    // Connect to the master server
    if (!this.loadBalancingClient.isInLobby()) {
        this.loadBalancingClient.connectToRegionMaster(this.region);
    }
};
```

</TabItem>
</Tabs>

- **connectToRegionMaster** 指定されたリージョンのマスターサーバに接続します。
- **this.region** リージョンを設定するために使用されます。

connectToRegionMaster を実行してロビーに接続できた場合はJoinedLobbyがログに表示されます。

![Console Log](/img/tutorials/multiplayer-photon/13.png)

### ルームの作成または参加

ロビーへの接続が行われた場合は、**onRoomList** 関数が呼び出されます。

**joinRandomOrCreateRoom** は、ルームが存在すればランダムなルームに参加し、存在しなければ新しいルームを作成します。

<Tabs defaultValue="esm" groupId='script-code'>
<TabItem value="esm" label="ESM">

```javascript
initialize() {
    // The Photon SDK must be in the project, loaded before the engine
    if (!window.Photon) {
        console.error('Photon is not defined. Add the Photon Realtime JavaScript SDK to the project: https://developer.playcanvas.com/tutorials/real-time-multiplayer-photon/');
        return;
    }

    // Photon Settings
    this.loadBalancingClient = new Photon.LoadBalancing.LoadBalancingClient(this.wss ? 1 : 0, this.appId, this.appVersion);

    // Connect to the master server
    if (!this.loadBalancingClient.isInLobby()) {
        this.loadBalancingClient.connectToRegionMaster(this.region);
    }

    // Added
    // Photon calls these methods on the client. Forward them to this script.
    this.loadBalancingClient.onRoomList = rooms => this.onRoomList(rooms);
    this.loadBalancingClient.onJoinRoom = createdByMe => this.onJoinRoom(createdByMe);
}

onRoomList(rooms) {
    this.loadBalancingClient.joinRandomOrCreateRoom();
}

onJoinRoom(createdByMe) {
    console.log('Joined the room.');
}
```

</TabItem>
<TabItem value="classic" label="Classic">

```javascript
PhotonLoadBalancingPlayCanvas.prototype.initialize = function () {

    // Photon Settings
    this.loadBalancingClient = new Photon.LoadBalancing.LoadBalancingClient(this.wss ? 1 : 0, this.appId, this.appVersion);

    // pc.Application
    this.loadBalancingClient.app = this.app;

    // Connect to the master server
    if (!this.loadBalancingClient.isInLobby()) {
        this.loadBalancingClient.connectToRegionMaster(this.region);
    }

    // Added
    this.loadBalancingClient.onRoomList = this.onRoomList;
    this.loadBalancingClient.onJoinRoom = this.onJoinRoom;
};

PhotonLoadBalancingPlayCanvas.prototype.onRoomList = function () {
    this.joinRandomOrCreateRoom();
};

PhotonLoadBalancingPlayCanvas.prototype.onJoinRoom = function (createdByMe) {
    console.log("Joined the room.");
};
```

</TabItem>
</Tabs>

- **onRoomList(rooms)** ロビー内のルームのリスト
- **joinRandomOrCreateRoom(options, createRoomName, createOptions)** ランダムにルームに参加します。ルームが存在しない場合は新しいルームが作成されます。
- **onJoinRoom** ルームに参加したときに呼び出されます。

Photonはこれらのハンドラーをクライアントのメソッドとして呼び出します。ESMスクリプトでは、各アロー関数が呼び出しをスクリプト自身のメソッドに転送します。そのメソッド内では `this` はスクリプトで、クライアントは `this.loadBalancingClient` です。Classicスクリプトは代わりに自身のメソッドをクライアントに直接割り当てるので、メソッド内の `this` はクライアントになります。Classicスクリプトが `loadBalancingClient.app` を設定しているのはそのためで、ハンドラーから `this.app` でアプリケーションにアクセスできるようにしています。

### 参加と退出

プレイヤーが部屋に参加すると、他のプレイヤーと同期されます。 **onActorJoin** と **onActorLeave** を使用します。

<Tabs defaultValue="esm" groupId='script-code'>
<TabItem value="esm" label="ESM">

```javascript
import { Script, Entity } from 'playcanvas';

// ...

initialize() {
    // The Photon SDK must be in the project, loaded before the engine
    if (!window.Photon) {
        console.error('Photon is not defined. Add the Photon Realtime JavaScript SDK to the project: https://developer.playcanvas.com/tutorials/real-time-multiplayer-photon/');
        return;
    }

    // Photon Settings
    this.loadBalancingClient = new Photon.LoadBalancing.LoadBalancingClient(this.wss ? 1 : 0, this.appId, this.appVersion);

    // Connect to the master server
    if (!this.loadBalancingClient.isInLobby()) {
        this.loadBalancingClient.connectToRegionMaster(this.region);
    }

    // Photon calls these methods on the client. Forward them to this script.
    this.loadBalancingClient.onRoomList = rooms => this.onRoomList(rooms);
    this.loadBalancingClient.onJoinRoom = createdByMe => this.onJoinRoom(createdByMe);

    // Added
    this.loadBalancingClient.onActorJoin = actor => this.onActorJoin(actor);
    this.loadBalancingClient.onActorLeave = actor => this.onActorLeave(actor);
}

onRoomList(rooms) {
    this.loadBalancingClient.joinRandomOrCreateRoom();
}

onJoinRoom(createdByMe) {
    console.log('Joined the room.');
}

onActorJoin(actor) {
    if (actor.isLocal) return;

    // Name the entity after the actor number, so we can find it again
    const otherPlayer = new Entity(String(actor.actorNr));
    otherPlayer.addComponent('render', { type: 'capsule' });
    otherPlayer.setLocalPosition(0, 1, 0);
    this.app.root.children[0].addChild(otherPlayer);
}

onActorLeave(actor) {
    const otherPlayer = this.app.root.findByName(String(actor.actorNr));
    if (actor.isLocal || !otherPlayer) return;
    otherPlayer.destroy();
}
```

</TabItem>
<TabItem value="classic" label="Classic">

```javascript
PhotonLoadBalancingPlayCanvas.prototype.initialize = function () {

    // Photon Settings
    this.loadBalancingClient = new Photon.LoadBalancing.LoadBalancingClient(this.wss ? 1 : 0, this.appId, this.appVersion);

    // pc.Application
    this.loadBalancingClient.app = this.app;

    // Connect to the master server
    if (!this.loadBalancingClient.isInLobby()) {
        this.loadBalancingClient.connectToRegionMaster(this.region);
    }

    this.loadBalancingClient.onRoomList = this.onRoomList;
    this.loadBalancingClient.onJoinRoom = this.onJoinRoom;

    // Added
    this.loadBalancingClient.onActorJoin = this.onActorJoin;
    this.loadBalancingClient.onActorLeave = this.onActorLeave;
};

PhotonLoadBalancingPlayCanvas.prototype.onRoomList = function () {
    this.joinRandomOrCreateRoom();
};

PhotonLoadBalancingPlayCanvas.prototype.onJoinRoom = function (createdByMe) {
    console.log("Joined the room.");
};

PhotonLoadBalancingPlayCanvas.prototype.onActorJoin = function (actor) {
    const { actorNr } = actor;
    if (actor.isLocal) return;
    const otherPlayer = new pc.Entity();
    otherPlayer.addComponent("render", { type: "capsule" });
    otherPlayer.setLocalPosition(0, 1, 0);
    otherPlayer.name = actorNr;
    this.app.root.children[0].addChild(otherPlayer);
};

PhotonLoadBalancingPlayCanvas.prototype.onActorLeave = function (actor) {
    const { actorNr } = actor;
    const otherPlayer = this.app.root.children[0].findByName(actorNr);
    if (actor.isLocal || !otherPlayer) return;
    otherPlayer.destroy();
};
```

</TabItem>
</Tabs>

![Actor](/img/tutorials/multiplayer-photon/14.png)

- **actor** は `name`, `actorNr` , `isLocal` , `userId` を含みます。
- **onActorJoin** 新しいユーザーが接続すると、参加したアクターを取得できます。
- **onActorLeave** ユーザーが切断されると、切断されたアクターを取得できます。

成功した場合、プレイヤーが参加したときにエンティティが追加されます。

![Console log - Actors ](/img/tutorials/multiplayer-photon/15.png)

#### プレイヤーの移動

キャラクターの移動用に **player.mjs**（Classicスクリプトの場合は **player.js**）という新しいスクリプトを作成し、Playerエンティティに添付します。

<Tabs defaultValue="esm" groupId='script-code'>
<TabItem value="esm" label="ESM">

```javascript
import { Script, Vec3, KEY_LEFT, KEY_RIGHT, KEY_UP, KEY_DOWN } from 'playcanvas';

export class Player extends Script {
    static scriptName = 'player';

    update(dt) {
        const pos = new Vec3(0, 0, 0);
        if (this.app.keyboard.isPressed(KEY_LEFT)) {
            pos.x = -dt;
        }
        if (this.app.keyboard.isPressed(KEY_RIGHT)) {
            pos.x = dt;
        }
        if (this.app.keyboard.isPressed(KEY_UP)) {
            pos.z = -dt;
        }
        if (this.app.keyboard.isPressed(KEY_DOWN)) {
            pos.z = dt;
        }

        if (!pos.equals(Vec3.ZERO)) {
            this.entity.translate(pos);
        }
    }
}
```

</TabItem>
<TabItem value="classic" label="Classic">

```javascript
const Player = pc.createScript("player");

Player.prototype.update = function (dt) {
    const pos = new pc.Vec3(0, 0, 0);
    if (this.app.keyboard.isPressed(pc.KEY_LEFT)) {
        pos.x = -dt;
    }
    if (this.app.keyboard.isPressed(pc.KEY_RIGHT)) {
        pos.x = dt;
    }
    if (this.app.keyboard.isPressed(pc.KEY_UP)) {
        pos.z = -dt;
    }
    if (this.app.keyboard.isPressed(pc.KEY_DOWN)) {
        pos.z = dt;
    }
    if (!pos.equals(new pc.Vec3(0, 0, 0))) {
        this.entity.translate(pos);
    }
};
```

</TabItem>
</Tabs>

- **this.app.keyboard.isPressed:** キーボードが押されているかどうかを確認します。

### 他のプレイヤーを同期する

他のプレーヤーの位置を同期するために、**raiseEvent** と **onEvent** を使用します。

#### **raiseEvent** を使用した位置の同期

<Tabs defaultValue="esm" groupId='script-code'>
<TabItem value="esm" label="ESM">

```javascript
import { Script, Entity } from 'playcanvas';

/** @enum {string} */
const Region = {
    'Select Region': 'default',
    'Asia, Singapore': 'asia',
    'Australia, Melbourne': 'au',
    'Canada, East Montreal': 'cae',
    'Chinese Mainland (See Instructions) Shanghai': 'cn',
    'Europe, Amsterdam': 'eu',
    'India, Chennai': 'in',
    'Japan, Tokyo': 'jp',
    'Russia Moscow': 'ru',
    'Russia, East Khabarovsk': 'rue',
    'South Africa Johannesburg': 'za',
    'South America, Sao Paulo': 'sa',
    'South Korea, Seoul': 'kr',
    'Turkey Istanbul': 'tr',
    'USA, East Washington': 'us',
    'USA, West San José': 'usw'
};

export class PhotonLoadBalancingPlayCanvas extends Script {
    static scriptName = 'photonLoadBalancingPlayCanvas';

    /**
     * The App ID of your Photon application.
     *
     * @attribute
     * @title App Id
     * @type {string}
     */
    appId = '';

    /**
     * Clients can only play with clients that use the same version.
     *
     * @attribute
     * @title App Version
     * @type {string}
     */
    appVersion = '1.0';

    /**
     * Connect with secure WebSockets.
     *
     * @attribute
     * @title Wss
     * @type {boolean}
     */
    wss = true;

    /**
     * Photon Cloud has servers in several regions, distributed across multiple hosting centers over the world. You can choose optimized region for you.
     *
     * @attribute
     * @title Region
     * @type {Region}
     */
    region = Region['Japan, Tokyo'];

    initialize() {
        // The Photon SDK must be in the project, loaded before the engine
        if (!window.Photon) {
            console.error('Photon is not defined. Add the Photon Realtime JavaScript SDK to the project: https://developer.playcanvas.com/tutorials/real-time-multiplayer-photon/');
            return;
        }

        // Photon Settings
        this.loadBalancingClient = new Photon.LoadBalancing.LoadBalancingClient(this.wss ? 1 : 0, this.appId, this.appVersion);

        // Connect to the master server
        if (!this.loadBalancingClient.isInLobby()) {
            this.loadBalancingClient.connectToRegionMaster(this.region);
        }

        // Photon calls these methods on the client. Forward them to this script.
        this.loadBalancingClient.onRoomList = rooms => this.onRoomList(rooms);
        this.loadBalancingClient.onJoinRoom = createdByMe => this.onJoinRoom(createdByMe);
        this.loadBalancingClient.onActorJoin = actor => this.onActorJoin(actor);
        this.loadBalancingClient.onActorLeave = actor => this.onActorLeave(actor);
        this.loadBalancingClient.onEvent = (code, content, actorNr) => this.onEvent(code, content, actorNr);

        this.app.on('loadbalancing:sendPlayerPosition', this.sendPlayerPosition, this);
    }

    onRoomList(rooms) {
        this.loadBalancingClient.joinRandomOrCreateRoom();
    }

    onJoinRoom(createdByMe) {
        // Create an entity for each player who was already in the room
        this.loadBalancingClient.myRoomActorsArray().forEach((actor) => {
            if (actor.isLocal) return;
            this.createOtherPlayerEntity(actor);
        });
    }

    onActorJoin(actor) {
        if (actor.isLocal) return;
        this.createOtherPlayerEntity(actor);

        // Tell the new player where our player is
        const { x, y, z } = this.app.root.findByName('Player').getLocalPosition();
        this.sendPlayerPosition({ x, y, z });
    }

    onActorLeave(actor) {
        const otherPlayer = this.app.root.findByName(String(actor.actorNr));
        if (actor.isLocal || !otherPlayer) return;
        otherPlayer.destroy();
    }

    createOtherPlayerEntity(actor) {
        // Name the entity after the actor number, so we can find it again
        const entity = new Entity(String(actor.actorNr));
        entity.addComponent('render', { type: 'capsule' });
        entity.setLocalPosition(0, 1, 0);
        this.app.root.children[0].addChild(entity);
    }

    sendPlayerPosition(position) {
        if (!this.loadBalancingClient?.isJoinedToRoom()) return;
        this.loadBalancingClient.raiseEvent(1, { position });
    }

    onEvent(code, content, actorNr) {
        switch (code) {
            case 1: {
                const otherPlayer = this.app.root.findByName(String(actorNr));
                if (otherPlayer) {
                    const { x, y, z } = content.position;
                    otherPlayer.setLocalPosition(x, y, z);
                }
                break;
            }
        }
    }
}
```

</TabItem>
<TabItem value="classic" label="Classic">

```javascript
const PhotonLoadBalancingPlayCanvas = pc.createScript("photonLoadBalancingPlayCanvas");
PhotonLoadBalancingPlayCanvas.attributes.add("appId", { type: "string" });
PhotonLoadBalancingPlayCanvas.attributes.add("appVersion", {
    type: "string",
    default: "1.0",
});
PhotonLoadBalancingPlayCanvas.attributes.add("wss", {
    type: "boolean",
    default: true,
});
PhotonLoadBalancingPlayCanvas.attributes.add("region", {
    type: "string",
    default: "jp",
    description:
        "Photon Cloud has servers in several regions, distributed across multiple hosting centers over the world.You can choose optimized region for you.",
    enum: [
        { "Select Region": "default" },
        { "Asia, Singapore": "asia" },
        { "Australia, Melbourne": "au" },
        { "Canada, East Montreal": "cae" },
        { "Chinese Mainland (See Instructions) Shanghai": "cn" },
        { "Europe, Amsterdam": "eu" },
        { "India, Chennai": "in" },
        { "Japan, Tokyo": "jp" },
        { "Russia Moscow": "ru" },
        { "Russia, East Khabarovsk": "rue" },
        { "South Africa Johannesburg": "za" },
        { "South America, Sao Paulo": "sa" },
        { "South Korea, Seoul": "kr" },
        { "Turkey Istanbul": "tr" },
        { "USA, East Washington": "us" },
        { "USA, West San José": "usw" },
    ],
});

PhotonLoadBalancingPlayCanvas.prototype.initialize = function () {

    // Photon Settings
    this.loadBalancingClient = new Photon.LoadBalancing.LoadBalancingClient(this.wss ? 1 : 0, this.appId, this.appVersion);

    // pc.Application
    this.loadBalancingClient.app = this.app;

    // Connect to the master server
    if (!this.loadBalancingClient.isInLobby()) {
        this.loadBalancingClient.connectToRegionMaster(this.region);
    }
    this.loadBalancingClient.onRoomList = this.onRoomList;
    this.loadBalancingClient.onJoinRoom = this.onJoinRoom;
    this.loadBalancingClient.onActorJoin = this.onActorJoin;
    this.loadBalancingClient.onActorLeave = this.onActorLeave;

    // Added
    this.loadBalancingClient.onEvent = this.onEvent;
    this.app.on("createOtherPlayerEntity", this.createOtherPlayerEntity, this);
    this.app.on("loadbalancing:sendPlayerPosition", this.sendPlayerPosition, this);
};

PhotonLoadBalancingPlayCanvas.prototype.onRoomList = function () {
    this.joinRandomOrCreateRoom();
};

PhotonLoadBalancingPlayCanvas.prototype.onJoinRoom = function (createdByMe) {
    this.myRoomActorsArray().forEach((actor) => {
        if (actor.isLocal) return;
        this.app.fire("createOtherPlayerEntity", actor);
    });
};

PhotonLoadBalancingPlayCanvas.prototype.onActorJoin = function (actor) {
    if (actor.isLocal) return;
    this.app.fire("createOtherPlayerEntity", actor);
    const { x, y, z } = this.app.root.findByName("Player").getLocalPosition();
    this.app.fire("loadbalancing:sendPlayerPosition", { x, y, z });
};

PhotonLoadBalancingPlayCanvas.prototype.onActorLeave = function (actor) {
    const { actorNr } = actor;
    const otherPlayer = this.app.root.findByName(actorNr);
    if (actor.isLocal || !otherPlayer) return;
    otherPlayer.destroy();
};

PhotonLoadBalancingPlayCanvas.prototype.createOtherPlayerEntity = function (actor) {
    const { actorNr } = actor;
    const entity = new pc.Entity();
    entity.addComponent("render", { type: "capsule" });
    entity.setLocalPosition(0, 1, 0);
    entity.name = actorNr;
    this.app.root.children[0].addChild(entity);
};

PhotonLoadBalancingPlayCanvas.prototype.sendPlayerPosition = function (position) {
    this.loadBalancingClient.raiseEvent(1, { position });
};

PhotonLoadBalancingPlayCanvas.prototype.onEvent = function (code, content, actorNr) {
    switch (code) {
        case 1: {
            const otherPlayer = this.app.root.findByName(actorNr);
            if (otherPlayer) {
                const { x, y, z } = content.position;
                otherPlayer.setLocalPosition(x, y, z);
            }
            break;
        }
        default:
    }
};
```

</TabItem>
</Tabs>

- **raiseEvent(eventCode,data, options)**  `eventCode` と `data` を送信します。
- **onEvent(code, content, actorNr)** データを受信します。`actorNr` と `eventCode` を含みます。
- **isJoinedToRoom()** ESMスクリプトは、ルームに参加してからイベントを送信します。

#### プレイヤーが移動した際にイベントを発火するよう変更

<Tabs defaultValue="esm" groupId='script-code'>
<TabItem value="esm" label="ESM">

```javascript
import { Script, Vec3, KEY_LEFT, KEY_RIGHT, KEY_UP, KEY_DOWN } from 'playcanvas';

export class Player extends Script {
    static scriptName = 'player';

    update(dt) {
        const pos = new Vec3(0, 0, 0);
        if (this.app.keyboard.isPressed(KEY_LEFT)) {
            pos.x = -dt;
        }
        if (this.app.keyboard.isPressed(KEY_RIGHT)) {
            pos.x = dt;
        }
        if (this.app.keyboard.isPressed(KEY_UP)) {
            pos.z = -dt;
        }
        if (this.app.keyboard.isPressed(KEY_DOWN)) {
            pos.z = dt;
        }

        if (!pos.equals(Vec3.ZERO)) {
            this.entity.translate(pos);

            // Added
            // Send the new position to the other players
            const { x, y, z } = this.entity.getPosition();
            this.app.fire('loadbalancing:sendPlayerPosition', { x, y, z });
        }
    }
}
```

</TabItem>
<TabItem value="classic" label="Classic">

```javascript
const Player = pc.createScript("player");

Player.prototype.update = function (dt) {
    const pos = new pc.Vec3(0, 0, 0);
    if (this.app.keyboard.isPressed(pc.KEY_LEFT)) {
        pos.x = -dt;
    }
    if (this.app.keyboard.isPressed(pc.KEY_RIGHT)) {
        pos.x = dt;
    }
    if (this.app.keyboard.isPressed(pc.KEY_UP)) {
        pos.z = -dt;
    }
    if (this.app.keyboard.isPressed(pc.KEY_DOWN)) {
        pos.z = dt;
    }
    if (!pos.equals(new pc.Vec3(0, 0, 0))) {
        this.entity.translate(pos);

        // Added
        const { x, y, z } = this.entity.getPosition();
        this.app.fire("loadbalancing:sendPlayerPosition", { x, y, z });
    }
};
```

</TabItem>
</Tabs>

- **this.app.fire** は、スクリプト間の [通信](/user-manual/scripting/events/)に使用されます。

### 完成

Photonを使用してマルチプレイヤーをプレイできるようになりました！

<StepVideo src="/video/tutorials/multiplayer-photon/16.mp4" poster="/img/tutorials/multiplayer-photon/16.webp" label="Project" width={640} height={360} />

Photonを使ってルームを作成し、プレイヤーの位置を同期できます。

このプロジェクトはプレイヤー間のシンプルなリアルタイム通信でしたが、マッチメイキングを含むプロジェクトも作成できます。ルームの作成やリスト表示を含む完全なプロジェクトについては、[完全なプロジェクト](https://playcanvas.com/project/926999/)を参照してください。こちらはClassicスクリプトを使用しています。
