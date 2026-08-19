---
title: PlayCanvas Skillsを使う
description: PlayCanvas固有のAIコーディングワークフローを使用して、Engine、React、Web Componentsアプリケーションを構築し検証します。
---

[PlayCanvas Skills](https://github.com/playcanvas/skills)は、AIコーディングエージェント向けのポータブルな指示、リファレンス、ユーティリティです。エージェントが実際のプロジェクトとインストール済みパッケージを確認し、対応するPlayCanvasオーサリング形式を使用して、実行中のアプリケーションで結果を検証できるようにします。

SkillsはPlayCanvas Engine、React、Web Componentsで構築されたコードベースのアプリケーションに対応しています。アプリケーション内では実行されず、ランタイム依存関係も追加しません。

## 新しいプロジェクトを始める

最も簡単な方法は[`create-playcanvas`](/user-manual/getting-started/start-with-create-playcanvas/)を使用することです。

```sh
npm create playcanvas@latest
```

生成されたすべてのプロジェクトには、Claude Code用の`.claude/skills/`と、Codex、Cursor、その他のAgent Skills対応クライアント用の`.agents/skills/`にSkillsが含まれます。プロジェクトの依存関係をインストールし、クライアントでプロジェクトルートを開いて、新しい会話を開始するとSkillsが検出されます。

## 既存のプロジェクトにSkillsを追加する

プロジェクトルートから[Agent Skills](https://skills.sh/)インストーラーを実行します。

```sh
npx skills add playcanvas/skills
```

検出されたすべてのクライアントにすべてのSkillをインストールするには`--all`を、ユーザーレベルでインストールするには`-g`を使用します。同じSkillsが重複して公開されないよう、クライアントごとに1つのインストール方法だけを使用してください。[PlayCanvas Skillsリポジトリ](https://github.com/playcanvas/skills#install)には、Claude Code、Codex、Cursor向けのネイティブプラグインのインストール方法も記載されています。

Skillsをインストールまたは更新した後は、クライアントがメタデータを再読み込みできるよう、新しいエージェント会話を開始してください。

## Skillsが対象とするワークフロー

このコレクションは、プロジェクトの要件とソースアセットから、検証済みのアプリケーションを構築するために必要な作業に沿って構成されています。

| ワークフロー | Skills |
| --- | --- |
| アプリケーションのセットアップと規約 | `build-app`、`apply-conventions` |
| 公式サンプルとEngine機能 | `find-examples`、`reuse-scripts` |
| モデルの検査とアニメーション | `inspect-glb`、`calibrate-model`、`configure-animation` |
| シーンとゲームプレイの構成 | `assemble-scene`、`manage-game-state` |
| ビジュアルとインターフェースの仕上げ | `light-scene`、`add-effects`、`build-hud` |

エージェントは現在のタスクに関連するSkillsのみを読み込みます。各Skillは、APIや実装を選択する前に、インストール済みパッケージの型宣言、Engineソース、スクリプト、公式サンプルのどれを確認するかを示します。

## 目的を伝える

求める結果と、その結果を受け入れるために必要な証拠を説明します。すべてのSkillを自分で指定する必要はありません。次に例を示します。

```text
これらのGLBを使用してDirect Engineの商品ビューアーを構築してください。各モデルを検査して調整し、
Engineに付属するカメラコントロールを再利用して、ブラウザーで接地とフレーミングを検証してください。
```

```text
このPlayCanvas Reactプロトタイプを、決定的なゲーム状態、状態駆動のHUD、プールされたエフェクト、
一貫したライティング、スクリーンショット検証を使用して仕上げてください。
```

エージェントは編集前にプロジェクトを確認し、使用中のEngine、React、Web Components形式を維持して、プロジェクトのチェックを実行し、ブラウザーでインタラクティブまたは視覚的な動作を検証します。

プロジェクトコンテキスト、プロンプト、ブラウザーツール、証拠に関する詳しいガイダンスは、[AIを活用した開発](/user-manual/engine/developing-with-ai/)を参照してください。

## 対象範囲

PlayCanvas Skillsは、コードベースのEngineアプリケーションワークフローを対象としています。PlayCanvas Editorプロジェクトの自動操作、アプリケーションの公開、PlayCanvasサービスの管理、プロジェクト固有のアートディレクションやゲームデザインの代替は行いません。AIを活用したEditorワークフローには、[Editor MCP Server](/user-manual/editor/mcp-server/)と[VS Code Extension](/user-manual/editor/scripting/vscode-extension/)を使用してください。

再現可能な問題の報告や改善の提案には、[Skillフィードバックフォーム](https://github.com/playcanvas/skills/issues/new?template=skill-feedback.yml)を使用してください。
