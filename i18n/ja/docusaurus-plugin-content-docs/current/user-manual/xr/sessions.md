---
title: セッション
description: "PlayCanvasのWebXRセッションについて、VRとARのセッションタイプ、利用可能かどうかの確認、セッションの開始と終了、座った姿勢・立った姿勢・ルームスケールの体験に合わせた参照空間、機能のリクエスト、カメラとそのリグ、セッションの実行中に変わることを解説します。"
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

セッションとは、デバイスがシーンを表示している期間のことです。セッションは、ユーザー操作に応じてアプリケーションが要求したときに始まり、アプリケーションまたはユーザーが終了したときに終わります。このページでは、セッションを開始するときに決めること、セッションの実行中にエンジンがカメラに対して行うこと、そして終了時の後片付けの方法を説明します。

## セッションタイプ {#session-types}

| タイプ | 定数 | ユーザーに見えるもの |
| --- | --- | --- |
| VR | `pc.XRTYPE_VR`（`'immersive-vr'`） | シーンだけです。デバイスのディスプレイに現実世界は一切映りません |
| AR | `pc.XRTYPE_AR`（`'immersive-ar'`） | 現実世界に重なったシーンです。ヘッドセットのパススルーカメラや透過型ディスプレイ、またはスマートフォンのカメラを通して見えます |

多くのヘッドセットは両方に対応し、スマートフォンはARに対応しています。詳しくは[プラットフォーム](/user-manual/xr/platforms/)を、ARで何が加わるかについては[AR](/user-manual/xr/ar/)を参照してください。

## 利用可能かどうかの確認 {#checking-availability}

デバイスで何ができるかは、次の2つで確認できます。

- `app.xr.supported`は、ブラウザがそもそもWebXRを実装している場合に`true`です。
- `app.xr.isAvailable(type)`は、そのタイプのセッションを今すぐ開始できる場合に`true`です。

エンジンは、アプリケーションの開始後と、XRデバイスが接続または切断されるたびに、どのセッションタイプが利用可能かをブラウザに問い合わせます。その答えはアプリケーションの開始から少し遅れて届くため、それまで`isAvailable()`は`false`を返します。一度読み取ったうえで、その後の変化は`available`イベントで追跡してください。

```javascript
const updateButtons = () => {
    vrButton.hidden = !app.xr.isAvailable(pc.XRTYPE_VR);
    arButton.hidden = !app.xr.isAvailable(pc.XRTYPE_AR);
};
updateButtons();
app.xr.on('available', updateButtons);

// または、1つのセッションタイプだけを監視する
app.xr.on(`available:${pc.XRTYPE_AR}`, (available) => {
    arButton.hidden = !available;
});
```

