---
title: エンティティ・コンポーネント・システム（ECS）
sidebar_label: エンティティ・コンポーネント・システム
description: PlayCanvas が Entity、Component、System を使ってアプリケーション内のオブジェクトと挙動をどう整理するかを説明します。
---

:::ai

- **[Engine Development](/user-manual/ai/developing-with-engine/):** 「エンティティ・コンポーネント・システム（ECS）」について、次の要件を満たしてください: PlayCanvas が Entity、Component、System を使ってアプリケーション内のオブジェクトと挙動をどう整理するかを説明すること 変更後の階層、Transform、Component データを確認してください。
- **[Editor MCP Server](/user-manual/ai/editor-mcp-server/):** エンティティを作成、整理し、Component と Transform を設定して、現在のシーン階層を確認してください。

:::

PlayCanvas は、アプリケーション内のオブジェクトを整理・管理するために **エンティティ・コンポーネント・システム（ECS）** を使用します。

この設計パターンでは:

- **[Entity](https://api.playcanvas.com/engine/classes/Entity.html)** はコンテナであり、自身では振る舞いを持ちません。
- **[Component](https://api.playcanvas.com/engine/classes/Component.html)** はエンティティに機能やデータを追加します。
- **[System](https://api.playcanvas.com/engine/classes/ComponentSystem.html)** は、特定のコンポーネント型のインスタンスを一括して管理します。

この手法により次の利点が得られます:

- **柔軟性** — コンポーネントを組み合わせて複雑な振る舞いを構築できます。
- **モジュール性** — ロジックはコンポーネント内にカプセル化されます。
- **パフォーマンス** — システムがコンポーネント群を効率的に処理します。
