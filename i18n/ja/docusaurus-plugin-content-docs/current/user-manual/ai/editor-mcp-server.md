---
title: Editor MCP Server
description: AI アシスタントを PlayCanvas Editor に接続し、MCP ツールを通じてプロジェクトを変更、検証します。
---

[PlayCanvas Editor MCP Server](https://github.com/playcanvas/editor-mcp-server) は、AI アシスタントを開いている PlayCanvas Editor セッションに接続します。プロジェクトデータを変更し、ビューポートまたは実行中のアプリケーションで結果を検証できます。

<div
  role="img"
  aria-label="Editor MCP Server の接続画面のスクリーンショット用プレースホルダー"
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
  Editor MCP Server の接続画面のスクリーンショット
</div>

MCP クライアントがローカルサーバーを起動し、Editor がそのサーバーに接続します。すべてのツールは接続中の Editor で現在開かれているプロジェクトを操作します。サーバーから PlayCanvas プロジェクトの選択や管理は行いません。

## サーバーを一度インストールする

MCP クライアントを設定する前に、[Node.js 22.18 以降](https://nodejs.org/)をインストールします。次のコマンドは、公開されている [`@playcanvas/editor-mcp-server`](https://www.npmjs.com/package/@playcanvas/editor-mcp-server) パッケージを `npx` で実行します。

### Claude Code

```bash
claude mcp add playcanvas -- npx -y @playcanvas/editor-mcp-server
```

### Codex

```bash
codex mcp add playcanvas -- npx -y @playcanvas/editor-mcp-server
```

Windows では、次のコマンドを実行します。

```bash
codex mcp add playcanvas -- cmd /c npx -y @playcanvas/editor-mcp-server
```

### Cursor と Claude Desktop

クライアントの MCP 設定に次のサーバーを追加します。

```json
{
  "mcpServers": {
    "playcanvas": {
      "command": "npx",
      "args": ["-y", "@playcanvas/editor-mcp-server"]
    }
  }
}
```

Cursor では **Settings > Cursor Settings > MCP** を開きます。Claude Desktop では **Settings > Developer > Edit Config** を開きます。設定変更後にクライアントを再起動してください。

:::note Windows

Windows の JSON ベースのクライアントでは、`"command": "cmd"` を使用し、`args` 配列の先頭に `"/c"` を追加します。

:::

## プロジェクトを接続する

1. PlayCanvas Editor でプロジェクトを開きます。
2. Editor ツールバーの下部にある **MCP** ボタンを選択します。
3. ポートが `52000` であることを確認し、**Connect** を選択します。

接続中は MCP クライアントを起動したままにします。同時にサーバーへ接続できる Editor インスタンスは 1 つだけです。プロジェクトまたはブラウザータブを変更する前に、別の Editor を切断してください。

別のポートを使用するには、サーバー引数に `--port <number>` を追加し、Editor に同じポートを入力します。

## 編集せずに接続を確認する

最初に読み取り専用の依頼を行います。これにより、アシスタントが対象の Editor を認識していることを確認し、変更前に必要なコンテキストを取得できます。

```text
PlayCanvas MCP で現在接続されているプロジェクトを確認してください。
読み込まれているシーン、現在の選択、バージョン管理の状態を報告してください。
変更は行わないでください。
```

アシスタントが別のシーンまたはプロジェクトを報告した場合は、続行する前に正しい Editor タブを接続します。

## 復旧ポイントを作成する

MCP 操作は Editor プロジェクトを直接変更するため、ローカルの Push 手順はありません。大きなタスクを開始する前にチェックポイントを作成します。

```text
現在のバージョン管理の状態を確認してください。変更を開始できる状態であれば、
「ライティング更新前」という名前のチェックポイントを作成してください。
まだブランチの切り替え、状態のリセット、シーンの変更は行わないでください。
```

他のコラボレーターに未保存の作業がある場合や、プロジェクトが想定した状態でない場合は、アシスタントに続行を依頼する前に解決してください。

## 変更内容と検証方法を説明する

ツール呼び出しの一覧ではなく、観察可能な結果を 1 つ指定します。対象のシーンまたはアセット、維持する必要がある制約、完了を証明する方法を含めます。

```text
読み込まれているシーンで、車両とカメラを移動せずに車両展示周辺のライティングを改善してください。
可能な限り既存のライトを再利用してください。完了後、Editor ビューポートをキャプチャし、
シーンを Launch して実行中の画面をキャプチャし、コンソールエラーを報告してください。
```

アシスタントは、エンティティ、コンポーネント、スクリプト、アセット、シーン、プロジェクト設定、テンプレート、アニメーションデータ、ビルド、バージョン管理の状態を確認、編集できます。要求した結果に必要なツールはアシスタントに選択させます。

## 実行結果を検証する

シーンや動作の変更では、ソースの確認だけでは不十分です。アシスタントに次の操作を依頼します。

1. Editor ビューポートをキャプチャし、構図と選択中のオブジェクトを確認する
2. Launch インスタンスを起動する
3. 実行中のアプリケーションをキャプチャする
4. ランタイムログを読み取り、関連するエンティティの状態を確認する
5. 操作がタスクに含まれる場合は、キーボード、マウス、タッチ入力を送信する
6. 検証の完了後に Launch インスタンスを停止する

サーバーが Launch ウィンドウを開けるように、PlayCanvas Editor の origin に対してポップアップを許可してください。既存の PlayCanvas ログインセッションが使用されます。

<div
  role="img"
  aria-label="Editor ビューポートと Launch アプリケーションの検証画面のスクリーンショット用プレースホルダー"
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
  ビューポートと Launch の検証画面のスクリーンショット
</div>

## 確認または復旧する

アシスタントに変更内容と確認した証拠をまとめさせます。結果を受け入れる前に、自分でもシーンを確認してください。

- 直前の個別編集には Editor の undo/redo を使用する
- タスク全体を破棄する場合はチェックポイントを復元する
- 大きな結果を受け入れた後に新しいチェックポイントを作成する

意図した破壊的操作でない限り、hard reset、ブランチの削除、チェックポイントの復元、プロジェクトデータの削除をアシスタントに依頼しないでください。

## VS Code Extension を使用する場合

アシスタントがテキストベースアセットのみを編集し、PlayCanvas へ反映する前にファイルシステムの差分を確認したい場合は、[VS Code Extension のワークフロー](./vscode-extension.md)を使用します。Editor、シーン、アセット、ビューポート、ランタイムへ直接アクセスするタスクには MCP を使用します。

## トラブルシューティング

### Editor が接続されない

MCP クライアントでサーバーが実行中であること、クライアントと Editor が同じポートを使用していること、他の Editor が接続されていないことを確認します。設定変更後は MCP クライアントを再起動してください。

### 最初の接続がタイムアウトする

最初の `npx` 実行では、パッケージのダウンロードに時間がかかることがあります。ダウンロード完了後にクライアントを再起動します。Codex では、`~/.codex/config.toml` の `[mcp_servers.playcanvas]` にある `startup_timeout_sec` を増やすこともできます。

### Launch が開かない

Editor の origin に対してポップアップを許可し、既存の Launch ウィンドウを閉じてから、Launch インスタンスの起動を再度依頼します。

### アシスタントが別のプロジェクトを操作している

MCP ツールは、接続中の Editor で開いているプロジェクトを常に対象とします。切断して対象のプロジェクトを開き、再接続してから変更を続けます。

:::caution

サーバーは現在の Editor セッションを通じて操作し、エンティティ、アセット、ビルド、ブランチの削除やプロジェクト状態のリセットなど、破壊的な操作も実行できます。許可する前にこれらの操作を確認し、大きな変更の前にはチェックポイントを作成してください。

:::

利用可能な PlayCanvas の AI 連携を比較するには [AI 開発の概要](./index.md)に戻るか、Editor 全体のワークフローについて [PlayCanvas Editor ガイド](/user-manual/editor/)を参照してください。
