---
title: シーンを構築する
description: pc-appとpc-sceneでライトの当たったシーンを実際に作り、カメラ、メッシュ、ライトを追加し、要素の階層を理解するハンズオンチュートリアルです。
---

PlayCanvas Web Components を使用して、シンプルな3Dシーンをステップバイステップで構築しましょう。最後まで進めると、青空の下、地面の上に置かれた色付きの球体がシェーディング付きで表示され、各行が何をしているのかも理解できるようになります。

以下の各スニペットは、ページの `body` の中身全体です。周囲のHTML（インポートマップ、scriptタグ、スタイル）は[開始](getting-started.md)のボイラープレートです。開始のページを終えている場合は、そのシーンをいったん空にしてください。ここでは同じシーンをゼロから作り直し、さらに先へ進みます。

## 開始点

まず、[`<pc-app>`](tags/pc-app.md) および [`<pc-scene>`](tags/pc-scene.md) 要素を使用して、アプリケーションの基本構造をHTMLの `body` に追加しましょう。

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

シーンを表示するには、カメラが必要です。[`<pc-entity>`](tags/pc-entity.md) および [`<pc-camera>`](tags/pc-camera.md) 要素を使用してシーンにカメラを追加できます。

```html {3-5}
<pc-app>
    <pc-scene>
        <pc-entity name="camera" position="0 0 5">
            <pc-camera></pc-camera>
        </pc-entity>
    </pc-scene>
</pc-app>
```

正のZ軸方向に5単位離れた位置にカメラエンティティを追加しました。デフォルトでは、カメラは負のZ軸方向を向くため、カメラは現在原点を見ています。この時点では、レンダリングされたシーンは単色の灰色（カメラのデフォルトのクリアカラー）です。

![カメラのデフォルトのクリアカラーを示す単色の灰色のフレーム](/img/user-manual/web-components/building-a-scene/camera-only.jpg)

灰色の何もない空間ですが、レンダラーが動いている証拠です。

## オブジェクトを追加する

シーンには映すものが必要です。[`<pc-render>`](tags/pc-render.md) 要素を使用して、球体を追加しましょう。

```html {6-8}
<pc-app>
    <pc-scene>
        <pc-entity name="camera" position="0 0 5">
            <pc-camera></pc-camera>
        </pc-entity>
        <pc-entity name="sphere">
            <pc-render type="sphere"></pc-render>
        </pc-entity>
    </pc-scene>
</pc-app>
```

画面の中央に暗い円が現れます。球体は確かにそこにあるのですが、シーンにライトがないため表面には光がまったく当たらず、黒いシルエットとしてレンダリングされています。

![灰色の背景に黒いシルエットとして表示される、ライトのない球体](/img/user-manual/web-components/building-a-scene/unlit-sphere.jpg)

## ライトを追加する

これを解決しましょう。[`<pc-light>`](tags/pc-light.md) 要素を使用して、カメラと球体の間に指向性ライトを追加します。

```html {6-8}
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

ライトは角度を付けて回転させてあり、正面から照らすよりも興味深いシェーディングが生まれます。球体が一気に生き生きとしました。

![灰色の背景に浮かぶ、ライトが当たった白い球体](/img/user-manual/web-components/building-a-scene/white-sphere.jpg)

## 色を追加する

ここまでは、白いマテリアルと灰色のクリアカラーという、すべてデフォルトの見た目でした。ここに自分の色を加えてみましょう。マテリアルは [`<pc-material>`](tags/pc-material.md) 要素で定義します。この要素は（特定のシーンの一部ではなく共有リソースなので）`<pc-app>` の直下に置き、レンダーコンポーネントの `material` 属性から `id` で参照して適用します。あわせて、カメラの `clear-color` 属性で背景色も変更します。

```html {2,5,11}
<pc-app>
    <pc-material id="crimson" diffuse="crimson"></pc-material>
    <pc-scene>
        <pc-entity name="camera" position="0 0 5">
            <pc-camera clear-color="lightskyblue"></pc-camera>
        </pc-entity>
        <pc-entity name="light" rotation="45 45 0">
            <pc-light type="directional"></pc-light>
        </pc-entity>
        <pc-entity name="sphere">
            <pc-render type="sphere" material="crimson"></pc-render>
        </pc-entity>
    </pc-scene>
