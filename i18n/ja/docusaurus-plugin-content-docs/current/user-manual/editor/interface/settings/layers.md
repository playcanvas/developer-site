---
title: レイヤー設定
sidebar_label: Layers
---

レイヤーは、どのオブジェクトが一緒に描画され、どの順序で描画されるかを決定します。

:::note

これらの設定は、現在アクティブな[ブランチ](../../version-control/branches.md)の全ユーザーに影響します。

:::

`LAYERS` セクションに移動し、パネルを展開します。

![Layers Settings](/img/user-manual/editor/interface/settings/layers.webp)

利用可能な設定は次のとおりです。

## レイヤー

- **Add Layer**: シーンオブジェクトを整理するための新しいレイヤーを作成します。
- 各レイヤーは必要に応じて名称変更や削除が可能です。

既定のレイヤー:

- **World**
- **Depth**
- **Skybox**
- **Immediate**
- **UI**

## 描画順序 (Render Order)

レイヤーが描画される順序を定義し、不透明／半透明の描画パスを分離します。

| 設定 | 説明 |
| --- | --- |
| **Layer** | レンダーレイヤーの名前。 |
| **Pass** | 次のいずれか:<ul><li><strong>Opaque</strong>: 不透明メッシュインスタンスを描画</li><li><strong>Transparent</strong>: 半透明メッシュインスタンスを描画</li></ul> |
| **Enabled** | レイヤーのこの部分を有効／無効にします。無効化するとその部分のメッシュインスタンスは描画されません。 |

### 備考

- 正しい表示のために、半透明オブジェクトは不透明オブジェクトの後に描画する必要があります。
- **Render Order** リストでドラッグしてレイヤーの順序を変更できます。
