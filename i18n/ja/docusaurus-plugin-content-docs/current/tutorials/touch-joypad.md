---
title: ジョイスティック操作
tags: [input,ui]
thumb: "https://s3-eu-west-1.amazonaws.com/images.playcanvas.com/projects/12/1007506/2F5E56-image-75.jpg"
---

<div className="iframe-container">
    <iframe src="https://playcanv.as/p/kvE0iJWc/" title="Touchscreen Joypad Controls" allow="camera; microphone; xr-spatial-tracking; fullscreen" allowfullscreen></iframe>
</div>

[プロジェクトのリンク][project-link]をクリックしてください。

## 概要

このチュートリアルでは、タッチスクリーン操作を必要とするプロジェクトにインストールしてカスタマイズできるTouchscreen Joypadライブラリを共有します。

このライブラリでは、[PlayCanvas UI system][playcanvas-ui]が使用されているため、その前に使用したことがない場合は、UIシステムについて読むことをお勧めします。

![](/img/tutorials/touchscreen-joypad-controls/preview.gif)

## インストール方法

Open the [example project][project-link], right click on the folder 'touch-joypad' and click on 'Copy'.
![](/img/tutorials/touchscreen-joypad-controls/copy-folder.gif)

Open your project, right click in the assets panel and click on 'Paste'
![](/img/tutorials/touchscreen-joypad-controls/paste-folder.gif)

## ジョイスティックの追加

貼り付けたフォルダで、'templates'フォルダを開きます。ここには、最も一般的な使用例に対応するために4つの事前設定されたジョイスティックのテンプレートがあります。

* **Left/Right Fixed Touch Joystick** - 画面の左下/右下に固定されたジョイスティック。レトロプラットフォームゲームなど、即時の反応が期待されるゲームにお勧めです。
* **Left/Right Half Touch Joystick** - 入力領域が画面の左側/右側で、ジョイスティックはその領域でタッチした場所に移動し、移動にはドラッグが必要です。アプリケーション内でオブジェクトを「押したり」「引いたり」する場合にお勧めです。

この例では、'Left Half Touch Joystick'テンプレートを使用しましょう。

2DスクリーンのEntityを作成し、[テンプレートを子として追加][add-template-docs]します。

![](/img/tutorials/touchscreen-joypad-controls/adding-left-half-joystick.gif)

ジョイスティックは3つのEntityで構成されています。

* 入力領域(赤で囲まれた部分)
* ベース(青で囲まれた部分)
* ノブ(青で囲まれた部分)

![](/img/tutorials/touchscreen-joypad-controls/joystick-layout.png)

入力領域は、タッチおよびマウス(デバッグ目的)イベントをリッスンし、イベントの伝播を停止します。

つまり、この領域よりも下にあるUIエレメントおよび[pc.Mouse][pc-app-mouse-api]または[pc.Touch][pc-app-touch-api]イベントは、最初にこのエリアが操作された場合には発生しなくなります。

入力領域はUIエレメントであるため、[UIシステムレイアウト][elements-manual]を使用して、必要に応じて位置、サイズ、およびアンカーを特定することができます。

また、ジョイスティックに必要なすべてのロジックと属性を持つ'touchJoystick'があります。各属性には、詳細が記載されたツールチップがあります。

![](/img/tutorials/touchscreen-joypad-controls/joystick-script-attributes.gif)

ベースとノブのエンティティはスクリプトで制御され、UIエレメントです。ジョイスティックをテンプレート内の場所以外に配置する場合は、ベースエンティティを必要な場所に配置し、アンカーを設定してください。

### 動作タイプ

タッチスクリーンゲームやアプリケーションで一般的に見つかるジョイスティックには、3つの動作タイプがあります。

![](/img/tutorials/touchscreen-joypad-controls/joystick-type.png)

'Fixed in place' where the base of the joystick does not move from it's position:
![](/img/tutorials/touchscreen-joypad-controls/joystick-fixed.gif)

'Move to first touch and fixed' where the base of the joystick moves to where the user first touches in the input area and then stays fixed:
![](/img/tutorials/touchscreen-joypad-controls/joystick-relative-fixed.gif)

