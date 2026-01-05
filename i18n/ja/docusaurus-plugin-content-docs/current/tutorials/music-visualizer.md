---
title: オーディオビジュアライザーの作成
tags: [audio]
thumb: "https://s3-eu-west-1.amazonaws.com/images.playcanvas.com/projects/12/405891/L2JCV3-image-75.jpg"
---

<div className="iframe-container">
    <iframe src="https://playcanv.as/p/BqhCi6oy/" title="Creating a Music Visualizer" allow="camera; microphone; xr-spatial-tracking; fullscreen" allowfullscreen></iframe>
</div>

*[完成されたプロジェクト](https://playcanvas.com/project/405891)をフォークして詳細をご確認ください。*

このチュートリアルでは、PlayCanvasを使用して、WebGLのオーディオビジュアライザアプリケーションを作成する方法を説明します。オーディオストリームの余分な周波数データを取得し、PlayCanvasキャンバスにそのデータをレンダリングします。

オーディオビジュアライザは2つのスクリプトで構成されています。アナライザは、オーディオを再生し、アナライザノードを介してデータを抽出します。これは最新のブラウザに組み込まれているWeb Audio APIの一部です。ビジュアライザは、アナライザからデータを取得してグラフとして画面上にそれをレンダリングします。

## アナライザー (Analyser)

```javascript
var Analyser = pc.createScript('analyser');

Analyser.attributes.add('fftsize', {
    type: 'number'
});

// initialize code called once per entity
Analyser.prototype.initialize = function() {
    var context = this.app.systems.sound.context;

    // create analyser node and set up
    this.analyser = context.createAnalyser();
    this.analyser.smoothingTimeConstant = 0.6;
    this.analyser.fftSize = this.fftsize;

    this.freqData = new Float32Array(this.fftsize/2);
    this.timeData = new Float32Array(this.fftsize/2);

    var slot = this.entity.sound.slot("track");
    slot.setExternalNodes(this.analyser);
};

// update code called every frame
Analyser.prototype.update = function(dt) {
    this.analyser.getFloatFrequencyData(this.freqData);
    this.analyser.getFloatTimeDomainData(this.timeData);
};
```

ここでコードを詳しく見てみましょう。

まず、`context`を取得します。これは[`AudioContext`](https://developer.mozilla.org/en/docs/Web/API/AudioContext)のアプリケーションインスタンスです。これは、最新ブラウザの標準であるWeb Audio APIに含まれる[`AnalyserNode`](https://developer.mozilla.org/en-US/docs/Web/API/AnalyserNode) を新規で作成するために使用します。`AnalyserNode`により、フレーム毎にオーディオの生のデータに値の配列としてアクセスすることが可能になります。いくつかの`smoothingTimeConstant`プロパティにより、データサンプリングが時間と共に平滑化されるかどうかを決定します。`0`の場合は平滑化されません。`1`は非常に滑らかになります。`fftSize`は、アナライザノードが生成するサンプル数を定義します。これは2の累乗である必要があります。高いく設定するほど綿密になり、CPUに負荷がかかります。

`AnalyserNode`からデータには、整数の`Uint8Array`または浮動小数点数の`Float32Array`としてアクセスできます。このデモでは、浮動小数点数を使用しているため、`fftSize`の半分の大きさでそれぞれ2つの`Float32Array`を割り当てる必要があります。

セットアップの最後の部分は、PlayCanvas SoundSlot APIの`setExternalNodes`を使用して、この新しいノードをSound Componentのノードチェーンに挿入することです。

次に、私たちの更新ループでは、`AnalyserNode`ニョードメソッド`getFloatFrequencyData`と`getFloatTimeDomainData`を使用して、配列にデータを記録します。このデータをビジュアライザースクリプトで使用します。

## ビジュアライザー

```javascript
var Visualizer = pc.createScript('visualizer');

Visualizer.attributes.add('analyser', {
    type: 'entity'
});

Visualizer.attributes.add('freqcolor', {
    type: 'rgba'
});

Visualizer.attributes.add('timecolor', {
    type: 'rgba'
});

Visualizer.attributes.add('heightScale', {
    type: 'number',
    default: 1
});

// initialize code called once per entity
Visualizer.prototype.initialize = function() {
    this.lines = [];
    var count = this.analyser.script.analyser.fftsize;
    for (var i = 0; i < count; i++) {
        this.lines.push(new pc.Vec3());
    }

    this.yScale = 1;
    this.xScale = 0.10 * 2048 / count;

    this.minDb = this.analyser.script.analyser.analyser.minDecibels;
    this.maxDb = this.analyser.script.analyser.analyser.maxDecibels;
    this.freqScale = 1 / (this.maxDb - this.minDb);
    this.freqOffset = this.minDb;
};

// update code called every frame
Visualizer.prototype.update = function(dt) {
    this.freqScale = 1 / (this.maxDb - this.minDb);
    this.freqOffset = this.minDb;

    this.renderData(this.analyser.script.analyser.freqData, this.freqcolor, this.freqScale, this.freqOffset);
    this.renderData(this.analyser.script.analyser.timeData, this.timecolor, 0.5, 0);
};


Visualizer.prototype.renderData = function (data, color, scale, offset) {
    var line = 0;
    for (var i = 0; i < data.length; i++) {
        if (line < this.lines.length) {
            var h1 = scale * (data[i] - offset);
            var h2 = scale * (data[i+1] - offset);

            this.lines[line].set(i * this.xScale, this.heightScale*h1, 0);
            this.lines[line+1].set((i+1) * this.xScale, this.heightScale*h2, 0);

            line += 2;
        }
    }
    this.app.renderLines(this.lines, color);
};
```

ビジュアライザースクリプトは、すべてのアナライザーからのデータを取得し、[`this.app.renderLines`](https://api.playcanvas.com/engine/classes/AppBase.html#renderlines) APIを使用して直線グラフとしてレンダリングします。

設定では、線に使用するベクターを割り当てています。各データの点に対して2つ必要です(線の開始と終了)。その後、すべての線が画面に表示されることを確認するためにいくつかのスケールファクタを設定します。`AnalyserNode`にはデータに含むことができるデシベルの最小値と最大値が含まれています。これは必ず正確ではないようですが(この範囲外の値を取得しました)、データを正規化するための良い基礎となります。

`renderData`関数は、すべてのデータをループして、事前に割り当てられたベクトルの1つを、現在のポイントから始まり、次のポイントで終了するように設定します。

updateループでは、周波数データ (Frequency)および 時間領域 (Time Domain)の両方のグラフを描画します。

## その他のアイデアは?

音楽の視覚化の方法を一部紹介させていただきました。音楽に合わせて3Dバーのスケーリングや色や明るさの調整を行うこともできます。SoundCloudにビジュアライザを繋げてユーザに選択させる方法もあります。可能性はたくさんあります。
