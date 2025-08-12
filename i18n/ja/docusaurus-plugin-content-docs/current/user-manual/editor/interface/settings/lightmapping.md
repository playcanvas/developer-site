---
title: ライトマッピング設定
sidebar_label: Lightmapping
---

ベイクされたライティングの解像度、フィルタリング、アンビエントオクルージョンを制御します。

:::note

これらの設定は、現在アクティブな[ブランチ](../../version-control/branches.md)の全ユーザーに影響します。

:::

`LIGHTMAPPING` セクションに移動し、パネルを展開します。

![Lightmapping Settings](/img/user-manual/editor/interface/settings/lightmapping.webp)

利用可能な設定は次のとおりです。

## 全般

| 設定 | 説明 |
| --- | --- |
| **Size Multiplier** | 自動生成されるライトマップテクスチャの解像度は、ワールド空間でのジオメトリの面積と、モデルおよびシーンのサイズ係数に基づきます。この値を変更すると、シーン全体のライトマップ解像度に影響します。 |
| **Max Resolution** | 自動生成されるライトマップテクスチャの最大解像度。 |
| **Mode** | ライトマップのベイクモード:<ul><li><strong>Color Only</strong>: カラーのみのライトマップ</li><li><strong>Color and Direction</strong>: カラーに加えて主要な光の方向（バンプ／スペキュラーで使用）</li></ul> |

## フィルタリング

| 設定 | 説明 |
| --- | --- |
| **Filter** | ランタイムベイクされたライトマップにバイラテラルフィルターを有効化。 |
| **Range** | バイラテラルフィルターのレンジパラメーター。 |
| **Smoothness** | バイラテラルフィルターの空間パラメーター。 |

## アンビエントベイク

| 設定 | 説明 |
| --- | --- |
| **Ambient Bake** | アンビエントライトをライトマップにベイク。 |
| **Samples** | アンビエントライトのベイクに使用するサンプル数。 |
| **Sphere Part** | アンビエントライトのベイクに含める球の割合。 |
| **Occlusion Brightness** | ベイクされたアンビエントオクルージョンの明るさ。 |
| **Occlusion Contrast** | ベイクされたアンビエントオクルージョンのコントラスト。 |
