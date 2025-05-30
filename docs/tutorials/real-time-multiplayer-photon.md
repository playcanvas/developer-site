---
title: Real-time Multiplayer with Photon
tags: [multiplayer, networking]
thumb: https://s3-eu-west-1.amazonaws.com/images.playcanvas.com/projects/12/926999/90AE0A-image-75.jpg
---

<div className="iframe-container">
    <iframe src="https://playcanv.as/e/p/dvJYXs1Y/" title="Real-time Multiplayer with Photon - including matchmaking" allow="camera; microphone; xr-spatial-tracking; fullscreen" allowfullscreen></iframe>
</div>

:::info

Click on the floor to move.

:::

The complete project including matchmaking can be found [here][1].

Photon (also known as PUN) is used in many games and has a JavaScript SDK available for HTML5 games.

Photon is for free for projects with up to 20 online players (CCU).

## You will learn

- How to add Photon SDK to PlayCanvas
- Multiplayer implementation with Photon

## Setup

### PlayCanvas Project

We start by forking the [tutorial project here][2].

![Empty Project](/img/tutorials/multiplayer-photon/1.png)

### Photon account

Account registration is required to use the SDK and view documentation.

Create your Photon account [here][4] - (Photon Engine).

#### Create a new app

Click **CREATE NEW APP** from the dashboard

![Create New Application](/img/tutorials/multiplayer-photon/2.png)

#### Select Photon Type and Application name

Enter the following

- Photon Type: RealTime
- Name: PlayCanvas-Photon etc.

![Create Real Time Project](/img/tutorials/multiplayer-photon/3.png)

#### Copy of AppID

Please make a note of this AppId, as you will need it in the future.

![App Id](/img/tutorials/multiplayer-photon/4.png)

### Download SDK

Download the SDK from the dashboard.

#### Click SDK from the dashboard

![SDK](/img/tutorials/multiplayer-photon/5.png)

#### Select RealTime JavaScript

![JavaScript SDK](/img/tutorials/multiplayer-photon/6.png)

#### Click Download SDK

![Download SDK](/img/tutorials/multiplayer-photon/7.png)

#### Unzip the SDK

![Unzip SDK](/img/tutorials/multiplayer-photon/8.png)

The SDK will be downloaded in ZIP format, unzip it: `photon-javascript-sdk_vX-X-X-X` → `lib` → **`Photon-Javascript_SDK.min.js`**.

### Importing SDK

Import the SDK you have just downloaded into the PlayCanvas editor.

#### Upload the SDK on the editor

![Upload SDK](/img/tutorials/multiplayer-photon/9.jpg)

Drag and drop the SDK to the assets in the editor.

#### Change Loading Type "Asset" to "Before Engine"

![Change Loading Type](/img/tutorials/multiplayer-photon/10.png)

## Multiplayer implementation

The multiplayer implementation will do the following:

1. Use Photon class for real-time communication and Load Balancing
2. Connect to Photon master server
3. Create or Join a room
4. Synchronize other players' actions and movement

The [API reference][14] and [glossary][15] are available on Photon's site.

### Using Photon with PlayCanvas

#### Instantiate classes from PlayCanvas to use Photon

Create a script asset named **photon-loadbalancing-playcanvas.js** to the project to initialize Photon.

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

- **Photon.LoadBalancing.LoadBalancingClient**  This class contains many of the features of the Photon SDK for real-time communication.

#### Set Script for Root entity

Create a new script asset **photon-loadbalancing-playcanvas.js** and attach it to the Root entity in the Editor.

![Root Entity - Inspector](/img/tutorials/multiplayer-photon/11.png)

#### Paste AppId into the script attribute

Enter AppId as a script attribute.

![Script Attributes](/img/tutorials/multiplayer-photon/12.png)

```javascript
this.loadBalancingClient = new Photon.LoadBalancing.LoadBalancingClient( this.wss ? 1 : 0, this.appId, this.appVersion );
```

- **wss** Secure connection via WebSocket.
- **appId** The application identifier value.
- **appVersion** Used for versioning. Different versions cannot be connected to each other.

### Connect to the Photon master server

#### Connect to the master server using `connectToRegionMaster`

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

- **connectToRegionMaster** Connects to the master server in the specified region.
- **this.region** Used to configure the region.

If you successfully connect to the lobby by running connectToRegionMaster, JoinedLobby will be displayed in the log.

![Console Log](/img/tutorials/multiplayer-photon/13.png)

### Create or Join a room

**onRoomList** function is called when a connection is made to the lobby.

**JoinRandomOrCreateRoom** to join a room if it exists, or randomly join a room if it does not exist.

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

- **onRoomList(rooms)** List of rooms in the lobby.
- **joinRandomOrCreateRoom(options, createRoomName, createOptions)** Join to a random room. If the room does not exist, a new room will be created.
- **onJoinRoom** When you join a room, this is called.

### Join and Leave

When a player joins a room, it is synchronized with other players.
Use **onActorJoin** and **onActorLeave**.

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

![Actor](/img/tutorials/multiplayer-photon/14.png)

- **actor** contains `name`, `actorNr`, `isLocal`, and `userId`.
- **onActorJoin** when a new user connects, you can get the joined actor.
- **onActorLeave** when a user is disconnected, you can get the disconnected actor.

If successful, the entity is added when the player joins.

![Console log - Actors ](/img/tutorials/multiplayer-photon/15.png)

#### Player Movement

Create a new **player.js** for character movement.

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

- **this.app.keyboard.isPressed:** check if the keyboard is pressed

### Synchronize other players

Use **raiseEvent** and **onEvent** to synchronize the player's location.

#### Position synchronization using **raiseEvent**

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

- **raiseEvent(eventCode,data, options)** send `eventCode` and `data`.
- **onEvent(code, content, actorNr)** receive data. Includes `actorNr` and `eventCode`.

#### Changed to fire events when player moves

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

- **this.app.fire** [communication][22] between scripts.

### Done

You can now play multiplayer in Photon!

![Project](/img/tutorials/multiplayer-photon/16.gif)

You can create a room using Photon and synchronize the positions of players with each other.

Although this project was only a simple real-time communication between players, you can also create a project that includes matchmaking. For the full project, including room creation and room listings, please [click here][1] .

[1]: https://playcanvas.com/project/926999/
[2]: https://playcanvas.com/project/954410/
[4]: https://www.photonengine.com/
[14]: https://doc-api.photonengine.com/en/javascript/current/Photon.LoadBalancing.LoadBalancingClient.html
[15]: https://doc.photonengine.com/ja-jp/quantum/v1/reference/glossary
[22]: /user-manual/scripting/fundamentals/events/
