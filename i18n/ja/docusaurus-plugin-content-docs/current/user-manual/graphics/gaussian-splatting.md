---
title: 3D Gaussian Splatting
sidebar_position: 3.5
---

3D Gaussian Splattingは、フォトリアリスティックなボリュメトリック点群をキャプチャしてレンダリングするための比較的新しい技術です。この技術はフォトグラメトリーに依存しているため、高品質なレンダリングシーンを非常に迅速、安価、かつ簡単に生成できます。

<div className="iframe-container">
    <iframe width="560" height="315" src="https://www.youtube.com/embed/Pe4Sx8t1Ud4" title="Templates Overview" allowfullscreen></iframe>
</div>

## Gaussian Splatsの操作

### スプラットの作成

スプラットはバイナリの[PLY](https://en.wikipedia.org/wiki/PLY_(file_format))ファイルに保存されます。独自のスプラットを生成するにはいくつかの方法があります。

#### 1. キャプチャアプリを使用する

[Polycam](https://poly.cam/)や[Luma](https://lumalabs.ai/)のようなスプラットキャプチャアプリを使用してください。Lumaでは、「Gaussian Splat」としてエクスポートし、ダウンロードしたZIPファイルからPLYファイルを抽出します。Polycamでは、「splat PLY」としてエクスポートします。

#### 2. Inriaツールを使用する

Inriaの[SIGGRAPH 2023の論文](https://repo-sam.inria.fr/fungraph/3d-gaussian-splatting/)は、一連の画像からスプラットを生成するためにダウンロードして使用できる[GitHub](https://github.com/graphdeco-inria/gaussian-splatting)上のツールセットにリンクしています。これらのツールはセットアップと使用がより複雑ですが、スプラット生成プロセスに対してきめ細やかな制御を提供します。

### スプラットの編集

キャプチャされたスプラットは通常、ある程度編集する必要があります。生成プロセスでは、誤った位置にスプラットが作成されることがよくあるため（「フローター」と呼ばれることもあります）、これらの浮遊スプラットを削除できると便利です。また、キャプチャされたスプラット内の特定のオブジェクト（人物など）を分離し、背景を完全に削除することが望ましい場合もあります。

![SuperSplat](/img/user-manual/graphics/gaussian-splatting/supersplat.png)

PlayCanvasは、[SuperSplat](https://playcanvas.com/supersplat/editor)という強力な3D Gaussian Splatエディタを提供しています。SuperSplatは、[GitHub](https://github.com/playcanvas/supersplat)でMITライセンスの下でオープンソース化されています。

### スプラットのインポート

PLYスプラットファイルをインポートするには：

1. エディタの[Asset Panel](../../editor/interface/assets)にドラッグします。
2. 作成された[GSplat asset](../../assets/types/gsplat)を[Viewport](../../editor/interface/viewport)にドラッグします。これにより、Hierarchy内に、GSplat assetが割り当てられた[GSplat component](../../scenes/components/gsplat)を持つEntityが自動的に作成されます。

![Import Gaussian Splat](/img/user-manual/graphics/gaussian-splatting/import-gsplat.webp)

## パフォーマンス

スプラットのレンダリングは、CPUとGPUの両方でコストがかかる場合があります。良好なパフォーマンスを達成するためのいくつかの戦略を以下に示します。

- シーン内のGaussiansの数に注意してください。すべてのGaussianはフレームごとにカメラの深度に基づいてソートされます。[Inspector](../../assets/types/gsplat/#asset-inspector)を使用して、特定のGSplat assetに含まれる数を確認できます。SuperSplatを使用して、不要なGaussiansをPLYファイルから削除してください。
- Scene Settingsで`Anti-Alias`を無効にします。アンチエイリアシングはGPUに負荷がかかり、スプラットのレンダリングにはほとんどメリットがありません。
- Scene Settingsで`Device Pixel Ratio`を無効にします。これにより、GPUが処理する必要があるピクセルの総数が減少します。

## 制限事項

スプラットを扱う際に留意すべきいくつかの制限事項があります。

1. フォグは効果がありません。
2. ダイナミックライトは効果がありません。
3. [Image Based Lighting](../physical-rendering/image-based-lighting)は効果がありません。
4. スプラットは影を落としません。
