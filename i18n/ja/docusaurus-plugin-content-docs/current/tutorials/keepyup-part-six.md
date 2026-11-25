---
title: "シンプルなゲームの作成 - パート6: サウンド、パーティクル、公開"
description: 1つのスクリプトで制御するキック音、音楽、ゲームオーバー音、パーティクルのエフェクトを追加してKeepy Upを仕上げ、ゲームをウェブに公開します。
tags: [games]
thumb: /img/tutorials/keepyup-part-six/thumbnail.webp
---

import StepVideo from '@site/src/components/StepVideo';

[パート5](/tutorials/keepyup-part-five/)では、ゲームの画面を完成させました。この最後のパートでは、サウンドとパーティクルエフェクトを追加し、ゲームを公開します。

:::info[はじめる前に]

パート1から5で作ったプロジェクトが必要です。自分の作業と比べるには、[完成したプロジェクト](https://playcanvas.com/project/1660780/overview/keepy-up)を開いてください。

:::

## 1. サウンドを追加する {#add-the-sounds}

[Soundコンポーネント](/user-manual/editor/scenes/components/sound/)は、オーディオアセットを再生します。再生できるサウンドはそれぞれ**スロット**を持ち、スクリプトはスロットを名前で指定して再生します。

1. **Root** に `Effects` というエンティティを追加します。
2. **ADD COMPONENT** > **Audio** > **Sound** を選択します。
3. **Positional** をオフにします。ポジショナルサウンドはカメラから離れるほど小さくなります。3Dワールド内の音には適していますが、音楽には向きません。
4. コンポーネントには最初からスロットが1つあります。それを表の1行目のとおりに設定し、**ADD SLOT** を2回選択して残りの2つを追加します。

| Name | Asset | 設定 |
| --- | --- | --- |
| `kick` | `kick.mp3` | **Overlap** をオン。続けてキックしても、音が互いを打ち消さないようにします |
| `music` | `music.mp3` | **Loop** をオン、**Volume** `0.6` |
| `gameOver` | `game-over.mp3` | |

サウンドは **Sounds** フォルダーにあります。**Effects** を選択したままにできるように、アセットパネルの左側にあるフォルダーツリーからこのフォルダーを開き、それぞれのサウンドを対応するスロットの **Asset** にドラッグします。3つとも **Auto Play** はオフのままにします。それぞれをいつ再生するかは、スクリプトが決めます。

![kickとmusicのスロットがある、Effects エンティティのSoundコンポーネント](/img/tutorials/keepyup-part-six/sound.webp)

PlayCanvasのサウンドについて詳しくは、[オーディオ](/user-manual/audio/)のセクションを参照してください。

## 2. パーティクルエフェクトを追加する {#add-a-particle-effect}

ボールをキックした場所に土ぼこりが舞うと、キックに手応えが出ます。

1. **Effects** を選択した状態で、**+**（エンティティを追加）> **Particle System** を選択します。新しいエンティティの名前を `Impact` にします。
2. [Particle Systemコンポーネント](/user-manual/editor/scenes/components/particlesystem/)で、**Auto Play** と **Loop** をオフにします。エフェクトは、スクリプトが指示したときに一度だけ再生されるようにします。
3. **Particle Count** を `14`、**Lifetime** を `0.45`、**Emission Rate** と **Emission Rate 2** を `0` に設定します。レートがゼロだと、すべてのパーティクルが一度に放出されます。
4. **Emitter Shape** を **Sphere** に、**Emitter Radius** を `0.25` に設定します。
5. **Textures** フォルダーから `puff.png` を **Color Map** スロットにドラッグします。
6. **Lighting** と **Depth Write** はオフのままにします。これは、柔らかく透けるパーティクルに適した設定です。

![Impact エンティティのParticle Systemコンポーネントの、Auto PlayからEmitter Radiusまで](/img/tutorials/keepyup-part-six/particles.webp)

残りの設定は、コンポーネントの一番下にあるカーブです。カーブは、パーティクルが現れる時間 `0` から消える時間 `1` までの寿命の間に、値を変化させます。どのカーブも、最初は時間 `0` にキーが1つあるだけです。

まず、土ぼこりを大きくしていく **Scale** から始めます。

1. **Scale** のカーブを選択して、カーブエディターを開きます。
2. 線の左端にあるキーを選択し、**Value** を `0.14` に設定します。
3. グラフの何もない部分をクリックして、2つ目のキーを追加します。その **Time** を `1` に、**Value** を `0.45` に設定します。
4. カーブエディターの外側をクリックして閉じます。

**Opacity** も同じ方法で、時間 `0` で `0.85`、時間 `1` で `0` に設定します。土ぼこりが消えていきます。

**Local Velocity** は、パーティクルを外側に飛ばし、減速させます。軸ごとに1本のカーブがあり、2組目のカーブを使うと、パーティクルごとにランダムな方向を与えられます。

1. **Local Velocity** のカーブを選択します。X、Y、Zのカーブは重なっているので、**X**、**Y**、**Z** のボタンを使って、編集しないカーブを隠します。
2. XのカーブとYのカーブに、同じ2つのキーを設定します。時間 `0` で `3.5`、時間 `1` で `0.6` です。
3. **Randomize** をオンにします。2本目のXのカーブとYのカーブが、どちらも `0` の平らな線として現れます。それぞれに、時間 `0` で `-3.5`、時間 `1` で `-0.6` のキーを設定します。
4. Zのカーブは2本とも `0` のままにします。

![完成したLocal Velocityのカーブが表示されたカーブエディター](/img/tutorials/keepyup-part-six/curve-editor.webp)

これで、各パーティクルは2組のカーブの間のどこかの速度で動きます。間違って追加したキーを削除するには、そのキーを右クリックします。

これらを正確に合わせる必要はありません。次のステップのスクリプトを追加したら、ゲームを起動してボールをキックし、気に入るまでエフェクトを調整してください。

## 3. エフェクトのスクリプトを書く {#write-the-effects-script}

`effects.mjs` というスクリプトを作成します。

```javascript
import { Entity, Script } from 'playcanvas';

/**
 * Plays the sounds and the particle effect that go with what happens in the game.
 */
export class Effects extends Script {
    static scriptName = 'effects';

    /**
     * The particle system to play where the ball is kicked.
     *
     * @attribute
     * @type {Entity}
     */
    impact;

    initialize() {
        this.app.on('ball:kicked', this.onBallKicked, this);
        this.app.on('game:start', this.onGameStart, this);
        this.app.on('game:over', this.onGameOver, this);

        this.on('destroy', () => {
            this.app.off('ball:kicked', this.onBallKicked, this);
            this.app.off('game:start', this.onGameStart, this);
            this.app.off('game:over', this.onGameOver, this);
        });
    }

    onBallKicked(point) {
        this.entity.sound.play('kick');

        // Restart the particle effect at the point of the kick
        this.impact.setPosition(point);
        this.impact.particlesystem.reset();
        this.impact.particlesystem.play();
    }

    onGameStart() {
        this.entity.sound.play('music');
    }

    onGameOver() {
        this.entity.sound.stop('music');
        this.entity.sound.play('gameOver');
    }
}
```

1. **Effects** に **Script** コンポーネントを追加して `effects` スクリプトを追加し、その **Parse** ボタンを選択します。
2. **Impact** エンティティを、スクリプトの `impact` スロットにドラッグします。

パート3と4のイベントが、ここで役に立ちます。このスクリプトは `ball:kicked`、`game:start`、`game:over` を聞くだけで、これまでのスクリプトを変更する必要はありませんでした。`ball:kicked` イベントはキックが当たった点を渡すので、スクリプトはパーティクルエフェクトをそこに移動してから再生し直します。

ブラウザは、プレイヤーがページを操作するまで、ページが音を鳴らすことを許可しません。このゲームでは、最初の音はプレイヤーの最初のタップによって鳴るので、問題になりません。

## 進み具合を確認する {#check-your-progress}

音を出せる状態で、ゲームを **Launch** します。キックするたびに鈍い音と土ぼこりが出て、ラウンドの開始とともに音楽が始まり、ホイッスルと観客のため息がラウンドの終わりを知らせます。

<StepVideo src="/video/keepyup-part-six.mp4" poster="/img/tutorials/keepyup-part-six/result.webp" label="完成したゲーム: メニュー、土ぼこりの出る数回のキック、そしてゲームオーバー画面" />

## 4. ゲームを公開する {#publish-your-game}

今のところ、このゲームをプレイできるのは、エディターから起動するあなただけです。[公開](/user-manual/editor/publishing/)すると、誰でもリンクからプレイできるビルドが作成されます。

1. エディターの左側にあるツールバーで、**Publish / Download** ボタンを選択します。
2. **Publish** を選択して、新しいビルドを開始します。**Title** にはプロジェクトの名前が入力されています。**Description** にはスタータープロジェクトの説明が残っているので、自分の説明に書き換えます。
3. **Options** まで下にスクロールし、**Concatenate Scripts** はオンのままにします。このようなスクリプトを使うプロジェクトのビルドには、これが必要です。
4. 一番下にある **Publish** を選択します。数秒後、ビルドがリンク付きで **Primary build** の下に表示されます。

スマートフォンでリンクを開き、親指でゲームを試してみましょう。

## 次のステップ {#where-next}

これで、1つのゲームを作り上げ、公開しました。その過程で、テンプレート、イメージベースドライティング、マテリアル、スクリプトとその属性、アプリケーションイベント、ユーザーインターフェースのScreen、サウンド、パーティクルを使いました。

ゲームを自分のものにするためのアイデアをいくつか紹介します。

- **ベストスコアを記録する。** 新しいスクリプトで `game:over` を聞き、ブラウザの [`localStorage`](https://developer.mozilla.org/ja/docs/Web/API/Window/localStorage) に最高スコアを保存します。
- **難しくする。** 1点ごとに、ボールの `gravity` を少しずつ大きくします。
- **見た目を変える。** ボールの色を変えたり、別の背景を作ったりします。

さらに学ぶには、他の[チュートリアル](/tutorials/)を見たり、[フォーラム](https://forum.playcanvas.com)で質問したりしてみてください。
