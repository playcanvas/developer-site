---
title: カスタムアセットパーサー
description: エンジンのリソースハンドラーにカスタムファイルフォーマットのパーサーを登録し、新しいアセットフォーマットの読み込みや組み込みパーサーの上書きを行います。
---

:::ai

- **[VS Code Extension](/user-manual/ai/vscode-extension/):** 「カスタムアセットパーサー」で使用するスクリプトを Pull/Push モードでローカル編集し、変更を確認できます。
- **[Editor MCP Server](/user-manual/ai/editor-mcp-server/):** 対象のスクリプトを作成、解析してエンティティへアタッチし、シーンを起動してログとランタイム状態を確認できます。

:::

PlayCanvas のすべてのアセットタイプは、アセットタイプごとに 1 つの**リソースハンドラー**（`'texture'`、`'model'`、`'audio'` など）によって読み込まれます。ハンドラー内では、個々のファイルフォーマットを**パーサー**が処理します。たとえばテクスチャハンドラーには、ブラウザ画像、DDS、KTX2、Basis 用のパーサーがあります。ハンドラーはこれらのパーサーの公開レジストリを備えているため、エンジンを変更することなく、新しいファイルフォーマットのサポートを追加したり、組み込みのものを上書きしたりできます。

:::note

カスタムパーサーは**エンジン v2.21.0** 以降で利用できます。これはエンジンのランタイム API であり、パーサーはアプリケーションの読み込み時に実行されます。エディタのアセットインポートパイプラインには影響しません。

:::

## アセット読み込みの仕組み

