---
title: トラブルシューティング
---

Engine V1またはV2を実行するプロジェクト向けのEngine V2を搭載したEditorに関する、よくある質問とその回答をまとめたリストです。

## 1. Engine V1とV2を搭載したEditorでは、シーンが明るく/暗く見える

### カメラ設定の確認

- **Settings -> Rendering** の下のシーンの **gamma** と **tone mapping** を確認してください。
- **Settings -> Editor** の下のビューポートの **gamma** と **tone mapping** を確認してください。
- 各 `CameraComponent` の **gamma** と **tone mapping** を確認してください (**Engine V2 PROJECT ONLY**)。

#### シーン設定

<img src='/img/user-manual/editor/editor-v2/settings-rendering.png' width='400px' />

#### ビューポート設定

<img src='/img/user-manual/editor/editor-v2/settings-editor.png' width='400px' />

#### カメラ設定

<img src='/img/user-manual/editor/editor-v2/camera-settings.png' width='400px' />

### テクスチャのsRGBフラグを確認する

- **Status Bar -> N audits found** で監査修正があるか確認してください。
  - 修正は **Status Bar -> N audits found -> Fix Issues** から自動的に適用できます。
  - 競合はケースバイケースで解決する必要があります。
        1. 影響を受けるテクスチャ/texture atlases、およびそれらがどこで使用されているかについては、**Console Output** を参照してください。
        2. 各警告/エラーをクリックして、テクスチャ/spriteが使用されている場所に移動します。

#### Asset Auditor

<video autoPlay muted loop controls src='/video/asset-auditor.mp4' style={{width: '100%', height: 'auto'}} />

## 2. EditorでカメラがオブジェクトをLauncherよりも明るく/暗く見せる

カメラがスクリプトによって作成されている場合、カメラコンポーネントに **gamma** と **tone mapping** の設定が明示的に設定されていることを確認してください。
