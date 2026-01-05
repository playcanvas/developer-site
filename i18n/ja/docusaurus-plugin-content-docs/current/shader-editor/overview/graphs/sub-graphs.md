---
title: サブグラフ
sidebar_position: 2
---

シェーダーエディターのグラフの2つ目のタイプは、サブグラフです。

サブグラフは直接マテリアルを定義するのではなく、他の場所で使用できる便利な機能をカプセル化します。

サブグラフにはマテリアルノードは含まれず、代わりに入力ノードと出力ノードを使用してデータを入出力します。サブグラフは、他のサブグラフで使用することも、直接マテリアルグラフで使用することもできます。

サブグラフを循環参照となる方法で接続することは有効ではなく (または可能ではありません) 。例えば、グラフAがグラフBを参照し、グラフBがグラフCを参照している場合、グラフCはAまたはBに戻って参照することはできません。

#### 例

たとえば、これは 2つの float を加算する簡単なサブグラフです。

![Sub Graph Example](/img/shader-editor/overview-graph-sub-graph.png)

このサブグラフが「adder」という名前だった場合、アセットパネルに次のように表示されます。

![Sub Graph Icon](/img/shader-editor/overview-graph-sub-graph-icon.png)

その後、adderサブグラフは他のグラフでノード自体として配置することができます。

![Place Sub Graph](/img/shader-editor/overview-graph-place-sub-graph.gif)

グラフの編集方法については、[グラフエディター](/shader-editor/window-layout/graph-editor)のドキュメントを参照してください。
