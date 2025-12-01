---
title: アセットタイプ
---

[アセットパネル](/user-manual/editor/interface/assets)は、プロジェクトのアセットを管理します。アセットにはいくつかの異なる種類があります。

| 種類                               | インポート元                     | リソース拡張子                   | 説明                               |
| :------------------------------- | :------------------------------- | :------------------------------- | :--------------------------------- |
| [`animation`](animation)         | `.glb`, `.fbx`                   | `.glb`                           | アニメーションのキーフレームデータ |
| [`audio`](audio)                 | `.mp3`, `.wav`, `.ogg`           | `.mp3`, `.wav`, `.ogg`           | サウンドデータ                     |
| `binary`                         | `.bin`                           | `.bin`                           | バイナリデータ                     |
| `bundle`                         | エディタで作成                   | `.tar`                           | バンドルされたアセット             |
| [`css`](css)                     | `.css`                           | `.css`                           | HTML用スタイルシート               |
| [`cubemap`](cubemap)             | `.png`, `.jpg`, `.webp`, `.avif` | `.png`, `.jpg`, `.webp`, `.avif` | 環境ライティングデータ             |
| [`font`](font)                   | `.ttf`, `.woff`                  | `.json`, `.png`                  | テキスト描画用フォントデータ       |
| [`gsplat`](gsplat)               | `.ply`                           | `.ply`                           | 3D Gaussian Splatデータ            |
| [`html`](html)                   | `.html`                          | `.html`                          | HTMLドキュメント                   |
| [`json`](json)                   | `.json`                          | `.json`                          | JSONドキュメント                   |
| [`material`](material)           | `.glb`, `.fbx`                   | None                             | 3Dモデル用マテリアル定義           |
| [`render`](render)               | `.glb`, `.fbx`                   | `.glb`                           | 3Dメッシュデータ                   |
| [`script`](../../scripting/index.md) | `.js`, `.mjs`                | `.js`, `.mjs`                    | スクリプト                         |
| [`shader`](shader)               | `.glsl`, `.vert`, `.frag`        | `.glsl`, `.vert`, `.frag`        | レンダリング用カスタムシェーダー   |
| [`sprite`](sprite)               | エディタで作成                   | None                             | UIまたはテクスチャ用2D画像         |
| [`template`](template)           | `.glb`                           | None                             | エンティティ階層用テンプレート     |
| [`text`](text)                   | `.txt`                           | `.txt`                           | テキストドキュメント               |
| [`texture-atlas`](texture-atlas) | `.png`, `.jpg`, `.webp`, `.avif` | `.png`, `.jpg`, `.webp`, `.avif` | スプライトシート画像データ         |
| [`texture`](texture)             | `.png`, `.jpg`, `.webp`, `.avif` | `.png`, `.jpg`, `.webp`, `.avif` | 3DモデルまたはUI用画像データ       |
| [`wasm`](wasm)                   | `.wasm`                          | `.wasm`                          | WebAssemblyモジュール              |
