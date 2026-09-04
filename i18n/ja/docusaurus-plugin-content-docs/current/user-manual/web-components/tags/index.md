---
title: タグリファレンス
description: "PlayCanvas Web Componentのタグをアルファベット順に一覧し、各要素の属性と使い方の詳細ドキュメントへ短い要約でリンクします。"
---

以下は、PlayCanvas Web Components で利用可能なタグの完全なリストです。

すべてのタグの属性は同じ値の規約を共有します。属性が存在しない（または削除された）場合はエンジンのデフォルト値が適用され、無効な値はコンソール警告をログに出力してデフォルト値にフォールバックします。Boolean、数値、列挙型、ベクトル、カラーの記述方法については[属性](../attributes.md)を参照してください。

タグには配置ルールもあります。各タグのページに必要な親要素が記載されています。誤った場所に配置された要素は、受け付ける親要素の名前を含むコンソール警告をログに出力するため、オーサリング中はコンソールを開いておいてください。

エンジンのエンティティを表すタグは3つあり、コンポーネントタグはそのいずれの内側にも置けます。[`<pc-entity>`](pc-entity)、[`<pc-model>`](pc-model)、[`<pc-node>`](pc-node)です。つまり、モデルの内側に置いたコンポーネントはそのモデルに取り付けられ、ノードの内側に置いたコンポーネントはそのノードに取り付けられます。どちらもエンティティと同じコンポーネントの子を取ります。

:::note[コンポーネントタグは、それが追加するエンジンのコンポーネントを名前で表します]

`pc-`プレフィックスを外し、ハイフンを取り除くと、エンジンのコンポーネントIDになります。`<pc-layout-group>`は`entity.layoutgroup`を、`<pc-rigid-body>`は`entity.rigidbody`を、`<pc-audio-listener>`は`entity.audiolistener`を追加します。このルールは以下のすべてのコンポーネントタグで双方向に成り立つため、どちらの綴りも暗記する必要はありません。エンジンのIDが単語を続けて書くのは、それがハイフンを含められないJavaScriptのプロパティ名だからにすぎません。HTMLのタグにはその制約がありません。

:::

繰り返し可能な子要素は、親のタグをプレフィックスとして取ります。[`<pc-anim>`](pc-anim)の中の[`<pc-anim-clip>`](pc-anim-clip)、[`<pc-sound>`](pc-sound)の中の[`<pc-sound-slot>`](pc-sound-slot)、[`<pc-script>`](pc-script)の中の[`<pc-script-instance>`](pc-script-instance)です。

[`<pc-material>`](pc-material)を除くすべてのタグは非同期に初期化され、初期化が完了すると`ready`イベントを発火します。そのタイミングと、これをラップする`whenReady()`ヘルパーについては[`ready`イベント](../programmatic-access.md#the-ready-event)を参照してください。各タグのページのイベントセクションには、そのタグに固有のイベントのみを記載しています。

| タグ | 説明 |
| --- | --- |
| [`<pc-anim>`](pc-anim) | アニメーションクリップを再生するアニメーションコンポーネントを定義します。 |
| [`<pc-anim-clip>`](pc-anim-clip) | アニメーションコンポーネントに割り当てる1つのクリップを定義します。 |
| [`<pc-app>`](pc-app) | アプリケーションのルート要素を定義します。 |
| [`<pc-asset>`](pc-asset) | アプリケーションによってロードされるアセットを定義します。 |
| [`<pc-audio-listener>`](pc-audio-listener) | オーディオリスナーコンポーネントを定義します。 |
| [`<pc-button>`](pc-button) | ボタンコンポーネントを定義します。 |
| [`<pc-camera>`](pc-camera) | シーンのレンダリングに使用されるカメラを定義します。 |
| [`<pc-collision>`](pc-collision) | トリガーとリジッドボディによって使用される衝突コンポーネントを定義します。 |
| [`<pc-element>`](pc-element) | テキスト、画像、またはグループユーザーインターフェース要素を定義します。 |
| [`<pc-entity>`](pc-entity) | エンティティを定義します。 |
| [`<pc-gsplat>`](pc-gsplat) | 3D Gaussian Splats をレンダリングする gsplat コンポーネントを定義します。 |
| [`<pc-joint>`](pc-joint) | 2つのリジッドボディを拘束する物理ジョイントを定義します。 |
| [`<pc-layout-child>`](pc-layout-child) | レイアウトの子コンポーネントを定義します。 |
| [`<pc-layout-group>`](pc-layout-group) | レイアウトグループコンポーネントを定義します。 |
| [`<pc-light>`](pc-light) | ライトコンポーネントを定義します。 |
| [`<pc-material>`](pc-material) | レンダーコンポーネントが参照できるマテリアルを定義します。 |
| [`<pc-model>`](pc-model) | GLBファイルから3Dモデルをインスタンス化するエンティティを定義します。 |
| [`<pc-node>`](pc-node) | 読み込まれたモデル内のノードにバインドしてオーバーライドします。 |
| [`<pc-particle-system>`](pc-particle-system) | パーティクルシステムコンポーネントを定義します。 |
| [`<pc-render>`](pc-render) | レンダーコンポーネントを定義します。 |
| [`<pc-rigid-body>`](pc-rigid-body) | リジッドボディコンポーネントを定義します。 |
| [`<pc-scene>`](pc-scene) | シーンを定義します。 |
| [`<pc-screen>`](pc-screen) | 要素コンポーネントをレンダリングできるスクリーンコンポーネントを定義します。 |
| [`<pc-script>`](pc-script) | スクリプトコンポーネントを定義します。 |
| [`<pc-script-instance>`](pc-script-instance) | スクリプトコンポーネントに割り当てられる単一のスクリプトを定義します。 |
| [`<pc-scrollbar>`](pc-scrollbar) | スクロールバーコンポーネントを定義します。 |
| [`<pc-scroll-view>`](pc-scroll-view) | スクロールビューコンポーネントを定義します。 |
| [`<pc-sky>`](pc-sky) | 画像ベースのスカイボックスを定義します。 |
| [`<pc-sound>`](pc-sound) | サウンドコンポーネントを定義します。 |
| [`<pc-sound-slot>`](pc-sound-slot) | サウンドコンポーネントに割り当てられる単一のサウンドを定義します。 |
| [`<pc-wasm>`](pc-wasm) | WebAssemblyモジュールを定義します。 |
