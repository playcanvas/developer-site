---
title: <pc-collision>
---

`<pc-collision>`タグは、衝突コンポーネントを定義するために使用されます。

:::note

* [`<pc-entity>`](../pc-entity)の直接の子である必要があります。

:::

## 属性

<div className="nowrap-first-col">

| 属性 | 説明 |
| --- | --- |
| `axis` | 衝突コンポーネントの軸。指定しない場合、`1` (Y軸) が使用されます。 |
| `convex-hull` | 値のない属性。存在する場合、衝突コンポーネントは凸包を使用します。 |
| `enabled` | コンポーネントの有効状態。指定されていない場合、`true`が使用されます。 |
| `half-extents` | 衝突コンポーネントのハーフエクステント。X、Y、Z の値をスペース区切りで指定します。指定しない場合、`0.5 0.5 0.5` が使用されます。 |
| `height` | 衝突コンポーネントの高さ。指定しない場合、`2` が使用されます。 |
| `radius` | 衝突コンポーネントの半径。指定しない場合、`0.5` が使用されます。 |
| `type` | 衝突コンポーネントのタイプ。`box`、`capsule`、`cone`、`cylinder`、または `sphere` のいずれかです。指定しない場合、`box` が使用されます。 |

</div>

## 例

```html
<!-- 静的1x1x1ボックス -->
<pc-entity>
    <pc-render type="box"></pc-render>
    <pc-collision></pc-collision>
    <pc-rigidbody></pc-rigidbody>
</pc-entity>

<!-- 半径0.5の動的球 -->
<pc-entity>
    <pc-render type="sphere"></pc-render>
    <pc-collision type="sphere"></pc-collision>
    <pc-rigidbody type="dynamic"></pc-rigidbody>
</pc-entity>
```

## JavaScriptインターフェース

[CollisionComponentElement API](https://api.playcanvas.com/web-components/classes/CollisionComponentElement.html)を使用して、`<pc-collision>`要素をプログラムで作成および操作できます。
