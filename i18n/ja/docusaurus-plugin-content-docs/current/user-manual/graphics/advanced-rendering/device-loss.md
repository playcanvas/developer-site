---
title: デバイスロストと復旧
description: PlayCanvasでWebGLコンテキストロストとWebGPUデバイスロストに対応し、GPUで生成したデータを復元して復旧をテストする方法を解説します。
---

ドライバーのリセット、リソースの不足、システムのグラフィックス構成の変更などにより、ブラウザーがGPUへアクセスできなくなることがあります。デバイスロストは、アプリケーションの通常の使用中にも起こり得るものとして設計してください。

**WebGL2**ではレンダリングコンテキストが失われ、ブラウザーがそれを復旧する場合があります。**WebGPU**では失われたネイティブデバイスを再利用できません。PlayCanvasは代わりのデバイスを要求し、GPUリソースを再作成します。アプリケーションが参照するPlayCanvasのグラフィックスデバイスオブジェクトは変わりません。

## エンジンが復元するもの {#what-the-engine-restores}

PlayCanvasはデバイスロスト中、アプリケーションの更新とレンダリングのループを一時停止し、復旧に成功すると再開します。JavaScriptオブジェクト、エンティティ、アプリケーションの状態はメモリーに残ります。この間も、ブラウザーのタイマー、ネットワークリクエスト、非同期コールバックは動作する可能性があります。

リソースの再作成と、その**内容**の復元は区別する必要があります。

| リソースまたはデータ | 復旧時の動作 |
| --- | --- |
| エンジンが管理するシェーダー、バインディング、パイプライン | 復旧したコンテキストまたは代わりのデバイス用に再作成されます。 |
| CPU側に元データを保持しているテクスチャと頂点・インデックスバッファ | 保持している元データから再アップロードされます。 |
| レンダーターゲット | 再作成されますが、以前レンダリングしたピクセルは失われます。内容を再レンダリングしてください。 |
| ストレージバッファ | 同じサイズで再作成されます。入力データを再度書き込むか、コンピュートで再生成してください。 |
| ランタイムライトマップ、生成した環境マップ、一度だけ行ったテクスチャコピー | ベイク、生成、コピーの処理を再実行してください。 |
| GPUだけに保持しているパーティクル、シミュレーション、ペイントの履歴 | 以前の履歴は失われます。再開するか、アプリケーションが保持するバックアップから復元してください。 |

正しい状態を再現するためのデータ、またはその再生成方法をGPUメモリーの外に保持してください。読み込んだテクスチャは元の画像から復元できますが、その後テクスチャに描き重ねたペイントは復元できません。毎フレームの通常のレンダリングにより、多くの中間ターゲットは自動的に再生成されます。

## アプリケーションデータの復元 {#restoring-application-data}

`app.graphicsDevice` の `devicelost` と `devicerestored` を監視します。デバイスロスト時はアプリケーション独自のGPU処理を止め、復旧後に生成リソースの内容を戻してください。どちらのバックエンドでも、エンジンのネイティブなロスト処理を置き換えるのではなく、これらのエンジンイベントを使用します。

