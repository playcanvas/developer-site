---
title: シャドウ
description: リアルタイムシャドウを有効化し、シャドウタイプ（PCF、VSM、PCSS）を選択し、カスケード、シャドウバウンズ、解像度、バイアスで品質を調整します。
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

シャドウはシーン内のオブジェクトを接地させ、奥行きやオブジェクト同士の空間的な関係を伝えることで、リアリズムと視覚的な完成度を高めます。

PlayCanvas は、シャドウマッピングと呼ばれる技術を使用してリアルタイムの動的シャドウをレンダリングします。これはすべてのライトタイプでサポートされ、デスクトップからモバイルまですべてのプラットフォームで動作します。このページでは、シャドウを有効にする方法、どのオブジェクトがシャドウをキャスト／受信するかの選択、シャドウタイプの選択、そして品質の調整方法について説明します。

## シャドウの有効化 {#enabling-shadows}

デフォルトでは、PlayCanvasではシャドウキャストは無効になっているため、自分で明示的に有効にする必要があります。まず、シーンでシャドウをキャストするライトを特定します。各ライトには「Cast Shadows」というオプションがあります。次に、どのグラフィカルオブジェクトがシャドウをキャストおよび受信するかを選択します。デフォルトでは、すべての render および model コンポーネントがシャドウをキャストおよび受信し、エンティティごとに切り替えることができます。gsplat コンポーネントもシャドウをキャストできますが（受信はできません）、こちらはデフォルトで無効になっています。

<Tabs groupId="workflow" defaultValue="engine">
<TabItem value="engine" label="Engine">

```javascript
// ライトのシャドウキャストを有効にする
entity.light.castShadows = true;

// メッシュエンティティはデフォルトでシャドウをキャスト・受信します（render または model コンポーネント）。
// 必要に応じてエンティティごとに切り替えます
meshEntity.render.castShadows = true;
meshEntity.render.receiveShadows = true;

// Gsplat エンティティもシャドウをキャストできます（デフォルトでは無効）
splatEntity.gsplat.castShadows = true;
```

</TabItem>
<TabItem value="editor" label="Editor">

Hierarchyでライトを選択し、その[Lightコンポーネント](/user-manual/editor/scenes/components/light)で **Cast Shadows** を有効にします。

どのオブジェクトが対象になるかを制御するには、エンティティを選択し、その [render](/user-manual/editor/scenes/components/render) または [model](/user-manual/editor/scenes/components/model) コンポーネントの **Cast Shadows** / **Receive Shadows** オプションを切り替えるか、[gsplat](/user-manual/editor/scenes/components/gsplat) コンポーネントの **Cast Shadows** を有効にします。

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

// GSplat コンポーネントもシャドウをキャストできます（デフォルトでは無効）
<Entity>
  <GSplat asset={splat} castShadows />
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

<!-- Gsplat コンポーネントもシャドウをキャストできます（デフォルトでは無効） -->
<pc-entity>
  <pc-gsplat asset="my-splat" cast-shadows></pc-gsplat>
