---
title: Element
---

Elementコンポーネントは、Screenコンポーネントを祖先に持つ階層内で、画像やテキストなどの2Dコンポーネントで構成されたユーザーインターフェースを構築するために使用されます。Elementコンポーネントはアンカーやピボットポイントなどのレイアウトプロパティを提供します。

詳細については、[ユーザーインターフェース](/user-manual/user-interface)セクションを参照してください。

## グループエレメント (Group Element)

グループエレメントは、Elementコンポーネントのレイアウトプロパティのみを提供します。

![Group Element](/img/user-manual/editor/scenes/components/component-element-group.png)

## イメージエレメント (Image Element)

イメージエレメントは、テクスチャアセット、スプライトアセット、または単色を使用して画像を表示します。

![Image Element](/img/user-manual/editor/scenes/components/component-element-image.png)

## テキストエレメント (Text Element)

テキストエレメントは、[フォントアセット](/user-manual/editor/assets/inspectors/font/)を使用してテキスト文字列をレンダリングします。

![Text Element](/img/user-manual/editor/scenes/components/component-element-text.png)

## 共通コンポーネントプロパティ

| プロパティ名 | 説明 |
|----------------|-------------|
| Type           | Elementのタイプ：Group、Image、またはText。 |
| Preset         | レイアウトプリセットを選択すると、AnchorプロパティとPivotプロパティがプリセット値に自動的に設定されます。 |
| Anchor         | エレメントが位置を計算する基準点を決定します。詳細は[Elements#Anchor](/user-manual/user-interface/elements/#anchor)セクションを参照してください。 |
| Pivot          | Elementのピボットポイントの位置を決定します。(0, 0)は左下、(1, 1)は右上です。詳細は[Elements#Pivot](/user-manual/user-interface/elements/#pivot)セクションを参照してください。 |
| Auto Width     | Textのみ。有効にすると、エレメントの幅がテキスト内容に基づいて自動的に計算されます。 |
| Auto Fit Width | Textのみ。有効にすると、テキストがエレメントの幅内に収まるようにフォントサイズが自動的に縮小されます。 |
| Width          | Elementの幅（ピクセル単位）。Auto Widthが有効な場合、またはアンカーが水平方向に分割されている場合は無効になります。 |
| Auto Height    | Textのみ。有効にすると、エレメントの高さがテキスト内容に基づいて自動的に計算されます。 |
| Auto Fit Height| Textのみ。有効にすると、テキストがエレメントの高さ内に収まるようにフォントサイズが自動的に縮小されます。 |
| Height         | Elementの高さ（ピクセル単位）。Auto Heightが有効な場合、またはアンカーが垂直方向に分割されている場合は無効になります。 |
| Margin         | エレメントの端からアンカーまでの距離。アンカーが分割されている場合（1つの軸で不等）のみ使用可能です。左、下、右、上として指定します。 |
| Use Input      | 有効にすると、このElementは入力をチェックし、入力関連のイベントを発生させるエレメントのリストに追加されます。 |
| Batch Group    | このエレメントが属するバッチグループ。バッチングについては[こちら](/user-manual/graphics/advanced-rendering/batching)を参照してください。 |
| Layers         | このエレメントをレンダリングするレイヤー。レイヤーについては[こちら](/user-manual/graphics/layers)を参照してください。 |

## Imageコンポーネントプロパティ

| プロパティ名 | 説明 |
|----------------|-------------|
| Rect           | 表示するテクスチャアセットの領域を定義します。正規化座標でU、V、幅、高さとして指定します。Texture使用時のみ表示されます。 |
| Mask           | イメージエレメントをマスクに切り替えます。マスクはシーンにレンダリングされず、代わりにこのエレメントがレンダリングされる場所にのみ子エレメントがレンダリングされるように制限します。 |
| Texture        | 表示するテクスチャアセット。Texture、Sprite、またはMaterialのいずれか1つのみ割り当て可能です。 |
| Sprite         | 表示するスプライトアセット。Texture、Sprite、またはMaterialのいずれか1つのみ割り当て可能です。 |
| Frame          | 表示するスプライトフレームのインデックス。Spriteが割り当てられている場合のみ表示されます。 |
| Pixels Per Unit| コンポーネントの座標系で1単位に対応するピクセル数。Spriteが割り当てられている場合のみ表示されます。 |
| Material       | レンダリングに使用するカスタムマテリアルアセット。Texture、Sprite、またはMaterialのいずれか1つのみ割り当て可能です。 |
| Fit Mode       | 画像をエレメントの境界内にどのようにフィットさせるか。オプション：Stretch（デフォルト）、Contain（アスペクト比を維持して内側にフィット）、Cover（アスペクト比を維持して塗りつぶし）。TextureまたはSpriteが割り当てられている場合のみ表示されます。 |
| Color          | エレメントをティントする色。 |
| Opacity        | エレメントの透明度。0（完全に透明）から1（完全に不透明）。 |

## Textコンポーネントプロパティ

| プロパティ名 | 説明 |
|-------------------|-------------|
| Alignment         | エレメント内でテキストがどのように配置されるかを決定します。(0, 0)は左下、(1, 1)は右上です。 |
| Font              | テキストのレンダリングに使用するフォントアセット。 |
| Localized         | 有効にすると、テキストはKeyプロパティを使用してローカライズデータから検索されます。 |
| Text              | 表示するテキスト文字列。Localizedが無効な場合のみ表示されます。 |
| Key               | 翻訳されたテキストを検索するために使用するローカライズキー。Localizedが有効な場合のみ表示されます。 |
| Enable Markup     | 有効にすると、テキストにスタイリング用のマークアップタグ（色、太字など）を含めることができます。 |
| Font Size         | フォントをレンダリングするサイズ（Screenコンポーネントのピクセル単位）。Auto Fit WidthとAuto Fit Heightの両方が無効な場合のみ表示されます。 |
| Min Font Size     | Auto Fit WidthまたはAuto Fit Height使用時の最小フォントサイズ。 |
| Max Font Size     | Auto Fit WidthまたはAuto Fit Height使用時の最大フォントサイズ。 |
| Line Height       | 新しい行に移動するためのサイズ（Screenコンポーネントのピクセル単位）。 |
| Wrap Lines        | 有効にすると、テキストエレメントの幅を超えるテキストは次の行に折り返されます。 |
| Max Lines         | 表示する最大行数。この制限を超えるテキストはクリップされます。Wrap Linesが有効な場合のみ表示されます。 |
| Spacing           | 各文字間のスペースに適用する乗数。 |
| Color             | フォントをティントする色。 |
| Opacity           | エレメントの透明度。0（完全に透明）から1（完全に不透明）。 |
| Outline Color     | テキストのアウトラインの色（不透明度用のアルファを含む）。 |
| Outline Thickness | テキストのアウトラインの太さ。0（アウトラインなし）から1（最大の太さ）。 |
| Shadow Color      | テキストの影の色（不透明度用のアルファを含む）。 |
| Shadow Offset     | テキストからの影のオフセット。水平方向と垂直方向のオフセットとして指定します。 |

## 関連項目

- [Screenコンポーネント](screen.md) - ユーザーインターフェースのルートコンポーネント
- [Buttonコンポーネント](button.md) - インタラクティブなボタン要素
- [LayoutGroupコンポーネント](layoutgroup.md) - 子エレメントの自動レイアウト
- [LayoutChildコンポーネント](layoutchild.md) - 個々のエレメントのレイアウト動作をオーバーライド
- [ユーザーインターフェース](/user-manual/user-interface) - ユーザーインターフェースの構築について詳しく学ぶ

## スクリプトインターフェース

[Scriptコンポーネント](script.md)を使用してElementコンポーネントのプロパティを制御できます。Elementコンポーネントのスクリプトインターフェースは[こちら](https://api.playcanvas.com/engine/classes/ElementComponent.html)です。
