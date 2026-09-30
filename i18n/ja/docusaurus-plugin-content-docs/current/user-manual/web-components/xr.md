---
title: XR のサポート
description: "Web Components向けのWebXRセットアップ: XRに必要なWebGL 2バックエンド、エンジンのXRスクリプト、xrSession付きのカメラリグ、アプリイベントの発火によるセッションの開始、そしてカメラ要素のXR API。"
---

PlayCanvas Web Components を使用すると、アプリケーションに Virtual Reality (VR) および Augmented Reality (AR) のサポートを簡単に追加できます。

## 基本的なセットアップ {#basic-setup}

XR のサポートを有効にするには、以下が必要です。

1. WebGL 2 で描画する `<pc-app>`（下記参照）。
2. XR 専用スクリプト ([Engine NPM package](https://www.npmjs.com/package/playcanvas) で提供)。
3. XR スクリプトがアタッチされたカメラリグ。
4. XR の開始用の UI（WebXR のセッション開始にはユーザーのジェスチャーが必要です）。
5. セキュアコンテキスト — 本番では HTTPS（開発中は `http://localhost`）でページを提供してください。

`<pc-app>` はデフォルトでは WebGPU で描画しますが、エンジンが WebGPU で XR セッションをホストできるのは、ブラウザが WebXR と WebGPU の橋渡しである `XRGPUBinding` を公開している場合だけです。公開していない場合（執筆時点では Chrome がその一例です）、エンジンは XR を利用不可と報告します。そのため、XR を提供するページには WebGL 2 バックエンドを指定してください。

```html
<pc-app backend="webgl2">
```

`<iframe>` に埋め込まれたページでは、フレームが `allow="xr-spatial-tracking"` でそれを許可している必要もあります。許可がないと、ブラウザはページから XR を隠します。

### XR スクリプト {#xr-scripts}

エンジンは、`scripts/esm/xr` フォルダに一連の XR スクリプトを同梱しています。[`<pc-asset>`](tags/pc-asset.md) 要素を使用して指定します。

```html
<pc-asset src="/node_modules/playcanvas/scripts/esm/xr/xr-controllers.mjs"></pc-asset>
<pc-asset src="/node_modules/playcanvas/scripts/esm/xr/xr-menu.mjs"></pc-asset>
<pc-asset src="/node_modules/playcanvas/scripts/esm/xr/xr-navigation.mjs"></pc-asset>
<pc-asset src="/node_modules/playcanvas/scripts/esm/xr/xr-session.mjs"></pc-asset>
```

これらのパスは、[Getting Started](getting-started.md) の npm のセットアップと同じく、バンドラーを使わずにプロジェクトのルートからサイトを配信することを前提としています。バンドラーは `node_modules` を出力に含めないため、バンドラーを使う場合はスクリプトをビルドが静的ファイルを配信する場所にコピーするか、CDN から読み込んでください。

```html
<pc-asset src="https://cdn.jsdelivr.net/npm/playcanvas@latest/scripts/esm/xr/xr-controllers.mjs"></pc-asset>
<pc-asset src="https://cdn.jsdelivr.net/npm/playcanvas@latest/scripts/esm/xr/xr-menu.mjs"></pc-asset>
<pc-asset src="https://cdn.jsdelivr.net/npm/playcanvas@latest/scripts/esm/xr/xr-navigation.mjs"></pc-asset>
<pc-asset src="https://cdn.jsdelivr.net/npm/playcanvas@latest/scripts/esm/xr/xr-session.mjs"></pc-asset>
```

:::note[CDN とインポートマップ]

CDN から XR スクリプトを読み込む場合は、[Getting Started ガイド](getting-started.md) に示すように、ページのインポートマップも同じ CDN とバージョンを指すように設定してください。 本番環境では `@latest` ではなく特定バージョンへの固定を推奨します。

:::

* [`xr-session.mjs`](https://github.com/playcanvas/engine/blob/main/scripts/esm/xr/xr-session.mjs) - WebXR セッションのライフサイクルを管理します。アプリイベント（デフォルトでは `ar:start` と `vr:start`）に応じて AR または VR セッションを開始し、`xr:end` イベントまたは Escape キーで終了し、カメラリグのトランスフォーム、AR の透過、クリーンアップを自動的に処理します。
* [`xr-controllers.mjs`](https://github.com/playcanvas/engine/blob/main/scripts/esm/xr/xr-controllers.mjs) - 検出された XR コントローラー（手を含む）の XR コントローラーモデル（GLB）を動的にダウンロードし、レンダリングします。
* [`xr-navigation.mjs`](https://github.com/playcanvas/engine/blob/main/scripts/esm/xr/xr-navigation.mjs) - リグを移動させます。ポイントして選択することによるテレポート、左スティックによるスムーズな移動、そして右スティックによるスナップまたはスムーズな回転とスナップでの上下移動です。テレポートの着地点は、コードでスクリプトの `castRay` を割り当てて地面を自分で判定しない限り、スクリプトの `ground-height`（デフォルトは 0）にある平面です。
* [`xr-menu.mjs`](https://github.com/playcanvas/engine/blob/main/scripts/esm/xr/xr-menu.mjs) - ヘッドセット内メニューを表示します（ハンドトラッキングでは手のひらを上に向けるジェスチャー、またはコントローラーのボタンで表示）。メニュー項目はアプリイベントを発火します — 「Exit XR」ボタンに最適です。

このフォルダには5つ目のスクリプト [`xr-manipulation.mjs`](https://github.com/playcanvas/engine/blob/main/scripts/esm/xr/xr-manipulation.mjs) もあり、ユーザーが両手でシーンをつかんで動かしたり、回したり、拡大縮小したりできるようにします。これはリグではなく、シーンのコンテンツを保持するターゲットのエンティティに作用します。

### カメラのセットアップ {#camera-setup}

XR スクリプトは、カメラエンティティの*親*にアタッチする必要があります — `xrSession` はリグのルートを動かし、ヘッドセットがカメラ自体を動かします。

```html
<!-- カメラ（XRサポート付き） -->
<pc-entity name="camera root">
    <pc-entity name="camera" position="0 1.7 5">
        <pc-camera></pc-camera>
    </pc-entity>
    <pc-script>
        <pc-script-instance name="xrControllers"></pc-script-instance>
        <pc-script-instance name="xrMenu" attributes='{
            "menuItems": [{"label": "Exit XR", "eventName": "xr:end"}],
            "fontAsset": "asset:arial-font"
        }'></pc-script-instance>
        <pc-script-instance name="xrNavigation"></pc-script-instance>
        <pc-script-instance name="xrSession"></pc-script-instance>
    </pc-script>
</pc-entity>
```

:::note

`xrMenu` はテキストをレンダリングするため、他のアセットと並べて宣言された `font` 型の [`<pc-asset>`](tags/pc-asset.md) が必要です — [例](https://github.com/playcanvas/web-components/tree/main/examples)では `arial.json` を使用しています。

```html
<pc-asset src="assets/fonts/arial.json" type="font" id="arial-font"></pc-asset>
```

フォントアセットは JSON ファイルと、その隣にある同名の PNG（ここでは `arial.png`）の組なので、両方をプロジェクトにコピーしてください。`menuItems` はネストされた配列であるため、`xrMenu` は（プロパティごとの属性ではなく）`attributes` JSON を通じて設定します — [スクリプトで動作を追加する](scripting.md)を参照してください。

:::

### XR の開始用 UI {#ui-for-entering-xr}

最後に、ユーザーが XR モードを開始できるように、UI を追加する必要があります。これは WebXR 固有の要件であり、XR セッションをアクティブ化するにはユーザーのジェスチャーが必要です。2つのシンプルなボタンを作成しましょう。

```html
<button id="enterAR">ARに入る</button>
<button id="enterVR">VRに入る</button>
```

カメラリグに `xrSession` があれば、ボタンはそれがリッスンするアプリイベントを発火するだけで済みます。

```javascript
import { whenReady } from '@playcanvas/web-components';

const { app } = await whenReady('pc-app');

document.getElementById('enterAR').addEventListener('click', () => app.fire('ar:start'));
document.getElementById('enterVR').addEventListener('click', () => app.fire('vr:start'));
```

:::note

このスニペットはパッケージ名で `whenReady` をインポートしています。そのため、ページのインポートマップに `@playcanvas/web-components` を登録しておく必要があります。詳細は [プログラムによるアクセス](programmatic-access.md) を参照してください。

:::

イベント名は `xrSession` のスクリプト属性（`start-ar-event`、`start-vr-event`、`end-event`）なので、独自のイベントと衝突する場合は名前を変更できます。セッションの終了に追加のコードは不要です。`xrSession` は、`xr:end` イベントが発火したとき（上記の「Exit XR」メニュー項目）、またはユーザーが Escape キーを押したときにセッションを終了します。

また、デバイスがそのセッションタイプをサポートしている間だけ、各ボタンを表示することもできます。エンジンはアプリの開始後に非同期でサポートを確認し、デバイスが接続・切断されるたびに再確認するため、現在の結果でボタンを設定し、`available` イベントに追従させてください。

```javascript
import { XRTYPE_AR, XRTYPE_VR } from 'playcanvas';

// 上のモジュールの続き。app は実行中のアプリケーションです
const buttons = {
    [XRTYPE_AR]: document.getElementById('enterAR'),
    [XRTYPE_VR]: document.getElementById('enterVR')
};

for (const [type, button] of Object.entries(buttons)) {
    button.hidden = !app.xr.isAvailable(type);
}

app.xr.on('available', (type, available) => {
    if (buttons[type]) {
        buttons[type].hidden = !available;
    }
});
```

### カメラ要素のAPI {#the-camera-element-api}

最小限のケースでは、[`<pc-camera>`](tags/pc-camera.md) の要素APIを使って、スクリプトなしでXRセッションを直接開始・終了できます。WebXRはユーザーのジェスチャーに応じてのみセッションを開始するため、`startXr` はクリックハンドラーの中から呼び出してください。

```javascript
import { whenReady } from '@playcanvas/web-components';

const camera = await whenReady('pc-camera');

document.getElementById('enter-vr').addEventListener('click', () => {
    camera.startXr('immersive-vr', 'local-floor');
});

// ...後でセッションを終了するには:
camera.endXr();
```

`startXr(type, space)` は、セッションタイプ（`'immersive-ar'` または `'immersive-vr'`）と参照空間（`'viewer'`、`'local'`、`'local-floor'`、`'bounded-floor'`、`'unbounded'`）を受け取ります。

利用可否はモード単位で、`arAvailable` と `vrAvailable` が報告します。この2つは互いに独立しています。デバイスは一方だけを提供できますし、ARCore対応のAndroid端末はARのみを提供しVRを提供しないことがよくあります。そのため、各コントロールはそれが開始するモードで判定してください。どちらもエンジンの現在の結果を読み取り、アプリの開始直後はしばらく `false` のままなので、エンジンの結果が変わるたびにコントロールを更新してください。

```javascript
const { app } = await whenReady('pc-app');

const updateButtons = () => {
    document.getElementById('enter-vr').hidden = !camera.vrAvailable;
    document.getElementById('enter-ar').hidden = !camera.arAvailable;
};

updateButtons();
app.xr.on('available', updateButtons);
```

`startXr` も同じ方法で判定され、要求されたモードが利用できない場合は何もしません。判定をすり抜けたボタンが大きな失敗を起こすことはありません。なお、`xrSession` スクリプトはカメラリグのトランスフォーム、ARの透過、セッションのクリーンアップも管理してくれるため、本格的な体験にはスクリプトを、簡単なテストやシンプルなビューアーには要素APIを使うのがおすすめです。要素APIでARを使う場合、その部分は自分で行います。現実世界が透けて見えるように、カメラに透明な `clear-color="0 0 0 0"` を指定し、`<pc-sky>` があれば取り除いてください。

[Web Component の例](https://playcanvas.github.io/web-components/examples/)の多くは XR をサポートしており、[Basic Shapes](https://playcanvas.github.io/web-components/examples/#basic-shapes.html)、[GLB Loader](https://playcanvas.github.io/web-components/examples/#glb-loader.html)、[Shadow Cascades](https://playcanvas.github.io/web-components/examples/#shadow-cascades.html) などがあります。それらのソースコードで、カメラリグが組み込まれている様子を確認できます。

## 次のステップ {#next-steps}

PlayCanvas Engine は、幅広い機能とオプションを備えた包括的な XR サポートを提供しています。詳細については、[XR ドキュメント](../xr/index.md) を参照してください。
