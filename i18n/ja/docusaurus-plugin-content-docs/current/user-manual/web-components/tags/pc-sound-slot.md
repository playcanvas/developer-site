---
title: <pc-sound-slot>
description: "pc-sound-slot要素のリファレンス: pc-soundの名前付きのサウンド1つと、そのオーディオアセット、音量、ピッチ、ループ、開始時間、自動再生です。"
---

`<pc-sound-slot>`タグは、親の[`<pc-sound>`](../pc-sound)の名前付きのサウンドを1つ宣言します。再生するオーディオアセットと、その音量、ピッチ、ループ、自動再生を指定します。

:::note[使用法]

* [`<pc-sound>`](../pc-sound)コンポーネントの直接の子である必要があります。
* `name`はその`<pc-sound>`の中で一意である必要があります。すでに使われている名前のスロットは追加されません。

:::

## 属性 {#attributes}

<div className="attribute-table">

| 属性 | タイプ | デフォルト | 説明 |
| --- | --- | --- | --- |
| `asset` | [Asset ID](../attributes.md#asset-and-material-ids) | - | オーディオアセットID（`audio`型アセットを参照する必要があります） |
| `auto-play` | Boolean | `"false"` | スロットが作成されたらすぐにサウンドを再生するかどうか。ブラウザはユーザーがページを操作するまでオーディオを止めておくため、自動再生のサウンドは最初のクリック、タップ、またはマウスボタンの押下で始まります |
| `duration` | Number | - | サウンドの再生時間（秒単位）（省略するとクリップ全体を再生します） |
| `loop` | Boolean | `"false"` | サウンドがループするかどうか |
| `name` | String | - | スロットの名前。`component.slot(name)`はこの名前でスロットを見つけます |
| `overlap` | Boolean | `"false"` | 再生中のスロットをもう一度再生したときに、別のコピーを並行して再生するかどうか。そうでない場合は、最初から再生し直します |
| `pitch` | Number | `"1"` | ピッチ乗数（1 = 通常ピッチ）。`<pc-sound>`の`pitch`が乗算されます |
| `start-time` | Number | `"0"` | 開始時間のオフセット（秒単位） |
| `volume` | Number | `"1"` | 音量（0〜1）。`<pc-sound>`の`volume`が乗算されます |

</div>

## 例 {#example}

同じクリップを再生する2つのスロットです — 2つ目は `pitch` が半分です。ブラウザはユーザー操作の後にしかオーディオを許可しないため、再生はアプリに重ねた通常のHTMLボタンに配線しています。`pitch` や `volume` の値を編集してみましょう:

```html live-example
<pc-app>
    <pc-asset src="https://developer.playcanvas.com/assets/drop.mp3" id="drop"></pc-asset>
    <pc-scene>
        <pc-entity name="camera">
            <pc-camera clear-color="#1d1f2b"></pc-camera>
        </pc-entity>
        <pc-entity name="jukebox">
            <pc-sound positional="false">
                <pc-sound-slot name="drop" asset="drop"></pc-sound-slot>
                <pc-sound-slot name="drop-slow" asset="drop" pitch="0.5" volume="0.8"></pc-sound-slot>
            </pc-sound>
        </pc-entity>
    </pc-scene>
</pc-app>
<div class="controls">
    <button id="play">Play</button>
    <button id="play-slow">Play at half pitch</button>
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
    import { whenReady } from '@playcanvas/web-components';

    const sounds = await whenReady('pc-sound');
    document.getElementById('play').onclick = () => sounds.component.slot('drop').play();
    document.getElementById('play-slow').onclick = () => sounds.component.slot('drop-slow').play();
</script>
```

## JavaScriptインターフェース {#javascript-interface}

[SoundSlotElement API](https://api.playcanvas.com/web-components/classes/SoundSlotElement.html)を使用して、`<pc-sound-slot>`要素をプログラムで作成および操作できます。

属性はプロパティとしても利用できます。エンジンの[SoundSlot](https://api.playcanvas.com/engine/classes/SoundSlot.html)そのものは親コンポーネントに属しており、`soundElement.component.slot(name)`で取得できます。要素の`soundSlot`プロパティでも取得でき、これは要素の準備が完了するまでは`null`です。

## 関連項目 {#see-also}

* [`<pc-sound>`](../pc-sound) — スロットが属するコンポーネント
* [`<pc-asset>`](../pc-asset) — スロットが再生するオーディオアセット
* [`<pc-audio-listener>`](../pc-audio-listener) — 位置サウンドを聴く地点

サンプル: [Basic Sound](https://playcanvas.github.io/web-components/examples/#basic-sound.html)、[Positional Sound](https://playcanvas.github.io/web-components/examples/#positional-sound.html)、[Falling Blocks](https://playcanvas.github.io/web-components/examples/#falling-blocks.html)、[Clock Tower](https://playcanvas.github.io/web-components/examples/#clock-tower.html)
