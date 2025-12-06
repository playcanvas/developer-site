---
title: VS Code拡張機能
---

PlayCanvas VS Code Extension は、PlayCanvas Editor のテキストベースアセットを扱うための強力でリアルタイムな編集環境を提供します。IntelliSense、ソース管理、GitHub Copilot、AI を活用したワークフローといった最新ツールを好む開発者向けに設計されており、この拡張機能は VS Code と PlayCanvas プロジェクトを直接統合します。

![VS Code Extension Demo](/img/user-manual/scripting/vscode-demo.webp)

この拡張機能は、[GitHub 上で完全にオープンソース](https://github.com/playcanvas/vscode-extension)として公開されており、MIT ライセンスの下で提供されています。

## 特長

* **リアルタイムアセット同期**  
  VS Code で行った変更は、手動でのファイルアップロードやページ更新なしに、即座に PlayCanvas Editor に反映されます。

* **ライブファイルコラボレーション**  
  同じファイルを編集中の他のコラボレーターを確認でき、コンフリクトを回避しチームの共同作業を強化できます。

* **完全なスクリプト型チェック**  
  TypeScript による堅牢な型チェック、IntelliSense、PlayCanvas スクリプトタイプ向けのオートコンプリートを利用できます。

* **ディスクマップされたファイルシステム**  
  PlayCanvas プロジェクト構造がローカルにミラーリングされ、AI を活用した開発ワークフローなど外部ツールとの深い統合が可能になります。

* **開発者体験の向上**  
  VS Code の機能一式（リファクタリングツール、Git 連携、スニペット、拡張機能など）と緊密に統合されています。

## インストール

1. [Visual Studio Code](https://code.visualstudio.com/download) をインストールします。  
2. VS Code Marketplace から [PlayCanvas VS Code Extension](https://marketplace.visualstudio.com/items?itemName=playcanvas.playcanvas) をインストールします。  
3. プロンプトに従って PlayCanvas アカウントにサインインします。  
4. コマンドパレット（`Ctrl`/`Cmd` + `P`）を開き、**「PlayCanvas: Open Project」** を実行して PlayCanvas プロジェクトをリンクします。

### サポート対象エディター

| エディター | サポート |
| ---------- | -------- |
| VS Code    | ✅       |
| Cursor     | ✅       |

## 拡張機能の使用方法

* **Open Project**  
  コマンドパレットから **PlayCanvas: Open Project** を実行し、ローカルでのプロジェクト編集を開始します。

* **Edit**  
  スクリプト、シェーダー、その他のテキストアセットを VS Code の豊富な編集機能で編集できます。

* **Sync**  
  保存した変更はすべて、リアルタイムで PlayCanvas プロジェクトに自動同期されます。

* **Collaboration**  
  同じファイルを編集している他のユーザーを確認し、必要に応じて最新の変更を取得できます。

VS Code と PlayCanvas を統合することで、高度な開発ワークフローに合わせた洗練された環境が提供され、複雑で高性能な Web アプリケーションを構築するために必要な柔軟性とツールが開発者に与えられます。
