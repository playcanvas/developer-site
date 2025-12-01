---
title: グラフィックス
---

PlayCanvasは、ウェブ上で高性能な3Dレンダリングを提供する高度なグラフィックスエンジンを搭載しています。このエンジンは、[WebGL](https://developer.mozilla.org/en-US/docs/Web/API/WebGL_API)と[WebGPU](https://developer.mozilla.org/en-US/docs/Web/API/WebGPU_API)の両方をサポートし、すべてのモダンブラウザでの互換性を確保しつつ、最先端のグラフィックス機能を提供します。

## グラフィックスエンジン バックエンド

PlayCanvasエンジンは、複数のグラフィックスバックエンドをサポートしています。

* **WebGPU (ベータ版)** - ドライバーオーバーヘッドを低減し、コンピュートシェーダーをサポートする次世代グラフィックスAPI
* **WebGL 2.0** - すべてのブラウザとデバイスで[広くサポートされている](https://caniuse.com/webgl2)成熟したAPI
* **Null** - Nodeなどのヘッドレス環境でエンジンを実行する場合に使用します。

:::note[自動フォールバック]

エンジンは、ブラウザのサポート状況に基づいて、WebGPUからWebGLへシームレスにフォールバックします。

:::

## 主要なレンダリング機能

### 物理ベースレンダリング (PBR)

* メタリック/ラフネスおよびスペキュラー/グロッシネスワークフローによる包括的なPBRサポート
* エネルギー保存と物理的に正確なライティングモデル
* クリアコート、異方性、シアー、および透過マテリアルのサポート

### 高度なライティング

* **Clustered lighting system** - 数百の動的なライトを効率的に処理
* **Directional, point, and spot lights** (設定可能なシャドウとクッキー付き)
* **Area lights** - 現実的なライティングのための長方形、ディスク、球体形状の光源
* HDR環境マップを使用した**Image-based lighting (IBL)**
* 静的ライティング最適化のための**Runtime lightmap generation**

### ハイダイナミックレンジ (HDR) レンダリング

* 自動ガンマ補正による**Linear workflow**
* 互換性のあるデバイスでの**HDR display output**サポート
* ACES、Neutral、Linearなどの**Advanced tone mapping**オペレーター
* 包括的なポストプロセスパイプラインのための**CameraFrame system**

### モダンレンダリングパイプライン

* 高度なエフェクトを可能にする**Render passes architecture**
* **Multiple render targets (MRT)** のサポート
* **Depth pre-pass**および**temporal anti-aliasing (TAA)**
* 繰り返しジオメトリの効率的なレンダリングのための**Hardware instancing**
* ドローコールを削減するための**Static and dynamic batching**

### ポストプロセスエフェクト

CameraFrameシステムは、ポストプロセスエフェクトの完全なスイートを提供します。

* 物理的に正確なライトブリーディングを伴う**HDR Bloom**
* **Screen Space Ambient Occlusion (SSAO)**
* ボケ効果を伴う**Depth of Field (DoF)**
* 滑らかなエッジのための**Temporal Anti-Aliasing (TAA)**
* **Vignette, sepia, brightness/contrast**、およびカラーグレーディング

### 高度なレンダリング技術

* フォトリアリスティックなシーン再構築のための**3D Gaussian Splatting**
* 特殊効果のための**Hardware-accelerated particles**
* キャラクターアニメーションのための**Mesh skinning and morphing**
* 最適化されたプリミティブによる**Procedural geometry generation**
* Basis Universalによる**Texture compression**

### カスタムシェーダー

* GLSL (WebGL) と WGSL (WebGPU) の両方をサポートする**Flexible shader system**
* チャンクベースの構成による**Automatic shader generation**
* シェーダーバリアントとインクルードのための**Preprocessor support**
* GPU高速化計算のための**WebGPU compute shaders**

グラフィックスエンジンは、最新のウェブ標準とハードウェア機能を活用するために継続的に更新され、PlayCanvasアプリケーションがすべてのプラットフォームで卓越した視覚品質とパフォーマンスを提供することを保証します。
