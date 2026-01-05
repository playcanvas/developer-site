---
title: プログラムでのエンティティ作成
tags: [procedural, basics]
thumb: "https://s3-eu-west-1.amazonaws.com/images.playcanvas.com/projects/12/406042/4479BC-image-75.jpg"
---

<div className="iframe-container">
    <iframe src="https://playcanv.as/p/1VjdIY7v/" title="Programmatically Creating Entities" allow="camera; microphone; xr-spatial-tracking; fullscreen" allowfullscreen></iframe>
</div>

通常、PlayCanvas エディターを使用してエンティティを作成し、ゲームのさまざまなパーツを作成するためにコンポーネントやスクリプトのコレクションを作成することが多いです。しかし、スクリプトでエンティティを作成することもできます。このチュートリアルでは、その方法を説明します。

## エンティティの作成

```javascript
var entity = new pc.Entity(); // エンティティを作成

// エンティティ階層に追加する
this.app.root.addChild(entity);
```

最初にエンティティを作成する必要があります。これは簡単ですが、エンティティをメインのエンティティ階層に追加することが重要です。階層内のエンティティのみが、そのトランスフォーム、コンポーネント、およびスクリプトが更新されます。スクリプト内では、スクリプトに渡される`Application`オブジェクトからエンティティ階層のルートにアクセスすることができます。慣例として、これは通常`app`という名前であり、階層のルートは`this.app.root`として利用できます。

## コンポーネントの追加

```javascript
// 新しいエンティティを作成する
var entity = new pc.Entity();

// デフォルトの値で新しいCameraコンポーネントを追加する
entity.addComponent("camera");

// 新しいModelコンポーネントを作成してエンティティに追加する
entity.addComponent("render", {
    type: 'box',
});

// エンティティ階層に追加する
this.app.root.addChild(entity);
```

エンティティそのものにはあまり機能が備わっていないため、エンティティに機能を追加するにはコンポーネントを追加する必要があります。 `addComponent` メソッドを使用して、エンティティに新しいコンポーネントを作成して追加することができます。

各コンポーネントタイプには、使えるプロパティが異なります。より詳細については、[コンポーネントのドキュメント](/user-manual/editor/scenes/components/)を参照してください。 `data` 引数は省略することができ、デフォルト値が使用されます。

## コンポーネントの削除

```javascript
var entity = new pc.Entity();

// デフォルトの値でCameraコンポーネントを追加する
entity.addComponent("camera");

// Cameraコンポーネントを削除する
entity.removeComponent("camera");
```

エンティティからコンポーネントを個別に削除するには、エンティティ上で `removeComponent` メソッドを呼び出します。

## エンティティの削除

```javascript
// 新しいエンティティを作成する
var entity = new pc.Entity();

// デフォルトの値で新しいCameraコンポーネントを追加する
entity.addComponent("camera");

// 新しいModelコンポーネントを作成してエンティティに追加する
entity.addComponent("render", {
    type: 'box',
});

// エンティティ階層に追加する
this.app.root.addChild(entity);

// エンティティを削除し階層から削除する
entity.destroy();
```

エンティティを使い終わったら、エンティティ上の `destroy` メソッドを呼び出します。これにより、すべてのコンポーネントが削除され、エンティティが階層から削除されます。子エンティティも同じように削除されます。

## 実践

```javascript
var EntityCreator = pc.createScript('entityCreator');

EntityCreator.attributes.add('material', {
    type: 'asset',
    assetType: 'material'
});

EntityCreator.attributes.add('boxDimensions', {
    type: 'number',
    default: 10
});

EntityCreator.attributes.add('lifetime', {
    type: 'number',
    default: 5
});

EntityCreator.attributes.add('maxCubes', {
    type: 'number',
    default: 10
});

// 初期化コード(エンティティごとに一度呼び出される)
EntityCreator.prototype.initialize = function() {
    this.entities = [];
};

// 更新コード(フレーム毎に呼び出される)
EntityCreator.prototype.update = function(dt) {
    // maxCubes 未満ならば新しいキューブを作成する
    while (this.entities.length < this.maxCubes) {
        this.spawnCube();
    }

    // エンティティをループして、その時間が過ぎたら削除する
    for (i = 0; i < this.entities.length; i++) {
        this.entities[i].timer -= dt;
        if (this.entities[i].timer < 0) {
            // entity.destroy() はすべてのコンポーネントを削除し、エンティティを階層から削除する
            this.entities[i].entity.destroy();

            // ローカルリストから削除する
            this.entities.splice(i, 1);
        }
    }
};

EntityCreator.prototype.spawnCube = function () {
    var entity = new pc.Entity();

    // 新しいModelコンポーネントを作成してエンティティに追加する
    entity.addComponent("render", {
        type: 'box'
    });

    // マテリアルを設定する
    entity.render.material = this.material.resource;

    // ランダムな位置に移動する
    entity.setLocalPosition(
        pc.math.random(-this.boxDimensions, this.boxDimensions),
        pc.math.random(-this.boxDimensions, this.boxDimensions),
        pc.math.random(-this.boxDimensions, this.boxDimensions)
    );

    // 階層に追加する
    this.app.root.addChild(entity);

    // 削除するまでのランダムな期間をローカルリストに格納する
    this.entities.push({
        entity: entity,
        timer: pc.math.random(0, this.lifetime)
    });
};
```

これは完全なエンティティスクリプトであり、チュートリアルの先頭で動作を確認できます。それは常に、Model Component が添付された新しいエンティティを作成および破棄します。

[ここをクリックして完全なシーンを表示](https://playcanvas.com/editor/scene/440341)してください。
