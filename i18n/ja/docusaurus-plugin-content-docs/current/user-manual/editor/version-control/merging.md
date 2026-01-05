---
title: マージとコンフリクトの解決
---

マージは、2つのブランチで行われた作業を組み合わせるプロセスです。マージは、[ブランチのドキュメント](/user-manual/editor/version-control/branches)で説明されているブランチベースのワークフローの自然な部分です。

## 2つのブランチのマージ

PlayCanvasでは、マージは2つの異なるブランチから2つのチェックポイントを取得して、最後に共有された祖先のチェックポイント以降に発生した変更を計算し、これらの変更を一緒に結合(競合する変更を解決するために時に助けを求める)し、最後に、2つのチェックポイントのマージ結果を含む新しいチェックポイントを作成します。

まず、PlayCanvasでマージを実行すると、実際に2つのブランチをマージしているわけではなく、実際には2つのチェックポイントをマージしていることに注意してください。これは、2つのブランチのうち1つに更新がある場合があるためです。マージ先のブランチの場合、PlayCanvasは最新の変更が失われないように、自動的にチェックポイントを作成します。

### マージの例

![Merging checkpoints](/img/user-manual/editor/version-control/merging/merging-checkpoints-1.png)
*Changes Y & Z are not included in merge result C and **are lost**.*

![Merging checkpoints](/img/user-manual/editor/version-control/merging/merging-checkpoints-2.png)
*By default PlayCanvas creates a new checkpoint in the destination branch of a merge, so changes Y are included*

![Merging checkpoints](/img/user-manual/editor/version-control/merging/merging-checkpoints-3.png)
*If changes Z are required, create a checkpoint in the source branch before starting the merge.*

## マージの開始

![Start merge](/img/user-manual/editor/version-control/merging/start-merge.png)

マージを開始するには、現在のブランチをマージしたいブランチに切り替えます。次に、マージしたいブランチを選択して、ブランチのドロップダウンメニューから「現在のブランチにマージ」を選択します。

![Merge dialog](/img/user-manual/editor/version-control/merging/merge-dialog.png)

マージを開始する前にいくつかのオプションがあります。

「マージ元」ブランチでは、次のことができます。

- **最初にチェックポイントを作成する** - このオプションをオンにすると、マージ前にチェックポイントを作成します。ブランチにまだチェックポイントされていない変更がある場合には、それらをマージに含めたい場合に有用です。
- **マージ後にブランチを閉じる** - このオプションをオンにすると、マージが完了した後に「マージ元」ブランチが閉じられます。機能ブランチでは、機能が完了し、ブランチリストを古くなったブランチでクリーンに保つためによく使用されます。

「マージ先」ブランチでは、次のことができます。

- **最初にチェックポイントを作成する** - これはデフォルトでオンになっています。マージはチェックポイントに基づいて行われるため(つまり、チェックポイント1つを別のチェックポイントにマージします)、チェックポイントがない「マージ先」ブランチの変更が含まれるように、これが保証されます。このオプションをオフにすると、チェックポイントされていない変更が破棄されます。このオプションをオフにすることはお勧めしません。

### 自動マージ

2つのチェックポイントをマージする場合、PlayCanvasは互いに競合しない変更を自動的にマージしようとします。多くの場合、2つのブランチを完全に自動的にマージできます。自動マージでは、マージが完了すると、エディタが現在のブランチにマージされた変更で再読み込みされます。

### コンフリクトの解決

2つのブランチに競合する変更がある場合、これらの変更を自動的にマージすることはできません。競合する変更の例は、両方のブランチで同じエンティティの位置を変更した場合です。2つの最終的な位置の間でシステムが選択することはできません。

2つのブランチで1つ以上の競合が存在する場合、エディタはコンフリクトマネージャーを表示し、マージが完了する前に各競合を解決する必要があります。

### コンフリクトマネージャー

![Conflict Manager](/img/user-manual/editor/version-control/merging/conflict-manager.jpg)

コンフリクトマネージャーには、左側に競合する各リソースが表示され、選択された各リソースについて、オリジナルバージョン(Base)と各ブランチのバージョンの比較が表示されます。競合した各プロパティについて、受け入れるバージョンを選択できます。すべてのリソースのすべてのプロパティが解決されたら、「マージを完了」ボタンをクリックして、マージを終了し、新しいチェックポイントを作成します。

![Resolved Conflicts](/img/user-manual/editor/version-control/merging/conflicts-resolved.jpg)

コンフリクトマネージャーとマージが進行中の間、現在のブランチは他のユーザーからのさらなる編集をロックします。これにより、競合の解決が完了するときにマージによって変更が上書きされるのを防ぎます。別のユーザーがマージに必要なブランチをブロックしている場合、エディタから彼らのマージを強制的に終了することができます。
