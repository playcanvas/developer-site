---
title: Webコンポーネントの使用
---

[PlayCanvas Webコンポーネント](/user-manual/web-components)を使用して、簡単なGaussian splatアプリケーションをステップバイステップで構築しましょう。回転できるインタラクティブな3Dの猫のオモチャのスプラットがあるシーンを作成します。

## 開始点

`index.html`という新しいファイルを作成し、[WebコンポーネントのボイラープレートHTML](/user-manual/web-components/getting-started/#ボイラープレートhtml)をそこにコピーすることから始めます。

次に、[`<pc-app>`](/user-manual/web-components/tags/pc-app)および[`<pc-scene>`](/user-manual/web-components/tags/pc-scene)要素を使用して、アプリケーションの基本構造をHTMLの`body`に追加しましょう。

```html
<pc-app antialias="false" high-resolution="false">
    <pc-scene>
    </pc-scene>
</pc-app>
```

これにより、空の3Dシーンが作成されます。しかし、まだ何もレンダリングされたものは見えません。そのためには、カメラとスプラットを追加する必要があります。

:::warning パフォーマンス最適化

スプラットのレンダリングパフォーマンスを最適化するため、`<pc-app>`要素の`antialias`と`high-resolution`を無効にしました。これらの設定は、Gaussian splatレンダリングの主要なボトルネックであるフラグメント処理の負荷を軽減するのに役立ちます。詳細については、[パフォーマンス](../engine-features/performance.md)ガイドを参照してください。

:::

## アセットの読み込み

スプラットを表示したり、カメラコントロールを追加したりする前に、アプリが使用するアセットを定義する必要があります。[`<pc-asset>`](/user-manual/web-components/tags/pc-asset)要素を使用して、カメラコントロールスクリプトとスプラットアセットを追加しましょう。

```html {2-3}
<pc-app antialias="false" high-resolution="false">
    <pc-asset src="https://cdn.jsdelivr.net/npm/playcanvas/scripts/esm/camera-controls.mjs"></pc-asset>
    <pc-asset id="toy" src="https://developer.playcanvas.com/assets/toy-cat.sog"></pc-asset>
    <pc-scene>
    </pc-scene>
</pc-app>
```

2つのアセットを追加しました:

- シーンの周りを周回できるようにするカメラコントロールスクリプト
- 猫のオモチャのスプラットを含む圧縮PLYファイル

## カメラの追加

シーンを見るにはカメラが必要です。これは[`<pc-entity>`](/user-manual/web-components/tags/pc-entity)および[`<pc-camera>`](/user-manual/web-components/tags/pc-camera)要素を使用して追加できます。

```html {5-7}
<pc-app antialias="false" high-resolution="false">
    <pc-asset src="https://cdn.jsdelivr.net/npm/playcanvas/scripts/esm/camera-controls.mjs"></pc-asset>
    <pc-asset id="toy" src="https://developer.playcanvas.com/assets/toy-cat.sog"></pc-asset>
    <pc-scene>
        <pc-entity position="0 0 2.5">
            <pc-camera></pc-camera>
        </pc-entity>
    </pc-scene>
</pc-app>
```

カメラをZ軸に2.5単位配置しました。デフォルトでは、カメラはZ軸の負の方向を見ているため、カメラはスプラットを配置する原点を見ています。

## カメラコントロールの追加

次に、[`<pc-scripts>`](/user-manual/web-components/tags/pc-scripts)および[`<pc-script>`](/user-manual/web-components/tags/pc-script)要素を使用してカメラコントロールスクリプトを追加し、カメラをインタラクティブにしましょう。

```html {7-9}
<pc-app antialias="false" high-resolution="false">
    <pc-asset src="https://cdn.jsdelivr.net/npm/playcanvas/scripts/esm/camera-controls.mjs"></pc-asset>
    <pc-asset id="toy" src="https://developer.playcanvas.com/assets/toy-cat.sog"></pc-asset>
    <pc-scene>
        <pc-entity position="0 0 2.5">
            <pc-camera></pc-camera>
            <pc-scripts>
                <pc-script name="cameraControls"></pc-script>
            </pc-scripts>
        </pc-entity>
    </pc-scene>
</pc-app>
```

カメラコントロールスクリプトを使用すると、次のことができます:

- **マウス左ドラッグ**: ターゲットの周りを周回
- **マウス右ドラッグ**: カメラをパン
- **マウスホイール**: ズームイン/ズームアウト

## スプラットの追加

次に、[`<pc-splat>`](/user-manual/web-components/tags/pc-splat)要素を使用して、猫のオモチャのスプラットをシーンに追加しましょう。

```html {11-13}
<pc-app antialias="false" high-resolution="false">
    <pc-asset src="https://cdn.jsdelivr.net/npm/playcanvas/scripts/esm/camera-controls.mjs"></pc-asset>
    <pc-asset id="toy" src="https://developer.playcanvas.com/assets/toy-cat.sog"></pc-asset>
    <pc-scene>
        <pc-entity position="0 0 2.5">
            <pc-camera></pc-camera>
            <pc-scripts>
                <pc-script name="cameraControls"></pc-script>
            </pc-scripts>
        </pc-entity>
        <pc-entity position="0 -0.7 0" rotation="0 0 180">
            <pc-splat asset="toy"></pc-splat>
        </pc-entity>
    </pc-scene>
</pc-app>
```

スプラットを原点よりわずかに下（Y軸で-0.7）に配置し、Z軸を中心に180度回転させて適切に方向付けました。`asset="toy"`属性は、先に定義したスプラットアセットを参照しています。

## 最終結果

上記のステップを完了すると、周回、パン、ズームができるインタラクティブな3Dの猫のオモチャのスプラットが表示されるはずです！

import CodePenEmbed from '@site/src/components/CodePenEmbed';

<CodePenEmbed id="MYgGZax" title="<pc-splat> example" />

:::tip 自分で試してみよう

上記の最終HTMLコードをHTMLファイルにコピーし、ブラウザで開いて、初めてのスプラットアプリが動作するのを見てみましょう！その後、PlayCanvas Engineの全てのパワーを使って、好きなように拡張してください！

:::
