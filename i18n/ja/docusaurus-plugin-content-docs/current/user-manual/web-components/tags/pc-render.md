---
title: <pc-render>
description: "pc-render要素のリファレンス: プリミティブ形状（ボックス、球、カプセル、コーン、シリンダー、プレーン）をマテリアルとシャドウ設定でレンダリングします。"
---

`<pc-render>`タグは、3Dプリミティブをレンダリングするレンダリングコンポーネントを定義するために使用されます。

:::note[使用法]

* [`<pc-entity>`](../pc-entity)、[`<pc-model>`](../pc-model)、または[`<pc-node>`](../pc-node) の直接の子である必要があります。

:::

## 属性 {#attributes}

<div className="attribute-table">

| 属性 | タイプ | デフォルト | 説明 |
| --- | --- | --- | --- |
| `cast-shadows` | Boolean | `"true"` | コンポーネントが影を落とすかどうか |
| `enabled` | Boolean | `"true"` | コンポーネントの有効状態 |
| `material` | String | - | プリミティブのレンダリングに使用する [`<pc-material>`](../pc-material) の `id`。省略した場合はデフォルトのマテリアルが使用されます |
| `receive-shadows` | Boolean | `"true"` | コンポーネントが影を受け取るかどうか |
| `type` | 列挙型 | `"box"` | レンダリングするプリミティブの形状: `"box"` \| `"capsule"` \| `"cone"` \| `"cylinder"` \| `"plane"` \| `"sphere"` |

</div>

:::tip

glTF/GLBファイルから3Dモデルをレンダリングするには、代わりに [`<pc-model>`](../pc-model) を使用してください。

:::

## 例 {#example}

6種類のプリミティブ形状すべてです。任意の `type` を変更してみましょう。[`<pc-material>`](../pc-material) を定義すれば `material` も追加できます:

```html live-example
<pc-app>
    <pc-scene>
        <pc-entity name="camera" position="0 1.5 6" rotation="-10 0 0">
            <pc-camera clear-color="#2a2d36"></pc-camera>
        </pc-entity>
        <pc-entity name="light" rotation="45 30 0">
            <pc-light cast-shadows normal-offset-bias="0.05" shadow-bias="0.2" intensity="1.5"></pc-light>
        </pc-entity>
        <pc-entity name="box" position="-2.5 0.5 0">
            <pc-render type="box"></pc-render>
        </pc-entity>
        <pc-entity name="sphere" position="-1 0.5 0">
            <pc-render type="sphere"></pc-render>
        </pc-entity>
        <pc-entity name="capsule" position="0.25 1 0">
            <pc-render type="capsule"></pc-render>
        </pc-entity>
        <pc-entity name="cone" position="1.5 0.5 0">
            <pc-render type="cone"></pc-render>
        </pc-entity>
        <pc-entity name="cylinder" position="2.75 0.5 0">
            <pc-render type="cylinder"></pc-render>
        </pc-entity>
        <pc-entity name="ground" scale="10 10 10">
            <pc-render type="plane"></pc-render>
        </pc-entity>
    </pc-scene>
</pc-app>
```

## JavaScriptインターフェース {#javascript-interface}

[RenderComponentElement API](https://api.playcanvas.com/web-components/classes/RenderComponentElement.html)を使用して、`<pc-render>`要素をプログラムで作成および操作できます。
