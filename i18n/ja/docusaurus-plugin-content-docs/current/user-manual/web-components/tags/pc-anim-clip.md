---
title: <pc-anim-clip>
description: "pc-anim-clip要素のリファレンス: pc-animコンポーネント上に名前付きアニメーションクリップを1つ宣言します。トラックは囲んでいるモデルのコンテナ、または別のcontainer・animation・animclipアセットから取得します。"
---

`<pc-anim-clip>`タグは、[`<pc-anim>`](../pc-anim)コンポーネント上に名前付きのアニメーションクリップを1つ宣言します。いくつか並べれば、コンポーネントが切り替える`idle`・`run`・`jump`といったクリップライブラリになります。

:::note[使用法]

* [`<pc-anim>`](../pc-anim)コンポーネントの直接の子である必要があります。
* `name`は必須で、コンポーネント内で一意でなければならず、`.`を含めることはできません。

:::

## トラックの供給元 {#where-the-track-comes-from}

`name`は2つの役割を兼ねます。クリップを再生するときに使う名前であり、*かつ*クリップの供給元から探すトラックの名前です。その供給元は、囲んでいるモデルか、指定したアセットのいずれかになります。

**囲んでいるモデル。** `asset`がない場合、トラックは親の[`<pc-anim>`](../pc-anim)を囲む[`<pc-model>`](../pc-model)のコンテナから取得されます。これが通常のケースです。複数のアニメーションを含めてエクスポートされたGLBの各アニメーションを、クリップとして宣言します。

```html
<pc-entity name="hero">
    <pc-model asset="hero-glb">
        <pc-anim>
            <pc-anim-clip name="idle"></pc-anim-clip>
            <pc-anim-clip name="run"></pc-anim-clip>
        </pc-anim>
    </pc-model>
</pc-entity>
```

**名前を指定したアセット。** `asset`で[`<pc-asset>`](../pc-asset)を指すと、トラックを別のファイルから取得できます。共有のクリップライブラリを、それを含めずにエクスポートされたモデルに適用する方法です。使用できるアセットタイプは3つです。`container`（GLB）、`animation`のGLB、`animclip`のJSONです。

```html
<pc-asset id="hero-glb" type="container" src="hero.glb"></pc-asset>
<pc-asset id="wave" type="container" src="clips/wave.glb"></pc-asset>

<pc-entity name="hero">
    <pc-model asset="hero-glb">
        <pc-anim>
            <pc-anim-clip name="idle"></pc-anim-clip>
            <pc-anim-clip name="wave" asset="wave"></pc-anim-clip>
        </pc-anim>
    </pc-model>
</pc-entity>
```

上のスニペットのように、2つを混在させても問題ありません。`asset`のないクリップはモデルから、`asset`のあるクリップはそれぞれのファイルから取得されます。

供給元がどちらであっても、トラックは次のように選ばれます。

* トラックを**1つ**だけ持つ供給元は、その名前にかかわらずそのトラックを提供します。そのため、単一クリップのGLBでは、エクスポーターが付けた名前を知る必要はありません。マークアップに都合のよい名前を付けてください。
* トラックを**複数**持つ供給元は、`name`という名前のものを提供します。見つからない場合は、利用可能な名前を列挙する警告とともに最初のトラックが使われます。

