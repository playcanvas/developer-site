---
title: 階層の検索
description: PlayCanvas の階層検索 API で、名前、タグ、パス、またはカスタムコールバックにより実行時に Entity を検索します。
---

:::ai

- **[Engine Development](/user-manual/ai/developing-with-engine/):** 「階層の検索」について、次の要件を満たしてください: PlayCanvas の階層検索 API で、名前、タグ、パス、またはカスタムコールバックにより実行時に Entity を検索すること 変更後の階層、Transform、Component データを確認してください。
- **[Editor MCP Server](/user-manual/ai/editor-mcp-server/):** 名前、Component、タグ、アタッチされた Script でエンティティを一覧表示、絞り込み、あいまい検索、解決してください。 変更後の階層、Transform、Component データを確認してください。

:::

## 名前で検索

```javascript
const found = app.root.findByName('Player');
```

[`findByName`](https://api.playcanvas.com/engine/classes/GraphNode.html#findbyname) を参照してください。

## タグで検索

タグはエンティティに付与できる文字列ラベルです（[`Tags`](https://api.playcanvas.com/engine/classes/Tags.html)）。

```javascript
entity.tags.add('enemy');
const enemies = app.root.findByTag('enemy');
```

[`tags`](https://api.playcanvas.com/engine/classes/Entity.html#tags) と [`findByTag`](https://api.playcanvas.com/engine/classes/Entity.html#findbytag) を参照してください。

:::tip
関連するエンティティのグルーピングにはタグを活用しましょう。タグ検索は、深い名前ベースの検索より柔軟で高速です。
:::

## コンポーネントで検索

```javascript
const lights = app.root.findComponents('light');
```

[`findComponents`](https://api.playcanvas.com/engine/classes/Entity.html#findcomponents) を参照してください。

## 再帰とスコープ

- 検索は `app.root` 以外の任意のエンティティから開始できます。
- 小さなサブツリーから検索する方が、シーン全体を検索するより高速です。
