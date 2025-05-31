---
title: <pc-asset>
---

`<pc-asset>`タグはアセットを定義するために使用されます。

:::note

* [`<pc-app>`](../pc-app)の直接の子である必要があります。

:::

## 属性

| 属性 | 説明 |
| --- | --- |
| `id` | アセットのIDです。これは、他のタグ（例: [`<pc-sky>`](../pc-sky)）からこのアセットを参照するために使用されます。 |
| `lazy` | 値を持たない属性です。存在する場合、アセットはシーンによって最初に参照されるか、またはEngineのAsset APIを介して明示的に要求されるまでロードされません。 |
| `src` | アセットへのパスです。 |
| `type` | アセットのタイプです。指定されていない場合、タイプはファイル拡張子から推測されます。指定可能な値: `audio`, `binary`, `css`, `container`, `gsplat`, `html`, `json`, `script`, `shader`, `text`, `texture`。 |

## 例

```html
<pc-app>
    <!-- スクリプトアセット -->
    <pc-asset src="assets/scripts/animate.mjs"></pc-asset>
    <!-- GLBアセット -->
    <pc-asset src="assets/models/car.glb" id="car"></pc-asset>
</pc-app>
```

## JavaScriptインターフェース

[AssetElement API](https://api.playcanvas.com/classes/EngineWebComponents.AssetElement.html)を使用して、プログラムで`<pc-asset>`要素を作成および操作できます。
