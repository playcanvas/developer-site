---
title: 開始
description: "npmからPlayCanvas Web Componentsをインストールし、エンジン用のimport mapを設定し、要素を登録して最小のHTML例を埋め込みます。"
---

始める前に、[Node.js](https://nodejs.org/) 18以降がインストールされていることを確認してください。

## NPMからのインストール

PlayCanvas Web Componentsは、[NPM](https://www.npmjs.com/package/@playcanvas/web-components)でパッケージとして利用できます。
次のようにインストールできます（PlayCanvas Engineも同様に）：

```bash
npm install playcanvas @playcanvas/web-components
```

次に、HTMLファイルでインポートマップが必要になります。これは、Web ComponentsがPlayCanvas Engine（外部依存関係）を見つけられるようにするためです。`@playcanvas/web-components` もマッピングしておくと、独自のモジュールスクリプトからライブラリのJavaScript API（`whenReady` など）をインポートできます。

```html
<script type="importmap">
    {
        "imports": {
            "playcanvas": "/node_modules/playcanvas/build/playcanvas.mjs",
            "@playcanvas/web-components": "/node_modules/@playcanvas/web-components/dist/pwc.mjs"
        }
    }
</script>
```

その後、Web Componentsを次のようにインポートできます。

```html
<script type="module" src="/node_modules/@playcanvas/web-components/dist/pwc.mjs"></script>
```

これで、PlayCanvas Web Componentsのいずれかの要素をHTMLに組み込むことができます！

## CDNの使用

ライブラリをローカルパッケージからロードする代わりに、CDN（jsDelivrなど）からロードすることを選択できます。この場合、インポートマップを更新して `pwc.min.mjs`（`pwc.mjs` の半分以下のサイズのミニファイ版ビルド）を使用します。

```html
<script type="importmap">
    {
        "imports": {
            "playcanvas": "https://cdn.jsdelivr.net/npm/playcanvas@latest/build/playcanvas.mjs",
            "@playcanvas/web-components": "https://cdn.jsdelivr.net/npm/@playcanvas/web-components@latest/dist/pwc.min.mjs"
        }
    }
</script>
```

コンポーネントは次のようにインポートされます。

```html
<script type="module" src="https://cdn.jsdelivr.net/npm/@playcanvas/web-components@latest/dist/pwc.min.mjs"></script>
```

:::note[バージョニング]

上記のスニペットでは利便性のために `@latest` を使用しています。本番環境では確定的なビルドのために特定のバージョンに固定することを推奨します（例: `playcanvas@2.x.y`、`@playcanvas/web-components@x.y.z`）。最新の安定版はリリースノートを参照してください: [PlayCanvas Engine リリース](https://github.com/playcanvas/engine/releases) と [Web Components リリース](https://github.com/playcanvas/web-components/releases)。

:::

## ボイラープレートHTML {#ボイラープレートhtml}

最小限のボイラープレートHTMLファイルでどのように見えるか見てみましょう。

```html
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
        <title>My PlayCanvas Web Components App</title>
        <script type="importmap">
            {
                "imports": {
                    "playcanvas": "https://cdn.jsdelivr.net/npm/playcanvas@latest/build/playcanvas.mjs",
                    "@playcanvas/web-components": "https://cdn.jsdelivr.net/npm/@playcanvas/web-components@latest/dist/pwc.min.mjs"
                }
            }
        </script>
        <script type="module" src="https://cdn.jsdelivr.net/npm/@playcanvas/web-components@latest/dist/pwc.min.mjs"></script>
        <style>
            body {
                margin: 0;
                overflow: hidden;
            }
        </style>
    </head>
    <body>
        <!-- あなたのPlayCanvas Web Components要素はここに配置されます -->
    </body>
</html>
```

これで、PlayCanvas Web Componentsを使用して3Dシーンを構築する準備ができました！

## エディタサポート

このパッケージは[Custom Elements Manifest](https://github.com/webcomponents/custom-elements-manifest)を同梱しており、エディタはこれを使ってHTMLの記述時にタグと属性の補完、有効な属性値、ホバードキュメントを提供します。

**VS Code** — ワークスペースの `.vscode/settings.json` に以下を追加します。

```json
{
  "html.customData": [
    "./node_modules/@playcanvas/web-components/dist/vscode.html-custom-data.json"
  ]
}
```

**JetBrains IDE**（WebStorm、IntelliJ IDEA）— 設定は不要です。IDEが同梱の `web-types.json` を自動的に検出します。

**その他のツール** — マニフェスト本体は `@playcanvas/web-components/dist/custom-elements.json` にあり、パッケージの `customElements` フィールドで宣言されています。`lit-analyzer` やStorybookなどのツールはこれを通じてマニフェストを見つけます。
