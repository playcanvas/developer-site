---
title: Animレイヤーマスク
---

ゲームオブジェクトに複雑なアニメーション動作を作成する際、特定のアニメーションの再生を各オブジェクトのモデルの特定のボーンに分離することがしばしば必要です。これは、同時に複数のアクションを行う必要があるキャラクターをアニメーション化する際に特に役立ちます。PlayCanvasでは、Animコンポーネントの[アニメーションレイヤー](/user-manual/animation/anim-state-graph-assets/#layers)に対してマスクを作成することでこれを実現できます。

### マスクの作成

Anim State Graphアセットを作成し、Animコンポーネントにアタッチすると、グラフに含まれるレイヤーのリストが表示されます。各レイヤーパネルの下にある **Create Mask** ボタンをクリックすることで、これらのレイヤーのいずれかにマスクを作成することができます。

![Anim Component Create Mask](/img/user-manual/animation/anim-component-create-mask.png)

これにより、下記に示すレイヤーのマスクインスペクターが開きます。

![Mask Inspector](/img/user-manual/animation/anim-mask-inspector.png)

マスクインスペクターは、Animコンポーネントが駆動する完全なヒエラルキーを表示します。これは、Animコンポーネントで指定された`root bone`から始まります。ヒエラルキー内の各ボーンは、マスクに含めるために選択することができます。また、特定のボーンを右クリックして、ヒエラルキーの全セクションを含めたり除外したりすることもできます。このマスクで選択されていないボーンは、このマスクのレイヤーで再生されるアニメーションのいずれにも影響されません。

マスクを作成した後、[レイヤーブレンディング](/user-manual/animation/anim-state-graph-assets/#layer-blending)を使用して、マスクされたアニメーションを複数のレイヤーでスムーズにブレンドできます。
