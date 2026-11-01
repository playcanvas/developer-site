---
title: <pc-sprite>
description: "pc-sprite要素のリファレンス: テクスチャアトラスから2Dスプライトを描画します。1つのフレーム、またはアニメーションするpc-sprite-clipのクリップを、色付け、反転、タイルや9スライスによるサイズ指定とともに表示します。"
---

`<pc-sprite>`タグは、エンティティの位置に2D画像を描画するスプライトコンポーネントを追加します。キャラクター、コイン、地面の帯、背景の層などです。`simple`スプライトはスプライトアセットの1つのフレームを表示し、`animated`スプライトは子として持つ[`<pc-sprite-clip>`](../pc-sprite-clip)を再生します。

:::note[使用法]

* [`<pc-entity>`](../pc-entity)、[`<pc-model>`](../pc-model)、または[`<pc-node>`](../pc-node)の直接の子である必要があります。
* 0..n個の[`<pc-sprite-clip>`](../pc-sprite-clip)を子として持つことができ、それぞれが1つの名前付きクリップを宣言します。これらを再生するのは`animated`スプライトだけです。

:::

## スプライトアセット {#sprite-assets}

スプライトは2種類の[`<pc-asset>`](../pc-asset)から描画されます。アトラスを先に宣言します。

1. **`textureatlas`**アセット: すべてのフレームを収めた1枚の画像と、`data`のJSONです。その`frames`オブジェクトが各フレームに名前を付け、画像内の位置を示します。フレームの`rect`は`[x, y, width, height]`をピクセル単位で表し、画像の**左下**の角から測ります。`pivot`はエンティティの位置に置かれる点で、`[0, 0]`（左下）から`[1, 1]`（右上）までの値を取ります。`[0.5, 0]`にすると、キャラクターが足元で立ちます。[9スライス](/user-manual/2D/slicing/)用のフレームには`border`もあり、`[left, bottom, right, top]`をピクセル単位で指定します。
2. アトラスから切り出した1つ以上の**`sprite`**アセット: `atlas`でアトラスを指定し、`frame-keys`でスプライトを構成するフレームを順に列挙し、`pixels-per-unit`でサイズを決めます。高さ24ピクセルのフレームは、`pixels-per-unit="16"`ではワールド単位で1.5の高さになります。`render-mode`は、スプライトが独自のサイズをどう埋めるかを決めます。[タイルとスライスのスプライト](#tiled-and-sliced-sprites)を参照してください。

```html
<pc-app>
    <!-- アトラス: 1枚の画像と、その中の各フレームの位置 -->
    <pc-asset id="atlas" type="textureatlas" src="sprites.png"
              srgb mipmaps="false" min-filter="nearest" mag-filter="nearest"
              data='{ "frames": {
                  "coin-0": { "rect": [0, 0, 12, 12], "pivot": [0.5, 0.5] },
                  "coin-1": { "rect": [12, 0, 12, 12], "pivot": [0.5, 0.5] },
                  "coin-2": { "rect": [24, 0, 12, 12], "pivot": [0.5, 0.5] },
                  "platform": { "rect": [201, 46, 28, 16], "pivot": [0.5, 1], "border": [6, 0, 6, 0] }
              } }'></pc-asset>
    <!-- アトラスから切り出したスプライト: フレームの並びと、そのスケール -->
    <pc-asset id="coin" type="sprite" atlas="atlas" frame-keys="coin-0 coin-1 coin-2" pixels-per-unit="16"></pc-asset>
    <pc-asset id="platform" type="sprite" atlas="atlas" frame-keys="platform" pixels-per-unit="16" render-mode="tiled"></pc-asset>
    <pc-scene>
        <pc-entity name="coin" position="0 1 0">
            <pc-sprite asset="coin"></pc-sprite>
        </pc-entity>
    </pc-scene>
</pc-app>
```

スプライトのフレームは、そのスプライトが表示できるものです。`simple`スプライトはその1つを`frame`で選んで描画するため、1つのスプライトアセットでバリエーションの組を提供できます。[Spritesサンプル](https://playcanvas.github.io/web-components/examples/#sprites.html)は、草原の花、キノコ、岩をすべて6フレームの`decor`スプライト1つから描いています。`animated`スプライトのクリップは、それぞれのスプライトのフレームを順に再生します。

### ピクセルアート {#pixel-art}

ピクセルアートには、アトラスに4つのテクスチャオプションが必要です。上の例ではすべて設定しています。

* `min-filter="nearest"`と`mag-filter="nearest"`は、各ピクセルを角の立った正方形としてサンプリングします。デフォルトの線形フィルタリングは隣り合うピクセルを混ぜるため、小さな画像を大きく描くとぼやけます。
* `mipmaps="false"`は、テクスチャの縮小済みでぼかされたコピーを無効にします。これがあると、ピクセルサイズより小さく描かれたスプライトがそれをサンプリングし、ぼやけるうえに、アトラス内の隣のフレームが縁ににじみ込みます。
* `srgb`は画像をガンマエンコードされたカラーとして扱います。画像編集ソフトで描いたPNGが保持しているのはこの形式なので、描いたとおりの色でスプライトが表示されます。指定しないと色が薄く出ます。

画面上でピクセルが正方形のまま保たれるのは、各ピクセルが画面の整数個のピクセルを覆うときだけです。正射影カメラでは、Spritesサンプルのスクリプトがウィンドウのリサイズのたびに行っているように、キャンバスの高さから`ortho-height`を決める必要があります。

## 属性 {#attributes}

<div className="attribute-table">

| 属性 | タイプ | デフォルト | 説明 |
| --- | --- | --- | --- |
| `asset` | [Asset ID](../attributes.md#asset-and-material-ids) | - | 描画するスプライトのスプライトアセットID（`sprite`型アセットを参照する必要があります）。`simple`スプライトのみ: `animated`スプライトはクリップからフレームを取ります。空の場合は何も描画しません |
| `clip` | String | - | 再生するクリップの名前（`animated`スプライトのみ）。変更すると再生が切り替わり、同じ名前を再び設定すると、終了したクリップが最初から再生されます。[クリップの再生](#playing-clips)を参照してください |
| `color` | Color | `"1 1 1 1"` | スプライトに付ける色。テクスチャの色に乗算されます。アルファは無視されるため、透明度には`opacity`を使用します |
| `enabled` | Boolean | `"true"` | コンポーネントの有効状態 |
| `flip-x` | Boolean | `"false"` | スプライトを左右反転するかどうか。たとえばキャラクターを反対向きにするときに使います |
| `flip-y` | Boolean | `"false"` | スプライトを上下反転するかどうか |
| `frame` | Number | `"0"` | 描画するフレームのインデックス。現在のスプライトのフレームキーの中で数えます。`animated`スプライトでは、設定すると再生中のクリップがそのフレームへ移り、そこから再生が続きます。ただしクリップは常に最初のフレームから始まるため、マークアップで指定した`frame`は効果がありません |
| `height` | Number | `"1"` | スプライトの高さ（ワールド単位）。スプライトアセットの`render-mode`が`sliced`または`tiled`のときだけ使われます |
| `opacity` | Number | `"1"` | スプライトの不透明度（0〜1） |
| `speed` | Number | `"1"` | すべてのクリップに適用される再生速度の乗数。0で再生が止まります。各クリップの`fps`に乗算されます |
| `type` | Enum | `"simple"` | スプライトのタイプ: `"simple"` \| `"animated"`。`"simple"`はスプライト`asset`の1つのフレームを描画し、`"animated"`は子の`<pc-sprite-clip>`を、`clip`で指定したものから再生します |
| `width` | Number | `"1"` | スプライトの幅（ワールド単位）。スプライトアセットの`render-mode`が`sliced`または`tiled`のときだけ使われます |

</div>

:::note[スプライトの描画方法]

スプライトはライティングの影響を受けません。ライト、環境光の色、フォグ、トーンマッピングのいずれも適用されないため、スプライトはテクスチャの色に`color`を乗算した色で表示されます。スプライトはWorldレイヤーの半透明ジオメトリとして描画され、カメラの視線方向に沿って奥から手前の順にソートされ、深度は書き込みません。重なるスプライトには異なる深度を与えてください。Spritesサンプルでは、空の-10からスライムの1まで、背景をz方向に間隔を空けて配置しています。

:::

## クリップの再生 {#playing-clips}

`type="animated"`にすると、スプライトはフレームを表示する代わりにクリップを再生します。子の[`<pc-sprite-clip>`](../pc-sprite-clip)がそれぞれ1つのクリップ（名前、フレームを再生するスプライトアセット、フレームレート、ループするかどうか）を宣言し、`clip`が再生するクリップを指定します。

```html
<pc-sprite id="slime" type="animated" clip="idle">
    <pc-sprite-clip name="idle" asset="slime-idle" fps="8" loop></pc-sprite-clip>
    <pc-sprite-clip name="hop" asset="slime-hop" fps="12" loop></pc-sprite-clip>
    <pc-sprite-clip name="land" asset="slime-land" fps="12"></pc-sprite-clip>
</pc-sprite>
```

`clip`はライブです。マークアップ、開発者ツール、JavaScriptのどこから設定しても、再生が追従します。

* **変更すると**、指定したクリップへ即座に切り替わり、最初のフレームから再生します。スプライトのクリップはクロスフェードしません。
* **同じ名前を再び設定すると**、そのクリップが終了していれば最初から再生し直します。そのため`land`のような単発のクリップは、設定するたびに再生されます。再生中のクリップはそのまま続きます。
* **スプライトを有効にすると**、指定したクリップを最初のフレームから再生します。スプライトまたはそのエンティティを無効にすると再生中のものが止まるため、再び有効にする前に`clip`を設定して、戻ったときに再生するものを選んでください。
* **どのクリップも持たない名前**を指定しても何も起こらず、警告も出ません。その名前の`<pc-sprite-clip>`が追加されると、それが再生されます。空の`clip`は、現在のクリップを再生したままにします。

ループしないクリップは最後のフレームで止まり、そのまま表示し続けます。そのときエンジンのコンポーネントが`end`イベントを発火するので、次の動作へ移るきっかけにできます。

```javascript
import { whenReady } from '@playcanvas/web-components';

const slime = await whenReady('#slime');

slime.clip = 'land'; // プロパティと属性はどちらを使っても同じです

slime.component.on('end', (clip) => {
    if (clip.name === 'land') {
        slime.clip = 'idle';
    }
});
```

## タイルとスライスのスプライト {#tiled-and-sliced-sprites}

デフォルトの`render-mode`である`simple`のスプライトアセットは、フレームとちょうど同じサイズで描画され、`width`と`height`は効果がありません。`render-mode="tiled"`または`render-mode="sliced"`のものは、代わりに`<pc-sprite>`の`width`と`height`（ワールド単位）で描画され、フレームの9スライス領域で埋められます。角はサイズを保ち、辺と中央は引き伸ばされる（`sliced`）か、繰り返されます（`tiled`）。

これで、よくある2つの用途をまかなえます。

* **タイルの繰り返し。** `border`のないフレームはすべてが中央なので、`tiled`はフレーム全体を繰り返します。16ピクセルの草のタイル1枚で、どんな長さの地面の帯でも覆えます。
* **任意のサイズのパネルや足場。** `border`のあるフレームは端を保ちます。Spritesサンプルの足場のフレームは左右に6ピクセルのボーダーを持つため、どの足場も幅にかかわらず丸い端を保ち、中央だけが繰り返されます。

```html
<!-- 1枚の草のタイルを、96単位の地面に沿って繰り返します -->
<pc-sprite asset="grass" width="96" height="1"></pc-sprite>

<!-- 同じ足場のスプライトを2つの幅で。端は変わりません -->
<pc-sprite asset="platform" width="2.75"></pc-sprite>
<pc-sprite asset="platform" width="4.75"></pc-sprite>
```

`width`と`height`のデフォルトはどちらも1なので、フレームがその方向にすでに1単位でない限り、それぞれ設定してください。1単位あたり16ピクセルでは、高さ16ピクセルの足場には`width`だけで十分です。

## 例 {#example}

タイルで並べた草の帯、9スライスの足場、3フレームのスプライト1つから描いた3本の花、そしてアニメーションするスライムです。ボタンでスライムの`clip`を切り替え、`flip-x`をオン・オフします。足場の`width`を変えたり、スライムに`color`を付けたり、`speed="0.5"`を試したりしてみましょう:

```html live-example
<pc-app>
    <!-- すべてのフレームを収めた1枚のアトラス画像。ピクセルをそのまま読み込みます -->
    <pc-asset id="atlas" type="textureatlas" src="https://developer.playcanvas.com/assets/sprites.png" srgb mipmaps="false" min-filter="nearest" mag-filter="nearest" data='{ "frames": {
        "slime-idle-0": { "rect": [150, 164, 24, 24], "pivot": [0.5, 0] },
        "slime-idle-1": { "rect": [175, 164, 24, 24], "pivot": [0.5, 0] },
        "slime-idle-2": { "rect": [200, 164, 24, 24], "pivot": [0.5, 0] },
        "slime-idle-3": { "rect": [225, 164, 24, 24], "pivot": [0.5, 0] },
        "slime-idle-4": { "rect": [150, 139, 24, 24], "pivot": [0.5, 0] },
        "slime-idle-5": { "rect": [175, 139, 24, 24], "pivot": [0.5, 0] },
        "slime-idle-6": { "rect": [200, 139, 24, 24], "pivot": [0.5, 0] },
        "slime-idle-7": { "rect": [225, 139, 24, 24], "pivot": [0.5, 0] },
        "slime-hop-0": { "rect": [150, 114, 24, 24], "pivot": [0.5, 0] },
        "slime-hop-1": { "rect": [175, 114, 24, 24], "pivot": [0.5, 0] },
        "slime-hop-2": { "rect": [200, 114, 24, 24], "pivot": [0.5, 0] },
        "slime-hop-3": { "rect": [225, 114, 24, 24], "pivot": [0.5, 0] },
        "slime-hop-4": { "rect": [150, 89, 24, 24], "pivot": [0.5, 0] },
        "slime-hop-5": { "rect": [175, 89, 24, 24], "pivot": [0.5, 0] },
        "grass": { "rect": [232, 46, 16, 16], "pivot": [0.5, 1] },
        "platform": { "rect": [201, 46, 28, 16], "pivot": [0.5, 1], "border": [6, 0, 6, 0] },
        "flower-red": { "rect": [245, 8, 7, 10], "pivot": [0.5, 0] },
        "flower-yellow": { "rect": [13, 1, 7, 10], "pivot": [0.5, 0] },
        "flower-blue": { "rect": [21, 1, 7, 10], "pivot": [0.5, 0] }
    } }'></pc-asset>
    <!-- アトラスから切り出したスプライト。ワールド単位あたり16ピクセル -->
    <pc-asset id="slime-idle" type="sprite" atlas="atlas" frame-keys="slime-idle-0 slime-idle-1 slime-idle-2 slime-idle-3 slime-idle-4 slime-idle-5 slime-idle-6 slime-idle-7" pixels-per-unit="16"></pc-asset>
    <pc-asset id="slime-hop" type="sprite" atlas="atlas" frame-keys="slime-hop-0 slime-hop-1 slime-hop-2 slime-hop-3 slime-hop-4 slime-hop-5" pixels-per-unit="16"></pc-asset>
    <pc-asset id="grass" type="sprite" atlas="atlas" frame-keys="grass" pixels-per-unit="16" render-mode="tiled"></pc-asset>
    <pc-asset id="platform" type="sprite" atlas="atlas" frame-keys="platform" pixels-per-unit="16" render-mode="tiled"></pc-asset>
    <pc-asset id="flowers" type="sprite" atlas="atlas" frame-keys="flower-red flower-yellow flower-blue" pixels-per-unit="16"></pc-asset>
    <pc-scene>
        <pc-entity name="camera" position="0 1.5 10">
            <pc-camera projection="orthographic" ortho-height="2.5" clear-color="#161a3c"></pc-camera>
        </pc-entity>
        <!-- タイル: 1枚のタイルを画面いっぱいに繰り返します -->
        <pc-entity name="grass">
            <pc-sprite asset="grass" width="12"></pc-sprite>
        </pc-entity>
        <!-- ボーダー付きのタイル: 端はサイズを保ち、中央が繰り返されます -->
        <pc-entity name="platform" position="2.25 2.25 0">
            <pc-sprite asset="platform" width="3.5"></pc-sprite>
        </pc-entity>
        <!-- simple: 同じスプライトのフレームを1つずつ -->
        <pc-entity name="flower" position="-3.25 0 0.5">
            <pc-sprite asset="flowers" frame="0"></pc-sprite>
        </pc-entity>
        <pc-entity name="flower" position="0.25 0 0.5">
            <pc-sprite asset="flowers" frame="1"></pc-sprite>
        </pc-entity>
        <pc-entity name="flower" position="3 2.25 0.5">
            <pc-sprite asset="flowers" frame="2"></pc-sprite>
        </pc-entity>
        <!-- animated: clipで指定したクリップを再生します -->
        <pc-entity name="slime" position="-1.5 0 1">
            <pc-sprite id="slime" type="animated" clip="idle">
                <pc-sprite-clip name="idle" asset="slime-idle" fps="8" loop></pc-sprite-clip>
                <pc-sprite-clip name="hop" asset="slime-hop" fps="12" loop></pc-sprite-clip>
            </pc-sprite>
        </pc-entity>
    </pc-scene>
</pc-app>
<div class="controls">
    <button id="idle">Idle</button>
    <button id="hop">Hop</button>
    <button id="flip">Flip</button>
</div>
<style>
    .controls {
        position: absolute;
        top: 12px;
        left: 12px;
        display: flex;
        gap: 8px;
    }
</style>
<script type="module">
    const slime = document.getElementById('slime');

    document.getElementById('idle').onclick = () => slime.setAttribute('clip', 'idle');
    document.getElementById('hop').onclick = () => slime.setAttribute('clip', 'hop');
    document.getElementById('flip').onclick = () => slime.toggleAttribute('flip-x');
</script>
```

[Spritesサンプル](https://playcanvas.github.io/web-components/examples/#sprites.html)は、この方法で横スクロールのステージ全体を作っています。視差のある背景、集めるコイン、足場の間を跳ねたりジャンプしたりするスライムがあります。

## JavaScriptインターフェース {#javascript-interface}

[SpriteComponentElement API](https://api.playcanvas.com/web-components/classes/SpriteComponentElement.html)を使用して、`<pc-sprite>`要素をプログラムで作成および操作できます。

`asset`、`clip`、`color`、`flipX`、`flipY`、`frame`、`height`、`opacity`、`speed`、`type`、`width`も、上記の属性に対応するプロパティとして利用できます。

`component`プロパティは、この要素が追加するエンジンの[SpriteComponent](https://api.playcanvas.com/engine/classes/SpriteComponent.html)です。要素の準備が完了するまでは`null`で、属性が公開していないものはすべてここから利用できます。再生中のクリップに対する`pause()`、`resume()`、`stop()`、クリップを名前で取得する`clip(name)`、そしてスプライトの`layers`、`drawOrder`、`batchGroupId`です。クリップを切り替えるには、コンポーネントの`play(name)`よりも要素の`clip`を使ってください。`clip`はスプライトが次に有効になったときに再生されるものであり、`play()`はそれを変更しません。

コンポーネントはクリップの再生の各段階でイベントを発火し、対象の[SpriteAnimationClip](https://api.playcanvas.com/engine/classes/SpriteAnimationClip.html)を渡します。

| コンポーネントのイベント | 説明 |
| --- | --- |
| `play` | クリップの再生が始まった |
| `pause` | 再生中のクリップが一時停止された |
| `resume` | 一時停止したクリップが再開された |
| `stop` | 再生中のクリップが、スプライトの無効化または`stop()`によって停止された。別のクリップへの切り替えでは発火しません |
| `end` | ループしないクリップが最後のフレームに達した |
| `loop` | ループするクリップが最後のフレームに達し、最初からやり直した |

## 関連項目 {#see-also}

* [`<pc-sprite-clip>`](../pc-sprite-clip) — `animated`スプライトが再生する各クリップを宣言します
* [`<pc-asset>`](../pc-asset) — テクスチャアトラスと、そこから切り出したスプライトアセット
* [`<pc-camera>`](../pc-camera) — 横から見た2Dシーン向けの正射影カメラ
* [`<pc-element>`](../pc-element) — ワールドではなくユーザーインターフェースの中にスプライトを描画します

サンプル: [Sprites](https://playcanvas.github.io/web-components/examples/#sprites.html)
