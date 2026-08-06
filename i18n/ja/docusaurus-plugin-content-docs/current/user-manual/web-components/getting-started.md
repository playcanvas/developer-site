---
title: 開始
description: "CDNからPlayCanvas Web Componentsを読み込むか、npmからインストールし、import mapを設定して、ブラウザで最初の3Dシーンをレンダリングします。"
---

ブラウザで3Dをレンダリングするまで、ものの1分もかかりません。インストールもビルドステップも不要です。PlayCanvas Web ComponentsをCDNから直接読み込むか、既存のプロジェクトに統合する場合はnpmパッケージをインストールしてください。

## インストール

どちらの方法を選ぶ場合でも、HTMLファイルには[インポートマップ](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/script/type/importmap)が必要になります。これは、Web ComponentsがPlayCanvas Engine（外部依存関係）を見つけられるようにするためです。`@playcanvas/web-components` もマッピングしておくと、独自のモジュールスクリプトからライブラリのJavaScript API（`whenReady` など）をインポートできます。

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs defaultValue="cdn">
<TabItem value="cdn" label="CDN（インストール不要）">

エンジンとコンポーネントの両方を、jsDelivrなどのCDNから読み込みます。`pwc.min.mjs`（`pwc.mjs` の半分以下のサイズのミニファイ版ビルド）を使用します。

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

その後、Web Componentsを次のようにインポートできます。

```html
<script type="module" src="https://cdn.jsdelivr.net/npm/@playcanvas/web-components@latest/dist/pwc.min.mjs"></script>
```

:::note[バージョニング]

上記のスニペットでは利便性のために `@latest` を使用しています。本番環境では確定的なビルドのために特定のバージョンに固定することを推奨します（例: `playcanvas@2.x.y`、`@playcanvas/web-components@x.y.z`）。最新の安定版はリリースノートを参照してください: [PlayCanvas Engine リリース](https://github.com/playcanvas/engine/releases) と [Web Components リリース](https://github.com/playcanvas/web-components/releases)。

:::

</TabItem>
<TabItem value="npm" label="npm">

[Node.js](https://nodejs.org/) 18以降がインストールされていることを確認してください。PlayCanvas Web Componentsは、[npm](https://www.npmjs.com/package/@playcanvas/web-components)でパッケージとして利用できます。次のようにインストールできます（PlayCanvas Engineも同様に）：

```bash
npm install playcanvas @playcanvas/web-components
```

インポートマップをインストール済みのパッケージに向けます。

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

これらのパスは、サイトがプロジェクトルートから配信されていて `/node_modules/...` が解決できることを前提としています。開発サーバーやバンドラーの構成に合わせて調整してください。

</TabItem>
</Tabs>

## 最初のページ

ライトが当たった球体（3Dにおける「hello, world」）をレンダリングする完全なページを次に示します。CDNセットアップを使用しているため、何もインストールする必要はありません。

```html title="index.html" {24-36}
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
        <pc-app>
            <pc-scene>
                <pc-entity name="camera" position="0 0 3">
                    <pc-camera></pc-camera>
                </pc-entity>
                <pc-entity name="light" rotation="45 45 0">
                    <pc-light></pc-light>
                </pc-entity>
                <pc-entity name="ball">
                    <pc-render type="sphere"></pc-render>
                </pc-entity>
            </pc-scene>
        </pc-app>
    </body>
</html>
```

これを `index.html` として保存し、ブラウザで開いてください。次のように表示されるはずです。

![指向性ライトに照らされた白い球体](/img/user-manual/web-components/hello-sphere.jpg)

:::note

npmインストールを使用する場合は、インポートマップとscriptタグを、上のnpmタブに示した `/node_modules/...` のものに置き換えてください。

:::

このシーンはCodePenでも公開されているので、このページを離れずに試すこともできます。

import CodePenEmbed from '@site/src/components/CodePenEmbed';

<CodePenEmbed id="JoPvXjO" title="PlayCanvas Web Componentsで構築したライト付きの球体" />

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

## 次のステップ

- [シーンを構築する](building-a-scene.md)に進んで、要素を1つずつ積み上げながらシーンを作りましょう。さらにマテリアル、影、地面まで作り込みます。
- [タグリファレンス](tags/index.md)にざっと目を通して、宣言できるすべての要素を確認しましょう。
- [サンプル](https://playcanvas.github.io/web-components/examples/)を眺めて、コンポーネントで何ができるかを見てみましょう。
