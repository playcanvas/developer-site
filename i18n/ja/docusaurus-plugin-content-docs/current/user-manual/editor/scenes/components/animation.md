---
title: Animation (Legacy)
---

:::warning

Animationコンポーネントは非推奨です。これは[Anim](anim.md)コンポーネントに置き換えられました。

:::

Animationコンポーネントを使用すれば、エンティティはModelコンポーネントに割り当てられているモデルに適用することのできるアニメーションを指定できます。

![Animation Component](/img/user-manual/editor/scenes/components/component-animation.png)

## Properties

| プロパティ名 | 説明 |
|----------|-------------|
| アセット (Asset)   | このエンティティで利用可能なアニメーションアセット。複数のアニメーションをピッカーコントロールで割り当てることが可能です。 |
| スピード    | アニメーションの再生速度の乗数です。0はアニメーションの再生を停止し、1はアセットの通常の再生速度を表し、負の値はアニメーションを逆再生します。範囲は-2から2です。 |
| Activate | チェックを入れると、コンポーネントは読み込み時にアニメーションの再生を開始します。 |
| ループ (Loop)     | チェックを入れると、アニメーションが完了すると常に開始位置に戻ります。そうでない場合、アニメーションは最終フレームで停止します。 |

## 関連項目

- [Animコンポーネント](anim.md) - このコンポーネントの推奨される代替

## スクリプトインターフェース

[Scriptコンポーネント](script.md)を使用してAnimationコンポーネントのプロパティを制御することができます。Animationコンポーネントのスクリプトインターフェースは[こちら](https://api.playcanvas.com/engine/classes/AnimationComponent.html)です。
