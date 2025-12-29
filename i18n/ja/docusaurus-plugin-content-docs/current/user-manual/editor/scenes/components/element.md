---
title: Element
---

Screenコンポーネント以下にElementコンポーネントがある場合、Elementコンポーネントを使用して画像やテキストなどの2D要素で構成されたユーザーインターフェースを作成することができます。Elementは、アンカーや回転点などのレイアウトプロパティを提供します。

詳細については、[ユーザーインターフェース][1]セクションを参照してください。

## グループエレメント (Group Element)

グループエレメントは、Elementコンポーネントのレイアウトプロパティだけを提供します。

![Group Element](/img/user-manual/editor/scenes/components/component-element-group.png)

## イメージエレメント (Image Element)

Image Elementは、Textureアセットまたは単色を使用して画像を表示します。

![Image Element](/img/user-manual/editor/scenes/components/component-element-image.png)

## テキストエレメント (Text Element)

テキストエレメントは、[Fontアセット][4]を使用してテキストを描画します。

![Text Element](/img/user-manual/editor/scenes/components/component-element-text.png)

## 共通コンポーネントプロパティ

| プロパティ名    | 説明 |
|-------------|-------------|
| タイプ        | Elementのタイプ:Group、Image、またはText。 |
| Preset      | レイアウトプリセットを選択すると、アンカープロパティと回転プロパティがプリセット値に自動的に設定されます。 |
| アンカー (Anchor)      | Elementが位置を計算する基準点を決定します。[Elements#Anchor][6]セクションを参照してください。 |
| ピボット (Pivot)       | Elementの回転点を決定します。 (0、0) は左下で、 (1、1) は右上です。[Elements#Pivot][7]セクションを参照してください。 |
| Size        | Elementの幅と高さ。他の設定によって自動的に計算される場合があります。 |
| マージン (Margin)      | アンカーが分割されている場合(1つの軸で等しくない場合)に、エレメントの端からアンカーまでの距離。 |
| Use Input   | 有効にすると、このエレメントが入力をチェックし、入力に関連するイベントを発生させるエレメントリストに追加されます。 |
| レイヤーの一覧 (Layers)      | このエレメントをレンダリングするレイヤー。レイヤーについては[こちら][8]を参照してください。 |
| Batch Group | このモデルが属するバッチグループ。バッチングについてはこちらを参照してください。[here][9]. |

## Imageコンポーネントのプロパティ

| プロパティ名 | 説明 |
|----------|-------------|
| Rect     | 表示するTextureアセットの領域を定義します。 |
| Mask     | Image Elementをマスクに切り替えます。マスクはシーンにレンダリングされず、代わりに、このエレメントがレンダリングされる場所に子エレメントを限定します。 |
| テクスチャ (Texture)  | 表示されるTextureアセット。 |
| Color    | エレメントの色をティントします。 |
| Opacity  | エレメントの透明度。 |

## Text Component(テキストコンポーネント)プロパティ

| プロパティ名    | 説明 |
|-------------|-------------|
| アラインメント (Alignment)   | テキストの配置方法を決定します。 (0、0) は左下で (1、1) は右上です。 |
| テキスト (Text)        | 表示するテキスト文字列。 |
| Font Size   | フォントのサイズ。Screenコンポーネントのピクセル単位。 |
| Line Height | 新しい行のために下に移動するScreenコンポーネントのピクセルサイズ。 |
| スペーシング (Spacing)     | 各文字間の進行量に対して乗算する値。 |
| Font        | 使用するフォントアセット。 |
| Color       | フォントをティントする色。 |
| Opacity     | エレメントの透明度。 |
| Wrap Lines  | テキストを折り返すことを有効にします。テキストエレメントの幅を超えるテキストは、次の行に折り返されます。 |

[1]: /user-manual/user-interface
[4]: /user-manual/assets/types/font/
[6]: /user-manual/user-interface/elements/#anchor
[7]: /user-manual/user-interface/elements/#pivot
[8]: /user-manual/graphics/layers
[9]: /user-manual/graphics/advanced-rendering/batching
