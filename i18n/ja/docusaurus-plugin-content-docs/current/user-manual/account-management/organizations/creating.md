---
title: Organizationの作成
description: "PlayCanvasのOrganizationを作成する方法、既存のプロジェクトをOrganizationに移す方法、ユーザーアカウントをOrganizationに変換する方法を説明します。"
---

Organizationを作成する方法は2つあります。新しいOrganizationを作成する方法と、既存のユーザーアカウントをOrganizationに変換する方法です。所属しているOrganizationは、[プロジェクトダッシュボード](/user-manual/editor/projects/dashboard/#organizations)のサイドバーの**ORGANIZATIONS**の下に表示されます。

<img loading="lazy" alt="Organization一覧" width="249" src="/img/user-manual/account-management/organizations/creating/dashboard-organizations.webp" />

## 新しいOrganizationを作成する {#create-a-new-organization}

新しいOrganizationは、次のいずれかの場所から作成できます。

- プロジェクトダッシュボードで、**ORGANIZATIONS**の横にある「**+**」を選択します。プロジェクトダッシュボードのドキュメントの[Organizations](/user-manual/editor/projects/dashboard/#organizations)を参照してください。
- [アカウント設定](/user-manual/account-management/user-accounts/settings/)で、ページ上部のアカウント切り替えを開き、**New organization**を選択します。

<img loading="lazy" alt="アカウントの切り替え" width="500" src="/img/user-manual/account-management/organizations/creating/switch-account.webp" />

アカウント設定からは、次の**New organization**ダイアログが開きます。

<img loading="lazy" alt="新しいOrganization" width="480" src="/img/user-manual/account-management/organizations/creating/new-organization.webp" />

- **Name** - Organizationの名前です。会社名などを入力します。
- **ID** - スペースを含まない一意のIDです。Organizationのプロフィールのアドレス（`playcanvas.com/user/<ID>`）を決めます。
- **Email** - Organizationの通知の送信先です。デフォルトでは自分のメールアドレスになりますが、変更できます。

**Create**を選択すると完了です。OrganizationはFreeプランで作成され、あなたがオーナーになり、Organizationのアカウント設定が開きます。プライベートプロジェクトとシートを追加するには、[Organizationプランにアップグレード](managing.md#billing)します。

### 既存のプロジェクトをOrganizationに移す {#transfer-existing-projects}

すでにプロジェクト（例えばPersonalプランのプライベートプロジェクトなど）がある場合は、新しいOrganizationに移すことができます。

1. 自分のユーザーアカウントから、Organizationに[プロジェクトの所有権を譲渡](/user-manual/editor/projects/ownership-transfers#initiating-ownership-transfers)します。
2. Organizationアカウントで、[譲渡を承認](/user-manual/editor/projects/ownership-transfers/)します。
3. Personalプランを利用していて不要になった場合は、[キャンセル](/user-manual/account-management/plans-and-billing/#cancel-plan)します。新しいOrganizationを作成した直後にOrganizationプランを購読する場合は、チェックアウトで**End my Personal plan when this starts**を選択すると、このキャンセルが自動的に行われます。
4. [Organizationの管理者として自分をプロジェクトに追加](managing.md#projects)します。

これで、プロジェクトはOrganizationの所有となり、あなたのユーザーアカウントが各プロジェクトの管理者になります。

## ユーザーアカウントをOrganizationに変換する {#convert-a-user-account-into-an-organization}

別の方法として、既存のユーザーアカウントをOrganizationに変換することもできます。変換したいアカウントでログインし、その[アカウント設定](/user-manual/account-management/user-accounts/settings/#convert-account-to-organization)の**Profile**タブを開いて、**Convert to organization**を選択します。

<img loading="lazy" alt="Organizationへの変換" width="784" src="/img/user-manual/account-management/organizations/creating/convert.webp" />

すると、次のダイアログが表示されます。

<img loading="lazy" alt="変換ダイアログ" width="480" src="/img/user-manual/account-management/organizations/creating/convert-popup.webp" />

Organizationとして直接ログインすることはできないため、アカウントを変換すると、そのアカウントではログインできなくなり、すべてのプロジェクトがOrganizationに移ります。そのため、別のユーザーを新しい**オーナー**として指定する必要があります。そのユーザーのユーザー名を入力して**Find**を選択し、続いて**Convert**を選択します。

:::warning

変換する前に、新しいオーナーのアカウントでログインできることを確認してください。

:::

Organizationプランを購読しない限り、アカウントのプライベートプロジェクトはロックされます。購読できる場合は、ダイアログに**Subscribe to the Organization plan**が表示され、既存のプライベートプロジェクトに参加しているユーザー1人につき1シート分の料金が示されます。アカウントが有料プランを利用している場合、そのプランはキャンセルされます。

Organizationを所有しているアカウントは変換できません。先にそれらのOrganizationを削除するか、所有権を譲渡してください。

変換後はログアウトされます。新しいオーナーのアカウントで再度ログインすると、Organizationとそのすべてのプロジェクトにアクセスできます。
