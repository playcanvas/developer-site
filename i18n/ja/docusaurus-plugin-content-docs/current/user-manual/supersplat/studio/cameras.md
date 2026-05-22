---
title: Cameras
description: "SuperSplat Studioで公開済みスプラットの開始カメラを1つ以上定義します — 位置、ターゲット、視野角。"
---

[Studio](/user-manual/supersplat/studio/)の**Cameras**パネルは、公開済みスプラットの1つ以上のカメラを定義します。各カメラには、初期**位置**、**ターゲット**（カメラが見る点）、**視野角**があります。訪問者が[シーンページ](/user-manual/supersplat/scene-page)を開くと、リストの**最初**のカメラに着地します（[アニメーショントラック](/user-manual/supersplat/studio/animations)や[注釈](/user-manual/supersplat/studio/annotations)が開始姿勢を駆動する場合は除きます）。

<!-- TODO: media — /img/user-manual/supersplat/studio/cameras-panel.png — カメラ一覧があるCamerasパネル -->

## Camerasパネル

パネルには定義済みカメラのリストが表示されます。追加、削除、並べ替えはこのリストで行います。右側のインスペクタには、現在選択しているカメラの入力欄が表示されます。

| フィールド | 説明 |
|-------|-------------|
| **Position** | ワールド空間でのカメラの`[x, y, z]`。 |
| **Target** | カメラが見るワールド空間の`[x, y, z]`。 |
| **Field of View** | 度数表記の垂直FOV。 |

## デフォルト

新しいシーンは、合理的なデフォルトを持つ1つのカメラで始まります — 環境スタイルのシーンでは、デフォルトは位置`[0, 2, 0]`、ターゲット`[2, 2, 0]`、**75°**の視野角です。オブジェクトスタイルのシーンでは、デフォルトは位置`[2, 2, -2]`、ターゲット`[0, 0, 0]`、**75°**の視野角です。値を調整して、訪問者が最初に見た時のシーンの構図を決めてください。

## カメラの使われ方

- **初期フレーミング** — リストの最初のカメラは、訪問者がシーンページを開いたときのデフォルト開始ビューです（`startMode: 'default'`）。[アニメーショントラック](/user-manual/supersplat/studio/animations)や[注釈](/user-manual/supersplat/studio/annotations)はシーンのstart modeを通じてこれを上書きできます。
- **注釈の姿勢** — 各[注釈](/user-manual/supersplat/studio/annotations)には、注釈が選択されたときにビューアがアニメーションする独自のカメラ姿勢が埋め込まれています。注釈の姿勢はCamerasリストのエントリとは独立しています。

## 関連項目

- [Animations](/user-manual/supersplat/studio/animations) — キーフレーム化されたカメラモーション
- [Annotations](/user-manual/supersplat/studio/annotations) — カメラ姿勢を取れる3D配置のホットスポット
- [Experience Settings](/user-manual/supersplat/studio/experience-settings) — カメラリストを格納するJSONコントラクト
