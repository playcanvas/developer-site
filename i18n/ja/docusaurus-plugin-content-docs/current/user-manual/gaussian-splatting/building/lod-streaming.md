---
title: Streamed SOG
description: "大規模スプラットシーン向けStreamed SOG：空間ツリー構成、lod-metaデータの生成、例、パフォーマンス指針です。"
---

Streamed SOGは、グローバルなスプラット予算の範囲内でシーンの各領域に適切な詳細レベル（LOD）を動的にロードすることで、大規模なGaussian splatシーンの効率的なレンダリングを可能にします。これにより、大規模なスプラットシーンのメモリ使用量を大幅に削減し、レンダリングパフォーマンスを向上させます。

## 仕組み

Streamed SOGは以下のように動作します：

1. スプラットの複数のバージョンを異なる詳細レベルで事前生成
2. 効率的なストリーミングのために空間ツリー構造に整理
3. グローバルなスプラット予算に収まるように詳細レベルを動的にロードおよびアンロードし、画質への貢献が最も大きい場所に詳細を割り当て
4. シーンの各領域で選択された詳細レベルのみをレンダリング

このアプローチにより、メモリ制約により不可能だった大規模なスプラットシーンをレンダリングできます。

## Streamed SOGデータの作成

Streamed SOGを使用するには、その形式（複数の詳細レベルを効率的なストリーミングのために空間ツリー構造で整理した`lod-meta.json`）を生成する必要があります（[Streamed SOGフォーマット仕様](/user-manual/gaussian-splatting/formats/streamed-sog)を参照）。LODレベルを用意する方法は2つあります：

- **独自のLODレベルを用意する** — 詳細度を段階的に下げた複数のスプラットファイル（LOD 0 = 最高詳細、数字が大きいほど詳細が低い）を、例えばトレーニング時に生成したものや個別にエクスポートしたものとして用意します。
- **SplatTransformで生成する** — [SplatTransform](/user-manual/splat-transform)を使用して、1つの高品質スプラットをデシメート（簡略化）し、詳細度の低いレベルを生成できます。自分で用意する必要はありません。

LODレベルが揃ったら、SplatTransformがそれらをStreamed SOG形式にまとめます。詳細については、[Streamed SOGの生成](/user-manual/splat-transform/streamed-sog)ガイドを参照してください。

## ライブサンプル

Streamed SOGの動作を確認するには、以下のライブサンプルを参照してください：

- Streamed SOG（基本） - 異なる詳細レベルでの基本的なストリーミングを示します

<EngineExample id="gaussian-splatting/lod-streaming" title="Streamed SOG（基本）" />

- 球面調和関数付きStreamed SOG - 球面調和データを含むストリーミングを示します

<EngineExample id="gaussian-splatting/lod-streaming-sh" title="球面調和関数付きStreamed SOG" />

## Streamed SOGの有効化

ストリーミングは、Streamed SOGアセット（`lod-meta.json`）をGSplatコンポーネントにロードするだけで有効になります。追加の設定は必要ありません。

## LOD動作の制御 {#controlling-lod-behavior}

### LODの選択方法

