---
title: ammo.jsの以外の物理演算ライブラリ
description: プロジェクトで ammo.js のサイズやコストが高すぎる場合の、より軽い 2D／3D 物理エンジンの調査です。
---

:::ai

- **[Engine Development](/user-manual/ai/developing-with-engine/):** 「ammo.jsの以外の物理演算ライブラリ」について、次の要件を満たしてください: プロジェクトで ammo.js のサイズやコストが高すぎる場合の、より軽い 2D／3D 物理エンジンの調査であること アプリケーションを起動して動作を実行し、位置、衝突、ランタイムログを確認してください。
- **[VS Code Extension](/user-manual/ai/vscode-extension/):** 関連する物理スクリプトに「ammo.jsの以外の物理演算ライブラリ」の動作を実装し、次の要件を満たしてください: プロジェクトで ammo.js のサイズやコストが高すぎる場合の、より軽い 2D／3D 物理エンジンの調査であること。Push の前に完全な差分と診断を確認してください。
- **[Editor MCP Server](/user-manual/ai/editor-mcp-server/):** 「ammo.jsの以外の物理演算ライブラリ」に必要な Collision、Rigidbody、スクリプトデータを設定し、次の要件を満たしてください: プロジェクトで ammo.js のサイズやコストが高すぎる場合の、より軽い 2D／3D 物理エンジンの調査であること。シーンを起動して動作を実行し、ランタイム状態またはログを確認してください。

:::

ammo.jsはおそらく最も人気があり、よく知られたJavaScript物理エンジンです。高度に汎用性が高く、高精度シミュレーションを生成することができます。しかし、性能やメモリ要件が非常に高いため、アプリケーションに最適な選択肢かどうかを調査する必要があります。たとえば、2Dゲームを作成している場合、2D物理エンジンの方が適しているかもしれません。

実際、ammo.jsの代わりにはいくつかの選択肢があります。

| 物理エンジン                                     | JS       | WASM     | 2D       | 3D       | PlayCanvas Integration                                |
|----------------------------------------------------|----------|----------|----------|----------|-------------------------------------------------------|
| [box2d.js](https://github.com/kripken/box2d.js)    | &#x2713; | &#x2713; | &#x2713; |          |                                                       |
| [Matter.js](https://github.com/liabru/matter-js)   | &#x2713; |          | &#x2713; |          |                                                       |
| [p2.js](https://github.com/schteppe/p2.js)         | &#x2713; |          | &#x2713; |          | [Yes](https://github.com/playcanvas/playcanvas-p2.js) |
| [cannon.js](https://github.com/schteppe/cannon.js) | &#x2713; |          |          | &#x2713; |                                                       |
| [Oimo.js](https://github.com/lo-th/Oimo.js)        | &#x2713; |          |          | &#x2713; |                                                       |

現時点で、p2.jsエンジンのPlayCanvasインテグレーションが唯一存在しますが、同様の手法を使用して他のエンジン用の追加インテグレーションを簡単に作成できます。

2018年12月、Nvidiaは[PhysX](https://github.com/NVIDIAGameWorks/PhysX)物理エンジンをオープンソース化しました。現時点ではPhysXのJS/WASMポートはありませんが、Bullet/ammo.jsと比較して最も競争力がある物理ランタイムかもしれません。Webポートが利用可能になると、上記の表に追加されます。
