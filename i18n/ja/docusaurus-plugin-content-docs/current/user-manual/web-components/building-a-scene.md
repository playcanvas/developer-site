---
title: シーンを構築する
---

PlayCanvas Web Components を使用して、シンプルな3Dシーンをステップバイステップで構築しましょう。ライトが当たった球体のある基本的なシーンを作成します。

## 開始点

まず、[`<pc-app>`](../tags/pc-app) および [`<pc-scene>`](../tags/pc-scene) 要素を使用して、アプリケーションの基本構造をHTMLの `body` に追加しましょう。

```html
<pc-app>
    <pc-scene>
    </pc-scene>
</pc-app>
```

これにより、空の3Dシーンが作成されます。しかし、まだ何もレンダリングされたものは見えません。カメラとコンテンツが必要です。

:::note

すべての `pc-` 要素は適切に閉じられる必要があります。自己終了タグ（例：`<pc-camera />`）はサポートされていません。

:::

## カメラを追加する

シーンを表示するには、カメラが必要です。[`<pc-entity>`](../tags/pc-entity) および [`<pc-camera>`](../tags/pc-camera) 要素を使用してシーンにカメラを追加できます。

```html {3-5}
<pc-app>
    <pc-scene>
        <pc-entity name="camera" position="0 0 5">
            <pc-camera></pc-camera>
        </pc-entity>
    </pc-scene>
</pc-app>
```

正のZ軸方向に5単位離れた位置にカメラエンティティを追加しました。デフォルトでは、カメラは負のZ軸方向を向くため、カメラは現在原点を見ています。この時点では、レンダリングされたシーンは単色の灰色です（カメラのデフォルトのクリアカラー）。

## ライトを追加する

[`<pc-light>`](../tags/pc-light) 要素を使用して、シーンを照らすための指向性ライトを追加しましょう。

```html {6-8}
<pc-app>
    <pc-scene>
        <pc-entity name="camera" position="0 0 5">
            <pc-camera></pc-camera>
        </pc-entity>
        <pc-entity name="light" rotation="45 45 0">
            <pc-light type="directional"></pc-light>
        </pc-entity>
    </pc-scene>
</pc-app>
```

ライトは角度を付けて回転されており、オブジェクトにより興味深いシェーディングが作成されます。

## オブジェクトを追加する

[`<pc-render>`](../tags/pc-render) 要素を使用して、シーンに球体を追加しましょう。

```html {9-11}
<pc-app>
    <pc-scene>
        <pc-entity name="camera" position="0 0 5">
            <pc-camera></pc-camera>
        </pc-entity>
        <pc-entity name="light" rotation="45 45 0">
            <pc-light type="directional"></pc-light>
        </pc-entity>
        <pc-entity name="sphere">
            <pc-render type="sphere"></pc-render>
        </pc-entity>
    </pc-scene>
</pc-app>
```

これで、画面の中央に白い球体が表示されているはずです！
