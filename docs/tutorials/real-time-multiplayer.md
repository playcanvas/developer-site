---
title: Real Time Multiplayer
tags: [multiplayer, networking]
thumb: https://s3-eu-west-1.amazonaws.com/images.playcanvas.com/projects/12/406048/507186-image-75.jpg
---

:::note

This tutorial covers how to start creating your own multiplayer from scratch. If you prefer to use a hosted multiplayer service, we have tutorials for [Colyseus](/tutorials/real-time-multiplayer-colyseus) and [Photon](/tutorials/real-time-multiplayer-photon).

:::

<div className="iframe-container">
    <iframe src="https://playcanv.as/p/XFp1Ty3X/" title="Real Time Multiplayer" allow="camera; microphone; xr-spatial-tracking; fullscreen" allowfullscreen></iframe>
</div>

*Use WASD to move the player around. If you only see one capsule, try opening this page in another tab or on another computer.*

In this tutorial we’ll cover how to setup a basic multiplayer project using Node.js and Socket.io. We’ll focus on implementing it in PlayCanvas. By the end you should have a project similar to the one above. You can find the [tutorial project here](https://playcanvas.com/project/406048/overview/tutorial-realtime-multiplayer).

## Setting up the Server

We'll be implementing a client-server model (as opposed to peer-to-peer). This will be a basic server that will receive data from all clients (which are our PlayCanvas instances) and broadcast it back.

[Glitch](https://glitch.com/) provides a really convenient way to write and deploy backend apps for free completely in your browser! You can use it without an account but creating one will let you easily find your work. [Create a new Node app](https://glitch.com/edit/#!/new-project) and replace the contents of `server.js` with this:

```javascript
const http = require('http');
const { Server } = require('socket.io');

const server = http.createServer();

// Configure Socket.IO with CORS
const io = new Server(server, {
    cors: {
        // If you only want to allow PlayCanvas launch domain:
        // origin: "https://launch.playcanvas.com",

        // Or allow all origins (less secure, but quick for testing)
        origin: "*",
        methods: ["GET", "POST"]
    }
});

io.on('connection', (socket) => {
    console.log(`New client connected: ${socket.id}`);
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});
```

Glitch will automatically re-run the server every time you finish typing. Once you’ve copied this, you should get an error. Click on the `Logs` button at the bottom of the window to open up the server console. Here you can see any server output, as well as the errors. You should see `Error: Cannot find module 'socket.io'`.

![Opening the log](/img/tutorials/multiplayer/glitch-error.png)

To include a package, go to `package.json` and click on the `Add Package` button on the top. Search for `socket.io`.

![Adding a package](/img/tutorials/multiplayer/glitch-add-package.png)

Once `socket.io` has finished installing, the server will automatically restart and you should see `Server started on port 3000` in the log. Congratulations! You've successfully deployed a server!

You can find the domain your server is deployed at by clicking `Settings` in the left sidebar. This is where you can also rename the project.

This server will simply log a message every time someone connects. This should be enough to start working on our client and confirm that it connects to the server.

## Setting up the Project

Create a new project on PlayCanvas. We first need to include the Socket.io client JS library, as an external script. To do this. go to your project settings:

![Project settings](/img/tutorials/multiplayer/project-settings.png)

Find and open 'External Scripts'.

![External scripts settings](/img/tutorials/multiplayer/external_scripts_settings.png)

Change the value from 0 to 1 and add the CDN URL for the socket library from their [framework server](https://cdnjs.com/libraries/socket.io). In this case, we will be using version `4.8.1` as that is the latest at time of writing:

![Project settings](/img/tutorials/multiplayer/added_socket_io_library.png)

```none
https://cdnjs.cloudflare.com/ajax/libs/socket.io/4.8.1/socket.io.min.js
```

Now we need to create a new script to handle the network logic. Create a new script called `Network.js`. We first need to create a connection to the server. We can do this by adding this line in the initialize method:

```javascript
this.socket = io.connect('https://playcanvas-multiplayer-server.glitch.me');
```

Replace `https://playcanvas-multiplayer-server.glitch.me` with the address of your own server.

To confirm that this works, attach this network script to the `Root` entity, and then launch the game. Keep your eye on the server log at Glitch. If everything worked, the server should log `New client connected:` along with the client ID. The project is now setup to send and receive messages to and from the server.

## Server and Client Communication

The way you can send data between the client and server is with the socket connection we made earlier. To send data from the client (in Network.js on PlayCanvas), we use the `emit` function. Here’s an example:

```javascript
this.socket.emit('playerJoined', 'John');
```

This emits a message called `playerJoined`, with the data `John`. For the server to receive the message, we need to write in the server file (in `server.js` on Glitch):

```javascript
socket.on('playerJoined', function (name) {
    console.log (name);
});
```

This will log whatever data is sent to the server when `playerJoined` is emitted.

For this demo, we’re aiming to have players move around with others in real time, so we'll need to create an environment. Start by create an entity to use as a ground, and add a collision box and static rigidbody. Here is what the settings on the ground entity should look like:

<img loading="lazy" src="/img/tutorials/multiplayer/ground_entity.png" width="360" />

Next we’ll need a player to control. Create a new capsule and call it `Player`. add a dynamic rigidbody and collision box, and change the rigid body settings to match the picture below.

<img loading="lazy" src="/img/tutorials/multiplayer/player_entity.png" width="360" />

Duplicate the player entity and rename it as 'Other'. Uncheck the `Enabled` box on this new entity so that it's disabled to begin with.  This is the entity we'll be using to simulate other players in the game.

Add a script component to your player, and attach a new script called `Movement.js`:

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs defaultValue="classic" groupId='script-code'>
<TabItem  value="esm" label="ESM">

```javascript
import { Script, Vec3, KEY_A, KEY_D, KEY_W, KEY_S } from 'playcanvas';

export class Movement extends Script {
    static scriptName = "movement";

    /**
     * @attribute
     * @title Player Speed
     * @type {number}
     */
    playerSpeed = 30;

    // initialize code called once per entity
    initialize() {
        this.force = new Vec3();
    }

    // update code called every frame
    update(dt) {
        const forward = this.entity.forward;
        const right = this.entity.right;
        const app = this.app;

        let x = 0;
        let z = 0;

        if (app.keyboard.isPressed(KEY_A)) {
            x -= right.x;
            z -= right.z;
        }

        if (app.keyboard.isPressed(KEY_D)) {
            x += right.x;
            z += right.z;
        }

        if (app.keyboard.isPressed(KEY_W)) {
            x += forward.x;
            z += forward.z;
        }

        if (app.keyboard.isPressed(KEY_S)) {
            x -= forward.x;
            z -= forward.z;
        }

        if (x !== 0 || z !== 0) {
            x *= dt;
            z *= dt;

            this.force.set(x, 0, z).normalize().scale(this.playerSpeed);
            this.entity.rigidbody.applyForce(this.force);
        }
    }
}
```

</TabItem>
<TabItem value="classic" label="Classic">

```javascript
var Movement = pc.createScript('movement');

Movement.attributes.add('playerSpeed', {
    type: 'number',
    default: 30,
    title: 'Player Speed'
});

// initialize code called once per entity
Movement.prototype.initialize = function() {
    this.force = new pc.Vec3();
};

// update code called every frame
Movement.prototype.update = function(dt) {
    var forward = this.entity.forward;
    var right = this.entity.right;
    var app = this.app;

    x = 0;
    z = 0;

    if (app.keyboard.isPressed(pc.KEY_A)) {
        x -= right.x;
        z -= right.z;
    }

    if (app.keyboard.isPressed(pc.KEY_D)) {
        x += right.x;
        z += right.z;
    }

    if (app.keyboard.isPressed(pc.KEY_W)) {
        x += forward.x;
        z += forward.z;
    }

    if (app.keyboard.isPressed(pc.KEY_S)) {
        x -= forward.x;
        z -= forward.z;
    }

    if (x !== 0 || z !== 0) {
        x *= dt;
        z *= dt;

        this.force.set (x, 0, z).normalize ().scale ((this.playerSpeed));
        this.entity.rigidbody.applyForce (this.force);
    }
};
```

</TabItem>
</Tabs>

When you launch the game you should be able to use WASD to move your player around. If not, you’ve missed a step or did not set the correct settings for the entity. Try changing the speed attribute on the movement script.

For the game to work in real time multiplayer, we need to keep track of all players in the game. Replace the current server code with this:

```javascript
const http = require('http');
const { Server } = require('socket.io');

/** 
 * Class to track each connected player (id + position)
 */
class Player {
    constructor(id) {
        this.id = id;
        this.x = 0;
        this.y = 0;
        this.z = 0;
    }
}

const server = http.createServer();

// Configure Socket.IO with CORS
const io = new Server(server, {
    cors: {
        // If you only want to allow PlayCanvas launch domain:
        // origin: "https://launch.playcanvas.com",

        // Or allow all origins (less secure, but quick for testing)
        origin: "*",
        methods: ["GET", "POST"]
    }
});

const players = {};

/**
 * Handle new socket connections
 */
io.on('connection', (socket) => {
    console.log(`New client connected: ${socket.id}`);

    // Fired when the client is ready to initialize their Player object
    socket.on('initialize', () => {
        const newPlayer = new Player(socket.id);
        players[socket.id] = newPlayer;

        // Send to this client its own ID and the current list of players
        socket.emit('playerData', { id: socket.id, players });

        // Tell everyone else about this new player
        socket.broadcast.emit('playerJoined', newPlayer);
    });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});
```

In the code above, when a player sends the message `initialize`, we send him his unique ID and data about other players in the game. It also tells others that a new player has connected. Let’s add that logic into our Network script.

Add this code in the `initialize`:

```javascript
// Your io.connect function call should be up here

this.socket.emit('initialize');
var socket = this.socket;

this.player = this.app.root.findByName('Player');
this.other = this.app.root.findByName('Other');

var self = this;
socket.on('playerData', function (data) {
    self.initializePlayers (data);
});

socket.on('playerJoined', function (data) {
    self.addPlayer(data);
});
```

And then declare these new functions inside Network.js:

<Tabs defaultValue="classic" groupId='script-code'>
<TabItem  value="esm" label="ESM">

```javascript
initializePlayers(data) {
    this.players = data.players;
    // Create a player array and populate it with the currently connected players.

    this.id = data.id;
    // Keep track of what ID number you are.

    for(var id in this.players){
        if(id != Network.id){
            this.players[id].entity = this.createPlayerEntity(this.players[id]);
        }
    }
    // For every player already connected, create a new capsule entity.

    this.initialized = true;
    // Mark that the client has received data from the server.
}

createPlayerEntity(data) {
    var newPlayer = this.other.clone ();
    // Create a new player entity.

    newPlayer.enabled = true;
    // Enable the newly created player.

    this.other.getParent().addChild (newPlayer);
    // Add the entity to the entity hierarchy.

    if (data)
        newPlayer.rigidbody.teleport(data.x, data.y, data.z);
    // If a location was given, teleport the new entity to the position of the connected player.

    return newPlayer;
    // Return the new entity.
}

addPlayer(data) {
    this.players[data.id] = data;
    this.players[data.id].entity = this.createPlayerEntity(data);
}
```

</TabItem>
<TabItem value="classic" label="Classic">

```javascript
Network.prototype.initializePlayers = function (data) {
    this.players = data.players;
    Network.id = data.id;

    for (var id in this.players) {
        if (id != Network.id) {
            this.players[id].entity = this.createPlayerEntity(this.players[id]);
        }
    }

    this.initialized = true;
    console.log('initialized');
};

Network.prototype.createPlayerEntity = function (data) {
    // Create a new player entity
    var newPlayer = this.other.clone();
    newPlayer.enabled = true;

    // Add the entity to the entity hierarchy
    this.other.getParent().addChild(newPlayer);

    // If a location was given, teleport the new entity to the position of the connected player
    if (data)
        newPlayer.rigidbody.teleport(data.x, data.y, data.z);

    return newPlayer;
};

Network.prototype.addPlayer = function (data) {
    this.players[data.id] = data;
    this.players[data.id].entity = this.createPlayerEntity(data);
};
```

</TabItem>
</Tabs>

Now when we join the game, the client tells the server we've connected, and the server sends us a list of players with their positions. The game then creates a new entity for each player connected, and moves them to their current position. The only problem is, the server doesn't know the positions of all players. We need to send the server our current position every frame.

Add this code into the `initialize` of your Network.js script:

```javascript
socket.on('playerMoved', function (data) {
    self.movePlayer(data);
});
```

Replace your `update` with this:

```javascript
Network.prototype.update = function (dt) {
    this.updatePosition();
};
```

And then declare these new functions inside Network.js:

<Tabs defaultValue="classic" groupId='script-code'>
<TabItem  value="esm" label="ESM">

```javascript
movePlayer(data) {
    if (this.initialized)
        this.players[data.id].entity.rigidbody.teleport (data.x, data.y, data.z);
}

updatePosition() {
    if (this.initialized) {
        const pos = this.player.getPosition();
        this.socket.emit ('positionUpdate', {id: this.id, x: pos.x, y: pos.y, z: pos.z});
    }
}
```

</TabItem>
<TabItem value="classic" label="Classic">

```javascript
Network.prototype.movePlayer = function (data) {
    if (this.initialized && !this.players[data.id].deleted) {
        this.players[data.id].entity.rigidbody.teleport(data.x, data.y, data.z);
    }
};

Network.prototype.updatePosition = function () {
    if (this.initialized) {    
        var pos = this.player.getPosition();
        Network.socket.emit('positionUpdate', {id: Network.id, x: pos.x, y: pos.y, z: pos.z});
    }
};
```

</TabItem>
</Tabs>

Back on the server, we need to account for what happens when the player sends us their position. On the server, we need to add a new event:

```javascript
// Update player position
socket.on('positionUpdate', (data) => {
    if (!players[socket.id]) return;
    players[socket.id].x = data.x;
    players[socket.id].y = data.y;
    players[socket.id].z = data.z;

    // Broadcast updated position to all other players
    socket.broadcast.emit('playerMoved', {
        id: socket.id,
        x: data.x,
        y: data.y,
        z: data.z
    });
});
```

Finally, we need to handle player disconnects. We can do this by listening for the `disconnect` event on the socket.

```javascript
// Handle disconnections
socket.on('disconnect', () => {
    console.log(`Client disconnected: ${socket.id}`);
    if (!players[socket.id]) return;
    delete players[socket.id];
    // Notify other players to remove this player
    socket.broadcast.emit('killPlayer', socket.id);
});
```

Let's review the full and final server code:

```javascript
const http = require('http');
const { Server } = require('socket.io');

/** 
 * Class to track each connected player (id + position)
 */
class Player {
    constructor(id) {
        this.id = id;
        this.x = 0;
        this.y = 0;
        this.z = 0;
    }
}

const server = http.createServer();

// Configure Socket.IO with CORS
const io = new Server(server, {
    cors: {
        // If you only want to allow PlayCanvas launch domain:
        // origin: "https://launch.playcanvas.com",

        // Or allow all origins (less secure, but quick for testing)
        origin: "*",
        methods: ["GET", "POST"]
    }
});

const players = {};

/**
 * Handle new socket connections
 */
io.on('connection', (socket) => {
    console.log(`New client connected: ${socket.id}`);

    // Fired when the client is ready to initialize their Player object
    socket.on('initialize', () => {
        const newPlayer = new Player(socket.id);
        players[socket.id] = newPlayer;

        // Send to this client its own ID and the current list of players
        socket.emit('playerData', { id: socket.id, players });

        // Tell everyone else about this new player
        socket.broadcast.emit('playerJoined', newPlayer);
    });

    // Update player position
    socket.on('positionUpdate', (data) => {
        if (!players[socket.id]) return;
        players[socket.id].x = data.x;
        players[socket.id].y = data.y;
        players[socket.id].z = data.z;

        // Broadcast updated position to all other players
        socket.broadcast.emit('playerMoved', {
            id: socket.id,
            x: data.x,
            y: data.y,
            z: data.z
        });
    });

    // Handle disconnections
    socket.on('disconnect', () => {
        console.log(`Client disconnected: ${socket.id}`);
        if (!players[socket.id]) return;
        delete players[socket.id];
        // Notify other players to remove this player
        socket.broadcast.emit('killPlayer', socket.id);
    });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});
```

## Conclusion

That's about it! If you'd like, try adding some of these ideas on your own:

* Players are removed when they close the game.
* Adding respawning functionality for when players fall off the edge.

Keep in mind this is only a very basic implementation of multiplayer. Realistically, when creating larger multiplayer games you'll want to consider using an authoritative server, instead of handling all the game logic on the client. You can read a more in depth tutorial about [how Socket.io works and how to develop multiplayer in JavaScript here](https://code.tutsplus.com/create-a-multiplayer-pirate-shooter-game-in-your-browser--cms-23311t).

You can find the [full server code on Glitch here](https://glitch.com/edit/#!/playcanvas-multiplayer-server), where you can also fork it and extend it.
