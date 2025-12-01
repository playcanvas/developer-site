---
title: 影
---

スプラットはメッシュに影を落とすことができます (GSplatComponentの[castShadows](https://api.playcanvas.com/engine/classes/GSplatComponent.html#castshadows) プロパティを参照してください)。

![スプラットの影](/img/user-manual/gaussian-splatting/splat-shadows.png)

[スプラットの影 Engineサンプル](https://playcanvas.github.io/#/gaussian-splatting/simple) を表示します。

スプラットは直接影を受けることはできません (ただし、デプスバッファに書き込まれるスプラットを近似する不可視のメッシュを使って偽装することは可能です)。
