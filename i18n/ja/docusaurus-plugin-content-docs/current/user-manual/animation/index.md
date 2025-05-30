---
title: アニメーション
sidebar_position: 13
---

PlayCanvasは、キャラクターモデルや他の任意のシーンオブジェクトモデルのアニメーションを作成するために使用できる、強力な状態ベースのアニメーションシステムを提供しています。ユーザーは、.FBXアニメーションアセットを使用できます。これらはアニメーションステートマシンを使用して整理し、シーンモデルのアニメーション動作を実行時に簡単に制御できます。

## 概要

アニメーションシステムは、PlayCanvasプラットフォームの3つの主要な領域に関連しています。このセクションでは、これらの領域を一緒に使用して、モデルの複雑なアニメーション動作を作成する方法について説明します。次のアニメーションユーザーマニュアルのセクションでは、各領域を詳しく説明します。

### PlayCanvasでのアニメーション作成

PlayCanvasエンティティをアニメーション化するには、使用可能なアニメーションアセットのセットが必要で、PlayCanvasプロジェクトにインポートする必要があります。これらのアニメーションアセットは、アニメーションをアニメートするモデルのアニメーションを駆動します。たとえば、人型キャラクターは、Idle、Walk、Jumpのセットのアニメーションを持つ場合があります。

![Animations](/img/user-manual/anim/animations.gif)

これらの3つのアニメーションを単一のアニメーションシステムに編成して、そのキャラクターの簡単な移動システムを作成できます。PlayCanvasでこれを実現する方法は、Animstategraphアセットを使用することです。このアセットは、エンティティのアニメーション動作の状態マシンと考えることができます。このアセットの各状態がアニメーションに関連しているため、状態マシンは、エンティティのモデルの複雑なアニメーション動作を定義するために設定できます。これには、システムが1つのアニメーションを停止して別のアニメーションを開始するタイミングや、これらのアニメーションの遷移をどのようにブレンドするかの定義が含まれます。

次に、Animコンポーネントを使用して、特定のエンティティにAnimstategraphアセットを割り当てます。エンティティにAnimstategraphアセットが割り当てられると、グラフの各状態に実際のアニメーションアセットが割り当てられる場合があります。すべての状態にアニメーションが割り当てられたら、Animコンポーネントは再生可能になります。この時点で、アニメーションシステムが完了し、定義されたアニメーション動作がPlayCanvasランチャーで表示されます。
