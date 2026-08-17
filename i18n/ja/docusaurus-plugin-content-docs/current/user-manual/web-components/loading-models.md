---
title: モデルの読み込み
description: "pc-assetとpc-modelでglTF・GLBモデルを読み込み、hierarchy()で階層を調べ、pc-nodeでアーティストがエクスポートした内容を非表示にしたり、再配置したり、マテリアルを差し替えたり、拡張します。"
---

[シーンの構築](building-a-scene.md)ではすべてをプリミティブから作りました。実際のプロジェクトではモデルを読み込みます。このページはその周辺のワークフロー、つまりGLBをページに載せ、その中に実際に何が入っているかを知り、そして3Dツールを開くことなくそれを調整する方法を扱います。

このページ全体で使用するモデルは[Lionsharp Studios制作のPorsche 911 Carrera 4S](https://sketchfab.com/3d-models/free-porsche-911-carrera-4s-d01b254483794de3819786d93e0e1ebf)（CC BY 4.0）で、[Car Configuratorのサンプル](https://playcanvas.github.io/web-components/examples/car-configurator.html)で使われているのと同じアセットです。欠点も含めてごく普通のSketchfabのダウンロード品ですが、それこそが要点になります。

## エクスポート時に気をつけること {#what-to-export}

glTFのどちらの形式でも動作します。`.gltf`（JSONで、テクスチャとジオメトリが別ファイル）と`.glb`（すべてが1つのバイナリファイル）です。Webでは`.glb`を推奨します。リクエストが1回で済み、相対パスが壊れることもありません。

エクスポート時に気にかける価値があるのは2つです。これらは後で使う語彙そのものになるためです。

* **ノード名。** [`<pc-node>`](tags/pc-node.md)はモデルの部分を名前で検索します。エクスポーターが`Object_12`を出力したなら、それを入力することになります。
* **マテリアル名。** マテリアルを差し替える際の指定手段であり、ノード名が意味を失っていても意味を保っていることが多くあります。

どちらも失敗しても致命的ではありません。後述の`hierarchy()`が実際に何が得られたかを教えてくれます。ただし、Blenderで名前を整える数分は、それ以上の時間を後で節約します。

## 読み込みとインスタンス化 {#loading-and-instantiating}

読み込みには2つのタグが必要です。[`<pc-asset>`](tags/pc-asset.md)がファイルを宣言し、[`<pc-model>`](tags/pc-model.md)がそれをシーンにインスタンス化します。

```html
<pc-app>
    <pc-asset id="car" type="container" src="assets/porsche-911-carrera-4s.glb"></pc-asset>
    <pc-scene>
        <pc-entity name="camera" position="3.4 1 3.8" rotation="-10 42 0">
            <pc-camera clear-color="#dfe4ea"></pc-camera>
        </pc-entity>
        <pc-entity name="light" rotation="52 30 0">
            <pc-light type="directional" cast-shadows></pc-light>
        </pc-entity>
        <pc-model asset="car"></pc-model>
    </pc-scene>
</pc-app>
```

![斜め前方から見たシルバーのPorsche 911](/img/user-manual/web-components/loading-models/car-loaded.jpg)

`type="container"`は重要です。GLBは*コンテナ*アセットであり、メッシュ・マテリアル・テクスチャ・スキン・アニメーションをまとめて保持します。`<pc-model>`はそのコンテナから階層をインスタンス化します。別の型のアセットを指定すると、丁寧なメッセージではなくインスタンス化の時点で失敗するため、正しく指定する価値があります。それ以外の点で`<pc-model>`は[`<pc-entity>`](tags/pc-entity.md)と同じように振る舞うため、`position`・`rotation`・`scale`を取り、別のエンティティの内側にネストすることもできます。

モデルは階層がシーンに入った時点でready状態になり、`load`を発生させます。読み込みが失敗した場合もentityが`null`のままreadyは確定し、[`error`イベント](tags/pc-model.md#events)を発生させます。ファイルが届かない可能性がある場合はこちらをリッスンしてください。

```javascript
document.querySelector('pc-model').addEventListener('error', (event) => {
    console.warn(`the model did not load: ${event.message}`);
});
```

:::note[モデルの原点はアーティストが残したままです]

モデルのピボットやスケールを正規化する仕組みはありません。この車の原点はボディの中央にあるため、ホイールはy=0より*下*にあり、原点に置いた地面プレーンをすり抜けて沈みます。`<pc-model>`に`position`を設定して持ち上げるか、地面を動かしてください。ただしこれは規約を前提にできるものではなく、アセットごとに対応することになります。

:::

### 圧縮されたメッシュ {#compressed-meshes}

アセットサイトのモデルはほとんどがDraco圧縮されており、このモデルもそうです。DracoにはWebAssemblyデコーダーが必要で、`<pc-app>`の子として[`<pc-module>`](tags/pc-module.md)で宣言します。

```html
<pc-module name="DracoDecoderModule"
           glue="modules/draco/draco.wasm.js"
           wasm="modules/draco/draco.wasm.wasm"
           fallback="modules/draco/draco.js"></pc-module>
```

この3つのファイルは[Draco](https://google.github.io/draco/)デコーダーのビルド — glueスクリプト、`.wasm`バイナリ、そしてWebAssemblyのないブラウザ向けの純JavaScriptフォールバック — です。エンジンのnpmパッケージには含まれていないため、自分で配信します。[Dracoのリリース](https://github.com/google/draco/releases)から取得するか、[Web Componentsのサンプル](https://github.com/playcanvas/web-components/tree/main/examples/modules/draco)に同梱されている一式をコピーし、置いた場所を属性で指定してください。

`<pc-app>`は配下に宣言されたすべてのモジュールを待ってから起動するため、シーンが動き出す時点でデコーダーは配置済みです。これがないとDraco圧縮モデルの読み込みは失敗し、コンソールにその旨が出力されます。

圧縮テクスチャのトランスコードに使う`Basis`も同じ仕組みで供給します。`KHR_texture_basisu`を使うモデルにはこれが必要です。

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
   ⋮
   ├─ boot.001
   │  └─ boot.001_0 (render) {paint}
   ⋮
   └─ boot.011
      ├─ boot.011_0 (render) {coat}
      └─ boot.011_01 (render) {coat}
```

`⋮`の箇所は省略しています（`Root`は実際には32個の子を持ちます）が、それ以外はそのままの出力であり、以下のレシピで使うノードはすべてこの中に含まれています。

各行が1つのノードです。名前、括弧内の`(render)`やその他のコンポーネント、そして波括弧内にrenderコンポーネントのマテリアルが並びます。上の実際の出力を読むと、いくら推測しても分からなかったことがいくつも明らかになります。

* **ノード名には意味がありません。** `boot.011`、`Plane.002`、`Cylinder.000` — これがエクスポートの結果です。一方で*マテリアル*名には意味があります。`paint`、`glass`、`rubber`、`silver`、`window`、`lights`です。このモデルではマテリアルのほうが優れた指定手段であり、これはよくあることです。
* **renderコンポーネントは葉ノードにあります。** `windshield`自身はジオメトリを持たず、その子の`windshield_0`が持っています。マテリアルを変更したい`<pc-node>`は、分かりやすそうな親ではなく、`(render)`マーカーが付いているノードにバインドする必要があります。
* **`Cylinder.000`はホイールです** — リム、プラスチック、タイヤ、ブレーキに対応する4つの子ノードを持ちます。
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

![ベイクされた地面プレーンとウォーターマークを取り除いた同じPorsche](/img/user-manual/web-components/loading-models/car-plane-hidden.jpg)

`enabled="false"`はそのノードとその配下すべてを無効にします。ファイルを編集せずに不要なコンテンツを取り除く、宣言的な方法です。

### 部分を再配置する {#re-pose-a-part}

`<pc-node>`の`position`・`rotation`・`scale`は、オーサリングされたトランスフォームに加算されるのではなく置き換えます。

```html
<pc-model asset="car">
    <!-- 塗装されたボディパネルを1枚だけ持ち上げます。回転とスケールはエクスポート時のままです -->
    <pc-node name="boot.001_0" position="0 0.4 0"></pc-node>
</pc-model>
```

思い描いた部分がどのノードなのかは`hierarchy()`に尋ねる問いです。このエクスポートでは、`boot.001_0`は`paint`マテリアルを持つノードの1つに過ぎません。

これらは置き換えであるため、実行時に属性を削除する（または対応するJavaScriptプロパティに`null`を代入する）とオーサリングされた値が戻ります。2つの状態を切り替えるのに便利です。

### 部分のマテリアルを差し替える {#reskin-a-part}

`material-overrides`はセレクターを[`<pc-material>`](tags/pc-material.md)のidにマッピングします。`name:`セレクターを与えると、そのノード上でその名前のマテリアルを持つすべてのメッシュインスタンスを差し替えます。

```html {2,5-7}
<pc-app>
    <pc-material id="candy-red" name="Candy Red" diffuse="#c8102e" metalness="1" roughness="0.25"></pc-material>
    <pc-scene>
        <pc-model asset="car">
            <pc-node name="Plane" enabled="false"></pc-node>
            <pc-node name="Plane.002_0" material-overrides='{"name:paint": "candy-red"}'></pc-node>
            <pc-node name="boot.001_0" material-overrides='{"name:paint": "candy-red"}'></pc-node>
        </pc-model>
    </pc-scene>
</pc-app>
```

![キャンディレッドに塗り替えられたPorsche](/img/user-manual/web-components/loading-models/car-repainted.jpg)

その形に注目してください。**塗装を持つノード1つごとに`<pc-node>`が1つ**必要です。`material-overrides`はそれが置かれたノードのrenderコンポーネントに適用され、このモデルでは`paint`マテリアルが7つの異なるノードに散らばっています。つまり全塗装には7つのバインディングが必要です。リストが分かっていれば（上の`hierarchy()`が教えてくれました）これで問題ありませんし、idによって複数のノードが1つのマテリアル宣言を共有できます。

モデル全体を一度に処理したい場合や、仕上げの間をクロスフェードさせたい場合は、スクリプトの仕事になります。[Car Configuratorのサンプル](https://playcanvas.github.io/web-components/examples/car-configurator.html)がそうしています。宣言的な方法は、事前に分かっている固定の部品セットのためのものです。

差し替え用の`<pc-material>`を後から識別したい場合は`name`を設定してください。これは`hierarchy()`が報告するラベルであり、名前のないマテリアルはそこで`Untitled`と表示されます。マルチマテリアルメッシュ向けの`index:`を含むセレクター文法の全体と、無効なルールがどう報告されるかは[マテリアルのオーバーライド](tags/pc-node.md#overriding-materials)にあります。

### 部分に何かをアタッチする {#attach-something-to-a-part}

`<pc-node>`は[`<pc-entity>`](tags/pc-entity.md)の子を持つことができ、それらは作成されてバインドされたノードの下に親子付けされます。これにより、どのノードもトランスフォームを継承するアタッチポイントになります。

```html
<pc-model asset="car">
    <pc-node name="bumper_front.004">
        <pc-entity position="0 0 0.3">
            <pc-light type="spot" color="#fff6e0" intensity="12" outer-cone-angle="34"></pc-light>
        </pc-entity>
    </pc-node>
</pc-model>
```

子エンティティのトランスフォームはノードに対してローカルなので、その部分が動けば追従します。ライトはエンティティの負のY軸方向に照らすこと、そしてglTF階層の深くにあるノードは通常、継承された回転を持つことに注意してください。子の`rotation`は理屈で導くよりも、見た目に合わせて調整することになります。

### 部分にコンポーネントを与える {#give-a-part-a-component}

`<pc-node>`は`<pc-entity>`と同じコンポーネントタグを取り、バインドされたノードにそのコンポーネントを追加します。よくあるのは物理です。メッシュコライダーはそのノード自身のrenderコンポーネントから形状を取るため、リジッドボディとコライダーを組み合わせればエクスポートされたジオメトリが固体になります。

```html
<pc-model asset="car">
    <pc-node name="underbody_0">
        <pc-rigidbody type="static"></pc-rigidbody>
        <pc-collision type="mesh"></pc-collision>
    </pc-node>
</pc-model>
```

物理にはDracoと同じ方法で宣言する`Ammo`モジュールが必要です。[`<pc-module>`](tags/pc-module.md)を参照してください。

### 部分をインタラクティブにする {#make-a-part-interactive}

ノードをバインドすることがそれをピック対象にするため、ポインターイベントはどの`<pc-node>`でも利用できます。これがモデルの一部だけをクリック可能にし、残りを反応しないままにする方法です。

```html
<pc-model asset="car">
    <pc-node name="boot.001_0" onpointerdown="this.setAttribute('position', '0 0.4 0')"></pc-node>
</pc-model>
```

インラインハンドラー内では`this`は`<pc-node>`要素です。`setAttribute`を経由することでマークアップとシーンの内容が一致し続けます。対応するJavaScriptプロパティは型付けされており、`position`と`rotation`は文字列ではなく`Vec3`を取るため、インラインハンドラーからは属性を、実際のスクリプトファイルからはプロパティを使うのが良いでしょう。

イベントとそのインライン属性形式は[`<pc-node>`のリファレンス](tags/pc-node.md#events)に一覧があります。

## アニメーション {#animation}

コンテナがアニメーションを保持している場合、`<pc-model>`はインスタンス化されたルートに`anim`コンポーネントを追加し、最初のアニメーションを再生します。これには属性がなく、有効にする操作も必要ありません。

```html
<pc-asset id="robot" type="container" src="assets/walking-robot.glb"></pc-asset>
<pc-scene>
    <pc-model asset="robot"></pc-model>
</pc-scene>
```

![歩行アニメーションが再生され、歩を進めている途中のロボットキャラクター](/img/user-manual/web-components/loading-models/robot-animation.jpg)

`hierarchy()`は追加されたコンポーネントを表示します。モデルのアニメーションがエクスポートを通過したかを確認する最も手早い方法です。

```none
Armature (anim)
├─ Alpha_Joints (render) {Alpha_Joints_MAT}
├─ Alpha_Surface (render) {Alpha_Body_MAT}
└─ mixamorig:Hips
   ⋮
```

割り当てられるのは*最初の*アニメーションだけで、マークアップから別のクリップを選んだり、一時停止したり、クリップ間をブレンドしたりする手段はありません。「ファイルに入っていたものを再生する」以上のことをするには、JavaScriptからコンポーネントに到達し、エンジンの[AnimComponent](https://api.playcanvas.com/engine/classes/AnimComponent.html) APIで制御してください。

```javascript
const { entity } = await whenReady('pc-model');
entity.anim.baseLayer.pause();
```

## トラブルシューティング {#troubleshooting}

**何も表示されず、コンソールにDracoまたはBasisが出てくる。** モデルが圧縮されており、デコーダーモジュールがありません。[圧縮されたメッシュ](#compressed-meshes)を参照してください。

**何も表示されず、警告もまったく出ない。** モデルのスケールと原点を確認してください。センチメートル単位でエクスポートされたモデルは100倍の大きさで届き、原点がジオメトリから遠く離れたモデルはカメラの視野の外に完全に収まってしまうことがあります。

**`<pc-node>`が名前が曖昧だと警告する。** 2つ以上のノードがその名前を共有しているため、要素は推測を拒否します。警告に候補が列挙されるので、`index`で1つを選んでください。

**`<pc-node>`が名前が何にも一致しないと警告する。** 警告には見つかった中で最も近い名前が含まれており、通常はそれでタイプミスに気づけます。そうでない場合は`hierarchy()`を出力してください。求めている名前がエクスポート時に変更されているかもしれません。

**`material-overrides`がノードにオーサリングされたrenderコンポーネントがないと言う。** ジオメトリを持つ葉ノードではなく、グループ化用のノードにバインドしています。`hierarchy()`の出力で`(render)`マーカーを探してください。

**マテリアル名が`Untitled`または`defaultGlbMaterial`と表示される。** これらは、名前のないglTFマテリアルと、マテリアルなしでエクスポートされたプリミティブに対するエンジンのデフォルトです。どちらも一意な指定手段ではないため、そうしたものは`index:`で選択してください。

## 次のステップ {#next-steps}

* [`<pc-model>`](tags/pc-model.md)と[`<pc-node>`](tags/pc-node.md) — 両タグの完全な属性・メソッドリファレンス。
* [スクリプトによる振る舞いの追加](scripting.md) — モデル全体のマテリアルを一括処理するなど、マークアップでは収まらないロジック向け。
* [プログラムによるアクセス](programmatic-access.md) — これらの要素の背後にあるエンジンオブジェクトへの到達方法。
* [サンプル](https://playcanvas.github.io/web-components/examples/) — [GLB Loader](https://playcanvas.github.io/web-components/examples/glb-loader.html)、[GLB Animation](https://playcanvas.github.io/web-components/examples/glb-animation.html)、[Car Configurator](https://playcanvas.github.io/web-components/examples/car-configurator.html)をご覧ください。
