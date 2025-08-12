---
title: レンダリング設定
sidebar_label: Rendering
---

ライティング、解像度、各種レンダリング機能を制御します。

:::note

これらの設定は、現在アクティブな[ブランチ](../../version-control/branches.md)の全ユーザーに影響します。

:::

`RENDERING` セクションに移動し、パネルを展開します。

![Rendering Settings](/img/user-manual/editor/interface/settings/rendering.webp)

利用可能な設定は次のとおりです。

## 環境 (Environment)

| 設定 | 説明 |
| --- | --- |
| **Ambient Color** | シーンのアンビエントライトの色（sRGB 色空間）。 |
| **Skybox** | 3D シーンの背後に描画されるキューブマップアセット。事前フィルター済みの場合、物理ベースマテリアルの既定の環境マップとしても使用されます。 |
| **Type** | スカイボックスの投影方式:<ul><li><strong>Infinite</strong>: 無限遠での描画</li><li><strong>Box</strong>: ボックスメッシュへのマッピング</li><li><strong>Dome</strong>: 半球状ドームへのマッピング</li></ul> |
| **Mesh Position / Rotation / Scale** | スカイメッシュの位置、回転、スケール。 |
| **Center** | 地面からの相対的な正規化オフセット。 |
| **Intensity** | 露出に合わせるためのスカイボックスの強度。 |
| **Rotation** | スカイボックスの回転。 |
| **Mip** | 事前フィルター済みスカイボックスの Mip レベル。値が大きいほど低解像度でよりブラーの強い Mip を選択します。 |

## クラスタードライティング

| 設定 | 説明 |
| --- | --- |
| **Clustered Lighting** | クラスタードライティングを有効化。 |
| **Cells (X, Y, Z)** | 光源を含む空間を分割する各軸方向のセル数。 |
| **Max Lights Per Cell** | 各セルが保持できる最大ライト数。 |
| **Cookie Atlas Resolution** | 非平行光のクッキーテクスチャをまとめるアトラステクスチャの解像度。 |
| **Cookies Enabled** | クラスタードライトでクッキーをサポート。 |
| **Shadows Enabled** | クラスタードライトでシャドウをサポート。 |
| **Shadow Atlas Resolution** | 非平行光のシャドウテクスチャをまとめるアトラステクスチャの解像度。 |
| **Shadow Type** | すべてのシャドウで使用するフィルタリング方式。 |
| **Area Lights Enabled** | クラスタードライトでエリアライトをサポート。 |

## 露出とフォグ (Exposure & Fog)

| 設定 | 説明 |
| --- | --- |
| **Exposure** | シーン全体の明るさを調整します。 |
| **Fog** | シーン内のアンビエントフォグの近似を制御します。種類:<ul><li><strong>None</strong>: 無効</li><li><strong>Linear</strong>: Fog Start と Fog End の距離間で線形にフェード</li><li><strong>Exp</strong>: 視点から指数関数に従ってフェード</li><li><strong>Exp2</strong>: 視点から指数関数二乗に従ってフェード</li></ul> |
| **Fog Density** | Exp / Exp2 タイプでのフェードイン率を制御します。大きいほど素早く濃くなります。正の値にしてください。 |
| **Fog Start / End** | フォグがフェードインを開始する距離（Start）と最大に達する距離（End）。 |

## 解像度 (Resolution)

| 設定 | 説明 |
| --- | --- |
| **Resolution Width / Height** | アプリケーションの幅／高さ（ピクセル）。 |
| **Resolution Mode** | キャンバスのサイズ変更時に解像度を変更するかどうか。 |
| **Fill Mode** | キャンバスがブラウザウィンドウをどのように満たすか。 |

## デバイスと API (Device & API)

| 設定 | 説明 |
| --- | --- |
| **Device Order** | グラフィックスデバイスの作成を試行する順序。 |
| **Enable WebGPU** | 利用可能な場合、WebGPU の使用を試みます。 |
| **Enable WebGL 2.0** | 利用可能な場合、WebGL 2.0 の使用を試みます。 |

## レンダリングオプション

| 設定 | 説明 |
| --- | --- |
| **Power Preference** | WebGL に希望の電力モードを示します:<ul><li><strong>Default</strong>: ブラウザに委ねる</li><li><strong>High Performance</strong>: 描画性能を優先</li><li><strong>Low Power</strong>: 省電力を優先</li></ul> |
| **Anti-Alias** | 無効化するとバックバッファのアンチエイリアスを無効にします。 |
| **Device Pixel Ratio** | デバイスピクセル比でキャンバスのバックバッファ解像度を乗算（例: Retina では 2x）。シャープさが増す一方で GPU/メモリ使用量も増えます。 |
| **Transparent Canvas** | キャンバスの背景を透過にして、Web ページの背景を透過表示できます。ページデザインや UI とアプリを重ねる用途に有用です。 |
| **Preserve Drawing Buffer** | 明示的にクリアするまで描画バッファを保持します。スクリーンショット取得などに有用です。 |

## 外部ライブラリ

| 設定 | 説明 |
| --- | --- |
| **Basis Library** | Basis 圧縮をサポートするために必要なライブラリを追加します。 |
| **Draco Library** | Draco 圧縮をサポートするために必要なライブラリを追加します。 |
