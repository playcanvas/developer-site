---
title: WebXR UI インタラクション
tags: [vr, ar, input, ui]
thumb: "https://s3-eu-west-1.amazonaws.com/images.playcanvas.com/projects/12/460449/314C07-image-75.jpg"
---

<div className="iframe-container">
    <iframe src="https://playcanv.as/p/TAYVQgU2/" title="WebXR UI Interaction" allow="autoplay;xr-spatial-tracking" allow="camera; microphone; xr-spatial-tracking; fullscreen" allowfullscreen></iframe>
</div>

*VR/AR対応のデバイスやヘッドセットがある場合は、VR/ARボタンをクリックしてください。*

これは、レーザーポインターや視線、タッチスクリーンなどのUIとXR入力ソース (Input Source)との間のインタラクションを提供するWebXR体験です。デスクトップ、モバイル、Oculus Browser、Google CardboardTM、Google DaydreamTM、Samsung Gear VRTM、その他のVR/ARヘッドセットをサポートしています。

[チュートリアル][1]プロジェクトのソースを見てみましょう。

## VR/ARへの入り方

PlayCanvas上のすべてのWebXR体験には、次の2つの要素が必ず何らかの形であります。

* ユーザーがVR/ARに入るためのユーザーインタラクションを追加する
* カメラでVR/ARを有効にする

```javascript
button.element.on('click', function() {
    // check support for VR
    if (app.xr.isAvailable(pc.XRTYPE_VR)) {
        // start VR session
        cameraEntity.camera.startXr(pc.XRTYPE_VR, pc.XRSPACE_LOCALFLOOR);
    }
});
```

このプロジェクトでは、ルートエンティティに追加される `xr.js` があります。これは、VRとARのUIボタンを管理し、XR可用性の変更やXRセッション状態の変更に反応します。

WebXRのPlayCanvas APIの詳細については、[ユーザーマニュアル][2]を参照してください。

## XR入力タイプ

入力デバイスの精度レベルは、次のグループに分けることができます(DOF == Degrees of Freedom)。

* **Gaze** - 位置と姿勢が無い、ヘッドマウントディスプレイの方向に基づくデフォルトタイプ。つまり、常にユーザーが向いている方向に向かっています。これには、Google CardboardTMやSamsung Gear VRTMなどのモバイルベースのVRデバイスが含まれます。
* **Screen** - ARで可能なタッチベースの入力ソース。例えば、タッチスクリーンを搭載したモバイルデバイス。
* **Tracked Pointer** - 追跡された回転と、任意に追跡された空間内の位置を持つ入力ソース。これは通常、握ることができるデバイスであり、手に関連付けられる、コントローラーまたは追跡された手自体としています。これには、Google DaydreamTM、Gear VRTM Controller、Oculus TouchTM、ViveTMコントローラーなどがあります。

すべての入力ソースには、開始点を示すオリジンを持つレイと、指し示す向きを持つレイがあります。PlayCanvasにおけるWebXR入力ソースの実装は、開発者が追加の作業なしにすべての入力ソースタイプをサポートします。入力ソースが握れる場合、提供された位置と回転に基づいてそのモデルをレンダリングすることができます。

### 入力ソース

トラッキングされた入力ソースのシステムは、2つのファイルで構成されています。

#### `controllers.js`

これは、[XrInput][4]を使用して追加された入力ソースを追跡し、それらのためのコントローラーエンティティのインスタンスを作成します。例:

```javascript
app.xr.input.on('add', function (inputSource) {
    // new input source is added
});
```

#### `controller.js`

これは、それに関連付けられている元の[XrInputSource][5]を持つ各エンティティにアタッチされ、入力ソース自体と関連付けられています。入力ソースが握れる場合、コントローラーのビジュアルモデルの子エンティティを有効にします。

各更新では、入力ソースの位置と回転に基づいてエンティティを位置決めし、回転します。

```javascript
if (inputSource.grip) {
    this.visualEntity.enabled = true;
    this.entity.setPosition(this.inputSource.getPosition());
    this.entity.setRotation(this.inputSource.getRotation());
}
```

## UI

3D UIは、[Button][6]と[Element][7]コンポーネントを使用して作成されます。両方を組み合わせることで、3D空間でインタラクティブなボタンを作成することができます。

XR環境のための3D UIの作成方法は、ノンXR環境でのマウス/タッチのインタラクションの3D UIの作成方法とまったく同じです。[ユーザーインターフェース][3]の作成については、もっと読むことができます。

デフォルトでは、各XrInputSourceには`elementInput`プロパティが有効になっています。これは、関連付けられた3Dレイを使用して、マウスまたはタッチ入力と同様にButtonコンポーネントと相互作用することを意味します。各入力ソースには、[origin][8]と[direction][9]を持つレイがあります。このチュートリアルでは、入力ソースのレイを可視化しています。

```javascript
// set starting point of ray
vecA.copy(inputSource.getOrigin());
// set end point of ray
vecB.copy(inputSource.getDirection());
vecB.scale(1000).add(vecA);
// render line between those two points
app.renderLine(vecA, vecB, color);
```

## UIインタラクション

このチュートリアルでは、Rotate(button-rotate.js)とColor(button-color.js)の2種類のボタンがあります。回転ボタンを[クリック][10]すると、キューブの回転速度が設定されます。

```javascript
entity.button.on('click', function() {
    targetEntity.script.cube.rotateSpeed = rotateSpeed;
});
```

色のボタンをクリックすると、キューブモデルの各メッシュインスタンスの拡散色が変更されます。

このUIインタラクションは、入力ソースに対して不偏です。つまり、VRのハンドヘルドデバイス、モバイルVRのGaze入力、AR環境の画面上のタッチ、そしてクラシックなマウスとタッチのいずれからでも発生します。したがって、真にマルチプラットフォームアプリケーションを作成し、テストすることが容易です。

[1]: https://playcanvas.com/project/460449/overview/webvr-ray-input
[2]: /user-manual/xr/using-webxr/
[3]: /user-manual/user-interface/
[4]: https://api.playcanvas.com/engine/classes/XrInput.html
[5]: https://api.playcanvas.com/engine/classes/XrInputSource.html
[6]: https://api.playcanvas.com/engine/classes/ButtonComponent.html
[7]: https://api.playcanvas.com/engine/classes/ElementComponent.html
[8]: https://api.playcanvas.com/engine/classes/XrInputSource.html#getorigin
[9]: https://api.playcanvas.com/engine/classes/XrInputSource.html#getdirection
[10]: https://api.playcanvas.com/engine/classes/ButtonComponent.html#event:click
