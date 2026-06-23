---
title: オンデマンドレンダリング
description: "変化があったときだけGaussian splatをレンダリングする方法：autoRenderを無効にしたバックグラウンドのストリーミング、frame:requestイベント、オンデマンドレンダリングについて。"
---

多くの場合静止しているシーン（プロダクトビューア、コンフィギュレータ、検査ツールなど）では、毎フレーム描画し直す必要はありません。PlayCanvasは**オンデマンド**でレンダリングできます。[`app.autoRender`](https://api.playcanvas.com/engine/classes/AppBase.html#autorender)を`false`に設定し、何かが実際に変化したときだけ[`app.renderNextFrame`](https://api.playcanvas.com/engine/classes/AppBase.html#rendernextframe)を設定してフレームを描画します。これにより、静止しているシーンではGPUがアイドル状態のままになります。一般的な手法については、最適化ガイドラインの[オンデマンドレンダリング](/user-manual/optimization/guidelines)を参照してください。

Gaussian splatには1つ注意点があります。大規模な[Streamed SOG](/user-manual/gaussian-splatting/building/lod-streaming)シーンは、バックグラウンドでデータの読み込みと詳細レベルの調整を続けます。この処理は**レンダリングから分離**されており、フレームが描画されるかどうかに関係なく毎フレーム実行されます。そのため、アプリがアイドル状態でもシーンのストリーミングは進行します。スプラットシステムは、このバックグラウンド処理によって描画する価値のある新しいデータが生成されたときに、`frame:request`イベントで通知します。

## 基本的なパターン

自動レンダリングを無効にし、スプラットシステムから要求があったときにレンダリングします：

```javascript
app.autoRender = false;

app.systems.gsplat.on('frame:request', () => {
    app.renderNextFrame = true;
});
```

`frame:request`は、レンダリングすれば表示される新しいデータ（新たにストリーミングされた詳細）をスプラットのストリーミングが生成したとき、または非同期のソート結果が適用可能になったときに、レンダリングの前に毎フレーム1回発生します。これを処理することで、毎フレームレンダリングしなくても、ストリーミング中のシーンが完全な詳細に収束していきます。

## `frame:request`が発生する変更と、自分でレンダリングする変更

`frame:request`は**スプラットデータ自体への変更**を対象としており、エンジンが自動的に発生させます。*現在*のシーンの見え方だけに影響する変更では発生しないため、それらは自分でレンダリングを要求します：

| 変更 | `frame:request`が発生する？ |
| --- | --- |
| ストリーミングの進行（LODの詳細の読み込み） | はい — 自動で処理されます |
| スプラットバジェット、LOD距離・範囲 | はい — 自動で処理されます |
| カメラの移動 | いいえ — 自分でレンダリングします |
| キャンバス／ビューポートのリサイズ | いいえ — 自分でレンダリングします |
| マテリアルパラメータ（アルファクリップなど） | いいえ — 自分でレンダリングします |
| シェーダーアニメーション（アニメーションするリビールエフェクトなど） | いいえ — 自分でレンダリングします |
| スプラット・カメラ・レイヤーの追加／削除 | いいえ — 自分でレンダリングします |

「自分でレンダリングします」の行に該当するものは、変更を行うときに`app.renderNextFrame = true`を設定してください。例えば、フライ／オービットカメラをインタラクティブに保つには、カメラが移動したときにレンダリングします：

```javascript
const lastPos = new pc.Vec3();
const lastRot = new pc.Quat();

app.on('update', () => {
    const pos = camera.getPosition();
    const rot = camera.getRotation();
    if (!pos.equals(lastPos) || !rot.equals(lastRot)) {
        app.renderNextFrame = true;
        lastPos.copy(pos);
        lastRot.copy(rot);
    }
});
```

:::note
カメラ、レイヤー、またはgsplatコンポーネントの追加・削除は、**レンダリングされた**フレームでのみ反映されます。そのため、このような変更の後は少なくとも1フレームがレンダリングされるようにしてください。これが、シーンの初回読み込み中は通常どおりレンダリングを続け、起動して動作し始めてからオンデマンドレンダリングに切り替える理由です（下記参照）。
:::

## 最初のフレームを高速に表示する手法との組み合わせ

オンデマンドレンダリングは、[最初のフレームを高速に表示する](/user-manual/gaussian-splatting/building/performance#fast-time-to-first-frame)手法と自然に組み合わせられます。シーンの読み込み中（およびイントロ／リビールアニメーションの再生中）は毎フレームレンダリングし、すべての準備が整ったらオンデマンドに切り替えます：

1. シーンが最初のフレームを読み込む間は`app.autoRender = true`のままにします。
2. スプラットシステムの`frame:ready`イベントで、シーンが完全に読み込まれ、ソートされ、描画されたことが通知されるのを待ちます。
3. `app.autoRender = false`に切り替え、`frame:request`と、自分で行うカメラ／リサイズ／設定の変更からレンダリングを駆動します。

```javascript
const gsplatSystem = app.systems.gsplat;

const onFrameReady = (camera, layer, ready, loadingCount) => {
    if (ready && loadingCount === 0) {
        gsplatSystem.off('frame:ready', onFrameReady);

        // シーンが完全に表示された — ここからオンデマンドレンダリングに切り替える
        app.autoRender = false;
    }
};
gsplatSystem.on('frame:ready', onFrameReady);

gsplatSystem.on('frame:request', () => {
    app.renderNextFrame = true;
});
```

`frame:ready`と`frame:request`は補完的です。`frame:ready`は*レンダリングされた*フレームが完全にソートされ完成したことを通知し（初回表示やキャプチャのワークフローに有用）、`frame:request`は描画する価値のある新しいストリーミングデータがあることを通知します。

## ライブサンプル

このサンプルは、ストリーミングを使用しない単一のスプラットをオンデマンドでレンダリングします。スプラットが表示されると描画を停止し、カメラの移動、ウィンドウのリサイズ、または設定の変更があったときにのみ再びレンダリングします。

<EngineExample id="gaussian-splatting/simple-on-demand" title="シンプル（オンデマンド）" />

## 関連項目

- [オンデマンドレンダリング（一般）](/user-manual/optimization/guidelines)
- [パフォーマンス](/user-manual/gaussian-splatting/building/performance)、[最初のフレームを高速に表示する](/user-manual/gaussian-splatting/building/performance#fast-time-to-first-frame)
- [Streamed SOG](/user-manual/gaussian-splatting/building/lod-streaming)
- [GSplatComponentSystem API](https://api.playcanvas.com/engine/classes/GSplatComponentSystem.html)
