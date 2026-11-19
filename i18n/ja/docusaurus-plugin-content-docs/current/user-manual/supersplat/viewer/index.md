---
title: SuperSplat Viewer
description: "SuperSplatのシーンページを動かしているオープンソースのウェブビューア — 自分のサイトやアプリに埋め込んだり、自分でホストしたりできます。"
---

**SuperSplat Viewer**は、superspl.atのすべての[シーンページ](/user-manual/supersplat/scene-page)をレンダリングする、オープンソースのウェブビューアです。スプラットと設定JSONドキュメントを受け取り、インタラクティブな3D体験に変換します。オービット・フライ・ウォークの各カメラモード、注釈、カメラアニメーション、アニメーションスプラットシーケンス、ポストエフェクト、ウォーカブルなシーン向けのコリジョン、WebXR対応デバイスでのVRとARに対応しています。

ビューアはMITライセンスの下で[GitHubでオープンソース](https://github.com/playcanvas/supersplat-viewer)であり、npmで[`@playcanvas/supersplat-viewer`](https://www.npmjs.com/package/@playcanvas/supersplat-viewer)として配布されています。

<!-- TODO: media — /img/user-manual/supersplat/viewer/embed-example.png — サードパーティのページ内でレンダリングされるビューア -->

## ビューアの使い方

シーンページ、埋め込み、Editorからエクスポートしたビューアのどこで動いていても、訪問者には同じビューアが表示されます。

- [ビューアの操作](/user-manual/supersplat/viewer/controls) — ツールバー、カメラモード、コントロール・設定・情報の各パネル、キーボードショートカット、注釈
- [VRとARでの表示](/user-manual/supersplat/viewer/xr) — セッションの開始、テレポート、つかんでの移動とスケール変更、ARでのスプラットの配置、ハンドメニュー

## ビューアを直接使うとき

superspl.atの公開[シーンページ](/user-manual/supersplat/scene-page)は、通常スプラットを共有する最も簡単な方法です。ビューアを直接使う場合は次のようなニーズがあるときです：

- **superspl.atのクロームのないページが欲しい。** 自分のウェブサイト、アプリ、プロダクトに、自前のUIで囲んでビューアを埋め込みたい。
- **ビューアの設定方法を完全に制御したい。** 設定、コンテンツ、スカイボックス、ポスター画像、コリジョンを、URLパラメータ、自前の`settings.json`、またはコードで上書きしたい。
- **自分のコードから制御したい。** 自分のウェブアプリ内でビューアを作成し、再生、カメラ、注釈、フルスクリーン、XRを操作したり、組み込みUIを独自のものに置き換えたりしたい。
- **自己完結型でオフラインフレンドリーなバンドルが欲しい。** [EditorのHTMLエクスポート](/user-manual/supersplat/viewer/self-hosting)を使って、スプラットと一緒に単一ファイルのビューアを配布する。
- **superspl.atからの独立性が欲しい。** 自分のインフラでビューアをセルフホストし、ランタイムでPlayCanvasサーバーへリクエストしないようにする。

## 利用方法

| 形態 | 使うべき場面 |
|------|----------|
| **superspl.atからの埋め込み** | スプラットがsuperspl.atで公開されていて、`<iframe>`で十分なとき。シーンページの[Embedダイアログ](/user-manual/supersplat/scene-page#embed-dialog)を使います。 |
| **EditorからのHTMLエクスポート** | メール送信、USB配布、GitHub Pagesでのホスティングが可能な、自己完結型の`.html`（またはビューアとスプラットをまとめた`.zip`）が欲しいとき。[ビューアのセルフホスティング](/user-manual/supersplat/viewer/self-hosting)を参照してください。 |
| **npmのビルド済みビューア** | ビューアのファイルを自分で配信し、URLパラメータで各ページにスプラットと`settings.json`を指定したいとき。[ビューアの埋め込み](/user-manual/supersplat/viewer/embedding#hosting-the-prebuilt-viewer)を参照してください。 |
| **`renderViewerHtml`** | サーバーやビルドが、アセットのURLと設定を埋め込んだビューアのページを生成するとき。[ビューアの埋め込み](/user-manual/supersplat/viewer/embedding#generating-a-page)を参照してください。 |
| **`createViewer`** | 自分のウェブアプリがページを管理し、ビューアの作成・制御・破棄を自ら行うとき。[ビューアAPI](/user-manual/supersplat/viewer/api)を参照してください。 |

どの形態も同じ[Experience Settings](/user-manual/supersplat/studio/experience-settings) JSONを読みますので、[Studio](/user-manual/supersplat/studio/)で作成した内容はそのまま反映されます。

## 関連項目

- [ビューアの操作](/user-manual/supersplat/viewer/controls) — 訪問者がシーンをナビゲートする方法
- [VRとARでの表示](/user-manual/supersplat/viewer/xr) — ヘッドセットとスマートフォンでのAR
- [Embedding](/user-manual/supersplat/viewer/embedding) — npmパッケージ、URLパラメータ、生成されるページ、settings.json
- [ビューアAPI](/user-manual/supersplat/viewer/api) — `createViewer`とコードからのビューアの制御
- [Self-Hosting](/user-manual/supersplat/viewer/self-hosting) — Editorから単一ファイルのHTMLビューアをエクスポートする
- [Experience Settings](/user-manual/supersplat/studio/experience-settings) — ビューアを駆動するJSONコントラクト
