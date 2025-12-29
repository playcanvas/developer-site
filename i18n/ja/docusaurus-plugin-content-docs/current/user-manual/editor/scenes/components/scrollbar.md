---
title: Scrollbar
---

Scrollbarコンポーネントは、[Scrollview][1]コンポーネント用のスクロール制御を定義します。

詳細については、[ユーザーインターフェイス][2]のセクションを参照してください。

![Scrollbar Component](/img/user-manual/editor/scenes/components/component-scrollbar.png)

## コンポーネントのプロパティ

| プロパティ名    | 説明 |
|-------------|-------------|
| オリエンテーション (Orientation) | スクロールバーが水平方向に動くか、垂直方向に動くかを制御します。 |
| Value       | スクロールバーの現在位置の値。値の範囲は0から1です。 |
| Handle      | スクロールバーのハンドルとして使用されるエンティティ。このエンティティにはScrollbarコンポーネントが必要です。 |
| Handle Size | ハンドルのサイズ。トラックのサイズに対する相対的なサイズ。値の範囲は0から1です。垂直スクロールバーの場合、値が1の場合、ハンドルはトラックの全高を占めます。 |

[1]: /user-manual/editor/scenes/components/scrollview
[2]: /user-manual/user-interface
