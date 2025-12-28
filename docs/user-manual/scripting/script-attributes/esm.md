---
title: ESM Reference
---

:::note

This page documents Script Attributes for the recommended **ESM Scripts** system.

For **Classic Script Attributes**, click [here](./classic.md).

:::

## What are Attributes?

Attributes are a powerful feature that allow you to expose specific parameters to the Editor.

This means you can write code once, then tweak values on different instances to give them different properties. Artists, designers or other non-programmer team members can then adjust and modify them without writing code.

Let's start with a simple rotate script example.

```javascript
import { Script } from 'playcanvas';

export class Rotator extends Script {
    static scriptName = 'rotator';

    /**
     * You can now set the `speed` property dynamically in the Editor.
     *
     * @attribute
     */
    speed = 2;

    update(dt){
        this.entity.rotateLocal(0, this.speed * dt, 0);
    }
}
```

In this example the script simply rotates the entity according to its speed, but what value is speed?

The `@attribute` tag above the `speed` member promotes it to an attribute. When attached to an entity, the Editor creates controls that allow you to dynamically set the value of `speed` at runtime for each entity it's attached to.

What this means in practice is that you can expose various members of a script to the Editor and create controls to edit their values at run-time.

![Attribute](/img/user-manual/scripting/attribute-basic.png)

Because `speed` is simply a class member, you can access it as you would any other member.

```javascript
update(dt) {
    this.entity.rotateLocal(0, this.speed, 0);
}
```

## Attributes in the Editor

![Script Attributes](/img/user-manual/scripting/script-attributes.png)

Once you've declared your attributes, the Editor needs to parse the code in order to expose the script attributes. If attributes have been changed, you need to manually refresh the attributes by clicking the parse button.

![Parse Button](/img/user-manual/scripting/script-parse-button.png)

When you expose an attribute to the Editor, you can also surface additional information that helps provide context and present more specific controls. This can help create a better user experience for your scripts.

### Attribute Descriptions

The first sentence of an `@attribute` comment block is used as a description in the Editor. This is a useful way to surface contextual information on what the attribute is and how it behaves.

```javascript
/**
 * Sets the speed of the Y rotation in degrees.
 *
 * @attribute
 */
speed = 2;
```

In the Editor, this is available as a tooltip.

![Attribute Description](/img/user-manual/scripting/attribute-description.png)

### Attribute Titles

By default, attribute names are displayed in the Editor using the property name. You can override this with a custom display name using the `@title` tag:

```javascript
/**
 * @attribute
 * @title Rotation Speed
 */
speed = 2;
```

This will display "Rotation Speed" in the Editor instead of "speed".

## Responding to Attribute Changes

In ESM scripts, you can use JavaScript getters and setters to execute custom logic whenever an attribute value changes. This is useful for updating visuals, triggering events, or performing validation when a value is modified.

```javascript
import { Script } from 'playcanvas';

export class Lamp extends Script {
    static scriptName = 'lamp';

    _brightness = 1;

    /**
     * @attribute
     */
    get brightness() {
        return this._brightness;
    }

    set brightness(value) {
        this._brightness = value;
        // Update the light intensity whenever brightness changes
        this.entity.light.intensity = value;
    }
}
```

In this example, when the `brightness` attribute is modified in the Editor (or at runtime), the setter automatically updates the light's intensity.

:::note

The `@attribute` JSDoc block only needs to be declared once, before the getter/setter pair.

:::

## Attribute Types

When you expose a script member as an attribute, the Editor will show a control that's relevant to the type of attribute. If the attribute is a number, it shows a numerical input; if it's a boolean, a checkbox.

An attribute can be a `number`, `string`, `boolean`, `Vec2`, `Vec3`, `Vec4`, `Entity`, `Asset` or `Color`.

### The @type Tag

In some situations you won't actually know an attribute's initial value ahead of time. For example, if you want to define an asset attribute on a script, you won't necessarily have an initial value. In these situations, where a value isn't known ahead of time, but its type is, you can use the JSDoc `@type` tag.

```javascript
/**
 * @attribute
 * @type {Asset}
 */
myTexture;
```

:::warning

An attribute must either be initialized with a value `speed = 10`, or have a JSDoc type `@type {number}`. If neither are present, the attribute will be ignored.

:::

### Number Type

A number attribute displays a numerical input in the Editor:

```javascript
/** @attribute */
speed = 10;
```

You can also define a sensible range of values using the `@range` tag:

```javascript
/** 
 * @attribute
 * @range [0, 10]
 */
speed = 10;
```

This tells the Editor that the value should be within 0 - 10. The Editor will create a numerical slider mapped to this range.

![Attribute Constraint](/img/user-manual/scripting/attribute-constraint.png)

There are additional numerical constraints that help the Editor limit the set of possible values:

```javascript
/** 
 * @attribute
 * @range [0, 10]
 * @precision 0.1
 * @step 0.05
 */
speed = 10;
```

### String Type

A string attribute displays a text input in the Editor:

