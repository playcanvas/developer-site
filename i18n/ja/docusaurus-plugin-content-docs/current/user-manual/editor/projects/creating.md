---
title: プロジェクトの作成
description: プロジェクトダッシュボードでスターターキットまたはフォークからプロジェクトを作成し、プライバシー規則を案内し、テンプレートやバックアップ用のプロジェクト複製を説明します。
---

Editorプロジェクトを作成するには、2つの方法があります。

1. 定義済みの多数のスターターキットに基づいてプロジェクトを作成する。
2. 既存のプロジェクトをフォークし、それを開始点として使用する。

どちらも[プロジェクトダッシュボード](/user-manual/editor/projects/dashboard/)から行います。

## プロジェクトダッシュボードからプロジェクトを作成する {#create-a-project-from-the-project-dashboard}

1. [playcanvas.com/editor](https://playcanvas.com/editor) でプロジェクトダッシュボードを開きます。
2. サイドバーの **New project** を選択します。

   ![New Project Button](/img/user-manual/editor/projects/new-project-button.png)

3. スターターキットを選びます。

   ![New Project Dialog](/img/user-manual/editor/projects/new-project-dialog.png)

4. 名前、説明、所有者を設定し、プロジェクトを **Private** にするかを選びます。
5. **Create project** を選択します。

<video autoPlay muted loop controls src='/video/editor-project-dashboard-new-project.mp4' style={{width: '100%', height: 'auto'}} />

プロジェクトの準備ができると、ダイアログに「Your new project is ready. It opens in a new tab.」と表示されます。**Open project** を選択すると専用のタブで開き、**Not now** を選択するとダッシュボードに留まります。

### スターターキット {#starter-kits}

すべてのプロジェクトは、スターターキットから始まります：

- **Empty Project**: 何もないプロジェクト
- **Blank Project**（デフォルト）: スカイボックス、キューブ、平面から始まるシーン
- **Model Viewer**: 3Dモデルを閲覧するためのシンプルなスターターキット
- **VR Kit**: WebXRベースのVRセッションに出入りする方法を示すスターターキット
- **3D Gaussian Splat**: 3D Gaussian Splat 用のスターターキット
- **Roll a Ball**: シンプルな物理ベースの3Dゲーム
- **WebXR AR Starter Kit**: WebXRベースのARセッションを開始する方法を示すスターターキット
- **First Person Shooter**: FPSタイプのゲームまたは体験の基盤

:::note

プライベートプロジェクトは、PersonalまたはOrganizationプランでのみ作成できます。

:::

## 既存のプロジェクトをフォークする {#fork-an-existing-project}

フォークすることで、既存の公開プロジェクト（またはあなたがチームメンバーであるプライベートプロジェクト）に基づいて新しいプロジェクトを作成できます。これは、以下の場合に役立ちます：

- 他のプロジェクトを自分の作業の開始点として使用する
- 自分のプロジェクトのバックアップを作成する
- 他の開発者によって作成されたサンプルプロジェクトから学ぶ
- 元のプロジェクトに影響を与えることなく変更を試す

### プロジェクトをフォークする方法

[プロジェクトダッシュボード](/user-manual/editor/projects/dashboard/)からプロジェクトをフォークするには：

1. プロジェクトのカードまたは行の **⋮** ボタンを選択し、**Fork** を選択します。

   ![Fork Project Button](/img/user-manual/editor/projects/fork-project-button.png)

2. フォークダイアログには、フォーク元のプロジェクトが名前と説明が入力済みの状態で表示されます。必要に応じて名前、説明、所有者を変更します。

   ![Fork Project Dialog](/img/user-manual/editor/projects/project-dashboard-fork.png)

3. **Fork project** を選択します。

<video autoPlay muted loop controls src='/video/editor-project-dashboard-fork.mp4' style={{width: '100%', height: 'auto'}} />

プロジェクトをフォークできない場合、ダイアログはフォームの代わりにその理由を表示します。レガシースクリプトを使用している場合、所有者がソースアセットを非公開にしていてあなたに編集権限がない場合、またはプロジェクトがプライベートで新しい所有者に有料プランがない場合です。

### フォークされるもの

プロジェクトをフォークすると、main branch全体が新しいプロジェクトにコピーされます：

- すべてのシーンとその設定
- すべての資産（テクスチャ、モデル、スクリプトなど）
- プロジェクト設定

### フォークされないもの

フォークにはいくつかの制限があります：

- **バージョン管理履歴**は保持されません
- **main branchのみ**がコピーされます（他のブランチは無視されます）
- **チームメンバー**はコピーされません（あなたが単独の所有者となります）
- **開発ログ**とプロジェクトアクティビティはコピーされません

### フォーク後

フォークが作成されると：

- 新しいプロジェクトの完全な所有権と制御権を持ちます
- 必要に応じてプロジェクトを変更、削除、またはさらに開発できます
- フォークは元のプロジェクトから完全に独立しています
- 独自のチームメンバーを追加し、プロジェクト設定を構成できます

フォークされたプロジェクトは、作成した他のプロジェクトと同様にプロジェクトリストに表示されます。

:::tip

プロジェクトダッシュボードでフォークの **Project settings** を開くと、フォーク元のプロジェクトへの **Forked From** リンクが表示されます。

:::
