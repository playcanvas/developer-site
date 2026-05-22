---
title: SuperSplat Viewer
description: "SuperSplatのシーンページを動かしているオープンソースのウェブビューア — 自分のサイトに埋め込んだり、セルフホストしたりできます。"
---

**SuperSplat Viewer**は、superspl.atのすべての[シーンページ](/user-manual/supersplat/scene-page)をレンダリングする、オープンソースのウェブビューアです。スプラットファイルと設定JSONドキュメントを受け取り、インタラクティブな3D体験 — オービット、パン、ズーム、注釈、カメラアニメーション、ポストエフェクト、オプションのコリジョン／ウォーク操作、対応デバイス向けのWebXR — に変換する小さな自己完結型のウェブアプリです。

ビューアはMITライセンスの下で[GitHubでオープンソース](https://github.com/playcanvas/supersplat-viewer)であり、npmで[`@playcanvas/supersplat-viewer`](https://www.npmjs.com/package/@playcanvas/supersplat-viewer)として配布されています。

<!-- TODO: media — /img/user-manual/supersplat/viewer/embed-example.png — サードパーティのページ内でレンダリングされるビューア -->

## ビューアを直接使うとき

superspl.atの公開[シーンページ](/user-manual/supersplat/scene-page)は、通常スプラットを共有する最も簡単な方法です。ビューアを直接使う場合は次のようなニーズがあるときです：

- **superspl.atのクロームのないページが欲しい。** 自分のウェブサイト、アプリ、プロダクトに、自前のUIで囲んでビューアを埋め込みたい。
- **ビューアの設定方法を完全に制御したい。** 設定、コンテンツ、スカイボックス、ポスター画像をURLパラメータや自前のsettings.jsonで上書きしたい。
- **自己完結型でオフラインフレンドリーなバンドルが欲しい。** [EditorのHTMLエクスポート](/user-manual/supersplat/viewer/self-hosting)を使って、スプラットと一緒に単一ファイルのビューアを配布する。
- **superspl.atからの独立性が欲しい。** 自分のインフラでビューアをセルフホストし、ランタイムでPlayCanvasサーバーへリクエストしないようにする。

## 2つの配布形態

ビューアを利用する方法は2つあります：

| 形態 | 使うべき場面 |
|------|----------|
| **EditorからのHTMLエクスポート** | メール送信、USB配布、GitHub Pagesでのホスティングが可能な、自己完結型の`.html`（または`.html`+`.compressed.ply`の`.zip`）が欲しいとき。[ビューアのセルフホスティング](/user-manual/supersplat/viewer/self-hosting)を参照してください。 |
| **`@playcanvas/supersplat-viewer` npmパッケージ** | 自分のウェブアプリにビューアを埋め込みたい、settings.jsonをテンプレート化したい、独自のUIをその上に構築したいとき。[Embedding](/user-manual/supersplat/viewer/embedding)を参照してください。 |

どちらの形態も同じ[Experience Settings](/user-manual/supersplat/studio/experience-settings) JSONを読みますので、[Studio](/user-manual/supersplat/studio/)で作成した内容はそのまま反映されます。

## 関連項目

- [Embedding](/user-manual/supersplat/viewer/embedding) — npmパッケージ、URLパラメータ、settings.jsonスキーマ
- [Self-Hosting](/user-manual/supersplat/viewer/self-hosting) — Editorから単一ファイルのHTMLビューアをエクスポートする
- [Experience Settings](/user-manual/supersplat/studio/experience-settings) — ビューアを駆動するJSONコントラクト