```javascript
/** @attribute */
name = 'Player';
```

You can also use the `@placeholder` tag to display hint text when the field is empty:

```javascript
/**
 * @attribute
 * @placeholder Enter player name
 */
name = '';
```

### Boolean Type

A boolean attribute displays a checkbox in the Editor:

```javascript
/** @attribute */
enabled = true;
```

### Entity Attribute

The Entity type lets you reference another entity in your hierarchy. A great way to link two entities together.

```javascript
/**
 * @attribute
 * @type {Entity}
 */
target;
```

:::important

You must import `Entity` from `playcanvas` for your attribute to parse correctly.

:::

### Asset Attribute

The Asset attribute lets you reference a project asset in your script.

The `@resource` tag limits the asset picker in the Editor to only accept assets of a particular type. Valid values are: `animation`, `animstategraph`, `audio`, `binary`, `container`, `css`, `cubemap`, `font`, `gsplat`, `html`, `json`, `material`, `model`, `render`, `script`, `shader`, `sprite`, `template`, `text`, `texture`, `textureAtlas`, `wasm`.

The runtime type of an Asset attribute is `Asset`. You can reference the resource of an Asset attribute at runtime like so:

```javascript
/**
 * @attribute
 * @type {Asset}
 * @resource texture
 */
texture;

initialize() {
    console.log('This is the texture asset', this.texture);
    console.log('This is the texture resource', this.texture.resource);
}
```

:::important

You must import `Asset` from `playcanvas` for your attribute to parse correctly.

:::

### Color Attribute

```javascript
/** @attribute */
color = new Color();
```

:::important

You must import `Color` from `playcanvas` for your attribute to parse correctly.

:::

The color attribute shows a color picker when exposed in the Editor. There are two options `rgb` and `rgba` depending on whether you wish to expose the alpha channel as well.

### Vector Attribute

```javascript
/** @attribute */
position = new Vec3();
```

:::important

You must import `Vec2`/`Vec3`/`Vec4` from `playcanvas` for your attribute to parse correctly.

:::

The vector attribute can be 2, 3, or 4 dimensions. The Editor will show a numerical input for each component, allowing you to set each one independently.

![Attribute Vector](/img/user-manual/scripting/attribute-vec3.png)

### Curve Attribute

```javascript
/**
 * @attribute
 * @type {Curve}
 * @color rgba
 */
wave;
```

:::important

You must import `Curve` from `playcanvas` for your attribute to parse correctly.

:::

The curve attribute is used to express a value that changes over a time period. All curves are defined over the period 0.0 - 1.0. You can define multiple curves. For example, if you wish to have a 3D position from a curve, define three curves for x, y, z using the `curves` property. There is also a special curve editor for modifying colors using the `color` property.

### Attribute Arrays

In some cases you may want to expose a list of grouped attributes together. Let's say you have a script that generates a gradient, but rather than having a start and end point, you want to allow users to set an arbitrary amount of 'color stops' on the gradient. In this case you can use an array qualifier in a `@type` tag.

```javascript
/**
 * @attribute
 * @type {Color[]}
 */
gradientStops;
```

