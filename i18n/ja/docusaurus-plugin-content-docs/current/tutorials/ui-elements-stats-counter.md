---
title: UI - カウンター
tags: [ui]
thumb: "https://s3-eu-west-1.amazonaws.com/images.playcanvas.com/projects/12/501978/12B6CE-image-75.jpg"
---

<div className="iframe-container">
    <iframe src="https://playcanv.as/p/XVLr9TWc/" title="User Interface - Stats Counter" allow="camera; microphone; xr-spatial-tracking; fullscreen" allowfullscreen></iframe>
</div>

*ボタンやプログレスバーの使い方と要素とインタラクトする方法。[フルシーン](https://playcanvas.com/editor/scene/547905)を参照してください。*

このチュートリアルでは組み込みの[Element](/user-manual/user-interface/elements/)を使用して、プラス/マイナスボタンをクリックすることでカウンターを増やす簡単なウィジェットを作成します。

各カウンターには、マイナスボタン、プラスボタン、プログレスバー、現在のカウントを表示するテキストが必要です。

## ヒエラルキー (Hierarchy)

UIの構造は次のようになります。

![Hierarchy](/img/tutorials/ui/stats/hierarchy.png)

## スクリーンの設定

まず、新しい2D [Screen](/user-manual/user-interface/screens/)を追加します。画面は次のようになります。

![Screen](/img/tutorials/ui/stats/screen.png)

2Dスクリーンであるため、 `Screen Space` を選択しました。 `Reference Resolution` は、ターゲットとしている解像度です。この場合、1080 x 1920です。スケールモードとしてBlendを選択しているため、スクリーンは解像度の変更に適応します。また、スケールブレンドを1に設定しているため、スクリーンは高さの変更にのみ適応されます。

## 統計データのセットアップ

各カウンター用に異なるGroup Elementを作成します。これにより、グループのサブ要素をグループの端に固定することができ、各カウンターを個別のウィジェットとして扱うことができます。

Boostカウンターを開きます - 他のエンティティも同じ構成です。`stats-boost`エンティティはビューポートで次のように表示されます。

![Boost](/img/tutorials/ui/stats/boost-editor.png)

`stats-boost`のインスペクター。

![Boost Attributes](/img/tutorials/ui/stats/boost-attributes.png)

ご覧のとおり、すべての要素を含む適切なサイズのGroup Elementコンポーネントがあり、画面の下部に固定されています。また、スクリプト `uiStats`が割り当てられているScript Component があります。このスクリプトを使用することで、グループの要素とのインタラクションを処理できます。

ヒエラルキーにあるグループは次のように表示されます。

![Boost Hierarchy](/img/tutorials/ui/stats/boost-hierarchy.png)

グループには次の子要素があります。

* `text-title`: グループのタイトルのテキストText Element。グループの上部に固定されています。
* `btn-minus`: Image Elementで、子にText Elementが含まれています。これが私たちのマイナスボタンで、グループの左下にアンカーされています。
* `btn-plus`: Image Elementで、子にText Elementが含まれています。これが私たちのプラスボタンで、グループの右下にアンカーされています。
* `progress-bar`: グループの下部にアンカーされたプログレスバー。背景のImage Elementで、2つの子要素が含まれています:
  * `image-progress`: 実際にプログレスを表示するリサイズ可能なImage Element。 `progress-bar`要素の左にアンカーされています。
  * `text`: プログレスバーを表示するText Element。`progress-bar`要素の中央にアンカーされています。

## スクリプト

各ボタンには、ホバー状態に基づいてテクスチャを変更できるようにするスクリプトがあります。これは、[このチュートリアル](/tutorials/ui-elements-buttons/)で見つかるスクリプトに似ています。また、プログレスバーを処理するスクリプトがあります。プログレスバーに関する詳細は、[このチュートリアル](/tutorials/ui-elements-progress/)を参照してください。

各統計値のやり取りを処理するメインスクリプトは`uiStats`です。

```javascript
var UiStats = pc.createScript('uiStats');

UiStats.prototype.initialize = function() {
    // find our widgets
    this.btnPlus = this.entity.findByName('btn-plus');
    this.btnMinus = this.entity.findByName('btn-minus');
    this.progressBar = this.entity.findByName('progress-bar');
    this.progressText = this.progressBar.findByName('text');

    // initialize value to 0
    this.setValue(0);

    // increase value with plus button
    this.btnPlus.element.on('click', function (evt) {
        this.setValue(this.value + 1);
    }, this);

    // decrease value with minus button
    this.btnMinus.element.on('click', function (evt) {
        this.setValue(this.value - 1);
    }, this);
};

// Sets the stat value
UiStats.prototype.setValue = function (value) {
    // clamp between min and max
    this.value = pc.math.clamp(value, 0, 10);
    // set progress
    this.progressBar.script.progressBar.setProgress(this.value / 10);
    // update progress text
    this.progressText.element.text = this.value + ' / ' + 10;
};
```

このスクリプトでは、子要素を検索し、プラスまたはマイナスボタンがクリックされたときに統計値を増減させ、プログレスバーとそのテキストを更新するようになります。
