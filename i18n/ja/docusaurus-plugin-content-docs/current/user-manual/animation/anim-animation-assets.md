---
title: Animationアセット 
description: FBX変換によるキーフレームアニメーションアセットと、animコンポーネント経由でanimstategraphにどうリンクするかです。
---

:::ai

- **[Editor MCP Server](/user-manual/ai/editor-mcp-server/):** Animation アセットをアップロードまたは確認し、アニメーションイベントを確認、追加、更新、削除できます。

:::

![Animation Assets](/img/user-manual/animation/animation-assets.png)

Animationアセットは、PlayCanvasのモデルのアニメーションを動かすために使用されるキーフレームデータです。エンティティのAnimコンポーネントを介してAnimstategraphアセットにリンクされています。

現在、Animコンポーネントは、Project Settings > Asset Import の `Convert to GLB` 設定を使用して、PlayCanvasプロジェクトに .FBX ファイルからインポートされたアニメーションアセットに対応しています。

![Asset Import](/img/user-manual/animation/asset-tasks.png)
