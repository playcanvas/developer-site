---
title: 2D
sidebar_position: 17
---

PlayCanvasエンジンは、3Dゲームやアプリを素早く簡単に作成するために設計されています。しかし、2Dゲームを作成するための多数の優れた機能もサポートしています。PlayCanvasの2D機能により、3Dエンジンの強力な利点を2Dゲームにも活用できます。

## 基本的な機能

### スプライト (Sprite)

![Sprite](/images/user-manual/2D/sprite.jpg)

2Dグラフィックスは通常、**スプライト**として知られています。PlayCanvasでは、[Spriteアセット][0]と[Spriteコンポーネント][1]を作成できます。スプライトコンポーネントは、シーン内で2Dグラフィックスを表示するためにエンティティにアタッチされます。PlayCanvasのスプライトアセットは、テクスチャアトラスからの複数の画像フレームを順序付けて保存します。そのため、スプライトアセットを使用して、ゲーム内でフリップブックスタイルのアニメーショングラフィックスを作成できます。

### テクスチャアトラス (Texture Atlases)

![Texture Atlas](/images/user-manual/2D/texture-atlas.jpg)

[テクスチャアトラス][2] (Texture Atlas) は、標準の[テクスチャ][3]アセット (Texture) の強化版です。通常のテクスチャ機能に加えて、テクスチャアトラスには一連の「フレーム」の定義が含まれています。各フレームは、スプライトアセットで参照できるテクスチャの領域です。

### スプライトエディター

![Sprite Editor](/images/user-manual/2D/sprite-editor.jpg)

[スプライトエディター][4]は、テクスチャアトラスのフレームとスプライトアセットを生成するためのツールです。スプライトエディターは、任意のテクスチャアトラスまたはスプライトアセットをダブルクリックすることで開くことができます。[詳細はこちら][4]。

*アートワークは[PixelBoy](https://twitter.com/2pblog1)によって作成されました。*

[0]: /user-manual/assets/types/sprite
[1]: /user-manual/scenes/components/sprite
[2]: /user-manual/assets/types/texture-atlas
[3]: /user-manual/assets/types/texture
[4]: /user-manual/2D/sprite-editor
