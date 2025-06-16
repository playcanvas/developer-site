---
title: Light
---

Lightコンポーネントは、Entityに動的な光源をアタッチします。 'Type'プロパティは、アタッチされる光源の種類と利用可能な他のプロパティを決定します。

Lightコンポーネントは、コンポーネントパネルの右上にあるトグルを使用して有効または無効にできます。有効にした場合、ライトはシーンを照らします。

#### 方向性

![Light component (Directional)](/img/user-manual/scenes/components/component-light-directional.png)

#### オムニ

![Light component (Omni)](/img/user-manual/scenes/components/component-light-point.png)

#### スポット

![Light component (Spot)](/img/user-manual/scenes/components/component-light-spot.png)

## Properties

| プロパティ名           | 説明 |
|--------------------|-------------|
| タイプ               | <ul><li> Directional:均一な方向に投影される光</li><li>Omni:周囲の全ての方向に投影される光のアタッチ</li><li>Spot:円錐の頂点から投影される光</li></ul>のいずれかを設定します。 |
| Color              | 投影される光の色を設定します。 |
| インテンシティ (Intensity)          | 光の強度を設定します。この値は、光の色のスカラー値として作用します。この値は1を超えることができます。 |
| Range              | OmniおよびSpotのみ。スポットライトのソースから寄与がゼロになる距離を設定します。 |
| Falloff Mode       | Omniおよびスポットのみ。ライトが減衰する速度を制御します。 |
| Cone Angle         | スポットのみ。最大から0になる光が投影される内部および外部の円錐角度、スポットライトの方向から測定します。 |
| Bake Lightmap      | このライトからライトマップのベイクを有効にします。 |
| Affect             | このライトによって照らされるオブジェクトのタイプを決定します。ダイナミックに光を受けるオブジェクトまたはライトマップされたオブジェクトの任意の組み合わせにすることができます。 |
| Cast Shadows       | チェックされている場合、光源によって影を投影するモデルが影を投影します。 |
| Shadow Update Mode | この光源の影マップが更新されるタイミングを決定します。次のいずれかを設定できます: <ul><li>Once:一度だけ生成されます。キャスター、レシーバー、およびライトが静的である場合に有用です。</li><li>Realtime:フレームごとに更新されます。</li></ul> |
| Resolution         | この光源によって生成される影マップの解像度を設定します。このプロパティは、Cast Shadowsが設定されている場合にのみ使用されます。高い値はより正確な影をもたらしますが、それにはパフォーマンスコストがかかります。 |
| Distance           | ディレクションライトのみ。シャドウディスタンスは、ディレクショナルライトから投影される影が見えなくなるカメラからの最大距離です。小さい値はより詳細な影を生成します。制限が近ければ、マップされる影のデータ量が少なくなります。シャドウマップのピクセルは空間的にマップされますので、シャドウマップがカバーする距離が短いほど、ピクセルが小さくなり、影がより高解像度になります。 |
| Shadow Type        | 使用する影マッピングアルゴリズムを決定します。選択肢によって影の外観と性能が影響を受けます。次のいずれかを設定できます: <ul><li>Shadow Map:PCF(Percentage Closer Filtering)シャドウマップ。</li><li>Variance Shadow Map(8bit):低精度のシャドウマップ。 VSMは通常、PCFシャドウよりも柔らかくなります。</li><li>Variance Shadow Map(16bit):中程度精度のシャドウマップ。8ビットVSMの2倍のVRAMを使用します。</li><li>Variance Shadow Map(32bit):高精度シャドウマップ。16ビットVSMの2倍のVRAMを使用します。</li></ul> |
| Shadow Bias        | バイアス値は、レンダリングアーティファクトである '影のにきび'および 'ピーターパンニング' を除去するための調整を行います。2つの値は影のバイアスと法線オフセットバイアスです。 |
| Cookie             | Omniおよびスポットのみ。ライトから投影されるTextureアセットを設定します。 |
| Cookie Intensity   | Omniおよびスポットのみ。クッキーテクスチャの強度を定義します。 |
| Cookie Falloff     | スポットのみ。スポットライトの減衰を無効にします。 |

## スクリプトインターフェース

Lightコンポーネントのプロパティを[Scriptコンポーネント][4]を使用して制御できます。Lightコンポーネントのスクリプトインターフェースは[こちら][5]です。

[4]: /user-manual/scenes/components/script
[5]: https://api.playcanvas.com/engine/classes/LightComponent.html
