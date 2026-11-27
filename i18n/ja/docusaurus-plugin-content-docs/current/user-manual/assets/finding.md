---
title: アセットの入手先
description: PlayCanvas プロジェクトで使える 3D モデル、テクスチャ、スカイボックス、効果音、音楽の無料および有料の入手先と、使う前に確認すべきことです。
---

アセットをすべて自分で作る必要はありません。このページでは、3D モデル、テクスチャ、スカイボックス、効果音、音楽の入手先と、プロジェクトに追加する前に確認すべきことを紹介します。

## Editor の中で {#in-the-editor}

Editor の [Asset Store](/user-manual/editor/assets/asset-store/) を使うと、ダウンロードやアップロードをせずに、アセットを直接プロジェクトにインポートできます。ライブラリは 2 つあります。

- **PlayCanvas**：PlayCanvas チームとパートナーのクリエイターが選んだ 3D モデル、フォント、スクリプト、スカイボックス、テンプレート、テクスチャ。
- **[Sketchfab](/user-manual/editor/assets/asset-store/sketchfab/)**：Sketchfab コミュニティによる数千点の無料 3D モデル。

まずはここから探しましょう。Asset Store に必要なものがなければ、以下のサイトを試してください。

## ダウンロードする前に {#before-you-download}

他のサイトのアセットを使う前に、次の 3 点を確認してください。

### ライセンス {#the-license}