グラフィックスデバイスがそのタイプのセッションを表示できない場合、そのタイプは利用不可として報告されます。WebXR/WebGPUバインディングのないブラウザでWebGPUを使っている場合がこれにあたります。ページが`allow="xr-spatial-tracking"`のない`<iframe>`内にある場合も同様です。デバイスを作成する前にWebGPUとWebGL 2のどちらを使うかを決めるには、[はじめに](/user-manual/xr/using-webxr/#setting-up)と同じように、静的メソッドの`pc.XrManager.isDeviceSupported(deviceType, type)`を使用します。

## セッションの開始 {#starting-a-session}

セッションは、それを描画するカメラから、セッションタイプと[参照空間](#reference-spaces)を指定して開始します。

```javascript
button.addEventListener('click', () => {
    camera.camera.startXr(pc.XRTYPE_VR, pc.XRSPACE_LOCALFLOOR, {
        callback: (err) => {
            if (err) {
                console.error(`Couldn't start VR: ${err.message}`);
            }
        }
    });
});
```

`app.xr.start(camera.camera, type, space, options)`でも同じことができます。どちらも、クリック、タップ、キー入力などのユーザー操作のハンドラーから呼び出してください。それ以外の方法で要求されたセッションは、ブラウザに拒否されます。

開始は非同期に行われます。セッションが実行中になると、コールバックは`null`を受け取り、`app.xr`が`start`を発火します。

```javascript
app.xr.on('start', () => {
    console.log(`Started a session of type ${app.xr.type} in ${app.xr.spaceType} space`);
});
```

次のような場合は、代わりにコールバックがエラーを受け取ります。

- セッションタイプが利用できない場合。メッセージは`XR is not available`です。
- セッションがすでに実行中か、開始処理中の場合。ボタンのダブルクリックなどで`startXr()`が2回呼ばれても問題はありません。
- ブラウザがセッションを拒否した場合。例えば、ユーザー操作によって開始されなかった、ユーザーが許可のプロンプトを拒否した、デバイスがその参照空間をサポートしていない、といった理由によるものです。このとき、`app.xr`も同じエラーで`error`を発火します。

カメラリグに[`XrSession`](/user-manual/xr/using-webxr/#your-first-vr-scene)スクリプトがある場合は、代わりにそのイベントを発火します。イベントには参照空間を任意で渡すことができ、省略すると`local-floor`になります。

```javascript
app.fire('vr:start');
app.fire('ar:start', pc.XRSPACE_LOCAL);
```

## 参照空間 {#reference-spaces}

参照空間は、トラッキング空間の原点がどこにあるか、つまりセッションの開始時にカメラがどこにあるかを決めます。カメラのローカル位置は、この空間におけるユーザーの頭の位置です。

| 空間 | 定数 | 原点 | 用途 |
| --- | --- | --- | --- |
| ローカルフロア | `pc.XRSPACE_LOCALFLOOR` | 床の上の、ユーザーの開始位置の真下。床の高さが0になります | 立って体験するVRやルームスケールのVR、ほとんどのAR。通常はこれを選びます |
| ローカル | `pc.XRSPACE_LOCAL` | ユーザーの開始時の頭の位置 | コックピットや360°動画など、床が関係しない、座って体験するコンテンツ |
| 境界付きフロア | `pc.XRSPACE_BOUNDEDFLOOR` | 床の上の、ユーザーが設定したプレイエリア内 | ユーザーが設定した境界の内側に収める必要がある、ルームスケールのVR |
| 境界なし | `pc.XRSPACE_UNBOUNDED` | ユーザーの開始位置の近く | 部屋より広い範囲をユーザーが歩き回るAR |
| ビューアー | `pc.XRSPACE_VIEWER` | ユーザーの頭の位置。頭と一緒に動きます | セッションで役立つことはほとんどありません。カメラがまったく動かないためです |

参照空間は必須の機能です。デバイスがその参照空間を提供できない場合、セッションは開始されず、コールバックはブラウザのエラーを受け取ります。すべての没入型セッションは`local`をサポートしており、ほとんどは`local-floor`もサポートしています。`bounded-floor`や`unbounded`を使う場合は、代わりに`local-floor`のセッションをユーザーに提案するなどして、エラーに対処してください。

`local`では頭が高さ0から始まるため、カメラリグを、シーンで想定する目の高さまで上げてください。`XrSession`はセッションの開始時にリグを床に置くので、この処理は、スクリプトのハンドラーの後に実行される`start`ハンドラーで行います。

```javascript
app.xr.on('start', () => {
    if (app.xr.spaceType === pc.XRSPACE_LOCAL) {
        rig.translate(0, 1.2, 0); // 座ったときの目の高さ
    }
});
```

## セッションの機能 {#session-features}

WebXRの機能には、すべてのセッションで要求されるものと、`startXr()`のオプションで指定したときにだけ要求されるものがあります。

| オプション | 機能 | セッション | ページ |
| --- | --- | --- | --- |
| *（常に）* | ハンドトラッキング | VR、AR | [ハンドトラッキング](/user-manual/xr/hand-tracking/) |
| *（常に）* | ヒットテストとライト推定 | AR | [ヒットテスト](/user-manual/xr/ar/hit-testing/)、[ライト推定](/user-manual/xr/ar/light-estimation/) |
| *（`app.xr.domOverlay.root`を設定すれば常に）* | DOMオーバーレイ | AR | [DOMオーバーレイ](/user-manual/xr/ar/dom-overlay/) |
| `anchors: true` | アンカー | AR | [アンカー](/user-manual/xr/ar/anchors/) |
| `planeDetection: true` | 平面検出 | AR | [平面検出](/user-manual/xr/ar/plane-detection/) |
| `meshDetection: true` | メッシュ検出 | AR | [メッシュ検出](/user-manual/xr/ar/mesh-detection/) |
| `depthSensing: { usagePreference, dataFormatPreference }` | 深度センシング | AR | [深度センシング](/user-manual/xr/ar/depth-sensing/) |
| `cameraColor: true` | カメラアクセス | AR | [カメラアクセス](/user-manual/xr/ar/camera-color/) |
| `imageTracking: true` | 画像トラッキング | AR | [画像トラッキング](/user-manual/xr/ar/image-tracking/) |
| `framebufferScaleFactor` | セッションの解像度 | VR、AR | [パフォーマンス](/user-manual/xr/optimizing-webxr/#resolution) |
| `optionalFeatures` | その他のWebXR機能（名前で指定） | VR、AR | [その他のWebXR機能](#other-webxr-features) |

これらはすべてオプションの機能です。デバイスがサポートしていない機能や、ユーザーが許可しなかった機能がなくても、セッションは開始されます。`app.xr`の機能ごとのオブジェクトには、ブラウザがその機能を実装しているかどうかを示す`supported`プロパティと、実行中のセッションでその機能が使えるかどうかを示す`available`プロパティがあります。`available`は、セッションの開始後に確認してください。

```javascript
camera.camera.startXr(pc.XRTYPE_AR, pc.XRSPACE_LOCALFLOOR, {
    anchors: true,
    planeDetection: true
});

