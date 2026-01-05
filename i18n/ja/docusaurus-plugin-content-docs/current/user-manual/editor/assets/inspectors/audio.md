---
title: Audio
---

Audioアセットは、[Sound Component](/user-manual/editor/scenes/components/sound/)を使用して再生できる音声ファイルです。

Webブラウザでサポートされているすべてのオーディオ形式は、PlayCanvasでサポートされています。インポート時にオーディオファイルに対して処理は行われません。

MP3、AAC、Ogg Vorbis、WAVなどの一般的な形式は、すべてのモダンブラウザでサポートされています。

:::tip
MP3は圧縮率が高く、[互換性も優れている](https://caniuse.com/mp3)ため推奨されます。
:::

## Inspector

![Audio Asset Inspector](/img/user-manual/editor/assets/inspectors/asset-inspector-audio.png)

Audio アセットインスペクターは、オーディオ情報を表示し、サウンドをプレビューするための再生コントロールを提供します。

## Properties

| Property | Description |
|----------|-------------|
| Duration | オーディオファイルの長さ（秒単位、読み取り専用）。 |

インスペクターには、オーディオをプレビューするための再生コントロール（再生/一時停止ボタンとタイムライン）も含まれています。

:::tip
スクリプトでこのアセットを使用するには、[Asset Attributes](/user-manual/scripting/script-attributes/esm/#asset-attribute)を参照してください。
:::
