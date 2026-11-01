---
title: ダイナミックスカイ
description: "CameraFrame のダイナミックスカイエフェクト：解析的な昼の空、夜空、フラットな雲とボリューメトリックな雲、同期される太陽のライト、空から生成されるシーンのライティング、空の色のヘイズ。"
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

[`DynamicSkyEffect`](https://api.playcanvas.com/engine/classes/DynamicSkyEffect.html) は、シーンの空の代わりにカメラの空をレンダリングします。太陽に照らされる解析的な大気による昼の空、星と月の夜空、そしてオプションで風に流れる雲です。太陽の位置で時刻が決まり、エフェクトはディレクショナルライトを太陽に同期させることができます。また、空からシーンのライティングを生成し、空の色でシーンにヘイズをかけることもできます。

ダイナミックスカイはカメラフレームの組み込みエフェクトではありません。作成して、[`addEffect`](https://api.playcanvas.com/engine/classes/CameraFrame.html#addeffect) でカメラフレームに追加してください。

```javascript
const sky = new DynamicSkyEffect(app.graphicsDevice);
sky.light = sunEntity.light;
sky.cloudType = CLOUDTYPE_VOLUMETRIC;
cameraFrame.addEffect(sky);
cameraFrame.update();
```

エディターでは、専用のスクリプトでエフェクトを追加します。[エディターでのダイナミックスカイ](#the-dynamic-sky-in-the-editor)を参照してください。

すべてのエフェクトと同様に、設定は次の [`CameraFrame#update`](https://api.playcanvas.com/engine/classes/CameraFrame.html#update) で適用されます。太陽を動かす昼夜サイクルでは、これを毎フレーム呼び出します。

```javascript
let time = 0;
app.on('update', (dt) => {
    time += dt;
    sky.elevation = Math.sin(time * 0.1) * 60;
    cameraFrame.update();
});
```

## 太陽と時刻 {#the-sun-and-the-time-of-day}

太陽の方位角 [`azimuth`](https://api.playcanvas.com/engine/classes/DynamicSkyEffect.html#azimuth) と仰角 [`elevation`](https://api.playcanvas.com/engine/classes/DynamicSkyEffect.html#elevation)（いずれも度単位）で時刻を設定します。仰角が 0 未満の場合、太陽は地平線の下に置かれ、夜空になります。[`rotation`](https://api.playcanvas.com/engine/classes/DynamicSkyEffect.html#rotation) は空全体を鉛直軸の周りに回転させるため、空、太陽、月が一緒に回転します。

エフェクトは、[`light`](https://api.playcanvas.com/engine/classes/DynamicSkyEffect.html#light) に割り当てられたディレクショナルライトを空と同期させます。同期されるのはライトの方向、色、強度で、したがってライトが落とす影も空に合わせて変化します。昼間、ライトは [`sunIntensity`](https://api.playcanvas.com/engine/classes/DynamicSkyEffect.html#sunintensity) の強度で太陽から照らし、雲によって減光されます。夜間は月光へとフェードし、強度は [`moonIntensity`](https://api.playcanvas.com/engine/classes/DynamicSkyEffect.html#moonintensity)、色は [`moonColor`](https://api.playcanvas.com/engine/classes/DynamicSkyEffect.html#mooncolor) になります。空も `sunIntensity` に応じてスケーリングされるため、`sunIntensity` で一日全体の明るさを設定し、カメラの露出に合わせます。

## 昼の空 {#the-day-sky}

| プロパティ | 説明 |
| -------- | ----------- |
| `turbidity` | 大気のかすみ具合で、1 から 20 の範囲です。値が大きいほど空が白く霞み、太陽の周りの光彩が大きくなります。 |
| `rayleigh` | レイリー散乱の量で、0 から 4 の範囲です。空の青さを設定します。 |
| `mieCoefficient` | ミー散乱の量で、0 から 0.1 の範囲です。太陽の周りの光彩の明るさを設定します。 |
| `mieDirectionalG` | 光彩が太陽の周りにどれだけ集中するかで、0 から 1 の範囲です。 |
| `luminance` | 太陽光に対する空の明るさ。1 では、空は晴天の空と同じようにシーンを照らすため、1 つの露出で空と日の当たる地面の両方に対応できます。 |
| `twilightGlow` | 太陽が地平線のすぐ下にある間の、地平線の暖かな光彩の強さ。 |

## 夜空 {#the-night-sky}

| プロパティ | 説明 |
| -------- | ----------- |
| `nightColor`、`nightBrightness` | 夜空の色と明るさ。 |
| `starBrightness` | 星の明るさ。0 で星を無効にします。 |
| `starDensity` | 星を含む空のセルの割合で、0 から 1 の範囲です。 |
| `starSize` | 星のサイズのスケール。 |
| `moonDirection` | 月への方向。空の回転に応じて回転します。 |
| `moonSize` | 月の円盤の角半径（度）。 |
| `moonGlow` | 月の円盤の明るさ。 |

## 雲 {#clouds}

デフォルトでは空に雲はありません。雲を追加するには [`cloudType`](https://api.playcanvas.com/engine/classes/DynamicSkyEffect.html#cloudtype) を設定します。

- `CLOUDTYPE_FLAT`：シンプルなシェーディングを施した、ノイズによる単一のフラットな層で、低コストです。空の他の部分と同様に、空のシェーダーがピクセルごとに雲を評価するため、[XR](#xr) でも動作します。
- `CLOUDTYPE_VOLUMETRIC`：3D ノイズの層をレイマーチするボリューメトリックな雲です。空の中でコストの高い部分であり、専用のテクスチャに低い解像度でレンダリングされます。ノイズは初めて使用されるときに CPU で生成されます。

| プロパティ | 説明 |
| -------- | ----------- |
| `cloudCoverage` | 雲に覆われる空の割合で、0 から 1 の範囲です。快晴から曇天までを表します。 |
| `cloudSoftness` | 雲の柔らかさで、0.01 から 1 の範囲です。輪郭のくっきりした濃い雲から、半透明で薄くたなびく雲までを表します。 |
| `cloudOpacity` | 雲の不透明度で、0 から 1 の範囲です。 |
| `cloudBrightness` | 雲に当たる太陽光の明るさ。 |
| `cloudNightBrightness` | 夜間に雲に当たる月光の明るさ。 |
| `cloudSize` | 雲のパターンが繰り返される距離（メートル）。値が大きいほど雲が大きくなります。 |
| `cloudHeight` | 雲の層の高度（メートル）。 |
| `cloudThickness` | ボリューメトリックな雲の層の厚さ（メートル）。 |
| `cloudSunDimming` | 被覆率が最大のときに雲が遮る太陽光の割合で、ライトを減光します。 |
| `windSpeed`、`windDirection` | 雲が流れる速度（メートル毎秒）と、雲が流れていく方向（度）。雲はアプリケーションの時間に合わせて流れます。 |

ボリューメトリックな雲のコストは、次の 2 つのプロパティで設定します。

- [`cloudQuality`](https://api.playcanvas.com/engine/classes/DynamicSkyEffect.html#cloudquality)（0 から 1）は、雲の層を通るステップ数と、ライトに向かうステップ数を設定します。コストはほぼ線形に増加し、0.5 から 1 で 2 倍になります。値を下げると輪郭がぼやけ、シェーディングが平坦になります。
- [`cloudResolution`](https://api.playcanvas.com/engine/classes/DynamicSkyEffect.html#cloudresolution)（0.25 から 1）は、シーンに対する雲のレンダリング解像度です。雲は柔らかいため、解像度を下げても細部はほとんど失われず、コストの大部分を削減できます。

## シーンのライティング {#lighting-the-scene}

[`lighting`](https://api.playcanvas.com/engine/classes/DynamicSkyEffect.html#lighting) が有効な間、エフェクトは空からシーンのライティングを生成します。これはマテリアルを照らす環境アトラスで、[`Scene#envAtlas`](https://api.playcanvas.com/engine/classes/Scene.html#envatlas) に割り当てられます。ライティングを生成するエフェクトは 1 つだけ、メインカメラのエフェクトにしてください。

ライティングの生成にはコストがかかるため、エフェクトは空が十分に変化したときにのみライティングを再生成します。

- [`lightingThreshold`](https://api.playcanvas.com/engine/classes/DynamicSkyEffect.html#lightingthreshold) は、ライティングが再生成されるまでに太陽が移動する角度です。
- [`lightingCloudThreshold`](https://api.playcanvas.com/engine/classes/DynamicSkyEffect.html#lightingcloudthreshold) は、ライティングが再生成されるまでに雲が流れる距離で、雲のサイズに対する割合で指定します。デフォルトの 0 では無効になります。
- [`lightingInterpolation`](https://api.playcanvas.com/engine/classes/DynamicSkyEffect.html#lightinginterpolation) は、前回の更新のライティングから最新のライティングへとブレンドし、一度に切り替わるのではなく、徐々に変化する空に滑らかに追従させます。
- [`bakeLighting`](https://api.playcanvas.com/engine/classes/DynamicSkyEffect.html#bakelighting) は、次のフレームの前にライティングを再生成します。エフェクトが自動では再生成しない変更に使用します。

[`lightingResolution`](https://api.playcanvas.com/engine/classes/DynamicSkyEffect.html#lightingresolution) はライティングの生成元となる空の解像度で、[`atlasSize`](https://api.playcanvas.com/engine/classes/DynamicSkyEffect.html#atlassize) は環境アトラスのサイズです。アトラスが大きいほど、光沢のあるサーフェスの反射がシャープになります。

平面反射をレンダリングするカメラなど、エフェクトを持たないカメラは、その環境アトラスからシーンの空をレンダリングします。つまり、この空の静止画像です。

## ヘイズ {#haze}

[`haze`](https://api.playcanvas.com/engine/classes/DynamicSkyEffect.html#haze) が有効な間、エフェクトはカメラがレンダリングするシーンに空気遠近法を加えます。サーフェスは距離に応じて、その背後にある空の色へとフェードします。ヘイズは低い太陽の方向では暖かく、太陽と反対の方向では青くなり、日没後は夜空のグラデーションに従います。ヘイズは基準の高さで最も濃く、その上では高さとともに薄くなるため、谷は霞んだまま、高い所からの眺めは澄んだままになります。

```javascript
sky.haze = true;
sky.hazeDensity = 0.0002;
sky.hazeHeight = 300;
sky.hazeBaseHeight = 0;
cameraFrame.update();
```

| プロパティ | 説明 |
| -------- | ----------- |
| `hazeDensity` | 基準の高さでのヘイズの密度（ワールド単位あたり）。単位距離で散乱される光の割合です。基準の高さで水平に見ると、約 3 / 密度 の距離で 95% が隠れます。 |
| `hazeHeight` | 密度が約 3 分の 1 に下がる高さ（ワールド単位）。値を小さくすると、ヘイズが地面の近くにとどまります。 |
| `hazeBaseHeight` | ヘイズが最も濃くなる高さ（ワールド単位）。通常は海面など、シーンの最も低い地面です。それより下では、ヘイズはさらに濃くなります。 |

密度は低く抑えてください。ヘイズは地平線付近の空の色をとり、その色は日の当たる地面よりはるかに明るいため、わずか数パーセントのヘイズでも遠くのサーフェスが目に見えて明るくなります。

ヘイズは、カメラのフォグ、つまり [`Scene#fog`](https://api.playcanvas.com/engine/classes/Scene.html#fog) または [`CameraComponent#fog`](https://api.playcanvas.com/engine/classes/CameraComponent.html#fog) の代わりになります。ヘイズが有効な間、エフェクトはカメラに独自のフォグを与え、ヘイズが無効になるとカメラのフォグを元に戻します。他のカメラは自身のフォグを保ちます。

- [`StandardMaterial`](https://api.playcanvas.com/engine/classes/StandardMaterial.html) など、ライティングされるマテリアルにヘイズがかかります。
- パーティクルとガウシアンスプラットは、そのカメラではフォグなしでレンダリングされます。
- マテリアルは、[`useFog`](https://api.playcanvas.com/engine/classes/StandardMaterial.html#usefog) を `false` に設定するか、`DYNAMIC_SKY_NO_HAZE` 定義を設定すると、ヘイズの対象から外れ、フォグなしでレンダリングされます。

```javascript
material.setDefine('DYNAMIC_SKY_NO_HAZE', true);
material.update();
```

ヘイズを有効または無効にすると、カメラがレンダリングするライティングされるマテリアルのシェーダーが再コンパイルされます。そのため、ゲーム中に切り替えるのではなく、最初に設定してください。

エフェクトは、グラフィックスデバイスのすべてのマテリアルに対して `fogPS` シェーダーチャンクを置き換えることで、マテリアルにヘイズをかけます。`fogPS` を独自のチャンクに置き換えたマテリアルにはヘイズがかからず、そのカメラではシェーダーの `FOG` 定義が `DYNAMICSKYHAZE` に設定されます。

## 他のシェーダーでの空 {#the-sky-in-other-shaders}

エフェクトは毎フレーム、空のユニフォームをグラフィックスデバイスに設定するため、他のマテリアルのシェーダーも同じ空を評価できます。たとえば、空を映す水のシェーダーです。エフェクトのシェーダーチャンク（GLSL と WGSL）は、これらのユニフォームから空を評価します。

- `dynamicSkyAtmospherePS`：`dynamicSkyBase(dir, ambient)` は、太陽の円盤、星、月を除いた、ある方向の空の放射輝度を返し、`ambient` にその周りの空の光を設定します。方向は空の空間で表します。つまり、ワールド空間の方向を空の回転（`dynSkyRotation` ユニフォーム）で回転させ、X を反転したものです。
- `dynamicSkyHazePS`：`dynamicSkyHaze(color, cameraPos, worldPos)` は、[ヘイズ](#haze)を通して見たリニアな色を返します。ヘイズが自動では届かないシェーダーで使用します。

<Tabs groupId="shader-language" queryString="lang">
<TabItem value="glsl" label="GLSL">

```glsl
#include "dynamicSkyAtmospherePS"
uniform mat3 dynSkyRotation;

vec3 skyColor(vec3 worldDir) {
    vec3 dir = worldDir * dynSkyRotation;
    dir.x = -dir.x;
    vec3 ambient;
    return dynamicSkyBase(dir, ambient);
}
```

</TabItem>
<TabItem value="wgsl" label="WGSL">

```wgsl
#include "dynamicSkyAtmospherePS"
uniform dynSkyRotation: mat3x3f;

fn skyColor(worldDir: vec3f) -> vec3f {
    var dir = worldDir * uniform.dynSkyRotation;
    dir.x = -dir.x;
    var ambient: vec3f;
    return dynamicSkyBase(dir, &ambient);
}
```

</TabItem>
</Tabs>

CPU では、[`getSkyColor`](https://api.playcanvas.com/engine/classes/DynamicSkyEffect.html#getskycolor) がある方向の同じ空を評価します。パーティクルに空が与える光など、スクリプトで計算するライティングに使用します。

```javascript
const zenith = sky.getSkyColor(Vec3.UP);
```

ダイナミックスカイが複数ある場合、マテリアルは最後に更新された空でレンダリングされます。

## XR {#xr}

XR では、シーンの他の部分と同様に空は各ビューごとにレンダリングされ、フラットな雲も同様です。ボリューメトリックな雲は、カメラのビューに対して一度だけテクスチャにレンダリングされ、各ビューはそのテクスチャから雲を読み取ります。目のビューがカメラのビューの外側まで広がる部分では、テクスチャに読み取る雲がないため、テクスチャの端で雲が筋状に引き伸ばされます。XR では `CLOUDTYPE_FLAT` の雲を使用してください。

## エディターでのダイナミックスカイ {#the-dynamic-sky-in-the-editor}

[`dynamic-sky.mjs`](https://github.com/playcanvas/engine/blob/main/scripts/esm/dynamic-sky.mjs) の `dynamicSkyEffect` スクリプトは、[`cameraFrame` スクリプト](/user-manual/graphics/linear-workflow/hdr-rendering/#cameraframe-in-the-editor)と並べてカメラエンティティに追加すると、そのカメラエンティティのカメラフレームにエフェクトを追加します。属性はエフェクトのプロパティで、**Sun**、**Day**、**Night**、**Clouds**、**Lighting** のグループに分かれています。**Sun** グループの **Light** 属性は、太陽に同期させるディレクショナルライトのエンティティです。

このスクリプトは時刻をアニメーションしません。スクリプトは毎フレーム属性をエフェクトにコピーするため、同じエンティティに付けた独自のスクリプトから属性を変更すると、太陽が動きます。

```javascript
import { Script } from 'playcanvas';

class DayNightCycle extends Script {
    static scriptName = 'dayNightCycle';

    time = 0;

    update(dt) {
        this.time += dt;
        const sky = this.entity.script.dynamicSkyEffect;
        sky.sun.elevation = Math.sin(this.time * 0.1) * 60;
    }
}

export { DayNightCycle };
```

[ヘイズ](#haze)はスクリプトの属性ではありません。スクリプトが操作するエフェクト、つまりスクリプトが `initialize` で作成する `effect` に設定してください。

```javascript
import { Script } from 'playcanvas';

class SkyHaze extends Script {
    static scriptName = 'skyHaze';

    postInitialize() {
        const sky = this.entity.script.dynamicSkyEffect.effect;
        sky.haze = true;
        sky.hazeDensity = 0.0002;
        sky.hazeHeight = 300;
    }
}

export { SkyHaze };
```

## 制限事項 {#limitations}

- ボリューメトリックな雲は XR ではサポートされていません。[XR](#xr) を参照してください。
- 空は、カメラフレームの[ボリューメトリックフォグ](/user-manual/graphics/posteffects/cameraframe/volumetric-fog/)と連携しません。雲はフォグに影を落とさず、フォグは空の光で照らされません。
- ヘイズはパーティクルとガウシアンスプラットには届きません。これらは、ヘイズのあるカメラではフォグなしでレンダリングされます。

## 例 {#examples}

昼夜サイクルを通した解析的な大気です。星、月、風に流れるボリューメトリックな雲があり、シーンを照らし、太陽のライトを空と同期させます。

<EngineExample id="camera-frame/dynamic-sky" title="Dynamic Sky" />

1 日を通した空の下の砂漠の風景です。ヘイズによって、遠くの地面が空の色へとフェードします。

<EngineExample id="graphics/procedural-sky" title="Procedural Sky" />
