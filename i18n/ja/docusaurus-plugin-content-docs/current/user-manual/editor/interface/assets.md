---
title: アセットパネル (Assets)
---

アセットパネルは、プロジェクトで利用可能なすべてのアセットを管理します。ここから、アセットの作成、アップロード、削除、検査、編集などが行えます。

![Assets Panel](/img/user-manual/editor/assets-panel.png)

## フォルダーの階層 {#folder-hierarchy}

フォルダーパネルを使用すると、アセットをフォルダのツリー形式で整理することができます。

新しいフォルダーを作成するには、Add Asset (+) ボタンをクリック、 'Folder' を選択します。または、新しいフォルダを作成したいフォルダを右クリックし、 'New Asset' > 'Folder' を選択します。

フォルダーの名前を変更するには、ヒエラルキーパネルでそれをダブルクリックして、InspectorのName フィールドを編集します。

フォルダーを削除するには、でそれをダブルクリックしてdeleteを押します。また、削除したいフォルダを右クリックして、コンテキストメニューからDeleteを選択します。

フォルダの構成を整理するにはフォルダを互いの中にドラッグすることができます。

:::note

フォルダは本質的にメタアセットであり、エディター内でアセットの整理を促進するためだけに設計されています。フォルダアセットはビルドから除外され、公開されたビルドのフォルダ構造を構築する際には使用されません。

:::

## アセットの作成とアップロード {#creating-and-uploading-assets}

コンピューターのファイルシステムからアセットパネルにファイルをドラッグして新しいアセットを作成することができます。Editorがアセットをアップロード及びインポートします。

Add Asset (+) アイコンを使用して特定のアセットタイプを作成することもできます。

アセットを選択してDelete Assetアイコンをクリックすると、削除できます。

## アセットの編集 {#editing-assets}

次の特定のテキストベースのアセットはPlayCanvas Script Editorで開いて編集することができます：text, json, shader, html, css, script asset。これを行うには、アセットのサムネイルをダブルクリックします。

## アセットの調査 {#inspecting-assets}

任意のアセットの詳細を確認するには、アセットパネルのサムネイルを選択します。アセットの詳細がInspectorに表示されます。

## フィルタリング (Filtering) {#filtering}

フィルタドロップダウンから表示させるアセットの種類を選択して表示されているアセットをフィルタします。

## 検索 {#searching}

検索ボックスを使用して、プロジェクト内のアセットのグローバル検索を実行することができます。ボックスに入力し始めると、Editorは一致する結果を動的にアセットパネルで表示します。

**ID** - 特定のアセットを固有のIDで検索することができます。検索フィールドにIDを入力するだけで正確な一致が認識され、そのIDを持つひとつのアセットが表示されます。

**RegExp** - 正規表現を使用して検索することもできます。検索フィールドの先頭に `*` を追加し、後ろにregexpクエリを入力してください。すべてのアセットを検索するには `*.`(任意の文字の)正規表現クエリを使用します。

**Tags** - タグとその組み合わせから検索するには、大括弧`[ ]`にタグを入力します。単純なクエリ演算子：AND, ORはクエリを文字列の配列、または文字列を持つ他の配列として表現することによって可能になります。クエリのロジックは、 `AssetsRegistry`の[`findByTag`][7]と同じです。
いくつかの例を示します：

- - `[ level-1 ]` - `level-1`によってタグ付けされたすべてのアセットを返します。
- - `[ level-1, level-2 ]` - `level-1 OR level-2`によってタグ付けされたすべてのアセットを返します。
- - `[ [ level-1, monster ] ]` - `level-1 AND monster`によってタグ付けされたすべてのアセットを返します。 角括弧の数に注意してください。
- - `[ [ level-1, monster ], [ level-2, monster ] ]` - `(level-1 AND monster) OR (level-2 AND monster)`によってタグ付けされたすべてのアセットを返します。

## ドラッグ＆ドロップ {#drag-and-drop}

アセットは、メインパネルからフォルダ階層内のフォルダにドラッグして別のフォルダに移動することができます。アセットは複数選択に対応しています。CTRL+ Aで、現在選択されているフォルダ内のすべてのアセットを選択します。

アセットパネルから、[Inspector][2]でハイライトされたスロットにアセットをドラッグすることもできます。Inspectorのスロットは、コンポーネントのアセット属性またはアセットタイプのスクリプト属性のどちらかになります。

