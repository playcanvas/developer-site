---
title: <pc-camera>
---

`<pc-camera>`タグはカメラコンポーネントを定義するために使用されます。

:::note[使用法]

* [`<pc-entity>`](../pc-entity)の直接の子要素である必要があります。

:::

## 属性

<div className="attribute-table">

| 属性 | タイプ | デフォルト | 説明 |
| --- | --- | --- | --- |
| `clear-color` | Color | `"0.75 0.75 0.75 1"` | スペース区切りのRGBA値、16進数コード、または[名前付きカラー](https://github.com/playcanvas/web-components/blob/main/src/colors.ts)としての背景色 |
| `clear-color-buffer` | Boolean | `"true"` | カメラがカラーバッファをクリアするかどうかを制御します |
| `clear-depth-buffer` | Boolean | `"true"` | カメラがデプスバッファをクリアするかどうかを制御します |
| `clear-stencil-buffer` | Boolean | `"true"` | カメラがステンシルバッファをクリアするかどうかを制御します |
| `cull-faces` | Boolean | `"true"` | カメラが面をカリングするかどうかを制御します |
| `enabled` | Boolean | `"true"` | コンポーネントの有効状態 |
| `far-clip` | Number | `"1000"` | ファーカリングプレーンの距離 |
| `flip-faces` | Boolean | `"false"` | カメラが面を反転するかどうかを制御します |
| `fov` | Number | `"45"` | 視野角（度数） |
| `frustum-culling` | Boolean | `"true"` | カメラがフラスタムカリングを使用するかどうかを制御します |
| `gamma` | Enum | `"srgb"` | カラースペース: `"linear"` \| `"srgb"` |
| `horizontal-fov` | Flag | - | 垂直視野角の代わりに水平視野角を使用するかどうか |
| `near-clip` | Number | `"0.1"` | ニアクリッピングプレーンの距離 |
| `orthographic` | Flag | - | パースペクティブ投影の代わりに正射影を使用するかどうか |
| `ortho-height` | Number | `"10"` | 正射影の高さ |
| `priority` | Number | `"0"` | カメラのレンダリング優先度 |
| `rect` | Vector4 | `"0 0 1 1"` | "X Y Width Height"値としてのビューポート矩形 |
| `scissor-rect` | Vector4 | `"0 0 1 1"` | "X Y Width Height"値としてのシザー矩形 |
| `tonemap` | Enum | `"none"` | トーンマッピング: `"none"` \| `"aces"` \| `"aces2"` \| `"filmic"` \| `"hejl"` \| `"linear"` \| `"neutral"` |

</div>

## 例

```html
<pc-entity>
    <pc-camera clear-color="yellow"></pc-camera>
</pc-entity>
```

## JavaScriptインターフェース

[CameraComponentElement API](https://api.playcanvas.com/web-components/classes/CameraComponentElement.html)を使用して、`<pc-camera>`要素をプログラムで作成および操作できます。
