---
title: <pc-sound>
description: "pc-sound要素のリファレンス: pc-sound-slotスロットと共有オーディオ設定をEntity上でまとめるサウンドComponentのコンテナです。"
---

`<pc-sound>`タグはサウンドコンポーネントを定義するために使用されます。

:::note[使用法]

* [`<pc-entity>`](../pc-entity)、[`<pc-model>`](../pc-model)、または[`<pc-node>`](../pc-node) の直接の子である必要があります。
* 0..n個の[`<pc-sound-slot>`](../pc-sound-slot) 子を持つことができます。

:::

## 属性 {#attributes}

<div className="attribute-table">

| 属性 | タイプ | デフォルト | 説明 |
| --- | --- | --- | --- |
| `distance-model` | Enum | `"linear"` | 距離減衰モデル: `"exponential"` \| `"inverse"` \| `"linear"` |
| `enabled` | Boolean | `"true"` | コンポーネントの有効状態 |
| `max-distance` | Number | `"10000"` | オーディオ減衰の最大距離 |
| `pitch` | Number | `"1"` | このコンポーネント内のすべてのサウンドのピッチ乗数 |
| `positional` | Boolean | `"false"` | サウンドが位置情報を持つか (3D空間オーディオ) |
| `ref-distance` | Number | `"1"` | 最大音量の基準距離 |
| `roll-off-factor` | Number | `"1"` | 距離減衰の減衰率ファクター |
| `volume` | Number | `"1"` | このコンポーネント内のすべてのサウンドのマスターボリューム |

</div>

## 例 {#example}

2つのスロットを保持する1つのサウンドコンポーネントです — ループする足音と単発の効果音です。コンポーネントの `volume` と `pitch` は保持するすべてのスロットに適用されます。`volume` を半分にしたり、`pitch="1.5"` にして再実行したりしてみましょう:

```html live-example
<pc-app>
    <pc-asset src="https://developer.playcanvas.com/assets/footsteps.mp3" id="footsteps"></pc-asset>
    <pc-asset src="https://developer.playcanvas.com/assets/drop.mp3" id="drop"></pc-asset>
    <pc-scene>
        <pc-entity name="camera">
            <pc-camera clear-color="#1d1f2b"></pc-camera>
        </pc-entity>
        <pc-entity name="speaker">
            <pc-sound volume="1" pitch="1">
                <pc-sound-slot name="footsteps" asset="footsteps" loop="true"></pc-sound-slot>
                <pc-sound-slot name="drop" asset="drop"></pc-sound-slot>
            </pc-sound>
        </pc-entity>
    </pc-scene>
</pc-app>
<div class="controls">
    <button id="toggle">Toggle footsteps</button>
    <button id="drop">Play drop</button>
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
    const footsteps = sounds.component.slot('footsteps');
    document.getElementById('toggle').onclick = () => {
        footsteps.isPlaying ? footsteps.stop() : footsteps.play();
    };
    document.getElementById('drop').onclick = () => sounds.component.slot('drop').play();
</script>
```

## JavaScriptインターフェース {#javascript-interface}

[SoundComponentElement API](https://api.playcanvas.com/web-components/classes/SoundComponentElement.html)を使用して、`<pc-sound>`要素をプログラムで作成および操作できます。

`component`プロパティは、この要素が追加するエンジンの[SoundComponent](https://api.playcanvas.com/engine/classes/SoundComponent.html)です。要素の準備が完了するまでは`null`で、属性が公開していないものはすべてここから利用できます。
