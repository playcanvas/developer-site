---
title: 最初のモデルとアニメーションのインポート方法
tags: [animation,basics]
thumb: /img/tutorials/importing-first-model-and-animation/thumbnail.webp
description: 無料のリグ付きキャラクターをエディターにインポートしてシーンに追加し、Anim コンポーネントでループする走りのアニメーションを再生します。
---

import StepVideo from '@site/src/components/StepVideo';

このチュートリアルでは、リグ付きのキャラクターとそのアニメーションを PlayCanvas エディターにインポートし、キャラクターをシーンに追加して、その場で走らせます。完成するとこのようになります。

<StepVideo src="/video/tutorials/importing-first-model-and-animation/preview.mp4" poster="/img/tutorials/importing-first-model-and-animation/preview.webp" width={960} height={540} label="起動したシーンでその場で走る Knight キャラクター" />

:::info[始める前に]

無料の [PlayCanvas アカウント](https://login.playcanvas.com/signup)が必要です。[初めてのアプリ](/user-manual/editor/getting-started/your-first-app/#create-a-project)と同じように **Blank Project** スターターキットから新しいプロジェクトを作成し、エディターで開きます。次に、キャラクターが隠れないように、Hierarchy で **Box** エンティティを選択して <kbd>Delete</kbd> を押します。

:::

## サンプルアセットの入手 {#getting-the-example-assets}

このチュートリアルでは、Kay Lousberg による [KayKit Character Pack: Adventurers](https://kaylousberg.itch.io/kaykit-adventurers) を使用します。無料版はパブリックドメインのライセンスである [CC0](https://creativecommons.org/publicdomain/zero/1.0/) で公開されているため、クレジットを表記せずにどのプロジェクトでも使用できます。

1. パックのページで **Download Now** を選択します。
2. このパックは価格を自分で決められます。無料でダウンロードするには、 **No thanks, just take me to the downloads** を選択します。
3. **Free** 版の `KayKit_Adventurers_2.0_FREE.zip` をダウンロードします。

ファイルを解凍します。パックには複数の形式が含まれています。このチュートリアルでは、`gltf` フォルダーにある glTF バイナリ (`.glb`) ファイルを使用します。これは [PlayCanvas が推奨する形式](/user-manual/assets/supported-formats/)です。

```none
KayKit_Adventurers_2.0_FREE/
├── Characters/
│   └── gltf/
│       ├── Barbarian.glb
│       ├── Knight.glb
│       └── ...
└── Animations/
    └── gltf/
        └── Rig_Medium/
            ├── Rig_Medium_General.glb
            └── Rig_Medium_MovementBasic.glb
```

キャラクターとアニメーションは別々のファイルに分かれています。すべてのキャラクターが `Rig_Medium` という同じスケルトンを共有しているため、パック内のどのアニメーションもどのキャラクターでも使えます。

## モデルのインポート {#importing-the-model}

まずは Knight から始めましょう。

1. Assets パネルで **+** を選択し、 **Upload** を選択します。ファイルをコンピューターから Assets パネルにドラッグすることもできます。
2. `Characters/gltf/Knight.glb` を選択します。

<StepVideo src="/video/tutorials/importing-first-model-and-animation/importing-model.mp4" poster="/img/tutorials/importing-first-model-and-animation/importing-model.webp" label="Assets パネルの + メニューから Knight.glb をアップロードする。インポートによって Knight.glb フォルダーにアセットが作成される" />

エディターはファイルを新しい `Knight.glb` フォルダーにインポートし、次のアセットを作成します。

- **Knight** : テンプレートアセットです。キャラクターのエンティティヒエラルキー全体を保持しており、キャラクターをシーンに追加するときに使います。
- **Knight.glb** : インポートしたモデルデータを保持するコンテナアセットです。
- **knight** : マテリアルアセットです。
- **knight_texture.png** : テクスチャアセットです。テクスチャが GLB ファイルに埋め込まれていたため、インポート時にマテリアルにも割り当てられています。
- キャラクターのメッシュの各パーツのレンダーアセット ( **Knight_Body** や **Knight_Helmet** など) 。

元の `Knight.glb` ファイルも、ソースアセットとして保存されます。

:::tip

既存のプロジェクトにモデルをインポートする場合は、[Toolbar](/user-manual/editor/interface/toolbar/) の歯車アイコンを選択して **Settings** を開き、 **Asset Import** セクションで **Import Hierarchy** と **Create FBX Folder** にチェックが入っていることを確認してください。Import Hierarchy はテンプレートアセットを作成し、Create FBX Folder はモデルの形式にかかわらず、インポートしたアセットを専用のフォルダーにまとめます。FBX ファイルの場合は、 **Convert to GLB** にもチェックを入れてください。すべての設定については、[Asset Import 設定](/user-manual/editor/interface/settings/asset-import/)を参照してください。

![Settings の Asset Import セクションにある Model Import Settings](/img/tutorials/importing-first-model-and-animation/asset-import-settings.webp)

:::

## モデルのテンプレートをシーンに追加 {#adding-the-model-template-to-the-scene}

テンプレートアセット (他のゲームエンジンではプレハブと呼ばれます) を使うと、キャラクター全体を一度にシーンに追加できます。インスタンスを追加する方法はいくつかあります。

テンプレートを Viewport にドラッグします。

<StepVideo src="/video/tutorials/importing-first-model-and-animation/template-add-scene-view.mp4" poster="/img/tutorials/importing-first-model-and-animation/template-add-scene-view.webp" label="Assets パネルから Knight テンプレートを Viewport にドラッグする" />

または、Hierarchy の空いている領域にドラッグすると、最上位のエンティティである **Root** の子として追加されます。Hierarchy 内のエンティティの上にドロップすると、そのエンティティの子として追加されます。

<StepVideo src="/video/tutorials/importing-first-model-and-animation/template-add-hierarchy.mp4" poster="/img/tutorials/importing-first-model-and-animation/template-add-hierarchy.webp" label="Knight テンプレートを Hierarchy の空いている領域にドラッグする" />

または、Hierarchy でエンティティを右クリックし、 **Template** 、 **Add Instance** の順に選択して、Assets パネルでテンプレートを選びます。インスタンスは右クリックしたエンティティの子として追加されます。

<StepVideo src="/video/tutorials/importing-first-model-and-animation/template-add-context-menu.mp4" poster="/img/tutorials/importing-first-model-and-animation/template-add-context-menu.webp" label="Root を右クリックして Template と Add Instance を選択し、Knight テンプレートを選ぶ" />

どの方法を使っても構いませんが、シーンに追加する Knight は 1 体だけにしてください。テンプレートの詳細については、[テンプレート](/user-manual/editor/templates/)を参照してください。

## マテリアルとテクスチャの確認 {#checking-the-material-and-texture}

テクスチャが `Knight.glb` に埋め込まれていたため、Knight にはすでにテクスチャが付いています。Assets パネルで **knight** マテリアルを選択すると、Inspector で確認できます。テクスチャは **Diffuse** セクションにあります。

<StepVideo src="/video/tutorials/importing-first-model-and-animation/material-texture.mp4" poster="/img/tutorials/importing-first-model-and-animation/material-texture.webp" label="knight マテリアルを選択する。Inspector の Diffuse スロットに knight_texture.png が表示される" />

すべてのモデルファイルにテクスチャが含まれているわけではありません。たとえば FBX ファイルでは、テクスチャが別の画像ファイルになっていることがよくあり、テクスチャなしでインポートしたモデルは真っ白に見えます。その場合は画像ファイルもアップロードし、各テクスチャをマテリアルに追加します。Inspector でテクスチャアセットをマテリアルのスロットにドラッグするか、スロットの鉛筆 (編集) ボタンを選択して Assets パネルでテクスチャを選びます。マテリアルの詳細については、[Material Inspector](/user-manual/editor/assets/inspectors/material/) を参照してください。

## アニメーションのインポート {#importing-the-animations}

アニメーションは別のファイルに入っています。インポートするには、Assets パネルのルートフォルダー ( **/** ) に戻り、もう一度 **+** と **Upload** を選択して、`Animations/gltf/Rig_Medium/Rig_Medium_MovementBasic.glb` を選択します。

<StepVideo src="/video/tutorials/importing-first-model-and-animation/importing-animation.mp4" poster="/img/tutorials/importing-first-model-and-animation/importing-animation.webp" label="Rig_Medium_MovementBasic.glb をアップロードする。ファイル内の各クリップのアニメーションアセットが作成される" />

インポートによって、 **Running_A.glb** 、 **Walking_A.glb** 、 **Jump_Full_Long.glb** など、ファイル内の各クリップのアニメーションアセットが作成されます。

このファイルには、アニメーションを表示するためのマネキンキャラクターも含まれています。これは必要ないので、そのアセットは削除して構いません。Assets パネルを **Details** ビュー (リストのアイコン) に切り替えると、各アセットの種類を確認できます。 **Character_Material** 、6 つの **Mannequin_** レンダーアセット、 **Rig_Medium_MovementBasic** テンプレート、 **Rig_Medium_MovementBasic.glb** コンテナを選択します。複数選択するには <kbd>Ctrl</kbd>-click （macOS では <kbd>Cmd</kbd>-click）します。次に <kbd>Delete</kbd> を押して **Delete** を選択します。アニメーションアセットと **Model (source)** アセットは残してください。

<StepVideo src="/video/tutorials/importing-first-model-and-animation/delete-extra-assets.mp4" poster="/img/tutorials/importing-first-model-and-animation/delete-extra-assets.webp" label="Details ビューでマネキンのマテリアル、レンダー、テンプレート、コンテナのアセットを選択して削除する" />

アニメーションをプレビューするには、Assets パネルでアニメーションを選択します。Inspector で再生するにはキャラクターが必要です。 **Preview Asset** の鉛筆 (編集) ボタンを選択し、`Knight.glb` フォルダーを開いて **Knight** テンプレートを選びます。

<StepVideo src="/video/tutorials/importing-first-model-and-animation/animation-preview.mp4" poster="/img/tutorials/importing-first-model-and-animation/animation-preview.webp" label="Running_A.glb を選択し、Preview Asset に Knight テンプレートを選ぶ。Inspector で Knight が走る" />

## モデルのアニメーション {#animating-the-model}

キャラクターでアニメーションを再生するには、Anim State Graph アセットと、キャラクターのエンティティの Anim コンポーネントが必要です。

グラフを作成するには、Assets パネルで **+** を選択し、 **Anim State Graph** を選択します。エディターが **New Anim State Graph** アセットを作成します。

<StepVideo src="/video/tutorials/importing-first-model-and-animation/create-anim-state-graph.mp4" poster="/img/tutorials/importing-first-model-and-animation/create-anim-state-graph.webp" label="Assets パネルの + メニューから Anim State Graph アセットを作成する" />

ステートグラフには複数のステートを持たせることができ、各ステートがアニメーションを再生します。ステート間の流れは、条件付きのトランジションによって制御されます。新しいグラフには、ループする **Initial State** というステートが 1 つだけあります。Inspector で **Open Graph Editor** を選択すると確認できます。

![グラフエディターの新しいグラフ。START から loop にチェックが入った Initial State につながっている](/img/tutorials/importing-first-model-and-animation/anim-state-graph.webp)

このチュートリアルで必要なのは、1 つのアニメーションを持つこのステートだけです。ステート、トランジション、パラメーターについては、[ステートグラフ](/user-manual/animation/state-graphs/)と [アニメーション](/user-manual/animation/)セクションのほかのページを参照してください。

次に、キャラクターに Anim コンポーネントを追加します。

1. Hierarchy で **Knight** エンティティを選択します。
2. Inspector で **Add Component** を選択し、 **Animation** 、 **Anim** の順に選択します。

<StepVideo src="/video/tutorials/importing-first-model-and-animation/add-anim-component.mp4" poster="/img/tutorials/importing-first-model-and-animation/add-anim-component.webp" label="Add Component メニューから Knight エンティティに Anim コンポーネントを追加する" />

次に、コンポーネントにグラフとアニメーションを設定します。

1. **New Anim State Graph** アセットをコンポーネントの **State Graph** スロットにドラッグします。グラフのステートがコンポーネントに表示されます。
2. `Rig_Medium_MovementBasic.glb` フォルダーを開き、 **Running_A.glb** を **Initial State** スロットにドラッグします。

<StepVideo src="/video/tutorials/importing-first-model-and-animation/add-animation-to-anim.mp4" poster="/img/tutorials/importing-first-model-and-animation/add-animation-to-anim.webp" label="ステートグラフを State Graph スロットに、Running_A.glb を Initial State スロットにドラッグする" />

Knight エンティティはテンプレートのインスタンスなので、Inspector では新しいコンポーネントがテンプレートに対するオーバーライドとして表示されます。オーバーライドのままでも構いませんし、 **Apply All** を選択してコンポーネントをテンプレートにも保存することもできます。

Viewport の右上にある **Launch** を選択します。シーンが新しいタブで開き、Knight がその場で走ります。

以上です！最初のモデルとループするアニメーションを PlayCanvas にインポートできました。 **Walking_A.glb** などパック内のほかのアニメーションを **Initial State** スロットにドラッグして試したり、パックから別のキャラクターをインポートして専用の Anim コンポーネントを追加したりしてみましょう。
