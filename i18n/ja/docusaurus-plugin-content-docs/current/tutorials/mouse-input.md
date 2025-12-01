---
title: 基本的なマウス入力
tags: [mouse, input]
thumb: "https://s3-eu-west-1.amazonaws.com/images.playcanvas.com/projects/12/405819/2DF062-image-75.jpg"
---

<div className="iframe-container">
    <iframe src="https://playcanv.as/p/MHIdZgaj/?overlay=false" title="Basic Mouse Input" allow="camera; microphone; xr-spatial-tracking; fullscreen" allowfullscreen></iframe>
</div>

:::info

マウスを動かしてキューブを動かし、マウスのボタンを押してキューブの色を変えることができます。

:::

PlayCanvasのエンジンでは、`pc.Mouse`オブジェクトが提供されており、マウスが移動したときやマウスボタンが押されたときに検出するためのシンプルなインターフェイスを提供します。また、マウス座標の処理におけるブラウザ間での一貫性の問題を解決することができます。

[tutorial project][1]を見てみましょう。次に、mouse.jsのコードを示します。

```javascript
var Mouse = pc.createScript('mouse');

Mouse.attributes.add('redMaterial', {
    type: 'asset',
    assetType: 'material'
});

Mouse.attributes.add('greenMaterial', {
    type: 'asset',
    assetType: 'material'
});

Mouse.attributes.add('blueMaterial', {
    type: 'asset',
    assetType: 'material'
});

// initialize code called once per entity
Mouse.prototype.initialize = function() {
    this.pos = new pc.Vec3();

    // Disabling the context menu stops the browser displaying a menu when
    // you right-click the page
    this.app.mouse.disableContextMenu();

    // Use the on() method to attach event handlers.
    // The mouse object supports events on move, button down and
    // up, and scroll wheel.
    this.app.mouse.on(pc.EVENT_MOUSEMOVE, this.onMouseMove, this);
    this.app.mouse.on(pc.EVENT_MOUSEDOWN, this.onMouseDown, this);
};

Mouse.prototype.onMouseMove = function (event) {
    // Use the camera component's screenToWorld function to convert the
    // position of the mouse into a position in 3D space
    var depth = 10;
    var cameraEntity = this.app.root.findByName('Camera');
    cameraEntity.camera.screenToWorld(event.x, event.y, depth, this.pos);

    // Finally update the cube's world-space position
    this.entity.setPosition(this.pos);
};

Mouse.prototype.onMouseDown = function (event) {
    // If the left mouse button is pressed, change the cube color to red
    if (event.button === pc.MOUSEBUTTON_LEFT) {
        this.entity.render.meshInstances[0].material = this.redMaterial.resource;
    }

    // If the middle mouse button is pressed, change the cube color to green
    if (event.button === pc.MOUSEBUTTON_MIDDLE) {
        this.entity.render.meshInstances[0].material = this.greenMaterial.resource;
    }

    // If the right mouse button is pressed, change the cube color to blue
    if (event.button === pc.MOUSEBUTTON_RIGHT) {
        this.entity.render.meshInstances[0].material = this.blueMaterial.resource;
    }
};
```

### マウスにアクセスする

マウスの制御は`pc.Mouse`オブジェクトによって管理されます。[フレームワーク][2]は、[application app][3]上でこれのインスタンスを提供します。このインスタンスは、すべてのスクリプトオブジェクトで次のように利用できます：

```javascript
this.app.mouse
```

### 右クリックメニューの無効化

スクリプトオブジェクトのコンストラクタでは、右クリックメニューを無効にすることにより、右マウスボタンをクリックしたときに表示されるポップアップを停止します。

```javascript
this.app.mouse.disableContextMenu();
```

### イベントへのバインド

`pc.Mouse`オブジェクトでは、マウスアクションに対応する異なるイベントをリッスンすることができます。チュートリアルでは、`onMouseMove`メソッドを移動イベントにバインドし、`onMouseDown`メソッドをボタンダウンイベントにバインドしています。

私たちがイベントにバインドするためにon()メソッドに`this`を渡すことにも注目してください。この3つ目の引数は、イベントコールバック内で`this`として使われるオブジェクトです。

```javascript
this.app.mouse.on(pc.EVENT_MOUSEMOVE, this.onMouseMove, this);
this.app.mouse.on(pc.EVENT_MOUSEDOWN, this.onMouseDown, this);
```

`pc.Mouse` で利用可能なイベントは以下の通りです。

* `pc.EVENT_MOUSEUP` - マウスボタンが離されたときに発火します。
* `pc.EVENT_MOUSEDOWN` - マウスボタンが押されたときに発火します。
* `pc.EVENT_MOUSEMOVE` - マウスが動かされたときに発火します。
* `pc.EVENT_MOUSEMOVE` - マウスが動いたときに発生する

ブラウザでのマウス入力は、通常、ページのDOM内の要素に対する[DOM][4]イベントをリスニングすることで実装されます。問題は、異なるブラウザがイベントを微妙に異なる方法で実装し、異なる値を提供することです。コードの記述を簡略化するために、PlayCanvasエンジンでは、イベントハンドラをDOM要素ではなくPlayCanvasのマウスハンドラにバインドすることができます。エンジンは、イベントが発火するときに、すべてのブラウザで一貫性のある`pc.MouseEvent`オブジェクトを提供します。もし元のDOMイベントが必要な場合は、`pc.MouseEvent`の`event`プロパティとして利用可能です。

### マウスの移動

最初のイベントハンドラは`onMouseMove`です。これはマウスが動くたびに発火します。`EVENT_MOUSEMOVE`イベントの場合、`MouseEvent`オブジェクトは現在のマウスの位置`x`と`y`、そして最後のイベントからの位置の変化`dx`と`dy`を持っています。当チュートリアルでは、マウスの現在の位置を使用し、キューブをカーソル位置に移動させています。

### マウスボタン

2つ目のイベントハンドラは`onMouseDown`です。これはマウスの三つのボタンのいずれかがクリックされるたびに発火します。`EVENT_MOUSEDOWN`と`EVENT_MOUSEUP`イベントでは、`MouseEvent`オブジェクトは押された/解放されたボタンを含む`button`プロパティを持ちます。次のいずれかの値になります。

* `pc.MOUSEBUTTON_NONE`
* `pc.MOUSEBUTTON_LEFT`
* `pc.MOUSEBUTTON_MIDDLE`
* `pc.MOUSEBUTTON_RIGHT`

私たちのチュートリアルでは、押されたマウスボタンに応じてキューブの色を変更しています。

### 試してみよう

全画面でのチュートリアルは[こちら][5]から、またはページの上部からお試しください。マウスを動かしてキューブを移動させ、左、中央、右のマウスボタンをクリックしてキューブの色を変更してみてください。

[1]: https://playcanvas.com/project/405819/overview/tutorial-basic-mouse-input
[2]: /user-manual/glossary#framework
[3]: /user-manual/glossary#application
[4]: /user-manual/glossary#dom
[5]: https://playcanv.as/p/MHIdZgaj/
