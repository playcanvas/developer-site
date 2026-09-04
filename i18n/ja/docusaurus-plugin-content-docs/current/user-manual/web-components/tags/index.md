---
title: タグリファレンス
description: "PlayCanvas Web Componentsのすべてのタグを役割別にまとめ、タグが構成するドキュメント構造と、各要素の属性、イベント、配置ルールのリファレンスへのリンクを示します。"
---

PlayCanvas Web Components のすべてのタグを、役割別にまとめて掲載します。タグが構成するドキュメント構造を示し、各タグのリファレンスページにリンクします。

## タグの組み合わせ方 {#how-the-tags-fit-together}

どのドキュメントも同じ形をしています。[`<pc-app>`](pc-app) がリソースと1つの [`<pc-scene>`](pc-scene) を保持し、シーンがエンティティを保持し、エンティティが必要な各コンポーネントタグを1つずつと、子エンティティを保持します。

```html
<pc-app>
    <!-- リソースは一度だけ宣言し、id で参照します -->
    <pc-asset id="sky" src="sky.webp"></pc-asset>
    <pc-asset id="robot" src="robot.glb"></pc-asset>
    <pc-material id="gold" diffuse="#d4af37" metalness="1"></pc-material>
    <pc-wasm name="Ammo" glue="ammo.js" wasm="ammo.wasm"></pc-wasm>
    <pc-scene>
        <pc-sky asset="sky"></pc-sky>
        <!-- エンティティは各コンポーネントタグを1つずつ取り、エンティティやモデルをネストできます -->
        <pc-entity name="camera" position="0 2 6">
            <pc-camera></pc-camera>
        </pc-entity>
        <pc-entity name="crate" position="0 3 0">
            <pc-render type="box" material="gold"></pc-render>
            <pc-collision></pc-collision>
            <pc-rigid-body type="dynamic"></pc-rigid-body>
        </pc-entity>
        <!-- モデルは GLB をインスタンス化するエンティティで、ノードはその内側のノードにバインドします -->
        <pc-model asset="robot">
            <pc-anim clip="idle">
                <pc-anim-clip name="idle"></pc-anim-clip>
            </pc-anim>
            <pc-node name="head">
                <pc-light type="spot"></pc-light>
            </pc-node>
        </pc-model>
    </pc-scene>
</pc-app>
```

エンジンのエンティティを表すタグは3つあり、コンポーネントタグはそのいずれの内側にも置けます。[`<pc-entity>`](pc-entity)、[`<pc-model>`](pc-model)、[`<pc-node>`](pc-node)です。モデルの内側に置いたコンポーネントはそのモデルのホストエンティティに取り付けられ、ノードの内側に置いたコンポーネントはバインドされたノードに取り付けられます。どちらもエンティティと同じコンポーネントの子を取ります。

各タグのページに必要な親要素が記載されています。誤った場所に配置された要素は、受け付ける親要素の名前を含むコンソール警告をログに出力するため、オーサリング中はコンソールを開いておいてください。

## 役割別のタグ {#tags-by-role}

### 構造 {#structure}

ドキュメントを形作る5つのタグです。アプリケーション、そのシーン、そしてエンティティを表す3つのタグです。

| タグ | 説明 |
| --- | --- |
| [`<pc-app>`](pc-app) | アプリケーションのルート要素を定義します。グラフィックスデバイスと、保持するリソースおよびシーンです。 |
| [`<pc-scene>`](pc-scene) | シーンを定義します。内側のすべてに適用されるフォグ、露出、重力を持ちます。 |
| [`<pc-entity>`](pc-entity) | エンティティを定義します。コンポーネントタグと子エンティティをホストする、名前付きのトランスフォームです。 |
| [`<pc-model>`](pc-model) | GLBファイルから3Dモデルをインスタンス化するエンティティを定義します。 |
| [`<pc-node>`](pc-node) | 読み込まれたモデル内のノードにバインドしてオーバーライドします。 |

