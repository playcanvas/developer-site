---
title: 推奨ツール
description: "Gaussian splatsの学習とエクスポート向けサードパーティツール：比較表、キャプチャアプリ、PlayCanvasが同梱しない研究パイプラインです。"
---

PlayCanvas自体は、写真や動画をGaussian splatに変換するツールを提供していません。しかし、それぞれに長所と短所がある、豊富な種類のサードパーティツールから選択できます。

## 簡単な比較

| ツール | 難易度 | プラットフォーム | 費用 | オープンソース | 主な用途 | 要件 |
|------|------------|-----------|------| :-----: |-------------|--------------|
| [**Polycam**](https://poly.cam/) | 簡単 | iOS, Android, Web | フリーミアム | ❌ | キャプチャ + トレーニング | モバイルデバイス |
| [**Scaniverse**](https://scaniverse.com/) | 簡単 | iOS, Android, Web | フリーミアム | ❌ | キャプチャ + トレーニング | モバイルデバイス |
| [**RealityScan**](https://www.realityscan.com/) | 中級 | Win | 無料* | ❌ | カメラポーズ | |
| [**Postshot**](https://www.jawset.com/) | 中級 | Win | フリーミアム† | ❌ | カメラポーズ + トレーニング | CUDA GPU |
| [**LichtFeld Studio**](https://lichtfeld.io/) | 中級 | Win, Linux | ソース無料 / インストーラー有料 | ✔️ | トレーニング | CUDA GPU |
| [**Spirula Studio**](https://github.com/harry7557558/spirula-studio) | 中級 | Win, Linux, macOS | 無料 | ✔️ | カメラポーズ + トレーニング | |
| [**Brush**](https://github.com/ArthurBrussee/brush) | 中級 | Win, Linux, macOS, Android, Web | 無料 | ✔️ | トレーニング | |
| [**COLMAP**](https://colmap.github.io/) | 上級 | Win, Linux, macOS | 無料 | ✔️ | カメラポーズ | |
| [**nerfstudio**](https://docs.nerf.studio/) | 上級 | Linux, Win | 無料 | ✔️ | 研究/トレーニング | CUDA GPU |
| [**INRIA Tools**](https://repo-sam.inria.fr/fungraph/3d-gaussian-splatting/) | 上級 | Win, Linux | 無料（非商用） | ❌ | 研究/リファレンス | CUDA GPU |

*_RealityScanは、年間総収益100万米ドル未満の個人および企業による商用利用も無料です。_

†_Postshotの無料プランは非商用利用に限られ、splatをエクスポートできません。_

## 簡単/一般ユーザー向けツール

これらのツールは、技術的な専門知識なしでGaussian splatを素早く作成したいユーザー向けに設計されています。

[**Polycam**](https://poly.cam/) (iOS, Android, Web)  
写真や動画からGaussian splatを作成する商用のキャプチャアプリおよびWebプラットフォームで、組み込みの編集ツールと簡単な共有機能を備えています。1回のキャプチャで使える画像の枚数はプランによって異なり、無料プランの150枚からBusinessプランの2,000枚までです。

:::important

Polycamからsplatキャプチャをダウンロードする際は、**PLY**形式を選択してください。

:::

[**Scaniverse**](https://scaniverse.com/) (iOS, Android, Web)  
Niantic Spatialによるキャプチャアプリで、Gaussian splatのトレーニングをデバイス上で行います。無料プランでも、デバイス上でのキャプチャと処理は無制限です。有料プランでは、360°カメラの動画からのsplat生成を含むクラウド処理が利用できます。splatはPLY形式でエクスポートできます。

## 中級/プロ向けツール

これらのツールは、一般ユーザー向けのキャプチャアプリより多くの制御とカスタマイズを提供しつつ、プロフェッショナルなワークフローでも扱いやすいセットアップに収まっています。

[**RealityScan**](https://www.realityscan.com/) (Windows)  
Epic Gamesによる、カメラのアライメントとスパース点群生成のためのデスクトップアプリケーションです。splatのトレーニング自体は行いませんが、そのカメラポーズ（COLMAP形式でエクスポート）は、Postshot、LichtFeld Studio、Brushなどのツールでsplatトレーニングの基盤となります。アライメントはCUDA GPUなしで動作し、対応GPUが必要なのはRealityScanのメッシュ化とテクスチャリングの工程だけです。

[**Postshot**](https://www.jawset.com/) (Windows)  
カメラトラッキングとsplatトレーニングの両方をデバイス上で行う商用デスクトップアプリケーションで、迅速な結果とユーザーフレンドリーなインターフェースを提供します。splatはPLY形式でエクスポートできます。無料プランは非商用で、splatをエクスポートできないため、結果をPlayCanvasに取り込むには有料プランが必要です。Compute Capability 7.5以上のNVIDIA GPU（RTX 2060以降）が必要です。

[**LichtFeld Studio**](https://lichtfeld.io/) (Windows, Linux)  
3D Gaussian Splatsをトレーニング、編集、レンダリングするためのオープンソースのデスクトップアプリケーションです。変形、クロップ、選択ツールを含む編集スイートを備えています。カメラポーズは自身では計算せず、既存のCOLMAPデータセットからトレーニングし、PLYおよびSOG形式でエクスポートできます。[LichtFeld Studio向けSuperSplatプラグイン](https://github.com/playcanvas/supersplat-lichtfeld-plugin)を使うと、シーンをSuperSplatに直接公開できます。CUDA 12.8+搭載のNVIDIA GPUが必要です。

[**Spirula Studio**](https://github.com/harry7557558/spirula-studio) (Windows, Linux, macOS)  
写真や動画から学習済みのsplatまでを、1つの自己完結型バイナリで処理するオープンソースのデスクトップアプリケーションです。動画からのフレーム抽出、Structure-from-Motion、AIマスキングを内蔵しています。Vulkanを介してNVIDIA、AMD、Intel、Apple SiliconのGPUで動作するためCUDAは不要で、魚眼カメラや360°カメラにもネイティブ対応しています。既存のCOLMAP、Nerfstudio、Metashapeのデータセットからトレーニングすることもでき、PLY形式でエクスポートできます。

[**Brush**](https://github.com/ArthurBrussee/brush) (Windows, Linux, macOS, Android, Web)  
幅広いデバイス互換性を持つオープンソースのクロスプラットフォームエンジンです。WebGPUベースのレンダリングを使用し、リアルタイムのトレーニング可視化を提供し、CUDAへの依存がなく、ブラウザをサポートし、モバイルデバイスでも動作します。既存のCOLMAPまたはNerfstudio形式のデータセットのカメラポーズを使用し、Brush自体はカメラポーズを生成しません。

## 上級/テクニカルツール

これらのツールは、より複雑なセットアップやコマンドラインツールに慣れたユーザー向けの、柔軟な低レベルまたは研究志向のワークフローです。

[**COLMAP**](https://colmap.github.io/) (Windows, Linux, macOS)  
カメラのアライメントとスパース点群生成のためのオープンソースのStructure-from-Motion (SfM) パイプラインです。クロスプラットフォーム互換性、高品質な再構築、コマンドラインおよびGUIインターフェースを提供し、多くのワークフローにおいてsplatトレーニングの基盤となります。特にWindows以外のシステムを使用するユーザーにとって価値があります。

[**nerfstudio**](https://docs.nerf.studio/) (Linux, Windows)  
NeRFとGaussian splatの手法のためのオープンソースの研究フレームワークで、splatの手法はSplatfactoと呼ばれます。コマンドラインで操作し、高度にカスタマイズ可能です。データ処理の段階でCOLMAPを使ってカメラポーズを計算でき、トレーニング済みのsplatをPLY形式でエクスポートします。主なプラットフォームはLinuxで、Windowsでの動作はあまりテストされていません。CUDA GPUが必要です。

[**INRIA Tools**](https://repo-sam.inria.fr/fungraph/3d-gaussian-splatting/) (Windows, Linux)  
3D Gaussian Splatting論文のオリジナルの参照実装です。カメラポーズの計算にはCOLMAPを使用します。研究レベルの品質と完全なパラメータ制御を提供しますが、複雑なセットアップとCUDA GPU（論文と同等の品質には24 GBのVRAM）が必要なため、実験向けです。ソースコードは公開されていますが、ライセンスで認められているのは研究と評価目的の利用のみで、商用利用はできません。

## PLYファイルの出力

このページでsplatをトレーニングするツールはすべて、結果をPLYファイルとしてエクスポートできます。COLMAPとRealityScanが生成するのは、それらのトレーナーの出発点となるカメラポーズと点群だけです。PLY形式は3D Gaussian Splatsの標準交換フォーマットであり、異なるアプリケーションやワークフロー間でシーンを移動できます。これらのファイルの内容と扱い方については、[PLY形式](../formats/ply.md)を参照してください。
