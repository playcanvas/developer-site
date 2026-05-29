---
title: ビューアの埋め込み
description: "@playcanvas/supersplat-viewer npmパッケージ、URLパラメータ、テンプレートを使って、オープンソースのSuperSplat Viewerを自分のウェブアプリに埋め込みます。"
---

[SuperSplat Viewer](/user-manual/supersplat/viewer/)はnpmで[`@playcanvas/supersplat-viewer`](https://www.npmjs.com/package/@playcanvas/supersplat-viewer)として公開されています。自分のサイトに組み込み、任意のスプラットファイルを指定し、URLパラメータまたはJSON設定ドキュメントで設定できる、自己完結型の静的ウェブアプリです。

## インストール

```bash
npm install @playcanvas/supersplat-viewer
```

パッケージはビューアの`index.html`、`index.css`、`index.js`を文字列としてエクスポートしており、自分のビルドパイプラインでテンプレート化できます：

```ts
import { html, css, js } from '@playcanvas/supersplat-viewer';

// The full markup of the viewer page
console.log(html);

// The viewer's stylesheet
console.log(css);

// The viewer's compiled JS bundle
console.log(js);
```

これは、[EditorのHTMLエクスポート](/user-manual/supersplat/viewer/self-hosting)が単一ファイルのビューアを生成する際に内部的に使う仕組みと同じです。特定の`settings.json`を埋め込んだり、カスタムスカイボックスに差し替えたり、デフォルトのポスター画像を置き換えたりした自前のテンプレートバンドルを構築したいときに使います — CDNからビューアを読み込むランタイムコストを支払うことなく行えます。

## URLパラメータ

ビューアのビルド済みファイルを自前でホストし、各インスタンスをクエリパラメータで設定したい場合、次のパラメータがサポートされています：

| パラメータ | 説明 | デフォルト |
| --------- | ----------- | ------- |
| `settings` | [Experience Settings](/user-manual/supersplat/studio/experience-settings) JSONファイルのURL | `./settings.json` |
| `content` | シーンファイルのURL（`.ply`、`.sog`、`.meta.json`、`.lod-meta.json`、`.compressed.ply`） | `./scene.compressed.ply` |
| `skybox` | エクイレクタンギュラースカイボックス画像のURL | _(なし)_ |
| `poster` | シーン読み込み中に表示する画像のURL | _(なし)_ |
| `noui` | ビューアの組み込みUIを非表示 | _(off)_ |
| `noanim` | アニメーショントラックを一時停止状態で開始 | _(off)_ |
| `ministats` | ランタイムのCPU/GPUパフォーマンスグラフを表示 | _(off)_ |
| `unified` | [統一レンダリング](/user-manual/gaussian-splatting/rendering-architecture)を強制 | _(off)_ |
| `aa` | アンチエイリアシングを有効化（unifiedモードでは非対応） | _(off)_ |

これらのフラグはビューアの進化に伴って変更される可能性があります。現在のセットについては[プロジェクトREADME](https://github.com/playcanvas/supersplat-viewer#readme)を参照してください。

## Settings JSON

`settings` URLパラメータは[Experience Settings](/user-manual/supersplat/studio/experience-settings) v2ドキュメントを指します — [Studio](/user-manual/supersplat/studio/)がSaveのたびに保存するのと同じJSONフォーマットです。完全なスキーマ、デフォルト、移行に関するメモは[Experience Settingsリファレンス](/user-manual/supersplat/studio/experience-settings)を参照してください。

完全な最小限の`settings.json`（v2スキーマが要求するすべてのフィールドを、新規シーンに対して[Studio](/user-manual/supersplat/studio/)が出力するデフォルトで埋めたもの）：

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
  "cameras": [
    { "initial": { "position": [0, 1, -1], "target": [0, 0, 0], "fov": 75 } }
  ],
  "animTracks": [],
  "annotations": [],
  "startMode": "default"
}
```

すべてのフィールド — ポストエフェクトのパラメータ、注釈、アニメーションキーフレーム、トーンマッピングオプションなど — の完全なカバレッジについては、[Experience Settings](/user-manual/supersplat/studio/experience-settings)リファレンスを参照してください。

## プログラム的な公開

EditorやStudioのUIを経由せずにスプラットを公開し、設定を更新したい場合、[Splat Publishing API](/user-manual/api/splat-publish/)が背後のRESTエンドポイントを提供しています。

## 関連項目

- [SuperSplat Viewerの概要](/user-manual/supersplat/viewer/) — ビューアとは何か、いつ使うか
- [Self-Hosting](/user-manual/supersplat/viewer/self-hosting) — Editorからの単一ファイルHTMLエクスポート
- [Experience Settings](/user-manual/supersplat/studio/experience-settings) — ビューアが読むJSONコントラクト
- [Splat Publishing API](/user-manual/api/splat-publish/) — プログラム的な公開のためのRESTエンドポイント
