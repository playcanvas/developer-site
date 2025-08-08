---
title: Splatsの編集
---

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
- 中心がレンダリングされるサイズは、VIEW OPTIONSパネルで制御できます。

<img width="1224" alt="Screenshot 2025-01-06 at 08 51 53" src="/img/user-manual/gaussian-splatting/editing/supersplat/centers-mode.png" />

### リングモード

リングモードでは：

- Gaussiansは、その外縁にリングがオーバーレイ表示されます。
- 選択は、ガウシアンリングの最上位レイヤーにのみ適用されます。
- 選択されたGaussiansは（デフォルトで）黄色に色分けされます。

<img width="1224" alt="Screenshot 2025-01-06 at 08 51 58" src="/img/user-manual/gaussian-splatting/editing/supersplat/rings-mode.png" />

### オーバーレイの無効化

モードオーバーレイは完全に無効にできます（スペースバーのショートカットを使用）。そのため、点もリングも表示されません。

ただし、選択動作は引き続きアクティブなモードによって決定されることに注意してください。

<img width="1224" alt="Screenshot 2025-01-06 at 08 51 48" src="/img/user-manual/gaussian-splatting/editing/supersplat/disable-overlay.png" />

## Splatsの選択と削除

Splatsの切り抜きや不要なGaussiansの削除は、SuperSplatの主要な機能です。これを助けるために、6つの選択ツールが利用可能です：

| | ツール | 説明 |
|-|------|-------------|
| ![Picker Select](/img/user-manual/gaussian-splatting/editing/supersplat/select-picker.svg) | **Picker Select** | クリックで選択、またはクリック＆ドラッグで矩形選択。 |
| ![Lasso Select](/img/user-manual/gaussian-splatting/editing/supersplat/select-lasso.svg) | **Lasso Select** | クリック＆ドラッグで任意の図形を描画します。図形のアウトライン内のSplatsが選択されます。 |
| ![Polygon Select](/img/user-manual/gaussian-splatting/editing/supersplat/select-poly.svg) | **Polygon Select** | Lasso Selectに似ています。クリックして、任意の図形の辺を形成する点を作成します。ダブルクリックで図形を閉じます。図形のアウトライン内のSplatsが選択されます。 |
| ![Brush Select](/img/user-manual/gaussian-splatting/editing/supersplat/select-brush.svg) | **Brush Select** | クリック＆ドラッグで選択サークルを描画します。ブラッシュサイズは `[` と `]` キーで変更できます。 |
| ![Sphere Select](/img/user-manual/gaussian-splatting/editing/supersplat/select-sphere.svg) | **Sphere Select** | 球状のボリュームをアクティブにして、現在の選択範囲にSplatsを追加または削除します。任意のSplatsをダブルクリックすると、球状のボリュームを再配置できます。 |
| ![Box Select](/img/user-manual/gaussian-splatting/editing/supersplat/select-box.svg) | **Box Select** | クリック＆ドラッグで矩形の選択ボックスを作成します。ボックスの境界内にあるすべてのSplatsが選択されます。 |

選択に満足したら、Deleteキーで削除できます。

## Splatsの変形

SuperSplatはSplatsを移動、回転、および拡大縮小できます。これを行うには、Scene ManagerでSplatsを選択し、水平アイコンバーからいずれかのギズモをアクティブにします。

選択したSplatsの変形を細かく制御するには、TRANSFORMパネル（SCENE MANAGERパネルの下）を使用できます。

現在アクティブなギズモの原点を設定するには、3Dビューの任意の場所をダブルクリックします。

## Splatsのマージ

複数の.plyファイルをマージして、単一の結合された.plyファイルとして出力することが可能です。Scene Managerに任意の数の.plyファイルをロードし、必要な変形や編集を行い、その後、`Scene` > `Save` メニュー項目から結果を保存するだけです。
