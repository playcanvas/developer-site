---
title: 所有権と譲渡
description: ユーザー間および組織間の所有権譲渡リクエストを案内し、オーナー限定のコントロール、削除、アクセスへの影響を概説します。
---

プロジェクトの所有権は、PlayCanvasプロジェクトを削除する能力、所有権を譲渡する能力、アクセスを制御する能力を含む、プロジェクトに対する最終的な管理権限を持つ者を決定します。このセクションでは、ユーザー間および組織間の所有権の譲渡について説明します。

## 所有者の責任

プロジェクトの所有者は、(Adminsができることに加えて)以下の能力を持っています。

- **プロジェクトの削除**: プロジェクトを完全に削除できます
- **チーム管理**: (Adminを含む)任意のチームメンバーを追加/削除できます
- **譲渡権限**: 他者に所有権を譲渡できます

## 所有権の譲渡を開始する {#initiating-ownership-transfers}

### プロジェクトダッシュボードから {#from-the-project-dashboard}

![Transfer Ownership Menu](/img/user-manual/editor/projects/transfer-ownership.png)

プロジェクトの所有権を譲渡するには:

1. [playcanvas.com/editor](https://playcanvas.com/editor)で[プロジェクトダッシュボード](/user-manual/editor/projects/dashboard/)を開きます。
2. 譲渡したいプロジェクトを見つけます。
3. プロジェクトの**⋮**メニューを開きます。
4. **Transfer ownership**を選択します。

### 譲渡ダイアログ

![Transfer Ownership Dialog](/img/user-manual/editor/projects/transfer-ownership-dialog.png)

ダイアログでは、プロジェクトの新しい所有者を選ぶよう求められ、相手に承認のリクエストが届くことが説明されます。また、「Once they accept, everyone else on the project loses access.」（承認されると、プロジェクトの他のメンバー全員がアクセスを失います）という警告も表示されます。

1. 受信者の**ユーザー名**または組織名を入力します。入力に合わせて受信者が検索されます。
2. 入力欄の下に表示された候補が正しいアカウントであることを確認します。
3. 譲渡リクエストを送信するには、**Transfer**を選択します。

### 対応する受信者

所有権は以下に譲渡できます:

- **個人ユーザー**: 任意のPlayCanvasユーザーアカウント
- **組織**: PlayCanvas組織アカウント

## 譲渡プロセス

### 1. 譲渡リクエスト

譲渡を開始すると:

- 受信者に譲渡リクエストが送信されます。
- 元の所有者は、承認されるまで管理権限を保持します。
- リクエストは受信者の[プロジェクトダッシュボード](/user-manual/editor/projects/dashboard/)に表示されます。
- 自分のプロジェクトカードには**Transfer pending**と「Sent to &lt;ユーザー&gt;」が表示され、**Cancel transfer**ボタンでリクエストを取り消せます。
- 譲渡が承認されるまで、変更は発生しません。

### 2. 受信者の承認

![Transfer Ownership Accept](/img/user-manual/editor/projects/accept-transfer.png)

受信者には以下が表示されます:

- プロジェクトダッシュボードの上部に、**Transfer request**と表示されたプロジェクトカード
- 所有者名の下に、リクエストが送られた日時（「Offered yesterday」など）。リスト表示では「&lt;所有者&gt; wants to give you this project」と表示されます
- カード上の**Accept**ボタンと**Decline**ボタン

### 3. 譲渡の完了

承認されると:

- **所有権は直ちに**新しい所有者に**譲渡されます**。
- 新しい所有者を除く**すべてのチームメンバーが削除されます**。
- 元の所有者は、新しい所有者によって再追加されない限り、**すべてのアクセス権を失います**。
- 新しい譲渡を開始しない限り、**譲渡を元に戻すことはできません**。

:::warning

譲渡が完了すると、プロジェクトから既存のすべてのチームメンバーが削除されます。新しい所有者は、必要に応じてチームメンバーを手動で再追加する必要があります。

:::
