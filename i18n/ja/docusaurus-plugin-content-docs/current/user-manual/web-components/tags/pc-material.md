---
title: <pc-material>
description: "pc-material要素のリファレンス: カラー、メタルネス、グロス、不透明度、属性で設定できるテクスチャマップスロットを持つ物理ベースのスタンダードマテリアル。"
---

`<pc-material>`タグは、[`<pc-render>`](../pc-render)コンポーネントの`material`属性から適用できるマテリアルを定義するために使用されます。

:::note[使用法]

* [`<pc-app>`](../pc-app) の直接の子である必要があります。

:::

この要素はエンジンの[StandardMaterial](https://api.playcanvas.com/engine/classes/StandardMaterial.html)をラップし、デフォルトでメタル/ラフネスのワークフローを使用します。素の`StandardMaterial`とは異なり、メタルネスワークフローが有効化されており（`use-metalness`のデフォルトは`"true"`）、これは`metalness-*`属性が前提とする動作であり、glTFをはじめとするPBRツールが「PBR」と呼ぶものです。この既定と対になるように、`metalness`はエンジンの`1`ではなく`0`（誘電体）から始まるため、`diffuse`カラーだけを指定したマテリアルは完全な金属面としてではなく、そのカラーとして描画されます。金属にする場合は`metalness="1"`を設定してください。

:::warning[グロスとラフネス]

`roughness`および`roughness-map`属性は、`gloss`および`gloss-map`のエイリアスで、加えてグロスチャンネルを反転します。1つのマテリアルではどちらか一方のファミリーだけを使用してください。両方を混在させると、2つのファミリーは反転について解釈が食い違うため、コンソールに警告が記録されます。`gloss-map-*`[修飾子](#texture-map-modifiers)自体は反転に関与しないため、`roughness-map`の設定にはそれらを使用するのが正しい方法です。

:::

## 属性 {#attributes}

<div className="attribute-table">

| 属性 | タイプ | デフォルト | 説明 |
| --- | --- | --- | --- |
| `alpha-test` | Number | `"0"` | アルファテストの参照値。不透明度がこの値を下回るフラグメントは破棄されます |
| `alpha-to-coverage` | Boolean | `"false"` | マルチサンプリングで透明度を解決するアルファトゥカバレッジを使用するかどうか |
| `ao-intensity` | Number | `"1"` | アンビエントオクルージョンマップの強さ（0〜1） |
| `ao-map` | String | - | アンビエントオクルージョンマップとして使用するテクスチャ [`<pc-asset>`](../pc-asset) の `id` |
| `blend-type` | Enum | `"none"` | マテリアルを背後のシーンとブレンドする方法: `"none"` \| `"normal"` \| `"additive"` \| `"additive-alpha"` \| `"premultiplied"` \| `"multiplicative"` \| `"multiplicative-2x"` \| `"screen"` \| `"min"` \| `"max"` \| `"subtractive"` |
| `bumpiness` | Number | `"1"` | ノーマルマップの強さ。0はフラット、1はマップの効果を最大に適用します |
| `cull` | Enum | `"back"` | メッシュのどの面をカリングするか: `"none"` \| `"back"` \| `"front"` \| `"front-and-back"` |
| `depth-bias` | Number | `"0"` | フラグメントの深度に適用されるオフセット。Zファイティングの解決に使用します |
| `depth-test` | Boolean | `"true"` | フラグメントを深度バッファに対してテストするかどうか |
| `depth-write` | Boolean | `"true"` | フラグメントが深度バッファに書き込むかどうか |
| `diffuse` | Color | `"1 1 1"` | マテリアルのディフューズカラー |
| `diffuse-map` | String | - | ディフューズマップとして使用するテクスチャ [`<pc-asset>`](../pc-asset) の `id` |
| `emissive` | Color | `"0 0 0"` | マテリアルのエミッシブカラー |
| `emissive-intensity` | Number | `"1"` | エミッシブカラーとマップに適用される乗数 |
| `emissive-map` | String | - | エミッシブマップとして使用するテクスチャ [`<pc-asset>`](../pc-asset) の `id` |
| `enable-ggx-specular` | Boolean | `"false"` | 異方性をサポートするGGXスペキュラモデルを使用するかどうか |
| `fresnel-model` | Enum | `"schlick"` | 浅い角度でのスペキュラ反射に使用するフレネルモデル: `"none"` \| `"schlick"` |
| `gloss` | Number | `"0.25"` | マテリアルの光沢度。0（ラフ）から1（光沢）まで。`roughness`も参照してください |
| `gloss-invert` | Boolean | `"false"` | グロスの値とマップを反転し、ラフネスとして扱うかどうか。`roughness`または`roughness-map`を設定すると自動的に有効になります |
| `gloss-map` | String | - | グロスマップとして使用するテクスチャ [`<pc-asset>`](../pc-asset) の `id` |
| `height-map` | String | - | ハイトマップとして使用するテクスチャ [`<pc-asset>`](../pc-asset) の `id` |
| `height-map-factor` | Number | `"1"` | ハイトマップによる視差効果の強さ |
| `id` | String | - | 他のタグがこのマテリアルを参照するために使用する一意の識別子 |
| `metalness` | Number | `"0"` | 表面の金属度。0（誘電体）から1（金属）まで |
| `metalness-map` | String | - | メタルネスマップとして使用するテクスチャ [`<pc-asset>`](../pc-asset) の `id` |
| `name` | String | `"Untitled"` | マテリアルの名前。参照用ではなくラベルです。他のタグは常に`id`でマテリアルを指定します |
| `normal-map` | String | - | ノーマルマップとして使用するテクスチャ [`<pc-asset>`](../pc-asset) の `id` |
| `occlude-direct` | Boolean | `"false"` | アンビエントオクルージョンが直接光も減衰させるかどうか |
| `occlude-specular` | Enum | `"ao"` | スペキュラ反射をオクルージョンする方法: `"none"` \| `"ao"` \| `"gloss-dependent"` |
| `opacity` | Number | `"1"` | マテリアルの不透明度。0（透明）から1（不透明）まで。視覚的な効果を得るには`"none"`以外の`blend-type`が必要です |
| `opacity-dither` | Enum | `"none"` | ブレンドなしで透明度を近似する不透明度のディザリング: `"none"` \| `"bayer8"` \| `"bluenoise"` \| `"ignnoise"` |
| `opacity-fades-specular` | Boolean | `"true"` | マテリアルが透明になるにつれてスペキュラハイライトをフェードアウトさせるかどうか |
| `opacity-map` | String | - | オパシティマップとして使用するテクスチャ [`<pc-asset>`](../pc-asset) の `id` |
| `roughness` | Number | - | マテリアルのラフネス。0（光沢）から1（ラフ）まで。`gloss`のエイリアスで、`gloss-invert`も設定するため、`gloss`系の属性と組み合わせないでください |
| `roughness-map` | String | - | ラフネスマップとして使用するテクスチャ [`<pc-asset>`](../pc-asset) の `id`。`gloss-map`のエイリアスで、`gloss-invert`も設定するため、`gloss`系の属性と組み合わせないでください |
| `slope-depth-bias` | Number | `"0"` | 表面の傾きに比例して適用される深度オフセット。Zファイティングの解決に使用します |
| `specular` | Color | `"0 0 0"` | マテリアルのスペキュラカラー。メタルネスワークフローが無効か、`use-metalness-specular-color`が有効な場合にのみ適用されます |
| `specularity-factor` | Number | `"1"` | 正面の角度でのスペキュラ反射の強さ（0〜1）。`use-metalness-specular-color`が有効な場合にのみ適用されます |
| `two-sided-lighting` | Boolean | `"false"` | 裏面を法線が反転しているかのようにライティングするかどうか |
| `use-fog` | Boolean | `"true"` | マテリアルがシーンのフォグの影響を受けるかどうか |
| `use-lighting` | Boolean | `"true"` | マテリアルがシーンのライトの影響を受けるかどうか。無効にすると、ディフューズカラーとマップのみを使用してアンリットでレンダリングされます |
| `use-metalness` | Boolean | `"true"` | 旧来のスペキュラワークフローではなくメタルネスワークフローを使用するかどうか |
| `use-metalness-specular-color` | Boolean | `"false"` | メタルネスワークフローの使用中にスペキュラカラーで反射に色付けするかどうか |
| `use-skybox` | Boolean | `"true"` | マテリアルがシーンのスカイボックスによってライティングされるかどうか |
| `use-tonemap` | Boolean | `"true"` | カメラのトーンマッピングをマテリアルに適用するかどうか |

</div>

## テクスチャマップ修飾子 {#texture-map-modifiers}

上記の各`*-map`属性はテクスチャスロットを定義し、各スロットにはテクスチャのサンプリング方法を設定する一連の修飾子があります。`<slot>`は`ao`、`diffuse`、`emissive`、`gloss`、`height`、`metalness`、`normal`、`opacity`のいずれかに置き換えてください:

<div className="attribute-table">

| 属性 | タイプ | デフォルト | 説明 |
| --- | --- | --- | --- |
| `<slot>-map-channel` | Enum | *スロットによる* | マップを読み取るテクスチャチャンネル |
| `<slot>-map-offset` | Vector2 | `"0 0"` | マップのUVオフセット |
| `<slot>-map-rotation` | Number | `"0"` | マップの回転（度単位） |
| `<slot>-map-tiling` | Vector2 | `"1 1"` | 表面に対するマップのタイリング（リピート） |
| `<slot>-map-uv` | Number | `"0"` | マップのサンプリングに使用するUVセットのインデックス |

</div>

`-map-channel`修飾子はスロットによって異なります:

* カラーマップ（`diffuse`、`emissive`）は`"r"` \| `"g"` \| `"b"` \| `"a"` \| `"rgb"`を受け付け、デフォルトは`"rgb"`です。
* スカラーマップ（`ao`、`gloss`、`height`、`metalness`）は`"r"` \| `"g"` \| `"b"` \| `"a"`を受け付け、デフォルトは`"g"`です。
* `opacity`マップは`"r"` \| `"g"` \| `"b"` \| `"a"`を受け付け、デフォルトは`"a"`です。
* `normal`マップにはチャンネル修飾子がありません — 常に3つのチャンネルすべてを読み取ります。

## 例 {#example}

4つのマテリアル: 単色、金属、透明な「ガラス」、タイリングされたテクスチャマップです。スカイの `lighting` が金属に映り込みを与えます。`diffuse` の色、`metalness`、`roughness`、`opacity`、`diffuse-map-tiling` を編集してみましょう:

```html live-example
<pc-app>
    <pc-asset src="https://developer.playcanvas.com/assets/dark-tiles.png" id="dark-tiles"></pc-asset>
    <pc-asset src="https://developer.playcanvas.com/assets/sepulchral-chapel-rotunda-4k.webp" id="skybox"></pc-asset>
    <pc-material id="crimson" diffuse="crimson"></pc-material>
    <pc-material id="gold" diffuse="#ffd700" metalness="1" roughness="0.3"></pc-material>
    <pc-material id="glass" blend-type="normal" opacity="0.4"></pc-material>
    <pc-material id="ground" diffuse-map="dark-tiles" diffuse-map-tiling="4 4"></pc-material>
    <pc-scene>
        <pc-sky asset="skybox" lighting></pc-sky>
        <pc-entity name="camera" position="0 1.5 5" rotation="-12 0 0">
            <pc-camera clear-color="#1d1f2b" tonemap="aces"></pc-camera>
        </pc-entity>
        <pc-entity name="light" rotation="45 30 0">
            <pc-light cast-shadows intensity="1.5"></pc-light>
        </pc-entity>
        <pc-entity name="box" position="-2 0.5 0">
            <pc-render type="box" material="crimson"></pc-render>
        </pc-entity>
        <pc-entity name="sphere" position="0 0.5 0">
            <pc-render type="sphere" material="gold"></pc-render>
        </pc-entity>
        <pc-entity name="capsule" position="2 1 0">
            <pc-render type="capsule" material="glass"></pc-render>
        </pc-entity>
        <pc-entity name="ground" scale="10 1 10">
            <pc-render type="plane" material="ground"></pc-render>
        </pc-entity>
    </pc-scene>
</pc-app>
```

実行時（アプリケーションの起動後）に挿入された`<pc-material>`は、挿入時にマテリアルを作成するため、JavaScriptから動的にマテリアルを追加できます。実行時の属性変更も即座に反映され（連続した変更は1回のマテリアル更新にまとめられます）、`*-map`属性を削除するとそのテクスチャスロットはクリアされます。

`name`属性は、後から識別したいマテリアルには設定しておく価値があります。この値はエンジンのマテリアルに渡されるため、マテリアルが名前で現れるあらゆる場所 — プロファイラー、GPUキャプチャ、そして[`<pc-model>`の`hierarchy()`](../pc-model#inspecting-the-hierarchy)が報告する割り当て — で表示されるラベルになります。[`<pc-node>`の`material-overrides`](../pc-node#overriding-materials)が差し込んだマテリアルも含まれ、設定しない場合はそこで`Untitled`と表示されます。マテリアルの参照方法には影響しません。参照は常に`id`によって行われます。

## JavaScriptインターフェース {#javascript-interface}

[MaterialElement API](https://api.playcanvas.com/web-components/classes/MaterialElement.html)を使用して、`<pc-material>`要素をプログラムで作成および操作できます。
