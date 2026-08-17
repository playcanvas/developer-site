---
title: ライブラリの使用
description: "splat-transform をプログラムで使用します：Node.jsおよびブラウザでGaussian splatデータを読み取り、処理、書き込みするためのチャンクソースパイプライン。"
---

[splat-transform](/user-manual/splat-transform/) は、Gaussian splatデータの読み取り、処理、書き込みのためのプログラマティックAPIを公開しています。シーンは遅延評価されるチャンク化された `ChunkSource` を通じて流れるため、常駐メモリはシーンサイズではなくチャンクサイズによって制限されます — これはCLIが数億のガウシアンを持つシーンを処理するために使用しているのと同じパイプラインです。

:::note APIリファレンス

このページは主要なエントリポイントの概要です。すべてのエクスポートの完全なTypeDocリファレンスは [api.playcanvas.com/splat-transform](https://api.playcanvas.com/splat-transform/) にあります。

:::

## 基本的なインポート

```typescript
import {
    readFile,
    writeSource,
    getInputFormat,
    getOutputFormat,
    createChunkDataPool,
    processSourceBridged
} from '@playcanvas/splat-transform';
```

## 主要なエクスポート

チャンクソースパイプライン（プライマリAPI）：

| エクスポート | 説明 |
| ------ | ----------- |
| `readFile` | スプラットファイルを遅延評価される `ChunkSource` として読み取り |
| `readFileInfo` | ヘッダーのみの構造メタデータ（デコードせずに検証/確認） |
| `getInputFormat` | ファイル名から入力フォーマットを検出 |
| `getOutputFormat` | ファイル名から出力フォーマットを検出 |
| `ChunkSource` | ストリーミングのコントラクト：1つのシーンに対するチャンク化された読み取り |
| `createChunkDataPool` | パイプライン全体で共有されるプールされた読み取りバッファ |
| `processSource`, `processSourceBridged` | 一連の処理アクションをソースに適用 |
| `selectLod`, `stackLods`, `concatSource`, `bakeTransform` | 構造コンビネータ（遅延ビュー） |
| `decimateSource` | 正確なターゲット数へのチャンクネイティブでメモリ制限付きのデシメーション |
| `writeSource` | ソースを任意の単一シーン出力フォーマットにストリーミング書き込み |
| `writeLodSource` | マルチLODソースからStreamed SOG（`lod-meta.json` + チャンク化ユニット）を書き込み |
| `computeStats` | ソースまたはテーブルのLODごと・カラムごとのストリーミング統計 |

DataTable 互換（セカンダリ；各エントリはシーン全体をメモリに実体化します）：

| エクスポート | 説明 |
| ------ | ----------- |
| `DataTable`, `Column` | レガシーのシーン全体テーブル |
| `combine` | 複数のDataTableを1つにマージ |
| `processDataTable` | DataTableに処理アクションを適用 |
| `dataTableToChunkSource`, `materializeToDataTable` | DataTableとチャンクソースの世界を橋渡し |
| `writeFile` | DataTableを任意の出力フォーマットに書き込み |
| `writeVoxel` | スパースボクセルオクツリーファイルを書き込み |
| `writeImage` | カメラビューをロスレスWebP画像にレンダリング（GPUが必要） |

## ファイルシステム抽象化

ライブラリは最大限の柔軟性のために抽象ファイルシステムインターフェースを使用します：

**読み取り:**

- `UrlReadFileSystem` - URLからの読み取り（ブラウザ/Node.js）
- `MemoryReadFileSystem` - インメモリバッファからの読み取り
- `ZipReadFileSystem` - ZIPアーカイブからの読み取り

**書き込み:**

- `MemoryFileSystem` - インメモリバッファへの書き込み
- `ZipFileSystem` - ZIPアーカイブへの書き込み

## 例: 読み取りと処理

```typescript
import { Vec3 } from 'playcanvas';
import {
    readFile,
    writeSource,
    getInputFormat,
    getOutputFormat,
    createChunkDataPool,
    processSourceBridged,
    UrlReadFileSystem,
    MemoryFileSystem
} from '@playcanvas/splat-transform';

// URLからPLYファイルを遅延評価されるチャンク化ソースとして読み取り
const fileSystem = new UrlReadFileSystem('https://example.com/');
const [source] = await readFile({
    filename: 'scene.ply',
    inputFormat: getInputFormat('scene.ply'),
    fileSystem
});

// アクションを適用：変換は遅延合成され、フィルタはチャンクごとにストリーミングされます
const pool = createChunkDataPool();
const processed = await processSourceBridged(source, [
    { kind: 'scale', value: 0.5 },
    { kind: 'translate', value: new Vec3(0, 1, 0) },
    { kind: 'filterNaN' }
], pool);

// 結果をインメモリPLYにストリーミング書き込み
const memFs = new MemoryFileSystem();
await writeSource({
    filename: 'output.ply',
    outputFormat: getOutputFormat('output.ply', {}),
    source: processed,
    pool,
    options: {}
}, memFs);
await processed.close();

// 出力データを取得
const outputBuffer = memFs.results.get('output.ply');
```

まだ `DataTable` APIを使用しているコンシューマは、`materializeToDataTable(source, pool)` と `dataTableToChunkSource(dataTable)` でどちらの方向にも橋渡しできます — どちらもシーン全体を実体化するため、大きな入力ではソースのまま処理することを推奨します。

## 処理アクション

`processSource` / `processSourceBridged`（および互換の `processDataTable`）はアクションの配列を受け取ります：

```typescript
type ProcessAction =
    | { kind: 'translate'; value: Vec3 }
    | { kind: 'rotate'; value: Vec3 }       // 度単位のオイラー角
    | { kind: 'scale'; value: number }
    | { kind: 'filterNaN' }
    | { kind: 'filterByValue'; columnName: string; comparator: 'lt'|'lte'|'gt'|'gte'|'eq'|'neq'; value: number }
    | { kind: 'filterBands'; value: 0|1|2|3 }
    | { kind: 'filterBox'; min: Vec3; max: Vec3 }
    | { kind: 'filterSphere'; center: Vec3; radius: number }
    | { kind: 'filterFloaters'; voxelResolution?: number; opacityCutoff?: number; minContribution?: number } // GPU
    | { kind: 'filterCluster'; voxelResolution?: number; seed?: Vec3; opacityCutoff?: number; minContribution?: number } // GPU
    | { kind: 'decimate'; count: number | null; percent: number | null }
    | { kind: 'param'; name: string; value: string }
    | { kind: 'stats'; format?: 'text' | 'json' }
    | { kind: 'info'; format?: 'text' | 'json' }
    | { kind: 'mortonOrder' };
```

:::note

`filterFloaters` と `filterCluster` は GPU デバイスが必要です — `ProcessOptions` 引数を介して `createDevice` を渡してください。`processSource` はストリーミング処理し、DataTableブリッジを必要とするアクション（`decimate`、`mortonOrder`、GPUボクセルフィルタ）ではスローします；`processSourceBridged` はすべてのアクションを処理し、必要な実行のみを実体化します。

:::

## カスタムロギング

環境に合わせてロガーを設定します：

```typescript
import { logger, TextRenderer } from '@playcanvas/splat-transform';

// ステータス出力（スコープ、プログレスバー、メッセージ）をstderrに、
// パイプ可能な出力（例：JSON統計）をstdoutにルーティング
logger.setRenderer(new TextRenderer({
    write: process.stderr.write.bind(process.stderr),
    output: process.stdout.write.bind(process.stdout)
}));

logger.setVerbosity('quiet'); // 'quiet' | 'normal' | 'verbose'
```
