---
title: <pc-anim>
description: "pc-anim要素のリファレンス: エンティティ階層上でアニメーションクリップを再生・切り替え・クロスフェードします。クリップはモデル自身のアニメーション、または宣言したpc-anim-clipの子から取得します。"
---

`<pc-anim>`タグは、エンティティ階層上でアニメーションクリップを再生します。キャラクターの歩行サイクル、一連の動作を順に実行する機械、開いていく扉などです。

:::note[使用法]

* [`<pc-entity>`](../pc-entity)、[`<pc-model>`](../pc-model)、または[`<pc-node>`](../pc-node)の直接の子である必要があります。
* 0..n個の[`<pc-anim-clip>`](../pc-anim-clip)を子として持つことができ、それぞれが1つの名前付きクリップを宣言します。

:::

## クリップの供給元 {#where-the-clips-come-from}

クリップを得る方法は2つあり、要素がそのどちらかを自動的に選びます。

**宣言されたクリップ。** [`<pc-anim-clip>`](../pc-anim-clip)の子が1つずつ名前付きクリップを提供します。クリップに自分で名前を付けたいとき、クリップごとに`speed`や`loop`を設定したいとき、複数のファイルからクリップを集めたいときは、この形式を使います。

```html
<pc-model name="robot" asset="arm">
    <pc-anim clip="idle" transition-time="0.35">
        <pc-anim-clip name="idle"></pc-anim-clip>
        <pc-anim-clip name="pick"></pc-anim-clip>
        <pc-anim-clip name="stow" loop="false"></pc-anim-clip>
    </pc-anim>
</pc-model>
```

**囲んでいるモデルのすべてのアニメーション。** クリップの子がなく、親が[`<pc-model>`](../pc-model)である場合、そのモデルのコンテナアセットが持つすべてのアニメーションが、それぞれのトラック名を名前として、コンテナ内の順序で割り当てられます。空のタグ1つで、GLBに入っていたものを再生できます。

```html
<pc-model name="t-rex" asset="t-rex">
    <pc-anim></pc-anim>
</pc-model>
```

宣言されたクリップが優先されます。モデルのアニメーションを割り当てていた要素に`<pc-anim-clip>`の子を追加すると、宣言されたクリップの側に切り替わります。どちらの場合も最初のクリップは自動的に再生を始めます。これを止めるには`activate="false"`を指定します。

エンジンが扱えない名前のトラックは、それぞれを名指しする警告とともにスキップされます。`.`を含む名前（ブレンドツリーのパス用に予約されています）と、先行するトラックがすでに使った名前です。

[`<pc-model>`](../pc-model)の内側にある`<pc-anim>`は、そのモデル自身のホストエンティティに取り付けられます。したがってラッパーとなるエンティティは不要で、追加すべきでもありません。モデルのコンテンツは同じホストの下に置かれるため、これによりクリップが階層に届きます。またホストは`asset`の変更を越えて存続するので、モデルのGLBを差し替えてもコンポーネントは残り、新しいコンテナに対してクリップが再解決されます。

## 属性 {#attributes}

<div className="attribute-table">

| 属性 | 型 | デフォルト | 説明 |
| --- | --- | --- | --- |
| `activate` | Boolean | `"true"` | クリップが割り当てられた時点で再生を自動的に開始するかどうか。すでに再生中のクリップを停止させるものではありません |
| `clip` | String | 最初に割り当てられたクリップ | アクティブなクリップの名前。変更すると再生が切り替わり、`transition-time`にわたってクロスフェードします。どのクリップにも一致しない名前は警告を出し、選択はそのままになります |
| `enabled` | Boolean | `"true"` | コンポーネントの有効状態 |
| `speed` | Number | `"1"` | すべてのクリップに適用される再生速度の倍率。0で再生が停止します |
| `transition-time` | Number | `"0"` | `clip`による切り替えのクロスフェード時間（秒）。0はハードカットです |

</div>

