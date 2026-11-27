---
title: Real-time Multiplayer with Colyseus
description: Wire PlayCanvas to a Colyseus server for room state sync, messaging, and matchmaking in a simple click-to-move demo.
tags: [multiplayer, networking]
kind: tutorial
topic: Multiplayer
thumb: /img/tutorials/real-time-multiplayer-colyseus/thumbnail.webp
---

<div className="iframe-container">
  <iframe src="https://playcanv.as/p/1QoAsx7r/" title="Real-time Multiplayer with Colyseus" allow="camera; microphone; xr-spatial-tracking; fullscreen; loopback-network; local-network-access" allowfullscreen></iframe>
</div>

> *This demo connects to a Colyseus server on your own computer. Start the server as described in [Running the Server](#running-the-server), then select **CREATE GAME** and click anywhere on the floor to move. Open the demo in a second browser tab and select **JOIN EXISTING GAME** to see both players move.*

[Colyseus](https://colyseus.io/) is an open source multiplayer framework for Node.js. Its server holds the authoritative game state and keeps every connected client in sync with it. This tutorial walks through a PlayCanvas project that uses Colyseus to put several players in the same room and let each of them move around by clicking the floor.

## What you will learn {#on-this-tutorial-you-will-learn}

- Running a Colyseus server
- Synchronizing state between the server and its clients
- Sending messages from a client to the server
- Matchmaking: how to create, join, and list available games

## Materials {#materials}

- [PlayCanvas project (client side)](https://playcanvas.com/project/859259/overview/colyseus-demo)
- [Colyseus TypeScript project (server side)](https://github.com/colyseus/tutorial-playcanvas-server)

Fork the PlayCanvas project to follow along in the Editor. The code on this page is the code in the project.

## Before you start {#before-you-start}

### Prior knowledge expected {#prior-knowledge-expected}

- Basic PlayCanvas knowledge ([Getting Started](/user-manual/getting-started/))
- Basic JavaScript/TypeScript understanding ([TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/intro.html))
- Basic Node.js understanding ([Introduction to Node.js](https://nodejs.org/en/learn/getting-started/introduction-to-nodejs))

### Software requirements {#software-requirements}

- [Node.js](https://nodejs.org/en/download/) 22 or later
- A code editor, such as [Visual Studio Code](https://code.visualstudio.com/download)

## Running the Server {#running-the-server}

The server for this tutorial is a small Colyseus project. Clone or download the [server repository](https://github.com/colyseus/tutorial-playcanvas-server), then install its dependencies and start it from your command line:

```sh
cd tutorial-playcanvas-server
npm install
npm start
```

The server listens for WebSocket connections on `ws://localhost:2567`. While it runs, the PlayCanvas project can connect to it, whether you launch the project from the Editor or play the demo at the top of this page.

Your browser may ask whether the page can access apps and services on your device, because a page on the internet is connecting to a program on your own computer. Select **Allow**.

:::note

Safari may refuse to let a page on the internet connect to `localhost`. If the project can't connect, use Chrome, Edge or Firefox. If you blocked the browser's request, select the icon at the left of the address bar, reset the site's permissions and reload the page.

:::

To start a server of your own from scratch instead, run `npm create colyseus-app@latest ./my-server` and follow the prompts.

### Defining the rooms {#defining-the-rooms}

Clients don't connect to a Colyseus server as a whole. They join **rooms**, and each room runs its own copy of the game. The server defines which kinds of room clients can join in `src/app.config.ts`:

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

`my_room` is the game itself. `lobby` is a room type built into Colyseus that tells its clients which game rooms are open. `enableRealtimeListing()` makes every `my_room` room report to the lobby as it is created, changes or closes.

## Room State and Schema {#room-state-and-schema}

In Colyseus, the shared game state is defined with `Schema` classes.

> `Schema` is a special data type from Colyseus that is capable of encoding its changes/mutations *incrementally*. The encoding and decoding process happens internally by the framework and its SDK.

The state synchronization loop looks like this:

1. The server changes the state, and Colyseus sends those changes to every client in the room.
2. Clients observe the changes by attaching callbacks to their local, *read-only* copy of the state, and update the scene to match.
3. Clients send messages to the server, which decides what to do with them and may change the state (back to step **1.**).

The state of `my_room` is a map of players, keyed by each client's session ID. Each `Player` has `x`, `y` and `z` coordinates:

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

> See more about the [Schema structures](https://docs.colyseus.io/state/schema/).

The room creates a `Player` at a random position on the floor whenever a client joins, and removes it when the client leaves. It allows up to five clients:

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

The state changes made on the server **can be observed** on the client side, which is what the PlayCanvas project does.

## The PlayCanvas Project {#the-playcanvas-project}

The project has three scenes. Each one has a root entity with the scene's name and its own scripts:

| Scene | What it does | Scripts |
| --- | --- | --- |
| MainMenu | Creates the Colyseus client and shows the four menu buttons | `mainMenu.mjs` on the root entity, a button handler script on each button |
| GamePlay | Joins a game room and shows the players on the floor | `gameplay.mjs` on the root entity, `backButtonHandler.mjs` on the **BACK** button |
| RoomList | Lists the open game rooms | `roomList.mjs` on the root entity, `backButtonHandler.mjs` on the **BACK** button |

The project switches scenes with [`loadSceneHierarchy`](/user-manual/editor/scenes/loading-scenes/), loading the new scene's hierarchy and destroying the old one. The Colyseus client is created once, in the MainMenu scene, and stored on the application so that the other scenes can use it.

The GamePlay scene contains:

- **Plane**: the floor, disabled until the client has joined a room.
- **Player1**: the blue capsule for the current player, disabled until the client has joined.
- **Player2**: a disabled, dark gray capsule that the project clones for every other player in the room.

## Loading the Colyseus SDK {#including-the-colyseus-javascript-sdk}

The project's ESM scripts import the [Colyseus JavaScript SDK](https://docs.colyseus.io/sdk) straight from a CDN:

```javascript
import { Client } from 'https://esm.sh/colyseus.js@0.16';
```

Use the same URL in every script that imports from the SDK, so that they all share one copy of it. You can also map a short name to the URL with an [Import Map](/user-manual/editor/scripting/import-maps/).

:::note[Classic scripts]

In a project that uses Classic scripts, add `https://unpkg.com/colyseus.js@^0.16.0/dist/colyseus.js` to **External Scripts** in the project [Settings](/user-manual/editor/interface/settings/). The SDK is then available as the global `Colyseus` object, for example `new Colyseus.Client(...)` and `Colyseus.getStateCallbacks(room)`.

:::

## Connecting to the Server {#establishing-a-client-server-connection}

The `mainMenu.mjs` script creates the `Client`, then listens for the menu buttons. Each button's handler script fires an event with the scene to load and what to do there:

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

For example, this is the **CREATE GAME** button's script, `createButtonHandler.mjs`:

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

> Note that the project connects to the local `ws://localhost:2567` endpoint. To play with others online, [deploy your server](https://docs.colyseus.io/deployment/) to the public internet and use its address instead.

## Matchmaking {#matchmaking}

When the GamePlay scene loads, `gameplay.mjs` joins a room according to the button the player pressed:

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

- `create()` always creates a new room and joins it.
- `join()` joins an existing room that has space, and fails if there is none.
- `joinOrCreate()` joins an existing room that has space, or creates a new one if there is none.

Each call returns a `Room` once the client has joined it. If it fails, for example because the server isn't running or there is no room to join, the scene shows an error message instead. On success, the scene shows the floor and the room's name and ID (`room.name` and `room.roomId`), and starts listening for state changes.

When you launch the project now, the server log shows each client that joins:

```none
19U8WkmoK joined!
```

## Listening for State Changes {#listening-for-state-changes}

Once the client has joined a room, it can listen for changes to the state and keep the scene in sync with it. Attach callbacks to the state through `getStateCallbacks()`, which is imported from the SDK:

```javascript
import { getStateCallbacks } from 'https://esm.sh/colyseus.js@0.16';

// ...

// Attach callbacks to the room state through getStateCallbacks()
const $ = getStateCallbacks(room);
```

### Adding new players {#adding-new-players}

As described in [Room State and Schema](#room-state-and-schema), the server's `onJoin()` method adds a `Player` to the state for every client that joins. `onAdd()` calls its callback for every player already in the room, then again for each player who joins later:

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

The script keeps an object for each player in `this.playerObjects`, keyed by session ID, holding the player's entity and the data it needs to move it.

To tell the current player apart, it compares each player's session ID with the room's `room.sessionId`, which is this client's own. The current player is shown with the blue **Player1** entity, and every other player with a clone of the dark gray **Player2**.

### Updating a player's position {#updating-players-visual-representation}

`$(player).onChange()` is called whenever the server changes any of the player's properties. The script then starts moving the player's entity towards its new position.

- `$(player).onChange()` is triggered **per schema instance**
- `$(player).listen(prop)` is triggered **per property** change

The script uses `onChange()` because it needs all three coordinates at once, whichever of them has changed. To react to a single property, you would use `listen()`:

```javascript
$(player).listen('x', (newX, prevX) => console.log(newX, prevX));
```

> Read [more about Schema callbacks](https://docs.colyseus.io/state/schema/#client-side).

### Removing disconnected players {#removing-disconnected-players}

When a player is removed from the state (by `onLeave()` on the server), the script destroys their entity as well:

```javascript
$(room.state).players.onRemove((player, sessionId) => {
    this.playerObjects[sessionId]?.entity.destroy();
    delete this.playerObjects[sessionId];
});
```

## Moving the Players {#moving-the-players}

### Sending the new position to the server {#sending-the-new-position-to-the-server}

When the player clicks or taps the floor, the script uses a [ray cast](/user-manual/physics/ray-casting/) to find the `Vec3` position under the pointer, then sends it to the server in an `updatePosition` message:

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

`this.groundShape` is a `BoundingBox` the size of the floor, so the ray cast doesn't need the physics system. The current player starts moving at once, without waiting for the server to confirm the new position.

### Receiving the message on the server {#receiving-the-message-from-the-server}

When the server receives an `updatePosition` message, it changes the position of the player that sent it, found by the client's `sessionId`:

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

Colyseus sends the change to every client in the room, and each client's `onChange()` callback moves that player's entity. The `update()` method of `gameplay.mjs` moves each entity a step towards its target position every frame, so players glide to their new positions rather than jumping.

## Listing Available Rooms {#listing-available-rooms}

The RoomList scene shows the open game rooms. Its `roomList.mjs` script joins the server's `lobby` room, which sends the client the list of rooms and then a message whenever a room is created, changes or closes:

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

Each room in the list has its `name`, `roomId`, number of `clients` and `maxClients`. `showRooms()` writes the `my_room` rooms into a text element.

## Leaving a Room {#leaving-a-room}

The **BACK** button returns to the MainMenu scene. Before it loads the menu, `gameplay.mjs` leaves the room, and `roomList.mjs` leaves the lobby:

```javascript
async loadMenu() {
    if (this.room) {
        await this.room.leave(true);
    }

    // ... load the MainMenu scene
}
```

Passing `true` tells the server that the client left on purpose, as the `consented` argument of `onLeave()`. The server then removes the player from the state, and the other clients remove their entity.

If the connection drops instead, the room's `onLeave` callback shows an error:

```javascript
room.onLeave(() => {
    this.displayError('CLIENT DISCONNECTED!');
});
```

## Extra: Monitoring Rooms and Connections {#extra-monitoring-rooms-and-connections}

Colyseus comes with an optional monitoring panel that can be helpful during the development of your game.

To view the monitor panel from your local server, go to `http://localhost:2567/monitor`.

![monitor](/img/tutorials/multiplayer-colyseus/monitor.webp)

You can see and interact with all spawned rooms and active client connections through this panel.

> See [more information about the monitor panel](https://docs.colyseus.io/tools/monitoring).

The server also serves the Colyseus Playground at `http://localhost:2567`, where you can join rooms and send messages from your browser without a game client.

## More {#more}

We hope you found this tutorial useful. To learn more about Colyseus, have a look at the [Colyseus documentation](https://docs.colyseus.io/), and join the [Colyseus Discord community](https://discord.gg/RY8rRS7).
