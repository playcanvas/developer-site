---
title: エディターインターフェース
description: "PlayCanvas Editorのインターフェースのツアーです。5つの主要エリア、Viewportでの移動、エンティティの選択とトランスフォーム、元に戻す操作、シーンの起動、その他のツールの場所を扱います。"
---

このページでは、Editorのインターフェースを一通り案内します。各エリアの役割、シーン内での移動のしかた、シーン内のものの選び方と動かし方を説明します。

![5つの主要エリアに番号を付けたPlayCanvas Editor](/img/user-manual/editor/getting-started/your-first-app/editor-interface.webp)

1. **[Hierarchy](hierarchy.md)**: シーン内のすべてのエンティティをツリーで表示します。エンティティの選択、作成、名前の変更、親子付け替え、複製はここで行います。
2. **[Viewport](viewport.md)**: シーンの3Dビューです。エンティティをクリックして選択し、ギズモで動かします。
3. **[Inspector](inspector.md)**: エンティティのコンポーネントやアセットの設定など、選択しているもののプロパティです。編集のほとんどはここで行います。
4. **[Assets](../assets/asset-panel.md)**: モデル、マテリアル、テクスチャ、オーディオ、スクリプトなど、プロジェクトで使うファイルです。アセットを使うには、Viewportか、Inspectorのプロパティにドラッグします。
5. **[ツールバー](toolbar.md)**: トランスフォームのツール、元に戻す・やり直し、コードエディター、公開、Editorの設定です。

Viewportの上のバーには、作業中のプロジェクト、ブランチ、シーンが表示されます。そこで**Projects**を選択すると[プロジェクトダッシュボード](../projects/dashboard.md)に戻ります。

## Viewportでの移動 {#moving-around-the-viewport}

| 操作 | 方法 |
| --- | --- |
| 周回 | 左マウスボタンでドラッグします。 |
| パン | 中マウスボタンでドラッグするか、左ボタンで <kbd>Shift</kbd>-ドラッグします。 |
| 見回す | 右マウスボタンでドラッグします。 |
| ズーム | マウスホイールをスクロールします。 |
| 飛行 | <kbd>W</kbd>、<kbd>A</kbd>、<kbd>S</kbd>、<kbd>D</kbd>（または矢印キー）を押し続けて移動し、<kbd>Q</kbd>か<kbd>E</kbd>で下降・上昇します。<kbd>Shift</kbd>を加えると速くなります。 |
| 選択範囲に合わせる | <kbd>F</kbd>を押します。迷ったら、エンティティを選択して<kbd>F</kbd>を押せば戻れます。 |

Viewportの隅にあるビューキューブで、カメラを軸に沿った向きに回せます。カメラと描画モードについては[ビューポート](viewport.md)を参照してください。

## 選択とトランスフォーム {#selecting-and-transforming}

ViewportかHierarchyでエンティティをクリックして選択すると、そのプロパティがInspectorに表示されます。次に、ギズモでトランスフォームを変更します。

| ギズモ | キー | 働き |
| --- | --- | --- |
| Translate | <kbd>1</kbd> | エンティティを移動します。 |
| Rotate | <kbd>2</kbd> | エンティティを回転します。 |
| Scale | <kbd>3</kbd> | エンティティを拡大縮小します。 |

ギズモのハンドルをドラッグすると1軸ずつ変更でき、Inspectorの**Position**、**Rotation**、**Scale**に正確な値を入力することもできます。<kbd>L</kbd>を押すと、ギズモの軸をワールドとローカルで切り替えられます。

元に戻すには<kbd>Ctrl</kbd>+<kbd>Z</kbd>（macOS では <kbd>Cmd</kbd>+<kbd>Z</kbd>）、やり直すには<kbd>Ctrl</kbd>+<kbd>Y</kbd>（macOS では <kbd>Cmd</kbd>+<kbd>Y</kbd>）を押します。元に戻せるのは自分の変更だけで、他の人の変更は戻りません。

## シーンを実行する {#running-your-scene}

Viewport右上の**Launch**を選択するか、<kbd>Ctrl</kbd>+<kbd>Enter</kbd>（macOS では <kbd>Cmd</kbd>+<kbd>Enter</kbd>）を押すと、現在のシーンが新しいタブで実行されます。[起動ページ](launch-page/index.md)はEditorとつながったままなので、実行中に変更して結果を確かめられます。

## その他のツール {#everything-else}

- **メインメニュー**（左上のPlayCanvasロゴ）から、[シーン](../scenes/managing-scenes.md)ダイアログなど、Editorの他のツールを開けます。
- ツールバーの**歯車**で、プロジェクトと現在のシーンの[設定](settings/index.md)がInspectorに表示されます。
- [**操作とキーボードショートカット**](keyboard-shortcuts.md)にすべての操作が載っています。ツールバーの**Controls**ボタンを押すと、Editorの中でも確認できます。

ツールバーのすべてのボタンは[ツールバー](toolbar.md)のページで説明しています。ツールバーは好みに合わせて並べ替えられます。
