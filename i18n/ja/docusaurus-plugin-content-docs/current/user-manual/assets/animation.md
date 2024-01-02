---
title: Animation
layout: usermanual-page.hbs
sidebar_position: 4
---

Animationアセットは、3Dモデルで単一のアニメーションを再生するために使用されます。アニメーションは、アニメーションデータを含む3Dシーン(FBXファイルなど)をアップロードすることによってインポートされます。アニメーションデータは、[アセットパイプライン][asset_pipeline]によってアップロードされたファイルから抽出され、ゲームで使用するための[ターゲットアセット][target_asset]が作成されます。

## アニメーションプレビュー

インスペクタには、テンプレートまたはModelアセットとともにアニメーションをプレビューするために使用できるビューアがあります。これは、異なるキャラクターリグに適用できる単一のアニメーションがある場合に便利です。

![Asset Inspector Preview][inspector-preview-gif]

また、グラフで状態を選択すると、[Anim State Graph Editor][anim-state-graph-editor]にもビューアがあります。選択すると、グラフを使用しているシーン内のすべてのエンティティが一覧表示され、プレビューのために選択できます。

![Anim State Graph Preview][anim-state-graph-preview-gif]


## アニメーションインポート設定

<div class="alert alert-info">
注意:これは実験的な機能です。ご意見を<a href="https://forum.playcanvas.com/" target="_blank">フォーラム</a>でお知らせください。
</div>

アニメーションをインポートする際には、ファイルサイズに対してアニメーション品質を調整するために微調整できる設定があります。

これらは、プロジェクト設定のAsset Tasksの下で見つけることができます。

![Animation Import Settings][animation_import_settings]

### 命名基準 (Naming Strategy)

アニメーションをインポートする際に、生成されるアセットの名前は、アニメーションファイルの 'Take Name' から設定するか、代わりにアニメーションのファイル名を使用することができます。このオプションは、GLBエクスポート形式のみで利用可能です。
 

これは、[Mixamo][mixamo]などのストアから取得されるアセットに便利です。Mixamoでは、すべてのテイク名が 'mixamo.com' となっており、ファイル名をアセット名として使用する方が明確です。

### サンプルレート (Sample rate)

JSONおよびGLBエクスポート形式の両方で利用可能です。レートが高いほど、サイズの代償としてアニメーションの詳細度と忠実度が高くなります。元のアニメーションで設定されているキーフレームを保持したい場合は、無効に設定してください。

### カーブの許容度 (Curve tolerance)

JSONおよびGLBエクスポート形式の両方で利用可能です。Curve Toleranceは、アニメーションのインポート時のファイルサイズの削減を伴う損失圧縮を制御します。この設定により、ファイルサイズの節約がわずかまたはほとんど目立たない差異で行われるという考えです。

これは0から100の間の値で、数値が高いほどファイルサイズが小さくなりますが、その代わりにアニメーションの情報が失われます。0は圧縮なしを意味し、100は全ての情報が失われることを意味します。

1または2は良いスタートポイントとされています。

### キュービックカーブ (Cubic curves)

GLBエクスポート形式のみで利用可能です。このオプションを有効にすると、元のアニメーションのイージングをアニメーションカーブに保持することができます。ただし、これにより、キーフレームごとに追加情報が含まれ、ファイルサイズが増加します。

このオプションを有効にする場合、サンプルレートを無効にし、Curve Toleranceを0に設定することが推奨されます。

[asset_pipeline]: /user-manual/glossary#asset-pipeline
[target_asset]: /user-manual/glossary#target-asset
[animation_import_settings]: /images/user-manual/assets/animation/animation-import-settings.png
[mixamo]: https://www.mixamo.com/
[anim-state-graph-editor]: /user-manual/animation/anim-state-graph-assets/
[inspector-preview-gif]: /images/user-manual/assets/animation/inspector-preview.gif
[anim-state-graph-preview-gif]: /images/user-manual/assets/animation/anim-state-graph-preview.gif
