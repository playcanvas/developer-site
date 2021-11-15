---
title: 基本的なマウス入力
template: tutorial-page.tmpl.html
tags: mouse, input
thumb: https://s3-eu-west-1.amazonaws.com/images.playcanvas.com/projects/12/405819/2DF062-image-75.jpg
---

<iframe src="https://playcanv.as/p/MHIdZgaj/?overlay=false"></iframe>

*マウスを動かすとキューブが動きます。マウスのボタンを押すとキューブの色が変わります。*

Mouse handling in the PlayCanvas engine is provided by the `pc.Mouse` object. The Mouse object provides a simple interface for detecting when the mouse is moved or when mouse buttons are pressed. It also removes some of the cross-browser inconsistencies with handling mouse co-ordinates.

[チュートリアルプロジェクト][1]をご確認ください。mouse.jsのコードは次の通りです：

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

    // If the left mouse button is pressed, change the cube color to green
    if (event.button === pc.MOUSEBUTTON_MIDDLE) {
        this.entity.render.meshInstances[0].material = this.greenMaterial.resource;
    }

    // If the left mouse button is pressed, change the cube color to blue
    if (event.button === pc.MOUSEBUTTON_RIGHT) {
        this.entity.render.meshInstances[0].material = this.blueMaterial.resource;
    }
};
```

### マウスにアクセス

マウスコントロールは`pc.Mouse`オブジェクトによって管理されます。  [フレームワーク][2]は、[アプリケーションapp][3]でこのインスタンスを提供します。これは次のように全てのスクリプトオブジェクトで利用可能です：

```javascript
this.app.mouse
```

### 右クリックメニューを無効化

スクリプトオブジェクトのコンストラクタでは、右クリックメニューを無効にしているので、マウスの右ボタンをクリックしてもポップアップメニューは表示されません。

```javascript
this.app.mouse.disableContextMenu();
```

### イベントにバインド

`pc.Mouse`オブジェクトから、マウス操作に対応したさまざまなイベントを聞くことができます。チュートリアルでは、moveイベントに`onMouseMove`メソッドを、ボタンダウンイベントに`onMouseDown`をバインドします。

イベントへのバインドのために`this` をon()メソッドに渡します。この3番目の引数は、イベントコールバックで`this`として使用されるオブジェクトです。

```javascript
this.app.mouse.on(pc.EVENT_MOUSEMOVE, this.onMouseMove, this);
this.app.mouse.on(pc.EVENT_MOUSEDOWN, this.onMouseDown, this);
```

`pc.Mouse`で利用可能なイベント：

* `pc.EVENT_MOUSEUP` - マウスボタンが開放されると発動
* `pc.EVENT_MOUSEDOWN` - マウスボタンが押されると発動
* `pc.EVENT_MOUSEMOVE` - マウスが動かされると発動
* `pc.EVENT_MOUSEWHEEL` - マウスホイールが動かされると発動

Mouse input in browsers is usually implemented by listening to [DOM][4] events on elements in your page's DOM. The problem is that different browsers implement the events slightly differently and supply different values. In order to simplify the code you write the PlayCanvas engine allows you to bind your event handlers to the PlayCanvas mouse handler instead of directly the DOM Element. The engine supplies a `pc.MouseEvent` object when the event fires which is consistent across all browsers. If you do need the original DOM event, it is available as the `event` property in `pc.MouseEvent`.

### マウスを動かす

最初のイベントハンドラは`onMouseMove`です。これは、マウスが移動するたびに発動します。`EVENT_MOUSEMOVE`イベントの場合、` MouseEvent`オブジェクトには、現在のマウスの位置を`x`と`y`、最後のイベント以来の位置の変化を`dx`と`dy`で示します。チュートリアルでは、マウスの現在位置を使用して、カーソル位置にキューブを移動します。

### マウスボタン

二つ目のイベントハンドラは`onMouseDown`です。3つのマウスボタンのいずれかがクリックされると発動します。`EVENT_MOUSEDOWN`と` EVENT_MOUSEUP`イベントでは、`MouseEvent`オブジェクトに押下／開放されたボタンを含む` button`プロパティがあります。これは、次の値のいずれかになります：

* `pc.MOUSEBUTTON_NONE`
* `pc.MOUSEBUTTON_LEFT`
* `pc.MOUSEBUTTON_MIDDLE`
* `pc.MOUSEBUTTON_RIGHT`

チュートリアルでは、押されたマウスボタンに応じてキューブの色を変更します。

### 試してみよう

フルスクリーンでのチュートリアルはページ上部または[こちらから] [5]お試しください。マウスの移動でキューブを動かし、左、中、右マウスボタンをクリックしてキューブの色を変更します。

[1]: https://playcanvas.com/project/405819/overview/tutorial-basic-mouse-input
[2]: /user-manual/glossary#framework
[3]: /user-manual/glossary#app
[4]: /user-manual/glossary#dom
[5]: https://playcanv.as/p/MHIdZgaj/

