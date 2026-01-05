---
title: ヒットテスティング
---

AR/MRの文脈では、仮想世界のオブジェクトと現実世界の相互作用は、多くの技術によって実現されます。ヒットテスティングは、基盤となるARシステムを使用して推定された現実世界のジオメトリを調査することにより、空間内の点を特定することを可能にします。

これは様々な方法で使用でき、最も一般的なものの1つは、仮想オブジェクトを空間に配置して、それが現実世界に固定されているように感じさせることです。

## 信頼性 {#reliability}

ヒットテスティングは、常に進化する現実世界のジオメトリを理解する基盤システムによって実装されています。一部のプラットフォームは事前取得された情報に依存し、他のプラットフォームはComputer Vision技術に基づいてリアルタイムでジオメトリを推定します。したがって、ヒットテスティングの信頼性は、基盤となるシステムの能力に左右されます。

## サポート {#support}

システムがヒットテスティングをサポートしているかどうかを確認できます。

```javascript
if (app.xr.hitTest.supported) {
    // ヒットテスティングがサポートされています
}
```

## ヒットテストソース {#hit-test-source}

ヒットテスティングを開始したい場合、リクエストを発行すると`HitTestSource`インスタンスが提供され、それがイベント形式で結果を提供します。このようにしてソースのライフタイムを管理できます。

最も基本的な方法は、ビューアの前方ベクトルから直接プロービングを開始することです。

```javascript
// ヒットテストを開始
app.xr.hitTest.start({
    spaceType: pc.XRSPACE_VIEWER, // ビューア空間から
    callback: (err, hitTestSource) => {
        if (err) return;
        // ヒットテスト結果を購読
        hitTestSource.on('result', (position, rotation) => {
            // ヒットテスト結果の位置と回転
            // ビューア参照空間から前方に向かうレイに基づきます
        });
    }
});
```

ソースを削除することで、ヒットテスティングを停止できます。

```javascript
hitTestSource.remove();
```

## モノスコープ（タッチスクリーン） {#monoscope-touch-screen}

モノスコープデバイス（タッチスクリーン付きの携帯電話など）でXRセッションが開始された場合、ユーザーの画面タッチに基づいてヒットテストを開始することが可能です。

```javascript
app.xr.hitTest.start({
    profile: 'generic-touchscreen', // タッチスクリーン入力ソース
    callback: (err, hitTestSource) => {
        if (err) return;
        hitTestSource.on('result', (position, rotation, inputSource) => {
            // ヒットテスト結果の位置と回転
            // モバイルデバイスでのタッチから生成されます
        });
    }
});
```

一時的な入力ソース（タッチなど）は、ヒットテストソースが非同期操作として作成され、その結果が基盤となるシステムがそのような情報を提供できるかどうかに依存するため、すぐにヒットテスト結果を提供しないことに留意してください。これは、タッチがその短期間の間にヒットテスト結果を提供しない可能性があることを意味します。

## 入力ソース {#input-source}

ヒットテスティングを開始する最も一般的な方法は、入力ソース（コントローラーや手など）のレイからです。

```javascript
inputSource.hitTestStart({
    callback: (err, hitTestSource) => {
        if (err) return;
        hitTestSource.on('result', (position, rotation) => {
            // ヒットテスト結果の位置と回転
            // 入力ソースのレイに基づきます
        });
    }
});
```

## 任意レイ {#arbitrary-ray}

原点と方向を持つカスタムレイを使用してヒットテスティングを開始することも可能です。

```javascript
const ray = new pc.Ray();

ray.origin.set(0, 1, 0); // 原点から1メートル上から開始
ray.direction.set(0, -1, 0); // 下方向を指す

app.xr.hitTest.start({
    spaceType: pc.XRSPACE_LOCALFLOOR,
    offsetRay: ray,
    callback: (err, hitTestSource) => {
        // 現実世界のジオメトリをサンプリングするヒットテストソース
        // ARセッションが開始された位置から
    }
});
```

## アンカー {#anchors}

ヒットテストは、現実世界のジオメトリの推定に対して実行され、基になるシステム推定プロセスがヒットテストによってヒットされた平面、メッシュ、または点を洗練する場合、ジオメトリは変更される可能性があります。そのため、これらのヒットテストから[アンカー](/user-manual/xr/ar/anchors/)を作成でき、その後更新することができます。これにより、仮想オブジェクトをよりしっかりとした信頼性の高い配置にすることができます:

```javascript
// ヒットテストの結果を購読する
hitTestSource.on('result', (position, rotation, inputSource, hitTestResult) => {
    // ヒットテストの結果を使用してアンカーを作成する
    app.xr.anchors.create(hitTestResult, (err, anchor) => {
        if (!err) {
            // 新しいアンカーが作成されました
        }
    });
});
```
