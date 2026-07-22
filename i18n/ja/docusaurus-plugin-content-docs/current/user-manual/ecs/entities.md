---
title: エンティティ
description: Entity の作成、親子付け、有効化、管理。PlayCanvas Scene の基本的な構成要素です。
---

:::ai

- **[Engine Development](/user-manual/ai/developing-with-engine/):** 「エンティティ」について、次の要件を満たしてください: Entity の作成、親子付け、有効化、管理。PlayCanvas Scene の基本的な構成要素であること 変更後の階層、Transform、Component データを確認してください。
- **[Editor MCP Server](/user-manual/ai/editor-mcp-server/):** 現在のシーンのエンティティを作成、確認、変更、複製、親変更、検索、削除してください。

:::

**[Entity](https://api.playcanvas.com/engine/classes/Entity.html)** は、PlayCanvas シーンの基本的な構成要素です。

## 特徴

- エンティティは **0 個以上のコンポーネント** を持てます。
- エンティティは **親子階層** を形成できます（[`addChild`](https://api.playcanvas.com/engine/classes/GraphNode.html#addchild)、[`removeChild`](https://api.playcanvas.com/engine/classes/GraphNode.html#removechild)）。
- エンティティは **有効/無効** を切り替えられます（[`enabled`](https://api.playcanvas.com/engine/classes/GraphNode.html#enabled)）。

:::tip
エンティティは軽量に保ち、不要なコンポーネントの追加は避けましょう。
:::

## コードでエンティティを作成

```javascript
const entity = new pc.Entity('MyEntity');
app.root.addChild(entity);
```

## エンティティの有効/無効

```javascript
entity.enabled = false; // エンティティとそのコンポーネントをすべて無効化
```

:::tip
未使用の間はエンティティを無効化し、処理負荷を下げましょう。
:::

## ライフサイクル

- **作成** — [`Entity constructor`](https://api.playcanvas.com/engine/classes/Entity.html#constructor)
- **親子関係** — [`addChild`](https://api.playcanvas.com/engine/classes/GraphNode.html#addchild) / [`removeChild`](https://api.playcanvas.com/engine/classes/GraphNode.html#removechild)
- **破棄** — [`destroy`](https://api.playcanvas.com/engine/classes/GraphNode.html#destroy)

:::tip
不要になったエンティティは `destroy` を呼び出してリソースを解放しましょう。
:::
