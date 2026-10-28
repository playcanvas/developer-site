---
title: モダンなポストプロセス
description: "CameraFrame HDR スタック：ボリューメトリックフォグ、ブルーム、SSAO、TAA、被写界深度、カラーエンハンス、グレーディング、カスタマイズ。"
---

PlayCanvas では、視覚的に高度でパフォーマンスのよいモダンなポストプロセスのワークフローを提供しています。主な方法は、組み込みエフェクト付きの HDR ポストプロセスに [`CameraFrame`](https://api.playcanvas.com/engine/classes/CameraFrame.html) クラスを使うことですが、完全な制御のために独自のレンダーパスを作成することもできます。

## 機能

`CameraFrame` では、次のような高度なレンダリング手法が利用できます。

- **Bloom** — 明るい光源の自然な光彩をシミュレートする、HDR 物理ベースのブルーム。輝度のしきい値を指定して、光彩をシーンの最も明るい部分のみに限定することもできます
- **[ボリューメトリックフォグ](volumetric-fog.md)** — ディレクショナル、オムニ、スポットライトで照らされる高さに応じたフォグと光の筋
- **SSAO（Screen Space Ambient Occlusion）** — 環境光の遮蔽をシミュレートして奥行き感を強調
- **被写界深度（DoF）** — カメラのフォーカスを模し、焦点面の外側をぼかす
- **テンポラルアンチエイリアス（TAA）** — 時間方向にエッジを平滑化してギザつきを軽減。低い解像度でレンダリングしたシーンを[アップスケール](#taa-upscaling)することもできます
- **[SMAA（Subpixel Morphological Anti-Aliasing）](#smaa)** — カメラをジッターさせず、ゴーストも生じさせずに、単一フレーム内でギザつきを平滑化
- **ビネット** — `vignette.color` で指定した色に向かって画像の端をブレンド
- **カラーグレーディング** — 明るさ、コントラスト、彩度、色味を調整してスタイルを付与
- **[カラーエンハンス](#color-enhance)** — HDR でシャドウ、ハイライト、中間調、自然な彩度、かすみの除去を調整
- **カラー LUT** — 高度な色変換のためにルックアップテーブルを適用。詳細は [HDR レンダリング > カラー LUT](/user-manual/graphics/linear-workflow/hdr-rendering/#color-lut) を参照してください。
- **フリンジ** — 色チャンネルの分離をシミュレートする色収差
- **トーンマッピング** — HDR の色を表示可能な範囲へマッピングする方法を制御
- **シャープネス** — TAA やアップスケールによるぼけを抑えるため画像の鮮明さを強調
- **[自動露出](auto-exposure.md)** — 見えているものの明るさに合わせてカメラの露出を順応させる
- **[レンズフレア](lens-flare.md)** — ライトのフレア。ライトがシーンに隠れるにつれてフェードします
- **[ダイナミックスカイ](dynamic-sky.md)** — 雲のある昼夜の空。シーンを照らし、太陽のライトを同期させます

トーンマッピングを除き、これらはそれぞれエフェクト、つまり [`CameraFrameEffect`](https://api.playcanvas.com/engine/classes/CameraFrameEffect.html) です。多くは `cameraFrame.bloom` や `cameraFrame.vignette` のようにカメラフレームに組み込まれています。SMAA、自動露出、レンズフレア、ダイナミックスカイは、[`addEffect`](https://api.playcanvas.com/engine/classes/CameraFrame.html#addeffect) でカメラフレームに追加します。[独自のエフェクト](custom-effects.md)を作成することもできます。

## セットアップと使い方

`CameraFrame` の設定と利用の詳細は、[HDR レンダリング](/user-manual/graphics/linear-workflow/hdr-rendering/)ガイドと [CameraFrame API ドキュメント](https://api.playcanvas.com/engine/classes/CameraFrame.html)を参照してください。

Editor 利用者向けには、すぐ使える Script があります。設定手順は [Editor での CameraFrame](/user-manual/graphics/linear-workflow/hdr-rendering/#cameraframe-in-the-editor)を参照してください。

### カラーエンハンス {#color-enhance}

`colorEnhance` は、`grading` の明るさ、コントラスト、彩度、色味の制御に加え、特定の領域や色に対する調整を提供します。

- `shadows` と `highlights` は暗部と明部を明るく、または暗くします。範囲は -3 から 3、中立値は 0 です。
- `midtones` は露出の変更よりもシャドウとハイライトを保持しながら中間の明るさを調整します。範囲は -1 から 1 です。
- `vibrance` は、すでに彩度が高い色よりも彩度が低い色を強く鮮やかにします。負の値は彩度を下げます。範囲は -1 から 1 です。
- `dehaze` は正の値でかすみを除去し、負の値でかすみを加えます。範囲は -1 から 1 です。これは色の調整です。シーンのライトに照らされるフォグには[ボリューメトリックフォグ](volumetric-fog.md)を使用してください。

```javascript
cameraFrame.colorEnhance.enabled = true;
cameraFrame.colorEnhance.shadows = 0.5;
cameraFrame.colorEnhance.midtones = 0.1;
cameraFrame.colorEnhance.vibrance = 0.2;
cameraFrame.update();
```

5 つの調整値のデフォルトはすべて 0 で、エフェクトはデフォルトで無効です。

### ビネットの色

`vignette.color` を使用すると、端を黒にフェードさせる代わりに色を付けられます。

```javascript
cameraFrame.vignette.intensity = 0.4;
cameraFrame.vignette.color.set(0.1, 0.05, 0.2);
cameraFrame.update();
```

`inner`、`outer`、`curvature` は形状と減衰を制御します。`outer` を `inner` より小さくすると効果が反転し、中央に向かって適用されます。

### TAA アップスケール {#taa-upscaling}

`rendering.renderTargetScale`（0.1～1）は、最適化のためにシーンを低い解像度でレンダリングします。ポストプロセスもその解像度で実行され、画像はその後バイリニアフィルタリングでフル解像度に引き伸ばされ、その上に UI がフル解像度でレンダリングされます。

TAA が有効な場合、[`taa.upscale`](https://api.playcanvas.com/engine/classes/TaaEffect.html#upscale) を使うと、低い解像度でレンダリングしたフレームを、代わりにフル解像度で蓄積します。カメラのジッターによって各フレームのサンプルがフル解像度のピクセル内の異なる位置に置かれるため、低い解像度で失われるディテールの多くを取り戻せます。ブルームや合成など、TAA の後のエフェクトは、フル解像度のシーンを扱います。

```javascript
cameraFrame.rendering.renderTargetScale = 0.5;
cameraFrame.taa.enabled = true;
cameraFrame.taa.upscale = true;
cameraFrame.rendering.sharpness = 0.5;
cameraFrame.update();
```

アップスケール中は履歴に長く頼るため、動くオブジェクトは TAA 単体のときよりもぼやけたり、ゴーストが出たりすることがあります。`rendering.sharpness` は、TAA が残す柔らかさを打ち消します。エディターでは、`cameraFrame` スクリプトがこれらを `taa.upscale`、`rendering.renderTargetScale`、`rendering.sharpness` 属性として公開しています。[例](#examples)の「時間的反エイリアシング」の例では、フル解像度と低い解像度を比較し、バイリニアフィルタリングまたは TAA によるアップスケールを、シャープニングの有無とあわせて確認できます。

### SMAA {#smaa}

[`SmaaEffect`](https://api.playcanvas.com/engine/classes/SmaaEffect.html)（Subpixel Morphological Anti-Aliasing）は、ジオメトリのギザギザしたエッジを単一フレーム内で平滑化します。画像内のエッジを見つけ、エイリアスの生じた各エッジの形状を認識し、エイリアシングがなければそのエッジが覆う面積に応じて、エッジに沿ったピクセルを隣接するピクセルとブレンドします。TAA と異なり、カメラをジッターさせず、履歴を必要とせず、ゴーストも生じませんが、1 ピクセルより細かいディテールは解像できません。

SMAA はカメラフレームの組み込みエフェクトではないため、`addEffect` で追加します。

```javascript
const smaa = new SmaaEffect(app.graphicsDevice);
cameraFrame.addEffect(smaa);
cameraFrame.update();
```

4 つのプロパティで品質とコストを設定します。デフォルトは、リファレンス実装の High プリセットです。

| プリセット | `threshold` | `maxSearchSteps` | `maxSearchStepsDiag` | `cornerRounding` |
| ---------- | ----------- | ---------------- | -------------------- | ---------------- |
| Low | 0.15 | 4 | 0 | 100 |
| Medium | 0.1 | 8 | 0 | 100 |
| High（デフォルト） | 0.1 | 16 | 8 | 25 |
| Ultra | 0.05 | 32 | 16 | 25 |

- `threshold`（0～0.5）は、隣接するピクセルの間をエッジで隔てられているとみなす明るさの差です。値を小さくするとより多くのエッジを平滑化しますが、コストが上がり、ジオメトリとあわせてテクスチャのディテールも平滑化されることがあります。
- `maxSearchSteps`（1～112）は、水平または垂直のエッジの端を探す最大ステップ数で、各ステップは 2 ピクセルを対象とします。より長いエッジの端は見つからないため、その平滑化の精度が下がります。
- `maxSearchStepsDiag`（0～20）は、対角線のエッジに対する同じ値です。0 にすると対角線のエッジの検出が無効になり、それらは水平および垂直のエッジとして平滑化されます。
- `cornerRounding`（0～100）は、ジオメトリの鋭い角をどの程度丸めるかです。0 で角を最も鋭く保ち、100 で他のエッジと同様に平滑化します。

SMAA はマルチサンプリング（`rendering.samples`）と組み合わせることができ、より高いコストでエッジをさらに平滑化します。TAA と組み合わせた場合は、`cameraFrame.insertEffectBefore(smaa, 'taa')` で TAA の前に挿入しない限り、TAA の後にシーンを解決します。デバッグ表示の `'smaaedges'` と `'smaaweights'` は、検出したエッジと、エッジをまたいでピクセルをどの程度ブレンドするかを表示します。エディターでは、[`smaa.mjs`](https://github.com/playcanvas/engine/blob/main/scripts/esm/smaa.mjs) の `smaaEffect` スクリプトが、それが付いているカメラエンティティのカメラフレームに SMAA を追加します。

次の例では、SMAA のプリセットを TAA、TAA アップスケール、マルチサンプリングと比較します。

<EngineExample id="camera-frame/anti-aliasing" title="Anti-Aliasing" />

### デバッグ表示 {#debug-views}

`cameraFrame.debug` に `'scene'`、`'ssao'`、`'bloom'`、`'vignette'`、`'dofcoc'`（被写界深度の錯乱円）、`'dofblur'`、`'depth'` のいずれかを設定すると、中間結果を確認できます。カメラフレームに追加したエフェクトは、独自の表示を提供します。[SMAA](#smaa) には `'smaaedges'` と `'smaaweights'`、[自動露出](auto-exposure.md#debug-view)には `'autoexposure'`、[レンズフレア](lens-flare.md)には `'lensflare'` があります。

```javascript
cameraFrame.debug = 'depth';
cameraFrame.update();
```

デバッグ表示はエフェクトを有効にしたり、追加のテクスチャを生成したりしません。フレームがシーン深度を生成していなければ深度表示は黒になります。エフェクトの表示には、対応するエフェクトを有効にする必要があります。合成後の画像に戻すには、`debug` を `null` に設定して `update()` を呼び出します。Editor スクリプトでは **Rendering > Debug** を使用し、**None** を選択すると通常の出力に戻ります。

Gaussian Splat でフォグや被写界深度を使用する場合は、[シーン深度の要件](volumetric-fog.md#gaussian-splats)を参照してください。

## 例 {#examples}

- HDR と Bloom、LUT — HDR ブルームとカラールックアップテーブルをデモ

<EngineExample id="graphics/hdr" title="HDR と Bloom、LUT" />

- ポストプロセス — ブルーム、グレーディング、カラーエンハンス、色付きビネット、フリンジ、TAA を表示

<EngineExample id="graphics/post-processing" title="ポストプロセス" />

- アンビエントオクルージョン — SSAO の実装をデモ

<EngineExample id="graphics/ambient-occlusion" title="アンビエントオクルージョン" />

- 被写界深度 — 被写界深度エフェクトをデモ

<EngineExample id="graphics/depth-of-field" title="被写界深度" />

- 時間的反エイリアシング — TAA の実装をデモ

<EngineExample id="graphics/taa" title="時間的反エイリアシング" />

- ボリューメトリックフォグ — ディレクショナルライトに照らされる高さに応じたフォグ

<EngineExample id="graphics/volumetric-fog" title="ボリューメトリックフォグ" />

- ローカルライトのボリューメトリックフォグ — フォグ内で散乱するオムニとスポットライト

<EngineExample id="graphics/volumetric-fog-local-lights" title="ローカルライトのボリューメトリックフォグ" />

- ボリューメトリックフォグの光の筋 — 影のあるスポットライトのビームとライト Cookie

<EngineExample id="graphics/volumetric-fog-shafts" title="ボリューメトリックフォグの光の筋" />

- LUT グレーディング — Gaussian Splat シーンで 2 つのカラーグレードをクロスフェード

<EngineExample id="gaussian-splatting/lut-grading" title="LUT グレーディング" />

## カスタムポストプロセス

モダンなポストプロセスは、3 つの方法で拡張できます。ニーズに合うアプローチを選んでください。

### [カスタムエフェクト](custom-effects)

組み込みエフェクトと並べて、独自のエフェクトを `CameraFrame` の合成に追加します。エフェクトは単一の compose パスにシェーダーチャンクを追加するため、フルスクリーンパスが増えることはありません。

**向いている用途：** スクリーンスペースエフェクト、色調整、スタイライズされた表現。

### [パスを持つエフェクト](effect-passes)

フレームパスを持つエフェクトを作成し、シーンの前、不透明ジオメトリと半透明ジオメトリの間、シーンの後など、カメラフレームの各ステージでレンダリングします。

**向いている用途：** マルチパスエフェクト、低解像度でのエフェクト、シーンへの描画、複数フレームを蓄積するエフェクト。

### [カメラパス](/user-manual/graphics/advanced-rendering/frame-graph/camera-passes/)

`CameraFrame` を使わず、カメラのレンダリングを独自のフレームパスに置き換えます。カメラのレンダリング全体を完全に制御できます。

**向いている用途：** 完全カスタムのパイプライン、特殊なレンダリング、最大限の柔軟性。
