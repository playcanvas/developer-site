---
title: シンプルなゲームの作成 - パート5
tags: [games]
thumb: "https://s3-eu-west-1.amazonaws.com/images.playcanvas.com/projects/12/406050/LIJTDO-image-75.jpg"
---

<div className="iframe-container">
    <iframe src="https://playcanv.as/p/KH37bnOk/?overlay=false" title="Making a Simple Game - Part 5" allow="camera; microphone; xr-spatial-tracking; fullscreen" allowfullscreen></iframe>
</div>

* [完成されたプロジェクトはこちら](https://playcanvas.com/project/406050)です。先に[その1](/tutorials/keepyup-part-one/), [その2](/tutorials/keepyup-part-two/), [その3](/tutorials/keepyup-part-three/), [その4](/tutorials/keepyup-part-four/)を読んでください。*

## オーディオとパーティクル

### オーディオ (Audio)

音声は、ゲームにとって重要な部分です。プレイヤーに、彼らの入力が影響を与えていることを示す貴重なフィードバックを提供するだけでなく、ムードや雰囲気を醸し出すことができます。

Keepy Upゲームには次の3つの音声エフェクトがあります：BGM、ボールを打ったときのタップ音、負けたときの悲しげなトロンボーンの音です。それぞれの処理は少しずつ異なります。

#### 音楽とトロンボーン音

音楽とトロンボーン音は同様の方法で処理されます。主な違いは、音楽がループするように設定されていることです。 `game.js`には、ゲームスクリプトを音声コンポーネントを持つエンティティにリンクするスクリプト属性があり、正しいスロットを再生および停止するだけです。

```javascript
this.audio.sound.stop(); // 現在再生中の音を停止する
this.audio.sound.play("gameover") // 'gameover'スロットを再生する
```

#### ボールをタップする

ボールタップ音は、直接ボールエンティティに付けられています。短い、ループしない音です。そのため、タップがボールに当たるたびに再生します。

```javascript
this.entity.sound.play("bounce");
```

### パーティクル (Particle)

![Particles](/img/tutorials/beginner/keepyup-part-five/particle-bounce.gif)

Keepy Upには一つのパーティクルエフェクトがあります。それは、ボールがタップされるたびにトリガーされるダストの雲です。ダストの雲は、非ループ効果であり、実行時に雲がボールから離れるように配置し回転させる必要があります。

```javascript
this.impactEffect.setLocalPosition(tmp);
this.impactEffect.particlesystem.reset();
this.impactEffect.particlesystem.play();
this.impactEffect.lookAt(this.entity.getPosition());
```

このコードでは、`reset()`と`play()`を呼ぶことでワンショットパーティクルエフェクトを再起動し、それがボールの中心に向かって指すように回転させます。

![Curves](/img/tutorials/beginner/keepyup-part-five/particle-velocity-curves.jpg)

パーティクルエフェクト (Particle Effect)のエディターでLocal Velocityグラフを使用して、パーティクルエフェクトが向いている方向から離れて発射するように設定します。例：パーティクルは正のz軸に沿って移動します。

[パート6](/tutorials/keepyup-part-six/)に進んでください。
