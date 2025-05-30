---
title: 移行
sidebar_position: 8
---

## はじめに

このページでは、異なるエディターバージョン間のプロジェクトデータの移行について概説します。

### 1.48.0から1.50.0への移行

このエディターは、内部でEngine V2を使用するように更新されました。この変更により、一部のプロジェクトでわずかな視覚的変更が発生する可能性があります。最も一般的な問題とその修正方法のリストをまとめました。

#### キューブマップのエッジフィルタリング

<img src='/img/user-manual/editor/editor-v2/edge-filter.png' width='600' />

キューブマップのスカイボックスに上記の例のようなはっきりとしたエッジがある場合は、キューブマップアセットに移動し、プレフィルターデータを削除して再生成することでそれらを削除します。

<img src='/img/user-manual/editor/editor-v2/prefiltered-data.png' width='400' />

#### ガンマ補正

<img src='/img/user-manual/editor/editor-v2/gamma-compare.png' />

ガンマ補正が1.0に設定されているプロジェクトがある場合、シーンが上記の例（右側が新しいエディター）のように、より彩度が高く表示されることがあります。レンダリング設定で、ガンマ補正を2.2に変更すると、以前と同様の効果が得られます。

:::note

シーンはより正しいリニアワークフローでレンダリングされます。ただし、ライティングとアルファブレンドに関連するわずかな視覚的変更が発生します。

:::

<img src='/img/user-manual/editor/editor-v2/gamma-tonemap-settings.png' width='400' />
