---
title: プローブボリューム
description: 間接光をランタイムでプローブのグリッドにベイクし、静的なオブジェクトと動くオブジェクトを照らし、複数のベイク済みライティングを切り替えます。
---

![夜のプローブボリューム](/img/user-manual/graphics/lighting/probe-volumes/night.webp)
*夜のこのシーンの光源はエミッシブメッシュだけです。その光はプローブを通して周囲の表面に届きます*

プローブボリュームは、シーン内のボックスを満たすライトプローブのグリッドです。各プローブは、その位置にあらゆる方向から届く間接光を球面調和関数 (spherical harmonics) として保存します。ボックス内の表面は、環境の代わりに周囲のプローブからアンビエントライティングを受け取ります。これにより、光が壁や床で反射し、部屋は開けた空より暗くなり、光るエミッシブ表面が周囲を照らします。

プローブはエンジンによってランタイムに GPU でベイクされ、ファイルに保存して後で読み込むことができます。

## プローブボリュームを使うタイミング {#when-to-use-probe-volumes}

プローブボリュームと[ライトマップ](/user-manual/graphics/lighting/lightmapping)はどちらもベイク済みのライティングを提供しますが、トレードオフが異なります。

プローブボリュームは:

- **静的なオブジェクトと動くオブジェクト**の両方を照らすため、キャラクターなどの動的なオブジェクトも周囲のベイク済みライティングを受け取ります
- **ライトマップ用の UV** もオブジェクトごとのテクスチャも不要で、[バッチング](/user-manual/graphics/advanced-rendering/batching)と併用できます
- 時間帯の変化など、ライティングが変わったときに**素早く再ベイク**できます
- **複数のベイク済みライティング**を保持し、切り替えることができます

