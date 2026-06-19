---
title: Organizationの作成
description: プロフィールから新しいPlayCanvas Organizationを作成する方法、既存のプロジェクトを移行する方法、ユーザーアカウントをOrganizationに変換する方法を説明します。
---

Organizationを作成する方法は2つあります。所属しているOrganizationは、以下のようにプロフィールの名前の隣に表示されます:

![Profile Organizations](pathname:///img/user-manual/account-management/organizations/creating/organizations.jpg)

## 新しいOrganizationを作成する

右上のドロップダウンメニューを開き、**NEW ORGANIZATION** をクリックします:

![Dropdown](pathname:///img/user-manual/account-management/organizations/creating/dropdown.png)

すると、以下のダイアログが表示されます:

![New Organization](pathname:///img/user-manual/account-management/organizations/creating/new-organization.jpg)

Organizationの**名前**と、**OrganizationのID**(半角英数字とダッシュのみが使用可能な文字列)を入力します。メールアドレスはデフォルトであなた自身のものになりますが、変更することもできます。**CREATE** をクリックすると作成が完了し、Organizationのプロフィールページに移動します。

### 既存のプロジェクトをOrganizationに移行する

すでにプロジェクト(例えばパーソナルプランのプライベートプロジェクトなど)がある場合は、新しいOrganizationに移行できます:

1. 自分のユーザーアカウントから、[プロジェクトの所有権を移管](/user-manual/editor/projects/ownership-transfers#initiating-ownership-transfers)してOrganizationに移します。
2. Organizationアカウントで、移管を承認します。
3. パーソナルプランを利用中の場合は、キャンセルしてフリープランにダウングレードします。これは最後に支払った日時にかかわらず、すぐに実行されます。
4. [Organizationの管理者として自分をプロジェクトに追加](/user-manual/account-management/organizations/managing/#projects)します。

これで、すべてのプロジェクトがOrganizationの所有となり、あなたのユーザーアカウントが各プロジェクトの管理者になります。

## ユーザーアカウントをOrganizationに変換する

別の方法として、既存のユーザーアカウントをOrganizationに変換することもできます。[アカウント設定](/user-manual/account-management/user-accounts/settings/#convert-account-to-organization)ページで **CONVERT** をクリックします:

![Convert Organization](pathname:///img/user-manual/account-management/organizations/creating/convert.png)

すると、以下のダイアログが表示されます:

![Convert Popup](/img/user-manual/account-management/organizations/creating/convert-popup.png)

Organizationとして直接ログインすることはできないため、アカウントを変換すると、そのアカウントではログインできなくなります。そのため、別のユーザーを新しい**オーナー (Owner)**として指定する必要があります。

:::warning

変換する前に、新しいオーナー (Owner)のアカウントでログインできることを確認してください。

:::

そのアカウントが有料プランの場合、ダイアログでOrganizationプランへの登録を選択しない限り、プランはキャンセルされます。購入するシート数は、既存のプライベートプロジェクトのユーザー数を基に自動的に計算されます。

変換後はログアウトされます。新しいオーナー (Owner)のアカウントで再度ログインすると、変換されたアカウントとそのすべてのプロジェクトにアクセスできます。
