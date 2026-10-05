---
title: Streamed SOG
description: "大規模スプラットシーン向けStreamed SOG：空間ツリー構成、lod-metaデータの生成、例、パフォーマンス指針です。"
---

Streamed SOGは、グローバルなスプラット予算の範囲内でシーンの各領域に適切な詳細レベル（LOD）を動的にロードすることで、大規模なGaussian splatシーンの効率的なレンダリングを可能にします。これにより、大規模なスプラットシーンのメモリ使用量を大幅に削減し、レンダリングパフォーマンスを向上させます。

## 仕組み

Streamed SOGは以下のように動作します：

1. スプラットの複数のバージョンを異なる詳細レベルで事前生成
2. 効率的なストリーミングのために空間ツリー構造に整理
3. カメラからの距離に応じて、グローバルなスプラット予算に合わせて詳細レベルを動的にロードおよびアンロード
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

### LODの選択方法 {#how-lod-is-chosen}

エンジンは、カメラからの距離に基づいて、シーンの各領域に1つのLODレベルを選択します。詳細がどこで段階的に低下するかは、各gsplatコンポーネントが設定します。[`lodBaseDistance`](https://api.playcanvas.com/engine/classes/GSplatComponent.html#lodbasedistance)までは最も細かいレベル（LOD 0）を使い、その先の各レベルは、1つ前のレベルが始まった距離の[`lodMultiplier`](https://api.playcanvas.com/engine/classes/GSplatComponent.html#lodmultiplier)倍の距離から始まります。デフォルトの5と3では、LOD 1は5ワールド単位、LOD 2は15、LOD 3は45から始まります：

```javascript
entity.gsplat.lodBaseDistance = 10; // 10単位まではLOD 0
entity.gsplat.lodMultiplier = 4; // その後40単位まではLOD 1、160単位まではLOD 2、...
```

どちらの値を大きくしても、カメラから遠くまで細かい詳細が保たれますが、メモリ使用量は増加します。`lodBaseDistance`の最小値は0.1、`lodMultiplier`の最小値は1.2です。これらの距離はカメラの視野角（FOV）に応じて補正されます。視野角が広いほどオブジェクトは画面上で小さく見えるため、より早く粗いレベルが使われます。

これらの距離がシーン全体の[スプラット予算](/user-manual/gaussian-splatting/building/performance#global-splat-budget)とどのように組み合わされるかは、予算モードで設定します。

### 予算モード {#budget-mode}

`app.scene.gsplat`の[`splatBudgetMode`](https://api.playcanvas.com/engine/classes/GSplatParams.html#splatbudgetmode)で、2つのモードを切り替えられます：

```javascript
app.scene.gsplat.splatBudgetMode = pc.GSPLAT_BUDGET_LIMIT;
```

- `GSPLAT_BUDGET_TARGET`（デフォルト）：カメラがどこにあっても、予算を使い切るまで詳細を引き上げます。エンジンは、シーンが予算を満たすまで、すべてのスプラットのLOD距離を共通の1つの係数で外側または内側へ動かします。そのため、設定した距離は、詳細が距離に応じてどのように低下し、スプラット間でどのように配分されるかを形作るだけで、詳細の総量は決めません。
- `GSPLAT_BUDGET_LIMIT`：LOD距離が詳細を決め、予算は、LOD距離が予算を超えるスプラット数を必要とする場合にのみ詳細を下げます。遠くのスプラットはその距離に必要な少数のスプラットだけを使い、残りの予算は使われないまま残るため、遠くから見たシーンが予算を満たすためだけに細かいレベルをストリーミングすることはありません。

予算を0以下にすると、予算はまったく適用されません。その場合、ターゲットモードではすべてが最も細かいレベルでレンダリングされ、リミットモードでは詳細はLOD距離だけで決まります。

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

Streamed SOGで最も重要なシーンレベルの設定はグローバルスプラット予算で、上記の予算モードに応じて、満たすべき目標スプラット数または上限として、すべてのGSplatアセット全体で詳細度を自動的に調整します。詳細については、パフォーマンスセクションの[グローバルスプラット予算](/user-manual/gaussian-splatting/building/performance#global-splat-budget)を参照してください。

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
