---
title: カスタムエンジンの使用
description: 開発用、安定版、過去版、フォークビルド向けのカスタム Engine の URL。ESM Script と従来の createScript プロジェクトを併用するときの module と UMD の選択を含みます。
---

デフォルトでは、PlayCanvasアプリをエディターから起動すると、最新の安定版のエンジンが使用されます。しかし、以下のような理由で、アプリを異なるエンジンビルドで実行したい場合があります。

* 新しい機能やバグ修正をテストするために、プレリリースビルドのエンジンでプロジェクトをテストし、次のエンジンリリース前に潜在的なリグレッションを検出するため。
* 現在の安定ビルドに見つかったリグレッションを緩和するために、一時的に以前の安定エンジンバージョンに戻るため。
* [GitHub](https://github.com/playcanvas/engine)上のエンジンリポジトリの自分自身のフォークで開発およびデバッグするため。

:::warning[新しいエンジンビルドは npm にのみ公開されます]

2.24.0 以降、エンジンビルドは `code.playcanvas.com` にアップロードされなくなりました。そのため、ここを指す `use_local_engine` の URL はそれ以前のバージョンでのみ動作します。公開されている任意のエンジンバージョンで起動するには、代わりに以下で説明する `version` または `tag` 起動パラメーターを使用してください。

:::

:::important[正しいエンジンのロード: モジュール vs UMD]

カスタムエンジンビルドをロードする際は、プロジェクトのスクリプトタイプに基づいて正しいフォーマットを選択することが重要です。

* プロジェクトにESMスクリプト（`import`/`export`を使用）が含まれている場合、URLに`.mjs`拡張子を使用してエンジンのモジュールビルドをロードする必要があります。
* クラシックスクリプト（`pc.createScript`を使用）のみを含むプロジェクトの場合、`.js`拡張子を持つUMDビルドを使用します。

:::

それぞれの状況に対処する方法を見ていきましょう。

### プレリリースエンジンで起動

エディターからアプリを起動すると、launchページと呼ばれる新しいタブが開きます。このページのURLは以下の形式です。

```none
    https://launch.playcanvas.com/<scene_id>
```

プレリリースのエンジンビルドは npm に公開されています。最新の beta ビルドで起動するには、launchページのURLに `tag` パラメーターを追加します。

```none
    https://launch.playcanvas.com/<scene_id>?tag=beta
```

最新の preview ビルドで起動する場合は、次を使用してください。

```none
    https://launch.playcanvas.com/<scene_id>?tag=preview
```

デバッグモードを有効にして起動する場合は、`debug=true` を追加してください。

```none
    https://launch.playcanvas.com/<scene_id>?tag=beta&debug=true
```

### 以前の安定エンジンで起動

npm に公開されているすべてのエンジンリリースは、`version` パラメーターで読み込めます。過去のすべてのリリースは[GitHub](https://github.com/playcanvas/engine/releases)で見つけることができます。例えば、エンジン 2.23.3 で起動するには、次のローンチURLを使用してください。

```none
    https://launch.playcanvas.com/<scene_id>?version=2.23.3
```

launchページはプロジェクトのスクリプトに合わせてモジュールビルドまたは UMD ビルドを自動的に選択します。デバッグビルドを読み込むには、`debug=true` を追加してください。

:::tip

エディタは公式には現行のエンジンリリースと前のマイナーバージョンのみをサポートしています。古いバージョンのエンジンを使用することが可能な場合もありますが、それは長期にわたってサポートされるワークフローではありません。ライブプロジェクトは現行のエンジンリリースで更新しておくことを強く推奨します。

:::

### ローカルにビルドしたエンジンで起動

GitHubでEngineリポジトリをフォークした場合、自身でEngineをビルドできます（`npm run build`を使用）。起動ページでカスタムビルドを起動させるには、`npm run serve`を実行してローカルウェブサーバーを起動する必要があります。

以下のURLでEngineソースが見えることを確認してください。

```none
    http://localhost:51000/playcanvas.js
```

このEngineを起動ページで使用するには、URLを以下のように編集します。

```none
    https://launch.playcanvas.com/<scene_id>?use_local_engine=http://localhost:51000/playcanvas.js
```
