---
title: Convert
description: "superspl.at/convertでブラウザ上でスプラットを変換・トランスフォーム — splat-transform CLIのウェブフロントエンドです。"
---

[Convertページ](https://superspl.at/convert)は、フォーマット間でスプラットを変換し、トランスフォームし、フィルタするブラウザベースのツールです — インストールもコマンドラインも不要です。[splat-transform](/user-manual/splat-transform/) CLIのウェブフロントエンドであり、同じアクションとフォーマットが利用できますが、より親しみやすいドラッグ＆ドロップインターフェースを備えています。

ConvertはWebAssemblyを使って**完全にブラウザ内で動作**します。スプラットはサーバーにアップロードされません。すべてローカルで処理され、完了後にあなたのマシンにダウンロードされます。

<!-- TODO: media — /img/user-manual/supersplat/convert/convert-ui.png — ファイルが追加されアクションがキューされたConvertページ -->

## ConvertとCLIの使い分け

単発の変換、インタラクティブに試したい、Node.jsをインストールしていない場合は**Convert**ページを使います。変換をスクリプト化する、多数のファイルをバッチ処理する、ビルドパイプラインに統合する場合は[splat-transform CLI](/user-manual/splat-transform/)を使います。

## 対応入力フォーマット

ファイル（複数可）をアップロードエリアにドラッグするか、ファイルシステムから選択します。

- `.ply` — 標準PLY
- `.sog` — バンドル形式の超圧縮フォーマット
- `.ksplat` — mkkellogg圧縮フォーマット
- `.splat` — antimatter15圧縮フォーマット
- `.spz` — Niantic圧縮フォーマット

複数のファイルを追加できます。1つの出力ファイルにマージされます（出力フォーマットが対応していれば複数のLODとして扱われます）。

## 対応出力フォーマット

ドロップダウンから出力フォーマットを選びます。デフォルトは**Compressed PLY**です。

| フォーマット | ファイル名 | 備考 |
|--------|----------|-------|
| **Standard PLY** | `.ply` | 最大サイズ。可逆な交換フォーマットとして有用です。 |
| **Compressed PLY** | `.compressed.ply` | デフォルト。量子化されたPLY — 標準より約30%小さい。 |
| **SuperSplat Optimized** | `.sog` | ランタイム利用に最適な圧縮。 |
| **Spreadsheet** | `.csv` | スプレッドシート／データ分析向けに、Gaussianごとのデータをダンプします。 |
| **Embedded Viewer** | `.html` | スプラットとビューアを含む自己完結型の`.html` — ダブルクリックでローカルから開けます。 |
| **Voxel Collision Bundle** | `.voxel.zip` | [Studio](/user-manual/supersplat/studio/collision)でシーンをウォーカブルにするためのボクセルコリジョンデータ。 |

## アクション

各入力ファイルは独自のアクションチェーンを持ちます。アクションは上から下へ順に実行されます。マージされた出力に対して実行される最終アクションチェーンを追加することもできます。

### Transformアクション

| アクション | パラメータ | デフォルト |
|--------|-----------|---------|
| **Translate** | `x`, `y`, `z` | `0, 0, 0` |
| **Rotate** | `x`, `y`, `z` 度 | `0, 0, 0` |
| **Scale** | 係数 | `1`（最小`0.001`） |

### Filterアクション

| アクション | パラメータ | デフォルト |
|--------|-----------|---------|
| **Remove NaN / Inf** | _(なし)_ | — |
| **SH Bands** | 最大バンド：`0`（DCのみ）、`1`、`2`、`3`（Full） | `3` |
| **Bounding Box** | `minX`, `minY`, `minZ`, `maxX`, `maxY`, `maxZ` | `±10` |
| **Sphere** | `centerX`, `centerY`, `centerZ`, `radius` | 中心`0`、半径`10` |

## フォーマット固有の出力オプション

いくつかの出力フォーマットには追加のコントロールが表示されます：

- **SOGとHTML viewer** — **SH圧縮イテレーション数**（範囲`1–100`、デフォルト`10`）。イテレーションを増やすと球面調和圧縮はよりクリーンになりますが、処理時間は長くなります。
- **Voxel Collision Bundle** — **ボクセル解像度**（デフォルト`0.05` — 小さいほど表面が細かくなりますがアセットは大きくなります）と**不透明度カットオフ**（`0–1`、デフォルト`0.1` — この値を超える不透明度のボクセルがソリッドとして扱われます）。

## 処理の出力

**Convert & Download**をクリックすると：

1. ファイルがローカルで処理され、進捗がページに表示されます。
2. 処理ログにはWebAssemblyエンジンからのデバッグ、情報、警告、エラーメッセージが表示されます。
3. 変換後、列ごとの統計テーブル（合計Gaussian数、属性ごとの最小／最大／平均）が表示されます。
4. 出力ファイルが自動的にあなたのマシンにダウンロードされます。

<!-- TODO: media — /video/user-manual/supersplat/convert/action-chain.mp4 — ファイルドロップ → アクションキュー → ダウンロード -->

## 関連項目

- [splat-transform CLI](/user-manual/splat-transform/) — コマンドライン版の同じアクションとフォーマット
- [Direct Upload](/user-manual/supersplat/upload) — 完成したスプラットを、ブラウザを離れずに公開する
- [Studio / Collision](/user-manual/supersplat/studio/collision) — `.voxel.zip`の使い方