</pc-entity>
```

</TabItem>
</Tabs>

## シャドウタイプ {#shadow-types}

ライトのシャドウをフィルタリングする技術（エッジの柔らかさ、品質、パフォーマンスのトレードオフ）は、ライトごとに選択します。PlayCanvas には3つのフィルタリング技術があります。

:::note

[クラスタードライティング](/user-manual/graphics/lighting/clustered-lighting)が有効な場合（デフォルト）、ライトごとのシャドウタイプは Directional ライトにのみ適用されます。Spot ライトと Omni ライトはすべて、シーンのライティング設定で指定する単一の[シーン全体のシャドウタイプ](/user-manual/graphics/lighting/clustered-lighting/#shadows-type)（PCF のみ）を共有します。

:::

### PCF (Percentage-Closer Filtering) {#pcf}

シャドウのアウトラインをペナンブラと呼びます。これは暗から明への遷移で、シャドウに柔らかいエッジを与えます。デフォルトの技術である PCF は、シャドウマップから複数の局所的なサンプルを読み込んで平均し、このエッジを一定量だけ柔らかくします。

![Hard vs soft shadows](/img/user-manual/graphics/lighting/shadows/hard-vs-soft.jpg)

カーネルサイズがトレードオフを決めます。1×1 は最も硬いエッジ、3×3 はデフォルト、5×5 は最も柔らかいエッジになります。カーネルが大きいほど多くのテクセルをサンプリングし、GPU コストが高くなります。

シャドウタイプを PCF のいずれかに設定します。

<Tabs groupId="workflow" defaultValue="engine">
<TabItem value="engine" label="Engine">

```javascript
// SHADOW_PCF1_32F | SHADOW_PCF3_32F (default) | SHADOW_PCF5_32F
entity.light.shadowType = SHADOW_PCF5_32F;
```

</TabItem>
<TabItem value="editor" label="Editor">

[Lightコンポーネント](/user-manual/editor/scenes/components/light)で **Shadow Type** を **Shadow Map PCF 1x1**、**3x3**、または **5x5** に設定します。

</TabItem>
<TabItem value="react" label="React">

```jsx
import { SHADOW_PCF5_32F } from 'playcanvas';

<Entity name="light">
  <Light type="directional" castShadows shadowType={SHADOW_PCF5_32F} />
</Entity>
```

</TabItem>
<TabItem value="web-components" label="Web Components">

```html
<!-- shadow-type: pcf1-32f | pcf3-32f | pcf5-32f -->
<pc-entity>
  <pc-light type="directional" cast-shadows shadow-type="pcf5-32f"></pc-light>
</pc-entity>
```

</TabItem>
</Tabs>

### VSM (Variance Shadow Maps) {#vsm}

バリアンスシャドウマップは、事前にブラーをかけられる統計的な深度情報を格納し、Directional ライトのシャドウのような広い範囲に適した滑らかでソフトなエッジを生成します。16 ビットと 32 ビットの精度バリアントがあり（後者がより高精度）、一部のシーンではライトブリーディングのアーティファクトが発生することがあります。

:::note

VSM は Directional ライトと、クラスタードでない Spot ライトでのみ利用できます。

:::

シャドウタイプを VSM に設定して調整します。

<Tabs groupId="workflow" defaultValue="engine">
<TabItem value="engine" label="Engine">

```javascript
entity.light.shadowType = SHADOW_VSM_16F;

// 任意の調整
entity.light.vsmBlurSize = 11; // ブラーのカーネルサイズ、1-25
entity.light.vsmBlurMode = BLUR_GAUSSIAN; // または BLUR_BOX（より低コスト）
entity.light.vsmBias = 0.0025; // シャドウアクネを軽減、0-1
```

</TabItem>
<TabItem value="editor" label="Editor">

[Lightコンポーネント](/user-manual/editor/scenes/components/light)で **Shadow Type** を **Variance Shadow Map (16bit)** または **(32bit)** に設定します。**VSM Blur Mode** と **VSM Blur Size** もそこに表示されます。

</TabItem>
<TabItem value="react" label="React">

```jsx
import { SHADOW_VSM_16F, BLUR_GAUSSIAN } from 'playcanvas';

<Entity name="light">
  <Light type="directional" castShadows shadowType={SHADOW_VSM_16F}
    vsmBlurSize={11} vsmBlurMode={BLUR_GAUSSIAN} vsmBias={0.0025} />
</Entity>
```

</TabItem>
<TabItem value="web-components" label="Web Components">

```html
<!-- vsm-blur-mode は現在属性として公開されていません -->
<pc-entity>
  <pc-light type="directional" cast-shadows shadow-type="vsm-16f"
    vsm-blur-size="11" vsm-bias="0.0025"></pc-light>
