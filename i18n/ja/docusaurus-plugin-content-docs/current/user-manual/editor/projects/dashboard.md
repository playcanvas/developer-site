---
title: プロジェクトダッシュボード
description: playcanvas.com/editor のプロジェクトダッシュボードから、プロジェクトと組織の検索、作成、フォーク、管理、プロジェクト設定、Dev Log、チームの管理を行います。
---

プロジェクトダッシュボードは、プロジェクトのコントロールセンターです。[playcanvas.com/editor](https://playcanvas.com/editor) で開きます。Editor 2.35 からダッシュボードは Editor の一部になり、playcanvas.com のダッシュボードページに代わるものになりました。

![Dashboard](/img/user-manual/editor/projects/project-dashboard.png)

ダッシュボードは専用のブラウザータブで動作し、Editor 本体を読み込まないため、すばやく開きます。ダッシュボードの中でプロジェクトを開くことはありません。**Open editor** はそのプロジェクト専用のタブに切り替え、まだ開いていない場合にのみ新しく開きます。Editor のロゴメニューの **All Projects**、<kbd>Ctrl</kbd>/<kbd>Cmd</kbd> + <kbd>O</kbd>、ビューポートの **Projects** パンくずリストはダッシュボードに戻り、Editor はシーンをそのまま保持します。

## ダッシュボードの概要 {#dashboard-overview}

プロジェクトダッシュボードでは、次のことができます。

- プロジェクトを検索、絞り込む
- プロジェクトを Editor で開く
- プロジェクトのプライマリアプリを実行する
- プロジェクトのスター、ウォッチ、フォーク、エクスポート、譲渡、削除
- プロジェクト設定を編集する
- Dev Log を投稿する
- チームメンバーを管理する
- 組織を作成、管理する
- MCP で AI アシスタントを接続する

## サイドバー {#sidebar}

左側のサイドバーは、端をドラッグしてサイズを変更できます。

![Sidebar](/img/user-manual/editor/projects/new-project-button.png)

### New Project {#new-project}

**New project** を選択すると、スターターキットからプロジェクトを作成します。[プロジェクトの作成](/user-manual/editor/projects/creating/#create-a-project-from-the-project-dashboard)を参照してください。

### Import Project {#import-project}

**Import project** を選択し、エクスポートしたプロジェクトの `.zip` ファイルを選ぶと、そこからプロジェクトを作成します。[バックアップとエクスポート](/user-manual/editor/projects/backup-and-export/)を参照してください。

### Recents {#recents}

**Recents** には、最近開いたプロジェクトが表示されます。

### Organizations {#organizations}

**Organizations** には、所属している組織が表示されます。選択するとその組織のプロジェクトが表示されます。

**Organizations** の横の **+** を選択して組織を作成します。**Name**、playcanvas.com 上の **URL**、**Billing email** を入力し、**Create organization** を選択します。新しい組織がサイドバーに表示されます。

![New Organization](/img/user-manual/editor/projects/project-dashboard-new-organization.png)

組織の **⋮** メニューには、playcanvas.com のアカウントページを開く **Organization details** と、**Delete organization** があります。削除するには、確認のため組織名を入力する必要があります。組織にプロジェクトがある場合、それらはあなたのアカウントに移されます。

### Storage {#storage}

**Storage** には、プランのストレージ使用量が表示されます。選択するとプロジェクトごとの内訳が表示されます。

### MCP Server {#mcp-server}

アカウントの横にある **MCP server** ボタンで、プロジェクトダッシュボードを [Editor MCP Server](/user-manual/editor/mcp-server/) に接続できます。プロジェクトを開く前から、AI アシスタントがプロジェクトの一覧表示、作成、更新、オープンを行えます。[プロジェクトダッシュボードから接続する](/user-manual/editor/mcp-server/#connect-from-the-project-dashboard)を参照してください。

![MCP Server](/img/user-manual/editor/projects/project-dashboard-mcp.png)

## Continue Editing {#continue-editing}

メインパネルの先頭には **Continue editing** があり、最後に編集したプロジェクトが **Open editor** と **Play** ボタンとともに表示されます。その下にプロジェクトが並びます。

![Dashboard Header](/img/user-manual/editor/projects/dashboard-header.png)

## プロジェクトを探す {#finding-projects}

検索ボックスに入力すると、名前、所有者、説明でプロジェクトを検索できます。検索は入力ミスをある程度許容します。<kbd>/</kbd> を押すと検索ボックスに移動します（ダイアログやメニューが開いている場合を除く）。

![Search Filters](/img/user-manual/editor/projects/project-dashboard-search.png)

次のフィルターで検索を絞り込めます。

| フィルター | 表示されるもの |
| --- | --- |
| `name:` | 名前が一致するプロジェクト |
| `owner:` | そのユーザーまたは組織が所有するプロジェクト |
| `desc:` | 説明が一致するプロジェクト |
| `is:private` | プライベートプロジェクト |
| `is:public` | パブリックプロジェクト |
| `is:starred` | スターを付けたプロジェクト |
| `is:locked` | 所有者がストレージ上限を超えているためロックされたプロジェクト |

スペースを含む場合は、`name:"orbit arena"` のように引用符で囲みます。

### タブ {#tabs}

プロジェクトの上にあるタブで、さらに絞り込めます：**All**、**Mine**、**Shared with me**、**Private**、**Starred**。

### 並べ替え {#sort}

**Sort by** では、**Last edited**、**Created**、**Name**、**Most played**、**Size** の順に、**Descending** または **Ascending** で並べ替えます。

### カード表示とリスト表示 {#cards-and-list-view}

**Sort by** の横のボタンで **Cards** と **List** を切り替えます。カードには各プロジェクトのサムネイル、所有者とメンバー、最終編集からの経過時間とサイズが表示され、下部に閲覧数、プレイ数、スター数が表示されます。サムネイルがないプロジェクトにはプレースホルダーが表示されます。リスト表示では、プロジェクトごとに 1 行で **Forks**、**Views**、**Plays**、**Stars**、**Size**、**Edited** の列が表示されます。

![List View](/img/user-manual/editor/projects/project-dashboard-list-view.png)

プロジェクトには次のバッジが付くことがあります。

| バッジ | 意味 |
| --- | --- |
| **Private** | チームだけが閲覧できます |
| **Read only** | 共有されていますが、編集はできません |
| **Locked** | 所有者がストレージ上限を超えています |
| **No access** | 一覧には表示されますが、アクセス権がありません |
| **Disabled** | サポートによって無効化されています |

## プロジェクトメニュー {#project-menu}

カード、リストの行、または Continue editing パネルの **⋮** ボタンでプロジェクトメニューが開きます。権限のない項目は表示されません。

![Project Menu](/img/user-manual/editor/projects/fork-project-button.png)

### Open Editor {#open-editor}

**Open editor** を選択すると、プロジェクトが専用のタブで PlayCanvas Editor に開き、次のことができます。

- シーンとエンティティを作成、編集する
- アセットをインポート、管理する
- コンポーネントと設定を構成する
- アプリを公開する

### Play {#play}

**Play** を選択すると、プロジェクトのプライマリビルドが新しいタブで起動します。これにより、次のことができます。

- 最新の変更をテストする
- エンドユーザーが体験するようにプロジェクトを体験する
- プレイ可能なバージョンを他のユーザーと共有する

### Project Settings {#project-settings-item}

**Project settings** を選択すると、プロジェクトの設定が開きます。下の[プロジェクト設定](#project-settings)を参照してください。

### Copy Link {#copy-link}

**Copy link** を選択すると、プロジェクトへのリンクがクリップボードにコピーされます。

### Watch {#watch}

**Watch** を選択すると、[グローバルフィード](https://playcanvas.com/feed)で **Watching** フィルターが有効になっているときに、そのプロジェクトの Dev Log の更新が表示されます。ウォッチ中のプロジェクトでは **Stop watching** に変わります。

### Fork {#fork}

**Fork** を選択すると、このプロジェクトのコピーがアカウントに作成されます。フォークダイアログには、フォーク元のプロジェクトが名前と説明が入力済みの状態で表示され、所有者を選択できます。必要に応じて変更し、**Fork project** を選択します。

![Fork Project Dialog](/img/user-manual/editor/projects/project-dashboard-fork.png)

フォークの準備ができたら、**Open project** を選択して専用のタブで開くか、**Not now** を選択してダッシュボードに留まります。ダッシュボードにはフォークの新しいカードが表示されます。フォークでコピーされる内容と、フォークできない場合については[プロジェクトの作成](/user-manual/editor/projects/creating/#fork-an-existing-project)を参照してください。

### Export {#export}

**Export** を選択すると、プロジェクトをアーカイブとしてエクスポートします。[バックアップとエクスポート](/user-manual/editor/projects/backup-and-export/)を参照してください。

### Transfer Ownership {#transfer-ownership}

**Transfer ownership** を選択すると、プロジェクトを別のユーザーまたは組織に譲渡します。入力に合わせてユーザー名を検索し、新しい所有者に承認のリクエストを送ります。自分宛ての譲渡はカードに **Accept** と **Decline** が表示され、自分が送った譲渡には **Cancel transfer** が表示されます。[所有権と転送](/user-manual/editor/projects/ownership-transfers/)を参照してください。

### Delete Project {#delete-project}

**Delete project** を選択すると、プロジェクトを削除します。削除の前に確認が求められます。

### スター {#star}

カードまたは行のスターを選択するとプロジェクトにスターが付き、もう一度選択すると外れます。スターを付けると、以下の点で役立ちます。

- 開発者への感謝を示す
- プロジェクトの人気度指標に貢献する

スターを付けたプロジェクトは **Starred** タブと `is:starred` で一覧できます。

## プロジェクト設定 {#project-settings}

プロジェクトのカード、またはメニューの **Project settings** を選択すると設定が開きます。左側のパネルで **Project settings**、**Dev log**、**Team** を切り替え、その下に **Open editor**、**Play**、**Delete Project** があります。

![Project Settings](/img/user-manual/editor/projects/project-settings.png)

- **Project settings** には名前、説明、公開設定、フォークの場合は **Forked From** のリンク、過去 28 日間の **Activity** ストリップ、すでに使用している場合は **Private Source Assets** が表示されます。フッターには **Copy link**、**Fork Project**、**Export Project** があります。[プロジェクト設定](/user-manual/editor/projects/settings/)を参照してください。
- **Dev log** にはプロジェクトの投稿が一覧表示され、投稿の作成、編集、削除ができます。[Dev Logs](/user-manual/editor/projects/dev-logs/#write-a-post-from-the-project-dashboard) を参照してください。
- **Team** にはプロジェクトのメンバーとそのアクセス権が表示されます。[チーム管理](/user-manual/editor/projects/team-management/)を参照してください。

ロックされたプロジェクトには **Project settings** だけが表示されます。組織の管理者でありながらその組織のプロジェクトのメンバーではない場合、そのプロジェクトには **Team** だけが表示され、自分を管理者として割り当てられます。
