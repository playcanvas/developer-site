---
title: 操作とキーボードショートカット
description: Editor のマウスとキーボードによるカメラ操作、テンキーでの視点切り替え、ビューポートでの選択と修飾キー、起動、複製、名前変更、変換ギズモ、選択のフレーム、チェックポイント、削除などのショートカットです。
---

macOS では、<kbd>Ctrl</kbd> の代わりに <kbd>Cmd</kbd> を、<kbd>Alt</kbd> の代わりに <kbd>Option</kbd> を使用します。

## カメラコントロール {#camera-controls}

エディターのカメラはマウスとキーボードで操作します。移動キーは、キーボードのフォーカスがテキストフィールドにない限り、マウスボタンを押さなくても単独で機能します。

| 操作 | コントロール |
| --- | --- |
| 回転 | 左ボタンでドラッグ |
| パン (Pan) | 中央ボタンでドラッグ<br /><kbd>Shift</kbd> を押しながら左ボタンでドラッグ |
| 視点変更 | 右ボタンでドラッグ |
| ズーム (Zoom) / ドリー (Dolly) | マウスホイール |
| ズーム (高速) | <kbd>Alt</kbd> + マウスホイール |
| 移動 | <kbd>W</kbd> <kbd>A</kbd> <kbd>S</kbd> <kbd>D</kbd><br />矢印キー |
| 下へ / 上へ移動 | <kbd>Q</kbd> / <kbd>E</kbd><br /><kbd>Page Down</kbd> / <kbd>Page Up</kbd> |
| 移動 (高速) | 移動中に <kbd>Shift</kbd> を押し続ける |

正投影ビュー（Top、Bottom、Front、Back、Left、Right）では、左または右のマウスボタンでドラッグするとビューがパンし、<kbd>W</kbd> と <kbd>S</kbd> でビューが上下に移動します。

## ビューポートのカメラ {#viewport-cameras}

