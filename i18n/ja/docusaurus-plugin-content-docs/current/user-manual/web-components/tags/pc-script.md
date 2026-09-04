---
title: <pc-script>
description: "pc-script要素のリファレンス: pc-script-instance子要素をホストし、それらをまとめて有効化・無効化するスクリプトコンポーネントです。"
---

`<pc-script>`タグは、スクリプトコンポーネントを定義するために使用されます。

:::note[使用法]

* [`<pc-entity>`](../pc-entity)、[`<pc-model>`](../pc-model)、または[`<pc-node>`](../pc-node)の直接の子である必要があります。
* 0..n個の[`<pc-script-instance>`](../pc-script-instance)の子を持つことができます。

:::

## 属性 {#attributes}

<div className="attribute-table">

| 属性 | タイプ | デフォルト | 説明 |
| --- | --- | --- | --- |
| `enabled` | Boolean | `"true"` | コンポーネントの有効状態 |

</div>

## 例 {#example}

2つのスクリプトを保持する1つのスクリプトコンポーネントです — `rotate` がキューブを回転させ、`pulse` がスケールを脈動させます。どちらかの `<pc-script-instance>` タグを削除したり、`<pc-script>` コンポーネントに `enabled="false"` を設定して両方を無効にしたりしてみましょう:

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
            <pc-script>
                <pc-script-instance name="rotate"></pc-script-instance>
                <pc-script-instance name="pulse"></pc-script-instance>
            </pc-script>
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

[ScriptComponentElement API](https://api.playcanvas.com/web-components/classes/ScriptComponentElement.html)を使用して、`<pc-script>`要素をプログラムで作成および操作できます。

`component`プロパティは、この要素が追加するエンジンの[ScriptComponent](https://api.playcanvas.com/engine/classes/ScriptComponent.html)です。要素の準備が完了するまでは`null`で、属性が公開していないものはすべてここから利用できます。

## 関連項目 {#see-also}

* [`<pc-script-instance>`](../pc-script-instance) — コンポーネントが実行する各スクリプト
* [`<pc-asset>`](../pc-asset) — スクリプトモジュールの読み込み方法
* [スクリプトで動作を追加する](../scripting.md) — スクリプトの書き方と属性の宣言

サンプル: [Tweening](https://playcanvas.github.io/web-components/examples/tweening.html)、[First Person Controller](https://playcanvas.github.io/web-components/examples/first-person-controller.html)、[Solar System](https://playcanvas.github.io/web-components/examples/solar-system.html)
