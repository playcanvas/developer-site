---
title: ツールバー
description: メニューやギズモからスナップ、フォーカス、履歴、Lightmapper、コードエディター、公開、ダウンロード、コミュニティリンク、ヘルプ、オーバーレイ、設定までのツールバーボタンです。
---

Editorのメインツールバーは、Editorの左側、垂直な端にあります。ツールバーから多くの一般的な操作にアクセスできます。利用可能な機能のリストを以下に示します。

| ボタン | コマンド | 説明 |
| ------ | ------- | ----------- |
| ![Menu](/img/user-manual/editor/interface/toolbar/menu.png) | **メニュー** | メインメニューを開き、最も一般的に必要とされるEditor機能にアクセスします。 |
| ![Gizmo Translate](/img/user-manual/editor/interface/toolbar/translate.png) | **平行移動** | Viewportで平行移動[gizmo](../viewport#gizmos)をアクティブにします。 |
| ![Gizmo Rotate](/img/user-manual/editor/interface/toolbar/rotate.png) | **回転** | Viewportで回転[gizmo](../viewport#gizmos)をアクティブにします。 |
| ![Gizmo Scale](/img/user-manual/editor/interface/toolbar/scale.png) | **拡大縮小** | Viewportで拡大縮小[gizmo](../viewport#gizmos)をアクティブにします。 |
| ![Element Scale](/img/user-manual/editor/interface/toolbar/resize-element.png) | **要素のリサイズ** | Viewportでユーザーインターフェース[要素のリサイズgizmo](/user-manual/user-interface/elements#element-resizing)をアクティブにします。 |
| ![World Local](/img/user-manual/editor/interface/toolbar/world-local.png) | **ワールド/ローカル** | Viewportでアクティブな[gizmo](../viewport#gizmos)のローカル座標系とワールド座標系を切り替えます。 |
| ![Snap](/img/user-manual/editor/interface/toolbar/snap.png) | **スナップ** | Viewportで[gizmo](../viewport#gizmos)を使用する際、スナップを有効にします。 |
| ![Focus](/img/user-manual/editor/interface/toolbar/focus.png) | **フォーカス** | 選択中のEntityにViewportカメラをズームします。 |
| ![Undo](/img/user-manual/editor/interface/toolbar/undo.png) | **元に戻す** | 最後の操作を元に戻します。 |
| ![Redo](/img/user-manual/editor/interface/toolbar/redo.png) | **やり直し** | 最後の操作をやり直します。 |
| ![Bake](/img/user-manual/editor/interface/toolbar/lightmapper.png) | **Lightmapper** | [Lightmapper](/user-manual/graphics/lighting/runtime-lightmaps)のベイクと自動再ベイクのコントロールにアクセスします。 |
| ![Code Editor](/img/user-manual/editor/interface/toolbar/code-editor.png) | **コードエディター** | [コードエディター](/user-manual/editor/scripting/code-editor)を開きます。 |
| ![Publish](/img/user-manual/editor/interface/toolbar/publish.png) | **公開 / ダウンロード** | プロジェクトの[ビルドを公開](/user-manual/editor/publishing/web/playcanvas-hosting#publishing-a-new-build)またはダウンロードします。 |
| ![GitHub](/img/user-manual/editor/interface/toolbar/github.png) | **GitHub** | [GitHub](https://github.com/playcanvas/editor/issues)で問題を報告します。 |
| ![Discord](/img/user-manual/editor/interface/toolbar/discord.png) | **Discord** | PlayCanvasの[Discordサーバー](https://discord.gg/RSaMRzg)に参加します。 |
| ![Forum](/img/user-manual/editor/interface/toolbar/forum.png) | **フォーラム** | [フォーラム](https://forum.playcanvas.com)でヘルプを求めます。 |
| ![How Do I](/img/user-manual/editor/interface/toolbar/how-do-i.png) | **使い方...？** | Viewportで「使い方...？」ヘルプウィジェットを切り替えます。 |
| ![Controls](/img/user-manual/editor/interface/toolbar/controls.png) | **操作方法** | Editorがサポートする[操作方法とキーボードショートカット](../keyboard-shortcuts)のリストを表示します。 |
| ![Settings](/img/user-manual/editor/interface/toolbar/settings.png) | **設定** | Editorとシーンの設定を[Inspector](../inspector)に読み込みます。 |

## ツールバーのカスタマイズ {#customizing-the-toolbar}

Editor 2.30.3以降、使わないボタンを非表示にしたり、残りのボタンを並べ替えたりできます。

<video autoPlay muted loop controls src='/video/editor-toolbar-customization.mp4' style={{width: '100%', height: 'auto'}} />

ツールバー上の任意の場所を右クリックすると、コンテキストメニューが開きます。

| コマンド | 説明 |
| ------- | ----------- |
| **Edit Toolbar** | 編集モードに入ります。 |
| **Done Editing** | 編集モードを終了します。編集中はEdit Toolbarの代わりに表示されます。 |
| **Reset Toolbar** | デフォルトのボタンと並び順に戻します。何かを非表示にしたり移動したりした後にのみ表示されます。 |

編集モードでは、次のようになります。

- 各ボタンに**目**のバッジが付きます。クリックすると、そのボタンの表示と非表示が切り替わります。非表示にしたボタンは、元に戻せるように、編集中は淡色で表示されたまま残ります。
- ボタンはドラッグして並べ替えできます。ツールバーには上部のコマンドと下部のユーティリティボタンという2つのグループがあり、ボタンは自分のグループ内でのみ移動できます。
- ツールバー上部の**メニュー**ボタンが**Done editing toolbar**ボタンに変わります。これをクリックするか、コンテキストメニューから **Done Editing** を選ぶと編集を終了します。

:::note

レイアウトはプロジェクトではなくブラウザに保存されます。そのため、そのブラウザで開くすべてのプロジェクトに適用され、共同作業者と共有されることはありません。

:::
