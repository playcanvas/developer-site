---
title: ランタイムライトマップ
---

![Sponza](/img/user-manual/graphics/lighting/lightmapping/sponza.jpg)
*All the lighting in this scene is provided by lightmap textures*

ライトマップ生成は、静的シーンのライティング情報を事前に計算し、テクスチャに保存するプロセスであり、材料に適用されます。これは、多くの光源とジオメトリが静的または環境的である場合、シーンを照らす効率的で現実的な方法です。

## ランタイムライトマップ生成 {#runtime-lightmap-generation}

PlayCanvasは、ライトマップの生成に便利なソリューションを提供しています。エディタ内の標準Lightコンポーネントを使用することで、どのライトをライトマップの生成に使用するか、どのライトをランタイムでシーンを動的に照らすために使用するかを選択できます。ベイクに設定したライトが、アプリケーションがライトマップを生成してシーンを照らす際に使用されます。

ランタイムライトマップの多くの利点があります。

- ライティングは**ランタイムで行われない**。
- **静的ライト**を何百個も使用してシーンの照明を行うことができる。
- ほとんどの場合、ランタイムでライトマップをレンダリングする方が、多くのライトマップテクスチャをダウンロードするよりも**高速**です。
- エディタで **静的ライトと動的ライト** を混合することができます。
- ランタイムで**再ベイク**ができます。
- ライトマップは**HDR**です。
- **色**と**方向**の両方のデータをベイクすることができ、ベイクされた表面にスペキュラリティを設定できます。

ただし、ランタイムライトマップの欠点は、現時点ではグローバル・イルミネーションや一部の特殊なベイキングツールの高度な機能をサポートしていないことです。

:::note

[バッチ処理](/user-manual/graphics/advanced-rendering/batching)を使用している場合、ランタイムライトマップが適用されません。なぜなら、各ライトマップオブジェクトが独自のライトマップテクスチャを必要とするためです。

:::

## ベイクされるライトの設定 {#setting-up-lights-for-baking}

各Lightコンポーネントには、ライトマップをベイクするための次の設定が含まれています。デフォルトでは、新しいライトはダイナミックに設定されています。

- **Bake Lightmap** – 有効にすると、ライトは範囲内にある任意のライトマップ付きモデルのライトマップをベイクします。
- **Bake Direction** – ライトがライト方向情報ベイクに寄与するかどうかを指定します。これは、Scene Settingで**Color and Direction** Lightmapping Modeを選択した場合、スペキュラリティの結果に影響します。

![Light Component Settings](/img/user-manual/graphics/lighting/lightmapping/editor-lightmap-bake.png)

ライトの振る舞いを変更する2つの追加オプションがあります: Affect Dynamic と Affect Lightmapped です。これらは、ランタイムでライトがどのモデルに作用するかを決定します。これらのオプションのどちらかが有効になっている場合、ライトはランタイムで動作し、ランタイムコストが発生します。

- **Affect Dynamic** – 有効にすると、ライトは**ライトマップ付きでない**すべてのモデルに作用します。
- **Affect Lightmapped** – 有効にすると、ライトは**ライトマップ付きの**すべてのモデルに作用します。

ライトは、**Bake Lightmap**と**Affect Lightmapped**の両方を有効にすることはできません。モデルのライトマップを作成するためにライトが同じランタイムライトを追加した場合、ライトはランタイムで同じように照明を追加し、同じ作業が二度行われることになります。

![Light Component Shadow Settings](/img/user-manual/graphics/lighting/lightmapping/editor-light-shadows.png)

ライトマップライトは、ダイナミックライトと同じ **Shadows** 設定を使用しますが、影の計算はライトマップの生成時に一度だけ行われます。このため、ライトマップライトで影が有効になっている場合、コストはずっと少なくなります。詳細は[Shadows](/user-manual/graphics/lighting/shadows)ページを参照してください。なお、ベイクについてはShadow Cascadeのオプションは無視されます。

### ソフトディレクショナルライト {#soft-directional-light}

デフォルトでは、ベイクされたライトはハードシャドウを投影します。視覚的な品質を向上させるために、**方向光**の場合、**ベイク方向**オプションが無効化されている場合には、ソフトベイクされたシャドウが利用可能です。この場合、さらに2つのオプションがあります。

