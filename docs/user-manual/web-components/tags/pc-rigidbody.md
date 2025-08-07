---
title: <pc-rigidbody>
---

The `<pc-rigidbody>` tag is used to define a rigidbody component.

:::note[Usage]

* It must be a direct child of a [`<pc-entity>`](../pc-entity).
* It must be a sibling of a [`<pc-collision>`](../pc-collision) component.
* The ammo.js WebAssembly module must be loaded via a [`<pc-module>`](../pc-module) tag.

:::

## Attributes

<div className="attribute-table">

| Attribute | Type | Default | Description |
| --- | --- | --- | --- |
| `angular-damping` | Number | `"0"` | Angular velocity damping factor |
| `angular-factor` | Vector3 | `"1 1 1"` | Angular movement constraints as "X Y Z" values |
| `enabled` | Boolean | `"true"` | Enabled state of the component |
| `friction` | Number | `"0.5"` | Surface friction coefficient |
| `linear-damping` | Number | `"0"` | Linear velocity damping factor |
| `linear-factor` | Vector3 | `"1 1 1"` | Linear movement constraints as "X Y Z" values |
| `mass` | Number | `"1"` | Mass of the rigidbody in kilograms |
| `restitution` | Number | `"0"` | Bounce/elasticity coefficient (0-1) |
| `rolling-friction` | Number | `"0"` | Rolling resistance coefficient |
| `type` | Enum | `"static"` | Physics body type: `"static"` \| `"kinematic"` \| `"dynamic"` |

</div>

## Example

import CodePenEmbed from '@site/src/components/CodePenEmbed';

<CodePenEmbed id="XJrqjJr" title="<pc-rigidbody> example" />

## JavaScript Interface

You can programmatically create and manipulate `<pc-rigidbody>` elements using the [RigidBodyComponentElement API](https://api.playcanvas.com/web-components/classes/RigidBodyComponentElement.html).
