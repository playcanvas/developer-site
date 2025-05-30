---
title: GSplat
---

The GSplat component enables an entity to render a 3D Gaussian Splat.

The GSplat component can be enabled or disabled using the toggle in the top right of the component panel. If enabled, the 3D Gaussian Splat referenced by the component will be added to the scene and rendered.

![GSplat component](/img/user-manual/scenes/components/component-gsplat.png)

## Properties

| プロパティ名 | 説明 |
|----------|-------------|
| アセット (Asset)    | The GSplat asset to be rendered by this GSplat component. Only a single GSplat asset can be assigned to a GSplat component. |
| レイヤーの一覧 (Layers)   | The [layers](/user-manual/graphics/layers) to render this element into. |

## スクリプトインターフェース

You can control the properties of a GSplat component using a [script component](../script). The scripting interface for the GSplat component is [here](https://api.playcanvas.com/engine/classes/GSplatComponent.html).