- **Bake Samples** – ライトをライトマップにパッキングするために使用するサンプルの数を指定します。デフォルトは1で、最大値は255です。この値はベイクのパフォーマンスに影響を与えます。値をできるだけ低く設定する必要があります(5〜20)。
- **Bake Area** –半影の角度を度数で指定します。Soft Shadow Boundaryを作成します。

![Soft Directional Light Settings](/img/user-manual/graphics/lighting/lightmapping/editor-directional-light.png)

次の画像は、サンプルが15でAreaが10の場合のハードシャドウとソフトシャドウの違いを示しています。

![Hard and Soft Shadow Examples](/img/user-manual/graphics/lighting/lightmapping/shadows-hard-soft.png)

## 環境ライトのベイク {#baking-an-environment-light}

PlayCanvasは2種類の環境ライティングをサポートしています: [Ambient Color](/user-manual/editor/interface/settings/rendering/)と[Skybox](/user-manual/editor/interface/settings/rendering/)です。これらは、デフォルトではランタイムで両方とも適用されています。

ランタイム環境ライトの適用の制限事項は、**Ambient Occlusion**の欠如です。代替案として、環境ライトをライトマップにベイクすることができ、その際にAmbient Occlusionも含まれます。これは、グローバル設定の[Lightmapping](/user-manual/editor/interface/settings/lightmapping/)セクションで構成できます。

**Ambient Bake**が有効になっている場合、環境ライトの貢献はAmbient Occlusionを含むライトマップにベイクされます。**Samples**設定は、ベイクのパフォーマンスに影響を与え、できるだけ低く設定する必要があります (5-20)。

![Lightmapping Settings](/img/user-manual/graphics/lighting/lightmapping/lightmapping-settings-ambient-bake.png)

次の画像は、Ambient Occlusionを含むAmbient Colorの効果を示しています。

![Ambient Color Examples](/img/user-manual/graphics/lighting/lightmapping/ambient-color.png)

## ライトマップのフィルタリング {#lightmap-filtering}

Soft Directional Lightや環境ライトのベイキングの場合、ベイクパフォーマンスを向上させるために低いサンプル数を使用することがあります。これにより、以下の画像のようなバンディングアーティファクトが作成されます(15サンプル使用)。

![Lightmap with 15 samples](/img/user-manual/graphics/lighting/lightmapping/lightmap-15-samples.png)

ライトマップの品質を向上させるには、より多くのサンプルを使用できます。これは、100個のサンプルを使用する次の画像でわかるように、可能な限り最高の品質になります。

![Lightmap with 100 samples](/img/user-manual/graphics/lighting/lightmapping/lightmap-100-samples.png)

よりパフォーマンスのある代替品として、ライトマップは、パフォーマンスを向上させるために、許容できる品質のためにスマートの両側ぼけを使用してフィルタリングできます。これは、15のサンプルを使用し、フィルタリングを有効にする次の画像で見ることができます。

![Lightmap with 15 samples and filtering](/img/user-manual/graphics/lighting/lightmapping/lightmap-filtering.png)

フィルタリングは最終的な焼きライトマップで行われ、ライトマップが縫い目全体にフィルタリングされていないため、包装されていないUVの縫い目に目に見えるエッジを作成できることに注意してください。したがって、フィルタリングはすべてのシーンに適していない場合があります。アーティファクトを最小限に抑えるには、強力なフィルターと多数のサンプルのバランスをとる必要があります。

## ベーキングのモデルのセットアップ {#setting-up-models-for-baking}

各 **Model** または **Render** コンポーネントは、ライトマップを受信するために、ライトマッピングを有効にする必要があります。**LightMapped**オプションをチェックすることにより、コンポーネントのプロパティでライトマッピングを有効にできます。

![Model Component Settings](/img/user-manual/graphics/lighting/lightmapping/model-settings.png)

![Render Component Settings](/img/user-manual/graphics/lighting/lightmapping/render-settings.png)

**キャストライトマップシャドウ (Cast Lightmap Shadows)**オプションは、モデルがライトマップにシャドウをキャストするかどうかを判断します。生成されたライトマップテクスチャの解像度を確認できます。また、UV1の領域に乗数を適用してそのサイズに影響を与えるオプションもあります。ライトマップサイズの乗数については、以下で説明します。

