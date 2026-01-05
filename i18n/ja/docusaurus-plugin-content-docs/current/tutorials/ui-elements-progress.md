---
title: UI - プログレスバー
tags: [ui]
thumb: "https://s3-eu-west-1.amazonaws.com/images.playcanvas.com/projects/12/501979/49D69A-image-75.jpg"
---

<div className="iframe-container">
    <iframe src="https://playcanv.as/p/FlebHmLs/" title="User Interface - Progress Bar" allow="camera; microphone; xr-spatial-tracking; fullscreen" allowfullscreen></iframe>
</div>

*Elementコンポーネントを使用するプログレスバー。[フルシーン](https://playcanvas.com/editor/scene/547906)を参照してください*

ビルトイン[Elements](/user-manual/user-interface/elements/)を使用してプログレスバーを簡単に作成できます。本チュートリアルでは、数秒ごとに空からいっぱいにループするプログレスバーを使用しています。

## ヒエラルキー (Hierarchy)

UIの構造は次のようになります。

![Hierarchy](/img/tutorials/ui/progressbar/hierarchy.png)

## スクリーンの設定

[スクリーン](/user-manual/user-interface/screens/)は次のように設定されています。

![Screen](/img/tutorials/ui/progressbar/screen.png)

2Dスクリーンであるため、 `Screen Space` を選択しました。 `Reference Resolution` は、ターゲットとしている解像度です。この場合、1080 x 1920です。スケールモードとしてBlendを選択しているため、スクリーンは解像度の変更に適応します。また、スケールブレンドを1に設定しているため、スクリーンは高さの変更にのみ適応されます。

スクリーンには、POWERテキストを表示するための子テキストエレメントと、プログレスバーを表示するためのエンティティである`Progress Bar`が含まれています。

## プログレスバーの設定

プログレスバーは2つのElementで構成されています。バックグラウンド画像とフィル画像です。

バックグラウンド画像は`Progress Bar`エンティティです。それには、プログレスバーの背景画像を表示する画像エレメントがあります。

![Background Image](/img/tutorials/ui/progressbar/progress-bar-bg.png)

フィル画像は、`Fill Image`エンティティです。それは`Progress Bar`エンティティの子要素であり、プログレスバーのフィルを表示するImage Elementがあります。このイメージは、親バックグラウンド画像の左にアンカーが設定されているため、要素の幅を変更してプログレスバーを拡大できます。

![Fill Image](/img/tutorials/ui/progressbar/progress-bar-fill.png)

## スクリプト (Script)

`Progress Bar`エンティティには、プログレスバーのサイズ変更を制御するスクリプトが用意されています。

```javascript
var ProgressBar = pc.createScript('progressBar');

// The entity that shows the fill image
ProgressBar.attributes.add('progressImage', {type: 'entity'});
// The maximum width of the fill image
ProgressBar.attributes.add('progressImageMaxWidth', {type: 'number'});

ProgressBar.prototype.initialize = function() {
    // use our own rect object to set the size of
    // the progress bar
    this.imageRect = this.progressImage.element.rect.clone();

    // initialize progress to 0
    this.setProgress(0);
    // if true the progress bar will increase
    // otherwise it will decrease in update
    this.increase = true;
};

// Set progress - value is between 0 and 1
ProgressBar.prototype.setProgress = function (value) {
    // clamp value between 0 and 1
    value = pc.math.clamp(value, 0, 1);

    this.progress = value;

    // find the desired width of our progress fill image
    var width = pc.math.lerp(0, this.progressImageMaxWidth, value);
    // set the width of the fill image element
    this.progressImage.element.width = width;

    // Set the width of the element's rect (rect.z) to be the same
    // value as our 0-1 progress.
    // This is so that the fill image will only show the portion
    // of the texture that is visible
    this.imageRect.copy(this.progressImage.element.rect);
    this.imageRect.z = value;
    // force rect update
    this.progressImage.element.rect = this.progressImage.element.rect;
};

// Increase or decrease the progress automatically
ProgressBar.prototype.update = function(dt) {
    var diff = this.increase ? dt : -dt;
    this.setProgress(this.progress + diff);

    if (this.progress >= 1)
        this.increase = false;
    else if (this.progress <= 0)
        this.increase = true;
};
```

このスクリプトには、フィル画像を表示するエンティティとその画像の最大幅という2つの属性があります。関数`setProgress`は0から1までの値でプログレスを設定します。

`update`メソッドでは、進行状況を0から1の間でループさせます。このスクリプトで重要な点は、進行バーを適切にリサイズするために、`width`と`rect`を変更する必要があることです。

`width`を変更すると、フィルイメージが大きくなります。また、`rect`を変更することで、表示されるテクスチャの部分のみを表示し、表示されるテクスチャを伸ばさないようにします。[こちら](https://api.playcanvas.com/engine/classes/ElementComponent.html#rect)は`rect`のAPIリファレンスです。
