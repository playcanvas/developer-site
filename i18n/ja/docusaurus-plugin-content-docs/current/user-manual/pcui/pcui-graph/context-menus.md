---
title: コンテキストメニュー
---

グラフ上の様々なグラフアイテムを右クリックすると表示されるコンテキストメニューを作成できます。コンテキストメニューには、バックグラウンド、ノード、エッジの3種類があります。これらの各メニューに表示するアクションのセットを定義でき、メニュー内の各アクション項目は選択されるとアクションイベントを発生させます。

バックグラウンドコンテキストメニューは、キャンバスの空白部分を右クリックすると表示されます。このコンテキストメニューは、グラフに新しいノードを追加するために使用されます。グラフコンストラクタに渡されるオプションオブジェクトに `contextMenuItems` 配列を追加することで作成できます。

```javascript
const graph = new Graph(schema, {
    contextMenuItems: [
        {
            {
                text: 'Add a hello node',
                action: GRAPH.GRAPH_ACTIONS.ADD_NODE,
                nodeType: NODE_KEYS.HELLO,
                attributes: {
                    name: 'New hello'
                    'Editable boolean': true
                }
            },
            {
                text: 'Add a world node',
                action: GRAPH.GRAPH_ACTIONS.ADD_NODE,
                nodeType: NODE_KEYS.WORLD,
                attributes: {
                    name: 'New world'
                    'Editable boolean': true
                }
            }
        }
    ]
})
```

`text` プロパティは、コンテキストメニュー項目の表示テキストを定義します。`action` プロパティは、このコンテキストメニュー項目が選択されたときに `ADD_NODE` アクションを発生させることをグラフに伝えます。その他のプロパティは、この項目が選択されたときに作成されるノードのタイプを定義します。ノードタイプは、グラフのスキーマで定義されているノードキーの1つを参照します。`attributes` オブジェクトは、そのノードのスキーマに存在する編集可能な属性の初期値を定義します。`name` 属性は、ノードのヘッダーにも表示されます。

コンテキストメニューは、以下のようにスキーマに `contextMenu` プロパティを含めることで、ノードやエッジにも追加できます。

```javascript
const schema = {
    edges: {
        0: {
            contextMenuItems: [
                {
                    text: 'Delete edge', // コンテキストメニュー項目の名前
                    action: Graph.GRAPH_ACTIONS.DELETE_EDGE // 項目が選択されたときに実行するアクション
                }
            ]
        }
    }
};
```

現在、ノードのコンテキストメニューは2つのアクションをサポートしています。

```javascript
Graph.GRAPH_ACTIONS.DELETE_NODE // このコンテキストメニューに関連付けられたノードを削除します。
Graph.GRAPH_ACTIONS.ADD_EDGE // このコンテキストメニューに関連付けられたノードから開始するエッジを追加します。別のノードを選択するとエッジ接続が完了します。バックグラウンドキャンバスを選択すると、エッジの追加がキャンセルされます。
```

一方、エッジは、このアクションをコンテキストメニューに追加することで、自身の削除をサポートします。

```javascript
Graph.GRAPH_ACTIONS.DELETE_EDGE // このコンテキストメニューに関連付けられたエッジを削除します。
```
