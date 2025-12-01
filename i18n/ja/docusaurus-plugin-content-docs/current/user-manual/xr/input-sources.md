---
title: 入力ソース
---

[XrInputSource][1]は、ユーザーが仮想世界と対話できるようにする入力メカニズムを表します。これらには、ハンドヘルドコントローラー、光学的に追跡される手、視線ベースの入力方法、タッチスクリーンが含まれますが、これらに限定されません。ただし、入力ソースは従来のゲームパッド、マウス、またはキーボードとは明示的に関連付けられていません。

<img loading="lazy" src="/img/user-manual/xr/controllers.webp" alt="レイを持つコントローラーモデル" width="720" />

## 入力ソースへのアクセス

入力ソースのリストは、[XrManager][3]によって作成される[XrInput][2]マネージャーで利用可能です。

```javascript
const inputSources = app.xr.input.inputSources;
for (let i = 0; i < inputSources.length; i++) {
    // 利用可能な入力ソースを反復処理します
}
```

入力ソースは動的に追加および削除できます。これは、物理デバイスを接続するか、基盤となるプラットフォームを介して入力デバイスを切り替えることによって行われます。

一部の入力ソースは**一時的（transient）**であり、主要なアクション中に短い寿命を持ちます。例としては次のものがあります。

- モバイルARセッションでのタッチスクリーンタップ。
- Apple Vision Proなどのアイトラッキングデバイスで使用される視線 + ピンチ操作。
- シンプルなVRデバイスで一般的な視線VR操作。

`add`および`remove`イベントを購読し、必要に応じてそれらの視覚的表現を作成するのが最善です。

```javascript
app.xr.input.on('add', (inputSource) => {
    // 入力ソースが追加されました

    inputSource.once('remove', () => {
        // 入力ソースが削除されたことを知る
    });
});
```

## プライマリアクション (select)

各入力ソースにはプライマリアクション`select`を設定できます。コントローラーの場合、これはプライマリボタン/トリガーです。タッチスクリーンの場合、タップです。手の場合、親指と人差し指のピンチです。また、次のように購読できる`selectstart`および`selectend`イベントもあります。

```javascript
inputSource.on('select', () => {
    // プライマリアクション
});
```

または入力マネージャーを介して:

```javascript
app.xr.input.on('select', (inputSource) => {
    // プライマリアクション
});
```

## レイ

各入力ソースには、それが指す**原点（origin）**と、それが指している**方向（direction）**を持つレイがあります。レイはワールド空間に変換されます。入力ソースのいくつかの例としては、以下が挙げられますが、これらに限定されません。

- **コントローラー**（例: Meta Quest Touch）は、ハンドヘルドデバイスの先端から発するレイを持ち、その方向はデバイスの回転に基づきます。
- **手**は、親指と人差し指の先端の間の点から発し、前方へ指すレイを持ちます。基盤となるシステムが手用のレイを提供しない場合でも、PlayCanvas engineがそれをエミュレートします。したがって、すべての手にはレイがあるはずです。
- **スクリーン**ベースの入力。これは、ARセッションタイプでモバイルデバイス（モノスクリーン）上で利用できる場合があります。そこでは、ユーザーはタッチスクリーンを介して仮想世界と対話できます。
- **視線**ベースの入力。例えば、Google Cardboardスタイルのデバイスに携帯電話が挿入されるような場合です。これは`targetRayMode`が`pc.XRTARGETRAY_GAZE`に設定された入力ソースを持ち、視聴者の位置から発し、ユーザーが向いている方向にまっすぐ指します。

<img loading="lazy" src="/img/user-manual/xr/controller-ray.webp" alt="コントローラーからのレイ" width="480" />

ターゲットレイのタイプを確認できます。

