---
title: Splatベースのアプリの構築
---

PlayCanvasは、低レベルのEngine APIからReactやWeb Componentsのような宣言的フレームワークまで、Gaussian Splatsを使用したインタラクティブな3Dアプリケーションを構築するための複数の方法を提供しています。

## はじめに

[最初のSplatアプリ](your-first-app/index.md)チュートリアルでは、利用可能な各アプローチを使用して基本的なGaussian Splatビューアを構築する方法を説明します：

- **[Engine](your-first-app/engine.md)** - 最大限の制御のためにPlayCanvas Engineを直接使用
- **[Editor](your-first-app/editor.md)** - PlayCanvas Editorで視覚的に構築
- **[React](your-first-app/react.md)** - 宣言的なReactアプリのために`@playcanvas/react`パッケージを使用
- **[Web Components](your-first-app/web-components.md)** - 簡単な統合のためにHTMLカスタム要素を使用

## GSplatComponent

スプラットレンダリングの中核は[GSplatComponent](https://api.playcanvas.com/engine/classes/GSplatComponent.html)です。このコンポーネントは、任意のEntityに3D Gaussian Splatsをレンダリングする機能を付与します：

```javascript
const entity = new pc.Entity();
entity.addComponent('gsplat', {
    asset: splatAsset
});
app.root.addChild(entity);
```

## エンジンの機能

PlayCanvasには、Gaussian Splatsを扱うためのさまざまな機能が含まれています：

| 機能 | 説明 |
|------|------|
| [描画順序](draw-order.md) | 複数のスプラットが重なる場合のレンダリング順序を制御 |
| [グローバルソート](global-sorting.md) | 正しいブレンディングのために複数のコンポーネント間でガウシアンをソート |
| [LODストリーミング](lod-streaming.md) | 大規模シーン向けに異なる詳細レベルをストリーミング |
| [ピッキング](picking.md) | スプラット表面でのクリックやタッチを検出 |
| [影](shadows.md) | スプラットからメッシュへの影を投影 |
| [カスタムシェーダー](custom-shaders.md) | カスタムシェーダーコードでビジュアルエフェクトを作成 |
| [パフォーマンス](performance.md) | より良いフレームレートのためにレンダリングを最適化 |
