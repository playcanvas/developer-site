---
title: シェーダーのプリコンパイル
description: シーンのシェーダーとレンダーパイプラインを描画前に並列でコンパイルし、ローディングバー用の進捗イベントを使って、長い最初のフレームやカクつきを防ぎます。
---

マテリアルとメッシュの組み合わせごとに専用のシェーダーが必要で、WebGPUではさらに専用のレンダーパイプラインも必要です。デフォルトでは、これらは最初に描画されるときに1つずつコンパイルされ、その間フレームは待機します。そのため、アプリケーションの最初のフレームが遅くなり、新しいマテリアルを持つオブジェクトが視界に入ったときに目に見えるカクつきが発生することがあります。WebGPUでは、描画時に作成されるレンダーパイプラインが1つずつコンパイルされるため、特に遅くなります。

`app.precompile()`は、次のフレームに必要なシェーダーとレンダーパイプラインを、そのフレームを描画せずに準備します。これらはWebGL2とWebGPUの両方で、ブラウザのバックグラウンドスレッドで並列にコンパイルされます。コンパイル中もアプリケーションは更新を続けますが、何も描画せず、キャンバスは直前の内容を保持します。すべてのコンパイルが終わると、描画が再開されます。

## 使い方 {#usage}

新しいシェーダーが必要なコンテンツを追加した後、たとえばアプリケーションを開始する前や、レベルを読み込んだ後に`precompile()`を呼び出します。

```javascript
app.precompile().then((stats) => {
    console.log(`Compiled ${stats.shaders} shaders in ${stats.time.toFixed(0)} ms`);
});
app.start();
```

プリコンパイルはアプリケーションの次のフレームで実行されるため、そのフレームまでに追加されたコンテンツが対象になります。返されるPromiseは、すべてがコンパイルされた状態で描画される最初のフレームの前に、次の統計情報とともに解決されます。

| プロパティ | 説明 |
| -------- | ----------- |
| `shaders` | 作成されたシェーダーの数。 |
| `pipelines` | 要求されたレンダーパイプラインの数。WebGPUのみで、WebGL2では0。 |
| `frameTime` | プリコンパイルを開始したフレームの所要時間(ミリ秒)。 |
| `time` | すべてのコンパイルが終わるまでのプリコンパイルの所要時間(ミリ秒)。 |

エディターでは、最初のフレームの前に実行されるスクリプトの`initialize`メソッドから呼び出せます。

```javascript
import { Script } from 'playcanvas';

export class Precompile extends Script {
    static scriptName = 'precompile';

    initialize() {
        this.app.precompile();
    }
}
```

## 対象となるメッシュインスタンス {#which-mesh-instances-are-included}

デフォルトでは、カメラが描画するレイヤー内のすべてのメッシュインスタンスが対象になり、カメラの視界外にあるものも含まれます。これにより、後から視界に入るオブジェクトがカクつきを起こしません。

事前にコンパイルするシェーダーを減らすには、フラスタムカリングを有効にして、カメラから見えるメッシュインスタンスだけを対象にします。それ以外は、プリコンパイルしない場合と同様に、最初に視界に入ったときにコンパイルされます。

```javascript
app.precompile({ frustumCulling: true });
```

対象になるのは、カメラのフォワードレンダリングとライトのシャドウマップです。[CameraFrame](/user-manual/graphics/posteffects/cameraframe/)のポストプロセスエフェクトなど、その他のレンダリングは最初に描画されるときにコンパイルされます。

## 進捗の表示 {#showing-progress}

アプリケーションは、ローディングバーに使えるイベントを発行します。

| イベント | 説明 |
| ----- | ----------- |
| `precompile:start` | コンパイルが開始された。 |
| `precompile:progress` | これまでにコンパイルされたシェーダーとレンダーパイプラインの割合(0から1)。値が変化したフレームで発行されます。 |
| `precompile:end` | すべてのコンパイルが終わった。統計情報とともに、それらを使って描画するフレームの直前に発行されます。 |

コンパイルが終わるまでアプリケーションは何も描画しないため、進捗表示はキャンバスの外、たとえばHTML要素にする必要があります。

```javascript
const bar = document.createElement('div');
bar.style.cssText = 'position:absolute; left:0; bottom:0; height:4px; width:0; background:#f60;';
document.body.appendChild(bar);

app.on('precompile:progress', (progress) => {
    bar.style.width = `${progress * 100}%`;
});
app.once('precompile:end', () => {
    bar.remove();
});

app.precompile();
```

WebGL2で進捗を報告するには、`KHR_parallel_shader_compile`拡張機能が必要です。この拡張機能がない場合、進捗はすぐに1になります。

エディターでは、プリコンパイルが終わるまで[ローディング画面](/user-manual/editor/interface/launch-page/loading-screen/)を表示したままにできます。

## プラットフォームごとの詳細 {#platform-details}

- **WebGPU**: 不足しているレンダーパイプラインは非同期に作成されます。同時にコンパイルするパイプラインの数は、論理プロセッサの数に基づいて制限されます。一度に多すぎると、ブラウザがページを更新できなくなることがあるためです。
- **WebGL2**: シェーダーは作成時にコンパイルおよびリンクされます。macOS上のChromeなど一部のプラットフォームでは、ブラウザはシェーダーが最初に描画されるときにコンパイルを完了します。そのため、シェーダーのリンク後に、プリコンパイルはフレームをもう一度1ピクセルに描画してコンパイルを完了させます。

通常どおり描画されるフレームには、プリコンパイルによるコストはありません。

## 結果 {#results}

[Car Showcase](https://playcanvas.github.io/#/demos/car-showcase)サンプルで最初のフレームが表示されるまでの時間(シェーダーのキャッシュなし、Apple M4 Max上のChrome):

| | プリコンパイルなし | プリコンパイルあり |
| - | ------------------ | --------------- |
| WebGPU | 9.4 秒 | 2.1 秒 |
| WebGL2 | 3.0 秒 | 2.6 秒 |

[Shader Precompile](https://playcanvas.github.io/#/graphics/shader-precompile)サンプルでは、多数のマテリアルバリエーションを表示し、プリコンパイルとフラスタムカリングの切り替え、プログレスバー、シェーダーのコンパイルで停止した合計時間を確認できます。

詳しくは[APIリファレンス](https://api.playcanvas.com/engine/classes/AppBase.html#precompile)を参照してください。
