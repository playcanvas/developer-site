---
title: <pc-camera>
description: "pc-camera要素のリファレンス: エンジンのカメラComponentに対応する、投影、視野角、クリッピングプレーン、クリアオプション、トーンマッピングです。"
---

`<pc-camera>`タグはカメラコンポーネントを定義するために使用されます。

:::note[使用法]

* [`<pc-entity>`](../pc-entity)、[`<pc-model>`](../pc-model)、または[`<pc-node>`](../pc-node)の直接の子要素である必要があります。

:::

## 属性 {#attributes}

<div className="attribute-table">

| 属性 | タイプ | デフォルト | 説明 |
| --- | --- | --- | --- |
| `clear-color` | Color | `"0.75 0.75 0.75 1"` | スペース区切りのRGBA値、16進数コード、または[名前付きカラー](https://github.com/playcanvas/web-components/blob/main/src/colors.ts)としての背景色 |
| `clear-color-buffer` | Boolean | `"true"` | カメラがカラーバッファをクリアするかどうかを制御します |
| `clear-depth` | Number | `"1"` | デプスバッファをクリアする際の深度値 |
| `clear-depth-buffer` | Boolean | `"true"` | カメラがデプスバッファをクリアするかどうかを制御します |
| `clear-stencil-buffer` | Boolean | `"true"` | カメラがステンシルバッファをクリアするかどうかを制御します |
| `cull-faces` | Boolean | `"true"` | カメラが面をカリングするかどうかを制御します |
| `enabled` | Boolean | `"true"` | コンポーネントの有効状態 |
| `far-clip` | Number | `"1000"` | ファーカリングプレーンの距離 |
| `flip-faces` | Boolean | `"false"` | カメラが面を反転するかどうかを制御します |
| `fov` | Number | `"45"` | 視野角（度数） |
| `frustum-culling` | Boolean | `"true"` | カメラがフラスタムカリングを使用するかどうかを制御します |
| `gamma` | Enum | `"srgb"` | カラースペース: `"linear"` \| `"srgb"` |
| `horizontal-fov` | Boolean | `"false"` | 垂直視野角の代わりに水平視野角を使用するかどうか |
| `near-clip` | Number | `"0.1"` | ニアクリッピングプレーンの距離 |
| `ortho-height` | Number | `"10"` | 正射影の高さ。`projection`が`"orthographic"`のときにのみ使用されます |
| `priority` | Number | `"0"` | カメラのレンダリング優先度 |
| `projection` | Enum | `"perspective"` | カメラの投影方式: `"perspective"` \| `"orthographic"`。正射影のサイズは`ortho-height`で指定します |
| `rect` | Vector4 | `"0 0 1 1"` | "X Y Width Height"値としてのビューポート矩形 |
| `scissor-rect` | Vector4 | `"0 0 1 1"` | "X Y Width Height"値としてのシザー矩形 |
| `tonemap` | Enum | `"none"` | トーンマッピング: `"none"` \| `"aces"` \| `"aces2"` \| `"filmic"` \| `"hejl"` \| `"linear"` \| `"neutral"` |

</div>

## 例 {#example}

遠くへ連なるボックスの列です。`fov` を変えたり、`projection="orthographic"` (サイズは `ortho-height` で指定) に切り替えて遠近感が消える様子を確認したりしてみましょう:

```html live-example
<pc-app>
    <pc-scene>
        <pc-entity name="camera" position="0 1.5 4" rotation="-15 0 0">
            <pc-camera clear-color="#4a5568" fov="60"></pc-camera>
        </pc-entity>
        <pc-entity name="light" rotation="45 30 0">
            <pc-light></pc-light>
        </pc-entity>
        <pc-entity name="box-near" position="-1.5 0.5 0">
            <pc-render type="box"></pc-render>
        </pc-entity>
        <pc-entity name="box-mid" position="0 0.5 -2">
            <pc-render type="box"></pc-render>
        </pc-entity>
        <pc-entity name="box-far" position="1.5 0.5 -4">
            <pc-render type="box"></pc-render>
        </pc-entity>
        <pc-entity name="ground" position="0 -0.5 -2" scale="12 1 16">
            <pc-render type="box"></pc-render>
        </pc-entity>
    </pc-scene>
</pc-app>
```

## JavaScriptインターフェース {#javascript-interface}

[CameraComponentElement API](https://api.playcanvas.com/web-components/classes/CameraComponentElement.html)を使用して、`<pc-camera>`要素をプログラムで作成および操作できます。

`component`プロパティは、この要素が追加するエンジンの[CameraComponent](https://api.playcanvas.com/engine/classes/CameraComponent.html)です。要素の準備が完了するまでは`null`で、属性が公開していないものはすべてここから利用できます。

## 関連項目 {#see-also}

* [`<pc-scene>`](../pc-scene) — カメラのトーンマッピングと組み合わせて働く露出とフォグ
* [`<pc-sky>`](../pc-sky) — クリアカラーの代わりに背景となるスカイボックス
* [`<pc-script>`](../pc-script) — カメラ操作はカメラの隣に付けるエンジンスクリプト
* [XR のサポート](../xr.md) — カメラ要素からVRやARを開始する方法

サンプル: [Basic Shapes](https://playcanvas.github.io/web-components/examples/basic-shapes.html)、[First Person Controller](https://playcanvas.github.io/web-components/examples/first-person-controller.html)
