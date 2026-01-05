---
title: キーボード入力の基礎
tags: [input]
thumb: "https://s3-eu-west-1.amazonaws.com/images.playcanvas.com/projects/12/405804/513097-image-75.jpg"
---

<div className="iframe-container">
    <iframe src="https://playcanv.as/p/rFZGQWCi/?overlay=false" title="Basic Keyboard Input" allow="camera; microphone; xr-spatial-tracking; fullscreen" allowfullscreen></iframe>
</div>

*フォーカスしてから`左矢印キー`、`右矢印キー`、`スペースバー`を押して立方体を回転させます。 'a' キーを押してリリースすると色が変わります。*

PlayCanvasエンジンでのキーボード操作は`pc.Keyboard`オブジェクトで提供されます。Keyboardオブジェクトは、キーが押されているかどうかを確認するなど、一般的なキーボード操作のための単純なインタフェースを提供します。また、キーコードや文字コードの処理に関するさまざまなクロスブラウザー問題を解決します。

[チュートリアルプロジェクト](https://playcanvas.com/project/405804/overview/tutorial-basic-keyboard-input)のキーボード入力シーンをご確認ください。チュートリアルのコードはこちらです。

```javascript
var KeyboardHandler = pc.createScript('keyboardHandler');

KeyboardHandler.attributes.add('redMaterial', {
    type: 'asset',
    assetType: 'material'
});

KeyboardHandler.attributes.add('whiteMaterial', {
    type: 'asset',
    assetType: 'material'
});

// initialize code called once per entity
KeyboardHandler.prototype.initialize = function() {
    //キーボードデバイスでいろいろなイベントを監視するためにon()を使います。
    //引数は以下の通りです。
    //1)監視するイベント名
    //2)イベントが呼び出された際に呼び出されるコールバック関数
    //3)(オプション)コールバック関数で使用する 'this' の値
    this.app.keyboard.on(pc.EVENT_KEYDOWN, this.onKeyDown, this);
    this.app.keyboard.on(pc.EVENT_KEYUP, this.onKeyUp, this);
};

// update code called every frame
KeyboardHandler.prototype.update = function(dt) {
    /*
     * Notice in the demo that pressing and holding the arrow keys doesn't
     * make the block spin. wasPressed() is used to detect a
     * keypress that occurred since the last frame and will only be
     * called once even if the key is held down.
     */
    var angle = 0;
    if (this.app.keyboard.wasPressed(pc.KEY_LEFT)) {
        angle = -5;
    } else if (this.app.keyboard.wasPressed(pc.KEY_RIGHT)) {
        angle = 5;
    }

    /*
     * Notice that pressing and holding the space bar makes the block
     * continuously spin. isPressed() is used to detected if a
     * key is down right now. So it will be true every frame as long as
     * the key is still pressed.
     */
    if (this.app.keyboard.isPressed(pc.KEY_SPACE)) {
        angle = 1;
    }

    //回転する立方体の更新
    this.entity.rotateLocal(0, angle, 0);
};

/*
* Event handler called when key is pressed
*/
KeyboardHandler.prototype.onKeyDown = function (event) {
    // Check event.key to detect which key has been pressed
    //event.keyには押されたキーに対する識別子が入っています。
    if (event.key === pc.KEY_A && this.redMaterial) {
        this.entity.render.meshInstances[0].material = this.redMaterial.resource;
    }

    // When the space bar is pressed this scrolls the window.
    // Calling preventDefault() on the original browser event stops this.
    //スペースバーを押すと、ウィンドウがスクロールします。
    //preventDefault()をオリジナルのブラウザイベントに呼び出すことで、これが停止します。
    event.event.preventDefault();
};

/*
* Event handler called when key is released
*/
KeyboardHandler.prototype.onKeyUp = function (event) {
    //event.keyには押されたキーに対する識別子が入っています。
    if (event.key === pc.KEY_A && this.whiteMaterial) {
        this.entity.render.meshInstances[0].material = this.whiteMaterial.resource;
    }
};
```

キーボード入力を検出する方法には2つの方法があります。1つ目は、スクリプトのupdateメソッドで行います。 `isPressed()`と`wasPressed()`を使用して、キーが現在押されているか、または押されたばかりかどうかを確認します。 2番目の方法は、イベントを使用してキーが押されたときまたは放されたときに応答することです。

## `isPressed` vs `wasPressed`

上記のデモでは、`isPressed()`と`wasPressed()`の振る舞いの違いが見られます。

左または右矢印キーを押してボタンを押したままにすると、キューブが5°回転しますが、回転は1回だけです。 これは、 `wasPressed()`がキーが最後に押されたフレームでのみ true を返すためです。

スペースバーを押しているときに立方体が1°ずつ連続的に回転することがわかります。これは、 `isPressed()`がキーが押されている間はすべてのフレームで true を返すためです。

### `isPressed(key)`

`isPressed(key)`は、 `key` が現在押されているかどうかを確認し、それがそうである場合に trueを返します。キーが押されている間は、各フレームに対してtrueが返されます。

### `wasPressed(key)`

`wasPressed(key)`は、`key`が *前のフレーム以降* に押されたかどうかをチェックします。`wasPressed()`は、単一のキー押下に対して一度だけtrueを返します。

## イベント

キーを押したときに応答するキーボード-インプットの2番目の方法は、イベントをリッスンすることです。`Keyboard`デバイスには、次の2つのキーボードイベントがあります。

* `pc.EVENT_KEYDOWN`
* `pc.EVENT_KEYUP`

[DOM](/user-manual/glossary#dom)キーボードイベントは、さまざまなブラウザーで異なる方法で実装されているため、PlayCanvas Engineでは、すべての場所で同じコードを使用できるように、`pc.Keyboard`オブジェクト上のイベントを提供します。 キーボードイベントが発生すると、イベントハンドラーに`pc.KeyboardEvent`オブジェクトが渡され、そのオブジェクトには押されたキーのキーコードが含まれます。

on()には第3引数があり、これはスクリプトインスタンス自体、つまり`this`です。 on()の第3引数は、イベントコールバック関数での `this` として使用されるため、ここで正しいオブジェクトに設定されていないといけません。

## キーコード

キーの識別は、キーコードを使用して行われます。キーコードは、キーボードのキーに対応する数値です。たとえば、pc.KEY_Aは `A`キーを表し、pc.KEY_LEFTは左矢印キーを表します。

注意点として、将来的に定数の値が変更されることがあるため、数値を使用せず、常に列挙子 `pc.KEY_*` を使用する必要があります。

## 試してみよう

こちらの[こちら](https://playcanv.as/p/rFZGQWCi/)でフルスクリーン表示して、矢印キーをタップしてホールドする際の挙動とスペースバーをタップしてホールドする際の挙動を比較してみてください。
