---
title: シーン設定 (Scene Settings)
sidebar_position: 5
---

設定パネル (SETTINGS) を使用すると、さまざまなプロパティを設定できます。エディターの左下にある`cog`ボタン([ツールバー][1])を使用してアクセスできます。

![Cog](/img/user-manual/scenes/settings/cog.jpg)

## 物理設定 (Physics Settings) {#physics-settings}

物理設定は、シーン内のすべてのRigidBodyコンポーネントのシミュレーションに影響します。

### 有効化 (Enable) {#enable}

3D物理ライブラリがアプリケーションに含まれる場合は、有効にしてください。

### 重力 (Gravity) {#gravity}

重力は、シーン内のすべての剛体にフレームごとに適用される加速度です。デフォルトでは、1秒間あたり約9.8メートルの速度で近似的に地球の重力を表します。宇宙でゲームを作成している場合は、これを0, 0, 0(ゼロG)に設定することができます。

## レンダリング (Rendering) {#rendering}

レンダリング設定は、さまざまなグラフィックス関連のプロパティに影響を与えます。

### アンビエントカラー (Ambient Color) {#ambient-color}

シーンの環境光源の色です。PlayCanvasでは、方向性、点、スポットライトを作成できます。これらのライトは、オブジェクトに落ちる直接光を考慮しています。しかし、現実では、光は環境中を反射し、これを間接光と呼びます。グローバル環境光はこれをおおまかに近似し、すべての方向から輝くように見える光源を設定できます。グローバル環境色は、Phongマテリアルの環境プロパティと乗算され、オブジェクトの最終色に寄与します。

Skyboxと物理マテリアルを使用している場合、アンビエントカラーには影響がありません。

### スカイボックス (Skybox) {#skybox}

Skyboxは、3Dシーンの背後にレンダリングされる[cubemap][3]アセットです。これにより、シーン内の3Dモデルを超えた遠くの世界を表示するために6つの2D画像セットを使用できます。

Skyboxを追加するには、cubemapアセットを作成して、設定パネルのcubemapスロットに割り当てます。

Prefiltered Cubemapを使用している場合、skyboxはPhysical materialsのデフォルトの環境マップとして使用されます。

### スカイボックスの強度 (Skybox Intensity) {#skybox-intensity}

これは、skyboxの強度または明るさを制御するスライダーです。値は0(完全に黒)から32(最も明るい)までの範囲になります。

### Skybox Mip {#skybox-mip}

Prefiltered Skyboxを使用する場合、表示するskybox mipを選択できます。各mipは、元のSkyboxのよりぼやけたバージョンです。これを使用して、元のSkyboxのよりぼやけた/抽象的なバージョンを表示することができます。

### トーンマッピング (Tonemapping) {#tonemapping}

トーンマッピングは、High Dynamic Range(HDR)カラーを限られたLow Dynamic Range(例えば、可視モニター出力値)に圧縮するプロセスです。トーンマッピングには2つのオプションがあります。

- **Linear:** HDRカラーを露光で単純にスケーリングします。
- **Filmic:** より洗練された曲線で、明るすぎるスポットを柔らかくするのに適していますが、暗いシェードも保存します。

Linearのトーンマッピングはデフォルトで有効になっており、シンプルにcolor * 露出 (exposure) になります。明るさを素早く変更するには露出を調整できます。入力がHDRであるため、これはPhotoshopのような単純な明るさではありません。たとえば、強度 (intensity) = 8の光源がある場合、露出= 0.5の場合でもかなり明るく(4)なります。すべての目に見えるものは直線的にフェードアウトするだけではありません。

Filmicのトーンマッピングは、明るい太陽で照らされたシーンや、壁/天井に近い明るい光があるインテリアなど、高コントラストな環境で良い選択肢です。範囲外の超明るい値を何かより知覚的に現実的なものにきれいにリマップします(私たちの目とフィルムもトーンマッピングを行います、物理的に線形の値を見るわけではありません)。写真家に聞いてみてください。誰もが、非常に明るいスポットと真っ暗なスポットを写真に残したくありません。フィルム風のトーンマッピングにより、そのようなスポットを取り除く素晴らしい機能が提供されます。

### 露出 (Exposure) {#exposure}

露出値はシーン全体の明るさを微調整します。

### ガンマ補正 (Gamma Correction) {#gamma-correction}

コンピュータのスクリーンは、物理的には線形ではなく知覚的に線形 (sRGB) な信号を出力するように設定されています。しかし、照明計算を行う際に正しい外観を得るためには、カラーテクスチャを物理的に線形な空間に変換し、完全に照らされたイメージを再び sRGB に合わせる必要があります。ガンマ補正を有効にしてレンダリングすると、不格好で過度に飽和したハイライトの数を減らすことができ、照明後の色をより正確に保持することができます。一般的に、シーンでこれを有効にすることが推奨されます。以下の画像は球体がある単純なシーンで、左側がガンマ補正されたシーンで、右側が補正されていないシーンです。

