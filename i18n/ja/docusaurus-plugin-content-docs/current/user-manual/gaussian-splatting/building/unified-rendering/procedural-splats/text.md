---
title: テキストからスプラットへ
---

`GsplatText`スクリプトは、非透明ピクセルごとに1つのスプラットとしてテキストをGaussian splatsでレンダリングします。これにより、スプラットベースのシーンにシームレスに統合されるテキストラベルが作成されます。

:::info ベータ機能

GsplatTextは現在ベータ版です。問題が発生した場合は、[PlayCanvas Engine GitHubリポジトリ](https://github.com/playcanvas/engine/issues)で報告してください。

:::

:::note

この機能は[統合レンダリング](/user-manual/gaussian-splatting/building/unified-rendering/)モードが必要です。

:::

## 概要

`GsplatText`は以下を行うScriptコンポーネントです：

- 標準CSSフォントを使用してキャンバスにテキストをレンダリング
- 可視ピクセルごとに1つのスプラットを作成
- XZ平面（Y=0）にテキストを表示
- フィルカラー、ストローク、カスタムフォントをサポート

エンティティのトランスフォームを使用して、シーン内でテキストをスケールおよび配置します。

## 基本的な使い方

```javascript
// スクリプトをインポート
const { GsplatText } = await import('path/to/gsplat-text.mjs');

// エンティティにスクリプトコンポーネントを追加
entity.addComponent('script');
const textSplat = entity.script.create(GsplatText);

// テキストを設定
textSplat.text = 'Hello World';
textSplat.fontSize = 64;
textSplat.fillStyle = '#ffffff';

// エンティティのトランスフォームを使用して配置とスケール
entity.setLocalPosition(0, 0, 0);
entity.setLocalScale(0.15, 0.15, 0.15);
```

## 属性

| 属性 | 型 | デフォルト | 説明 |
|-----------|------|---------|-------------|
| `text` | string | `''` | レンダリングするテキスト文字列 |
| `fontSize` | number | `64` | ピクセル単位のフォントサイズ |
| `fontFamily` | string | `'sans-serif'` | CSSフォントファミリー |
| `fillStyle` | string | `'#ffffff'` | テキストのフィルカラー（CSSカラー文字列） |
| `strokeStyle` | string | `'rgba(0,0,0,0)'` | ストロークカラー（CSSカラー文字列） |
| `strokeWidth` | number | `0` | ピクセル単位のストローク幅 |
| `padding` | number | `0` | ピクセル単位のテキスト周りのパディング |

## スタイリングの例

### 基本的な白いテキスト

```javascript
textSplat.text = 'Score: 100';
textSplat.fontSize = 48;
textSplat.fillStyle = '#ffffff';
```

### アウトライン付きテキスト

```javascript
textSplat.text = 'GAME OVER';
textSplat.fontSize = 72;
textSplat.fillStyle = '#ff0000';
textSplat.strokeStyle = '#000000';
textSplat.strokeWidth = 3;
```

### カスタムフォント

```javascript
textSplat.text = 'Fancy Text';
textSplat.fontFamily = 'Georgia, serif';
textSplat.fontSize = 56;
```

## 自動更新

スクリプトは任意の属性が変更されると自動的にリビルドします。プロパティを変更するだけで、スプラットは次のフレームで更新されます。

```javascript
// 実行時にテキストを更新
textSplat.text = 'New Score: 200';
```

## 座標系

[GsplatImage](/user-manual/gaussian-splatting/building/unified-rendering/procedural-splats/image)と同様に、テキストはXZ平面にレンダリングされます：

- **X軸**：左から右
- **Z軸**：上から下（+Yから見た時にテキストが正しく読める）
- **Y軸**：常に0

テキストは1x1ユニットの領域に収まるようにサイズ調整され、エンティティのトランスフォームでスケールされます。

## パフォーマンスの考慮事項

スプラット数は以下に依存します：

- フォントサイズ（大きい = より多くのピクセル）
- テキストの長さ
- ストローク幅（より多くのピクセルを追加）

多くの文字を持つラベルや大きなフォントサイズの場合、スプラット数は大きくなる可能性があります。

## ライブサンプル

CADスタイルの可視化で寸法ラベルに`GsplatText`を使用する方法を示す[Procedural Shapesサンプル](https://playcanvas.github.io/#/gaussian-splatting/procedural-shapes)を参照してください。

## スクリプトの場所

スクリプトはPlayCanvas Engineリポジトリで利用可能です：

```text
scripts/esm/gsplat/gsplat-text.mjs
```

## 関連項目

- [プロシージャルスプラット](/user-manual/gaussian-splatting/building/unified-rendering/procedural-splats/)
- [メッシュからスプラットへ](/user-manual/gaussian-splatting/building/unified-rendering/procedural-splats/mesh)
- [画像からスプラットへ](/user-manual/gaussian-splatting/building/unified-rendering/procedural-splats/image)
- [線と形状](/user-manual/gaussian-splatting/building/unified-rendering/procedural-splats/lines)
