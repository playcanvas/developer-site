---
title: Rigid Body
---

Rigid Bodyコンポーネントを使用すると、エンティティがシーンの物理シミュレーションに参加できるようになります。これにより、エンティティの移動を現実的にシミュレートできます。コンポーネントインターフェースは、Typeに基づいて異なる属性を動的に表示します。

#### Static

![Rigid Body Component (Static)](/img/user-manual/editor/scenes/components/component-rigid-body-static.png)

#### Dynamic

![Rigid Body Component (Dynamic)](/img/user-manual/editor/scenes/components/component-rigid-body-dynamic.png)

#### Kinematic

![Rigid Body Component (Kinematic)](/img/user-manual/editor/scenes/components/component-rigid-body-kinematic.png)

剛体の形状を定義するには、同じエンティティに[Collisionコンポーネント](collision.md)を追加する必要があります。そうしないと、Rigid Bodyコンポーネントは効果を持たず、物理シミュレーションに参加しません。

## プロパティ

| プロパティ名 | 説明 |
|-----------------|-------------|
| Type            | ボディのタイプ。オプション: Static、Dynamic、Kinematic。 |
| Mass            | Dynamicのみ。ボディの質量（キログラム、ワールドユニットがメートルの場合）。 |
| Linear Damping  | Dynamicのみ。毎秒失われる線形速度の割合を指定します（0〜1）。 |
| Angular Damping | Dynamicのみ。毎秒失われる角速度の割合を指定します（0〜1）。 |
| Linear Factor   | Dynamicのみ。各ワールド軸（X、Y、Z）でのボディの線形移動の乗数。任意の軸で0に設定すると、その軸での移動は発生しません - 2Dゲームや制約付き移動の作成に便利です。 |
| Angular Factor  | Dynamicのみ。各ワールド軸（X、Y、Z）周りのボディの角度（回転）運動の乗数。任意の軸で0に設定すると、その軸周りの回転は発生しません。 |
| Friction        | 他のボディと接触している際にボディがどれだけ早く速度を失うかを制御します（0〜1）。 |
| Restitution     | ボディの弾性（バウンス性）の測定値（0〜1）。警告: 1に設定すると、移動するボディは停止しなくなります（1未満のRestitutionを持つ他のボディと衝突するか、スクリプトで停止させない限り）。 |

## 関連項目

- [Collisionコンポーネント](collision.md) - 剛体の形状を定義するために必要
- [物理](/user-manual/physics) - 物理システムについて詳しく学ぶ

## スクリプトインターフェース

[Scriptコンポーネント](script.md)を使用してRigid Bodyコンポーネントのプロパティを制御できます。Rigid Bodyコンポーネントのスクリプトインターフェースは[こちら](https://api.playcanvas.com/engine/classes/RigidBodyComponent.html)です。
