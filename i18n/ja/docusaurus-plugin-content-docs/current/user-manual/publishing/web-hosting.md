---
title: Webホスティング
description: "PlayCanvasのビルドを自分のサーバーや静的ホスティングサービスでホストする方法です。ローカルでのテスト、ホストの選び方、GitHub Pages、圧縮、キャッシュ、コンテンツタイプ、CDNからのアセット配信を扱います。"
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

ビルドは静的ファイルのフォルダーなので、どのWebサーバーや静的ホスティングサービスでも配信できます。サーバーで動くものは何もありません。ブラウザが`index.html`をダウンロードし、それがエンジン、コード、アセットを読み込みます。

ビルドの作り方は[ビルドを作る](index.md#making-a-build)を参照してください。Editorのプロジェクトなら、何も設定せずに使える[PlayCanvasホスティング](/user-manual/editor/publishing/playcanvas-hosting/)が最も手軽です。

## ビルドをローカルでテストする {#testing-a-build-locally}

ビルドの`index.html`をダブルクリックしてブラウザで開いても、ビルドは動きません。ブラウザは`file://` URLで開いたページが必要なファイルを読み込むのをブロックするので、代わりにローカルのWebサーバーからフォルダーを配信してください：

- **Viteのプロジェクト:** `npm run build`を実行してから、`npx vite preview`を実行します。create-playcanvasのプロジェクトでは、`npm start`が同じことをして、ビルドをブラウザで開きます。
- **任意のビルドフォルダー:** フォルダーで`npx serve`（[Node.js](https://nodejs.org/)が必要）か`python3 -m http.server`（[Python](https://www.python.org/)が必要）を実行し、表示されたアドレス（`http://localhost:3000`など）を開きます。

## ホストを選ぶ {#choosing-a-host}

静的ファイルを配信できるホストなら、どれでも使えます。たとえば：

- **静的ホスティングサービス:** [GitHub Pages](https://pages.github.com/)、[Netlify](https://www.netlify.com/)、[Cloudflare Pages](https://pages.cloudflare.com/)、[Vercel](https://vercel.com/)などは、アップロードしたフォルダーやGitリポジトリにプッシュしたフォルダーを公開します。圧縮とキャッシュが設定済みのコンテンツデリバリーネットワーク（CDN）から配信されます。
- **ゲームポータル:** [itch.io](itch-io.md)などは、ビルドのzipファイルを受け付けます。専用のページがあるプラットフォームは[公開](index.md#where-to-publish)に一覧があります。
- **自分のWebサーバー:** Apache、nginx、IISなどで、ほかの静的サイトと同じようにビルドを配信します。[サーバーを設定する](#configuring-your-server)を参照してください。

GitHub Pagesのプロジェクトサイトのように、ドメインのルートではなくサイトのサブフォルダーにビルドを置く場合は、ビルドが相対URLでファイルを読み込む必要があります。Editorのビルドとcreate-playcanvasのプロジェクトは、すでにそうなっています。ほかのViteのプロジェクトでは、Viteの[`base`](https://vite.dev/config/shared-options#base)オプションを`'./'`に設定してください。

### GitHub Pages {#github-pages}

GitHub Pagesは、既定でJekyllを使ってサイトをビルドし、名前がアンダースコアで始まるファイルを除外します。クラシックスクリプトを使うプロジェクトのEditorのビルドには、`__start__.js`のようなファイルが含まれるので、ビルドのルートに`.nojekyll`という名前の空のファイルを追加してください。Viteの[デプロイガイド](https://vite.dev/guide/static-deploy#github-pages)にあるように、GitHub Actionsのワークフローで公開する場合は、Jekyllは使われません。

## サーバーを設定する {#configuring-your-server}

静的ホスティングサービスでは、これらの設定は不要です。自分のサーバーでは、それぞれを確認してください。

### 圧縮 {#compression}

`.html`、`.js`、`.mjs`、`.css`、`.json`、`.wasm`ファイルに対して、gzipまたはBrotliの圧縮を有効にしてください。エンジンのコードとシーンファイルは大きなテキストファイルで、圧縮すると数分の一のサイズになるので、ほかのどの設定よりも重要です。画像、オーディオ、動画のファイルは、すでに圧縮されています。

### キャッシュ {#caching}

`index.html`のように、ビルドが変わっても名前が変わらないファイルがあります。これらのファイルには`Cache-Control: no-cache`ヘッダーを付けて、ブラウザが毎回新しいバージョンを確認するようにしてください。そうしないと、新しいビルドをアップロードした後も、プレイヤーに古いビルドが表示され続けることがあります。

Viteが`dist/assets/`に書き出すハッシュ付きのファイルのように、内容が変わると名前も変わるファイルは、長期間キャッシュできます。

### コンテンツタイプ {#content-types}

サーバーが各ファイルに正しい`Content-Type`ヘッダーを送ることを確認してください。ブラウザは、`text/javascript`以外のタイプで送られたJavaScriptモジュールの実行を拒否します。また、WebAssemblyをダウンロードしながらコンパイルするのは、`application/wasm`で送られたときだけです。ほとんどのサーバーは一般的なタイプを知っていますが、古いサーバーは`.mjs`、`.wasm`、`.glb`、`.ktx2`を知らないことがあります。

| 拡張子 | コンテンツタイプ |
| --- | --- |
| `.html` | `text/html` |
| `.js`、`.mjs` | `text/javascript` |
| `.css` | `text/css` |
| `.json` | `application/json` |
| `.wasm` | `application/wasm` |
| `.glb` | `model/gltf-binary` |
| `.gltf` | `model/gltf+json` |
| `.bin`、`.basis` | `application/octet-stream` |
| `.ktx2` | `image/ktx2` |
| `.png` | `image/png` |
| `.jpg`、`.jpeg` | `image/jpeg` |
| `.webp` | `image/webp` |
| `.mp3` | `audio/mpeg` |
| `.ogg` | `audio/ogg` |
| `.wav` | `audio/wav` |
| `.mp4` | `video/mp4` |
| `.webm` | `video/webm` |

## CDNからアセットを配信する {#serving-assets-from-a-cdn}

静的ホスティングサービスは、すでにビルド全体をCDNから配信しています。`index.html`を自分のサーバーから配信する場合でも、モデルやテクスチャのような大きなファイルはCDNやほかのサーバーから読み込めます：

1. フォルダー構造を保ったまま、ビルドのフォルダー全体をCDNにアップロードします。こうすると、アプリがそこで探すファイルがすべて揃います。
2. CDNでクロスオリジンリソース共有（CORS）を設定します。`https://example.com`のページから`https://cdn.example.com`のように別のオリジンのファイルを読み込めるのは、そのサーバーが`Access-Control-Allow-Origin`ヘッダーで許可した場合だけです。このヘッダーには、自分のサイトのオリジンか、すべてのサイトを許可する`*`を設定します。設定方法はCDNごとに違うので、[Amazon S3](https://docs.aws.amazon.com/AmazonS3/latest/userguide/cors.html)などのドキュメントを参照してください。
3. 以下のように、アセットの場所をアプリに伝えます。

<Tabs groupId="authoring-surface">
<TabItem value="editor" label="Editor">

Editorのビルドは、アセット、シーンファイル、ローディング画面のロゴを`ASSET_PREFIX`のアドレスから読み込みます。既定では空です：

- クラシックスクリプトでは、`__settings__.js`にあります：`window.ASSET_PREFIX = "";`
- ESMスクリプトでは、`js/index.mjs`の先頭近くにあります：`const ASSET_PREFIX="";`

これを、CDN上のビルドフォルダーのアドレスに設定します。`"https://cdn.example.com/my-game/"`のように、末尾は`/`にしてください。

</TabItem>
<TabItem value="engine" label="Engine">

アセットを読み込む前に、アセットレジストリの[`prefix`](https://api.playcanvas.com/engine/classes/AssetRegistry.html#prefix)を設定します：

```javascript
app.assets.prefix = 'https://cdn.example.com/my-game/';
```

エンジンは、相対URLのアセットとシーンすべての先頭にこのプレフィックスを付けます。絶対URLはそのまま読み込まれます。

</TabItem>
<TabItem value="react" label="React">

CDN上の絶対URLからアセットを読み込みます：

```tsx
const { asset } = useModel('https://cdn.example.com/my-game/level.glb');
```

</TabItem>
<TabItem value="web-components" label="Web Components">

CDN上の絶対URLからアセットを読み込みます：

```html
<pc-asset id="level" src="https://cdn.example.com/my-game/level.glb"></pc-asset>
```

</TabItem>
</Tabs>
