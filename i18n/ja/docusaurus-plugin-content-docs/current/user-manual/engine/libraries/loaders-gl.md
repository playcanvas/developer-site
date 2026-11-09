---
title: loaders.gl
description: 点群など、エンジン自体が読み込まないデータ形式をloaders.glのローダーでパースし、そのデータからエンジンのメッシュを作成します。
---

[loaders.gl](https://loaders.gl/) は、点群やメッシュから地理空間データやテーブルまで、多くのデータ形式に対応したローダーのコレクションです。OpenJS Foundationのもとにあるvis.glフレームワークの一部です。

loaders.glはデータをパースするだけです。ローダーは点群の位置や色などを、通常のJavaScriptオブジェクトと型付き配列として返し、何もレンダリングしません。データを表示するには、配列からエンジンの [`Mesh`](https://api.playcanvas.com/engine/classes/Mesh.html) を作成し、メッシュインスタンスでレンダリングします。

glTFやGLBのモデル、圧縮テクスチャ、ガウシアンスプラットはエンジン自体が読み込むため、それらにはエンジンのローダーを使い、エンジンが読み込まない形式にloaders.glを使ってください。

## サンプル

このサンプルは、Draco圧縮された点群をloaders.glで読み込み、その点をカスタムシェーダーでレンダリングします:

<EngineExample id="integrations/loaders-gl" title="loaders.gl" />

利用できるローダーとその使い方は、[loaders.glのドキュメント](https://loaders.gl/docs)を参照してください。
