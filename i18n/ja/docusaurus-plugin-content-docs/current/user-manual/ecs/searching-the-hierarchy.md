---
title: 階層の検索
---

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