<kbd>Num Lock</kbd> をオンにした状態でテンキーを使って、エディターの[カメラ](viewport.md#cameras)を切り替えます。<kbd>Ctrl</kbd> を押しながら操作すると、反対側からシーンを表示します。

| 操作 | キーボードショートカット |
| --- | --- |
| 前面 / 背面ビュー | <kbd>Numpad 1</kbd> / <kbd>Ctrl</kbd>+<kbd>Numpad 1</kbd> |
| 右側 / 左側ビュー | <kbd>Numpad 3</kbd> / <kbd>Ctrl</kbd>+<kbd>Numpad 3</kbd> |
| 上部 / 下部ビュー | <kbd>Numpad 7</kbd> / <kbd>Ctrl</kbd>+<kbd>Numpad 7</kbd> |
| 透視投影 / 正投影の切り替え | <kbd>Numpad 5</kbd> |
| 透視投影ビュー | <kbd>Numpad 0</kbd> |

<kbd>Numpad 5</kbd> を押すと正投影ビューから Perspective カメラに切り替わり、もう一度押すとその正投影ビューに戻ります。Perspective カメラのまま軸に沿った向きにするには、[View Cube](viewport.md#view-cube) をクリックします。

## マウス操作 {#general-mouse-controls}

| 操作 | コントロール |
| --- | --- |
| エンティティの選択 | クリック |
| 選択へのエンティティの追加 / 選択からの除外 | <kbd>Ctrl</kbd> を押しながらクリック |
| 矩形選択 | <kbd>Ctrl</kbd> を押しながらドラッグ |
| エンティティの移動 / 回転 / スケール (ギズモに応じたもの) | ギズモをドラッグ |

矩形選択では、矩形の内側に描画されているエンティティが選択され、現在の選択と置き換わります。

## 修飾キー {#general-modifier-keys}

| 操作 | コントロール |
| --- | --- |
| ギズモの操作中にエディターのスナップ設定を切り替え | エンティティをドラッグ中に <kbd>Shift</kbd> を押す |
| 親を変更する際にエンティティの変換を維持しない | エンティティの親を変更する際に <kbd>Ctrl</kbd> を押す |
| 起動ページまたはコードエディターをポップアップウィンドウで開く | <kbd>Shift</kbd> を押しながら Launch ボタンまたは Code Editor ボタンをクリック |

## キーボードショートカット {#keyboard-shortcuts}

| 操作 | 説明 | キーボードショートカット |
| --- | --- | --- |
| 起動 | シーンを新規タブで起動します。 | <kbd>Ctrl</kbd>+<kbd>Enter</kbd> |
| 新規エンティティ | 選択しているエンティティの子として新規エンティティを作成します。エンティティを選択していない場合は、シーンのルートに作成します。 | <kbd>Ctrl</kbd>+<kbd>E</kbd> |
| エンティティを複製 | 選択されたエンティティとそのすべての子を複製します。 | <kbd>Ctrl</kbd>+<kbd>D</kbd> |
| エンティティ名の変更 | 選択しているエンティティの名前フィールドにフォーカスします。 | <kbd>F2</kbd> |
| アセット名の変更 | 選択しているアセットの名前フィールドにフォーカスします。 | <kbd>N</kbd> または <kbd>F2</kbd> |
| すべて選択 | エンティティを選択している場合はシーン内のすべてのエンティティを、アセットを選択している場合は Assets パネルに表示されているすべてのアセットを選択します。 | <kbd>Ctrl</kbd>+<kbd>A</kbd> |
| エンティティ / アセットのコピー | 現在のエンティティ/アセットの選択項目をコピーします。 | <kbd>Ctrl</kbd>+<kbd>C</kbd> |
| エンティティ / アセットの貼り付け | コピーしたエンティティ/アセットを現在選択されているエンティティ/フォルダの下に貼り付けます。 | <kbd>Ctrl</kbd>+<kbd>V</kbd> |
| アセットの貼り付け (フォルダを維持) | コピーしたアセットを、[フォルダ構造](../assets/asset-panel.md#copy-and-paste-between-projects)を維持したまま貼り付けます。 | <kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>V</kbd> |
| 削除 | 現在の選択項目を削除します。 | <kbd>Delete</kbd><br /><kbd>Ctrl</kbd>+<kbd>Backspace</kbd> |
| 親フォルダ | Assets パネルで 1 つ上のフォルダに移動します。 | <kbd>Backspace</kbd> |
| 選択をフレーム表示 | 3D ビューで、現在選択しているエンティティにフォーカスします。 | <kbd>F</kbd> |
| 移動 | 3D ビューで移動ギズモをアクティブにします。 | <kbd>1</kbd> |
| 回転 | 3D ビューで回転ギズモをアクティブにします。 | <kbd>2</kbd> |
| スケール (Scale) | 3D ビューで拡大縮小ギズモをアクティブにします。 | <kbd>3</kbd> |
| エレメントのサイズ変更 | 3D ビューで、[UI エレメントのサイズを変更](/user-manual/user-interface/elements/#element-resizing)するギズモをアクティブにします。 | <kbd>4</kbd> |
| World / Local | ローカル座標系とワールド座標系のギズモを切り替えます。 | <kbd>L</kbd> |
| パネル表示/非表示 | すべてのパネルを非表示にしたり表示したりして、3D ビューを最大化します。 | <kbd>Space</kbd> |
| ベイク | [ランタイムライトマッパー](/user-manual/graphics/lighting/runtime-lightmaps)を使用してライティングを再ベイクします。 | <kbd>Ctrl</kbd>+<kbd>B</kbd> |
| 前の選択 | 前に選択していた項目を選択します。 | <kbd>Shift</kbd>+<kbd>X</kbd> |
| 元に戻す | 最後のアクションを元に戻します。 | <kbd>Ctrl</kbd>+<kbd>Z</kbd> |
| やり直し | 最後の操作をやり直します。 | <kbd>Ctrl</kbd>+<kbd>Y</kbd><br /><kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>Z</kbd> |
| 新規チェックポイント | Version Control パネルを開き、[チェックポイントを作成](../version-control/checkpoints.md#creating-a-checkpoint)するフォームを表示します。 | <kbd>Ctrl</kbd>+<kbd>S</kbd> |
| コードエディター | [コードエディター](../scripting/code-editor.md)を開きます。 | <kbd>Ctrl</kbd>+<kbd>I</kbd> |
| プロジェクト | プロジェクトページに切り替えます。開いていない場合は新しいタブで開きます。 | <kbd>Ctrl</kbd>+<kbd>O</kbd> |
| どうすれば...？ | ミニチュートリアルの検索ツールバーの切り替え | <kbd>Ctrl</kbd>+<kbd>Space</kbd> |
| コントロールを表示 | エディターのコントロールを表示します。 | <kbd>Shift</kbd>+<kbd>?</kbd> |