![Gamma Correction](/img/user-manual/scenes/settings/gamma-correction.jpg)

ガンマ補正についてもっと知りたい場合は、[このGPU Gemsの章][5]を読んでください。

### フォグ (Fog) {#fog}

Fog Type プロパティを使用して、シーンで環境フォグの近似を制御できます。以下は、フォグが有効になっている例です。

使用可能なタイプは以下の通りです。

- None - フォグが無効になっています
- Linear - フォグは、フォグの開始距離とフォグの終了距離の間で線形にフェードします。
- Exp - フォグは、指数関数に従ってビューポジションからフェードインします。
- Exp2 - フォグは、二乗の指数関数に従ってビューポジションからフェードインします。

### Color {#color}

フォグの色。この色は、フォグがフェードインするにつれて、表面の色に混ぜ込まれます。

### 開始距離 (Start Distance) {#start-distance}

フォグがフェードインし始めるビューポイントからのシーン単位での距離です。

### 終了距離 (End Distance) {#end-distance}

フォグが最大に達するビューポイントからのシーン単位での距離です。この距離を超えるオブジェクトは、フォグの色でレンダリングされます。

### フォグ密度 (Fog Density) {#fog-density}

フォグ密度は、ExpおよびExp2フォグタイプに対してフォグがフェードインする速度を制御します。大きな値はフォグがより速くフェードインするようになります。フォグ密度は正の数でなければなりません。

### Resolution {#resolution}

アプリケーションの幅と高さを制御します。解像度モードを以下のいずれかの値に設定することもできます。

- Auto - 解像度は常にキャンバスサイズと同じになります。
- Fixed - 解像度は常に幅x高さのピクセルになります。

### フィルモード (Fill Mode) {#fill-mode}

フィルモードは、キャンバスのサイズ調整の動作を制御します。以下の値のいずれかを設定できます。

- None - キャンバスは解像度の幅と高さと同じサイズになります。
- Keep aspect Ratio - キャンバスは正しいアスペクト比を保持しながらウィンドウを拡大します。
- Fill window - キャンバスはウィンドウを完全にフィルするようにストレッチされます。

### デバイスピクセル比率 (DPI) {#device-pixel-ratio}

キャンバスの解像度がデバイスピクセル比を含めて計算されるようになります。

### 透明なキャンバス (Transparent Canvas) {#transparent-canvas}

メインのcanvas要素でアルファブレンディングを有効にします。

### 描画バッファの保持 (Preserve Drawing Buffer) {#preserve-drawing-buffer}

WebGLコンテキストを作成する際、preserveDrawingBufferオプションを使用します。

## レイヤーの一覧 (Layers) {#layers}

レンダリングレイヤーとその描画順序を管理します。レイヤーについての詳細は[こちら][10]を参照してください。

## オーディオ (Audio) {#audio}

### レガシーオーディオの使用 (Use Legacy Audio) {#use-legacy-audio}

レガシーオーディオコンポーネントを有効にします。これは廃止された古いプロジェクトとの互換性のためにのみ使用してください。

## ライトマッピング (Lightmapping) {#lightmapping}

![Lightmapping Settings](/img/user-manual/scenes/settings/lightmapping-settings.png)

### サイズの乗数 (Size Multiplier) {#size-multiplier}

すべてのライトマップサイズに適用されるシーン全体の乗数。

### 最大解像度 (Max Resolution) {#max-resolution}

生成されたライトマップテクスチャに使用可能な最大テクスチャサイズ。

### モード (Mode) {#mode}

シーン全体のライトマップの焼き込みに使用されるモードで、次のオプションがあります。

- **Color Only** - HDRカラーを含む単一のライトマップを焼き込みます。
- **Color and Direction** - 主要なライト方向を含む2番目のライトマップを焼き込みます。Specular Lightingを使用することができます。Color and Directionモードは、[Soft Directional Light][13]または[Environment Light][14]のベイクとは互換性がありません

### フィルター (Filter) {#filter}

[Runtime Baked Lightmaps][15]（ランタイムベイクドライトマップ）に対してバイラテラルフィルタを有効にします。

### Range {#range}

バイラテラルフィルタの範囲パラメータ。大きい値ほど広範囲のぼかしが適用されます。

### 滑らかさ (Smoothness) {#smoothness}

バイラテラルフィルタの空間パラメータです。大きな値を設定すると、色の類似性が低いものほどぼかされます。

