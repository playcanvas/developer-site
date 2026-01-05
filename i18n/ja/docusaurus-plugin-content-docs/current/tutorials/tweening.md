---
title: Tweenライブラリの使用方法
tags: [animation, entities]
thumb: "https://s3-eu-west-1.amazonaws.com/images.playcanvas.com/projects/12/452634/BDFB7E-image-75.jpg"
---

エンティティや、2点の間の任意の値をアニメートすることがよくあります。これはトゥイーンと呼ばれ、その目的のためにトゥイーンライブラリを作成しました。ライブラリは [https://github.com/playcanvas/playcanvas-tween](https://github.com/playcanvas/playcanvas-tween) にあります。

ライブラリを使用するには、単に`tween.js`ファイルをあなたのプロジェクトにアップロードしてください。これにより、以下のようにEntityのプロパティ(位置、回転、スケールなど)をトゥイーンできるようになります。

```javascript
entity.tween(entity.getLocalPosition()).to({x: 10, y: 0, z: 0}, 1, pc.SineOut);
```

ここでは、Entityのローカル位置をトゥイーンする方法の例が示されています。

<div className="iframe-container">
    <iframe src="https://playcanv.as/b/wEftzstB/" title="Using the Tween library" allow="camera; microphone; xr-spatial-tracking; fullscreen" allowfullscreen></iframe>
</div>

この例の[Project](https://playcanvas.com/project/452634/overview/using-the-tween-library)と[Editor](https://playcanvas.com/editor/scene/491504)へのリンクです。

上記を得るために以下を行います：

```javascript
this.entity
    .tween(this.entity.getLocalPosition())
    .to(new pc.Vec3(4, 0, 0), 1.0, pc.SineOut)
    .loop(true)
    .yoyo(true)
    .start();
```

エンティティのローカル回転をトゥイーンする方法の例です：

<div className="iframe-container">
    <iframe src="https://playcanv.as/b/H8553dGa/" title="Tween Local Rotation" allow="camera; microphone; xr-spatial-tracking; fullscreen" allowfullscreen></iframe>
</div>

この例の[プロジェクト](https://playcanvas.com/project/452634/overview/using-the-tween-library)と[エディタ](https://playcanvas.com/editor/scene/491558)へのリンクを貼ります。

これを行うには、以下のようにします。

```javascript
this.entity
    .tween(this.entity.getLocalEulerAngles())
    .rotate(new pc.Vec3(180, 0, 180), 1.0, pc.Linear)
    .loop(true)
    .yoyo(true)
    .start();
```

次に、Entityのローカルスケールをトゥイーンする方法の例が示されています。

<div className="iframe-container">
    <iframe src="https://playcanv.as/b/ndTiHCpD/" title="Tween Local Scale" allow="camera; microphone; xr-spatial-tracking; fullscreen" allowfullscreen></iframe>
</div>

この例の[Project](https://playcanvas.com/project/452634/overview/using-the-tween-library)と[Editor](https://playcanvas.com/editor/scene/491585)へのリンクです。

これを行うには、以下のようにします。

```javascript
this.entity
    .tween(this.entity.getLocalScale())
    .to(new pc.Vec3(3, 3, 3), 1.0, pc.SineOut)
    .loop(true)
    .yoyo(true)
    .start();
```

最後に、色をトゥイーンする方法です：

<div className="iframe-container">
    <iframe src="https://playcanv.as/b/aoRYsYrc/" title="Tween Material Color" allow="camera; microphone; xr-spatial-tracking; fullscreen" allowfullscreen></iframe>
</div>

この例の[プロジェクト](https://playcanvas.com/project/452634/overview/using-the-tween-library)と[エディタ](https://playcanvas.com/editor/scene/491559)へのリンクを貼ります。

これを行うには、以下のようにします。

```javascript
var color = new pc.Color(0, 0, 0);
var material = this.entity.render.material;
this.app
    .tween(color)
    .to(new pc.Color(1, 1, 1), 1.0, pc.Linear)
    .loop(true)
    .yoyo(true)
    .onUpdate(function () {
        material.diffuse = color;
        material.update();
    })
    .start();
```

ここでもう一度、Tweenライブラリは [https://github.com/playcanvas/playcanvas-tween](https://github.com/playcanvas/playcanvas-tween) で利用できます。
