---
title: カメラのさらなる活用
tags: [basics, camera]
thumb: "https://s3-eu-west-1.amazonaws.com/images.playcanvas.com/projects/12/405835/E7331A-image-75.jpg"
---

<div className="iframe-container">
    <iframe src="https://playcanv.as/p/5yUf1fvg/" title="More Cameras" allow="camera; microphone; xr-spatial-tracking; fullscreen" allowfullscreen></iframe>
</div>

*クリックしてフォーカスし、 `スペース` キーでズームインとズームアウトを行い、 `左矢印` キーと `右矢印` キーで左右のカメラに切り替えます*

[基本カメラ](/tutorials/basic-cameras/)チュートリアルでは、カメラエンティティの作成とシーンへの追加方法が説明されています。単一の静的カメラの場合、スクリプトは必要ありません。ただし、より動的でインタラクティブなカメラやより高度な使用法の場合は、Scriptコンポーネントをアタッチして、カメラの動作をプログラムすることができます。

## 属性の変更

ランタイム中にカメラを変更する最初の方法は、Cameraコンポーネントの属性値を変更することです。これは、任意のコンポーネントの属性を設定する方法と同じ方法で行います。つまり、ComponentSystemの `set()` および `get()` メソッドを使用します。

```javascript
var Zoom = pc.createScript('zoom');

// initialize code called once per entity
Zoom.prototype.initialize = function() {
    this.targetFov = 45;
};

// update code called every frame
Zoom.prototype.update = function(dt) {

    if (this.app.keyboard.wasPressed(pc.KEY_SPACE) ) {
        if (this.targetFov == 10) {
            this.targetFov = 45;
        } else {
            this.targetFov = 10;
        }
    }

    var fov = this.entity.camera.fov;
    if (fov < this.targetFov) {
        fov += (10 * dt);
        if (fov > this.targetFov) {
            fov = this.targetFov;
        }
    }

    if (fov > this.targetFov) {
        fov -= (10 * dt);
        if (fov < this.targetFov) {
            fov = this.targetFov;
        }
    }
    this.entity.camera.fov = fov;
};

```

このサンプルでは、スペースバーを押すと、視野角が変わります。 `var fov = this.entity.camera.fov` で、このスクリプトがアタッチされているエンティティのCameraコンポーネントから `fov` の値を `get()` します。

`this.app.keyboard.wasPressed()` でキー操作を検出し、ターゲットfovの値を切り替えます。

最後の2つのネストされた `if(){}` 構造で、ズームイン/ズームアウト効果を作成するために、徐々にfovの値を変更します。

`this.entity.camera.fov = fov` で、新しい値で `set()` fovカメラ属性を設定します。

ズームアウトしている場合、上部と下部のキューブが画面の端に配置されていることに注意してください。これは、[PlayCanvasエディタのシーン](https://playcanvas.com/editor/scene/440116)での期待に合致しています。そこでは、キューブはカメラの[フラスタム](https://en.wikipedia.org/wiki/Frustum)の上部と下部に配置されています。

## 現在のカメラ

カメラの相互作用を作成する別の方法は、複数のカメラエンティティ間の切り替えです。これは、複数のカメラエンティティをシーンに追加し、必ず1つを有効にし、スクリプトで現在のカメラをランタイムで変更することによって実現できます。

```javascript
var CameraManager = pc.createScript('cameraManager');

// initialize code called once per entity
CameraManager.prototype.initialize = function() {
    this.activeCamera = this.entity.findByName('Center');
    this.app.keyboard.on(pc.EVENT_KEYDOWN, this.onKeyDown, this);

    this.on('destroy', function() {
        this.app.keyboard.off(pc.EVENT_KEYDOWN, this.onKeyDown, this);
    }, this);
};

//prevents default browser actions, such as scrolling when pressing cursor keys
CameraManager.prototype.onKeyDown = function (event) {
    event.event.preventDefault();
};

CameraManager.prototype.setCamera = function (cameraName) {
    // Disable the currently active camera
    this.activeCamera.enabled = false;

    // Enable the newly specified camera
    this.activeCamera = this.entity.findByName(cameraName);
    this.activeCamera.enabled = true;
};

// update code called every frame
CameraManager.prototype.update = function(dt) {
    var app = this.app;

    if (app.keyboard.wasPressed(pc.KEY_SPACE) ) {
        this.setCamera('Center');
    } else if (app.keyboard.wasPressed(pc.KEY_LEFT)) {
        this.setCamera('Left');
    } else if (app.keyboard.wasPressed(pc.KEY_RIGHT)) {
        this.setCamera('Right');
    }
};
```

このサンプルでは、矢印キーを押すと現在のカメラが左側または右側のカメラエンティティ（現在ロードされているシーンのエンティティから）に設定され、スペースキーを押すと中央のカメラがアクティブになります。

最初に、名前で指定したカメラエンティティを見つけるための関数を作成します。この関数は、このスクリプトの親エンティティに対して `findByName()` 関数を適用します（カメラがそこに配置されているため、`this.app.root.findByName()` を使用してシーン内のすべてのエンティティを検索する必要はありません）。

矢印キーとスペースキーに対応するカメラエンティティの名前を含むオブジェクトを設定します（[エディタのシーンを参照](https://playcanvas.com/editor/scene/440116)）。

次に、キーをループして、そのうちの一つが押されるとエンティティを名前から探し、以前にスクリプトで定義した、現在のアクティブなカメラを無効にして有効にする次のカメラを探す`setCamera()` 関数を使用して現在のカメラに設定します。
