---
title: <pc-rigidbody>
---

`<pc-rigidbody>`タグは、リジッドボディコンポーネントを定義するために使用されます。

:::note[使用法]

* [`<pc-entity>`](../pc-entity)の直接の子要素である必要があります。
* [`<pc-collision>`](../pc-collision)コンポーネントの兄弟要素である必要があります。
* ammo.js WebAssemblyモジュールは、[`<pc-module>`](../pc-module)タグを介してロードされている必要があります。

:::

## 属性

<div className="attribute-table">

| 属性 | タイプ | デフォルト | 説明 |
| --- | --- | --- | --- |
| `angular-damping` | Number | `"0"` | 角速度の減衰係数 |
| `angular-factor` | Vector3 | `"1 1 1"` | 角運動の制約を「X Y Z」値で指定 |
| `enabled` | Boolean | `"true"` | コンポーネントの有効状態 |
| `friction` | Number | `"0.5"` | 表面摩擦係数 |
| `linear-damping` | Number | `"0"` | 線速度の減衰係数 |
| `linear-factor` | Vector3 | `"1 1 1"` | 線形運動の制約を「X Y Z」値で指定 |
| `mass` | Number | `"1"` | リジッドボディの質量（キログラム単位） |
| `restitution` | Number | `"0"` | 反発/弾性係数 (0-1) |
| `rolling-friction` | Number | `"0"` | 転がり抵抗係数 |
| `type` | Enum | `"static"` | 物理ボディタイプ: `"static"` \| `"kinematic"` \| `"dynamic"` |

</div>

## 例

import CodePenEmbed from '@site/src/components/CodePenEmbed';

<CodePenEmbed id="XJrqjJr" title="<pc-rigidbody> の例" />

## JavaScriptインターフェース

[RigidBodyComponentElement API](https://api.playcanvas.com/web-components/classes/RigidBodyComponentElement.html)を使用して、`<pc-rigidbody>`要素をプログラムで作成および操作できます。
