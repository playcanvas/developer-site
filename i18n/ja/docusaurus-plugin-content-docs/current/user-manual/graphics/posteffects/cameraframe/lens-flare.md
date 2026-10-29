---
title: レンズフレア
description: "CameraFrame のレンズフレアエフェクト：形状ライブラリ、フレアのルックとそのエレメント、ライトへの追従、オクルージョンとフェード、エディター用のレンズフレアスクリプト。"
---

[`LensFlareEffect`](https://api.playcanvas.com/engine/classes/LensFlareEffect.html) は、シーン内のライト、または任意の位置のフレアを描画します。各フレアはライトに追従する [`LensFlare`](https://api.playcanvas.com/engine/classes/LensFlare.html) で、その**ルック**が、ライトから画面の中心を通る軸に沿って形状を配置します。フレアは、ライトがシーンに覆われたとき、ライトが画面から外れたとき、そしてスポットライトの場合はカメラがその円錐の外に出たときにフェードします。

レンズフレアはカメラフレームの組み込みエフェクトではありません。作成して、[`addEffect`](https://api.playcanvas.com/engine/classes/CameraFrame.html#addeffect) でカメラフレームに追加してください。このエフェクトはフレアをシーンより低い解像度で描画し、トーンマッピングの前にリニア HDR 空間でシーンに加算します。

## フレアのセットアップ {#setting-up-the-flares}

エフェクトは、すべてのフレアの形状を 1 つの**形状ライブラリ**から描画します。形状ライブラリはテクスチャの集まりで、エフェクトはそれらをテクスチャ配列にコピーし、フレアのエレメントは名前でそれらを参照します。形状は、カラーチャンネルに形状を、アルファに被覆率を持つテクスチャで、たとえば透明な背景上の白い形状です。

```javascript
const lensFlare = new LensFlareEffect(app.graphicsDevice);
lensFlare.shapes = {
    shapes: {
        glow: glowAsset.resource,
        star: starAsset.resource,
        disc: discAsset.resource
    }
};
cameraFrame.addEffect(lensFlare);

// 太陽に追従するフレア：グロー、スター、4 つのゴーストの列
const sun = new LensFlare({
    elements: [
        { shape: 'glow', size: 0.5, color: [1, 0.9, 0.7], intensity: 0.5 },
        { shape: 'star', size: 1.2, intensity: 0.4 },
        { shape: 'disc', offset: 0.5, size: 0.08, color: [0.4, 0.8, 1], count: 4, spread: 0.4 }
    ]
}, { light: sunEntity.light });
lensFlare.add(sun);

cameraFrame.update();
```

形状はすべて同じ解像度（デフォルトで 512 ピクセル）で格納され、この解像度は形状ライブラリの `resolution` で設定します。フレアを出す各ライトに `LensFlare` を作成し、[`add`](https://api.playcanvas.com/engine/classes/LensFlareEffect.html#add) でエフェクトに登録します。[`remove`](https://api.playcanvas.com/engine/classes/LensFlareEffect.html#remove) で登録を解除します。

## ルック {#looks}

フレアのルックは、順に描画されるエレメントのリストです。ルックは単純なデータで、任意の数のフレアで共有でき、JSON アセットから読み込むこともできます。各エレメントは、フレアの軸上に形状を配置します。

| プロパティ | 説明 |
| -------- | ----------- |
| `shape` | エフェクトの形状ライブラリ内の形状の名前。 |
| `offset` | 軸に沿った位置。0 が光源、1 が画面の中心、2 が中心を挟んで反対側の鏡像の位置で、負の値は光源の先になります。デフォルトは 0 です。 |
| `size` | エレメントの高さ（画面の高さに対する割合）。デフォルトは 0.1 です。 |
| `aspect` | 高さに対するエレメントの幅。デフォルトは 1 です。 |
| `rotation` | エレメントの回転（度）。デフォルトは 0 です。 |
| `autoRotate` | エレメントが軸に合わせて回転するかどうか。ストリーク向けです。デフォルトは false です。 |
| `color` | エレメントの色。`Color` または 3 つの数値の配列で指定します。デフォルトは白です。 |
| `intensity` | エレメントの明るさ。デフォルトは 1 です。 |
| `count` | エレメントのコピーの数。コピーはオフセットを中心に軸に沿って配置され、ゴーストの列になります。デフォルトは 1 です。 |
| `spread` | コピーが広がる軸に沿った距離（オフセットの単位）。デフォルトは 0 です。 |

ルックのエレメントは、`CameraFrame#update` が呼び出されたときにエフェクトに組み込まれます。ルックを変更するには、同じオブジェクトであってもフレアの [`look`](https://api.playcanvas.com/engine/classes/LensFlare.html#look) に再度代入し、カメラフレームを更新してください。

## フレアの光源 {#the-source-of-a-flare}

`LensFlare` コンストラクターの第 2 引数で、フレアが追従する対象を選択します。

- `light`：ライトコンポーネント。ディレクショナルライトは光源の方向を、オムニまたはスポットライトは光源の位置を与えます。スポットライトの場合は、フレアがその円錐内に限定されます。
- `node`：位置が光源となるノード。ライトのないフレアに使用します。
- `position`：ワールド位置。ライトもノードもない光源に使用します。
- `direction`：無限遠にある光源へ向かうワールド方向。ライトのないフレアに使用します。

[`useLightColor`](https://api.playcanvas.com/engine/classes/LensFlare.html#uselightcolor) または [`useLightIntensity`](https://api.playcanvas.com/engine/classes/LensFlare.html#uselightintensity) をオフにしない限り、ライトの色でフレアが色付けされ、ライトの強度でフレアがスケーリングされます。フレアの [`color`](https://api.playcanvas.com/engine/classes/LensFlare.html#color)、[`intensity`](https://api.playcanvas.com/engine/classes/LensFlare.html#intensity)、[`scale`](https://api.playcanvas.com/engine/classes/LensFlare.html#scale) は、そのすべてのエレメントをそれぞれ色付けし、明るくし、拡大縮小します。

## オクルージョンとフェード {#occlusion-and-fading}

エフェクトは、各フレアの光源の周囲でシーン深度をテストすることで、光源がシーンにどれだけ覆われているかを測定し、それに応じてフレアをフェードさせます。この動作は、フレアの次のプロパティで調整します。

- [`occlusionRadius`](https://api.playcanvas.com/engine/classes/LensFlare.html#occlusionradius) は、深度をテストする光源周囲の半径です。部分的に覆われた光源は、部分的にフェードします。
- [`occlusionFade`](https://api.playcanvas.com/engine/classes/LensFlare.html#occlusionfade) は、測定された可視性が変化に追従するまでの時間で、フェードを滑らかにします。
- [`occlusionOffset`](https://api.playcanvas.com/engine/classes/LensFlare.html#occlusionoffset) は、深度テストを光源からカメラの方向へ移動し、ランプのジオメトリが自身の光を覆わないようにします。
- [`edgeFade`](https://api.playcanvas.com/engine/classes/LensFlare.html#edgefade) は、光源が画面から外れるときにフレアがフェードアウトする、画面端の帯の幅です。[`allowOffScreen`](https://api.playcanvas.com/engine/classes/LensFlare.html#allowoffscreen) は、光源が画面のすぐ外にある間もフレアの描画を続けます。
- [`fadeStart`](https://api.playcanvas.com/engine/classes/LensFlare.html#fadestart) と [`fadeEnd`](https://api.playcanvas.com/engine/classes/LensFlare.html#fadeend) は、位置を持つ光源のフレアを、カメラからの距離に応じてフェードアウトさせます。

フレアのプロパティは即座に反映されます。変更は、カメラフレームを更新しなくても、次にレンダリングされるフレームに適用されます。

## エフェクト {#the-effect}

エフェクトの [`intensity`](https://api.playcanvas.com/engine/classes/LensFlareEffect.html#intensity) は、すべてのフレアの明るさを設定し、0 でエフェクトを無効にします。フレアはシーンに対する相対解像度で描画され、この解像度は [`scale`](https://api.playcanvas.com/engine/classes/LensFlareEffect.html#scale) で 0.25 から 1 の範囲で指定します。デフォルトはシーンの半分です。スケールを下げるとコストが下がり、フレアが柔らかくなります。

## エディターでのレンズフレア {#lens-flares-in-the-editor}

[`lens-flare.mjs`](https://github.com/playcanvas/engine/blob/main/scripts/esm/lens-flare.mjs) スクリプトファイルは、2 つのスクリプトを提供します。

- `lensFlareEffect` は、[`cameraFrame` スクリプト](/user-manual/graphics/linear-workflow/hdr-rendering/#cameraframe-in-the-editor)と並べてカメラエンティティに追加し、そのカメラフレームにエフェクトを追加します。また、形状ライブラリ（形状のテクスチャアセット、その名前と解像度）を保持します。
- `lensFlare` は、エンティティに追加してフレアを与えます。ルックのエレメントとフレアのその他のプロパティを属性として持ちます。エンティティにライトコンポーネントがある場合、フレアはそのライトに追従し、ない場合はエンティティの位置に追従します。

## 例 {#example}

プロシージャルな空の太陽には回折による光芒とゴーストの列を持つ大きなフレアが、ランプには小さなグローがあり、スポットライトはカメラがその円錐内にある間だけフレアを出します。

<EngineExample id="camera-frame/lens-flare" title="Lens Flare" />
