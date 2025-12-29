---
title: Collision
---

Collisionコンポーネントは、エンティティにコリジョンを割り当てます。 'Type'属性に基づいてコンポーネントのインターフェースは動的に異なる属性を表示します。

Collisionコンポーネントは、コンポーネントパネルの右上にあるトグルを使用して有効または無効にできます。有効で、かつコンポーネントがトリガー体積である場合(姉妹のRigidBodyコンポーネントを持たないため)、トリガー体積が有効になります。同様に、コンポーネントに姉妹のRigidBodyコンポーネントがある場合、rigidbodyが有効になります。

#### Box

![Collision component (Box)](/img/user-manual/editor/scenes/components/component-collision-box.png)

#### Capsule

![Collision component (Capsule)](/img/user-manual/editor/scenes/components/component-collision-capsule.png)

#### Compound

![Collision component (Compound)](/img/user-manual/editor/scenes/components/component-collision-compound.png)

#### Cone

![Collision component (Cone)](/img/user-manual/editor/scenes/components/component-collision-cone.png)

#### Cylinder

![Collision component (Cylinder)](/img/user-manual/editor/scenes/components/component-collision-cylinder.png)

#### Mesh

![Collision component (Mesh)](/img/user-manual/editor/scenes/components/component-collision-mesh.png)

#### Sphere

![Collision component (Sphere)](/img/user-manual/editor/scenes/components/component-collision-sphere.png)

エンティティにRigidBodyコンポーネントがある場合、Collisionコンポーネントはrigidbodyの形状を決定します。RigidBodyコンポーネントが存在しない場合、Collisionコンポーネントはトリガー体積として扱われます。トリガー体積は、シーン内の他のRigidBodyに影響を与えることはできません。代わりに、Scriptコンポーネントを追加し、トリガーイベントに応答するスクリプトをアタッチできます。たとえば、RigidBodyコンポーネントを持つ別のエンティティがトリガーに入るか出ると、スクリプトに通知できます。

## Properties

| プロパティ名     | 説明 |
|--------------|-------------|
| タイプ         | プリミティブのタイプ。次のいずれかができます:<ul><li>Box</li><li>Sphere</li><li>Capsule</li><li>Mesh</li></ul> |
| Half Extents | Boxのみ。コリジョンボックスの半径。これは3次元ベクトルで、ローカルスペースの半幅、半高度、および半深度です。 |
| Axis         | Capsuleのみ。カプセルをエンティティのローカルスペースのX、Y、またはZ軸に整列させます。 |
| Height       | Capsuleのみ。カプセルの先端から先端までの高さです。 |
| Radius       | SphereとCapsuleのみ。球体またはカプセルの体の半径です。 |
| アセット (Asset)        | Mesh only. The [render asset](../../../assets/types/render.md) or model asset that will be used as a source for the triangle-based collision mesh. |

## スクリプトインターフェース

[Scriptコンポーネント][8]を使用してCollisionコンポーネントのプロパティを制御できます。Collisionコンポーネントのスクリプティングインターフェイスは[こちら][9]です。

[8]: /user-manual/editor/scenes/components/script
[9]: https://api.playcanvas.com/engine/classes/CollisionComponent.html
