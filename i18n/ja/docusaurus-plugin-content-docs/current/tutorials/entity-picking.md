---
title: シーン上のエンティティの選択
description: ユーザーがクリックまたはタッチしたエンティティを調べます。まず物理のレイキャストで、次にPickerで行い、それぞれをいつ使うかを学びます。
tags: [raycast, basics, physics]
thumb: https://s3-eu-west-1.amazonaws.com/images.playcanvas.com/projects/12/405856/DS51PO-image-75.jpg
---

<div className="iframe-container">
    <iframe loading="lazy" src="https://playcanv.as/b/81344638/" title="レイキャストによるピッキング" allow="camera; microphone; xr-spatial-tracking; fullscreen" allowFullScreen></iframe>
</div>

*レイキャストによるピッキング。白い形状をクリックまたはタッチしてください。赤い形状は対象から外してあります。*

<div className="iframe-container">
    <iframe loading="lazy" src="https://playcanv.as/b/4f6dabd5/" title="Pickerによるピッキング" allow="camera; microphone; xr-spatial-tracking; fullscreen" allowFullScreen></iframe>
</div>

*Pickerによるピッキング。見た目も動作も同じですが、仕組みは異なります。*

ピッキングとは、ユーザーが画面をクリックまたはタッチしたときに、ポインターの下にあるエンティティを特定することです。このチュートリアルでは、シーンを1つ作り、2通りの方法でピッキングします。

- **レイキャスト**は、Cameraからポインターを通る直線が何に当たるかを、[物理エンジン](/user-manual/physics/)に問い合わせます。
- **Picker**は、シーンを見えない画像に描画し、ポインターの下にあるピクセルを調べます。

最後のセクションで、2つを比較します。

:::info[はじめる前に]

