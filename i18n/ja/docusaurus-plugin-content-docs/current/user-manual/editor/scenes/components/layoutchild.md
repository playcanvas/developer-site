---
title: Layout Child
---

LayoutChildコンポーネントは、LayoutGroupコンポーネントによって制御されるエレメントが、Layout Groupのデフォルト動作をオーバーライドすることを可能にします。

詳細については[レイアウトグループ](/user-manual/user-interface/layout-groups)のセクションを参照してください。

![LayoutChild Component](/img/user-manual/editor/scenes/components/component-layoutchild.png)

## Properties

| プロパティ名              | 説明 |
|-----------------------|-------------|
| Min Width             | Elementが描画される最小幅を設定します。 |
| Max Width             | Elementが描画される最大幅を設定します。 |
| Min Height            | Elementが描画される最小高さを設定します。 |
| Max Height            | Elementが描画される最大高さを設定します。 |
| Fit Width Proportion  | レイアウトグループがストレッチまたはシュリンクに設定されている場合、Elementが占有する追加スペースの割合を設定します。 |
| Fit Height Proportion | レイアウトグループがストレッチまたはシュリンクに設定されている場合、Elementが占有する追加スペースの割合を設定します。 |
| Exclude from Layout   | レイアウトの計算時にこのElementを完全に無視します。 |

## 関連項目

- [LayoutGroupコンポーネント](layoutgroup.md) - レイアウトを制御する親コンポーネント
- [Elementコンポーネント](element.md) - UIレイアウトに必要
- [レイアウトグループ](/user-manual/user-interface/layout-groups) - レイアウトグループについて詳しく学ぶ

## スクリプトインターフェース

[Scriptコンポーネント](script.md)を使用して、LayoutChildコンポーネントのプロパティを制御できます。LayoutChildコンポーネントのスクリプトインターフェースは[こちら](https://api.playcanvas.com/engine/classes/LayoutChildComponent.html)です。
