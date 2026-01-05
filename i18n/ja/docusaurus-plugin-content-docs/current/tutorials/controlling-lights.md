---
title: ライトの制御方法
tags: [lighting]
thumb: "https://s3-eu-west-1.amazonaws.com/images.playcanvas.com/projects/12/405812/9D487A-image-75.jpg"
---

<div className="iframe-container">
    <iframe src="https://playcanv.as/p/tiKpka9M/" title="Controlling Lights" allow="camera; microphone; xr-spatial-tracking; fullscreen" allowfullscreen></iframe>
</div>

*1、2、3を押すとそれぞれスポットライト、ポイントライト、ディレクショナルライトのON/OFFが切り替わります。*

このチュートリアルでは、PlayCanvasで照明のON/OFFおよび照明の色や強度を変更する方法を説明します。注意点として、光の範囲など、多くの制御可能な光の機能やプロパティがあることに注意してください。詳細については[こちらのAPIリスト](https://api.playcanvas.com/engine/classes/LightComponent.html)を参照してください。

また、異なる光のプロパティに対する異なる制限にも注意することが重要です。例えば、赤、緑、青の値は0から1に設定されますが、光の強度は0から10まで設定できます。また、スポットライトのコーン角度のような、独自のプロパティを持つライトもあります。

## 照明のコマンド

```javascript
if (app.keyboard.wasPressed(pc.KEY_1)) {
    this.spot.light.enabled = !this.spot.light.enabled;
}
```

この行は、'spot'エンティティのLightコンポーネントのON/OFFを切り替えます。

```javascript
this.color1 = new pc.Color(1, 1, 1);
```

新しい色の配列が宣言され、最初の3つの値はそれぞれ赤、緑、青の値に影響します。

```javascript
var s = Math.abs(Math.sin(1 + this.timer));
var r = 1-s/2;
var g = s-0.2;
var b = 0.55+s/2;
this.color1.set(r, g, b);
this.spot.light.color = this.color1;
this.spot.light.intensity = 10*s;
```

これらの行は、sin波に基づいてr、g、b変数に値を割り当て、`color1.set(x, y, z)`を使用して既に宣言された色配列にこれらの値を割り当て、光プロパティに割り当てます。強度は、最大光の強度値である10から0まで正弦波的に変化するように設定されています。

:::note

光の色の赤の値をアクセスして変更するために`entity.light.color.r`を使用することはできません。光のプロパティ`color`の変更のみが検出されるため、プロパティに完全な`pc.Color`を割り当てる必要があります。例: `entity.light.color = new pc.Color(1, 1, 1);`。

:::

## 一般的なセットアップ

私たちはスポットライト(基本的なトーチモデルの親アセンブリに添付)、球体モデルに添付されたオムニライトに加えて、新しいSceneが作成された際に自動的に作成されるデフォルトのディレクショナルライトを追加しました。制御スクリプトはルートエンティティにアタッチされました。球体とトーチは、シーンの中心に存在する空のエンティティの子になっているため、簡単に回転できます。フルエディターシーンとスクリプトは、'controllingLights'シーンで[ここからアクセスできます](https://playcanvas.com/project/405812/overview/tutorial-controlling-lights)。

上記のPlayCanvasアプリで使用される完全なコードは次のとおりです。

```javascript
var LightHandler = pc.createScript('lightHandler');

// initialize code called once per entity
LightHandler.prototype.initialize = function() {
    var app = this.app;

    this.spot = app.root.findByName("SpotLight");
    this.point = app.root.findByName("PointLight");
    this.directional = app.root.findByName("DirectionalLight");
    this.pivot1 = app.root.findByName("Pivot1");
    this.pivot2 = app.root.findByName("Pivot2");
    this.timer = 0;
    this.color1 = new pc.Color(1, 1, 1);
    this.color2 = new pc.Color(1, 1, 1);
    this.color3 = new pc.Color(1, 1, 1);
};

// update code called every frame
LightHandler.prototype.update = function(dt) {
    var app = this.app;

    this.pivot();

    if (app.keyboard.wasPressed(pc.KEY_1)) {
        this.spot.light.enabled = !this.spot.light.enabled;
    }
    if (app.keyboard.wasPressed(pc.KEY_2)) {
        this.point.light.enabled = !this.point.light.enabled;
    }
    if (app.keyboard.wasPressed(pc.KEY_3)) {
        this.directional.light.enabled = !this.directional.light.enabled;
    }

    // a counter that is used as input to sin the functions determining light properties for all lights.
    this.timer += dt;

    // these 3 code blocks assign color and intensity values that vary according to a sin function
    // all sin inputs are in radians
    var s = Math.abs(Math.sin(1 + this.timer));
    var r = 1-s/2;
    var g = s-0.2;
    var b = 0.55+s/2;
    this.color1.set(r, g, b);
    this.spot.light.color = this.color1;
    this.spot.light.intensity = 10*s;

    s = Math.abs(Math.sin(2 + this.timer));
    r = s/2;
    g = 0.25+s/2;
    b = 1.0-s;
    this.color2.set(r, g, b);
    this.point.light.color = this.color2;
    this.point.light.intensity = 10*s;

    s = Math.abs(Math.sin(3 + this.timer));
    r = 0.25+s/2;
    g = 0.75-s/2;
    b = 0.25+s/2;
    this.color3.set(r, g, b);
    this.directional.light.color = this.color3;
    this.directional.light.intensity = 3*(1-s);
};

// this function rotates all three lights about their parent entities (all at the centre of the scene) to easily create circular motion.
LightHandler.prototype.pivot = function () {
    this.pivot1.rotate(0, 2, 0);
    this.pivot2.rotate(0, -3, 0);
};
```
