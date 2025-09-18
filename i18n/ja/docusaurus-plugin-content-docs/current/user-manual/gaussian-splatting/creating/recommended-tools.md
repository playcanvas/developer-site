---
title: 推奨ツール
---

PlayCanvas自体は、フォトグラメトリをGaussian splatに変換するツールを提供していません。しかし、それぞれに長所と短所がある、豊富な種類のサードパーティツールから選択できます。

## 簡単な比較

| ツール | 難易度 | プラットフォーム | 費用 | オープンソース | 主な用途 | 要件 |
|------|------------|-----------|------| :-----: |-------------|--------------|
| [**Polycam**](https://poly.cam/) | 簡単 | iOS, Android, Web | フリーミアム | ❌ | キャプチャ + トレーニング | モバイルデバイス |
| [**Luma AI**](https://lumalabs.ai/app) | 簡単 | iOS, Android, Web | フリーミアム | ❌ | キャプチャ + トレーニング | モバイルデバイス |
| [**COLMAP**](https://colmap.github.io/) | 上級 | Win, Linux, macOS | 無料 | ✔️ | カメラポーズ | |
| [**RealityScan**](https://www.realityscan.com/) | 上級 | Win | 無料* | ❌ | カメラポーズ | CUDA GPU |
| [**Postshot**](https://www.jawset.com/) | 上級 | Win | 無料** | ❌ | カメラポーズ + トレーニング | CUDA GPU |
| [**Brush**](https://github.com/ArthurBrussee/brush) | 上級 | Win, Linux, macOS, Web | 無料 | ✔️ | カメラポーズ + トレーニング | |
| [**nerfstudio**](https://docs.nerf.studio/) | 上級 | Win, Linux, macOS | 無料 | ✔️ | 研究/トレーニング | |
| [**INRIA Tools**](https://repo-sam.inria.fr/fungraph/3d-gaussian-splatting/) | 上級 | Win, Linux | 無料 | ✔️ | 研究/リファレンス | CUDA GPU |

*_非商用利用は無料_  
**_ベータ版の間は無料_

## 簡単/一般ユーザー向けツール

これらのツールは、技術的な専門知識なしでGaussian splatを素早く作成したいユーザー向けに設計されています。

[**Polycam**](https://poly.cam/) (iOS, Android, Web)  
Gaussian splatを作成するためのユーザーフレンドリーなインターフェースを備えた商用プラットフォームです。機能には、制限付きの無料ティア、高品質向けのプロティア、最大2000画像のサポート、組み込みの編集ツール、簡単な共有とエクスポートが含まれます。

:::important

Polycamからのエクスポート時に**splat PLY**を選択してください。

:::

[**Luma AI**](https://lumalabs.ai/app) (iOS, Android, Web)  
簡単なキャプチャのためのモバイルアプリを備えたAI駆動型クラウドサービスです。キャプチャ用モバイルアプリ、クラウド処理、高品質な結果、ビデオ入力サポート、ゲームエンジン統合を提供します。

:::important

Lumaからのエクスポート時に**Gaussian Splat**を選択し、ダウンロードしたZIPファイルからPLYファイルを抽出してください。

:::

## 上級/プロ向けツール

これらのツールは、より多くの制御とカスタマイズを提供しますが、技術的な知識が必要であり、プロフェッショナルなワークフローに適しています。

[**COLMAP**](https://colmap.github.io/) (Windows, Linux, macOS)  
カメラのアライメントとスパース点群生成のためのオープンソースのStructure-from-Motion (SfM) パイプラインです。クロスプラットフォーム互換性、高品質な再構築、コマンドラインおよびGUIインターフェースを提供し、多くのワークフローにおいてsplatトレーニングの基盤となります。特にWindows以外のシステムを使用するユーザーにとって価値があります。

[**RealityScan**](https://www.realityscan.com/) (Windows)  
カメラのアライメントとスパース点群生成のためのデスクトップアプリケーションで、PostShotなどのツールでsplatトレーニングの基盤となります。非商用利用は無料です。CUDA対応GPUが必要です。

[**Postshot**](https://www.jawset.com/) (Windows)  
高度な機能を持つGaussian splatを作成するためのデスクトップアプリケーションです。現在ベータ版で無料で使用できます。デバイス上での処理、迅速な結果、ユーザーフレンドリーなインターフェースを提供します。CUDA対応GPUが必要です。

[**Brush**](https://github.com/ArthurBrussee/brush) (Windows, Linux, macOS, Android, Web)  
幅広いデバイス互換性を持つオープンソースのクロスプラットフォームエンジンです。WebGPUベースのレンダリングを使用し、リアルタイムのトレーニング可視化を提供し、CUDAへの依存がなく、ブラウザをサポートし、モバイルデバイスでも動作します。

[**nerfstudio**](https://docs.nerf.studio/) (Windows, Linux, macOS)  
様々なsplatモデルのトレーニングのためのオープンソースの研究フレームワークです。コマンドラインインターフェース、複数のモデルタイプ、高度にカスタマイズ可能な設定、研究志向のアプローチ、活発な開発コミュニティが特徴です。

[**INRIA Tools**](https://repo-sam.inria.fr/fungraph/3d-gaussian-splatting/) (Windows, Linux)  
3D Gaussian Splatting論文のオリジナルの参照実装です。COLMAPに依存しています。研究レベルの品質、CUDA高速化、完全なパラメータ制御を提供しますが、複雑なセットアップが必要であり、実験に最適です。

## PLYファイルの出力

これらのツールはすべて、トレーニング済みのGaussian splatシーンをPLYファイル形式で出力できます。PLY形式は3D Gaussian Splatsの標準交換フォーマットとして機能し、異なるアプリケーションやワークフロー間で作成物を移動することを可能にします。これらのツールが何を生成しているのか、そして結果のファイルを効果的に扱う方法をよりよく理解するために、[PLY形式](../formats/ply.md)について詳しく見ていきましょう。
