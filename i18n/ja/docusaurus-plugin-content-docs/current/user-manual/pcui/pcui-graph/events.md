---
title: イベント
---

グラフを作成した後、さまざまなイベントのコールバックを登録できます。これは、グラフの[on 関数](https://api.playcanvas.com/pcui-graph/classes/Graph.html#on)を使用して実現されます。以下のイベントがサポートされています。

```javascript
import Graph from '@playcanvas/pcui-graph';

const schema = { ... };
const graph = new Graph(schema);

/*
 * @event
 * @param {object} args.node - 追加されたノード
 */
graph.on(Graph.GRAPH_ACTIONS.ADD_NODE, ({ node }) => { ... });

/*
 * @event
 * @param {object} args.node - 削除されたノード
 * @param {object} args.edgeData - グラフに含まれるエッジ
 * @param {object} args.edges - このノードを削除したときに削除されたエッジ
 */
graph.on(Graph.GRAPH_ACTIONS.DELETE_NODE, ({ node, edgeData, edges }) => { ... });

/*
 * @event
 * @param {object} args.node - 選択されたノード
 * @param {object} args.prevItem - 以前に選択されたアイテム（ノードまたはエッジ）
 */
graph.on(Graph.GRAPH_ACTIONS.SELECT_NODE, ({ node, prevItem }) => { ... });

/*
 * @event
 * @param {object} args.node - 更新されたノード
 * @param {object} args.nodeId - 更新されたノードのノードID
 */
graph.on(Graph.GRAPH_ACTIONS.UPDATE_NODE_POSITION, ({ node, nodeId }) => { ... });

/*
 * @event
 * @param {object} args.node - 更新されたノード
 * @param {object} args.attribute - 更新された属性の名前
 * @param {object} args.attributeKey - 更新された属性のキー
 */
graph.on(Graph.GRAPH_ACTIONS.UPDATE_NODE_ATTRIBUTE, ({ node, attribute, attributeKey }) => { ... });

/*
 * @event
 * @param {object} args.edge - 更新されたエッジ
 * @param {object} args.edgeId - 更新されたエッジのID
 */
graph.on(Graph.GRAPH_ACTIONS.ADD_EDGE, ({ edge, edgeId }) => { ... });

/*
 * @event
 * @param {object} args.edge - 更新されたエッジ
 * @param {object} args.edgeId - 更新されたエッジのID
 */
graph.on(Graph.GRAPH_ACTIONS.DELETE_EDGE, ({ edge, edgeId }) => { ... });

/*
 * @event
 * @param {object} args.edge - 選択されたエッジ
 * @param {object} args.prevItem - 以前に選択されたアイテム（ノードまたはエッジ）
 */
graph.on(Graph.GRAPH_ACTIONS.SELECT_EDGE, ({ edge, prevItem }) => { ... });

/*
 * @event
 * @param {object} args.prevItem - 以前に選択されたアイテム（ノードまたはエッジ）
 */
graph.on(Graph.GRAPH_ACTIONS.DESELECT_ITEM, ({ prevItem }) => { ... });

/*
 * @event
 * @param {number} args.pos.x - グラフに対するビューポートのX座標
 * @param {number} args.pos.y - グラフに対するビューポートのY座標
 */
graph.on(Graph.GRAPH_ACTIONS.UPDATE_TRANSLATE, ({ pos }) => { ... });

/*
 * @event
 * param {number} args.scale - グラフの現在のスケール
 */
graph.on(Graph.GRAPH_ACTIONS.UPDATE_SCALE, ({ scale }) => { ... });
```