```javascript
switch (inputSource.targetRayMode) {
    case pc.XRTARGETRAY_SCREEN:
        // ARモードのモバイルにおけるタッチスクリーンなどのスクリーンベースの操作
        break;
    case pc.XRTARGETRAY_POINTER:
        // ハンドヘルドコントローラーや手などのポインターベース
        break;
    case pc.XRTARGETRAY_GAZE:
        // 視聴デバイスの向きと位置に基づく視線ベース
        break;
}
```

レイがメッシュのバウンディングボックスと交差したかどうかを確認する方法を示す例を次に示します。

```javascript
// 入力ソースデータでレイを設定
ray.set(inputSource.getOrigin(), inputSource.getDirection());

// メッシュのバウンディングボックスがレイと交差するかどうかを確認
if (meshInstance.aabb.intersectsRay(ray)) {
    // 入力ソースがメッシュを指している
}
```

## グリップ

一部の入力ソースは、Meta Quest Touchのような物理的なハンドヘルドデバイスと関連付けられており、位置と回転を持つことができます。それらの位置と回転はワールド空間で提供されます。

これは、現実のコントローラーの位置と回転に一致する仮想コントローラーをレンダリングするために使用できます。

```javascript
if (inputSource.grip) {
    // デバイスモデルをレンダリング可能
    // モデルに関連付けられたエンティティを配置および回転
    entity.setPosition(inputSource.getPosition());
    entity.setRotation(inputSource.getRotation());
}
```

## ゲームパッド

プラットフォームが[WebXR Gamepads Module][4]をサポートしている場合、入力ソースには関連する[GamePad][5]オブジェクトが含まれることがあり、これによりボタン、トリガー、軸、その他の入力ハードウェアの状態にアクセスできます。

```javascript
const gamepad = inputSource.gamepad;
if (gamepad) {
    if (gamepad.buttons[0] && gamepad.buttons[0].pressed) {
        // ユーザーがゲームパッドのボタンを押した
    }
}
```

## ハンド

[ハンドトラッキング][7]の専用ページをご覧ください。

## プロファイル

各入力ソースには、[プロファイルレジストリ][6]に記述されている入力ソースのタイプを説明する文字列のリストが含まれる場合があります。これに基づいて、ハンドヘルドデバイスにどのようなモデルをレンダリングするか、またはどのような機能を備えているかを判断できます。さらに、プロファイルレジストリには、ボタンや軸などのゲームパッドのマッピング詳細がリストされています。

```javascript
if (inputSource.profiles.includes('oculus-touch-v2')) {
    // これはOculus Touch™ハンドヘルドデバイスです
}
```

## UI

3Dスクリーン、ボタン、スクロールビュー、その他のコンポーネントといったUI要素は、入力ソースと連携してうまく機能します。`click`などのイベントは、マウス、タッチ、XR入力ソースといった入力タイプに関わらずトリガーされます。

デフォルトでは、すべての入力ソースのレイがUIコンポーネントとのインタラクションチェックに使用されますが、フラグを使用してこれを無効にすることができます。

```javascript
inputSource.elementInput = false;
```

入力ソースがインタラクションしたUIエンティティにもアクセスできます。

```javascript
const entity = inputSource.elementEntity;
if (entity) {
    // 入力ソースがインタラクションした特定のエンティティ
}
```

特定のマウスイベントやタッチイベントと同様に、XR入力ソースのみによって発生するButtonComponentの`select`イベントを購読することも可能です。

```javascript
entity.button.on('selectstart', (evt) => {
    // このボタンはevt.inputSourceによって選択されました
});
```

[1]: https://api.playcanvas.com/engine/classes/XrInputSource.html
[2]: https://api.playcanvas.com/engine/classes/XrInput.html
[3]: https://api.playcanvas.com/engine/classes/XrManager.html
[4]: https://www.w3.org/TR/webxr-gamepads-module-1/
[5]: https://w3c.github.io/gamepad/
[6]: https://github.com/immersive-web/webxr-input-profiles/tree/master/packages/registry
[7]: /user-manual/xr/hand-tracking/
