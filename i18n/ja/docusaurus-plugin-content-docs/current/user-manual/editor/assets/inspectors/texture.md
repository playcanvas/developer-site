---
title: Texture
---

テクスチャとは、[マテリアル][1]に割り当てられ、グラフィカルなプリミティブに適用される画像のことです。

## テクスチャのインポート

PlayCanvasにTextureアセットをインポートする方法は3つあります。

1. 画像をアセットパネルにドラッグアンドドロップする。
2. アセットパネルのコンテキストメニューから「アップロード」を選び、ファイルブラウザを使って画像を選択する。
3. テクスチャが埋め込まれたFBXファイルをインポートする。

対応している画像フォーマットは以下の通りです。

* JPG
* PNG
* AVIF
* WEBP
* GIF
* TGA
* BMP
* TIF
* HDR
* EXR

Imported JPG, PNG, AVIF, WebP and GIF files remain in their original format.

GIF、TGA、BMP、TIF画像タイプは、インポート時にJPGまたはPNGに変換されます。インポートされた画像に透過度がある場合は、PNGに、そうでない場合はJPGに変換されます。

HDRおよびEXRは[高ダイナミックレンジフォーマット][2]です。これらのタイプの画像は、PNGに変換され、RGBM形式で格納されるとマークされます。RGBMは、PNGのアルファチャンネルにRGB値の乗数を格納し、HDR形式を低ダイナミックレンジ形式に圧縮することができます。

デフォルトでは、インポートされる画像は2のべき乗に最も近いサイズにリサイズされます。たとえば、323x414の画像は、インポート時に256x512にリサイズされます。これは、グラフィックスエンジンが、2のべき乗でないテクスチャのミップマッピングを利用できないためです。ただし、これは、アセットタスクパネルで'テクスチャPOT'設定を無効にして、2のべき乗でないテクスチャをインポートする前にオーバーライドできます。

## テクスチャプロパティ

アセットパネルでテクスチャのサムネイルを選択すると、インスペクタパネルに読み込まれます。複数のテクスチャを選択して、インスペクタで全体の選択を編集することもできます。

テクスチャは、標準的なアセットプロパティ(ID、名前、タグなど)を共有しますが、テクスチャ固有のプロパティもあります。

![Texture Properties](/img/user-manual/assets/textures/texture-properties.png)

### テクスチャのフィルタリング (Texture Filtering)

テクスチャフィルタリングは、テクスチャマッピングされたピクセルの色がどのように計算されるかを制御する機能です。'Point'はフィルタリングを適用せず、'Linear'はテクセルの色を周囲のピクセルと補間します。これにより、特にテクスチャが最小化された場合（テクスチャのテクセル数よりも画面上のピクセルが少ない場合）に、より良い視覚的な結果が得られます。

### 異方性 (Anisotropy)

テクスチャが斜めの角度で表面上に表示される場合、品質が低下し、ぼやけたように見えることがあります。この問題を解決するために、Anisotropyの値を設定することができます。異なるAnisotropyの値がテクスチャの外観にどのような影響を与えるかを見てみましょう。

![Anisotropy](/img/user-manual/assets/textures/anisotropy.png)

Anisotropyが増加するにつれて、GPUでテクスチャをサンプリングするコストも増加します。

### テクスチャアドレス

テクスチャアドレスプロパティを使用すると、テクスチャ座標が範囲0から1以外の値でサンプリングされる方法を制御できます。さまざまなモードがスプライトにどのように影響するかを以下に示します。

![Addressing](/img/user-manual/assets/textures/texture-address.png)

## 最大テクスチャサイズ

異なるデバイスは異なるテクスチャサイズをサポートしています。デバイスとブラウザの[WebGL report][7] を使用して、サポートされる最大サイズを確認できます。

たとえば、2020年のMacBook Pro 16インチの場合、Chromeで最大16384x16384までサポートされていることがわかります。

<img loading="lazy" src="/img/user-manual/assets/textures/mac-webgl-report.png" alt="Macbook Pro WebGL report" width="600" />

一方、Samsung S7モバイルデバイスでは、4096x4096のみサポートされています。

<img loading="lazy" src="/img/user-manual/assets/textures/samsung-s7-webgl-report.jpg" alt="Samsung S7 WebGL report" width="600" />

エンジンがWebGLによって報告される最大テクスチャサイズを超えるテクスチャを使用しようとした場合、実行時にこの最大サイズに縮小されます。これは、画像（PNG, JPG, AVIF, WebP, GIF）からロードされたテクスチャに対してのみ行われることに注意してください。圧縮されたテクスチャは実行時にサイズ変更できず、デバイスにとって大きすぎる場合は、単にレンダリングに失敗します。

実行時にサイズを縮小しない場合は、2020年10月23日現在、4096x4096が非常に広範にサポートされていますし、一般的には2048x2048がどこでも動作保証されています。

[1]: /user-manual/editor/assets/inspectors/material
[2]: https://en.wikipedia.org/wiki/High-dynamic-range_imaging
[7]: https://webglreport.com/
