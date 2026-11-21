---
title: 初めてのアプリ
description: PlayCanvas Editor で小さな物理ゲームを作って公開します。矢印キーで転がすボールで缶のピラミッドを倒しながら、エンティティ、マテリアル、物理、スクリプト、ライブリンク、公開を学びます。
---

import StepVideo from '@site/src/components/StepVideo';

これから 15 分ほどで、ボールを転がして缶のピラミッドに当てる小さな物理ゲーム **Can Knockdown** を作ります。完成したら Web に公開し、誰にでも送れるリンクを手に入れましょう。インストールは不要で、書くコードは 20 行ほどです。

これが完成したゲームです。ゲームをクリックしてから、矢印キーでボールを転がしてみてください。

<div className="iframe-container">
    <iframe src="https://playcanv.as/p/gLOk3TQH/" title="このガイドで作るゲーム Can Knockdown" loading="lazy" allow="fullscreen" allowFullScreen></iframe>
</div>

その過程で、あらゆる PlayCanvas アプリの土台となる考え方を一通り使います。

- **エンティティとコンポーネント**: オブジェクトを作り、形や物理、振る舞いを与えます。
- **マテリアル**: オブジェクトに色を付けます。
- **物理**: オブジェクトを落とし、積み上げ、弾き飛ばします。
- **スクリプト**: キーボードの入力を読み取ります。
- **ライブリンク**: 実行中のゲームを Editor から調整します。
- **公開**: ゲームをオンラインに置きます。

各ステップには、操作をそのまま見せる短い動画があります。動画はスクロールして画面に入ると再生されるので、別のタブで Editor を開いて一緒に進めましょう。

:::info[始める前に]

