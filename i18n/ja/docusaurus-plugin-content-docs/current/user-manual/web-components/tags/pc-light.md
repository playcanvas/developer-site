---
title: <pc-light>
description: "pc-light要素のリファレンス: ライトの種類、色、強度、シャドウ、ディレクショナル、スポット、オムニライト向けの属性です。"
---

`<pc-light>`タグは、ライトコンポーネントを定義するために使用されます。

:::note[使用法]

* [`<pc-entity>`](../pc-entity)、[`<pc-model>`](../pc-model)、または[`<pc-node>`](../pc-node) の直接の子である必要があります。

:::

## 属性 {#attributes}

<div className="attribute-table">

| 属性 | タイプ | デフォルト | 説明 |
| --- | --- | --- | --- |
| `cascade-blend` | Number | `"0"` | 各シャドウカスケードを次のカスケードへブレンドする割合。0（ブレンドなし）から1。`num-cascades`が1より大きい`directional`ライトで使用されます |
| `cascade-distribution` | Number | `"0.5"` | カメラの視錐台をカスケード間で分割する方法。0（等間隔）から1（対数的で、カメラ近傍に解像度を集中）。`num-cascades`が1より大きい`directional`ライトで使用されます |
| `cast-shadows` | Boolean | `"false"` | ライトが影を落とすかどうか |
| `color` | Color | `"1 1 1"` | スペース区切りのRGB値、16進数コード、または[名前付き色](https://github.com/playcanvas/web-components/blob/main/src/colors.ts)としてのライトの色 |
| `enabled` | Boolean | `"true"` | コンポーネントの有効状態 |
| `inner-cone-angle` | Number | `"40"` | 内側コーン角度（度単位、スポットライト用） |
| `intensity` | Number | `"1"` | ライトの強度乗数 |
| `normal-offset-bias` | Number | `"0"` | シャドウレンダリング用の法線オフセットバイアス |
| `num-cascades` | Number | `"1"` | シャドウカスケードの数。1（カスケードなし）から4の整数。`directional`ライトで使用されます |
| `outer-cone-angle` | Number | `"45"` | 外側コーン角度（度単位、スポットライト用） |
| `penumbra-falloff` | Number | `"1"` | PCSSシャドウの半影減衰率 |
| `penumbra-size` | Number | `"1"` | PCSSシャドウの半影サイズ |
| `range` | Number | `"10"` | ライトの有効距離 |
| `shadow-bias` | Number | `"0.05"` | 影の深度バイアス |
| `shadow-blocker-samples` | Number | `"16"` | PCSSシャドウブロッカーのサンプル数 |
| `shadow-distance` | Number | `"40"` | シャドウレンダリングの最大距離 |
| `shadow-intensity` | Number | `"1"` | 影の強度乗数 |
| `shadow-resolution` | Number | `"1024"` | シャドウマップの解像度 |
| `shadow-samples` | Number | `"16"` | PCSSシャドウのサンプル数 |
| `shadow-type` | Enum | `"pcf3-32f"` | 影のフィルタリング: `"pcf1-16f"` \| `"pcf1-32f"` \| `"pcf3-16f"` \| `"pcf3-32f"` \| `"pcf5-16f"` \| `"pcf5-32f"` \| `"vsm-16f"` \| `"vsm-32f"` \| `"pcss-32f"` |
| `shape` | Enum | `"punctual"` | 光源の形状: `"punctual"` \| `"rect"` \| `"disk"` \| `"sphere"`。エリア形状は`omni`と`spot`ライトに適用され、サイズはエンティティのスケールで決まり、[`<pc-app>`](../pc-app)の`area-light-luts`で読み込むルックアップテーブルが必要です。[エリアライト](#area-lights)を参照 |
| `type` | Enum | `"directional"` | ライトのタイプ: `"directional"` \| `"omni"` \| `"spot"` |
| `vsm-bias` | Number | `"0.0025"` | バリアンスシャドウマップのバイアス |
| `vsm-blur-size` | Number | `"11"` | バリアンスシャドウマップのぼかしサイズ（1〜25） |

</div>

ここでのデフォルト値はすべてエンジン自身のものです。そのため、属性を省略した`<pc-light>`は、エンジンが自ら構築したライトとまったく同じようにレンダリングされます。これが特に重要なのはシャドウ調整用の属性です。小さなシーンで見栄えよく見せる値をあらかじめ設定するのではなく、意図的に未調整のままにしてあります。影を有効にして何かがおかしいと感じたら、`shadow-bias`や`normal-offset-bias`は自分で調整することになります。

## シャドウカスケード {#shadow-cascades}

1枚のシャドウマップを遠くまでの視界に引き伸ばすと解像度が足りなくなります。カメラ近くの影はブロック状になり、遠くの影は粗いままです。カスケードはカメラの視錐台をいくつかのスライスに分割し、それぞれに専用のシャドウマップを与えるため、ディテールがカメラに追従します。これは`directional`ライトにのみ適用され、明示的に指定するまで無効です。

```html
<pc-entity name="sun" rotation="45 30 0">
    <pc-light cast-shadows
              num-cascades="4"
              cascade-distribution="0.7"
              cascade-blend="0.1"
              shadow-distance="200"
              shadow-resolution="2048"></pc-light>
</pc-entity>
```

3つの属性はそれぞれ異なる役割を持ち、`num-cascades`が1より大きい場合にのみ他の2つが効いてきます。

| 属性 | 制御する内容 |
| --- | --- |
| `num-cascades` | スライスの数（1〜4）。多いほどスライスごとのディテールは増えますが、その分シャドウの描画パスが増えます |
| `cascade-distribution` | 分割位置。0（等間隔）から1（カメラ寄りに密集）。手前の影にディテールが必要なら上げ、遠方のスライスが不足して見えるなら下げます |
| `cascade-blend` | 各スライスを次のスライスへクロスフェードさせる量（0〜1）。小さな値でスライスの継ぎ目を隠せますが、大きすぎると重なり部分に解像度を無駄に使います |

全体の範囲は依然として`shadow-distance`が決めます。これがカスケードで分割される距離なので、距離を上げずにカスケード数だけ増やしても、同じ近距離範囲をさらに細分するだけです。`shadow-resolution`は共有の予算ではなく、カスケードごとの値です。

[Shadow Cascadesのサンプル](https://playcanvas.github.io/web-components/examples/shadow-cascades.html)は、カスケードが必要になるほど長い砂漠の堤道で3つの属性すべてを操作でき、レンダラーが導出する分割距離もプロットします。エンジンにはカスケードのデバッグビューがなく、それがないと`cascade-distribution`のスライダーは何も効いていないように見えるため、一見の価値があります。

## エリアライト {#area-lights}

点光源は無限に小さな1点です。現実の照明器具には大きさがあり、その大きさこそがハイライトと影を柔らかくします。`shape`は`omni`または`spot`ライトに3種類のエリア形状（`rect`・`disk`・`sphere`）のいずれかを与え、サイズはエンティティのスケールで決まります。単位スケールでは、`rect`はエンティティのローカルXZ平面上の1×1の矩形、`disk`は同じ平面上の直径1の円盤、`sphere`は直径1の球です。エリア形状は自身のサイズと距離に応じて減衰するため、それらにとって`range`は減衰そのものではなく、単なるカットオフです。

エリアライトには、エンジンが同梱していないルックアップテーブルが必要です。Heitz、Dupuy、Hill、Neubelt（SIGGRAPH 2016）による線形変換コサインのテーブルです。[`<pc-app>`](../pc-app)の`area-light-luts`には、それをJSONとして保持する[`<pc-asset>`](../pc-asset)を指定します（`LTC_MAT_1`と`LTC_MAT_2`、各16,384個の数値。エンジンのサンプルの`area-light-luts.json`と同じ形式です）。このアセットが読み込まれることが、アプリケーション全体でエリアライトを有効にするスイッチになります。

```html
<pc-app area-light-luts="luts">
    <pc-asset id="luts" src="https://playcanvas.github.io/web-components/examples/assets/json/area-light-luts.json"></pc-asset>
    <pc-scene>
        <!-- 2×1の天井パネル。rectとdiskはエンティティのXZ平面から放射するので、これは下向きに照らします -->
        <pc-entity name="panel" position="0 3 0" scale="2 1 1">
            <pc-light type="spot" shape="rect" intensity="8" range="12" outer-cone-angle="88"></pc-light>
        </pc-entity>
    </pc-scene>
</pc-app>
```

1つの属性がこの機能の両面を制御します。有効なテーブルを読み込むとそれが適用されてエリアライトが有効になり、属性を外すと再び無効になります（すでにエンジンに渡されたテーブルはそのまま残ります）。どのアセットにも解決しないIDは警告とともに無効化し、ルックアップテーブルでないファイルは警告を出して拒否されます。本物のテーブルがないと、エンジンのプレースホルダーによって`disk`ライトは何も放射せず、すべての形状からスペキュラが失われるためです。他の[`<pc-app>`](../pc-app)の属性と異なり、この属性は即座に適用され、起動前に設定すれば他のアセットと一緒に読み込まれます。エリアライトを描画できないデバイスではこのスイッチは無視され、その`omni`と`spot`のエリアライトは点光源のままです。

テーブルの出所はエンジンリポジトリの`examples/assets/json/area-light-luts.json`（MITライセンス）です。Web Componentsのサンプルギャラリーが上記URLでコピーを配信しており（約300 KB）、試すには十分ですが、本番では自分でホストしてください。

[Area Lightsのサンプル](https://playcanvas.github.io/web-components/examples/area-lights.html)は、`rect`のスポットで天井パネルを、`sphere`のオムニでランタンの電球を作っており、`intensity`と`range`が形状のサイズとどう相互作用するかを見るのに最も手早い方法です。

## 例 {#example}

ライトの `color`、`intensity`、`type` の値を編集して、シーンが更新される様子を確認してみましょう:

```html live-example
<pc-app>
    <pc-scene>
        <pc-entity name="camera" position="0 2.5 5" rotation="-15 0 0">
            <pc-camera clear-color="#1d1f2b"></pc-camera>
        </pc-entity>
        <!-- 下向きに照らす暖色のスポットライト (スポットライトはY軸負方向を向きます) -->
        <pc-entity name="spot-light" position="-2 4 0">
            <pc-light type="spot" color="#ffb47a" intensity="5" outer-cone-angle="35" cast-shadows normal-offset-bias="0.05" shadow-bias="0.2"></pc-light>
        </pc-entity>
        <!-- 形状の間に置いた寒色のオムニライト -->
        <pc-entity name="omni-light" position="2 2 1">
            <pc-light type="omni" color="#7ab8ff" intensity="2.5" range="10"></pc-light>
        </pc-entity>
        <!-- 照らされる形状 -->
        <pc-entity name="ground" position="0 -0.5 0" scale="10 1 10">
            <pc-render type="box"></pc-render>
        </pc-entity>
        <pc-entity name="sphere" position="-2 0.5 0">
            <pc-render type="sphere"></pc-render>
        </pc-entity>
        <pc-entity name="box" position="2 0.5 0" rotation="0 30 0">
            <pc-render type="box"></pc-render>
        </pc-entity>
    </pc-scene>
</pc-app>
```

## JavaScriptインターフェース {#javascript-interface}

[LightComponentElement API](https://api.playcanvas.com/web-components/classes/LightComponentElement.html)を使用して、`<pc-light>`要素をプログラムで作成および操作できます。

`component`プロパティは、この要素が追加するエンジンの[LightComponent](https://api.playcanvas.com/engine/classes/LightComponent.html)です。要素の準備が完了するまでは`null`で、属性が公開していないものはすべてここから利用できます。

## 関連項目 {#see-also}

* [`<pc-scene>`](../pc-scene) — すべてのライトの寄与をスケールする露出
* [`<pc-sky>`](../pc-sky) — 直接光が届かない部分を埋める画像ベースのライティング
* [`<pc-render>`](../pc-render) — ライトが当たるものの`cast-shadows`と`receive-shadows`

サンプル: [Basic Shapes](https://playcanvas.github.io/web-components/examples/basic-shapes.html)、[Shadow Cascades](https://playcanvas.github.io/web-components/examples/shadow-cascades.html)、[Area Lights](https://playcanvas.github.io/web-components/examples/area-lights.html)
