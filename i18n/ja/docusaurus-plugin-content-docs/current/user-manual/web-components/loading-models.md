---
title: モデルの読み込み
description: "pc-assetとpc-modelでglTF・GLBモデルを読み込み、圧縮されたメッシュをデコードし、環境で照らし、hierarchy()で階層を調べ、pc-nodeでその内部を非表示にしたり、再配置したり、マテリアルを差し替えたり、拡張します。"
---

[シーンの構築](building-a-scene.md)ではすべてをプリミティブから作りました。実際のプロジェクトではモデルを読み込みます。このページはその周辺のワークフロー、つまりGLBをページに載せ、その中に実際に何が入っているかを知り、そして3Dツールを開くことなくそれを調整する方法を扱います。

このページ全体で使用するモデルは[Lionsharp Studios制作のPorsche 911 Carrera 4S](https://sketchfab.com/3d-models/free-porsche-911-carrera-4s-d01b254483794de3819786d93e0e1ebf)（CC BY-SA 4.0）で、[Car Configuratorのサンプル](https://playcanvas.github.io/web-components/examples/#car-configurator.html)で使われているのと同じアセットです。欠点も含めて実際のSketchfabのモデルですが、それこそが要点になります。

## エクスポート時に気をつけること {#what-to-export}

glTFのどちらの形式でも動作します。`.gltf`（JSONで、テクスチャとジオメトリが別ファイル）と`.glb`（すべてが1つのバイナリファイル）です。Webでは`.glb`を推奨します。リクエストが1回で済み、相対パスが壊れることもありません。

エクスポート時に気にかける価値があるのは2つです。これらは後で使う語彙そのものになるためです。

* **ノード名。** [`<pc-node>`](tags/pc-node.md)はモデルの部分を名前で検索します。エクスポーターが`Object_12`を出力したなら、それを入力することになります。
* **マテリアル名。** マテリアルを差し替える際の指定手段であり、ノード名が意味を失っていても意味を保っていることが多くあります。

どちらも失敗しても致命的ではありません。後述の`hierarchy()`が実際に何が得られたかを教えてくれます。ただし、Blenderで名前を整える数分は、それ以上の時間を後で節約します。

## 読み込みとインスタンス化 {#loading-and-instantiating}

読み込みには2つのタグが必要です。[`<pc-asset>`](tags/pc-asset.md)がファイルを宣言し、[`<pc-model>`](tags/pc-model.md)がそれをシーンにインスタンス化します。

```html {2,7}
<pc-app>
    <pc-asset id="car" src="assets/porsche-911-carrera-4s.glb"></pc-asset>
    <pc-scene>
        <pc-entity name="camera" position="3.2 0.9 3.6" rotation="-12 42 0">
            <pc-camera clear-color="#dfe4ea"></pc-camera>
        </pc-entity>
        <pc-model asset="car"></pc-model>
    </pc-scene>
</pc-app>
```

多くのモデルではこれで完了です。この車は見た目を整えるまでにさらに2つのタグ — 圧縮されたメッシュのためのデコーダーと、塗装が映り込むための環境 — を必要とし、続く2つのセクションでそれらを追加します。

GLBは*コンテナ*アセットであり、メッシュ・マテリアル・テクスチャ・スキン・アニメーションをまとめて保持します。`<pc-model>`はそのコンテナから階層をインスタンス化します。`<pc-asset>`は拡張子`.glb`または`.gltf`から`container`型を推論するため、マークアップで`type="container"`を指定する必要があるのは、クエリ文字列付き（`car.glb?v=2`）や拡張子のないダウンロードリンクのように、URLがそれらの拡張子で終わらない場合だけです。コンテナをインスタンス化する点を除けば、`<pc-model>`は[`<pc-entity>`](tags/pc-entity.md)と同じように振る舞います。`position`・`rotation`・`scale`を取り、別のエンティティの内側にネストすることもできます。

モデルはコンテンツがシーンに入った時点でready状態になり、`load`を発生させます。読み込みが失敗した場合も`contentEntity`が`null`のままreadyは確定し、[`error`イベント](tags/pc-model.md#events)を発生させます。ファイルが届かない可能性がある場合はこちらをリッスンしてください。

```javascript
document.querySelector('pc-model').addEventListener('error', (event) => {
    console.warn(`the model did not load: ${event.message}`);
});
```

:::note[モデルの原点はアーティストが残したままです]

モデルのピボットやスケールを正規化する仕組みはありません。この車の原点はボディの中央にあるため、ホイールはy=0より*下*にあり、原点に置いた地面プレーンをすり抜けて沈みます。`<pc-model>`に`position`を設定して持ち上げるか、地面を動かしてください。ただしこれは規約を前提にできるものではなく、アセットごとに対応することになります。

:::

### 圧縮されたメッシュ {#compressed-meshes}

モデルはダウンロードサイズを削るためにDraco圧縮されたメッシュで配布されることが多く、このモデルもそうです。DracoにはWebAssemblyデコーダーが必要で、`<pc-app>`の子として[`<pc-wasm>`](tags/pc-wasm.md)で宣言します。

```html
<pc-wasm name="DracoDecoderModule"
         glue="modules/draco/draco.wasm.js"
         wasm="modules/draco/draco.wasm.wasm"></pc-wasm>
```

この2つのファイルは[Draco](https://google.github.io/draco/)デコーダーのビルドで、glueスクリプトと`.wasm`バイナリです。エンジンのnpmパッケージには含まれていないため、自分で配信します。[Dracoのリリース](https://github.com/google/draco/releases)から取得するか、[Web Componentsのサンプル](https://github.com/playcanvas/web-components/tree/main/examples/modules/draco)に同梱されている一式をコピーし、置いた場所を属性で指定してください。

`<pc-app>`は子要素のすべての`<pc-wasm>`を待ってから起動するため、シーンが動き出す時点でデコーダーは配置済みです。これがないとモデルの読み込みは失敗し、代わりにエンジンがページと同じ場所から`draco.wasm.js`を取得しようとする様子がコンソールに表示されます。

圧縮テクスチャのトランスコードに使う`Basis`も同じ仕組みで供給します。`KHR_texture_basisu`を使うモデルにはこれが必要です。

### モデルを照らす {#lighting-the-model}

この車の塗装は金属であり、金属には拡散色がありません。見えているものはすべて映り込みです。車の周りにクリアカラーしかないシーンでは塗装に映り込むものがないため、ライトをどれだけ明るくしてもボディはほぼ黒く描画されます。物理ベースレンダリング（PBR）向けに作られたモデルの多くは映り込む環境を必要とし、金属は特にそれを必要とします。

それを供給するのが[`<pc-sky>`](tags/pc-sky.md)です。画像を指定して`lighting`を加えると、シーンはその画像によって映り込みも含めて照らされます。`type="none"`は画像を背景に出さないため、車の後ろに表示することなく車を照らします。

```html
<pc-asset id="chapel" src="assets/sepulchral-chapel-rotunda-4k.webp"></pc-asset>
<!-- ... -->
<pc-scene>
    <pc-sky asset="chapel" type="none" lighting></pc-sky>
    <!-- ... -->
</pc-scene>
```

両方を加えた車がライブで動いています。[読み込みとインスタンス化](#loading-and-instantiating)のマークアップに`<pc-wasm>`と`<pc-sky>`を加えたもので、ファイルはこのサイトから配信しています。

```html live-example
<pc-app>
    <pc-wasm name="DracoDecoderModule" glue="https://developer.playcanvas.com/assets/modules/draco/draco.wasm.js" wasm="https://developer.playcanvas.com/assets/modules/draco/draco.wasm.wasm"></pc-wasm>
    <pc-asset id="car" src="https://developer.playcanvas.com/assets/porsche-911-carrera-4s.glb"></pc-asset>
    <pc-asset id="chapel" src="https://developer.playcanvas.com/assets/sepulchral-chapel-rotunda-4k.webp"></pc-asset>
    <pc-scene>
        <pc-sky asset="chapel" type="none" lighting></pc-sky>
        <pc-entity name="camera" position="3.2 0.9 3.6" rotation="-12 42 0">
            <pc-camera clear-color="#dfe4ea"></pc-camera>
        </pc-entity>
        <pc-model asset="car"></pc-model>
    </pc-scene>
</pc-app>
```

次のような変更を試してみてください。

* `<pc-sky>`から`lighting`を削除して、塗装が暗くなる様子を見る。
* `type="none"`を削除して、車が映し込んでいる環境を表示する。
* `<pc-wasm>`を削除する。車は表示されず、コンソールは`draco.wasm.js`の取得失敗で埋まります。

## 読み込んだ内容を確認する {#seeing-what-you-loaded}

モデルファイルには厄介な真実があります。3Dツール上での名前が、エンジンに届く名前とは異なることが頻繁にあるのです。エクスポーターは名前を変更し、さらにエンジンのパーサーが階層を構築する際に、名前のないノードには名前を合成し、同名の兄弟には接尾辞を付けて区別します。

ですから推測しないでください。[`<pc-model>`](tags/pc-model.md)には実際に存在するとおりのツリーを報告する`hierarchy()`メソッドがあり、出力は1行で済みます。

```javascript
import { whenReady } from '@playcanvas/web-components';

const model = await whenReady('pc-model');
console.log(String(model.hierarchy()));
```

```none
Sketchfab_model
└─ Root
   ├─ window_rear
   │  └─ window_rear_0 (render) {window}
   ├─ windshield
   │  ├─ windshield_0 (render) {window}
   │  └─ windshield_1 (render) {plastic}
   ├─ Plane.002
   │  └─ Plane.002_0 (render) {paint}
   ├─ Plane.003
   │  └─ Plane.003_0 (render) {paint}
   ├─ Plane.004
   │  └─ Plane.004_0 (render) {paint}
   ├─ boot
   │  └─ boot_0 (render) {full_black}
   ├─ underbody
   │  └─ underbody_0 (render) {full_black}
   ├─ Cylinder.000
   │  ├─ Cylinder.000_0 (render) {silver}
   │  ├─ Cylinder.000_1 (render) {plastic}
   │  ├─ Cylinder.000_2 (render) {rubber}
   │  └─ Cylinder.000_3 (render) {Material.001}
   ├─ Plane
   │  └─ Plane_0 (render) {Material}
   ⋮
   ├─ bumper_front.004
   │  ├─ bumper_front.004_0 (render) {silver}
   │  ├─ bumper_front.004_1 (render) {lights}
   │  └─ bumper_front.004_2 (render) {plastic}
   ├─ bumper_front.007
   │  └─ bumper_front.007_0 (render) {glass}
   ⋮
   ├─ boot.005
   │  └─ boot.005_0 (render) {paint}
   ⋮
   ├─ boot.011
   │  ├─ boot.011_0 (render) {coat}
   │  └─ boot.011_01 (render) {coat}
   └─ Cube.002
      └─ Cube.002_0 (render) {full_black}
```

各`⋮`の箇所は省略しています（`Root`は実際には32個の子を持ちます）が、それ以外はそのままの出力です。

各行が1つのノードです。名前、括弧内の`(render)`やその他のコンポーネント、そして波括弧内にrenderコンポーネントのマテリアルが並びます。上の実際の出力を読むと、いくら推測しても分からなかったことがいくつも明らかになります。

* **ノード名には意味がありません。** `boot.011`、`Plane.002`、`Cylinder.000` — これがエクスポートの結果です。一方で*マテリアル*名には意味があります。`paint`、`glass`、`rubber`、`silver`、`window`、`lights`です。このモデルではマテリアルのほうが優れた指定手段であり、これはよくあることです。
* **renderコンポーネントは葉ノードにあります。** `windshield`自身はジオメトリを持たず、その子の`windshield_0`が持っています。マテリアルを変更したい`<pc-node>`は、分かりやすそうな親ではなく、`(render)`マーカーが付いているノードにバインドする必要があります。
* **`Cylinder.000`は一対のホイールです** — 1本の車軸の両側のホイールで、リム、プラスチック、タイヤ、ブレーキにそれぞれ子ノードが1つずつあります。
* **`boot.011_01`はエンジンが改名したものです。** このGLBには`boot.011_0`という名前の子が2つあり、同名の兄弟は階層構築時に接尾辞を付けて区別されます。

`hierarchy()`はプレーンなデータ — `name`、`path`、`index`、`components`、`materials`、`children` — を返すため、読むだけでなく検索することもできます。フィールドの完全なリファレンスは[階層の調査](tags/pc-model.md#inspecting-the-hierarchy)にあります。

```javascript
// 'paint'マテリアルで塗られたジオメトリを持つすべてのノード
const painted = [];
const walk = (node) => {
    if (node.materials.some(m => m.name === 'paint')) painted.push(node.name);
    node.children.forEach(walk);
};
walk(model.hierarchy());
console.log(painted); // ['Plane.002_0', 'Plane.003_0', 'Plane.004_0', ...]
```

## 読み込んだ内容を調整する {#adjusting-what-you-loaded}

[`<pc-node>`](tags/pc-node.md)は読み込まれた階層内のノードにバインドし、それに対するオーバーライドを宣言します。変更したい部分ごとに`<pc-model>`の内側にネストしてください。これは常に検索であって改名ではなく、省略した属性はモデルがオーサリングされたときの値を保持します。

### 部分を非表示にする {#hide-a-part}

Sketchfabのモデルにはベイクされた影用のプレーンが同梱されていることが日常的にあり、このモデルにはさらにアーティストのウォーターマークがそこにベイクされています。どちらも属性1つで消えます。

```html {2}
<pc-model asset="car">
    <pc-node name="Plane" enabled="false"></pc-node>
</pc-model>
```

`enabled="false"`はそのノードとその配下すべてを無効にします。ファイルを編集せずに不要なコンテンツを取り除く、宣言的な方法です。[部分のマテリアルを差し替える](#reskin-a-part)のライブサンプルでは、このプレーンを非表示にしています。

### 部分を再配置する {#re-pose-a-part}

`<pc-node>`の`position`・`rotation`・`scale`は、オーサリングされたトランスフォームに加算されるのではなく置き換えます。

```html
<pc-model asset="car">
    <!-- フロントフェンダーを1枚ボディから持ち上げます。回転とスケールはエクスポート時のままです -->
    <pc-node name="boot.005_0" position="0 0 0.5"></pc-node>
</pc-model>
```

思い描いた部分がどのノードなのかは`hierarchy()`に尋ねる問いです。このエクスポートでは、`boot.005_0`は`paint`マテリアルを持つノードの1つで、フロントフェンダーであることが分かります。

なぜ`0 0.5 0`ではなく`0 0 0.5`で持ち上がるのでしょうか。ノードのトランスフォームは親に対してローカルなので、その上にあるすべての回転を継承します。この車のルートノード`Sketchfab_model`は、Zアップのソースを立たせるためにX軸まわりに−90°回転しているため、その内側ではZが上、−Yが前を向きます。エクスポートされたモデルの多くが同じようなことをしているため、Yが上だと決めてかかる前に、部分がどちらへ動くかを確認してください。

これらは置き換えであるため、実行時に属性を削除する（または対応するJavaScriptプロパティに`null`を代入する）とオーサリングされた値が戻ります。2つの状態を切り替えるのに便利です。

### 部分のマテリアルを差し替える {#reskin-a-part}

`material-overrides`はセレクターを[`<pc-material>`](tags/pc-material.md)のidにマッピングします。`name:`セレクターを与えると、そのノード上でその名前のマテリアルを持つすべてのメッシュインスタンスを差し替えます。ここでは車をキャンディレッドに全塗装し、ベイクされたプレーンも非表示にしています。

```html live-example
<pc-app>
    <pc-wasm name="DracoDecoderModule" glue="https://developer.playcanvas.com/assets/modules/draco/draco.wasm.js" wasm="https://developer.playcanvas.com/assets/modules/draco/draco.wasm.wasm"></pc-wasm>
    <pc-asset id="car" src="https://developer.playcanvas.com/assets/porsche-911-carrera-4s.glb"></pc-asset>
    <pc-asset id="chapel" src="https://developer.playcanvas.com/assets/sepulchral-chapel-rotunda-4k.webp"></pc-asset>
    <pc-material id="candy-red" name="Candy Red" diffuse="#c8102e" metalness="1" roughness="0.25"></pc-material>
    <pc-scene>
        <pc-sky asset="chapel" type="none" lighting></pc-sky>
        <pc-entity name="camera" position="3.2 0.9 3.6" rotation="-12 42 0">
            <pc-camera clear-color="#dfe4ea"></pc-camera>
        </pc-entity>
        <pc-model asset="car">
            <pc-node name="Plane" enabled="false"></pc-node>
            <pc-node name="Plane.002_0" material-overrides='{"name:paint": "candy-red"}'></pc-node>
            <pc-node name="Plane.003_0" material-overrides='{"name:paint": "candy-red"}'></pc-node>
            <pc-node name="Plane.004_0" material-overrides='{"name:paint": "candy-red"}'></pc-node>
            <pc-node name="boot.001_0" material-overrides='{"name:paint": "candy-red"}'></pc-node>
            <pc-node name="boot.002_0" material-overrides='{"name:paint": "candy-red"}'></pc-node>
            <pc-node name="boot.005_0" material-overrides='{"name:paint": "candy-red"}'></pc-node>
            <pc-node name="boot.008_0" material-overrides='{"name:paint": "candy-red"}'></pc-node>
        </pc-model>
    </pc-scene>
</pc-app>
```

その形に注目してください。**塗装を持つノード1つごとに`<pc-node>`が1つ**必要です。`material-overrides`はそれが置かれたノードのrenderコンポーネントに適用され、このモデルでは`paint`マテリアルが7つの異なるノードに散らばっています。つまり全塗装には7つのバインディングが必要です。リストが分かっていれば（[読み込んだ内容を確認する](#seeing-what-you-loaded)の検索が教えてくれます）これで問題ありませんし、idによって複数のノードが1つのマテリアル宣言を共有できます。

次のような変更を試してみてください。

* `diffuse`の色を変える。または`roughness`を`0.6`に上げてサテン仕上げにする。
* `boot.005_0`のバインディングを削除する。そのフロントフェンダーは元の塗装のままになります。
* `boot.005_0`のバインディングに`position="0 0 0.5"`を加えて、フェンダーも持ち上げる。ノードをバインドできるのは1回だけなので、1つのノードに対するオーバーライドはすべてその1つの`<pc-node>`に書きます。

モデル全体を一度に処理したい場合や、仕上げの間をクロスフェードさせたい場合は、スクリプトの仕事になります。[Car Configuratorのサンプル](https://playcanvas.github.io/web-components/examples/#car-configurator.html)がそうしています。宣言的な方法は、事前に分かっている固定の部品セットのためのものです。

差し替え用の`<pc-material>`を後から識別したい場合は`name`を設定してください。これは`hierarchy()`が報告するラベルであり、名前のないマテリアルはそこで`Untitled`と表示されます。マルチマテリアルメッシュ向けの`index:`を含むセレクター文法の全体と、無効なルールがどう報告されるかは[マテリアルのオーバーライド](tags/pc-node.md#overriding-materials)にあります。

### 部分に何かをアタッチする {#attach-something-to-a-part}

`<pc-node>`は[`<pc-entity>`](tags/pc-entity.md)の子を持つことができ、それらは作成されてバインドされたノードの下に親子付けされます。これにより、どのノードもトランスフォームを継承するアタッチポイントになります。

```html
<pc-model asset="car">
    <pc-node name="bumper_front.004">
        <!-- 路面に向けて下げたヘッドライトの光 -->
        <pc-entity position="0 -2.96 0.05" rotation="10 0 0">
            <pc-light type="spot" color="#fff6e0" intensity="12" inner-cone-angle="20" outer-cone-angle="34"></pc-light>
        </pc-entity>
    </pc-node>
</pc-model>
```

子エンティティのトランスフォームはノードに対してローカルなので、その部分が動けば追従します。またノードの基準で表されるため、このエクスポートでは予想と違う結果になります。各部品ノードはジオメトリがその場にベイクされた状態でモデルの原点に置かれており、[部分を再配置する](#re-pose-a-part)で見たルートの回転した軸を継承しています。そのためライトの`position`は車の中央から測られ、−Yが前を向きます。`0 -2.96 0.05`はヘッドライトの位置です。ライトはエンティティの負のY軸方向を照らし、ここではそれがすでに前を向いているので、`rotation="10 0 0"`で光を路面に向けて下げています。アタッチしたものは理屈で導くよりも、見た目に合わせて調整することになります。

### 部分にコンポーネントを与える {#give-a-part-a-component}

`<pc-node>`は`<pc-entity>`と同じコンポーネントタグを取り、バインドされたノードにそのコンポーネントを追加します。よくあるのは物理です。メッシュコライダーはそのノード自身のrenderコンポーネントから形状を取るため、リジッドボディとコライダーを組み合わせればエクスポートされたジオメトリが固体になります。

```html
<pc-model asset="car">
    <pc-node name="underbody_0">
        <pc-rigid-body type="static"></pc-rigid-body>
        <pc-collision type="mesh"></pc-collision>
    </pc-node>
</pc-model>
```

物理にはDracoと同じ方法で宣言する`Ammo`モジュールが必要です。[`<pc-wasm>`](tags/pc-wasm.md)を参照してください。ノードがすでに持っているコンポーネントは二重に追加されません。ジオメトリを描画しているノード上の`<pc-render>`は警告を出し、何もしません。

### 部分をインタラクティブにする {#make-a-part-interactive}

ノードをバインドすることがそれをピック対象にするため、ポインターイベントはどの`<pc-node>`でも利用できます。これがモデルの一部だけをクリック可能にし、残りを反応しないままにする方法です。

```html
<pc-model asset="car">
    <pc-node name="boot.005_0" onclick="this.setAttribute('position', '0 0 0.5')"></pc-node>
</pc-model>
```

インラインハンドラー内では`this`は`<pc-node>`要素です。`setAttribute`を経由することでマークアップとシーンの内容が一致し続けます。対応するJavaScriptプロパティは型付けされており、`position`と`rotation`は文字列ではなく`Vec3`を取るため、インラインハンドラーからは属性を、実際のスクリプトファイルからはプロパティを使うのが良いでしょう。

イベントとそのインライン属性形式は[`<pc-node>`のリファレンス](tags/pc-node.md#events)に一覧があります。

## アニメーション {#animation}

コンテナのアニメーションは、モデルの直下に置いた[`<pc-anim>`](tags/pc-anim.md)が再生します。空のまま置けば、コンテナが持つすべてのアニメーションを、それぞれのトラック名を名前として割り当て、最初のものを再生します。「ファイルに入っていたものを再生する」がタグ1つで済みます。このT-rexには歩行サイクルが入っています。

```html live-example
<pc-app>
    <pc-asset id="t-rex" src="https://developer.playcanvas.com/assets/t-rex.glb"></pc-asset>
    <pc-scene>
        <pc-entity name="camera" position="3 1.1 2.4" rotation="-10 55 0">
            <pc-camera clear-color="#dfe4ea"></pc-camera>
        </pc-entity>
        <pc-entity name="light" rotation="45 30 0">
            <pc-light intensity="1.5"></pc-light>
        </pc-entity>
        <pc-model asset="t-rex">
            <pc-anim></pc-anim>
        </pc-model>
    </pc-scene>
</pc-app>
```

ラッパーとなるエンティティは必要ありません。`<pc-model>`はそれ自体がエンティティのホストなので、その内側に置いたコンポーネントは[`<pc-entity>`](tags/pc-entity.md)に取り付けるのと同じように、モデルに取り付けられます。つまりモデルは自身の名前・トランスフォーム・ポインタハンドラを持てて、コンテンツと並べて子エンティティをホストすることもできます。

どのアニメーションがエクスポートを通過したかを確認するには、コンポーネントに尋ねます。

```javascript
const anim = await whenReady('pc-anim');
console.log(anim.clips); // ['Animation']
```

トラック名は確認しておく価値があります。エンジンはクリップ名の`.`をブレンドツリーのパス用に予約しているからです。空の`<pc-anim>`は名前に`.`を含むトラックをスキップし、そのことをコンソールに出力します。これに引っかかる実際のファイルは少なくありません。Web Componentsのサンプルのモデルにある歩くロボットのトラックは1つだけで、その名前は`Armature|mixamo.com|Layer0`です。Mixamoのアニメーションは通常この名前で届きます。

クリップを自分で宣言すれば、これを回避できます。[`<pc-anim-clip>`](tags/pc-anim-clip.md)は宣言したクリップに名前を付け、トラックを1つしか持たないファイルは、どんな名前を選んでもそのトラックを供給します。

```html
<pc-model asset="robot">
    <pc-anim>
        <pc-anim-clip name="walk"></pc-anim-clip>
    </pc-anim>
</pc-model>
```

宣言したクリップには、クリップごとの速度とループも設定でき、他のファイルのクリップを混ぜるのもここです。複数のトラックを持つファイルでは、各クリップの`name`が大文字・小文字も含めてトラック名と正確に一致している必要があります。

```html
<pc-model asset="hero">
    <pc-anim clip="Idle" transition-time="0.3">
        <pc-anim-clip name="Idle"></pc-anim-clip>
        <pc-anim-clip name="Run" speed="1.2"></pc-anim-clip>
        <pc-anim-clip name="wave" asset="wave-glb" loop="false"></pc-anim-clip>
    </pc-anim>
</pc-model>
```

この例では`Idle`と`Run`はheroのGLB自身から、`wave`は並べて宣言した、トラックが1つだけの`wave-glb`アセットから取得します。あとは`clip`を設定すればクリップが切り替わり、`transition-time`にわたってクロスフェードします。

```javascript
document.querySelector('pc-anim').setAttribute('clip', 'Run');
```

トラックは**名前によって**ノードにバインドされます。別ファイルのクリップが、ノード名の一致するモデルしかアニメーションさせられないのはこのためであり、剛体パーツだけの単純な階層がスキン付きのスケルトンと同じようにアニメーションするのもこのためです。クロスフェード、一時停止、そしてエンジンがクリップの再生完了を通知しないことを含む全体像は、[`<pc-anim>`](tags/pc-anim.md)を参照してください。

## トラブルシューティング {#troubleshooting}

**何も表示されず、コンソールにDracoまたはBasisが出てくる。** モデルが圧縮されており、デコーダーモジュールがありません。[圧縮されたメッシュ](#compressed-meshes)を参照してください。

**何も表示されず、警告もまったく出ない。** モデルのスケールと原点を確認してください。センチメートル単位でエクスポートされたモデルは100倍の大きさで届き、原点がジオメトリから遠く離れたモデルはカメラの視野の外に完全に収まってしまうことがあります。

**モデルは表示されるが、黒い、または3Dツールで見るよりずっと暗い。** マテリアルに映り込む環境がありません。金属では特に必要です。`lighting`を付けた`<pc-sky>`でシーンを照らしてください。[モデルを照らす](#lighting-the-model)を参照してください。

**`<pc-node>`が名前が曖昧だと警告する。** 2つ以上のノードがその名前を共有しているため、要素は推測を拒否します。警告に候補が列挙されるので、`index`で1つを選んでください。

**`<pc-node>`が名前が何にも一致しないと警告する。** 書いた名前との違いが2文字以内のノード名があれば、警告がそれを提案するため、通常はそれでタイプミスに気づけます。そうでない場合は`hierarchy()`を出力してください。求めている名前がエクスポート時に変更されているかもしれません。

**`material-overrides`がノードにオーサリングされたrenderコンポーネントがないと言う。** ジオメトリを持つ葉ノードではなく、グループ化用のノードにバインドしています。`hierarchy()`の出力で`(render)`マーカーを探してください。

**マテリアル名が`Untitled`または`defaultGlbMaterial`と表示される。** これらは、名前のないglTFマテリアルと、マテリアルなしでエクスポートされたプリミティブに対するエンジンのデフォルトです。どちらも一意な指定手段ではないため、そうしたものは`index:`で選択してください。名前が`-flatShaded`で終わるものは、法線なしでエクスポートされたプリミティブのためにエンジンが作ったコピーで、`name:`セレクターにはこの接尾辞も含める必要があります。

**モデルは読み込まれるが何もアニメーションしない。** [アニメーション](#animation)で説明したとおり、モデルは内側の[`<pc-anim>`](tags/pc-anim.md)が指示するまで何も再生しません。それが置かれているなら`anim.clips`とコンソールを確認してください。モデルにアニメーションがないという警告とともに空のリストが返る場合、アニメーションはエクスポートを通過していません。トラックがスキップされたという警告は、その名前に`.`が含まれていることを意味します。`<pc-anim-clip>`でクリップを宣言し、自分で名前を付けてください。

**別ファイルのクリップが何もアニメーションさせない。** そのトラックは名前によってバインドされるため、クリップとモデルでノード名が一致している必要があります。モデルの`hierarchy()`を出力して見比べてください。

## 次のステップ {#next-steps}

* [`<pc-model>`](tags/pc-model.md)と[`<pc-node>`](tags/pc-node.md) — 両タグの完全な属性・メソッドリファレンス。
* [`<pc-anim>`](tags/pc-anim.md)と[`<pc-anim-clip>`](tags/pc-anim-clip.md) — クリップライブラリ、クロスフェード、再生の制御。
* [`<pc-sky>`](tags/pc-sky.md) — シーンを照らし、取り囲む環境。
* [スクリプトによる振る舞いの追加](scripting.md) — モデル全体のマテリアルを一括処理するなど、マークアップでは収まらないロジック向け。
* [プログラムによるアクセス](programmatic-access.md) — これらの要素の背後にあるエンジンオブジェクトへの到達方法。
* [サンプル](https://playcanvas.github.io/web-components/examples/) — [GLB Loader](https://playcanvas.github.io/web-components/examples/#glb-loader.html)、[GLB Animation](https://playcanvas.github.io/web-components/examples/#glb-animation.html)、[Robot Arm](https://playcanvas.github.io/web-components/examples/#robot-arm.html)、[Car Configurator](https://playcanvas.github.io/web-components/examples/#car-configurator.html)をご覧ください。
