---
title: エディター設定
sidebar_label: Editor
---

既定では、エディターは多くのユーザーに適した設定になっています。必要に応じて、エディターの既定の動作を変更できます。

:::note

これらの設定はあなた個人にのみ適用され、プロジェクト全体でグローバルに保持されます。セッションをまたいで維持（スティッキー）されます。

:::

`EDITOR` セクションに移動し、パネルを展開します。

![Editor Settings](/img/user-manual/editor/interface/settings/editor.webp)

利用可能な設定は次のとおりです。

## 設定

| 設定 | 説明 |
| --- | --- |
| **Grid Divisions** | グリッドの水平方向あたりのセル数。0 に設定するとグリッドを無効化します。 |
| **Grid Division Size** | 各セルのサイズ。 |
| **Snap** | [ギズモ](../viewport.md#gizmos)のスナップ間隔。Shiftを押すかツールバーの Snap トグルでギズモ使用中にスナップを有効化します。 |
| **Zoom Sensitivity** | エディターのビューポートでのズーム感度。 |
| **Camera Depth Grabpass** | エディタービューポート用のデプスマップテクスチャを生成します。特定のマテリアル効果のプレビューに必要です。 |
| **Camera Color Grabpass** | エディタービューポート用のカラーマップテクスチャを生成します。特定のマテリアル効果のプレビューに必要です。 |
| **Camera Clip Near** | エディターカメラの Near クリップ値。ゲームには影響しません。 |
| **Camera Clip Far** | エディターカメラの Far クリップ値。ゲームには影響しません。 |
| **Camera Clear Color** | エディターカメラのクリアカラー。ゲームには影響しません。 |
| **Camera Tonemapping** | エディターカメラのトーンマッピング。ゲームには影響しません。 |
| **Camera Gamma** | エディターカメラのガンマ補正。ゲームには影響しません。 |
| **Show Fog** | ビューポートでのフォグ描画を有効化。 |
| **Icons Size** | エディタービューポートに表示されるアイコンのサイズ。 |
| **Locale** | エディターおよび Launch 実行時のプレビュー用ロケール。あなたのみに表示され、他のメンバーには共有されません。 |
| **Chat Notifications** | エディター内蔵の[リアルタイムチャット](../../realtime-collaboration.md#real-time-chat)の通知を受け取ります。 |
| **Rename Duplicated Entities** | 有効化すると、重複作成したエンティティに連番を付けて一意にします（例: 'Box' → 'Box2'）。 |
| **Lightmapper Auto Bake** | [ランタイムライトマッパー](/user-manual/graphics/lighting/runtime-lightmaps)がシーン更新のたびに自動リベイクするかを制御します。 |
