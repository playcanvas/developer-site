---
title: Texture Atlas
sidebar_position: 16
---

![テクスチャアトラス][1]

テクスチャアトラス (Texture Atlas) とは、テクスチャ内の 'フレーム' (Frames) を記述する補足データをともなうTextureアセットです。フレームは、テクスチャ内で定義された領域で 'ピボット' (Pivot) ポイントのある長方形として表示されます。ピボットポイントはフレームの位置および回転の中心を設定します。

テクスチャアトラスは、通常のテクスチャアセットを右クリックして **Create Atlas** を選択することで作成されます。またはデフォルトのアセットのインポート設定を変更し、 [Create Atlases][3]を有効化します。

テクスチャアトラスは、[Spriteアセット][4]と組み合わせて2Dグラフィックをレンダリングするために使用されます。

## Properties

### フレーム (Frames)

テクスチャアトラスのフレームは、通常の整数文字列によってキーの設定がされています。フレームのフォーマットは以下の通りです。

```
{
    rect:[0、0、0、0]、// u、v、width、height - 幅と高さはピクセル単位
    pivot:[0、0]、// x、y - 比率0-1
    border:[0、0、0、0] // left、bottom、right - 上はピクセル単位
}
```

### テクスチャプロパティ

フレームのデータに加え、テクスチャアトラスには[Textureアセット][2]のプロパティが含まれます。

[1]: /images/user-manual/assets/texture-atlas/texture-atlas.jpg
[2]: /user-manual/assets/textures
[3]: /user-manual/designer/settings#create-atlases
[4]: /user-manual/assets/sprites
