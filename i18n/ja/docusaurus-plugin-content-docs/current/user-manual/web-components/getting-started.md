---
title: 開始
sidebar_position: 1
---

始める前に、[Node.js](https://nodejs.org/) 18以降がインストールされていることを確認してください。

## NPMからのインストール

PlayCanvas Web Componentsは、[NPM](https://www.npmjs.com/package/@playcanvas/web-components)でパッケージとして利用できます。
次のようにインストールできます（PlayCanvas Engineも同様に）：

```bash
npm install playcanvas @playcanvas/web-components --save-dev
```

次に、HTMLファイルでインポートマップが必要になります。これは、Web ComponentsがPlayCanvas Engine（外部依存関係）を見つけられるようにするためです。

```html
<script type="importmap">
    {
        "imports": {
            "playcanvas": "/node_modules/playcanvas/build/playcanvas.mjs"
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

ライブラリをローカルパッケージからロードする代わりに、CDN（jsDelivrなど）からロードすることを選択できます。この場合、インポートマップを更新します。

```html
<script type="importmap">
    {
        "imports": {
            "playcanvas": "https://cdn.jsdelivr.net/npm/playcanvas@2.6.0/build/playcanvas.mjs"
        }
    }
</script>
```

コンポーネントは次のようにインポートされます。

```html
<script type="module" src="https://cdn.jsdelivr.net/npm/@playcanvas/web-components@0.2.5/dist/pwc.mjs"></script>
```

## ボイラープレートHTML

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
                    "playcanvas": "https://cdn.jsdelivr.net/npm/playcanvas@2.6.0/build/playcanvas.mjs"
                }
            }
        </script>
        <script type="module" src="https://cdn.jsdelivr.net/npm/@playcanvas/web-components@0.2.5/dist/pwc.mjs"></script>
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
