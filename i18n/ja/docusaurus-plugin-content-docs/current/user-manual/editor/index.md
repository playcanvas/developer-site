---
title: PlayCanvas Editor
description: "PlayCanvasのアプリやゲームをチームで作れる、ブラウザベースのビジュアルエディターです。Editorで作ったゲーム、始め方、Editorでできること、このセクションの全体像を紹介します。"
---

import Link from '@docusaurus/Link';

PlayCanvas Editorは、ウェブブラウザで動く3Dアプリやゲームを作るためのビジュアルエディターで、Editor自体もブラウザで動きます。チームでリアルタイムにシーンを作り、JavaScriptで動きを加え、どんなデバイスでもテストし、リンク1つでウェブに公開できます。

![ガラスのチェスセットがあるゲームルームを表示したPlayCanvas Editor。Viewportではキングが選択され、左にシーンのエンティティ、右のInspectorにキングのコンポーネント、下にチェスの駒のアセットが表示されています。](/img/user-manual/editor/editor-seemore-games-room.webp)

これは、ArmのデモをPlayCanvasチームがウェブに移植した[Seemore](https://playcanvas.com/project/612100)のゲームルームを、Editorで開いたところです。左にシーンのエンティティ、右に選択したチェスの駒のコンポーネント、下にプロジェクトのアセットが表示されています。[初めてのアプリ](getting-started/your-first-app.md)では、自分のシーンを作って公開する手順を15分ほどで説明しています。

<div className="cta-buttons">
    <Link className="button button--primary button--lg" to="/user-manual/editor/getting-started/your-first-app/">初めてのアプリを作る →</Link>
    <Link className="button button--secondary button--lg" to="https://playcanvas.com/editor">Editorを開く</Link>
    <Link className="button button--secondary button--lg" to="/tutorials/">チュートリアルを見る</Link>
</div>

## どこから始めますか？ {#where-do-you-want-to-start}

<div className="row path-cards">
  <div className="col col--6">
    <Link className="card path-card" to="/user-manual/editor/getting-started/your-first-app/">
      <div className="card__header"><h3>🚀 Editorを初めて使う</h3></div>
      <div className="card__body"><p>小さな物理ゲームを15分ほどで作って公開し、その過程でエンティティ、マテリアル、物理演算、スクリプト、公開に触れます。</p></div>
      <div className="card__footer">初めてのアプリ →</div>
    </Link>
  </div>
  <div className="col col--6">
    <Link className="card path-card" to="/user-manual/editor/getting-started/how-projects-work/">
      <div className="card__header"><h3>🧭 全体像を知りたい</h3></div>
      <div className="card__body"><p>プロジェクトの中で、シーン、エンティティ、アセット、スクリプト、ブランチ、ビルドがどう組み合わさっているかを確認します。</p></div>
      <div className="card__footer">Editorプロジェクトのしくみ →</div>
    </Link>
  </div>
  <div className="col col--6">
    <Link className="card path-card" to="/user-manual/getting-started/migrating-from-unity/">
      <div className="card__header"><h3>🎮 Unityから来た</h3></div>
      <div className="card__body"><p>Unityのシーン、プレハブ、コンポーネント、C#スクリプトについての知識を、EditorとそのJavaScriptスクリプトに対応づけます。</p></div>
      <div className="card__footer">Unityからの移行 →</div>
    </Link>
  </div>
  <div className="col col--6">
    <Link className="card path-card" to="/user-manual/editor/assets/">
      <div className="card__header"><h3>📦 モデルや素材がある</h3></div>
      <div className="card__body"><p>モデル、テクスチャ、オーディオをアップロードし、Editorがそれらを何に変換するかを確認します。</p></div>
      <div className="card__footer">アセット →</div>
    </Link>
  </div>
  <div className="col col--6">
    <Link className="card path-card" to="/user-manual/editor/scripting/">
      <div className="card__header"><h3>🧩 コードを書きたい</h3></div>
      <div className="card__body"><p>スクリプトを作成してエンティティにアタッチし、組み込みのコードエディターかVisual Studio Codeで編集します。</p></div>
      <div className="card__footer">スクリプト →</div>
    </Link>
  </div>
  <div className="col col--6">
    <Link className="card path-card" to="/user-manual/editor/mcp-server/">
      <div className="card__header"><h3>🤖 AIアシスタントと作業する</h3></div>
      <div className="card__body"><p>EditorのModel Context Protocol（MCP）サーバーを使って、Claude Code、Codex、Cursorなどのアシスタントをプロジェクトにつなぎます。</p></div>
      <div className="card__footer">MCP Server →</div>
    </Link>
  </div>
</div>

## PlayCanvas Editorを使う理由 {#why-the-playcanvas-editor}

- **インストール不要。** Editorはブラウザで動き、プロジェクトはオンラインに保存されるので、どのコンピューターからでも作業を続けられます。
- **リアルタイムで一緒に作れる。** 同じシーンで作業している全員が、互いの変更をその場で見られます。誰がいるかの表示とチャットも組み込まれています。[リアルタイムコラボレーション](realtime-collaboration.md)を参照してください。
- **変更が実行中のアプリに反映される。** シーンを別のタブやスマートフォンで[起動](interface/launch-page/index.md)すると、Editorでの編集がその場で反映されます。
- **バージョン管理を内蔵。** [チェックポイント](version-control/checkpoints.md)を保存し、[ブランチ](version-control/branches.md)でアイデアを試して[マージ](version-control/merging.md)で戻せます。競合したものは両方のバージョンを比べられます。
- **好きな方法でコードを書ける。** 組み込みの[コードエディター](scripting/code-editor.md)を使うことも、使い慣れたツールやAIコーディングアシスタントと一緒に[Visual Studio Code](scripting/vscode-extension.md)を使うこともできます。
- **ブラウザが動く場所ならどこへでも公開できる。** [playcanvas.comでビルドをホスト](publishing/playcanvas-hosting.md)して共有できるリンクで公開することも、[ダウンロード](publishing/downloading.md)して自分でホストすることも、[プレイアブル広告](publishing/playable-ads/index.md)や[モバイルアプリ](/user-manual/publishing/mobile/)としてパッケージすることもできます。
- **フル機能のEngineが土台。** Editorのプロジェクトはオープンソースの[PlayCanvas Engine](../engine/index.md)で動くので、グラフィックス、物理演算、アニメーション、ユーザーインターフェースについてこのマニュアルで説明していることは、すべてEditorのプロジェクトにも当てはまります。
- **オープンソース。** Editor自体も[GitHub](https://github.com/playcanvas/editor)でMITライセンスのもとオープンに開発されています。

Editorで作られたものは[PlayCanvasの利用実績](/user-manual/getting-started/made-with-playcanvas/)で見られます。

## このセクションの内容 {#in-this-section}

- [はじめに](getting-started/index.md) — 初めてのアプリ、プロジェクトの作成、プロジェクトのしくみ、インターフェース。
- [シーンの操作](scenes/index.md) — シーン、Hierarchy、Viewport、Inspector、テンプレート。
- [アセット](assets/index.md) — モデル、テクスチャ、オーディオなどのアップロード、整理、設定。
- [スクリプト](scripting/index.md) — スクリプトの作成と管理、コードエディターやVisual Studio Codeでの編集、読み込み順の制御。
- [テストとデバッグ](interface/launch-page/index.md) — 起動ページ、カスタムエンジンのビルド、エンジンの互換性、トラブルシューティング。
- [コラボレーション](realtime-collaboration.md) — 他の人とリアルタイムで1つのシーンを作り、チームを管理します。
- [バージョン管理](version-control/index.md) — チェックポイント、ブランチ、マージ。
- [公開](publishing/index.md) — ビルド、PlayCanvasホスティング、ダウンロード、プレイアブル広告。
- [プロジェクトの管理](projects/index.md) — プロジェクト設定、開発ログ、バックアップ、所有権。
- [自動化とAI](mcp-server.md) — MCP Server、[Editor API](editor-api.md)、[REST API](/user-manual/api/)。
- リファレンス — [ツールバー](interface/toolbar.md)、[キーボードショートカット](interface/keyboard-shortcuts.md)、[設定](interface/settings/index.md)、[コンポーネント](scenes/components/index.md)、[アセットインスペクター](assets/inspectors/index.md)。
- [チュートリアル](/tutorials/) — 学習用の完成したEditorプロジェクト。トピックで絞り込めます。

## 最新情報を追う {#stay-in-the-loop}

- [GitHub](https://github.com/playcanvas/editor) — EditorのソースコードとIssueに。各バージョンの[リリースノート](https://github.com/playcanvas/editor/releases)もあります
- [PlayCanvasブログ](https://blog.playcanvas.com/) — ニュースに
- [Discord](https://discord.gg/RSaMRzg)と[フォーラム](https://forum.playcanvas.com/) — 質問や作品の共有に
- [EditorのAI向けドキュメントインデックス](https://developer.playcanvas.com/user-manual/editor/llms.txt) — コーディングエージェントに
