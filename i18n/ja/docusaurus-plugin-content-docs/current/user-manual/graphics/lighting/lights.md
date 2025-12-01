---
title: ライト
---

現実世界では、周囲の環境は多くの光源から照らされています。太陽、街灯、テレビ画面などです。PlayCanvasのシーンでは、現実に見られるさまざまなタイプの光を近似するために、さまざまなタイプの光源と光源の形状を設定する能力を持っています。

各種ライトタイプと光源形状の説明は以下の通りです。さらに、異なるライトタイプの組み合わせの例は、下記の[表](#use-cases)に示します。

## Light Types {#light-types}

PlayCanvasには3つの種類の光源があります。

* ディレクショナルライト (Directional Lights)
* オムニライト (Omni Lights)
* スポットライト (Spot Lights)

### Directional Lights {#directional-lights}

私たちにとって最も身近な光源は太陽です。太陽は地球から遠いため、地球の表面に当たる光は一方向から来たかのように近似することができます。PlayCanvasでは、このタイプの光源を「方向性(ディレクショナル)光」と呼びます。

非選択時、方向性光は以下のアイコンでエディタの3Dビューに表示されます。

![Directional light icon](/img/user-manual/graphics/lighting/lights/directional_icon.jpg)

ヒエラルキーパネルとインスペクターパネルでライトを選択するには、このアイコンをクリックします。

方向性光は以下のようにオブジェクトを照らします。

![Directional light](/img/user-manual/graphics/lighting/lights/directional.jpg)

### Omni Lights {#omni-lights}

オムニライトは、すべての方向に光を発する光源です。このタイプの光源の例として、キャンドルやその他の例が以下の[table](#use-cases)に示されています。

非選択時、オムニライトは以下のアイコンでエディタの3Dビューに表示されます。

![Omni light icon](/img/user-manual/graphics/lighting/lights/point_icon.jpg)

ヒエラルキーパネルとインスペクターパネルでライトを選択するには、このアイコンをクリックします。

オムニライトは以下のようにオブジェクトを照らします。

![Omni light](/img/user-manual/graphics/lighting/lights/point.jpg)

### Spot Lights {#spot-lights}

スポットライトもオムニライトと同様に、すべての方向に光を発します。ただし、スポットライトからの光は円錐形に制限されます。

非選択時、スポットライトは以下のアイコンでエディターの3Dビューに表示されます。

![Spot light icon](/img/user-manual/graphics/lighting/lights/spot_icon.jpg)

ヒエラルキーパネルとインスペクターパネルでライトを選択するには、このアイコンをクリックします。

スポットライトは以下のようにオブジェクトを照らします。

![Spot light](/img/user-manual/graphics/lighting/lights/spot.jpg)

## Light Shapes {#light-shapes}

光源の形状には4つのタイプがあります。

* 点光源
* 長方形
* 円盤
* Sphere

### Punctual {#punctual}

点光源の形状は極めて小さな点です。これはデフォルトの光源形状であり、物理的には正確ではありませんが、比較的低コストで光源を近似しています。他の光源形状は描画により高いコストがかかりますが、より正確な照明と鏡面反射を提供します。

### Rectangle {#rectangle}

長方形の光源形状は、指定された幅と高さを持つ平らな4つの辺からなります。

### Disk {#disk}

円盤の光源形状は、指定された半径を持つ円形で平らな形状です。

### Sphere {#sphere}

球体の光源形状は、指定された半径を持つ球形です。

![Shapes](/img/user-manual/graphics/lighting/lights/shapes.jpg)

## Use Cases {#use-cases}

以下の[table](#use-cases)に、各光源形状と光源タイプに対する一般的な使用例が示されています。

| 形状/タイプ    | 点光源      | 長方形               | 円盤                  | Sphere              |
| ------------- |---------------| ------------------------| ----------------------| --------------------|
| 方向性   | 太陽           | ❌                       | 太陽または月           | 太陽または月         |
| オムニ          | 影のない電球 | ❌                       | ❌                     | 影のない丸い電球 |
| スポット          | トーチ         | テレビ画面               | 影のある電球           | 影のある丸い電球   |

❌ = 一般的な使用例は無し - ただし、アプリケーション/ゲーム固有の照明効果には使用できます。

## パフォーマンスに関する考慮事項 {#performance-considerations}

長方形、円盤、球体の形状を持つ光源は、点光源に比べて描画により高いコストがかかります。そのため、比較的小さな光源を使用する場合や、点光源が明らかに不正確に見えるような反射面が存在しない場合には、点光源の形状を使用してください。
