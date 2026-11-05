---
title: アドオンライブラリ
description: エンジンと組み合わせて使うライブラリ - Spineのスケルタルアニメーション、3DTilesRendererJSによる3D Tilesのストリーミング、トゥイーン、loaders.glによるデータの読み込み。
---

エンジンは、レンダリング、物理、オーディオ、入力など、リアルタイムアプリに必要なものを備えています。一方で、エンジンと組み合わせて使う別のライブラリのほうが適している機能もあります。それらのライブラリの一部はPlayCanvasがメンテナンスしており、その他はPlayCanvasへの対応を独自に備えたサードパーティのプロジェクトです。

| ライブラリ | 追加される機能 | メンテナンス |
| --- | --- | --- |
| [Spine](/user-manual/engine/libraries/spine/) | Spineエディターで作成した2Dスケルタルアニメーション。playcanvas-spineプラグインで再生します | PlayCanvas (プラグイン)、Esoteric Software (Spine) |
| [3D Tiles](/user-manual/engine/libraries/3d-tiles/) | フォトグラメトリや都市モデルなど、大規模な3Dデータセットのストリーミング。3DTilesRendererJSを使用します | NASA-AMMOS |
| [トゥイーン](/user-manual/engine/libraries/tween/) | エンティティのトランスフォームやその他の値の時間経過によるアニメーション。playcanvas-tweenを使用します | PlayCanvas |
| [loaders.gl](/user-manual/engine/libraries/loaders-gl/) | 多くのデータ形式のパーサー。読み込んだデータからエンジンのメッシュを作成します | vis.gl (OpenJS Foundation) |

これらのライブラリは `playcanvas` npmパッケージには含まれていません。それぞれ個別にインストールされ、個別にバージョン管理されているため、対応するエンジンのバージョンは各ページやリポジトリで確認してください。

[エンジンのサンプル](https://playcanvas.com/examples)の **Integrations** カテゴリーで、これらのライブラリを使用した例を確認できます。
