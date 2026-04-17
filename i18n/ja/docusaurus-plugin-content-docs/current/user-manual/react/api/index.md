---
title: API
description: PlayCanvas ReactコンポーネントとフックのAPIリファレンス
---

PlayCanvas Reactは、3Dアプリケーションを構築するための宣言的なコンポーネントベースのAPIを提供します。APIはコアコンポーネント、エンジンコンポーネント、フックで構成されています。

## コア

- **[`<Application/>`](./application)** - PlayCanvas Engineを初期化し、レンダリングコンテキストを提供するルートコンポーネント
- **[`<Entity/>`](./entity)** - 位置、回転、スケールを持つシーングラフの基本的な構成要素
- **[`<Gltf/>`](./gltf)** - GLB/GLTFシーンの読み込みとインスタンス化
- **[`<Modify.*>`](./modify)** - インポートしたGLB内のEntityとComponentを宣言的に変更

## コンポーネント

コンポーネントはEntityに動作を追加します。`<Entity/>`内にネストして、対応するPlayCanvas Componentをアタッチします。

- **[`<Anim/>`](./anim)** - ステートベースのアニメーション
- **[`<Align/>`](./align)** - 整列ヘルパー
- **[`<Camera/>`](./camera)** - カメラとビューポート
- **[`<Collision/>`](./collision)** - 物理コリジョン形状
- **[`<Environment/>`](./environment)** - シーン環境とスカイボックス
- **[`<GSplat/>`](./gsplat)** - Gaussian Splatレンダリング
- **[`<Light/>`](./light)** - ディレクショナル、ポイント、スポットライト
- **[`<Render/>`](./render)** - メッシュレンダリング（プリミティブとアセット）
- **[`<Rigidbody/>`](./rigidbody)** - 物理リジッドボディ
- **[`<Script/>`](./script)** - カスタムスクリプトコンポーネント

## フック

PlayCanvas Engineのライフサイクルと統合するためのReactフックです。使用パターンとベストプラクティスについては、[フックの概要](./hooks/)を参照してください。

- **[useApp](./hooks/use-app)** - PlayCanvas Applicationインスタンスへのアクセス
- **[useParent](./hooks/use-parent)** - コンテキストから親Entityを取得
- **[useAsset](./hooks/use-asset)** - あらゆる種類のPlayCanvas Assetの読み込み
- **[useAppEvent](./hooks/use-app-event)** - Applicationイベントの購読
- **[useMaterial](./hooks/use-material)** - マテリアルの作成と管理
- **[usePhysics](./hooks/use-physics)** - 物理コンテキストと状態へのアクセス