app.xr.on('start', () => {
    if (!app.xr.planeDetection.available) {
        // ヒットテストなど、別の方法にフォールバックする
    }
});
```

一部の機能は、セッションの開始から少し遅れて利用可能になり、そのときに独自の`available`イベントを発火します。

`XrSession`は、オプションなしでセッションを開始します。機能を要求するには、上の例のようにセッションを自分で開始してください。その場合でも、このスクリプトは開始されたすべてのセッションでリグを調整し、ARではカメラを透過させます。

<Tabs groupId="workflow" defaultValue="engine">
<TabItem value="engine" label="Engine">

```javascript
button.addEventListener('click', () => {
    camera.camera.startXr(pc.XRTYPE_AR, pc.XRSPACE_LOCALFLOOR, { planeDetection: true });
});
```

</TabItem>
<TabItem value="editor" label="Editor">

カメラを持つエンティティにアタッチして、**Enter AR**ボタンを追加し、そのボタンからセッションを開始するスクリプトです。

```javascript
import { Script, XRSPACE_LOCALFLOOR, XRTYPE_AR } from 'playcanvas';

export class EnterAr extends Script {
    static scriptName = 'enterAr';

    initialize() {
        const button = document.createElement('button');
        button.textContent = 'Enter AR';
        document.body.appendChild(button);

        button.addEventListener('click', () => {
            this.entity.camera.startXr(XRTYPE_AR, XRSPACE_LOCALFLOOR, { planeDetection: true });
        });

        this.once('destroy', () => button.remove());
    }
}
```

</TabItem>
<TabItem value="react" label="React">

```jsx
import { XRSPACE_LOCALFLOOR, XRTYPE_AR } from 'playcanvas';
import { useApp } from '@playcanvas/react/hooks';