無料の [PlayCanvas アカウント](https://login.playcanvas.com/signup)とデスクトップのブラウザーが必要です。ゲームは矢印キーで操作するので、キーボードもあると便利です。

:::

## 1. プロジェクトを作成する {#create-a-project}

アプリはすべてプロジェクトの中に作ります。新しいプロジェクトを始めましょう。

1. [プロジェクトダッシュボード](https://playcanvas.com/editor)を開き、**New project** を選択します。
2. スターターキットの **Blank Project** を選びます。
3. 名前を `My First App` にして、**Create project** を選択します。
4. 準備ができたら **Open project** を選択します。Editor が新しいタブで開きます。

<StepVideo src="/video/editor-first-app-create-project.mp4" poster="/img/user-manual/editor/getting-started/your-first-app/create-project.webp" label="プロジェクトダッシュボードで Blank Project スターターキットからプロジェクトを作成する" />

## 2. Editor を見て回る {#find-your-way-around}

Blank Project には、**Camera**、**Light**、**Box**、そして床になる **Plane** からなる小さなシーンが入っています。各部の場所は次のとおりです。

![5 つの主な領域に番号を付けた PlayCanvas Editor](/img/user-manual/editor/getting-started/your-first-app/editor-interface.webp)

1. [**Hierarchy**](/user-manual/editor/interface/hierarchy/): シーン内のすべてのエンティティをツリーで表示します。クリックすると選択できます。
2. [**Viewport**](/user-manual/editor/interface/viewport/): シーンを映す 3D ビューです。
3. [**Inspector**](/user-manual/editor/interface/inspector/): 選択中のもののプロパティを表示します。編集の大半はここで行います。
4. [**Assets**](/user-manual/editor/assets/asset-panel/): マテリアル、スクリプト、テクスチャ、モデルなど、プロジェクトで使うファイルです。
5. [**Toolbar**](/user-manual/editor/interface/toolbar/): 移動、回転、拡大縮小のツールと、公開のボタンがあります。

では Viewport を操作してみましょう。左ボタンでドラッグすると視点が回り、ホイールでズームします。Hierarchy で **Box** を選択し、マウスを Viewport の上に戻して <kbd>F</kbd> キーを押すと、Box にフォーカスします。迷ったときはこれで戻れます。

<StepVideo src="/video/editor-first-app-navigate.mp4" poster="/img/user-manual/editor/getting-started/your-first-app/navigate.webp" label="Viewport で視点を回してズームし、F キーで Box にフォーカスする" />

:::tip

<kbd>Shift</kbd> キーを押しながらドラッグすると、視点を平行移動できます。そのほかの操作は[操作とキーボードショートカット](/user-manual/editor/interface/keyboard-shortcuts/)にまとまっています。

:::

## 3. 缶を作る {#make-a-can}

**エンティティ**は空のオブジェクトで、それ以外のすべては**コンポーネント**が与えます。Box は、形を描く **Render** コンポーネントを持つエンティティです。これを缶に変えましょう。

1. Hierarchy で **Box** を選択します。
2. Inspector で **Name** を `Can` に変更します。
3. **RENDER** コンポーネントの **Type** を **Box** から **Cylinder** に変更します。

缶になりましたが、真っ白です。色やつやは**マテリアル**で付けます。

1. Assets パネルの + ボタンを選択し、**Material** を選びます。
2. Assets パネルで新しいマテリアルを選択し、Inspector で名前を `Can` に変更します。
3. **DIFFUSE** セクションを開き、**Color** のスウォッチをクリックして `E52521` と入力します。
4. **SPECULAR** セクションを開き、**Metalness** を `0.6`、**Glossiness** を `80` にします。
5. Assets パネルのマテリアルを、Viewport の缶の上にドラッグします。

<StepVideo src="/video/editor-first-app-can.mp4" poster="/img/user-manual/editor/getting-started/your-first-app/can.webp" label="Box を、新しいマテリアルで赤い金属の Can に変える" />

## 4. 物理を追加する {#add-physics}

今の缶は、缶の絵にすぎません。2 つの物理コンポーネントを付けると、落ちたり、ぶつかったり、倒されたりする本物のオブジェクトになります。

- **Rigid Body** は質量を与え、物理エンジンがオブジェクトを動かせるようにします。
- **Collision** は、物理エンジンが使う形を与えます。見た目の形とは別のものです。

**Can** を選択して、両方を追加します。

1. **ADD COMPONENT** を選択し、**Physics** > **Rigid Body** を選びます。缶が動けるように、**Type** を **Dynamic** にします。
2. もう一度 **ADD COMPONENT** を選択し、**Physics** > **Collision** を選びます。缶に合うように、**Type** を **Cylinder**、**Height** を `1` にします。
3. 赤い **Ammo module not found** の表示が現れます。**IMPORT AMMO** を選択して、物理エンジンをプロジェクトに追加します。

床に物理がないと、缶は床をすり抜けて落ちてしまいます。**Plane** を選択し、同じ 2 つのコンポーネントを追加します。

1. **Rigid Body** を追加し、**Type** は **Static** のままにします。Static のボディは動きませんが、ほかのボディはそれに衝突します。
2. **Collision** を追加し、**Box** のままにします。**Half Extents** を `4`、`0.5`、`4`、**Position Offset** を `0`、`-0.5`、`0` にします。

<StepVideo src="/video/editor-first-app-physics.mp4" poster="/img/user-manual/editor/getting-started/your-first-app/physics.webp" label="Can と Plane に Rigid Body と Collision を追加し、Ammo をインポートする" />

:::note[この数値の理由]

[コリジョンの形状はエンティティの **Scale** の影響を受けません](/user-manual/physics/collision-shapes/#scale)。Plane は 8 × 8 に拡大されているので、中心から各方向に 4 ずつ広がるボックスで覆えます。オフセットはボックスを高さの半分だけ下げ、上面を床の高さにそろえます。

:::

## 5. 落下テスト {#drop-test}

物理の動きを見てみましょう。**Can** を選択し、緑の矢印を上にドラッグして宙に持ち上げます。次に **Launch**（Viewport 右上の ▶ ボタン）を選択します。シーンが新しいタブで実行され、缶が床に落ちます。

<StepVideo src="/video/editor-first-app-drop-test.mp4" poster="/img/user-manual/editor/getting-started/your-first-app/drop-test.webp" label="Can を床の上に持ち上げ、シーンを起動して落ちるのを見る" />

Editor のタブに戻り、<kbd>Ctrl</kbd>+<kbd>Z</kbd>（macOS では <kbd>Cmd</kbd>+<kbd>Z</kbd>）を押して缶を床に戻します。Editor での操作は、すべて元に戻せます。

## 6. ピラミッドを積む {#stack-the-pyramid}

缶が 1 つでは、的として物足りません。複製はエンティティをコンポーネントごとコピーするので、コピーはどれも最初から赤く、物理も付いています。

1. **Can** を選択したまま、Hierarchy 上部の **Duplicate** ボタンを選択するか、<kbd>Ctrl</kbd>+<kbd>D</kbd>（macOS では <kbd>Cmd</kbd>+<kbd>D</kbd>）を押します。
2. 新しい缶の **Position** を下の表のとおりに設定します。
3. 缶が 6 つになるまで繰り返します。

| 缶 | Position X | Position Y |
| --- | --- | --- |
| 下段 | `-1`、`0`、`1` | `0.5` |
| 中段 | `-0.5`、`0.5` | `1.5` |
| 最上段 | `0` | `2.5` |

Position Z はどの缶も `0` のままです。

<StepVideo src="/video/editor-first-app-pyramid.mp4" poster="/img/user-manual/editor/getting-started/your-first-app/pyramid.webp" label="Can を 5 回複製し、コピーをピラミッドの形に配置する" />

## 7. ボールを作る {#make-the-ball}

ボールは、形を変えた缶です。物理コンポーネントを引き継ぐように、缶を複製して作ります。

1. 缶を選択したまま複製し、コピーの名前を `Ball` に変更します。
2. **Position** を `0`、`0.5`、`3` にして、ピラミッドの手前に置きます。
3. **RENDER** の **Type** を **Sphere** にします。**COLLISION** の **Type** も **Sphere** にします。
4. マテリアルをもう 1 つ作り、名前を `Ball` にします。**DIFFUSE** の **Color** を `1F8FFF`、**SPECULAR** の **Glossiness** を `80` にして、ボールの上にドラッグします。

<StepVideo src="/video/editor-first-app-ball.mp4" poster="/img/user-manual/editor/getting-started/your-first-app/ball.webp" label="缶を複製して、球の形と専用のマテリアルを持つ青い Ball にする" />

## 8. 構図を決める {#frame-the-shot}

プレイヤーに見えるものは **Camera** で決まります。Hierarchy で Camera を選択すると、Viewport の隅にカメラからの映像がライブで表示されます。床の奥に向けましょう。

1. **Position** を `0`、`4`、`9` にします。
2. **Rotation** を `-20`、`0`、`0` にします。

<StepVideo src="/video/editor-first-app-camera.mp4" poster="/img/user-manual/editor/getting-started/your-first-app/camera.webp" label="Camera を配置し、プレビューが更新されるのを見る" />

## 9. 操作をスクリプトで書く {#script-the-controls}

コンポーネントで多くのことができますが、ゲーム固有の振る舞いは**スクリプト**で作ります。このスクリプトは、矢印キーを押すとボールを押します。

1. **Ball** を選択し、**ADD COMPONENT** > **Script** を選びます。
2. **+ ADD SCRIPT** 欄に `roll.mjs` と入力し、<kbd>Enter</kbd> キーを押します。拡張子 `.mjs` を付けると、JavaScript モジュール（ECMAScript モジュール、ESM）を使う新しい形式の [ESM スクリプト](/user-manual/scripting/esm-scripts/)が作られます。スクリプトはボールに追加され、Assets パネルにも表示されます。
3. **roll** スクリプトの **Edit**（鉛筆）ボタンを選択します。コードエディターが新しいタブで開きます。
4. ファイルの中身をすべて下のコードに置き換え、<kbd>Ctrl</kbd>+<kbd>S</kbd>（macOS では <kbd>Cmd</kbd>+<kbd>S</kbd>）で保存します。
5. Editor に戻り、**Parse** ボタン（**Edit** の隣の 2 本の矢印）を選択します。スクリプトの下に **power** 欄が表示されます。

```javascript
import { Script, KEY_LEFT, KEY_RIGHT, KEY_UP, KEY_DOWN } from 'playcanvas';

export class Roll extends Script {
    static scriptName = 'roll';

    /**
     * How hard the arrow keys push the ball.
     *
     * @attribute
     */
    power = 15;

    update(dt) {
        const keyboard = this.app.keyboard;

        // Which way are the arrow keys pointing?
        let x = 0;
        let z = 0;
        if (keyboard.isPressed(KEY_LEFT)) x -= 1;
        if (keyboard.isPressed(KEY_RIGHT)) x += 1;
        if (keyboard.isPressed(KEY_UP)) z -= 1;
        if (keyboard.isPressed(KEY_DOWN)) z += 1;

        // Push the ball while a key is held. Physics does the rest.
        this.entity.rigidbody.applyForce(x * this.power, 0, z * this.power);
    }
}
```

<StepVideo src="/video/editor-first-app-script.mp4" poster="/img/user-manual/editor/getting-started/your-first-app/script.webp" label="Ball に roll スクリプトを追加し、コードエディターでコードを貼り付けて解析する" />

スクリプトの動きは次のとおりです。

- `update` は毎フレーム、1 秒間に約 60 回実行されます。
- `keyboard.isPressed` は、そのキーが今押されているかどうかを調べます。上キーはカメラから遠ざかる方向で、Z のマイナス方向にあたります。
- `applyForce` はボールのリジッドボディを押します。ボールを自分で動かすことはありません。転がり方も、跳ね方も、どの缶に当たるかも、物理エンジンが計算します。
- `@attribute` のコメントは、`power` を Inspector で編集できる欄にします。スクリプトを解析したのはこのためで、コードに触れずにゲームを調整できるようになります。

## 10. 遊ぶ {#play}

もう一度 **Launch** を選択します。上キーを押し続けてボールを転がし、左右キーで向きを変えます。缶と缶のすき間を狙うと、派手に崩れます。

<StepVideo src="/video/editor-first-app-play.mp4" poster="/img/user-manual/editor/getting-started/your-first-app/play.webp" label="ゲームを遊ぶ: ボールがピラミッドに転がり込み、缶が散らばる" />

もう一度遊ぶには、タブを再読み込みします。

:::tip[うまく動かないときは]

- **何も落ちない**: **IMPORT AMMO** を選択したか、缶の Rigid Body の **Type** が **Dynamic** になっているかを確認します。
- **ボールが動かない**: まずゲームの中をクリックして、キーボード入力を受け取れるようにします。次に、roll スクリプトの下に **power** 欄があるかを確認します。なければ、もう一度 **Parse** を選択します。
- **缶が床をすり抜ける**: Plane の Collision の **Half Extents** と **Position Offset** を確認します。

:::

## 11. ライブで調整する {#tweak-it-live}

Launch のタブは、**ライブリンク**で Editor とつながったままです。Editor で何かを変えると、実行中のゲームが再読み込みなしですぐに更新されます。2 つのウィンドウを並べて試してみましょう。

- Viewport 上部の **Settings**（歯車）ボタンを選択し、**PHYSICS** を開いて **Gravity** の Y を `-1.5` にします。ボールを転がすと、まるで月面です。
- **Ball** マテリアルを選択し、**Color** を変えてみます。
- **Ball** を選択し、**power** を `40` に上げてみます。

<StepVideo src="/video/editor-first-app-live-link.mp4" poster="/img/user-manual/editor/getting-started/your-first-app/live-link.webp" label="Editor と実行中のゲームを並べ、重力を下げてボールの色を変えると、ゲームがすぐに更新される" />

終わったら **Gravity** を `-9.8` に戻しましょう。そのままでもかまいません。あなたのゲームです。

ライブリンクが反映するのは、シーンとアセットの変更です。スクリプトのコードを編集したら、Launch のタブを再読み込みして新しいコードを実行します。

## 12. 公開する {#publish}

最後のステップです。ゲームを Web に公開しましょう。

1. 左のツールバーにある **Publish / Download** ボタンを選択します。
2. **Publish** を選択します。
3. ビルドのタイトルには、プロジェクトの名前が入っています。フォームの下にある **Publish** を選択します。

<StepVideo src="/video/editor-first-app-publish.mp4" poster="/img/user-manual/editor/getting-started/your-first-app/publish.webp" label="ビルドを公開し、playcanv.as のリンクを手に入れる" />

数秒後には、`https://playcanv.as/p/...` のようなリンクでゲームが公開されます。このページの冒頭のゲームも、まさにこの方法で公開したものです。スマートフォンで開いたり、友だちに送ったり、どこにでも投稿したりできます。

最初のビルドは自動的にプロジェクトの**プライマリービルド**になり、このリンクではそのビルドが再生されます。もう一度公開したときは、新しいビルドに切り替えるタイミングを自分で選べるので、プレイヤーに届ける前にビルドをテストできます。ビルドの管理については [PlayCanvas ホスティング](/user-manual/editor/publishing/web/playcanvas-hosting/)を、ビルドをダウンロードして自分でホスティングする方法については[セルフホスティング](/user-manual/editor/publishing/web/self-hosting/)を参照してください。

## ゲームが完成しました {#you-made-a-game}

一度に、あらゆる PlayCanvas アプリと同じ構成要素を使いました。エンティティとコンポーネント、マテリアル、リジッドボディとコリジョン、編集できる属性を持つスクリプト、ライブリンク、そして公開です。ほかのすべては、この上に成り立っています。

### 自分のものにする {#make-it-yours}

次に試せるアイデアを、おおよそやさしい順に紹介します。

- **難しいレベルを作る**: ピラミッドを高くしたり、Static の Box エンティティで壁を足したりします。
- **見た目を変える**: マテリアルのほかのセクションを試したり、ライトを足したり、[Asset Store](/user-manual/editor/assets/asset-store/) のモデルを置いたりします。
- **自分の素材を使う**: 自分のモデル、テクスチャ、サウンドを[インポート](/user-manual/editor/assets/importing/)します。
- **スコアを数える**: [衝突イベント](/user-manual/physics/collision-events/)でヒット数を数え、[テキスト要素](/user-manual/user-interface/)でスコアを表示します。
- **リセットキーを付ける**: 各缶の最初の位置をスクリプトに保存し、<kbd>R</kbd> キーで元に戻します。

### さらに学ぶ {#keep-learning}

- [スクリプト](/user-manual/scripting/): スクリプトでできることのすべて。
- [物理](/user-manual/physics/): 力、ジョイント、トリガー、レイキャスト。
- [Editor のインターフェース](/user-manual/editor/interface/): 各パネルの詳細。
- [チュートリアル](/tutorials/): 調べたりフォークしたりできる完成プロジェクト。たとえば [Keepy Up](/tutorials/keepyup-part-one/) ゲームがあります。
