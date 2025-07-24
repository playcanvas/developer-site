---
title: 影
sidebar_position: 3
---

スプラットはメッシュに影を落とすことができます (GSplatComponentの[castShadows](https://api.playcanvas.com/engine/classes/GSplatComponent.html#castshadows)プロパティを参照してください)。

![スプラットの影](/img/user-manual/gaussian-splatting/splat-shadows.png)

[スプラットの影エンジンの例](https://playcanvas.github.io/#/gaussian-splatting/simple)をご覧ください。

スプラットは直接影を受け取ることはできません (ただし、デプスバッファに書き込まれるスプラットを近似する不可視メッシュを使用して、それを偽装することはできます)。
