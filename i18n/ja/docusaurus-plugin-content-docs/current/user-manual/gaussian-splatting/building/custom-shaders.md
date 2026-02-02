---
title: カスタムシェーダー
---

PlayCanvas EngineはGaussian Splats向けにカスタムシェーダーをサポートしており、高度な視覚効果を作成し、標準の実装を超えてレンダリング動作をカスタマイズできます。

:::note Non-Unified Rendering Only

This page covers shader customization for **non-unified rendering** (when `entity.gsplat.unified = false`). Each component has its own material that can be customized independently.

For **unified rendering**, see [Work Buffer Rendering](/user-manual/gaussian-splatting/building/unified-rendering/work-buffer-rendering) which provides similar customization capabilities through a global render modifier.

:::

## 例

ここでは、カスタムシェーダー技術を示す例をいくつか紹介します。

### アニメーション効果

[**シンプルな正弦波アニメーション**](https://playcanvas.github.io/#/gaussian-splatting/multi-splat) - 正弦波を使用してGaussianの色と位置をアニメーション化するシンプルなシェーダーを適用します。この例では、リアルタイムでスプラットのプロパティを変更することで、動的でプロシージャルなモーション効果を作成する方法を示しています。
