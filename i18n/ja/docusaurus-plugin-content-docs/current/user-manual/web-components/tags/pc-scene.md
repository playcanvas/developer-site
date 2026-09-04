---
title: <pc-scene>
description: "pc-scene要素のリファレンス: pc-app内のシーンコンテナで、保持するエンティティに適用されるフォグ、露出、重力の設定を持ちます。"
---

`<pc-scene>`タグは、シーンを定義するために使用されます。

:::note[使用法]

* [`<pc-app>`](../pc-app)の直接の子要素である必要があります。

:::

## 属性 {#attributes}

<div className="attribute-table">

| 属性 | タイプ | デフォルト | 説明 |
| --- | --- | --- | --- |
| `exposure` | Number | `"1"` | レンダリングされる画像全体の明るさの倍率。シーンが物理単位を使用している間は無視されます |
| `fog` | Enum | `"none"` | フォグの種類：`"none"` \| `"linear"` \| `"exp"` \| `"exp2"` |
| `fog-color` | Color | `"1 1 1"` | スペース区切りのRGB値、16進数コード、または[名前付きカラー](https://github.com/playcanvas/web-components/blob/main/src/colors.ts)としてのフォグの色 |
| `fog-density` | Number | `"0"` | 指数フォグタイプの場合のフォグの密度 |
| `fog-end` | Number | `"1000"` | 線形フォグの終了距離 |
| `fog-start` | Number | `"0"` | 線形フォグの開始距離 |
| `gravity` | Vector3 | `"0 -9.81 0"` | 「X Y Z」値としてリジッドボディに適用される重力 |

</div>

## 例 {#example}

リニアフォグの中へ消えていくボックスです。`fog-color` を変えたり (カメラの `clear-color` と揃えると定番の深度ヘイズ表現になります)、`fog` を `"exp"` にして `fog-density` を `0.15` にしたりしてみましょう:

```html live-example
<pc-app>
    <pc-scene fog="linear" fog-color="#4a5568" fog-start="2" fog-end="10">
        <pc-entity name="camera" position="0 1.5 4" rotation="-10 0 0">
            <pc-camera clear-color="#4a5568"></pc-camera>
        </pc-entity>
        <pc-entity name="light" rotation="45 30 0">
            <pc-light></pc-light>
        </pc-entity>
        <pc-entity name="box-1" position="-1 0.5 0">
            <pc-render type="box"></pc-render>
        </pc-entity>
        <pc-entity name="box-2" position="0 0.5 -3">
            <pc-render type="box"></pc-render>
        </pc-entity>
        <pc-entity name="box-3" position="1 0.5 -6">
            <pc-render type="box"></pc-render>
        </pc-entity>
        <pc-entity name="box-4" position="2 0.5 -9">
            <pc-render type="box"></pc-render>
        </pc-entity>
        <pc-entity name="ground" position="0 -0.5 -4" scale="10 1 20">
            <pc-render type="box"></pc-render>
        </pc-entity>
    </pc-scene>
</pc-app>
```

## JavaScriptインターフェース {#javascript-interface}

[SceneElement API](https://api.playcanvas.com/web-components/classes/SceneElement.html)を使用して、`<pc-scene>`要素をプログラムで作成および操作できます。
