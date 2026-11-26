---
title: 一人称視点での移動方法
description: 一人称視点のキャラクターをゼロから作ります。マウスで見回し、リジッドボディに力を加えて歩き、ジャンプします。レベルはボックスだけで作ります。
tags: [input, camera, physics]
thumb: https://s3-eu-west-1.amazonaws.com/images.playcanvas.com/projects/12/405842/JLWRE0-image-75.jpg
---

import StepVideo from '@site/src/components/StepVideo';

<div className="iframe-container">
    <iframe loading="lazy" src="https://playcanv.as/p/HzOzlZOC/" title="一人称視点での移動方法" allow="camera; microphone; xr-spatial-tracking; fullscreen" allowFullScreen></iframe>
</div>

*シーンをクリックしてから、マウスで見回し、<kbd>W</kbd>、<kbd>A</kbd>、<kbd>S</kbd>、<kbd>D</kbd>キーで歩き、<kbd>Space</kbd>キーでジャンプします。<kbd>Esc</kbd>キーを押すと、ポインターが戻ります。*

このチュートリアルでは、このプロジェクトをゼロから作ります。壁で囲まれた小さな庭と、[物理エンジン](/user-manual/physics/)に押されてその中を動き回るプレイヤー、そしてマウスとキーボードの入力を「見回す」「歩く」「ジャンプする」に変える、140行ほどのスクリプト1つです。

:::info[はじめる前に]

