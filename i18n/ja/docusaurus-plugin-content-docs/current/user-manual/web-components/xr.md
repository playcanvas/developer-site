---
title: XR のサポート
---

PlayCanvas Web Components を使用すると、アプリケーションに Virtual Reality (VR) および Augmented Reality (AR) のサポートを簡単に追加できます。

## 基本的なセットアップ

XR のサポートを有効にするには、以下が必要です。

1. XR 専用スクリプト ([Engine NPM package](https://www.npmjs.com/package/playcanvas) で提供)。
2. 適切なスクリプトがアタッチされたカメラエンティティ。
3. XR の開始/終了用の UI（WebXR のセッション開始にはユーザーのジェスチャーが必要です）。
4. セキュアコンテキスト — 本番では HTTPS（開発中は `http://localhost`）でページを提供してください。

### XR スクリプト

以下のスクリプトを[`<pc-asset>`](../tags/pc-asset) 要素を使用して指定します。

```html
<pc-asset src="/node_modules/playcanvas/scripts/esm/xr-controllers.mjs"></pc-asset>
<pc-asset src="/node_modules/playcanvas/scripts/esm/xr-navigation.mjs"></pc-asset>
```

または、CDN を使用する場合:

```html
<pc-asset src="https://cdn.jsdelivr.net/npm/playcanvas@latest/scripts/esm/xr-controllers.mjs"></pc-asset>
<pc-asset src="https://cdn.jsdelivr.net/npm/playcanvas@latest/scripts/esm/xr-navigation.mjs"></pc-asset>
```

:::note[CDN とインポートマップ]

CDN から XR スクリプトを読み込む場合は、[Getting Started ガイド](getting-started.md) に示すように、ページのインポートマップも同じ CDN とバージョンを指すように設定してください。 本番環境では `@latest` ではなく特定バージョンへの固定を推奨します。

:::

* [`xr-controllers.mjs`](https://github.com/playcanvas/engine/blob/main/scripts/esm/xr-controllers.mjs) - 検出された XR コントローラー（手を含む）の XR コントローラーモデル（GLB）を動的にダウンロードし、レンダリングします。
* [`xr-navigation.mjs`](https://github.com/playcanvas/engine/blob/main/scripts/esm/xr-navigation.mjs) - 基本的なテレポートナビゲーション（ポイント＆選択アクションによる）を実装します。

### カメラのセットアップ

XR スクリプトは、シーンのカメラを次のようにセットアップする必要があります。

```html
<!-- カメラ（XRサポート付き） -->
<pc-entity name="camera root">
    <pc-entity name="camera">
        <pc-camera></pc-camera>
    </pc-entity>
    <pc-scripts>
        <pc-script name="xrControllers"></pc-script>
        <pc-script name="xrNavigation"></pc-script>
    </pc-scripts>
</pc-entity>
```

### XR の開始/終了用 UI

最後に、ユーザーが XR モードを開始および終了できるように、UI コントロールを追加する必要があります。これは WebXR 固有の要件であり、XR セッションをアクティブ化するにはユーザーのジェスチャーが必要です。AR または VR セッションをトリガーするための2つのシンプルなボタンを作成しましょう。

```html
<button id="enterAR">ARに入る</button>
<button id="enterVR">VRに入る</button>
```

ユーザーがボタンをクリックしたときに XR セッションをトリガーするように、ボタンにイベントリスナーを追加しましょう。

```javascript
document.addEventListener('DOMContentLoaded', async () => {
    const appElement = await document.querySelector('pc-app').ready();
    const app = appElement.app;
    const xr = app.xr;
    const camera = app.root.findComponent('camera');

    document.getElementById('enterAR').addEventListener('click', () => {
        xr.start(camera, 'immersive-ar', 'local-floor')
    });

    document.getElementById('enterVR').addEventListener('click', () => {
        xr.start(camera, 'immersive-vr', 'local-floor')
    });

    window.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && xr.active) {
            xr.end();
        }
    });
});
```

ほとんどの [Web Component の例](https://playcanvas.github.io/web-components/examples/) には、XR のサポートが統合されています。それらのソースコードを参照して、どのように行われているかを確認してください。

## 次のステップ

PlayCanvas Engine は、幅広い機能とオプションを備えた包括的な XR サポートを提供しています。詳細については、[XR ドキュメント](/user-manual/xr) を参照してください。
