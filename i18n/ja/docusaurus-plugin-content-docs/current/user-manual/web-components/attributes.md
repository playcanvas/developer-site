---
title: 属性
description: "PlayCanvas Web Componentsの属性が値を解析する方法: デフォルト値の共通契約、Boolean、数値、列挙型、ベクトル、カラー、エンティティ参照。"
---

すべてのPlayCanvas Web ComponentはHTML属性を通じて設定します。すべての属性は同じ規約に従うため、一度覚えてしまえば、どのタグがどう動作するかを予測できます。

## 共通の契約

すべての属性は、次の3つのルールに従います。

| マークアップ | 結果 |
| --- | --- |
| 属性に有効な値が設定されている | その値が適用されます |
| 属性が存在しない（または実行時に削除された） | エンジンのデフォルト値が適用されます |
| 属性に無効な値が設定されている | コンソール警告が問題を説明し、エンジンのデフォルト値が適用されます |

各タグの属性テーブルの*デフォルト*列は、属性が存在しないときに適用される値を示します。属性を削除するとデフォルト値が復元されるため、実行時に属性を自由に切り替えることができ（例えば、ブラウザの開発者ツールから、または [`setAttribute()`](https://developer.mozilla.org/ja/docs/Web/API/Element/setAttribute) と [`removeAttribute()`](https://developer.mozilla.org/ja/docs/Web/API/Element/removeAttribute) を使って）、シーンはリアクティブに更新されます。

無効な値がエンジンに到達することはありません。代わりに、属性名と期待されるフォーマットを示すコンソール警告が表示されます。オーサリング中はコンソールを開いておけば、タイプミスがすぐに見つかります。

## Boolean

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
<pc-scrollview horizontal="false"></pc-scrollview>
```

## 数値

数値属性は、任意の有限数を受け付けます: 整数、小数、負の数、指数表記（`"1e3"`）。それ以外 — 単位付きの値（`fov="60deg"`）、空の値（`intensity=""`）、`"Infinity"` — は警告をログに出力し、デフォルト値が適用されます。

```html
<pc-camera fov="60" near-clip="0.1"></pc-camera>
```

## 列挙型

列挙型属性は、固定された名前のセットのうちの1つを受け付けます。無効な名前は、有効な名前を列挙する警告をログに出力し、デフォルト値が適用されます。

```none
Invalid value 'bogus' for attribute 'scroll-mode'. Valid values: clamp, bounce, infinite. Using 'bounce'.
```

エンジンの数値定数は受け付けられません — 宣言的レイヤーは名前のみです。これはJavaScript APIにも適用されます。列挙型の要素プロパティ（`scrollbar.orientation` など）は、エンジンの数値定数ではなく、常に文字列の名前を受け取り、返します。

```html
<pc-camera tonemap="aces"></pc-camera>
```

## ベクトル

ベクトル属性は、スペース区切りの数値を取ります — 型のコンポーネント数とちょうど同じ個数です（Vector2は2つ、Vector3は3つ、Vector4は4つ）。コンポーネント間の空白の量は問いません。コンマは文法の一部ではなく、警告とともに拒否されます。

```html
<pc-entity position="0 1.5 0" scale="2 2 2"></pc-entity>
```

## カラー

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

## エンティティ参照

一部の属性は、ドキュメント内の別のエンティティを参照します — 例えば、[`<pc-button>`](tags/pc-button.md) の `image`、[`<pc-scrollbar>`](tags/pc-scrollbar.md) の `handle`、[`<pc-scrollview>`](tags/pc-scrollview.md) の `viewport`、`content`、スクロールバー属性です。参照には次のいずれかを使用できます。

* CSSセレクター（例: `#my-id` や `pc-entity[name="Player"]`）
* 要素の `id`（例: `my-id`）
* エンティティの `name`（例: `Player`）

```html
<pc-scrollbar orientation="vertical" handle="#handle"></pc-scrollbar>
```

## スクリプト属性

スクリプトは独自の属性を宣言するため、[`<pc-script>`](tags/pc-script.md) はこれらの規約を、各スクリプト属性の宣言された型に基づいて解析されるプロパティごとの属性で拡張します。詳細は[スクリプトで動作を追加する](scripting.md)を参照してください。
