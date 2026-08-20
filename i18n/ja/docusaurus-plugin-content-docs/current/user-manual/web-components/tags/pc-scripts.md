---
title: <pc-scripts>
description: "pc-scripts要素のリファレンス: 複数のpc-script子をまとめ、共有のScript設定を持つScript Componentのコンテナです。"
---

`<pc-scripts>`タグは、スクリプトコンポーネントを定義するために使用されます。

:::note[使用法]

* [`<pc-entity>`](../pc-entity)の直接の子である必要があります。
* 0..n個の[`<pc-script>`](../pc-script)の子を持つことができます。

:::

## 属性 {#attributes}

<div className="attribute-table">

| 属性 | タイプ | デフォルト | 説明 |
| --- | --- | --- | --- |
| `enabled` | Boolean | `"true"` | コンポーネントの有効状態 |

</div>

## 例 {#example}

2つのスクリプトを保持する1つのスクリプトコンポーネントです — `rotate` がキューブを回転させ、`pulse` がスケールを脈動させます。どちらかの `<pc-script>` タグを削除したり、`<pc-scripts>` コンポーネントに `enabled="false"` を設定して両方を無効にしたりしてみましょう:

```html live-example
<pc-app>
    <pc-scene>
        <pc-entity name="camera" position="0 0 3">
            <pc-camera clear-color="#1d1f2b"></pc-camera>
        </pc-entity>
        <pc-entity name="light" rotation="45 30 0">
            <pc-light></pc-light>
        </pc-entity>
        <pc-entity name="cube">
            <pc-render type="box"></pc-render>
            <pc-scripts>
                <pc-script name="rotate"></pc-script>
                <pc-script name="pulse"></pc-script>
            </pc-scripts>
        </pc-entity>
    </pc-scene>
</pc-app>
<script type="module">
    import { registerScript, Script } from 'playcanvas';
    import { whenReady } from '@playcanvas/web-components';

    await whenReady('pc-app');

    class Rotate extends Script {
        update(dt) {
            this.entity.rotate(0, 90 * dt, 0);
        }
    }

    class Pulse extends Script {
        time = 0;

        update(dt) {
            this.time += dt;
            const s = 1 + 0.2 * Math.sin(this.time * 3);
            this.entity.setLocalScale(s, s, s);
        }
    }

    registerScript(Rotate, 'rotate');
    registerScript(Pulse, 'pulse');
</script>
```

## JavaScriptインターフェース {#javascript-interface}

[ScriptComponentElement API](https://api.playcanvas.com/web-components/classes/ScriptComponentElement.html)を使用して、`<pc-scripts>`要素をプログラムで作成および操作できます。
