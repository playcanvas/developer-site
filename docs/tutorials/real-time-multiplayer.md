---
title: Real Time Multiplayer
description: Run a Node.js and Socket.IO server on your own computer and keep players in sync across browsers, then put the server online, with no hosted multiplayer service.
tags: [multiplayer, networking]
kind: tutorial
topic: Multiplayer
thumb: https://s3-eu-west-1.amazonaws.com/images.playcanvas.com/projects/12/406048/507186-image-75.jpg
---

<video autoPlay muted loop controls playsInline src="/video/real-time-multiplayer-two-windows.mp4" style={{width: '100%', height: 'auto'}} />

*The finished project running in two browser windows. Each window controls the white capsule and sees the other player in blue.*

In this tutorial you build a small multiplayer project from scratch. Every player moves a capsule with the <kbd>W</kbd>, <kbd>A</kbd>, <kbd>S</kbd> and <kbd>D</kbd> keys and sees everyone else's capsule move in real time.

It has two parts:

- A **server**, written with [Node.js](https://nodejs.org/) and [Socket.IO](https://socket.io/). It keeps a list of the players and passes messages between them. You run it on your own computer first and put it online at the end.
- A **client**, which is your PlayCanvas project. Every browser that opens it connects to the server.

:::info[Before you start]

You need [Node.js](https://nodejs.org/en/download) on your computer and a terminal to run commands in. It helps to have finished [Your First App](/user-manual/editor/getting-started/your-first-app/), so that you know your way around the Editor. To compare your work, open the [finished project](https://playcanvas.com/project/406048/overview/tutorial-realtime-multiplayer).

:::

## 1. Create the Server {#create-the-server}

1. Make a folder for the server, then set it up and install Socket.IO:

    ```sh
    mkdir multiplayer-server
    cd multiplayer-server
    npm init -y
    npm install socket.io
    ```

2. In that folder, create a file called `server.js` with this code:

    ```javascript
    const http = require('http');
    const { Server } = require('socket.io');

    const server = http.createServer();

    const io = new Server(server, {
        cors: {
            // Any page may connect. Before you publish a game, list the addresses it is
            // served from instead, such as 'https://playcanv.as'.
            origin: '*'
        }
    });

    // Every connected player's last known position, keyed by socket ID
    const players = {};

    io.on('connection', (socket) => {
        console.log(`Player connected: ${socket.id}`);

        // A client sends this once it is ready to receive the list of players
        socket.on('initialize', () => {
            // Start each player at a random place on the ground
            players[socket.id] = {
                id: socket.id,
                x: Math.random() * 10 - 5,
                y: 1,
                z: Math.random() * 10 - 5
            };

            // Tell the new player its own ID and where everyone is
            socket.emit('playerData', { id: socket.id, players });

            // Tell everyone else that a new player has arrived
            socket.broadcast.emit('playerJoined', players[socket.id]);
        });

        // A client sends this whenever its player has moved
        socket.on('positionUpdate', (position) => {
            const player = players[socket.id];
            if (!player) return;

            player.x = position.x;
            player.y = position.y;
            player.z = position.z;

            socket.broadcast.emit('playerMoved', player);
        });

        socket.on('disconnect', () => {
            console.log(`Player disconnected: ${socket.id}`);
            if (!players[socket.id]) return;

            delete players[socket.id];
            socket.broadcast.emit('playerLeft', socket.id);
        });
    });

    const port = process.env.PORT || 3000;
    server.listen(port, () => {
        console.log(`Server listening on port ${port}`);
    });
    ```

3. Start the server:

    ```sh
    node server.js
    ```

    It prints `Server listening on port 3000`. Leave it running in this terminal for the rest of the tutorial. To stop it later, press <kbd>Ctrl</kbd>+<kbd>C</kbd>.

The server never looks at the game. It only receives messages and sends messages on. [How the Messages Flow](#how-the-messages-flow) goes through them once the client is working.

## 2. Build the Scene {#build-the-scene}

Create a new project from the **Blank Project** kit and open it in the Editor. Its scene holds a Camera, a Light, a Box and a Plane.

### The ground {#the-ground}

1. In the Hierarchy, select **Box** and press <kbd>Delete</kbd>.
2. Select **Plane**. In the Inspector, change its **Name** to `Ground` and its **Scale** to `16`, `1`, `16`.
3. Select **ADD COMPONENT** > **Physics** > **Collision**. Set **Half Extents** to `8`, `0.1`, `8` and **Position Offset** to `0`, `-0.1`, `0`. This gives the ground a thin box to stand on, with its top at the surface of the plane.
4. The component reports **Ammo module not found**. Select **IMPORT AMMO** to add the [physics engine](/user-manual/physics/) to the project.
5. Select **ADD COMPONENT** > **Physics** > **Rigid Body**. Leave its **Type** as **Static**.

### The players {#the-players}

The scene needs two capsules. `Player` is the one this browser controls. `Other` is a template: the project makes a copy of it for every other player who joins.

1. In the Hierarchy, select **Root**, then the **+** (Add Entity) button, then **3D** > **Capsule**.
2. In the Inspector, change the **Name** to `Player` and the **Position** to `0`, `1`, `0`.
3. With **Player** selected, select the **Duplicate Entity** button at the top of the Hierarchy. The copy is selected and is also called Player.
4. Change the copy's **Name** to `Other` and turn off **Enabled**, at the top of the Inspector. Other players are only drawn, so `Other` needs no physics.
5. In the Assets panel, select the **+** (Add Asset) button, then **Material**. Select the new material, change its **Name** to `Blue`, expand **Diffuse** and select the **Color** swatch. Type `2F80ED` in the hex field and press <kbd>Tab</kbd>.
6. Select **Other** again. Drag `Blue` from the Assets panel onto the empty material slot under **Materials** in the Inspector.
7. Select **Player**. Add a **Collision** component and set its **Type** to **Capsule**.
8. Add a **Rigid Body** component. Set its **Type** to **Dynamic** and its **Angular Factor** to `0`, `0`, `0`, which stops the capsule from falling over.

![The Rigid Body component of the Player](/img/tutorials/real-time-multiplayer/rigid-body.webp)

### The camera and the light {#the-camera-and-the-light}

1. Select **Camera**. Set its **Position** to `0`, `14`, `16` and its **Rotation** to `-42`, `0`, `0`, so that it looks down on the whole ground.
2. Select **Light**. Under **Cast Shadows**, set **Distance** to `40`, so that shadows reach the far side of the ground.

![The scene in the Editor](/img/tutorials/real-time-multiplayer/scene.webp)

## 3. Add the Socket.IO Client {#add-the-socket-io-client}

The server uses the Socket.IO library, and the client needs the matching library for browsers. PlayCanvas can load it from a web address before your scripts run.

1. Select the **Settings** button (the cog) in the toolbar at the top of the Viewport.
2. In the Inspector, expand **External Scripts** and set **Number of URLs** to `1`.
3. Paste this address into the **URL** field and press <kbd>Enter</kbd>:

    ```none
    https://cdn.socket.io/4.8.4/socket.io.min.js
    ```

![The External Scripts setting](/img/tutorials/real-time-multiplayer/external-scripts.webp)

## 4. Move the Player {#move-the-player}

1. In the Assets panel, select the **+** (Add Asset) button, then **Script**. Type `movement.mjs` as the filename and press <kbd>Enter</kbd>.
2. Double-click `movement.mjs` to open it in the [Code Editor](/user-manual/editor/scripting/code-editor/).
3. Replace everything in the file with the code below, then save with <kbd>Ctrl</kbd>+<kbd>S</kbd> (<kbd>Cmd</kbd>+<kbd>S</kbd> on a Mac).

```javascript
import { Script, Vec3, KEY_A, KEY_D, KEY_S, KEY_W } from 'playcanvas';

/**
 * Moves the player with the W, A, S and D keys, and returns it to the start if it falls
 * off the ground.
 */
export class Movement extends Script {
    static scriptName = 'movement';

    /**
     * How fast the player moves, in units per second.
     *
     * @attribute
     * @type {number}
     */
    speed = 5;

    initialize() {
        this.direction = new Vec3();
    }

    update(dt) {
        const keyboard = this.app.keyboard;
        const body = this.entity.rigidbody;

        // The camera looks along the negative Z axis, so W moves the player away from it
        const x = (keyboard.isPressed(KEY_D) ? 1 : 0) - (keyboard.isPressed(KEY_A) ? 1 : 0);
        const z = (keyboard.isPressed(KEY_S) ? 1 : 0) - (keyboard.isPressed(KEY_W) ? 1 : 0);
        this.direction.set(x, 0, z).normalize().mulScalar(this.speed);

        // Set the sideways speed and leave the vertical speed to gravity
        const velocity = body.linearVelocity;
        velocity.x = this.direction.x;
        velocity.z = this.direction.z;
        body.linearVelocity = velocity;

        // Fell off the edge: start again in the middle
        if (this.entity.getPosition().y < -10) {
            body.teleport(0, 1, 0);
            body.linearVelocity = Vec3.ZERO;
        }
    }
}
```

Now attach the script to the player:

1. Back in the Editor, select **Player**.
2. Select **ADD COMPONENT** > **Script**. The new [Script Component](/user-manual/editor/scenes/components/script/) is added at the bottom of the Inspector, so scroll down to it.
3. Select the **+ ADD SCRIPT** field and choose `movement`.
4. Select the **Parse** button on the `movement` script: the two arrows next to **Edit**. The Editor reads the code and shows the `speed` attribute.

Select **Launch** at the top right of the Viewport. The project opens in a new tab, where <kbd>W</kbd>, <kbd>A</kbd>, <kbd>S</kbd> and <kbd>D</kbd> move the capsule. Walk off the edge and it starts again in the middle.

## 5. Connect to the Server {#connect-to-the-server}

1. Create a second script called `network.mjs`, in the same way as `movement.mjs`.
2. Replace everything in it with the code below, then save.

```javascript
import { Script, Vec3 } from 'playcanvas';

/**
 * Connects to the multiplayer server, sends it this player's position and shows a capsule
 * for every other player.
 */
export class Network extends Script {
    static scriptName = 'network';

    /**
     * The address of the multiplayer server.
     *
     * @attribute
     * @type {string}
     */
    serverUrl = 'http://localhost:3000';

    initialize() {
        this.player = this.app.root.findByName('Player');
        this.other = this.app.root.findByName('Other');

        // The other players, keyed by ID. It stays null until the server sends the list.
        this.players = null;
        this.lastSent = new Vec3();

        // io is defined by the Socket.IO client library
        this.socket = io(this.serverUrl);

        this.socket.on('connect', () => {
            console.log(`Connected to ${this.serverUrl}`);
            this.socket.emit('initialize');
        });

        this.socket.on('playerData', (data) => {
            this.removeAll();
            this.players = {};
            for (const id in data.players) {
                const player = data.players[id];
                if (id === data.id) {
                    // This is us: move to the position the server chose
                    this.player.rigidbody.teleport(player.x, player.y, player.z);
                } else {
                    this.addPlayer(player);
                }
            }
        });

        this.socket.on('playerJoined', (data) => {
            if (this.players) {
                this.addPlayer(data);
            }
        });

        this.socket.on('playerMoved', (data) => {
            const entity = this.players?.[data.id];
            if (entity) {
                entity.setPosition(data.x, data.y, data.z);
            }
        });

        this.socket.on('playerLeft', (id) => {
            const entity = this.players?.[id];
            if (entity) {
                entity.destroy();
                delete this.players[id];
            }
        });

        // Close the connection when this script is destroyed
        this.once('destroy', () => {
            this.socket.disconnect();
        });
    }

    update(dt) {
        if (!this.players) return;

        // Tell the server where this player is, but only when it has moved
        const position = this.player.getPosition();
        if (!position.equals(this.lastSent)) {
            this.lastSent.copy(position);
            this.socket.emit('positionUpdate', { x: position.x, y: position.y, z: position.z });
        }
    }

    /**
     * Shows a capsule for another player.
     *
     * @param {{ id: string, x: number, y: number, z: number }} data - The player's ID and position.
     */
    addPlayer(data) {
        const entity = this.other.clone();
        this.other.parent.addChild(entity);
        entity.setPosition(data.x, data.y, data.z);
        entity.enabled = true;
        this.players[data.id] = entity;
    }

    /**
     * Removes every other player's capsule. The server sends the full list again each time
     * the connection is made, including after a dropped connection.
     */
    removeAll() {
        for (const id in this.players) {
            this.players[id].destroy();
        }
    }
}
```

Attach it to the scene:

1. In the Editor, select **Root**.
2. Add a **Script** component to it, add the `network` script and select its **Parse** button. The `serverUrl` attribute appears, set to the address of the server on your computer.

![The network script on the Root Entity](/img/tutorials/real-time-multiplayer/network-script.webp)

### Try it {#try-it}

1. Check that the server from [step 1](#create-the-server) is still running.
2. **Launch** the project.
3. Your browser may ask whether `launch.playcanvas.com` can access apps and services on your device. Select **Allow**. Browsers ask because a page on the internet is connecting to a program on your own computer.
4. The terminal that runs the server prints `Player connected:` and an ID.
5. Copy the address of the launch tab and open it in a second browser window. Put the two windows side by side.

Each window now shows two capsules. Click a window and move its white capsule: the blue capsule in the other window follows. Close a window and its capsule disappears from the other one.

:::note

Safari may refuse to let a page on the internet connect to `localhost`. If the server never prints `Player connected:`, test in Chrome, Edge or Firefox instead. This only affects a server on your own computer, not one that is [online](#put-the-server-online).

:::

If only one capsule appears, open the browser's developer tools (<kbd>F12</kbd>) and read the Console:

- `Connected to http://localhost:3000` means the client reached the server, so look at the server's terminal for errors.
- An error that mentions `localhost:3000` means the server is not running, or the browser was not allowed to reach it. To be asked again, select the icon at the left of the address bar and reset the site's permissions, then reload the tab.

## 6. How the Messages Flow {#how-the-messages-flow}

The client and the server talk by sending each other named messages. `socket.emit(name, data)` sends one, and `socket.on(name, callback)` runs a function when one arrives. This project uses six:

| Message | Sent by | Meaning |
| --- | --- | --- |
| `initialize` | A client, when it connects | "I am ready. Who is playing?" |
| `playerData` | The server, to that client | The client's own ID and the position of every player, including the starting position the server chose for it |
| `playerJoined` | The server, to every other client | A new player and its position |
| `positionUpdate` | A client, when its player has moved | The player's new position |
| `playerMoved` | The server, to every other client | A player's ID and new position |
| `playerLeft` | The server, to every other client | The ID of a player that disconnected |

On the server, `socket.emit` replies to the one client that the `socket` belongs to, and `socket.broadcast.emit` sends to every client except that one.

Two details keep the project simple:

- The `network` script sends a position only when it has changed, so a player who stands still sends nothing.
- The copies of `Other` have no physics. They are placed exactly where the server says the other players are.

## 7. Put the Server Online {#put-the-server-online}

A server on your computer can only be reached from your computer. To play with other people, run the same `server.js` on a hosting service. Any service works if it:

- Runs a Node.js program continuously. Services that only run short functions on demand cannot hold a connection open.
- Accepts WebSocket connections.
- Gives the server an `https://` address. A published PlayCanvas game is served over HTTPS, and browsers stop an HTTPS page from connecting to an insecure address, except on your own computer.

Most services tell the server which port to listen on through the `PORT` environment variable, which `server.js` already reads.

The steps are much the same everywhere:

1. Put `server.js`, `package.json` and `package-lock.json` in a Git repository. Leave the `node_modules` folder out.
2. Create a web service from that repository at your host. If it asks, the build command is `npm install` and the start command is `node server.js`.
3. Open the address the host gives you, followed by `/socket.io/?EIO=4&transport=polling`, in a browser. A reply that starts `0{"sid":` means that the server is running.
4. In the Editor, select **Root** and change the `serverUrl` attribute of the `network` script to that address, for example `https://my-multiplayer-server.example.com`.
5. **Launch** the project to check that it connects, then [publish it](/user-manual/editor/publishing/).

:::info[One example]

At the time of writing, November 2026, [Render](https://render.com/docs/free) has a free web service that meets all three requirements. It goes to sleep after 15 minutes without traffic and takes about a minute to wake up, so the first player to arrive waits for the others to appear. Hosting plans change, so check what a service offers before you rely on it.

:::

Once the game is published, let only your own pages use the server. Replace `origin: '*'` in `server.js` with the addresses the game is served from:

```javascript
cors: {
    origin: ['https://playcanv.as', 'https://launch.playcanvas.com']
}
```

## Where Next {#where-next}

Some things to try:

- Give each player a name or a color, chosen by the server and sent in `playerData`.
- Send positions at most 20 times a second, and move the other capsules smoothly between updates.
- Have the server check each `positionUpdate` and ignore one that is further from the last position than a player could have moved. A player who falls off the ground moves faster than one who walks, then jumps back to the middle, so allow for both.

### Where the game runs {#where-the-game-runs}

In this project, each browser runs the physics for its own player and tells the server where that player is. The server passes the positions on without checking them. This keeps the server small and makes the player respond to the keys at once, and it is enough for a game where players cooperate or nothing is at stake. It has three costs:

- **Cheating is easy.** The server believes any position a client sends.
- **Players pass through each other.** Each browser simulates its own capsule and only draws the others. Adding a Rigid Body to the others is not a full fix: each browser would still work out every collision on its own, and a capsule that appears inside your player throws it across the scene.
- **Nothing can be shared.** A ball that two players push would end up in a different place in each window.

A game that cannot accept these costs runs the game itself on the server, known as an authoritative server. Each client sends its key presses, and the server runs the physics for every player and sends back the results. The server then needs a physics engine of its own, and each client has to predict its own movement to hide the delay, so this is a much larger project.

You do not have to write all of this yourself. To build on a multiplayer framework or a hosted service instead, see [Real-time Multiplayer with Colyseus](/tutorials/real-time-multiplayer-colyseus/) and [Real-time Multiplayer with Photon](/tutorials/real-time-multiplayer-photon/).