function EnterArButton() {
  const app = useApp();
  const start = () => {
    const camera = app.root.findByName('camera').camera;
    camera.startXr(XRTYPE_AR, XRSPACE_LOCALFLOOR, { planeDetection: true });
  };
  return <button onClick={start}>Enter AR</button>;
}
```

</TabItem>
<TabItem value="web-components" label="Web Components">

`<pc-camera>`要素の`startXr()`メソッドはオプションを受け取らないため、エンジンのコンポーネントのメソッドを呼び出します。要素の`component`プロパティが、エンジンのカメラコンポーネントです。

```javascript
import { XRSPACE_LOCALFLOOR, XRTYPE_AR } from 'playcanvas';
import { whenReady } from '@playcanvas/web-components';

const cameraElement = await whenReady('pc-camera');

button.addEventListener('click', () => {
    cameraElement.component.startXr(XRTYPE_AR, XRSPACE_LOCALFLOOR, { planeDetection: true });
});
```

</TabItem>
</Tabs>

## カメラとそのリグ {#the-camera-and-its-rig}

セッションの実行中、エンジンは毎フレーム、カメラを参照空間におけるユーザーの頭のポーズに合わせて動かします。設定されるのはカメラエンティティの*ローカル*の位置と回転なので、トラッキング空間がシーンのどこにあるかは、カメラの親が決めます。この親がカメラリグです。

![外から見たカメラリグ。シーンの原点から離れた床の上にあるオレンジ色のリングがトラッキング空間の正方形を載せ、ユーザーの頭とコントローラーはその中で動きます](/img/user-manual/xr/sessions/camera-rig.webp)

- **リグを動かすとユーザーが動きます。** リグを移動、回転、スケールすると、ユーザーをテレポートさせたり、向きを変えさせたり、巨人にしたりできます。[ロコモーション](/user-manual/xr/locomotion/)を参照してください。
- **カメラ自体は動かさないでください。** カメラのトランスフォームに設定した値は、次のフレームで上書きされます。エンジンの`CameraControls`などのスクリプトは、セッションの実行中は動作を止めます。
- **入力ソースはワールド空間で報告されます。** コントローラーや手のポーズとレイにはリグのトランスフォームが適用されるため、リグがどこにあっても、カメラと位置が揃います。
- **ARの機能はトラッキング空間で報告されます。** ヒットテストの結果、アンカー、平面、メッシュ、トラッキングされた画像のポーズは、リグを基準にした値です。リグが原点にあり、回転もスケールもされていなければ、これはワールド空間と同じです。そうでない場合は、それらに追従するエンティティをリグの子として追加してください。[AR](/user-manual/xr/ar/#the-real-world-and-the-rig)を参照してください。

セッション中、カメラのプロパティはデバイスに従います。視野角とアスペクト比はデバイスのものになり、カメラはその値を返すため、`camera.camera.fov`を読み取るコードは実際に使われている値を取得できます。ニアクリップ面とファークリップ面はセッションの開始時にデバイスに渡され、デバイスがそれを使用します。エンジン2.23以降では、セッション中にそれらを変更すると、次のフレームから反映されます。セッションが終了すると、カメラは再び自身の値を返すようになります。

セッションが終了しても、カメラの位置と回転は元に戻りません。カメラには頭の最後のポーズが残ります。`XrSession`は、セッションの開始時にリグとカメラのトランスフォームを保存し、終了時に復元します。このスクリプトを使わない場合は、`start`と`end`のハンドラーで同じ処理を行ってください。

## セッションの実行中 {#during-a-session}

エンジンは毎フレーム、スクリプトが更新される前にセッションの状態を更新します。そのため、`update`の中では、入力ソース、ARの機能、カメラはすべて最新の状態です。トラッキングが失われている間など、デバイスが頭のポーズを報告できないフレームはスキップされ、更新も描画も行われません。セッションの実行中は、次のようになります。

- `app.xr.active`は`true`になり、`app.xr.type`、`app.xr.spaceType`、`app.xr.camera`がそのセッションの内容を表します。
- アプリケーションは、通常のディスプレイのフレームレートではなく、デバイスのフレームレートで描画します。[フレームレート](/user-manual/xr/optimizing-webxr/#frame-rate)を参照してください。
- ページのキャンバスは更新されません。キャンバスのサイズとグラフィックスデバイスの解像度は、セッションのフレームバッファーのサイズになります。
- `app.xr.on('update', (frame) => {})`は、毎フレームWebXRの[`XRFrame`](https://developer.mozilla.org/en-US/docs/Web/API/XRFrame)を受け取ります。WebXRのAPIを直接使う場合に利用できます。

デバイスのシステムメニューが開いている間などに、ブラウザがシーンを非表示にしたり、シーンからフォーカスを奪ったりすることがあります。`app.xr`は、新しい状態を引数にして`visibility:change`を発火します。この状態は`app.xr.session.visibilityState`でも取得できます。

| 状態 | 意味 |
| --- | --- |
| `'visible'` | シーンが表示され、入力を受け取っています |
| `'visible-blurred'` | シーンは表示されていますが、システムメニューなど別のものが入力を受け取っています。入力ソースが更新されなかったり、フレームレートが下がったりすることがあります |
| `'hidden'` | シーンは表示されておらず、フレームも描画されません |

状態が`'visible'`でない間は、ゲームを一時停止してください。

```javascript
app.xr.on('visibility:change', (state) => {
    app.timeScale = state === 'visible' ? 1 : 0;
});
```

## セッションの終了 {#ending-a-session}

コードからセッションを終了するには、`app.xr.end()`または`camera.camera.endXr()`を使います。ユーザーも、ブラウザやデバイス自体の操作で、いつでもセッションを終了できます。どちらの場合も、`app.xr`は`end`を発火します。

```javascript
app.xr.on('end', () => {
    // ページの表示に戻る
});
```

`end`ハンドラーの実行中、`app.xr.active`はまだ`true`で、`app.xr.type`と`app.xr.spaceType`は、終了したセッションの内容をまだ表しています。エンジン2.23以降では、`app.xr.camera`も同様です。これらは、すべてのハンドラーの実行後にリセットされます。エンジン自身のハンドラーは、アプリケーションで登録したハンドラーより先に実行されます。そのため、アプリケーションのハンドラーが実行される時点では、入力ソースはすでに削除されており（その際に`remove`イベントが発火します）、ARセッションのヒットテストソース、アンカー、平面、メッシュも同様に削除されています。

セッションが終了すると、アプリケーションは再びページのキャンバスに描画します。

## その他のWebXR機能 {#other-webxr-features}

WebXRには、レイヤーやボディトラッキングなど、エンジンがラップしていないモジュールがあります。それらは`optionalFeatures`で要求し、セッションとそのフレームを通して使用します。

```javascript
camera.camera.startXr(pc.XRTYPE_VR, pc.XRSPACE_LOCALFLOOR, {
    optionalFeatures: ['layers']
});

app.xr.on('start', () => {
    if (app.xr.session.enabledFeatures?.includes('layers')) {
        // app.xr.sessionを通してWebXR Layers APIを使う
    }
});
```

`app.xr.session`はWebXRの[`XRSession`](https://developer.mozilla.org/en-US/docs/Web/API/XRSession)で、`update`イベントには各`XRFrame`が渡されます。`enabledFeatures`を提供しないブラウザもあるため、使用する機能そのものの検出もあわせて行ってください。これらのAPIを使うコードはブラウザに依存し、エンジンの互換性の保証の対象外です。

## 関連情報 {#see-also}

- [はじめに](/user-manual/xr/using-webxr/) - XRのセットアップと、最初のVRシーン
- [ロコモーション](/user-manual/xr/locomotion/) - カメラリグの移動
- [パフォーマンス](/user-manual/xr/optimizing-webxr/) - 解像度、フォービエーション、フレームレート
- [XrManager](https://api.playcanvas.com/engine/classes/XrManager.html) - `app.xr`のAPIリファレンス