</pc-app>
```

ここで使っている2つの色の値は、どちらも[CSSカラー名](https://github.com/playcanvas/web-components/blob/main/src/colors.ts)です。カラー属性は16進数コードやスペース区切りの数値も受け付けます。詳しい規約は[属性](attributes.md)を参照してください。

![水色の背景に浮かぶ真紅の球体](/img/user-manual/web-components/building-a-scene/colored-sphere.jpg)

## シーンに地面を追加する

何もない空間にオブジェクトを浮かべるだけでは、できることに限りがあります。球体が載る場所を用意しましょう。`plane` プリミティブを拡大して地面にし、2つ目のマテリアルを適用します。球体プリミティブの直径は1ユニットなので、`position="0 0.5 0"` に持ち上げると平面のちょうど真上に載ります。また、シーン全体がフレームに収まるようにカメラを持ち上げて傾け、`cast-shadows` 属性でライトが影を落とすようにします。これは、存在するだけで有効になるBoolean属性です（[属性](attributes.md)を参照）。

```html {3,5,9,11,14-16}
<pc-app>
    <pc-material id="crimson" diffuse="crimson"></pc-material>
    <pc-material id="gray" diffuse="lightgray"></pc-material>
    <pc-scene>
        <pc-entity name="camera" position="0 1.5 6" rotation="-10 0 0">
            <pc-camera clear-color="lightskyblue"></pc-camera>
        </pc-entity>
        <pc-entity name="light" rotation="45 45 0">
            <pc-light type="directional" cast-shadows></pc-light>
        </pc-entity>
        <pc-entity name="sphere" position="0 0.5 0">
            <pc-render type="sphere" material="crimson"></pc-render>
        </pc-entity>
        <pc-entity name="ground" scale="8 1 8">
            <pc-render type="plane" material="gray"></pc-render>
        </pc-entity>
    </pc-scene>
</pc-app>
```

![青空の下、明るい灰色の平面の上に置かれ、影を落とす真紅の球体](/img/user-manual/web-components/building-a-scene/final-scene.jpg)

これで1つのシーンの完成です。カメラ、ライト、ジオメトリ、マテリアルのすべてを、HTMLだけで構成しました。

## 要素の階層

いま構築した構造は、すべてのPlayCanvas Web Componentsドキュメントに共通するルールに従っています。

```none
pc-app ................... アプリケーション
├── pc-material .......... アプリレベルのリソース（pc-asset も同様）
└── pc-scene ............. エンティティ階層のルート
    └── pc-entity ........ シーングラフのノード（エンティティはネスト可能）
        └── pc-camera .... エンティティに機能を与えるコンポーネント
                           （pc-light、pc-render なども同様）
```

- [`<pc-scene>`](tags/pc-scene.md)、[`<pc-material>`](tags/pc-material.md)、[`<pc-asset>`](tags/pc-asset.md) は [`<pc-app>`](tags/pc-app.md) の直下に置きます。
- [`<pc-entity>`](tags/pc-entity.md) は `<pc-scene>` または別のエンティティの直下に置きます。エンティティをネストしてトランスフォーム階層を構築します。エンティティの `position`、`rotation`、`scale` は親に対するローカル値です。
- [`<pc-camera>`](tags/pc-camera.md)、[`<pc-light>`](tags/pc-light.md)、[`<pc-render>`](tags/pc-render.md) などのコンポーネント要素はエンティティの直下に置き、それぞれがそのエンティティに機能を与えます。
- 誤った場所に置かれた要素は、必要な親要素の名前を含むコンソール警告をログに出力します。記述の際はコンソールを開いておきましょう。各タグの配置ルールは[リファレンスページ](tags/index.md)に記載されています。

## 次のステップ

- [属性](attributes.md) — いま使った値の規約（Boolean、カラー、ベクトルなど）です。
- [スクリプトで動作を追加する](scripting.md) — オブジェクトを動かしましょう。エンジンには `cameraControls` のような既製のスクリプトも同梱されており、マウスでシーンを周回できます。
- [タグリファレンス](tags/index.md) — 宣言できる残りすべての要素です。
- [サンプル](https://playcanvas.github.io/web-components/examples/) — [Basic Shapes](https://playcanvas.github.io/web-components/examples/basic-shapes.html) は、いま構築したシーンの拡大版です。
