---
title: キーボードショートカット
description: "ナビゲーション、選択、ツール、パネル、アニメーションタイムラインに関するSuperSplat Editorのキーボードショートカット一覧です。"
---

Editor内の一覧は、**Help > Keyboard Shortcuts**から開けます。以下の表はデフォルトのキー割り当てです。

macOSでは、UndoやSelect Allなどのアプリケーションコマンドについて、<kbd>Ctrl</kbd>と記載されたショートカットで<kbd>Cmd</kbd>を使用します。選択範囲を操作する<kbd>Ctrl</kbd>修飾キーは、すべてのプラットフォームで<kbd>Ctrl</kbd>のままです。

## 編集と選択

| 操作 | Windows/Linux | macOS |
|---|---|---|
| 元に戻す | <kbd>Ctrl</kbd>+<kbd>Z</kbd> | <kbd>Cmd</kbd>+<kbd>Z</kbd> |
| やり直す | <kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>Z</kbd> | <kbd>Cmd</kbd>+<kbd>Shift</kbd>+<kbd>Z</kbd> |
| すべて選択 | <kbd>Ctrl</kbd>+<kbd>A</kbd> | <kbd>Cmd</kbd>+<kbd>A</kbd> |
| 選択を解除 | <kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>A</kbd> | <kbd>Cmd</kbd>+<kbd>Shift</kbd>+<kbd>A</kbd> |
| 選択を反転 | <kbd>Ctrl</kbd>+<kbd>I</kbd> | <kbd>Cmd</kbd>+<kbd>I</kbd> |
| 選択したガウシアンを削除 | <kbd>Delete</kbd>または<kbd>Backspace</kbd> | <kbd>Delete</kbd>または<kbd>Backspace</kbd> |
| 選択範囲をロック | <kbd>H</kbd> | <kbd>H</kbd> |
| すべてロック解除 | <kbd>Shift</kbd>+<kbd>H</kbd> | <kbd>Shift</kbd>+<kbd>H</kbd> |
| X-Rayを切り替え | <kbd>N</kbd> | <kbd>N</kbd> |

Rectangle、Lasso、Polygon、Brush、Sphere Brush、Flood、Eyedropperで選択するときは、<kbd>Shift</kbd>を押すと追加、<kbd>Ctrl</kbd>を押すと削除、<kbd>Shift</kbd>+<kbd>Ctrl</kbd>を押すと現在の選択範囲との共通部分だけを保持します。<kbd>N</kbd>と<kbd>M</kbd>が何を変えるかは、[選択モードとX-Ray](editing-splats.md#selection-mode-and-x-ray)を参照してください。

## ツールと表示

| 操作 | ショートカット |
|---|---|
| Move / Rotate / Scale | <kbd>1</kbd> / <kbd>2</kbd> / <kbd>3</kbd>（Box SelectionまたはSphere Selectionがアクティブな間は、代わりに選択ボリュームのギズモを切り替えます） |
| Rectangle / Lasso / Polygon Selection | <kbd>R</kbd> / <kbd>L</kbd> / <kbd>P</kbd> |
| Brush / Sphere Brush Selection | <kbd>B</kbd> / <kbd>Shift</kbd>+<kbd>B</kbd> |
| Flood Selection | <kbd>O</kbd> |
| Eyedropper Selection | <kbd>Ctrl</kbd>+<kbd>E</kbd>（macOSでは<kbd>Cmd</kbd>+<kbd>E</kbd>） |
| ブラシサイズを縮小 / 拡大 | <kbd>[</kbd> / <kbd>]</kbd>、または<kbd>Alt</kbd> + マウスホイール |
| ポリゴンを閉じる | <kbd>Enter</kbd> |
| ポリゴンの最後の点を削除 | <kbd>Backspace</kbd> |
| MeasureまたはOrientのアクティブな点を削除 | <kbd>Delete</kbd>または<kbd>Backspace</kbd> |
| 現在のツールを終了 | <kbd>Esc</kbd> |
| ワールド / ローカル座標を切り替え | <kbd>Shift</kbd>+<kbd>C</kbd> |
| Centers / Ringsモードを切り替え | <kbd>M</kbd> |
| マーカーを切り替え | <kbd>Tab</kbd> |
| グリッドを切り替え | <kbd>G</kbd> |
| カメラ情報を切り替え | <kbd>I</kbd> |
| Splat Dataパネルを切り替え | <kbd>Ctrl</kbd>+<kbd>D</kbd>（macOSでは<kbd>Cmd</kbd>+<kbd>D</kbd>） |
| Timelineパネルを切り替え | <kbd>Ctrl</kbd>+<kbd>T</kbd>（macOSでは<kbd>Cmd</kbd>+<kbd>T</kbd>） |

## カメラ

| 操作 | ショートカット |
|---|---|
| 選択範囲またはアクティブスプラットをフレーミング | <kbd>F</kbd>（Box、Sphere、Measure、Orientツールがアクティブな間は、代わりにそのツールをフレーミングします） |
| カメラをリセット | <kbd>Shift</kbd>+<kbd>F</kbd> |
| Orbit / Flyコントロールを切り替え | <kbd>V</kbd> |
| 前進 / 後退 / 左 / 右へFly移動 | <kbd>W</kbd> / <kbd>S</kbd> / <kbd>A</kbd> / <kbd>D</kbd> |
| 下 / 上へFly移動 | <kbd>Q</kbd> / <kbd>E</kbd> |
| Fly移動を高速化 / 低速化 | <kbd>Shift</kbd> / <kbd>Alt</kbd>を押したままにする |

マウス、タッチ、Fly、ビューキューブの操作については、[カメラコントロール](camera-controls.md)を参照してください。

## Timeline

| 操作 | ショートカット |
|---|---|
| 再生または一時停止 | <kbd>Space</kbd> |
| 前 / 次のフレーム | <kbd>,</kbd> / <kbd>.</kbd> |
| 前 / 次のキーフレーム | <kbd>&lt;</kbd> / <kbd>&gt;</kbd>（<kbd>Shift</kbd>+<kbd>,</kbd> / <kbd>Shift</kbd>+<kbd>.</kbd>） |
| キーフレームを追加 | <kbd>Enter</kbd> |
| キーフレームを削除 | <kbd>Shift</kbd>+<kbd>Enter</kbd> |
| キーフレームを現在のカメラポーズで上書き | <kbd>Ctrl</kbd>を押しながらキーフレームをクリック |
| キーフレームをコピー | <kbd>Shift</kbd>を押しながらキーフレームをドラッグ |

## ファイル

| 操作 | Windows/Linux | macOS |
|---|---|---|
| Re-export（前回のエクスポートを繰り返す） | <kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>E</kbd> | <kbd>Cmd</kbd>+<kbd>Shift</kbd>+<kbd>E</kbd> |

テキストまたは数値入力にフォーカスがある間、ショートカットは無視されます。ブラシサイズのショートカットはアクティブなブラシに作用し、BrushとSphere Brushはサイズを共有します。
