---
title: ビルドのダウンロード
description: "PlayCanvas Editorのプロジェクトのビルドをダウンロードして自分でホストする方法です。Static Website形式とnpm形式、クラシックスクリプト、ESMスクリプト、混在スクリプトのそれぞれで含まれるファイルを扱います。"
---

[PlayCanvasホスティング](playcanvas-hosting.md)以外の場所、たとえば自分のサーバー、ゲームプラットフォーム、アプリストア、デスクトップアプリでアプリを動かすときは、ビルドをダウンロードします。ダウンロードには、アプリを動かすのに必要なファイルが含まれますが、プロジェクトそのものは含まれません。再インポートできるようにプロジェクトをバックアップするには、[バックアップとエクスポート](../projects/backup-and-export.md)を参照してください。

## ビルドをダウンロードする {#downloading-a-build}

1. [ツールバー](../interface/toolbar.md)の**Publish / Download**ボタンを選択して、[Buildsパネル](index.md#the-builds-panel)を開きます。
2. **Download**を選択します。
3. ビルドに**Title**を付け、**Download Format**を選び、含めるシーンを選びます。ほかの設定は[ビルドを作る](index.md#making-a-build)を参照してください。
4. フォームの下にある**Download**を選択します。

ビルドは**Build history**に表示されます。準備ができたら、そのダウンロードボタンを選んでzipファイルとして保存します。

ビルドの`index.html`をコンピューターのファイルから開いても、ビルドは動きません。試すには、[ローカルのWebサーバーから配信](/user-manual/publishing/web-hosting/#testing-a-build-locally)してください。

## ダウンロード形式 {#download-formats}

| 形式 | 使う場面 |
| --- | --- |
| **Static Website** | ビルドをWebサーバー、静的ホスティングサービス、ゲームプラットフォームにそのまま置く場合。[Webホスティング](/user-manual/publishing/web-hosting/)を参照してください。 |
| **NPM + Vite Project** | アプリをコードとして作り続ける場合。Viteで実行し、変更し、npmスクリプトで本番ビルドを作れます。この形式は開発中です。 |

RESTの[Download app](/user-manual/api/app-download/)エンドポイントでもビルドをダウンロードできます。`format`パラメーターは、静的Webサイトなら`static`、npmプロジェクトなら`npm`です。

## staticプロジェクト構造 {#static-project-structure}

Static Websiteのビルドは、そのまま動くファイルのフォルダーです。その構造は、プロジェクトが使うスクリプトの種類によって変わります。

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

npmプロジェクトは、元のプロジェクトに含まれるスクリプトの種類に応じて次のいずれかの構造になります。生成されたアプリ設定とシーンデータは、ローカル開発中に監視できるように`src/data/`に配置され、ランタイムアセットと静的ファイルは`public/`に残ります。

### ファイル名と競合

:::note

NPMダウンロードでは、パスをファイルシステム上で安全かつ一意にするために、シーン、アセット、フォルダーのファイル名が変更される場合があります。Editor上の名前がそのままダウンロード後のファイル名になると仮定せず、生成された設定内のパスを正として扱ってください。

:::

シーンJSONファイルは、シーンの表示名から名前が付けられます。名前は小文字化され、`a-z`または`0-9`以外の文字はハイフンになり、連続するハイフンは1つにまとめられ、先頭または末尾のハイフンは削除されます。たとえば、`Main Scene`は`main-scene.json`に、`100% Scene`は`100-scene.json`になります。

シーン名が空、または句読点のみの場合、ファイル名は`scene-{sceneId}.json`になります。複数のシーンが同じファイル名になる場合は、以下の競合ルールに従って`.json`の前にシーンIDが追加されます。たとえば、競合する`Main Scene`のIDが`101`の場合は`main-scene-101.json`になります。

アセット名とフォルダー名はファイルシステム用に安全化されますが、小文字のハイフン区切り名には変換されません。シーン、アセット、フォルダーの競合はフォルダーごとに解決され、拡張子の前に`-{id}`が追加されます。たとえば、`image-2.png`、`Folder-10`、`main-scene-101.json`のようになります。競合するグループのすべての名前には安定したIDが追加され、一意の名前は変更されません。自然にIDサフィックスを持つ名前は予約されるため、IDが`1`と`2`の重複した`image.png`と、元から存在する`image-1.png`は、それぞれ`image-1-1.png`、`image-2.png`、`image-1.png`になります。生成された設定内のパスは最終的なファイル名に更新されます。

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
