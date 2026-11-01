---
title: アニメーション
description: "PlayCanvasが、Animコンポーネント、ステートグラフ、ブレンドツリー、レイヤー、マスク、イベントを使って、キャラクターや機械、そのほかあらゆるエンティティの階層でアニメーションクリップを再生する仕組みを、エンジン、エディター、React、Web Componentsのそれぞれについて説明します。"
---

PlayCanvasは、エンティティの階層で**アニメーションクリップ**を再生することで、その階層をアニメーションさせます。クリップは、名前の付いたノードのプロパティについて、時間に沿ったキーフレームをまとめたものです。対象になるのは、キャラクターのボーン、機械の部品、あるいはライトの色のようなコンポーネントのプロパティです。**Animコンポーネント**は、そのエンティティの下にある階層でクリップを再生します。このセクションのほかの内容は、すべてこのコンポーネントの上に成り立っています。

<EngineExample src="https://playcanvas.github.io/web-components/examples/#glb-animation.html" thumbnail="/img/user-manual/animation/t-rex.jpg" title="GLB Animation" />

上のT-Rexを読み込むと、ドラッグでその周りを回れます。これは[Web Componentsのサンプル](https://playcanvas.github.io/web-components/examples/#glb-animation.html)で、アニメーションはすべて、モデルの`<pc-model>`要素の中にある空の`<pc-anim>`要素ひとつから来ています。クリップを宣言していないので、モデル自体のクリップをループ再生します。[各環境での使い方](#on-each-surface)で、同じことを各環境でどう行うかを比べられます。

## アニメーションの仕組み {#how-animation-works}

- **[クリップ](/user-manual/animation/clips/)** は通常、インポートしたモデルに含まれています。GLBや、エディターでインポートしたFBXファイルには、そのアニメーションが付いてきます。また、コードでキーフレームからクリップを作成することもできます。クリップはノード名で対象にバインドするので、1つのクリップで、同じ名前のノードを持つどのモデルでもアニメーションさせられます。
- **[Animコンポーネント](/user-manual/animation/playing-animations/)** は、そのエンティティの下にある階層でクリップを再生します。再生する各クリップは**ステート**に保持され、ステートを切り替えると、コンポーネントがステート間をクロスフェードします。
- **[ステートグラフ](/user-manual/animation/state-graphs/)** は、どのステートを再生するかを決めます。ステートグラフは、ステートと、ステート間の**遷移**、そして`speed`や`jump`トリガーのような、遷移が判定する**パラメーター**からなるステートマシンです。パラメーターをコードから設定すれば、あとはグラフが処理します。
- **[ブレンドツリー](/user-manual/animation/blend-trees/)** は、1つのステートの中で複数のクリップをパラメーターの値に応じてブレンドします。これにより、キャラクターは歩きから走りへ滑らかに移行できます。
- **[レイヤーとマスク](/user-manual/animation/layers-and-masks/)** は、1つのモデルで複数のステートグラフを同時に再生し、それぞれをモデルの一部のノードに限定します。これにより、キャラクターは歩きながら手を振ることができます。
- **[イベント](/user-manual/animation/events/)** は、クリップ内の指定した時間に発火し、足音、エフェクト、ゲームプレイの処理に使えます。

## 各環境での使い方 {#on-each-surface}

Animコンポーネントはどこでも同じですが、環境によって公開されている範囲が異なります。その環境にマークアップやUIが用意されていない機能には、コードからエンジンのコンポーネントを通してアクセスできます。

| | Engine | Editor | React | Web Components |
| --- | --- | --- | --- | --- |
| モデルのクリップを再生する | `entity.anim.assignAnimation()` | Animコンポーネントとステートグラフアセット | `<Anim playing />` | [`<pc-anim>`](/user-manual/web-components/tags/pc-anim/) |
| クロスフェードでクリップを切り替える | `layer.transition()` | ステートグラフの遷移 | エンジンAPI | `clip`属性と`transition-time`属性 |
| ステートグラフとパラメーター | `entity.anim.loadStateGraph()` | Anim State Graphアセットのエディター | エンジンAPI | エンジンAPI |
| ブレンドツリー | ステートグラフのデータ内 | スクリプトからのみ | エンジンAPI | エンジンAPI |
| レイヤーとマスク | `entity.anim.addLayer()` | レイヤーはグラフで、マスクはAnimコンポーネントで | エンジンAPI | エンジンAPI |
| イベント | クリップに`new pc.AnimEvents()` | アニメーションアセットのイベント | エンジンAPI | エンジンAPI |

:::note

Animコンポーネントは、ステートグラフを使わずにクリップを再生する、以前の**Animation**コンポーネントに代わるものです。Animationコンポーネントは現在も動作しますが、新しいプロジェクトではAnimコンポーネントを使ってください。Spineで作成した2Dスケルタルアニメーションについては、[Spine](/user-manual/2D/spine/)を参照してください。

:::

## このセクションの内容 {#in-this-section}

- [アニメーションの再生](/user-manual/animation/playing-animations/) - Animコンポーネントの追加、クリップの再生と切り替え、速度、一時停止、ループ、再生が終わったクリップ。
- [アニメーションクリップ](/user-manual/animation/clips/) - GLBとFBXファイルのクリップ、ノードへのバインドの仕組み、コードでのクリップの作成。
- [ステートグラフ](/user-manual/animation/state-graphs/) - エディターやコードで構築する、ステート、遷移、パラメーター、条件。
- [ブレンドツリー](/user-manual/animation/blend-trees/) - 1つか2つのパラメーター、またはクリップごとのウェイトによるクリップのブレンド。
- [レイヤーとマスク](/user-manual/animation/layers-and-masks/) - 複数のグラフの同時再生、それらのブレンド、マスクによるモデルの一部への限定。
- [アニメーションイベント](/user-manual/animation/events/) - クリップ内の指定した時間でのイベントの発火と、その処理。

## 関連情報 {#see-also}

- [Animコンポーネント](/user-manual/editor/scenes/components/anim/) - エディターでのこのコンポーネントのリファレンス
- [アニメーションアセット](/user-manual/editor/assets/inspectors/animation/) - エディターでのクリップのプレビューと、アニメーションのインポート設定
- [Anim State Graph Blending](/tutorials/anim-blending/) - エディターでブレンドするステートグラフを構築するチュートリアル
- [アニメーションのサンプル](https://playcanvas.com/examples/#/animation/locomotion) - ロコモーション、ブレンドツリー、レイヤーマスク、イベントなどを扱うエンジンのサンプル
- [AnimComponent](https://api.playcanvas.com/engine/classes/AnimComponent.html)と[AnimComponentLayer](https://api.playcanvas.com/engine/classes/AnimComponentLayer.html) - エンジンのAPIリファレンス
