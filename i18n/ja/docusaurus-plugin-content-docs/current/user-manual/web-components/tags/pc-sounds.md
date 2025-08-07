---
title: <pc-sounds>
---

`<pc-sounds>`タグはサウンドコンポーネントを定義するために使用されます。

:::note[使用法]

* [`<pc-entity>`](../pc-entity) の直接の子である必要があります。
* 0..n個の[`<pc-sound>`](../pc-sound) 子を持つことができます。

:::

## 属性

<div className="attribute-table">

| 属性 | タイプ | デフォルト | 説明 |
| --- | --- | --- | --- |
| `distance-model` | Enum | `"linear"` | 距離減衰モデル: `"exponential"` \| `"inverse"` \| `"linear"` |
| `enabled` | Boolean | `"true"` | コンポーネントの有効状態 |
| `max-distance` | Number | `"10000"` | オーディオ減衰の最大距離 |
| `pitch` | Number | `"1"` | このコンポーネント内のすべてのサウンドのピッチ乗数 |
| `positional` | Flag | - | サウンドが位置情報を持つか (3D空間オーディオ) |
| `ref-distance` | Number | `"1"` | 最大音量の基準距離 |
| `roll-off-factor` | Number | `"1"` | 距離減衰の減衰率ファクター |
| `volume` | Number | `"1"` | このコンポーネント内のすべてのサウンドのマスターボリューム |

</div>

## 例

```html
<pc-entity>
    <pc-sounds>
        <pc-sound asset="music"></pc-sound>
    </pc-sounds>
</pc-entity>
```

## JavaScriptインターフェース

[SoundComponentElement API](https://api.playcanvas.com/web-components/classes/SoundComponentElement.html)を使用して、`<pc-sounds>`要素をプログラムで作成および操作できます。
