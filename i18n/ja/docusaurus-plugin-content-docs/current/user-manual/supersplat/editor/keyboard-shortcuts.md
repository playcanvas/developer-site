---
title: キーボードショートカット
description: "ナビゲーション、選択、ツール、パネル、アニメーションタイムラインに関するSuperSplat Editorのキーボードショートカット一覧です。"
---

Editor内の一覧は、**Help > Keyboard Shortcuts**から開けます。以下の表はデフォルトのキー割り当てです。

macOSでは、UndoやSelect Allなどのアプリケーションコマンドについて、`Ctrl`と記載されたショートカットで`Cmd`を使用します。選択範囲を操作する`Ctrl`修飾キーは、すべてのプラットフォームで`Ctrl`のままです。

## 編集と選択

| 操作 | Windows/Linux | macOS |
|---|---|---|
| 元に戻す | `Ctrl + Z` | `Cmd + Z` |
| やり直す | `Ctrl + Shift + Z` | `Cmd + Shift + Z` |
| すべて選択 | `Ctrl + A` | `Cmd + A` |
| 選択を解除 | `Ctrl + Shift + A` | `Cmd + Shift + A` |
| 選択を反転 | `Ctrl + I` | `Cmd + I` |
| 選択したガウシアンを削除 | `Delete`または`Backspace` | `Delete`または`Backspace` |
| 選択範囲をロック | `H` | `H` |
| すべてロック解除 | `Shift + H` | `Shift + H` |

Picker、Lasso、Polygon、Brush、Floodで選択するときは、`Shift`を押すと追加、`Ctrl`を押すと削除、`Shift + Ctrl`を押すと現在の選択範囲との共通部分だけを保持します。

## ツールと表示

| 操作 | ショートカット |
|---|---|
| Move / Rotate / Scale | `1` / `2` / `3` |
| Picker / Lasso / Polygon | `R` / `L` / `P` |
| Brush / Flood | `B` / `O` |
| Eyedropper | `Ctrl + E`（macOSでは`Cmd + E`） |
| ブラシサイズを縮小 / 拡大 | `[` / `]` |
| 現在のツールを終了 | `Escape` |
| ワールド / ローカル座標を切り替え | `Shift + C` |
| Centers / Ringsモードを切り替え | `M` |
| 編集オーバーレイを切り替え | `Tab` |
| グリッドを切り替え | `G` |
| カメラ情報を切り替え | `I` |
| Splat Dataパネルを切り替え | `Ctrl + D`（macOSでは`Cmd + D`） |
| Timelineパネルを切り替え | `Ctrl + T`（macOSでは`Cmd + T`） |

## カメラ

| 操作 | ショートカット |
|---|---|
| 選択範囲またはアクティブシーンにフォーカス | `F` |
| カメラをリセット | `Shift + F` |
| Orbit / Flyコントロールを切り替え | `V` |
| 前進 / 後退 / 左 / 右へFly移動 | `W` / `S` / `A` / `D` |
| 下 / 上へFly移動 | `Q` / `E` |
| Fly移動を高速化 / 低速化 | `Shift` / `Alt`を押したままにする |

マウス、タッチ、Fly、ビューキューブの操作については、[カメラコントロール](camera-controls.md)を参照してください。

## Timeline

| 操作 | ショートカット |
|---|---|
| 再生または一時停止 | `Space` |
| 前 / 次のフレーム | `,` / `.` |
| 前 / 次のキーフレーム | `<` / `>` |
| キーフレームを追加 | `Enter` |
| キーフレームを削除 | `Shift + Enter` |

テキストまたは数値入力にフォーカスがある間、ショートカットは無視されます。一部のキーはツール固有の動作もします。たとえば、Measureがアクティブな間は`Delete`で測定マーカーを削除し、Polygonの描画中は閉じていない最後の点を削除します。
