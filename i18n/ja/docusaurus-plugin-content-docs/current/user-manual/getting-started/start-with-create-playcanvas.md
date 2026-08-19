---
title: create-playcanvasで始める
description: create-playcanvasを使用して、実行可能なEngine、React、Web ComponentsスターターからViteとTypeScriptプロジェクトを始めます。
---

[`create-playcanvas`](https://github.com/playcanvas/create-playcanvas)は、コードベースのPlayCanvasプロジェクト向け公式スキャフォールディングツールです。PlayCanvas Engine、React、またはWeb Components用のViteとTypeScriptプロジェクトを、実行可能なスターターシーンとともに作成します。

## プロジェクトを作成する

使用するパッケージマネージャーでcreatorを実行します。

```sh
# npm
npm create playcanvas@latest

# pnpm
pnpm create playcanvas@latest

# Yarn
yarn create playcanvas

# Bun
bun x create-playcanvas@latest
```

プロンプトに従ってプロジェクト名、オーサリング形式、スターターを選択します。npm、pnpm、Yarnを使用する場合、creatorにはNode.js 22.23.2以降が必要です。

ファイルが作成されたら、依存関係をインストールしてVite開発サーバーを起動します。

```sh
cd my-playcanvas-project
npm install
npm run dev
```

## 形式を選択する

すべての形式でTypeScriptを使用し、Vite、ESLint、Prettier、プロダクションビルドが含まれます。

| 形式 | 適している用途 |
| --- | --- |
| Engine | `playcanvas` APIを直接使用する場合。 |
| React | `@playcanvas/react`を使用してReactアプリケーションを構築する場合。 |
| Web Components | `@playcanvas/web-components`の宣言的なカスタム要素を使用する場合。 |

## スターターを選択する

creatorでは、すべての形式で同じ12個の実行可能なスターターを利用できます。

![create-playcanvasの12個のスターターシーン](/img/user-manual/getting-started/create-playcanvas-starters.webp)

| カテゴリ | スターター |
| --- | --- |
| 基本 | Spinning Cube、Interactive Sphere |
| ビューアー | Model Viewer、Splat Viewer、Product Configurator |
| ゲーム | Physics Playground、First-Person Controller、Third-Person Controller、Sprite Game |
| ツール | Scene Editor |
| XR | VR Starter、AR Placement |

構築するアプリケーションに最も近いスターターを選び、まず変更せずに実行してから、アセットと動作を段階的に置き換えます。

## プロンプトを省略する

プロジェクト名、形式、スターターを指定すると、対話なしでプロジェクトを作成できます。

```sh
npm create playcanvas@latest my-viewer -- -f react -s model-viewer
```

| オプション | 短縮形 | 用途 |
| --- | --- | --- |
| `--format <name>` | `-f` | `engine`、`react`、`web-components`から選択します。 |
| `--starter <name>` | `-s` | 上記のスターターから選択します。 |
| `--yes` | `-y` | デフォルトのEngineとSpinning Cubeを使用します。 |
| `--no-skills` | | デフォルトで含まれるPlayCanvas Skillsを除外します。 |
| `--overwrite` | | 空でないターゲットディレクトリのファイルを置き換えます。 |
| `--help` | `-h` | 現在のコマンドオプションを表示します。 |

:::warning

`--overwrite`はターゲットディレクトリ内の既存ファイルを削除します。内容を置き換える意図がない限り、新しいディレクトリを使用してください。

:::

## 含まれるPlayCanvas Skills

新しいプロジェクトには、`.claude/skills/`と`.agents/skills/`に[PlayCanvas Skills](/user-manual/getting-started/use-playcanvas-skills/)が含まれます。対応するAIコーディングエージェントは、アプリケーションのセットアップ、アセット、シーン、アニメーション、ライティング、エフェクト、インターフェース、ゲーム状態に関するPlayCanvas固有のワークフローを利用できます。

プロジェクトでAIコーディングエージェントを使用しない場合、または別の方法でSkillsを管理する場合にのみ、`--no-skills`を指定してください。

## 次のステップ

- Engine APIを直接使用する場合は、[Engineをスタンドアロンで使用する](/user-manual/engine/standalone/)に進みます。
- Reactの場合は、[シーンの構築](/user-manual/react/building-a-scene/)に進みます。
- Web Componentsの場合は、[シーンの構築](/user-manual/web-components/building-a-scene/)に進みます。
