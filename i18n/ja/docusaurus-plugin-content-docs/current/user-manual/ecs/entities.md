---
title: エンティティ
---

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
