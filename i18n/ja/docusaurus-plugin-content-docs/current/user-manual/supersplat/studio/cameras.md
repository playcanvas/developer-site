---
title: カメラ
description: "SuperSplat Studioで公開済みスプラットの開始カメラを設定します — ビューポートで位置とターゲットをフレーミングし、視野角を設定します。"
---

[Studio](/user-manual/supersplat/studio/)の左パネルの**Scene**タブにある**Cameras**セクションは、公開済みスプラットの**開始カメラ**を定義します。これは、訪問者が[シーンページ](/user-manual/supersplat/scene-page)を開いたときに着地するビューです（[カメラアニメーショントラック](/user-manual/supersplat/editor/timeline)や[注釈](/user-manual/supersplat/studio/annotations)が開始姿勢を駆動する場合は除きます）。カメラには、**位置**、**ターゲット**（見る点）、**視野角**があります。

:::note

Studioは現在、単一のカメラのみをサポートしています。複数カメラのサポートは近日対応予定です。

:::

<!-- TODO: media — /img/user-manual/supersplat/studio/cameras-panel.png — カメラ一覧があるCamerasパネル -->

## カメラの設定

カメラは**Camera 1**としてリストに表示され、2つのアクションがあります：

- **Go to** — ビューポートをカメラの保存された姿勢へ移動します。
- **Edit** — 編集モードに入ります。編集中にビューポートをオービット、パン、ズームして構図を決めると、カメラの**位置**と**ターゲット**が現在のビューから取り込まれます。もう一度**Edit**をクリックすると終了します。

カメラの位置とターゲットは、座標を入力するのではなく、ビューポートでフレーミングして設定します — 数値の位置／ターゲット入力欄はありません。

## レンズ（視野角）

カメラリストの下にある**Lens**コントロールで、スライダーと数値入力（度数）から**視野角**を設定します。これは単一のグローバル設定で、開始カメラとすべての注釈カメラに適用されます。デフォルトは**75°**です。

## デフォルト

新しいシーンは、合理的なデフォルトを持つカメラで始まります — 環境スタイルのシーンでは位置`[0, 2, 0]`、ターゲット`[2, 2, 0]`、**75°**の視野角。オブジェクトスタイルのシーンでは位置`[2, 2, -2]`、ターゲット`[0, 0, 0]`、**75°**の視野角です。ビューポートをフレーミングして**Edit**で姿勢を取り込み、**Lens**の視野角を調整して、訪問者が最初に見たときのシーンの構図を決めてください。

## カメラの使われ方

- **初期フレーミング** — リストの最初のカメラは、訪問者がシーンページを開いたときのデフォルト開始ビューです（`startMode: 'default'`）。[カメラアニメーショントラック](/user-manual/supersplat/editor/timeline)や[注釈](/user-manual/supersplat/studio/annotations)はシーンのstart modeを通じてこれを上書きできます。
- **注釈の姿勢** — 各[注釈](/user-manual/supersplat/studio/annotations)には、注釈が選択されたときにビューアがアニメーションする独自のカメラ姿勢が埋め込まれています。注釈の姿勢はCamerasリストのエントリとは独立しています。

## 関連項目

- [カメラアニメーション（タイムライン）](/user-manual/supersplat/editor/timeline) — SuperSplatエディターで作成する、キーフレーム化されたカメラモーション
- [Annotations](/user-manual/supersplat/studio/annotations) — カメラ姿勢を取れる3D配置のホットスポット
- [Experience Settings](/user-manual/supersplat/studio/experience-settings) — カメラリストを格納するJSONコントラクト
