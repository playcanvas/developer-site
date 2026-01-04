---
title: あなたのスクリプトの管理
---

PlayCanvas Editor では、JavaScript コードは Script Asset に格納されます。これらは、モデル、テクスチャ、マテリアルと同様に、プロジェクトの Asset Panel 内に保存される `.js` または `.mjs` ファイルです。これらの Script Asset を効果的に管理することは、整理され効率的なワークフローの鍵となります。このページでは、エディターインターフェースを使用してスクリプトを作成、整理、削除、インポート、および割り当てる方法について説明します。

主な概念:

* **Script Asset:** スクリプトのコードを含む `.js` または `.mjs` ファイル。Asset Panel にあります。
* **Script Component:** 1つ以上の Script Asset が Entity にアタッチされたインスタンス。これにより、スクリプトがその特定の Entity 上で「実行」されます。

## 新しいスクリプトの作成

エディター内で直接新しい Script Asset を作成できます。

1. Asset Panel に移動します。
2. フォルダーの選択（オプションですが推奨）：スクリプトをフォルダーに整理するのは良い習慣です。Asset Panel を右クリックし、New Asset > Folder を選択して新しいフォルダーを作成できます。
3. スクリプトの作成：
    * 目的のフォルダー内（または Asset Panel のルート）で右クリックします。
    * New Asset > Script を選択します。
    ![New Script](/img/user-manual/scripting/new-script.png)
    * ポップアップで、新しいスクリプトのファイル名を入力します。

## スクリプトのインポート

外部ソースから PlayCanvas プロジェクトにスクリプトを取り込むことができます。

* **コンピューターからスクリプトをインポートする：**
    1. コンピューターのファイルシステム上で `.js`/.mjs` ファイルを見つけます。
    2. ファイルをファイルエクスプローラー/ファインダーから PlayCanvas Editor の Asset Panel 内の目的のフォルダーに直接ドラッグします。
    3. エディターがスクリプトをアップロードおよび処理し、Script Asset として利用可能にします。
* **PlayCanvas Asset Store からスクリプトをインポートする：**
    1. [Asset Store](../assets/asset-store/index.md) を開きます（Asset Panel ヘッダーのボタンからアクセスできます）。
    2. 閲覧するか、SCRIPT フィルターを適用します。
    3. 目的のスクリプト/パッケージを見つけたら、クリックして詳細を表示し、IMPORT を選択します。
    4. インポートされたスクリプトは Asset Panel に表示され、通常は Asset Store パッケージの名前が付けられた新しいフォルダー内にあります。これらは、管理および使用できる通常の Script Asset となります。

## エンティティへのスクリプトの割り当て（Script Component 経由）

Script Asset 自体は、Script Component を介して Entity にアタッチされるまでは何も実行しません。

1. **Entity の選択：** Hierarchy panel で、スクリプトを追加したい Entity を選択します。
2. **Script Component の追加（存在しない場合）：**
    * Inspector panel（右側）で、Add Component ボタンをクリックします。
    * リストから Script を選択します。新しい Script Component が Entity に追加されます。
3. **Script Asset を Script Component に割り当てる：**
    * Script Component には編集ボックス（「+ ADD SCRIPT」というテキストが表示されています）があります。編集ボックス内をクリックしてフォーカスします。
    * ドロップダウン/検索ボックスが表示されます。スクリプトの名前を入力するか、リストを参照して選択します。
    ![Select Script](/img/user-manual/scripting/select-script.png)
    * 1つの Script Component に複数の Script Asset を追加できます。通常、それらのライフサイクルメソッド（initialize、update など）は「Scripts」配列に表示される順序で実行されますが、依存関係は postInitialize やイベントを使用して管理する方が適切です。

## スクリプトの整理

プロジェクトが大きくなると、スクリプトの数も増えます。適切な整理が不可欠です。

* **フォルダー：** Asset Panel 内のフォルダーを使用して、スクリプトを分類およびグループ化します。必要に応じて、フォルダー間でスクリプトをドラッグ＆ドロップできます。
* **命名規則：** スクリプトファイルには、一貫性があり説明的な命名規則を適用してください。これにより、見つけやすく、理解しやすくなります。

## スクリプトの削除

Script Asset を削除するには：

1. Asset Panel で Script Asset を選択します。
2. Delete キーを押すか、右クリックして Delete を選択します。

3. 確認ダイアログが表示されます。「DELETE」をクリックして確定します。

:::note

スクリプトアセットが現在、シーン内のエンティティにあるスクリプトコンポーネントに割り当てられている場合、そのアセットを削除すると、それらのコンポーネントから削除されます。それらのコンポーネントが不要になった場合は、削除することをお勧めします。

:::

:::warning

アセットの削除には元に戻す機能がないため、注意してください。[バージョン管理](../../editor/version-control/index.md)を使用して定期的にチェックポイントを設定することを強くお勧めします。これにより、誤って削除したファイルを回復できます。

:::
