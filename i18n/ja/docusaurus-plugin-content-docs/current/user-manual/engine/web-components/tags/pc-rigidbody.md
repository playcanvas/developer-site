---
title: <pc-rigidbody>
---

`<pc-rigidbody>`タグは、剛体コンポーネントを定義するために使用されます。

:::note

* [`<pc-entity>`](../pc-entity)の直接の子である必要があります。
* [`<pc-collision>`](../pc-collision)コンポーネントの兄弟である必要があります。
* ammo.js WebAssembly モジュールは、[`<pc-module>`](../pc-module)タグを介してロードされている必要があります。

:::

## 属性

<div className="nowrap-first-col">

| 属性 | 説明 |
| --- | --- |
| `angular-damping` | 剛体の角減衰です。指定しない場合、`0` が使用されます。 |
| `angular-factor` | 剛体の角係数です。X、Y、Z の値をスペース区切りリストで指定します。指定しない場合、`1 1 1` が使用されます。 |
| `friction` | 剛体の摩擦です。指定しない場合、`0.5` が使用されます。 |
| `linear-damping` | 剛体の線形減衰です。指定しない場合、`0` が使用されます。 |
| `linear-factor` | 剛体の線形係数です。X、Y、Z の値をスペース区切りリストで指定します。指定しない場合、`1 1 1` が使用されます。 |
| `mass` | 剛体の質量です。指定しない場合、`1` が使用されます。 |
| `restitution` | 剛体の反発係数です。指定しない場合、`0` が使用されます。 |
| `rolling-friction` | 剛体の転がり摩擦です。指定しない場合、`0` が使用されます。 |
| `type` | 剛体コンポーネントのタイプです。`static`、`kinematic`、または `dynamic` のいずれかです。 |

</div>

## Example

import CodePenEmbed from '@site/src/components/CodePenEmbed';

<CodePenEmbed id="XJrqjJr" title="<pc-rigidbody> の例" />

## JavaScript Interface

[RigidBodyComponentElement API](https://api.playcanvas.com/classes/EngineWebComponents.RigidBodyComponentElement.html) を使用して、`<pc-rigidbody>`要素をプログラムで作成および操作できます。
