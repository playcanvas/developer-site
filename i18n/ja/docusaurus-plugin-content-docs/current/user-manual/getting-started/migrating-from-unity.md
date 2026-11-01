---
title: Unityからの移行
description: UnityのEditorウィンドウ、ショートカット、概念、C# APIをPlayCanvasでの対応するものに置き換え、Unityから移行する開発者がつまずきやすい違いを解説します。
---

Unityでプロジェクトを作ったことがあれば、PlayCanvasの多くはなじみのあるものに感じられるはずです。[PlayCanvas Editor](/user-manual/editor/)には、ヒエラルキー、インスペクター、アセットパネル、3Dビューポートがあります。シーンはエンティティのツリーで、エンティティはコンポーネントで構成され、振る舞いは`initialize`や`update`などのライフサイクルメソッドを持つスクリプトで記述します。

このガイドでは、Unityで身につけた知識をPlayCanvasに対応付けます。エディターのパネルとショートカット、共通する概念の名前、C#のAPIとそれに相当するJavaScript、そしてPlayCanvasの動作が異なる点を取り上げます。各セクションから、そのトピックの詳しいドキュメントにリンクしています。

## 主な違い {#key-differences}

- **すべてがブラウザーで動作します。** エディターはWebアプリケーションで、プロジェクトはオンラインに保存され、公開するものもWebアプリです。WebGLのビルドを待つ必要はありません。アプリは、エディターのビューポートと同じエンジンで動作します。
- **スクリプトはJavaScriptで書きます。** スクリプトはC#のクラスではなくJavaScriptのモジュールとして書きます。コンパイルは不要で、スクリプトを保存したらそのまま起動できます。
- **スクリプトは1つのコンポーネントを共有します。** Unityでは、MonoBehaviourのそれぞれが独立したコンポーネントです。PlayCanvasでは、エンティティに1つのScriptコンポーネントがあり、そのエンティティのすべてのスクリプトを保持します。
- **各タイプのコンポーネントはエンティティごとに1つです。** エンティティが持てるカメラ、ライト、Collisionコンポーネントなどはそれぞれ1つで、各スクリプトも1回しか追加できません。コライダーを2つ使いたい場合など、同じものが2つ必要なときは子エンティティを使います。
- **座標系は右手系です。** 前方は+Zではなく-Zです。[座標系と単位](#coordinate-system-and-units)を参照してください。
- **Playモードはありません。** シーンを起動すると、エディターに接続されたままの別のブラウザータブで実行されます。
- **コラボレーションとバージョン管理が組み込まれています。** 複数の人が同じシーンを同時に編集でき、チェックポイント、ブランチ、マージはエディターの機能です。

## エディター {#the-editor}

エディターのレイアウトは、Unityのデフォルトのレイアウトとよく似ています。

![ツールバー、ヒエラルキー、ビューポート、インスペクター、アセットパネルに1から5の番号を付けたPlayCanvas Editor](/img/user-manual/editor/interface/editor-interface.png)

| | PlayCanvas | Unity |
| --- | --- | --- |
| 1 | [ツールバー](/user-manual/editor/interface/toolbar/) | メインメニュー、トランスフォームツール、ツールバー |
| 2 | [ヒエラルキー](/user-manual/editor/interface/hierarchy/) | Hierarchyウィンドウ |
| 3 | [ビューポート](/user-manual/editor/interface/viewport/) | Sceneビュー |
| 4 | [インスペクター](/user-manual/editor/interface/inspector/) | Inspectorウィンドウ |
| 5 | [アセットパネル](/user-manual/editor/interface/assets/) | Projectウィンドウ |

Unityのその他のウィンドウやメニューに相当するものは、次のとおりです。

| Unity | PlayCanvas |
| --- | --- |
| PlayボタンとGameビュー | ビューポートの右上にある[Launch](/user-manual/editor/interface/launch-page/)ボタン |
| Consoleウィンドウ | 起動したタブで開く、ブラウザーの開発者ツールのコンソール。エディター左下にあるエディター自体の **CONSOLE** パネルには、スクリプトの解析エラーなど、エディターのメッセージが表示されます。 |
| Project SettingsとLightingウィンドウ | ツールバーの歯車アイコンから開く[設定](/user-manual/editor/interface/settings/) |
| Build Settings | ツールバーの **Publish / Download** |
| Animatorウィンドウ | anim state graphアセットを選択すると開く[anim state graph](/user-manual/animation/anim-state-graph-assets/)エディター |
| Asset Store | PlayCanvasストアとSketchfabのアセットがある、アセットパネル右上の **ASSET STORE** |
| Visual StudioまたはRider | 組み込みの[コードエディター](/user-manual/editor/scripting/code-editor/)、または[VS Code拡張機能](/user-manual/editor/scripting/vscode-extension/)を入れたVS Code |
| Unity Version ControlまたはGit | 組み込みの[バージョン管理](/user-manual/editor/version-control/) |

### Playモードの代わりに起動する {#launching-instead-of-play-mode}

Unityはゲームをエディターの中で再生します。PlayCanvasは新しいブラウザータブで[起動ページ](/user-manual/editor/interface/launch-page/)を開き、公開したときと同じようにシーンを実行します。**Launch** をクリックするか、Ctrl+Enterを押してください。

起動ページはエディターに接続されたままです。エンティティ、コンポーネント、スクリプト属性、アセット、シーン設定への変更は、加えたそばから実行中のアプリに反映されます。Playモード中の編集とは違い、停止しても変更は失われません。エディターはすべての変更をその都度保存するからです。この使い方をするには、2つのタブを横に並べて配置してください。コードの変更は、スクリプトが[ホットリロード](/user-manual/editor/scripting/hot-reloading/)に対応していない限り、再読み込みが必要です。

スクリプトがエディターのビューポートで実行されることはないため、Unityの`[ExecuteInEditMode]`に相当するものはありません。スクリプトが作成したり変更したりするものは、起動したアプリにしか現れません。

Launchボタンのメニューには、テスト用のオプションがあります。グラフィックスAPIを選んだり、[プロファイラー](/user-manual/optimization/profiler/)、[MiniStats](/user-manual/optimization/mini-stats/)、[Inspector](/user-manual/debugging/inspector/)を開いたりできます。**Debug** にチェックを入れると、エンジンの警告とエラーがコンソールに記録されます。

### ビューポートの操作 {#navigating-the-viewport}

| 操作 | Unity | PlayCanvas |
| --- | --- | --- |
| 周回（オービット） | Alt + 左ドラッグ | 左ドラッグ |
| 見回す | 右ドラッグ | 右ドラッグ |
| パン | 中ドラッグ | 中ドラッグ、またはShift + 左ドラッグ |
| ズーム | マウスホイール | マウスホイール |
| 飛行 | 右ボタンを押しながらW、A、S、D、Q、Eを押す | マウスボタンを押さずにW、A、S、D、Q、Eを押す（Shiftを押すと速く移動） |
| 選択対象にフォーカス | F | F |
| 矩形選択 | 何もない場所を左ドラッグ | Ctrl + 左ドラッグ |
| 選択への追加と選択からの除外 | Shift+クリックまたはCtrl+クリック | Ctrl+クリック |

### キーボードショートカット {#keyboard-shortcuts}

| 操作 | Unity | PlayCanvas |
| --- | --- | --- |
| 移動ツール | W | 1 |
| 回転ツール | E | 2 |
| スケールツール | R | 3 |
| 矩形ツール（UI要素） | T | 4 |
| ギズモのローカル空間とワールド空間の切り替え | X | L |
| 選択対象にフォーカス | F | F |
| 再生 | Ctrl+P | Ctrl+Enter（Launch） |
| 空の子オブジェクトを作成 | Alt+Shift+N | Ctrl+E |
| 複製 | Ctrl+D | Ctrl+D |
| 名前の変更 | F2 | F2 |
| 削除 | Delete | Delete |
| 元に戻す / やり直し | Ctrl+Z / Ctrl+Y | Ctrl+Z / Ctrl+Y |
| 保存 | Ctrl+S | すべての変更が保存されるので不要です。Ctrl+Sを押すと、バージョン管理のチェックポイントを作成するフォームが開きます。 |
| ビューの最大化 | Shift+Space | Space（ヒエラルキー、インスペクター、アセットパネルを隠す） |
| 正面、右側面、上面のビュー | シーンギズモの軸をクリック | テンキーの1、3、7（Ctrlを加えると反対側）、またはビューキューブの軸をクリック |
| 正投影と透視投影の切り替え | シーンギズモの中央をクリック | テンキーの5 |

macOSでは、Ctrlの代わりにCmdを使います。UnityのViewツール（Q）に相当するものはありません。ビューポートの操作にツールは必要ないためです。すべてのショートカットは[操作とキーボードショートカット](/user-manual/editor/interface/keyboard-shortcuts/)のページにあります。

## 概念と用語 {#concepts-and-terminology}

| Unity | PlayCanvas | 備考 |
| --- | --- | --- |
| GameObject | [エンティティ](/user-manual/ecs/entities/) | |
| Component | [コンポーネント](/user-manual/ecs/components/) | コンポーネントはエンティティのプロパティです（`entity.camera`、`entity.light`）。 |
| Transform | すべてのエンティティの一部 | エンティティはそれ自体が位置、回転、スケールを持ちます。[階層とトランスフォーム](/user-manual/ecs/hierarchy-and-transformations/)を参照してください。 |
| MonoBehaviour | [スクリプト](/user-manual/scripting/) | エンティティのScriptコンポーネントを通じてアタッチします。 |
| Prefab | [テンプレート](/user-manual/editor/templates/) | [Prefabとテンプレート](#prefabs-and-templates)を参照してください。 |
| Scene | [シーン](/user-manual/editor/scenes/) | |
| Tag | [タグ](/user-manual/ecs/searching-the-hierarchy/#by-tag) | 1つのエンティティにいくつでもタグを付けられます。 |
| Layer | [レイヤー](/user-manual/graphics/layers/) | レンダリング専用です。物理演算ではコリジョングループとマスクを使います。 |
| Mesh FilterとMesh Renderer | [Render](/user-manual/editor/scenes/components/render/)コンポーネント | スキンメッシュにもRenderコンポーネントを使います。 |
| Material | [マテリアル](/user-manual/editor/assets/inspectors/material/) | |
| Camera | [Camera](/user-manual/editor/scenes/components/camera/)コンポーネント | |
| Light | [Light](/user-manual/editor/scenes/components/light/)コンポーネント | ポイントライトはオムニライトと呼ばれます。 |
| Rigidbody | [Rigid Body](/user-manual/editor/scenes/components/rigidbody/)コンポーネント | |
| Collider | [Collision](/user-manual/editor/scenes/components/collision/)コンポーネント | Rigid Bodyがない場合、Collisionコンポーネントはトリガーになります。[物理演算](#physics)を参照してください。 |
| Audio Source | [Sound](/user-manual/editor/scenes/components/sound/)コンポーネント | 1つのコンポーネントで、スロットと呼ばれる任意の数のサウンドを再生できます。 |
| Audio Listener | [Audio Listener](/user-manual/editor/scenes/components/audiolistener/)コンポーネント | |
| Particle System | [Particle System](/user-manual/editor/scenes/components/particlesystem/)コンポーネント | |
| AnimatorとAnimator Controller | [Anim](/user-manual/editor/scenes/components/anim/)コンポーネントと[anim state graph](/user-manual/animation/anim-state-graph-assets/)アセット | |
| Canvas | [Screen](/user-manual/editor/scenes/components/screen/)コンポーネント | |
| RectTransform、Image、Text | [Element](/user-manual/editor/scenes/components/element/)コンポーネント | |
| Sprite Renderer | [Sprite](/user-manual/editor/scenes/components/sprite/)コンポーネント | |
| ScriptableObject | [JSON](/user-manual/editor/assets/inspectors/json/)アセット | または、データをエクスポートするJavaScriptモジュール。 |
| `Resources`とAddressables | [アセットレジストリ](/user-manual/assets/asset-registry/) | [アセット](#assets)を参照してください。 |

## 座標系と単位 {#coordinate-system-and-units}

どちらのエンジンもYを上方向とし、距離をメートル、角度を度で扱います。違いは座標系の向きです。Unityの座標系は+Zが前方の左手系ですが、PlayCanvasは **-Zが前方** の右手系です。カメラは自身の負のZ軸の方向を向き、`entity.forward`は負のZ軸を返し、`lookAt`は負のZ軸をターゲットに向けます。

![Unityの左手座標系（+Zが前方）とPlayCanvasの右手座標系（-Zが前方）](/img/user-manual/getting-started/migrating-from-unity/coordinate-systems-ja.svg)

このため、コードやコンテンツを移植するときには、次の点に注意が必要です。

- **前進は-Z方向への移動です。** `transform.Translate(0, 0, speed * Time.deltaTime)`は`this.entity.translateLocal(0, 0, -this.speed * dt)`になります。
- **正の回転の向きが逆になります。** Y軸まわりの正の回転はエンティティを左に向け（上から見て反時計回り）、X軸まわりの正の回転は上に傾けます。Unityではそれぞれ右と下に回るため、シーンを見下ろすカメラのX回転は、PlayCanvasでは負の値になります。
- **オイラー角を適用する順序が異なります。** PlayCanvasはX、Y、Zの順に回転を適用しますが、UnityはZ、X、Yの順に適用します。軸の向きの反転と合わせて考えると、UnityのInspectorで読み取った回転の値はそのままでは使えません。レイアウトは、変換を行ってくれるエクスポートファイルで移行してください。[コンテンツの移行](#bringing-your-content-over)を参照してください。
- **ライトは-Y方向を照らします。** ディレクショナルライトとスポットライトはローカルの負のY軸の方向を向くため、回転していないライトは真下を照らします。Unityでは+Z方向を照らします。
- **モデルは通常+Zを向いています。** glTFは+Zをモデルの正面と定めており、Unityからエクスポートしたモデルも+Zを向いたままです。これはPlayCanvasでは後ろ向きになります。スクリプトでキャラクターを`entity.forward`の方向に動かす場合は、モデルを親エンティティの中に入れてY軸まわりに180°回転させ、モデルが親の前方を向くようにします。
- **デフォルトの視野角が狭くなっています。** どちらのエンジンも視野角を垂直方向で測りますが、PlayCanvasの新しいカメラは60°ではなく45°から始まります。

## スクリプト {#scripting}

PlayCanvasのスクリプトは、[`Script`](https://api.playcanvas.com/engine/classes/Script.html)を継承するJavaScriptのクラスです。各スクリプトはアセットパネル内の`.mjs`ファイルにあり、エンティティにScriptコンポーネントを追加してスクリプトを選ぶとアタッチできます。詳しくは[スクリプティング](/user-manual/scripting/)を参照してください。

### スクリプトの比較 {#a-script-side-by-side}

次のUnityスクリプトは、GameObjectを回転させ、スペースキーでライトのオンとオフを切り替えます。

```csharp
using UnityEngine;

public class Spinner : MonoBehaviour
{
    // 1秒あたりの回転角度（度）
    [SerializeField] float speed = 90f;
    [SerializeField] Light lamp;

    void Start()
    {
        lamp.enabled = false;
    }

    void Update()
    {
        transform.Rotate(0f, speed * Time.deltaTime, 0f);

        if (Input.GetKeyDown(KeyCode.Space))
        {
            lamp.enabled = !lamp.enabled;
            Debug.Log($"Lamp on: {lamp.enabled}");
        }
    }
}
```

同じスクリプトをPlayCanvas用に`spinner.mjs`というファイルで書くと、次のようになります。

```javascript
import { Entity, KEY_SPACE, Script } from 'playcanvas';

export class Spinner extends Script {
    static scriptName = 'spinner';

    /**
     * 1秒あたりの回転角度（度）。
     *
     * @attribute
     */
    speed = 90;

    /**
     * @attribute
     * @type {Entity}
     */
    lamp;

    initialize() {
        this.lamp.light.enabled = false;
    }

    update(dt) {
        this.entity.rotateLocal(0, this.speed * dt, 0);

        if (this.app.keyboard.wasPressed(KEY_SPACE)) {
            this.lamp.light.enabled = !this.lamp.light.enabled;
            console.log(`Lamp on: ${this.lamp.light.enabled}`);
        }
    }
}
```

注目すべき違いは、次のとおりです。

- **`scriptName`がスクリプトの名前になります。** エディターはこの名前でスクリプトを表示し、他のスクリプトはこの名前でスクリプトにアクセスします（`entity.script.spinner`）。
- **`[SerializeField]`の代わりに`@attribute`を使います。** JSDocコメントで`@attribute`タグを付けたクラスフィールドがインスペクターに表示され、コメントの最初の文がフィールドのツールチップになります。[インスペクターのフィールド](#inspector-fields)を参照してください。
- **Entity属性は、コンポーネントではなくエンティティを参照します。** `Entity`型の属性はエンティティを保持するので、`this.lamp.light`のように、そのエンティティを通じてコンポーネントにアクセスします。
- **`this.entity`はGameObjectとそのTransformに相当します。** `this.app`はアプリケーションで、入力デバイス、シーンの階層（`this.app.root`）、アセットレジストリなどにアクセスできます。
- **`dt`は`Time.deltaTime`に相当します。** エンジンは、フレーム時間を秒単位で`update`に渡します。

### ライフサイクルメソッド {#lifecycle-methods}

| Unity | PlayCanvas | 備考 |
| --- | --- | --- |
| `Awake`、`Start` | `initialize()` | スクリプトとそのエンティティが初めて両方とも有効になったときに1回呼ばれます。初期化にクラスのコンストラクターは使わないでください。 |
| 別のスクリプトの`Awake`に依存する`Start` | `postInitialize()` | すべてのスクリプトの`initialize`が実行された後に呼ばれるので、他のスクリプトの準備はできています。 |
| `Update` | `update(dt)` | |
| `LateUpdate` | `postUpdate(dt)` | すべてのスクリプトの`update`が実行された後に呼ばれます。 |
| `FixedUpdate` | なし | 物理エンジンは独自に固定レートでステップします。[物理演算](#physics)を参照してください。 |
| `OnEnable`、`OnDisable` | `enable`と`disable`イベント | `this.on('enable', ...)`で購読します。 |
| `OnDestroy` | `destroy`イベント | `this.once('destroy', ...)`で購読し、そこで他のイベントの購読を解除します。 |
| `OnValidate` | 属性のセッター | [属性の変更に応答する](/user-manual/scripting/script-attributes/esm/#responding-to-attribute-changes)を参照してください。 |
| `OnCollisionEnter`、`OnTriggerEnter`など | Collisionコンポーネントのイベント | [物理演算](#physics)を参照してください。 |

詳しくは[スクリプトのライフサイクル](/user-manual/scripting/script-lifecycle/)を参照してください。

### インスペクターのフィールド {#inspector-fields}

スクリプト属性は、PlayCanvasにおけるシリアライズされたフィールドです。エディターはコードから属性を読み取るため、属性を追加または変更したら、スクリプトアセットまたはScriptコンポーネントの **Parse** をクリックしてインスペクターを更新します。

| Unity | PlayCanvas |
| --- | --- |
| `[SerializeField] float speed = 5f;` | `/** @attribute */ speed = 5;` |
| `[Tooltip("...")]` | 属性のJSDocコメントの最初の文 |
| `[Range(0, 10)]` | `@range [0, 10]` |
| `[Min(0)]` | `@range [0]` |
| `[HideInInspector]`、または`[SerializeField]`なし | `@attribute`のないフィールド |
| `GameObject`または`Transform`のフィールド | `@type {Entity}` |
| `Texture2D`、`Material`、`AudioClip`のフィールド | `@type {Asset}`と、`@resource texture`、`material`、`audio` |
| Prefabのフィールド | `@type {Asset}`と`@resource template` |
| `Color`、`Vector3`のフィールド | `color = new Color()`、`offset = new Vec3()` |
| `AnimationCurve`のフィールド | `@type {Curve}` |
| 配列または`List<T>`のフィールド | `@type {Entity[]}`などの配列型 |
| `enum`のフィールド | `@enum`オブジェクト、または`@type {'low' \| 'high'}`のようなリテラルのユニオン |
| `[Serializable]`クラスのフィールド | `@interface`クラスまたは`@typedef` |

エディターで設定した属性の値は、`initialize`が実行される前に適用されます。すべてのタグについては、[属性のリファレンス](/user-manual/scripting/script-attributes/esm/)を参照してください。

### 主なAPIの対応 {#common-api-equivalents}

以下の表で、`entity`はスクリプト内の`this.entity`など任意のエンティティを表し、`Vec3`や`KEY_W`などは`playcanvas`からインポートします。

#### エンティティとコンポーネント {#entities-and-components}

| Unity | PlayCanvas |
| --- | --- |
| `new GameObject("Box")` | `const box = new Entity('Box'); this.app.root.addChild(box);` |
| `Instantiate(original)` | `const copy = original.clone(); this.app.root.addChild(copy);` |
| `Instantiate(prefab)` | `const instance = templateAsset.resource.instantiate(); this.app.root.addChild(instance);` |
| `Destroy(gameObject)` | `entity.destroy()` |
| `gameObject.SetActive(false)` | `entity.enabled = false` |
| `gameObject.activeInHierarchy` | `entity.enabled`（祖先が無効なときは`false`になります） |
| `GetComponent<Light>()` | `entity.light` |
| `GetComponent<Spinner>()` | `entity.script.spinner` |
| `GetComponentInChildren<Light>()` | `entity.findComponent('light')` |
| `GetComponentsInChildren<Light>()` | `entity.findComponents('light')` |
| `AddComponent<Light>()` | `entity.addComponent('light', { type: 'omni' })` |
| `Destroy(GetComponent<Light>())` | `entity.removeComponent('light')` |
| `GameObject.Find("Player")` | `this.app.root.findByName('Player')` |
| `GameObject.FindGameObjectsWithTag("Enemy")` | `this.app.root.findByTag('enemy')` |
| `transform.Find("Arm/Hand")` | `entity.findByPath('Arm/Hand')` |
| `CompareTag("Enemy")` | `entity.tags.has('enemy')` |

`clone()`はエンティティのコンポーネントと子をコピーしますが、スクリプトは作成時の属性値から始め直します。アプリの実行中にスクリプトが変更した値はコピーされません。一方、Unityの`Instantiate`は、シリアライズされたフィールドの現在の値をコピーします。

#### トランスフォーム {#transforms}

| Unity | PlayCanvas |
| --- | --- |
| `transform.position` | `entity.getPosition()`、`entity.setPosition(x, y, z)` |
| `transform.localPosition` | `entity.getLocalPosition()`、`entity.setLocalPosition(x, y, z)` |
| `transform.rotation` | `entity.getRotation()`、`entity.setRotation(quat)` |
| `transform.eulerAngles` | `entity.getEulerAngles()`、`entity.setEulerAngles(x, y, z)` |
| `transform.localScale` | `entity.getLocalScale()`、`entity.setLocalScale(x, y, z)` |
| `transform.Translate(x, y, z)` | `entity.translateLocal(x, y, z)`（ワールド空間では`translate`） |
| `transform.Rotate(x, y, z)` | `entity.rotateLocal(x, y, z)`（ワールド空間では`rotate`） |
| `transform.LookAt(target)` | `entity.lookAt(target.getPosition())` |
| `transform.forward`、`right`、`up` | `entity.forward`、`entity.right`、`entity.up`（`forward`は-Z） |
| `transform.parent` | `entity.parent` |
| `transform.SetParent(parent)` | `entity.reparent(parent)`。ローカルのトランスフォームが保たれるため、エンティティは新しい親に合わせて移動します |
| `transform.GetChild(i)`、`childCount` | `entity.children[i]`、`entity.children.length` |

#### 時間、数学、デバッグ {#time-math-and-debugging}

| Unity | PlayCanvas |
| --- | --- |
| `Time.deltaTime` | `update`の引数`dt` |
| `Time.timeScale` | `this.app.timeScale` |
| `Time.time` | なし。`update`で`dt`を足し合わせます。 |
| `Vector3`、`Quaternion`、`Color` | `Vec3`、`Quat`、`Color` |
| `Vector3.up`、`Vector3.forward` | `Vec3.UP`、`Vec3.FORWARD`（`(0, 0, -1)`） |
| `Quaternion.Euler(x, y, z)` | `new Quat().setFromEulerAngles(x, y, z)` |
| `rotation * vector` | `rotation.transformVector(vector, result)` |
| `Vector3.Distance(a, b)` | `a.distance(b)` |
| `Vector3.Lerp(a, b, t)` | `result.lerp(a, b, math.clamp(t, 0, 1))`（`lerp`は`t`をクランプしないため） |
| `Mathf.Clamp`、`Mathf.Lerp` | `math.clamp`、`math.lerp` |
| `Mathf.Deg2Rad` | `math.DEG_TO_RAD` |
| 浮動小数点数の`Random.Range(min, max)` | `math.random(min, max)` |
| 整数の`Random.Range(min, max)` | `Math.floor(math.random(min, max))`（`math.random`は常に浮動小数点数を返すため） |
| `Debug.Log`、`LogWarning`、`LogError` | `console.log`、`console.warn`、`console.error` |
| `Debug.DrawLine(start, end, color)` | `this.app.drawLine(start, end, color)` |

#### 入力 {#input}

| Unity | PlayCanvas |
| --- | --- |
| `Input.GetKey(KeyCode.W)` | `this.app.keyboard.isPressed(KEY_W)` |
| `Input.GetKeyDown(KeyCode.W)` | `this.app.keyboard.wasPressed(KEY_W)` |
| `Input.GetKeyUp(KeyCode.W)` | `this.app.keyboard.wasReleased(KEY_W)` |
| `Input.GetMouseButton(0)` | `this.app.mouse.isPressed(MOUSEBUTTON_LEFT)` |
| `Input.mousePosition` | マウスイベントの`x`と`y`。左下ではなく、キャンバスの左上から測ります |
| `Input.GetAxis("Mouse X")` | `mousemove`イベントの`dx` |
| `Cursor.lockState = CursorLockMode.Locked` | `this.app.mouse.enablePointerLock()` |
| `Input.touches` | `this.app.touch`のタッチイベント |
| `Physics.Raycast` | `this.app.systems.rigidbody.raycastFirst(start, end)` |

入力軸やアクションマップはありません。デバイスを直接読み取るか、独自のスクリプトでアクションに対応付けてください。ブラウザーは、クリックやキー入力に応じた場合にのみポインターロックを許可します。

#### Webプラットフォーム {#web-platform}

| Unity | PlayCanvas |
| --- | --- |
| `PlayerPrefs` | ブラウザーの[`localStorage`](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage) |
| `UnityWebRequest` | [`fetch`](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API) |
| `JsonUtility` | `JSON.parse`と`JSON.stringify` |
| `Application.OpenURL` | `window.open` |

### ベクトルはオブジェクトです {#vectors-are-objects}

Unityの`Vector3`と`Quaternion`は構造体で、代入するたびにコピーされます。PlayCanvasの`Vec3`と`Quat`はクラスなので、代入すると1つのオブジェクトを共有します。また、JavaScriptには演算子のオーバーロードがありません。このため、次の3つを習慣にしてください。

- **返されたベクトルは読み取り専用として扱います。** `entity.getPosition()`などのゲッターは、エンティティが所有して再利用するベクトルを返します。その値はエンティティが動くと変わり、書き込んでもエンティティは正しく更新されません。値を保持するには`clone()`を呼び、値を変えるには`setPosition()`などのセッターを使います。
- **演算子の代わりにメソッドを使います。** `add`、`sub`、`mulScalar`などのメソッドは、呼び出したベクトル自体を変更して、そのベクトルを返します。`add2(a, b)`などのメソッドは、呼び出したベクトルに結果を書き込みます。
- **`update`内でのアロケーションを避けます。** 毎フレームベクトルを作成すると、ガベージコレクターの負担が増え、カクつきの原因になります。一度だけ作成して再利用してください。

```javascript
import { Script, Vec3 } from 'playcanvas';

export class Mover extends Script {
    static scriptName = 'mover';

    /** @attribute */
    speed = 5;

    // 一度だけ作成し、毎フレーム再利用する
    step = new Vec3();

    update(dt) {
        // Unity: transform.position += transform.forward * speed * Time.deltaTime;
        this.step.copy(this.entity.forward).mulScalar(this.speed * dt);
        this.entity.translate(this.step);
    }
}
```

### イベントとメッセージ {#events-and-messages}

C#のイベント、`UnityEvent`、`SendMessage`は、いずれもPlayCanvasの[イベント](/user-manual/scripting/events/)に対応します。アプリケーション、エンティティ、スクリプトは、イベントを発火したりリッスンしたりできます。

```javascript
// どこからでも: アプリケーションでイベントを発火する
this.app.fire('player:died', this.entity);

// 別のスクリプトで: イベントをリッスンし、スクリプトが破棄されたらリッスンをやめる
initialize() {
    this.app.on('player:died', this.onPlayerDied, this);
    this.once('destroy', () => {
        this.app.off('player:died', this.onPlayerDied, this);
    });
}
```

他のオブジェクトに追加したリスナーは、スクリプトが破棄されるときに必ず削除してください。削除しないと、リスナーが動き続け、スクリプトもメモリに残ります。

### コルーチンとタイマー {#coroutines-and-timers}

PlayCanvasにはコルーチンや`Invoke`はありません。ゲームプレイのタイマーは、`update`でカウントダウンしてください。こうすると、タイマーは`app.timeScale`に従い、スクリプトが無効な間は止まり、エンティティが破棄されると終了します。

```javascript
// Unity: Invoke(nameof(Spawn), 2f);
initialize() {
    this.spawnTimer = 2;
}

update(dt) {
    if (this.spawnTimer > 0) {
        this.spawnTimer -= dt;
        if (this.spawnTimer <= 0) {
            this.spawn();
        }
    }
}
```

ブラウザーの`setTimeout`、`setInterval`、`await`を使う`async`関数は、読み込みなど、ゲーム内の時間に結びつかない処理に便利です。ただし、実時間で動き、スクリプトが破棄された後も動き続けるため、`destroy`ハンドラーでキャンセルしてください。

### 実行順序 {#execution-order}

同じエンティティ上のスクリプトは、Scriptコンポーネントに並んでいる順に実行されます。この順序はドラッグで変更できます。UnityのScript Execution Order設定のようにエンティティ間の順序に頼るのではなく、`postInitialize`と`postUpdate`、またはイベントを使ってください。

### コードの共有とパッケージの利用 {#sharing-code-and-using-packages}

スクリプトはESモジュールなので、`import`と`export`でコードを共有します。モジュールのトップレベルの変数は、そのモジュールをインポートするすべてのスクリプトで共有されるため、C#で静的クラスやシングルトンとして書くものは、モジュールに置くのが適しています。モジュールはシーンを切り替えても残ります。

エディターでnpmのパッケージを使うには、[インポートマップ](/user-manual/editor/scripting/import-maps/)でパッケージ名をCDNのURLに対応付けます。[エディターを使わずに](/user-manual/engine/)作るプロジェクトでは、他のWebプロジェクトと同じように、npmからパッケージをインストールします。

## Prefabとテンプレート {#prefabs-and-templates}

[テンプレート](/user-manual/editor/templates/)は、PlayCanvasにおけるPrefabです。ほぼ同じように機能します。

| Unity | PlayCanvas |
| --- | --- |
| GameObjectをProjectウィンドウにドラッグ | ヒエラルキーでエンティティを右クリックし、**Template** > **New Template** を選択 |
| Prefabインスタンス | ヒエラルキーのアイコンで区別されるテンプレートインスタンス |
| オーバーライド | インスペクターに表示される[オーバーライド](/user-manual/editor/templates/#template-overrides)（**View Diff** ボタンで一覧を確認できます） |
| **Overrides** > **Apply All** / **Revert All** | インスタンスのルートのインスペクターにある **Apply All** / **Revert All** |
| ネストされたPrefab | [ネストされたテンプレート](/user-manual/editor/templates/nested/) |
| Prefabモード | シーン内の任意のインスタンスを編集し、そのオーバーライドを適用 |
| Unpack Prefab | **Template** > **Unlink From Template** |
| `Instantiate(prefab)` | `templateAsset.resource.instantiate()` |

Prefabバリアントはありません。オーバーライドを持つテンプレートインスタンスが、最も近いものです。モデルをインポートすると、Unityがモデルのプレハブを作るのと同じように、その階層のテンプレートが作成されます。

テンプレートアセットへのオーバーライドの適用は、元に戻せません。実行時にテンプレートをインスタンス化するには、そのアセットが読み込まれている必要があります。`@resource template`を指定したスクリプト属性から参照し、プリロードするように設定するか、先に[読み込んで](/user-manual/assets/loading-unloading/)ください。

## シーン {#scenes}

| Unity | PlayCanvas |
| --- | --- |
| `SceneManager.LoadScene("Level 2")` | `this.app.scenes.changeScene('Level 2')` |
| `LoadSceneMode.Additive` | `this.app.scenes.loadSceneHierarchy('Level 2', callback)` |
| 加算的に読み込んだシーンのアンロード | `loadSceneHierarchy`がコールバックに渡したルートエンティティを破棄 |
| `DontDestroyOnLoad` | なし。以下を参照してください。 |
| シーンごとに保存されるライティング設定 | シーン設定。`changeScene`または`loadSceneSettings`で適用されます |

`changeScene`は、新しいシーンを追加する前に、アプリケーションのルートの下にあるすべてのエンティティを破棄します。スクリプトが作成したエンティティも例外ではありません。レベルをまたいでエンティティを残すには、シーンを切り替えずに、各レベルを加算的に読み込み、前のレベルのルートエンティティを破棄します。スクリプトだけが使うデータは[モジュール](#sharing-code-and-using-packages)に置けます。モジュールはシーンの切り替えの影響を受けません。[シーンの読み込み](/user-manual/editor/scenes/loading-scenes/)を参照してください。

エディターで開けるシーンは一度に1つなので、Unityのマルチシーン編集に相当するものはありません。シーンを加算的に読み込むのは、実行時にアプリが行うことです。

## アセット {#assets}

アセットパネルはProjectウィンドウと同じようにファイルを保存しますが、プロジェクトはディスク上のフォルダーではなくPlayCanvasのサーバー上にあるため、`.meta`ファイルはありません。各アセットにはIDがあり、インポート設定を編集する専用のインスペクターがあります。

| Unity | PlayCanvas |
| --- | --- |
| `Resources.Load<Texture2D>("logo")` | `this.app.assets.find('logo', 'texture')`で見つけてから[読み込む](/user-manual/assets/loading-unloading/) |
| AddressablesとAssetBundles | [プリロード](/user-manual/assets/preloading/)しないアセットを必要なときに読み込み、名前や[タグ](/user-manual/assets/asset-registry/#by-tag)で見つける |
| ScriptableObject | `resource`が解析済みのオブジェクトになるJSONアセット |
| テクスチャのインポート設定 | [テクスチャ圧縮](/user-manual/optimization/texture-compression/)を含む[テクスチャのインスペクター](/user-manual/editor/assets/inspectors/texture/) |
| モデルのインポート設定 | [アセットインポート設定](/user-manual/editor/interface/settings/asset-import/) |

**Preload** が設定されたアセットは、アプリケーションの開始前にダウンロードされます。アセットインポート設定の **Assets default to preload** をオフにしない限り、新しいアセットはプリロードされます。一部のシーンでしか使わない大きなアセットでは、このオプションを外してください。

## レンダリング {#rendering}

PlayCanvasのレンダラーは1つなので、レンダーパイプラインを選ぶ必要はありません。WebGPUまたはWebGL 2でレンダリングし、[クラスタードライティング](/user-manual/graphics/lighting/clustered-lighting/)によって、オムニライトやスポットライトが多いシーンでも高速に描画できます。

### マテリアルとシェーダー {#materials-and-shaders}

PlayCanvasの[マテリアル](/user-manual/editor/assets/inspectors/material/)は、UnityのStandardシェーダーやURPのLitシェーダーと同様の物理ベースのマテリアルで、メタルネスとスペキュラーの両方のワークフローに対応しています。

| Unity | PlayCanvas |
| --- | --- |
| AlbedoまたはBase Map | Diffuse |
| Metallic | Metalness |
| Smoothness | Glossiness（どちらも値が大きいほど滑らか） |
| Normal Map | Normal |
| Occlusion | Ambient Occlusion |
| Emission | Emissive |
| Rendering Mode: Cutout | Alpha Test |
| Rendering Mode: TransparentまたはFade | Blend TypeとOpacity |
| TilingとOffset | TilingとOffset（すべてのマップ共通、またはマップごと） |
| Shader Graphとカスタムシェーダー | GLSLとWGSLで書く[シェーダー](/user-manual/graphics/shaders/) |

UnityのMetallicマップは、赤チャンネルにメタルネス、アルファチャンネルにスムースネスを格納します。PlayCanvasでは、同じテクスチャを **Metalness** マップ（チャンネルR）と **Glossiness** マップ（チャンネルA）に割り当てます。Glossinessの **Invert** オプションはマップをラフネスマップとして扱うので、オフになっていることを確認してください。

### ライティング {#lighting}

| Unity | PlayCanvas |
| --- | --- |
| Directional Light | ディレクショナルライト |
| Point Light | オムニライト |
| Spot Light | スポットライト。Inner Cone AngleとOuter Cone Angleはライトの軸から測るため、UnityのSpot Angleの半分になります。 |
| Area Light | レンダリング設定で **Area Lights Enabled** をオンにしてから、**Shape** をRectangle、Disk、Sphereのいずれかにしたライト |
| Lightingウィンドウの環境設定とフォグ | [レンダリング設定](/user-manual/editor/interface/settings/rendering/)（スカイボックス、アンビエントカラー、露出、フォグ） |
| Reflection Probe | すべてのマテリアルを照らすスカイボックスと、ボックス投影を使うマテリアルごとのキューブマップ |
| Light Probe | なし。ライトマップと環境ライティングを使います。 |
| Progressive Lightmapper | ツールバーの **Bake** から、または実行中のアプリで実行する[ライトマッパー](/user-manual/graphics/lighting/runtime-lightmaps/) |

[ライティング](/user-manual/graphics/lighting/)を参照してください。

### カメラとレイヤー {#cameras-and-layers}

| Unity | PlayCanvas |
| --- | --- |
| Culling Mask | Layers |
| Depth、またはURPのカメラスタッキング | Priority（値が小さいほど先にレンダリング） |
| Clear Flags | Clear Color BufferとClear Depth Buffer |
| Viewport Rect | Viewport |
| Target Texture | スクリプトから設定する`renderTarget` |
| Orthographic Size | Ortho Height |

UnityのGameObjectは1つのレイヤーにだけ属し、レイヤーはレンダリング、物理演算、レイキャストのすべてに使われます。PlayCanvasの[レイヤー](/user-manual/graphics/layers/)はレンダリング専用で、どのカメラがメッシュを描画するか、どの順序で描画するかを決めます。各カメラは、リストにあるレイヤーを **Settings** > **Layers** で設定した順序でレンダリングします。メッシュを描画するコンポーネントは、複数のレイヤーに属することができます。物理演算では、代わりに[コリジョングループとマスク](/user-manual/physics/rigid-bodies/#collision-groups-and-masks)でフィルタリングします。[複数のカメラ](/user-manual/graphics/cameras/multiple-cameras/)を参照してください。

### ポストプロセス {#post-processing}

Unityのポストプロセスボリュームに相当するのは[`CameraFrame`](/user-manual/graphics/posteffects/cameraframe/)で、ブルーム、アンビエントオクルージョン、被写界深度、アンチエイリアス、カラーグレーディング、ビネットなどをカメラに追加します。エディターでは、カメラのエンティティに[CameraFrameスクリプト](/user-manual/graphics/linear-workflow/hdr-rendering/#cameraframe-in-the-editor)を追加します。他のスクリプトと同じく起動したアプリでしか実行されないため、エフェクトはビューポートには表示されません。CameraFrameを使わない場合、トーンマッピングとガンマはCameraコンポーネントのプロパティです。

### パフォーマンス機能 {#performance-features}

| Unity | PlayCanvas |
| --- | --- |
| 静的バッチングと動的バッチング | [バッチグループ](/user-manual/graphics/advanced-rendering/batching/) |
| GPUインスタンシング | [ハードウェアインスタンシング](/user-manual/graphics/advanced-rendering/hardware-instancing/) |
| オクルージョンカリング | なし。カメラは視野外のメッシュをカリングします。 |
| LOD Group | メッシュにはなし |
| Profiler | [デバッグとプロファイリング](#debugging-and-profiling)を参照 |

## 物理演算 {#physics}

PlayCanvasの物理演算は、物理エンジンBulletのWebAssembly版である[ammo.js](https://github.com/kripken/ammo.js)で動作します。オプトイン方式なので、プロジェクトに追加するには、**Settings** を開いて **PHYSICS** を展開し、**IMPORT AMMO** をクリックします。重力は同じセクションで、シーンごとに設定します。[物理演算](/user-manual/physics/)を参照してください。

| Unity | PlayCanvas |
| --- | --- |
| Rigidbody | DynamicタイプのRigid Bodyコンポーネント |
| **Is Kinematic** を有効にしたRigidbody | KinematicタイプのRigid Body |
| Rigidbodyのないコライダー | Collisionコンポーネント **と** StaticタイプのRigid Body |
| **Is Trigger** を有効にしたコライダー | Rigid BodyのないCollisionコンポーネント |
| `AddForce(force)` | `entity.rigidbody.applyForce(force)` |
| `AddForce(force, ForceMode.Impulse)` | `entity.rigidbody.applyImpulse(force)` |
| `AddTorque` | `applyTorque`、`applyTorqueImpulse` |
| `velocity`（Unity 6では`linearVelocity`） | `linearVelocity` |
| Dynamicなボディの位置の設定 | `entity.rigidbody.teleport(position)` |
| Kinematicなボディの`MovePosition` | エンティティの位置を設定（Kinematicなボディはエンティティに追従します） |
| Constraints（位置や回転の固定） | Linear FactorとAngular Factor |
| Physic Material | Rigid BodyのFrictionとRestitution |
| `OnCollisionEnter`、`OnCollisionStay`、`OnCollisionExit` | Collisionコンポーネントの`collisionstart`、`contact`、`collisionend`イベント |
| `OnTriggerEnter`、`OnTriggerExit` | トリガーのCollisionコンポーネントと、トリガーに入ったRigid Bodyで発生する`triggerenter`と`triggerleave`イベント |
| レイヤーの衝突マトリックス | スクリプトから設定する[コリジョングループとマスク](/user-manual/physics/rigid-bodies/#collision-groups-and-masks) |
| `Physics.Raycast` | [`raycastFirst`と`raycastAll`](/user-manual/physics/ray-casting/) |
| Character Controller | なし。スクリプトでDynamicなRigid Bodyを動かします。 |

Unityの開発者の多くが、次の違いでつまずきます。

- **静的なコライダーにもRigid Bodyが必要です。** Collisionコンポーネントだけでは[トリガーボリューム](/user-manual/physics/trigger-volumes/)になり、ボディを検出しますが、止めることはしません。床や壁には、StaticタイプのRigid Bodyコンポーネントを追加してください。
- **プリミティブのコリジョン形状はスケールを無視します。** ボックス、球、カプセルの形状は、エンティティをどうスケールしてもHalf ExtentsやRadiusのままです。例外はメッシュ形状です。[スケール](/user-manual/physics/collision-shapes/#scale)を参照してください。
- **`FixedUpdate`はありません。** シミュレーションは1秒に60回の固定レートでステップし、力は`update`から加えます。衝突イベントは、物理ステップごとに1回発生します。
- **Dynamicなボディは物理エンジンが所有します。** 各ステップの後、エンジンはすべてのDynamicなボディの位置と回転をそのエンティティに書き込みます。そのため、Dynamicなボディは、エンティティのトランスフォームを設定するのではなく、力、速度、`teleport`で動かします。

## ユーザーインターフェース {#user-interface}

PlayCanvasのキャンバス内UIは、UnityのUI（uGUI）とほぼ同じように機能します。[ユーザーインターフェース](/user-manual/user-interface/)を参照してください。

| Unity | PlayCanvas |
| --- | --- |
| Screen Space - OverlayのCanvas | **Screen Space** を有効にした[Screen](/user-manual/user-interface/screens/)コンポーネント |
| World SpaceのCanvas | **Screen Space** を無効にしたScreenコンポーネント |
| Canvas Scaler: Scale With Screen Size | **Scale Mode** をBlendにし、**Ref Resolution** と **Scale Blend** を設定 |
| RectTransform | アンカー、ピボット、マージンを持つ[Element](/user-manual/user-interface/elements/)コンポーネント |
| Image、Raw Image | テクスチャまたはスプライトを表示する、ImageタイプのElement |
| Text、TextMeshPro | TTFまたはOTFファイルから作成した[フォント](/user-manual/user-interface/fonts/)アセットを使う、TextタイプのElement |
| Button | [Button](/user-manual/user-interface/buttons/)コンポーネント |
| Horizontal、Vertical、Grid Layout Group | [Layout Group](/user-manual/user-interface/layout-groups/)コンポーネント |
| Layout Element | Layout Childコンポーネント |
| Scroll Rect、Scrollbar | [Scroll View](/user-manual/user-interface/scroll-views/)とScrollbarコンポーネント |
| Mask、Rect Mask 2D | **Mask** を有効にしたElement。[マスク](/user-manual/user-interface/masks/)を参照してください。 |
| EventSystemとGraphic Raycaster | [入力](/user-manual/user-interface/input/)を受け取るElementで **Use Input** を有効にする |
| Toggle、Slider、Dropdown | Elementで組み立てます。[よく使うウィジェット](/user-manual/user-interface/common-widgets/)を参照してください。 |
| UI Toolkit | [HTMLとCSS](/user-manual/user-interface/html-and-css/) |

アプリはWebページの中で動作するので、インターフェースのどの部分でも、HTMLとCSSで作ってキャンバスの上に重ねることができます。テキストの入力欄やアクセシブルなメニューは、この方法の方が簡単に作れます。

## アニメーション {#animation}

| Unity | PlayCanvas |
| --- | --- |
| Animatorコンポーネント | [Anim](/user-manual/animation/anim-component/)コンポーネント |
| Animator Controller | ステート、トランジション、パラメーター、レイヤーを持つ[anim state graph](/user-manual/animation/anim-state-graph-assets/)アセット |
| Animation Clip | モデルのインポート時に作成されるアニメーションアセット |
| `animator.SetFloat("Speed", 2f)` | `entity.anim.setFloat('Speed', 2)` |
| `SetBool`、`SetInteger`、`SetTrigger` | `setBoolean`、`setInteger`、`setTrigger` |
| Avatar Mask | [レイヤーマスク](/user-manual/animation/anim-layer-masking/) |
| Blend Tree | コードで作成したステートグラフでのブレンドツリー（1D、2D、Direct）。エディターのステートグラフエディターにはありません。 |
| Root Motion | なし。スクリプトでエンティティを動かします。 |
| Animation Event | アニメーションアセットの[Animイベント](/user-manual/animation/anim-events/) |
| Animator Override Controller | 1つのanim state graphを使い、エンティティごとに異なるアニメーションアセットをステートに割り当てる |

PlayCanvasには、ヒューマノイドのリターゲットはありません。アニメーションはボーンを名前で動かすため、同じ名前のボーンを持つモデルであれば再生できますが、プロポーションの異なるスケルトンに合わせて調整されることはありません。アニメーションは、再生するスケルトン向けに作成するか、そのスケルトンにベイクしてください。

## オーディオ {#audio}

| Unity | PlayCanvas |
| --- | --- |
| Audio Source | [Sound](/user-manual/editor/scenes/components/sound/)コンポーネントのスロット |
| `audioSource.Play()` | `entity.sound.play('slot name')` |
| Spatial Blendを3Dに設定 | Soundコンポーネントの **Positional** |
| Min DistanceとMax Distance | Ref DistanceとMax Distance |
| Volume Rolloff | Distance Model（デフォルトはLinearで、UnityのデフォルトはLogarithmic） |
| Audio Listener | Audio Listenerコンポーネント |
| Audio Mixer | なし。[Web Audio API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API)を使います。 |

ブラウザーは、ユーザーがクリックやキー入力などでページを操作するまで音を再生しません。音楽などのサウンドは、最初のクリックの後に開始してください。

## コンテンツの移行 {#bringing-your-content-over}

Unityのプロジェクトを自動で変換するツールはありません。アセットは標準的なファイル形式で移行し、コードは書き直します。

- **モデルとアニメーション。** [UnityGLTF](https://github.com/KhronosGroup/UnityGLTF)やUnityのglTFastパッケージなどのglTFエクスポーターでGLBファイルとして、またはUnityのFBX ExporterパッケージでFBXとしてエクスポートします。エディターがインポートするのはglTFのバイナリ形式である`.glb`で、`.gltf`ではありません。ファイルをアセットパネルにドラッグすると、FBXファイルはGLBに変換され、各モデルからRender、マテリアル、テクスチャ、アニメーションのアセットと、その階層のテンプレートが作成されます。[3Dモデルのインポート](/user-manual/assets/models/)を参照してください。
- **マテリアル。** Unityのシェーダーは移行できません。glTFエクスポーターはStandardやURP LitのマテリアルをglTFのPBRマテリアルに変換し、それがPlayCanvasのマテリアルとしてインポートされます。FBXファイルが持つマテリアルの情報は少ないため、FBXのマテリアルは設定し直すことになります。
- **テクスチャ、オーディオ、フォント。** 元のファイルをアップロードします。[サポートされているフォーマット](/user-manual/assets/supported-formats/)を参照してください。
- **シーンとPrefab。** シーンの静的なジオメトリを1つのGLBとしてエクスポートしてレイアウトを保ち、ライト、カメラ、物理演算、UI、スクリプトはエディターで追加します。
- **Terrain。** エクスポートする前に、Terrainをメッシュに変換します。
- **スクリプトとシェーダー。** JavaScriptと、GLSLまたはWGSLで書き直します。AIコーディングアシスタントは、MonoBehaviourの変換を得意としています。エディターのプロジェクトのスクリプトをアシスタントに扱わせるには、[VS Code拡張機能](/user-manual/editor/scripting/vscode-extension/)でスクリプトを同期します。シーンも編集させる場合は、[MCPサーバー](/user-manual/editor/mcp-server/)でエディターに接続します。
- **ライトマップ。** PlayCanvasのライトマッパーでベイクし直すか、3Dモデリングツールでベイクしてモデルと一緒にインポートします。

## 公開 {#publishing}

Unityはプラットフォームごとにプレイヤーをビルドします。PlayCanvasが公開するのは、HTML、JavaScript、アセットで構成されるWebアプリです。

- **Publish** はビルドをPlayCanvasでホストし、共有用のURLを発行します。[PlayCanvasホスティング](/user-manual/editor/publishing/web/playcanvas-hosting/)を参照してください。
- **Download** は、[セルフホスティング](/user-manual/editor/publishing/web/self-hosting/)用のZIPファイルを作成します。
- アプリストア向けには、Webアプリを[モバイル](/user-manual/editor/publishing/mobile/)や[デスクトップ](/user-manual/editor/publishing/desktop/)向けにラップするか、[プレイアブル広告](/user-manual/editor/publishing/playable-ads/)として公開します。

## デバッグとプロファイリング {#debugging-and-profiling}

アプリはブラウザーで動作するので、起動したタブで、ブラウザーの開発者ツール（F12、macOSではCmd+Option+I）を使ってデバッグします。

| Unity | PlayCanvas |
| --- | --- |
| Consoleウィンドウ | 開発者ツールの **Console** タブ。[コンソールロギング](/user-manual/debugging/console-logging/)を参照してください。 |
| Visual StudioやRiderのアタッチ | 開発者ツールの **Sources** タブで設定するブレークポイント。[ブラウザ開発ツール](/user-manual/debugging/browser-dev-tools/)を参照してください。 |
| `Debug.Break()` | 開発者ツールを開いているときにアプリを一時停止する`debugger;`文 |
| Profiler | Launchボタンのメニューから使う[プロファイラー](/user-manual/optimization/profiler/)と[MiniStats](/user-manual/optimization/mini-stats/)、および開発者ツールの **Performance** タブ |
| Frame Debugger | 同じくLaunchボタンのメニューから使え、各フレームのレンダーパスとドローコールを表示する[Inspector](/user-manual/debugging/inspector/)と、[ネイティブのGPUプロファイラー](/user-manual/optimization/gpu-profiling/) |
| `Debug.DrawLine`とGizmos | `this.app.drawLine()`と、球やボックスなどの形状を描く[`WireRenderer`](/user-manual/graphics/debug-drawing/) |

## バージョン管理とコラボレーション {#version-control-and-collaboration}

Unityのプロジェクトは、自分でバージョン管理の下に置くフォルダーです。PlayCanvasのプロジェクトはオンラインで共有されます。チームメンバーが同じシーンを開くと、リアルタイムで[一緒に編集](/user-manual/editor/realtime-collaboration/)でき、互いの変更をその場で確認できます。履歴はエディターの[バージョン管理](/user-manual/editor/version-control/)で管理します。コミットのように[チェックポイント](/user-manual/editor/version-control/checkpoints/)を作成し、[ブランチ](/user-manual/editor/version-control/branches/)で作業し、競合を解決しながら[マージ](/user-manual/editor/version-control/merging/)します。

## 組み込みの機能がないもの {#features-without-a-built-in-equivalent}

| Unity | PlayCanvasでの代替手段 |
| --- | --- |
| Terrain | 地形をメッシュとしてインポート |
| NavMeshとAI Navigation | PlayCanvasに対応した[recast-navigation-js](https://github.com/isaac-mason/recast-navigation-js)などのライブラリ |
| Character Controller | スクリプトで動かすDynamicなRigid Body、またはエンジンの一人称・三人称コントローラースクリプト |
| 2D物理 | Linear FactorとAngular Factorで3つ目の軸を固定した3D物理 |
| TimelineとCinemachine | アニメーションさせる値に[Curve](/user-manual/scripting/script-attributes/esm/#curve-attribute)属性を使うスクリプト |
| VFX Graph | [Particle System](/user-manual/graphics/particles/)コンポーネント |
| Light Probeとリアルタイムのグローバルイルミネーション | ライトマップと環境ライティング |
| DOTweenなどのトゥイーンパッケージ | CDNからインポートするJavaScriptのトゥイーンライブラリ |

## 次のステップ {#next-steps}

- [初めてのアプリ](/user-manual/editor/getting-started/your-first-app/) - エディターでシーンを作ります。
- [スクリプティング](/user-manual/scripting/) - スクリプトシステムを詳しく学びます。
- [テンプレート](/user-manual/editor/templates/) - シーンをまたいでエンティティを再利用します。
- [チュートリアル](/tutorials/) - ステップバイステップでプロジェクトを作ります。
- [フォーラム](https://forum.playcanvas.com)と[Discord](https://discord.gg/RSaMRzg) - コミュニティやPlayCanvasチームに質問します。
