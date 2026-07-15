---
title: 選択とクリーンアップ
description: SuperSplatでガウシアンを選択、ロック、削除、復元、複製、分離し、フローターの除去やスプラットのクロップを行う方法です。
---

編集前に**Scene Manager**でスプラットを選択します。複数のスプラットが表示されている場合でも、ガウシアンの選択とクリーンアップ操作はアクティブスプラットだけに適用されます。

## 編集モード

SuperSplatは、以下の2つの**_編集モード_**のいずれかで動作します：

- センターモード
- リングモード

これらのモードは、選択の動作とビューポートに表示される内容に影響します。

### センターモード

センターモードでは：

- Gaussiansは、その中心に青い点がオーバーレイ表示されます。
- 選択はすべてのガウシアンの中心に適用され、スクリーンの深度とは無関係です。
- 中心は選択状態に応じて色分けされます。デフォルトでは、未選択のGaussiansには青が、選択されたGaussiansには黄色が使用されます。
- 中心がレンダリングされるサイズは、SETTINGSパネルで制御できます。

<img width="1224" alt="Screenshot 2025-01-06 at 08 51 53" src="/img/user-manual/supersplat/editor/centers-mode.png" />

### リングモード

リングモードでは：

- Gaussiansは、その外縁にリングがオーバーレイ表示されます。
- 選択は、ガウシアンリングの最上位レイヤーにのみ適用されます。
- 選択されたGaussiansは（デフォルトで）黄色に色分けされます。

<img width="1224" alt="Screenshot 2025-01-06 at 08 51 58" src="/img/user-manual/supersplat/editor/rings-mode.png" />

### オーバーレイの無効化

モードオーバーレイは完全に無効にできます（**Tab**キーを使用）。そのため、点もリングも表示されません。

ただし、選択動作は引き続きアクティブなモードによって決定されることに注意してください。

<img width="1224" alt="Screenshot 2025-01-06 at 08 51 48" src="/img/user-manual/supersplat/editor/disable-overlay.png" />

## 選択ツール

Splatsの切り抜きや不要なGaussiansの削除は、SuperSplatの主要な機能です。これを助けるために、8つの選択ツールが利用可能です：

<div class="no-wrap-first-col">

| ツール | 説明 |
|------|-------------|
| ![Picker Select](/img/user-manual/supersplat/editor/select-picker.svg) **Picker Select** | クリックで単一のSplatを選択、またはクリック＆ドラッグで矩形領域を作成して選択。これはデフォルトの選択ツールです。 |
| ![Lasso Select](/img/user-manual/supersplat/editor/select-lasso.svg) **Lasso Select** | クリック＆ドラッグで自由な形状を描画します。図形のアウトライン内のSplatsが選択されます。これは2Dスクリーン空間の選択ツールです。 |
| ![Polygon Select](/img/user-manual/supersplat/editor/select-poly.svg) **Polygon Select** | クリックしてポリゴンの頂点を定義する点を配置します。`Backspace`または`Delete`キーで最後に配置した点を削除できます。最初の点をクリックする、ダブルクリックする、または`Enter`キーを押すことで図形を閉じます。ポリゴン内のSplatsが選択されます。直線のエッジを持つ正確な選択に便利です。 |
| ![Brush Select](/img/user-manual/supersplat/editor/select-brush.svg) **Brush Select** | クリック＆ドラッグで円形ブラシを使用して選択をペイントします。ブラシサイズは `[`（縮小）と `]`（拡大）キーで調整できます。有機的な選択作業に最適です。 |
| ![Flood Select](/img/user-manual/supersplat/editor/select-flood.svg) **Flood Select** | ビューポート上でクリックして、塗りつぶしアルゴリズムに基づいた2D選択マスクを生成します。閾値スライダー（0-1）が塗りつぶしの感度を制御します。このツールは、シーン内で孤立して表示されるはぐれたGaussians（フローターとも呼ばれます）を選択して削除するのに特に便利です。 |
| ![Eyedropper Select](/img/user-manual/supersplat/editor/select-eyedropper.svg) **Eyedropper Select** | ビューポート上でクリックして、色の類似性に基づいてSplatsを選択します。閾値スライダー（0-1）がカラーマッチングの感度を制御します。このツールは、類似した色を持つSplatsのグループを選択するのに便利です。 |
| ![Sphere Select](/img/user-manual/supersplat/editor/select-sphere.svg) **Sphere Select** | ボリューメトリック選択用の3D球体ボリュームを作成します。シーン内の任意の場所をダブルクリックして球の中心を配置するか、移動ギズモで移動するか、**位置**（X、Y、Z）を数値で入力します。ツールバーで**半径**を設定します。**Set**、**Add**、**Remove**、または**Intersect**をクリックして、現在の選択にボリュームを適用します。 |
| ![Box Select](/img/user-manual/supersplat/editor/select-box.svg) **Box Select** | ボリューメトリック選択用の軸に平行な3Dボックスを作成します。シーン内の任意の場所をダブルクリックしてボックスの中心を配置するか、移動ギズモで移動するか、**位置**（X、Y、Z）を数値で入力します。ツールバーで**サイズ**（X、Y、Z）を入力します。**Set**、**Add**、**Remove**、または**Intersect**をクリックして、現在の選択にボリュームを適用します。これは3D空間の特定領域内のSplatsを選択するのに最適です。 |

