---
title: リアルタイムコラボレーション
description: プレゼンスアバター、プロジェクトチャット、チームメイトのカメラ視錐台、階層の選択マーカー、他ユーザーがピックしたモデルのハイライトなど、コラボレーションの UX を扱います。
---

import StepVideo from '@site/src/components/StepVideo';

リアルタイムコラボレーションは、PlayCanvas Editor の中核をなす機能です。これにより、以下のようないくつかのメリットが生まれます。

* 🧑‍🤝‍🧑 複数のユーザーが共同でシーンを構築できます。
* 🆘 あるユーザーが別のユーザーと合流し、アドバイスを提供したり、問題の解決を支援したりできます。
* 🔍 関係者は、プロジェクトの最新状態を確認するためにいつでも訪れることができます。

リアルタイムコラボレーションがインターフェース上でどのように表示されるかを見てみましょう。

## プレゼンスバー

[Viewport](../interface/viewport) の左下隅（CHAT ボタンの隣）に、プレゼンスバーがあります。

![Presence Bar](/img/user-manual/editor/realtime-collaboration/presence-bar.webp)

新しいユーザーがシーンに入ると、そのユーザーのアバターがプレゼンスバーに追加されます。同様に、Editor を閉じると、アバターはプレゼンスバーから削除されます。任意のアバターにカーソルを合わせると、関連するユーザー名が表示されます。アバターをクリックすると、そのユーザーのプロフィールページに移動します。

:::tip

各ユーザーには一意の「ユーザーカラー」が割り当てられ、インターフェース全体でそのユーザーを表すために使用されます。

:::

## リアルタイムチャット {#real-time-chat}

CHAT ボタンを選択すると、チャットパネルが展開され、Editor 内にいる他のユーザーにメッセージをブロードキャストできます。

<StepVideo src="/video/user-manual/editor/realtime-collaboration/chat.mp4" poster="/img/user-manual/editor/realtime-collaboration/chat.webp" label="Chat" width={1976} height={816} />

チャットメッセージのブラウザ通知は、[設定](interface/settings/editor.md)で切り替えることができます。

:::tip

チャットに URL を貼り付けると、クリック可能なハイパーリンクとしてフォーマットされます。

:::

## ビューポートカメラ

シーン内の各ユーザーは、[Viewport](../interface/viewport) 内で色付きのワイヤーフレームカメラの錐台として表現されます。

<video autoPlay muted loop controls playsInline src='/video/editor-collaboration-viewport-cameras.mp4' style={{width: '100%', height: 'auto'}} />

ユーザーカメラの陰影付き中央平面にマウスオーバーすると、関連するユーザー名が表示されます。

![Viewport Camera Username](/img/user-manual/editor/realtime-collaboration/viewport-camera-username.webp)

## 選択インジケーター

他のユーザーがどのエンティティを選択し、潜在的に編集しているかを知ることは有用です。[Hierarchy](../interface/hierarchy) には、他のユーザーによって選択されたエンティティの右側に四角いインジケーターが表示されます（ユーザーカラーに応じて陰影が付けられます）。

<StepVideo src="/video/user-manual/editor/realtime-collaboration/selection-indicators.mp4" poster="/img/user-manual/editor/realtime-collaboration/selection-indicators.webp" label="Selection Indicators" width={485} height={248} />

3D モデルを持つエンティティが任意のユーザーによって選択されると、そのアウトラインが [Viewport](../interface/viewport) にレンダリングされます。

<StepVideo src="/video/user-manual/editor/realtime-collaboration/viewport-selection.mp4" poster="/img/user-manual/editor/realtime-collaboration/viewport-selection.webp" label="Viewport Selection" width={1388} height={851} />
