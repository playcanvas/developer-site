---
title: LCC2形式
description: "大規模な3D Gaussian splatシーン向けのLCC2形式: SOGまたはSPZのスプラットファイルを持つXGRIDSの詳細度ツリーと、エンジンでの読み込みおよびストリーミング。"
sidebar_label: LCC2
---

**LCC2**は、LixelスキャナーとLCC Studioを提供する[XGRIDS](https://github.com/xgrids/LCC2Whitepaper)による、大規模なGaussian splatシーン向けの形式です。シーンは領域のツリーで、各領域が1つの詳細度（LOD）のスプラットを保持します。スプラットはチャンクファイルに保存され、必要に応じてストリーミングされます。エンジンは`.lcc2`ファイルを直接読み込むため、XGRIDSのソフトウェアで書き出したシーンを変換せずにストリーミングできます。

:::note[クレジット表記]

LCC2のデータ構成形式はXGRIDSが考案したものです。XGRIDSのライセンスでは、LCC2データを含むアプリケーションに「Data Organization Format originated from XGRIDS」というクレジットの表示が求められます。

:::

## ファイル構成

LCC2シーンは、JSONのインデックスファイルとスプラットファイルを含むフォルダーです。

```none
scene/
├── scene.lcc2           # インデックス: シーン情報とLODツリー
├── data/
│   ├── 3dgs/            # スプラットファイル、.sogまたは.spz (必須)
│   └── mesh/            # 任意のコリジョンメッシュ (エンジンでは読み込まれません)
└── info/                # 任意のシーン属性 (スポーン位置など)
```

シーンのスプラットファイルはすべて同じ種類で、[SOG](./sog.md)または[SPZ](./spz.md)のいずれかです。どちらであるかはインデックスの`splatType`フィールドに記載されています。複数の領域が1つのファイルを共有でき、それぞれがファイル内のスプラットの範囲を参照します。

## ツリーの仕組み

インデックスはバウンディングボックスのツリーを記述します。ルート以下の各ノードは、その領域の1つのLODを保持し、その子ノードを合わせると同じ領域の次に細かいレベルになります。最も粗いレベルはルートの直下にあり、リーフが最も細かいレベルを保持します。ビューアは、ノードが遠いうちはそのノードを表示し、近づくとその子ノードに置き換えます。ルートにはスプラットはなく、空などの遠景のための任意の環境チャンクのみがあります。

## PlayCanvasでの読み込み

[Streamed SOG](./streamed-sog.md)シーンと同様に、`.lcc2`ファイルを`gsplat`アセットとして読み込みます。スプラットファイルは、カメラの移動に合わせて要求されます。

```javascript
const asset = new Asset('scene', 'gsplat', { url: 'scene/scene.lcc2' });
app.assets.add(asset);
app.assets.load(asset);

const entity = new Entity('scene');
entity.addComponent('gsplat', { asset });

// LCC2シーンは+Zが上方向です
entity.setLocalEulerAngles(270, 0, 0);
app.root.addChild(entity);
```

読み込まれる詳細度の量と、距離による減衰は、Streamed SOGと同じ方法で制御します。[LOD動作の制御](/user-manual/gaussian-splatting/building/lod-streaming#controlling-lod-behavior)と[グローバルスプラット予算](/user-manual/gaussian-splatting/building/performance#global-splat-budget)を参照してください。

### SOGとSPZのスプラットファイル

スプラットファイルがSOGのLCC2シーンは、SOGがエンジンに組み込まれているため、エンジン以外には何も必要ありません。スプラットファイルがSPZのシーンでは、スプラットファイルが`.spz`拡張子で要求されるため、SPZパーサーを`gsplat`リソースハンドラーに登録する必要があります。セットアップについては[PlayCanvasでの読み込み](./spz.md#loading-in-playcanvas)を参照してください。LCC2が使用するSPZバージョン3のファイルには、ZSTDモジュールは不要です。

## エンジンサポートに関する注意

- 読み込まれるのはスプラットのみです。コリジョンメッシュ、BVHファイル、スポーン位置、その他のシーン情報は無視されます。
- インデックスの`offset`、`shift`、`scale`フィールドは適用されません。
- スプラットファイルに球面調和関数が含まれている場合は、読み込まれます。
- 環境チャンクがある場合は、シーンとともに読み込まれて描画されます。これはスキャンした位置から見た周囲の景色を表すため、カメラがそれらの位置から大きく離れると、大きな塊のように見えることがあります。

## サンプル

完全なセットアップについては[Streamed LCC2のサンプル](https://playcanvas.github.io/#/gaussian-splatting/streamed-lcc2)を、URLからLCC2シーンを開く[Viewerのサンプル](https://playcanvas.github.io/#/gaussian-splatting/viewer)を参照してください。

## LCC2の変換

[SplatTransform](/user-manual/splat-transform/)はLCC2シーンを読み込み、[Streamed SOG](./streamed-sog.md)やその他のサポートされている形式に変換できます。[Streamed SOGの生成](/user-manual/splat-transform/streamed-sog)を参照してください。
