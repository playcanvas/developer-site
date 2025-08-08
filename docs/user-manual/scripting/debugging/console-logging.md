---
title: Console Logging
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

One of the most fundamental and indispensable tools for debugging your PlayCanvas scripts is the Browser Developer Console. Every modern web browser includes a suite of developer tools, and the console is your window into logging information, viewing errors, and understanding what your code is doing behind the scenes.

## What is the Console?

The console is a command-line interface within your browser's developer tools that:

* **Displays Log Messages:** You can print messages, variable values, and object states directly from your JavaScript code.
* **Shows Errors and Warnings:** JavaScript errors, engine warnings, and explicit error messages you log will appear here, often with stack traces to help pinpoint the source.
* **Allows Interaction:** You can execute JavaScript commands directly in the console to inspect the state of your running application (more advanced).

## Opening the Console

How you open the developer console depends on your browser, but here are common methods:

* **Keyboard Shortcut:** Press F12 on Windows/Linux or Option + Command + J (⌥ + ⌘ + J) on macOS (Chrome/Edge/Firefox). Safari uses Option + Command + C (⌥ + ⌘ + C), but you might need to enable the Develop menu first (Preferences > Advanced > Show Develop menu in menu bar).
* **Right-Click Menu:** Right-click anywhere on your running PlayCanvas application page and select "Inspect" or "Inspect Element". Then, navigate to the "Console" tab in the tools that appear.
* **Browser Menu:** Look for "Developer Tools", "Web Developer", or similar options in your browser's main menu (e.g., Chrome: More Tools > Developer Tools).

## Logging Messages from Your Scripts

The primary way to send information to the console is using the global console object available in JavaScript. You'll typically use these methods within your PlayCanvas script functions (`initialize`, `update`, event handlers, etc.).

### `console.log()`

This is the most common method, used for general informational output.

* **Purpose:** Log status messages, variable values, check if a function is being called.

**Example:**

<Tabs>
<TabItem value="esm" label="ESM">

```javascript
import { Script, KEY_SPACE } from 'playcanvas';

export class MyLogger extends Script {
    static scriptName = 'myLogger';

    initialize() {
        console.log('MyLogger script initialized on entity:', this.entity.name);
        const initialPosition = this.entity.getPosition();
        console.log('Initial Position:', initialPosition.toString());
    }

    update(dt) {
        if (this.app.keyboard.wasPressed(KEY_SPACE)) {
            console.log('Spacebar pressed!');
        }
    }
}
```

</TabItem>
<TabItem value="classic" label="Classic">

```javascript
var MyLogger = pc.createScript('myLogger');

MyLogger.prototype.initialize = function() {
    console.log('MyLogger script initialized on entity:', this.entity.name);
    var initialPosition = this.entity.getPosition();
    console.log('Initial Position:', initialPosition.toString());
};

MyLogger.prototype.update = function(dt) {
    if (this.app.keyboard.wasPressed(pc.KEY_SPACE)) {
        console.log('Spacebar pressed!');
    }
};
```

</TabItem>
</Tabs>

### `console.warn()`

Used to indicate potential problems or situations that aren't errors but might be unexpected.

* **Purpose:** Highlight non-critical issues, deprecated usage warnings, or suspicious values.
* **Appearance:** Messages typically appear with a yellow background or icon in the console.

**Example:**

```javascript
// Inside some function
if (speed < 0) {
    console.warn('Warning: Speed is negative (' + speed + '). Is this intentional?');
}
```

### `console.error()`

Used for logging actual errors that prevent code from working correctly. PlayCanvas engine errors also use this.

* **Purpose:** Report errors found in your logic, failed operations, or critical failures.
* **Appearance:** Messages typically appear with a red background or icon and often include a stack trace (the sequence of function calls leading to the error).

**Example:**

<Tabs>
<TabItem value="esm" label="ESM">

```javascript
initialize() {
    this.targetEntity = this.app.root.findByName('RequiredTarget');
    if (!this.targetEntity) {
        console.error('Critical Error: Could not find RequiredTarget entity! Disabling script.', this.entity.name);
        this.enabled = false; // Stop the script from running further
    }
}
```

</TabItem>
<TabItem value="classic" label="Classic">

```javascript
MyScript.prototype.initialize = function() {
    this.targetEntity = this.app.root.findByName('RequiredTarget');
    if (!this.targetEntity) {
        console.error('Critical Error: Could not find RequiredTarget entity! Disabling script.', this.entity.name);
        this.enabled = false; // Stop the script from running further
    }
};
```

</TabItem>
</Tabs>

### Other Methods

* `console.info()`: Similar to `console.log()`, sometimes styled differently (e.g., with an 'i' icon).
* `console.debug()`: Often hidden by default in console settings, useful for verbose debugging messages you don't always want to see.

### Logging Different Data Types

You can log more than just strings:

* **Variables:** `console.log('Player health:', this.health);`
* **Objects and Arrays:** `console.log('My Entity:', this.entity);`, `console.log('Children:', this.entity.children);`
  * Most browser consoles allow you to interactively inspect logged objects and arrays, expanding them to see their properties and values. This is incredibly useful for examining complex data like Entities, Components, or Materials.

## Where Does the Output Go?

Whether you launch your application using the Launch button in the PlayCanvas Editor or run a published build, the console output always appears in your browser's developer console, not within the Editor interface itself. Keep the developer tools open while testing!

## Tips for Effective Logging

* **Be Specific:** Instead of `console.log('here');`, log what is happening or the value you're interested in: `console.log('Player jumped!', this.entity.getPosition());`.
* **Provide Context:** Especially with multiple scripts or entities, include identifying information: `console.log(this.entity.name + ': Firing weapon.');`
* **Log Key Values:** Output variables, function arguments, and return values at critical points to trace data flow.
* **Use Different Levels:** Use `log`, `warn`, and `error` appropriately to make important messages stand out.
* **Conditional Logging:** Use `if` statements to log only when specific conditions occur, reducing console spam.
* **Clean Up Your Logs:** Remove temporary or excessive `console.log` statements before considering your code finished, or use `console.debug` for logs you might want later but not normally see.

## Conclusion

The browser console is your first line of defense when debugging. Mastering `console.log` and its variations is a fundamental skill that will save you countless hours trying to figure out why your scripts aren't behaving as expected. Get comfortable opening it, logging information, and interpreting the output!
