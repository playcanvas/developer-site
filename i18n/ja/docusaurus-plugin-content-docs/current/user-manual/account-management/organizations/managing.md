---
title: Organizationの管理
description: Organizationのロールと権限の管理、シートの割り当て、プロジェクトへの管理者の追加、Organizationの削除について説明します。
---

Organizationは、そのアカウントページから管理します。このページでは、オーナーと管理者がロール、シート、プロジェクト、そして必要に応じてOrganizationの削除を扱います。

## ロールと権限 {#permissions}

![permissions](/img/user-manual/account-management/organizations/managing/permissions.png)

アカウントページには、Organizationの**オーナー (Owner)**と**管理者 (Admin)**が表示されます。ここから、オーナーは他のユーザーに所有権を移譲したり、管理者を追加・削除したりできます。

管理者は、プロジェクトの作成や削除を含め、オーナーができることをすべて行えますが、Organization自体を削除することだけはできません。これはオーナーのみが行えます。

## シート (Seats) {#seats}

**シート**は、Organizationの**プライベート**プロジェクトにユーザーを追加すると消費されます。パブリックプロジェクトはシートを必要としないため、無制限のパブリック共同作業者を無料で持てます。

![seats](/img/user-manual/account-management/organizations/managing/seats.png)

このビューには、プライベートプロジェクトにアクセスできるすべてのユーザーと、占有しているシートが一覧表示されます。ここでユーザーを削除すると、そのユーザーはOrganizationのすべてのプロジェクトから削除され、シートが空きます。

オーナーは、プロジェクトで実際に作業していない場合、シートを占有する必要はありません。少なくとも一人の管理者にシートを割り当て、常に誰かがプロジェクトを作成・管理できるようにすることをおすすめします。

### シートの追加と削除

![upgrade](/img/user-manual/account-management/organizations/managing/upgrade.png)

Organizationプランに登録している場合は、いつでもシート数を増減できます。シートの変更は次回の請求日に日割りで精算されます。計算例については[請求に関するFAQ](/user-manual/account-management/billing/)をご覧ください。

## プロジェクト {#projects}

管理者は、Organizationが所有する任意のプロジェクトに自分自身を追加できます。アカウントページで、プロジェクトの右側にあるドロップダウンの矢印をクリックし、**Add me as admin** を選択します:

![add to project](/img/user-manual/account-management/organizations/managing/add-to-project.png)

ここから、他のユーザーを通常通りプロジェクトに追加できます。

## Organizationの削除 {#delete}

![delete](/img/user-manual/account-management/organizations/managing/delete.png)

Organizationを削除できるのはオーナーのみで、アカウントページから行います。

:::danger

Organizationを削除すると、アカウントと**すべての**プロジェクトが完全に消去されます。この操作は取り消せません。

:::
