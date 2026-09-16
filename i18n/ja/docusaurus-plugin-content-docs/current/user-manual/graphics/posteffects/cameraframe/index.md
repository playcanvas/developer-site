---
title: モダンなポストプロセス
description: "CameraFrame HDR スタック：ボリューメトリックフォグ、ブルーム、SSAO、TAA、被写界深度、カラーエンハンス、グレーディング、カスタマイズ。"
---

PlayCanvas では、視覚的に高度でパフォーマンスのよいモダンなポストプロセスのワークフローを提供しています。主な方法は、組み込みエフェクト付きの HDR ポストプロセスに [`CameraFrame`](https://api.playcanvas.com/engine/classes/CameraFrame.html) クラスを使うことですが、完全な制御のために独自のレンダーパスを作成することもできます。

## 機能

`CameraFrame` では、次のような高度なレンダリング手法が利用できます。

- **Bloom** — 明るい光源の自然な光彩をシミュレートする、HDR 物理ベースのブルーム
- **[ボリューメトリックフォグ](volumetric-fog.md)** — ディレクショナル、オムニ、スポットライトで照らされる高さに応じたフォグと光の筋
- **SSAO（Screen Space Ambient Occlusion）** — 環境光の遮蔽をシミュレートして奥行き感を強調
- **被写界深度（DoF）** — カメラのフォーカスを模し、焦点面の外側をぼかす
- **時間的反エイリアシング（TAA）** — 時間方向にエッジを平滑化し、ギザつきを軽減
- **ビネット** — `vignette.color` で指定した色に向かって画像の端をブレンド
- **カラーグレーディング** — 明るさ、コントラスト、彩度、色味を調整してスタイルを付与
- **[カラーエンハンス](#color-enhance)** — HDR でシャドウ、ハイライト、中間調、自然な彩度、かすみの除去を調整
- **カラー LUT** — 高度な色変換のためにルックアップテーブルを適用。詳細は [HDR レンダリング > カラー LUT](/user-manual/graphics/linear-workflow/hdr-rendering/#color-lut) を参照してください。
- **フリンジ** — 色チャンネルの分離をシミュレートする色収差
- **トーンマッピング** — HDR の色を表示可能な範囲へマッピングする方法を制御
- **シャープネス** — TAA やアップスケールによるぼけを抑えるため画像の鮮明さを強調

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

### デバッグ表示 {#debug-views}

`cameraFrame.debug` に `'scene'`、`'ssao'`、`'bloom'`、`'vignette'`、`'dofcoc'`（被写界深度の錯乱円）、`'dofblur'`、`'depth'` のいずれかを設定すると、中間結果を確認できます。

```javascript
cameraFrame.debug = 'depth';
cameraFrame.update();
```

デバッグ表示はエフェクトを有効にしたり、追加のテクスチャを生成したりしません。フレームがシーン深度を生成していなければ深度表示は黒になります。エフェクトの表示には、対応するエフェクトを有効にする必要があります。合成後の画像に戻すには、`debug` を `null` に設定して `update()` を呼び出します。Editor スクリプトでは **Rendering > Debug** を使用し、**None** を選択すると通常の出力に戻ります。

Gaussian Splat でフォグや被写界深度を使用する場合は、[シーン深度の要件](volumetric-fog.md#gaussian-splats)を参照してください。

## 例

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

モダンなポストプロセスは、いくつかの方法でカスタマイズ・拡張できます。ニーズに合うアプローチを選んでください。

### [Compose シェーダーのカスタマイズ](compose-shader)

最終の compose パスにだけエフェクトを追加して `CameraFrame` を拡張します。追加のレンダーパスが不要な場合に最も簡単な方法です。

**向いている用途：** 単純なスクリーンスペースエフェクト、色調整、迅速なプロトタイピング。

### [FramePassCameraFrame クラスの拡張](extending-class)

カスタムフレームパスを追加して `CameraFrame` を拡張します。組み込みエフェクトを活かしつつ、追加のレンダリング手法を組み込めます。

**向いている用途：** マルチパスエフェクト、高度な連携、中間結果の処理。

### [カスタムレンダーパス](custom-passes)

`CameraFrame` を使わず、完全なカスタムポストプロセススタックを構築します。レンダリングパイプライン全体を完全に制御できます。

**向いている用途：** 完全カスタムのパイプライン、特殊なレンダリング、最大限の柔軟性。
