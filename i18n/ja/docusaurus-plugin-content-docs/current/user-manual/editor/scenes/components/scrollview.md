---
title: Scrollview
---

Scrollviewコンポーネントは、ユーザーインターフェース内のスクロール可能な領域を定義します。Scrollviewは[Scrollbar](scrollbar.md)コンポーネントを介してスクロールできます。

詳細については、[User Interface](/user-manual/user-interface)セクションを参照してください。

![Scrollview Component](/img/user-manual/editor/scenes/components/component-scrollview.png)

## プロパティ

| プロパティ名 | 説明 |
|-------------------------|-------------|
| Scroll Mode             | ユーザーがコンテンツの末尾を超えてスクロールしたときの動作を指定します。オプション: Clamp（境界で停止）、Bounce（バウンスして戻る）、Infinite（無限にスクロール）。 |
| Bounce                  | Bounceモードのみ。バウンスバックする前にコンテンツが移動する距離を制御します（0〜10）。 |
| Friction                | スロー操作時にコンテンツがどれだけ自由に動くかを制御します（例：電話でのフリックやマウスホイールのフリング）。1の値はコンテンツがすぐに停止することを意味し、0はコンテンツが永遠に動き続けることを意味します（またはスクロールモードに応じて境界に達するまで）。 |
| Use Mouse Wheel         | マウスが境界内にあるときに、マウスホイールでスクロール（水平および垂直）するかどうか。 |
| Mouse Wheel Sensitivity | Use Mouse Wheelのみ。マウスホイールの水平および垂直感度。方向を0に設定すると、その方向のスクロールが無効になります。デフォルトは[1, 1]。 |
| Viewport                | コンテンツがスクロールするマスクされたビューポート領域として使用するエンティティ。このエンティティにはElementコンポーネントが必要です。 |
| Content                 | スクロールするコンテンツ自体を含むエンティティ。このエンティティにはElementコンポーネントが必要です。 |
| Horizontal              | 水平スクロールを有効にするかどうか。 |
| Scrollbar (horizontal)  | Horizontalのみ。水平スクロールバーとして使用するエンティティ。このエンティティにはScrollbarコンポーネントが必要です。 |
| Visibility (horizontal) | Horizontalのみ。スクロールバーの表示を制御します。オプション: Show Always、Show When Required（コンテンツがビューポートを超えた場合のみ）。 |
| Vertical                | 垂直スクロールを有効にするかどうか。 |
| Scrollbar (vertical)    | Verticalのみ。垂直スクロールバーとして使用するエンティティ。このエンティティにはScrollbarコンポーネントが必要です。 |
| Visibility (vertical)   | Verticalのみ。スクロールバーの表示を制御します。オプション: Show Always、Show When Required（コンテンツがビューポートを超えた場合のみ）。 |

## スクリプトインターフェース

[Scriptコンポーネント](script.md)を使用してScrollviewコンポーネントのプロパティを制御できます。Scrollviewコンポーネントのスクリプトインターフェースは[こちら](https://api.playcanvas.com/engine/classes/ScrollViewComponent.html)です。
