---
title: メッシュ
description: メッシュが保持するもの、メッシュの入手方法、共有のされ方について説明します。
---

[`Mesh`](https://api.playcanvas.com/engine/classes/Mesh.html)はジオメトリを保持します。頂点バッファ、省略可能なインデックスバッファ、そしてそれらを三角形、ライン、ポイントとしてどう描画するかを記述するプリミティブです。メッシュ自体はマテリアルも位置も持たないため、同じメッシュを異なる場所で異なるマテリアルを使って何度でも描画できます。

## メッシュの入手方法

### プリミティブ形状 {#primitive-shapes}

`type`が`box`、`capsule`、`cone`、`cylinder`、`plane`、`sphere`、`torus`のRenderコンポーネントは、その形状の組み込みメッシュを描画します。

```javascript
const box = new Entity('Box');
box.addComponent('render', { type: 'box' });
app.root.addChild(box);
```

<EngineExample id="graphics/shapes" title="Primitive Shapes" />

### 読み込んだモデル {#loaded-models}

GLBはコンテナアセットとして読み込まれ、そのレンダーアセットがメッシュを保持します。`asset.resource.instantiateRenderEntity()`は、それぞれのメッシュに対してRenderコンポーネントを持つエンティティの階層を作成します。[Render Asset](https://playcanvas.github.io/#/graphics/render-asset)のサンプルを参照してください。

### コードで作成するメッシュ {#meshes-created-in-code}

メッシュは、`BoxGeometry`などのジオメトリクラスや、独自の頂点データから構築できます。[メッシュの作成](creating-meshes.md)を参照してください。

## 共有されるメッシュ {#shared-meshes}

1つのメッシュは多くの場所で描画できるため、メッシュの頂点を変更すると、そのすべてが変わります。これは自分で作成していないメッシュにも当てはまります。

- プリミティブ形状のメッシュは、グラフィックスデバイスごとに一度だけ作成され、同じタイプのすべてのRenderコンポーネントで共有されます。
- 読み込んだモデルのメッシュは、そのアセットからインスタンス化したすべてのエンティティで共有されます。

1つのオブジェクトのジオメトリだけを変更するには、そのオブジェクト専用のメッシュを用意してください。

## このセクションの内容

- [メッシュの作成](creating-meshes.md) - ジオメトリクラスや頂点データからメッシュを構築し、更新する方法。
- [メッシュインスタンス](mesh-instances.md) - メッシュの描画と、描画方法を制御する設定: 表示、影、ソート順序、シェーダーパラメーター。
