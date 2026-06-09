---
title: シャドウ
description: シャドウマッピングを有効化し、cast／receive フラグを調整し、カスケード Directional シャドウでエイリアシングを抑えます。
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

シャドウはゲームにリアリズムを追加する優れた方法です。しかし、ダイナミック(リアルタイム)シャドウは、高コストでランタイムパフォーマンスが低下する可能性があります。シーンに静的なシャドウを追加するよりも性能が高い方法については、[ライトマップ](/user-manual/graphics/lighting/lightmapping)をご覧ください。

![Soft shadows using PCSS](/img/user-manual/graphics/lighting/shadows/pcss-shadows.webp)

PlayCanvasエンジンは、シャドウマッピングと呼ばれるシャドウのアルゴリズムを実装しています。完全にクロスプラットフォームであり、モバイルおよびデスクトップの両方で動作することが保証されています。

## シャドウの有効化 {#enabling-shadows}

デフォルトでは、PlayCanvasではシャドウキャストは無効になっているため、自分で明示的に有効にする必要があります。まず、シーンでシャドウをキャストするライトを特定します。各ライトには「Cast Shadows」というオプションがあります。次に、どのグラフィカルオブジェクトがシャドウをキャストおよび受信するかを選択します。デフォルトでは、すべての render および model コンポーネントがシャドウをキャストおよび受信し、エンティティごとに切り替えることができます。

<Tabs groupId="workflow" defaultValue="engine">
<TabItem value="engine" label="Engine">

```javascript
// ライトのシャドウキャストを有効にする
lightEntity.light.castShadows = true;

// render（および model）コンポーネントはデフォルトでシャドウをキャスト・受信します。
// 必要に応じてエンティティごとに切り替えます
entity.render.castShadows = true;
entity.render.receiveShadows = true;
```

</TabItem>
<TabItem value="editor" label="Editor">

Hierarchyでライトを選択し、その[Lightコンポーネント](/user-manual/editor/scenes/components/light)で **Cast Shadows** を有効にします。

どのオブジェクトが対象になるかを制御するには、エンティティを選択し、その [render](/user-manual/editor/scenes/components/render) または [model](/user-manual/editor/scenes/components/model) コンポーネントの **Cast Shadows** / **Receive Shadows** オプションを切り替えます。

</TabItem>
<TabItem value="react" label="React">

```jsx
// ライトのシャドウキャストを有効にする
<Entity name="light">
  <Light type="directional" castShadows />
</Entity>

// Render コンポーネントはデフォルトでシャドウをキャスト・受信します。必要に応じて切り替えます
<Entity>
  <Render type="box" castShadows receiveShadows />
</Entity>
```

</TabItem>
<TabItem value="web-components" label="Web Components">

```html
<!-- ライトのシャドウキャストを有効にする -->
<pc-entity>
  <pc-light type="directional" cast-shadows></pc-light>
</pc-entity>

<!-- Render コンポーネントはデフォルトでシャドウをキャスト・受信します。必要に応じて切り替えます -->
<pc-entity>
  <pc-render type="box" cast-shadows receive-shadows></pc-render>
</pc-entity>
```

</TabItem>
</Tabs>

## シャドウカスケード {#shadow-cascades}

大面積の方向性シャドウを使用すると、しばしばアンチエイリアシングが発生し、カメラの近くの影が低解像度になることがあります。単一のシャドウマップで影をキャプチャするには、この問題を改善するために非常に高い解像度が必要ですが、実用的ではありません。

シャドウカスケードは、この問題を解決するために、ビュー方向を沿ってカメラビューフラスタムを分割し、各分割に別個のシャドウマップを使用する方法です。これにより、近くのオブジェクトには1つのシャドウマップが割り当てられ、遠くのオブジェクトは別のシャドウマップがキャプチャされます。オプションで、その間にさらにシャドウマップを追加します。

ただし、シャドウキャスティングメッシュの数に影響を与えるため、シャドウカスケードの数はパフォーマンスに影響を与えます。

次のプロパティを使用して、シャドウカスケードを設定できます。

### カスケード数 {#number-of-cascades}

カスケード数（`light.numCascades`）は、ビューフラスタムの分割数を表し、1、2、3、4の値が設定できます。既定値の1は、単一のシャドウマップを表します。

単一のシャドウカスケードを示すスクリーンショット。

![One cascade](/img/user-manual/graphics/lighting/shadows/shadow-cascades-1.jpg)

4つのシャドウカスケードを示すスクリーンショット。

![Four cascades](/img/user-manual/graphics/lighting/shadows/shadow-cascades-4.jpg)

### カスケードの分布 {#distribution-of-cascades}

個々のシャドウカスケードのカメラフラスタムのサブディビジョンの分布（`light.cascadeDistribution`）。0から1の値を指定できます。値0は線形分布を表し、値1は対数分布を表します。ビジュアル的には、値が高いほど、前景オブジェクトにシャドウマップ解像度がより多く割り当てられ、値が低いほど、遠くのオブジェクトに割り当てられます。

