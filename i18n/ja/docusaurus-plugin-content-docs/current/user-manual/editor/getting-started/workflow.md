---
title: PlayCanvasのワークフロー
description: Asset のインポートと Scene の構築から Script、公開まで、PlayCanvas のエンドツーエンドのワークフローをまとめます。
---

:::ai

- **[VS Code Extension](/user-manual/ai/vscode-extension/):** 「PlayCanvasのワークフロー」に必要なスクリプトを実装し、完全な差分と診断を確認して、承認されるまで Push しないでください。
- **[Editor MCP Server](/user-manual/ai/editor-mcp-server/):** 「PlayCanvasのワークフロー」に必要なエンティティ、Component、アセットを構築し、アプリケーションを起動して完成した結果をキャプチャしてください。

:::

PlayCanvas Editor を使って 3D ウェブアプリを構築するのは簡単です。

## アセットの作成とアップロード

![assets](/img/user-manual/introduction/workflow-assets.jpg)

PlayCanvasは、業界標準の様々なアセット形式をサポートしています。例えば、画像、3Dモデル、オーディオファイル、カスタムテキスト、バイナリファイル形式をアップロードすることができます。

## シーンを作成

![scene](/img/user-manual/introduction/workflow-create-scene.jpg)

PlayCanvasエディターは、シーンを作成するための視覚的なビルドツールです。ヒエラルキー上に3Dモデル、衝突 (Collision) 、パーティクルエフェクトなどのビルトインのコンポーネントを組み合わせたエンティティを作成できます。

## インタラクティブな要素を追加

![script](/img/user-manual/introduction/workflow-script.jpg)

ウェブ標準のJavascriptを使用してスクリプティングをして、エンティティに独自の振る舞いを追加できます。単純なクリックハンドラーやオービットカメラ(Orbit Camera) から、完全な大規模マルチプレイヤーオンラインゲームまで、あらゆる規模のインタラクティブな要素を追加できます。

## アプリケーションの公開

![publish](/img/user-manual/introduction/workflow-publish.jpg)

アプリケーションが共有する準備ができたら、ワンクリックで公開 (Publish) するだけで、アプリケーションを無料でPlayCanvas上にホストしてインターネット上で公開することができます。また、自分のウェブサーバーでセルフホストするためにアプリケーションをダウンロードすることも可能です。
