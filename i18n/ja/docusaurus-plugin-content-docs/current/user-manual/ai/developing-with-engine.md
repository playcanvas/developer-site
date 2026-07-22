---
title: Engine 開発
id: engine-development
slug: developing-with-engine
description: AI コーディングアシスタント、ドキュメント、ブラウザーツールを使用して、スタンドアロンの PlayCanvas Engine アプリケーションを構築、検証します。
---

PlayCanvas Engine アプリケーションは通常の JavaScript または TypeScript プロジェクトであるため、ファイルの読み取り、コードの編集、コマンドの実行が可能なコーディングアシスタントを使用できます。人間の開発者と同じ Engine の参考資料と検証手順をアシスタントに提供してください。

<div
  role="img"
  aria-label="AI クライアントで PlayCanvas Engine プロジェクトを編集する画面のスクリーンショット用プレースホルダー"
  style={{
    alignItems: 'center',
    aspectRatio: '16 / 9',
    background: 'var(--ifm-color-emphasis-100)',
    border: '2px dashed var(--ifm-color-emphasis-300)',
    borderRadius: 'var(--ifm-global-radius)',
    color: 'var(--ifm-color-emphasis-600)',
    display: 'flex',
    justifyContent: 'center',
    marginBottom: '1.5rem'
  }}
>
  AI クライアントで Engine プロジェクトを編集する画面のスクリーンショット
</div>

コードが PlayCanvas Editor プロジェクトに保存されている場合は、代わりに [VS Code Extension](./vscode-extension.md) を使用してください。アシスタントがシーン、エンティティ、アセット、プロジェクト設定も変更する必要がある場合は、[Editor MCP Server](./editor-mcp-server.md) を使用します。

## AI クライアントを選択する

