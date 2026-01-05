---
title: リアルタイムコラボレーション
---

リアルタイムコラボレーションは、PlayCanvas Editor の中核をなす機能です。これにより、以下のようないくつかのメリットが生まれます。

* 🧑‍🤝‍🧑 複数のユーザーが共同でシーンを構築できます。
* 🆘 あるユーザーが別のユーザーと合流し、アドバイスを提供したり、問題の解決を支援したりできます。
* 🔍 関係者は、プロジェクトの最新状態を確認するためにいつでも訪れることができます。

リアルタイムコラボレーションがインターフェース上でどのように表示されるかを見てみましょう。

## プレゼンスバー

[Viewport](../interface/viewport) の左下隅（CHAT ボタンの隣）に、プレゼンスバーがあります。

![Presence Bar](/img/user-manual/editor/realtime-collaboration/presence-bar.png)

新しいユーザーがシーンに入ると、そのユーザーのアバターがプレゼンスバーに追加されます。同様に、Editor を閉じると、アバターはプレゼンスバーから削除されます。任意のアバターにカーソルを合わせると、関連するユーザー名が表示されます。アバターをクリックすると、そのユーザーのプロフィールページに移動します。

:::tip

各ユーザーには一意の「ユーザーカラー」が割り当てられ、インターフェース全体でそのユーザーを表すために使用されます。

:::

## リアルタイムチャット {#real-time-chat}

CHAT ボタンを選択すると、チャットパネルが展開され、Editor 内にいる他のユーザーにメッセージをブロードキャストできます。

![Chat](/img/user-manual/editor/realtime-collaboration/chat.gif)

チャットメッセージのブラウザ通知は、[設定](interface/settings/editor.md)で切り替えることができます。

:::tip

チャットに URL を貼り付けると、クリック可能なハイパーリンクとしてフォーマットされます。

:::

## ビューポートカメラ

シーン内の各ユーザーは、[Viewport](../interface/viewport) 内で色付きのワイヤーフレームカメラの錐台として表現されます。

![Viewport Cameras](/img/user-manual/editor/realtime-collaboration/viewport-cameras.webp)

ユーザーカメラの陰影付き中央平面にマウスオーバーすると、関連するユーザー名が表示されます。

![Viewport Camera Username](/img/user-manual/editor/realtime-collaboration/viewport-camera-username.png)

## 選択インジケーター

他のユーザーがどのエンティティを選択し、潜在的に編集しているかを知ることは有用です。[Hierarchy](../interface/hierarchy) には、他のユーザーによって選択されたエンティティの右側に四角いインジケーターが表示されます（ユーザーカラーに応じて陰影が付けられます）。

![Selection Indicators](/img/user-manual/editor/realtime-collaboration/selection-indicators.gif)

3D モデルを持つエンティティが任意のユーザーによって選択されると、そのアウトラインが [Viewport](../interface/viewport) にレンダリングされます。

![Viewport Selection](/img/user-manual/editor/realtime-collaboration/viewport-selection.gif)
