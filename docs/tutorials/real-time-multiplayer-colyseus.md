---
title: Real-time Multiplayer with Colyseus
tags: [multiplayer, networking]
thumb: https://avatars.githubusercontent.com/u/28384334?s=300&v=4
---

<div className="iframe-container">
  <iframe src="https://playcanv.as/p/1QoAsx7r/" title="Real-time Multiplayer with Colyseus" allow="camera; microphone; xr-spatial-tracking; fullscreen" allowfullscreen></iframe>
</div>

> *Select create game to open a new game. And click anywhere on the floor to move the object.*

## On this tutorial you will learn: {#on-this-tutorial-you-will-learn}

- Setting up your Colyseus server
- Synchronizing the state between server and client
- Exchanging messages between client and server
- Matchmaking: how to create, join, and list available games

## Materials {#materials}

- [PlayCanvas Project (Client-side)](https://playcanvas.com/project/859259/overview/colyseus-demo)
- [Colyseus TypeScript Project (Server-side)](https://github.com/colyseus/tutorial-playcanvas-server)

## Before you start {#before-you-start}

### Prior Knowledge Expected {#prior-knowledge-expected}

- Basic PlayCanvas knowledge ([See PlayCanvas Developer Resources](https://developer.playcanvas.com/))
- Basic JavaScript/TypeScript understanding ([See TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/intro.html))
- Basic Node.js understanding ([See Introduction to Node.js](https://nodejs.dev/en/learn/))

### Software requirements {#software-requirements}

- [Node.js LTS](https://nodejs.org/en/download/)
- [Visual Studio Code](https://code.visualstudio.com/download)

## Creating the Server {#creating-the-server}

We will be making a basic server, hosted locally on your computer for keeping player states. Changes will be synchronized with clients accordingly.

To create a fresh new Colyseus server, run the following from your command-line:

```sh
npm init colyseus-app ./playcanvas-demo-server
```

Let's make sure you can run the server locally now, by running `npm start`:

```sh
cd playcanvas-demo-server
npm start
```

If successful, the output should look like this in your command-line:

```sh
> my-app@1.0.0 start
> ts-node-dev --respawn --transpile-only src/index.ts

✅ development.env loaded.
✅ Express initialized
🏟 Your Colyseus App
⚔️ Listening on ws://localhost:2567
```

## Including the Colyseus JavaScript SDK {#including-the-colyseus-javascript-sdk}

Now we need to add the Colyseus JavaScript SDK on PlayCanvas.

We can do that through a "external script" on PlayCanvas project settings.

Open **"Menu" → "Settings"**:

![settings](/img/tutorials/multiplayer-colyseus/settings.png)

From the Settings panel, expand on **"External Scripts"**, and increase the number of **"URLs"**.

![CDN](/img/tutorials/multiplayer-colyseus/ext_script.png)

In the new **"URL"** field, let's include the Colyseus JavaScript SDK, from a CDN:

```none
https://unpkg.com/colyseus.js@^0.16.0/dist/colyseus.js
```

This is going to make the `Colyseus` [JavaScript SDK](https://docs.colyseus.io/getting-started/javascript-client/) available for our PlayCanvas scripts.

## Establishing a Client-Server Connection {#establishing-a-client-server-connection}

Now, from a new PlayCanvas Script, let's instantiate our `Colyseus.Client` instance. ([see "Creating new scripts"](/user-manual/editor/scripting/managing-scripts/))

You can attach this script to a new empty entity called "NetworkManager".

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs defaultValue="classic" groupId='script-code'>
<TabItem  value="esm" label="ESM">

```javascript
import { Script } from 'playcanvas';

export class NetworkManager extends Script {
    static scriptName = "networkManager";

    async initialize() {
        //
        // instantiate the SDK
        // (no connection is established at this point)
        //
        this.app.colyseus = new Colyseus.Client("ws://localhost:2567");

        //
        // request to join or create a room "my_room"
        // (establish connection with the server)
        //
        this.room = await this.app.colyseus.joinOrCreate("my_room");
    }
}
```

</TabItem>
<TabItem value="classic" label="Classic">

```javascript
var NetworkManager = pc.createScript('networkManager');

NetworkManager.prototype.initialize = async function () {
  //
  // instantiate the SDK
  // (no connection is established at this point)
  //
  this.app.colyseus = new Colyseus.Client("ws://localhost:2567");

  //
  // request to join or create a room "my_room"
  // (establish connection with the server)
  //
  this.room = await this.app.colyseus.joinOrCreate("my_room");
}
```

</TabItem>
</Tabs>

> Note that we're using the local `ws://localhost:2567` endpoint here. You need to [deploy your server](https://docs.colyseus.io/deployment/) to the public internet in order to play with others online. You can also use [Glitch](https://glitch.com/edit/#!/tutorial-playcanvas-server) to host your server publicly.

When you **"Launch"** your PlayCanvas project now, your client is going to establish a connection with the server, and the server is going to create the room `my_room` on demand for you.

Notice that `my_room` is the default room identifier set by the barebones Colyseus server. You can and should change this identifier in the `arena.config.ts` file.

You will be seeing the following message in your server logs, which means a client successfully joined the room!

```none
19U8WkmoK joined!
```

## Room State and Schema {#room-state-and-schema}

In Colyseus, we define shared data through its `Schema` structures.

> `Schema` is a special data type from Colyseus that is capable of encoding its changes/mutations *incrementally*. The encoding and decoding process happens internally by the framework and its SDK.

The state synchronization loop looks like this:

1. State changes (mutations) are synchronized automatically from Server → Clients
2. Clients, by attaching callbacks to their local *read-only* `Schema` structures, can observe for state mutations and react to it.
3. Clients can send arbitrary messages to the server - which decides what to do with it - and may mutate the state (Go back to step **1.**)

---

Let's go back to editing the Server code, and define our Room State in the Server.

We need to handle multiple `Player` instances, and each `Player` will have `x`, `y` and `z` coordinates:

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

Now, still in the server-side, let's modify our `onJoin()` method to create a `Player` instance whenever a new connection is established with the room.

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

Also, when the client disconnects, let's remove the player from the map of players:

```typescript
// MyRoom.ts
// ...
    onLeave(client: Client, consented: boolean) {
        console.log(client.sessionId, "left!");

        this.state.players.delete(client.sessionId);
    }
// ...
```

The state mutations we've done in the server-side **can be observed** in the client-side, and that's what we're going to do in the next section.

## Setting up the Scene for Synchronization {#setting-up-the-scene-for-synchronization}

For this demo, we need to create two objects in our Scene:

- A Plane to represent the floor
- A Capsule to represent the players, which we will clone for each new player joining the room.

### Creating the Plane {#creating-the-plane}

Let's create a Plane with scale `8`.

![Plane](/img/tutorials/multiplayer-colyseus/plane.jpg)

### Creating the Player {#creating-the-player}

Let's create the Player capsule with scale `1`.

Make sure to uncheck the `"Enabled"` property. We will not have any Player instances enabled until we have active connections with the server.

![Player](/img/tutorials/multiplayer-colyseus/player.png)

## Listening for State Changes {#listening-for-state-changes}

After a connection with the room has been established, the client-side can start listening for state changes, and create a visual representation of the data in the server.

### Adding new players {#adding-new-players}

As per [Room State and Schema](#room-state-and-schema) section, whenever the server accepts a new connection - the `onJoin()` method is creating a new Player instance within the state.

We're going to listen to this event on the client-side now:

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

When playing the Scene, you should see a message in the browser's console whenever a new client joins the room.

For the visual representation, we need to clone the "Player" object, and keep a local reference to the cloned object based on their `sessionId`, so we can operate on them later:

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

### The "Current Player" {#the-current-player}

You can keep a special reference to the current player object by checking the `sessionId` against the connected `room.sessionId`:

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

### Removing disconnected players {#removing-disconnected-players}

When a player is removed from the state (upon `onLeave()` in the server-side), we need to remove their visual representation as well.

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

## Moving the players {#moving-the-players}

### Sending the new position to the server {#sending-the-new-position-to-the-server}

We are going to allow the "mouse down" event; use [ray cast](/user-manual/physics/ray-casting/) to determine the exact `Vec3` position the player should move towards, and then send it as a message to the server.

```typescript
// ...
this.app.mouse.on(pc.EVENT_MOUSEDOWN, (event) => {
  // Create the "bounding box" for the floor
  const boundingBox = new pc.BoundingBox(new pc.Vec3(0, 0, 0), new pc.Vec3(4, 0.001, 4));;

  // Initialize the ray and work out the direction of the ray
  // from the a screen position
  const ray = new pc.Ray();
  const targetPosition = new pc.Vec3();

  const cameraEntity = this.app.root.findByName("Camera");
  cameraEntity.camera.screenToWorld(event.x, event.y, cameraEntity.camera.farClip, ray.direction);
  ray.origin.copy(cameraEntity.getPosition());
  ray.direction.sub(ray.origin).normalize();

  // Test the ray against the ground
  const result = boundingBox.intersectsRay(ray, targetPosition);

  if (result) {
    // Adjust position height
    targetPosition.y = 1.031;

    //
    // Send new target player position to server.
    //
    this.room.send("updatePosition", {
        x: targetPosition.x,
        y: targetPosition.y,
        z: targetPosition.z,
    });
  }
});
```

### Receiving the message from the server {#receiving-the-message-from-the-server}

Whenever the `"updatePosition"` message is received in the server, we're going to mutate the player that sent the message through its `sessionId`.

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

### Updating Player's visual representation {#updating-players-visual-representation}

Having the mutation on the server, we can detect it on the client-side via `$(player).onChange()`, or `$(player).listen()`.

- `$(player).onChange()` is triggered **per schema instance**
- `$(player).listen(prop)` is triggered **per property** change

We are going to use `.onChange()` since we need all the new coordinates at once, no matter if just one has changed individually.

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

> Read [more about Schema callbacks](https://docs.colyseus.io/state/schema/#client-side)

## Extra: Monitoring Rooms and Connections {#extra-monitoring-rooms-and-connections}

Colyseus comes with an optional monitoring panel that can be helpful during the development of your game.

To view the monitor panel from your local server, go to `http://localhost:2567/colyseus`.

![monitor](/img/tutorials/multiplayer-colyseus/monitor.png)

You can see and interact with all spawned rooms and active client connections through this panel.

> See [more information about the monitor panel](https://docs.colyseus.io/tools/monitor/).

## More {#more}

We hope you found this tutorial useful, if you'd like to learn more about Colyseus please have a look at the [Colyseus documentation](https://docs.colyseus.io/), and join the [Colyseus Discord community](https://discord.gg/RY8rRS7).