ここでの`speed`は[クリップごとの`speed`](../pc-anim-clip#attributes)に乗算されます。そのため`speed="1.4"`で記述されたクリップは、`speed="0.5"`のコンポーネント内では0.7倍で再生されます。

## クリップの切り替え {#switching-clips}

`clip`は再生するクリップを指定し、その値はライブです。マークアップ、開発者ツール、JavaScriptのいずれから設定しても再生が追従します。`transition-time`が0より大きい場合、切り替えはその秒数でクロスフェードします。これがキャラクターのポーズが急に切り替わるのを防ぎます。

```html
<pc-anim id="hero" clip="idle" transition-time="0.3">
    <pc-anim-clip name="idle"></pc-anim-clip>
    <pc-anim-clip name="run"></pc-anim-clip>
</pc-anim>
```

```javascript
document.getElementById('hero').setAttribute('clip', 'run'); // 0.3秒でクロスフェードします
```

要素のメソッドは、属性では表現できないことを担います。デフォルトがフェードのときのハードカット、その場限りのフェード時間、そして一時停止です。

```javascript
const anim = document.getElementById('hero');

anim.play('run');           // ハードカット。transition-timeを無視します
anim.transition('idle', 1); // 今回だけ1秒のフェード
anim.pause();               // 再生ヘッドを保ったまま停止します
anim.play();                // 停止した位置から再開します
```

どのクリップにも一致しない名前を指定した場合、現在のクリップがそのまま再生され続けます。クリップ名の打ち間違いでシーンが止まってしまうことはありません。警告はコンソールで確認してください。

## トラックのバインド方法 {#how-tracks-bind}

クリップはコンポーネントのエンティティ以下の階層全体に対して、**名前によって**シーンノードにバインドされます。モデルのスケルトンが典型例ですが、スケルトンが特別なわけではありません。クリップのカーブと名前が一致する階層であれば何でもアニメーションします。[Robot Armの例](https://playcanvas.github.io/web-components/examples/robot-arm.html)が、スキニングを一切使わずに10個の剛体パーツを動かしているのはこのためです。

エンジンは各カーブを一度だけ解決し、再試行しません。そのため、クリップが割り当てられた*後*に読み込みが完了したモデルは、本来なら黙ってバインドされないままになります。この要素はそれを処理します。ホストの下にあるモデルがreadyを通知した時点で再バインドし、クリップの供給元であるモデルが再インスタンス化された場合はクリップセット全体を作り直します。したがって、実行時に[`<pc-model>`の`asset`](../pc-model#attributes)を変更しても、特別な対応なしに期待どおりに動作します。

この要素はコンポーネントの`rootBone`も管理します。アセット自身のルートノードを対象とするカーブがエンジンの期待する位置にバインドされるよう、囲んでいるモデルのホストを指すように設定します。これはサイクルごとに再導出され、対象となるモデルが1つに定まらない場合はクリアされます。ただし、エンジンのAPIを通じて自分で割り当てた`rootBone`はユーザーのものとして認識され、上書きされることはありません。

クリップの終わりについて1つ知っておくべきことがあります。**エンジンは再生完了を通知しません**。`loop="false"`のクリップは最後のポーズを保持したまま、何も知らせません。リッスンできる`end`イベントは存在しません。クリップの終了時に何かをするには、内部のコンポーネント上で再生ヘッドをトラックの長さと比較してください。

```javascript
const { baseLayer } = anim.component;
const done = baseLayer.activeStateCurrentTime >= baseLayer.activeStateDuration;
```

## 例 {#example}

歩行サイクルが1つだけ入ったGLBを、2つのクリップとして宣言しています。`walk`は元の速度、`stalk`はその3分の1の速度です。両者を切り替えると、`transition-time="0.4"`が設定するクロスフェードを確認できます。クリップごとの`speed`を変えたり、`activate="false"`で一時停止状態から始めたり、クリップの子をすべて削除してみてください。削除するとモデル自身のアニメーションが自動的に割り当てられます:

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
            <pc-light cast-shadows normal-offset-bias="0.05" shadow-bias="0.2" shadow-distance="20" intensity="1.5"></pc-light>
        </pc-entity>
        <pc-entity name="ground" scale="30 30 30">
            <pc-render type="plane" material="floor"></pc-render>
        </pc-entity>
        <pc-model name="t-rex" asset="t-rex" scale="1.5 1.5 1.5">
            <pc-anim id="anim" clip="walk" transition-time="0.4">
                <pc-anim-clip name="walk"></pc-anim-clip>
                <pc-anim-clip name="stalk" speed="0.33"></pc-anim-clip>
            </pc-anim>
        </pc-model>
    </pc-scene>
</pc-app>
<div class="controls">
    <button id="walk">Walk</button>
    <button id="stalk">Stalk</button>
    <button id="transport">Pause</button>
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
    const transport = document.getElementById('transport');

    // レイヤーの存在を保証するのはクリップなので、アプリではなくクリップを待ちます
    await Promise.all([...anim.querySelectorAll('pc-anim-clip')].map(clip => clip.ready()));

    let playing = true;

    document.getElementById('walk').onclick = () => anim.setAttribute('clip', 'walk');
    document.getElementById('stalk').onclick = () => anim.setAttribute('clip', 'stalk');

    transport.onclick = () => {
        playing = !playing;
        playing ? anim.play() : anim.pause();
        transport.textContent = playing ? 'Pause' : 'Play';
    };
</script>
```

[Robot Armの例](https://playcanvas.github.io/web-components/examples/robot-arm.html)はさらに踏み込んで、6つのクリップライブラリ、スクラブ可能な再生ヘッド、ブレンドの切り替えを備えています。

## JavaScriptインターフェース {#javascript-interface}

[AnimComponentElement API](https://api.playcanvas.com/web-components/classes/AnimComponentElement.html)を使用して、`<pc-anim>`要素をプログラムから作成・操作できます。

| メンバー | 説明 |
| --- | --- |
| `play(name?)` | 再生を再開します。名前を渡すとそのクリップへハードカットします。`transition-time`は無視されます |
| `pause()` | 再生ヘッドを保ったまま再生を一時停止します |
| `transition(name, time?)` | 指定した名前のクリップへクロスフェードし、再生中であることを保証します。`time`のデフォルトは`transition-time`です |
| `clips` | 割り当てられたクリップの名前を、割り当て順で返します |
| `component` | 内部のエンジンの[AnimComponent](https://api.playcanvas.com/engine/classes/AnimComponent.html) |

`activate`、`clip`、`speed`、`transitionTime`も、上記の属性に対応するプロパティとして利用できます。

要素をawaitするだけでは、クリップが再生可能であることまでは保証されません。コンポーネントはホストのエンティティがreadyになった時点で存在しますが、各クリップのトラックは別に読み込まれます。レイヤーが埋まっている必要があるときはクリップをawaitしてください。

```javascript
import { whenReady } from '@playcanvas/web-components';

const anim = await whenReady('pc-anim');
await Promise.all([...anim.querySelectorAll('pc-anim-clip')].map(clip => clip.ready()));

console.log(anim.clips); // ['walk', 'stalk']
```

この要素が公開していない機能は`component`（エンジンの[AnimComponent](https://api.playcanvas.com/engine/classes/AnimComponent.html)）から利用できます。再生ヘッド（`baseLayer.activeStateCurrentTime`）、アクティブなクリップの長さ、そしてフラットなクリップ集合を超えるアニメーションのためのステートグラフやブレンドツリーなどです。

## 関連項目 {#see-also}

* [`<pc-anim-clip>`](../pc-anim-clip) — コンポーネントが再生する各クリップを宣言します
* [`<pc-model>`](../pc-model) — 通常のホスト。そのGLBがアニメーショントラックを供給します
* [`<pc-asset>`](../pc-asset) — 別のGLBやanimclip JSONからクリップを供給します

サンプル: [GLB Animation](https://playcanvas.github.io/web-components/examples/glb-animation.html)、[Robot Arm](https://playcanvas.github.io/web-components/examples/robot-arm.html)
