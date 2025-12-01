---
title: Hot Reloading
---

When you are iterating on a complex project it can be frustrating to have to do a full page refresh every time you make a change to a script. Especially if it takes you a long time to get to the point where you are testing your code. That is where hot-swapping of code comes in.

## How to Use Hot-swapping

Hot-swapping is enabled on a per-script basis. To enable it, all you need to do is implement the `swap()` method in your script.

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs defaultValue="esm" groupId='script-code'>
<TabItem  value="esm" label="ESM">

```javascript
    swap(old) {
        // Recover state here
    }
```

</TabItem>
<TabItem value="classic" label="Classic">

```javascript
MyScript.prototype.swap = function(old) {
    // Recover state here
};
```

</TabItem>
</Tabs>

When a script with a `swap` function is changed in the code editor, any launched applications will reload the script and add it to script registry. Then it creates brand new script instances to swap with the old ones, calling the `swap` method during that process per each instance. The `initialize` method of the script is *not* called again. Instead, the old script instance is passed into the `swap` method and it is up to the developer to ensure that the state of the old script is copied into the new one. Declared script attributes are automatically copied over into the new script instance. It is also important to remove any event listeners from the old instance and re-attach them to the new one.

For example:

<Tabs defaultValue="esm" groupId='script-code'>
<TabItem  value="esm" label="ESM">

```javascript
import { Script, math } from 'playcanvas';

export class Rotator extends Script {
    static scriptName = 'rotator';

    /**
     * @attribute
     */
    xSpeed = 10;

    initialize() {
        // Listen for enable event and call method
        this.on('enable', this._onEnable);

        this.ySpeed = 0;
    }

    swap(old) {
        // xSpeed is an attribute and so is automatically copied

        // Copy the ySpeed property from the old script instance to the new one
        this.ySpeed = old.ySpeed;

        // Remove the old event listener
        old.off('enable', old._onEnable);
        // Add a new event listener
        this.on('enable', this._onEnable);
    }

    _onEnable() {
        // When enabled, randomize the speed
        this.ySpeed = math.random(0, 10);
    }

    update(dt) {
        this.entity.rotate(this.xSpeed * dt, this.ySpeed * dt, 0);
    }
}
```

</TabItem>
<TabItem value="classic" label="Classic">

```javascript
var Rotator = pc.createScript('rotator');

Rotator.attributes.add('xSpeed', { type: 'number', default: 10 });

Rotator.prototype.initialize = function () {
    // Listen for enable event and call method
    this.on('enable', this._onEnable);

    this.ySpeed = 0;
};

Rotator.prototype.swap = function (old) {
    // xSpeed is an attribute and so is automatically copied

    // Copy the ySpeed property from the old script instance to the new one
    this.ySpeed = old.ySpeed;

    // Remove the old event listener
    old.off('enable', old._onEnable);
    // Add a new event listener
    this.on('enable', this._onEnable);
};

Rotator.prototype._onEnable = function () {
    // When enabled randomize the speed
    this.ySpeed = pc.math.random(0, 10);
}

Rotator.prototype.update = function (dt) {
    this.entity.rotate(this.xSpeed * dt, this.ySpeed * dt, 0);
};
```

</TabItem>
</Tabs>

Try changing logic within the `update` method and save the code. The launched application will automatically swap `rotator` script instances with new ones and your application will keep working with the new logic.

The `swap` method is called regardless of the running state of a script instance, so if it was disabled due to an error it can be re-enabled in the `swap` method.
