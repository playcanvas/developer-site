---
title: Button
---

Buttonコンポーネントは、[Screen][1]コンポーネントと[Element][2]コンポーネントで使用するユーザーインターフェイスボタンを作成するための便利なショートカットです。

Buttonコンポーネントは、2つのトランジションモードで使用できます。*Sprite Swap* では、各ボタンの状態に異なるスプライトまたはフレームを使用します。*Tint* では、単一のスプライトを各状態で異なる色で着色します。

## 共通プロパティ

| プロパティ名        | 説明 |
|-----------------|-------------|
| Active          | 有効にすると、ボタンが反応してイベントを発生させ、無効にするとボタンは非アクティブ状態に設定されます。 |
| Image           | 入力イベントを検出に使用されるImage Elementエンティティ。 |
| Hit Padding     | 入力イベントをテストする際に含まれるImage Element周囲の追加スペース。 |
| Transition Mode | トランジションに使用するエフェクトのタイプ。Sprite SwapまたはTint。 |

## スプライトスワップ (Sprite Swap)・プロパティ

![Sprite Swap Button](/img/user-manual/scenes/components/component-button-sprite-change.png)

| プロパティ名        | 説明 |
|-----------------|-------------|
| Hover Sprite    | ボタンがホバー状態にあるときに使用されるSpriteアセット。 |
| Hover Frame     | ボタンがホバー状態にあるときに表示されるスプライトフレーム。 |
| Pressed Sprite  | ボタンがプレス状態にあるときに使用されるSpriteアセット。 |
| Pressed Frame   | ボタンがプレス状態にあるときに表示されるスプライトフレーム。 |
| Inactive Sprite | ボタンがアクティブでないときに使用されるSpriteアセット。 |
| Inactive Frame  | ボタンがアクティブでないときに使用されるスプライトフレーム。 |

## ティントプロパティ (Tint Properties)

![Tint Button](/img/user-manual/scenes/components/component-button-tint.png)

| プロパティ名      | 説明 |
|---------------|-------------|
| Hover Tint    | ボタンがホバー状態されたときにImage Elementを調整する色。 |
| Pressed Tint  | ボタンがプレス状態されたときにImage Elementを調整する色。 |
| Inactive Tint | ボタンがアクティブでないときにImage Elementを調整する色。 |
| Fade Duration | 異なる状態の色をブレンドするための時間（ミリ秒単位） |

## スクリプトインターフェース

Buttonコンポーネントのプロパティは、[Scriptコンポーネント][5]を使用して制御できます。 Buttonコンポーネントのスクリプティングインターフェースは[こちら][6]です。

[1]: /user-manual/editor/scenes/components/screen
[2]: /user-manual/editor/scenes/components/element
[5]: /user-manual/editor/scenes/components/script
[6]: https://api.playcanvas.com/engine/classes/ButtonComponent.html
