---
title: オーディオエフェクト
tags: [audio]
thumb: "https://s3-eu-west-1.amazonaws.com/images.playcanvas.com/projects/12/406047/G0ZA35-image-75.jpg"
---

<div className="iframe-container">
    <iframe src="https://playcanv.as/p/1nS6AnC9/" title="Audio Effects" allow="camera; microphone; xr-spatial-tracking; fullscreen" allowfullscreen></iframe>
</div>

*それぞれのボタンをクリックしてサウンドエフェクトを試してください。*

:::note

このチュートリアルには、Web Audio APIが必要です。

:::

## Web Audio APIを使用する

PlayCanvasでは、Web Audio APIの機能をフルに活用して、音声に強力なエフェクトを追加することができます。このチュートリアルでは、さまざまなエフェクトをオーディオサンプルに追加する方法が説明されています。

## 設定

[こちら](https://playcanvas.com/editor/scene/440346)からこのシーンをご覧いただけます。このシーンのルートエンティティには、[Sound](/user-manual/editor/scenes/components/sound)コンポーネントがあり、1つのスロットが単純なループ処理の音声サンプルを再生します。 Soundコンポーネントの動作に慣れていない場合は、[Basic Tutorial](/tutorials/basic-audio/)を確認してください。

ルートエンティティには、2つのスクリプトを持つ[Script](/user-manual/editor/scenes/components/script)コンポーネントもあります。1つのスクリプトはユーザーインターフェイスを担当し、もう1つがフォーカスするスクリプトです: <a href="https://playcanvas.com/editor/asset/4472751" target="_blank">application.js</a>。

このスクリプトは、アプリケーションの効果音を管理します。

## オーディオノードの使用

Web Audio APIを使用すると、オーディオノードを作成し、オーディオルーティンググラフを形成するために接続することができます。オーディオサンプルが再生されると、それぞれのノードで処理され、最終的には通常スピーカーに到達します。 詳細については[こちら](https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API)をご覧ください。

この例では、[Convolverノード](https://developer.mozilla.org/en-US/docs/Web/API/ConvolverNode)を使用しています。アプリケーションスクリプトでは、次のようにこのノードを作成しています。

```javascript
this.convolver = this.app.systems.sound.context.createConvolver();
```

次に、[ここ](https://developer.mozilla.org/en-US/docs/Web/API/ConvolverNode/buffer)で説明されているように、多くの音声サンプルをインパルス応答としてConvolverに使用しています。各オーディオサンプルはオーディオアセットであり、どのボタンを押すかに応じて、そのアセットを使用し、内部バッファをConvolverバッファに割り当てます。

```javascript
var asset = this[assetName];
this.convolver.buffer = asset.resource.buffer;
```

その後、Convolverをサウンドスロットに接続します。

```javascript
this.entity.sound.slot('speech').setExternalNodes(this.convolver);
```

Noneというボタンをクリックするとすべてのエフェクトをオフにしてスロットで```clearExternalNodes``` を呼び出します。

```javascript
this.entity.sound.slot('speech').clearExternalNodes();
```

オーディオノードの大きなグラフがあり、スロットに接続したい場合は、```setExternalNodes```のグラフの最後のノードと最初のノードを指定する必要があります。そうすることで、PlayCanvasはスピーカーに正しく最後のノードを接続することができます。

Soundコンポーネント APIの詳細については[こちら](https://api.playcanvas.com/engine/classes/Sound.html)をご覧ください。
