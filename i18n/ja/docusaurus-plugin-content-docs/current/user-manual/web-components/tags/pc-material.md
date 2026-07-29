---
title: <pc-material>
description: "pc-material要素のリファレンス: ディフューズカラーとテクスチャマップを持つスタンダードマテリアルを定義し、レンダーコンポーネントからidで参照できます。"
---

`<pc-material>`タグは、[`<pc-render>`](../pc-render)コンポーネントの`material`属性から適用できるマテリアルを定義するために使用されます。

:::note[使用法]

* [`<pc-app>`](../pc-app) の直接の子である必要があります。

:::

## 属性

<div className="attribute-table">

| 属性 | タイプ | デフォルト | 説明 |
| --- | --- | --- | --- |
| `diffuse` | Color | `"1 1 1"` | マテリアルのディフューズカラー |
| `diffuse-map` | String | - | ディフューズマップとして使用するテクスチャ [`<pc-asset>`](../pc-asset) の `id` |
| `id` | String | - | 他のタグがこのマテリアルを参照するために使用する一意の識別子 |
| `metalness-map` | String | - | メタルネスマップとして使用するテクスチャ [`<pc-asset>`](../pc-asset) の `id` |
| `normal-map` | String | - | ノーマルマップとして使用するテクスチャ [`<pc-asset>`](../pc-asset) の `id` |
| `roughness-map` | String | - | ラフネスマップとして使用するテクスチャ [`<pc-asset>`](../pc-asset) の `id` |

</div>

## 例

```html
<pc-app>
    <pc-asset src="assets/textures/dark-tiles.png" id="dark-tiles"></pc-asset>
    <pc-material id="crimson" diffuse="crimson"></pc-material>
    <pc-material id="ground" diffuse-map="dark-tiles"></pc-material>
    <pc-scene>
        <pc-entity name="box">
            <pc-render type="box" material="crimson"></pc-render>
        </pc-entity>
        <pc-entity name="ground" scale="10 1 10">
            <pc-render type="plane" material="ground"></pc-render>
        </pc-entity>
    </pc-scene>
</pc-app>
```

実行時（アプリケーションの起動後）に挿入された`<pc-material>`は、挿入時にマテリアルを作成するため、JavaScriptから動的にマテリアルを追加できます。

## JavaScriptインターフェース

[MaterialElement API](https://api.playcanvas.com/web-components/classes/MaterialElement.html)を使用して、`<pc-material>`要素をプログラムで作成および操作できます。