</div>

### 選択修飾キー {#selection-modifiers}

2D選択ツールは、選択の適用方法を制御する修飾キーをサポートしています：

| 修飾キー | アクション |
|----------|--------|
| **なし** | 新しい選択で現在の選択を置き換える |
| **Shift** | 現在の選択に追加 |
| **Ctrl** | 現在の選択から削除 |
| **Shift + Ctrl** | 現在の選択と新しい選択の両方に含まれるSplatsだけを保持 |

**Intersect**はPicker、Lasso、Polygon、Brush、Flood Selectで利用できます。Eyedropper Selectは**Set**、**Add**、**Remove**に対応しますが、**Intersect**には対応しません。

Picker、Lasso、Polygon、Brush、またはFlood Selectがアクティブな間、カーソルには現在の修飾キーで適用される操作が表示されます。通常の十字カーソルは**Set**を表し、十字カーソルのバッジは**Add**（`+`）、**Remove**（`−`）、または**Intersect**（`∩`）を示します。[Splat Dataパネル](data-panel.md)で値の範囲を選択するときも、同じフィードバックが表示されます。

3D選択ツール（Sphere Select、Box Select）は、修飾キーの代わりにツールバーに**Set**、**Add**、**Remove**、**Intersect**ボタンがあります。

## ロック、削除、復元

**Select > Lock**を使用するか`H`を押すと、選択したガウシアンがロックされます。ロックすると選択が解除され、そのガウシアンを選択または削除できなくなります。完成した領域を保護しながら、近くのジオメトリをクリーンアップする場合に便利です。**Select > Unlock**を選択するか`Shift + H`を押すと、アクティブスプラット内のすべてのロックが解除されます。

選択したガウシアンは、**Select > Delete**、`Delete`、または`Backspace`で削除します。編集中の削除は非破壊です。直前の削除はUndoで取り消せます。また、**Select > Reset**を選択すると、アクティブスプラット内で削除したすべてのガウシアンが復元されます。Resetではロックされたガウシアンのロックは解除されません。

ロック、ロック解除、削除、リセットは編集履歴に記録されます。Scene Managerから行全体を削除する操作は異なり、元に戻せません。

## 選択範囲の複製と分離 {#duplicate-and-separate-a-selection}

ガウシアンが選択されている場合、**Edit**メニューではその選択範囲から別のスプラットを作成できます。

- **Duplicate**は、選択したガウシアンを新しいスプラットへコピーし、元のガウシアンを変更しません。
- **Separate**は、選択したガウシアンから新しいスプラットを作成し、元のスプラットからそのガウシアンを削除します。

どちらの操作も元に戻せます。領域ごとに異なる変形、表示、[Color](color-and-appearance.md)設定を適用する場合に便利です。

## クリーンアップ手順

### フローターの除去

1. **Rings**モードへ切り替え、選択が最前面の表示サーフェスで止まるようにします。
2. 孤立した領域にはFlood Selectを使用し、より大きな領域にはLasso、Brush、Sphere、Box Selectを使用します。
3. カメラを回転し、目的のジオメトリだけが分離されるまで選択範囲へ追加または削除します。
4. `Delete`または`Backspace`を押します。
5. 複数のアングルから結果を確認し、削除しすぎた場合はUndoを使用します。

### スプラットのクロップ

1. Box、Sphere、Lasso、Polygon Selectを使用して、保持する領域を選択します。
2. **Select > Invert**を選択します。
3. 反転した選択範囲を削除します。
4. クリーンアップした結果をエクスポートするか、スプラットとプロジェクトの設定を保持する場合は`.ssproj`を保存します。

### 完成領域の保護

完成した領域を選択し、`H`を押してロックします。残りの選択可能なガウシアンをクリーンアップし、保護した領域を再編集する場合は`Shift + H`を押します。

属性に基づくクリーンアップには、[Splat Dataパネル](data-panel.md)を使用して、低い不透明度や極端なスケールなどの範囲を選択します。

<span id="transforming-splats"></span>
<span id="measuring-and-rescaling-splats"></span>
<span id="merging-splats"></span>

## 次のステップ

[変形、測定、位置合わせ](transforming-splats.md)に進み、選択したガウシアンまたはスプラット全体の変形、スケール調整、キャプチャの位置合わせ、表示中のスプラットの結合を行います。
