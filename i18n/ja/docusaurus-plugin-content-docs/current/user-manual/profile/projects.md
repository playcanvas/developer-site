---
title: プロジェクト
sidebar_position: 2
---

プロジェクトタブには、作成したプロジェクトやアクセス権が与えられたプロジェクトがすべて表示されます。

![projects_page](/img/user-manual/profile/profile.png "Projects")

## 新しいプロジェクト {#new-project}

右上のNEWボタンをクリックして、新しいプロジェクトを作成します。

## プロジェクトの削除 {#delete-project}

プロジェクトの横にある矢印をクリックして、削除を選択すると、プロジェクトをアカウントから完全に削除することができます。

## プロジェクトのロック解除 {#unlock-project}

プロジェクトの横にある矢印をクリックし、Unlockを選択して、*ロックされた*プロジェクトをロック解除します。プロジェクトのロック解除は、プロジェクトの所有者のサブスクリプションタイプによって異なります。所有者がパーソナルプランを持っている場合、ロック解除により、すべてのユーザーにサブスクリプションが必要なため、Freeユーザーがプロジェクトから削除されます。それ以外の場合、プロジェクトのロック解除は、それをパブリックにすることを意味します。

Organizationアカウントを持っている場合、プロジェクトのロック解除の別の方法は、シートの制限に達しないように、さらにシートを購入することです。

## プロジェクトの所有権移転 {#transfer-project-ownership}

プロジェクトの所有権を他のユーザーに移す場合は、プロジェクトの横にある矢印をクリックして、Transfer Ownershipをクリックします。

![transfer-ownership-menu](/img/user-manual/profile/projects/transfer-ownership-menu.png)

ユーザー名または所有するOrganizationの名前を入力するように求めるポップアップが表示されます。

![transfer-ownership-dialog](/img/user-manual/profile/projects/transfer-ownership-dialog.png)

ユーザー名を入力し、FINDをクリックするかEnterキーを押します。その後、TRANSFERをクリックしてください。

他のユーザーは、プロジェクトの移転を受け入れる必要があります。移転依頼は、他のユーザーのプロジェクトリストの一番上に表示されます。

![transfer-ownership-accept](/img/user-manual/profile/projects/transfer-ownership-accept.png)

ユーザーがリクエストを承認すると、移転が完了し、新しい所有者以外のすべてのチームメンバーがプロジェクトから削除されます。

## プロジェクトのバックアップと復元 {#backing-up-and-restoring-projects}

ユーザーが誤って削除したり、悪意のあるチームメンバーによって保護するために、定期的にプロジェクトのバックアップを作成することをお勧めします。以下にいくつかの方法がリストされています。

### プロジェクトのフォーク {#forking-a-project}

プロジェクトのバックアップを作成する最も簡単な方法は、フォークすることです。これにより、プロジェクトの 'main'ブランチのコピーである新しいプロジェクトが作成されます。新しく作成されたフォークにはバージョン管理の履歴は保存されません。

このオプションは、[プロジェクトダッシュボード][7]で見つけることができます。

### プロジェクトをアーカイブファイルにバックアップする {#backing-up-a-project-to-an-archive-file}

アーカイブファイルには、現在のプロジェクトの状態のすべてのデータが含まれます。ただし、バージョン管理履歴は含まれません。

プロジェクトのオフラインバックアップアーカイブを作成するための2つの方法があります。

#### プロジェクトリストから {#from-the-projects-list}

![export-archive](/img/user-manual/profile/projects/export-archive-button.jpg)

.zipアーカイブをエクスポートして、オフラインバックアップを取得できます。後でその.zipアーカイブを新しいプロジェクトとしてインポートできます。

プロジェクトをエクスポートするには、プロジェクトの横にある矢印をクリックして、「プロジェクトをエクスポート」を選択します。

:::danger

エクスポートされたプロジェクトは`main`ブランチのみを保持します。他のすべてのブランチは失われます。

:::

#### REST APIを使用する {#using-the-rest-api}

バックアップされたアーカイブファイルをエクスポートすることも、[REST API][8]で行うことができ、自動的な定期バックアップのために継続的な統合システムで自動化することができます。

パラメータを介してエクスポートするブランチを選択することもできます。

当社は、このプロセスをユーザーにとってより簡単にする[Nodeベースのオープンソースツール][9]を作成しました。

### アーカイブファイルからプロジェクトをリストアする {#restoring-a-project-from-an-archive-file}

![import-archive](/img/user-manual/profile/projects/import-archive-button.jpg)

[プロジェクトをアーカイブファイルにバックアップする](#backing-up-a-project-to-an-archive-file)に記載されている方法のいずれかで作成されたアーカイブzipファイルがあれば、それをPlayCanvas上の新しいプロジェクトとしてインポートできます。

プロジェクトページの左側にある 'Import Project' をクリックして、zipファイルを選択してインポートしてください。

[7]: /user-manual/dashboard/header/
[8]: /user-manual/api/project-archive/
[9]: https://github.com/playcanvas/playcanvas-rest-api-tools#archiving-a-project
