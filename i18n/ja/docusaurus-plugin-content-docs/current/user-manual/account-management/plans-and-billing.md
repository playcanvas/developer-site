---
title: プランと請求
description: "PlayCanvasのプランを比較して購読し、Billingタブからプラン、ストレージ、支払い情報、請求書、キャンセルを管理します。"
---

個人アカウントと各Organizationには、それぞれ独自のプランと請求があります。このページでは、プランを選んで購読する**Plans**ページと、プランを管理する[アカウント設定](/user-manual/account-management/user-accounts/settings/)の**Billing**タブについて説明します。更新、通貨、返金、シートの請求方法に関する質問については、[請求に関するFAQ](billing.md)をご覧ください。

## プランページ {#plans}

プランページでは、プランを比較して購読できます。[プロジェクトダッシュボード](/user-manual/editor/projects/dashboard/)で自分の名前から開くメニューの**Upgrade plan**、または[請求タブ](#billing-tab)の**Change plan**か**Compare plans**から開きます。

![プラン](/img/user-manual/account-management/billing/plans.webp)

**Individual**には**Free**プランと**Personal**プランが、**Team**には**Organization**プランが表示されます。プランは、表示中のアカウントに適用されます。OrganizationはOrganizationプランしか選択できないため、個人アカウントでは、**Team**にプランの代わりに**Create organization**が表示されます。

購読するには、個人アカウントでは**Upgrade to Personal**を、Organizationでは**Upgrade**（後ろにOrganization名が付いたボタン）を選択します。チェックアウトで支払い方法と請求先住所を入力し、**Subscribe**を選択します。料金は米ドルで表示され、税金は請求先の国に基づいてチェックアウト時に加算されます。日本では、料金は円建ての税込価格です。詳しくは[どのような支払い方法と通貨に対応していますか？](billing.md#what-payment-methods-and-currency-do-you-accept)をご覧ください。

プロモーションコードをお持ちの場合は、「**Have a promo code?**」の下に入力し、**Apply**を選択します。

## 請求タブ {#billing-tab}

開くには、プロジェクトダッシュボードのサイドバー下部にある自分の名前を選択し、**Account settings**を選んで**Billing**タブを選択します。Organizationの場合は、先にページ上部のアカウント切り替えでそのOrganizationに切り替えます。

![請求](/img/user-manual/account-management/billing/billing.webp)

### プラン {#plan}

**Plan**には、アカウントのプランと料金、公開プロジェクトとプライベートプロジェクトの数が表示されます。有料プランの場合はプランの更新日も表示され、Organizationの場合は使用中のシート数も表示されます。**Change plan**を選択すると[プランページ](#plans)が開きます。右上の**Compare plans**からも同じページが開きます。

OrganizationプランのOrganizationでは、ここに**Change seats**も表示されます。[シートの追加と削除](/user-manual/account-management/organizations/managing/#adding-and-removing-seats)をご覧ください。

### ストレージ {#storage}

**Storage**には、アカウントがプランのストレージ容量をどれだけ使用しているかと、その内訳が表示されます。

- **Assets** - プロジェクト内の3Dモデル、テクスチャ、オーディオなどのアセットです。プロジェクトのオープンしているブランチはそれぞれ、アセットのコピーを個別に計上します。詳しくは[バージョン管理がストレージに及ぼす影響](/user-manual/editor/version-control/#how-version-control-affects-your-storage)をご覧ください。
- **Checkpoints** - プロジェクトのバージョン履歴です。
- **Apps** - 公開したアプリです。公開したビルドを削除すると、そのサイズ全体が使用量から差し引かれます。
- **Code** - スクリプトなどのコードです。
- **Splats** - [SuperSplat](/user-manual/supersplat/)に公開したGaussian splatです。

[プロジェクトダッシュボード](/user-manual/editor/projects/dashboard/#storage)には、同じ合計がプロジェクトごとの内訳とともに表示されます。

### 支払い {#payment}

有料プランのアカウントには**Payment**セクションがあり、支払いに使用するカード、**Billing details**、**VAT number**が表示されます。

- カードの横にある**Update**を選択すると、支払い方法を変更できます。
- 請求先情報の横にある**Edit**を選択すると、請求書に記載される名前と住所を変更できます。
- VAT番号の横にある**Add**または**Edit**を選択すると、VAT番号を設定できます。VAT番号を設定できるのは、請求先住所がEU、英国、スイス、ノルウェーにある場合のみです。

### 請求書 {#invoices}

**Invoices**には、アカウントの過去の請求書が一覧表示され、それぞれPDFでダウンロードできます。請求書は、各請求日にアカウントのオーナーにもメールで送信されます。

### プランのキャンセル {#cancel-plan}

有料プランはいつでもキャンセルできます。

1. [アカウント設定](https://playcanvas.com/account/billing)の**Billing**タブを開きます。
2. **Cancel plan**セクションで**Cancel plan**を選択し、確定します。
3. Organizationプランを利用しているOrganizationもある場合は、ページ上部のアカウント切り替えで各Organizationに切り替え、その**Billing**タブで上記の手順を繰り返します。

サブスクリプションがキャンセルされると、再購読しない限り、再度請求されることはありません。

:::note

サブスクリプションをキャンセルしても、すぐにFreeプランに戻るわけではありません。プランは請求期間の終わりまで有効で、**Plan**セクションに終了日が表示されます。その後、プライベートプロジェクトはロックされます。プランが終了する前に気が変わった場合は、**Resume plan**を選択するとサブスクリプションを継続できます。

:::
