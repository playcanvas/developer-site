---
title: ビューアの埋め込み
description: "@playcanvas/supersplat-viewer npmパッケージを使って、オープンソースのSuperSplat Viewerを自分のサイトに埋め込みます。ビルド済みビューアをホストしてURLパラメータで設定する、renderViewerHtmlでページを生成する、createViewerでアプリ内にビューアを作成する、のいずれかの方法を選べます。"
---

[SuperSplat Viewer](/user-manual/supersplat/developers/viewer/)はnpmで[`@playcanvas/supersplat-viewer`](https://www.npmjs.com/package/@playcanvas/supersplat-viewer)として公開されています。ビルド済みのビューアをホストしてURLパラメータで設定する、ビューアを含むページを生成する、自分のウェブアプリ内でビューアを作成する、といった使い方ができます。

スプラットがすでにsuperspl.atで公開されている場合、最も簡単な埋め込み方法は、そのシーンページの[Embedダイアログ](/user-manual/supersplat/viewing/scene-page#embed-dialog)から取得できる`<iframe>`です。

## 方法の選択

| 方法 | 使うべき場面 |
|----------|----------|
| [ビルド済みビューアをホストする](#hosting-the-prebuilt-viewer) | ビューアの静的ファイルを配信してスプラットと`settings.json`を指定し、各ページをURLパラメータで設定したいとき。 |
| `renderViewerHtml`で[ページを生成する](#generating-a-page) | サーバーやビルドが、アセットのURLと設定を埋め込んだHTMLページを書き出すとき。 |
| `createViewer`で[ページ内にビューアを作成する](#creating-a-viewer-in-your-own-page) | 自分のウェブアプリがページを管理し、ビューアの作成・制御・破棄を自ら行うとき。 |

## インストール

```bash
npm install @playcanvas/supersplat-viewer
```

パッケージには次のエントリポイントがあります：

| インポート | 提供するもの |
|--------|----------|
| `@playcanvas/supersplat-viewer` | `renderViewerHtml`と、ビューアのスタイルシートおよびバンドルを文字列にした`css`と`js` |
| `@playcanvas/supersplat-viewer/viewer` | `createViewer`。`playcanvas`（2.24.1以降）がピア依存関係です |
| `@playcanvas/supersplat-viewer/viewer.css` | `createViewer`に必要なスタイルシート |
| `@playcanvas/supersplat-viewer/settings` | 設定の型、デフォルト、検証、マイグレーション。[Experience Settings](/user-manual/supersplat/developers/experience-settings#generating-and-validating-settings)を参照してください。 |

メインのエントリポイントは、ビューアのページを文字列`html`としてもエクスポートしていますが、これは非推奨です。フォーマットがリリースごとに変わるため、代わりに`renderViewerHtml`を使ってください。

## ビルド済みビューアのホスティング {#hosting-the-prebuilt-viewer}

パッケージの`public/`フォルダーには、スタンドアロンのビューア（`index.html`、`index.js`、`index.css`と、一部の形式に必要なWebAssemblyデコーダーの`.wasm`ファイル）が入っています。このフォルダーをウェブサーバーにコピーし、`index.html`を開きます。パラメータを指定しない場合は、同じ場所にある`./settings.json`と`./scene.compressed.ply`を読み込みます。

`.wasm`ファイルは、バージョン4の`.spz`ファイルなど、それを必要とするコンテンツでのみ取得されます。`application/wasm`として配信してください。

### URLパラメータ {#url-parameters}

各ページはクエリパラメータで設定します（例：`index.html?content=./museum/lod-meta.json&settings=./museum/settings.json`）。これらのパラメータはビューアの進化に伴って変更される可能性があります。現在のセットと、開発者向けのいくつかの追加パラメータについては、[プロジェクトREADME](https://github.com/playcanvas/supersplat-viewer#readme)を参照してください。

#### コンテンツ

| パラメータ | 説明 | デフォルト |
| --------- | ----------- | ------- |
| `settings` | [Experience Settings](/user-manual/supersplat/developers/experience-settings) JSONファイルのURL | `./settings.json` |
| `content` | スプラットのURL。[対応コンテンツ](#supported-content)を参照してください。 | `./scene.compressed.ply` |
| `skybox` | エクイレクタンギュラースカイボックス画像のURL | _(なし)_ |
| `poster` | シーンの読み込み中に、ぼかして表示する画像のURL | _(なし)_ |
| `collision` | ウォークモード用のコリジョンデータのURL：`.voxel.json`ファイル（`.voxel.bin`を同じ場所に置きます）、または`.glb`メッシュ。`voxel`はエイリアスです。 | _(なし)_ |

#### UI

| パラメータ | 説明 |
| --------- | ----------- |
| `noui` | ビューアの組み込みUIを非表示 |
| `noanim` | カメラアニメーションを一時停止状態で開始 |
| `reticle` | マウスがキャプチャされている間、フライモードとウォークモードで画面中央にレティクルを表示 |
| `ministats` | ランタイムのCPU/GPUパフォーマンスグラフを表示 |
| `lang` | UIの言語：`de`、`en`、`es`、`fr`、`ja`、`ko`、`pt-BR`、`ru`、`zh-CN`のいずれか。デフォルトはブラウザの言語です。 |
| `vr` | VRが利用可能な場合、シーンの読み込み中に**Tap to enter VR**プロンプトを表示します。[VRとARでの表示](/user-manual/supersplat/viewing/xr#entering-a-session)を参照してください。 |

#### レンダリング

| パラメータ | 説明 |
| --------- | ----------- |
| `webgl` | WebGLを使用します。デフォルトでは、WebGPUが利用可能な場合はWebGPUを使用します。 |
| `aa` | アンチエイリアシング付きでトレーニングされたスプラット向けのアンチエイリアシング補正を強制します：`aa`、`aa=1`、`aa=true`、`aa=enable`ですべてのスプラットに対してオンになり、それ以外の値ではオフになります。指定しない場合は、各スプラットファイル自体のトレーニングモードに従います。 |
| `hpr` | 設定の`highPrecisionRendering`を上書きします：`hpr`、`hpr=1`、`hpr=true`、`hpr=enable`でオン、それ以外の値でオフになります。 |
| `nofx` | ポストエフェクトをオフにします |
| `budget` | ガウシアンバジェット（100万単位）。すべての[Quality](/user-manual/supersplat/viewing/controls#quality)段階の値を上書きします |
| `fullload` | 最初のフレームの前に、ストリーミングシーンのディテールをすべて読み込みます |
| `stochastic` | 実験的機能です。[Performance Mode](/user-manual/supersplat/viewing/controls#performance-mode)が使う確率的スプラットレンダラーを強制します：`stochastic`でピクセル単位のモード、`stochastic=mobile`でスマートフォンとヘッドセット向けのモードになり、`stochastic=off`では標準のレンダラーを使い続けます。いずれを指定しても、Performance Mode設定は非表示になります。WebGPUのみ対応しています。 |
| `colorize` | レベルオブディテールごとにガウシアンを色分けします |
| `heatmap` | コリジョンオーバーレイをヒートマップとして描画します。WebGPUとボクセルコリジョンが必要です。オーバーレイは**Show Collision**または<kbd>V</kbd>でオンにします。 |
| `debug` | 読み込み時に開発者用デバッグパネルを開きます（<kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>D</kbd>で切り替え） |

### 対応コンテンツ {#supported-content}

ビューアは、コンテンツのファイル名からフォーマットを判断します：

| フォーマット | ファイル |
|--------|------|
| PLY | `.ply`、`.compressed.ply` |
| SOG | `.sog`、または非バンドルSOGの`meta.json` |
| Streamed SOG | `lod-meta.json` |
| SPZ | `.spz`（バージョン3と4） |
| XGRIDS LCC2 | `.lcc2`。Streamed SOGと同様に、必要に応じてストリーミングされます |

splat-transform 3.11.0または3.11.1で書き出されたSOG v3ファイルは、ビューアが現在は読み込まない以前のレイアウトを使用しています。最新の[splat-transform](/user-manual/splat-transform/)で再変換してください。

## ページの生成 {#generating-a-page}

サーバーやビルドでビューアを含むページを生成する場合は、`renderViewerHtml`を使います。アセットのURLと設定を1つのJSONブロックにまとめて埋め込んだ、完全なHTMLドキュメントを返します：

```ts
import { renderViewerHtml } from '@playcanvas/supersplat-viewer';

const page = renderViewerHtml({
    bootstrap: {
        settings,                      // オブジェクト。省略してsettingsUrlを設定することもできます
        contentUrl: 'scene.sog',
        posterUrl: 'poster.jpg'
    },
    baseHref: '/viewer/',              // サブパスから配信する場合
    backgroundColor: [0, 0, 0],        // 各成分は0..255ではなく0..1
    headExtras: '<script src="analytics.js"></script>',
    inlineCss: true                    // 隣にindex.cssを置く必要がなくなります
});
```

| オプション | 説明 |
|--------|-------------|
| `bootstrap` | ページのアセットと設定：`settings`または`settingsUrl`、`contentUrl`、`contentFilename`、`posterUrl`、`skyboxUrl`、`collisionUrl`、`zstdDecoderUrl` |
| `baseHref` | ページのベースURL。ビューアをサブパスから配信する場合に使います |
| `backgroundColor` | 最初のフレームが描画されるまでのページ背景。設定の`background.color`と同じく、0～1のRGBで指定します |
| `headExtras` / `bodyStartExtras` | `<head>`内、または`<body>`の先頭に追加するマークアップ |
| `inlineCss` / `inlineJs` | ページの隣から`index.css`や`index.js`を読み込む代わりに、スタイルシートやバンドルをインライン化します |

オプションなしで呼び出すと、パッケージに含まれるページをそのまま返します。配信されたページのURLパラメータは引き続きbootstrapのアセットURLを上書きするため、各インスタンスは設定可能なままです。ただし、インラインの`settings`は例外で、`?settings=`よりも優先されます。

自己完結した単一ファイルにするには、`inlineCss`と`inlineJs`の両方を設定し、設定をインラインで渡し、スプラットを`data:` URIとして`contentUrl`に渡します。`data:` URIにはファイル名がないため、`contentFilename`でコンテンツに名前（`scene.sog`など）を付けます：

```ts
const page = renderViewerHtml({
    bootstrap: {
        settings,
        contentUrl: sogDataUri,
        contentFilename: 'scene.sog'
    },
    inlineCss: true,
    inlineJs: true
});
```

バージョン4の`.spz`ファイルを読み込む単一ファイルのページでは、デコーダーもインラインにする必要があります。`zstdDecoderUrl`に、`zstd-decoder.wasm`を`data:` URLにしたものを設定してください。`zstdDecoderUrl`に対応するURLパラメータはありません。もしあれば、リンク1つでページのオリジン上で任意のWebAssemblyを実行できてしまうためです。

## 自分のページ内でのビューアの作成 {#creating-a-viewer-in-your-own-page}

自分のウェブアプリがページを管理している場合は、その要素の1つの中にビューアを作成します：

```ts
import { createViewer } from '@playcanvas/supersplat-viewer/viewer';
import '@playcanvas/supersplat-viewer/viewer.css';

const viewer = await createViewer({
    container: document.getElementById('viewer'),
    settings: './settings.json',
    contentUrl: './scene.sog'
});

// 後で
viewer.destroy();
```

返されるハンドルで、読み込み、再生、カメラ、注釈、フルスクリーン、XRを制御できます。また、組み込みUIはスタイルを変更したり、置き換えたりできます。[ビューアAPI](/user-manual/supersplat/developers/viewer-api)を参照してください。

## Settings JSON

`settings`パラメータまたはオプションは、[Experience Settings](/user-manual/supersplat/developers/experience-settings) v2ドキュメントを指します。これは[Studio](/user-manual/supersplat/studio/)が保存するのと同じJSONフォーマットです。以下は、`defaultSettings()`（`@playcanvas/supersplat-viewer/settings`が提供）が生成する完全なドキュメントです：

```json
{
  "version": 2,
  "tonemapping": "linear",
  "highPrecisionRendering": false,
  "background": {
    "color": [0, 0, 0]
  },
  "postEffectSettings": {
    "sharpness": { "enabled": false, "amount": 0 },
    "bloom":     { "enabled": false, "intensity": 0.1, "blurLevel": 2 },
    "grading":   { "enabled": false, "brightness": 1, "contrast": 1, "saturation": 1, "tint": [1, 1, 1] },
    "vignette":  { "enabled": false, "intensity": 0.5, "inner": 0.3, "outer": 0.75, "curvature": 1 },
    "fringing":  { "enabled": false, "intensity": 0.5 }
  },
  "animTracks": [],
  "cameras": [
    { "initial": { "position": [0, 2, 0], "target": [2, 2, 0], "fov": 85 } }
  ],
  "annotations": [],
  "startMode": "default"
}
```

このカメラは、キャプチャした空間をその内側から見渡します。一方、`defaultSettings('object')`は被写体を外側からフレーミングします。すべてのフィールド、作成時の制限、設定の生成・検証・マイグレーションのためのヘルパーについては、[Experience Settings](/user-manual/supersplat/developers/experience-settings)リファレンスを参照してください。

## プログラム的な公開

Editorを使わずに独自のパイプラインからsuperspl.atへスプラットを公開するには、[SuperSplat API](/user-manual/supersplat/developers/api-integrations)を使用します。この方法で公開したシーンはデフォルトの設定で始まり、その閲覧体験は[Studio](/user-manual/supersplat/studio/)で整えます。

## 関連項目

- [SuperSplat Viewerの概要](/user-manual/supersplat/developers/viewer/) — ビューアとは何か、いつ使うか
- [ビューアAPI](/user-manual/supersplat/developers/viewer-api) — `createViewer`とビューアハンドル
- [Self-Hosting](/user-manual/supersplat/developers/self-hosting) — Editorからの単一ファイルHTMLエクスポート
- [Experience Settings](/user-manual/supersplat/developers/experience-settings) — ビューアが読むJSONコントラクト
- [API & Integrations](/user-manual/supersplat/developers/api-integrations) — 独自のコードからsuperspl.atへスプラットを公開する
