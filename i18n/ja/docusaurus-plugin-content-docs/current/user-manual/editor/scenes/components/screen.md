---
title: Screen
---

Screenコンポーネントは、ユーザーインターフェースの領域とレンダリングを定義します。Screenコンポーネントに追加された子要素はすべてElementコンポーネントを持つ必要があります。

詳細については、[User Interface](/user-manual/user-interface)セクションを参照してください。

![Screen Component](/img/user-manual/editor/scenes/components/component-screen.png)

## プロパティ

| プロパティ名 | 説明 |
|------------------|-------------|
| Screen Space     | 有効にすると、スクリーンの内容がキャンバスのオーバーレイとして2Dでレンダリングされます。 |
| Resolution       | Screen Spaceが無効の場合。スクリーン座標の解像度（幅と高さ）。右および上に移動するとスクリーン座標が増加します。 |
| Ref Resolution   | Screen Spaceのみ、Scale ModeがBlendの場合。スケールファクターの計算に使用される参照解像度（幅と高さ）。 |
| Scale Mode       | Screen Spaceのみ。ウィンドウサイズがスクリーンサイズと一致しない場合のUIのスケーリング方法を決定します。オプション: None（スケーリングなし）、Blend（参照解像度と実際の解像度の比率でスケーリング）。 |
| Scale Blend      | Screen Spaceのみ、Scale ModeがBlendの場合。水平（0）と垂直（1）のスケーリング間の重み付け。 |
| Priority         | 同じレイヤー内のScreenコンポーネントがレンダリングされる順序を決定します。優先度が高いほど上位にレンダリングされます。0から127の整数である必要があります。 |

## スクリプトインターフェース

[Scriptコンポーネント](script.md)を使用してScreenコンポーネントのプロパティを制御できます。Screenコンポーネントのスクリプトインターフェースは[こちら](https://api.playcanvas.com/engine/classes/ScreenComponent.html)です。
