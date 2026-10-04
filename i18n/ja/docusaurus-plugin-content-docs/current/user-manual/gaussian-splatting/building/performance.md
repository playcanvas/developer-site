---
title: パフォーマンス
description: "スプラットシーンのパフォーマンスのヒント：スプラット数、フィルレート、Scene設定、Streamed SOGの予算、最適化の方針です。"
---

スプラットのレンダリングは、CPUとGPUの両方で負荷が高くなる場合があります。良好なパフォーマンスを達成するための戦略をいくつか紹介します：

## Gaussian数の制限

シーン内のGaussian数に注意してください。すべてのGaussianは毎フレームカメラの深度でソートされます。特定のGSplatアセットに含まれる数は、[SuperSplat Editor](/user-manual/supersplat/editor/)の[SPLAT DATA Panel](/user-manual/supersplat/editor/data-panel/)を使用して確認できます。SuperSplatを使用して、PLYファイルから不要なGaussianをトリミングしてください。

大規模なシーンでは、カメラ距離に基づいて適切な詳細レベルを動的にロードする[Streamed SOG](/user-manual/gaussian-splatting/building/lod-streaming)の使用を検討してください。これにより、最も重要な場所で視覚品質を維持しながら、任意の時点でアクティブなGaussian数を大幅に削減できます。

## フィルレートの考慮事項

3D Gaussian Splattingは、フィルレート（フラグメント操作）の観点で特に負荷が高いです。これは以下の理由によります：

- **高いオーバードロー**：各Gaussianスプラットはテクスチャ付きビルボード（クワッド）としてレンダリングされ、多くの他のスプラットと重なることが多い
- **透明度ブレンディング**：スプラットはスムーズな外観を実現するためにアルファブレンディングを使用し、高価なフラグメントごとのブレンディング操作が必要
- **フラグメント密度**：密集したスプラットクラウドでは、各最終ピクセルに対して数十から数百のフラグメントが処理される可能性がある

この高いフラグメントコストが、3DGSパフォーマンスにおいてピクセル数とレンダリング設定の最適化が重要である理由です。

### シーン設定の構成

Gaussian splattingのフラグメント重視の性質を考えると、これらの設定はパフォーマンスに大きな影響を与えます：

- **`Anti-Alias`を無効にする**：アンチエイリアシングはピクセルごとに処理されるフラグメント数を増加させ、スプラットレンダリングでは特にコストがかかる
- **`Device Pixel Ratio`を無効にする**：これにより全体的なピクセル解像度が下がり、処理が必要なフラグメント数が直接削減される

両方の設定は、3DGSレンダリングの主なボトルネックであるフラグメント処理負荷の削減に役立ちます。

## Streamed SOG設定

[Streamed SOG](/user-manual/gaussian-splatting/building/lod-streaming)を使用する場合、品質とパフォーマンスを制御するためのいくつかのオプションがあります。推奨されるアプローチは、シーン内のすべてのGSplatアセットのLOD選択を自動的に管理する**グローバルスプラットバジェット**を使用することです。

### グローバルスプラットバジェット {#global-splat-budget}

