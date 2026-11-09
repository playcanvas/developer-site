---
title: デバッグと最適化
description: PlayCanvas アプリケーションのバグやパフォーマンスの問題を見つけるツールと、ロード時間、フレームレート、CPU と GPU の負荷、メモリを最適化する理由と方法です。
---

このセクションでは、実行中の PlayCanvas アプリケーションの内部を調べ、期待どおりに動作しない理由や、期待どおりのパフォーマンスが出ない理由を見つけるツールと、アプリケーションのロードと実行を速くする方法を説明します。

## 使うツール {#which-tool-to-use}

| 調べたいこと | 使うもの |
| ------------ | -------- |
| コードが何をしていて、どこで問題が起きているか | [コンソールロギング](/user-manual/debugging/console-logging/)と[ブラウザ開発者ツール](/user-manual/debugging/browser-dev-tools/) |
| アプリケーションの中身：エンティティとコンポーネント、カメラ、アセット、GPU リソース | [Inspector](/user-manual/debugging/inspector/) |
| フレームがパスごと、描画ごとにどうレンダリングされるか | [Inspector](/user-manual/debugging/inspector/) の Frame graph タブと、[フレームのステップ実行](/user-manual/debugging/inspector/#stepping-through-a-frame) |
| コードがシーン内で計算するもの（バウンディング、方向、レンダーターゲットの内容など） | [デバッグ描画](/user-manual/graphics/debug-drawing/) |
| 操作中にアプリケーションがフレームレートを保てているか | [MiniStats](/user-manual/optimization/mini-stats/) |
| どのフレームが遅く、何がそれを遅らせているか：CPU、GPU、スクリプト、ロード | [Inspector の Performance タブ](/user-manual/optimization/inspector-performance/) |
| アプリケーションの起動にかかる時間と、何がいつロードされるか | [Inspector の Performance タブ](/user-manual/optimization/inspector-performance/#recording-the-start-of-the-application)、または [Editor Profiler](/user-manual/optimization/profiler/) |
| ダッシュボードや自動比較のための、コードからのエンジンの統計 | [AppStatsによるプロファイリング](/user-manual/optimization/app-stats/) |
| フレーム内で GPU が行う処理の詳細 | ネイティブ GPU ツールによる [GPUプロファイリング](/user-manual/optimization/gpu-profiling/) |

## 最適化 {#optimization}

最適化は、PlayCanvasアプリケーション開発の重要な部分です。それは、優れたユーザーエクスペリエンスとひどいユーザーエクスペリエンスの分かれ目となることがあります。

:::tip

プロジェクトが完成に近づくまで最適化を考慮するのを待たないでください。最初から考慮するようにしてください。それはアプリケーションの設計方法に大きな影響を与える可能性があります。

:::

まず、最適化の主要な目標を設定し、それぞれの目標がなぜ重要なのかを強調することから始めましょう。

| 目標 | なぜ重要か |
| ---- | -------------- |
| ⏱️ ロード時間の最小化 | ユーザーの忍耐力は限られています。アプリのロードが速くない場合、ユーザーは待つのを諦めて他の場所へ行ってしまうかもしれません。 |
| 🎞️ フレームレートの最大化 | 高い（そして安定した）フレームレートは、心地よいビジュアルとユーザー入力に対する低遅延の応答をもたらします。 |
| 🔋 CPUとGPUの負荷の最小化 | アプリが1秒間に60フレームを維持しているからといって、作業が完了したわけではありません。プロセッサーの負荷を減らすことでバッテリー電力を節約し、デバイスを低温に保ちます。 |
| 🧠 メモリ使用量の最小化 | ブラウザはアプリケーションに割り当てるメモリプールを制限しています。このプールが枯渇すると、タブがクラッシュして再ロードされます。ユーザーは不満に感じるでしょう！ |

### 最適化の前に測定する {#measure-before-optimizing}

再現可能なシーンや操作を選び、対象デバイスでベースラインを記録してから、[使うツール](#which-tool-to-use)のプロファイリングツールを使い、同じ条件で各変更を測定します。何を変更するかは、[ガイドライン](/user-manual/optimization/guidelines/)とそれに続くページで説明しています。

:::ai
AIアシスタントに目標、再現手順、[**AppStats**](/user-manual/optimization/app-stats/#collecting-periodic-reports)のベースラインレポートを渡すと、MiniStatsやブラウザーの結果と組み合わせ、測定可能な変更を1つずつ提案できます。Editorでは[**Editor MCP Server**](/user-manual/editor/mcp-server/)、スタンドアロンでは[**AIを活用した開発**](/user-manual/engine/developing-with-ai/)を使用します。
:::
