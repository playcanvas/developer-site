---
title: <pc-sprite-clip>
description: "pc-sprite-clip要素のリファレンス: pc-spriteの名前付きアニメーションクリップを1つ宣言します。スプライトアセットのフレームを、指定したフレームレートで1回またはループして再生します。"
---

`<pc-sprite-clip>`タグは、親の[`<pc-sprite>`](../pc-sprite)の名前付きアニメーションクリップを1つ宣言します。スプライトアセットのフレームを、指定したレートで順に、1回またはループして再生します。いくつか組み合わせるとキャラクターにできること（`idle`、`run`、`jump`）がそろい、スプライトの`clip`属性が再生するものを選びます。

:::note[使用法]

* [`<pc-sprite>`](../pc-sprite)コンポーネントの直接の子である必要があります。再生されるのは、そのスプライトが`type="animated"`のときだけです。
* `name`は必須で、その`<pc-sprite>`の中で一意である必要があります。名前のないクリップや、先にあるクリップがすでに使っている名前のクリップは、警告を出して追加されません。

:::

## クリップの再生のしかた {#how-a-clip-plays}

クリップは、スプライト`asset`のフレームを、そのアセットの`frame-keys`に並んだ順に再生します。そのため、クリップ用のスプライトアセットは再生順にフレームを列挙します。各クリップは専用のスプライトアセットを持ち、兄弟のクリップと同じアトラスから切り出すことも、別のアトラスから切り出すこともできます。宣言のしかたは[スプライトアセット](../pc-sprite#sprite-assets)を参照してください。

`fps`がペースを、フレーム数が長さを決めます。6フレームを`fps="12"`で再生すると0.5秒です。`fps`のデフォルトは0で、クリップが進まなくなります。デフォルトのままのクリップは最初のフレームを表示し続けるため、動かしたいクリップにはすべてレートを指定してください。親スプライトの[`speed`](../pc-sprite#attributes)がこれに乗算されるため、すべてのクリップをまとめて遅くしたり速くしたりできます。

最後のフレームで何が起こるかは`loop`によって決まります。

* **ループする**クリップは最初のフレームからやり直し、スプライトコンポーネントが`loop`を発火します。
* **ループしない**クリップは最後のフレームで止まってそれを表示し続け、スプライトコンポーネントが`end`を発火します。スプライトの`clip`に再びその名前を設定すると、もう一度再生されます。[クリップの再生](../pc-sprite#playing-clips)を参照してください。

負の`fps`はクリップを逆再生します。それでも再生は最初のフレームから始まるため、ループするクリップはそこから残りのフレームを逆順にたどります。ループしないクリップは、すでに終端にいるため、すぐに終了します。

## 属性 {#attributes}

<div className="attribute-table">

| 属性 | タイプ | デフォルト | 説明 |
| --- | --- | --- | --- |
| `asset` | [Asset ID](../attributes.md#asset-and-material-ids) | - | クリップが再生するフレームを持つスプライトのスプライトアセットID（`sprite`型アセットを参照する必要があります）。フレームは`frame-keys`の順に再生されます |
| `fps` | Number | `"0"` | クリップを再生するレート（1秒あたりのフレーム数）。負の値では逆再生します。0ではクリップが進まなくなり、現在のフレームにとどまります。0のまま再生を始めたクリップでは、それが最初のフレームです |
| `loop` | Boolean | `"false"` | クリップがループするかどうか。ループしないクリップは最後のフレームで止まります |
| `name` | String | - | クリップの名前。親の`<pc-sprite>`の`clip`属性はこの名前でクリップを選びます。必須で、`<pc-sprite>`の中で一意である必要があります |

</div>

すべての属性はライブです。`fps`や`loop`の変更は再生中のクリップにもすぐに適用され、`asset`を変更するとクリップが再生するフレームが入れ替わります。`name`を変更すると、古い名前のクリップが削除され（再生中であれば停止します）、新しい名前で追加されます。スプライトの`clip`がその新しい名前を指していれば、それが再生されます。

どの[`<pc-asset>`](../pc-asset)も指さない`asset`では、クリップに表示するフレームがなくなり、警告も出ません。クリップが何も再生しないときはIDを確認してください。

## 読み込み {#loading}

要素は、クリップが親のスプライトコンポーネントに追加された時点で準備完了になります。これはコンポーネントが存在するとすぐに行われます。クリップのスプライトアセットはコンポーネント自身が読み込むため、フレームが届く前でもクリップを選んで再生でき、届いた時点で表示されます。

名前がない、または先にあるクリップがその名前を持っているために追加されなかったクリップは、準備完了になりません。先にあるクリップが削除されるか名前を変えると、待っていたクリップがその名前を引き継ぎます。

準備完了の状態は、クリップが属するコンポーネントに従います。そのコンポーネントがなくなると（`<pc-sprite>`が削除されたとき、またはそれを含む[`<pc-node>`](../pc-node)のバインドが外れたとき）、すべてのクリップはエンジンのクリップを手放して準備完了ではなくなり、`ready()`は次に準備完了になるまで待ちます。新しいコンポーネントが代わりに作られると（`<pc-sprite>`が再び挿入されたとき、または`<pc-node>`が再びバインドされたとき）、すべてのクリップがそこに追加され、再び準備完了になって`ready`をもう一度発火します。[`<pc-model>`](../pc-model)の直下にあるスプライトは、モデルが再読み込みされてもこの影響を受けません。モデルのホストエンティティは再読み込みの後も残り、スプライトコンポーネントとそのクリップも一緒に残ります。

## 例 {#example}

ループする`spin`と単発の`collect`を持つ2枚のコインです。右のコインの`spin`は`fps`が負なので、反対向きに回ります。**Collect**は単発のクリップを再生し、終わると最後のフレームを表示し続けます。もう一度クリックすると再生し直します。`collect`クリップに`loop`を付けたり、別の`fps`や`fps="0"`を試したりしてみましょう:

```html live-example
<pc-app>
    <pc-asset id="atlas" type="textureatlas" src="https://developer.playcanvas.com/assets/sprites.png" srgb mipmaps="false" min-filter="nearest" mag-filter="nearest" data='{ "frames": {
        "coin-spin-0": { "rect": [238, 32, 12, 12], "pivot": [0.5, 0.5] },
        "coin-spin-1": { "rect": [238, 19, 12, 12], "pivot": [0.5, 0.5] },
        "coin-spin-2": { "rect": [0, 13, 12, 12], "pivot": [0.5, 0.5] },
        "coin-spin-3": { "rect": [150, 9, 12, 12], "pivot": [0.5, 0.5] },
        "coin-spin-4": { "rect": [163, 9, 12, 12], "pivot": [0.5, 0.5] },
        "coin-spin-5": { "rect": [176, 9, 12, 12], "pivot": [0.5, 0.5] },
        "coin-collect-0": { "rect": [232, 6, 12, 12], "pivot": [0.5, 0.5] },
        "coin-collect-1": { "rect": [0, 0, 12, 12], "pivot": [0.5, 0.5] },
        "coin-collect-2": { "rect": [189, 0, 12, 12], "pivot": [0.5, 0.5] },
        "coin-collect-3": { "rect": [202, 0, 12, 12], "pivot": [0.5, 0.5] },
        "coin-collect-4": { "rect": [215, 0, 12, 12], "pivot": [0.5, 0.5] }
    } }'></pc-asset>
    <!-- クリップごとに1つのスプライトアセット。フレームキーは再生順に並べます -->
    <pc-asset id="coin-spin" type="sprite" atlas="atlas" frame-keys="coin-spin-0 coin-spin-1 coin-spin-2 coin-spin-3 coin-spin-4 coin-spin-5" pixels-per-unit="16"></pc-asset>
    <pc-asset id="coin-collect" type="sprite" atlas="atlas" frame-keys="coin-collect-0 coin-collect-1 coin-collect-2 coin-collect-3 coin-collect-4" pixels-per-unit="16"></pc-asset>
    <pc-scene>
        <pc-entity name="camera" position="0 0 10">
            <pc-camera projection="orthographic" ortho-height="1" clear-color="#161a3c"></pc-camera>
        </pc-entity>
        <pc-entity name="coin" position="-0.6 0 0">
            <pc-sprite type="animated" clip="spin">
                <pc-sprite-clip name="spin" asset="coin-spin" fps="10" loop></pc-sprite-clip>
                <pc-sprite-clip name="collect" asset="coin-collect" fps="15"></pc-sprite-clip>
            </pc-sprite>
        </pc-entity>
        <pc-entity name="coin" position="0.6 0 0">
            <pc-sprite type="animated" clip="spin">
                <!-- 負のfpsはクリップを逆再生します -->
                <pc-sprite-clip name="spin" asset="coin-spin" fps="-10" loop></pc-sprite-clip>
                <pc-sprite-clip name="collect" asset="coin-collect" fps="15"></pc-sprite-clip>
            </pc-sprite>
        </pc-entity>
    </pc-scene>
</pc-app>
<div class="controls">
    <button id="collect">Collect</button>
    <button id="spin">Spin</button>
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
    const coins = document.querySelectorAll('pc-sprite');
    const play = name => coins.forEach(coin => coin.setAttribute('clip', name));

    document.getElementById('collect').onclick = () => play('collect');
    document.getElementById('spin').onclick = () => play('spin');
</script>
```

## JavaScriptインターフェース {#javascript-interface}

[SpriteClipElement API](https://api.playcanvas.com/web-components/classes/SpriteClipElement.html)を使用して、`<pc-sprite-clip>`要素をプログラムで作成および操作できます。

`asset`、`fps`、`loop`、`name`も、上記の属性に対応するプロパティとして利用できます。読み取り専用の`spriteAnimationClip`プロパティは、この要素が宣言するエンジンの[SpriteAnimationClip](https://api.playcanvas.com/engine/classes/SpriteAnimationClip.html)です。要素が準備完了でないときは常に`null`です（[読み込み](#loading)を参照してください）。[スプライトコンポーネント](../pc-sprite#javascript-interface)と同じ`play`、`pause`、`resume`、`stop`、`end`、`loop`イベントを、自分自身についてだけ発火します。また、再生中かどうかを`isPlaying`で、スプライトが読み込まれた後は長さ（秒）を`duration`で示します。

```javascript
import { whenReady } from '@playcanvas/web-components';

const clip = await whenReady('pc-sprite-clip[name="land"]');

clip.spriteAnimationClip.on('end', () => console.log('landed'));
```

クリップは実行時に追加・削除できます。`<pc-sprite-clip>`を追加するとそのクリップが加わり、スプライトの`clip`がすでにその名前を指していれば、別のクリップが再生中でもすぐに再生されます。削除するとそのクリップが除かれ、それが再生中だった場合、スプライトは停止し、別のクリップが再生されるまで何も表示しません。

```javascript
const slime = document.querySelector('#slime');
slime.clip = 'wave'; // この名前のクリップはまだないため、現在のクリップが再生を続けます

const clip = document.createElement('pc-sprite-clip');
clip.setAttribute('name', 'wave');
clip.setAttribute('asset', 'slime-wave');
clip.setAttribute('fps', '10');
slime.appendChild(clip); // クリップが追加されるとすぐにwaveが再生されます
```

## 関連項目 {#see-also}

* [`<pc-sprite>`](../pc-sprite) — クリップが属するスプライトコンポーネント
* [`<pc-asset>`](../pc-asset) — クリップが再生するフレームを持つスプライトアセット

サンプル: [Sprites](https://playcanvas.github.io/web-components/examples/#sprites.html)