### Ambient Bake (アンビエントベイク) {#ambient-bake}

[Environment Light][14]の焼き込みを有効にします。

### Samples (サンプル数) {#samples}

環境光をライトマップにベイクするために使用されるサンプル数。

### Sphere Part {#sphere-part}

環境光をベイクするために使用される球の割合。

### オクルージョンの明るさ (Occlusion Brightness) {#occlusion-brightness}

ベイクされたアンビエントオクルージョンの明るさ。

### オクルージョンコントラスト (Occlusion Contrast) {#occlusion-contrast}

ベイクされたアンビエントオクルージョンのコントラスト。

## バッチグループ {#batch-groups}

プロジェクトのバッチグループを作成・管理することができます。[Model][7]コンポーネントや[Element][8]コンポーネントをバッチグループに割り当てることができ、同じグループ内のオブジェクトのメッシュインスタンスを結合して描画コールを減らすようにエンジンが試みます。バッチ処理については[こちら][9]を参照してください。

## Loading Screen {#loading-screen}

アプリケーションのローディング画面を作成するスクリプトを設定できます。新しいローディングスクリーンスクリプトを作成するには、*Create Default*をクリックしてください。カスタムローディングスクリーンに関する詳細は[こちら][6]を参照してください。

## 外部スクリプト (External Scripts) {#external-scripts}

アプリケーションに含めたい外部スクリプトのURLを指定できます。これらのURLは、他のスクリプトがロードされる前にアプリケーションのメインHTMLページに&lt;script&gt;タグとして追加されます。

## Input {#input}

アプリケーションで使用する入力デバイスを有効または無効にできます。

## ローカライゼーション (Localization) {#localization}

ローカライズデータを含むJSONアセットを指定できます。このリストにあるアセットは、ロードされると自動的にローカライズデータを解析します。これらは、テキストエレメントをローカライズするために使用されます。

新しいローカライズアセットを作成するには、CREATE NEW ASSETをクリックしてください。そのアセットに対して、必要なロケールのデータを追加することができます。

ローカライズについての詳細は[こちら][11]を参照してください。

## アセットタスク (Asset Tasks) {#asset-tasks}

### Auto-run {#auto-run}

アセットがアップロードされると、アセットパイプラインを自動的に実行します。

### Textures POT (power-of-two) (テクスチャの2の累乗リサイズ) {#textures-pot-power-of-two}

テクスチャがインポートされると、最も近い2の累乗にリサイズします。

### アトラスを作成 (Create Atlases) {#create-atlases}

新しい画像がアップロードされると、テクスチャの代わりにテクスチャアトラスが作成されます。

### 関連アセットの検索 (Search related assets) {#search-related-assets}

アセットが新しいバージョンで更新された場合、元のアセットから作成された(マテリアルやテクスチャなどの)関連アセットを検索します。それ以外の場合は、関連アセットを現在のフォルダ内だけでチェックします。

### モデルの上書き (Overwrite Model) {#overwrite-model}

シーン(例:FBX)をインポートすると、この設定によってモデルファイルがシーンからインポートされた新しいバージョンで上書きされるかどうかが決まります。

### アニメーションの上書き (Overwrite Animation) {#overwrite-animation}

シーン(例:FBX)をインポートすると、この設定によってアニメーションファイルがシーンからインポートされた新しいバージョンで上書きされるかどうかが決まります。

### マテリアルの上書き (Overwrite Material) {#overwrite-material}

シーン(例:FBX)をインポートすると、この設定によってマテリアルファイルがシーンからインポートされた新しいバージョンで上書きされるかどうかが決まります。

### テクスチャの上書き (Overwrite Texture) {#overwrite-texture}

シーン(例:FBX)をインポートすると、この設定によってテクスチャファイルがシーンからインポートされた新しいバージョンで上書きされるかどうかが決まります。

[1]: /user-manual/editor/interface/toolbar
[3]: /user-manual/assets/types/cubemap
[5]: https://developer.nvidia.com/gpugems/gpugems3/part-iv-image-effects/chapter-24-importance-being-linear
[6]: /user-manual/editor/launch-page/loading-screen
[7]: /user-manual/scenes/components/model
[8]: /user-manual/scenes/components/element
[9]: /user-manual/graphics/advanced-rendering/batching
[10]: /user-manual/graphics/layers/
[11]: /user-manual/user-interface/localization
[13]: /user-manual/graphics/lighting/runtime-lightmaps/#soft-directional-light
[14]: /user-manual/graphics/lighting/runtime-lightmaps/#baking-an-environment-light
[15]: /user-manual/graphics/lighting/runtime-lightmaps
