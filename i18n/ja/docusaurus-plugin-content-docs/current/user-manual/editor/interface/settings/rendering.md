---
title: レンダリング設定
sidebar_label: Rendering
description: スカイ、クラスタードライト、シャドウ、露出、フォグ、メッシュスケッチ、オーバーレイ、解像度の既定値など、ブランチ上の全員に共有されるレンダリングのプロジェクト設定です。
---

ライティング、解像度、各種レンダリング機能を制御します。

:::note

これらの設定は、現在アクティブな[ブランチ](../../version-control/branches.md)の全ユーザーに影響します。

:::

`RENDERING` セクションに移動し、パネルを展開します。

![Rendering Settings](/img/user-manual/editor/interface/settings/rendering.webp)

<video autoPlay muted loop controls src='/video/editor-rendering-max-lights.mp4' style={{width: '100%', height: 'auto'}} />

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
| **Max Lights** | 1フレーム内に表示できるクラスタードライトの最大数。シーンが許す範囲でできるだけ小さく保ってください。255を超える値では、より大きなライトインデックステクスチャが使用されます。 |
| **Cookie Atlas Resolution** | 非平行光のクッキーテクスチャをまとめるアトラステクスチャの解像度。 |
| **Cookies Enabled** | クラスタードライトでクッキーをサポート。 |
| **Shadows Enabled** | クラスタードライトでシャドウをサポート。 |
| **Shadow Atlas Resolution** | 非平行光のシャドウテクスチャをまとめるアトラステクスチャの解像度。 |
| **Shadow Type** | すべてのシャドウで使用するフィルタリング方式。 |
| **Area Lights Enabled** | クラスタードライトでエリアライトをサポート。 |

## ガウシアンスプラッティング (Gaussian Splatting) {#gaussian-splatting}

[ガウシアンスプラット](/user-manual/gaussian-splatting)のレンダリングに関するシーン全体の設定です。エンティティごとのLOD範囲とフォールオフは[GSplatコンポーネント](/user-manual/editor/scenes/components/gsplat)にあります。

| 設定 | 説明 |
| --- | --- |
| **Radial Sorting** | ビュー深度ではなく、カメラからの放射距離でスプラットをソートします。 |
| **LOD Update Distance** | ガウシアンスプラットのLOD更新を引き起こすカメラの移動距離。 |
| **LOD Update Angle** | LOD更新を引き起こすカメラの回転角度（度）。0に設定すると角度による更新が無効になります。 |
| **LOD Behind Penalty** | LOD選択時に、カメラの背後にあるスプラットノードに適用される距離の乗数。 |
| **LOD Underfill Limit** | 最適なデータの読み込み中に使用できる、より低詳細なLODレベルの数。 |
| **Splat Budget** | シーン全体でレンダリングするスプラット数の目標値。0以下の値ではエンジンのデフォルトが使用されます。 |
| **Alpha Clip** | ガウシアンスプラットのシャドウ、ピッキング、プリパスのレンダリングに使用するアルファしきい値。 |
| **Forward Alpha Clip** | この値を下回るスプラットがフォワードパスから除外されるアルファしきい値。 |
| **Min Pixel Size** | この値を下回るスプラットが破棄される、スクリーン空間での最小サイズ。 |
| **Min Contribution** | この値を下回るスプラットがカリングされる、視覚的な寄与の最小値。0に設定すると無効になります。 |
| **Foveation Strength** | 画面の端に向かうほど強まる寄与カリングの強度。0に設定すると無効になります。 |
| **Foveation Center** | フォービエーションが適用されない、保護される画面中央の半径。 |
| **Anti-Alias** | アンチエイリアスを有効にして学習されたスプラットに、アンチエイリアスの補正を適用します。 |
| **Use Fog** | シーンのフォグをガウシアンスプラットに適用します。 |
| **Use Tonemapping** | カメラのトーンマッピングとシーンの露出をガウシアンスプラットに適用します。シーン内の他のオブジェクトには影響しません。 |
| **Color Update Angle** | 球面調和関数によるカラー更新を引き起こす視線角度の変化量。 |
| **Cooldown Ticks** | 未使用のストリーミングスプラットリソースがアンロードされるまでに待機するティック数。 |
| **Data Format** | ガウシアンスプラットのレンダリングに使用するワークバッファの形式。オプション：Compact、Large。 |
| **Enable IDs** | ガウシアンスプラットのワークバッファに一意のコンポーネントIDを格納します。 |
| **LOD Mode** | グローバルなスプラット予算の範囲内でガウシアンスプラットの詳細度を選択するために使用する指標。オプション：Error、Distance。 |

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
