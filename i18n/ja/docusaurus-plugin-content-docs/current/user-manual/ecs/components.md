---
title: コンポーネント
---

**[Component](https://api.playcanvas.com/engine/classes/Component.html)** は、エンティティにデータや振る舞いを追加します。

## 例

- [`CameraComponent`](https://api.playcanvas.com/engine/classes/CameraComponent.html)
- [`LightComponent`](https://api.playcanvas.com/engine/classes/LightComponent.html)
- [`RenderComponent`](https://api.playcanvas.com/engine/classes/RenderComponent.html)
- [`RigidBodyComponent`](https://api.playcanvas.com/engine/classes/RigidBodyComponent.html) と [`CollisionComponent`](https://api.playcanvas.com/engine/classes/CollisionComponent.html)
- [`ScriptComponent`](https://api.playcanvas.com/engine/classes/ScriptComponent.html)

:::tip
必要なコンポーネントだけを追加し、未使用のものは削除してエンティティを軽量に保ちましょう。
:::

## コードでコンポーネントを追加

```javascript
entity.addComponent('camera', {
    nearClip: 1,
    farClip: 100,
    fov: 55
});
```

[`addComponent`](https://api.playcanvas.com/engine/classes/Entity.html#addcomponent) を参照してください。

## コンポーネントへアクセス

```javascript
const camera = entity.camera;
```

## コンポーネントの削除

```javascript
entity.removeComponent('camera');
```

[`removeComponent`](https://api.playcanvas.com/engine/classes/Entity.html#removecomponent) を参照してください。

## コンポーネントの有効/無効

```javascript
entity.camera.enabled = false;
```

[`enabled`](https://api.playcanvas.com/engine/classes/Component.html#enabled) を参照してください。

:::tip
一時的に不要な場合は、削除する代わりに無効化を検討してください。
:::
