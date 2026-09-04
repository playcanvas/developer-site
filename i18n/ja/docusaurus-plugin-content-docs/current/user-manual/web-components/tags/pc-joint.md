---
title: <pc-joint>
description: "pc-joint要素のリファレンス: fixed・ball・hinge・slider・6dofの物理ジョイントで2つのリジッドボディを拘束し、リミット・モーター・スプリング・破断インパルスを設定します。"
---

`<pc-joint>`タグは、2つのリジッドボディを互いに拘束します。蝶番の付いた扉、揺れる鎖、スライドする引き出し、負荷で切れるロープなどです。

:::note[使用法]

* [`<pc-entity>`](../pc-entity)、[`<pc-model>`](../pc-model)、または[`<pc-node>`](../pc-node)の直接の子である必要があります。
* 拘束される両方のエンティティに[`<pc-rigid-body>`](../pc-rigid-body)が必要で、物理には`Ammo`モジュールが必要です。[`<pc-wasm>`](../pc-wasm)を参照してください。

:::

ジョイントを保持しているエンティティ自体は**拘束されません**。そのワールドトランスフォームが*ジョイントフレーム*、つまり拘束が働く支点と軸を定義します。フレームのローカルX軸が主軸です。hingeはその軸を中心に回転し、sliderはその軸に沿って移動し、ballはその軸を中心にひねります。拘束される側のボディは`entity-a`と`entity-b`で指定します。

つまりジョイントとは、支点となる位置に置き、動かしたい向きを向けた3つ目のエンティティです。

```html
<pc-entity name="hinge-anchor" position="0 2 0">
    <pc-collision half-extents="0.25 0.25 0.25"></pc-collision>
    <pc-rigid-body></pc-rigid-body>
</pc-entity>
<pc-entity name="hinge-arm" position="1 2 0">
    <pc-collision half-extents="1 0.1 0.1"></pc-collision>
    <pc-rigid-body type="dynamic"></pc-rigid-body>
</pc-entity>

<!-- ジョイントはどちらのボディでもなく、支点に置きます -->
<pc-entity name="hinge" position="0 2 0" rotation="0 90 0">
    <pc-joint type="hinge" entity-a="#hinge-arm" entity-b="#hinge-anchor"
              enable-limits limits="-100 100"></pc-joint>
</pc-entity>
```

`entity-b`を空にすると、`entity-a`をワールド空間の固定点に拘束します。何もない場所に留めたいときはこの方法です。ジョイントのエンティティを支点の位置で`entity-a`の子にするのも一般的な構成で、支点をその部品と一緒に保てます。

:::warning[アルファ]

エンジンのジョイントコンポーネントはアルファ版であるため、挙動やAPIが変更される可能性があります。この要素もそれに追随します。

:::

## 属性 {#attributes}

<div className="attribute-table">

