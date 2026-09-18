---
title: SuperSplat Editor
description: "SuperSplat Editor：3Dガウシアンスプラットをクリーンアップ、最適化、アニメーション化するためのオープンソースのブラウザベースエディタ。"
---

[SuperSplat Editor](https://superspl.at/editor)は、[SuperSplatプラットフォーム](../)の中核をなすオープンソースのブラウザベースエディタです。生のスプラットキャプチャをクリーンアップしたり、浮遊物をトリミングしたり、シーンをクロップしたり、色を補正したり、カメラアニメーションを作成したり、完成したスプラットを共有できる状態に公開したりするためのツールです。EditorはMITライセンスの下で[GitHubでオープンソース](https://github.com/playcanvas/supersplat)であり、完全にブラウザ内で動作します — あなたが公開を選ぶまで何もアップロードされません。

:::tip すでにクリーンなスプラットをお持ちの場合

Editorを完全にスキップできます。[superspl.atのホームページ](https://superspl.at)にあるオレンジ色の**Upload Splat**ボタン（または[Direct Upload](../upload)フロー）を使って、完成済みのスプラットを[Manageページ](../manage)に直接公開できます。

:::

![SuperSplat Interface](/img/user-manual/supersplat/editor/editor-hero.webp)

## 動画チュートリアル

### SuperSplat入門

SuperSplat Editorの基本を学ぶには、この動画による入門が最適です：

<div className="iframe-container">
    <iframe width="560" height="315" src="https://www.youtube.com/embed/MwzaEM2I55I" title="SuperSplat Basics" allowfullscreen></iframe>
</div>

### 詳細チュートリアル

SuperSplat Editorのより包括的なガイドについては、この詳細なチュートリアルをご覧ください：

<div className="iframe-container">
    <iframe width="560" height="315" src="https://www.youtube.com/embed/J37rTieKgJ8" title="SuperSplat In-Depth Tutorial" allowfullscreen></iframe>
</div>

## はじめに

### Editorへのアクセス

1. **ブラウザを開く** — [superspl.at/editor](https://superspl.at/editor)にアクセスします
2. **スプラットファイルを読み込む** — ウィンドウにドラッグ＆ドロップするか、**File > Import**を使用します
3. **編集を開始する** — インターフェースコントロールを使用してナビゲートおよび編集します

### システム要件

- **WebGPUに対応したブラウザ** — 最新のChromeまたはEdge、Safari 26以降、あるいはWebGPUを有効にしたFirefox。WebGPUが利用できない場合、Editorは読み込まれずに起動時にメッセージを表示します。
- **GPUアクセラレーション** — ブラウザのハードウェアアクセラレーションを有効にしておいてください。非常に大きなスプラットには専用GPUが有効です。
- **インストール不要** — すべてブラウザで動作します。必要に応じて、ブラウザのアドレスバーからEditorをアプリとしてインストールすることもできます。インストールすると、ファイルマネージャーから`.ply`、`.splat`、`.sog`、`.spz`、`.ksplat`、`.ssproj`ファイルを直接開けます。

## 次のステップ

- [インターフェース概要](interface)で全体像を把握する
- 対応している[インポートとエクスポート](import-export)のフォーマットを学ぶ
- [選択とクリーンアップ](editing-splats)でキャプチャを整理し、[変形、測定、位置合わせ](transform-measure-align)で仕上げる
- [スプラットの管理](scene-management)で複数のキャプチャを扱い、[色と外観](color-and-appearance)で見た目を整える
- [キーボードショートカット](keyboard-shortcuts)を参照し、ワークフローが期待どおりに動作しない場合は[トラブルシューティング](troubleshooting)を確認する
- スプラットがクリーンになったら、superspl.atに[公開](publishing)し、[Manageページ](../manage)に表示し、[Studio](../studio/)で開きます
