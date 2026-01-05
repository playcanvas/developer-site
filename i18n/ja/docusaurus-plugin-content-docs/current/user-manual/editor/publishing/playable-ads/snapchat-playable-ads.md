---
title: Snapchatプレイアブル広告
---

PlayCanvasは、[公式の外部ツール](https://github.com/playcanvas/playcanvas-rest-api-tools#converting-a-project-into-a-single-html-file)を通じて、Snapchat Playable Adフォーマットと要件をサポートしています。

SnapchatのPlayable Adでは、[MRAID 2.0 API](https://www.iab.com/guidelines/mraid/)標準が使用され、広告用のアセットは`index.html`に埋め込むのではなく、外部に置く必要があります。

外部アセットは、唯一の名前が付けられたフォルダに置かれる必要があります(このツールが対応しているため)。このため、SnapchatのCDNサーバーにアップロードされます。

このツールには[GitHub](https://github.com/playcanvas/playcanvas-rest-api-tools#converting-a-project-into-a-single-html-file)のドキュメントにあるいくつかの制限があるため、注意してください。

## サンプルプロジェクト

[Cube Jumpプロジェクト](https://playcanvas.com/project/796932/overview/cube-jump-snapchat-ad)は、Snapchat Playable Adフォーマットにエクスポートできる状態になっており、期待されるHTML出力は[こちら](pathname:///downloads/sc-playable-ad-cube-jump.zip)からダウンロードできます。

<div className="iframe-container">
    <iframe src="https://playcanv.as/e/p/X1nwbUGA/" title="Cube Jump Playable Ad" allow="camera; microphone; xr-spatial-tracking; fullscreen" allowfullscreen></iframe>
</div>

## ファイルサイズの補足

5MB(未圧縮)までのソフトリミットがあるため、広告用のアセットの使用を計画し、予算編成する必要があります。

圧縮されていない最小化されたPlayCanvas Engineのコードは、 **\~1.2MB** であり、アセットファイルをBase64文字列にエンコードする必要があるため、各アセットファイルのサイズに対して約 **\~30%**  追加されます。

これは、Base64エンコード前にアセットに約~3MBの余裕があることを意味します。

画像をできるだけ小さく保ち、[TinyPNG](https://tinypng.com/)のようなツールを使用してさらにファイルサイズを縮小するようにしましょう。

## Playable Ad のチェックリスト

Snapchatの広告ネットワークは、ユーザーに提供するときに独自のトラッキングバージョンに置き換えることができる`index.html`内のコールトゥアクション関数が必要です。URLはSnapchat Ad campaignツールで設定されます。

このツールは、グローバル関数`snapchatCta();`でこのロジックをラップし、playable adプロジェクトで呼び出す必要があります。

* コールトゥアクションのコールバックに`snapchatCta();`という関数を呼び出しましたか?

## エクスポートの方法

GitHubリポジトリのREADMEにある[セットアップ手順](https://github.com/playcanvas/playcanvas-rest-api-tools#setup)に従ってください。

### ドライランテスト

Snapchatにはまだ公式のテストツールがありませんので、Snapchat広告ネットワークが期待する形式にエクスポートする前に、まずドライランテストを行う必要があります。

`config.json`の以下のオプションを設定すると、ZIPファイルが生成されます。ZIPファイルには、`index.html`からアセットデータとPlayCanvas Engineコードが別々のファイルとして含まれます。

```json
    "one_page": {
        "patch_xhr_out": false,
        "inline_game_scripts": true,
        "extern_files": {
            "enabled": true,
            "folder_name": "78fb9255-3033-4fe2-b9e1-355b149229a1",
            "external_url_prefix": ""
        },
        "mraid_support": true,
        "snapchat_cta": true
    }
```

`folder_name`はユニークな文字列でなければなりません。この目的のため、[GUIDジェネレータ](https://www.guidgenerator.com/)からランダムなGUIDを使用するか、Snapchatの代表者から使用する必要がある特定の文字列を受け取る必要があります。

そして、以下のコマンドを実行します。

```sh
npm run one-page
```

詳細なオプションとコマンドの詳細は、'[プロジェクトを単一のHTMLファイルに変換する](https://github.com/playcanvas/playcanvas-rest-api-tools#converting-a-project-into-a-single-html-file)'のReadmeセクションで確認できます。

デバイス上で広告をテストするには、Androidアプリ[Creative Preview](https://play.google.com/store/apps/details?id=com.google.android.apps.audition&hl=en_GB&gl=US)を使用しますが、広告をhttpsサーバーにホストする必要があります。

私たちのお勧めの方法は、[ローカルホスト](/user-manual/editor/publishing/web/self-hosting/#running-a-downloaded-build)をホストし、アプリがアクセスできるように[ngrok](https://ngrok.com/)を使用することです。

<img loading="lazy" src="/img/user-manual/editor/publishing/playable-ads/snapchat-playable-ads/ngrok.png" width="600" />

これが設定されたら、Creative Previewアプリを開き、以下の設定で新しい「Display」広告を作成します。

<img loading="lazy" src="/img/user-manual/editor/publishing/playable-ads/snapchat-playable-ads/creative-preview.png" width="300" />

### Snapchatへのエクスポート

広告をSnapchatにアップロードする準備ができたら、`index.html`内のアセット参照に、SnapchatのCDN URLプレフィックスを追加する必要があります。これは`config.json`のオプションを通じて、`external_url_prefix`プロパティを使用して行うことができます。

```json
    "one_page": {
        "patch_xhr_out": false,
        "inline_game_scripts": true,
        "extern_files": {
            "enabled": true,
            "folder_name": "78fb9255-3033-4fe2-b9e1-355b149229a1",
            "external_url_prefix": "https://rtb-ads.shadow.snapads.com/html5"
        },
        "mraid_support": true,
        "snapchat_cta": true
    }
```

その後、ZIPファイルをSnapchatの代表に渡して、広告ネットワークにアップロードすることができます。
