---
title: スタイリング
---

グラフは、デフォルトのスタイルプロパティを上書きすることでスタイリングできます。これは、graphコンストラクターにoptionsオブジェクトの一部として渡されるdefaultStylesを変更することで実現できます。

```javascript
const graph = new Graph(schema, {
    defaultStyles: {
        background: {
            color: 'black'
        }
    }
})
```

`defaultStyles`オブジェクトには、グラフの背景のスタイリングオプションのほか、nodeおよびedgeのスタイルが含まれています。これらの上書き可能なプロパティの全リストは、[こちら](https://github.com/playcanvas/pcui-graph/blob/main/src/constants.js)で確認できます。

特定のnode/edgeタイプのスタイリングを更新したい場合は、`defaultStyles`オブジェクトで指定されたnodeまたはedgeプロパティを、特定のnodeまたはedgeのschemaで以下のように定義することで上書きできます。

```javascript
const schema = {
    nodes: {
        0: {
            name: 'standard node'
        },
        1: {
            name: 'red node'
            fill: 'red' // このタイプのすべてのnodeの背景色を赤に更新します
        },
    }
};

const graph = new Graph(schema, {
    defaultStyles: {
        node: {
            fill: 'grey' // その他すべてのnodeタイプは灰色の背景になります
        }
    }
})
```
