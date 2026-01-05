---
title: Sprite
---

スプライト (Sprite) は、シーンにレンダリングできる2Dグラフィックです。Spriteアセットは、[Texture Atlas](/user-manual/editor/assets/inspectors/texture-atlas)への参照と、そのアトラスからのフレームのシーケンスです。このように、スプライトはアトラスから取り出した単一の画像を表すことができる他、フリップブックスタイルのアニメーション（アトラスから複数のフレーム）を表すこともできます。

## Inspector

![Sprite Asset Inspector](/img/user-manual/editor/assets/inspectors/asset-inspector-sprite.png)

## Properties

| Property | Description |
|----------|-------------|
| Pixels Per Unit | PlayCanvasのシーン内で、1単位毎にマッピングされるスプライトイメージのピクセル数です。例えば、`pixelsPerUnit`が1でスプライトが32x32の場合、シーン内で描画されると横幅と高さが32ユニットになります。デフォルトでは、*Simple*のスプライトは`pixelsPerUnit`が100に設定されています。つまり、100x100のスプライトはシーン内で1ユニットの幅/高さになります。*Sliced*スプライトはデフォルトで1に設定されます。UIで使用されるため、1つのスプライトピクセルは1つの画面ピクセルにマップする必要があります。 |
| Render Mode | スプライトのレンダリング方法を制御します：**Simple** - スプライトはボーダー値を使用しない；**Sliced** - ボーダー値を使用して[9スライス](/user-manual/2D/slicing)レンダリングを行い、伸縮させます；**Tiled** - ボーダー値を使用して[9スライス](/user-manual/2D/slicing)レンダリングを行い、タイリングします。 |
| Texture Atlas | スプライトが参照するテクスチャアトラスアセット。 |

:::tip
スクリプトでこのアセットを使用するには、[Asset Attributes](/user-manual/scripting/script-attributes/esm/#asset-attribute)を参照してください。
:::
