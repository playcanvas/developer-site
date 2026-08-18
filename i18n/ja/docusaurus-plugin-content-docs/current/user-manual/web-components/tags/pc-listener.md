---
title: <pc-listener>
description: "pc-listener要素のリファレンス: 位置サウンドをどの地点から聴くかを定義するオーディオリスナーComponentです。"
---

`<pc-listener>`タグは、リスナーコンポーネントを定義するために使用されます。

:::note[使用法]

* [`<pc-entity>`](../pc-entity)の直接の子である必要があります。

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
            <pc-listener></pc-listener>
        </pc-entity>
        <pc-entity name="light" rotation="45 30 0">
            <pc-light cast-shadows></pc-light>
        </pc-entity>
        <pc-entity name="ground" scale="14 14 14">
            <pc-render type="plane" material="floor"></pc-render>
        </pc-entity>
        <pc-entity name="pivot">
            <pc-scripts>
                <pc-script name="orbit"></pc-script>
            </pc-scripts>
            <pc-entity name="emitter" position="3 1 0" scale="0.4 0.4 0.4">
                <pc-render type="sphere"></pc-render>
                <pc-sounds positional="true" ref-distance="2" roll-off-factor="1">
                    <pc-sound name="footsteps" asset="footsteps" loop="true"></pc-sound>
                </pc-sounds>
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

    const sounds = await whenReady('pc-sounds');
    document.getElementById('play').onclick = () => sounds.component.slot('footsteps').play();
</script>
```

## JavaScriptインターフェース {#javascript-interface}

[ListenerComponentElement API](https://api.playcanvas.com/web-components/classes/ListenerComponentElement.html)を使用して、`<pc-listener>`要素をプログラムで作成および操作できます。
