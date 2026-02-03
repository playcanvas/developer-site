---
title: スプラットレンダリングアーキテクチャ
---

PlayCanvasは、Gaussian splatsに対して2つのレンダリングモードをサポートしています：**統合**と**非統合**。これらのモードを理解することで、アプリケーションに適したアプローチを選択できます。

## 統合 vs 非統合レンダリング

### 非統合モード

非統合モードでは、各GSplatコンポーネントは独立してレンダリングされます：

- 各コンポーネント内のスプラットは個別にソートされます
- コンポーネントはバウンディングボックスの順序に基づいてレンダリングされます
- 追加のオーバーヘッドなしでシンプルなセットアップ
- **制限**：スプラットコンポーネントが重なると視覚的なアーティファクトが発生

このモードは、単一のスプラットまたは重ならないスプラットを持つシンプルなシーンに適しています。

### 統合モード

統合モードでは、すべてのGSplatコンポーネントが共通のレンダリングパイプラインを共有します：

- すべてのコンポーネントのすべてのスプラットが共有**ワークバッファ**にコピーされます
- スプラットはすべてのコンポーネント間でグローバルにソートされます
- スプラットが重なる際のアーティファクトを排除
- [プロシージャルスプラット](/user-manual/gaussian-splatting/building/unified-rendering/procedural-splats/)、[LODストリーミング](/user-manual/gaussian-splatting/building/unified-rendering/lod-streaming)、[GPU処理](/user-manual/gaussian-splatting/building/unified-rendering/splat-processing)などの高度な機能を有効化

**統合モードは**、特に以下の場合にほとんどのアプリケーションで推奨されます：

- 複数のスプラットコンポーネントが重なる可能性がある
- コンポーネント間で一貫した深度ソートが必要
- 高度な機能を使用したい

## 統合モードの有効化

GSplatコンポーネントで`unified`プロパティを`true`に設定します：

```javascript
entity.gsplat.unified = true;
```

## 詳細を学ぶ

統合レンダリングアーキテクチャとその機能の詳細については、以下を参照してください：

- [統合スプラットレンダリング](/user-manual/gaussian-splatting/building/unified-rendering/) - アーキテクチャの詳細とグローバルソート
- [描画順序とソート](/user-manual/gaussian-splatting/building/draw-order) - レンダリングのためのスプラットのソート方法