グローバルスプラットバジェットは、Streamed SOGのレンダリングパフォーマンスを制御する主要な方法です。[`splatBudget`](https://api.playcanvas.com/engine/classes/GSplatParams.html#splatbudget)のデフォルトは100万スプラットです。以下のように設定します：

```javascript
app.scene.gsplat.splatBudget = 4000000; // 400万スプラット
```

エンジンはバジェットに合わせてすべてのGSplatアセットのLODレベルを自動的に調整し、近くのジオメトリを細かい詳細レベルに保ちながら、遠くのジオメトリから先に品質を下げます。デフォルトではバジェットは目標値であり、カメラがどこにあっても、使い切るまで詳細が引き上げられます。これにより、潜在的に表示可能なスプラット数に関係なく、一貫した処理負荷が維持されます。バジェットを0以下にすると、バジェットはまったく適用されません。

バジェットシステムは、Streamed SOGアセット（複数の詳細レベルを持つ）と固定アセット（単一の詳細レベル）の両方を含む、シーン内のすべてのGSplatアセットを考慮します。固定アセットは常にすべてのスプラットがレンダリングされるため、その分だけストリーミングアセットに使えるバジェットが少なくなります。

### LOD距離とバジェットモード {#lod-distances-and-budget-mode}

バジェットの範囲内で、各gsplatコンポーネントは、カメラからの距離に応じて詳細がどのように段階的に低下するかを設定します。[`lodBaseDistance`](https://api.playcanvas.com/engine/classes/GSplatComponent.html#lodbasedistance)はLOD 0からLOD 1への切り替え距離で、[`lodMultiplier`](https://api.playcanvas.com/engine/classes/GSplatComponent.html#lodmultiplier)は各切り替え距離と次の切り替え距離の比率です。どちらを大きくしても、カメラから遠くまで細かい詳細が保たれますが、メモリ使用量は増加します。`app.scene.gsplat`の[`splatBudgetMode`](https://api.playcanvas.com/engine/classes/GSplatParams.html#splatbudgetmode)は、これらの距離とバジェットの組み合わせ方を決めます。デフォルトの`GSPLAT_BUDGET_TARGET`では、距離は詳細の低下の仕方を形作るだけで、詳細の総量はバジェットが決めます。`GSPLAT_BUDGET_LIMIT`では距離が詳細を決め、バジェットは距離がバジェットを超える場合にのみ詳細を下げます：

```javascript
entity.gsplat.lodBaseDistance = 10; // 10単位まではLOD 0
entity.gsplat.lodMultiplier = 4; // その後40単位まではLOD 1、160単位まではLOD 2、...
app.scene.gsplat.splatBudgetMode = pc.GSPLAT_BUDGET_LIMIT;
```

詳細は[LOD動作の制御](/user-manual/gaussian-splatting/building/lod-streaming#controlling-lod-behavior)を参照してください。LOD距離はカメラの視野角（FOV）に応じて自動的に補正されます。視野角が広いほどオブジェクトは画面上で小さく見えるため、より早く粗いレベルに切り替わります。

### LOD範囲制限

gsplatコンポーネントの`lodRangeMin`と`lodRangeMax`設定は、そのスプラットが使用可能なLODレベルを制限します：

```javascript
entity.gsplat.lodRangeMin = 0; // 最高品質のLODを許可
entity.gsplat.lodRangeMax = 3; // LOD 3より低くはしない
```

これらの設定は以下の場合に役立ちます：

- **ダウンロードの削減**：インターネット接続が遅いデバイスでは、`lodRangeMin`を高く設定することで、最高品質（かつ最大サイズ）のLODファイルのダウンロードを防ぐことができます
- **メモリ制約**：LOD範囲を制限することで、特定の詳細レベルの読み込みを避け、メモリ使用量を削減できます

ただし、一般的なレンダリングパフォーマンス管理には、LOD範囲制限よりもグローバルスプラットバジェットの方が効果的です。バジェットはすべてのアセット間で適切なバランスを自動的に見つけますが、LOD範囲制限はカメラ位置やシーン構成に関係なくアセットごとに適用されます。

### 最初のフレームを高速に表示する {#fast-time-to-first-frame}

大規模なストリーミングシーンでは、最初に**最も低い**（最も粗い）詳細レベルだけをロードし、その後により高い詳細レベルをストリーミングで読み込むことで、ほぼ即座にレンダリング結果を表示できます。これにより、何かが画面に表示される前に高品質データの読み込みを待つ必要がなくなります。

この手法は2つのステップで構成されます：

1. GSplatアセットの作成時に、LOD範囲を最も粗いレベルのみに制限し、最小限のデータだけが先にロードされるようにします。
2. GSplatシステムの`frame:ready`イベントをリッスンします。粗いデータがロードされてレンダリングされ、かつ読み込み中のものがなくなったら、LOD範囲を元に戻し、カメラ距離に基づいてより高い詳細レベルがストリーミングされるようにします。

```javascript
const gsplatSystem = app.systems.gsplat;

// `entity` は、ロード済みのStreamed SOGアセットを使用する gsplat コンポーネントを持ちます
const gsplat = entity.gsplat;

// 1. 最初のフレームを最速にするため、最も低い（最も粗い）LODのみで開始
const lodLevels = gsplat.resource?.octree?.lodLevels;
if (lodLevels) {
    const worstLod = lodLevels - 1;
    gsplat.lodRangeMin = worstLod;
    gsplat.lodRangeMax = worstLod;
}

// 2. 粗いデータがロードされてレンダリングされたら、LOD範囲を元に戻して
//    より高い詳細レベルをストリーミングする
const onFrameReady = (camera, layer, ready, loadingCount) => {
    if (ready && loadingCount === 0) {
        gsplatSystem.off('frame:ready', onFrameReady);

        // 完全なLOD範囲を復元（0 = 最高詳細）
        gsplat.lodRangeMin = 0;
        gsplat.lodRangeMax = lodLevels - 1;
    }
};
gsplatSystem.on('frame:ready', onFrameReady);
```

この手法は、ライブの[Streamed SOGサンプル](/user-manual/gaussian-splatting/building/lod-streaming)で実演されています。

### 推奨設定

ほとんどのアプリケーションでは：

1. ターゲットハードウェアに適した**グローバルスプラットバジェットを設定**します（例：モバイルでは100万、デスクトップでは300万以上）
2. 特定のダウンロードやメモリの制約がない限り、**LOD範囲はデフォルトのままにします**（min=0、max=利用可能な最高値）
3. **LOD距離を調整**して（`lodBaseDistance`、`lodMultiplier`）、詳細が距離に応じてどのように低下するかを形作ります。バジェットが決める位置ではなく、設定した距離で品質を切り替えたい場合は、`GSPLAT_BUDGET_LIMIT`に切り替えます
