---
title: 階層とトランスフォーム
sidebar_label: 階層とトランスフォーム
---

エンティティは **親子階層** に配置できます。`Entity` クラスは、[`GraphNode`](https://api.playcanvas.com/engine/classes/GraphNode.html) スーパークラスからトランスフォーム機能を継承しています。

## 要点

- 変換は親に対して相対的です。
- ワールド変換は、階層を通じてローカル変換を合成して算出されます。
- 親を移動すると、その子すべてに影響します。

:::tip
深い階層は避け、できるだけ浅い階層構造にすると管理しやすく、パフォーマンスも向上します。
:::

## 例

```javascript
childEntity.setLocalPosition(1, 0, 0);
console.log(childEntity.getWorldPosition());
```

[`setLocalPosition`](https://api.playcanvas.com/engine/classes/GraphNode.html#setlocalposition) と [`getWorldPosition`](https://api.playcanvas.com/engine/classes/GraphNode.html#getworldposition) を参照してください。

## 親の付け替え

```javascript
newParent.addChild(childEntity);
```

## スケールに関する注意

- 非一様スケールは、見た目や物理挙動に問題を引き起こす場合があります。
- 物理有効なエンティティのスケーリングは、必要な場合のみ行ってください。
