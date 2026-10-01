---
title: ユーザーインターフェース
description: "PlayCanvasのユーザーインターフェースの概要：スクリーンとエレメントで構築するキャンバス内UIとHTMLおよびCSSとの比較、すべてのオーサリング環境で使えるUIコンポーネント、このセクションの構成。"
---

ほとんどのアプリケーションには、HUD、メニュー、ボタン、ダイアログ、シーン内のラベル、XRのパネルといったインターフェースが必要です。PlayCanvasでは、インターフェースをキャンバスの内側でシーンの一部としてエンティティから構築することも、キャンバスの外側でHTMLとCSSを使って構築することもでき、多くのアプリケーションは両者を組み合わせています。

![3Dシーンに重ねたゲームのインターフェース：スクロールするパネル内のリスト、円形のポートレート、ヘルスバーとエネルギーバー、ボタンの列、ツールバー](/img/user-manual/user-interface/index/hero.webp)

キャンバス内UIはコンポーネントから構築されます。[スクリーン](/user-manual/user-interface/screens/)はインターフェースのルートで、その下にある[エレメント](/user-manual/user-interface/elements/)が、インターフェースを構成するイメージ、テキスト、グループです。ボタン、レイアウトグループ、スクロールビューなどのコンポーネントが、その上に振る舞いを追加します。これらは、エディター、エンジン直接、[PlayCanvas React](/user-manual/react/)、[Web Components](/user-manual/web-components/)のどの方法で構築しても利用できます。このセクションの各ページでは、概念を一度説明した後、それぞれの環境での適用方法を示します。

## UIを構築する2つの方法 {#two-ways-to-build-ui}

| | キャンバス内UI | HTMLとCSS |
| --- | --- | --- |
| **ワールド空間とXR** | スクリーンをシーン内に配置でき、XRでも動作する | キャンバスの上に重ねる形のみ |
| **テキスト入力** | 組み込みのサポートなし | テキストフィールド、オートコンプリート、オンスクリーンキーボード |
| **アクセシビリティ** | スクリーンリーダーやキーボードナビゲーションからは認識されない | 適切な要素を使えばアクセシブルにできる |
| **スタイルとレイアウト** | アンカー、レイアウトグループ、9スライスのスプライト | CSSと、ブラウザのレイアウトやアニメーション |
| **フォントと絵文字** | フォントファイルから作成するMSDFフォント、キャンバスフォントによる絵文字 | あらゆるWebフォントと絵文字 |
| **エディター** | エディターで構築・プレビューできる | HTMLとCSSのアセットまたはファイルとして記述する |
| **キャンバスのキャプチャ** | キャンバスのスクリーンショットや動画キャプチャに含まれる | キャンバスのキャプチャには含まれない |
| **パフォーマンス** | シーンと一緒に描画され、バッチングされる | キャンバスとは別に、ブラウザがレイアウトとペイントを行う |

キャンバス内UIは、HUD、シーン内やXRのインターフェース、そしてキャンバスに表示される内容の一部でなければならないものに適しています。HTMLは、メニュー、設定、フォーム、長いテキストに適しています。両者はうまく組み合わせられます。例えば、HUDをキャンバス内に持つアプリケーションを、HTMLの設定画面から一時停止できます。[HTMLとCSS](/user-manual/user-interface/html-and-css/)を参照してください。

## 構成要素 {#building-blocks}

