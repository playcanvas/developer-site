---
title: Layout Group
---

LayoutGroupコンポーネントは、エンティティが子ElementのElementコンポーネントのサイズと位置を指定できるようにします。

詳細については[レイアウトグループ][0]のセクションを参照してください。

![LayoutGroup component](/img/user-manual/scenes/components/component-layoutgroup.png)

## Properties

| プロパティ名       | 説明 |
|----------------|-------------|
| オリエンテーション (Orientation)    | レイアウトを水平または垂直に実行するかどうかを指定します。 |
| ReverseX       | x軸に沿って子エレメント (Element) の順序を反転します。 |
| ReverseY       | y軸に沿って子エレメント (Element) の順序を反転します。 |
| アラインメント (Alignment)      | 子エレメント (Element) の水平および垂直配置を指定します。値は0から1までで、[0、0]が左下で[1、1]が右上です。 |
| パディング (Padding)        | 子エレメント (Element) の配置の前にコンテナ内に適用されるパディング。左、下、右、上の値で指定します。 |
| スペーシング (Spacing)        | 各子エレメント (Element) 間に適用されるスペーシングです。 |
| Width Fitting  | 子エレメント (Element) のレイアウトを実行するときに適用されるフィッティングロジックです。 |
| Height Fitting | 子エレメント (Element) のレイアウトを実行するときに適用されるフィッティングロジックです。 |
| ラップ (Wrap)           | コンテナのサイズが超過された場合、子エレメント (Element) を新しい行/列にラップするかどうかを指定します。 |

## スクリプトインターフェース

[Scriptコンポーネント][2]を使用してLayoutGroupコンポーネントのプロパティを制御できます。 LayoutGroupコンポーネントのスクリプトインターフェイスは[こちら][3]にあります。

[0]: /user-manual/user-interface/layout-groups
[2]: /user-manual/scenes/components/script
[3]: https://api.playcanvas.com/engine/classes/LayoutGroupComponent.html
