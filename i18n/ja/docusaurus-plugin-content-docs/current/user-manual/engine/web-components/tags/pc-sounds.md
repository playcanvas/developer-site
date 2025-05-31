---
title: <pc-sounds>
---

`<pc-sounds>`タグは、サウンドコンポーネントを定義するために使用されます。

:::note

* これは、[`<pc-entity>`](../pc-entity)の直接の子である必要があります。
* これは0個以上の[`<pc-sound>`](../pc-sound)の子要素を持つことができます。

:::

## 属性

| 属性 | 説明 |
| --- | --- |
| `distance-model` | サウンドの距離モデル。`exponential`、`inverse`、または`linear`を指定できます。指定しない場合、`linear`が使用されます。 |
| `pitch` | サウンドのピッチ。指定しない場合、`1`が使用されます。 |
| `max-distance` | リスナーからの最大距離で、ここでオーディオの減衰が停止します。指定しない場合、`10000`が使用されます。 |
| `positional` | 値を持たない属性。存在する場合、サウンドは位置情報を持つものになります。 |
| `ref-distance` | リスナーからの距離で、ここで音量が最大になります。指定しない場合、`1`が使用されます。 |
| `roll-off-factor` | 減衰式で使用される係数。指定しない場合、`1`が使用されます。 |
| `volume` | サウンドの音量。指定しない場合、`1`が使用されます。 |

## 例

```html
<pc-entity>
    <pc-sounds>
        <pc-sound asset="music"></pc-sound>
    </pc-sounds>
</pc-entity>
```

## JavaScriptインターフェース

[SoundComponentElement API](https://api.playcanvas.com/classes/EngineWebComponents.SoundComponentElement.html)を使用して、プログラムによって`<pc-sounds>`要素を作成および操作できます。
