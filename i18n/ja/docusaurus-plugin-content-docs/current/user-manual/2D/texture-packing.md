---
title: テクスチャパッキング
---

## テクスチャパッキングとは

スプライトやUI画像を別々のイメージとしてバンドルすることは一般的です。テクスチャパッキングはこれらの別々の画像を[テクスチャアトラス][texture-atlas]に統合することです。

これには以下の利点があります。

- 多数のネットワークリクエストではなく、単一のネットワークリクエストで高速なロードが可能。
- 1つのテクスチャなので、スプライトを単一の描画コールにバッチングできます。

## ツール

PlayCanvasと互換性のあるいくつかのテクスチャパッキングツールを紹介します。

### TexturePacker Online (無料)

([ウェブサイト][texture-packer-online])

TexturePacker Onlineはブラウザで動作する無料のツールで、テクスチャパッキングの基本機能を実行できます。

![](/img/user-manual/2D/texture-packer/texture-packer-online-steps.png)

1. テクスチャアトラスをクリアします。
2. スプライト/UIイメージを追加します。
3. 出力形式はJSON hashのままにします。
4. テクスチャアトラスの.pngをダウンロードします。
5. フレームデータの.jsonをダウンロードします。

### Texture Packer ツール

([ウェブサイト][texture-packer-tool])

TexturePackerはダウンロードできる有料ツールで、テクスチャアトラス作成に多くの機能とオプションがあります。スプライト/UI画像のレイアウトについてのより多くの制御機能や[9スライス][9-slicing]を設定することができます。

![](/img/user-manual/2D/texture-packer/texture-packer-tool-steps.png)

基本的な手順:

1. スプライト/UIイメージを追加します。
2. 出力ファイル -> PlayCanvasを設定します。
3. スプライトシートを発行するをクリックして、テクスチャアトラスとJSONフレームデータを作成します。

## スプライトエディタ内でのフレーム作成

テクスチャアトラスファイルをエディタにアップロードして、[Texture Atlasアセット][texture-atlas]を作成したら、スプライトエディタを開きます。

![](/img/user-manual/2D/texture-packer/playcanvas-sprite-editor.png)

'Upload Texture Packer JSON'をクリックし、JSONフレームデータファイルを選択してアップロードします。

これにより、Spriteアセットを作成できるテクスチャアトラスのフレームが作成されます。

開発中にテクスチャアトラスを更新する場合、スプライトのファイル名とフレーム名が同じであれば、新しいフレームデータをアップロードする際に以下が実行されます。

- アトラスから削除されたスプライトは、そのフレームが削除されます。
- アトラスに追加されたスプライトは、リストの末尾に新しいフレームが追加されます。
- 既存のスプライトは、そのフレームが更新されます。

[texture-atlas]: /user-manual/editor/assets/inspectors/texture-atlas/
[texture-packer-online]: https://www.codeandweb.com/tp-online
[texture-packer-tool]: https://www.codeandweb.com/texturepacker
[9-slicing]: /user-manual/2D/slicing/
