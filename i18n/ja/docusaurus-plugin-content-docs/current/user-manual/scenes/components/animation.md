---
title: Animation
---

:::warning

Animationコンポーネントは非推奨です。これは[Anim](/user-manual/scenes/components/anim)コンポーネントに置き換えられました。

:::

Animationコンポーネントを使用すれば、エンティティはModelコンポーネントに割り当てられているモデルに適用することのできるアニメーションを指定できます。

Animationコンポーネントは、コンポーネントパネルの右上にあるトグルを使用して有効または無効にすることができます。有効にすると、コンポーネントは割り当てられたアニメーションを再生します。

![Animation component][1]

## Properties

| プロパティ名 | 説明 |
|----------|-------------|
| アセット (Asset)   | このエンティティで利用可能なアニメーションアセット。複数のアニメーションをピッカーコントロールで割り当てることが可能です。 |
| スピード    | アニメーションの再生速度の乗数です。0はアニメーションの再生を停止し、1はアセットの通常の再生速度を表します。 |
| Activate | チェックを入れると、コンポーネントは読み込み時にアニメーションの再生を開始します。 |
| ループ (Loop)     | チェックを入れると、アニメーションが完了すると常に開始位置に戻ります。そうでない場合、アニメーションは最終フレームで停止します。 |

## スクリプトインターフェース

[Scriptコンポーネント][2]を使用してAnimationコンポーネントのプロパティを制御することができます。Animationコンポーネントのスクリプトインターフェースは[こちら][3]です。

[1]: /images/user-manual/scenes/components/component-animation.png
[2]: /user-manual/scenes/components/script
[3]: /api/pc.AnimationComponent.html
