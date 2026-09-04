---
title: <pc-sound-slot>
description: "pc-sound-slot要素のリファレンス: 位置オーディオまたは非位置のオーディオクリップ、音量、ピッチ、自動再生のルール、Asset参照です。"
---

`<pc-sound-slot>`タグは、サウンドを定義するために使用されます。

:::note[使用法]

* [`<pc-sound>`](../pc-sound)コンポーネントの直接の子である必要があります。

:::

## 属性 {#attributes}

<div className="attribute-table">

| 属性 | タイプ | デフォルト | 説明 |
| --- | --- | --- | --- |
| `asset` | [Asset ID](../attributes.md#asset-and-material-ids) | - | オーディオアセットID（`audio`型アセットを参照する必要があります） |
| `auto-play` | Boolean | `"false"` | サウンドが自動的に再生されるかどうか |
| `duration` | Number | - | サウンドの再生時間（秒単位）（省略するとクリップ全体を再生します） |
| `loop` | Boolean | `"false"` | サウンドがループするかどうか |
| `name` | String | - | サウンドスロットの名前識別子 |
| `overlap` | Boolean | `"false"` | 複数回トリガーされたときにサウンドが重なることができるかどうか |
| `pitch` | Number | `"1"` | ピッチ乗数（1 = 通常ピッチ） |
| `start-time` | Number | `"0"` | 開始時間のオフセット（秒単位） |
| `volume` | Number | `"1"` | 音量レベル（0-1） |

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
            <pc-sound>
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
