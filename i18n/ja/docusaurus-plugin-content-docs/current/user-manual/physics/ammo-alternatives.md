---
title: ammo.jsの以外の物理演算ライブラリ
description: プロジェクトで ammo.js のサイズやコストが高すぎる場合の、より軽い 2D／3D 物理エンジンの調査です。
---

:::ai

- **[VS Code Extension](/user-manual/ai/vscode-extension/):** 「ammo.jsの以外の物理演算ライブラリ」で使用する Physics Script を Pull/Push モードでローカル編集し、変更を確認できます。
- **[Editor MCP Server](/user-manual/ai/editor-mcp-server/):** Physics 設定を有効化し、Collision と Rigidbody Component を作成、設定して、起動後のランタイム状態やログを確認できます。

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