このページのどのサイトも、アセットの使用条件を明記しています。アセットごとにライセンスが異なるサイトも多くあります。よく見かける [Creative Commons](https://creativecommons.org/cc-licenses/) ライセンスと用語は次のとおりです。

| ライセンス | 意味 |
| ---------- | ---- |
| CC0（パブリックドメイン） | どんな用途にも使え、クレジット表記も不要です。 |
| CC BY | どんな用途にも使えますが、アプリ内で作者のクレジットを表記します。 |
| CC BY-NC | 作者のクレジットを表記し、商用プロジェクトには使いません。 |
| ロイヤリティフリー | 一度購入すれば（または無料で入手すれば）、追加料金なしでプロジェクトに使えます。制限は販売者のライセンスによります。 |

各アセットの入手元とライセンスを記録しておくと、作者のクレジットを表記したり、後で質問に答えたりするときに役立ちます。

### フォーマット {#the-format}

3D モデルには GLB が最適なフォーマットです。Editor は FBX、OBJ、COLLADA（`.dae`）ファイルもインポートし、GLB に変換します。Blender（`.blend`）ファイルしか提供していないサイトもあり、その場合は先に [Blender からエクスポート](/user-manual/assets/models/exporting/)する必要があります。テクスチャやオーディオを含む一覧は、[サポートされているフォーマット](/user-manual/assets/supported-formats/)を参照してください。

### サイズ {#the-size}

ユーザーは、アセットを見る前にすべてダウンロードします。映画やオフラインレンダリング向けのモデルには、数百万のポリゴンと 8K テクスチャを持つものもあります。多くのサイトではテクスチャの解像度を選べます。Web では、たいてい 1K か 2K で十分です。詳しくは [ロード時間の最適化](/user-manual/optimization/load-time/)を参照してください。

## 3D モデル {#3d-models}

| サイト | 内容 | 料金とライセンス |
| ------ | ---- | ---------------- |
| [BlendSwap](https://blendswap.com/) | コミュニティによるモデルとシーン。ほとんどが Blender ファイル | 無料。モデルごとに Creative Commons ライセンスが異なります |
| [CGTrader](https://www.cgtrader.com/) | 大規模なモデルのマーケットプレイス | 無料と有料。フォーマットは商品によって異なります |
| [Fab](https://www.fab.com/) | Epic Games のマーケットプレイス。Fab Standard License は Unreal に限らず、どのエンジンでの使用も認めています | 無料と有料。フォーマットは商品によって異なります |
| [KayKit](https://kaylousberg.com/game-assets) | Kay Lousberg によるローポリのパック。FBX、glTF、OBJ 形式 | 無料版は CC0。有料版はモデルが追加されます |
| [Mixamo](https://www.mixamo.com/) | リグ付きの人型キャラクターと、そのためのアニメーションのライブラリ。FBX でダウンロードします。自分の人型モデルにリグを付けることもできます | Adobe アカウントがあれば無料、ロイヤリティフリー |
| [Poly Haven](https://polyhaven.com/models) | リアルな小物、家具、植物。glTF、FBX、Blender 形式 | 無料、CC0 |
| [Quaternius](https://quaternius.com/) | ローポリのキャラクター、動物、環境のパック | 無料、クレジット表記不要。CC0 または作者独自のライセンス（再販のみ禁止） |
| [Sketchfab](https://sketchfab.com/features/download) | コミュニティによる膨大なモデルのライブラリ。多くは glTF でダウンロードできます | 無料。モデルごとに Creative Commons ライセンスが異なります |
| [TurboSquid](https://www.turbosquid.com/) | 大規模なモデルのマーケットプレイス。ほとんどが有料 | ほとんどが有料。フォーマットは商品によって異なります |

[Sloyd](https://www.sloyd.ai/) を使えば、テキストのプロンプトや参考画像からモデルを生成することもできます。生成したモデルは GLB ファイルで書き出せます。無料プランは個人利用のみで、商用利用には有料プランが必要です。

## テクスチャとスカイボックス {#textures-and-skyboxes}

| サイト | 内容 | 料金とライセンス |
| ------ | ---- | ---------------- |
| [ambientCG](https://ambientcg.com/) | PBR マテリアルと HDRI | 無料、CC0 |
| [Poly Haven](https://polyhaven.com/) | 物理ベースレンダリング（PBR）用のテクスチャと、スカイボックスやライティング用のハイダイナミックレンジ画像（HDRI） | 無料、CC0 |

HDRI は通常、1 枚の正距円筒図法（パノラマ）画像として提供されます。スカイボックスやライティングに使うには、[キューブマップに変換](/user-manual/editor/assets/inspectors/cubemap/)してください。エンジンでの使われ方は [イメージベースドライティング](/user-manual/graphics/physical-rendering/image-based-lighting/)を参照してください。

## 2D アート {#2d-art}

| サイト | 内容 | 料金とライセンス |
| ------ | ---- | ---------------- |
| [Game Dev Market](https://www.gamedevmarket.net?ally=O0I9alFp) | ゲーム向けのアート、ユーザーインターフェイス（UI）、3D、オーディオのパック | ほとんどが有料、ロイヤリティフリー |
| [itch.io](https://itch.io/game-assets) | インディーアーティストによるパック。無料のものも多数 | 無料と有料。パックごとにライセンスを確認してください |
| [OpenGameArt](https://opengameart.org/) | コミュニティが投稿したあらゆる種類のアート | 無料。アセットごとにライセンスが異なります |

## 効果音 {#sound-effects}

| サイト | 内容 | 料金とライセンス |
| ------ | ---- | ---------------- |
| [Freesound](https://freesound.org/) | コミュニティによる膨大なサウンドと録音のライブラリ | 無料。サウンドごとに CC0、CC BY、CC BY-NC のいずれか |
| [OpenGameArt](https://opengameart.org/) | コミュニティが投稿した効果音 | 無料。アセットごとにライセンスが異なります |
| [PlayOnLoop](https://www.playonloop.com/) | ゲームや動画向けの効果音 | 無料、CC BY |
| [Sonniss GameAudioGDC](https://sonniss.com/gameaudiogdc/) | Sonniss が Game Developers Conference に合わせて無料で公開しているバンドルの、数十 GB に及ぶプロ品質の効果音 | 無料、ロイヤリティフリー、クレジット表記不要 |

[Bfxr](https://www.bfxr.net/) や [jsfxr](https://sfxr.me/) を使えば、ブラウザでレトロゲーム風のサウンドを作ることもできます。

## 音楽 {#music}

| サイト | 内容 | 料金とライセンス |
| ------ | ---- | ---------------- |
| [Incompetech](https://incompetech.com/) | Kevin MacLeod による多彩なスタイルの大規模な音楽ライブラリ | CC BY で無料。クレジットを表記したくない場合は有料 |
| [itch.io](https://itch.io/game-assets/tag-music) | インディー作曲家による音楽パック | 無料と有料。パックごとにライセンスを確認してください |
| [OpenGameArt](https://opengameart.org/) | コミュニティが投稿した音楽 | 無料。アセットごとにライセンスが異なります |
| [PlayOnLoop](https://www.playonloop.com/) | 継ぎ目なくループする音楽 | 有料、ロイヤリティフリー。短いバージョンは CC BY で無料 |

## Gaussian Splat {#gaussian-splats}

[SuperSplat](https://superspl.at/) は、Gaussian Splat を公開・共有するための PlayCanvas のサイトです。多くのクリエイターが、Creative Commons ライセンスでスプラットのダウンロードを許可しています。[ダウンロード可能なスプラットを検索](https://superspl.at/search?features=downloadable)するか、ホームページの **Free Downloads** コレクションを開いてください。スプラットの [Download ダイアログ](/user-manual/supersplat/viewing/scene-page/#download-dialog)にはライセンスが表示され、クレジット表記用のテキストをコピーできます。

写真や動画から自分でスプラットを作成するには、[推奨ツール](/user-manual/gaussian-splatting/creating/recommended-tools/)を参照してください。

## サイトを提案する {#suggest-a-site}

ここに載っていない良い入手先をご存じですか？ [フォーラム](https://forum.playcanvas.com/)で提案するか、[GitHub](https://github.com/playcanvas/developer-site) でプルリクエストを作成してください。
