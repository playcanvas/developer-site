---
title: MCP Server
description: AI アシスタントを PlayCanvas Editor に接続し、MCP ツールを通じてプロジェクトを変更、検証します。
---

[PlayCanvas Editor MCP Server](https://github.com/playcanvas/editor-mcp-server) は、AI アシスタントを開いている PlayCanvas Editor セッションに接続します。プロジェクトデータを変更し、ビューポートまたは実行中のアプリケーションで結果を検証できます。

MCP クライアントがローカルサーバーを起動し、Editor がそのサーバーに接続します。ほとんどのツールは、接続中の Editor で現在開かれているプロジェクトを操作します。一部の[プロジェクトツール](#manage-projects)は、サインイン中のアカウントのプロジェクトを一覧表示、作成、更新、オープンすることもできるため、プロジェクトを開く前のプロジェクトダッシュボードからでもアシスタントが作業できます。

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

<img loading="lazy" src="/img/user-manual/editor/mcp.png" alt="Editor MCP Server の接続パネル" width="400" style={{ marginBottom: '1.5rem' }} />

接続中は MCP クライアントを起動したままにします。同時にサーバーへ接続できる Editor インスタンスは 1 つだけです。プロジェクトまたはブラウザータブを変更する前に、別の Editor を切断してください。

別のポートを使用するには、サーバー引数に `--port <number>` を追加し、Editor に同じポートを入力します。

### プロジェクトダッシュボードから接続する {#connect-from-the-project-dashboard}

[playcanvas.com/editor](https://playcanvas.com/editor) の[プロジェクトダッシュボード](/user-manual/editor/projects/dashboard/)には、サイドバー下部のアカウント行に **MCP server** ボタンがあります。選択すると **Status** と **Port** を表示する **MCP server** パネルが開くので、**Connect** を選択します。

![MCP Server](/img/user-manual/editor/projects/project-dashboard-mcp.png)

接続は記憶されます。タブがプロジェクトに移動すると、自分で開いた場合でもアシスタントが開いた場合でも、Editor は読み込み時に再度クリックすることなく再接続します。

## プロジェクトを管理する {#manage-projects}

プロジェクトダッシュボードまたはプロジェクトが接続されていれば、アシスタントはサインイン中のアカウントのプロジェクトを管理できます。

| ツール | 機能 |
| --- | --- |
| `list_projects` | 自分または組織のプロジェクトを ID 付きで一覧表示します。 |
| `get_project` | プロジェクトの概要を読み取ります。ID を省略すると、Editor で開いているプロジェクトを読み取ります。 |
| `create_project` | プロジェクトを作成します。`open` を指定すると、準備ができた時点で開きます。 |
| `update_project` | プロジェクトの名前、説明、公開設定を変更します。 |
| `open_project` | 接続中のタブでプロジェクトを開きます。タブがそのプロジェクトに再読み込みされ、Editor が再接続します。 |

設定できるのは `name`、`description`、`private`、`owner`（ユーザー名）だけです。それ以外のフィールドは、名前を示して拒否されます。プランの制限が適用されるため、プライベートプロジェクトには有料プランが必要です。プロジェクトダッシュボードではプロジェクトが開かれていないため、アシスタントがプロジェクトを開くまで、シーンとアセットのツールはその旨を報告します。

<video autoPlay muted loop controls src='/video/editor-mcp-projects.mp4' style={{width: '100%', height: 'auto'}} />

```text
PlayCanvas のプロジェクトを一覧表示してください。"Cube Garden" というプロジェクトを作成して開き、
そのシーンのボックスの周りに 10 個のカラフルなキューブを輪になるように配置してください。
```

:::note

プロジェクトツールには、0.7.1 より新しいバージョンの [Editor MCP Server](https://github.com/playcanvas/editor-mcp-server) と、Editor 2.35 以降が必要です。

:::

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

このデモでは、アシスタントがレガシーの Engine V1 プロジェクトを監査し、PlayCanvas ドキュメントを参照して、チェックポイントを作成しながら Engine V2 と ESM Scripts に移行し、実行結果を検証する流れを示します。

<video autoPlay muted loop controls playsInline src="/video/editor-mcp-legacy-migration.mp4" style={{ width: '100%', height: 'auto' }} />

## 確認または復旧する

アシスタントに変更内容と確認した証拠をまとめさせます。結果を受け入れる前に、自分でもシーンを確認してください。

- 直前の個別編集には Editor の undo/redo を使用する
- タスク全体を破棄する場合はチェックポイントを復元する
- 大きな結果を受け入れた後に新しいチェックポイントを作成する

意図した破壊的操作でない限り、hard reset、ブランチの削除、チェックポイントの復元、プロジェクトデータの削除をアシスタントに依頼しないでください。

## VS Code Extension を使用する場合

アシスタントがテキストベースアセットのみを編集し、PlayCanvas へ反映する前にファイルシステムの差分を確認したい場合は、[VS Code Extension のワークフロー](/user-manual/editor/scripting/vscode-extension/)を使用します。Editor、シーン、アセット、ビューポート、ランタイムへ直接アクセスするタスクには MCP を使用します。

## トラブルシューティング

### Editor が接続されない

MCP クライアントでサーバーが実行中であること、クライアントと Editor が同じポートを使用していること、他の Editor が接続されていないことを確認します。設定変更後は MCP クライアントを再起動してください。

### 最初の接続がタイムアウトする

最初の `npx` 実行では、パッケージのダウンロードに時間がかかることがあります。ダウンロード完了後にクライアントを再起動します。Codex では、`~/.codex/config.toml` の `[mcp_servers.playcanvas]` にある `startup_timeout_sec` を増やすこともできます。

### Launch が開かない

Editor の origin に対してポップアップを許可し、既存の Launch ウィンドウを閉じてから、Launch インスタンスの起動を再度依頼します。

### アシスタントが別のプロジェクトを操作している

MCP ツールは、接続中の Editor で開いているプロジェクトを常に対象とします。`open_project` で対象のプロジェクトを開くようアシスタントに依頼するか、切断して自分で開き、再接続してから変更を続けます。

:::caution

サーバーは現在の Editor セッションを通じて操作し、エンティティ、アセット、ビルド、ブランチの削除やプロジェクト状態のリセットなど、破壊的な操作も実行できます。許可する前にこれらの操作を確認し、大きな変更の前にはチェックポイントを作成してください。

:::