| 属性 | タイプ | デフォルト | 説明 |
| --- | --- | --- | --- |
| `angular-damping` | Vector3 | `"1 1 1"` | 角度軸ごとのスプリングのダンピング。`6dof`で使用します |
| `angular-equilibrium` | Vector3 | `"0 0 0"` | 角度スプリングの静止角度。`6dof`で使用します |
| `angular-limits-x` | Vector2 | `"0 0"` | フレームのX軸まわりの回転リミット。「min max」を度で指定します。`6dof`で使用します |
| `angular-limits-y` | Vector2 | `"0 0"` | フレームのY軸まわりの回転リミット。「min max」を度で指定します。`6dof`で使用します |
| `angular-limits-z` | Vector2 | `"0 0"` | フレームのZ軸まわりの回転リミット。「min max」を度で指定します。`6dof`で使用します |
| `angular-motion-x` | Enum | `"locked"` | フレームのX軸まわりの回転の自由度: `"locked"` \| `"limited"` \| `"free"`。`6dof`で使用します |
| `angular-motion-y` | Enum | `"locked"` | フレームのY軸まわりの回転の自由度: `"locked"` \| `"limited"` \| `"free"`。`6dof`で使用します |
| `angular-motion-z` | Enum | `"locked"` | フレームのZ軸まわりの回転の自由度: `"locked"` \| `"limited"` \| `"free"`。`6dof`で使用します |
| `angular-stiffness` | Vector3 | `"0 0 0"` | 角度軸ごとのスプリングの剛性。`6dof`で使用します |
| `break-impulse` | Number | 破断しない | 拘束が破断するインパルスのしきい値。何があっても保持するジョイントにするには省略します |
| `enable-collision` | Boolean | `"false"` | 拘束される2つのボディが互いに衝突するかどうか |
| `enable-limits` | Boolean | `"false"` | ジョイントのリミットを適用するかどうか。これを設定するまでリミット系の属性は効果がありません |
| `enabled` | Boolean | `"true"` | コンポーネントの有効状態 |
| `entity-a` | [Entity Reference](../attributes.md#entity-references) | - | 1つ目のボディを提供する[`<pc-entity>`](../pc-entity)への参照。[`<pc-rigid-body>`](../pc-rigid-body)が必要です |
| `entity-b` | [Entity Reference](../attributes.md#entity-references) | - | 2つ目のボディを提供する[`<pc-entity>`](../pc-entity)への参照。空にすると`entity-a`をワールド空間の固定点に拘束します |
| `limits` | Vector2 | `"-45 45"` | 主軸まわりの回転または移動のリミット。「min max」で、`hinge`では度、`slider`ではユニットです |
| `linear-damping` | Vector3 | `"1 1 1"` | 直線軸ごとのスプリングのダンピング。`6dof`で使用します |
| `linear-equilibrium` | Vector3 | `"0 0 0"` | 直線スプリングの静止位置。`6dof`で使用します |
| `linear-limits-x` | Vector2 | `"0 0"` | フレームのX軸に沿った移動リミット。「min max」で指定します。`6dof`で使用します |
| `linear-limits-y` | Vector2 | `"0 0"` | フレームのY軸に沿った移動リミット。「min max」で指定します。`6dof`で使用します |
| `linear-limits-z` | Vector2 | `"0 0"` | フレームのZ軸に沿った移動リミット。「min max」で指定します。`6dof`で使用します |
| `linear-motion-x` | Enum | `"locked"` | フレームのX軸に沿った直線の自由度: `"locked"` \| `"limited"` \| `"free"`。`6dof`で使用します |
| `linear-motion-y` | Enum | `"locked"` | フレームのY軸に沿った直線の自由度: `"locked"` \| `"limited"` \| `"free"`。`6dof`で使用します |
| `linear-motion-z` | Enum | `"locked"` | フレームのZ軸に沿った直線の自由度: `"locked"` \| `"limited"` \| `"free"`。`6dof`で使用します |
| `linear-stiffness` | Vector3 | `"0 0 0"` | 直線軸ごとのスプリングの剛性。`6dof`で使用します |
| `max-motor-force` | Number | `"0"` | モーターが加えられる最大のトルクまたは力。モーターを使わない場合は0のままにします。`hinge`と`slider`で使用します |
| `motor-speed` | Number | `"0"` | モーターの目標速度。`hinge`と`slider`で使用します |
| `swing-limit-y` | Number | `"45"` | フレームのY軸まわりの最大スイング角（度）。`ball`で使用します |
| `swing-limit-z` | Number | `"45"` | フレームのZ軸まわりの最大スイング角（度）。`ball`で使用します |
| `twist-limit` | Number | `"20"` | 主軸まわりの最大ひねり角（度）。`ball`で使用します |
| `type` | Enum | `"fixed"` | 拘束の種類: `"fixed"` \| `"ball"` \| `"hinge"` \| `"slider"` \| `"6dof"` |

</div>

## ジョイントのタイプ {#joint-types}

上の属性のうちどれが意味を持つかは`type`が決めます。表の大部分は`6dof`のための仕組みで、単純な4つのタイプはそれらを無視します。使いたいタイプの行だけを読んでください。

| タイプ | 拘束の内容 | 使用する属性 |
| --- | --- | --- |
| `fixed` | 2つのボディを剛体的に固定します | — |
| `ball` | ボールジョイント: 支点まわりの自由な回転。スイングとひねりのリミットは任意です | `swing-limit-y`、`swing-limit-z`、`twist-limit` |
| `hinge` | フレームのX軸まわりの回転。リミットとモーターは任意です | `limits`、`max-motor-force`、`motor-speed` |
| `slider` | フレームのX軸に沿った移動。リミットとモーターは任意です | `limits`、`max-motor-force`、`motor-speed` |
| `6dof` | 直線・角度の各軸を個別にlocked・limited・freeに設定。スプリングは任意です | `linear-*`と`angular-*`の各系統 |

どのタイプでも`entity-a`、`entity-b`、`enable-collision`、`break-impulse`は有効です。

リミットは二重にオプトインです。`enable-limits`*と*リミット値の両方が必要です。`limits="-100 100"`を設定しても`enable-limits`がない`hinge`は自由に振れます。

`6dof`ジョイントでは各軸が`"locked"`から始まるため、他に何も設定しないジョイントは`fixed`と同じように振る舞います。`linear-motion-*`と`angular-motion-*`で開放したい軸を開き、`"limited"`にした軸を対応する`linear-limits-*`または`angular-limits-*`で制限してください。

## フレームとリミット {#frames-and-limits}

リミットについて2つ、つまずきやすい点があります。どちらも属性の表からは推測できません。

**リミットは開始時のポーズを基準に測られ、ジョイントのエンティティを基準にしません。** 拘束が作成された時点で2つのジョイントフレームは一致するため、そこではすべての自由度がゼロを示します。したがってhingeの`limits="0 110"`は「絶対角度の0度から110度の間」ではなく、「このボディが始まった位置から110度まで」という意味になります。`*-equilibrium`の静止値も同様です。

**フレームは一度だけ取得されます。** フレームは拘束が作成されるとき（通常はコンポーネントが有効になり、両方のボディがシミュレーションに入ったとき）に取得されるため、その後にジョイントのエンティティを動かしても何も変わりません。現在のトランスフォームから取り直すには、基盤となるコンポーネントの`refreshFrames()`を呼びます。エンティティのスケールは全体を通じて無視されます。これはリジッドボディの挙動と同じです。

符号について。直線の自由度は、`entity-b`（`entity-b`が空の場合はワールドのアンカー）が`entity-a`に対してフレームの正の軸方向へ動くときに正になります。角度の自由度は逆で、`entity-a`が`entity-b`またはワールドのアンカーに対して、各軸の正の端から見て反時計回りに回転するときに正になります。リミットが反転して感じられる場合、たいていはこの対応関係が原因です。

## イベント {#events}

このイベントは、[`addEventListener()`](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener)を使用してリッスンできます。

| イベント | 説明 |
| --- | --- |
| `break` | ジョイントに加わるインパルスが`break-impulse`を超え、拘束が破断したときに発生します。 |

ここにある他のほとんどの要素イベントと違い、`break`はバブリングしcomposedであるため、祖先要素に1つリスナーを付けるだけでシーン内のすべてのジョイントを監視できます。

```javascript
document.addEventListener('break', (event) => {
    console.log(`${event.target.getAttribute('entity-a')} came loose`);
});
```

破断したジョイントはボディの拘束をやめ、自動で復帰することはありません。次のいずれかで復帰します。基盤となるコンポーネントの`refreshFrames()`を呼ぶ、コンポーネントの`enabled`を切り替える、または`type`・`entity-a`・`entity-b`を変更する。

```javascript
const joint = document.querySelector('pc-joint');
joint.component.refreshFrames(); // 復帰し、現在のトランスフォームからフレームを取り直します
```

## 例 {#example}

モーター駆動のhingeジョイントが、静的なハブを軸にブレードを回転させます。ジョイントエンティティは支点に置かれ、`"0 90 0"` の回転により、ローカルX軸 — ヒンジ軸 — がカメラの方を向いています。`motor-speed` を変えたり (負の値で逆回転)、`enable-limits limits="-60 60"` を追加してモーターがストッパーで止まる様子を見たりしてみましょう:

```html live-example
<pc-app>
    <pc-wasm name="Ammo" glue="https://developer.playcanvas.com/assets/modules/ammo/ammo.wasm.js" wasm="https://developer.playcanvas.com/assets/modules/ammo/ammo.wasm.wasm" fallback="https://developer.playcanvas.com/assets/modules/ammo/ammo.js"></pc-wasm>
    <pc-scene>
        <pc-entity name="camera" position="0 2 6">
            <pc-camera clear-color="#1d1f2b"></pc-camera>
        </pc-entity>
        <pc-entity name="light" rotation="45 30 0">
            <pc-light></pc-light>
        </pc-entity>

        <!-- 静的なハブ -->
        <pc-entity id="hub" position="0 2 0" rotation="90 0 0" scale="0.5 0.3 0.5">
            <pc-render type="cylinder"></pc-render>
            <pc-collision type="cylinder" radius="0.25" height="0.3"></pc-collision>
            <pc-rigid-body></pc-rigid-body>
        </pc-entity>

        <!-- 動的なブレード -->
        <pc-entity id="blade" position="0 2 0" scale="4 0.3 0.2">
            <pc-render type="box"></pc-render>
            <pc-collision half-extents="2 0.15 0.1"></pc-collision>
            <pc-rigid-body type="dynamic"></pc-rigid-body>
        </pc-entity>

        <!-- ジョイントは支点に置きます。フレームのX軸がヒンジ軸になります -->
        <pc-entity name="hinge" position="0 2 0" rotation="0 90 0">
            <pc-joint type="hinge" entity-a="#blade" entity-b="#hub"
                      motor-speed="90" max-motor-force="1000"></pc-joint>
        </pc-entity>
    </pc-scene>
</pc-app>
```

[Physics Jointsのサンプル](https://playcanvas.github.io/web-components/examples/physics-joints.html)では各タイプを1つずつ構築しており、落下する重りで破断するfixedジョイントも含まれています。

## JavaScriptインターフェース {#javascript-interface}

[JointComponentElement API](https://api.playcanvas.com/web-components/classes/JointComponentElement.html)を使用して、`<pc-joint>`要素をプログラムで作成および操作できます。

`entity-a`と`entity-b`は設定された時点で解決されるため、後から作成されたエンティティは自動では取り込まれません。存在する状態で属性を再設定してください。

```javascript
const joint = document.querySelector('pc-joint');
joint.entityA = '#link-3'; // ここで再解決されます
```

どちらも他のエンティティ参照属性と同じ参照形式を受け付けます。エンティティの `name`（最も近い外側のエンティティから解決されます）、またはドキュメント全体の `#` セレクターです。[エンティティ参照](../attributes.md#entity-references)を参照してください。