アセットが読み込まれると、[`ResourceLoader`](https://api.playcanvas.com/engine/classes/ResourceLoader.html) はそのアセットのタイプに登録された [`ResourceHandler`](https://api.playcanvas.com/engine/classes/ResourceHandler.html) を参照します。ハンドラーは登録された各パーサーに、**新しく登録された順**でリソースを認識できるかどうかを問い合わせ、パーサーを選択します:

1. ハンドラーがリソースを表すコンテキスト（URL、拡張子など）を構築します
2. `canParse(context)` が `true` を返す、最も新しく登録されたパーサーが選択されます
3. パーサーの `load()` がファイルを取得し、データを渡します
4. パーサーの `open()` がそのデータをランタイムリソース（`Texture` や `Model` など）に変換します

選択は新しい順に行われるため、後から登録したパーサーは、そのパーサーが認識するリソースについて組み込みのパーサーより優先されます。

## パーサーのコントラクト

パーサーは、次のメソッドを持つプレーンオブジェクトまたはクラスインスタンスです:

```javascript
class MyParser {
    // このパーサーが対象のリソースを処理できる場合は true を返します
    canParse(context) {
        return context.ext === 'myformat';
    }

    // リソースを取得し、callback(err, data) で生データを渡します
    load(url, callback, asset) {
        this.handler.fetch(url, pc.Http.ResponseType.ARRAY_BUFFER, callback, asset);
    }

    // オプション: 読み込んだデータをランタイムリソースに変換します
    open(url, data, asset) {
        return data;
    }
}
```

`canParse` に渡される `context` は、読み込まれるリソースを表します:

| プロパティ  | 説明                                                                          |
| ---------- | ---------------------------------------------------------------------------- |
| `url`      | クエリ文字列を除いた元のリソース URL（または `null`）                          |
| `ext`      | 先頭のドットを除いた小文字のファイル拡張子。例: `'tga'`                        |
| `basename` | 小文字のファイル名。例: `'lod-meta.json'`                                     |
| `asset`    | 読み込み対象の [`Asset`](https://api.playcanvas.com/engine/classes/Asset.html)（存在する場合） |
| `app`      | 実行中の [`AppBase`](https://api.playcanvas.com/engine/classes/AppBase.html)  |

パーサーが登録されると、ハンドラーは自身をパーサーの `handler` プロパティに割り当てます。これにより `load()` から `this.handler.fetch(url, responseType, callback, asset)`（ハンドラーのリトライ設定でリソースをダウンロードし、事前取得済みデータがあれば再利用するヘルパー）や、ハンドラーの状態（たとえば `this.handler.app`）にアクセスできます。

## パーサーの登録

パーサーは、対象のアセットタイプのハンドラーに登録します:

```javascript
app.loader.getHandler('texture').addParser(new TgaParser());
```

パーサーは、そのアセットタイプの読み込みを開始する前に登録してください。登録済みのパーサーは `removeParser(parser)` で削除でき、現在登録されているパーサーは読み取り専用の `parsers` プロパティで確認できます。

選択は新しい順に行われるため、組み込みパーサーがすでに対応しているフォーマットを扱うパーサーを登録すると、組み込みのものを上書きします。これは特定の拡張子に対しても、キャッチオール（すべてを受け付ける）パーサーに対しても機能します。

## 例: TGA テクスチャパーサー

エンジンはランタイムで `.tga` ファイルを読み込みません。カスタムパーサーでサポートを追加できます:

```javascript
class TgaParser {
    canParse(context) {
        return context.ext === 'tga';
    }

    load(url, callback, asset) {
        this.handler.fetch(url, pc.Http.ResponseType.ARRAY_BUFFER, callback, asset);
    }

    // テクスチャパーサーは拡張された open シグネチャを使用します。ハンドラーがグラフィックス
    // デバイスと、アセットデータから導出されたテクスチャオプションを渡します
    open(url, data, device, textureOptions) {
        // TGA ファイルを RGBA8 ピクセルにデコードします（任意のデコーダーを使用）
        const { width, height, pixels } = decodeTga(data);

        const texture = new pc.Texture(device, {
            name: url,
            width: width,
            height: height,
            format: pc.PIXELFORMAT_RGBA8,
            levels: [pixels],

            // アセット由来のオプションを最後にスプレッドすることで、アセットの設定
            // （srgb、フィルタリング、mipmaps など）が上記のデフォルトを上書きします
            ...textureOptions
        });

        texture.upload();

        return texture;
    }
}

app.loader.getHandler('texture').addParser(new TgaParser());
```

パーサーを登録すれば、`.tga` ファイルは他のテクスチャと同様に読み込まれます:

```javascript
const asset = new pc.Asset('picture', 'texture', { url: 'images/picture.tga' }, { srgb: true });
app.assets.add(asset);
app.assets.load(asset);
```

完全に動作するカスタム**モデル**パーサーの例については、エンジンの [OBJ パーサー](https://github.com/playcanvas/engine/blob/main/scripts/parsers/obj-model.js)と、それを使用する [OBJ ローダーの例](https://playcanvas.github.io/#/loaders/obj)を参照してください。

## ハンドラーに関する注意

フォーマットを扱うほとんどのハンドラーがパーサーレジストリに対応しています: `model`、`texture`、`material`、`gsplat`、`container`、`animation`、`animclip`、`animstategraph`、`template`、`audio`、`json`、`css`、`html`、`text`、`shader`、`binary`。いくつかの詳細はアセットタイプによって異なります:

- **texture** — パーサーは上記の拡張された `open(url, data, device, textureOptions)` を実装します。組み込みのブラウザ画像パーサーはキャッチオールであるため、カスタムパーサーが処理しない未知の拡張子はそこにフォールバックします。
- **material** — ハンドラーのアセットバインディング（マテリアルデータが参照するテクスチャアセットの割り当て）は、組み込みの JSON パーサーが生成する `StandardMaterial` に適用されます。カスタムパーサーが生成するマテリアルは、自身でアセット参照を管理します。
- **audio** — サウンドマネージャーはパーサーから `this.handler.manager` として利用できます。カスタムパーサーは `AudioBuffer` にデコードし、`pc.Sound` でラップして返すことができます。
- ファイルフォーマットを解析するのではなく他のアセットを構成するハンドラー（`cubemap`、`font`、`sprite`、`textureatlas`）と、特殊用途のハンドラー（`bundle`、`script`、`folder`）は、登録されたパーサーを参照しません。

## 関連項目

- [`ResourceHandler` API リファレンス](https://api.playcanvas.com/engine/classes/ResourceHandler.html)
- [`ResourceLoader` API リファレンス](https://api.playcanvas.com/engine/classes/ResourceLoader.html)
- [サポートされているフォーマット](supported-formats.md)
- [読み込みと解放](loading-unloading.md)
