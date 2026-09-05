---
title: ammo.jsを直接呼び出す
description: rigid body のネイティブオブジェクトに対して ammo.js API を呼び出し、PlayCanvas のコンポーネントが公開していない Bullet 物理の機能を利用します。連続衝突判定 (CCD) を例に解説します。
---

RigidBody、Collision、Jointの各コンポーネントは、ゲームが物理演算に求めるもののほとんどをカバーしていますが、Bulletにはコンポーネントが公開している以上の機能があります。連続衝突判定 (CCD)、独自のコリジョンフラグ、追加の拘束タイプ、ソフトボディ、車両などは、コードからammo.jsを直接呼び出すことで利用できます。

ammo.jsはBulletを直接移植したものなので、そのAPIはC++版と対応しています。ammo.js自体のドキュメントはありませんが、[Bullet User Manual](https://github.com/bulletphysics/bullet3/blob/master/docs/Bullet_User_Manual.pdf)がそのまま当てはまり、JavaScriptに公開されているクラスとメソッドはammo.jsリポジトリの[ammo.idl](https://github.com/kripken/ammo.js/blob/main/ammo.idl)ファイルに列挙されています。エディターがストアからインポートするビルドと、エンジンの例に同梱されているビルドは、このファイルに含まれるすべてを公開しています。それ以上が必要な場合は、独自のビルドをコンパイルして標準のものの代わりに読み込んでください。エディターでは[WASMモジュールアセット](/user-manual/editor/assets/inspectors/wasm/)として追加します。

:::warning

`Ammo`に対して書いたコードは、エンジンの物理コンポーネントを迂回します。プロジェクトをammo.jsバックエンドに縛り付け、PlayCanvasのAPIリファレンスの対象外となり、扱うオブジェクトはエンジン内部のものであるためリリース間で変わる可能性があります。コンポーネントで実現できることには、できる限りコンポーネントを使用してください。

:::

## ネイティブオブジェクトへのアクセス {#reaching-the-native-objects}

すべてのrigidbodyコンポーネントはBulletの`btRigidBody`をラップしており、コンポーネントの初期化後に`entity.rigidbody.body`として取得できます。シミュレーション全体は`btDiscreteDynamicsWorld`にあり、`app.systems.rigidbody.dynamicsWorld`として取得できます。ammo.jsが読み込まれていない場合、どちらも`null`です。これらのプロパティはどの環境でも同じで、異なるのは`entity`と`app`の取得方法だけです。これについては[ボディを動かす](/user-manual/physics/forces-and-impulses/#running-physics-code)で説明しています。

ammo.jsのコードを安定させるためのルールが2つあります。

- **ボディは必要なときに取得する。** RigidBodyのタイプやコリジョン形状などのプロパティが変わると、エンジンはネイティブボディを再作成します。そのため`rigidbody.body`をフレームをまたいでキャッシュせず、使うたびに読み取り、変更後は設定を再適用してください。
- **確保したものは解放する。** ammo.jsのオブジェクトは、JavaScriptのガベージコレクターが管理しないWebAssemblyメモリ上にあります。作成した`btVector3`、`btTransform`、拘束などは、使い終わったら`Ammo.destroy()`を呼び出してください。

## 連続衝突判定 (CCD) {#continuous-collision-detection}

高速で動くRigidBodyが互いをすり抜けてしまうことがあります。これを解決するために、Bulletは連続衝突判定 (Continuous Collision Detection、CCD) を提供しています。CCDは、RigidBodyの前回の位置と現在の位置の間で球をスイープし、その途中で他のボディと交差するかを追加でチェックします。CCDはrigidbodyコンポーネントからは公開されていませんが、ネイティブボディに対する2つの呼び出しで有効にできます。

```javascript
// ボディが存在するようになってから（例：スクリプトの initialize()）実行し、
// タイプや形状の変更でボディが再作成されたら再度実行する
const body = entity.rigidbody.body;

// CCDが働き始めるまでに、ボディが1ステップで移動する距離（メートル）
body.setCcdMotionThreshold(1);

// スイープする球の半径。形状のハーフエクステントより小さくすること：
// 1メートル程度のオブジェクトなら0.2を試す
body.setCcdSweptSphereRadius(0.2);
```

[Physics with CCD](/tutorials/physics-with-ccd/)チュートリアルでは、これらの呼び出しを両方の値をアトリビュートとして持つスクリプトにまとめています。プロジェクトは[こちら](https://playcanvas.com/project/447023/overview/physics-with-ccd)にあります。

## 組み込みコンポーネントを超えて {#beyond-the-built-in-components}

CCDは一例です。同じアプローチで、Bulletの他の機能も利用できます。

- **拘束 (Constraints)。** [Jointコンポーネント](/user-manual/physics/joints/)はfixed、ball、hinge、slider、6dofのジョイントをカバーしています。コンポーネントが公開していない拘束タイプやパラメーターが必要な場合は、Bulletの拘束を自分で作成し、`addConstraint()`でダイナミクスワールドに追加し、使い終わったら削除して破棄してください。[Physics Constraints](https://playcanvas.com/project/618829/overview/physics-constraints)プロジェクトは、この方法でBulletのすべての拘束タイプを動かしています。
- **車両。** Bulletのレイキャスト車両は、シャーシのRigidBodyの上でホイール、サスペンション、ステアリングをシミュレートします。車両コンポーネントは存在しないため、[車両物理](/tutorials/vehicle-physics/)チュートリアルとエンジンの[vehicle.js](https://github.com/playcanvas/engine/blob/main/scripts/physics/vehicle.js)スクリプトは`btRaycastVehicle`を直接操作しています。
- **ソフトボディとクロス。** Bulletのソフトボディソルバーはammo.jsに含まれていますが、エンジンが作成する離散ワールドではなくソフトリジッドダイナミクスワールドが必要になるため、高度な統合作業になります。

<EngineExample id="physics/vehicle" title="Vehicle" />

## 関連情報 {#see-also}

- [Physics with CCD](/tutorials/physics-with-ccd/) - 上記のCCDの呼び出しを設定可能なスクリプトにまとめたチュートリアル
- [車両物理](/tutorials/vehicle-physics/) - デスクトップ、モバイル、WebXRでレイキャスト車両を運転するチュートリアル
- [ジョイント](/user-manual/physics/joints/) - ammo.jsに触れずに拘束を使う
- [ammo.js以外の物理エンジン](/user-manual/physics/ammo-alternatives/) - 他の物理エンジンと、それらが接続するバックエンド層
- [Bullet User Manual](https://github.com/bulletphysics/bullet3/blob/master/docs/Bullet_User_Manual.pdf) - ammo.jsにも当てはまるドキュメント
