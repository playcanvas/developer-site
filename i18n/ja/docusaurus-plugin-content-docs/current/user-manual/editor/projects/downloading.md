---
title: プロジェクトのダウンロード
description: static形式とnpm形式のパッケージ構造を含め、セルフホスト用アプリのPlayCanvasプロジェクトダウンロード形式を説明します。
---

PlayCanvasプロジェクトは、セルフホスト可能なアプリケーションパッケージとしてダウンロードできます。ダウンロードされたパッケージには、PlayCanvas Hostingの外でアプリを実行するために必要なファイルが含まれますが、完全な編集可能なプロジェクト履歴は含まれません。

PlayCanvasに再インポートできるプロジェクトバックアップについては、[バックアップとエクスポート](backup-and-export.md)を参照してください。

## ダウンロード形式 {#download-formats}

標準のセルフホスト用パッケージには`static`を使用します。ダウンロードしたファイルをWebサーバーやホスティングプロバイダーに直接アップロードする場合に適しています。

Viteベースのnpmプロジェクトには`npm`を使用します。ダウンロードしたアプリをローカルで扱い、Viteで実行したり、npmスクリプトで本番ビルドを作成したりする場合に適しています。

RESTの[Download app](/user-manual/api/app-download)エンドポイントでは、`format`パラメーターを使用して`static`または`npm`を選択します。

## NPMプロジェクト構造 {#npm-project-structure}

ダウンロード形式が`npm`の場合、ダウンロードされるプロジェクトは、プロジェクト内のスクリプトに応じて次のいずれかの構造になります。生成されたアプリ設定とシーンデータは、ローカル開発中に監視できるように`src/data/`に配置され、ランタイムアセットと静的ファイルは`public/`に残ります。

### クラシックスクリプト

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

### ESMスクリプト

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

### クラシックおよびESMスクリプト

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
