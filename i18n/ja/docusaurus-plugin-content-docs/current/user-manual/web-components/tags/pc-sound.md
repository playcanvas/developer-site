---
title: <pc-sound>
description: "pc-sound要素のリファレンス: pc-sound-slotスロットと共有オーディオ設定をEntity上でまとめるサウンドComponentのコンテナです。"
---

`<pc-sound>`タグは、子の[`<pc-sound-slot>`](../pc-sound-slot)のサウンドをエンティティの位置で再生するサウンドコンポーネントを追加します。音量、ピッチ、位置サウンドが距離によってどう減衰するかといった設定は、すべてのスロットに適用されます。

:::note[使用法]

* [`<pc-entity>`](../pc-entity)、[`<pc-model>`](../pc-model)、または[`<pc-node>`](../pc-node) の直接の子である必要があります。
* 再生するサウンドごとに1つずつ、任意の数の[`<pc-sound-slot>`](../pc-sound-slot) の子を持ちます。

:::

## 属性 {#attributes}

<div className="attribute-table">

| 属性 | タイプ | デフォルト | 説明 |
| --- | --- | --- | --- |
| `distance-model` | Enum | `"linear"` | 位置サウンドが `ref-distance` から `max-distance` までの間でどう減衰するか: `"exponential"` \| `"inverse"` \| `"linear"`。`"linear"` は均等に減衰させ、デフォルトの `roll-off-factor` では `max-distance` で無音になります。`"inverse"` と `"exponential"` は、音源の近くでは急に、遠くではゆるやかに減衰させます。下の注記を参照してください |
| `enabled` | Boolean | `"true"` | コンポーネントの有効状態 |
| `max-distance` | Number | `"10000"` | 位置サウンドがそれ以上小さくならない距離。`"linear"` モデルではサウンドが消える距離になるため、シーンの大きさ程度に設定してください |
| `pitch` | Number | `"1"` | このコンポーネント内のすべてのサウンドのピッチ乗数。各スロットの `pitch` に乗算されます |
| `positional` | Boolean | `"true"` | サウンドが位置を持つかどうか。位置を持つサウンドは、リスナーに対する位置によってパンされ、減衰します。音楽やインターフェースの効果音のように、どこでも同じように聞こえるサウンドには `"false"` を設定します |
| `ref-distance` | Number | `"1"` | この距離以内では、位置サウンドは最大音量で再生されます |
| `roll-off-factor` | Number | `"1"` | 位置サウンドが距離によって減衰する速さ。値が大きいほど速く減衰します。`"linear"` モデルでは0〜1に制限されます |
| `volume` | Number | `"1"` | このコンポーネント内のすべてのサウンドの音量。各スロットの `volume` に乗算されます |

</div>

:::note[聞こえる距離]

位置サウンドは、[`<pc-audio-listener>`](../pc-audio-listener) から見た方向によってパンされ、リスナーからの距離によって減衰します。シーンにリスナーがない場合は、ワールドの原点が基準になります。デフォルトでは、`"linear"` モデルが10,000単位かけてサウンドを減衰させるため、10単位離れたサウンドも、リスナーのすぐそばのサウンドとほとんど変わりません。[Positional Sound](https://playcanvas.github.io/web-components/examples/#positional-sound.html) サンプルが `max-distance="12"` で行っているように、`max-distance` をシーンの大きさ程度に設定するか、`ref-distance` を超えて距離が2倍になるたびに音量を半分にする `distance-model="inverse"` を使ってください。

:::

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
            <pc-sound volume="1" pitch="1" positional="false">
                <pc-sound-slot name="footsteps" asset="footsteps" loop="true"></pc-sound-slot>
                <pc-sound-slot name="drop" asset="drop"></pc-sound-slot>
            </pc-sound>
        </pc-entity>
    </pc-scene>
</pc-app>
<div class="controls">
    <button id="toggle">Toggle footsteps</button>
    <button id="play-drop">Play drop</button>
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
    document.getElementById('play-drop').onclick = () => sounds.component.slot('drop').play();
</script>
```

## JavaScriptインターフェース {#javascript-interface}

[SoundComponentElement API](https://api.playcanvas.com/web-components/classes/SoundComponentElement.html)を使用して、`<pc-sound>`要素をプログラムで作成および操作できます。

`component`プロパティは、この要素が追加するエンジンの[SoundComponent](https://api.playcanvas.com/engine/classes/SoundComponent.html)です。要素の準備が完了するまでは`null`で、属性が公開していないものはすべてここから利用できます。

## 関連項目 {#see-also}

* [`<pc-sound-slot>`](../pc-sound-slot) — コンポーネントが再生する各クリップ
* [`<pc-audio-listener>`](../pc-audio-listener) — 位置サウンドを聴く地点
* [`<pc-asset>`](../pc-asset) — オーディオアセット

サンプル: [Basic Sound](https://playcanvas.github.io/web-components/examples/#basic-sound.html)、[Positional Sound](https://playcanvas.github.io/web-components/examples/#positional-sound.html)、[Falling Blocks](https://playcanvas.github.io/web-components/examples/#falling-blocks.html)、[Clock Tower](https://playcanvas.github.io/web-components/examples/#clock-tower.html)
