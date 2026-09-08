---
title: WGSL の詳細
description: "PlayCanvas のシェーダーに影響する WGSL 固有の言語ルール：微分と一様な制御フロー、および derivative_uniformity 診断。"
---

WGSL には GLSL に相当するものが存在しないルールがいくつかあります。このページでは、WebGPU 向けにカスタムシェーダーやシェーダーチャンクを記述する際に遭遇しやすいものを扱います。

デバイスのサポートに依存する任意の WGSL 機能（半精度型や言語拡張）については [WGSL ケイパビリティ](/user-manual/graphics/shaders/wgsl-capabilities) を参照してください。エンジンが期待する attribute、varying、出力の規約については [WGSL 頂点シェーダーとフラグメントシェーダー](/user-manual/graphics/shaders/wgsl-vertex-fragment-shaders) を参照してください。

### 微分と一様な制御フロー {#derivatives-and-uniform-control-flow}

GPU はフラグメントシェーダーを 2x2 ピクセルのブロック（クアッド）単位で評価し、クアッド内の隣接ピクセルとの差分をとることで微分を求めます。これが成立するのは、クアッド内のすべての呼び出しがシェーダー内の同じ位置に一緒に到達している場合だけです。WGSL ではこれを**一様な制御フロー（uniform control flow）**と呼びます。一部の呼び出しが別の分岐に進んでいると、差分をとるべき隣接値が存在せず、結果は無意味になります。

そのため WGSL は、一様な制御フローで実行されることを証明できない微分依存の組み込み関数の呼び出しを、シェーダー作成時に拒否します。

- 微分組み込み関数: `dpdx`、`dpdy`、`fwidth`（および `Coarse` / `Fine` の各バリアント）
- `textureSample`
- `textureSampleBias`
- `textureSampleCompare`

制御フローが非一様になるのは、呼び出し間で同一であることを WGSL が証明できない値に依存している場合です。補間された varying、`position` などの組み込み値、テクスチャやストレージバッファから読み取った値、書き換え可能なモジュールスコープ変数などが該当します。**ユニフォームバッファ**の値による分岐は問題ありません。`#if` / `#ifdef` も、シェーダーのコンパイル前にプリプロセッサが解決するため問題ありません。

エラーは次のような形で現れます。

```text
error: 'textureSample' must only be called from uniform control flow
note: control flow depends on possibly non-uniform value
note: user-defined input 'uv' of 'fragmentMain' may be non-uniform
```

エラー本文よりも note の方が重要です。制御フローを非一様にした値の名前が示されており、多くの場合これが修正への最短経路になります。

#### 修正方法 {#fixing-it}

**1. 呼び出しが一様になるように構造を変える。** 通常はこれが最も低コストな修正です。サンプリングを分岐の外に持ち上げるか、クアッドを分断している早期終了を取り除きます。

```wgsl
// 拒否される: 一部の呼び出しだけがサンプリングに到達する
if (mask > 0.5) {
    color = textureSample(colorMap, colorMapSampler, uv);
}

// 受理される: すべての呼び出しがサンプリングし、分岐は選択のみを行う
let sampled = textureSample(colorMap, colorMapSampler, uv);
color = select(color, sampled, mask > 0.5);
```

`discard` 単独であれば、その後で制御フローが再収束するため問題ありません。しかし `return` を加えると、以降のコードに到達するのが一部の呼び出しだけになるため許されません。

```wgsl
// 受理される: 早期 return がないため、以降のサンプリングも一様なまま
if (alpha < threshold) {
    discard;
}

// 拒否される: これ以降がすべて非一様になる
if (alpha < threshold) {
    discard;
    return output;
}
```

**2. 明示的なレベルまたは勾配でサンプリングする。** `textureSampleLevel`、`textureSampleGrad`、`textureSampleCompareLevel` は暗黙の微分を必要としないため、どの制御フローでも使用できます。エンジン自身のチャンクもこの方法を採っています。シャドウマップのタップ、クッキーアトラス、ライティング LUT、ポストプロセスはいずれも明示的なレベルでサンプリングしており、そもそもこれらのテクスチャには選択対象となるミップマップがありません。

```wgsl
// どの制御フローでも合法
color = textureSampleLevel(colorMap, colorMapSampler, uv, 0.0);
```

