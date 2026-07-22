---
title: VS Code Extension
description: VS Code Extension の Pull/Push モードを通じて、PlayCanvas プロジェクトファイルを AI コーディングアシスタントで編集します。
---

PlayCanvas VS Code Extension は、プロジェクトのテキストアセットをローカルファイルとして公開します。これにより、VS Code、Cursor、またはターミナルで実行する AI コーディングアシスタントがファイルを確認、編集できます。

<div
  role="img"
  aria-label="VS Code Extension のスクリーンショット用プレースホルダー"
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
  VS Code Extension のスクリーンショット
</div>

このガイドでは Pull/Push モードを使用します。アシスタントがマッピングされたテキストアセットを編集し、PlayCanvas プロジェクトへ反映するタイミングをユーザーが管理できます。続行する前に、[VS Code Extension のセットアップ](/user-manual/editor/scripting/vscode-extension/)を完了してください。

## ワークスペースを準備する

Pull/Push は、VS Code と Cursor のデスクトップ拡張機能で利用できます。

1. **PlayCanvas: Open Project** で PlayCanvas プロジェクトを開きます。
2. Settings で **PlayCanvas: Sync Mode** を **Pull/Push** に設定します。
3. ウィンドウを再読み込みします。
4. Source Control を開き、**PlayCanvas** リポジトリを選択して **Pull** を実行します。
5. 開始前に **Incoming Changes**、**Changes**、**Merge Changes** が空であることを確認します。

:::caution

外部のアシスタントには Realtime モードを使用しないでください。Realtime モードでは、古いファイルによって共同作業中の内容が上書きされないように、他のアプリケーションによる閉じたファイルへの変更が無視されます。

:::

## アシスタントに範囲を限定したタスクを依頼する

マッピングされたプロジェクトディレクトリでアシスタントを起動します。PlayCanvas のテキストアセットは通常のファイルとして表示されるため、アシスタントは参照の検索、複数スクリプトの編集、ローカルチェックの実行を行えます。

対象となるファイルまたは動作、期待する結果、検証方法を指定します。次に例を示します。

```text
プレイヤー移動スクリプトを確認し、キーボード移動をフレームレートに依存しない実装に変更してください。
現在の操作方法と公開されている Script Attribute は変更しないでください。
編集後、Problems パネルまたは利用可能な型チェックを確認し、変更したファイルをまとめてください。
無関係なアセットは変更しないでください。
```

アシスタントによる編集はローカルに保持されます。Push するまで PlayCanvas プロジェクトには反映されません。

## 結果を確認する

1. Source Control を開き、**Changes** にある各ファイルを選択して差分を確認します。
2. Problems パネルで新しい TypeScript または JavaScript の診断がないか確認します。
3. ワークスペースで利用可能なプロジェクト固有のチェックを実行します。
4. アシスタントが依頼したファイルと動作のみを変更したことを確認します。

ファイルを最後に同期したバージョンへ戻すには、そのファイルの破棄アクションを使用します。破棄の前に確認が表示されます。

## PlayCanvas と同期する

1. アシスタントの作業中にコラボレーターが行った変更を取り込むため、再度 **Pull** を実行します。
2. **Merge Changes** にファイルが表示された場合は、マージエディターで解決して保存し、差分を再確認します。
3. **Push** を実行します。
4. PlayCanvas Editor でプロジェクトを開いて Launch し、実際のシーンで動作を確認します。

Push は fast-forward のみに対応しています。最後の Pull 後にサーバーが変更された場合、上書きせずに Push が停止します。再度 Pull して解決してください。

## MCP Server を使用する場合

VS Code Extension が公開するのはテキストベースアセットです。アシスタントでエンティティの作成、コンポーネントの設定、テキスト以外のアセットの管理、ビューポートの操作、実行中のシーンの直接テストを行う場合は、[Editor MCP Server](./editor-mcp-server.md)を使用します。

## トラブルシューティング

### アシスタントのファイルが Changes に表示されない

アシスタントがマッピングされた PlayCanvas プロジェクトディレクトリを編集し、ファイルを保存していることを確認します。別の clone や生成物用ディレクトリに書き込んでいないことも確認してください。

### 外部編集に対する警告が表示される

ワークスペースが Realtime モードのままです。`playcanvas.syncMode` を `pullpush` に設定し、ウィンドウを再読み込みして、再試行する前に Pull します。

### Push がブロックされる

サーバーの最新状態を Pull し、**Merge Changes** にあるすべてのファイルを解決してから、再度 Push します。手順については、[Pull/Push のコンフリクトを解決する](/user-manual/editor/scripting/vscode-extension/#pullpush-のコンフリクトを解決する)を参照してください。

利用可能な PlayCanvas の AI 連携を比較するには、[AI 開発の概要](./index.md)に戻ってください。
