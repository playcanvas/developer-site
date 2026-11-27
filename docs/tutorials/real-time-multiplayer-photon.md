---
title: Real-time Multiplayer with Photon
description: Integrate Photon networking for authoritative movement, matchmaking, and room joins from a PlayCanvas HTML5 client.
tags: [multiplayer, networking]
kind: tutorial
topic: Multiplayer
thumb: /img/tutorials/real-time-multiplayer-photon/thumbnail.webp
---

import StepVideo from '@site/src/components/StepVideo';

<div className="iframe-container">
    <iframe src="https://playcanv.as/e/p/dvJYXs1Y/" title="Real-time Multiplayer with Photon - including matchmaking" allow="camera; microphone; xr-spatial-tracking; fullscreen" allowfullscreen></iframe>
</div>

:::info

This demo is the [complete project including matchmaking](https://playcanvas.com/project/926999/). It can't connect as published, because the tutorial projects don't include the Photon SDK or an App ID: you get both from Photon with your own account. Fork a project and add them, as described in [Setup](#setup), to play it. Then click on the floor to move.

:::

[Photon](https://www.photonengine.com/) is a hosted multiplayer service used in many games. Its Realtime JavaScript SDK works in HTML5 games, so you can use it with PlayCanvas without running a server of your own.

Photon's free plan supports up to 20 concurrent users (CCU).

## You will learn

- How to add Photon SDK to PlayCanvas
- Multiplayer implementation with Photon

## Setup

### PlayCanvas Project

Fork the [tutorial project](https://playcanvas.com/project/954410/). Its scene has a Light, a Plane, a Camera and a red capsule named **Player**:

![Tutorial Project](/img/tutorials/multiplayer-photon/1.webp)

The project also contains the two finished scripts from this tutorial, **photon-loadbalancing-playcanvas.mjs** and **player.mjs**. To write them yourself as you follow the steps, delete them from your fork first. To run the finished project instead, add the SDK and your App ID as described below.

### Photon account

You need a Photon account to create an app and download the SDK.

Create your Photon account [here](https://www.photonengine.com/) - (Photon Engine).

#### Create a new app

On your dashboard, click **Create New App**.

![Create New App](/img/tutorials/multiplayer-photon/2.webp)

#### Select the application type, SDK and name

Enter the following, then click **CREATE**:

- Application Type: Multiplayer Game
- Photon SDK: Realtime
- Application Name: PlayCanvas-Photon, or a name of your own

![Create a New Application](/img/tutorials/multiplayer-photon/3.webp)

#### Copy the App ID

The new app appears in your list of apps. Click its App ID to show all of it, then copy it. You'll need it later.

![App ID](/img/tutorials/multiplayer-photon/4.webp)

### Download SDK

Photon's Realtime JavaScript client comes in the **Voice JavaScript** SDK, which also contains the Voice and Chat clients. You need to be signed in to download it.

#### Click SDKS on the dashboard

![SDKs](/img/tutorials/multiplayer-photon/5.webp)

#### Select Voice JavaScript

Click the **JavaScript** filter, then the **Voice JavaScript** card.

![JavaScript SDK](/img/tutorials/multiplayer-photon/6.webp)

#### Click DOWNLOAD

![Download SDK](/img/tutorials/multiplayer-photon/7.webp)

#### Unzip the SDK

The SDK downloads as a ZIP file. Unzip it: `photon-voice-javascript-sdk_vX-X-X-X` → `lib` → **`photon.min.js`**. This file is the Realtime client. The other files in `lib` add Voice, which this tutorial doesn't use.

### Importing SDK

Import the SDK you have just downloaded into the PlayCanvas Editor.

#### Upload the SDK in the Editor

![Upload SDK](/img/tutorials/multiplayer-photon/9.webp)

Drag and drop **photon.min.js** onto the Assets panel in the Editor.

#### Keep Loading Type as "Asset"

![Loading Type](/img/tutorials/multiplayer-photon/10.webp)

Leave **Loading Type** set to **Asset** and **Preload** ticked, as they are after the upload. The engine then loads the SDK before any script's `initialize` runs, and the SDK defines the global `Photon` object. Don't choose **Before Engine**: in a project that uses ESM scripts, the Launcher loads Before Engine scripts as JavaScript modules, so `Photon` isn't global and the scripts can't find it.

## Multiplayer implementation

The multiplayer implementation will do the following:

1. Use Photon class for real-time communication and Load Balancing
2. Connect to Photon master server
3. Create or Join a room
4. Synchronize other players' actions and movement

The [API reference](https://doc-api.photonengine.com/en/javascript/current/Photon.LoadBalancing.LoadBalancingClient.html) and [glossary](https://doc.photonengine.com/ja-jp/quantum/v1/reference/glossary) are available on Photon's site.

### Using Photon with PlayCanvas

#### Instantiate classes from PlayCanvas to use Photon

Create a script asset named **photon-loadbalancing-playcanvas.mjs** (**photon-loadbalancing-playcanvas.js** for a Classic script) to initialize Photon.

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

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
        // The Photon SDK must be in the project, preloaded as an asset
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
<TabItem value="classic" label="Classic" title='./photon-loadbalancing-playcanvas.js'>

```javascript
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

- **Photon.LoadBalancing.LoadBalancingClient**  This class contains many of the features of the Photon SDK for real-time communication.
- **window.Photon** The SDK defines the global `Photon` object. In the ESM script, if the SDK is missing, the script logs an error and stops instead of throwing one.

#### Set Script for Root entity

Attach the **photon-loadbalancing-playcanvas** script to the Root entity in the Editor.

![Root Entity - Inspector](/img/tutorials/multiplayer-photon/11.webp)

#### Paste AppId into the script attribute

Enter AppId as a script attribute.

![Script Attributes](/img/tutorials/multiplayer-photon/12.webp)

```javascript
this.loadBalancingClient = new Photon.LoadBalancing.LoadBalancingClient( this.wss ? 1 : 0, this.appId, this.appVersion );
```

- **wss** Secure connection via WebSocket.
- **appId** The application identifier value.
- **appVersion** Used for versioning. Different versions cannot be connected to each other.

### Connect to the Photon master server

#### Connect to the master server using `connectToRegionMaster`

<Tabs defaultValue="esm" groupId='script-code'>
<TabItem value="esm" label="ESM">

```javascript
initialize() {
    // The Photon SDK must be in the project, preloaded as an asset
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

- **connectToRegionMaster** Connects to the master server in the specified region.
- **this.region** Used to configure the region.

If you successfully connect to the lobby by running connectToRegionMaster, JoinedLobby will be displayed in the log.

![Console Log](/img/tutorials/multiplayer-photon/13.webp)

### Create or Join a room

**onRoomList** function is called when a connection is made to the lobby.

**joinRandomOrCreateRoom** joins a random room if one exists, or creates a new room if not.

<Tabs defaultValue="esm" groupId='script-code'>
<TabItem value="esm" label="ESM">

```javascript
initialize() {
    // The Photon SDK must be in the project, preloaded as an asset
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

- **onRoomList(rooms)** List of rooms in the lobby.
- **joinRandomOrCreateRoom(options, createRoomName, createOptions)** Join to a random room. If the room does not exist, a new room will be created.
- **onJoinRoom** When you join a room, this is called.

Photon calls these handlers as methods of the client. In the ESM script, each arrow function forwards the call to the script's own method, where `this` is the script and the client is `this.loadBalancingClient`. The Classic script assigns its methods to the client instead, so inside them `this` is the client. That's why the Classic script sets `loadBalancingClient.app`: it lets the handlers reach the application as `this.app`.

### Join and Leave

When a player joins a room, it is synchronized with other players.
Use **onActorJoin** and **onActorLeave**.

<Tabs defaultValue="esm" groupId='script-code'>
<TabItem value="esm" label="ESM">

```javascript
import { Script, Entity } from 'playcanvas';

// ...

initialize() {
    // The Photon SDK must be in the project, preloaded as an asset
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

![Actor](/img/tutorials/multiplayer-photon/14.webp)

- **actor** contains `name`, `actorNr`, `isLocal`, and `userId`.
- **onActorJoin** when a new user connects, you can get the joined actor.
- **onActorLeave** when a user is disconnected, you can get the disconnected actor.

If successful, the entity is added when the player joins.

![Console log - Actors ](/img/tutorials/multiplayer-photon/15.webp)

#### Player Movement

Create a new script named **player.mjs** (**player.js** for a Classic script) for character movement, and attach it to the Player entity.

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

- **this.app.keyboard.isPressed:** check if the keyboard is pressed

### Synchronize other players

Use **raiseEvent** and **onEvent** to synchronize the player's location.

#### Position synchronization using **raiseEvent**

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
        // The Photon SDK must be in the project, preloaded as an asset
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

- **raiseEvent(eventCode,data, options)** send `eventCode` and `data`.
- **onEvent(code, content, actorNr)** receive data. Includes `actorNr` and `eventCode`.
- **isJoinedToRoom()** The ESM script only sends events once it has joined a room.

#### Changed to fire events when player moves

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

- **this.app.fire** [communication](/user-manual/scripting/events/) between scripts.

### Done

You can now play multiplayer in Photon!

<StepVideo src="/video/tutorials/multiplayer-photon/16.mp4" poster="/img/tutorials/multiplayer-photon/16.webp" label="Project" width={640} height={360} />

You can create a room using Photon and synchronize the positions of players with each other.

Although this project was only a simple real-time communication between players, you can also create a project that includes matchmaking. For the full project, including room creation and room listings, see the [complete project](https://playcanvas.com/project/926999/). It uses Classic scripts.
