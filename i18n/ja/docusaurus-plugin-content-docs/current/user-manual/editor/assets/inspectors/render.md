---
title: Render
---

Render アセットには、インポートされた3Dモデルファイル（GLBやFBXなど）から抽出された3Dメッシュデータが含まれます。3Dモデルの形状と構造を定義し、[Render Component](/user-manual/editor/scenes/components/render/)によってシーン内にジオメトリを表示するために使用されます。

Render アセットは主に以下の目的で使用されます：

- 3Dモデルの形状と構造を定義する
- メッシュ表面にマテリアルを適用する

## Inspector

Render アセットインスペクターは、メッシュに関するメタデータとソースコンテナアセットとの関係を表示します。

## Properties

### Meta

![Render Asset Inspector - Meta](/img/user-manual/editor/assets/inspectors/asset-inspector-render-meta.png)

| Property | Description |
|----------|-------------|
| Vertices | メッシュ内の頂点の総数（読み取り専用）。 |
| Triangles | メッシュ内の三角形の総数（読み取り専用）。 |
| Meshes | アセットに含まれるメッシュインスタンスの数（読み取り専用）。 |
| Skinned | メッシュにスケルタルアニメーション用のスキニングデータが含まれているかどうか（読み取り専用）。 |
| Attributes | 位置、法線、UV座標など、メッシュデータに存在する頂点属性（読み取り専用）。 |
| Mesh Compression | 使用されている圧縮形式（例：Draco）（読み取り専用）。 |

### Render

![Render Asset Inspector - Render](/img/user-manual/editor/assets/inspectors/asset-inspector-render-render.png)

| Property | Description |
|----------|-------------|
| Index | ソースコンテナ内のこのレンダーアセットのインデックス（読み取り専用）。 |
| Container | このレンダーが抽出されたソースコンテナアセット（GLB）への参照（読み取り専用）。 |

:::tip
スクリプトでこのアセットを使用するには、[Asset Attributes](/user-manual/scripting/script-attributes/esm/#asset-attribute)を参照してください。
:::
