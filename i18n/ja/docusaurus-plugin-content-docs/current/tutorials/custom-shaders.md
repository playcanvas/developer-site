---
title: カスタムシェーダー
tags: [shaders, materials]
thumb: "https://s3-eu-west-1.amazonaws.com/images.playcanvas.com/projects/12/406044/4J2JX2-image-75.jpg"
---

<div className="iframe-container">
    <iframe src="https://playcanv.as/p/zwvhLoS9/" title="Custom Shaders" allow="camera; microphone; xr-spatial-tracking; fullscreen" allowfullscreen></iframe>
</div>

:::info

このチュートリアルでは、GLSLを使用してマテリアル上にカスタムシェーダーを作成してディゾルブエフェクトを作ります。

:::

3DモデルをPlayCanvasにインポートすると、デフォルトで [物理マテリアル] [3]が使用されます。これは、多くのレンダリングニーズをカバーできる汎用的なマテリアルです。

しかし、マテリアルの特別な効果や特殊ケースを実行する必要がある場合があります。その場合は、カスタムシェーダーを記述する必要があります。

## シェーダーとシェーダー定義

WebGLでは、すべてのブラウザで実行できるシェーダーを作成するためにGLSL言語を使用します。 PlayCanvasでは、Shaderアセットでこのコードを作成し、その後、[Shader Definition] [1]にコードを割り当てて、この定義を使用して新しい `pc.Shader`を作成します。

### バーテックスシェーダー

```glsl
attribute vec3 aPosition;
attribute vec2 aUv0;

uniform mat4 matrix_model;
uniform mat4 matrix_viewProjection;

varying vec2 vUv0;

void main(void)
{
    vUv0 = aUv0;
    gl_Position = matrix_viewProjection * matrix_model * vec4(aPosition, 1.0);
}
```

### フラグメントシェーダー

```glsl
varying vec2 vUv0;

uniform sampler2D uDiffuseMap;
uniform sampler2D uHeightMap;
uniform float uTime;

void main(void)
{
    float height = texture2D(uHeightMap, vUv0).r;
    vec4 color = texture2D(uDiffuseMap, vUv0);
    if (height < uTime) {
      discard;
    }
    if (height < (uTime+0.04)) {
      color = vec4(0, 0.2, 1, 1.0);
    }
    gl_FragColor = color;
}
```

上記の2つのシェーダーは、新しいマテリアルの機能を定義しています。バーテックスシェーダーでは、メッシュの頂点位置をスクリーンスペースに変換しています。フラグメントシェーダーでは、ピクセルの色を設定しています。このピクセルの色は、このアセットに提供される2つのテクスチャに基づいて選択されます。値uTimeがハイトマップ中の色よりも小さい場合は、任意のピクセルをレンダリングしません(モデルが不可視になります)。uTimeの値がハイトマップの値よりも大きい場合は、提供する拡散マップテクスチャからカラーを取得します。

### シェーダー定義

```javascript
var vertexShader = this.vs.resource;

// dynamically set the precision depending on device.
var fragmentShader = "precision " + gd.precision + " float;\n";
fragmentShader = fragmentShader + this.fs.resource;


// A shader definition used to create a new shader.
var shaderDefinition = {
    attributes: {
        aPosition: pc.SEMANTIC_POSITION,
        aUv0: pc.SEMANTIC_TEXCOORD0
    },
    vshader: vertexShader,
    fshader: fragmentShader
};
```

シェーダー定義には3つのセクションがあります。 `attributes`では、あなたの頂点シェーダーが実行される各頂点の属性の変数名と値を指定する必要があります。これらの値は後であなたの頂点シェーダーで `attribute` として宣言されます。

バーテックスシェーダーコードは、 `vshader`プロパティで文字列として提供され、フラグメントシェーダーは 'fshader'プロパティで文字列として提供されます。

上記はディゾルブエフェクトを作成するために使用されるシェーダー定義です。注意点として、2つのアセットからシェーダーコードを取得していることに注目してください。これらのアセットは[スクリプト属性][2]を使用して提供され、スクリプトからアセットに簡単にアクセスできます。

属性以外に、GLSLシェーダーには2つの特別なタイプの変数 `varying` と `uniform` があります。

## GLSL `varying` 変数

**varying** で宣言された変数は、頂点シェーダーで設定され、フラグメントシェーダーで使用されます。これは、最初のプログラムから2番目にデータを渡す方法です。

## GLSL `uniform` 変数

**`uniform`** で宣言された変数は、頂点シェーダーとフラグメントシェーダーの両方で宣言されます。この変数の値は、メインアプリケーションからシェーダーに渡す必要があります。たとえば、シーンのライトの位置。

## マテリアルの作成

```javascript
// Create the shader from the definition
this.shader = new pc.Shader(gd, shaderDefinition);

// Create a new material and set the shader
this.material = new pc.Material();
this.material.shader = this.shader;

// Set the initial time parameter
this.material.setParameter('uTime', 0);

// Set the diffuse texture
this.material.setParameter('uDiffuseMap', diffuseTexture);

// Use the "clouds" texture as the height map property
this.material.setParameter('uHeightMap', heightTexture);

// Replace the material on the model with our new material
model.meshInstances[0].material = this.material;
```

