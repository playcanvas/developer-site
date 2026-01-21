---
title: LODストリーミング
---

LOD（Level of Detail）ストリーミングは、カメラの距離に基づいて適切な詳細レベルを動的にロードすることで、大規模なGaussian Splatシーンの効率的なレンダリングを可能にします。この機能により、メモリ使用量が大幅に削減され、大規模なスプラットシーンのレンダリングパフォーマンスが向上します。

:::info ベータ機能

LODストリーミングは現在ベータ版です。問題が発生した場合は、[PlayCanvas Engine GitHubリポジトリ](https://github.com/playcanvas/engine/issues)で報告してください。

:::

## 仕組み

LODストリーミングは以下のように動作します：

1. スプラットの複数のバージョンを異なる詳細レベルで事前生成
2. 効率的なストリーミングのためにオクトリー構造に整理
3. カメラの距離に基づいて詳細レベルを動的にロード/アンロード
4. シーンの各領域に対して適切な詳細レベルのみをレンダリング

このアプローチにより、メモリ制約により本来は不可能だった大規模なスプラットシーンをレンダリングできます。

## LODストリーミングデータの作成

LODストリーミングを使用するには、異なる詳細レベルの複数のスプラットファイルからストリーミング形式を生成する必要があります。ツールは事前生成されたLODファイルを取り、最適化されたストリーミング形式を作成します。

必要な`lod-meta.json`形式の作成方法の詳細については、SplatTransformドキュメントの[LOD形式の生成](/user-manual/gaussian-splatting/editing/splat-transform#generating-lod-format)セクションを参照してください。

:::tip

異なるLODレベルは自分で作成する必要があります（LOD 0 = 最高詳細、数字が大きいほど詳細が低い）。ツールはこれらをストリーミング最適化形式に整理しますが、簡略化されたバージョンは作成しません。

:::

## ライブ例

LODストリーミングの動作を確認するには、以下のライブ例をご覧ください：

- [LODストリーミング（基本）](https://playcanvas.github.io/#/gaussian-splatting/lod-streaming) - 異なる詳細レベルでの基本的なLODストリーミングのデモ
- [球面調和関数を使用したLODストリーミング](https://playcanvas.github.io/#/gaussian-splatting/lod-streaming-sh) - 球面調和関数データを使用したLODストリーミングの表示

## LODストリーミングの有効化

LODストリーミングを有効にするには、GSplatコンポーネントの[`unified`](https://api.playcanvas.com/engine/classes/GSplatComponent.html#unified)プロパティを`true`に設定し、ストリーミングLOD形式のアセットをロードします：

```javascript
entity.gsplat.unified = true;
```

:::note

`unified`プロパティは、コンポーネントが無効の場合にのみ変更できます。

:::

## LOD動作の制御

以下のAPIを使用してLODストリーミングを制御および微調整できます：

### コンポーネントレベルの制御

[`lodDistances`](https://api.playcanvas.com/engine/classes/GSplatComponent.html#loddistances)プロパティを使用して、LODレベル間の切り替え距離しきい値を設定します：

```javascript
// LOD距離しきい値を設定（ワールド単位）
entity.gsplat.lodDistances = [10, 20, 40, 80];
```

### シーンレベルの制御

[`Scene.gsplat`](https://api.playcanvas.com/engine/classes/Scene.html#gsplat)プロパティは、統合gsplatレンダリングのシーン全体の設定へのアクセスを提供します。これには以下のオプションが含まれます：

- パフォーマンスチューニングパラメータ
- デバッグ可視化設定
- メモリ管理制御
- ストリームロード動作

```javascript
// シーンレベルのgsplat設定にアクセス
const gsplatSettings = app.scene.gsplat;

// 必要に応じて設定を構成
// （利用可能なプロパティについてはAPIドキュメントを参照）
```

## エディターでのLODストリーミングの使用

PlayCanvas EditorでのLODストリーミングのネイティブサポートは、近い将来追加される予定です。それまでの間、スクリプトでEngine APIを使用して、EditorプロジェクトでストリーミングLOD機能を有効にできます。

### サンプルプロジェクト

PlayCanvas EditorでGaussian SplatとストリーミングLODを使用する方法を示すサンプルプロジェクトを作成しました：

**[Church of Saints Peter and Paul](https://playcanvas.com/project/1408991/overview/church-of-saints-peter-and-paul)**

このプロジェクトは、カスタムリビールシェーダーエフェクトを含む、LODストリーミングを使用した大規模なGaussian Splatシーンを紹介しています。

### Streamed GSplatスクリプトの使用

サンプルプロジェクトには、任意のエンティティに追加してLODストリーミングを有効にできる`streamed-gsplat.mjs`スクリプトが含まれています：

#### セットアップ手順

1. シーン内のエンティティにスクリプトを追加
2. `splatUrl`プロパティを外部ホストされたLODスプラット形式ファイルを指すように設定

:::note 外部ホスティング

現在、LODスプラットデータは外部でホストする必要があります（Editorアセットとしてではなく）。この制限は、ストリーミングLOD形式のネイティブEditorサポートが追加されると解消されます。

:::

#### 品質設定

`streamed-gsplat.mjs`スクリプトは4つの異なる品質/パフォーマンスプリセットを提供し、以下を指定できます：

- ロードするLODレベル
- 各LODレベルを表示する距離

これらの設定により、視覚品質とレンダリングパフォーマンスのバランスを細かく制御でき、異なるターゲットプラットフォームやデバイス向けの最適化が容易になります。

### カスタムシェーダーエフェクト

サンプルプロジェクトでは、Gaussian Splat用のカスタムシェーダーエフェクトの作成方法も示しています。[PlayCanvas Engine GSplat Scripts](https://github.com/playcanvas/engine/tree/main/scripts/esm/gsplat)リポジトリのスクリプトが含まれています。

具体的には、プロジェクトは[Reveal Radial](https://github.com/playcanvas/engine/blob/main/scripts/esm/gsplat/reveal-radial.mjs)シェーダーエフェクト（およびその基底クラス）を使用して、スプラットシーンのアニメーションリビールを作成しています。このエフェクトは：

- 中心点から放射状の波を作成
- まず小さな色付きドットを徐々に表示
- 次にパーティクルをハイライトエフェクトで持ち上げてから元の状態に落ち着かせる

これは、Gaussian Splatで魅力的なビジュアルエフェクトを作成するためのPlayCanvas Engineのシェーダーシステムの柔軟性を示しています。

### 将来のエディター改善

ストリーミングLODのネイティブEditorサポートが追加されると、以下の改善が計画されています：

- **直接アセットインポート**：LODスプラットファイルをEditorアセットとして直接アップロード（外部ホスティング不要）
- **ビジュアル設定**：スクリプトプロパティの代わりにEditor UIでLOD設定を構成
- **エディターでのプレビュー**：Editorビューポートで直接ストリーミングLOD動作を表示およびテスト

## メリット

- **パフォーマンス向上**：LODストリーミングは大規模シーンのメモリ使用量を削減し、レンダリングパフォーマンスを向上
- **スケーラビリティ**：適切な詳細レベルを動的にロードすることで、はるかに大きなGaussian Splatシーンのレンダリングが可能
- **柔軟性**：LOD距離とストリーミング動作のきめ細かな制御を提供
- **最適化されたロード**：現在のビューに必要なデータのみをロード

## 関連項目

- [GSplatComponent API](https://api.playcanvas.com/engine/classes/GSplatComponent.html)
- [Scene.gsplat API](https://api.playcanvas.com/engine/classes/Scene.html#gsplat)
- [SplatTransform CLIツール](/user-manual/gaussian-splatting/editing/splat-transform)
- [LOD形式の生成](/user-manual/gaussian-splatting/editing/splat-transform#generating-lod-format)
- [グローバルソート](/user-manual/gaussian-splatting/building/global-sorting)
- [カスタムシェーダー](/user-manual/gaussian-splatting/building/custom-shaders)
