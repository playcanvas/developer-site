---
title: Button
---

Buttonコンポーネントは、[Screen](screen.md)コンポーネントと[Element](element.md)コンポーネントで使用するユーザーインターフェイスボタンを作成するための便利なショートカットです。

Buttonコンポーネントは、2つのトランジションモードで使用できます。*Sprite Change* では、各ボタンの状態に異なるスプライトまたはフレームを使用します。*Tint* では、単一のスプライトを各状態で異なる色で着色します。

## 共通プロパティ

| プロパティ名        | 説明 |
|-----------------|-------------|
| Active          | 有効にすると、ボタンが反応してイベントを発生させます。無効にするとボタンは非アクティブ状態に設定されます。 |
| Image           | 入力イベントを検出するために使用されるImage Elementエンティティ。 |
| Hit Padding     | 入力イベントをテストする際に含まれるImage Element周囲の追加スペース。左、下、右、上のパディング値として指定します。 |
| Transition Mode | トランジションに使用するエフェクトのタイプ。Sprite ChangeまたはTint。 |

## スプライトチェンジ (Sprite Change)・プロパティ

![Sprite Change Button](/img/user-manual/editor/scenes/components/component-button-sprite-change.png)

| プロパティ名        | 説明 |
|-----------------|-------------|
| Hover Sprite    | ボタンがホバー状態にあるときに使用されるSpriteアセット。 |
| Hover Frame     | ボタンがホバー状態にあるときに表示されるスプライトフレーム。 |
| Pressed Sprite  | ボタンがプレス状態にあるときに使用されるSpriteアセット。 |
| Pressed Frame   | ボタンがプレス状態にあるときに表示されるスプライトフレーム。 |
| Inactive Sprite | ボタンがアクティブでないときに使用されるSpriteアセット。 |
| Inactive Frame  | ボタンがアクティブでないときに使用されるスプライトフレーム。 |

## ティントプロパティ (Tint Properties)

![Tint Button](/img/user-manual/editor/scenes/components/component-button-tint.png)

| プロパティ名      | 説明 |
|---------------|-------------|
| Hover Tint    | ボタンがホバー状態されたときにImage Elementを調整する色。 |
| Pressed Tint  | ボタンがプレス状態されたときにImage Elementを調整する色。 |
| Inactive Tint | ボタンがアクティブでないときにImage Elementを調整する色。 |
| Fade Duration | 異なる状態の色をブレンドするための時間（ミリ秒単位） |

## 関連項目

- [Elementコンポーネント](element.md) - ボタンのビジュアルに必要
- [Screenコンポーネント](screen.md) - ユーザーインターフェースのルートコンポーネント
- [ユーザーインターフェース](/user-manual/user-interface) - ユーザーインターフェースの構築について詳しく学ぶ

## スクリプトインターフェース

[Scriptコンポーネント](script.md)を使用してButtonコンポーネントのプロパティを制御できます。Buttonコンポーネントのスクリプトインターフェースは[こちら](https://api.playcanvas.com/engine/classes/ButtonComponent.html)です。
