---
title: 物理演算
description: "PlayCanvas の物理演算の概要：rigid body、コリジョン形状、運動、衝突イベント、トリガー、レイキャスト、ジョイントを、すべてのオーサリング環境で解説します。"
---

これまで遊んできたビデオゲームの多くには、何らかのかたちで物理が使われているかと思います。プレイヤーは、オブジェクトが重力の影響を受けて落下すると予想しています。オブジェクト同士、お互いをすり抜けるのではなくぶつかり合い、ぶつかったときには衝突音がでることなどが期待されます。

物理エンジンは、自然界の常識を人工的なゲームの世界で再現しようとしています。オブジェクトを現実にあるべき姿で動かせるように試みています。

![Physics Constraints](/img/user-manual/physics/physics-constraints.webp)

PlayCanvasの物理演算は、オープンソースのBullet物理エンジンをWebAssemblyに移植した[ammo.js](https://github.com/kripken/ammo.js)によって動作します。物理演算はコンポーネントを通して扱います。[RigidBody](/user-manual/editor/scenes/components/rigidbody/)コンポーネントはエンティティがどのように動くかを決め、[Collision](/user-manual/editor/scenes/components/collision/)コンポーネントは物理的な形状を与え、アルファ版の[Joint](/user-manual/physics/joints/)コンポーネントは複数のボディを互いに拘束します。同じコンポーネントが同じプロパティで、エディター、エンジン直接、[PlayCanvas React](/user-manual/react/guide/physics/)、[Web Components](/user-manual/web-components/tags/pc-rigid-body/)のどの方法で構築しても利用できます。このセクションの各ページでは、概念を一度説明した後、それぞれの環境での適用方法を示します。

このセクションでは次の内容を扱います。

- [はじめに](/user-manual/physics/physics-basics/) - 物理演算の有効化、重力、単位、シミュレーションの仕組み。
- [RigidBody](/user-manual/physics/rigid-bodies/) - Static、Dynamic、Kinematicのボディ、そのプロパティ、スリープ、テレポート。
- [コリジョン形状](/user-manual/physics/collision-shapes/) - プリミティブ、メッシュ、複合形状、オフセット、スケール。
- [ボディを動かす](/user-manual/physics/forces-and-impulses/) - 力、インパルス、トルク、速度、Kinematicな運動。
- [衝突イベント](/user-manual/physics/collision-events/) - RigidBody同士の接触への応答。
- [トリガーボリューム](/user-manual/physics/trigger-volumes/) - ボディが領域に出入りしたことの検出。
- [レイキャスティング](/user-manual/physics/ray-casting/) - ピッキングや探査のために直線に沿ってシーンを問い合わせる。
- [ジョイント](/user-manual/physics/joints/) - ヒンジ、スライダー、ボールジョイント、スプリング、壊れる溶接。
- [ammo.jsを直接呼び出す](/user-manual/physics/calling-ammo/) - コンポーネントが公開していないBulletの機能を利用する。
- [ammo.js以外の物理エンジン](/user-manual/physics/ammo-alternatives/) - 他の物理エンジンと、それらを統合する方法。

## 関連情報 {#see-also}

- [衝突とトリガー](/tutorials/collision-and-triggers/) - エディターで完全な物理シーンを構築するチュートリアル
- [コードでRigidBodyを作成する](/tutorials/creating-rigid-bodies-in-code/) - スクリプトから物理オブジェクトを生成するチュートリアル
- [車両物理](/tutorials/vehicle-physics/) - レイキャスト車両を運転するチュートリアル
- [PlayCanvas Reactの物理演算](/user-manual/react/guide/physics/) - Reactで物理演算を有効化し使用するためのガイド
- [`<pc-rigid-body>`](/user-manual/web-components/tags/pc-rigid-body/) - Web ComponentsのRigidBodyリファレンス
