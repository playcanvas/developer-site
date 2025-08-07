---
title: <pc-collision>
---

`<pc-collision>`タグは、衝突コンポーネントを定義するために使用されます。

:::note[使用法]

* [`<pc-entity>`](../pc-entity)の直接の子である必要があります。

:::

## 属性

<div className="attribute-table">

| 属性 | タイプ | デフォルト | 説明 |
| --- | --- | --- | --- |
| `axis` | Number | `"1"` | 円柱/カプセル形状の軸 (0=X, 1=Y, 2=Z) |
| `convex-hull` | Flag | - | メッシュ衝突に凸包を使用するかどうか |
| `enabled` | Boolean | `"true"` | コンポーネントの有効状態 |
| `half-extents` | Vector3 | `"0.5 0.5 0.5"` | ボックス衝突の半範囲を「X Y Z」値で指定 |
| `height` | Number | `"2"` | 円柱/カプセル衝突形状の高さ |
| `radius` | Number | `"0.5"` | 球/円柱/カプセル衝突形状の半径 |
| `type` | Enum | `"box"` | 衝突形状: `"box"` \| `"capsule"` \| `"cone"` \| `"cylinder"` \| `"sphere"` |

</div>

## 例

```html
<!-- 静的な1x1x1ボックス -->
<pc-entity>
    <pc-render type="box"></pc-render>
    <pc-collision></pc-collision>
    <pc-rigidbody></pc-rigidbody>
</pc-entity>

<!-- 半径0.5の動的な球 -->
<pc-entity>
    <pc-render type="sphere"></pc-render>
    <pc-collision type="sphere"></pc-collision>
    <pc-rigidbody type="dynamic"></pc-rigidbody>
</pc-entity>
```

## JavaScriptインターフェース

[CollisionComponentElement API](https://api.playcanvas.com/web-components/classes/CollisionComponentElement.html)を使用して、`<pc-collision>`要素をプログラムで作成および操作できます。
