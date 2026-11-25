---
title: "シンプルなゲームの作成 - パート5: メニュー画面とゲームオーバー画面"
description: Text、Image、Groupエレメントを使ってKeepy Upのタイトル画面とゲームオーバー画面を作り、2つの短いスクリプトで表示と非表示を切り替えます。
tags: [games]
thumb: /img/tutorials/keepyup-part-five/thumbnail.webp
---

[パート4](/tutorials/keepyup-part-four/)では、ScreenとText Elementでスコアを作りました。このパートでは、同じ部品に画像を加えて、タイトル画面とゲームオーバー画面を作ります。

:::info[はじめる前に]

パート1から4で作ったプロジェクトが必要です。自分の作業と比べるには、[完成したプロジェクト](https://playcanvas.com/project/1660780/overview/keepy-up)を開いてください。

:::

## 1. メニュー画面を作る {#build-the-menu-screen}

メニューは、タイトル、ボールを囲むリング、そしてプレイヤーに何をすればよいかを伝える1行で構成されます。

1. **UI** を選択し、**+**（エンティティを追加）> **User Interface** > **2D Screen** を選択します。名前を `Menu Screen` にし、スコアのときと同じように、**Ref Resolution** を `720` × `1280` に、**Scale Blend** を `1` に設定します。
2. **User Interface** メニューから **Menu Screen** に4つのエレメントを追加し、表のとおりに設定します。新しいエレメントは選択中のものの中に追加されるので、1つ追加するたびに、先に **Menu Screen** を選択し直してください。

| 名前 | 種類 | Position | 設定 |
| --- | --- | --- | --- |
| `Title Keepy` | Text | `0`, `455`, `0` | **Text** `KEEPY`、**Font Size** と **Line Height** `150` |
| `Title Up` | Text | `0`, `317`, `0` | **Text** `UP`、**Font Size** と **Line Height** `150`、**Color** `FFD13D` |
| `Ring` | Image | `0`, `87`, `0` | **Texture** に **UI** フォルダーの `ring.png`、その後で **Width** と **Height** `264` |
| `Prompt` | Text | `0`, `-147`, `0` | **Text** `TAP THE BALL`、**Font Size** と **Line Height** `54` |

3つのテキストエレメントには、パート4でスコアに設定したのと同じフォント、アウトライン、シャドウを設定します。リングは、サイズより先にテクスチャを設定します。エディターは、新しいテクスチャに合わせてImage Elementのサイズを変更するからです。

:::tip

時間を節約するには、`Score` エンティティを選択して、<kbd>Ctrl</kbd>+<kbd>D</kbd>（Macでは<kbd>Cmd</kbd>+<kbd>D</kbd>）で複製します。コピーは、元のエンティティのすぐ下に同じ名前で表示されます。それを **Menu Screen** にドラッグし、**Preset** を **Center Anchor & Pivot** に設定すれば、フォント、アウトライン、シャドウはすでに正しく設定されています。

:::

:::note

選択を失わずに **UI** フォルダーを開くには、アセットパネルの左側にあるフォルダーツリーで選択します。パネルのメイン部分でフォルダーをダブルクリックすると選択が変わり、作業中のエレメントがインスペクターに表示されなくなります。

:::

これらのエレメントは画面の中心にアンカーされているので、位置は画面の中央から測ります。リングが `87` にあるのは、カメラの高さより0.7ユニット上にあるボールの開始位置が、高さ1280ユニットの画面ではそこに来るからです。

![Menu Screen の4つのエレメントがあるヒエラルキー](/img/tutorials/keepyup-part-five/hierarchy.webp)

## 2. プレーが始まったらメニューを隠す {#hide-the-menu-when-play-starts}

`ui-menu.mjs` というスクリプトを作成します。

```javascript
import { Script } from 'playcanvas';

/**
 * Hides the menu when the first round starts.
 */
export class UiMenu extends Script {
    static scriptName = 'uiMenu';

    initialize() {
        this.app.once('game:start', this.onGameStart, this);

        this.on('destroy', () => {
            this.app.off('game:start', this.onGameStart, this);
        });
    }

    onGameStart() {
        this.entity.enabled = false;
    }
}
```

**Menu Screen** に **Script** コンポーネントを追加し、`uiMenu` スクリプトを追加します。このスクリプトには属性がないので、**Parse** は必要ありません。

このスクリプトは `this.app.on` ではなく `this.app.once` を使っているので、ハンドラーは最初の `game:start` に対してだけ実行されます。メニューは、その下にあるものすべてと一緒に無効になり、再び表示する必要はありません。

## 3. ゲームオーバー画面を作る {#build-the-game-over-screen}

この画面は、何度も表示と非表示を繰り返す必要があります。スクリプトは有効なままのScreenに置き、その下にあるエレメントのグループのオンとオフを切り替えます。

1. **UI** に `Game Over Screen` という **2D Screen** をもう1つ追加し、同じ **Ref Resolution** と **Scale Blend** を設定します。
2. **Game Over Screen** を選択した状態で、**+** > **User Interface** > **Group Element** を選択します。グループの名前を `Panel` にし、**Preset** を **Stretch** に設定して、画面全体を覆うようにします。

![画面いっぱいに引き伸ばしたグループである、Panel エンティティのElementコンポーネント](/img/tutorials/keepyup-part-five/panel-element.webp)

次に、この4つのエレメントを **Panel** に追加します。メニューのエレメントを複製し、コピーを **Panel** にドラッグするのが一番早い方法です。

| 名前 | 種類 | Position | 設定 |
| --- | --- | --- | --- |
| `Game` | Text | `0`, `388`, `0` | **Text** `GAME`、**Font Size** と **Line Height** `92` |
| `Over` | Text | `0`, `300`, `0` | **Text** `OVER`、**Font Size** と **Line Height** `92`、**Color** `FFD13D` |
| `Ring` | Image | `0`, `87`, `0` | メニューと同じ |
| `Prompt` | Text | `0`, `-147`, `0` | メニューと同じ |

この2つの単語は、スコアとリングの間に収める必要があるので、タイトルより小さくしています。

## 4. ラウンドの合間に表示する {#show-it-between-rounds}

`ui-game-over.mjs` というスクリプトを作成します。

```javascript
import { Entity, Script } from 'playcanvas';

/**
 * Shows the game over message between rounds.
 */
export class UiGameOver extends Script {
    static scriptName = 'uiGameOver';

    /**
     * The entity that holds everything on the game over screen.
     *
     * @attribute
     * @type {Entity}
     */
    panel;

    initialize() {
        this.panel.enabled = false;

        this.app.on('game:over', this.onGameOver, this);
        this.app.on('game:start', this.onGameStart, this);

        this.on('destroy', () => {
            this.app.off('game:over', this.onGameOver, this);
            this.app.off('game:start', this.onGameStart, this);
        });
    }

    onGameOver() {
        this.panel.enabled = true;
    }

    onGameStart() {
        this.panel.enabled = false;
    }
}
```

1. **Game Over Screen** に **Script** コンポーネントを追加して `uiGameOver` スクリプトを追加し、その **Parse** ボタンを選択します。
2. **Panel** エンティティを、スクリプトの `panel` スロットにドラッグします。

パネルは、ゲームの読み込み時には隠され、`game:over` で表示され、次の `game:start` で再び隠されます。

## 進み具合を確認する {#check-your-progress}

ゲームを **Launch** します。タイトルが表示されます。

![メニュー画面: リングに囲まれたボールの上に KEEPY UP](/img/tutorials/keepyup-part-five/menu.webp)

ボールをキックすると、タイトルがスコアに変わります。ボールを落とすとゲームオーバー画面が表示され、ボールはリングの中に戻って、次のラウンドを待ちます。

![ゲームオーバー画面: スコア、GAME OVER、リングの中のボール](/img/tutorials/keepyup-part-five/game-over.webp)

ゲームは完成しましたが、まだ音がありません。[パート6: サウンド、パーティクル、公開](/tutorials/keepyup-part-six/)では、仕上げをして、ゲームをオンラインに公開します。
