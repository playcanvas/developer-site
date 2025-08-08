---
title: テクスチャ圧縮
---

テクスチャデータは、デバイスのビデオメモリ(またはVRAM)に格納されます。ブラウザタブのクラッシュなど、望ましくないことが発生しないように、アプリケーションが VRAM を使い果たさないようにすることが重要です。

エディタには、テクスチャに対して Basis を使用して、損失がある圧縮スキームを適用して VRAM 使用量を劇的に減らす機能があります。

[Basis][1] は「超圧縮」されたテクスチャフォーマットです。これは、ランタイムでネイティブにサポートされているハードウェア圧縮フォーマットに変換できる、プラットフォーム非依存の損失のあるブロック圧縮フォーマットです。対応するトランスコードフォーマットは、可能な場合は ASTC、DXT、ETC2、ETC、PVR、ATC の順で選択されます。

次のようなTextureアセットがあるとします。

<img loading="lazy" src="/img/user-manual/assets/textures/texture-compression/brick.jpg" alt="Brick Texture" width="256" height="256" />

これは512x512のJPGでサイズは202KBです。しかし、JPGは圧縮された形式であり、グラフィックエンジンに渡されると解凍されたRGB8形式に拡張され、ミップマップレベルを含めると1.05MBのVRAMを占有します。

テクスチャ圧縮を有効にすると、以下のような結果が得られます。

<img loading="lazy" src="/img/user-manual/assets/textures/texture-compression/compression-results.png" alt="Basis Compression results" width="400" />

圧縮により、VRAMの使用量が6分の1に減少しました。さらに、この場合、圧縮によりダウンロードサイズが202KBからDefault品質設定とETCモードを使用して最小46KBまで減少しました。

以下に、MacのChromeでのレンガテクスチャの並べて比較を示します。

<a href="/img/user-manual/assets/textures/texture-compression/basis-vs-no-compression-brick.png" target="_blank"><img loading="lazy" src="/img/user-manual/assets/textures/texture-compression/basis-vs-no-compression-brick-thumb.jpg" alt="Brick texture compression comparison" /></a>

以下は、MacとChromeで PlayCanvas のキューブを Basis [ETCモード][2] で比較したものと、[圧縮していないもの][3]です。

<a href="/img/user-manual/assets/textures/texture-compression/basis-vs-no-compression-cube.png" target="_blank"><img loading="lazy" src="/img/user-manual/assets/textures/texture-compression/basis-vs-no-compression-cube-thumb.jpg" alt="PlayCanvas cube compression comparison" /></a>

## Basis テクスチャ圧縮の使用 {#using-basis-texture-compression}

テクスチャをエディタにインポートしたら、そのテクスチャを選択し、インスペクタを下にスクロールして、Compression セクションを見つけます。

1. BASIS をチェックします。
2. Import Basis をクリックして、プロジェクトに Basis ランタイムのWASMモジュールを追加します(これは1回だけ行う必要があります)。
3. このテクスチャで圧縮アーティファクトを減らす必要がある場合は、モードを 'ETC (smaller size, lower quality)' から 'ASTC (larger size, higher quality)' に変更します。
4. Normal Map を圧縮する場合は、Normals をチェックします。
5. ファイルサイズと品質のバランスを取るために、品質設定を変更します。品質を下げると、より小さなファイルサイズになります。
6. Compress Basis をクリックします。

<img loading="lazy" src="/img/user-manual/assets/textures/texture-compression/enable-basis-texture-compression.gif" alt="Enabling Basis Texture Compression" width="400" />

BasisのWASMモジュールは、プリロードダウンロードサイズに追加で253KBのgzip圧縮データを追加しますが、それはレガシーのテクスチャ圧縮フォーマットのファイルを使用する場合と比較してテクスチャサイズの節約によって相殺されるはずです（[下記参照][4]）。

テクスチャから Basis 圧縮を削除する方法は次のとおりです。

1. BASIS のチェックを外します。
2. Compress Basis をクリックします。

<img loading="lazy" src="/img/user-manual/assets/textures/texture-compression/disable-basis-texture-compression.gif" alt="Disabling Basis Texture Compression" width="400" />

もう Basis を使用しない場合は、すべてのテクスチャから Basis 圧縮を削除し、プロジェクトから Basis フォルダを削除してください。

<img loading="lazy" src="/img/user-manual/assets/textures/texture-compression/delete-basis-library.png" alt="Delete Basis Module" width="400" />

## Basis の制限 {#basis-limitations}

PlayCanvas で Basis テクスチャ圧縮には、次の制限があります。

1. PVR 形式は、幅と高さが同じ正方形で、2の累乗である(256、512、1024など)テクスチャのみサポートしています。旧型のiOSデバイス（iPhone 5や5CのようなA6 SoC以下のもの）や古いiOSバージョン（13.7以下）はPVRのみをサポートしています。正方形でない、または2の冪でないBasisテクスチャはPVRフォーマットにトランスコードできませんが、代わりに16ビット565ピクセルフォーマットを使用します。それでも正しく表示されますが、VRAMをより多く占める可能性があります。
2. Basis圧縮でサポートされるテクスチャの最大寸法は4096x4096です。これより大きなテクスチャは圧縮に過度な時間を要するため、これは無効化されます。

## 旧来のテクスチャ圧縮 {#legacy-texture-compression}

可能な場合はBasis圧縮を強く推奨します。これはすべてのプラットフォームをカバーするための単一のテクスチャファイルを必要とし、またレガシーフォーマットと比較してファイルサイズもはるかに小さいからです。私たちのテストでは、Basisは品質の違いがほとんどないまま、約 ~50％小さくなることを示しています。

旧来のテクスチャ圧縮フォーマットは次の通りです。

* DXT:通常、デスクトップデバイスでサポートされています。
* PVR:通常、iOS デバイスでサポートされています。
* ETC:通常、Android デバイスでサポートされています。

Legacy Texture Compression オプションを使用するには、テクスチャを選択して、インスペクタで圧縮セクションまでスクロールします。

1. LEGACY をチェックします。
2. 使いたいすべてのフォーマットをチェックします。
3. Compress Legacy をクリックします。

<img loading="lazy" src="/img/user-manual/assets/textures/texture-compression/enable-legacy-texture-compression.gif" alt="Enabling Legacy Texture Compression" width="400" />

フォーマットを1つまたは複数削除するには:

1. 削除したいすべてのフォーマットのチェックを外します。
2. Compress Legacy をクリックします。

<img loading="lazy" src="/img/user-manual/assets/textures/texture-compression/disable-legacy-texture-compression.gif" alt="Disabling Legacy Texture Compression" width="400" />

## Legacy テクスチャ圧縮から Basis テクスチャ圧縮への移行 {#migrating-from-legacy-to-basis-texture-compression}

既に Legacy Texture Compression フォーマットを使用しているプロジェクトを Basis を使うようにしたい場合は、次の手順を実行します。

1. すべての Legacy テクスチャフォーマットを削除します。
2. Basis を有効にして使用します。

<img loading="lazy" src="/img/user-manual/assets/textures/texture-compression/migrate-legacy-to-basis.gif" alt="Migrate from Legacy to Basis" width="400" />

[1]: https://github.com/BinomialLLC/basis_universal
[2]: https://playcanv.as/p/j8rsh3eO/
[3]: https://playcanv.as/p/nAW3WkW8/
[4]: #legacy-texture-compression
