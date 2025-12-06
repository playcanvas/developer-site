---
title: Events
---

Events are a useful way of communicating between scripts in order to respond to things that happen without checking every frame.

Many PlayCanvas object types (such as script instances) have event handling support built-in, inherited from the Engine's [`EventHandler`][1] class. Event handling objects have the following methods:

* `on()` - registers an event listener.
* `once()` - registers an event listener that unregisters itself after the first time it is called.
* `off()` - unregisters an event listener.
* `fire()` - sends an event.
* `hasEvent()` - queries whether an object is listening on a particular event.

## Using Events

Trigger an event using `fire()`. In this example, the player script fires a `move` event every frame with the `x` and `y` values passed as arguments.

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs defaultValue="esm" groupId='script-code'>
<TabItem  value="esm" label="ESM">

```javascript
import { Script } from 'playcanvas';

export class Player extends Script {
    static scriptName = 'player';

    update(dt) {
        const x = 1;
        const y = 1;
        this.fire('move', x, y);
    }
}
```

</TabItem>
<TabItem value="classic" label="Classic">

```javascript
var Player = pc.createScript('player');

Player.prototype.update = function (dt) {
    const x = 1;
    const y = 1;
    this.fire('move', x, y);
};
```

</TabItem>
</Tabs>

Listen for events firing by using `on()` and `off()`. In this example, the display script listens for the `move` event on the player and prints out the x and y values.

<Tabs defaultValue="esm" groupId='script-code'>
<TabItem value="esm" label="ESM">

```javascript
import { Script } from 'playcanvas';

export class Display extends Script {
    static scriptName = 'display';

    /**
     * @attribute
     * @type {Entity}
     */
    playerEntity;

    initialize() {
        // Method to call when player moves
        const onPlayerMove = (x, y) => {
            console.log(x, y);
        };

        // Listen for the player move event
        if (this.playerEntity && this.playerEntity.script && this.playerEntity.script.player) {
            this.playerEntity.script.player.on('move', onPlayerMove);

            // Remove player move event listeners when script destroyed
            this.playerEntity.script.player.once('destroy', () => {
                this.playerEntity.script.player.off('move', onPlayerMove);
            });
        }
    }
}
```

</TabItem>
<TabItem value="classic" label="Classic">

```javascript
var Display = pc.createScript('display');

// Set up an entity reference for the player entity
Display.attributes.add('playerEntity', { type: 'entity' });

Display.prototype.initialize = function () {
    // Method to call when player moves
    const onPlayerMove = (x, y) => {
        console.log(x, y);
    };

    // Listen for the player move event
    this.playerEntity.script.player.on('move', onPlayerMove);

    // Remove player move event listeners when script destroyed
    this.playerEntity.script.player.once('destroy', () => {
        this.playerEntity.script.player.off('move', onPlayerMove);
    });
};
```

</TabItem>
</Tabs>

## Application Events

There is a very convenient and powerful method of using events to communicate between entities that we call "Application Events". As you can see in the example above, listening for events on specific entities incurs some set up cost. For instance, the listener must have a reference to the specific entity that is firing the event. This works with some cases, but for a more general case we find that it is more appropriate to use the main application (`this.app`) as a central hub for firing events. This means you don't have to keep references of entities around in order to use the events.

This works by firing and listening to all events on `this.app`. By convention, we use namespaces in event names in order to signal event scope and prevent clashes. For example, the `player:move` event is fired on the application instead of firing the `move` event on the player.

Let's try the same example using application events.

Firing the `player:move` event:

<Tabs defaultValue="esm" groupId='script-code'>
<TabItem  value="esm" label="ESM">

```javascript
import { Script } from 'playcanvas';

export class Player extends Script {
    static scriptName = 'player';

    update(dt) {
        var x = 1;
        var y = 1;
        this.app.fire('player:move', x, y);
    }
}

export class Display extends Script {
    static scriptName = 'display';

    initialize() {
        // Method to call when player moves
        const onPlayerMove = (x, y) => {
            console.log(x, y);
        };

        // Listen for the player:move event
        this.app.on('player:move', onPlayerMove);

        // Remove player:move event listeners when script destroyed
        this.on('destroy', () => {
            this.app.off('player:move', onPlayerMove);
        });
    }
}
```

</TabItem>
<TabItem value="classic" label="Classic">

```javascript
var Player = pc.createScript('player');

Player.prototype.update = function (dt) {
    const x = 1;
    const y = 1;
    this.app.fire('player:move', x, y);
};
```

Listening for the `player:move` event:

```javascript
var Display = pc.createScript('display');

Display.prototype.initialize = function () {
    // Method to call when player moves
    const onPlayerMove = (x, y) => {
        console.log(x, y);
    };

    // Listen for the player:move event
    this.app.on('player:move', onPlayerMove);

    // Remove player:move event listeners when script destroyed
    this.on('destroy', function() {
        this.app.off('player:move', onPlayerMove);
    });
};
```

</TabItem>
</Tabs>

As you can see, this reduces the amount of set up and makes for cleaner code.

[1]: https://api.playcanvas.com/engine/classes/EventHandler.html