| コンポーネント | 役割 | Editor | React | Web Components | API |
| --- | --- | --- | --- | --- | --- |
| Screen | インターフェースのルート。画面に重ねるか、シーン内に配置する | [Screen](/user-manual/editor/scenes/components/screen/) | [`<Screen>`](/user-manual/react/api/screen/) | [`<pc-screen>`](/user-manual/web-components/tags/pc-screen/) | [ScreenComponent](https://api.playcanvas.com/engine/classes/ScreenComponent.html) |
| Element | イメージ、テキスト、またはグループ | [Element](/user-manual/editor/scenes/components/element/) | [`<Element>`](/user-manual/react/api/element/) | [`<pc-element>`](/user-manual/web-components/tags/pc-element/) | [ElementComponent](https://api.playcanvas.com/engine/classes/ElementComponent.html) |
| Button | ホバーと押下の状態、クリックイベント | [Button](/user-manual/editor/scenes/components/button/) | [エンジンのコンポーネント](/user-manual/user-interface/buttons/#creating-a-button) | [`<pc-button>`](/user-manual/web-components/tags/pc-button/) | [ButtonComponent](https://api.playcanvas.com/engine/classes/ButtonComponent.html) |
| Layout Group | 子を行、列、グリッドに並べる | [Layout Group](/user-manual/editor/scenes/components/layoutgroup/) | [エンジンのコンポーネント](/user-manual/user-interface/layout-groups/#creating-a-layout-group) | [`<pc-layout-group>`](/user-manual/web-components/tags/pc-layout-group/) | [LayoutGroupComponent](https://api.playcanvas.com/engine/classes/LayoutGroupComponent.html) |
| Layout Child | レイアウトグループによる子のサイズの決め方を上書きする | [Layout Child](/user-manual/editor/scenes/components/layoutchild/) | [エンジンのコンポーネント](/user-manual/user-interface/layout-groups/#layout-children) | [`<pc-layout-child>`](/user-manual/web-components/tags/pc-layout-child/) | [LayoutChildComponent](https://api.playcanvas.com/engine/classes/LayoutChildComponent.html) |
| Scroll View | マスクされたビューポート内でコンテンツをスクロールする | [Scroll View](/user-manual/editor/scenes/components/scrollview/) | [エンジンのコンポーネント](/user-manual/user-interface/scroll-views/#creating-a-scroll-view) | [`<pc-scroll-view>`](/user-manual/web-components/tags/pc-scroll-view/) | [ScrollViewComponent](https://api.playcanvas.com/engine/classes/ScrollViewComponent.html) |
| Scrollbar | トラック上のドラッグできるハンドル。スクロールビューやスライダーに使う | [Scrollbar](/user-manual/editor/scenes/components/scrollbar/) | [エンジンのコンポーネント](/user-manual/user-interface/scroll-views/#creating-a-scroll-view) | [`<pc-scrollbar>`](/user-manual/web-components/tags/pc-scrollbar/) | [ScrollbarComponent](https://api.playcanvas.com/engine/classes/ScrollbarComponent.html) |

PlayCanvas Reactには、スクリーンとエレメントのコンポーネントがあります。それ以外はエンジンのコンポーネントとして追加します。そのための小さなヘルパーは各ページで紹介しています。

## このセクションの内容 {#in-this-section}

- [はじめに](/user-manual/user-interface/user-interface-basics/) - 各環境でのUIのセットアップと、最初のインターフェース。
- **レイアウト**
  - [スクリーン](/user-manual/user-interface/screens/) - スクリーン空間とワールド空間、あらゆるキャンバスに合わせたスケーリング、ピクセル比、優先度。
  - [エレメント](/user-manual/user-interface/elements/) - アンカー、ピボット、マージン、サイズ、グループエレメント。
  - [レイアウトグループ](/user-manual/user-interface/layout-groups/) - 子を並べる行、列、グリッド。
  - [セーフエリア](/user-manual/user-interface/safe-area/) - インターフェースがノッチや角丸にかからないようにする。
- **イメージ**
  - [イメージエレメント](/user-manual/user-interface/image-elements/) - 色、テクスチャ、スプライト、9スライス、イメージ内の3D、カスタムマテリアル。
  - [マスク](/user-manual/user-interface/masks/) - 子を矩形や形状でクリップする。
- **テキスト**
  - [テキストエレメント](/user-manual/user-interface/text-elements/) - サイズ、折り返し、フィッティング、両端揃え、マークアップ、アウトライン、シャドウ。
  - [フォント](/user-manual/user-interface/fonts/) - フォントアセットの作成と読み込み、含める文字の選択。
  - [ローカライズ](/user-manual/user-interface/localization/) - 翻訳、複数形、ロケール、言語ごとのフォント。
- **インタラクション**
  - [入力](/user-manual/user-interface/input/) - マウス、タッチ、XRのイベント、バブリング、UIの入力がゲームに届かないようにする方法。
  - [ボタン](/user-manual/user-interface/buttons/) - ホバーと押下の状態、ティント、スプライト、イベント。
  - [スクロールビュー](/user-manual/user-interface/scroll-views/) - ドラッグ、ホイール、スクロールバーによるコンテンツのスクロール。
- [よく使うウィジェット](/user-manual/user-interface/common-widgets/) - プログレスバー、スライダー、トグル、ダイアログ、リスト、ドラッグ＆ドロップなど。
- **ワールド空間とXR**
  - [ワールド空間UI](/user-manual/user-interface/world-space-ui/) - シーン内のインターフェースと、キャラクターの頭上のラベル。
  - [XRのUI](/user-manual/user-interface/xr/) - 没入型セッションでのパネル、ポインティング、ハンド、メニュー。
- [HTMLとCSS](/user-manual/user-interface/html-and-css/) - キャンバスの上にDOMで構築するインターフェース。
- [描画順とパフォーマンス](/user-manual/user-interface/draw-order-and-performance/) - UIが描画される仕組みと、高速に保つ方法。
- [トラブルシューティング](/user-manual/user-interface/troubleshooting/) - よくある問題とその原因。

## 関連情報 {#see-also}

- [ユーザーインターフェース - ボタン](/tutorials/ui-elements-buttons/)、[リーダーボード](/tutorials/ui-elements-leaderboard/)、[プログレスバー](/tutorials/ui-elements-progress/) - エディターでインターフェースを構築するチュートリアル
- [ユーザーインターフェース - テキスト入力](/tutorials/ui-text-input/) - テキストフィールドを構築するチュートリアル
- [タッチスクリーンのジョイパッド操作](/tutorials/touch-joypad/) - 画面上のジョイスティックを構築するチュートリアル
- [2D](/user-manual/2D/) - スプライト、テクスチャアトラス、9スライス
- [PCUI](https://playcanvas.github.io/pcui/) - ツールやエディターを構築するためのHTMLコンポーネントライブラリ
