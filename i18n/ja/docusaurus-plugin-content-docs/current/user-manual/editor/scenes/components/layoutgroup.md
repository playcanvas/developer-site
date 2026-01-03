---
title: Layout Group
---

LayoutGroupコンポーネントは、エンティティが子ElementコンポーネントのElementコンポーネントのサイズと位置を指定できるようにします。

詳細については[レイアウトグループ](/user-manual/user-interface/layout-groups)のセクションを参照してください。

![LayoutGroup Component](/img/user-manual/editor/scenes/components/component-layoutgroup.png)

## プロパティ

| プロパティ名 | 説明 |
|----------------|-------------|
| Orientation    | レイアウトを水平または垂直に実行するかどうか。オプション：Horizontal、Vertical。 |
| Reverse X      | X軸に沿って子エレメントの順序を反転します。 |
| Reverse Y      | Y軸に沿って子エレメントの順序を反転します。 |
| Alignment      | 子エレメントの水平および垂直配置を指定します。値は0から1までで、(0, 0)が左下、(1, 1)が右上です。 |
| Padding        | 子エレメントを配置する前にコンテナ内に適用されるパディング。左、下、右、上の値として指定します。 |
| Spacing        | 各子エレメント間に適用されるスペーシング。水平方向と垂直方向の値として指定します。 |
| Width Fitting  | 子エレメントを水平方向に配置およびスケーリングする際に適用されるフィッティングロジック。オプション：None、Stretch、Shrink、Both。 |
| Height Fitting | 子エレメントを垂直方向に配置およびスケーリングする際に適用されるフィッティングロジック。オプション：None、Stretch、Shrink、Both。 |
| Wrap           | コンテナのサイズを超えた場合に、子エレメントを新しい行/列にラップするかどうか。 |

## スクリプトインターフェース

[Scriptコンポーネント](script.md)を使用してLayoutGroupコンポーネントのプロパティを制御できます。LayoutGroupコンポーネントのスクリプトインターフェースは[こちら](https://api.playcanvas.com/engine/classes/LayoutGroupComponent.html)です。
