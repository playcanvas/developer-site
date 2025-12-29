---
title: Graph View
---

## 概要

バージョンコントロールグラフ (Version Control Graph) は、PlayCanvasプロジェクトのブランチの進捗状況やマージ履歴を追跡することが容易になります。

バージョンコントロールパネル ( Version Control Panel) では、選択したブランチの最新のチェックポイントのシンプルなリストが表示されますが、グラフビューでは、チェックポイント、ブランチ、およびマージを含む、全体のバージョンコントロールグラフのより大きな(拡張可能な)ビューが表示されます。

![](/img/user-manual/editor/version-control/graph-view/overview.png)

## グラフビューの起動

グラフビュー (Graph View) にアクセスするには、バージョンコントロールパネルのトップメニューにある「グラフ」ボタンをクリック(現在のエディターブランチの場合)するか、ブランチメニュードロップダウンの「バージョンコントロールグラフ」エントリをクリックします。

![](/img/user-manual/editor/version-control/graph-view/access-buttons.png)

## グラフノード

![](/img/user-manual/editor/version-control/graph-view/commit-node.png)

グラフノードには、次の情報が含まれます。

- 最大2行までのチェックポイントの(切り捨てられた)説明。
- 次の行には、チェックポイントGUIDの最初の4文字、日付、および作成者の名前が含まれます。
- 最後の行には、ブランチの名前が含まれます。

## グラフノードコンテキストメニュー

![](/img/user-manual/editor/version-control/graph-view/context-menu.png)

ノードをクリックすると、ノードとアクセス許可に応じて、以下のいずれかの選択肢に対応するコンテキストメニューが開きます。

- **変更の表示 (View Changes)** - このチェックポイントと直前のチェックポイントの間にDiff Viewを起動します。 ([詳細][view-changes])

- **比較選択 (Select for Compare)** - 比較するペアの最初のチェックポイントを選択します。

- **選択の比較 (Compare with Selected)** - 現在のノードと、 'Select for Compare'を通じてマークされたノードとの間にDiff Viewを起動します。

![](/img/user-manual/editor/version-control/graph-view/compare-checkpoints-example.gif)

- **新しいブランチ (New Branch)** - 選択したチェックポイントから新しいブランチを作成します。 ([詳細][new-branch])

- **データのコピー (Copy Data)** - 変更がなく、切り捨てられていないチェックポイントデータ(チェックポイントGUID、ブランチID、チェックポイントメッセージなど)をJSON形式でクリップボードにコピーします。

- **復元 (Restore)**(現在のエディタブランチの場合のみ)- ブランチの状態を選択したチェックポイントの状態に復元します。 ([詳細][restore-checkpoint])

- **ハードリセット (Hard Reset)**(現在のエディタブランチの場合のみ)- 選択したチェックポイントにハードリセットを実行します。 ([詳細][hard-reset])

## 拡張可能なノード

![](/img/user-manual/editor/version-control/graph-view/node-expand.png)

最初に、グラフビューは、各ブランチから最大20のチェックポイント、および合計60のチェックポイントを表示します。

ノードの右上隅にある三角形は、追加の入力または出力エッジ(ブランチやマージなど)を持っていることを意味し、 'ノードの展開'コンテキストメニューエントリを介して展開できます。

![](/img/user-manual/editor/version-control/graph-view/node-expand-example.gif)

## クローズされたブランチ

グラフには、常にマージ結果チェックポイントの両方の親を表示できるように、閉じたブランチのチェックポイントも含まれます。ブランチ名の後に[X]が付いています。

![](/img/user-manual/editor/version-control/graph-view/closed-branches.png)

## グラフノードレイアウトロジック

グラフのレイアウトのサイズを縦および横に縮小し、ナビゲーションを容易にするために、グラフノードは特定の方法で配置されます。

グラフ表示ボタンがクリックされたときに選択されたブランチは左側に表示されます。他のすべてのブランチはそれの右側に配置されます。

一般的に、各ブランチは独自の列を占有しますが、可能な場合は、グラフはブランチを上下に重ねて配置し、ノードが水平方向にあまり遠くに配置されないようにします。

また、できるだけ親チェックポイントを子チェックポイントよりも低い位置に配置しようとします。

同時に、グラフビューの中で最初に選択されたブランチのすべてのチェックポイントの明確な概要が必要になる可能性が高いため、グラフビューの中で親チェックポイントが他のブランチの子よりも高い位置に表示され、下向きの矢印 が示されます。

エッジの色は、常にソースノードとマッチするため、その方向を簡単に特定できます。

各ブランチの色は、Graph Viewを起動したブランチに依存せず、常に同じです。

グラフビューでは、スクロールホイールでズームイン/ズームアウト、クリックアンドドラッグでパンすることができます。

[view-changes]: /user-manual/editor/version-control/changes/
[new-branch]: /user-manual/editor/version-control/branches/#creating-a-new-branch
[restore-checkpoint]: /user-manual/editor/version-control/checkpoints/#restoring-a-checkpoint
[hard-reset]: /user-manual/editor/version-control/checkpoints/#restoring-a-checkpoint