シェーダー定義を手に入れたら、新しい Shader と新しい Material を作成し、`setShader()`を使用してマテリアルにシェーダーを渡します。各 uniforms は、メソッド `setParameter()`を使用して初期化されます。最後に、元のマテリアルを新しく作成したマテリアルで置き換えます。注意:1つのモデル内の各メッシュには独自のマテリアルがあります。すなわち、モデルに1つ以上のメッシュがある場合は、1つ以上のメッシュインスタンスに、マテリアルを設定する必要があります。

*同じマテリアルを複数のメッシュに使用できます(使用すべきです)。*

## テクスチャを使用する新しいマテリアル

```javascript
var diffuseTexture = this.app.assets.get(this.diffuseMap).resource;
//...
this.material.setParameter('uDiffuseMap', diffuseTexture);
```

このチュートリアルで紹介されているエフェクトは、ハイトマップテクスチャを使用して達成されます。上記のコードを使用して、アセットレジストリからテクスチャにアクセスします。スクリプトのトップには、PlayCanvasエディターからテクスチャを設定できるように、 'maps'というスクリプト属性が宣言されています。

```javascript
CustomShader.attributes.add('vs', {
    type: 'asset',
    assetType: 'shader',
    title: 'Vertex Shader'
});

CustomShader.attributes.add('fs', {
    type: 'asset',
    assetType: 'shader',
    title: 'Fragment Shader'
});

CustomShader.attributes.add('diffuseMap', {
    type: 'asset',
    assetType: 'texture',
    title: 'Diffuse Map'
});

CustomShader.attributes.add('heightMap', {
    type: 'asset',
    assetType: 'texture',
    title: 'Height Map'
});
```

ハイトマップテクスチャが読み込まれると、 `pc.Texture` オブジェクトに `uHeightMap` ユニフォームを設定できます。

## Uniformの更新

```javascript
// update code called every frame
CustomShader.prototype.update = function(dt) {
    this.time += dt;

    // Bounce value of t 0->1->0
    var t = (this.time % 2);
    if (t > 1) {
        t = 1 - (t - 1);
    }

    // Update the time value in the material
    this.material.setParameter('uTime', t);
};
```

消失エフェクトを得るために、高さマップの値を閾値として使用して、閾値を時間と共に増やします。上記の更新方法では、`t`の値を0と1の間でバウンスして、それを`uTime` uniformとして設定します。

シェーダーでは、ピクセルの高さマップの値が時間の値よりも小さい場合、そのピクセルを描画しません。加えて、しきい値に近い値の場合は、エッジを表示するためにピクセルを青色で描画します。

## 完全なソースコード

```javascript
var CustomShader = pc.createScript('customShader');

CustomShader.attributes.add('vs', {
    type: 'asset',
    assetType: 'shader',
    title: 'Vertex Shader'
});

CustomShader.attributes.add('fs', {
    type: 'asset',
    assetType: 'shader',
    title: 'Fragment Shader'
});

CustomShader.attributes.add('diffuseMap', {
    type: 'asset',
    assetType: 'texture',
    title: 'Diffuse Map'
});

CustomShader.attributes.add('heightMap', {
    type: 'asset',
    assetType: 'texture',
    title: 'Height Map'
});

// initialize code called once per entity
CustomShader.prototype.initialize = function() {
    this.time = 0;

    var app = this.app;
    var gd = app.graphicsDevice;

    var diffuseTexture = this.diffuseMap.resource;
    var heightTexture = this.heightMap.resource;

    var vertexShader = this.vs.resource;
    var fragmentShader = "precision " + gd.precision + " float;\n";
    fragmentShader = fragmentShader + this.fs.resource;

    // A shader definition used to create a new shader.
    var shaderDefinition = {
        attributes: {
            aPosition: pc.SEMANTIC_POSITION,
            aUv0: pc.SEMANTIC_TEXCOORD0
        },
        vshader: vertexShader,
        fshader: fragmentShader
    };

    // Create the shader from the definition
    this.shader = new pc.Shader(gd, shaderDefinition);

    // Create a new material and set the shader
    this.material = new pc.Material();
    this.material.shader = this.shader;

    // Set the initial time parameter
    this.material.setParameter('uTime', 0);

    // Set the diffuse texture
    this.material.setParameter('uDiffuseMap', diffuseTexture);

    // Use the "clouds" texture as the height map property
    this.material.setParameter('uHeightMap', heightTexture);

    // Replace the material on the model with our new material
    var renders = this.entity.findComponents('render');

    for (var i = 0; i < renders.length; ++i) {
        var meshInstances = renders[i].meshInstances;
        for (var j = 0; j < meshInstances.length; j++) {
            meshInstances[j].material = this.material;
        }
    }
};

// update code called every frame
CustomShader.prototype.update = function(dt) {
    this.time += dt;

    // Bounce value of t 0->1->0
    var t = (this.time % 2);
    if (t > 1) {
        t = 1 - (t - 1);
    }

    // Update the time value in the material
    this.material.setParameter('uTime', t);
};
```

以上がそのスクリプトの全体です。このスクリプトを動作させるには、バーテックスシェーダとフラグメントシェーダのアセットを作成する必要があることを忘れないでください。

[1]: https://api.playcanvas.com/engine/classes/Shader.html
[2]: /user-manual/scripting/fundamentals/script-attributes/
[3]: /user-manual/graphics/physical-rendering/physical-materials/
