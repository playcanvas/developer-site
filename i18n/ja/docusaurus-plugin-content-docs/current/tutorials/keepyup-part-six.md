---
title: シンプルなゲームの作成 - パート6
tags: [games]
thumb: "https://s3-eu-west-1.amazonaws.com/images.playcanvas.com/projects/12/406050/LIJTDO-image-75.jpg"
---

<div className="iframe-container">
    <iframe src="https://playcanv.as/p/KH37bnOk/?overlay=false" title="Making a Simple Game - Part 6" allow="camera; microphone; xr-spatial-tracking; fullscreen" allowfullscreen></iframe>
</div>

*[完成されたプロジェクトはこちら][11]です。先に[その1][1], [その2][2], [その3][3], [その4][4], [その5][5]を読んでください。*

## ユーザーインターフェース

ゲームのユーザーインターフェースはユーザが最初に触れるものですが、開発の際には後回しにされがちです。優れたユーザーインターフェースは、ゲームに個性を与えるだけでなく、ゲームをプレイすることができる人数に影響を与えます。

PlayCanvasではユーザインタフェースは[Screen Component][7]と[Element Component][8]を使用して構築されます。詳細は [ユーザマニュアル][6]でご確認ください

### ユーザーインターフェイスのエンティティ

![Hierarchy](/img/tutorials/beginner/keepyup-part-six/ui-hierarchy.jpg)

ユーザインターフェイスをメニュー、ゲーム、ゲームオーバーの３つのゲーム状態に分けました。各状態には、状態が入力されたときにアクティブ化されるスクリーンエンティティがあります。 また、オーバーレイのためのスクリーンがあります。オーバーレイはメニューのボールの下に表示されるため、3Dスクリーンコンポーネントを使用して、ボールの後ろのワールドスペースにオーバーレイをレンダリングします。

### イメージとテキスト

![Image Element](/img/tutorials/beginner/keepyup-part-six/image-element.jpg)

画像やテキストは要素コンポーネントを使用してユーザーインターフェイスに追加されます。このコンポーネントは、テクスチャアセットの形式または画像をフォントアセットの形式で表示することができます。

![Image Attriubtes](/img/tutorials/beginner/keepyup-part-six/element-attr.jpg)

### ユーザーインターフェースのスクリプト

メインメニューのスクリプトを見てみましょう。

```javascript
var UiMenu = pc.createScript('uiMenu');

UiMenu.attributes.add("overlay", {type: "entity"});

// initialize code called once per entity
UiMenu.prototype.initialize = function() {
    this.on('enable', this.onEnable, this);
    this.on('disable', this.onDisable, this);

    this.onEnable();
};

UiMenu.prototype.onEnable = function () {
    // Listen for clicks on the background

    this.overlay.enabled = true;
    this.overlay.element.on("click", this.start, this);

    if (this.ball) {
        this.ball.model.meshInstances[0].material.depthTest = false;
    }
};

UiMenu.prototype.onDisable = function () {
    this.overlay.enabled = false;
    // Stop listening to events
    this.overlay.element.off("click", this.start, this);
};

UiMenu.prototype.start = function (e) {
    this.app.fire("ui:start");
    // prevent touch and mouse events
    e.stopPropagation();
};
```

最初に、オーバーレイエレメントへの参照を持つ属性を設定しました。オーバーレイエレメントは画面全体を覆い、画面を緑色に色付けするために使用されます。また、ユーザーが画面全体をクリックしたことを検出するためにも使用されます。

エンティティを有効にした場合、フルスクリーンオーバーレイを有効にして表示し、次にクリックイベントのリッスンを開始します。エンティティが無効になると、イベントのリッスンを停止し、オーバーレイを非表示にします。イベントがトリガーされると、メインゲームのスクリプトがリッスンしているゲームの状態の変化をトリガーする"ui:start" イベントが発生します。

ゲームのイベントにリッスンしたり、UIイベントを発動させる他の二つのUIスクリプトでも、同様の動作を繰り返します。

## ゲーム完成

シリーズの最後に到達しました！PlayCanvasを使用してゲームを構成および構築する方法について説明をしました。チュートリアルに関するご意見は[フォーラム][8]から連絡ください。

[1]: /tutorials/keepyup-part-one/
[2]: /tutorials/keepyup-part-two/
[3]: /tutorials/keepyup-part-three/
[4]: /tutorials/keepyup-part-four/
[5]: /tutorials/keepyup-part-five/
[6]: /user-manual/user-interface/
[7]: /user-manual/editor/scenes/components/screen/
[8]: /user-manual/editor/scenes/components/element/
[11]: https://playcanvas.com/project/406050
