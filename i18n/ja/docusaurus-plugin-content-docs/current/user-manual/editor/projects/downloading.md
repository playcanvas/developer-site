---
title: プロジェクトのダウンロード
description: static形式とnpm形式のパッケージ構造を含め、セルフホスト用アプリのPlayCanvasプロジェクトダウンロード形式を説明します。
---

:::ai

- **[Editor MCP Server](/user-manual/ai/editor-mcp-server/):** static または npm のダウンロードビルドを作成し、完了を待って、明示したローカルパスへアーカイブを保存できます。

:::

PlayCanvasプロジェクトは、セルフホスト可能なアプリケーションパッケージとしてダウンロードできます。ダウンロードされたパッケージには、PlayCanvas Hostingの外でアプリを実行するために必要なファイルが含まれますが、完全な編集可能なプロジェクト履歴は含まれません。

PlayCanvasに再インポートできるプロジェクトバックアップについては、[バックアップとエクスポート](backup-and-export.md)を参照してください。

## ダウンロード形式 {#download-formats}

標準のセルフホスト用パッケージには`static`を使用します。ダウンロードしたファイルをWebサーバーやホスティングプロバイダーに直接アップロードする場合に適しています。

Viteベースのnpmプロジェクトには`npm`を使用します。ダウンロードしたアプリをローカルで扱い、Viteで実行したり、npmスクリプトで本番ビルドを作成したりする場合に適しています。

RESTの[Download app](/user-manual/api/app-download)エンドポイントでは、`format`パラメーターを使用して`static`または`npm`を選択します。

## staticプロジェクト構造 {#static-project-structure}

ダウンロード形式が`static`の場合、ダウンロードされるプロジェクトは、Webサーバーで直接ホストできる自己完結型のWebビルドです。展開したフォルダーはHTTPまたはHTTPSで配信してください。`file://` URLから`index.html`を開くことはサポートされません。

staticダウンロードも、元のプロジェクトに含まれるスクリプトの種類に応じて異なる構造になります。

### クラシックスクリプト {#static-projects-with-classic-scripts}

```text
index.html
playcanvas-stable.min.js
__settings__.js
__modules__.js
__start__.js
__loading__.js
config.json
{sceneId}.json
manifest.json
styles.css
logo.png
files/
  assets/
    {assetId}/
      {revision}/
        *
```

クラシックスクリプトの連結オプションを使用すると、`__game-scripts.js`やソースマップも追加される場合があります。これらの任意ファイルは、スクリプト種類ごとの構造を変えるものではありません。

### ESMスクリプト {#static-projects-with-esm-scripts}

ESMのstaticダウンロードでは、`index.html`がモジュールエントリーポイントとして`js/index.mjs`を読み込みます。

```text
index.html
config.json
{sceneId}.json
manifest.json
styles.css
logo.png
js/
  index.mjs
  *.mjs
files/
  assets/
    {assetId}/
      {revision}/
        *
```

### 混在スクリプト {#static-projects-with-classic-and-esm-scripts}

混在したstaticダウンロードでは、ESM形式の構造が使用されます。生成されたモジュールエントリーポイントは、クラシックな`.js`スクリプトも読み込みます。

```text
index.html
config.json
{sceneId}.json
manifest.json
styles.css
logo.png
js/
  index.mjs
  *.mjs
  *.js
files/
  assets/
    {assetId}/
      {revision}/
        *
```

## NPMプロジェクト構造 {#npm-project-structure}

:::info[開発中]

`npm`ダウンロード形式は現在開発中です。パッケージ構造と生成されるファイル名は変更される場合があります。

:::

ダウンロード形式が`npm`の場合、ダウンロードされるプロジェクトは、元のプロジェクトに含まれるスクリプトの種類に応じて次のいずれかの構造になります。生成されたアプリ設定とシーンデータは、ローカル開発中に監視できるように`src/data/`に配置され、ランタイムアセットと静的ファイルは`public/`に残ります。

### ファイル名と競合

:::note

NPMダウンロードでは、パスをファイルシステム上で安全かつ一意にするために、シーン、アセット、フォルダーのファイル名が変更される場合があります。Editor上の名前がそのままダウンロード後のファイル名になると仮定せず、生成された設定内のパスを正として扱ってください。

:::

シーンJSONファイルは、シーンの表示名から名前が付けられます。名前は小文字化され、`a-z`または`0-9`以外の文字はハイフンになり、連続するハイフンは1つにまとめられ、先頭または末尾のハイフンは削除されます。たとえば、`Main Scene`は`main-scene.json`に、`100% Scene`は`100-scene.json`になります。

シーン名が空、または句読点のみの場合、ファイル名は`scene-{sceneId}.json`になります。複数のシーンが同じファイル名になる場合は、`.json`の前にシーンIDが追加されます。たとえば、競合する`Main Scene`のIDが`101`の場合は`main-scene-101.json`になります。

アセット名とフォルダー名はファイルシステム用に安全化されますが、小文字のハイフン区切り名には変換されません。競合はフォルダーごとに解決され、拡張子の前に`.{id}`が追加されます。たとえば、`image.2.png`、`image.1.1.png`、`Folder.10`のようになります。生成された設定内のパスは最終的なファイル名に更新されます。

次の例は、クラシックスクリプトのみ、ESMスクリプトのみ、または両方の種類のスクリプトを含むプロジェクトで生成されるパッケージ構造を示します。

### クラシックスクリプト {#projects-with-classic-scripts}

```text
src/
  main.mjs
  bootstrap/
    settings.js
    modules.js
    start.js
    loading.js
  scripts/
    *.js
  data/
    config.json
    scenes/
      *.json
public/
  assets/
  thumbs/
  manifest.json
  styles.css
```

### ESMスクリプト {#projects-with-esm-scripts}

```text
src/
  main.mjs
  bootstrap/
    index.mjs
    settings.mjs
    modules.mjs
    start.mjs
    loading.mjs
  scripts/
    *.mjs
  data/
    config.json
    scenes/
      *.json
public/
  assets/
  thumbs/
  manifest.json
  styles.css
```

### 混在スクリプト {#projects-with-classic-and-esm-scripts}

```text
src/
  main.mjs
  bootstrap/
    index.mjs
    settings.mjs
    modules.mjs
    start.mjs
    loading.mjs
  scripts/
    *.mjs
    *.js
  data/
    config.json
    scenes/
      *.json
public/
  assets/
  thumbs/
  manifest.json
  styles.css
```
