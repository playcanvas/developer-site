---
title: <pc-rigidbody>
---

The `<pc-rigidbody>` tag is used to define a rigidbody component.

:::note

* It must be a direct child of a [`<pc-entity>`](../pc-entity).
* It must be a sibling of a [`<pc-collision>`](../pc-collision) component.
* The ammo.js WebAssembly module must be loaded via a [`<pc-module>`](../pc-module) tag.

:::

## Attributes

<div className="nowrap-first-col">

| Attribute | Description |
| --- | --- |
| `angular-damping` | The angular damping of the rigidbody. If not specified, `0` is used. |
| `angular-factor` | The angular factor of the rigidbody. Specified as a space-separated list of X, Y, and Z values. If not specified, `1 1 1` is used. |
| `friction` | The friction of the rigidbody. If not specified, `0.5` is used. |
| `linear-damping` | The linear damping of the rigidbody. If not specified, `0` is used. |
| `linear-factor` | The linear factor of the rigidbody. Specified as a space-separated list of X, Y, and Z values. If not specified, `1 1 1` is used. |
| `mass` | The mass of the rigidbody. If not specified, `1` is used. |
| `restitution` | The restitution of the rigidbody. If not specified, `0` is used. |
| `rolling-friction` | The rolling friction of the rigidbody. If not specified, `0` is used. |
| `type` | The type of rigidbody component. Can be `static`, `kinematic` or `dynamic`. |

</div>

## Example

import CodePenEmbed from '@site/src/components/CodePenEmbed';

<CodePenEmbed id="XJrqjJr" title="<pc-rigidbody> example" />

## JavaScript Interface

You can programmatically create and manipulate `<pc-rigidbody>` elements using the [RigidBodyComponentElement API](https://api.playcanvas.com/classes/EngineWebComponents.RigidBodyComponentElement.html).
