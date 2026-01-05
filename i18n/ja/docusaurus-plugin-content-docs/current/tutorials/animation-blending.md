---
title: アニメーションのブレンディング
tags: [animation]
thumb: "https://s3-eu-west-1.amazonaws.com/images.playcanvas.com/projects/12/405874/A8B1FE-image-75.jpg"
---

:::warning

このチュートリアルでは非推奨のModelおよびAnimationコンポーネントが使用されています。代わりに[アニメーションステートグラフのブレンディング](/tutorials/anim-blending/)を参照してください。

:::

<div className='iframe-container'>
    <iframe src="https://playcanv.as/p/HI8kniOx/" title="Animation Blending" allow="camera; microphone; xr-spatial-tracking; fullscreen" allowfullscreen></iframe>
</div>

:::info

スクリーンをクリックしてフォーカスを合わせ、'p' キーを押すとパンチアニメーションへブレンドされます。

:::

このチュートリアルでは、アニメーションブレンディングの基本を紹介します。

シーン内のオブジェクトはアニメーション化される場合があります。機械やキャラクターは、アニメーション化したい物体の良い例です。一般的に、3Dコンテンツが作成される際には、個々のアニメーションが作成され、これらのアニメーションは通常、サイクル（ループするため）と呼ばれます。例えば、人間のキャラクターにはアイドルのサイクル、歩行のサイクル、走行のサイクルなどがあります。PlayCanvasの開発者としては、これらのアニメーションをオブジェクト上で再生する仕組みが必要です。また、これらのアニメーションが切り替わる際に突然変わりが生じることは望ましくありません。これを解決するために、アニメーションブレンディングを使用し、アニメーション間のスムーズな遷移を実現するべきです。これにより、アニメーション化されたオブジェクトの視覚的な忠実度が大幅に向上します。

それでは、PlayCanvasを使ってこれがどのように実現されるか見てみましょう...

## Animationコンポーネント

モデルにアニメーションを適用するには、animationコンポーネントをエンティティに追加します。以下は、PlayCanvasエディターで表示されるスキンキャラクターの設定です。

![Animated Entity](/img/tutorials/animation_blending.jpg)

Animationコンポーネントをインスペクターで見ることができます。2つのアニメーションアセットが割り当てられています：'idle' サイクルと 'punch' サイクルです。Animationコンポーネントをこのように設定することで、最初のアニメーション（idleサイクル）が再生され、ループオプションが設定されているため、無限にアニメーションが続きます。ただし、もう少し興味深い機能を実現したいと考えています。

* ループするアイドルアニメーションを再生
* キーを押すと、ループするパンチアニメーションにブレンド
* キーのリリースでアイドルに戻す

このような機能は、単純なanimationコンポーネントの機能を超えています。この追加の動作をクックアップするには、スクリプトコンポーネントが必要です。エディターのスキンキャラクターエンティティのスクリプトコンポーネントを上のスクリーンショットで確認でき、animation_blending.jsという名前のJSファイルを参照しています。このファイルの内容は以下の通りです。

```javascript
var AnimationBlending = pc.createScript('animationBlending');

AnimationBlending.states = {
    idle: {
        animation: 'male.json'
    },
    punch: {
        animation: 'male_uppercut_jab.json'
    }
};

// initialize code called once per entity
AnimationBlending.prototype.initialize = function() {
    this.blendTime = 0.2;

    this.setState('idle');
};

AnimationBlending.prototype.update = function(dt) {
    if (this.app.keyboard.wasPressed(pc.KEY_P)) {
        this.setState('punch');
    }

    if (this.app.keyboard.wasReleased(pc.KEY_P)) {
        this.setState('idle');
    }
};

AnimationBlending.prototype.setState = function (state) {
    var states = AnimationBlending.states;

    this.state = state;
    // 現在のアニメーションを設定し、0.2秒かけてからブレンドします。
    // 現在のアニメーションの状態を、ターゲットのアニメーションの開始位置まで移動させる。
    this.entity.animation.play(states[state].animation, this.blendTime);
};
```

ここから、Animationコンポーネントにさらに多くのアニメーションを追加し、より複雑なアニメーションステートチャートをスクリプト化できます。

[こちらでシーンの内容をすべて表示できます](https://playcanvas.com/editor/scene/440156)
