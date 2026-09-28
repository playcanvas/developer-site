---
title: <pc-scene>
description: "pc-scene要素のリファレンス: pc-app内のシーンコンテナで、保持するエンティティに適用されるフォグ、露出、重力の設定を持ちます。"
---

`<pc-scene>`タグは、シーンを定義するために使用されます。

:::note[使用法]

* [`<pc-app>`](../pc-app)の直接の子要素である必要があります。

:::

## 属性 {#attributes}

<div className="attribute-table">

| 属性 | タイプ | デフォルト | 説明 |
| --- | --- | --- | --- |
| `exposure` | Number | `"1"` | レンダリングされる画像全体の明るさの倍率。シーンが物理単位を使用している間は無視されます |
| `fog` | Enum | `"none"` | フォグの種類：`"none"` \| `"linear"` \| `"exp"` \| `"exp2"` |
| `fog-color` | Color | `"1 1 1"` | スペース区切りのRGB値、16進数コード、または[名前付きカラー](https://github.com/playcanvas/web-components/blob/main/src/colors.ts)としてのフォグの色 |
| `fog-density` | Number | `"0"` | 指数フォグタイプの場合のフォグの密度 |
| `fog-end` | Number | `"1000"` | 線形フォグの終了距離 |
| `fog-start` | Number | `"0"` | 線形フォグの開始距離 |
| `gsplat-lod-mode` | Enum | `"error"` | ストリーミングされるGaussian splatのLODレベルを、スプラット予算の範囲内でどう選ぶか：`"error"` \| `"distance"`。[レベルオブディテール](../pc-gsplat#level-of-detail)を参照 |
| `gsplat-splat-budget` | Number | `"1000000"` | シーン内のすべてのGaussian splatを合わせて描画するスプラット数の目標値。ストリーミングされるスプラットアセット間で配分されます。0以下の値は警告を出し、デフォルトが維持されます |
| `gsplat-use-fog` | Boolean | `"true"` | シーンのフォグをGaussian splatに適用するかどうか |
| `gsplat-use-tonemap` | Boolean | `"true"` | カメラのトーンマッピングとシーンの`exposure`をGaussian splatに適用するかどうか。`"false"`にすると、スプラットは保存されている色のままレンダリングされます。これはすでに表示用に仕上がっているキャプチャに適しています。フォグは引き続き適用されます |
| `gravity` | Vector3 | `"0 -9.81 0"` | 「X Y Z」値としてリジッドボディに適用される重力 |
| `lighting-max-lights` | Number | `"255"` | クラスターライティングが1フレームで使用するライトの最大数。1から65535まで。上限を超えたライトは警告とともに無視され、255を超える値はライトグリッドのメモリを2倍にします |
| `physics-time-scale` | Number | `"1"` | 物理シミュレーションが毎フレーム進める時間に掛かる倍率。1未満はスローモーション、1を超えると高速になり、`"0"`はアプリケーションの他の部分を動かしたまま物理を一時停止します。アプリケーション自体のタイムスケールに重ねて適用されます |

</div>

## イベント {#events}

`<pc-scene>`はすべてのエンティティ要素の祖先なので、エンティティでディスパッチされた[ポインターイベント](../pc-entity#events)はここを通ってバブリングします。ここに置いたリスナーは、シーン全体に対する委譲リスナーになります。ヒットしたエンティティは`event.target`で調べます:

```javascript
document.querySelector('pc-scene').addEventListener('click', (event) => {
    console.log(`Clicked ${event.target.getAttribute('name')}`);
});
```

ここに置いたリスナーは[イベントがディスパッチされるタイミング](../pc-entity#when-events-are-dispatched)の判定に含まれるため、エンティティ自体にリスナーを置く必要はありません。押下と解放が異なる2つのトップレベルのエンティティ上で起きたクリックは、両者の最も近い共通の祖先である`<pc-scene>`自体がターゲットになります。シーンは、ポインターがそのエンティティ全体の上に移動したときと離れたときに、自分用の`pointerenter`と`pointerleave`も受け取ります。そのため、たとえばシーン内の何かがポインターの下にある間はカーソルを変える、といった処理を1組のリスナーで実現できます。

## 例 {#example}

リニアフォグの中へ消えていくボックスです。`fog-color` を変えたり (カメラの `clear-color` と揃えると定番の深度ヘイズ表現になります)、`fog` を `"exp"` にして `fog-density` を `0.15` にしたりしてみましょう:

```html live-example
<pc-app>
    <pc-scene fog="linear" fog-color="#4a5568" fog-start="2" fog-end="10">
        <pc-entity name="camera" position="0 1.5 4" rotation="-10 0 0">
            <pc-camera clear-color="#4a5568"></pc-camera>
        </pc-entity>
        <pc-entity name="light" rotation="45 30 0">
            <pc-light></pc-light>
        </pc-entity>
        <pc-entity name="box-1" position="-1 0.5 0">
            <pc-render type="box"></pc-render>
        </pc-entity>
        <pc-entity name="box-2" position="0 0.5 -3">
            <pc-render type="box"></pc-render>
        </pc-entity>
        <pc-entity name="box-3" position="1 0.5 -6">
            <pc-render type="box"></pc-render>
        </pc-entity>
        <pc-entity name="box-4" position="2 0.5 -9">
            <pc-render type="box"></pc-render>
        </pc-entity>
        <pc-entity name="ground" position="0 -0.5 -4" scale="10 1 20">
            <pc-render type="box"></pc-render>
        </pc-entity>
    </pc-scene>
</pc-app>
```

## JavaScriptインターフェース {#javascript-interface}

[SceneElement API](https://api.playcanvas.com/web-components/classes/SceneElement.html)を使用して、`<pc-scene>`要素をプログラムで作成および操作できます。

`scene`プロパティは、エンジンの[Scene](https://api.playcanvas.com/engine/classes/Scene.html)です。要素の準備が完了するまでは`null`で、フォグ、露出、スカイはここで設定されます。

## 関連項目 {#see-also}

* [`<pc-app>`](../pc-app) — シーンを保持するアプリケーション
* [`<pc-sky>`](../pc-sky) — シーンのスカイボックスと画像ベースのライティング
* [`<pc-camera>`](../pc-camera) — シーンの露出のあとに適用されるトーンマッピング
* [`<pc-rigid-body>`](../pc-rigid-body) — 重力が働くボディ

サンプル: [Basic Shapes](https://playcanvas.github.io/web-components/examples/basic-shapes.html)、[Spinning Cube](https://playcanvas.github.io/web-components/examples/spinning-cube.html)
