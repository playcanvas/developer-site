---
title: <pc-scrollview>
description: "pc-scrollview要素のリファレンス: コンテンツ、スクロールバー、マウスホイール対応、bounce/clamp/infinite モードを備えたスクロール可能なビューポートです。"
---

`<pc-scrollview>`タグは、クリップされたビューポート内でより大きなコンテンツ領域をユーザーがスクロールできるようにするスクロールビューコンポーネントを定義するために使用されます。

:::note[使用法]

* [`<pc-element>`](../pc-element) も持つ [`<pc-entity>`](../pc-entity) の直接の子である必要があります。
* ビューポート、コンテンツ、スクロールバーの各エンティティを、CSSセレクター、要素id、またはエンティティ名で参照します。
* コンテンツがスクロールビューの範囲にクリップされるように、ビューポート要素には `mask` 属性を設定してください。

:::

## 属性

<div className="attribute-table">

| 属性 | タイプ | デフォルト | 説明 |
| --- | --- | --- | --- |
| `bounce-amount` | Number | `"0.1"` | `scroll-mode="bounce"` のとき、コンテンツが範囲を超えてバウンスする量（0〜1） |
| `content` | String | - | ビューのスクロールに合わせて移動するコンテンツ [`<pc-entity>`](../pc-entity) への参照 |
| `enabled` | Boolean | `"true"` | コンポーネントの有効状態 |
| `friction` | Number | `"0.05"` | 投げられた後のコンテンツの動きやすさ（0 = なし、1 = 高い） |
| `horizontal` | Boolean | `"true"` | 水平軸方向のスクロールを有効にするかどうか |
| `horizontal-scrollbar` | String | - | 水平 [`<pc-scrollbar>`](../pc-scrollbar) を保持する [`<pc-entity>`](../pc-entity) への参照 |
| `horizontal-scrollbar-visibility` | Enum | `"when-required"` | 水平スクロールバーを表示するタイミング: `"always"` \| `"when-required"` |
| `mouse-wheel-sensitivity` | Vector2 | `"1 1"` | マウスホイールの感度を `x y` で指定（軸の値が0の場合、その軸のホイールスクロールは無効） |
| `scroll-mode` | Enum | `"bounce"` | 範囲を超えてスクロールしたときの挙動: `"clamp"` \| `"bounce"` \| `"infinite"` |
| `use-mouse-wheel` | Boolean | `"true"` | スクロールビューがマウスホイールに反応するかどうか |
| `vertical` | Boolean | `"true"` | 垂直軸方向のスクロールを有効にするかどうか |
| `vertical-scrollbar` | String | - | 垂直 [`<pc-scrollbar>`](../pc-scrollbar) を保持する [`<pc-entity>`](../pc-entity) への参照 |
| `vertical-scrollbar-visibility` | Enum | `"when-required"` | 垂直スクロールバーを表示するタイミング: `"always"` \| `"when-required"` |
| `viewport` | String | - | ビューポートとして使用される [`<pc-entity>`](../pc-entity) への参照。コンテンツをスクロールビューの範囲にクリップします |

</div>

## 例

ストライプのコンテンツを、マウスホイール、ドラッグ、またはスクロールバーでスクロールしてみましょう。ビューポートの `mask` がコンテンツをクリップします。`scroll-mode="clamp"` (バウンスなし) や、より大きなコンテンツの `height` も試してみましょう:

```html live-example
<pc-app>
    <pc-scene>
        <pc-entity name="camera">
            <pc-camera clear-color="#1d1f2b"></pc-camera>
        </pc-entity>
        <pc-entity name="ui">
            <pc-screen screen-space="true" scale-mode="blend" reference-resolution="640 320"></pc-screen>
            <pc-entity name="scroll-view">
                <pc-element type="group" anchor="0.5 0.5 0.5 0.5" pivot="0.5 0.5" width="260" height="260"></pc-element>
                <pc-scrollview
                    horizontal="false"
                    vertical="true"
                    viewport="#viewport"
                    content="#content"
                    vertical-scrollbar="#v-scrollbar"></pc-scrollview>

                <!-- ビューポートはコンテンツをスクロールビューの範囲にクリップします -->
                <pc-entity name="viewport" id="viewport">
                    <pc-element type="image" anchor="0 0 1 1" margin="0 0 20 0" color="#2a2d36" mask></pc-element>

                    <!-- コンテンツはビューのスクロールに合わせて移動します -->
                    <pc-entity name="content" id="content">
                        <pc-element type="group" anchor="0 1 0 1" pivot="0 1" width="240" height="640" use-input></pc-element>
                        <pc-layoutgroup orientation="vertical" alignment="0 1" spacing="0 8" padding="10 10 10 10"></pc-layoutgroup>
                        <pc-entity name="row-1"><pc-element type="image" width="220" height="60" color="#ff8a3c"></pc-element></pc-entity>
                        <pc-entity name="row-2"><pc-element type="image" width="220" height="60" color="#7ab8ff"></pc-element></pc-entity>
                        <pc-entity name="row-3"><pc-element type="image" width="220" height="60" color="#8ce99a"></pc-element></pc-entity>
                        <pc-entity name="row-4"><pc-element type="image" width="220" height="60" color="#ffd43b"></pc-element></pc-entity>
                        <pc-entity name="row-5"><pc-element type="image" width="220" height="60" color="#e599f7"></pc-element></pc-entity>
                        <pc-entity name="row-6"><pc-element type="image" width="220" height="60" color="#63e6be"></pc-element></pc-entity>
                        <pc-entity name="row-7"><pc-element type="image" width="220" height="60" color="#ffa8a8"></pc-element></pc-entity>
                        <pc-entity name="row-8"><pc-element type="image" width="220" height="60" color="#74c0fc"></pc-element></pc-entity>
                    </pc-entity>
                </pc-entity>

                <!-- 垂直スクロールバー -->
                <pc-entity name="v-scrollbar" id="v-scrollbar">
                    <pc-element type="image" anchor="1 0 1 1" width="20" color="#2a2d36"></pc-element>
                    <pc-scrollbar orientation="vertical" handle="#v-handle"></pc-scrollbar>
                    <pc-entity name="handle" id="v-handle">
                        <pc-element type="image" anchor="0 1 1 1" color="#ff8a3c" use-input></pc-element>
                        <pc-button></pc-button>
                    </pc-entity>
                </pc-entity>
            </pc-entity>
        </pc-entity>
    </pc-scene>
</pc-app>
```

## JavaScriptインターフェース

[ScrollViewComponentElement API](https://api.playcanvas.com/web-components/classes/ScrollViewComponentElement.html)を使用して、`<pc-scrollview>`要素をプログラムで作成および操作できます。
