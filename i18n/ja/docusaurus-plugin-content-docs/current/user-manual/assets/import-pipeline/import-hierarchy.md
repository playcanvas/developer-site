---
title: ヒエラルキーを含むモデルのインポート
layout: usermanual-page.hbs
sidebar_position: 1
---

PlayCanvasでは、シーン内のエンティティ階層ごとにメッシュを持つモデルをインポートすることができます。これにより、エディタで異なるメッシュを直接編集することができます。コンポーネントを追加したり、他のエンティティをアタッチしたり、エンティティ階層内のエンティティを移動/回転/スケールしたりすることができます。

![Edit model hierarchy in the Editor][edit_hierarchy_gif]

## 有効化の方法

<div class="alert alert-info">
    新しいプロジェクトでは、これが既定で有効になっています。
</div>

「プロジェクト設定」を開きます。

<img loading="lazy" src="/images/user-manual/assets/import-pipeline/import-hierarchy/project-settings.png" width="480" />

'Asset Tasks' までスクロールし、 'Import Hierarchy' を有効にします。

<img loading="lazy" src="/images/user-manual/assets/import-pipeline/import-hierarchy/asset-tasks.png" width="360" />

## モデルのインポート

最初のモデルとアニメーションのインポートについての完全なチュートリアルは[こちら][first_model_animation_import]で見つけることができます。

概要として、モデルファイルを 'アセットパネル' にドラッグします。

![Drag Model into Assets Panel][import_model_gif]

インポート時に次のアセットが作成されます。

![Created Assets][created_assets_img]

| アセットタイプ | 説明 |
|------------|-------------|
| **[マテリアル][material_asset]** | インポートされたモデルで使用される、メッシュインスタンスにマップされたマテリアル。 |
| **[テクスチャ][texture_asset]** | モデルファイルに埋め込まれたテクスチャ(ある場合)。これらは、関連するマテリアルに自動的にマップされます。 |
| **[テンプレート][template_asset]** | モデルのシーン階層を保存するテンプレート。テンプレートのインスタンスを作成して、モデルをシーンに持ち込みます。 |
| **Container** | モデルのすべてのメッシュを保存するGLB。 |
| **Render** | Renderアセットは、コンテナアセット内のメッシュを参照し、[Renderコンポーネント][render_component]でシーン内のメッシュをレンダリングするために使用されます。また、[Collisionコンポーネント][collision_component]として、物理用のメッシュとしても使用できます。 |

## モデルの更新

ヒエラルキーはテンプレートの一部として作成されるため、モデルが更新されると、それはシーンのテンプレートインスタンスに影響を与える可能性があります。

テンプレート内のエンティティに追加されたコンポーネントは、更新中にメッシュインスタンスがもう存在しない場合を除いて保持されます。

ただし、Scriptコンポーネントがテンプレート内のエンティティに追加され、それが更新されたモデルの一部ではなくなった場合、データの損失がないように、そのエンティティはテンプレート内のルート エンティティの下に移動されます。アップデート前にその下にあったエンティティも保持されます。

エディターが新しいメッシュインスタンス、または削除されたメッシュインスタンスをどのように判断するかは、以下のとおりです。

- アップデート中に、メッシュインスタンスの名前とその親メッシュのインスタンスの名前が既存のメッシュインスタンスとその親と一致している場合、それらは階層内の同じメッシュインスタンスと見なされ、更新されます。
- アップデート中に、メッシュインスタンスの名前が存在しない場合、新しいエンティティがテンプレートに追加されたものと見なされます。
- アップデート中に、ルールに従って与えられた対応するメッシュインスタンスが存在しない場合、そのメッシュインスタンスが削除されたと見なされ、エンティティがテンプレートから削除されます。ただし、上述した例外があり、テンプレートにScriptコンポーネントが追加された場合、そのエンティティはルートに保持されます。Scriptコンポーネントが追加されなかった場合は、テンプレートから削除されます。

[edit_hierarchy_gif]: /images/user-manual/assets/import-pipeline/import-hierarchy/edit-hierarchy.gif
[import_model_gif]: /images/user-manual/assets/import-pipeline/import-hierarchy/import-model.gif
[created_assets_img]: /images/user-manual/assets/import-pipeline/import-hierarchy/created-assets.png
[material_asset]: /user-manual/assets/materials/physical-material/
[texture_asset]: /user-manual/assets/textures/
[template_asset]: /user-manual/templates/
[render_component]: /api/pc.RenderComponent.html
[collision_component]: /api/pc.CollisionComponent.html
[first_model_animation_import]: /tutorials/importing-first-model-and-animation/
