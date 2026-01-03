---
title: Collision
---

Collisionコンポーネントは、エンティティにコリジョンボリュームを割り当てます。コンポーネントのインターフェースは「Type」属性に基づいて動的に異なる属性を表示します。

Collisionコンポーネントは、コンポーネントパネルの右上にあるトグルを使用して有効または無効にできます。有効で、かつコンポーネントがトリガーボリュームである場合（兄弟のRigidbodyコンポーネントを持たないため）、トリガーボリュームが有効になります。同様に、コンポーネントに兄弟のRigidbodyコンポーネントがある場合、Rigidbodyが有効になります。

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

エンティティにRigidbodyコンポーネントがある場合、Collisionコンポーネントは剛体の形状を決定します。Rigidbodyコンポーネントが存在しない場合、Collisionコンポーネントはトリガーボリュームとして扱われます。トリガーボリュームは、シーン内の他の剛体のシミュレーションに影響を与えることはできません。代わりに、Scriptコンポーネントを追加し、トリガーイベントに応答するスクリプトをアタッチできます。たとえば、Rigidbodyコンポーネントを持つ別のエンティティがトリガーに入るか出ると、スクリプトに通知できます。

## プロパティ

| プロパティ名 | 説明 |
|-----------------|-------------|
| Type            | コリジョンプリミティブのタイプ。Box、Sphere、Capsule、Cylinder、Cone、Mesh、またはCompoundのいずれか。 |
| Half Extents    | Boxのみ。コリジョンボックスの半径。ローカルスペースの半幅、半高さ、半奥行きの3次元ベクトルです。 |
| Radius          | Sphere、Capsule、Cylinder、Coneのみ。コリジョン形状の半径。 |
| Height          | Capsule、Cylinder、Coneのみ。選択した軸に沿ったコリジョン形状の高さ。 |
| Axis            | Capsule、Cylinder、Coneのみ。コリジョン形状をエンティティのローカルスペースのX、Y、またはZ軸に整列させます。 |
| Convex Hull     | Meshのみ。有効にすると、コリジョンメッシュは凸包として扱われ、動的剛体でより効率的になります。無効の場合、メッシュは三角形メッシュ（凹型）として使用され、静的またはキネマティック剛体でのみ機能します。 |
| Model Asset     | Meshのみ。コリジョンメッシュのソースとして使用されるモデルアセット。Model AssetまたはRender Assetのいずれかを指定できますが、両方は指定できません。 |
| Render Asset    | Meshのみ。コリジョンメッシュのソースとして使用される[レンダーアセット](/user-manual/assets/types/render)。Model AssetまたはRender Assetのいずれかを指定できますが、両方は指定できません。 |
| Position Offset | エンティティの位置に対するコリジョン形状の位置オフセット。 |
| Rotation Offset | エンティティの回転に対するコリジョン形状の回転オフセット（度単位）。 |

## スクリプトインターフェース

[Scriptコンポーネント](/user-manual/editor/scenes/components/script)を使用してCollisionコンポーネントのプロパティを制御できます。Collisionコンポーネントのスクリプトインターフェースは[こちら](https://api.playcanvas.com/engine/classes/CollisionComponent.html)です。
