---
title: アニメーションテクスチャの作成
tags: [animation, textures]
thumb: "https://s3-eu-west-1.amazonaws.com/images.playcanvas.com/projects/12/405882/831708-image-75.jpg"
---

<div className='iframe-container'>
    <iframe src="https://playcanv.as/p/BM93v05L/" title="Animated Textures" allow="camera; microphone; xr-spatial-tracking; fullscreen" allowfullscreen></iframe>
</div>

*[フルプロジェクト](https://playcanvas.com/project/405882)を見てください*

マテリアルをアニメーション化することは非常に有用です。ここで示されている例は、テクスチャをスクロールさせて動きをシミュレートするものです。

## マップオフセットでマテリアルをスクロール

例の四角形平面では、スクリプト `scrolling-texture.js` を使用してUVオフセットをフレームごとに常に移動させています。これは、流れる水をシミュレートするために使用することができます。以下に更新ループが表示されます。

```javascript
ScrollingTexture.prototype.update = function(dt) {
    var velocity = ScrollingTexture.tmpVec2;
    var offset = ScrollingTexture.tmpOffset;

    // テクスチャのオフセット量を計算する
    // Speed * dt
    velocity.set(this.speed.x, this.speed.y);
    velocity.scale(dt);

    // 現在のdiffuseおよびnormalマップのオフセット値を更新する
    offset.copy(this.material.diffuseMapOffset);
    offset.add(velocity);

    this.material.diffuseMapOffset = offset;
    this.material.normalMapOffset = offset;
    this.material.update();
};
```

オフセットを一時的なベクトル `tmp` に計算します。これは単純に `speed * timeStep` です。次に、このオフセットをDiffuseマップとNormalマップのoffsetプロパティに追加します。これは `diffuseMapOffset` と `normalMapOffset` プロパティを変更することによって行います。これらの値は `pc.Vec2` であり、テクスチャを表面にマッピングするために使用されるUV座標をシフトします。他のマップ（例：Emissive）を使用している場合は、これらのオフセットプロパティも更新する必要があります。最後に、変更をシェーダーに反映させるために `material.update()` を呼び出します。

これは、マテリアルのオフセットを変更してテクスチャをスクロールさせるためのシンプルで直接的な方法です。ただし、このコードには1つの欠点があります。それは、実際のマテリアルのプロパティが変更されることです。したがって、同じマテリアルを使用してシーン内の複数のモデルがある場合、すべてが影響を受けます。
