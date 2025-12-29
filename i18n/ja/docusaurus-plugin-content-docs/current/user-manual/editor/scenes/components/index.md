---
title: コンポーネント
---

コンポーネントは、エンティティに追加または削除できる機能をカプセル化します。たとえば、コンポーネントを使用してエンティティがサウンドを再生したり、3Dモデルをレンダリングしたり、スクリプトを実行したりすることができます。

You can add a component to an entity using the PlayCanvas Editor or by using the Engine API. The properties exposed by components are listed in the [Inspector](/user-manual/editor/interface/inspector) when you select an Entity.

## コンポーネントの種類

PlayCanvasエンジンには多くの異なるコンポーネントが定義されています：

| コンポーネント (Component)                         | 説明                                                                   |
| --------------------------------- | ----------------------------------------------------------------------------- |
| [Anim](anim)                      | エンティティ階層で実行できる状態グラフとアニメーションを指定します。 |
| [Audio Listener](audiolistener)   | 3Dオーディオ再生のためのリスナーの場所を指定します。                 |
| [Button](button)                  | ユーザーインタフェースのボタンを作成します。                                              |
| [Camera](camera)                  | エンティティの位置からシーンをレンダリングします。                            |
| [Collision](collision)            | エンティティに衝突ボリュームを割り当てます。                                     |
| [Element](element)                | ユーザーインターフェースのテキストまたは画像要素を定義します。                               |
| [GSplat](gsplat)                  | Renders a 3D Gaussian Splat at the location of the entity.                    |
| [Layout Child](layoutchild)       | 1つの要素について、デフォルトのレイアウトグループプロパティを上書きします。                    |
| [Layout Group](layoutgroup)       | 子ユーザーインターフェース要素の位置とスケールを自動的に設定します。       |
| [Light](light)                    | エンティティに動的な光源をアタッチします。                                |
| [Particle System](particlesystem) | エンティティにパーティクルシステムをアタッチします。                                     |
| [Rigid Body](rigidbody)           | エンティティをシーンの物理シミュレーションに追加します。                           |
| [Render](render)                  | グラフィカルプリミティブまたはレンダーアセットをレンダリングします。                              |
| [Screen](screen)                  | ユーザーインターフェースの領域とレンダリングを定義します。                           |
| [Script](script)                  | エンティティがカスタムの振る舞いを実装するためのJavaScriptフラグメントを実行できるようにします。   |
| [Scrollbar](scrollbar)            | Scrollviewコンポーネントのスクロール制御を定義します。                       |
| [Scroll View](scrollview)         | ユーザーインターフェース内のスクロール可能なエリアを定義します。                                |
| [Sound](sound)                    | Audioアセットを再生します。                                                           |
| [Sprite](sprite)                  | エンティティの位置に2Dグラフィックをレンダリングします。                            |

### 非推奨のコンポーネント

PlayCanvasはいくつかの非推奨のコンポーネントを提供しています。これらのコンポーネントの使用は新しいプロジェクトでは推奨されません。

| コンポーネント (Component)              | 説明                                                                                   |
| ---------------------- | --------------------------------------------------------------------------------------------- |
| [Animation](animation) | エンティティのモデルコンポーネントで指定されたモデル上で実行できるアニメーションを指定します。 |
| [Model](model)         | エンティティの位置に3Dモデルをレンダリングします。                                             |