</pc-entity>
```

</TabItem>
</Tabs>

### PCSS (Percentage-Closer Soft Shadows) {#pcss}

PCF は一定の幅のソフトなエッジを生成します。しかし実際のシャドウは、2つのオブジェクトが接する部分では鮮明で、キャスターがシャドウを受ける面から離れるにつれて柔らかくなります。PCSS はこの*コンタクトハードニング*の挙動を再現し、シャドウのキャスターとレシーバー間の距離に基づいてペナンブラの幅を変化させます。

![Soft shadows using PCSS](/img/user-manual/graphics/lighting/shadows/pcss-shadows.webp)

:::note

PCSS は Directional ライトでのみ利用できます。

また、PCSS は、デバイスが浮動小数点テクスチャへのレンダリングと線形フィルタリングをサポートしている必要があります。これは最新のデスクトップ GPU では広くサポートされていますが、特に古い、または低スペックのモバイルデバイスでは、必ずしも利用できるとは限りません。サポートされていない場合、ライトは自動的に PCF にフォールバックするため、PCSS は常に安全に有効化できます。

:::

シャドウタイプを PCSS に設定し、微調整します。

<Tabs groupId="workflow" defaultValue="engine">
<TabItem value="engine" label="Engine">

```javascript
entity.light.shadowType = SHADOW_PCSS_32F;

// 任意の微調整
entity.light.penumbraSize = 2; // ペナンブラの全体的なサイズ（柔らかさ）
entity.light.penumbraFalloff = 1; // 距離に応じて柔らかさが増す速さ、1 以上
entity.light.shadowSamples = 16; // フィルタサンプル数。多いほど滑らかでコスト増
entity.light.shadowBlockerSamples = 16; // 0 でコンタクトハードニングを無効化
```

</TabItem>
<TabItem value="editor" label="Editor">

Hierarchy でライトを選択し、[Lightコンポーネント](/user-manual/editor/scenes/components/light)で **Shadow Type** を **PCSS (Soft Shadows)** に設定します。**Penumbra Size** と **Penumbra Falloff** もそこに表示されます。サンプル数は現在 Light Component のエディタ UI には公開されていないため、スクリプトで設定する必要があります。

</TabItem>
<TabItem value="react" label="React">

```jsx
import { SHADOW_PCSS_32F } from 'playcanvas';

<Entity name="light">
  <Light type="directional" castShadows shadowType={SHADOW_PCSS_32F}
    penumbraSize={2} penumbraFalloff={1} shadowSamples={16} shadowBlockerSamples={16} />
</Entity>
```

</TabItem>
<TabItem value="web-components" label="Web Components">

```html
<pc-entity>
  <pc-light type="directional" cast-shadows shadow-type="pcss-32f"
    penumbra-size="2" penumbra-falloff="1" shadow-samples="16" shadow-blocker-samples="16"></pc-light>
