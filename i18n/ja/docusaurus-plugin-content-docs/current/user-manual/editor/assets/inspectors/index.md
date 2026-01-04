---
title: アセットインスペクター
---

[アセットパネル](/user-manual/editor/assets/asset-panel)でアセットを選択すると、そのプロパティがインスペクターに表示されます。各アセットタイプには、独自の設定可能なプロパティがあります。

| タイプ                             | インポート元                       | リソース拡張子                     | 説明                               |
| -------------------------------- | -------------------------------- | -------------------------------- | ---------------------------------- |
| [`animation`](animation)         | `.glb`, `.fbx`                   | `.glb`                           | アニメーションのキーフレームデータ |
| [`audio`](audio)                 | `.mp3`, `.wav`, `.ogg`           | `.mp3`, `.wav`, `.ogg`           | サウンドデータ                     |
| `binary`                         | `.bin`                           | `.bin`                           | バイナリデータ                     |
| `bundle`                         | エディタで作成                    | `.tar`                           | バンドルされたアセット             |
| [`css`](css)                     | `.css`                           | `.css`                           | HTML 用スタイルシート              |
| [`cubemap`](cubemap)             | `.png`, `.jpg`, `.webp`, `.avif` | `.png`, `.jpg`, `.webp`, `.avif` | 環境ライティングデータ             |
| [`font`](font)                   | `.ttf`, `.woff`                  | `.json`, `.png`                  | テキスト描画用フォントデータ       |
| [`gsplat`](gsplat)               | `.ply`                           | `.ply`                           | 3D Gaussian Splat データ          |
| [`html`](html)                   | `.html`                          | `.html`                          | HTML ドキュメント                  |
| [`json`](json)                   | `.json`                          | `.json`                          | JSON ドキュメント                  |
| [`material`](material)           | `.glb`, `.fbx`                   | なし                             | 3D モデル用マテリアル定義          |
| [`render`](render)               | `.glb`, `.fbx`                   | `.glb`                           | 3D メッシュデータ                  |
| [`script`](../../scripting/index.md) | `.js`, `.mjs`                | `.js`, `.mjs`                    | スクリプト                         |
| [`shader`](shader)               | `.glsl`, `.vert`, `.frag`        | `.glsl`, `.vert`, `.frag`        | 描画用カスタムシェーダー           |
| [`sprite`](sprite)               | エディタで作成                    | なし                             | UI またはテクスチャ用 2D 画像      |
| [`template`](template)           | `.glb`                           | なし                             | エンティティ階層用テンプレート     |
| [`text`](text)                   | `.txt`                           | `.txt`                           | テキストドキュメント               |
| [`texture-atlas`](texture-atlas) | `.png`, `.jpg`, `.webp`, `.avif` | `.png`, `.jpg`, `.webp`, `.avif` | スプライトシート画像データ         |
| [`texture`](texture)             | `.png`, `.jpg`, `.webp`, `.avif` | `.png`, `.jpg`, `.webp`, `.avif` | 3D モデルまたは UI 用画像データ    |
| [`wasm`](wasm)                   | `.wasm`                          | `.wasm`                          | WebAssembly モジュール             |
