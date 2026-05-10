---
title: モダンなポストプロセス
description: "CameraFrame HDR スタック：ブルーム、SSAO、TAA、被写界深度、グレーディング、例、およびカスタマイズの入口。"
---

PlayCanvas では、視覚的に高度でパフォーマンスのよいモダンなポストプロセスのワークフローを提供しています。主な方法は、組み込みエフェクト付きの HDR ポストプロセスに [`CameraFrame`](https://api.playcanvas.com/engine/classes/CameraFrame.html) クラスを使うことですが、完全な制御のために独自のレンダーパスを作成することもできます。

## 機能

`CameraFrame` では、次のような高度なレンダリング手法が利用できます。

- **Bloom** — 明るい光源の自然な光彩をシミュレートする、HDR 物理ベースのブルーム
- **SSAO（Screen Space Ambient Occlusion）** — 環境光の遮蔽をシミュレートして奥行き感を強調
- **被写界深度（DoF）** — カメラのフォーカスを模し、焦点面の外側をぼかす
- **時間的反エイリアシング（TAA）** — 時間方向にエッジを平滑化し、ギザつきを軽減
- **ビネット** — 画像の端を暗くしたり明るくしたりして視線を中央へ誘導
- **カラーグレーディング** — 明るさ、コントラスト、彩度、色味を調整してスタイルを付与
- **カラー LUT** — 高度な色変換のためにルックアップテーブルを適用
- **フリンジ** — 色チャンネルの分離をシミュレートする色収差
- **トーンマッピング** — HDR の色を表示可能な範囲へマッピングする方法を制御
- **シャープネス** — TAA やアップスケールによるぼけを抑えるため画像の鮮明さを強調

## セットアップと使い方

`CameraFrame` の設定と利用の詳細は、[HDR レンダリング](/user-manual/graphics/linear-workflow/hdr-rendering/)ガイドと [CameraFrame API ドキュメント](https://api.playcanvas.com/engine/classes/CameraFrame.html)を参照してください。

Editor 利用者向けには、すぐ使える Script があります。設定手順は [Editor での CameraFrame](/user-manual/graphics/linear-workflow/hdr-rendering/#cameraframe-in-the-editor)を参照してください。

## 例

- [HDR と Bloom、LUT](https://playcanvas.github.io/#/graphics/hdr) — HDR ブルームとカラールックアップテーブルをデモ
- [ポストプロセス](https://playcanvas.github.io/#/graphics/post-processing) — ブルーム、グレーディング、ビネット、フリンジ、TAA など複数のエフェクトを表示
- [アンビエントオクルージョン](https://playcanvas.github.io/#/graphics/ambient-occlusion) — SSAO の実装をデモ
- [被写界深度](https://playcanvas.github.io/#/graphics/depth-of-field) — 被写界深度エフェクトをデモ
- [時間的反エイリアシング](https://playcanvas.github.io/#/graphics/taa) — TAA の実装をデモ

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
