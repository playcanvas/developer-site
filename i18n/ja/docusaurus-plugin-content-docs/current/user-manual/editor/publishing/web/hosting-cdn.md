---
title: CDNを使用したホスティング
---

セルフホスティングでPlayCanvasアプリケーションをデプロイするとき、アプリケーションがロードするアセットの負荷から、アプリケーションが提供されている場所(index.html)を分ける必要がある場合が多いです。例えば、コンテンツ配信ネットワーク(CDN)はアセットがユーザーのコンピュータから地理的に近いサーバから配信されていることを確認するために使用されます。これによりアプリケーションは速くロードするようになります。このガイドでは、PlayCanvasアプリケーションを設定して、アセットに別の場所を使用する方法を説明します。

最初のステップは、[パブリッシュガイド](/user-manual/editor/publishing/web/self-hosting)の手順に従って、アプリケーションのウェブビルドをダウンロードすることです。その後、ダウンロードしたビルドの `index.html` と `__settings__.js` ファイルを変更することから始めます。

## 別の場所からアセットをサービング

最も簡単な変更は、別の場所からのすべてのアセットをロードすることです。これは`__settings__.js`の`ASSET_PREFIX`プロパティを設定して行います。

![settings.js](/img/user-manual/editor/publishing/web/cdn-settings-assets-prefix.png)

`ASSET_PREFIX`は、プリロード時とランタイム時の両方で、アセットのために作られるすべての要求(シーンを含む)の前に追加されます。たとえば、CDNアセットストアのルートフォルダに設定するべきます。上記の例では、以前は`files/123456/1/texture.jpg` のようなURLのアセットが`http://keepy-up-cdn.example.com/files/123456/1/texture.jpg` からロードされるようになりました。

## その他のURL

`index.html`によって直接参照されるファイルがいくつか残っています。具体的には、スタイルシート、PlayCanvasのjavascriptエンジン、アプリケーション`__settings__.json`、`__loading__.js`、 `__start__.js`アプリケーションスクリプトです。以下のようにindex.htmlを更新します。

![index.html](/img/user-manual/editor/publishing/web/cdn-index.png)

`__settings__.js`ファイル内でアプリケーション設定の`config.json`へのパスを変更する必要があります。

![settings.js](/img/user-manual/editor/publishing/web/cdn-settings-config-prefix.png)

## CDNにファイルをコピー

次に、サーバー上の新しい場所に必要なファイルを全てコピーする必要があります。これらのファイルは、 `ASSET_PREFIX`を使用してロードします。

`__game_scripts.js`, シーン json (e.g. `123456.json`), `config.json`,アセット (`files` フォルダの中の全て), デフォルトの画面ロゴの`logo.png`。

そしてこれらのファイルはindex.html:

- `playcanvas-stable.min.js`,
- `manifest.json`
- `__settings__.js`
- `__loading__.js`
- `__start__.js`
- `styles.css`

![CDN files](/img/user-manual/editor/publishing/web/cdn-files.png)

これらのファイルを全てCDNホスティングサービスにコピーするべきです。

## CORSの設定

これでアプリケーションが別のサーバーからファイルをロードすることが可能になりました。最後のステップは、サーバーが正しくクロスオリジンリソース・シェアリング(CORS)ヘッダをサーブできるように正しく設定されていることを確認することです。CORSはブラウザのセキュリティ機能です。デフォルトでは`http://example.com` 上のWebページを、`http://keepy-up-cdn.example.com/` 上のWebページからファイルをダウンロードできないことを意味します。二つの起源が異なるためです。これを回避するためにはサーバを`http://keepy-up-cdn.example.com/`  に設定して、他のページによるコンテンツのダウンロードを許可するようブラウザに指示するCORSヘッダを提供する必要があります。

CORSの設定は、使用するCDNまたはサーバによって異なります。CORSヘッダーの設定方法を確認するにはサーバまたはCDNプロバイダのマニュアルを確認する必要があります。例えば、Amazon Web Services CORSの設定のページは[こちら](https://docs.aws.amazon.com/AmazonS3/latest/userguide/cors.html)です。
