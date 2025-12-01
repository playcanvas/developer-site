---
title: スキーマ
---

スキーマオブジェクトは、初期化するグラフの種類を定義するために使用されます。より具体的には、グラフがどのようなノードを含み得るか、そしてそれらのノードがエッジによってどのように接続され得るかを定義します。

グラフ内で作成できるノードとエッジのセットを含む必要があります。定義される各ノードとエッジには、スキーマのその特定の部分を参照するために使用される一意の数値キーが必要になります。上記の例では、定義された単一のエッジタイプが、接続できるノードタイプを定義する際に、スキーマに含まれる2つのノードを参照しています。大規模なスキーマを作成する場合、これらのキーをスキーマ作成前に定義しておくと、簡単に参照できるため便利です。

```javascript
const NODE_KEYS = {
    HELLO: 0,
    WORLD: 1
};
const EDGE_KEYS = {
    HELLO_TO_WORLD: 0
};

const schema = {
    nodes: {
        [NODE_KEYS.HELLO]: {
            name: 'Hello',
            fill: 'red'
        },
        [NODE_KEYS.WORLD]: {
            name: 'World',
            fill: 'green'
        }
    },
    edges: {
        [EDGE_KEYS.HELLO_TO_WORLD]: {
            from: [NODE_KEYS.HELLO], // このエッジはNODE_KEYS.HELLOタイプのノードを接続できます
            to: [NODE_KEYS.WORLD] // NODE_KEYS.WORLDタイプのノードへ
            stroke: 'blue'
        }
    }
};
```

上記のスキーマは、`from`および`to`属性を含むエッジを定義しているため、有向グラフを作成するために使用されます。これらの属性は、エッジがどのノードを接続できるかを示し、あるノードから別のノードへの有向エッジを作成します。

ビジュアルプログラミンググラフを作成する場合、ノードは直接接続されません。代わりに、それらは互いに接続できる入力ポートと出力ポートを含んでいます。これは、作成するスキーマで表現する必要があります。これを実現するには、スキーマ内のノードに`inPorts`および`outPorts`属性を追加できます。これらは、特定のノード上に作成されるポートのセットを定義し、どのエッジがそれらのポートを接続できるかを指定します。

上記のスキーマは、ポート接続をサポートするように次のように再構築できます。

```javascript
const NODE_KEYS = {
    HELLO: 0,
    WORLD: 1
};
const EDGE_KEYS = {
    HELLO_TO_WORLD: 0
};

const schema = {
    nodes: {
        [NODE_KEYS.HELLO]: {
            name: 'Hello',
            fill: 'red',
            outPorts: [
                {
                    name: 'output',
                    type: EDGE_KEYS.HELLO_TO_WORLD
                }
            ]
        },
        [NODE_KEYS.WORLD]: {
            name: 'World',
            fill: 'green',
            inPorts: [
                {
                    name: 'input',
                    type: EDGE_KEYS.HELLO_TO_WORLD
                }
            ]
        }
    },
    edges: {
        [EDGE_KEYS.HELLO_TO_WORLD]: {
            stroke: 'blue'
        }
    }
};
```

作成されたポートには、各ポートが受け入れるエッジタイプを定義するタイプがあることがわかります。グラフ内では、同じタイプの入出力ポートのみが互いに接続できます。ポートには、グラフ内でポートの横に表示される名前も含まれています。

ノードは、編集可能な属性を含むこともでき、それらはノード内に表示される入力フィールドとして表示されます。これらの属性は、ノードで次のように設定できます。

```javascript
const schema = {
    nodes: {
        0: {
            name: 'Foobar',
            attributes: [
                {
                    name: 'Editable boolean',
                    type: 'BOOLEAN_INPUT'
                },
                {
                    name: 'Editable text',
                    type: 'TEXT_INPUT'
                },
                {
                    name: 'Editable number',
                    type: 'NUMERIC_INPUT'
                },
                {
                    name: 'Editable 2D vector',
                    type: 'VEC2_INPUT'
                },
                {
                    name: 'Editable 3D vector',
                    type: 'VEC3_INPUT'
                },
                {
                    name: '編集可能な4次元ベクトル',
                    type: 'VEC4_INPUT'
                }
            ]
        }
    }
};
```

特定のノードタイプに対する編集可能な属性は、グラフデータに辞書形式で格納されるため、一意の名前を持つ必要があります。編集可能な属性を持つノードが作成された場合、それは以下のようにグラフデータ経由でアクセスできます。

```javascript
const selectedItemId = graph.selectedItem.id;
const currentBooleanValue = graph.data.nodes[selectedItemId].attributes['Editable boolean'].value;
```
