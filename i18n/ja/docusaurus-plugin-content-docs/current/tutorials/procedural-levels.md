---
title: プログラムでのステージの生成
tags: [procedural]
thumb: "https://s3-eu-west-1.amazonaws.com/images.playcanvas.com/projects/12/405864/A3MSWE-image-75.jpg"
---

<div className="iframe-container">
    <iframe src="https://playcanv.as/p/smskdMrk/" title="Procedural Levels" allow="camera; microphone; xr-spatial-tracking; fullscreen" allowfullscreen></iframe>
</div>

このプロジェクトでは、エディターで作成されたエンティティを元に、[clone()](https://api.playcanvas.com/engine/classes/Entity.html#clone) 関数を使用してステージ（レベル）をランダムに生成しています。

[チュートリアルプロジェクト](https://playcanvas.com/project/405864)のエディターからお試しください。

以下のスクリプトは非常にシンプルなステージ（レベル）生成プログラムです。エディタで設定された2つのエンティティ、「Grass（草）」と「House（家）」をタイルとして使用し、グリッドベースのレベルを作成します。レベルは、タイルの中からランダムに1つ選択し、そのタイルを複製して新しいエンティティを作成し、新しいエンティティを正しいグリッド位置に配置することで作成されます。

```javascript
var Generate = pc.createScript('generate');

Generate.attributes.add('numTilesX', {
    type: 'number',
    default: 10
});

Generate.attributes.add('numTilesY', {
    type: 'number',
    default: 10
});

// initialize code called once per entity
Generate.prototype.initialize = function() {
    // ワールドタイルとして使用する2つのテンプレートを作成しました
    // エディタの階層構造では、テンプレートを非表示にしておきます。
    // 私たちが生成したワールドは表示したくないからです。
    var templates = this.app.root.findByName('Templates');
    var grass = templates.findByName('Grass');
    var house = templates.findByName('House');

    for (var y = 0; y < this.numTilesY; y++) {
        for (var x = 0; x < this.numTilesX; x++) {
            // 草より家の方が大きい確率でタイルを選択
            var tile = (Math.random() > 0.8) ? house : grass;

            // タイルをクローン
            var e = tile.clone();

            // クローンされたタイルのワールド座標を設定します。
            // テンプレートのサイズが X 増後に 10x10 であるため、座標を 10 倍する必要があることに注意してください。
            e.setPosition((x - this.numTilesX / 2) * 10, 0, (y - this.numTilesX / 2) * 10);

            // シーンの階層にタイルを追加します。
            this.app.root.addChild(e);
        }
    }
};
```
