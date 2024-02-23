---
title: ヒエラルキー (Hierarchy)
sidebar_position: 2
---

![Hierarchy Panel](/img/user-manual/editor/hierarchy/hierarchy-panel.png)

ヒエラルキーパネルは、シーン全体のツリービューを表示し、エンティティの階層から構成されます。シーンには常にツリーのトップにあるルートエンティティが含まれます。ここに表示される他のすべてのエンティティは、開発者によって追加されたものです。

ヒエラルキーパネルはエンティティを迅速に検索するのに非常に便利です。シーン内のすべてのエンティティが常に表示されるため、クリックするだけで選択できます。

## エンティティの作成と削除

ヒエラルキーでエンティティを選択したら、新しい子エンティティを作成したり、選択を削除したりすることができます。これは、ヒエラルキーパネル上部のボタンを使用するか、右クリック操作でコンテキストメニューを開くことで行うことができます。

## ヒエラルキーの整理

ツリー ビューにエンティティがリストされる順序は重要です。 シーンは階層であるため、エンティティは別のエンティティ (その *親* ) の *子* になることができ、親エンティティの変換行列がそのすべての子に適用されます。 親エンティティを移動または回転すると、すべての子が親の下で移動または回転します。 これは、多くのエンティティの操作を簡素化するのに非常に役立ちます。

ヒエラルキーの構造はドラッグアンドドロップで編集できます。ヒエラルキー内の任意のエンティティを選択してドラッグするだけで、エンティティを素早く並べ替えたり、再配置したりできます。エディター内でエンティティを再配置すると、そのエンティティの変換は保持されるため、新しい親を変更した後にエンティティが移動したり回転したりすることはありません。この動作を望まない場合、Ctrl(またはMacのCmd)を押します。

## ヒエラルキーの検索

Near the top of the Hierarchy panel is a Search box which you can use to dynamically filter the content of the Entity tree. 

![Hierarchy Panel Search](/img/user-manual/editor/hierarchy/hierarchy-search.png)

By default, the search will filter based on entity names with 'Smart Search' enabled. Smart Search is fuzzy, which means it matches names that are similar to the search string rather than exactly the same. This is useful if you can't quite remember the name of the Entity you are searching for.

You can customize the search by clicking the magnifying glass:

![Hierarchy Panel Search Options](/img/user-manual/editor/hierarchy/hierarchy-search-options.png)

## エンティティの複製

エンティティを選択し、Ctrl + D(またはMacのCmd + D)を押すか、右クリックしてDuplicateを選択することで、エンティティを複製できます。各エンティティのコピーは、元のエンティティの隣に作成されます。

## エンティティのコピー/貼り付け

新しい親の下にエンティティを貼り付けたい場合は、選択してコピーするためにCtrl + C(またはMacのCmd + C)を押し、新しい親を選択した後、Ctrl + V(またはMacのCmd + V)を押して貼り付けることができます。選択したエンティティ上で右クリックしてコピーと貼り付けのオプションを使用することもできます。

異なるシーンやプロジェクト間でエンティティをコピー/貼り付けすることもできます。エンティティをコピーするために同じ手順を実行し、必要なシーンに移動して、目的の親を選択してエンティティを貼り付けます。エディターは、新しいプロジェクトのパスでマッチするアセット参照を元のエンティティにもたらします。たとえば、Modelコンポーネントを持つEntityをコピーし、ツリー内で `mymodel.fbx` というModel Assetを参照している場合、そのエンティティを別のプロジェクトに貼り付けると、エディターは同じフォルダー内に `mymodel.fbx` という名前のアセットを探します。一致するアセットが見つからない場合は、手動で修正できるようにマッチングが解除されます。
