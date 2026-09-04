---
title: <pc-asset>
description: "pc-asset要素のリファレンス: URLで読み込むアセットの宣言、拡張子からのタイプ推論、遅延ロード、他のタグからidで参照する方法です。"
---

`<pc-asset>`タグは、アセットを定義するために使用されます。

:::note[使用法]

* [`<pc-app>`](../pc-app)の直接の子である必要があります。

:::

## 属性 {#attributes}

<div className="attribute-table">

| 属性 | タイプ | デフォルト | 説明 |
| --- | --- | --- | --- |
| `address-u` | Enum | `"repeat"` | `texture` および `textureatlas` アセットの場合: 0から1の範囲外の座標を水平方向にどうサンプリングするか — `"repeat"` \| `"clamp"` \| `"mirror"` |
| `address-v` | Enum | `"repeat"` | `texture` および `textureatlas` アセットの場合: 0から1の範囲外の座標を垂直方向にどうサンプリングするか — `"repeat"` \| `"clamp"` \| `"mirror"` |
| `anisotropy` | Number | `"1"` | `texture` および `textureatlas` アセットの場合: 異方性フィルタリングの最大レベル。浅い視野角での品質が向上します |
| `atlas` | [Asset ID](../attributes.md#asset-and-material-ids) | - | `sprite` アセットの場合: このスプライトが読み込む `textureatlas` `<pc-asset>` の `id`。アトラスはスプライトより前に宣言する必要があります |
| `data` | String | - | インラインのJSONアセットデータ。テクスチャアトラス（フレーム定義）やスプライトで使用されます |
| `flip-y` | Boolean | `"false"` | `texture` および `textureatlas` アセットの場合: アップロード時に画像データを垂直方向に反転するかどうか |
| `frame-keys` | String | - | `sprite` アセットの場合: スプライトを構成するアトラスのフレームキーを、スペースまたはカンマ区切りで指定したリスト |
| `id` | String | - | 他のタグがこのアセットを参照するために使用する一意の識別子 |
| `lazy` | Boolean | `"false"` | プリロードをスキップするかどうか。lazyなアセットは[`<pc-model>`](../pc-model)、[`<pc-particle-system>`](../pc-particle-system)、[`<pc-sky>`](../pc-sky)、[`<pc-material>`](../pc-material)のテクスチャマップによってオンデマンドでロードされます — その他の要素はロードをトリガーしません |
| `mag-filter` | Enum | `"linear"` | `texture` および `textureatlas` アセットの場合: テクスチャが元のサイズより大きく表示されるときに使用されるフィルター — `"nearest"` \| `"linear"` |
| `min-filter` | Enum | `"linear-mip-linear"` | `texture` および `textureatlas` アセットの場合: テクスチャが元のサイズより小さく表示されるときに使用されるフィルター — `"nearest"` \| `"linear"` \| `"nearest-mip-nearest"` \| `"linear-mip-nearest"` \| `"nearest-mip-linear"` \| `"linear-mip-linear"` |
| `mipmaps` | Boolean | `"true"` | `texture` および `textureatlas` アセットの場合: テクスチャがミップマップを生成して使用するかどうか |
| `pixels-per-unit` | Number | `"1"` | `sprite` アセットの場合: ワールドユニットあたりのピクセル数 |
| `render-mode` | Enum | `"simple"` | `sprite` アセットの場合: `"simple"` \| `"sliced"` \| `"tiled"`。9スライスパネルには `"sliced"` を使用します |
| `src` | String | - | アセットファイルへのパス |
| `srgb` | Boolean | `"false"` | `texture` および `textureatlas` アセットの場合: テクスチャがsRGB（ガンマエンコードされた）カラーデータを保持するかどうか。ハードウェアによるガンマデコードが有効になります |
| `type` | Enum | *inferred* | アセットタイプ：`"audio"` \| `"binary"` \| `"css"` \| `"container"` \| `"font"` \| `"gsplat"` \| `"html"` \| `"json"` \| `"script"` \| `"shader"` \| `"sprite"` \| `"text"` \| `"texture"` \| `"textureatlas"` |

</div>

:::note[これらが読み取られるタイミング]

`lazy`とテクスチャオプションはライブです。変更するとアセットが更新され、削除すると上の表に示したエンジンのデフォルト値が復元されます。その他のすべての属性はアセットが作成されるときに一度だけ読み取られるため、後から変更しても効果はありません。

アセットのタイプに適用されない属性を設定した場合 — 例えばオーディオアセットにテクスチャオプションを設定した場合や、スプライト以外に`frame-keys`を設定した場合 — 無視した属性を列挙するコンソール警告が出力されます。

:::

### テクスチャオプション {#texture-options}

テクスチャオプションはテクスチャが作成されるときに適用され、それぞれが`data` JSONの対応するキーをオーバーライドします。設定しなかったオプションは何も書き込まないため、エンジンのフォーマットごとのデフォルト値 — HDRファイルの`rgbe`エンコードや、KTX2ファイルが選択したトランスコード先フォーマットなど — がそのまま有効になります。したがって、実際に必要なオプションだけを設定する価値があります。

これらのオプションはすでに読み込まれたテクスチャにも適用されるため、開発者ツールから試すのに便利です。ただし2つは他より高コストです。読み込み済みのテクスチャで`srgb`または`mipmaps`を変更すると、背後にあるGPUリソースが再作成されるため、これらはマークアップ側で最初から宣言することをおすすめします。

```html
<!-- くっきりしたピクセルアートのテクスチャ: フィルタリングとミップマップなし、端をクランプ -->
<pc-asset id="sprite-sheet" src="assets/textures/tiles.png"
          min-filter="nearest" mag-filter="nearest" mipmaps="false"
          address-u="clamp" address-v="clamp"></pc-asset>

<!-- タイリングする地面のテクスチャ。浅い角度でもシャープに -->
<pc-asset id="ground" src="assets/textures/gravel.jpg" anisotropy="16"></pc-asset>
```

### タイプの推論 {#type-inference}

`type`を省略した場合、`src`のファイル拡張子から推論されます:

| タイプ | 拡張子 |
| --- | --- |
| `audio` | `.mp3` |
| `binary` | `.bin` |
| `container` | `.glb`, `.gltf` |
| `css` | `.css` |
| `gsplat` | `.ply`, `.sog` |
| `html` | `.html` |
| `json` | `.json` |
| `script` | `.js`, `.mjs` |
| `shader` | `.frag`, `.glsl`, `.vert` |
| `text` | `.txt` |
| `texture` | `.hdr`, `.jpg`, `.ktx2`, `.png`, `.webp` |

それ以外の拡張子、または`font`、`sprite`、`textureatlas`など推論の対象外のタイプでは、明示的な`type`属性が必要です。

## イベント {#events}

これらのイベントは、[`addEventListener()`](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener)を使用するか、このインターフェースの`oneventname`プロパティにイベントリスナーを割り当てることでリッスンできます。

| イベント | 説明 |
| --- | --- |
| `load` | アセットの読み込みが完了するたびに発生します。後から読み込まれる`lazy`アセットや、その後の再読み込みも含みます。 |
| `error` | アセットの読み込みが失敗したときに発生する[`ErrorEvent`](https://developer.mozilla.org/en-US/docs/Web/API/ErrorEvent)で、エンジンのエラーが`message`に入ります。 |

どちらのイベントもバブリングしないため、要素自身でリッスンしてください。あるいは、`<pc-app>`が保持するすべてのアセットを監視するには、`<pc-app>`でキャプチャフェーズのリスナーを使用します。

```javascript
document.querySelector('pc-app').addEventListener('error', (event) => {
    console.warn(`${event.target.id} failed to load: ${event.message}`);
}, true);
```

要素のready状態はこれとは別のシグナルです。要素は、アセットがマークアップの宣言する状態に達した時点でreadyになります。プリロードされるアセットの場合、それは読み込みの決着です — 読み込みが失敗しても要素はreadyになるため、readyは決して成功を意味しません。`lazy`アセットの場合は登録であり、読み込みが行われる前です。また、実行中に挿入された要素は、読み込みがまだ進行中でも、アセットが作成された時点でreadyになります。`<pc-app>`の直接の子でない要素や、アセットタイプがサポートされていない要素は、警告を出力し、決してreadyになりません。

## 例 {#example}

2つのアセット: スクリプト (CDNから直接読み込むエンジンのヘルパー) とGLBモデルです。スクリプトは名前で自身を登録し、モデルは `id` で参照されます。ドラッグで軌道回転できます:

```html live-example
<pc-app>
    <!-- スクリプトアセット: タイプは.mjs拡張子から推論されます -->
    <pc-asset src="https://cdn.jsdelivr.net/npm/playcanvas@2.21.4/scripts/esm/camera-controls.mjs"></pc-asset>
    <!-- コンテナアセット: タイプは.glb拡張子から推論されます -->
    <pc-asset src="https://developer.playcanvas.com/assets/playcanvas-cube.glb" id="cube"></pc-asset>
    <pc-scene>
        <pc-entity name="camera" position="0 0 3">
            <pc-camera clear-color="#1d1f2b"></pc-camera>
            <pc-script>
                <pc-script-instance name="cameraControls" enable-pan="false" zoom-range="1.5 6"></pc-script-instance>
            </pc-script>
        </pc-entity>
        <pc-entity name="light" rotation="45 30 0">
            <pc-light intensity="2"></pc-light>
        </pc-entity>
        <pc-model asset="cube"></pc-model>
    </pc-scene>
</pc-app>
```

スプライトは、テクスチャアトラス（フレーム定義を保持）と、それを参照する1つ以上の `sprite` アセットによって定義されます。アトラスは、それを使用するスプライトより前に宣言する必要があります。

```html
<pc-app>
    <!-- テクスチャアトラス（インラインのフレーム定義付き） -->
    <pc-asset id="ui-sheet" type="textureatlas" src="assets/textures/ui.png"
              data='{"frames":{"3":{"name":"panel","border":[10,10,10,10],"rect":[41,1,100,100],"pivot":[0.5,0.5]}}}'></pc-asset>
    <!-- アトラスからフレーム "3" を読み込む9スライススプライト -->
    <pc-asset id="panel" type="sprite" atlas="ui-sheet" frame-keys="3" render-mode="sliced"></pc-asset>
</pc-app>
```

## JavaScriptインターフェース {#javascript-interface}

[AssetElement API](https://api.playcanvas.com/web-components/classes/AssetElement.html)を使用して、`<pc-asset>`要素をプログラムで作成および操作できます。

`asset`プロパティは、この要素が登録したエンジンの[Asset](https://api.playcanvas.com/engine/classes/Asset.html)です。要素の準備が完了するまでは`null`です。`AssetElement.get(id)`を使えば、要素を保持せずに`id`でアセットを取得できます。

## 関連項目 {#see-also}

* [`<pc-model>`](../pc-model) — コンテナアセットをインスタンス化します
* [`<pc-material>`](../pc-material) — テクスチャアセットをマップとして受け取ります
* [`<pc-sound-slot>`](../pc-sound-slot) — オーディオアセットを再生します
* [`<pc-script-instance>`](../pc-script-instance) — アセットとして読み込んだスクリプトを実行します

サンプル: [GLB Loader](https://playcanvas.github.io/web-components/examples/glb-loader.html)、[Video Texture](https://playcanvas.github.io/web-components/examples/video-texture.html)、[Basic Sound](https://playcanvas.github.io/web-components/examples/basic-sound.html)
