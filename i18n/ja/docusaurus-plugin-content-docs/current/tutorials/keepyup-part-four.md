---
title: "シンプルなゲームの作成 - パート4: ゲームの流れとスコア"
description: アプリケーションイベントを使ってスコアを数えるゲームスクリプトを追加し、Keepy Upの最初のユーザーインターフェースとして、ScreenとText Elementでスコアを表示します。
tags: [games]
thumb: /img/tutorials/keepyup-part-four/thumbnail.webp
---

[パート3](/tutorials/keepyup-part-three/)では、キックできるボールを作りました。このパートでは、ゲームスクリプトがキックを数え、スコアを表示するための最初の[ユーザーインターフェース](/user-manual/user-interface/)を作ります。

:::info[はじめる前に]

パート1から3で作ったプロジェクトが必要です。自分の作業と比べるには、[完成したプロジェクト](https://playcanvas.com/project/1660780/overview/keepy-up)を開いてください。

:::

## 1. ゲームのスクリプトを書く {#write-the-game-script}

**Scripts** フォルダーに `game.mjs` というスクリプトを作成し、次のコードを入力します。

```javascript
import { Script } from 'playcanvas';

/**
 * Keeps the score and tells the rest of the game when a round starts and ends.
 */
export class Game extends Script {
    static scriptName = 'game';

    score = 0;

    playing = false;

    initialize() {
        this.app.on('ball:kicked', this.onBallKicked, this);
        this.app.on('ball:lost', this.onBallLost, this);

        this.on('destroy', () => {
            this.app.off('ball:kicked', this.onBallKicked, this);
            this.app.off('ball:lost', this.onBallLost, this);
        });
    }

    onBallKicked() {
        // The first kick starts a new round
        if (!this.playing) {
            this.playing = true;
            this.score = 0;
            this.app.fire('game:start');
        }

        this.score++;
        this.app.fire('game:score', this.score);
    }

    onBallLost() {
        this.playing = false;
        this.app.fire('game:over', this.score);
    }
}
```

次に、**Game** エンティティを選択し、そのScriptコンポーネントの `input` の下に `game` スクリプトを追加します。このスクリプトには属性がないので、**Parse** は必要ありません。

### ゲームのスクリプトの仕組み {#how-the-game-script-works}

ボールのスクリプトは `ball:kicked` と `ball:lost` を発行します。ゲームのスクリプトは、`this.app.on` でこの2つのイベントを聞き、自分でも3つのイベントを発行します。

| イベント | 発行されるとき | 渡す値 |
| --- | --- | --- |
| `game:start` | ラウンドの最初のキックが当たったとき | |
| `game:score` | スコアが変わったとき | 新しいスコア |
| `game:over` | ボールを落としたとき | 最終スコア |

ここに書かれていないことに注目してください。ボールのスクリプトはゲームのスクリプトに一切触れず、ゲームのスクリプトもボールに一切触れません。それぞれが起きたことを知らせるだけで、関心のあるものが聞けばよいのです。こうするとスクリプト同士が独立したままになり、これまでに書いたコードを1行も変えずに、あとからスコア表示やメニュー、サウンドを追加できます。

ハンドラーは、`destroy` ハンドラーの中で解除しています。これは、アプリケーションが動き続けている間にエンティティが破棄される可能性がある場合に重要です。

## 2. フォントを使えるようにする {#make-the-font-ready}

テキストは[フォントアセット](/user-manual/editor/assets/inspectors/font/)を使って描画します。スタータープロジェクトにはフォントが1つ含まれていますが、その文字の画像は自分のプロジェクトで生成する必要があります。

1. アセットパネルで **Fonts** を開きます。`LilitaOne-Regular.ttf` という名前のアセットが2つあります。**Aa** のアイコンが付いているフォントのほうを選択します。破線の枠が付いているもう1つは、フォントの元になったファイルです。
2. インスペクターの **Source Files** では、**JSON** と **Textures** がどちらも **Missing** になっています。**Font** セクションまで下にスクロールし、**REGENERATE FONT ASSETS** を選択します。

![フォントアセットのインスペクターのSource FilesセクションとFontセクション](/img/tutorials/keepyup-part-four/font.webp)

数秒後、**Source Files** に新しいJSONアセットと新しいテクスチャの名前が表示されます。エディターは、この2つを **Fonts** フォルダーに追加します。置き換えられた古い2つも、そのまま残ります。

## 3. Screenを追加する {#add-a-screen}

すべてのユーザーインターフェースは[Screen](/user-manual/editor/scenes/components/screen/)から始まります。Screenは、インターフェースをレイアウトする領域を定義します。

1. **Root** に `UI` というエンティティを追加します。これはヒエラルキーを整理するためだけのものです。
2. **UI** を選択した状態で、**+**（エンティティを追加）> **User Interface** > **2D Screen** を選択します。新しいエンティティの名前を `Score Screen` にします。
3. Screenコンポーネントで、**Ref Resolution** を `720` × `1280` に、**Scale Blend** を `1` に設定します。

:::note

新しいエンティティは、選択中のエンティティの中に追加されます。何も選択していない場合は、Rootに追加されます。すでに選択されているエンティティをクリックすると選択が解除されるので、追加する前に、親にしたいエンティティがヒエラルキーでハイライトされていることを確認してください。エンティティが間違った場所にできてしまったら、ヒエラルキーで親にしたいエンティティの上にドラッグします。

:::

![Score Screen エンティティのScreenコンポーネントと、その下のuiScoreスクリプト](/img/tutorials/keepyup-part-four/screen.webp)

リファレンス解像度は、インターフェースをデザインするときの大きさです。**Scale Blend** が `1` のとき、インターフェースはウィンドウの高さに合わせてスケールされます。カメラから見たワールドもウィンドウの高さに従うので、どんな形の画面でも、インターフェースとボールの位置がそろったままになります。

## 4. スコアを追加する {#add-the-score}

1. **Score Screen** を選択した状態で、**+** > **User Interface** > **Text Element** を選択します。新しいエンティティの名前を `Score` にします。
2. [Elementコンポーネント](/user-manual/editor/scenes/components/element/)で、**Preset** を **Top Anchor & Pivot** に設定します。これでテキストが画面の上端中央からぶら下がる形になります。
3. エンティティの **Position** を `0`, `-50`, `0` に設定して、端から下に下げます。
4. **Font** スロットに `LilitaOne-Regular.ttf` が表示されていることを確認します。エディターは、最後に選択したフォントをここに自動で設定します。スロットが空の場合は、アセットパネルからフォントをドラッグします。
5. **Text** を `0` に、**Font Size** と **Line Height** を `150` に設定します。
6. 観客を背景にしても数字が目立つように、**Outline Color** を `0F2440FF` に、**Outline Thickness** を `0.5` に設定します。次に、**Shadow Color** を `08142899` に、**Shadow Offset** を `0`, `-0.28` に設定します。

![Score エンティティのElementコンポーネントの、FontからShadow Offsetまでのテキスト設定](/img/tutorials/keepyup-part-four/score-element.webp)

この2つの色にはアルファ値があるので、16進コードは8桁になります。最後の2桁がアルファで、`FF` は不透明、`99` は60%です。6桁しか入力しないとアルファが0になり、アウトラインやシャドウが見えなくなります。

ヒエラルキーは次のようになっているはずです。

![UI、Score Screen、Score があるヒエラルキー](/img/tutorials/keepyup-part-four/hierarchy.webp)

## 5. スコアのスクリプトを書く {#write-the-score-script}

`ui-score.mjs` というスクリプトを作成します。

```javascript
import { Entity, Script } from 'playcanvas';

/**
 * Shows the score while a round is being played.
 */
export class UiScore extends Script {
    static scriptName = 'uiScore';

    /**
     * The text element that displays the score.
     *
     * @attribute
     * @type {Entity}
     */
    label;

    initialize() {
        // Nothing to show until the first round starts
        this.label.enabled = false;

        this.app.on('game:start', this.onGameStart, this);
        this.app.on('game:score', this.onGameScore, this);

        this.on('destroy', () => {
            this.app.off('game:start', this.onGameStart, this);
            this.app.off('game:score', this.onGameScore, this);
        });
    }

    onGameStart() {
        this.label.enabled = true;
    }

    onGameScore(score) {
        this.label.element.text = String(score);
    }
}
```

1. **Score Screen** に **Script** コンポーネントを追加して `uiScore` スクリプトを追加し、その **Parse** ボタンを選択します。
2. ヒエラルキーから **Score** エンティティを、スクリプトの `label` スロットにドラッグします。

このスクリプトは、最初のラウンドが始まるまで数字を隠し、その後は `game:score` が発行されるたびにエレメントの `text` を変更します。

スクリプトをテキスト自体ではなくScreenに付けているのには理由があります。無効になっているエンティティのスクリプトは実行されないので、テキストは自分で自分を再び表示できないのです。

## 進み具合を確認する {#check-your-progress}

ゲームを **Launch** します。スコアは最初のキックで表示され、その後のキックごとに増えていきます。ボールを落としても、次のラウンドが1から始まるまで、スコアは画面に残ります。

![パート4終了時のゲーム: 空中のボールと、画面上部のスコア1](/img/tutorials/keepyup-part-four/result.webp)

これでゲームにルールができましたが、ゲーム自身は何も説明してくれません。[パート5: メニュー画面とゲームオーバー画面](/tutorials/keepyup-part-five/)では、タイトルを追加し、ラウンドが終わったことをプレイヤーに伝えます。