### リソース {#resources}

`<pc-app>` の直接の子です。一度だけ宣言し、利用するタグから `id` で参照します。

| タグ | 説明 |
| --- | --- |
| [`<pc-asset>`](pc-asset) | アプリケーションによってロードされるアセットを定義します。 |
| [`<pc-material>`](pc-material) | レンダーコンポーネントが参照できるマテリアルを定義します。 |
| [`<pc-wasm>`](pc-wasm) | Ammo物理エンジンなどのWebAssemblyモジュールを定義します。 |

### レンダリング {#rendering}

| タグ | 説明 |
| --- | --- |
| [`<pc-camera>`](pc-camera) | シーンのレンダリングに使用されるカメラを定義します。 |
| [`<pc-light>`](pc-light) | ディレクショナル、オムニ、スポットのライトを定義します。影も設定できます。 |
| [`<pc-render>`](pc-render) | マテリアルを付けてプリミティブ形状を描くレンダーコンポーネントを定義します。 |
| [`<pc-gsplat>`](pc-gsplat) | 3D Gaussian Splats をレンダリングする gsplat コンポーネントを定義します。 |
| [`<pc-particle-system>`](pc-particle-system) | JSON設定アセットで駆動するパーティクルシステムを定義します。 |
| [`<pc-sky>`](pc-sky) | 画像ベースのスカイボックスを定義します。 |

### アニメーション {#animation}

| タグ | 説明 |
| --- | --- |
| [`<pc-anim>`](pc-anim) | アニメーションクリップを再生するアニメーションコンポーネントを定義します。 |
| [`<pc-anim-clip>`](pc-anim-clip) | アニメーションコンポーネントに割り当てる1つのクリップを定義します。 |

### 物理 {#physics}

物理には Ammo モジュールが必要です。[`<pc-wasm>`](pc-wasm) で宣言します。

| タグ | 説明 |
| --- | --- |
| [`<pc-collision>`](pc-collision) | トリガーとリジッドボディによって使用される衝突コンポーネントを定義します。 |
| [`<pc-rigid-body>`](pc-rigid-body) | 静的、動的、キネマティックのリジッドボディを定義します。 |
| [`<pc-joint>`](pc-joint) | 2つのリジッドボディを拘束する物理ジョイントを定義します。 |

### ユーザーインターフェース {#user-interface}

[`<pc-screen>`](pc-screen) は、それぞれが [`<pc-element>`](pc-element) を持つエンティティのツリーをホストします。その他のタグは、それらの要素の振る舞いを細かく指定します。

| タグ | 説明 |
| --- | --- |
| [`<pc-screen>`](pc-screen) | 要素コンポーネントをレンダリングできるスクリーンコンポーネントを定義します。 |
| [`<pc-element>`](pc-element) | テキスト、画像、またはグループユーザーインターフェース要素を定義します。 |
| [`<pc-button>`](pc-button) | ホバー、押下、非アクティブの状態を持つボタンコンポーネントを定義します。 |
| [`<pc-layout-group>`](pc-layout-group) | 子要素を行または列に配置するレイアウトグループを定義します。 |
| [`<pc-layout-child>`](pc-layout-child) | レイアウトグループ内での子ごとのサイズ規則を定義します。 |
| [`<pc-scroll-view>`](pc-scroll-view) | コンテンツエンティティの上に載るスクロール可能なビューポートを定義します。 |
| [`<pc-scrollbar>`](pc-scrollbar) | スクロールビューを操作するドラッグ可能なスクロールバーを定義します。 |

### オーディオ {#audio}

| タグ | 説明 |
| --- | --- |
| [`<pc-sound>`](pc-sound) | サウンドスロットを保持するサウンドコンポーネントを定義します。 |
| [`<pc-sound-slot>`](pc-sound-slot) | サウンドコンポーネントに割り当てられる単一のサウンドを定義します。 |
| [`<pc-audio-listener>`](pc-audio-listener) | 位置音源を聴く地点を定義します。 |

