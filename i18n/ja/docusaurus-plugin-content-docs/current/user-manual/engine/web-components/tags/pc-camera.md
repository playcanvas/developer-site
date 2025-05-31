---
title: <pc-camera>
---

`<pc-camera>`は、カメラコンポーネントを定義するために使用されるタグです。

:::note

* [`<pc-entity>`](../pc-entity)の直接の子である必要があります。

:::

## Attributes

<div className="nowrap-first-col">

| Attribute | Description |
| --- | --- |
| `clear-color` | カメラの背景色。R、G、B、Aの値をスペースで区切ったリスト、16進カラーコード、または[名前付き色](https://github.com/playcanvas/web-components/blob/main/src/colors.ts)として指定できます。指定されていない場合、`0.75 0.75 0.75 1`が使用されます。 |
| `clear-color-buffer` | 真偽値属性。カメラがカラーバッファをクリアするかどうかを制御します。指定されていない場合、カラーバッファはクリアされます。 |
| `clear-depth-buffer` | 真偽値属性。カメラがデプスバッファをクリアするかどうかを制御します。指定されていない場合、デプスバッファはクリアされます。 |
| `clear-stencil-buffer` | 真偽値属性。カメラがステンシルバッファをクリアするかどうかを制御します。指定されていない場合、ステンシルバッファはクリアされます。 |
| `cull-faces` | 真偽値属性。カメラが面をカリングするかどうかを制御します。指定されていない場合、面はカリングされます。 |
| `far-clip` | カメラの遠クリッピング面。指定されていない場合、`1000`が使用されます。 |
| `flip-faces` | 真偽値属性。カメラが面を反転させるかどうかを制御します。指定されていない場合、面は反転されません。 |
| `fov` | カメラの視野。指定されていない場合、`45`が使用されます。 |
| `frustum-culling` | 真偽値属性。カメラがフラスタムカリングを使用するかどうかを制御します。指定されていない場合、フラスタムカリングが使用されます。 |
| `gamma` | カメラのガンマ。`linear`または`srgb`に設定できます。指定されていない場合、`srgb`が使用されます。 |
| `horizontal-fov` | 値なし属性。存在する場合、カメラは水平視野を使用します。指定されていない場合、カメラは垂直視野を使用します。 |
| `near-clip` | カメラの近クリッピング面。指定されていない場合、`0.1`が使用されます。 |
| `orthographic` | 値なし属性。存在する場合、カメラは正投影を使用します。指定されていない場合、カメラは遠近投影を使用します。 |
| `ortho-height` | 正投影の高さ。指定されていない場合、`10`が使用されます。 |
| `priority` | カメラの優先度。指定されていない場合、`0`が使用されます。 |
| `rect` | カメラのビューポート矩形。X、Y、幅、高さの値をスペースで区切ったリストとして指定されます。指定されていない場合、`0 0 1 1`が使用されます。 |
| `scissor-rect` | カメラのシザー矩形。X、Y、幅、高さの値をスペースで区切ったリストとして指定されます。指定されていない場合、`0 0 1 1`が使用されます。 |
| `tonemap` | カメラのトーンマップ。`none`、`aces`、`aces2`、`filmic`、`hejl`、`linear`、または`neutral`に設定できます。指定されていない場合、`none`が使用されます。 |

</div>

## Example

```html
<pc-entity>
    <pc-camera clear-color="yellow"></pc-camera>
</pc-entity>
```

## JavaScript Interface

[CameraComponentElement API](https://api.playcanvas.com/classes/EngineWebComponents.CameraComponentElement.html)を使用して、プログラムで`<pc-camera>`要素を作成および操作できます。
