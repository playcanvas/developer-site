---
title: アセットインスペクター
---

[アセットパネル](/user-manual/editor/assets/asset-panel)でアセットを選択すると、そのプロパティがインスペクターに表示されます。各アセットタイプには、独自の設定可能なプロパティがあります。

## Common Properties

すべてのアセットインスペクターは、ヘッダーセクションに共通のプロパティセットを表示します：

![Common Asset Inspector Properties](/img/user-manual/editor/assets/inspectors/asset-inspector-common.png)

| Property | Description |
|----------|-------------|
| ID | アセットの一意の識別子。スクリプトでアセットを参照する際に便利です。 |
| Name | アセットの表示名。編集してアセットの名前を変更できます。 |
| Tags | 整理とフィルタリングのためにアセットに割り当てられたタグ。[アセットパネル](/user-manual/editor/assets/asset-panel#searching)および[Engine API](/user-manual/assets/asset-registry#by-tag)でランタイム時にも使用できます。 |
| Type | [アセットタイプ](#asset-types)（読み取り専用）。 |
| Exclude | 有効にすると、アセットは公開ビルドから除外されます。テストスクリプトやREADMEなど、開発専用アセットに便利です。 |
| Preload | 有効にすると、アセットはアプリケーション起動時に読み込まれます。無効にすると、参照されているアセットはアプリ起動後に非同期で読み込まれ、参照されていないアセットはスクリプトで手動で読み込む必要があります。 |
| Size | アセットのファイルサイズ（読み取り専用）。 |
| Source | このアセットの派生元となったソースアセットへの参照（該当する場合、読み取り専用）。 |
| Created | アセットが作成された日時（読み取り専用）。 |

### Script Assets

スクリプトアセットには追加のプロパティが表示されます：

![Script Asset Inspector Properties](/img/user-manual/editor/assets/inspectors/asset-inspector-common-script.png)

| Property | Description |
|----------|-------------|
| Loading Order | [スクリプトの読み込み順序マネージャー](/user-manual/editor/scripting/loading-order)を開き、スクリプトの読み込み順序を制御します。 |
| Loading Type | スクリプトの読み込みタイミングを制御します：<ul><li>**Asset** - 通常のアセットとして読み込み</li><li>**Before Engine** - PlayCanvasエンジンの前に読み込み</li><li>**After Engine** - エンジンの後、アプリケーション開始前に読み込み</li></ul> |

### Asset Store Assets

[Asset Store](/user-manual/editor/assets/asset-store)からインポートされたアセットには、追加の帰属プロパティが表示されます：

![Asset Store Inspector Properties](/img/user-manual/editor/assets/inspectors/asset-inspector-common-license.png)

| Property | Description |
|----------|-------------|
| License | アセットが提供されるライセンス。ライセンス詳細へのリンク付き。 |
| Author | アセットの原作者。プロフィールへのリンク付き。 |

## Asset Types

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