The `Color[]` declaration uses the [jsdoc type tag](https://jsdoc.app/tags-type) to declare that `gradientStops` is an array of `Colors`. The Editor will interpret it this way, creating a controller that allows you to set multiple `Color` values in a list.

![Attribute Array](/img/user-manual/scripting/attribute-array.png)

In your initialize or update loop, you can iterate over `gradientStops` as an array:

```javascript
initialize() {
    this.gradientStops.forEach(color => {
        console.log('This is a Color class', color);
    });
}
```

### Enumerations

Sometimes you may want to constrain an attribute to a set of possible values. In this situation you can use the `@enum` tag. This uses an enumeration as a value for the attribute, making the Editor display a combo box constrained to the list of possible values:

```javascript

/** @enum {number} */
const Lights = {
    ON: 1,
    OFF: 0,
    UNKNOWN: 0.5
};

class MyScript extends Script {
    static scriptName = 'myScript';

    /**
     * @attribute
     * @type {Lights}
     */
    ambient = Lights.OFF;
}
```

This uses the `Lights` class as an enumeration of possible values. The `@type {Lights}` indicates that `ambient` should only have a value listed in `Lights`. At author-time the Editor will generate a drop-down control using the Lights enumeration keys as labels (ON/OFF/UNKNOWN) and setting the corresponding value on `ambient`. An enumerator's values can only be numbers, strings, or booleans.

![Attribute Enumerations](/img/user-manual/scripting/attribute-enum.png)

## Conditional Attributes

Every attribute in your script creates a corresponding UI control in the Editor. In some cases, you may want to hide or disable certain controls based on the values of other attributes.

Let’s walk through an example:

```javascript
export class Delorean extends Script {
    static scriptName = 'delorean';

    /**
     * @attribute
     */
    power = false;

    /** 
     * @attribute
     */
    speed = 10;
}
```

This will create a checkbox for power and a slider for speed. But what if we want to prevent users from adjusting the speed unless power is turned on?

We can achieve this by using the `@enabledif` tag:

```javascript
export class Delorean extends Script {
    static scriptName = 'delorean';

    /**
     * @attribute
     */
    power = false;

    /** 
     * @attribute
     * @enabledif {power}
     */
    speed = 10;
}
```

Now, the speed slider will only be enabled when power is `true`.

### Expression-Based Conditions

You can also use more expressive conditions. If the condition evaluates to a [truthy](https://developer.mozilla.org/en-US/docs/Glossary/Truthy) value, the control is enabled.

```javascript
export class Delorean extends Script {
    static scriptName = 'delorean';

    /**
     * @attribute
     */
    power = false;

    /** 
     * @attribute
     * @enabledif {power}
     */
    speed = 10;

    /**
     * @attribute
     * @visibleif {speed > 88.8}
     */
    enableFluxCapacitor = true;
}
```

In this case:

- The `speed` slider is only enabled if power is on.
- The `enableFluxCapacitor` checkbox is only *visible* when `speed` is greater than `88.8`.

This allows for rich, dynamic Editor interfaces based on script state.

#### Example in Action

<video autoPlay muted loop controls src='/video/conditional-attribtues.mp4' style={{width: '100%', height: 'auto'}} />

## Grouping Attributes

In some situations you may want to logically group attributes together. For example, let's say you have a `GameLogic` Script with an enemy with speed and power. Rather than declare the attributes individually, it makes sense to group them together under one `enemy` attribute. You can do this with **Attribute Groups**.

Attribute groups are essentially objects that contain sub-attributes:

```javascript
class GameLogic extends Script {
    static scriptName = 'gameLogic';

    /** 
     * @attribute 
     * `power` and `speed` are exposed as sub attributes
     */
    enemy = { power: 10, speed: 3 };

    initialize() {
        console.log(this.enemy.speed); // 3
        console.log(this.enemy.power); // 10
    }
}
```

This defines `enemy` as an Attribute Group. The Editor will expose the enemy attribute with nested controllable power and speed sub-attributes. It provides a more flexible way to logically group attributes together.

:::tip
Attribute Groups allow you to logically group together related attributes into an object-based structure.
:::

There are different ways you can declare Attribute Groups. You can use Inline Attribute Groups or TypeDef Groups.

### Inline Group

A simple inline way of declaring attribute groups:

```javascript
class GameLogic extends Script {
    static scriptName = 'gameLogic';

    /** @attribute */
    enemy = { power: 10, speed: 3 };
}
```

### TypeDef Groups

This is a more modular way of declaring Attribute Groups. Whilst it is more verbose than using the inline version, the typedef version is more modular and can be used across multiple scripts and attributes.

```javascript
/**
 * @typedef {Object} Enemy
 * @prop {number} speed - The enemy's speed
 * @prop {number} power - The enemy's power
 */

class GameLogic extends Script {
    static scriptName = 'gameLogic';

    /** 
     * @attribute 
     * @type {Enemy}
     */
    enemy;
}
```

### Interface Attributes

If you want to group attributes together and set individual constraints on its members, you can use an Interface Attribute. This provides a more flexible way of grouping attributes.

```javascript
/** @interface */
class Enemy {
    /**
     * @range [0, 11]
     */
    power = 10;

    speed = 3;
}

class GameLogic extends Script {
    static scriptName = 'gameLogic';

    /**
     * @attribute 
     * @type {Enemy}
     */
    enemy;
}
```

In the above example we've created a new `Enemy` Interface with a power member constrained within *0 - 11* range. We've also declared that the `GameLogic` Script has an attribute `enemy` which is of type `Enemy`.

:::tip
An *Interface Attribute* allows you to both logically group attributes together and set constraints on individual sub-attributes. It also allows you to modularize your code.
:::

#### Rules of Interface Attributes

There are a number of requirements to use Interface Attributes.

- An Interface Attribute must have an `/** @interface */` block comment before a class declaration
- A Script Attribute must use an Interface Attribute using the `@type {InterfaceAttribute}` tag
- All public members of an Interface Attribute are available to the Editor and will be used. You do not need to use the `@attribute` tag on each member.
- You cannot have nested Interface Attributes.

### Interface Attribute Arrays

Interface attributes can be used as arrays, just like plain attributes. This means that your `GameLogic` script can use an array of enemies, each with their own controllable power and speed properties.

```javascript
class GameLogic extends Script {
    static scriptName = 'gameLogic';

    /**
     * @attribute
     * @type {Enemy[]}
     */
    enemies;

    update(dt) {
        this.enemies.forEach(({ power, speed }) => {
            this.updateEnemy(power, speed);
        })
    }
}
```

This creates an array of Enemy controls in the Editor, each with its own numerical controls for the sub-attributes.

![Attribute Complex Arrays](/img/user-manual/scripting/attribute-complex-arrays.png)