モデル、マテリアル、キューブマップなどのアセットを直接 [ビューポート][3]にドラッグすることもできます。

- ビューポートにモデルアセットをドラッグすると、モデルアセットが割り当てられたモデルコンポーネントを有する新しいエンティティが作成されます。ビューポートのカメラは自動的に新しく作成されたエンティティにズームします。
- ビューポート内の特定のメッシュインスタンスの上にマテリアルをドラッグすると、マテリアルは(プレビューとして)ドラッグされるマテリアルに切り替えられます。マテリアルの変更を保持するには、マテリアルをドロップします。
- ビューポートでシーンの背景の上にキューブマップをドラッグすると、キューブマップはシーンのスカイボックスのキューブマップとして割り当てられます。このプロパティは[プロジェクト設定](/user-manual/editor/interface/settings/rendering/)でも設定できます。

## プロジェクト間でのコピーと貼り付け {#copy-and-paste-between-projects}

プロジェクト間でアセットまたは複数のアセットをコピーするには、アセットを選択し、右クリックしてコンテキストメニューを表示し、 'Copy' を選択します。読み取り専用のプロジェクトの場合、コンテキストメニューが使用できない場合は、代わりにホットキーCtrl/Cmd + Cを使用することもできます。

<img loading="lazy" src="/img/user-manual/editor/assets-panel/right-click-copy.png" alt="Right click copy menu" width="500" />

アセットをコピーしたいプロジェクトで、アセットパネルを右クリックし、 'Paste' を選択します。Ctrl/Cmd + Vのホットキーを使用することもできます。これにより、アセットがコピー先のプロジェクトに貼り付けられます。

<img loading="lazy" src="/img/user-manual/editor/assets-panel/right-click-paste.png" alt="Right click paste menu" width="500" />

アセットのコピーと貼り付けでは、アセットに関連する依存関係もコピーされます。例えば、モデルが2つのマテリアルを参照し、それらのマテリアルが一連のテクスチャを参照している場合、それらの依存関係もコピーされます。

<img loading="lazy" src="/img/user-manual/editor/assets-panel/copy-and-paste-model-with-dependencies.png" alt="Model example" width="100%" />

別のプロジェクトにModelアセットをコピー＆ペーストする場合、そのアセットの依存関係も一緒にコピーされます。

<img loading="lazy" src="/img/user-manual/editor/assets-panel/pasted-reference-assets.png" alt="Pasted referenced assets" width="100%" />

デフォルトでは、フラットなヒエラルキーで貼り付けられます。もしフォルダ構造を維持したい場合は、コンテキストメニューが開かれたときにShiftキーを押し続けると、'Paste (keep folders)' というオプションが表示されます。これにより、貼り付け先のフォルダをルートフォルダとしてフォルダ構造を維持しようとします。

<img loading="lazy" src="/img/user-manual/editor/assets-panel/right-click-paste-keep-folders.png" alt="Right click paste (keep folders) menu" width="500" />

以下のように、フォルダ構造が保持された結果となります。

<img loading="lazy" src="/img/user-manual/editor/assets-panel/pasted-assets-keep-folders.png" alt="Pasted referenced assets with folders" width="100%" />

一般的には、再利用可能なライブラリやアセットにこの機能を使用する場合は、他のプロジェクトに簡単にコピー＆ペーストできるよう、ルートレベルのフォルダに収めることをおすすめします。これにより、プロジェクトのフォルダ構造がシンプルで整理された状態を保つことができます。

:::note

注意点として、アセットのコピー＆ペーストは、同じ名前の既存のアセットを上書きせず、新しいアセットを作成します。

:::

## 参照の確認 {#checking-references}

特定のシーン内でアセットが使用されている(または参照されている)場所を知ることが有用な場合もあります。エディターがアセットの参照を検出できない場合、サムネイルに小さい点が表示されます。

![Unreferenced Asset](/img/user-manual/editor/assets-panel/unreferenced-asset.png)

:::warning

Editorはコードで作成されたアセットの参照を検出できません。アセットを削除する際は注意が必要です。

:::

アセットに参照がある場合は、Referencesコンテンツメニュー項目を使用して参照することができます。

![Asset References](/img/user-manual/editor/assets-panel/asset-references.png)

参照を選択するとインスペクターパネルに読み込まれます。

[2]: /user-manual/editor/interface/inspector
[3]: /user-manual/editor/interface/viewport
[7]: https://api.playcanvas.com/engine/classes/AssetRegistry.html#findbytag
