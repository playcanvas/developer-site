---
title: 自動露出
description: "CameraFrame の自動露出エフェクト：画面の明るさの測光、露出の順応、カット、露出とヒストグラムの読み取り、デバッグ表示、エディタースクリプト。"
---

[`AutoExposureEffect`](https://api.playcanvas.com/engine/classes/AutoExposureEffect.html) は、目が暗闇や日光に順応するように、カメラの露出を、カメラに映るものの明るさに順応させます。毎フレーム、画面の明るさのヒストグラムを測定し、画面の 2 つの割合の間にある部分を平均します。このとき、深い影や太陽など、最も暗い部分と最も明るい部分は除外されます。その後、その平均をミドルグレーとして表示する露出に向けて、露出を徐々に変化させます。

自動露出はカメラフレームの組み込みエフェクトではありません。作成して、[`addEffect`](https://api.playcanvas.com/engine/classes/CameraFrame.html#addeffect) でカメラフレームに追加してください。

```javascript
const autoExposure = new AutoExposureEffect(app.graphicsDevice);
cameraFrame.addEffect(autoExposure);
cameraFrame.update();
```

## 順応させる露出 {#the-exposure-it-adapts}

エフェクトは、カメラがレンダリングに使用する露出を順応させます。これは[シーンの露出](https://api.playcanvas.com/engine/classes/Scene.html#exposure)、または[物理単位](/user-manual/graphics/cameras/tone-mapping/#physical-exposure)を使用する場合は物理カメラの露出です。エフェクトは [`minEv`](https://api.playcanvas.com/engine/classes/AutoExposureEffect.html#minev) から [`maxEv`](https://api.playcanvas.com/engine/classes/AutoExposureEffect.html#maxev) 段の範囲で露出をスケーリングするため、カメラの露出は典型的なビューに合わせて設定し、そこからエフェクトに順応させてください。

合成のトーンマッピングやアンチエイリアシングなど、露出を使用するフレームのすべての部分がこの露出に従います。トーンマッピングがないと合成で露出が適用されないため、エフェクトにはトーンマッピングが必要です。`rendering.toneMapping` が `TONEMAP_NONE` の間、エフェクトは動作しません。

## 測光 {#metering}

エフェクトは、シーンの半分の解像度のコピーから画面の明るさを測定し、64 ビンのヒストグラムにします。平均する画面の部分は、次の 3 つのプロパティで選択します。

| プロパティ | 説明 |
| -------- | ----------- |
| `lowPercent` | 深い影など、最も暗い部分として平均から除外する画面の割合で、0 から 1 の範囲です。値を大きくすると画面の明るい部分を測光するため、画像が暗くなります。デフォルトは 0.1 です。 |
| `highPercent` | 平均を取る上限となる画面の割合で、0 から 1 の範囲です。これより上にある、太陽や明るいハイライトなどの最も明るい部分は除外されます。デフォルトは 0.9 です。 |
| `centerWeight` | 画面の端に対して中央の明るさをどれだけ重視するかで、0 から 1 の範囲です。0 では画面全体を均等に測光し、1 では主に中央を測光します。デフォルトは 0.5 です。 |

## 順応 {#adaptation}

| プロパティ | 説明 |
| -------- | ----------- |
| `compensation` | EV 単位の露出補正。画面の平均をミドルグレーよりどれだけ明るく表示するかを指定します。正の値で画像が明るくなり、負の値で暗くなり、1 段ごとに明るさが 2 倍または半分になります。デフォルトは 0 です。 |
| `minEv` | エフェクトが順応する最低の露出で、カメラの露出に対する EV で指定します。-2 では、明るいシーン向けに画像を 4 分の 1 の明るさまで暗くできます。デフォルトは -6 です。 |
| `maxEv` | エフェクトが順応する最高の露出で、カメラの露出に対する EV で指定します。2 では、暗いシーン向けに画像を 4 倍まで明るくできます。デフォルトは 6 です。 |
| `speedDarkToLight` | 暗い室内から日光の下に出たときなど、シーンが明るくなったときに露出が順応する速さ。露出は 1 / `speedDarkToLight` 秒で変化のおよそ 3 分の 2 に達します。デフォルトは 3 です。 |
| `speedLightToDark` | シーンが暗くなったときに露出が順応する速さ。目は明るさよりも暗さに順応するのが遅いため、デフォルトは 1 です。 |

すべてのエフェクトと同様に、これらのプロパティの変更は次の [`CameraFrame#update`](https://api.playcanvas.com/engine/classes/CameraFrame.html#update) で適用されます。

## カット {#cuts}

別のビューへカットした後に、前のビューから徐々に順応すると不自然に見えます。カットの際に [`reset`](https://api.playcanvas.com/engine/classes/AutoExposureEffect.html#reset) を呼び出すと、エフェクトはカット前のビューの測定値を無視して、次の測定値にすぐに順応します。

```javascript
cameraEntity.setPosition(nextShot.position);
autoExposure.reset();
```

エフェクトは、最初の測定値にもすぐに順応します。

## 露出の読み取り {#reading-the-exposure}

ヒストグラムは GPU から読み戻されるため、露出は 1、2 フレーム遅れて画面に追従しますが、徐々に順応することでこの遅れは目立たなくなります。結果は次の 2 つのプロパティで取得できます。

- [`exposure`](https://api.playcanvas.com/engine/classes/AutoExposureEffect.html#exposure) は、このフレームでカメラがレンダリングに使用する露出で、カメラの露出を順応によってスケーリングしたものです。
- [`histogram`](https://api.playcanvas.com/engine/classes/AutoExposureEffect.html#histogram) は、最後に読み戻されたヒストグラムで、最も暗いビンから最も明るいビンまで、64 個の各ビンの重みを持つ `Uint32Array` です。ヒストグラムが届くたびにインプレースで更新されます。

## デバッグ表示 {#debug-view}

`autoexposure` デバッグ表示は、他のエフェクトを適用せずに、カメラがレンダリングに使用する露出でシーンを表示し、その明るさのヒストグラムを下部に描画します。平均に含まれるビンは明るく、平均は黄色で、カメラがミドルグレーとして露出する明るさは青で描画されます。露出が順応すると、2 つのマーカーが重なります。

```javascript
cameraFrame.debug = 'autoexposure';
cameraFrame.update();
```

## エディターでの自動露出 {#auto-exposure-in-the-editor}

[`auto-exposure.mjs`](https://github.com/playcanvas/engine/blob/main/scripts/esm/auto-exposure.mjs) の `autoExposureEffect` スクリプトは、[`cameraFrame` スクリプト](/user-manual/graphics/linear-workflow/hdr-rendering/#cameraframe-in-the-editor)と並べてカメラエンティティに追加すると、そのカメラエンティティのカメラフレームにエフェクトを追加します。属性はエフェクトのプロパティで、**Debug** 属性でデバッグ表示を表示します。

## 例 {#example}

日の当たる中庭から、その間にある暗いトンネルへと歩くと、露出が順応します。暗さよりも明るさへの順応のほうが速くなります。

<EngineExample id="camera-frame/auto-exposure" title="Auto Exposure" />
