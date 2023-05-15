---
title: オーディオエフェクト
layout: tutorial-page.hbs
tags: audio
thumb: "https://s3-eu-west-1.amazonaws.com/images.playcanvas.com/projects/12/406047/G0ZA35-image-75.jpg"
---

<iframe loading="lazy" src="https://playcanv.as/p/1nS6AnC9/" title="Audio Effects"></iframe>

*それぞれのボタンをクリックしてサウンドエフェクトを試してください。*

<div class="alert alert-info">このチュートリアルには、Web Audio APIが必要です。</div>

## Web Audio APIを使用する

PlayCanvasでは、Web Audio APIを完全に活用して音に強力なエフェクトを加えることができます。このチュートリアルでは、オーディオサンプルにさまざまなエフェクトを追加する方法を示します。

## 設定

[こちら][1]からこのシーンをご覧いただけます。このシーンのルートエンティティには、[Sound][2]コンポーネントがあり、1つのスロットが単純なループ処理の音声サンプルを再生します。 Soundコンポーネントの動作に慣れていない場合は、[Basic Tutorial][3]を確認してください。

ルートエンティティには、2つのスクリプトを持つ[Script][4]コンポーネントもあります。1つのスクリプトはユーザーインターフェイスを担当し、もう1つがフォーカスするスクリプトです: <a href="https://playcanvas.com/editor/asset/4472751" target="_blank">application.js</a>。

このスクリプトは、アプリケーションの音響エフェクトを管理します。

## オーディオノードの使用

Web Audio APIを使用すると、オーディオノードを作成し、オーディオルーティンググラフを形成するために接続することができます。オーディオサンプルが再生されると、それぞれのノードで処理され、最終的には通常スピーカーに到達します。 詳細については[こちら][5]をご覧ください。

この例では、[Convolverノード][6]を使用しています。アプリケーションスクリプトでは、次のようにこのノードを作成しています。

```javascript
this.convolver = this.app.systems.sound.context.createConvolver();
```

次に、[ここ][7]で説明されているように、多くの音声サンプルをインパルス応答としてコンボルバーに使用しています。各オーディオサンプルはオーディオアセットであり、どのボタンを押すかに応じて、そのアセットを使用し、内部バッファをコンボルバーバッファに割り当てます。

```javascript
var asset = this[assetName];
this.convolver.buffer = asset.resource.buffer;
```

その後、コンボルバーをサウンドスロットに接続します。

```javascript
this.entity.sound.slot('speech').setExternalNodes(this.convolver);
```

Noneというボタンをクリックするとすべてのエフェクトをオフにしてスロットで```clearExternalNodes``` を呼び出します。

```javascript
this.entity.sound.slot('speech').clearExternalNodes();
```

オーディオノードの大きなグラフがあり、スロットに接続したい場合は、```setExternalNodes```のグラフの最後のノードと最初のノードを指定する必要があります。そうすることで、PlayCanvasはスピーカーに正しく最後のノードを接続することができます。

Soundコンポーネント APIの詳細については[こちら][8]をご覧ください。

[1]: https://playcanvas.com/editor/scene/440346
[2]: /user-manual/packs/components/sound
[3]: /tutorials/basic-audio/
[4]: /user-manual/packs/components/script
[5]: https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API
[6]: https://developer.mozilla.org/en-US/docs/Web/API/ConvolverNode
[7]: https://developer.mozilla.org/en-US/docs/Web/API/ConvolverNode/buffer
[8]: /api/pc.Sound.html