### スクリプティング {#scripting}

| タグ | 説明 |
| --- | --- |
| [`<pc-script>`](pc-script) | スクリプトインスタンスをホストするスクリプトコンポーネントを定義します。 |
| [`<pc-script-instance>`](pc-script-instance) | スクリプトコンポーネントに割り当てられる単一のスクリプトを定義します。 |

## 共通の規約 {#shared-conventions}

すべてのタグの属性は同じ値の規約を共有します。属性が存在しない（または削除された）場合はエンジンのデフォルト値が適用され、無効な値はコンソール警告をログに出力してデフォルト値にフォールバックします。各属性テーブルの*タイプ*列は値の書き方を示します。Boolean、Number、Enum、Vector、Color、String、またはアセット・マテリアル・エンティティへの参照です。これらのタイプはすべて[属性](../attributes.md)で定義しています。

:::note[コンポーネントタグは、それが追加するエンジンのコンポーネントを名前で表します]

`pc-`プレフィックスを外し、ハイフンを取り除くと、エンジンのコンポーネントIDになります。`<pc-layout-group>`は`entity.layoutgroup`を、`<pc-rigid-body>`は`entity.rigidbody`を、`<pc-audio-listener>`は`entity.audiolistener`を追加します。このルールはこのページのすべてのコンポーネントタグで双方向に成り立つため、どちらの綴りも暗記する必要はありません。エンジンのIDが単語を続けて書くのは、それがハイフンを含められないJavaScriptのプロパティ名だからにすぎません。HTMLのタグにはその制約がありません。

:::

繰り返し可能な子要素は、親のタグをプレフィックスとして取ります。[`<pc-anim>`](pc-anim)の中の[`<pc-anim-clip>`](pc-anim-clip)、[`<pc-sound>`](pc-sound)の中の[`<pc-sound-slot>`](pc-sound-slot)、[`<pc-script>`](pc-script)の中の[`<pc-script-instance>`](pc-script-instance)です。

[`<pc-material>`](pc-material)を除くすべてのタグは非同期に初期化され、初期化が完了すると`ready`イベントを発火します。そのタイミングと、これをラップする`whenReady()`ヘルパーについては[`ready`イベント](../programmatic-access.md#the-ready-event)を参照してください。各タグのページのイベントセクションには、そのタグに固有のイベントのみを記載しています。

## すべてのタグ（A–Z） {#all-tags-a-z}

[`<pc-anim>`](pc-anim)・[`<pc-anim-clip>`](pc-anim-clip)・[`<pc-app>`](pc-app)・[`<pc-asset>`](pc-asset)・[`<pc-audio-listener>`](pc-audio-listener)・[`<pc-button>`](pc-button)・[`<pc-camera>`](pc-camera)・[`<pc-collision>`](pc-collision)・[`<pc-element>`](pc-element)・[`<pc-entity>`](pc-entity)・[`<pc-gsplat>`](pc-gsplat)・[`<pc-joint>`](pc-joint)・[`<pc-layout-child>`](pc-layout-child)・[`<pc-layout-group>`](pc-layout-group)・[`<pc-light>`](pc-light)・[`<pc-material>`](pc-material)・[`<pc-model>`](pc-model)・[`<pc-node>`](pc-node)・[`<pc-particle-system>`](pc-particle-system)・[`<pc-render>`](pc-render)・[`<pc-rigid-body>`](pc-rigid-body)・[`<pc-scene>`](pc-scene)・[`<pc-screen>`](pc-screen)・[`<pc-script>`](pc-script)・[`<pc-script-instance>`](pc-script-instance)・[`<pc-scrollbar>`](pc-scrollbar)・[`<pc-scroll-view>`](pc-scroll-view)・[`<pc-sky>`](pc-sky)・[`<pc-sound>`](pc-sound)・[`<pc-sound-slot>`](pc-sound-slot)・[`<pc-wasm>`](pc-wasm)
