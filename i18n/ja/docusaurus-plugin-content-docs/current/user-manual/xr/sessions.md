---
title: セッション
description: "PlayCanvasのXRセッションについて、VRとARのセッションタイプ、利用可能かどうかの確認、ユーザー操作からオプションと機能を指定してセッションを開始する方法、参照空間、カメラとそのリグ、トラッキング空間、表示状態、セッションの終了、WebXRを直接使う方法を説明します。"
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

XRセッションとは、ユーザーのヘッドセットやスマートフォンがアプリケーションを没入型で表示している間のことです。セッションの開始と終了は、アプリケーションのXRマネージャーである`app.xr`が行います。セッションの実行中、`app.xr`はユーザーの頭の動きに合わせてカメラを動かし、ユーザーの入力を報告します。このページでは、セッションの開始から終了までの流れと、セッションで使われる空間について説明します。これらを試せる完全なアプリケーションは、[はじめに](/user-manual/xr/using-webxr/)で紹介しています。

## セッションタイプ {#session-types}

| タイプ | 定数 | ユーザーに見えるもの |
| --- | --- | --- |
| VR | `XRTYPE_VR` (`'immersive-vr'`) | シーンだけが見え、周囲の世界はシーンに置き換わります |
| AR | `XRTYPE_AR` (`'immersive-ar'`) | 現実世界の上にシーンが重なって見えます。現実世界は、ヘッドセットのパススルーカメラや透過型ディスプレイ、またはスマートフォンのカメラを通して見えます |

両方を利用できるデバイスもあります。Meta QuestなどのヘッドセットではVRとARの両方を、Androidスマートフォンでは通常ARだけを利用できます。デスクトップのブラウザでは、PC VRヘッドセットが接続されている間はVRを利用できます。[プラットフォーム](/user-manual/xr/platforms/)を参照してください。ARセッションだけでできることは、[AR](/user-manual/xr/ar/)セクションで説明しています。

## 利用可能かどうかの確認 {#checking-availability}

`app.xr.supported`は、ブラウザがWebXRをそもそもサポートしている場合に`true`になります。あるセッションタイプを今すぐ開始できるかどうかは別の問題で、それは`app.xr.isAvailable(type)`で確認します。エンジンは、アプリケーションの開始時と、デバイスが接続または切断されるたびに、ブラウザに問い合わせます。ブラウザの応答は非同期のため、アプリケーションの開始直後は、しばらく`isAvailable`が`false`を返します。`available`イベントをリッスンして、ボタンの表示を最新の状態に保ちます。

```javascript
const updateButtons = () => {
    vrButton.hidden = !app.xr.isAvailable(XRTYPE_VR);
    arButton.hidden = !app.xr.isAvailable(XRTYPE_AR);
};

app.xr.on('available', updateButtons);
updateButtons();
```

`available`のハンドラーには、セッションタイプとその利用可否が渡されます。`available:immersive-vr`イベントと`available:immersive-ar`イベントは、それぞれ1つのタイプについてだけ発火し、利用可否だけが渡されます。