'Move to first touch and drags' where the base of the joystick moves to where the user first touches in the input area and then is dragged when the user drags pass the joystick range:
![](/img/tutorials/touchscreen-joypad-controls/joystick-relative-drag.gif)

これは、ランタイムで変更できるため、アプリケーションの設定の一部として、ユーザーオプションとして追加することができます。

### ジョイスティック値の読み取り

![](/img/tutorials/touchscreen-joypad-controls/joystick-deadzone-range.png)

赤い円は死角であり、ノブの位置がその円内にある場合、ジョイスティックの値は両方の軸とも0を返します。青い円は範囲で、ノブはその円の外に出ることはできません。

値は常に、ノブが死角(赤い円)と範囲(青い円)の間にある場所に基づいて、両軸とも-1から1まで正規化されます。

円のサイズは、エディターでスクリプトの属性を設定することができます。

ジョイスティック値は、グローバルJavascriptオブジェクト`window.touchJoypad.sticks`で識別子を指定してコードからアクセスできます。識別子のデフォルトは「joystick0」ですが、スクリプトのエディターでより具体的なものに変更できます。

例:

```javascript
// グローバルオブジェクトから識別子でジョイスティックを取得
var joystick = window.touchJoypad.sticks['joystick0'];

// 両ジョイスティック軸の正規化値を取得してコンソールに表示
console.log('X: ' + joystick.x + ', Y: ' + joystick.y);
```

[デモ][project-link]では、カメラは右ジョイスティックによって制御されており、[こちらのスクリプト][orbit-camera-joypad-input-script]で値を取得して使用しているのがわかります。

## ボタンの追加

ボタンは画面上の固定位置のUIエレメントです。'templates'フォルダにボタンのテンプレートがあり、[子として追加][add-template-docs]する必要があります。

![](/img/tutorials/touchscreen-joypad-controls/adding-button.gif)

UIエレメントであるため、[UIシステムレイアウト][elements-manual]を使用して、必要に応じて位置、サイズ、およびアンカーを特定することができます。

ジョイスティックと同様に、識別子があるため、グローバルJavascriptオブジェクト`window.touchJoypad.buttons`からコードでアクセスできます。以下は、APIです。

| 関数名 | 説明 |
|---------------|-------------|
| isPressed     | ボタンの識別子を取得し、そのボタンが現在押されている場合はtrueを返します。 |
| wasPressed    | ボタンの識別子を取得し、そのボタンが前回のフレーム以降に押された場合はtrueを返します。 |
| wasReleased   | ボタンの識別子を取得し、そのボタンが前回のフレーム以降に離された場合はtrueを返します。 |
| wasTapped     | ボタンの識別子を取得し、そのボタンが200ms以内に押され、離された場合はtrueを返します。つまり、クイックタップです。 |

ジョイスティックもボタンとして機能するため、使用方法に柔軟性が生まれます。たとえば、PlayStationコントローラーのL3/R3入力のように、ジョイスティック識別子を使用して`wasTapped` APIを実行できます。

コード例:

```javascript
// ボタンのグローバルオブジェクトを取得
var buttons = window.touchJoypad.buttons

// 前回のフレーム以降にボタンが押されたかどうかを確認する
console.log('Was pressed: ' + buttons.wasPressed('button0'));
```

[このデモ][project-link]では、キャラクターは左のジョイスティックとボタンで制御されています。[ここで][player-controller-script]スクリプトを確認すると、攻撃アニメーションを再生する方法がわかります。

[project-link]: https://playcanvas.com/project/1007506/overview/touchscreen-joypad-controls
[playcanvas-ui]: /user-manual/user-interface/
[add-template-docs]: /user-manual/editor/templates/#adding-templates-in-your-scene
[pc-app-mouse-api]: https://api.playcanvas.com/engine/classes/Mouse.html
[pc-app-touch-api]: https://api.playcanvas.com/engine/classes/Touch.html
[elements-manual]: /user-manual/user-interface/elements/
[orbit-camera-joypad-input-script]: https://playcanvas.com/editor/code/1007506?tabs=111433673
[player-controller-script]: https://playcanvas.com/editor/code/1007506?tabs=111432679
