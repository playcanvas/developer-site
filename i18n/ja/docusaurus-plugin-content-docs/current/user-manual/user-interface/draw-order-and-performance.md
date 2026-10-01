---
title: 描画順とパフォーマンス
description: インターフェースの描画の仕組み（UIレイヤーと、どのカメラが描画するか）、エレメント、スクリーン、パーティクルの順序、UIの上の3D、ポストプロセスとワールド空間UI、そしてバッチング、低コストなテキスト更新、レイアウト、フィルレート、カリングでインターフェースを高速に保つ方法。
---

このページでは、インターフェースがどのように描画されるか、そしてインターフェースを高速に保つ方法を説明します。内容はすべての環境に共通です。エンジン、エディター、React、Web Componentsは、いずれも同じ方法でインターフェースを描画します。

## UIの描画の仕組み {#how-ui-is-drawn}

イメージエレメントとテキストエレメントは、それぞれが1つのメッシュインスタンスで、別のレイヤーを選ばない限りUIレイヤーに置かれます。

- **UIレイヤーは最後に描画されます。** デフォルトのレイヤー順序では、World、Skybox、Immediateの各レイヤーの後に来るため、インターフェースはシーンの上に描画されます。
- **透明なオブジェクトだけを保持します。** UIレイヤーの不透明な部分はレイヤー順序に含まれていないため、ブレンドしないマテリアルがこのレイヤーに描画されることはありません。[カスタムマテリアル](/user-manual/user-interface/image-elements/#custom-materials)を参照してください。
- **距離ではなく、エレメントの描画順でソートされます。** 描画順はヒエラルキーに従います。[描画順](#draw-order)を参照してください。
- **エレメントは深度を書き込みません。** スクリーン空間のエレメントは深度テストも行わず、カメラのビュー全体の上に描画されます。ワールド空間のエレメントは、シーンに対して深度テストされます。
- **ポストプロセスは適用されません。** [CameraFrame](/user-manual/graphics/posteffects/cameraframe/)を使うカメラはエフェクトの後にUIレイヤーを描画するため、インターフェースにぼかし、ブルーム、トーンマッピングがかかることはありません。

## 描画順 {#draw-order}

スクリーンのエレメントは、ヒエラルキーの順に深さ優先で描画されます。親はその子より先に描画され、エンティティの子孫はすべて、そのエンティティの次の兄弟より先に描画されます。そのため、子は親の上に描画され、後の兄弟は、前の兄弟とヒエラルキーでその下にあるすべての上に描画されます。

![重なり合う3枚のカード。ヒエラルキーの先頭から順に青、オレンジ、緑で、それぞれが前のカードの上に描画されています。オレンジのカードの子である白いバッジは、オレンジのカードの上、緑のカードの下に描画されています](/img/user-manual/user-interface/draw-order-and-performance/draw-order.webp)

エレメントを最前面に出すには、そのエレメントを親の最後の子にします。

```javascript
// 次のフレーム以降、ウィンドウを兄弟の上に描画する
selectedWindow.reparent(selectedWindow.parent);
```

スクリーンのヒエラルキーが変わるたびに、次のフレームが描画される前に描画順が更新されます。各エレメントの`drawOrder`は描画順におけるそのエレメントの位置を保持し、その上位8ビットにはスクリーンの優先度が入ります。

Reactでは、新しい`<Entity>`は、JSX内のどこに書かれていても既存の兄弟の後に追加されます。リストの順序を保つ方法は、[レイアウトグループの作成](/user-manual/user-interface/layout-groups/#creating-a-layout-group)を参照してください。

### インターフェース内のパーティクル {#particles}

スクリーン空間のスクリーンのヒエラルキー内にあるパーティクルシステムは、スクリーン空間に設定され、UIレイヤー上にある場合、エレメントと一緒にヒエラルキーの順で描画されます。パーティクルシステムを追加した後は、スクリーンの`syncDrawOrder()`を呼び出してください。

```javascript
sparkles.addComponent('particlesystem', {
    screenSpace: true,
    layers: [app.scene.layers.getLayerByName('UI').id],
    numParticles: 50,
    lifetime: 1
});
screen.screen.syncDrawOrder();
```

<EngineExample id="user-interface/particle-system" title="Particle System" />

## 複数のスクリーンと優先度 {#multiple-screens}

スクリーン同士が重なる場合、どちらを上に描画するかは`priority`で決まります。0から127までの優先度が高いスクリーンは、優先度が低いスクリーンの上に描画され、そのエレメントが先に入力を受け取ります。優先度が同じスクリーンでは、それぞれのヒエラルキー内での位置に従ってエレメントが入り混じって描画されるため、重なるスクリーンには異なる優先度を与えてください。例えば、HUDには0、メニューには10、ダイアログには20を設定します。

```javascript
pauseMenu.screen.priority = 10;
```

Screenコンポーネントの**Priority**フィールドと、`<pc-screen>`の`priority`属性は、同じ値を設定します。

## レイヤーとカメラ {#layers-and-cameras}

UIレイヤーをレンダリングするカメラは、どれもスクリーン空間のスクリーンをすべて自身のビューの上に描画します。ミニマップやピクチャーインピクチャー表示用のカメラなど、2台目のカメラがあると、HUDが2回描画されます。UIレイヤーを描画すべきでないカメラからは、UIレイヤーを取り除いてください。

```javascript
const uiLayer = app.scene.layers.getLayerByName('UI');
minimapCamera.camera.layers = minimapCamera.camera.layers.filter(id => id !== uiLayer.id);
```

`rect`がキャンバスの一部だけを覆うカメラでは、スクリーン空間のスクリーンがその部分に押しつぶされます。スクリーン空間のスクリーンの解像度は、常にキャンバスのサイズだからです。

エレメントを別のレイヤーに移すには、`layers`に新しい配列を代入します。配列をその場で変更しても効果はありません。

### インターフェースの上の3D {#3d-over-ui}

3Dモデルをインターフェースの上に描画する方法は2つあります。1つは、イメージエレメントが表示するテクスチャにモデルをレンダリングする方法で、モデルはインターフェースの描画順とマスクに従います。[3Dをイメージにレンダリングする](/user-manual/user-interface/image-elements/#render-to-texture)を参照してください。もう1つは、深度バッファをクリアするレイヤーをUIレイヤーの後に用意してモデルをそこに置き、シーンにモデルが隠されないようにする方法です。

```javascript
const overUi = new pc.Layer({ name: 'Over UI', clearDepthBuffer: true });
app.scene.layers.push(overUi);
camera.camera.layers = [...camera.camera.layers, overUi.id];

trophy.render.layers = [overUi.id];
```

## ワールド空間UIとポストプロセス {#world-space-ui}

UIレイヤー上のワールド空間のエレメントは、シーンの後に描画され、シーンに対して深度テストされます。CameraFrameを使う場合、UIレイヤーはポストプロセスの後に、シーンの深度なしで描画されるため、ワールド空間のエレメントは壁越しに見えてしまい、エフェクトも適用されません。これらをシーンの一部として描画するには、Worldレイヤーの後に、**Manual**ソートの専用レイヤーを用意します。Worldレイヤー自体は透明なオブジェクトを距離でソートするため、スクリーンのエレメントの順序が乱れてしまいます。

```javascript
// ワールド空間UI用のレイヤー。シーンと一緒に、ヒエラルキーの順に描画される
const worldLayer = app.scene.layers.getLayerByName('World');
const worldUi = new pc.Layer({ name: 'World UI', transparentSortMode: pc.SORTMODE_MANUAL });
app.scene.layers.insertTransparent(worldUi, app.scene.layers.getTransparentIndex(worldLayer) + 1);
camera.camera.layers = [...camera.camera.layers, worldUi.id];

// ワールド空間のスクリーンのエレメントをこのレイヤーに移す
for (const node of sign.find(node => !!node.element)) {
    node.element.layers = [worldUi.id];
}
```

エディターでは、Settingsパネルの**LAYERS**セクションで、**Transparent Sort**を**Manual**にしたレイヤーを追加し、レンダー順序でその透明な部分をWorldの透明な部分より後にドラッグします。次に、そのレイヤーをカメラの**Layers**と、エレメントの**Layers**に追加します。

## ドローコールの削減 {#reducing-draw-calls}

イメージエレメントとテキストエレメントは、それぞれ1回のドローコールになります。バッチングは、バッチグループとマテリアルが共通で、同じレイヤー上にあるエレメントを、より少ないドローコールにまとめます。ルールについては[バッチング](/user-manual/graphics/advanced-rendering/batching/)を参照してください。

- **バッチグループ。** パネルやHUDのエレメントに同じバッチグループを設定します。コードでは`batchGroupId`、エディターではエレメントの**Batch Group**フィールドを使います。
- **テクスチャアトラス。** テクスチャが異なるイメージは、一緒にバッチングできません。代わりに、アイコンやパネルを1つの[テクスチャアトラス](/user-manual/2D/sprite-editor/)のスプライトとして描画します。
- **マスク。** マスク内のエレメントは、マスク外のエレメントとは別にバッチングされます。[マスク](/user-manual/user-interface/masks/#cost)を参照してください。
- **変化するエレメント。** バッチグループ内のエレメントのイメージやテキストのプロパティ（テキストや色など）をどれか変更すると、次のフレームでグループ全体が再構築されます。タイマーのように頻繁に変わるエレメントは、専用の小さなバッチグループに入れるか、バッチグループの外に置いてください。

## テキストの更新 {#updating-text}

テキストエレメントの`text`を設定すると、テキストがレイアウトされ、そのメッシュが再構築されます。少数のラベルなら低コストですが、毎フレーム変更するラベルが多いとコストが積み重なります。テキストは値が変わったときだけ設定してください。

```javascript
let shownScore = -1;
app.on('update', () => {
    if (score !== shownScore) {
        scoreLabel.element.text = String(score);
        shownScore = score;
    }
});
```

`rangeStart`と`rangeEnd`でテキストを徐々に表示する場合は、テキストがレイアウトし直されないため、`text`を変更するより低コストです。[テキストを徐々に表示する](/user-manual/user-interface/text-elements/#revealing-text)を参照してください。

## レイアウトのコスト {#layout-costs}

[レイアウトグループ](/user-manual/user-interface/layout-groups/)は、子のいずれかが追加、削除、有効化、無効化、またはサイズ変更されるたびに、子をレイアウトし直します。そのため、子のサイズを毎フレームアニメーションさせると、グループ全体が毎フレームレイアウトされます。アニメーションするエレメントはレイアウトグループの外に置くか、**Exclude from Layout**をオンにしたレイアウトチャイルドを追加してください。

## フィルレート {#fill-rate}

エレメントのピクセルは、透明なピクセルも含めてすべて描画され、ブレンドされます。全画面の背景幕、ビネット、パネルを重ねた場合のように、大きなイメージが重なると各ピクセルが何度も描画され、ピクセル比の高いモバイルデバイスで最もコストがかかります。大きな透明イメージの数は抑え、イメージは見える内容に合わせてトリミングしてください。レンダリングする解像度については[ピクセル比](/user-manual/user-interface/screens/#pixel-ratio)を参照してください。

## カリング {#culling}

スクリーン空間のスクリーンは`cull`プロパティがオンになっているため、カメラのビューの完全に外にあるエレメントの描画を省略します。マスク内のエレメントも、[スクロールビュー](/user-manual/user-interface/scroll-views/)のビューポートの外にスクロールされた長いリストの項目のように、マスクの完全に外にある場合は省略されます。`cull`はスクリーンの作成時に`screenSpace`から設定されるため、`addComponent`に渡しても効果はありません。作成後に設定してください。ワールド空間のスクリーン上のエレメントは、シーンの他の部分と同じように、カメラのビューに対してカリングされます。

## 関連情報 {#see-also}

- [スクリーン](/user-manual/user-interface/screens/) - スクリーン空間とワールド空間、解像度、優先度
- [ワールド空間UI](/user-manual/user-interface/world-space-ui/) - シーン内のインターフェース
- [バッチング](/user-manual/graphics/advanced-rendering/batching/) - バッチグループがドローコールをまとめる仕組み
- [レイヤー](/user-manual/graphics/layers/) - レイヤーと、その描画順