</pc-entity>
```

</TabItem>
</Tabs>

## シャドウの調整 {#tuning-shadows}

PlayCanvasが使用するシャドウマッピング技術には有限の解像度しかありません。そのため、できるだけ見栄え良くするために、いくつかの値を調整する必要があります。以下の各プロパティは、Editorの[Lightコンポーネント](/user-manual/editor/scenes/components/light)のUIで設定するか、コードでライトコンポーネント（`entity.light.*`）に設定できます。

### シャドウ解像度 {#shadow-resolution}

すべてのライトは、シャドウマップを介してシャドウをキャストします。このシャドウマップ（`light.shadowResolution`）は、16x16 から 4096x4096 までの解像度になり、この値もLightコンポーネントのインターフェイスで設定されます。解像度が高いほど、シャドウがより鮮明になります。ただし、解像度が高いほど、シャドウをレンダリングするために負荷がかかり、フレームレートに影響を与える可能性があります。

### シャドウ距離 {#shadow-distance}

シャドウ距離（`light.shadowDistance`）は、ビューポイントから遠くの方向性ライトのシャドウがレンダリングされなくなる距離です。この値が小さいほど、シャドウがより鮮明になります。問題は、ビューポイントがシーンを移動すると、見る人が影が突然現れるのを見ることができるということです。したがって、この値は、プレイヤーが遠くまで見ることができる距離と一般的にどちらが良いかに基づいてバランスを取る必要があります。

### シャドウカスケード {#shadow-cascades}

大面積の方向性シャドウを使用すると、しばしばエイリアシングが発生し、カメラの近くの影が低解像度になることがあります。単一のシャドウマップで影をキャプチャするには、この問題を改善するために非常に高い解像度が必要ですが、実用的ではありません。

シャドウカスケードは、この問題を解決するために、ビュー方向に沿ってカメラビューフラスタムを分割し、各分割に別個のシャドウマップを使用する方法です。これにより、近くのオブジェクトには1つのシャドウマップが割り当てられ、遠くのオブジェクトは別のシャドウマップがキャプチャされます。オプションで、その間にさらにシャドウマップを追加します。

ただし、シャドウキャスティングメッシュの数に影響を与えるため、シャドウカスケードの数はパフォーマンスに影響を与えます。

カスケード数（`light.numCascades`）は、ビューフラスタムの分割数を表し、1、2、3、4の値が設定できます。既定値の1は、単一のシャドウマップを表します。

単一のシャドウカスケードを示すスクリーンショット。

![One cascade](/img/user-manual/graphics/lighting/shadows/shadow-cascades-1.jpg)

4つのシャドウカスケードを示すスクリーンショット。

![Four cascades](/img/user-manual/graphics/lighting/shadows/shadow-cascades-4.jpg)

個々のシャドウカスケードのカメラフラスタムのサブディビジョンの分布（`light.cascadeDistribution`）。0から1の値を指定できます。値0は線形分布を表し、値1は対数分布を表します。ビジュアル的には、値が高いほど、前景オブジェクトにシャドウマップ解像度がより多く割り当てられ、値が低いほど、遠くのオブジェクトに割り当てられます。

### シャドウバウンズ {#shadow-bounds}

デフォルトでは、Directional ライトはシャドウマップを各カメラのビューに合わせ、その解像度をカメラ前方の[シャドウ距離](#shadow-distance)全体に割り当てます。シャドウがシーンの一部でのみ必要な場合、たとえばライティングをベイクしたシーン内のキャラクターの周囲などでは、代わりにシャドウバウンズ（`light.shadowBounds`）を設定できます。これは、シャドウキャスターを囲むワールド空間のバウンディングボックスです。ライトは、ライトから見たバウンズに合わせた単一のシャドウマップをレンダリングするため、解像度のすべてがシャドウの必要な場所に使われます。シャドウマップはすべてのカメラに対して一度だけレンダリングされ、シャドウはカメラからの距離に制限されません。

```javascript
// 原点周辺の 10 x 4 x 10 の範囲にあるキャスターのシャドウ
entity.light.shadowBounds = new BoundingBox(new Vec3(0, 2, 0), new Vec3(5, 2, 5));
```

バウンズで囲む必要があるのはシャドウキャスターだけで、レシーバーを含める必要はありません。シャドウはライトの方向に沿って落ちるため、キャラクターの下の地面のように、ライトの方向に沿ってバウンズより先にあるレシーバーには、バウンズ内のキャスターのシャドウが落ちます。ライトとバウンズの間にあるキャスターもシャドウを落とします。ライトから見てバウンズの横にあるキャスターや、ライトの方向に沿ってバウンズより先にあるキャスターは、シャドウを落としません。

ライトはバウンズのコピーを保持するため、変更するにはバウンディングボックスを変更して再度設定します。たとえば、移動するキャラクターのシャドウを鮮明に保つには、毎フレームバウンズをキャラクターと一緒に移動します。

```javascript
const bounds = new BoundingBox(new Vec3(), new Vec3(1, 1.5, 1));

