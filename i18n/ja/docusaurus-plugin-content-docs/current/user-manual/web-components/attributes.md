---
title: 属性
description: "PlayCanvas Web Componentsの属性が値を解析する方法: デフォルト値の共通契約、Boolean、数値、列挙型、ベクトル、カラー、エンティティ参照。"
---

すべてのPlayCanvas Web ComponentはHTML属性を通じて設定します。すべての属性は同じ規約に従うため、一度覚えてしまえば、どのタグがどう動作するかを予測できます。

## 共通の契約 {#the-shared-contract}

すべての属性は、次の3つのルールに従います。

| マークアップ | 結果 |
| --- | --- |
| 属性に有効な値が設定されている | その値が適用されます |
| 属性が存在しない（または実行時に削除された） | エンジンのデフォルト値が適用されます |
| 属性に無効な値が設定されている | コンソール警告が問題を説明し、エンジンのデフォルト値が適用されます |

各タグの属性テーブルの*デフォルト*列は、属性が存在しないときに適用される値を示します。属性を削除するとデフォルト値が復元されるため、実行時に属性を自由に切り替えることができ（例えば、ブラウザの開発者ツールから、または [`setAttribute()`](https://developer.mozilla.org/ja/docs/Web/API/Element/setAttribute) と [`removeAttribute()`](https://developer.mozilla.org/ja/docs/Web/API/Element/removeAttribute) を使って）、シーンはリアクティブに更新されます。

無効な値がエンジンに到達することはありません。代わりに、属性名と期待されるフォーマットを示すコンソール警告が表示されます。オーサリング中はコンソールを開いておけば、タイプミスがすぐに見つかります。

[`<pc-node>`](tags/pc-node.md)は、上の表の中央の行に対する唯一の例外です。その属性は読み込まれたモデル内のノードに対するオーバーライドであるため、属性が存在しない場合は、エンジンのデフォルト値ではなく、そのモデルがオーサリングされた値が復元されます。

## Boolean {#booleans}

Boolean属性は、`"false"` 以外の値（値なしの属性の空の値を含む）で存在する場合は `true`、`"false"` が設定されている場合は `false` になります。

| マークアップ | 結果 |
| --- | --- |
| `cast-shadows`（属性名のみ） | `true` |
| `cast-shadows="true"`（または `"false"` 以外の任意の値） | `true` |
| `cast-shadows="false"` | `false` |
| 属性が存在しない、または削除された | エンジンのデフォルト値 |

```html
<!-- 属性名のみで、デフォルトがfalseのオプションを有効化 -->
<pc-light type="directional" cast-shadows></pc-light>

<!-- "false"を設定して、デフォルトがtrueのオプションを無効化 -->
<pc-scroll-view horizontal="false"></pc-scroll-view>
```

## 数値 {#numbers}

数値属性は、任意の有限数を受け付けます: 整数、小数、負の数、指数表記（`"1e3"`）。それ以外 — 単位付きの値（`fov="60deg"`）、空の値（`intensity=""`）、`"Infinity"` — は警告をログに出力し、デフォルト値が適用されます。

```html
<pc-camera fov="60" near-clip="0.1"></pc-camera>
```

## 列挙型 {#enums}

列挙型属性は、固定された名前のセットのうちの1つを受け付けます。無効な名前は、有効な名前を列挙する警告をログに出力し、デフォルト値が適用されます。

```none
Invalid value 'bogus' for attribute 'scroll-mode'. Valid values: clamp, bounce, infinite. Using 'bounce'.
```

エンジンの数値定数は受け付けられません — 宣言的レイヤーは名前のみです。これはJavaScript APIにも適用されます。列挙型の要素プロパティ（`scrollbar.orientation` など）は、エンジンの数値定数ではなく、常に文字列の名前を受け取り、返します。

```html
<pc-camera tonemap="aces"></pc-camera>
```

## ベクトル {#vectors}

ベクトル属性は、スペース区切りの数値を取ります — 型のコンポーネント数とちょうど同じ個数です（Vector2は2つ、Vector3は3つ、Vector4は4つ）。コンポーネント間の空白の量は問いません。コンマは文法の一部ではなく、警告とともに拒否されます。

```html
<pc-entity position="0 1.5 0" scale="2 2 2"></pc-entity>
```

## カラー {#colors}

カラー属性は、次の3つのフォーマットのいずれかを受け付けます。

| フォーマット | 例 |
| --- | --- |
| [CSSカラー名](https://github.com/playcanvas/web-components/blob/main/src/colors.ts) | `clear-color="rebeccapurple"` |
| 16進コード（`#rgb`、`#rgba`、`#rrggbb`、`#rrggbbaa`） | `color="#f00"` または `color="#ff0000"` |
| 0から1の範囲のスペース区切りの3つまたは4つの数値 | `color="1 0.5 0.5"` または `color="1 0.5 0.5 0.5"` |

```html
<pc-camera clear-color="#f0f8ff"></pc-camera>
<pc-light color="1 0.8 0.6"></pc-light>
```

## エンティティ参照 {#entity-references}

一部の属性は、ドキュメント内の別のエンティティを参照します — 例えば、[`<pc-button>`](tags/pc-button.md) の `image`、[`<pc-scrollbar>`](tags/pc-scrollbar.md) の `handle`、[`<pc-scroll-view>`](tags/pc-scroll-view.md) の `viewport` と `content`、[`<pc-joint>`](tags/pc-joint.md) の `entity-a` と `entity-b` です。参照は、次の2つの形式のうちちょうど1つを取ります。

| 形式 | 意味 | スコープ |
| --- | --- | --- |
| `handle` | [`<pc-entity>`](tags/pc-entity.md)、[`<pc-model>`](tags/pc-model.md)、[`<pc-node>`](tags/pc-node.md) の `name` | 最も近い外側のエンティティが最初、次に順に外側へ、最後にドキュメント全体 |
| `#handle`、`#hud pc-entity` | `#` で始まるCSSセレクター — 要素の `id`、またはそれを起点とする任意のセレクター | ドキュメント全体 |

```html
<pc-scrollbar orientation="vertical" handle="#handle"></pc-scrollbar>
```

この文法は閉じています: ベアな値（bare value）は常に名前であり — 決して要素の `id` でもセレクターでもなく — `#` で始まらないセレクターは受け付けられません。参照がどちらの形式なのかはひと目で分かり、ドキュメントの他の場所で要素を追加したり名前を変えたりしても、それが変わることはありません。

### 名前は最も近いものから解決される {#names-resolve-nearest-first}

名前は、外側を囲むエンティティ階層を通して検索されます: まず最も近い外側のエンティティを担う要素 — [`<pc-entity>`](tags/pc-entity.md)、[`<pc-model>`](tags/pc-model.md)、[`<pc-node>`](tags/pc-node.md) のいずれかで、その要素自身も含みます — とそのサブツリー、次に外側を囲むエンティティを順に、その次に包含する [`<pc-app>`](tags/pc-app.md)、最後にドキュメント全体です。各スコープ内ではドキュメント順で、最初のマッチが優先されます。`<pc-node>` の場合、マッチする名前はそれがバインドするglTFノード名です。

「最も近いものから」こそが、繰り返されるコンテンツの中で名前を安全にするものです: [クローンされた `<template>`](templates.md) の内部では、ルックアップが先行するクローンに到達しうるより前に、参照は自分自身のインスタンスのエンティティを見つけます — [テンプレートによる再利用可能なシーン](templates.md)を参照してください。

### `#` 参照はドキュメント全体 {#hash-references-are-document-wide}

`#` で始まる参照は、ドキュメント全体に対する[CSSセレクター](https://developer.mozilla.org/ja/docs/Web/API/Document/querySelector)として評価され、これは絶対的です: この場合、名前のルックアップは決して実行されないため、たまたま `#body` という*名前*を持つエンティティが、`id` が `body` である要素を覆い隠すことはできません。参照する要素がどこにあっても特定の1要素に参照を固定したいときは、`#` 形式を使ってください。

### 解決されない参照は警告する {#unresolved-references-warn}

空でない参照が解決されない場合、属性名と原因を示すコンソール警告がログに出力されます。原因は次のいずれかです: ドキュメント内に何もマッチしない、マッチした要素が*まだ*エンティティを担っていない（通常はタイミングの問題です — モデルが読み込まれていない [`<pc-node>`](tags/pc-node.md) は、属性をもう一度割り当てれば解決されます）、あるいはマッチした要素が決してエンティティを担えない（参照が誤った種類の要素を指しています）。さらに、ベアな参照が何にもマッチしないものの、エンティティを担う要素の `id` と一致する場合、警告は使用すべき `#id` 表記を提案します — `id` が必要とする場合はエスケープされます。例えば `a:b` という `id` に対しては `#a\:b` です。

[スクリプト属性](scripting.md#type-prefixes)も同じ文法に従います: `entity:body` は `body` という名前のエンティティを参照し、`entity:#body` はその `id` を持つ要素を参照します。

## スクリプト属性 {#script-attributes}

スクリプトは独自の属性を宣言するため、[`<pc-script-instance>`](tags/pc-script-instance.md) はこれらの規約を、各スクリプト属性の宣言された型に基づいて解析されるプロパティごとの属性で拡張します。詳細は[スクリプトで動作を追加する](scripting.md)を参照してください。
