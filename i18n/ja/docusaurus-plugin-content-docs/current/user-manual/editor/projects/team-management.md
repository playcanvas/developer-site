---
title: チーム管理
description: 共同編集者を招待し、読み取り・書き込み・管理者の権限を設定し、共有の PlayCanvas エディタープロジェクトのメンバーシップ規則を管理します。
---

PlayCanvasでの共同開発には、効果的なチーム管理が不可欠です。このセクションでは、チームメンバーの追加方法、権限の管理、開発チームとの連携について説明します。

## チームメンバーの追加 {#adding-team-members}

プロジェクトにチームメンバーを追加するには：

1. [プロジェクトダッシュボード](/user-manual/editor/projects/dashboard/)でプロジェクトのカードを選択し、設定を開きます
2. 左側のパネルで **Team** を選択します
3. 追加したい人のユーザー名またはメールアドレスを入力し、**Invite** を選択します

## ユーザー権限

PlayCanvasプロジェクトは、3つの権限レベルをサポートしています：「**Read**」、「**Write**」、および「**Admin**」。

| 機能 | Readアクセス | Writeアクセス | Adminアクセス |
|------------| :---------: | :----------: | :----------: |
| **シーンとアセットの表示** | ✅ | ✅ | ✅ |
| **プロジェクト設定の表示** | ✅ | ✅ | ✅ |
| **シーンとアセットの編集** | ❌ | ✅ | ✅ |
| **ビルドの公開** | ❌ | ✅ | ✅ |
| **プロジェクト設定の編集** | ❌ | ❌ | ✅ |
| **チームメンバーの管理** | ❌ | ❌ | ✅ |
| **プロジェクトの削除** | ❌ | ❌ | ✅ |
| **プロジェクト所有権の移行** | ❌ | ❌ | ✅ |
| **最適** | ステークホルダー、テスター、オブザーバー | 開発者、コンテンツクリエイター | プロジェクトリーダー、オーナー |

### 権限の変更

チームメンバーの権限を変更するには：

1. プロジェクトダッシュボードでプロジェクトの **Team** パネルを開きます
2. チームリストからユーザーを見つけます
3. 現在のアクセスレベルを選択します
4. **Read Only**、**Read & Write**、**Admin** のいずれかを選択します。変更はすぐに反映されます

## チームメンバーの削除

プロジェクトから誰かを削除するには：

1. プロジェクトダッシュボードでプロジェクトの **Team** パネルを開きます
2. 削除したいユーザーを見つけます
3. そのユーザーの行にある削除ボタンを選択します

:::warning

チームメンバーを削除すると、そのメンバーはプロジェクトへのすべてのアクセス権を直ちに失います。確定する前に、意図した操作であることを確認してください。

:::

## Organizationのプロジェクト {#organization-projects}

プロジェクトが[Organization](/user-manual/account-management/organizations/)に属している場合、Organizationのオーナーと管理者もプロジェクトを管理できます。また、プライベートプロジェクトに参加しているユーザーは、Organizationのシートを使用します。

### Organizationの管理者 {#organization-administrators}

Organizationのオーナーと管理者は、次のことができます。

- Organizationの任意のプロジェクトに、自分自身を管理者として追加できます。[Organizationのプロジェクトに自分を追加する](#adding-organization-members)を参照してください。
- 管理者になっているプロジェクトのチームを、前述の手順で管理できます。
- Organizationのアカウント設定の**People**タブで、Organizationの管理者を追加・削除し、シートを使用しているユーザーを確認できます。[Organizationの管理](/user-manual/account-management/organizations/managing/#people)を参照してください。

Organizationの請求情報の確認、プランの変更、シート数の変更ができるのはオーナーだけです。

### シートの管理 {#seat-management}

Organizationプランでは：

- Organizationのプライベートプロジェクトに参加している各ユーザーは、シートを1つ使用します。1つのシートで、そのOrganizationのすべてのプロジェクトに参加できます。
- パブリックプロジェクトにはシートは必要ありません。
- オーナーは、プロジェクトで作業していない場合、シートを使用する必要はありません。
- Organizationのすべてのプライベートプロジェクトからユーザーを削除すると、そのユーザーのシートが空きます。一度に削除するには、Organizationの**People**タブの**Seats**で、そのユーザーの横にある**Remove**を選択します。
- シート数は、オーナーがOrganizationの**Billing**タブで変更します。[シートの追加と削除](/user-manual/account-management/organizations/managing/#adding-and-removing-seats)を参照してください。

詳しくは[シート](/user-manual/account-management/organizations/managing/#seats)を参照してください。

### Organizationのプロジェクトに自分を追加する {#adding-organization-members}

Organizationの管理者は、プロジェクトダッシュボードからプロジェクトに自分自身を追加できます：

1. [プロジェクトダッシュボード](/user-manual/editor/projects/dashboard/)のサイドバーで、**Organizations**からOrganizationを選択します
2. プロジェクトのカードを選択して設定を開きます。まだプロジェクトに参加していない場合、設定には**Team**だけが表示され、プロジェクトの管理者ではないことを示すメッセージが表示されます
3. **ADD ME AS ADMIN**を選択します

あなたが管理者として追加され、プロジェクトのすべての設定が開きます。その後は、通常どおり[他のチームメンバーを追加](#adding-team-members)できます。[プロジェクト設定](/user-manual/editor/projects/dashboard/#project-settings)を参照してください。