app.on('update', () => {
    bounds.center.copy(character.getPosition());
    entity.light.shadowBounds = bounds;
});
```

バウンズが設定されている間、ライトは `numCascades`、`shadowDistance`、`cascadeBlend`、`cascadeDistribution` を使用しません。各カメラに合わせたシャドウに戻すには、バウンズを `null` に設定します。シャドウは `light.shadowUpdateMode` の指定どおりに更新され、バウンズが変更されると再度レンダリングされます。そのため `SHADOWUPDATE_NONE` では、静的なキャスターのシャドウは一度だけレンダリングされ、バウンズが移動したときにのみ再度レンダリングされます。

シャドウバウンズは Directional ライトでのみ利用でき、すべての[シャドウタイプ](#shadow-types)で動作します。Editor には設定項目がないため、スクリプトから設定してください。

バウンズに合わせたシャドウとカメラに合わせたシャドウを比較する、エンジンのシャドウバウンズのサンプルで実際の動作を確認できます。

<EngineExample id="lights-and-shadows/shadow-bounds" title="Shadow Bounds" />

### シャドウ強度 {#shadow-intensity}

このライトによってキャストされる、1を完全な強度のシャドウ、0をシャドウのないものとするシャドウの強度（`light.shadowIntensity`）。

![Shadow Intensity](/img/user-manual/graphics/lighting/shadows/shadow-intensity.gif)

## シャドウアーティファクトの解消 {#fixing-shadow-artifacts}

シャドウマッピングは、非常に醜い外観のレンダリングアーティファクトが発生する可能性があります。以下のプロパティは、それらの解消に役立ちます。

### シャドウバイアス {#shadow-bias}

影の帯や、期待しない場所に斑点状のパッチがある場合は、シャドウバイアス（`light.shadowBias`）を調整して問題を解決する必要があります。

### 法線オフセットバイアス {#normal-offset-bias}

「影の吹き出物」は大きな問題ですが、シャドウバイアスを使用することで効果的に解決できます。残念ながら、これにより常に「ピーターパン」現象が発生します。それは、影によってオブジェクトが空中に浮いているように見える現象です。

法線オフセットバイアス（`light.normalOffsetBias`）は、この問題を解決します。深度バイアスを使用するだけでなく、シャドウマップルックアップに使用されるUV座標をわずかに調整することで、シャドウの吹き出物とピーターパンを回避できます。フラグメントの位置は、そのジオメトリの法線に沿ってオフセットされます。この「法線オフセット」技術は、定数シャドウバイアスのみを使用するアプローチよりもはるかに優れた結果をもたらします。

## パフォーマンスに関する考慮事項 {#performance-considerations}

影を使用すると、パフォーマンスに以下のような影響があります:

* 指向性またはスポットライトを落とすそれぞれの影のために、すべてのフレームで一度シーンをシャドウマップにレンダリングする必要があります。ポイントライトの場合はシーンがライトごとに6回レンダリングされるので(シャドウマップが6面のキューブマップとして保存される)、負荷が大きくなります。シャドウマップの中にシーンをレンダリングすると、CPUとGPUの両方に負荷を加えます。
* シャドウマップの解像度を上げるとより鮮明な影を生成しますが、GPUはより多くのシャドウマップピクセルを埋める必要があり、フレームレートに影響を与える可能性があります。
* [シャドウタイプ](#shadow-types)はコストに影響します。大きな PCF カーネル、VSM のブラー、特に PCSS（ピクセルごとに多数のサンプルを取得）は、ハードな単一サンプルのシャドウよりも GPU 負荷が高くなります。
* Directional ライトでは、[シャドウカスケード](#shadow-cascades)を追加するごとに、シャドウキャスターが複数のシャドウマップにレンダリングされる場合があり、コストが増加します。
* デフォルトでは、各カメラが自身のビューに合わせて Directional ライトのシャドウマップをレンダリングします。[シャドウバウンズ](#shadow-bounds)を設定したライトは、代わりにすべてのカメラに対して単一のシャドウマップをレンダリングします。
* 影が環境の静的な部分から発生している場合は、[ライトマップ](/user-manual/graphics/lighting/lightmapping)を使用してテクスチャに影をbakeすることを検討してください。
