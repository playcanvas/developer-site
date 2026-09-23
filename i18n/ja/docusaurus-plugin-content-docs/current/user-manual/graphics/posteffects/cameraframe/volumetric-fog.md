---
title: ボリューメトリックフォグ
description: CameraFrame の高さに応じたフォグと光の筋を設定し、ディレクショナルとローカルライト、パフォーマンス、Gaussian Splat の深度を調整します。
---

[`CameraFrame.volumetricFog`](https://api.playcanvas.com/engine/classes/CameraFrame.html#volumetricfog) は、シーンのライトに照らされる高さに応じたフォグをレンダリングします。ディレクショナルライトは大気のかすみや太陽光の筋を作り、オムニとスポットライトは照らされた空間やビームを作ります。視線に沿ってシャドウをサンプリングするため、オブジェクトはフォグ内の光を遮ることができます。

## セットアップ

透視投影カメラを使用してください。`volumetricFog.light` にディレクショナルライトコンポーネントを割り当てるか、ローカルのオムニまたはスポットライトを有効にします。どちらの光源も指定せずにフォグを有効にしても、エフェクトは動作しません。`light` にディレクショナル以外のライトを割り当てるとエフェクトが無効になります。オムニとスポットライトにはローカルライトの設定を使用してください。

次の例では、`cameraEntity` に Camera コンポーネント、`sunEntity` にディレクショナルの Light コンポーネントがあることを前提とします。

```javascript
const cameraFrame = new pc.CameraFrame(app, cameraEntity.camera);
cameraFrame.rendering.toneMapping = pc.TONEMAP_NEUTRAL;
cameraFrame.taa.enabled = true;

sunEntity.light.castShadows = true;
cameraFrame.volumetricFog.enabled = true;
cameraFrame.volumetricFog.light = sunEntity.light;
cameraFrame.volumetricFog.density = 0.01;
cameraFrame.volumetricFog.heightBase = 0;
cameraFrame.volumetricFog.heightFalloff = 0.05;
cameraFrame.update();
```

シーンのワールド単位に合わせて高さと密度を選びます。光の筋を表示するには、ライトとフォグの間に影を落とすジオメトリを配置し、対象領域をカバーするようにライトのシャドウ距離と解像度を設定します。フォグは TAA の前に合成されるため、TAA を有効にするとレイマーチのノイズが時間とともに平滑化されます。設定を変更した後は `cameraFrame.update()` を呼び出してください。

## オムニとスポットライト {#omni-and-spot-lights}

ローカルライトには、デフォルトで有効な[クラスター化ライティング](/user-manual/graphics/lighting/clustered-lighting/)が必要です。フォグに寄与させるライトの種類を有効にします。

```javascript
cameraFrame.volumetricFog.localSpotLights = true;
cameraFrame.volumetricFog.localOmniLights = true;
cameraFrame.volumetricFog.localIntensity = 1;
cameraFrame.volumetricFog.localSteps = 12;
cameraFrame.update();

// サーフェスのライティングとは独立して、個別のスポットライトの寄与を調整します。
spotEntity.light.volumetricScattering = 2;
```

[`LightComponent.volumetricScattering`](https://api.playcanvas.com/engine/classes/LightComponent.html#volumetricscattering) のデフォルトは 1 で、オムニとスポットライトに適用されます。0 に設定すると、そのライトをフォグから除外します。`localIntensity` はすべてのローカルライトの散乱を調整し、`intensity` はディレクショナルライトの寄与を制御します。細いビームは各視線の短い区間だけを通過するため、より高い `localIntensity` が必要になる場合があります。

ローカルライトはクラスター化ライティングのシャドウと Cookie のアトラスをサンプリングします。ジオメトリでビームを遮るにはライトのシャドウを有効にし、照明の形を変えるには Cookie を使用します。シャドウアトラスの解像度は、ビームに見える細部に影響します。

ローカルライトだけで照らすシーンでは、`volumetricFog.light` を `null` のままにして、`localSpotLights` または `localOmniLights` を有効にします。アンビエント成分も寄与しますが、アンビエントだけではエフェクトは動作しません。

## 外観

| 設定 | デフォルト | 効果 |
| --- | --- | --- |
| `density` | `0.01` | 基準高さ以下のフォグ密度。 |
| `heightBase` | `0` | 密度が減衰し始めるワールド空間の高さ。 |
| `heightFalloff` | `0.05` | 基準高さより上での密度の指数的な減衰。0 で均一な密度になります。 |
| `tint` | 白 | フォグの散乱媒体の色。 |
| `extinction` | `1` | 散乱に対する吸収。値を下げると遠くのフォグと光の筋が明るく保たれますが、物理的な正確さは下がります。 |
| `anisotropy` | `0.6` | 前方散乱。範囲は 0 から 0.95。大きい値ほどライトの方向を見たときにフォグが明るくなります。 |
| `intensity` | `1` | ディレクショナルライトの散乱強度。 |
| `localIntensity` | `1` | オムニとスポットライトの散乱強度。 |
| `ambientColor` | 白 | フォグで散乱するアンビエント光の色。 |
| `ambientIntensity` | `0.02` | 影の中でもフォグが見えるようにするアンビエント成分。 |

## 品質とパフォーマンス

| 設定 | デフォルト | トレードオフ |
| --- | --- | --- |
| `steps` | `24` | メインのレイマーチのサンプル数。範囲は 4 から 128。増やすと品質とコストが上がります。 |
| `localSteps` | `12` | 各ローカルライトのボリューム内のサンプル数。範囲は 2 から 64。細かいビームには値を増やします。 |
| `scale` | `0.5` | シーンのレンダーターゲットに対するフォグテクスチャの解像度。範囲は 0.25 から 1。下げるとピクセル処理量が減ります。 |
| `maxDistance` | `300` | レイマーチの最大距離（ワールド単位）。フォグが見える範囲に制限してください。 |

まずデフォルトの半分の解像度と TAA を使用し、ノイズやバンディングが残る場合にサンプル数を増やしてください。`maxDistance` を長くすると同じサンプル数でより広い空間をカバーするため、長いレイにはより多くのステップが必要になる場合があります。

ローカルライトのコストは、寄与するライト数、画面上の面積、`localSteps` に応じて増えます。オムニライトは球状の空間を満たすため、スポットライトよりも画面上の面積が大きくなる傾向があります。ライトの範囲を必要な大きさに抑え、フォグを照らす必要のないライトの散乱は無効にしてください。

## Gaussian Splat {#gaussian-splats}

フォグと被写界深度が Gaussian Splat のサーフェスを考慮するには、スプラットがシーン深度に寄与する必要があります。追加のフルスクリーンレンダーターゲットが必要なため、デフォルトでは無効です。[`GSplatParams.sceneDepthWrite`](https://api.playcanvas.com/engine/classes/GSplatParams.html#scenedepthwrite) で有効にします。

```javascript
if (pc.CameraFrame.isSplatSceneDepthSupported(app.graphicsDevice)) {
    app.scene.gsplat.sceneDepthWrite = true;
    cameraFrame.rendering.samples = 1;
    cameraFrame.update();
}
```

[`CameraFrame.isSplatSceneDepthSupported`](https://api.playcanvas.com/engine/classes/CameraFrame.html#issplatscenedepthsupported) はデバイスの対応状況を確認しますが、カメラの設定全体は確認しません。スプラットのシーン深度には次の条件も必要です。

- CameraFrame の MSAA を無効にすること（`rendering.samples = 1`）。TAA は使用できます。
- カメラがレンダーターゲット全体をクリアすること。
- シーンの描画中に深度をサンプリングするための深度プリパスが不要であること。特に `rendering.sceneDepthMap = true` と `ssao.type = pc.SSAOTYPE_LIGHTING` はこの経路を無効にします。スプラットのシーン深度と SSAO を併用する場合は `pc.SSAOTYPE_COMBINE` を使用してください。

非対応の設定ではスプラットを含まない深度にフォールバックし、要求されたスプラット深度を生成できない場合はデバッグビルドが警告します。シーンがスプラット深度に依存する場合、利用できないときはフォグと DoF を無効にするか、適切な深度用ジオメトリを用意してください。[深度のデバッグ表示](index.md#debug-views)で結果を確認できます。

一部のデバイスでは低精度のシーン深度を使用します。その場合、深度の精度を保つため、カメラのクリップ距離をおよそ 0.000015 から 16384 ワールド単位の範囲内にしてください。

## Editor での使用

[`camera-frame.mjs`](https://github.com/playcanvas/engine/blob/main/scripts/esm/camera-frame.mjs) を追加してパースし、[Editor での CameraFrame](/user-manual/graphics/linear-workflow/hdr-rendering/#cameraframe-in-the-editor) の手順に従って、登録名 `cameraFrame` のスクリプトをカメラエンティティに追加します。

**Volumetric Fog** グループを有効にします。**Light** フィールドにはディレクショナルライトの**エンティティ**を指定します。エンジン API が受け取るのはライトの**コンポーネント**です。ローカルの照明には **Local Spot Lights** または **Local Omni Lights** を有効にし、上記と同じ外観と品質の設定を使用します。フォグを滑らかにするには **TAA** を有効にしてください。既存のプロジェクトにこれらの属性がない場合は、スクリプトアセットを更新して再度パースしてください。

## 例

<EngineExample id="graphics/volumetric-fog" title="ボリューメトリックフォグ" />

<EngineExample id="graphics/volumetric-fog-local-lights" title="ローカルライトのボリューメトリックフォグ" />

<EngineExample id="graphics/volumetric-fog-shafts" title="ボリューメトリックフォグの光の筋" />
