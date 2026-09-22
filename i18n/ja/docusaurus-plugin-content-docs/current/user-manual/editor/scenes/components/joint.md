---
title: Joint
description: PlayCanvas の Joint Component は、2つの rigid body、または1つの rigid body とワールド空間上の固定点を、fixed、ball、hinge、slider、6DoF のジョイントとして拘束します。
---

Jointコンポーネントは、2つのリジッドボディを拘束します。または、1つのリジッドボディをワールド空間上の固定点に拘束します。

<video autoPlay muted loop controls src='/video/editor-joint-component.mp4' style={{width: '100%', height: 'auto'}} />

## 前提条件 {#prerequisites}

JointコンポーネントはAmmo物理バックエンドで動作するため、機能させるには次の2つを用意しておく必要があります。

- **プロジェクトにAmmoをインポートしておく必要があります。** インポートするまで、コンポーネントパネルには `Ammo module not found` という警告とインポートボタンが表示されます。追加方法は[物理演算](/user-manual/physics)を参照してください。
- **参照する両方のエンティティに[Rigid Bodyコンポーネント](rigidbody.md)が必要です。** さらに、それぞれに形状を与える[Collisionコンポーネント](collision.md)も必要です。

`Entity B` を空のままにすると、`Entity A` を2つ目のボディではなく、ワールド空間上の固定点に拘束します。

## ジョイントのタイプ {#joint-types}

`Type` では、fixed、ball、hinge、slider、6自由度のいずれかのジョイントを選択します。インスペクターのオプションは **Fixed**、**Ball**、**Hinge**、**Slider**、**6DoF** です。

タイプによってインスペクターに表示される残りのフィールドが決まるため、タイプを切り替えるとパネルの内容が変わります。

| タイプ | 追加で表示されるフィールド |
|------|-------------------|
| Fixed | なし — 常に表示されるプロパティのみです。 |
| Ball | Enable Limits、および有効な場合はスイングとツイストの制限。 |
| Hinge | Enable Limits、Limits、Motor Speed、Max Motor Force。 |
| Slider | Enable Limits、Limits、Motor Speed、Max Motor Force。 |
| 6DoF | 軸ごとのLinearおよびAngularのモーション、制限、スプリングのフィールド。 |

<video autoPlay muted loop controls src='/video/editor-joint-bridge-launch.mp4' style={{width: '100%', height: 'auto'}} />

板をジョイントで次々につないだ連鎖を、Editorから起動したものです。

## プロパティ {#properties}

### 常に表示されるプロパティ {#always-shown}

| プロパティ | 説明 |
|----------|-------------|
| Type | fixed、ball、hinge、slider、6自由度のいずれかのジョイントを選択します。 |
| Entity A | 1つ目の拘束対象のエンティティ。Rigid Bodyコンポーネントが必要です。 |
| Entity B | 2つ目の拘束対象のエンティティ。空のままにすると、Entity Aをワールド空間に拘束します。 |
| Enable Collision | 拘束された2つのボディが互いに衝突することを許可します。 |
| Break Impulse | ジョイントが壊れるインパルスのしきい値。空のままにすると壊れないジョイントになります。 |

### Limits {#limits}

`Enable Limits` は、Ball、Hinge、Sliderのタイプで表示されます。

| プロパティ | 説明 |
|----------|-------------|
| Enable Limits | 設定済みのhinge、slider、ballジョイントの制限を有効にします。 |

### HingeとSlider {#hinge-and-slider}

`Motor Speed` と `Max Motor Force` は `Enable Limits` に依存しません。

| プロパティ | 説明 |
|----------|-------------|
| Limits | hingeの角度、またはsliderの直線移動の下限と上限。Enable Limitsが有効な場合のみ表示されます。 |
| Motor Speed | hingeの目標角速度、またはsliderの目標速度。 |
| Max Motor Force | モーターの最大の力またはトルク。0に設定するとモーターが無効になります。 |

### Ball {#ball}

`Enable Limits` が有効な場合のみ表示されます。

| プロパティ | 説明 |
|----------|-------------|
| Swing Limit Y | ballジョイントのY軸方向への最大スイング角度（度）。 |
| Swing Limit Z | ballジョイントのZ軸方向への最大スイング角度（度）。 |
| Twist Limit | ballジョイントのX軸まわりの最大ツイスト角度（度）。 |

### 6DoF {#6dof}

6自由度のタイプでは、上記のフィールドが軸ごとのグリッド、つまりLinearとAngularそれぞれのX、Y、Zに置き換わります。

| プロパティ | 説明 |
|----------|-------------|
| Linear Motion X / Y / Z | その軸の直線運動をlocked、limited、freeのいずれにするかを選択します。 |
| Linear Limits X / Y / Z | その軸の直線運動をlimitedにした場合に使用する下限と上限。 |
| Linear Stiffness | X、Y、Z軸の直線スプリングの剛性。 |
| Linear Damping | X、Y、Z軸の直線スプリングの減衰。 |
| Linear Equilibrium | X、Y、Z軸の直線スプリングの静止位置。 |
| Angular Motion X / Y / Z | その軸の回転運動をlocked、limited、freeのいずれにするかを選択します。 |
| Angular Limits X / Y / Z | その軸の回転運動をlimitedにした場合に使用する下限と上限。 |
| Angular Stiffness | X、Y、Z軸まわりの回転スプリングの剛性。 |
| Angular Damping | X、Y、Z軸まわりの回転スプリングの減衰。 |
| Angular Equilibrium | X、Y、Z軸まわりの回転スプリングの静止角度。 |

`Limits` フィールドは、対応する `Motion` フィールドが **Limited** に設定されたときにのみ表示されます。

## 実行時のジョイントの編集 {#editing-a-joint-at-runtime}

<video autoPlay muted loop controls src='/video/editor-joint-bridge-sim.mp4' style={{width: '100%', height: 'auto'}} />

実行中のアプリケーションでシミュレートされる、ジョイントでつないだ板の橋です。

スクリプトからジョイントのプロパティを変更する際に知っておくとよい動作が2つあります。

- `type` を設定すると、拘束が破棄されて再作成され、破損フラグもクリアされます。ただし、すでに離れてしまったボディを引き戻すわけではありません。
- `swingLimitY` などの制限を設定すると、拘束の制限更新が呼び出されます。そのため、アプリケーションの実行中でも制限をライブで編集できます。

## 関連項目 {#see-also}

- [Rigid Bodyコンポーネント](rigidbody.md) - 拘束する両方のエンティティに必要
- [Collisionコンポーネント](collision.md) - 各リジッドボディの形状を定義
- [物理演算](/user-manual/physics) - 物理システムについて詳しく学ぶ

## スクリプトインターフェース {#scripting-interface}

[Scriptコンポーネント](script.md)を使用してJointコンポーネントのプロパティを制御できます。Jointコンポーネントのスクリプトインターフェースは[こちら](https://api.playcanvas.com/engine/classes/JointComponent.html)です。
