---
title: SuperSplat Studio
description: "Studioは公開済みスプラットの視聴体験をキュレーションします：カメラ、注釈、ポストエフェクト、スカイボックス、コリジョン。"
---

**SuperSplat Studio**は、すでに[公開](/user-manual/supersplat/editor/publishing)または[直接アップロード](/user-manual/supersplat/upload)したスプラットの視聴体験をキュレーションする場所です。公開済みシーンの上に開き、訪問者が[シーンページ](/user-manual/supersplat/scene-page)で見るものの多く — カメラフレーミング、シーン上の注釈、ポストプロセッシングエフェクト、トーンマッピング、背景またはスカイボックス、ウォーカブルシーン用のコリジョンジオメトリ — を調整できます。（カメラアニメーションは別途[エディターのタイムライン](/user-manual/supersplat/editor/timeline)で作成します。）

Studioは出力を単一のJSONドキュメント — [Experience Settings](/user-manual/supersplat/studio/experience-settings) — として書き出し、これをオープンソースの[SuperSplat Viewer](/user-manual/supersplat/viewer/)がランタイムで読み込みます。同じJSONがセルフホスト用のHTMLエクスポートにもバンドルされます。

<!-- TODO: media — /img/user-manual/supersplat/studio/launching-studio.png — Studioのレイアウト -->

## Studioの起動

Studioは**`https://superspl.at/scene/<hash>/studio`**で動作します。Studioを開けるのはスプラットのオーナーのみで、他のユーザーがURLにアクセスしても404になります。

たどり着く方法は2つあります：

- [Manageページ](/user-manual/supersplat/manage)から、スプラットの**Edit Splat**ダイアログを開き、プレビューカードの**Open in Studio**をクリックします。
- 自分のスプラットの[シーンページ](/user-manual/supersplat/scene-page)から、**Edit in Studio**エントリポイントを使用します。

:::note デスクトップ推奨

Studioはデスクトップブラウザ向けに作られています。スマートフォンやタブレットで開くと「Studio works best on desktop」という警告が表示されます。警告を閉じて続行できますが、UIの制約があります。

:::

## レイアウト

StudioはSuperSplat editorのシェルを再利用しています：

- **ヘッダ** — 戻るボタン、シーン名、**Import** / **Export** / **View** アクション、**Save**。
- **左パネル** — 3つのタブで構成された単一のパネル：
  - **Scene** — *Look & Tone*（背景、トーンマッピング、高精度レンダリング）、*Post Effects*、*Cameras* のセクションをまとめています。
  - **Annotations** — シーン上の注釈のリスト。
  - **Assets** — コリジョンなどのシーンアセットのアップロード。
- **ビューポート** — 訪問者がシーンをどう見るかのライブプレビュー。

すべてのツール設定は左パネルにあります — 右側に独立したインスペクターはありません。

各ツールセクションには独自のページがあります：

- [Cameras](/user-manual/supersplat/studio/cameras) — 1つ以上の名前付きカメラの初期姿勢、ターゲット、視野角。
- [Annotations](/user-manual/supersplat/studio/annotations) — 訪問者が移動可能な、3D空間に配置されたテキストホットスポット。
- [Post Effects](/user-manual/supersplat/studio/post-effects) — シャープネス、ブルーム、カラーグレーディング、ビネット、フリンジング、トーンマッピング、高精度レンダリング。
- [Skybox](/user-manual/supersplat/studio/skybox) — 背景色またはフルのエクイレクタンギュラースカイボックス。
- [Collision](/user-manual/supersplat/studio/collision) — シーンを「ウォーカブル」にするボクセルジオメトリ。

## 変更の保存

編集は自動保存されません。ヘッダには、完全なExperience Settings JSONをサーバーにプッシュする**Save**アクションが表示されます。

<!-- TODO: media — /video/user-manual/supersplat/studio/save-flow.mp4 — ダーティ状態インジケータ → Save → ビューアの再読み込み -->

保存フローについて知っておくべきことがいくつかあります：

- **ダーティ状態の追跡** — Studioは未保存の変更を認識します。編集が未保存の状態で離脱しようとすると、失う前に警告されます。
- **再読み込み時のキャッシュバスティング** — 保存に成功すると、キャッシュバスティングされた設定URLでビューアが再読み込みされ、編集内容がすぐに反映されます。それ以降、シーンページを読み込む訪問者には新しいバージョンが表示されます。
- **部分保存なし** — 保存ごとに差分ではなく完全なExperience Settings JSONが書き込まれます。保存後に何かおかしく見える場合は、変更がマージされることを期待するのではなく、各パネルの値を改めて確認してください。

## スキーマのバージョニング

Experience Settings JSONにはバージョン番号があり、現在のスキーマは**v2**です。古い`v1`の設定（Studioが一部の機能をサポートする前のもの）は読み込み時に自動的に`v2`に移行されます。特別な対応は必要ありません — ただし、[ビューア](/user-manual/supersplat/viewer/)をセルフホストしてsettings.jsonを直接読み込む場合は、現在のスキーマについて[Experience Settings](/user-manual/supersplat/studio/experience-settings)リファレンスを参照してください。

## 関連項目

- [Experience Settings](/user-manual/supersplat/studio/experience-settings) — Studioが書き、Viewerが読むJSONコントラクト
- [Viewer / embedding](/user-manual/supersplat/viewer/embedding) — 公開された設定がランタイムでどう消費されるか
- [シーンページ](/user-manual/supersplat/scene-page) — Studioの変更が保存された後に訪問者が見るもの
