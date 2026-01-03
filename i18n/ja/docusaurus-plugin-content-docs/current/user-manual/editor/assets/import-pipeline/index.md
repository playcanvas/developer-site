---
title: アセットインポートのパイプライン
---

一部のアセットは、ランタイムでゲームで使用する前に、"ターゲット (Target) "フォーマットに変換する必要があります。このプロセスを *インポート* と呼びます。たとえば、3DモデルはFBXファイルとしてアップロードできますが、ゲームで読み込む前にPlayCanvas互換のモデルファイルに変換する必要があります。

一部のアセットは、使用する前にインポートする必要がありません。たとえば、PNG画像は直ちにテクスチャとして使用することができます。

## アセットタスク (Asset Tasks) {#asset-tasks}

PlayCanvasは、ソース (Source) アセットがアップロードされると、アセットタスク (Asset Task) を開始し、サーバー上でインポートプロセスを実行します。

利用可能な複数のオプションがあり、インポートパイプラインの動作を調整することができます。これにより、ニーズに合わせて設定を行うことができます。

<img loading="lazy" src="/img/user-manual/assets/import-pipeline/asset-tasks.png" width="480" />

### 関連アセットの検索 (Search related assets) {#search-related-assets}

ソース (Source) アセットを更新する場合、新しいバージョンのファイルをアップロードすることで、インポートパイプラインによって作成されたターゲットアセットの更新方法には2つの可能性があります。

* **関連アセットの検索 (Search related assets)** が有効になっている場合、パイプラインはフォルダーに関係なくターゲットアセットを更新します。
* **関連アセットの検索 (Search related assets)** が有効になっていない場合、パイプラインはターゲットアセットをソースアセットと同じフォルダーでのみ検索します。

したがって、この機能を有効にしておくと、ソース (Source)アセットとターゲット (Target) アセットをフォルダに整理し、ソース (Source)アセットを更新すると関連するすべてのアセットが更新されることが保証されます。

### アセットのデフォルトをプリロードに設定 (Assets default to preload) {#assets-default-to-preload}

新しく作成されたアセットは、このオプションが有効または無効かどうかに応じて、自動的に[プリロード][2]に設定されます。これにはJavaScriptのスクリプトファイルは含まれません。JavaScriptのスクリプトファイルは、作成されたときに常にプリロードされます。

## テクスチャインポート設定 (Texture Import Settings) {#texture-import-settings}

これらのオプションは、画像とテクスチャのインポートにのみ影響を与えます。

### テクスチャPOT (Power of Two) {#texture-pot-power-of-two}

このオプションが有効になっている場合、2の累乗でないテクスチャは、インポート時に最も近い2の累乗解像度に変換されます。

### アトラスを作成 (Create Atlases) {#create-atlases}

アップロードされた画像は、通常のTextureアセットではなく、テクスチャアトラスとしてインポートされます。これは、多くのスプライトシートやUIアセットをアップロードする場合に便利です。

## モデルインポート設定 (Model Import Settings) {#model-import-settings}

これらのオプションは、モデルまたはシーンファイル(FBX、Collada、objなど)のインポートにのみ影響を与えます。

### マテリアルマッピングを保持 (Preserve material mappings) {#preserve-material-mappings}

モデルファイルが更新または再インポートされた場合、エディターはそれに設定されたマテリアルマッピングを保持しようとします。

### モデルを上書き (Overwrite Models) {#overwrite-models}

モデルファイルが更新または再インポートされた場合、このオプションによってターゲットモデルファイルが上書きされるかどうかが決まります。新しいモデルで上書きすることがデフォルトの動作です。

### アニメーションを上書き (Overwrite Animations) {#overwrite-animations}

モデルファイルが更新または再インポートされた場合、このオプションによってモデルから作成されたアニメーションが上書きされるかどうかが決まります。新しいアニメーションで上書きすることがデフォルトの動作です。

### マテリアルを上書き (Overwrite Materials) {#overwrite-materials}

モデルファイルが更新または再インポートされた場合、このオプションによってモデルから作成されたマテリアルが上書きされるかどうかが決まります。既存のマテリアルを残すことがデフォルトの動作です。

### テクスチャを上書き (Overwrite Textures) {#overwrite-textures}

モデルファイルが更新または再インポートされた場合、このオプションによってモデルから作成されたテクスチャが上書きされるかどうかが決まります。既存のテクスチャを新しいテクスチャで上書きすることがデフォルトの動作です。

### GLBに変換 (Convert to GLB) {#convert-to-glb}

新しいプロジェクトではデフォルトで有効になっています。インポートされたモデルとアニメーションは、古い非推奨のJSON形式ではなく、GLBモデルとアニメーションアセットが作成されます。

### ヒエラルキーを含むモデルのインポート {#import-hierarchy}

[Convert to GLB](#convert-to-glb)オプションを使用している場合にのみ利用可能です。モデルファイルがインポートされると、エンティティとしてモデル全体のフルヒエラルキーを含むTemplateアセットが作成され、エディタで直接操作することができます。この機能についての詳細は、[こちら][3]を参照してください。

### メッシュ圧縮 (Mesh Compression) {#mesh-compression}

[Convert to GLB](#convert-to-glb)オプションを使用している場合にのみ利用可能です。このオプションを圧縮形式 (compression)に設定すると、モデルファイルのインポートや再インポート時にメッシュデータを自動的に圧縮します。これにより、ランタイムでの解凍コストが若干かかる代わりに、GLBファイルのサイズを劇的に削減することができます。

Draco圧縮を使用する場合は、プロジェクトにDraco WASMモジュールをインポートする必要があることに注意してください。インポートしてない場合には、モデルは読み込まれません。

<img loading="lazy" src="/img/user-manual/assets/import-pipeline/draco-import-button.png" width="480" />

### FBXフォルダの作成 (Create FBX Folder) {#create-fbx-folder}

モデルファイル（GLBやFBXなど）をインポートする際、エディターはインポートによって作成されるアセット（レンダリング、テンプレート、マテリアルなど）のためにフォルダを作成します。

もし現在のフォルダに既に同じ名前のモデル（ソース）ファイルまたはその名前と同じ名前のフォルダがある場合、新しいフォルダを作成する代わりに既存のアセットを上書きします。

## アニメーションインポート設定 (Animation Import Settings) {#animation-import-settings}

詳細については、[アニメーションセクション][4]を参照してください。

[2]: /user-manual/assets/preloading/
[3]: /user-manual/editor/assets/import-pipeline/import-hierarchy/
[4]: /user-manual/editor/assets/inspectors/animation/
