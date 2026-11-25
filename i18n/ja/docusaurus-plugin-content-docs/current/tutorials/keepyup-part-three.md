---
title: "シンプルなゲームの作成 - パート3: ボールを動かす"
description: Keepy Upの最初の2つのスクリプトを書きます。1つは重力でサッカーボールを動かしてキックし、もう1つはマウスのクリックとタッチをキックに変えます。
tags: [games]
thumb: /img/tutorials/keepyup-part-three/thumbnail.webp
---

import StepVideo from '@site/src/components/StepVideo';

[パート2](/tutorials/keepyup-part-two/)では、シーンの見た目を仕上げました。このパートでは、2つの[スクリプト](/user-manual/scripting/)を書きます。1つ目は、ボールを落下させ、キックできるようにします。2つ目は、クリックやタッチがボールに当たったかどうかを判定します。

:::info[はじめる前に]

パート1と2で作ったプロジェクトが必要です。自分の作業と比べるには、[完成したプロジェクト](https://playcanvas.com/project/1660780/overview/keepy-up)を開いてください。

:::

## 1. ボールのスクリプトを書く {#write-the-ball-script}

1. アセットパネルで **Scripts** フォルダーを開きます。
2. **+**（アセットを追加）ボタンを選択し、**Script** を選択します。ファイル名に `ball.mjs` と入力して、<kbd>Enter</kbd>キーを押します。
3. `ball.mjs` をダブルクリックして、[Code Editor](/user-manual/editor/scripting/code-editor/)（コードエディター）で開きます。
4. ファイルの内容をすべて次のコードに置き換え、<kbd>Ctrl</kbd>+<kbd>S</kbd>（Macでは<kbd>Cmd</kbd>+<kbd>S</kbd>）で保存します。

```javascript
import { Script, Vec3 } from 'playcanvas';

/**
 * Moves the ball under gravity, kicks it when it is tapped and returns it to its starting
 * position when it falls out of view.
 */
export class Ball extends Script {
    static scriptName = 'ball';

    /**
     * The acceleration due to gravity, in units per second squared.
     *
     * @attribute
     * @type {number}
     */
    gravity = -20;

    /**
     * The upward speed a kick gives the ball, in units per second.
     *
     * @attribute
     * @type {number}
     */
    kickSpeed = 12;

    /**
     * The sideways speed a kick adds for each unit it lands off center.
     *
     * @attribute
     * @type {number}
     */
    sideSpeed = 4;

    /**
     * The spin a kick adds for each unit it lands off center, in degrees per second.
     *
     * @attribute
     * @type {number}
     */
    spin = 360;

    /**
     * The height below which the ball is lost.
     *
     * @attribute
     * @type {number}
     */
    floor = -6;

    velocity = new Vec3();

    spinSpeed = 0;

    inPlay = false;

    initialize() {
        // Remember where the ball starts so it can be put back
        this.startPosition = this.entity.getPosition().clone();
        this.startRotation = this.entity.getRotation().clone();
    }

    update(dt) {
        if (!this.inPlay) {
            // Turn slowly while waiting for a kick
            this.entity.rotate(0, 30 * dt, 0);
            return;
        }

        // Gravity changes the velocity, and the velocity changes the position
        this.velocity.y += this.gravity * dt;
        this.entity.translate(this.velocity.x * dt, this.velocity.y * dt, 0);

        // Spin around the axis that points at the camera
        this.entity.rotate(0, 0, this.spinSpeed * dt);

        if (this.entity.getPosition().y < this.floor) {
            this.lose();
        }
    }

    /**
     * Kicks the ball up and away from a point.
     *
     * @param {Vec3} point - The position of the kick in world space.
     */
    kick(point) {
        // How far the kick landed to the side of the ball's center
        const offset = this.entity.getPosition().x - point.x;

        this.velocity.set(this.sideSpeed * offset, this.kickSpeed, 0);
        this.spinSpeed -= this.spin * offset;
        this.inPlay = true;

        this.app.fire('ball:kicked', point);
    }

    lose() {
        this.inPlay = false;
        this.velocity.set(0, 0, 0);
        this.spinSpeed = 0;
        this.entity.setPosition(this.startPosition);
        this.entity.setRotation(this.startRotation);

        this.app.fire('ball:lost');
    }
}
```

## 2. サッカーボールにアタッチする {#attach-it-to-the-football}

1. エディターに戻り、ヒエラルキーで **Football** を選択します。
2. インスペクターで **ADD COMPONENT** > **Script** を選択します。新しい[Scriptコンポーネント](/user-manual/editor/scenes/components/script/)はインスペクターの一番下に追加されるので、そこまでスクロールします。
3. **+ ADD SCRIPT** フィールドを選択し、`ball` を選びます。
4. `ball` スクリプトの **Parse** ボタンを選択します。**Edit** の隣にある、2つの矢印のボタンです。エディターがコードを読み取り、スクリプトの属性を一覧表示します。

![ballスクリプトの属性が表示された、Football エンティティのScriptコンポーネント](/img/tutorials/keepyup-part-three/ball-script.webp)

スクリプトの下にある5つの値は、その[属性](/user-manual/scripting/script-attributes/)です。それぞれ、コードの中で上に `@attribute` コメントが付いたプロパティに対応しています。コードに触れずに、ここで値を変更できます。

:::note

エディターがスクリプトの属性を読み取るのは、**Parse** を選択したときだけです。このシリーズで属性を持つスクリプトには、すべてこの操作を行ってください。コードの中の属性を変更したときも、もう一度行います。

:::

ゲームを **Launch** します。ボールはその場でゆっくり回転し、まだ誰にもできないキックを待っています。

### ボールのスクリプトの仕組み {#how-the-ball-script-works}

- **`initialize`** は、ゲームの開始時に一度だけ実行されます。ボールが最初にあった場所を覚えておきます。
- **`update`** は毎フレーム実行され、`dt` は前のフレームからの経過時間（秒）です。ボールがプレー中の間、重力が速度を変え、速度が位置を変えます。`dt` を掛けることで、ゲームがどんな速さで動いていても、ボールは同じ速さで動きます。
- **`kick`** は、ボールを上に蹴り上げます。キックがボールの中心から左右にずれていると、ボールはキックから離れる方向にも動き、回転します。
- **`lose`** は、ボールが `floor` より下に落ちたら、最初の場所に戻します。

このスクリプトは `this.app.fire` も2回呼び出しています。これは、ゲームの他の部分にイベントを送ります。ボールがキックされたときは `ball:kicked`、ボールを落としたときは `ball:lost` です。まだ誰もこれを聞いていません。パート4で、ゲームスクリプトがこれらのイベントを使ってスコアを数えます。

## 3. 入力のスクリプトを書く {#write-the-input-script}

ボールには、キックしてくれるものが必要です。**Scripts** フォルダーに `input.mjs` という2つ目のスクリプトを作成し、次のコードを入力します。

```javascript
import { Entity, MOUSEBUTTON_LEFT, Script, Vec3 } from 'playcanvas';

/**
 * Turns mouse clicks and touches into kicks when they land on the ball.
 */
export class Input extends Script {
    static scriptName = 'input';

    /**
     * The ball to kick.
     *
     * @attribute
     * @type {Entity}
     */
    ball;

    /**
     * The camera the game is viewed through.
     *
     * @attribute
     * @type {Entity}
     */
    camera;

    /**
     * How close to the ball's center a tap must land to count, in units.
     *
     * @attribute
     * @type {number}
     */
    hitRadius = 0.75;

    point = new Vec3();

    initialize() {
        this.app.mouse.on('mousedown', this.onMouseDown, this);
        this.app.touch?.on('touchstart', this.onTouchStart, this);

        this.on('destroy', () => {
            this.app.mouse.off('mousedown', this.onMouseDown, this);
            this.app.touch?.off('touchstart', this.onTouchStart, this);
        });
    }

    onMouseDown(event) {
        if (event.button === MOUSEBUTTON_LEFT) {
            this.tap(event.x, event.y);
        }
    }

    onTouchStart(event) {
        const touch = event.changedTouches[0];
        this.tap(touch.x, touch.y);

        // Stop the browser from also sending a mouse event for this touch
        event.event.preventDefault();
    }

    /**
     * Kicks the ball if a point on the screen is over it.
     *
     * @param {number} x - The horizontal position on the screen, in pixels.
     * @param {number} y - The vertical position on the screen, in pixels.
     */
    tap(x, y) {
        const ballPosition = this.ball.getPosition();

        // Find the point in the world that is under the tap, at the ball's distance from the camera
        const distance = this.camera.getPosition().z - ballPosition.z;
        this.camera.camera.screenToWorld(x, y, distance, this.point);

        if (this.point.distance(ballPosition) < this.hitRadius) {
            this.ball.script.ball.kick(this.point);
        }
    }
}
```

## 4. Game エンティティを追加する {#add-a-game-entity}

入力のスクリプトは、ボールにもカメラにも属さないので、専用のエンティティを用意します。

1. ヒエラルキーで **Root** を選択し、**+**（エンティティを追加）ボタン、**Entity** の順に選択します。インスペクターで、新しいエンティティの **Name** を `Game` に変更します。
2. **Script** コンポーネントを追加して `input` スクリプトを追加し、その **Parse** ボタンを選択します。
3. ヒエラルキーから **Football** を、スクリプトの `ball` スロットにドラッグします。
4. ヒエラルキーから **Camera** を、`camera` スロットにドラッグします。

![ballとcameraのスロットが埋まった、Game エンティティのinputスクリプト](/img/tutorials/keepyup-part-three/input-script.webp)

この2つのスロットがあるのは、コードが `ball` と `camera` を `Entity` 型の属性として指定しているからです。こうして、1つのスクリプトにシーン内の他のエンティティを教えます。

### 入力のスクリプトの仕組み {#how-the-input-script-works}

- **`initialize`** は、マウスが押されたときとタッチされたときに知らせてもらうよう登録します。`on` の前の `?.` は、タッチスクリーンのないデバイスではタッチの行をスキップします。
- **`onMouseDown`** と **`onTouchStart`** は、それぞれ画面上の位置を `tap` に渡します。タッチの場合は、同じタップに対してブラウザが2つ目の見せかけのマウスイベントを送らないようにも指示します。
- **`tap`** は、カメラの [`screenToWorld`](https://api.playcanvas.com/engine/classes/CameraComponent.html#screentoworld) 関数を使って、タップの下にある3Dワールド内の点を、カメラからボールまでと同じ距離で求めます。その点がボールの中心から `hitRadius` 以内にあれば、そこでボールをキックします。

## 進み具合を確認する {#check-your-progress}

ゲームを **Launch** して、ボールをクリックまたはタップします。できるだけ長くボールを空中に保ちましょう。失敗すると、ボールは最初の場所に戻ります。

<StepVideo src="/video/keepyup-part-three.mp4" poster="/img/tutorials/keepyup-part-three/result.webp" label="ボールが何度か空中に蹴り上げられたあと、画面の外に落ちて最初の場所に戻る様子" />

ここで少し実験してみましょう。**Football** を選択して、`ball` スクリプトの属性を変えてみてください。`gravity` を `-10` にするとふわふわしたボールになり、`sideSpeed` を `8` にすると、中心からずれたキックの立て直しがずっと難しくなります。

これでおもちゃができました。[パート4: ゲームの流れとスコア](/tutorials/keepyup-part-four/)では、これをゲームに変えます。