ブラウザがセッションタイプを利用可能と報告できるのは、ページがセキュアコンテキストにあり、iframe内の場合は`xr-spatial-tracking`が許可されているときだけです。また、WebGPUをヘッドセットに表示できないブラウザでWebGPUデバイスを使っている場合も、エンジンはVRとARを利用不可と報告します。[要件](/user-manual/xr/using-webxr/#requirements)を参照してください。

## セッションの開始 {#starting-a-session}

セッションは、クリックなどのユーザー操作のハンドラーから、カメラに対して開始します。それ以外のタイミングで要求されたセッションは、ブラウザに拒否されます。

```javascript
button.addEventListener('click', () => {
    camera.camera.startXr(XRTYPE_VR, XRSPACE_LOCALFLOOR, {
        callback: (err) => {
            if (err) {
                console.error(`VR failed to start: ${err.message}`);
            }
        }
    });
});
```

[カメラコンポーネント](https://api.playcanvas.com/engine/classes/CameraComponent.html#startxr)の`startXr(type, spaceType, options)`は、`app.xr.start(camera.camera, type, spaceType, options)`と同じ処理を行います。2番目の引数は[参照空間](#reference-spaces)です。ブラウザが先にユーザーに許可を求めることがあるため、開始には少し時間がかかります。セッションが実行されると、コールバックが`null`で呼び出され、`app.xr`が`start`を発火します。

```javascript
app.xr.on('start', () => {
    console.log(`Started an ${app.xr.type} session in ${app.xr.spaceType} space`);
});
```

開始できなかった場合は、コールバックに`Error`が渡されます。想定されるエラーは次のとおりです。

| エラー | 原因 |
| --- | --- |
| `XR is not available` | セッションタイプが[利用可能](#checking-availability)ではない |
| `XR session is already started`または`XR session is already starting` | 一度に実行できるセッションは1つだけ |
| ブラウザからの`SecurityError` | 要求がユーザー操作から行われなかった |
| ブラウザからの`NotSupportedError` | デバイスがそのセッションタイプをその参照空間で実行できない、またはユーザーが許可しなかった |

最初の2つは、コールバックにだけ報告されます。ブラウザからのエラーは、`app.xr`の`error`イベントとしても発火されます。

### XrSessionスクリプトを使う {#with-the-xrsession-script}

エンジンの[`XrSession`](https://github.com/playcanvas/engine/blob/main/scripts/esm/xr/xr-session.mjs)スクリプトをカメラの親に付けると、アプリケーションがイベントを発火したときに、スクリプトがセッションを開始します。これにより、カメラへの参照を持たないコードからでも、セッションを開始・終了できます。

```javascript
app.fire('vr:start');                 // local-floor空間でVRセッションを開始する
app.fire('ar:start', XRSPACE_LOCAL);  // local空間でARセッションを開始する
app.fire('xr:end');                   // セッションを終了する
```

イベント名は、スクリプトの属性`startVrEvent`、`startArEvent`、`endEvent`で設定します。このスクリプトは他にも、ユーザーがキーボードの<kbd>Esc</kbd>を押したときにセッションを終了し、セッションの開始時に[リグ](#the-camera-and-its-rig)をカメラの位置へ移動し、ARではカメラを透明にします。

`XrSession`は[オプション](#options-and-features)を指定せずにセッションを開始します。平面検出やアンカーなどの機能を要求するには、上で説明したように自分でセッションを開始してください。その場合でも`XrSession`は、どのような方法で開始されたかにかかわらず、そのカメラで開始されたすべてのセッションでリグを移動し、ARの処理を行います。

### オプションと機能 {#options-and-features}

WebXRでは、ハンドトラッキングや部屋の平面の検出など、ほとんどの能力がオプションの機能になっており、セッションの開始時に要求する必要があります。エンジンは、渡されたオプションに必要な機能を要求します。

| オプション | セッションタイプ | 要求するもの |
| --- | --- | --- |
| `anchors` | AR | [アンカー](/user-manual/xr/ar/anchors/) |
| `cameraColor` | AR | [カメラアクセス](/user-manual/xr/ar/camera-color/) |
| `depthSensing` | AR | [深度センシング](/user-manual/xr/ar/depth-sensing/)。希望する使用方法とデータ形式を`{ usagePreference, dataFormatPreference }`で指定します |
| `imageTracking` | AR | `app.xr.imageTracking`に追加された画像の[画像トラッキング](/user-manual/xr/ar/image-tracking/) |
| `meshDetection` | AR | [メッシュ検出](/user-manual/xr/ar/mesh-detection/) |
| `planeDetection` | AR | [平面検出](/user-manual/xr/ar/plane-detection/) |
| `optionalFeatures` | 両方 | その他のWebXR機能名の配列。そのままブラウザに渡されます |
| `framebufferScaleFactor` | 両方 | デバイスの推奨解像度に対する、セッションの解像度。[パフォーマンス](/user-manual/xr/optimizing-webxr/#resolution)を参照してください |
| `callback` | 両方 | セッションが開始したとき、または開始に失敗したときに呼び出される関数 |

また、すべてのセッションは[ハンドトラッキング](/user-manual/xr/hand-tracking/)を、すべてのARセッションは[ヒットテスト](/user-manual/xr/ar/hit-testing/)と[ライト推定](/user-manual/xr/ar/light-estimation/)を要求します。ARセッションは、`app.xr.domOverlay.root`が設定されている場合に[DOMオーバーレイ](/user-manual/xr/ar/dom-overlay/)を要求します。

これらはすべてオプションです。デバイスにない機能があっても、セッションはその機能なしで開始します。セッションが開始したら、例えば`app.xr.planeDetection.available`のようにして、各機能を確認してください。必須なのは参照空間だけで、参照空間を利用できないとセッションは開始に失敗します。

```javascript
camera.camera.startXr(XRTYPE_AR, XRSPACE_LOCALFLOOR, {
    planeDetection: true,
    anchors: true,
    callback: (err) => {
        if (err) return;
        if (!app.xr.planeDetection.available) {
            // 平面を使わずにコンテンツを配置する方法にフォールバックする
        }
    }
});
```

## 参照空間 {#reference-spaces}

セッション内のポーズ（頭、コントローラー、その他デバイスがトラッキングするすべてのもののポーズ）は、**参照空間**を基準にして与えられます。参照空間とは、デバイスが部屋の中に固定する原点と軸のことです。セッションの開始時に指定する参照空間によって、その原点がどこにあるか、そしてユーザーがどのくらいの範囲を動くと想定するかが決まります。

![横から見た3つの参照空間。原点がユーザーの頭にあるlocal、原点がユーザーの足元の床にあるlocal-floor、原点が境界内の床にあるbounded-floor](/img/user-manual/xr/sessions/reference-spaces.webp)

| 空間 | 定数 | 原点 | 用途 |
| --- | --- | --- | --- |
| ローカルフロア | `XRSPACE_LOCALFLOOR` | セッションの開始時にユーザーが立っていた場所の近くの床 | 立って、または座って体験するほとんどのアプリケーション。床がy = 0にあるため、シーンの床が部屋の床と一致します |
| ローカル | `XRSPACE_LOCAL` | セッションの開始時のユーザーの頭の位置 | コックピットや映画館の座席など、床の高さが関係ない、座って体験するアプリケーション |
| バウンデッドフロア | `XRSPACE_BOUNDEDFLOOR` | ユーザーが設定した境界内の床 | ユーザーが境界内を歩き回る、ルームスケールのアプリケーション |
| アンバウンデッド | `XRSPACE_UNBOUNDED` | セッションの開始時にユーザーがいた場所の近く | 建物の周りを歩くなど、ユーザーが遠くまで歩くARのアプリケーション |
| ビューアー | `XRSPACE_VIEWER` | ユーザーの頭の位置。頭と一緒に動きます | セッションの空間として使うことはほとんどありません。すべてがユーザーの視界に固定されてしまいます |

他の空間が必要でない限り、`local-floor`を使用してください。`local`はすべての没入型セッションでサポートされており、`local-floor`もほぼすべてのデバイスでサポートされています。`bounded-floor`と`unbounded`は一部のデバイスでしか利用できず、デバイスがサポートしていない空間を要求したセッションは開始に失敗します。

`local-floor`では、ユーザーが立ち上がったり座ったりすると、部屋の中と同じようにシーンの中でも上下に移動します。`local`では、シーンは床の位置を知らないため、y = 0にあるコンテンツはユーザーの頭の高さに来ます。座って体験するアプリケーションでは、`local`で開始し、[リグ](#the-camera-and-its-rig)を上げ下げして、ユーザーの頭を意図した位置に合わせることもあります。

## カメラとそのリグ {#the-camera-and-its-rig}

セッションの実行中は、エンジンがセッションのカメラを動かします。エンジンは毎フレーム、カメラのエンティティの**ローカル**の位置と回転を、参照空間におけるユーザーの頭のポーズに設定します。そのため、カメラの親である**リグ**は、参照空間の原点に位置することになります。`local-floor`では空間の床がリグの位置にあり、空間の軸はリグの軸と一致します。

![外から見たカメラリグ。床の上にあるリグの軸と、その上のヘッドセットとコントローラー、そしてリグに対するカメラの位置](/img/user-manual/xr/sessions/camera-rig.webp)

そのため、ユーザーの視点を動かす方法は2つあり、両者の動きは足し合わされます。

- **ユーザーが頭を動かす。** カメラがリグに対して動きます。コードからカメラの位置と回転を読み取ることはできますが、コードで設定した値は上書きされます。
- **コードがリグを動かす。** テレポートやサムスティックでの移動と同じように、ユーザーがシーンの中を移動します。エンジンはコントローラーと手の位置をリグに対して報告するため、リグを動かすとそれらも一緒に動きます。[入力ソース](/user-manual/xr/input-sources/)を参照してください。

親エンティティを動かすことがない場合でも、カメラには親エンティティを持たせてください。カメラがシーンのルートの子である場合、参照空間の原点はシーンの原点になります。

エンジンはカメラの投影も制御します。カメラの視野角とアスペクト比をヘッドセットのディスプレイに合わせて設定し、カメラの位置からずらした位置から、目ごとに1つずつビューをレンダリングします。カメラ自体の投影の設定は無視されます。ただし、カメラのニアクリップとファークリップの距離は使用され、セッション中の変更も反映されます。ユーザーはコントローラーや手を目の近くまで持ってくることがあるため、ニアクリップは0.01〜0.1程度の小さい値にしてください。

`XrSession`はセッションの開始時にリグを移動し、ユーザーがカメラのあった位置から始められるようにします。リグはカメラの真下の地面（y = 0）に置かれ、カメラが水平方向に向いている向きと同じ方向を向きます。セッションが終了すると、`XrSession`はリグとカメラを元の位置に戻します。`XrSession`がなければ、それらを元に戻すものは何もないため、カメラはユーザーの頭の最後のポーズのままになります。

### トラッキング空間 {#tracking-space}

リグのローカル空間が、セッションの**トラッキング空間**です。エンジンはほとんどのポーズに、リグのトランスフォームを適用して、ワールド空間で提供します。カメラの位置と回転、[入力ソース](/user-manual/xr/input-sources/)のポーズとレイ、[手](/user-manual/xr/hand-tracking/)のジョイントは、どれもリグの移動に追従します。

例外は、ARセッションが現実世界で検出するものです。[ヒットテスト](/user-manual/xr/ar/hit-testing/)の結果、[アンカー](/user-manual/xr/ar/anchors/)、[平面](/user-manual/xr/ar/plane-detection/)、[メッシュ](/user-manual/xr/ar/mesh-detection/)、[トラッキングされた画像](/user-manual/xr/ar/image-tracking/)は、トラッキング空間で与えられます。これらの位置がワールドと一致するのは、リグが回転せずにシーンの原点にある間だけです。リグが動いても現実の表面上に留まるよう、これらを表示するエンティティはリグの子として追加し、その**ローカル**の位置と回転を設定してください。

## セッション中 {#during-a-session}

セッションの実行中は`app.xr.active`が`true`になり、`app.xr`の次のプロパティでセッションの情報を得られます。

| プロパティ | 値 |
| --- | --- |
| `type` | セッションタイプ（`'immersive-vr'`または`'immersive-ar'`） |
| `spaceType` | `'local-floor'`などの参照空間 |
| `camera` | カメラのエンティティ |
| `session` | ブラウザの[`XRSession`](https://developer.mozilla.org/docs/Web/API/XRSession)オブジェクト |

セッションの実行中は、ヘッドセットがフレームループを駆動します。フレームはモニターではなくヘッドセットのリフレッシュレート（多くの場合、毎秒72、90、120フレーム）で届き、ページ自体の`requestAnimationFrame`コールバックは止まることがあります。独自のタイマーではなく、アプリケーションの`update`イベントを使用してください。`app.xr`も、カメラと入力を更新した後に、毎フレーム、セッションの[`XRFrame`](https://developer.mozilla.org/docs/Web/API/XRFrame)を渡して`update`を発火します。

### 表示状態 {#visibility}

デバイスは、セッションを終了せずに、アプリケーションを非表示にしたり、デバイス自身のインターフェースの背後に表示したりすることがあります。これは、ユーザーがシステムメニューを開いたとき、ヘッドセットを外したとき、許可を求めるプロンプトに応答するときなどに起こります。`app.xr`は、新しい状態を渡して`visibility:change`を発火します。

| 状態 | 意味 |
| --- | --- |
| `'visible'` | アプリケーションが表示され、入力を受け取ります |
| `'visible-blurred'` | アプリケーションは表示されますが（暗くなったり、デバイスのインターフェースの背後になったりすることがあります）、入力は受け取りません。フレームの頻度が下がることがあります |
| `'hidden'` | アプリケーションは表示されず、フレームはレンダリングされません |

アプリケーションが表示されて入力を受け取っている間以外は、ゲームのタイマーなど、ユーザーに依存するものを一時停止してください。

```javascript
app.xr.on('visibility:change', (state) => {
    app.timeScale = state === 'visible' ? 1 : 0;
});
```

## セッションの終了 {#ending-a-session}

コードからセッションを終了するには、`app.xr.end()`またはカメラの`endXr()`を使用します。どちらも、セッションの終了後に呼び出されるコールバックを、オプションで受け取ります。ユーザーもデバイス自身の操作でいつでもセッションを終了できるため、自分でセッションを終了するだけでなく、必ず`end`イベントをリッスンしてください。

```javascript
app.xr.on('end', () => {
    // ページ自体のインターフェースを再び表示する
});
```

`end`ハンドラーの実行中は、`app.xr.active`はまだ`true`で、`app.xr.camera`、`type`、`spaceType`も終了しようとしているセッションの情報のままです。そのため、ハンドラーは終了したのがVRセッションかARセッションかを判別できます。これらは、すべてのハンドラーの実行後にリセットされます。したがって、`end`ハンドラーの中で`app.xr.active`を確認して、セッションが実行中かどうかを判断しないでください。

## WebXRの直接使用 {#using-webxr-directly}

エンジンは、ほとんどのアプリケーションが使うWebXRの機能をカバーしています。それ以外の機能を使うには、ブラウザのオブジェクトを直接使用します。必要な機能を`optionalFeatures`で要求し、セッションの開始後に`app.xr.session`を使用してください。

例えば、ルームスケールのアプリケーションでは、`bounded-floor`セッションの境界を描画できます。境界は床の上の点からなる多角形で、点の位置は空間の原点（リグの位置）を基準にしています。

```javascript
app.xr.on('start', async () => {
    if (app.xr.spaceType !== XRSPACE_BOUNDEDFLOOR) return;

    const space = await app.xr.session.requestReferenceSpace('bounded-floor');
    for (const point of space.boundsGeometry) {
        // point.xとpoint.zはメートル単位の、トラッキング空間の床の上の位置
    }
});
```

ポーズは、`app.xr`の`update`イベントが渡す`XRFrame`から、セッションに要求した参照空間を基準にして読み取ります。

## 関連情報 {#see-also}

- [はじめに](/user-manual/xr/using-webxr/) - 各環境でのXRのセットアップと、最初のVRシーン
- [入力ソース](/user-manual/xr/input-sources/) - コントローラー、手、画面のタップと、それらのレイ
- [AR](/user-manual/xr/ar/) - 現実世界の上にシーンを表示するセッション
- [XrManager](https://api.playcanvas.com/engine/classes/XrManager.html)と[CameraComponent#startXr](https://api.playcanvas.com/engine/classes/CameraComponent.html#startxr) - セッションの開始と管理のリファレンス
- [WebXR Device API](https://immersive-web.github.io/webxr/) - セッション、参照空間、機能の仕様