## 一般的な光設定 {#common-light-settings}

使用できる光設定のいくつかの組み合わせがあります。それぞれにユースケースがあり、異なる組み合わせのあるライトを使用することにより、高品質のビジュアルとパフォーマンスのバランスをとることができます。

| ベイク  | 非ベイクに影響 | ベイクに影響を与えます | 説明 |
|-------|-----------------|--------------|-------------|
| false | true            | false        | これはデフォルトの動的ライトです。すべての非ライトマップモデルに影響します。 |
| true  | false           | false        | このライトは、ライトマップモデルのライトマップを生成し、実行時には費用がかかりません。ほとんどの静的環境ライトは、この設定を使用できます。 |
| true  | true            | false        | このライトはライトマップを生成しますが、非光マップモデルにも影響します。この光で照らされる必要がある動的/移動エンティティがある場合に役立ちます。たとえば、プレーヤーのキャラクターにも影響を与える顕著な環境光。 |
| false | true            | true         | このライトは、ライトマップモデルと非ライトマップモデルの両方に影響する動的なライトです。 |

## ライトマッピング設定 {#lightmapping-settings}

**サイズの乗数 (Size Multiplier) **設定は、すべてのモデルとレンダリングコンポーネントに影響します。PlayCanvasは、モデルに必要な解像度のライトマップを自動的に決定します。モデルのスケールとジオメトリの領域サイズに基づいて、この値を計算します。モデルの**Size Multiplier**フィールドを変更するか、コンポーネントのグローバル設定をレンダリングすることにより、この計算に影響を与えることができます。

たとえば、サイズが1x1ユニット(メーター)の平面を検討してください。グローバルサイズの乗数が16で、モデルコンポーネント乗数が2の場合、32x32(`1 sq/m * 16 * 2`)のライトマップテクスチャサイズが生成されます。1平方メートルに32x32ピクセルがあり、これはピクセルサイズの約3cmです。

**最大解像度 (Max Resolution)** は、メモリを節約するために生成されたライトマップの最大解像度制限を設定します。

**モード**は、焼き付けるデータを指定できます(例:拡散色またはライトからピクセルへの方向)。方向データは、単純なスペキュラリティをシミュレートするために使用されます。1つの方向のみが焼き付けられるため、複数のライトが重なると複雑になります。方向の焼き付けは、個々のライトにも設定できます。

![Global Lightmapping Settings](/img/user-manual/graphics/lighting/lightmapping/lightmapping-settings.png)

## 自動アンラップ (Auto-Unwrapping) とUV1の生成 {#auto-unwrapping-and-uv1-generation}

ライトマップは、Modelアセットの2番目の **UV座標(UV1)** を使用して常に適用されます。最良の結果を得るには、PlayCanvasにアップロードする前に3Dコンテンツツールからモデルに2番目のUVセットを追加することをお勧めします。ライトマップに適したUVについては、[UVマッピング](/user-manual/graphics/lighting/lightmapping/#uv-mapping)セクションを参照してください。

モデルにUV1セットがない場合、PlayCanvasエディターは自動的にアンラップしてUV1座標を生成します。

![Model Component: UV1 Missing](/img/user-manual/graphics/lighting/lightmapping/model-uv1-missing.png)

モデルにUV1マップがない場合、ライトマッピングを有効にすると、Modelコンポーネントで警告が表示されます。

![Model Asset: Auto Unwrap Pipeline](/img/user-manual/graphics/lighting/lightmapping/auto-unwrap.jpg)

警告を修正するには、Modelアセットを選択して**パイプライン**セクションを開きます。 **Auto-Unwrapping** ボタンをクリックし、進行状況バーが完了するまで待ちます。自動アンラップは、Modelアセットを編集します。そのため、ソースからモデルを再インポートする場合(たとえば、新しいFBXをアップロードする場合)は、事前に計算されたUV1が失われます。アップロードされたモデルにUV1がない場合は、モデルを再度自動アンラップする必要があります。

**パディング (padding)** オプションは、アンラップが発生するときのセクション間のスペースを決定します。ライトが存在してはいけない場所に光が見える場合は、パディングを増やしてライトブリーディングを減らすことができます。
