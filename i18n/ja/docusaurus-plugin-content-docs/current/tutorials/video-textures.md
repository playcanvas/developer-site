---
title: ビデオテクスチャ
tags: [video, textures]
thumb: "https://s3-eu-west-1.amazonaws.com/images.playcanvas.com/projects/12/405850/WEKRBI-image-75.jpg"
---

<div className="iframe-container">
    <iframe src="https://playcanv.as/p/6wt5T87E/" title="Video Textures" allow="camera; microphone; xr-spatial-tracking; fullscreen" allowfullscreen></iframe>
</div>

[このチュートリアルのプロジェクト](https://playcanvas.com/project/405850)をエディタから試すことができます。

このプロジェクトは、テクスチャとランタイムを作成し、ビデオファイルをダウンロードして再生し、ビデオをテクスチャにレンダリングします。このテクスチャは、モデルに適用され、シーンで使用されます。

このスクリプトは次の機能を提供します:

* 新しいテクスチャを作成する
* HTMLのビデオ要素を作成して再生する
* TVモデルのマテリアルに新しいテクスチャを適用する
* ビデオデータをフレームごとにテクスチャに更新する

```javascript
var VideoTexture = pc.createScript('videoTexture');

VideoTexture.attributes.add('videoAsset', {
    title: 'ビデオアセット',
    description: 'このビデオテクスチャで再生するMP4ビデオアセットです。',
    type: 'asset'
});

VideoTexture.attributes.add('videoUrl', {
    title: 'ビデオURL',
    description: 'ビデオアセットが選択されていない場合に使用するURLです。',
    type: 'string'
});

VideoTexture.attributes.add('playEvent', {
    title: '再生イベント',
    description: 'ビデオテクスチャが再生可能になったら発生するイベントです。',
    type: 'string',
    default: ''
});

// initialize code called once per entity
VideoTexture.prototype.initialize = function() {
    var app = this.app;

    // Create HTML Video Element to play the video
    var video = document.createElement('video');
    video.loop = true;

    // muted attribute is required for videos to autoplay
    video.muted = true;

    // critical for iOS or the video won't initially play, and will go fullscreen when playing
    video.playsInline = true;

    // needed because the video is being hosted on a different server url
    video.crossOrigin = "anonymous";

    // autoplay the video
    video.autoplay = true;

    // iOS video texture playback requires that you add the video to the DOMParser
    // with at least 1x1 as the video's dimensions
    var style = video.style;
    style.width = '1px';
    style.height = '1px';
    style.position = 'absolute';
    style.opacity = '0';
    style.zIndex = '-1000';
    style.pointerEvents = 'none';

    document.body.appendChild(video);

    // Create a texture to hold the video frame data
    this.videoTexture = new pc.Texture(app.graphicsDevice, {
        format: pc.PIXELFORMAT_R8_G8_B8,
        minFilter: pc.FILTER_LINEAR_MIPMAP_LINEAR,
        magFilter: pc.FILTER_LINEAR,
        addressU: pc.ADDRESS_CLAMP_TO_EDGE,
        addressV: pc.ADDRESS_CLAMP_TO_EDGE,
        mipmaps: true
    });
    this.videoTexture.setSource(video);

    video.addEventListener('canplaythrough', function (e) {
        app.fire(this.playEvent, this.videoTexture);
        video.play();
    }.bind(this));

    // set video source
    video.src = this.videoAsset ? this.videoAsset.getFileUrl() : this.videoUrl;

    document.body.appendChild(video);
    video.load();

    this.on('destroy', function() {
        this.videoTexture.destroy();
        video.remove();
    }, this);
};

// update code called every frame
VideoTexture.prototype.update = function(dt) {
    // Transfer the latest video frame to the video texture
    this.videoTexture.upload();
};
```