## シャドウの調整 {#tuning-shadows}

PlayCanvasが使用するシャドウマッピング技術には有限の解像度しかありません。そのため、できるだけ見栄え良くするために、いくつかの値を調整する必要があります。以下の各プロパティは、Editorの[Lightコンポーネント](/user-manual/editor/scenes/components/light)のUIで設定するか、コードでライトコンポーネント（`lightEntity.light.*`）に設定できます。

### シャドウ距離 {#shadow-distance}

シャドウ距離（`light.shadowDistance`）は、ビューポイントから遠くの方向性ライトのシャドウがレンダリングされなくなる距離です。この値が小さいほど、シャドウがより鮮明になります。問題は、ビューポイントがシーンを移動すると、見る人が影が突然現れるのを見ることができるということです。したがって、この値は、プレイヤーが遠くまで見ることができる距離と一般的にどちらが良いかに基づいてバランスを取る必要があります。

### シャドウ強度 {#shadow-intensity}

このライトによってキャストされる、1を完全な強度のシャドウ、0をシャドウのないものとするシャドウの強度（`light.shadowIntensity`）。

![Shadow Intensity](/img/user-manual/graphics/lighting/shadows/shadow-intensity.gif)

### シャドウ解像度 {#shadow-resolution}

すべてのライトは、シャドウマップを介してシャドウをキャストします。このシャドウマップ（`light.shadowResolution`）は、256x256、512x512、1024x1024、または2048x2048の解像度になる場合があり、この値もLightコンポーネントのインターフェイスで設定されます。解像度が高いほど、シャドウがより鮮明になります。ただし、解像度が高いほど、シャドウをレンダリングするために負荷がかかり、フレームレートに影響を与える可能性があります。

### シャドウバイアス {#shadow-bias}

シャドウマッピングは、非常に醜い外観のレンダリングアーティファクトが発生する可能性があります。影の帯や、期待しない場所に斑点状のパッチがある場合は、シャドウバイアス（`light.shadowBias`）を調整して問題を解決する必要があります。

### 法線オフセットバイアス {#normal-offset-bias}

「影の吹き出物」は大きな問題ですが、シャドウバイアスを使用することで効果的に解決できます。残念ながら、これにより常に「ピーターパン」現象が発生します。それは、影によってオブジェクトが空中に浮いているように見える現象です。

法線オフセットバイアス（`light.normalOffsetBias`）は、この問題を解決します。深度バイアスを使用するだけでなく、シャドウマップルックアップに使用されるUV座標をわずかに調整することで、シャドウの吹き出物とピーターパンを回避できます。フラグメントの位置は、そのジオメトリの法線に沿ってオフセットされます。この「法線オフセット」技術は、定数シャドウバイアスのみを使用するアプローチよりもはるかに優れた結果をもたらします。

## ソフトシャドウとハードシャドウ {#soft-shadows-vs-hard-shadows}

シャドウのアウトラインをペナンブラと呼びます。これは、シャドウを柔らかいエッジで与えます。シ

![Hard vs soft shadows](/img/user-manual/graphics/lighting/shadows/hard-vs-soft.jpg)

ソフトシャドウはシャドウマップ上のサンプルをより多くGPUで取ることによって実現されています。使用されているアルゴリズムはPercentage Closest FilteringあるいはPCFと省略されて呼ばれています。このアルゴリズムはシャドウマップ内の一つのサンプルだけを読むのではなく、(3x3のマトリクスで)9個のサンプルを読み込んで使用します。

シャドウサンプリングタイプは各ライトごとに指定されるため、そのオプションは「Light Inspector（ライトインスペクター）」で見つけることができます。あるいはコードで `light.shadowType` を介して設定できます（例: `pc.SHADOW_PCF1`、`pc.SHADOW_PCF3`、`pc.SHADOW_PCF5`。数値が大きいほど多くのタップをサンプリングし、エッジが柔らかくなります）。

## パフォーマンスに関する考慮事項 {#performance-considerations}

影を使用すると、パフォーマンスに以下のような影響があります:

* 指向性またはスポットライトを落とすそれぞれの影のために、すべてのフレームで一度シーンをシャドウマップにレンダリングする必要があります。ポイントライトの場合はシーンがライトごとに6回レンダリングされるので(シャドウマップが6面のキューブマップとして保存される)、負荷が大きくなります。シャドウマップの中にシーンをレンダリングすると、CPUとGPUの両方に負荷を加えます。
* シャドウマップの解像度を上げるとより鮮明な影を生成しますが、GPUはより多くのシャドウマップピクセルを埋める必要があり、フレームレートに影響を与える可能性があります。
* 影を受けるマテリアルのシャドウサンプルタイプとしてソフトシャドウ(PCF3x3)を選択すると、ハードシャドウのオプションを使用した場合よりも、GPUに負荷がかかります。
* 影が環境の静的な部分から発生している場合は、[ライトマップ](/user-manual/graphics/lighting/lightmapping)を使用してテクスチャに影をbakeすることを検討してください。