ミップレベルが必要な場合は、一様な制御フロー内で一度だけ計算して渡します。テクスチャ上を進むループでは、いずれにせよ固定されたレベルを使うのが望ましい動作です。

```wgsl
let sizeInTexels = vec2f(textureDimensions(heightMap, 0));
let uvTexels = uv * sizeInTexels;
let dx = dpdx(uvTexels);
let dy = dpdy(uvTexels);
let lod = max(0.0, 0.5 * log2(max(dot(dx, dx), dot(dy, dy))));

for (var i = 0.0; i < steps; i += 1.0) {
    let h = textureSampleLevel(heightMap, heightMapSampler, marchUv, lod).x;
    // ...
}
```

**3. 診断を抑制する。** 最後の手段です。以下を参照してください。

### derivative_uniformity 診断 {#the-derivative-uniformity-diagnostic}

`derivative_uniformity` は、WGSL でフィルタリング可能な 2 つの診断ルールのうちの 1 つで、既定の深刻度は `error` です。診断フィルタでこの深刻度を変更すると、上記のコードもコンパイルできるようになります。

:::warning

診断フィルタのサポート状況はブラウザによって大きく異なり、属性形式は一部のブラウザでは**シェーダー作成エラー**になります。現時点で移植性があるのはモジュールスコープのディレクティブのみです。利用する前に必ず [ブラウザのサポート状況](#browser-support) を確認してください。

:::

フィルタは、ディレクティブとしてモジュール全体に、または属性として関数・文・ブロックに適用できます。

```wgsl
// モジュールスコープ - 移植性あり。モジュール内のすべての宣言より前に置く必要がある。
diagnostic(off, derivative_uniformity);

// 関数スコープ - Safari では拒否される
@diagnostic(off, derivative_uniformity)
fn readHeight(uv: vec2f) -> f32 {
    return textureSample(heightMap, heightMapSampler, uv).x;
}

// 文スコープ - Safari と Firefox で拒否される
@diagnostic(off, derivative_uniformity) if (mask > 0.5) {
    color = textureSample(colorMap, colorMapSampler, uv);
}
```

診断を抑制しても、微分が正しくなるわけではありません。WGSL 仕様では、非一様な制御フローで呼び出された微分組み込み関数は「不定値（indeterminate value）を返す」と定義されています。これは実装が任意に選ぶ値であり、浮動小数点型の場合は NaN になることもあります。メモリを破壊したりデバイスを失ったりすることはありませんが、NaN のミップレベルや法線がフレームバッファまで伝播し、GPU によって見え方が変わるアーティファクトとして現れる可能性があります。シェーダーの構造を変えるか、明示的なレベルでサンプリングする方法を優先してください。

### ブラウザのサポート状況 {#browser-support}

2026 年 9 月時点、macOS / Apple GPU 上の Chrome 148、Firefox 154、Safari 26.6.2 で計測した結果です。

| | Chrome (Dawn) | Firefox (naga) | Safari (WebKit) |
|---|---|---|---|
| `derivative_uniformity` を強制するか | する（エラー） | しない | しない |
| モジュールスコープの `diagnostic(…)` ディレクティブ | 反映される | 解析されるが無効果 | 解析されるが無効果 |
| 関数に付けた `@diagnostic(…)` | 反映される | 解析されるが無効果 | **シェーダー作成エラー** |
| 文・ブロックに付けた `@diagnostic(…)` | 反映される | **シェーダー作成エラー** | **シェーダー作成エラー** |
| 競合するディレクティブを拒否するか | する | する | しない |
| 認識できないルール名 | 警告。ルールは適用され続ける | 黙って受理 | 黙って受理 |

計画時に押さえておきたい点が 2 つあります。

- **現時点でこのルールを強制しているのは Chrome だけです。** 非一様な制御フローでサンプリングするシェーダーは Firefox と Safari ではコンパイルでき、Chrome でのみ失敗します。違反を検出したい場合は Chrome を基準に開発してください。仕様が求めているのはエラーであり、他の実装もいつ強制を始めるか分からないため、最も厳しい実装に合わせて記述してください。
- **移植性があるのはモジュールスコープのディレクティブのみです。** Firefox は文スコープの属性を明確に拒否し（`@diagnostic(…) attribute(s) not yet implemented`）、Safari は文スコープと関数スコープの両方を拒否します（`invalid attribute for function declaration`）。したがって、関数に `@diagnostic` を 1 つ付けるだけで Safari 上のシェーダーが壊れます。仕様が意図している範囲を絞った適切な指定であるにもかかわらず、そうなります。

#### スコープのルール {#scope-rules}

以下のルールは、フィルタを実際に反映する唯一の実装である Chrome の挙動を説明したものです。エラーが表示されるのは Chrome であるため、これらは依然として重要です。

フィルタは、制御フローを非一様にした分岐ではなく、**組み込み関数の呼び出し箇所**でスコープに入っている必要があります。また、呼び出し先の関数には継承されません。これが最もよくある間違いです。

```wgsl
// 機能しない - 属性はエントリポイントに付いているが、
// textureSample の呼び出しは readHeight の中にある
@diagnostic(off, derivative_uniformity)
@fragment
fn fragmentMain(input: FragmentInput) -> FragmentOutput {
    if (input.mask > 0.5) {
        h = readHeight(uv);   // 依然としてエラー。readHeight 内で報告される
    }
    // ...
}

// 機能する - 属性が呼び出しを含む関数に付いている
@diagnostic(off, derivative_uniformity)
fn readHeight(uv: vec2f) -> f32 {
    return textureSample(heightMap, heightMapSampler, uv).x;
}
```

非一様な分岐から呼ばれるヘルパー関数の中に `textureSample` がある場合をまとめると、次のようになります。

| 属性の位置 | Chrome での結果 |
|---|---|
| 呼び出しを含むヘルパー関数 | 抑制される |
| エントリポイント関数のみ | **依然としてエラー** |
| ヘルパーを呼び出す `if` 文 | **依然としてエラー** |
| ヘルパーを呼び出すブロック | **依然としてエラー** |
| ヘルパー（ただし呼び出しがさらに 1 段深い場合） | **依然としてエラー** |

文スコープの属性は、その構文内に直接書かれた `textureSample` を抑制します（`if`、`for` ループ、単純なブロックのいずれでも機能します）。ただしこの形式は Firefox と Safari の両方で拒否されるため、実際に出荷するシェーダーでは使用できません。

#### そのほか把握しておきたい挙動 {#other-behaviour-worth-knowing}

- **配置。** モジュールスコープの `diagnostic(…)` ディレクティブは、`enable` や `requires` ディレクティブと並んで、すべてのモジュールスコープ宣言より前に置く必要があります。ディレクティブ同士の順序は問われず、この点は 3 つのブラウザすべてで一致しています。エンジンは自身の `enable` / `requires` 行をソースの前に付加するため、独自のディレクティブはチャンクの最上部、つまり `const`、`struct`、`var`、`fn` のいずれよりも前に記述してください。
- **深刻度。** 指定できる深刻度は `off`、`info`、`warning`、`error` です。Chrome では `info` と `warning` はシェーダーをコンパイルさせつつ、メッセージを `getCompilationInfo()` 経由で報告し続けるため、監査目的に有用です。他の 2 つのブラウザはこれらを報告しません。
- **再有効化は Chrome 限定。** より狭い範囲の `@diagnostic(error, derivative_uniformity)` は、モジュール全体でオフにした診断をその範囲でエラーに戻すため、シェーダーの大部分ではチェックを有効に保ちながら特定の関数だけを除外できます。ただし関数属性の形式に依存するため、移植性のある形では利用できません。
- **競合は致命的。** 同じルールに対して*異なる*深刻度を設定するモジュールスコープのディレクティブが 2 つあると、Chrome と Firefox ではシェーダー作成エラーになります。*同じ*深刻度の繰り返しはどの環境でも問題ありません。この点は、他のチャンクと組み合わされるチャンクにモジュールスコープのディレクティブを追加する場合に重要です。
- **タイプミスが明示的に失敗するのは Chrome のみ。** 認識できないルール名は、Chrome では有効なルール名を示す警告を生成し、元のエラーもそのまま発生します。Firefox と Safari はつづりを誤ったルール名を黙って受理します。

:::note

PlayCanvas は生成される WGSL に `diagnostic(…)` ディレクティブを一切注入しないため、Chrome では `derivative_uniformity` がすべてのシェーダーで既定どおりエラーになります。エンジン自身のチャンクは、診断を抑制するのではなく明示的なレベルでサンプリングすることでこのルールを満たしており、それにより移植性が保たれています。

:::
