---
title: <pc-node>
description: "pc-node要素のリファレンス: 読み込まれたモデルの階層内のノードにバインドし、そのトランスフォーム・有効状態・タグをオーバーライドしたり、コンポーネントを追加したり、新しいコンテンツをアタッチします。"
---

`<pc-node>`タグは、[`<pc-model>`](../pc-model)がインスタンス化した階層内のノードにバインドし、それに対するオーバーライドを宣言します。GLBを編集することなく、GLBがオーサリングされた内容を調整するための手段です。ノードを非表示にする、移動する、コンポーネントを与える、その下に新しいコンテンツを親子付けする、といったことができます。

[`<pc-entity>`](../pc-entity)がエンティティを*作成する*のに対し、`<pc-node>`はモデルがすでに作成したエンティティを*参照します*。その`name`は常に検索キーであり、名前の変更ではありません。

よくある調整 — 非表示、再配置、マテリアルの差し替え、コンテンツのアタッチ、コンポーネントの追加 — の実例は[モデルの読み込み](../loading-models.md#adjusting-what-you-loaded)を参照してください。

:::note[使用法]

* [`<pc-model>`](../pc-model)の子孫である必要があります。直接の子か、別の`<pc-node>`の内側にネストされている必要があります。
* 0からn個のネストされた[`<pc-node>`](../pc-node)の子を持つことができます。それらは自身の`name`を、バインドされたノードのサブツリー内で解決します。
* 0からn個の[`<pc-entity>`](../pc-entity)の子を持つことができます。それらは作成され、バインドされたノードの下に親子付けされます — 新しいコンテンツのアタッチポイントです。
* [`<pc-entity>`](../pc-entity)と同じコンポーネントタグ — [`<pc-collision>`](../pc-collision)、[`<pc-light>`](../pc-light)、[`<pc-scripts>`](../pc-scripts)など — を持つことができます。それらはバインドされたノードにそのコンポーネントを追加します。

:::

## 属性

<div className="attribute-table">

| 属性 | タイプ | デフォルト | 説明 |
| --- | --- | --- | --- |
| `enabled` | Boolean | *オーサリング値* | ノードの有効状態をオーバーライドします |
| `index` | Number | - | `name`が複数のノードに一致する場合にバインドする一致項目。深さ優先順で0から始まります。名前が曖昧な場合は必須で、それ以外の場合は省略可能です |
| `material-overrides` | String | *オーサリング値* | バインドされたノードのrenderコンポーネントのマテリアル割り当てをオーバーライドします。セレクターを`<pc-material>`のidにマッピングするJSONオブジェクトです。[マテリアルのオーバーライド](#overriding-materials)を参照してください |
| `name` | String | - | バインドするノードの名前。囲んでいる`<pc-model>`（または`<pc-node>`）内で検索されます |
| `position` | Vector3 | *オーサリング値* | ノードのローカル位置を「X Y Z」値でオーバーライドします |
| `rotation` | Vector3 | *オーサリング値* | ノードのローカル回転を度単位の「X Y Z」オイラー角でオーバーライドします |
| `scale` | Vector3 | *オーサリング値* | ノードのローカルスケールを「X Y Z」値でオーバーライドします |
| `tags` | String | *オーサリング値* | ノードのタグをオーバーライドします。スペースまたはカンマで区切ります |

</div>

:::note[デフォルトではなくオーバーライド]

`name`と`index`を除くすべては*オーバーライド*であるため、`<pc-node>`は存在しない属性を他のどのタグとも異なる形で解釈します。存在する属性はオーサリング値を置き換え、存在しない属性はそれをそのまま残します。実行時に属性を削除する（または対応するJavaScriptプロパティに`null`を代入する）と、エンジンのデフォルト値ではなく、モデルがオーサリングされた値が復元されます。上の表に具体的なデフォルト値がないのはこのためです。デフォルト値*とは*、GLBが持つ値そのものです。

オーバーライドはオーサリング値を置き換えるものであり、それと合成されるわけではありません。`position="0 1 0"`は、エクスポート時の値が何であれ、ノードをローカルYの1に配置します。

:::

## ノードの検索

`name`は読み込まれた階層内のノード名に対して照合し、深さ優先順で最初に一致したものを採用します。`<pc-node>`を別の`<pc-node>`の内側にネストすると、内側の検索は外側のノードのサブツリーに限定されます。名前がローカルにしか一意でないノードに到達する、最も簡単な方法です。

検索範囲内で名前が一意でない場合、要素は何もバインドせず、すべての候補のパスを示す警告を出力します。これにより`index`で1つを選択できます。

```none
pc-node 'Wheel' is ambiguous in model 'car' - specify index: [0] Body/Wheel_FL/Wheel, [1] Body/Wheel_FR/Wheel
```

何もバインドしないのは意図的な設計です。推測すれば誤ったノードを黙って装飾してしまい、再エクスポートによって名前の重複が生じた際に、これまで動作していたドキュメントが壊れてしまいます。

その他の解決失敗も同じように警告します。何にも一致しない名前（タイプミスのヒントとして、見つかった中で最も近い名前を添えます）、一致数を超える`index`、そして別の`<pc-node>`がすでにバインドしているノードです。いずれの場合も要素は何もバインドせず、readyになることはありません。

要素はバインドされて初めてreadyになり、その子孫も一緒に待機します。モデルが再読み込みされた場合、または`name`を変更して要素のターゲットが変わった場合、要素は再解決し、オーバーライド・コンポーネント・アタッチされたコンテンツを新しいノードに対して再適用します。

## マテリアルのオーバーライド {#overriding-materials}

`material-overrides`は、GLBを編集することなくモデルの一部を再スキンします。その値はセレクターを[`<pc-material>`](../pc-material)のidにマッピングするJSONオブジェクトなので、シングルクォートで囲んでください。ダブルクォートはJSON自身が必要とします。

```html
<pc-model asset="car">
    <pc-node name="Body" material-overrides='{"name:CarPaint": "candy-red", "index:3": "smoked-glass"}'></pc-node>
</pc-model>
```

どちらのセレクターも、バインドされたノードのrenderコンポーネントのメッシュインスタンスを指定します。

| セレクター | 選択対象 |
| --- | --- |
| `name:X` | マテリアルの名前が`X`であるすべてのメッシュインスタンス |
| `index:N` | メッシュインスタンス`N`。renderコンポーネントが列挙する順に0から数えます |

このマッピングは疎です。どのルールにも一致しなかった割り当ては、モデルがオーサリングされたときのマテリアルをそのまま保持します。同じメッシュインスタンスを両方の種類のルールが対象とする場合は`index:`が優先されます。そのため、あるマテリアルを名前で出現箇所すべてまとめて差し替えたうえで、1つだけの例外をindexで指定するという書き方ができます。

ノードが提供する名前とindexを調べるには、[`<pc-model>`の`hierarchy()`](../pc-model#inspecting-the-hierarchy)を使用します。マテリアル名は一意な識別子ではなく実行時のラベルです。glTFは重複を許容し、名前のないマテリアルは`Untitled`と呼ばれ、マテリアルなしでオーサリングされたプリミティブにはエンジンが共有する`defaultGlbMaterial`が与えられます。したがって、名前が一意でない場合は`index:`を使用してください。

名前は、マッピングが最初に適用された時点で取り込まれた割り当てに対して照合されます。そのため、別のルールが差し込んだマテリアルにルールが一致することはなく、後からマテリアルをリネームしても選択対象は変わりません。属性を削除すると、取り込まれたすべての割り当てが元に戻ります。`materialOverrides`プロパティに`null`を代入した場合や、空の`{}`を設定した場合も同様です。

対象となるのは、モデルがオーサリングされたときのrenderコンポーネントです。renderコンポーネントを持たないノードにバインドされた`<pc-node>`は警告を出力し、何も変更しません。また、子の[`<pc-render>`](../pc-render)が追加したrenderコンポーネントが対象になることはありません。

ルールは1つずつ検証され、無効なルールは無視されますが、マッピングの残りは適用されます。次のそれぞれが警告を出力します。どちらのプレフィックスも持たないセレクター、非負整数でない`index:`、最後のメッシュインスタンスを超えたindex、どの割り当てにも一致しない名前（警告には実際に存在する名前が列挙されます）、そして`<pc-material>`に解決できないid。値がまったくJSONオブジェクトでない場合 — 不正なJSONや配列 — は警告を出力して不在として扱い、直前のマッピングを有効なまま残すのではなく、取り込まれた割り当てを復元します。

マッピングが参照した*後*にドキュメントへ追加された`<pc-material>`は、自動的に取り込まれません。要素が存在する状態でマッピングを再度代入すれば、そのルールは解決されます。

## イベント {#events}

`<pc-node>`は[`<pc-entity>`](../pc-entity)と同じポインターイベントをディスパッチします。ポインターがバインドされたノードのジオメトリと交差したときに発生します。ノードをバインドすることがそれをピック対象にするため、`<pc-node>`はモデルの一部をインタラクティブにする手段でもあります。

| イベント | 説明 |
| --- | --- |
| `pointerdown` | ポインターがノード上で押下されたときに発生します。 |
| `pointerenter` | ポインターがノードに入ったときに発生します。 |
| `pointerleave` | ポインターがノードを離れたときに発生します。 |
| `pointermove` | ポインターがノード上で移動したときに発生します。 |
| `pointerup` | ポインターがノードから解放されたときに発生します。 |

インラインの`onpointer*`属性は、[`<pc-entity>`](../pc-entity)とまったく同じように動作します。

## 例

このGLBは2つのノードをインスタンス化します — `play` (オレンジ色のシェルで、各面からロゴがくり抜かれています) と `canvas` (くり抜きから見える内側の暗いボックス) です。これを発見する方法が [`hierarchy()`](../pc-model#inspecting-the-hierarchy) です。`<pc-node>` は `play` にバインドし、`material-overrides` でオーサリングされたオレンジを青に差し替えます。代わりに `canvas` にバインドしたり、`enabled="false"` を追加してシェルごと非表示にしたりしてみましょう。ドラッグで軌道回転できます:

```html live-example
<pc-app>
    <pc-asset src="https://cdn.jsdelivr.net/npm/playcanvas@2.21.4/scripts/esm/camera-controls.mjs"></pc-asset>
    <pc-asset src="https://developer.playcanvas.com/assets/playcanvas-cube.glb" id="cube"></pc-asset>
    <pc-material id="repaint" name="Repaint" diffuse="#4a9eff"></pc-material>
    <pc-scene>
        <pc-entity name="camera" position="0 0 3">
            <pc-camera clear-color="#1d1f2b"></pc-camera>
            <pc-scripts>
                <pc-script name="cameraControls" enable-pan="false" zoom-range="1.5 6"></pc-script>
            </pc-scripts>
        </pc-entity>
        <pc-entity name="light" rotation="45 30 0">
            <pc-light intensity="2"></pc-light>
        </pc-entity>
        <pc-model asset="cube">
            <!-- "play" という名前のノードにバインドし、repaintマテリアルを差し替えます -->
            <pc-node name="play" material-overrides='{"index:0": "repaint"}'></pc-node>
        </pc-model>
    </pc-scene>
</pc-app>
```

## JavaScriptインターフェース

[NodeElement API](https://api.playcanvas.com/web-components/classes/NodeElement.html)を使用して、`<pc-node>`要素をプログラムで作成および操作できます。

バインドしたノードを返す`entity`に加えて、この要素は解決の結果を報告します。`state`は、バインドするものがまだない間（`name`が未設定、またはモデルがインスタンス化されていない）は`"pending"`、バインドされると`"bound"`、解決が失敗した場合は`"missing"`、`"ambiguous"`、`"duplicate"`のいずれかになります。`path`は検索範囲以下のバインドされたノードの`/`区切りのパスで、バインドされていない間は`null`です。これらを組み合わせることで、コンソールを読む代わりに、ドキュメントのバインディングをプログラムで検証できます。

```javascript
import { whenReady } from '@playcanvas/web-components';

const node = await whenReady('pc-node[name="Roof"]');
console.log(node.state, node.path); // 'bound' 'Body/Roof'
```

`materialOverrides`プロパティは、[マテリアルのオーバーライド](#overriding-materials)で説明したマッピングを、JSON文字列ではなくオブジェクトとして扱うものです。

```javascript
const body = await whenReady('pc-node[name="Body"]');
body.materialOverrides = { 'name:CarPaint': 'candy-red' };
body.materialOverrides = null; // オーサリングされたマテリアルに戻します
```

要素は代入された内容を凍結してコピーして保持するため、後からご自身のオブジェクトを変更しても何も起こりません。変更するには新しいマッピングを代入してください。プロパティへの書き込みは`material-overrides`属性に反映されません。これは他のオーバーライドプロパティの動作に従っています。