キーボードとマウスが必要です。エディターの使い方に慣れるために、先に[初めてのアプリ](/user-manual/editor/getting-started/your-first-app/)を終えておくとよいでしょう。自分の作業と比べるには、[完成したプロジェクト](https://playcanvas.com/project/405842)を開いてください。

:::

## 1. 床を作る {#build-the-floor}

**Blank Project** キットから新しいプロジェクトを作成し、エディターで開きます。シーンには、空の下に、Camera、Light、Box、Planeがあります。このBoxを床にします。

1. ヒエラルキーで **Plane** を選択し、<kbd>Delete</kbd>キーを押します。
2. **Box** を選択します。インスペクターで **Name** を `Floor` に、**Position** を `0`、`-0.5`、`0` に、**Scale** を `20`、`1`、`20` に変更します。これで床の上面が高さ0になります。
3. **ADD COMPONENT** > **Physics** > **Collision** を選択します。**Half Extents** を `10`、`0.5`、`10` に設定します。Collisionコンポーネントはエンティティのスケールに従わないので、大きさは自分で指定します。各方向について、スケールの半分です。
4. コンポーネントに **Ammo module not found** と表示されます。**IMPORT AMMO** を選択して、物理エンジンをプロジェクトに追加します。警告はグレーになり、次にエンティティを選択したときには消えています。
5. **ADD COMPONENT** > **Physics** > **Rigid Body** を選択します。新しいコンポーネントは、Renderコンポーネントの下に表示されます。**Type** は **Static** のままにします。床は動きませんが、他のボディはその上に着地できます。

![FloorのCollisionコンポーネントとRigid Bodyコンポーネント](/img/tutorials/first-person-movement/floor.webp)

## 2. 壁を追加する {#add-the-walls}

レベルの残りの部分は、すべて床のコピーで、大きさだけが違います。

1. **Floor** を選択した状態で、ヒエラルキーの上部にある **Duplicate Entity** ボタンを選択します。コピーが選択された状態になり、その名前もFloorです。
2. コピーの **Name** を `Wall North` に、**Position** を `0`、`2.5`、`-10.5` に、**Scale** を `22`、`5`、`1` に変更します。壁の高さを5ユニットにするのは、段の上からジャンプしても、プレイヤーが壁を飛び越えられないようにするためです。
3. Collisionコンポーネントの **Half Extents** を `11`、`2.5`、`0.5` に設定します。
4. **Duplicate Entity** をさらに3回選択します。これで、Wall Northという名前のエンティティが同じ場所に4つあります。1つはそのままにして、残りの3つに次の値を設定します。

    | Name | Position | Rotation |
    | --- | --- | --- |
    | `Wall South` | `0`、`2.5`、`10.5` | `0`、`0`、`0` |
    | `Wall East` | `10.5`、`2.5`、`0` | `0`、`90`、`0` |
    | `Wall West` | `-10.5`、`2.5`、`0` | `0`、`90`、`0` |

Collisionコンポーネントはエンティティの回転には従うので、向きを変えた2つの壁に、他の変更は必要ありません。

## 3. 段と箱を追加する {#add-steps-and-crates}

段は、プレイヤーが飛び乗るためのものです。箱は **Dynamic** なボディで、物理エンジンが動かすので、プレイヤーが押して動かせます。

1. 向きを変えた壁ではなく **Wall North** を選択し、段のために2回複製します。コピーには次の値を設定します。

    | Name | Position | Scale | Half Extents |
    | --- | --- | --- | --- |
    | `Step Low` | `-4`、`0.5`、`-8` | `4`、`1`、`4` | `2`、`0.5`、`2` |
    | `Step High` | `-8`、`1`、`-8` | `4`、`2`、`4` | `2`、`1`、`2` |

2. **Step Low** を複製します。コピーの **Name** を `Crate` に、**Position** を `3`、`0.5`、`-3` に、**Scale** を `1`、`1`、`1` に、**Half Extents** を `0.5`、`0.5`、`0.5` に変更します。
3. CrateのRigid Bodyコンポーネントで、**Type** を **Dynamic** に、**Mass** を `10` に設定します。
4. **Crate** を複製し、コピーの **Position** を `4.5`、`0.5`、`-1.5` に、**Rotation** を `0`、`30`、`0` に設定します。

## 4. 色を付ける {#add-some-color}

レベルはこれで完成です。このステップは見やすくするためだけのものなので、急いでいる場合は飛ばしてもかまいません。

1. アセットパネルで **+**（アセットを追加）ボタンを選択し、**Material** を選択します。New Materialという名前のマテリアルが表示されます。これを選択し、**Name** を `Ground` に変更します。**Diffuse** を展開し、**Color** の色見本を選択して、16進数のフィールドに `7C8C72` と入力し、<kbd>Tab</kbd>キーを押します。
2. 同じ方法で、マテリアルをあと3つ作ります。新しいマテリアルは最初から選択されているので、そのまま **Name** を変更します。

    | Name | Color |
    | --- | --- |
    | `Wall` | `C9B8A0` |
    | `Step` | `8C9BAA` |
    | `Crate` | `D98A3D` |

3. `Ground` を、アセットパネルからビューポート内の床にドラッグします。同じように、`Step` を2つの段のそれぞれに、`Crate` を2つの箱のそれぞれにドラッグします。
4. 壁のうち2つは、視界の外にあります。ヒエラルキーで **Wall North** を選択し、<kbd>Ctrl</kbd>キー（Macでは<kbd>Cmd</kbd>キー）を押しながら、残りの3つの壁を選択します。アセットパネルから `Wall` を、Renderコンポーネントの **Materials** の下にあるスロットにドラッグします。
5. **Light** を選択し、**Rotation** を `50`、`30`、`0` に設定します。影が庭の端まで届くように、Lightコンポーネントの下のほう、**Cast Shadows** の下で、**Resolution** を **2048 x 2048** に、**Distance** を `40` に設定します。

![ビューポートに表示された、色の付いたレベル](/img/tutorials/first-person-movement/level.webp)

マテリアルについては、[マテリアルの基本設定](/tutorials/basic-materials/)でさらに詳しく説明しています。

## 5. プレイヤーを作る {#make-the-player}

プレイヤーは目に見えないカプセルで、目の高さにCameraがあります。

1. ヒエラルキーで **Root** を選択し、**+**（エンティティを追加）ボタン、**Entity** の順に選択します。
2. インスペクターで、新しいエンティティの **Name** を `Player` に、**Position** を `0`、`1`、`5` に変更します。
3. **Collision** コンポーネントを追加し、**Type** を **Capsule** に設定します。**Radius** は `0.5`、**Height** は `2` のままにします。高さ2ユニットのカプセルが、床の上に立ちます。
4. **Rigid Body** コンポーネントを追加し、次の値を設定します。

    | 属性 | 値 | 理由 |
    | --- | --- | --- |
    | **Type** | **Dynamic** | 物理エンジンがプレイヤーを動かします。プレイヤーは落下し、着地し、壁で止まります。 |
    | **Mass** | `80` | 人の体重くらいの値で、単位はキログラムです。プレイヤーが箱をどれだけ楽に押せるかを決めます。 |
    | **Angular Factor** | `0`、`0`、`0` | ボディが回転しなくなるので、カプセルが倒れません。 |
    | **Friction** | `0` | プレイヤーは壁に張り付かず、壁に沿って滑ります。ブレーキはスクリプトがかけます。 |
    | **Restitution** | `0` | プレイヤーは着地したときに跳ねません。 |

5. ヒエラルキーで **Camera** を **Player** にドラッグして、その子にします。
6. ヒエラルキーでは、Playerが折りたたまれた状態になっています。その横の **+** を選択して **Camera** を表示し、**Camera** を選択して、**Position** を `0`、`0.6`、`0` に、**Rotation** を `0`、`0`、`0` に設定します。カプセルの中心は床から1ユニット上にあるので、目の高さは1.6です。

![PlayerのRigid Bodyコンポーネント](/img/tutorials/first-person-movement/player.webp)

プロジェクトを **Launch** します。あなたは庭の中に立ち、奥の壁を向いていますが、まだ動くことはできません。

## 6. 見回す {#look-around}

スクリプトは、まずマウスから始めます。

1. アセットパネルで **+**（アセットを追加）ボタンを選択し、**Script** を選択します。ファイル名として `first-person-movement.mjs` と入力し、<kbd>Enter</kbd>キーを押します。
2. `first-person-movement.mjs` をダブルクリックして、[コードエディター](/user-manual/editor/scripting/code-editor/)で開きます。
3. ファイルの内容をすべて以下のコードに置き換え、<kbd>Ctrl</kbd>+<kbd>S</kbd>（Macでは<kbd>Cmd</kbd>+<kbd>S</kbd>）で保存します。

```javascript
import { Script, Entity, Mouse, math } from 'playcanvas';

export class FirstPersonMovement extends Script {
    static scriptName = 'firstPersonMovement';

    /**
     * The Camera, a child of this Entity.
     *
     * @attribute
     * @title Camera
     * @type {Entity}
     */
    camera = null;

    /**
     * Degrees the view turns for each pixel the mouse moves.
     *
     * @attribute
     * @title Look Speed
     * @type {number}
     */
    lookSpeed = 0.25;

    initialize() {
        // The direction of the view, in degrees
        this.yaw = 0;
        this.pitch = 0;

        const mouse = this.app.mouse;
        mouse.on(Mouse.EVENT_MOUSEDOWN, this.onMouseDown, this);
        mouse.on(Mouse.EVENT_MOUSEMOVE, this.onMouseMove, this);

        this.on('destroy', () => {
            mouse.off(Mouse.EVENT_MOUSEDOWN, this.onMouseDown, this);
            mouse.off(Mouse.EVENT_MOUSEMOVE, this.onMouseMove, this);
        });
    }

    onMouseDown() {
        // Hide the pointer and keep it inside the game. Esc gives it back.
        if (!Mouse.isPointerLocked()) {
            this.app.mouse.enablePointerLock();
        }
    }

    onMouseMove(event) {
        if (!Mouse.isPointerLocked()) return;

        this.yaw -= event.dx * this.lookSpeed;
        this.pitch -= event.dy * this.lookSpeed;

        // Stop at straight up and straight down
        this.pitch = math.clamp(this.pitch, -90, 90);
    }

    update(dt) {
        // Only the Camera turns. The player's body always stays upright.
        this.camera.setLocalEulerAngles(this.pitch, this.yaw, 0);
    }
}
```

エディターに戻ります。

1. **Player** を選択します。インスペクターで **ADD COMPONENT** > **Script** を選択します。
2. **+ ADD SCRIPT** フィールドを選択し、`firstPersonMovement` を選びます。
3. `firstPersonMovement` スクリプトの **Parse** ボタンを選択します。**Edit** の隣にある、2つの矢印のボタンです。エディターがコードを読み取り、スクリプトの属性を一覧表示します。
4. ヒエラルキーから **Camera** を **Camera** スロットにドラッグします。

![Playerに追加したスクリプト。Cameraが割り当てられています](/img/tutorials/first-person-movement/script.webp)

プロジェクトを **Launch** して、シーンをクリックします。ポインターが消え、マウスで視点が動きます。<kbd>Esc</kbd>キーを押すと、ポインターが戻ります。

<StepVideo src="/video/first-person-movement-look.mp4" poster="/img/tutorials/first-person-movement/look.webp" label="視点が左右に動いたあと、空を見上げ、床を見下ろす様子" />

### 仕組み {#how-looking-works}

- **ポインターロック。** マウスポインターは画面の端で止まるので、そのままでは視点もそこで止まってしまいます。[`enablePointerLock`](https://api.playcanvas.com/engine/classes/Mouse.html#enablepointerlock)はポインターを隠し、マウスの動きを制限なく報告します。ブラウザはクリックへの応答としてしかこれを許可しないので、`onMouseDown` の中で呼び出しています。また、<kbd>Esc</kbd>キーを押すと、ブラウザは必ずポインターを戻します。
- **ヨーとピッチ。** スクリプトは2つの角度を保持します。`yaw`（ヨー）は視点を左右に向け、`pitch`（ピッチ）は上下に傾けます。`mousemove` イベントは、マウスが動いた距離 `dx` と `dy` をピクセル単位で渡します。これに **Look Speed** を掛けた値で、角度を変えます。
- **クランプ。** [`math.clamp`](https://api.playcanvas.com/engine/functions/math.clamp.html)は、`pitch` を-90度から90度の間に保ちます。これがないと、真上を越えて傾け続けることができ、世界が逆さまに見えてしまいます。
- **回転するのはCameraだけ。** `update` は両方の角度をCameraに適用します。Playerは回転しません。Rigid BodyのAngular Factorが0だからです。
- **後片付け。** `destroy` に登録したハンドラーがマウスのリスナーを解除するので、エンティティがなくなったあとにスクリプトが呼び出されることはありません。

## 7. 歩いてジャンプする {#walk-and-jump}

コードエディターで、`first-person-movement.mjs` の内容をすべて以下の完全なスクリプトに置き換え、保存します。

```javascript
import {
    Script, Entity, Mouse, Quat, Vec3, math,
    KEY_A, KEY_D, KEY_S, KEY_W, KEY_SPACE,
    KEY_DOWN, KEY_LEFT, KEY_RIGHT, KEY_UP
} from 'playcanvas';

export class FirstPersonMovement extends Script {
    static scriptName = 'firstPersonMovement';

    /**
     * The Camera, a child of this Entity.
     *
     * @attribute
     * @title Camera
     * @type {Entity}
     */
    camera = null;

    /**
     * Degrees the view turns for each pixel the mouse moves.
     *
     * @attribute
     * @title Look Speed
     * @type {number}
     */
    lookSpeed = 0.25;

    /**
     * Top speed along the ground, in meters per second.
     *
     * @attribute
     * @title Speed
     * @type {number}
     */
    speed = 5;

    /**
     * How quickly the player reaches that speed and stops again.
     *
     * @attribute
     * @title Acceleration
     * @type {number}
     */
    acceleration = 10;

    /**
     * Upward speed at the start of a jump, in meters per second.
     *
     * @attribute
     * @title Jump Speed
     * @type {number}
     */
    jumpSpeed = 5.5;

    initialize() {
        // The direction of the view, in degrees
        this.yaw = 0;
        this.pitch = 0;

        // Reused every frame, so that nothing is allocated while the game runs
        this.heading = new Quat();
        this.forward = new Vec3();
        this.right = new Vec3();
        this.wanted = new Vec3();
        this.force = new Vec3();
        this.rayEnd = new Vec3();

        const mouse = this.app.mouse;
        mouse.on(Mouse.EVENT_MOUSEDOWN, this.onMouseDown, this);
        mouse.on(Mouse.EVENT_MOUSEMOVE, this.onMouseMove, this);

        this.on('destroy', () => {
            mouse.off(Mouse.EVENT_MOUSEDOWN, this.onMouseDown, this);
            mouse.off(Mouse.EVENT_MOUSEMOVE, this.onMouseMove, this);
        });
    }

    onMouseDown() {
        // Hide the pointer and keep it inside the game. Esc gives it back.
        if (!Mouse.isPointerLocked()) {
            this.app.mouse.enablePointerLock();
        }
    }

    onMouseMove(event) {
        if (!Mouse.isPointerLocked()) return;

        this.yaw -= event.dx * this.lookSpeed;
        this.pitch -= event.dy * this.lookSpeed;

        // Stop at straight up and straight down
        this.pitch = math.clamp(this.pitch, -90, 90);
    }

    isOnGround() {
        // Cast a ray from the middle of the player to just below its feet
        const start = this.entity.getPosition();
        const end = this.rayEnd.copy(start);
        end.y -= this.entity.collision.height / 2 + 0.1;

        return this.app.systems.rigidbody.raycastFirst(start, end) !== null;
    }

    update(dt) {
        const keyboard = this.app.keyboard;
        const body = this.entity.rigidbody;

        // Only the Camera turns. The player's body always stays upright.
        this.camera.setLocalEulerAngles(this.pitch, this.yaw, 0);

        // Forward and right along the ground, whichever way the Camera is tilted
        this.heading.setFromEulerAngles(0, this.yaw, 0);
        this.heading.transformVector(Vec3.FORWARD, this.forward);
        this.heading.transformVector(Vec3.RIGHT, this.right);

        let x = 0;
        let z = 0;
        if (keyboard.isPressed(KEY_W) || keyboard.isPressed(KEY_UP)) z += 1;
        if (keyboard.isPressed(KEY_S) || keyboard.isPressed(KEY_DOWN)) z -= 1;
        if (keyboard.isPressed(KEY_D) || keyboard.isPressed(KEY_RIGHT)) x += 1;
        if (keyboard.isPressed(KEY_A) || keyboard.isPressed(KEY_LEFT)) x -= 1;

        // The velocity the player is asking for. Normalizing it keeps a diagonal
        // no faster than a straight line.
        this.wanted.set(0, 0, 0)
            .add(this.forward.mulScalar(z))
            .add(this.right.mulScalar(x))
            .normalize()
            .mulScalar(this.speed);

        // Push toward that velocity: the further off it is, the harder the push.
        // With no key held the wanted velocity is zero, so the same push is the brake.
        this.force.sub2(this.wanted, body.linearVelocity);
        this.force.y = 0;
        this.force.mulScalar(body.mass * this.acceleration);
        body.applyForce(this.force);

        if (keyboard.wasPressed(KEY_SPACE) && this.isOnGround()) {
            body.applyImpulse(0, body.mass * this.jumpSpeed, 0);
        }
    }
}
```

エディターに戻り、**Player** を選択して、スクリプトの **Parse** をもう一度選択します。新しい属性が3つ表示されます。**Speed**、**Acceleration**、**Jump Speed** です。

:::note

エディターがスクリプトの属性を読み取るのは、**Parse** を選択したときだけです。コードの中の属性を追加または変更したときは、もう一度行ってください。

:::

プロジェクトを **Launch** します。<kbd>W</kbd>、<kbd>A</kbd>、<kbd>S</kbd>、<kbd>D</kbd>キーまたは矢印キーで歩き、<kbd>Space</kbd>キーでジャンプします。箱を押して庭を横切り、低い段に飛び乗って、そこから高い段に飛び移ってみましょう。

<StepVideo src="/video/first-person-movement-walk.mp4" poster="/img/tutorials/first-person-movement/walk.webp" label="プレイヤーが箱まで歩いて押したあと、低い段と高い段に飛び乗る様子" />

### 歩く仕組み {#how-walking-works}

- **どちらが前か。** 下を見ているとき、Camera自身の前方向は床の中を指します。そこでスクリプトは、`yaw` だけから回転を作り、それを使って[`Vec3.FORWARD`](https://api.playcanvas.com/engine/classes/Vec3.html#forward)と `Vec3.RIGHT` を回転させます。結果は、常に地面に沿った方向になります。
- **望む速度。** キーは、-1、0、1のいずれかの値を `x` と `z` に与えます。これを2つの方向と組み合わせ、正規化して **Speed** を掛けると、プレイヤーが望んでいる速度になります。キーを押していないときは、ゼロです。
- **押す力。** スクリプトがボディの速度を直接設定することはありません。[`applyForce`](https://api.playcanvas.com/engine/classes/RigidBodyComponent.html#applyforce)で力を加えます。力の大きさは、望む速度と実際の速度の差に比例します。差が大きければ強く押し、差がなければ押しません。そのためプレイヤーは、すばやく加速し、**Speed** で落ち着き、キーを離すとブレーキがかかります。これがすべて、1行の計算で実現されます。
- **なぜ力を使うのか。** 主導権は物理エンジンにあります。壁はプレイヤーを止め、箱を動かすにはある程度の力が必要で、プレイヤーにぶつかったものはプレイヤーを押し返します。
- **上下方向。** `this.force.y = 0` によって、垂直方向は重力とジャンプに任せています。

### ジャンプの仕組み {#how-jumping-works}

- **1回押すと1回ジャンプ。** [`wasPressed`](https://api.playcanvas.com/engine/classes/Keyboard.html#waspressed)は、キーが押されたフレームでだけtrueになります。`isPressed` は、キーが押されている間ずっとtrueです。
- **インパルス。** 力は時間をかけて作用します。インパルスは一度きりのキックで、[`applyImpulse`](https://api.playcanvas.com/engine/classes/RigidBodyComponent.html#applyimpulse)は速度を瞬時に変えます。**Jump Speed** にボディの質量を掛けているので、質量がいくつでも同じジャンプになります。
- **接地判定。** これがないと、空中でもう一度ジャンプできてしまいます。`isOnGround` は、[`raycastFirst`](https://api.playcanvas.com/engine/classes/RigidBodyComponentSystem.html#raycastfirst)で、カプセルの中心から足のすぐ下の点までレイをキャストします。レイが何かに当たれば、プレイヤーはその上に立っています。レイはプレイヤー自身のカプセルの内側から始まりますが、レイキャストはそのカプセルを無視します。レイでほかに何がわかるかは、[レイキャスティング](/user-manual/physics/ray-casting/)で説明しています。

## 8. 操作感を調整する {#tune-the-feel}

**Player** を選択し、スクリプトの属性を変更します。別のタブでプロジェクトを実行したままでも変更できます。<kbd>Enter</kbd>キーを押すと、値は起動中のプロジェクトにすぐ反映されます。

| 属性 | デフォルト | 変わること |
| --- | --- | --- |
| **Look Speed** | `0.25` | マウスが1ピクセル動くごとに視点が回転する角度です。下げると安定し、上げると敏感になります。 |
| **Speed** | `5` | 最高速度で、単位はユニット毎秒です。早歩きは約2、全力疾走は約8です。 |
| **Acceleration** | `10` | 望む速度との差が縮まる速さです。`10` では、3分の1秒ほどで最高速度に近づきます。`2` では、氷の上にいるように感じます。 |
| **Jump Speed** | `5.5` | 踏み切るときの上向きの速度です。ジャンプの高さは、この速度の2乗を重力の2倍で割った値です。5.5では約1.5ユニットで、高さ1の段には十分です。約7を超えると、高い段からのジャンプで壁を越えられます。 |

PlayerのRigid Bodyにある2つの値も重要です。**Mass** は、プレイヤーと箱が互いをどう押すかを決めます。`1` にすると、箱にぶつかるとほとんど止まってしまいます。**Friction** を0より大きくすると、空中で壁に向かって歩くことで、壁に張り付けるようになります。

## 次のステップ {#where-to-go-next}

- **タッチ、ゲームパッド、ダッシュ。** エンジンには、同じ考え方で作られた完全なコントローラー、[`first-person-controller.mjs`](https://github.com/playcanvas/engine/blob/main/scripts/esm/first-person-controller.mjs)が付属しています。これをプロジェクトにアップロードし、自分のスクリプトの代わりにPlayerに追加します。
- **より正確な接地判定。** 中心からの1本のレイは、プレイヤーが段のぎりぎりの端に立っているときに外れます。複数のレイをキャストするか、[コリジョンイベント](/tutorials/collision-and-triggers/)を使うと、この隙間を埋められます。
- **力についてさらに詳しく。** [力と衝撃](/tutorials/using-forces-on-rigid-bodies/)では、トルクや、ボディのテレポートを扱っています。
- **歩き回れるレベル。** [ファーストパーソンシューター スターターキット](/tutorials/first-person-shooter-starter-kit/)は、同じ種類の移動を、より大きなレベルで使っています。
