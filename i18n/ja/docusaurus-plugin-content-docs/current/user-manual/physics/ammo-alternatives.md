---
title: ammo.jsの以外の物理演算ライブラリ
description: プロジェクトで ammo.js のサイズやコストが高すぎる場合の、より軽い 2D／3D 物理エンジンの調査です。
---

ammo.jsはおそらく最も人気があり、よく知られたJavaScript物理エンジンです。高度に汎用性が高く、高精度シミュレーションを生成することができます。しかし、性能やメモリ要件が非常に高いため、アプリケーションに最適な選択肢かどうかを調査する必要があります。たとえば、2Dゲームを作成している場合、2D物理エンジンの方が適しているかもしれません。

実際、ammo.jsの代わりにはいくつかの選択肢があります。最も活発に開発されているものを先に、その後にほとんどメンテナンスされていないものの依然として使用可能な古いエンジンを記載しています。

| 物理エンジン                                             | Language   | JS Build | WASM Build | 2D | 3D | Determinism | PlayCanvas Integration                                |
| -------------------------------------------------- | ---------- | -------- | ---------- | -- | -- | ----------- | ----------------------------------------------------- |
| [Rapier](https://rapier.rs)                        | Rust       |          | ✔️          | ✔️  | ✔️  | ✔️           |                                                       |
| [Jolt](https://github.com/jrouwe/JoltPhysics.js)   | C++        | ✔️        | ✔️          |    | ✔️  | ✔️           |                                                       |
| [Box3D](https://github.com/erincatto/box3d)        | C          |          | ✔️          |    | ✔️  | ✔️           |                                                       |
| [PhysX](https://github.com/NVIDIA-Omniverse/PhysX) | C++        |          | ✔️          |    | ✔️  |             |                                                       |
| [box2d.js](https://github.com/kripken/box2d.js)    | C++        | ✔️        | ✔️          | ✔️  |    |             |                                                       |
| [Matter.js](https://github.com/liabru/matter-js)   | JavaScript | ✔️        |            | ✔️  |    |             |                                                       |
| [p2.js](https://github.com/schteppe/p2.js)         | JavaScript | ✔️        |            | ✔️  |    |             | [Yes](https://github.com/playcanvas/playcanvas-p2.js) |
| [cannon.js](https://github.com/schteppe/cannon.js) | JavaScript | ✔️        |            |    | ✔️  |             |                                                       |
| [Oimo.js](https://github.com/lo-th/Oimo.js)        | JavaScript | ✔️        |            |    | ✔️  |             |                                                       |

JavaScript以外で書かれたエンジンは、それぞれ別のバインディングプロジェクトによってブラウザ向けにコンパイルされています。Rapierは`@dimforge/rapier2d`と`@dimforge/rapier3d`、Joltは[JoltPhysics.js](https://github.com/jrouwe/JoltPhysics.js)、Box3Dは[box3d.js](https://github.com/isaac-mason/box3d.js)、PhysXは[physx-js-webidl](https://github.com/fabmax/physx-js-webidl)を使用します。このうちエンジンの作者自身がメンテナンスしているバインディングは、RapierとJoltのみです。

これらの多くはWebAssemblyのビルドのみを提供しています。ただし、EmscriptenはWebAssemblyの代わりに[asm.js](https://developer.mozilla.org/ja/docs/Games/Tools/asm.js)を出力できるため、Joltとbox2d.jsはJavaScriptのビルドも提供しています。asm.jsのビルドはJavaScriptが動作する環境であればどこでも実行でき、WebAssemblyのサポートを必要としませんが、同等のWebAssemblyビルドよりも低速でサイズも大きくなります。特別な理由がない限りWebAssemblyを選択してください。

:::info[Determinism]

上記のチェックマークは*クロスプラットフォーム*での決定性を意味します。つまり、どのデバイスでもシミュレーションが同一の結果を生成することであり、ロックステップ方式のネットワークマルチプレイやリプレイに必要です。これはエンジンのビルド方法に依存するため、依存する前に確認してください。

- Rapierの公式WebAssemblyパッケージは、標準でクロスプラットフォームな決定性に対応しています。
- Joltではコンパイル時に`CROSS_PLATFORM_DETERMINISTIC`を有効にする必要がありますが、ビルド済みのJoltPhysics.jsパッケージではこれが設定されていません。
- PhysXは特定のプラットフォームとビルドに限って決定性を保証しており、アーキテクチャをまたぐ決定性は明確にサポートしていません。

:::

現時点で、p2.jsエンジンのPlayCanvasインテグレーションが唯一存在しますが、同様の手法を使用して他のエンジン用の追加インテグレーションを簡単に作成できます。
