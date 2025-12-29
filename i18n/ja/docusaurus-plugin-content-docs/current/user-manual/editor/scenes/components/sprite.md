---
title: Sprite
---

Spriteコンポーネントは、[Spriteアセット][1]をシーンに表示させ、アニメーションさせるものです。

シンプルタイプとアニメーションタイプの2種類があります。

## シンプルスプライト (Simple Sprites)

シンプルSpriteコンポーネントは、アトラスからの単一のフレームを表示します。

![Simple Sprite](/img/user-manual/editor/scenes/components/component-sprite-simple.png)

## シンプルSpriteコンポーネントのプロパティ

| プロパティ名    | 説明 |
|-------------|-------------|
| タイプ        | シンプルまたはアニメーション。 |
| Sprite      | 表示するSpriteアセット。 |
| Frame       | 表示するスプライトのフレームインデックス。 |
| Color       | スプライトに適用する色。 |
| Opacity     | スプライトの透明度。 |
| Flip X      | スプライトを水平方向に反転させる。 |
| Flip Y      | スプライトを垂直方向に反転させる。 |
| レイヤーの一覧 (Layers)      | スプライトをレンダリングするレイヤー。 |
| Draw Order  | このスプライトがレンダリングされる順序。数値が小さいものから先にレンダリングされます。 |
| Batch Group | このモデルが属するバッチグループ。それについては[こちら][6]を参照してください。 |

## アニメーションスプライト

アニメーションSpriteコンポーネントには、異なるSpriteアセットを再生できる複数のスプライトアニメーションクリップが添付されています。

![Animated Sprite](/img/user-manual/editor/scenes/components/component-sprite-animated.png)

## アニメーションSpriteコンポーネントのプロパティ

| プロパティ名   | 説明 |
|------------|-------------|
| タイプ       | シンプルまたはアニメーション。 |
| Frame      | 表示するスプライトのフレームインデックス。 |
| Color      | スプライトに適用する色。 |
| Opacity    | スプライトの透明度。 |
| Flip X     | スプライトを水平方向に反転させる。 |
| Flip Y     | スプライトを垂直方向に反転させる。 |
| スピード      | このSpriteコンポーネントで再生されるスプライトアニメーションクリップの速度に適用される乗数。 |
| レイヤーの一覧 (Layers)     | スプライトをレンダリングするレイヤー。 |
| Draw Order | このスプライトがレンダリングされる順序。数値が小さいものから先にレンダリングされます。 |
| 自動再生 (Auto Play)  | スプライトを有効にしたときに再生するスプライトアニメーションクリップの名前。 |

## スプライトアニメーションクリップのプロパティ

| プロパティ名 | 説明 |
|----------|-------------|
| 名前     | スプライトアニメーションクリップの名前。個々のクリップを参照するために使用されます。 |
| ループ (Loop)     | trueの場合、アニメーションクリップは終点に到達すると始点に戻ります。 |
| FPS      | 秒間フレーム数で再生されるクリップの速度。 |
| Sprite   | このクリップを再生するために使用されるSpriteアセット。 |

## スクリプトインターフェース

[Scriptコンポーネント][4]を使用して、Spriteコンポーネントのプロパティを制御できます。Spriteコンポーネントのスクリプトインターフェースについては、[こちら][5]を参照してください。

[1]: /user-manual/assets/types/sprite
[4]: /user-manual/editor/scenes/components/script
[5]: https://api.playcanvas.com/engine/classes/SpriteComponent.html
[6]: /user-manual/graphics/advanced-rendering/batching