次のWebGPUの例では、[ストレージバッファ](https://api.playcanvas.com/engine/classes/StorageBuffer.html)の入力をCPU側に保持します。次のセクションで扱う、中断された読み取りを判別するための世代も記録します。

```javascript
const device = app.graphicsDevice;
const values = new Float32Array([1, 2, 3, 4]);
const buffer = new pc.StorageBuffer(
    device,
    values.byteLength,
    pc.BUFFERUSAGE_COPY_SRC | pc.BUFFERUSAGE_COPY_DST
);
let readGeneration = 0;

const restoreData = () => {
    buffer.write(0, values);
    app.renderNextFrame = true;
};

const lost = device.on('devicelost', () => {
    readGeneration++;
});
const restored = device.on('devicerestored', restoreData);
restoreData();

app.on('destroy', () => {
    readGeneration++;
    lost.off();
    restored.off();
    buffer.destroy();
});
```

アプリケーションの入力が変わったら、保持している `values` も更新します。再びデバイスロストが起こる可能性があるため、復元処理は繰り返し実行できるようにしてください。エンジンのリソースオブジェクトを再利用し、復旧のたびにリスナーやリソースを重複して作成しないようにします。

[ランタイムライトマップ](../lighting/runtime-lightmaps.md)の場合は、[ベイクしたライティングのサンプル](https://playcanvas.github.io/#/graphics/lights-baked)のように、復旧後に再ベイクを予約します。アプリケーションで生成した環境マップも同様に再生成してください。`app.autoRender` がfalseの場合は、再生成した内容の準備ができた**後**に `app.renderNextFrame = true` でフレームを要求します。

## 非同期読み取りへの対応 {#handling-asynchronous-reads}

実行中の読み取りは、`devicelost` が届く前に拒否されたり、復旧後に完了したりすることがあります。WebGPUのストレージバッファの読み取りでは、`AbortError` に対応し、古い世代の結果を破棄します。

```javascript
async function readValues() {
    const generation = readGeneration;
    try {
        const result = await buffer.read(
            0,
            values.byteLength,
            new Float32Array(values.length),
            true
        );
        return generation === readGeneration ? result : null;
    } catch (error) {
        if (
            error.name === 'AbortError' ||
            generation !== readGeneration
        ) {
            return null;
        }
        throw error;
    }
}
```

この単発の読み取りでは、レンダーループの外からでもコピーを送信できるよう、最後の引数を `true` にしています。即時送信には追加のコストがあるため、通常の毎フレームの読み取りでは避けてください。

ここでの `null` は、新しい結果を待つ必要があることを呼び出し元に伝えます。それ以外のエラーは引き続き伝播します。タイマーやネットワークのコールバックから開始する処理も含め、新しいGPU処理はデバイスが利用可能なときだけ実行してください。

所有者を破棄するときは復旧リスナーも解除します。復旧のためにデバイスが参照を保持する `Compute` インスタンスを含め、不要になったリソースは明示的に破棄してください。デバイスの置き換えをまたいで、ネイティブのWebGPUバッファ、テクスチャ、パイプラインをキャッシュしないでください。

## 復旧のテスト {#testing-recovery}

デバッグビルドを使うローカルビルドのエンジンサンプルで、ブラウザーのコンソールに次のコードを貼り付けます。

```javascript
pc.AppBase.getApplication().graphicsDevice.debugLoseContext(1000);
```

この**内部テスト用ヘルパーは公開APIではありません**。実際にWebGLコンテキストロストまたはWebGPUデバイスの破棄を発生させ、1,000ミリ秒の待機後に復旧を試みます。この待機時間は復旧完了までの時間を保証するものではありません。実装は非デバッグビルドから除去されるため、本番アプリケーションのロジックには使用しないでください。

読み取りやコンピュート処理の実行中も含め、複数回テストします。レンダリングと操作が再開すること、生成したライティングが戻ること、オンデマンドのシーンがカメラを動かさなくても再描画されることを確認してください。両方のバックエンドで確認し、コンソールに検証エラーが出ていないか調べます。

## 復旧に失敗した場合 {#when-recovery-fails}

復旧は保証されません。ブラウザーがコンテキストを復旧できなかったり、別のGPUデバイスを取得できなかったりする場合があります。すべての `devicelost` の後に `devicerestored` が発生するとは限りません。アプリケーションはHTMLで復旧中のメッセージを表示し、アプリケーション側で決めた時間が経過したらページの再読み込みを案内できます。レンダリングは一時停止しているため、キャンバス内のメッセージではなくHTMLを使ってください。重要なユーザーの作業内容はGPUメモリーの外に保存します。

WebGPUのライフサイクルについて詳しくは、Brandon Jonesによる[WebGPU Device Loss](https://toji.dev/webgpu-best-practices/device-loss.html)を参照してください。
