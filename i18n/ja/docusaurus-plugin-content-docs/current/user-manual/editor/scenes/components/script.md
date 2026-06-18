---
title: Script
description: PlayCanvas の Script Component は、load、update、カスタムゲームプレイロジックのために Entity 上で動かす JavaScript または TypeScript の Script をアタッチします。
---

Scriptコンポーネントは、エンティティがユーザー提供のスクリプトを実行することを可能にします。これにより、ユーザーはJavaScriptまたはTypeScriptを使用してスクリプトを作成し、エンティティがインスタンス化されたときやフレームごとに更新されるときに実行できます。

![Script Component](pathname:///img/user-manual/editor/scenes/components/component-script.png)

## スクリプトの追加

新しいスクリプトを作成するには、Scriptコンポーネントの**Add Script**ドロップダウンをクリックして、以下のいずれかを行います:

- リストから既存のスクリプトを選択する
- 新しいスクリプト名を入力し、**Create Script**をクリックして新しいスクリプトアセットを作成する

または、AssetsパネルからScriptコンポーネントにスクリプトアセットをドラッグ＆ドロップすることもできます。

![Add Script Dialog](pathname:///img/user-manual/editor/scenes/components/new-script.jpg)

## スクリプトパネルのコントロール {#script-panel-controls}

コンポーネントに追加された各スクリプトは、以下のコントロールを持つ折りたたみ可能なパネルとして表示されます:

| コントロール | 説明 |
|--------------|-------------|
| Script Name  | クリックすると、Assetsパネルでスクリプトアセットを選択します。 |
| On/Off       | この個別のスクリプトを有効または無効にするトグル。 |
| Edit         | コードエディターでスクリプトを開きます。 |
| Parse        | スクリプトを再解析して属性を更新します。スクリプト属性の定義を変更した後に使用します。 |
| Remove       | コンポーネントからスクリプトを削除します（Xボタンをクリック）。 |

:::note

ここに表示される **Script Name** は、スクリプトの*登録名*です。これはコード内で、[ESM スクリプト](/user-manual/scripting/esm-scripts/)の場合は `static scriptName` によって、クラシックスクリプトの場合は `pc.createScript('name')` の引数によって定義されます。これはスクリプトアセットのファイル名とは独立しているため、両者が異なる場合があります。たとえば、`annotation-manager.mjs` というファイル名でも、スクリプトは `annotationManager` として登録されていることがあります。

:::

## スクリプトの順序

エンティティに複数のスクリプトがアタッチされている場合、その順序が重要です。スクリプトは上から下へ順番に実行されます。スクリプトをドラッグ＆ドロップしてコンポーネント内で順序を変更できます。

## スクリプト属性

スクリプトはインスペクターに表示されるカスタム属性を定義できます。これらの属性により、コードを変更せずにスクリプトの動作を設定できます。サポートされている属性タイプには以下が含まれます:

- **boolean** - チェックボックス
- **number** - 数値入力（min/max範囲でスライダーもオプション）
- **string** - テキスト入力
- **vec2**、**vec3**、**vec4** - ベクトル入力
- **rgb**、**rgba** - カラーピッカー
- **asset** - アセットピッカー
- **entity** - エンティティピッカー
- **curve** - カーブエディター
- **json** - 複雑なネストされたオブジェクト

スクリプトで属性を定義する方法の詳細については、[Script Attributes](/user-manual/scripting/script-attributes/)ドキュメントを参照してください。

## 関連項目

- [スクリプティング](/user-manual/scripting) - スクリプトの書き方を学ぶ
- [エディタースクリプティング](/user-manual/editor/scripting) - エディターでのスクリプト管理

## スクリプトインターフェース

Scriptコンポーネントのスクリプトインターフェースは[こちら](https://api.playcanvas.com/engine/classes/ScriptComponent.html)です。
