---
title: はじめに
---

## NPMからのインストール

PCUI Graphは、[NPM](https://www.npmjs.com/package/@playcanvas/pcui-graph)でパッケージとして利用可能です。次のようにインストールできます:

```bash
npm install @playcanvas/pcui-graph --save-dev
```

:::note

プロジェクトに `@playcanvas/pcui` パッケージがすでにインストールされていることを前提としています。

:::

## Graphコンポーネントのインポート

`Graph`コンポーネントは次のようにインポートできます:

```javascript
import { Graph } from '@playcanvas/pcui-graph';
```

## グラフの作成

グラフのデフォルトの動作を変更するオプションは、JSONオブジェクトとして`Graph`コンストラクターに渡すことができます。以下のように実行できます:

```javascript
const graph = new Graph(schema, {
    readOnly: true,
    initialData: { ... }
});
```

オプションの完全なリストは[こちら](https://api.playcanvas.com/pcui-graph/classes/Graph.html#constructor)で確認できます。

## 使用例

PCUI Graphの使用例は、こちらの[Storybook](https://playcanvas.github.io/pcui-graph/storybook/)で見つけることができます。
