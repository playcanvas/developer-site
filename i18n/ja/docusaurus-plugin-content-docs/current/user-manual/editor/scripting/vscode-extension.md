---
title: VS Code拡張機能
description: PlayCanvas VS Code Extension をインストールし、同期モードの選択、プロジェクトファイルの管理、同期問題の解決を行います。
---

PlayCanvas VS Code Extension は、PlayCanvas プロジェクトのテキストベースアセットをローカルワークスペースにマッピングします。VS Code または Cursor でスクリプトやシェーダーを編集しながら、認証、ブランチ、型情報、Editor との同期を拡張機能で管理できます。

![VS Code Extension Demo](/img/user-manual/scripting/vscode-demo.webp)

この拡張機能は [GitHub でオープンソースとして公開](https://github.com/playcanvas/vscode-extension)され、MIT ライセンスで提供されています。外部のコーディングアシスタント向けワークフローについては、[VS Code Extension で AI を使用する](/user-manual/ai/vscode-extension/)を参照してください。

## インストールしてプロジェクトを開く

1. [Visual Studio Code](https://code.visualstudio.com/download) または [Cursor](https://cursor.com/downloads) をインストールします。
2. 使用するエディターのマーケットプレイスから PlayCanvas 拡張機能をインストールします。
    - VS Code: [Visual Studio Marketplace](https://marketplace.visualstudio.com/items?itemName=playcanvas.playcanvas)
    - Cursor: [Open VSX](https://open-vsx.org/extension/playcanvas/playcanvas)
3. サインイン通知を選択し、PlayCanvas アカウントで認証します。
4. `Ctrl`/`Cmd` + `Shift` + `P` でコマンドパレットを開きます。
5. **PlayCanvas: Open Project** を実行し、プロンプトに従ってプロジェクトとブランチを選択します。

Explorer にはプロジェクトのテキストアセットが表示されます。スクリプトを開くと、PlayCanvas 対応の型チェック、オートコンプリート、インライン API 情報を利用できます。**Collaborators** ビューには、同じプロジェクトで作業しているユーザーが表示されます。

## 同期モードを選択する

Settings で **PlayCanvas: Sync Mode**（`playcanvas.syncMode`）を設定し、変更後にウィンドウを再読み込みします。

| | Realtime | Pull/Push（Preview） |
| --- | --- | --- |
| 適した用途 | ライブ共同編集 | 外部ツールと確認後にまとめて反映する変更 |
| 同期 | 入力と同時 | 明示的な Pull と Push |
| コンフリクト | 自動的にマージ | 3-way merge で解決 |
| 利用環境 | デスクトップと Web | デスクトップのみ |

### Realtime モード

Realtime はデフォルトのモードです。

- 開いているファイルへの変更は入力と同時に同期されます。
- コラボレーターによる変更は、開いているファイルに自動的に反映されます。
- `Ctrl`/`Cmd` + `S` で PlayCanvas Editor のアセットを保存します。
- Explorer でファイルを作成、削除、名前変更、移動するとプロジェクトが更新されます。
- `Ctrl`/`Cmd` + `Z` と `Ctrl`/`Cmd` + `Shift` + `Z` では、自分の変更のみを元に戻す、またはやり直します。

ファイルを開くと、サーバー上の最新状態に更新されます。他のアプリケーションが閉じているファイルをディスク上で変更した場合、Realtime モードはローカル変更をディスクに残しますが、サーバーには送信しません。拡張機能には Pull/Push モードを案内する警告が表示されます。

### Pull/Push モード

Pull/Push では、同期を実行するまでファイルシステム上の変更がローカルに保持されます。閉じているファイルを編集する可能性があるフォーマッター、コンパイラー、スクリプト、AI コーディングアシスタントには、このモードを使用してください。

1. **PlayCanvas: Sync Mode** を **Pull/Push** に設定し、ウィンドウを再読み込みします。
2. Source Control を開き、**PlayCanvas** リポジトリを選択します。
3. **Pull** を選択して、サーバーの最新状態を取得します。
4. 通常どおりファイルを編集して保存します。ローカル変更は **Changes** に表示されます。
5. 差分を確認し、**Push** を選択します。

PlayCanvas のステータスバー項目には、受信、送信、コンフリクト中のファイル数が表示されます。コマンドパレットから **PlayCanvas: Pull** または **PlayCanvas: Push** を実行することもできます。

- Pull: `Ctrl`/`Cmd` + `Alt` + `Down`
- Push: `Ctrl`/`Cmd` + `Alt` + `Up`

Push は fast-forward のみに対応しています。最後の Pull 以降にサーバーが変更されている場合、上書きせずに Push が停止します。先に Pull してコンフリクトを解決し、再度 Push してください。

### Pull/Push のコンフリクトを解決する

コンフリクトしたファイルは **Merge Changes** に表示されます。

1. コンフリクトしたファイルを開きます。
2. マージエディターを使用するか、`<<<<<<<`、`=======`、`>>>>>>>` の各セクションを直接編集します。
3. 採用する内容を残し、すべてのコンフリクトマーカーを削除してファイルを保存します。
4. ファイルが **Changes** に戻ったことを確認し、Push します。

ローカル変更を破棄する場合は、Source Control で破棄アクションを選択します。破棄を実行すると、確認後に最後に同期したバージョンへ戻ります。

## ブランチを切り替える

ブランチを切り替える前に、現在の変更を同期または破棄します。コマンドパレットから **PlayCanvas: Switch Branch** を実行し、対象のブランチを選択します。ワークスペースには選択したプロジェクトブランチの内容が表示されます。

## ファイルを無視する

一致するパスをワークスペースから除外するには、プロジェクトルートに `.pcignore` を作成します。構文は `.gitignore` と同じで、`*.ts` や `generated/**` などの glob を使用できます。

`.pcignore` が変更されると、ルールは自動的に再読み込みされます。ルールの変更後、プロジェクトを再読み込みしてディスク上のファイルを更新します。

## トラブルシューティング

### 外部からの変更が同期されない

Pull/Push はデスクトップ拡張機能でのみ利用できます。`playcanvas.syncMode` が `pullpush` であることを確認し、ウィンドウを再読み込みして、外部ツールで編集する前に Pull してください。

### Push がブロックされる

リモートプロジェクトが変更されています。Pull を実行し、**Merge Changes** にあるファイルを解決してから、再度 Push してください。

### ファイルパスが競合している

**PlayCanvas: Show Path Collisions** を実行します。各アセットが一意のファイルシステムパスにマッピングされるように Editor で表示されたアセットの名前を変更し、プロジェクトを再読み込みします。

### ワークスペースの内容が古い

**PlayCanvas: Reload Project** を実行します。問題が続く場合は、**PlayCanvas: Report Issue** を実行し、問題が発生した手順を記載してください。
