---
title: Sprite
---

Spriteコンポーネントは、[Spriteアセット](/user-manual/assets/types/sprite)をシーンにレンダリングおよびアニメーションさせます。

スプライトにはSimpleとAnimatedの2種類があります。

## シンプルスプライト

シンプルスプライトコンポーネントは、アトラスから単一のフレームを表示します。

![Simple Sprite](/img/user-manual/editor/scenes/components/component-sprite-simple.png)

## シンプルスプライトコンポーネントのプロパティ

| プロパティ名 | 説明 |
|-------------|-------------|
| Type        | SimpleまたはAnimated。 |
| Sprite      | 表示するSpriteアセット。 |
| Frame       | 表示するスプライトのフレームインデックス。 |
| Width       | 9スライシング使用時のスプライトの幅（スライス/タイルスプライトの場合のみ表示）。 |
| Height      | 9スライシング使用時のスプライトの高さ（スライス/タイルスプライトの場合のみ表示）。 |
| Color       | スプライトに適用するティントカラー。 |
| Opacity     | スプライトの透明度（0〜1）。 |
| Flip X      | スプライトを水平方向に反転させます。 |
| Flip Y      | スプライトを垂直方向に反転させます。 |
| Batch Group | このスプライトが属するバッチグループ。バッチングについては[こちら](/user-manual/graphics/advanced-rendering/batching)を参照してください。 |
| Layers      | スプライトをレンダリングするレイヤー。 |
| Draw Order  | このスプライトがレンダリングされる順序。数値が小さいものから先にレンダリングされます。 |

## アニメーションスプライト

アニメーションスプライトコンポーネントには、異なるSpriteアセットを再生できる複数のスプライトアニメーションクリップがアタッチされています。

![Animated Sprite](/img/user-manual/editor/scenes/components/component-sprite-animated.png)

## アニメーションスプライトコンポーネントのプロパティ

| プロパティ名 | 説明 |
|------------|-------------|
| Type       | SimpleまたはAnimated。 |
| Color      | スプライトに適用するティントカラー。 |
| Opacity    | スプライトの透明度（0〜1）。 |
| Flip X     | スプライトを水平方向に反転させます。 |
| Flip Y     | スプライトを垂直方向に反転させます。 |
| Speed      | このスプライトコンポーネントのスプライトアニメーションクリップの再生速度に適用される乗数。 |
| Layers     | スプライトをレンダリングするレイヤー。 |
| Draw Order | このスプライトがレンダリングされる順序。数値が小さいものから先にレンダリングされます。 |
| Auto Play  | スプライトが有効になったときに再生するスプライトアニメーションクリップの名前。利用可能なクリップまたはNoneから選択します。 |

## スプライトアニメーションクリップのプロパティ

| プロパティ名 | 説明 |
|-------------------|-------------|
| Name              | スプライトアニメーションクリップの名前。個々のクリップを参照するために使用されます。 |
| Loop              | trueの場合、アニメーションクリップは終点に到達すると始点に戻ります。 |
| Frames Per Second | クリップが再生される速度（フレーム/秒）。 |
| Sprite            | このクリップを再生するために使用されるSpriteアセット。 |

## スクリプトインターフェース

[Scriptコンポーネント](/user-manual/editor/scenes/components/script)を使用してSpriteコンポーネントのプロパティを制御できます。Spriteコンポーネントのスクリプトインターフェースは[こちら](https://api.playcanvas.com/engine/classes/SpriteComponent.html)です。
