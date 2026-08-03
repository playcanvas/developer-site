---
title: ammo.jsの以外の物理演算ライブラリ
description: プロジェクトで ammo.js のサイズやコストが高すぎる場合の、より軽い 2D／3D 物理エンジンの調査です。
---

ammo.jsはおそらく最も人気があり、よく知られたJavaScript物理エンジンです。高度に汎用性が高く、高精度シミュレーションを生成することができます。しかし、性能やメモリ要件が非常に高いため、アプリケーションに最適な選択肢かどうかを調査する必要があります。たとえば、2Dゲームを作成している場合、2D物理エンジンの方が適しているかもしれません。

実際、ammo.jsの代わりにはいくつかの選択肢があります。最も活発に開発されているものを先に、その後にほとんどメンテナンスされていないものの依然として使用可能な古いエンジンを記載しています。

| 物理エンジン                                             | JS | WASM | 2D | 3D | PlayCanvas Integration                                |
| -------------------------------------------------- | -- | ---- | -- | -- | ----------------------------------------------------- |
| [Rapier](https://rapier.rs)                        |    | ✔️    | ✔️  | ✔️  |                                                       |
| [Jolt](https://github.com/jrouwe/JoltPhysics.js)   | ✔️  | ✔️    |    | ✔️  |                                                       |
| [Box3D](https://github.com/erincatto/box3d)        |    | ✔️    |    | ✔️  |                                                       |
| [box2d.js](https://github.com/kripken/box2d.js)    | ✔️  | ✔️    | ✔️  |    |                                                       |
| [Matter.js](https://github.com/liabru/matter-js)   | ✔️  |      | ✔️  |    |                                                       |
| [p2.js](https://github.com/schteppe/p2.js)         | ✔️  |      | ✔️  |    | [Yes](https://github.com/playcanvas/playcanvas-p2.js) |
| [cannon.js](https://github.com/schteppe/cannon.js) | ✔️  |      |    | ✔️  |                                                       |
| [Oimo.js](https://github.com/lo-th/Oimo.js)        | ✔️  |      |    | ✔️  |                                                       |

上位3つはいずれもネイティブ言語で書かれており、WebAssemblyとしてブラウザで動作します。また、クロスプラットフォームな決定性 (determinism) に対応しているため、ネットワークマルチプレイやリプレイのように再現性のあるシミュレーションが必要な場合に有用です。

- **Rapier** はRustで書かれており、2D (`@dimforge/rapier2d`) と3D (`@dimforge/rapier3d`) の両方に対応した公式のWebAssemblyバインディングを提供しています。
- **Jolt** はC++で書かれており、[JoltPhysics.js](https://github.com/jrouwe/JoltPhysics.js)によってWebに公開されています。WebAssemblyとasm.jsの両方のビルドが提供されています。
- **Box3D** はBox2Dの作者によってC言語で書かれています。ここに挙げた中では最も新しく、2026年6月に最初のリリースである0.1.0に到達しました。また、[box3d.js](https://github.com/isaac-mason/box3d.js) WebAssemblyバインディングはサードパーティ製で、まだ初期の0.0.x版です。APIの破壊的変更が予想されます。

現時点で、p2.jsエンジンのPlayCanvasインテグレーションが唯一存在しますが、同様の手法を使用して他のエンジン用の追加インテグレーションを簡単に作成できます。

2018年12月、Nvidiaは[PhysX](https://github.com/NVIDIAGameWorks/PhysX)物理エンジンをオープンソース化しました。現時点ではPhysXのJS/WASMポートはありませんが、Bullet/ammo.jsと比較して最も競争力がある物理ランタイムかもしれません。Webポートが利用可能になると、上記の表に追加されます。