トラックは名前によってシーンノードにバインドされます。そのため、別ファイルのクリップがモデルをアニメーションさせられるのは、両者のノード名が一致する場合だけです。[トラックのバインド方法](../pc-anim#how-tracks-bind)を参照してください。

## 属性 {#attributes}

<div className="attribute-table">

| 属性 | 型 | デフォルト | 説明 |
| --- | --- | --- | --- |
| `asset` | String | - | トラックを供給する[`<pc-asset>`](../pc-asset)のID。`container`、`animation`のGLB、`animclip`のJSONのいずれかです。空の場合は囲んでいる[`<pc-model>`](../pc-model)から取得します |
| `loop` | Boolean | `"true"` | クリップをループさせるかどうか。ループしないクリップは終了時に最後のポーズを保持します |
| `name` | String | - | クリップの名前であり、供給元から探すトラックの名前。コンポーネント内で一意で、`.`を含められません |
| `speed` | Number | `"1"` | このクリップの再生速度。負の値で逆再生します |

</div>

すべての属性はライブです。`speed`や`loop`の変更は即座に適用され、再生ヘッドの位置は保たれます。`asset`や`name`の変更はトラックを再解決するため、再生中のクリップであれば再スタートします。コンポーネント自身の[`speed`](../pc-anim#attributes)は、ここでの設定に乗算されます。

## 読み込み {#loading}

要素は、トラックが解決されて割り当てられた時点でreadyになります。それまでは親のコンポーネントが空のトラックでクリップの場所を確保するため、シーンがファイルの読み込みで止まることはありません。`activate`は再生を開始し、宣言された`clip`の選択もマークアップが解析された時点で適用され、アセットが届いた時点で実際の動きが現れます。

トラックを解決できなかったクリップは警告を出して未readyのままになり、ライブラリの残りは再生可能なまま保たれます。コンソールのメッセージが原因を示します。アセットが見つからない、読み込みに失敗した、アセットのタイプが違う、供給元に使用できるトラックがない、のいずれかです。

## 例 {#example}

同じ歩行サイクルを`walk`と、逆再生かつ低速の`sneak`という2つのクリップとして宣言しています。トラックが1つだけの供給元はクリップが要求する名前で提供されるため、どちらもGLB内部の名前を知る必要がありません。`speed`を正の値にしたり、`loop="false"`にしてクリップが最終ポーズを保持する様子を確認してみてください:

```html live-example
<pc-app>
    <pc-asset src="https://cdn.jsdelivr.net/npm/playcanvas@2.21.4/scripts/esm/camera-controls.mjs"></pc-asset>
    <pc-asset src="https://developer.playcanvas.com/assets/t-rex.glb" id="t-rex"></pc-asset>
    <pc-material id="floor" diffuse="#3a3f4b"></pc-material>
    <pc-scene>
        <pc-entity name="camera" position="2.5 1.5 3.5">
            <pc-camera clear-color="#2a2d36"></pc-camera>
            <pc-script>
                <pc-script-instance name="cameraControls" focus-point="0 1.2 0" pitch-range="-90 0" zoom-range="1.5 10"></pc-script-instance>
            </pc-script>
        </pc-entity>
        <pc-entity name="light" rotation="45 30 0">
            <pc-light cast-shadows shadow-distance="20" intensity="1.5"></pc-light>
        </pc-entity>
        <pc-entity name="ground" scale="30 30 30">
            <pc-render type="plane" material="floor"></pc-render>
        </pc-entity>
        <pc-model name="t-rex" asset="t-rex" scale="1.5 1.5 1.5">
            <pc-anim id="anim" clip="walk" transition-time="0.4">
                <pc-anim-clip name="walk"></pc-anim-clip>
                <!-- 負のspeedは同じトラックを逆再生します -->
                <pc-anim-clip name="sneak" speed="-0.4"></pc-anim-clip>
            </pc-anim>
        </pc-model>
    </pc-scene>
</pc-app>
<div class="controls">
    <button id="walk">Walk</button>
    <button id="sneak">Sneak backwards</button>
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
    const anim = document.getElementById('anim');

    document.getElementById('walk').onclick = () => anim.setAttribute('clip', 'walk');
    document.getElementById('sneak').onclick = () => anim.setAttribute('clip', 'sneak');
</script>
```

## JavaScriptインターフェース {#javascript-interface}

[AnimClipElement API](https://api.playcanvas.com/web-components/classes/AnimClipElement.html)を使用して、`<pc-anim-clip>`要素をプログラムから作成・操作できます。

`asset`、`loop`、`name`、`speed`は、上記の属性に対応するプロパティとして利用できます。クリップのトラックが割り当てられ、親コンポーネントのレイヤーが埋まっていることを保証するのは、クリップの`ready()`をawaitすることです。

```javascript
import { whenReady } from '@playcanvas/web-components';

const clip = await whenReady('pc-anim-clip');
clip.speed = 2;
```

クリップは実行時に追加・削除でき、コンポーネントはそれに合わせてクリップセットを作り直します。`<pc-anim-clip>`を追加すればライブラリが広がり、[`<pc-model>`](../pc-model)の内側から最後のクリップを削除すると、コンポーネントはそのモデル自身のアニメーションに戻ります。作り直しを乗り越えたアクティブなクリップは、その位置から再生を続けます。

```javascript
const clip = document.createElement('pc-anim-clip');
clip.setAttribute('name', 'wave');
clip.setAttribute('asset', 'wave-glb');
document.querySelector('pc-anim').appendChild(clip);

await clip.ready();
document.querySelector('pc-anim').transition('wave');
```
