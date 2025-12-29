---
title: Anim
---

Animコンポーネントは、Animstategraphアセットとその必要なアニメーションアセットを1つのエンティティに接続するために使用されます。

以下では、Animコンポーネントがコンポーネントに追加された後の様子が表示されます。Animstategraphアセットを選択するための利用可能なスロットが表示されます。

![New Anim Component](/img/user-manual/anim/new_anim_component.png)

Animstategraphアセットを選択すると、Animコンポーネントにアニメーションアセットスロットのリストが表示されます。ステートグラフアセットの各レイヤーの各アニメーションステートに対応するスロットが1つずつあります。これにより、実際のアニメーションデータが以前に作成したステートグラフに接続されます。複数のAnimコンポーネントが同じAnimstategraphアセットを使用でき、それぞれが独自のアニメーションアセットを持つことができます。

![Anim Component With Graph](/img/user-manual/anim/anim_component_with_graph.png)

After all animation state slots have been filled, the anim component will become playable. At this point the anim component can either be played via script by calling `entity.anim.playing = true` or if the `Activate` option is selected, it will play automatically upon the launch of the PlayCanvas project.

Animコンポーネントには、アニメーション再生速度を変更するオプションも用意されています。この速度は、ステートグラフ内のすべてのアニメーションに影響します。