エンジンは、合計スプラット数がグローバルな[スプラット予算](/user-manual/gaussian-splatting/building/performance#global-splat-budget)に収まるように、シーンの各領域に1つのLODレベルを選択し、画質への貢献が最も大きい場所に詳細を割り当てます。その際、各領域の画面上での投影サイズと、各LODレベルが残す視覚的誤差の指標を組み合わせて判断します。誤差の指標は、`lod-meta.json`に含まれている場合はそこから読み取られ（[SplatTransform](/user-manual/splat-transform) 3.3以降が書き出します）、含まれていない場合はスプラット数から自動的に導出されるため、どちらの場合も設定は不要です。LOD選択はカメラの視野角（FOV）も自動的に補正します。

### LODモード

`app.scene.gsplat`の[`lodMode`](https://api.playcanvas.com/engine/classes/GSplatParams.html#lodMode)で、2つの戦略を切り替えられます：

```javascript
app.scene.gsplat.lodMode = pc.GSPLAT_LODMODE_DISTANCE;
```

- `GSPLAT_LODMODE_ERROR`（デフォルト）：スプラット1つあたりの視覚的誤差の削減量が最も大きい場所に予算を割り当てます。
- `GSPLAT_LODMODE_DISTANCE`：誤差メタデータを無視し、カメラからの距離のみに基づいて詳細を順序付けます。詳細はカメラを中心とした同心円状のバンドで段階的に低下し、バンドの境界は予算に応じて調整されます。キャプチャの誤差データが視覚的な重要度と一致しない場合に便利です。

### LODフォールオフ

gsplatコンポーネントの[`lodFalloff`](https://api.playcanvas.com/engine/classes/GSplatComponent.html#lodFalloff)は、どちらのモードでも、そのスプラットの詳細がカメラからの距離に応じてどれだけ速く低下するかを制御します：

```javascript
entity.gsplat.lodFalloff = 2; // カメラ付近の詳細を増やし、遠方の詳細を減らす
```

値の範囲は0から8で、デフォルトは1（バランスの取れたフォールオフ）です。値が大きいほど遠方を犠牲にしてカメラ付近に詳細が集中し、0に近づけると視点に関係なくシーン全体に均等に分配されます。これは主に、そのスプラットが予算から受け取る詳細を近景と遠景の間で再配分するものですが、スプラット間での予算の配分にも影響することがあります。

### シーンレベルの制御

[`Scene.gsplat`](https://api.playcanvas.com/engine/classes/Scene.html#gsplat)プロパティは、gsplatレンダリングのシーン全体の設定へのアクセスを提供します。これには以下のオプションが含まれます：

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

Streamed SOGで最も重要なシーンレベルの設定はグローバルスプラット予算で、すべてのGSplatアセット全体で目標スプラット数に収まるよう詳細度を自動的に調整します。詳細については、パフォーマンスセクションの[グローバルスプラット予算](/user-manual/gaussian-splatting/building/performance#global-splat-budget)を参照してください。

## エディターでのStreamed SOGの使用

PlayCanvas EditorでのStreamed SOGのネイティブサポートは近い将来追加される予定です。それまでの間、EditorプロジェクトでStreamed SOG機能を有効にするには、スクリプト内でEngine APIを使用できます。

### サンプルプロジェクト

PlayCanvas EditorでGaussian splatsとStreamed SOGを使用する方法を示すサンプルプロジェクトを作成しました：

**[Church of Saints Peter and Paul](https://playcanvas.com/project/1408991/overview/church-of-saints-peter-and-paul)**

このプロジェクトは、カスタムリビールシェーダーエフェクトを含むStreamed SOGを使用した大規模なGaussian splatシーンを紹介しています。

### Streamed GSplatスクリプトの使用

サンプルプロジェクトには、Streamed SOGを有効にするために任意のエンティティに追加できる`streamed-gsplat.mjs`スクリプトが含まれています：

#### セットアップ手順

1. シーン内のエンティティにスクリプトを追加
2. `splatUrl`プロパティを外部でホストされているStreamed SOGファイルを指すように設定

:::note 外部ホスティング

現在、Streamed SOGデータは外部でホストする必要があります（Editorアセットとしてではなく）。この制限は、Streamed SOGのネイティブEditorサポートが追加される将来に解除される予定です。

:::

#### 品質設定

`streamed-gsplat.mjs`スクリプトは4つの異なる品質/パフォーマンスプリセットを提供し、以下を指定できます：

- ロードするLODレベル
- 各LODレベルをどの距離で表示するか

これらの設定により、視覚品質とレンダリングパフォーマンスのバランスを細かく制御でき、異なるターゲットプラットフォームやデバイスに対して簡単に最適化できます。

### カスタムシェーダーエフェクト

サンプルプロジェクトでは、Gaussian splats用のカスタムシェーダーエフェクトの作成方法も示しています。[PlayCanvas Engine GSplat Scripts](https://github.com/playcanvas/engine/tree/main/scripts/esm/gsplat)リポジトリからのスクリプトが含まれています。

具体的には、プロジェクトは[Reveal Radial](https://github.com/playcanvas/engine/blob/main/scripts/esm/gsplat/reveal-radial.mjs)シェーダーエフェクト（およびその基底クラス）を使用して、スプラットシーンのアニメーションリビールを作成しています。このエフェクトは：

- 中心点から発する放射状の波を作成
- 最初に小さな色付きドットを徐々に表示
- 次にハイライトエフェクトでパーティクルを持ち上げてから元の状態に落ち着かせる

これは、Gaussian splatsで魅力的な視覚効果を作成するためのPlayCanvas Engineのシェーダーシステムの柔軟性を示しています。

### 将来のエディター改善

Streamed SOGのネイティブEditorサポートが追加されると、以下の改善が計画されています：

- **直接アセットインポート**：Streamed SOGファイルをEditorアセットとして直接アップロード（外部ホスティング不要）
- **ビジュアル設定**：スクリプトプロパティではなくEditor UIを通じてLOD設定を構成
- **エディターでのプレビュー**：Editorビューポートで直接ストリーミング動作を表示およびテスト

## メリット

- **パフォーマンス向上**：Streamed SOGは大規模シーンのメモリ使用量を削減し、レンダリングパフォーマンスを向上
- **スケーラビリティ**：適切な詳細レベルを動的にロードすることで、はるかに大規模なGaussian splatシーンのレンダリングを可能に
- **柔軟性**：LOD距離とストリーミング動作の細かい制御を提供
- **最適化されたロード**：現在のビューに必要なデータのみをロード

## 関連項目

- [GSplatComponent API](https://api.playcanvas.com/engine/classes/GSplatComponent.html)
- [Scene.gsplat API](https://api.playcanvas.com/engine/classes/Scene.html#gsplat)
- [SplatTransform CLIツール](/user-manual/splat-transform)
- [Streamed SOGの生成](/user-manual/splat-transform/streamed-sog)
- [Streamed SOGフォーマット仕様](/user-manual/gaussian-splatting/formats/streamed-sog)
- [スプラットレンダリングアーキテクチャ](/user-manual/gaussian-splatting/rendering-architecture)
- [カスタムシェーダー](/user-manual/gaussian-splatting/building/custom-shaders)