ただし、プローブは通常 1 メートル以上の間隔で配置されるため、保存されるのは柔らかく低周波なライティングです。くっきりとしたベイク済みの影は得られず、薄い壁の近くのプローブは壁を通して光を漏らすことがあります ([光漏れの軽減](#reducing-light-leaks)を参照)。動的ライトによる直接光と影は、これまでどおりプローブのライティングの上にレンダリングされます。

![夕暮れのプローブボリューム](/img/user-manual/graphics/lighting/probe-volumes/sunset.webp)
*夕暮れの同じシーン: 低い太陽は動的ライトで、太陽が当たった表面から跳ね返る光はプローブから来ています*

## プローブのベイクと保存 {#baking-and-saving-the-probes}

照らしたいボックスを覆う [`ProbeVolume`][ProbeVolume] と、そのための [`ProbeVolumeBaker`][ProbeVolumeBaker] を作成します。解像度はボックスの各軸に沿ったプローブの数で、プローブの間隔はボックスのサイズを解像度で割った値になります。

```javascript
import { BoundingBox, ProbeVolume, ProbeVolumeBaker, Vec3 } from 'playcanvas';

// a 32 x 12 x 32 meter box, with probes spaced 2 meters apart
const aabb = new BoundingBox(new Vec3(0, 6, 0), new Vec3(16, 6, 16));
const volume = new ProbeVolume(app.graphicsDevice, { aabb, resolution: [16, 6, 16] });

// capture the emission of the surfaces, so emissive meshes light the scene
const baker = new ProbeVolumeBaker(app, volume, { emissive: true });

// capture what the probes see, then bake their lighting from it
await baker.captureGeometry();
await baker.bakeLighting({ bounces: 2 });

// save the probes, to load them later
const buffer = volume.serialize();
```

プローブは、ベイカーの `layers` オプションで渡された[レイヤー](/user-manual/graphics/layers)をキャプチャします。デフォルトは World レイヤーと Skybox レイヤーです。プローブに照らしてほしいがキャプチャはしてほしくない動的なオブジェクトは、別のレイヤーに配置してください。

ベイクにはプローブの数に応じて 1 秒未満から数秒かかり、複数フレームにわたって実行されるため、ベイク中もアプリケーションはレンダリングを続けます。`captureGeometry` と `bakeLighting` はどちらも、進捗を表示するための `onProgress` コールバックを受け取ります。

## プローブの使用 {#using-the-probes}

保存したプローブをバイナリアセットとして読み込み、そこからボリュームを作成して、照らすマテリアルに適用します:

```javascript
import { Asset, ProbeVolume } from 'playcanvas';

const asset = new Asset('probes', 'binary', { url: 'probes.bin' });
asset.ready(() => {
    const volume = ProbeVolume.deserialize(app.graphicsDevice, asset.resource);

    // light the materials of the scene with the probes
    materials.forEach((material) => {
        volume.applyToMaterial(material);
        material.update();
    });
});
app.assets.add(asset);
app.assets.load(asset);
```

マテリアルはボックス内ではプローブからアンビエントライティングを受け取り、ボックスの外側では `blendDistance` の範囲で環境のアンビエントライティングへとブレンドされます。マテリアルがプローブを使わないようにするには、`volume.applyToMaterial(material, false)` を呼び出します。

コンピューターでベイクしたプローブは、ベイクできないデバイスを含むあらゆるデバイスで読み込むことができます。

## ジオメトリのキャプチャとライティングのベイク {#capturing-the-geometry-and-baking-the-lighting}

ベイクは 2 つのステップで行われます:

1. `captureGeometry` は、各プローブから見えるもの (周囲の表面の色、向き、距離、そしてエミッション) をレンダリングします。これは時間のかかるステップで、ジオメトリまたはプローブボリュームが変わったときにだけ再実行する必要があります。
2. `bakeLighting` は、キャプチャした表面をシーンのライトと空で照らし、その結果をプローブに保存します。このステップは高速なため、太陽が動くときなど、ライティングの変化に合わせて再ベイクできます。

`bakeLighting` は次のオプションを受け取ります:

| オプション | 説明 |
| --- | --- |
| `source` | デフォルトの `PROBESOURCE_GBUFFER` は、キャプチャした表面を GPU で照らし、最も高速です。`PROBESOURCE_SCENE` は代わりに各プローブからライティングされたシーンをレンダリングします。こちらは低速ですが、ライティングシェーダーがレンダリングするすべてを含みます。 |
| `bounces` | 直接光の後に光が表面間で跳ね返る回数です。バウンスを増やすと、閉じた空間が明るくなります。 |
| `dilation` | ジオメトリ内にあるプローブを、周囲のプローブから埋めます。 |
| `shadowBounds` | ベイク中にディレクショナルライトの影がカバーする範囲です。デフォルトはボリュームのボックスです。 |
| `index` | ベイク先となるボリュームのライティングです。[複数のライティング](#several-lighting-setups)を参照してください。 |

## 複数のライティング {#several-lighting-setups}

ボリュームは、昼、夕暮れ、夜のライティングなど、同じプローブの複数のライティングを保持できます。それぞれを個別の `index` でベイクし、表示するものを `activeLighting` で選択します:

```javascript
// bake the lighting of the day into lighting 0, and of the night into lighting 1
setDayLighting();
await baker.bakeLighting({ index: 0 });
setNightLighting();
await baker.bakeLighting({ index: 1 });

// show the night
volume.activeLighting = 1;
```

ライティングはキャプチャしたジオメトリを共有するため、ジオメトリのキャプチャは 1 回だけで済みます。`serialize` はすべてのライティングを 1 つのファイルに保存し、`lightingCount` はボリュームが保持するライティングの数を返します。

## 光漏れの軽減 {#reducing-light-leaks}

表面はその周囲の 8 つのプローブによって照らされますが、それらは壁の反対側にあることがあります。壁を通した光漏れを軽減するための機能がいくつかあります:

- **Validity**: ジオメトリの内部にあり、周囲の表面の裏面が見えるプローブは、ライティングから除外されます。`captureGeometry` の `validity` オプションで有効にします。
- **Virtual offset**: ジオメトリの内部にあるプローブは、そこから外へ移動した位置でキャプチャされます。`captureGeometry` の `virtualOffset` オプションで有効にします。
- **Visibility**: 各プローブは各方向にどこまで見えるかを保存し、表面が見えないプローブはその表面を照らしません。`captureGeometry` の `visibility` オプションと、ボリュームの `visibility` プロパティで有効にします。
- **Leak reduction**: 表面の法線に対して表面の背後にあるプローブは、その表面への寄与が小さくなります。`leakReduction` プロパティで設定します。
- **Normal bias**: 表面がプローブをサンプリングする位置を、法線に沿って背後のプローブから遠ざけます。`normalBias` プロパティで、ワールド単位で設定します。

それでも光が漏れる場合は、プローブの間隔を狭めるか、プローブが薄い壁の内部に入らないようにボックスを移動またはリサイズしてください。プローブの間隔より薄い壁が最も光漏れしやすくなります。

## ランタイム設定 {#runtime-settings}

ボリュームの次のプロパティは、再ベイクせずにプローブの表示方法を変更します:

| プロパティ | 説明 |
| --- | --- |
| `enabled` | マテリアルがプローブを使うかどうかです。無効の場合は、環境のアンビエントライティングを使います。 |
| `intensity` | プローブのライティングの乗数です。 |
| `shSharpening` | プローブの方向性のディテールをシャープにし、ライティングの平坦さを抑えます。 |
| `reflectionOcclusion` | 閉じた部屋の中など、プローブが環境より暗い場所で環境の反射を暗くします。これがないと、明るい空が反射してしまいます。 |
| `blendDistance` | ボックスの外側で、ライティングが環境のアンビエントライティングへとブレンドされる距離です。 |
| `format` | プローブの保存形式です。デフォルトの `PIXELFORMAT_RGBA16F`、または精度は下がりますがメモリが半分で済む `PIXELFORMAT_RGBA8` です。 |

## デバイスのサポート {#device-support}

ベイクはハーフフロートまたはフロートのテクスチャにレンダリングします。WebGPU は常にこれらをサポートし、WebGL2 デバイスではフロートカラーバッファの拡張機能が必要ですが、古いデバイスやローエンドのモバイルデバイスの中にはこれを持たないものがあります。ベイクする前に [`ProbeVolumeBaker.isSupported`][isSupported] を確認してください。ベイクできないデバイスでは、事前にプローブをベイクし、`ProbeVolume.deserialize` で読み込んでください。

## サンプル {#example}

[Probe Volume サンプル](https://playcanvas.github.io/#/graphics/probe-volume)では、プローブボリュームで照らされたパビリオンを、ファイルから読み込んだ 3 つのライティングとともに表示します。Baking パネルでは、プローブボリュームの編集、変更に合わせたライティングの再ベイク、プローブのダウンロードができます。

[ProbeVolume]: https://api.playcanvas.com/engine/classes/ProbeVolume.html
[ProbeVolumeBaker]: https://api.playcanvas.com/engine/classes/ProbeVolumeBaker.html
[isSupported]: https://api.playcanvas.com/engine/classes/ProbeVolumeBaker.html#issupported
