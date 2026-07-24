---
title: Scrollbar
description: PlayCanvas の Scrollbar Component は、関連する Scroll View Component のスクロール位置を駆動するドラッグ可能なハンドル Element を提供します。
---

:::ai

- **[Editor MCP Server](/user-manual/ai/editor-mcp-server/):** Scrollbarをエンティティへ追加または削除し、プロパティを設定して、シーンの起動やキャプチャで確認してください。

:::

Scrollbarコンポーネントは、[Scroll View](scrollview.md)コンポーネント用のスクロールコントロールを定義します。

詳細については、[ユーザーインターフェース](/user-manual/user-interface)セクションを参照してください。

![Scrollbar Component](/img/user-manual/editor/scenes/components/component-scrollbar.png)

## プロパティ

| プロパティ名 | 説明 |
|-------------|-------------|
| Orientation | スクロールバーが水平方向に動くか垂直方向に動くかを制御します。オプション: Horizontal、Vertical。 |
| Value       | スクロールバーの現在の位置の値（0から1の範囲）。 |
| Handle      | スクロールバーのハンドルとして使用されるエンティティ。このエンティティにはElementコンポーネントが必要です。 |
| Handle Size | トラックのサイズに対するハンドルの相対的なサイズ（0から1の範囲）。垂直スクロールバーの場合、値が1のときはハンドルがトラックの全高を占めます。 |

## 関連項目

- [Scroll Viewコンポーネント](scrollview.md) - このスクロールバーを使用するスクロール可能エリア
- [Elementコンポーネント](element.md) - スクロールバーハンドルに必要
- [ユーザーインターフェース](/user-manual/user-interface) - ユーザーインターフェースの構築について詳しく学ぶ

## スクリプトインターフェース

[Scriptコンポーネント](script.md)を使用してScrollbarコンポーネントのプロパティを制御できます。Scrollbarコンポーネントのスクリプトインターフェースは[こちら](https://api.playcanvas.com/engine/classes/ScrollbarComponent.html)です。