| クライアント | インターフェース | 推奨される用途 |
| --- | --- | --- |
| [Cursor](https://cursor.com/docs) | コードエディター | インライン変更、視覚的な差分レビュー、エディター中心のエージェントワークフロー |
| [Claude Code](https://code.claude.com/docs/en/overview) | ターミナルと IDE 連携 | コマンドラインから行うリポジトリ全体の変更 |
| [OpenAI Codex](https://learn.chatgpt.com/docs/codex/cli) | CLI、IDE 拡張機能、デスクトップアプリ | 好みのインターフェースから行うローカル実装、レビュー、コマンド実行 |

クライアントごとにプランと対応プラットフォームが異なります。最新のインストール方法と利用条件については、各クライアントの公式ドキュメントを参照してください。

## プロジェクトのコンテキストを提供する

アシスタントをリポジトリのルートで起動し、最初にプロジェクトの依存関係をインストールします。これにより、PlayCanvas パッケージ、TypeScript 宣言、スクリプト、既存のコードパターンを利用できます。

プロジェクトで実際に使用する開発コマンドと規約を、[`AGENTS.md`](https://learn.chatgpt.com/docs/agent-configuration/agents-md)、[`CLAUDE.md`](https://code.claude.com/docs/en/memory)、[Cursor Rules](https://cursor.com/docs/rules) などのクライアント用リポジトリ指示に追加します。指示は短く保ち、次の内容を含めてください。

- 開発、lint、テスト、ビルドのコマンド
- ソースディレクトリと生成ディレクトリ
- ブラウザー対応とパフォーマンス上の制約
- タスクの完了に必要な観察可能な結果

可能な限り、共有する指示を `AGENTS.md` にまとめます。Claude Code から再利用するには、`CLAUDE.md` の内容を次の 1 行だけにできます。

```md
@AGENTS.md
```

クライアントごとに別のファイルを作成するのは、そのクライアントだけに必要な指示がある場合に限ります。

アシスタントに記憶だけで API を推測させず、次の PlayCanvas リソースを参照させてください。

- [Engine ユーザーマニュアル](/user-manual/engine/)
- [Engine API リファレンス](https://api.playcanvas.com/engine/)
- [Engine サンプル](https://playcanvas.github.io/)
- [Engine ソースコード](https://github.com/playcanvas/engine)
- [AI 向けドキュメントの索引](https://developer.playcanvas.com/llms.txt)
- [AI 向けドキュメントの全文](https://developer.playcanvas.com/llms-full.txt)

## コードを書く前に Engine の機能を再利用する

カメラ制御、キャラクターコントローラー、トゥイーン、水面、空、ポストエフェクト、XR のコードを書く前に、`playcanvas/scripts/*` から利用できるプロダクション品質の [Engine スクリプト](https://github.com/playcanvas/engine/tree/main/scripts/esm)を確認してください。

慣れていない Engine 機能を実装する場合は、対応する [Engine サンプル](https://playcanvas.github.io/)を探し、Engine の設定や更新ロジックを取り入れます。サンプルはインポートするモジュールではなく、読んで移植するレシピとして扱ってください。

## 結果と検証方法を説明する

観察可能な結果を 1 つ指定し、維持する制約と結果を証明するチェックを伝えます。次に例を示します。

```text
編集する前に、この PlayCanvas Engine プロジェクトを確認してください。既存のパターンを再利用し、
API を推測せずに、インストール済みの PlayCanvas 型定義または公式 API リファレンスを確認してください。

[制約] を変更せずに [結果] を実装してください。[テストまたはビルドコマンド] を実行し、
アプリを起動して [操作] を行い、ブラウザーコンソールを確認してください。最後に差分と、
結果が動作することを示す証拠をまとめてください。
```

## 推奨プラグインと MCP サーバー

タスクに必要な連携機能だけを使用してください。特に、最初はブラウザーツールを 1 つ選択し、不足する機能がある場合にだけ別のツールを追加します。

- **[Context7 MCP](https://github.com/upstash/context7):** クライアントで MCP による検索が役立つ場合に、インデックス化された [PlayCanvas Engine ドキュメント](https://context7.com/playcanvas/engine)を取得します。信頼できる情報源としては、上記の公式 AI 向けドキュメントを優先してください。
- **[Playwright MCP](https://github.com/microsoft/playwright-mcp):** ブラウザーでアプリケーションを起動、操作し、ユーザーフローを実行してスクリーンショットを取得します。
- **[Chrome DevTools MCP](https://github.com/ChromeDevTools/chrome-devtools-mcp):** コンソール、ネットワーク、パフォーマンスの診断が主な目的の場合に Playwright の代わりに使用します。
- **[PlayCanvas Editor MCP Server](./editor-mcp-server.md):** アプリケーションで Editor プロジェクトも使用する場合に、Editor、シーン、アセット、ランタイムへの直接アクセスを追加します。
- **[PlayCanvas VS Code Extension](./vscode-extension.md):** Editor で管理されているテキストアセットを、Cursor などのコーディングアシスタントが操作できるローカルファイルとして公開します。

## すべての変更を検証する

ソースコードの確認だけでは、インタラクティブな動作を証明できません。結果を受け入れる前に、次の手順を行います。

1. 完全な差分をレビューし、無関係な変更を除外します。
2. プロジェクトで利用できる関連テスト、lint、プロダクションビルドを実行します。
3. アプリケーションを起動し、ブラウザーコンソールに新しいエラーや警告がないことを確認します。
4. 実際のブラウザー入力で変更した操作を実行します。外観にはスクリーンショットを使用し、状態、数、位置、その他の動作にはランタイムクエリを使用してください。証拠を作るために状態を変更してはいけません。
5. 複雑な状態には、変更用メソッドを公開せず、JSON に変換できるデータを返す開発時専用の `window.snapshot()` を検討します。
6. 失敗したチェックを修正して再検証し、影響を受けるブラウザーまたはデバイスでテストして、検証できなかった項目を報告します。

<div
  role="img"
  aria-label="ブラウザーでのランタイム検証画面のスクリーンショット用プレースホルダー"
  style={{
    alignItems: 'center',
    aspectRatio: '16 / 9',
    background: 'var(--ifm-color-emphasis-100)',
    border: '2px dashed var(--ifm-color-emphasis-300)',
    borderRadius: 'var(--ifm-global-radius)',
    color: 'var(--ifm-color-emphasis-600)',
    display: 'flex',
    justifyContent: 'center',
    marginBottom: '1.5rem'
  }}
>
  ブラウザーでのランタイム検証画面のスクリーンショット
</div>

## AI ツールの公式ドキュメント

### OpenAI

- [Codex CLI](https://learn.chatgpt.com/docs/codex/cli)
- [Codex IDE 拡張機能](https://learn.chatgpt.com/docs/codex/ide)
- [ChatGPT デスクトップアプリ](https://learn.chatgpt.com/docs/app)
- [`AGENTS.md` によるカスタム指示](https://learn.chatgpt.com/docs/agent-configuration/agents-md)
- [プラグイン](https://learn.chatgpt.com/docs/plugins)

### Anthropic

- [Claude Code の概要](https://code.claude.com/docs/en/overview)
- [Claude Code の IDE 連携](https://code.claude.com/docs/en/ide-integrations)
- [デスクトップ版 Claude Code](https://code.claude.com/docs/en/desktop)
- [Claude Code MCP](https://code.claude.com/docs/en/mcp)
- [Claude Code プラグイン](https://code.claude.com/docs/en/plugins)
- [Claude Code のメモリと `CLAUDE.md`](https://code.claude.com/docs/en/memory)

### Cursor

- [Cursor ドキュメント](https://cursor.com/docs)
- [Cursor Rules](https://cursor.com/docs/rules)
