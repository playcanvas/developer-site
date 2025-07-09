---
title: アニメーションステートグラフのブレンディング
tags: [animation,basics]
thumb: "https://s3-eu-west-1.amazonaws.com/images.playcanvas.com/projects/12/405874/A8B1FE-image-75.jpg"
---

<div className='iframe-container'>
    <iframe src="https://playcanv.as/p/HI8kniOx/" title="Anim State Graph Blending" allow="camera; microphone; xr-spatial-tracking; fullscreen" allowfullscreen></iframe>
</div>

:::info

スクリーンをクリックしてフォーカスを合わせ、'p' キーを押すとパンチアニメーションへブレンドされます。

:::

このチュートリアルでは、アニメーションブレンディングの基本を紹介します。

シーン内のオブジェクトはアニメーションできます。機械やキャラクターなどは、アニメーションさせたいものの良い例です。通常、3Dコンテンツを作成する際には、個々のアニメーションが作られ、これらはサイクルと呼ばれることがあります（なぜならループするからです）。例えば、人間のキャラクターにはアイドル、歩行、走行などのサイクルがあります。PlayCanvasの開発者としては、これらのアニメーションをオブジェクト上で再生する仕組みが必要です。また、アニメーションが切り替わる際に違和感がないようにしたいものです。そのため、アニメーションブレンディングを使用して、滑らかな遷移を実現します。これにより、アニメーションされたオブジェクトの見た目が大幅に向上します。
それでは、PlayCanvasでこれをどのように実現するか見ていきましょう...

## Animstategraphアセット

モデルにアニメーションを追加するためには、最初にanimstategraphアセットを作成する必要があります。このアセットは、1つのエンティティに関連付けられた複数のアニメーションを制御し、それぞれのアニメーションがいつ再生され、どのようにブレンドされるかを決定します。

animstategraphアセットを作成すると、エディタが表示されます。

![Initial Editor](/img/tutorials/anim_blending/initial_editor.png)

デフォルトでは、animstategraphアセットは ‘Initial State’ という名前の単一のアニメーション状態を作成し、開始状態からデフォルトのトランジションが作成されます。つまり、animstategraphが最初に再生されたときには、即座に「Initial State」が再生されます。この「Initial State」の名前を、このチュートリアルで使用される初期アニメーションである「Idle」に変更することができます。次に、キャンバス上で右クリックし、`Add new state`を選択して、グラフに別のアニメーション状態を作成することができます。この状態の名前は「Punch」と変更することができます。

![New State](/img/tutorials/anim_blending/new_state.gif)

次に、ステートグラフに、IdleとPunchのアニメーションステート間での移行方法とタイミングを指定する必要があります。これはトランジションを作成することで実現します。Idleアニメーションを右クリックし、コンテキストメニューから `Add transition` を選択し、次にPunchアニメーションステートを選択します。これにより、IdleステートからPunchステートへの移行するトランジションが作成されます。

![Add Transition](/img/tutorials/anim_blending/add_transition.gif)

このトランジションを選択すると、右側のパネルにトランジションインスペクターが表示されます。ここでは、トランジションの持続時間を設定することができます。これは、2つのアニメーション間のブレンドがどれくらいの時間続くかを決定します。この持続時間を0.2秒に設定します。

次に、このトランジションがどのタイミングで発動するかを決定するためのパラメータを設定します。まず、左側のパラメータパネルで `+ parameter` を選択します。次に、このパラメータの名前を `punch` とし、 ‘Boolean‘ タイプに設定します。

![Add Parameter](/img/tutorials/anim_blending/add_parameter.png)

今度は、作成したトランジションにこのパラメータを条件として設定することができます。まず、このトランジションを選択し、次にトランジションインスペクターで `New Condition` を選択します。

このトランジションを、新しく作成した `punch` パラメータに対してテストするように設定し、条件を以下のように ‘== true‘ と設定します。

![Add Condition](/img/tutorials/anim_blending/add_condition.png)

アイドル状態からパンチ状態への遷移は、パンチパラメータがtrueに設定された場合にのみ行われます。これにより、本当にパンチするときにのみ状態が変化することが確保されます。

最後に、PunchからIdleに戻るためのもう1つのトランジションを作成する必要があります。

![Complete State Graph](/img/tutorials/anim_blending/complete_state_graph.png)

ここでは、同じ持続時間を設定しましたが、その条件はパンチパラメータがtrueではなくなったかどうかをテストします。

この完全なanimstategraphを作成したら、アニメーションアセットと選択したエンティティに接続する必要があります。その際に、animコンポーネントが役立ちます。

## Animコンポーネント

最初に、選択したエンティティに animコンポーネントを追加する必要があります。

![New Anim Component](/img/tutorials/anim_blending/new_anim_component.png)

作成後、animコンポーネントには、先ほど作成したanimstategraphアセット用のスロットが表示されます。これをドラッグして入れると、それぞれのアニメーションステートに対応するアニメーションスロットが表示されます。この場合、IdleとPunchのステートに対応するスロットがあります。適切なアニメーションアセットでこれらのスロットを埋めると、animコンポーネントは再生可能になります。

![Complete Anim Component](/img/tutorials/anim_blending/complete_anim_component.png)

## キーボード入力

アニメーションが完全に設定されたら、ユーザーがシステムと対話できるようにする必要があります。そのためには、スクリプトが必要です！この動作を有効にするには、スクリプトコンポーネントが必要であり、それは `keyboard_controls.js` という名前のスクリプトに記述されます。以下では、それがエンティティにどのように添付されるかをご覧いただけます。

![Keyboard Input](/img/tutorials/anim_blending/keyboard_input.png)

以前に設定した `punch` というパラメータを覚えていますか？このスクリプトは、簡単に言えば、現在「P」キーが押されているかどうかと、キャラクターが現在パンチしているかどうかに応じて、そのパラメータをオンとオフに切り替える役割を担います。

```javascript
var KeyboardControls = pc.createScript('keyboardControls');

// initialize code called once per entity
KeyboardControls.prototype.initialize = function() {
    this.app.keyboard.on(pc.EVENT_KEYDOWN, this.keyDown, this);
    this.app.keyboard.on(pc.EVENT_KEYUP, this.keyUp, this);
};

KeyboardControls.prototype.update = function(dt) {
    if (this.app.keyboard.wasPressed(pc.KEY_P) && (this.entity.anim.baseLayer.activeState !== 'Punch')) {
        this.entity.anim.setBoolean('punch', true);
    }

    if (this.app.keyboard.wasReleased(pc.KEY_P) && (this.entity.anim.baseLayer.activeState === 'Punch')) {
        this.entity.anim.setBoolean('punch', false);
    }
};
```

これ以降は、animstategraph アセットにさらに多くのアニメーションを追加し、複雑なアニメーション ステートグラフを構築することができます！

完全なシーンを[こちら](https://playcanvas.com/editor/scene/1065029)で見ることができます。
