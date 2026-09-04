---
title: <pc-audio-listener>
description: "pc-audio-listener要素のリファレンス: 位置サウンドをどの地点から聴くかを定義するオーディオリスナーComponentです。"
---

`<pc-audio-listener>`タグは、リスナーコンポーネントを定義するために使用されます。

:::note[使用法]

* [`<pc-entity>`](../pc-entity)、[`<pc-model>`](../pc-model)、または[`<pc-node>`](../pc-node)の直接の子である必要があります。

:::

## 属性 {#attributes}

<div className="attribute-table">

| 属性 | タイプ | デフォルト | 説明 |
| --- | --- | --- | --- |
| `enabled` | Boolean | `"true"` | コンポーネントの有効状態 |

</div>

## 例 {#example}

リスナーはカメラ上にあり、位置音源の足音を発する球体がその前を旋回します。ヘッドフォンを着けると、球体が横切るたびに音が左右にパンします。ブラウザはユーザー操作があるまでオーディオをブロックするため、Playをクリックして開始してください:

```html live-example
<pc-app>
    <pc-asset src="https://developer.playcanvas.com/assets/footsteps.mp3" id="footsteps"></pc-asset>
    <pc-material id="floor" diffuse="#3a3f4b"></pc-material>
    <pc-scene>
        <pc-entity name="camera" position="0 2.5 6" rotation="-15 0 0">
            <pc-camera clear-color="#1d1f2b"></pc-camera>
            <!-- 位置音源はこのエンティティの位置で聴取されます -->
            <pc-audio-listener></pc-audio-listener>
        </pc-entity>
        <pc-entity name="light" rotation="45 30 0">
            <pc-light cast-shadows normal-offset-bias="0.05" shadow-bias="0.2"></pc-light>
        </pc-entity>
        <pc-entity name="ground" scale="14 14 14">
            <pc-render type="plane" material="floor"></pc-render>
        </pc-entity>
        <pc-entity name="pivot">
            <pc-script>
                <pc-script-instance name="orbit"></pc-script-instance>
            </pc-script>
            <pc-entity name="emitter" position="3 1 0" scale="0.4 0.4 0.4">
                <pc-render type="sphere"></pc-render>
                <pc-sound positional="true" ref-distance="2" roll-off-factor="1">
                    <pc-sound-slot name="footsteps" asset="footsteps" loop="true"></pc-sound-slot>
                </pc-sound>
            </pc-entity>
        </pc-entity>
    </pc-scene>
</pc-app>
<button id="play" style="position: absolute; top: 12px; left: 12px;">Play</button>
<script type="module">
    import { registerScript, Script } from 'playcanvas';
    import { whenReady } from '@playcanvas/web-components';

    await whenReady('pc-app');

    class Orbit extends Script {
        update(dt) {
            this.entity.rotate(0, 45 * dt, 0);
        }
    }

    registerScript(Orbit, 'orbit');

    const sounds = await whenReady('pc-sound');
    document.getElementById('play').onclick = () => sounds.component.slot('footsteps').play();
</script>
```

## JavaScriptインターフェース {#javascript-interface}

[AudioListenerComponentElement API](https://api.playcanvas.com/web-components/classes/AudioListenerComponentElement.html)を使用して、`<pc-audio-listener>`要素をプログラムで作成および操作できます。

`component`プロパティは、この要素が追加するエンジンの[AudioListenerComponent](https://api.playcanvas.com/engine/classes/AudioListenerComponent.html)です。要素の準備が完了するまでは`null`で、属性が公開していないものはすべてここから利用できます。
