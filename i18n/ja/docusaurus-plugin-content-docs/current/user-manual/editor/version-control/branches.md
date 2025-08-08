---
title: ブランチ
---

ブランチは独立した開発ラインです。作成されたすべてのチェックポイントはブランチに所属し、ブランチ内の一連のチェックポイントはアプリケーションの開発または特定の機能の開発を追跡することができます。PlayCanvasのプロジェクトには、常に最低1つのブランチ、つまりメインブランチが存在し、しばしば複数のブランチが存在します。エディタのバージョンコントロールパネルを使用して、一つのブランチからの変更を任意の他のブランチにマージすることができます。

## メインブランチ {#main-branch}

すべてのプロジェクトには、「main」という名前のブランチがあり、これは常に存在し、削除することはできません。ほとんどの点で、このブランチは他のブランチと何ら変わりありません。ただし、場合によっては（例えば、REST APIの場合）、他のブランチが指定されていない場合には「main」ブランチがデフォルトとして使用されます。一般的なシナリオとしては、mainブランチをアプリケーションの現在の開発状態として扱い、別のブランチを安定したリリース用に、さらに他のブランチを機能開発用に使用するというものです。しかし、mainブランチの使用または不使用は、あなたのニーズに最適に合わせて自由に決めるべきです。

## 現在のブランチ {#current-branch}

作業する各プロジェクトには、常に一つのブランチが **current branch** として設定されます。これはあなたが積極的に作業しているブランチで、エディタを開いたりコードファイルを編集したりすると、あなたの変更は現在のブランチに適用されます。

## 新しいブランチの作成 {#creating-a-new-branch}

![Create branch](/img/user-manual/version-control/branches/new-branch.png)

ブランチを作成するには、バージョンコントロールパネルを開き、ブランチの起点となるチェックポイントを選択し、チェックポイントのドロップダウンメニューから "New Branch" オプションを選択します。

![New branch dialog](/img/user-manual/version-control/branches/new-branch-dialog.png)

ブランチの名前をつけるように求められます。`fix-player-bug`や`refactor-sound-effects`のように、ブランチの内容を表す名前をつけてみてください。ブランチを作成した後、自動的に新しく作成したブランチに切り替えられます。

自分で作成したブランチは、お気に入りとして自動的に設定されるため、[ブランチリストのフィルタリング](#filtering-branch-list)で迅速に見つけることができます。

## ブランチリストのフィルタリング {#filtering-branch-list}

![Branch filter](/img/user-manual/version-control/branches/filter-branches.gif)

次の方法で分岐をフィルタリングできます。

- お気に入り - 自分でお気に入りにしたブランチ
- オープン - 開いているすべてのブランチ
- クローズ - 閉じているすべてのブランチ

ブランチに気に入ったものがあれば、以下のオプションでお気に入りにすることができます。

### ドロップダウンメニュー {#drop-down-menu}

![Favorite a branch via menu](/img/user-manual/version-control/branches/favorite-branch-via-dropdown.gif)

### 選択されたブランチボタン {#selected-branch-button}

![Favorite a branch via button](/img/user-manual/version-control/branches/favorite-branch-via-button.gif)

## ブランチの検索 {#searching-for-a-branch}

![Searching for a branch](/img/user-manual/version-control/branches/search-for-a-branch.gif)

現在のブランチリストで特定のブランチを探すためには、上部の検索バーを使用すると便利です。

## ブランチの切り替え (Switch) {#switching-to-a-branch}

![Switch branch](/img/user-manual/version-control/branches/switch-branch.png)

ブランチを切り替えるには、バージョン管理パネルを開き、切り替えたいブランチを選択し、ブランチのドロップダウンメニューから "Switch to this branch" オプションを選択します。

エディターは選択したブランチに現在のブランチを切り替えて再読み込みされます。

## ブランチのクローズ (Close) {#closing-a-branch}

![Close branch](/img/user-manual/version-control/branches/close-branch.png)

ブランチでの作業が完了した場合、リストから削除することができます。

ブランチをクローズするするには、バージョン管理パネルを開き、閉じたいブランチを選択し、ブランチのドロップダウンメニューから "Close this branch" オプションを選択します。現在のブランチやメインブランチは閉じることができないので注意してください。現在のブランチを閉じる場合は、まず別のブランチに切り替えてください。

![Close branch dialog](/img/user-manual/version-control/branches/close-branch-dialog.png)

ブランチのクローズを確認するよう求められ、クローズ前にチェックポイントを作成するオプションがあります。これはデフォルトで有効化されています。これらの変更を破棄したい場合は、ここでそのオプションのチェックを外すことができます。

:::warning

このチェックボックスを外すと、最後にチェックポイントを作成してから行ったブランチの変更がすべて失われます。

:::

閉じたブランチは後で再開することができます。

## ブランチの削除 (Delete) {#deleting-a-branch}

以下の条件が満たされている場合、ブランチを削除できます。

- そのブランチが別のブランチにマージされていない
- このブランチからブランチが作成されていない

ブランチを削除するには、バージョン管理パネルを開き、削除するブランチを選択し、ブランチのドロップダウンメニューで "Delete this branch" を選択します。

![Delete a branch](/img/user-manual/version-control/branches/delete-branch.png)

ダイアログボックスにブランチ名を入力して、ブランチの削除を確認する必要があります。

**注:削除したブランチは復元できません!不安な場合は、ブランチをクローズしてください。**

![Delete a branch warning](/img/user-manual/version-control/branches/delete-branch-dialog.png)
