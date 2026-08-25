---
title: XR のサポート
description: "Web Components向けのWebXRセットアップ: エンジンのXRスクリプトを読み込み、xrSession付きのカメラリグを構築し、アプリイベントの発火でセッションを開始します。"
---

PlayCanvas Web Components を使用すると、アプリケーションに Virtual Reality (VR) および Augmented Reality (AR) のサポートを簡単に追加できます。

## 基本的なセットアップ {#basic-setup}

XR のサポートを有効にするには、以下が必要です。

1. XR 専用スクリプト ([Engine NPM package](https://www.npmjs.com/package/playcanvas) で提供)。
2. XR スクリプトがアタッチされたカメラリグ。
3. XR の開始用の UI（WebXR のセッション開始にはユーザーのジェスチャーが必要です）。
4. セキュアコンテキスト — 本番では HTTPS（開発中は `http://localhost`）でページを提供してください。

### XR スクリプト {#xr-scripts}

エンジンは、`scripts/esm/xr` フォルダに一連の XR スクリプトを同梱しています。[`<pc-asset>`](tags/pc-asset.md) 要素を使用して指定します。

```html
<pc-asset src="/node_modules/playcanvas/scripts/esm/xr/xr-controllers.mjs"></pc-asset>
<pc-asset src="/node_modules/playcanvas/scripts/esm/xr/xr-menu.mjs"></pc-asset>
<pc-asset src="/node_modules/playcanvas/scripts/esm/xr/xr-navigation.mjs"></pc-asset>
<pc-asset src="/node_modules/playcanvas/scripts/esm/xr/xr-session.mjs"></pc-asset>
```

または、CDN を使用する場合:

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
* [`xr-navigation.mjs`](https://github.com/playcanvas/engine/blob/main/scripts/esm/xr/xr-navigation.mjs) - 基本的なテレポートナビゲーション（ポイント＆選択アクションによる）を実装します。
* [`xr-menu.mjs`](https://github.com/playcanvas/engine/blob/main/scripts/esm/xr/xr-menu.mjs) - ヘッドセット内メニューを表示します（ハンドトラッキングでは手のひらを上に向けるジェスチャー、またはコントローラーのボタンで表示）。メニュー項目はアプリイベントを発火します — 「Exit XR」ボタンに最適です。

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

`menuItems` はネストされた配列であるため、（プロパティごとの属性ではなく）`attributes` JSON を通じて設定します — [スクリプトで動作を追加する](scripting.md)を参照してください。

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

イベント名は `xrSession` のスクリプト属性（`start-ar-event`、`start-vr-event`、`end-event`）なので、独自のイベントと衝突する場合は名前を変更できます。セッションの終了に追加のコードは不要です。`xrSession` は、`xr:end` イベントが発火したとき（上記の「Exit XR」メニュー項目）、またはユーザーが Escape キーを押したときにセッションを終了します。

また、デバイスがそのセッションタイプをサポートしている場合にのみ、各ボタンを表示することもできます。

```javascript
import { XRTYPE_AR, XRTYPE_VR } from 'playcanvas';

const arButton = document.getElementById('enterAR');
arButton.style.display = app.xr.isAvailable(XRTYPE_AR) ? 'block' : 'none';

app.xr.on('available', (type, available) => {
    if (type === XRTYPE_AR) {
        arButton.style.display = available ? 'block' : 'none';
    }
});
```

:::note

このスニペットはパッケージ名で `whenReady` をインポートしています。そのため、ページのインポートマップに `@playcanvas/web-components` を登録しておく必要があります。詳細は [プログラムによるアクセス](programmatic-access.md) を参照してください。

:::

### カメラ要素のAPI {#the-camera-element-api}

最小限のケースでは、[`<pc-camera>`](tags/pc-camera.md) の要素APIを使って、スクリプトなしでXRセッションを直接開始・終了できます。

```javascript
import { whenReady } from '@playcanvas/web-components';

const camera = await whenReady('pc-camera');

if (camera.vrAvailable) {
    camera.startXr('immersive-vr', 'local-floor');
}

// ...後でセッションを終了するには:
camera.endXr();
```

`startXr(type, space)` は、セッションタイプ（`'immersive-ar'` または `'immersive-vr'`）と参照空間（`'viewer'`、`'local'`、`'local-floor'`、`'bounded-floor'`、`'unbounded'`）を受け取ります。

利用可否はモード単位で、`arAvailable` と `vrAvailable` が報告します。この2つは互いに独立しています。デバイスは一方だけを提供できますし、ARCore対応のAndroid端末はARのみを提供しVRを提供しないことがよくあります。そのため、各コントロールはそれが開始するモードで判定してください。

```javascript
document.getElementById('enter-vr').hidden = !camera.vrAvailable;
document.getElementById('enter-ar').hidden = !camera.arAvailable;
```

`startXr` も同じ方法で判定され、要求されたモードが利用できない場合は何もしません。判定をすり抜けたボタンが大きな失敗を起こすことはありません。なお、`xrSession` スクリプトはカメラリグのトランスフォーム、ARの透過、セッションのクリーンアップも管理してくれるため、本格的な体験にはスクリプトを、簡単なテストやシンプルなビューアーには要素APIを使うのがおすすめです。

ほとんどの [Web Component の例](https://playcanvas.github.io/web-components/examples/) には、XR のサポートが統合されています。それらのソースコードを参照して、どのように行われているかを確認してください。

## 次のステップ {#next-steps}

PlayCanvas Engine は、幅広い機能とオプションを備えた包括的な XR サポートを提供しています。詳細については、[XR ドキュメント](/user-manual/xr) を参照してください。
