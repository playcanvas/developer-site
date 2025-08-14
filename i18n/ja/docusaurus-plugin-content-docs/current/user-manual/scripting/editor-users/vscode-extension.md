---
title: VS Code拡張機能
---

ソース管理、GitHub Copilot、幅広い拡張機能といった機能で強化されたコード編集体験を求める開発者にとって、Visual Studio Code (VS Code)をPlayCanvasと統合することは、組み込みのCode Editorに対する強力な代替手段を提供します。この目的のために、当社は[オープンソース](https://github.com/playcanvas/vscode-extension)のVS Code拡張機能を提供しています。

![VS Code拡張機能によるスクリプトアセットのライブ編集](/img/user-manual/scripting/vscode-extension.webp)

## 機能

* **リアルタイム同期**: VS Codeで行われた変更は自動的にPlayCanvasプロジェクトと同期され、チームが常に最新の更新にアクセスできるようにします。
* **強化されたコード編集**: IntelliSense、コードスニペット、GitHub Copilot、高度なリファクタリングツールなど、VS Codeの編集機能を最大限に活用できます。
* **ソース管理**: ブランチを切り替えて、独立して作業できます。
* **コラボレーション**: スクリプトやシェーダーをチームと共同で作業し、変更はPlayCanvasエディターに即座に反映されます。コンテキストメニューから`Pull Latest`コマンドを使用して、最新の変更をVS Code環境にプルできます。
* **ファイル内検索**: この拡張機能はプロジェクトファイル内の検索をサポートしています。プロジェクト内で検索するには`PlayCanvas: Search`コマンドを使用し、フォルダ内で検索するにはコンテキストメニューから`PlayCanvas:Find In Folder`を使用します。

## インストール

* **Visual Studio Codeのインストール**: [VS Codeをダウンロード](https://code.visualstudio.com/download)してインストールします。
* **PlayCanvas VS Code拡張機能のインストール**: VS Code Marketplaceで[PlayCanvas拡張機能](https://marketplace.visualstudio.com/items?itemName=playcanvas.playcanvas)を検索してインストールします。この拡張機能は、PlayCanvas [REST API](../../api/index.md)を使用してVS CodeをPlayCanvasプロジェクトに接続します。

### 設定

* 新しい[APIキーを生成](../../api/index.md#authorization)し、クリップボードにコピーします。
* コマンドパレット（`CTRL`+`Shift`+`P`）を開き、「PlayCanvas: Add Project」と入力して、VS Codeでプロジェクトを開きます。
* APIトークンを入力ボックスに貼り付けます。これは一度だけ行う必要があります。
* 「PlayCanvas: Use Playcanvas Types」を切り替えることで、IntelliSenseサポートを強化するためのPlayCanvas Engine API型を有効または無効にできます。これはソースファイルの先頭に型定義への仮想参照を自動的に追加します。スクリプトが更新されても、この参照はアップロードされません。

## 拡張機能の使用

* **プロジェクトの追加**: コマンドパレット（`CTRL`+`Shift`+`P`）を開き、「PlayCanvas: Add Project」と入力して、VS Codeでプロジェクトを開きます。
* **編集**: スクリプト、シェーダー、その他のテキストアセットを豊富な編集サポートで編集します。
* **同期**: VS Codeで変更を保存すると、PlayCanvas拡張機能がこれらの変更を自動的にクラウドに同期します。
* **プレビューとデバッグ**: 開発中に、[起動ページ](../../editor/interface/launch-page/index.md)を使用してアプリケーションをプレビューおよびデバッグします。

### デバッグ

PlayCanvas用のVS Code拡張機能は、ブラウザで実行されているスクリプトのデバッグを直接サポートしていません。しかし、[ブラウザ開発者ツール](../debugging/index.md)をVS Codeと組み合わせて使用​​することで、強力なデバッグ体験のためにPlayCanvasスクリプトをデバッグすることができます。

VS CodeをPlayCanvasと統合することで、高度な開発ワークフローに合わせた洗練された環境が提供され、開発者は複雑で高性能なウェブベースのアプリケーションを構築するために必要な柔軟性とツールを得られます。