エディターの使い方に慣れるために、先に[初めてのアプリ](/user-manual/editor/getting-started/your-first-app/)を終えておくとよいでしょう。自分の作業と比べるには、[完成したプロジェクト](https://playcanvas.com/project/405856)を開いてください。

:::

## 1. シーンを作る {#build-the-scene}

**Blank Project** キットから新しいプロジェクトを作成し、エディターで開きます。シーンには、空の下に、Camera、Light、Box、Planeがあります。

1. **Camera** を選択します。インスペクターで **Position** を `0`、`2.5`、`7` に、**Rotation** を `-15`、`0`、`0` に変更して、シーンを正面から見るようにします。
2. **Box** を選択し、**Position** を `-2.25`、`0.5`、`0` に変更します。
3. ヒエラルキーで **Root** を選択し、**+**（エンティティを追加）ボタン、**3D** > **Sphere** の順に選択します。新しいエンティティの **Position** を `-0.75`、`0.5`、`0` に変更します。
4. 同じ方法で、形状をあと2つ追加します。毎回、先に **Root** を選択してください。

    | 3D形状 | Position |
    | --- | --- |
    | **Cone** | `0.75`、`0.5`、`0` |
    | **Capsule** | `2.25`、`1`、`0` |

![エディターに表示された4つの形状](/img/tutorials/entity-picking/scene.webp)

## 2. 形状が反応するようにする {#make-the-shapes-react}

ピッキングされた形状は、ピッキングされたことを示す必要があります。次のスクリプトは、エンティティが `picked` というイベントを受け取ったときに、エンティティを揺らします。このあと作る2つのピッキングスクリプトは、どちらもこのイベントを発行します。

1. アセットパネルで **+**（アセットを追加）ボタンを選択し、**Script** を選択します。ファイル名として `pulse.mjs` と入力し、<kbd>Enter</kbd>キーを押します。
2. `pulse.mjs` をダブルクリックして、[コードエディター](/user-manual/editor/scripting/code-editor/)で開きます。
3. ファイルの内容をすべて以下のコードに置き換え、<kbd>Ctrl</kbd>+<kbd>S</kbd>（Macでは<kbd>Cmd</kbd>+<kbd>S</kbd>）で保存します。

```javascript
import { Script } from 'playcanvas';

export class Pulse extends Script {
    static scriptName = 'pulse';

    initialize() {
        // Counts down from 1 to 0 while the Entity is pulsing
        this.time = 0;

        this.entity.on('picked', this.onPicked, this);

        this.on('destroy', () => {
            this.entity.off('picked', this.onPicked, this);
        });
    }

    onPicked() {
        this.time = 1;
    }

    update(dt) {
        if (this.time === 0) return;

        this.time = Math.max(0, this.time - dt);

        // A wobble that dies away as the time runs out
        const scale = 1 + Math.sin(this.time * 10) * this.time * 0.5;
        this.entity.setLocalScale(scale, scale, scale);
    }
}
```

エディターに戻ります。

1. ヒエラルキーで **Box** を選択し、<kbd>Ctrl</kbd>キー（Macでは<kbd>Cmd</kbd>キー）を押しながら、**Sphere**、**Cone**、**Capsule** を選択します。
2. インスペクターで **ADD COMPONENT** > **Script** を選択します。Scriptコンポーネントはインスペクターの一番下に追加されるので、そこまでスクロールします。
3. **+ ADD SCRIPT** フィールドを選択し、`pulse` を選びます。

エンティティは、好きな名前の独自のイベントを発行したり、受け取ったりできます。ピッキングスクリプトは、形状がピッキングされたことだけを知っていれば十分です。それに対して何をするかは形状しだいなので、別のスクリプトを使えば、代わりにサウンドを鳴らしたり、メニューを開いたりできます。

## 3. レイキャストでピッキングする {#pick-with-a-ray-cast}

レイキャストには、当たる対象が必要です。物理エンジンでは、それがコリジョン形状です。

1. **Box** を選択し、**ADD COMPONENT** > **Physics** > **Collision** を選択します。新しいCollisionコンポーネントは、最初からちょうどよい大きさのボックスになっています。
2. コンポーネントに **Ammo module not found** と表示されます。**IMPORT AMMO** を選択して、物理エンジンをプロジェクトに追加します。
3. 残りの形状にもそれぞれ **Collision** コンポーネントを追加し、形状に合わせます。

    | エンティティ | Type | その他の値 |
    | --- | --- | --- |
    | **Sphere** | **Sphere** | **Radius** は `0.5` のままにします。 |
    | **Cone** | **Cone** | **Radius** は `0.5`、**Height** は `1` のままにします。 |
    | **Capsule** | **Capsule** | **Radius** は `0.5`、**Height** は `2` のままにします。 |

![ConeのCollisionコンポーネント](/img/tutorials/entity-picking/collision.webp)

形状にRigid Bodyコンポーネントは必要ありません。レイキャストは、コリジョン形状だけで対象を見つけます。

次はスクリプトです。`pulse.mjs` と同じ方法で `picker-raycast.mjs` というスクリプトを作成し、内容を以下のコードに置き換えます。

```javascript
import { Script, Mouse, TouchDevice } from 'playcanvas';

export class PickerRaycast extends Script {
    static scriptName = 'pickerRaycast';

    initialize() {
        const { mouse, touch } = this.app;

        mouse.on(Mouse.EVENT_MOUSEDOWN, this.onMouseDown, this);
        touch?.on(TouchDevice.EVENT_TOUCHSTART, this.onTouchStart, this);

        this.on('destroy', () => {
            mouse.off(Mouse.EVENT_MOUSEDOWN, this.onMouseDown, this);
            touch?.off(TouchDevice.EVENT_TOUCHSTART, this.onTouchStart, this);
        });
    }

    onMouseDown(event) {
        this.pick(event.x, event.y);
    }

    onTouchStart(event) {
        const touch = event.touches[0];
        this.pick(touch.x, touch.y);

        // Stop the browser from also sending a mouse event for this touch
        event.event.preventDefault();
    }

    pick(x, y) {
        // A script that is turned off while running still receives events
        if (!this.enabled) return;

        const camera = this.entity.camera;

        // A ray from the Camera through the point that was pressed, as far as the Camera can see
        const from = this.entity.getPosition();
        const to = camera.screenToWorld(x, y, camera.farClip);

        // The closest collision shape the ray hits, if any
        const result = this.app.systems.rigidbody.raycastFirst(from, to);
        if (result) {
            result.entity.fire('picked');
        }
    }
}
```

エディターに戻り、**Camera** を選択します。**ADD COMPONENT** > **Script** を選択してから、**+ ADD SCRIPT** フィールドを選択し、`pickerRaycast` を選びます。

プロジェクトを **Launch** して、形状をクリックします。スマートフォンやタブレットでは、タッチします。形状が揺れます。床や空をクリックしても、何も起こりません。

### 仕組み {#how-the-ray-cast-works}

- **マウスとタッチ。** スクリプトは両方のイベントを受け取り、どちらも画面上の位置を `pick` に渡します。タッチスクリーンのないデバイスには `app.touch` が存在しないので、`?.` を使っています。
- **画面からワールドへ。** 画面上の1点は、3Dワールドでは1本の直線全体に対応します。[`screenToWorld`](https://api.playcanvas.com/engine/classes/CameraComponent.html#screentoworld)は、その直線上で、Cameraから指定した距離にある点を返します。スクリプトは、Cameraの **Far Clip** の距離にある、一番遠い点を求めています。[スクリーン座標とワールド座標](/user-manual/graphics/cameras/screen-and-world/)を参照してください。
- **レイ。** [`raycastFirst`](https://api.playcanvas.com/engine/classes/RigidBodyComponentSystem.html#raycastfirst)は、Cameraからその点までの直線をたどり、最初に当たったコリジョン形状を返します。何にも当たらなければ `null` を返します。結果には、エンティティのほかに、当たった正確な位置と、その位置での表面の向きも含まれます。詳しくは[レイキャスティング](/user-manual/physics/ray-casting/)を参照してください。
- **オフにしたとき。** プロジェクトの起動時にオフになっているスクリプトは `initialize` を実行しないので、何のイベントも受け取りません。プロジェクトの実行中にオフにしたスクリプトは、更新は止まりますが、マウスとタッチのリスナーは残ったままです。`pick` の最初の行は、この場合に対応するためのものです。これにより、起動したタブを開いたまま、エディターで2つのピッキングスクリプトを切り替えられます。

## 4. Pickerでピッキングする {#pick-with-the-picker}

[Picker](/user-manual/graphics/cameras/scene-picker/)に物理は必要ありません。Pickerは、すべてのメッシュをそれぞれ固有の単色で塗り、シーンを目に見えない画像にもう一度描画して、ポインターの下にあるピクセルの色を読み取ります。

`picker-framebuffer.mjs` というスクリプトを作成し、内容を以下のコードに置き換えます。

```javascript
import { Script, Entity, MeshInstance, Mouse, Picker, TouchDevice } from 'playcanvas';

export class PickerFramebuffer extends Script {
    static scriptName = 'pickerFramebuffer';

    /**
     * The size of the pick buffer, as a fraction of the canvas. 1 is the most accurate and the
     * slowest. Smaller values are faster and can miss small shapes.
     *
     * @attribute
     * @title Pick Area Scale
     * @type {number}
     * @range [0.01, 1]
     */
    pickAreaScale = 0.25;

    /**
     * The names of the layers to pick from. Leave it empty to pick from every layer.
     *
     * @attribute
     * @title Layer Names
     * @type {string[]}
     */
    layerNames = [];

    initialize() {
        // The buffer is given its real size before every pick
        this.picker = new Picker(this.app, 1, 1);

        const { mouse, touch } = this.app;

        mouse.on(Mouse.EVENT_MOUSEDOWN, this.onMouseDown, this);
        touch?.on(TouchDevice.EVENT_TOUCHSTART, this.onTouchStart, this);

        this.on('destroy', () => {
            mouse.off(Mouse.EVENT_MOUSEDOWN, this.onMouseDown, this);
            touch?.off(TouchDevice.EVENT_TOUCHSTART, this.onTouchStart, this);
            this.picker.destroy();
        });
    }

    onMouseDown(event) {
        this.pick(event.x, event.y);
    }

    onTouchStart(event) {
        const touch = event.touches[0];
        this.pick(touch.x, touch.y);

        // Stop the browser from also sending a mouse event for this touch
        event.event.preventDefault();
    }

    async pick(x, y) {
        // A script that is turned off while running still receives events
        if (!this.enabled) return;

        const canvas = this.app.graphicsDevice.canvas;
        const scale = this.pickAreaScale;

        const layers = this.layerNames
            .map(name => this.app.scene.layers.getLayerByName(name))
            .filter(layer => layer !== null);

        // Draw the scene into the pick buffer, with every mesh in a color of its own
        this.picker.resize(canvas.clientWidth * scale, canvas.clientHeight * scale);
        this.picker.prepare(this.entity.camera, this.app.scene, layers.length > 0 ? layers : undefined);

        // Read back the pixel that was pressed
        const selection = await this.picker.getSelectionAsync(x * scale, y * scale);

        // Nothing was under the pointer, or it was not a mesh (the Picker also finds Gaussian splats)
        const picked = selection[0];
        if (!(picked instanceof MeshInstance)) return;

        // A mesh can belong to a child node of the Entity it is part of, so walk up to the Entity
        let node = picked.node;
        while (node && !(node instanceof Entity)) {
            node = node.parent;
        }

        node?.fire('picked');
    }
}
```

エディターに戻ります。

1. **Camera** を選択します。Scriptコンポーネントで **+ ADD SCRIPT** フィールドを選択し、`pickerFramebuffer` を選びます。
2. `pickerFramebuffer` スクリプトの **Parse** ボタンを選択します。**Edit** の隣にある、2つの矢印のボタンです。2つの属性が表示されます。
3. `pickerRaycast` スクリプトの行にある **ON** スイッチでスクリプトをオフにして、クリックに応答するスクリプトが1つだけになるようにします。スイッチの表示は **OFF** に変わります。

![Cameraに追加した2つのピッキングスクリプト](/img/tutorials/entity-picking/scripts.webp)

プロジェクトを **Launch** します。ピッキングは前と同じように動作します。物理はもう関係していません。Collisionコンポーネントが1つもなくても、Pickerは形状を見つけます。ただし、次のステップで使うので、コンポーネントはそのままにしておきます。

### 仕組み {#how-the-picker-works}

- **ピックバッファ。** [`prepare`](https://api.playcanvas.com/engine/classes/Picker.html#prepare)は、Cameraから見たシーンを、Picker専用の画像であるピックバッファに描画します。**Pick Area Scale** はその大きさを決めます。`0.25` では、幅と高さがキャンバスの4分の1になり、描画するピクセル数は16分の1になります。バッファを小さくすると速くなりますが、数ピクセルしか占めていない形状を見逃すことがあります。
- **読み戻し。** [`getSelectionAsync`](https://api.playcanvas.com/engine/classes/Picker.html#getselectionasync)は、ピクセルを読み取り、そこにあるメッシュを返します。結果はグラフィックスカードから戻ってくる必要があるので、少し遅れて届きます。`await` は、フレームを止めずにそれを待ちます。
- **メッシュからエンティティへ。** Pickerが報告するのはメッシュインスタンスです（ガウシアンスプラットを返すこともありますが、このスクリプトは無視します）。メッシュインスタンスはノードに属しています。今回の形状では、そのノードがエンティティそのものです。インポートしたモデルでは、何階層か下の子ノードであることもあるので、ループでエンティティに到達するまでさかのぼります。
- **すべてがピッキングされる。** 床もメッシュなので、床をクリックするとPlaneがピッキングされます。Planeにはイベントを待っている `pulse` スクリプトがないので、何も起こりません。

## 5. 形状を対象から外す {#leave-shapes-out}

シーンの中で、ピッキングできるようにしたいのは一部だけ、ということがよくあります。ここでは、ConeとCapsuleを背景扱いにします。2つの方法では、対象から外すやり方が異なります。

まず、見分けがつくようにします。

1. アセットパネルで **+**（アセットを追加）ボタンを選択し、**Material** を選択します。新しいマテリアルを選択し、**Name** を `Red` に変更します。**Diffuse** を展開し、**Color** の色見本を選択して、16進数のフィールドに `E5484D` と入力し、<kbd>Tab</kbd>キーを押します。
2. `Red` を、アセットパネルからビューポート内のConeとCapsuleにドラッグします。

**レイキャストの場合**、コリジョン形状のないエンティティには当たりません。

1. **Cone** を選択します。Collisionコンポーネントのヘッダーにある **⋯** ボタンを選択し、**Remove Component** を選択します。
2. **Capsule** にも同じ操作を行います。

**Pickerの場合**、形状を専用の[レイヤー](/user-manual/graphics/layers/)に移し、どのレイヤーを描画するかをPickerに指定します。

1. **Settings** ボタン（ツールバーの一番下にある歯車）を選択し、**Layers** を展開します。**New Layer** フィールドに `Scenery` と入力し、**ADD LAYER** を選択します。
2. **Render Order** の下にある **ADD SUBLAYER** を選択し、**Scenery Opaque** を選びます。サブレイヤーはリストの最後に追加されます。レイヤーは、このリストに入って初めて描画されます。
3. **Camera** を選択し、**Layers** のドロップダウンを開いて **Scenery** を選びます。これでCameraが新しいレイヤーを描画します。
4. **Light** を選択し、Lightコンポーネントの一番下にある **Layers** フィールドで同じ操作を行います。これでLightがそのレイヤーを照らします。
5. **Cone** と **Capsule** を一緒に選択します。Renderコンポーネントで **Layers** のドロップダウンを開いて **Scenery** を選び、**World** タグの **×** を選択して削除します。
6. **Camera** を選択します。`pickerFramebuffer` スクリプトで、**Layer Names** フィールド（**Array Size** と表示されています）を `0` から `1` に変更し、<kbd>Enter</kbd>キーを押します。その下に表示されるフィールドに `World` と入力し、<kbd>Enter</kbd>キーを押します。

![SettingsのSceneryレイヤー](/img/tutorials/entity-picking/layers.webp)

プロジェクトを **Launch** します。白い形状はクリックすると今までどおり揺れ、赤い形状は揺れません。`pickerFramebuffer` をオフ、`pickerRaycast` をオンにしてもう一度起動しても、結果は同じです。

この方法でPickerの対象から外した形状は、ピックバッファにまったく描画されないので、その後ろにあるピッキング可能な形状を隠すことはありません。コリジョンのない形状も、レイにとっては同じです。レイはそのまま通り抜けます。

## 6. どちらを使うか {#which-one-to-use}

| | レイキャスト | Picker |
| --- | --- | --- |
| **必要なもの** | ピッキング可能なすべてのエンティティにCollisionコンポーネント。そして物理エンジン。ダウンロードサイズが約1 MB増えます。 | すでにシーンにあるメッシュだけ。 |
| **ピッキングできるもの** | コリジョン形状。通常はメッシュより単純です。 | メッシュが占めるピクセルそのもの。精度はピックバッファの解像度で決まります。 |
| **1回のピッキングのコスト** | ごくわずか。 | シーンをもう一度描画します。結果は少し遅れて届きます。 |
| **わかること** | エンティティ、当たった位置、その位置での表面の向き。 | メッシュ。深度を有効にすると、位置もわかります。 |
| **対象から外す方法** | コリジョン形状を付けない。または、レイキャストに[フィルター](/user-manual/physics/ray-casting/#filtering-ray-casts)を指定する。 | レイヤー。 |

まとめると、プロジェクトがすでに物理を使っているなら、レイキャストのほうが軽く、簡単です。物理を使っていないなら、Pickerを使えば、ピッキングのためだけに物理を追加せずに済みます。また、Pickerは、細かいモデルの実際の輪郭に従います。

3つ目の方法もあります。単純な形状が少数あるだけなら、物理もPickerも使わずに、レイと球やボックスとの交差を自分で計算できます。[物理を使わないエンティティのピッキング](/tutorials/entity-picking-without-physics/)のサンプルは、この方法を使っています。

## 次のステップ {#where-to-go-next}

- [レイキャスティング](/user-manual/physics/ray-casting/)では、レイキャストの結果、フィルタリング、ピッキング以外の用途でのレイキャストを説明しています。
- [シーンピッカー](/user-manual/graphics/cameras/scene-picker/)では、矩形の範囲をまとめてピッキングする方法、ピッキングした点のワールド位置を求める方法、ガウシアンスプラットのピッキングを扱っています。
- [基本的なマウス入力](/tutorials/mouse-input/)では、マウスについてさらに詳しく説明しています。
