---
title: 9スライス
---

9スライス(9-slicing、9パッチとも呼ばれます)は、2Dグラフィックスにおいて、1つの画像を9つの領域に分割し、異なるサイズやアスペクト比で画像を表示する際に引き伸ばされるのを防ぐために、各領域を個別にスケーリングする技術です。

![9 Sliced Button](/img/user-manual/2D/9-slicing/9-sliced-labelled.jpg)

上の画像では、[スプライトエディター](/user-manual/2D/sprite-editor)のテクスチャアトラスの編集機能を用いて定義される9つのエリアが表示されています。[Spriteコンポーネント](/user-manual/editor/scenes/components/sprite)または[Image Elementコンポーネント](/user-manual/editor/scenes/components/element)を使用してシーンに追加すると、コンポーネントの幅と高さプロパティを使用して画像のサイズを変更できます。各領域は以下の規則に従って拡大・縮小します。

* **Center** - 水平・垂直どちらもストレッチまたはタイル表示
* **Top, Bottom** - 水平方向のみストレッチまたはタイル表示
* **Left, Right** - 垂直方向のみストレッチまたはタイル表示
* **TopLeft, TopRight, BottomLeft, BottomRight** - 拡大または縮小しない

![Button Resize Animation](/img/user-manual/2D/9-slicing/button-resize.gif)

## 9スライスの設定

![Setup 9-slicing](/img/user-manual/2D/9-slicing/9-slice-setup.jpg)

9スライススプライトを設定するには、スプライトエディタで9スライスを使用したい領域の周囲にフレームを作成します。その後、青いハンドルまたはフレームインスペクタのBorderプロパティを使用して、スプライトの伸縮部分にしたい画像の中心部分をアウトラインするボーダーを設定します。

最後に、**選択範囲からスライスされたスプライトを新規に作成**をクリックして、描画モードが*Sliced*に設定された新しいスプライトを作成します。

## 描画モード (Render Modes)

Spriteアセットには、3つの描画モードがあります。

### シンプルスプライト (Simple Sprites)

![Simple Render Mode](/img/user-manual/2D/9-slicing/simple-resize.gif)

*Simple* 描画モードには9スライスはありません。このモードは通常のスプライトに使用します。

### スライススプライト (Sliced Sprites)

![Sliced Render Mode](/img/user-manual/2D/9-slicing/sliced-resize.gif)

*Sliced* 描画モードでは、画像の一部が伸びます。中心は水平および垂直に伸び、左右のセクションは垂直に伸び、上下のセクションは水平に伸び、角は全く伸びません。

### タイルスプライト (Tiled Sprite)

![Tiled Render Mode](/img/user-manual/2D/9-slicing/tiled-resize.gif)

*Tiled* 描画モードは *Sliced*に似ていますが、セクションが伸びる代わりに、タイル状に繰り返します。中心は水平および垂直にタイル状になり、左右は垂直にタイル状になり、上下は水平にタイル状になり、角は全くタイル状になりません。
