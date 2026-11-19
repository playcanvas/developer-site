---
title: Experience Settings
description: "Experience Settings v2 JSONスキーマ — SuperSplat Studio（書き手）とSuperSplat Viewer（読み手）の間の正式なコントラクト。"
---

**Experience Settings**は、公開済みスプラットの視聴体験 — トーンマッピング、ポストエフェクト、背景、カメラ、アニメーション、注釈、シーンのstart mode — を定義するJSONドキュメントです。2つのプロダクト間の単一のコントラクトです：

- **Writer** — [Studio](/user-manual/supersplat/studio/)がSaveを押すたびにこれを保存します。
- **Reader** — [SuperSplat Viewer](/user-manual/supersplat/viewer/)が[シーンページ](/user-manual/supersplat/scene-page)上でも、[埋め込み](/user-manual/supersplat/viewer/embedding)時や[セルフホスト](/user-manual/supersplat/viewer/self-hosting)時にも、ランタイムでこれを読み込みます。

通常このJSONを手で編集する必要はありません — Studioが正式な作成サーフェスです。ただし、自分のアプリケーションにViewerを埋め込んでいる、ビルドパイプラインで設定を生成している、公開された設定を直接消費している場合は、下記のスキーマがその対象です。

## 現在のスキーマ（v2）

```typescript
type ExperienceSettings = {
    version: 2;

    tonemapping: 'none' | 'linear' | 'filmic' | 'hejl' | 'aces' | 'aces2' | 'neutral';
    highPrecisionRendering: boolean;
    soundUrl?: string;

    background: {
        color: [number, number, number]; // RGB, 0-1
        skyboxUrl?: string;              // optional .webp/.jpg/.png URL (see below)
    };

    postEffectSettings: {
        sharpness:  { enabled: boolean; amount: number };
        bloom:      { enabled: boolean; intensity: number; blurLevel: number };
        grading:    { enabled: boolean; brightness: number; contrast: number; saturation: number; tint: [number, number, number] };
        vignette:   { enabled: boolean; intensity: number; inner: number; outer: number; curvature: number };
        fringing:   { enabled: boolean; intensity: number };
    };

    cameras: Array<{                    // the viewer uses the first camera
        initial: {
            position: [number, number, number];
            target:   [number, number, number];
            fov:      number; // degrees
        };
    }>;

    animTracks: Array<{                 // the viewer plays the first track
        name: string;
        duration: number;       // seconds
        frameRate: number;
        loopMode: 'none' | 'repeat' | 'pingpong';
        interpolation: 'step' | 'spline';
        smoothness: number;     // 0-1
        keyframes: {
            times: number[];    // in frames, ascending
            values: {
                position: number[]; // flat array of [x, y, z] per keyframe
                target:   number[]; // flat array of [x, y, z] per keyframe
                fov:      number[]; // one FOV per keyframe
            };
        };
    }>;

    annotations: Array<{
        position: [number, number, number];
        title: string;
        text: string;                          // shown as plain text
        camera: { initial: { position: [number, number, number]; target: [number, number, number]; fov: number } };
        extras?: Record<string, unknown>;
    }>;

    // 'default'    — start at the first camera in `cameras`
    // 'animTrack'  — start by playing the first track in `animTracks`
    // 'annotation' — accepted, but the viewer currently starts as for 'default'
    startMode: 'default' | 'animTrack' | 'annotation';

    hasStartPose?: boolean;
};
```

ほとんどのフィールドはStudioのコントロールで作成します。カメラアニメーションは、SuperSplatエディターのタイムラインで作成し、公開時にベイクすることもできます。詳細はクロスリファレンスをたどってください。

| フィールド | 作成場所 |
|-------|-------------|
| `tonemapping`, `highPrecisionRendering` | [Look & Tone](/user-manual/supersplat/studio/look-and-tone) |
| `background.color`, `background.skyboxUrl` | [Look & Tone](/user-manual/supersplat/studio/look-and-tone) |
| `postEffectSettings` | [Post Effects](/user-manual/supersplat/studio/post-effects) |
| `cameras` | [Cameras](/user-manual/supersplat/studio/cameras) |
| `animTracks` | [カメラアニメーション](/user-manual/supersplat/studio/animation)、または[エディターのタイムライン](/user-manual/supersplat/editor/timeline)（公開時にベイクされます）。Studioはキーフレームのあるトラックだけを保存します。 |
| `annotations` | [Annotations](/user-manual/supersplat/studio/annotations) |
| `startMode` | [Animation](/user-manual/supersplat/studio/animation#playing-on-open)セクションの**Play animation on open**：オンのときは`animTrack`、オフのときは`default`。初期値はエディターからの公開時に設定されます。 |
| `hasStartPose` | エディターからの公開時に設定されます |
| コリジョンボクセルデータ | このJSONではなく、[シーンアセット](/user-manual/supersplat/studio/collision)として別に格納 |

## ビューアでの解釈

いくつかのフィールドは、スキーマだけではわからない動作をします：

- **`background.skyboxUrl`** — ビューアは設定からスカイボックスを読み込みません。ビューアを自分でホストする場合は、`skybox` [URLパラメータ](/user-manual/supersplat/viewer/embedding#url-parameters)または`skyboxUrl`オプションで画像を渡してください。
- **`soundUrl`** — ブラウザは自動で再生される音声をブロックするため、サウンドは訪問者がビューア内を最初にクリックしたときに再生が始まります。
- **`cameras`と`animTracks`** — フォーマット上は複数指定できますが、ビューアは最初のカメラだけを使い、最初のトラックだけを再生します。
- **`annotations[].text`** — プレーンテキストとして表示されるため、HTMLマークアップはレンダリングされません。
- **`startMode: 'annotation'`** — 受け付けられますが、ビューアは`default`の場合と同じように開始します。
- **`antiAlias`** — 上のスキーマには含まれませんが、Studioが追加します：Studioの[Anti-aliasing](/user-manual/supersplat/studio/look-and-tone#anti-aliasing)スイッチをオフにすると`antiAlias: false`が保存されます。ビューアはこれを読みません。各スプラットファイル自身のアンチエイリアスのタグで決まり、`aa` [URLパラメータ](/user-manual/supersplat/viewer/embedding#url-parameters)でそれを上書きできます。

## 作成時の制限 {#authoring-limits}

ビューアはスキーマが許す値であれば何でもレンダリングしますが、設定を書き出すツールは次の範囲内に収めてください。この範囲は`validateSettings(settings, { limits: true })`でチェックされます：

| フィールド | 制限 |
|-------|-------|
| カメラと注釈の`fov` | 10～120度 |
| `annotations` | 最大50個。各注釈の`title`は最大60文字、`text`は最大280文字 |
| `animTracks` | 最大10個。各トラックの`name`は最大120文字、`duration`は0.1～600秒、`frameRate`は1～120の整数、`smoothness`は0～1、キーフレームは1～1,000個で、フレーム番号は整数かつ昇順 |
| `sharpness.amount` | 0～1 |
| `bloom.intensity` / `bloom.blurLevel` | 0～0.1 / 1～16 |
| `grading.brightness` / `contrast` / `saturation` | 0～3 / 0.5～1.5 / 0～2 |
| `vignette.intensity` / `inner` / `outer` / `curvature` | 0～1 / 0～3 / 0～3 / 0.01～10 |
| `fringing.intensity` | 0～100 |

公開済みの設定の中には、古いデフォルトに由来する`bloom.intensity`の`1`のように、これらの範囲を外れるものがあります。そのため、ビューアはファイルを読み込むときにこれらの制限を適用しません。

## 設定の生成と検証 {#generating-and-validating-settings}

ビューアのnpmパッケージは、`/settings`エントリからスキーマの型とヘルパーをエクスポートしています。これを使えば、ビューアが受け付ける設定をパイプラインから書き出せます：

```ts
import {
    defaultSettings,
    importSettings,
    validateSettings,
    POST_EFFECT_RANGES,
    type ExperienceSettings
} from '@playcanvas/supersplat-viewer/settings';

// 完全な設定オブジェクト。外側から被写体をフレーミングするには'object'を渡します
const settings: ExperienceSettings = defaultSettings();

// 不正な入力に対しては、問題のあるフィールド名を示して例外をスローします
validateSettings(json);

// 作成時の制限もチェックします
validateSettings(json, { limits: true });

// v1の設定をv2に移行します。引数は変更しません
const migrated = importSettings(json);

// 範囲はデータなので、エディターUIはこれを使ってスライダーを構成できます
const { min, max, step } = POST_EFFECT_RANGES.bloom.intensity;
```

`CAMERA_FOV_RANGE`、`POST_EFFECT_RANGES`、`ANIM_TRACK_LIMITS`、`ANNOTATION_LIMITS`は、上記の制限をデータとしてエクスポートします。`defaultSettings()`はカメラの視野角を`85`度とし、位置を`[0, 2, 0]`、注視点を`[2, 2, 0]`にします。`'object'`を渡した場合は、位置が`[2, 2, -2]`、注視点が`[0, 0, 0]`になります。

## デフォルト

公開直後のスプラットには、合理的なデフォルトJSONが与えられます：

- **Tonemapping** `linear`、**high precision** off
- **Background** `[0, 0, 0]`（黒）、スカイボックスなし
- **Post effects** はすべて無効
- **1つのカメラ**、FOV `75` — 環境スタイルのシーンでは、デフォルトは位置`[0, 2, 0]`、ターゲット`[2, 2, 0]`、オブジェクトスタイルのシーンでは位置`[2, 2, -2]`、ターゲット`[0, 0, 0]`
- **アニメーショントラックなし**、**注釈なし**
- **Start mode** `default`

シーンを初めて開いたときに、Studioはこれらのデフォルトを表示します。必要に応じて調整してください。

## スキーマのバージョニング

古い`v1`の設定は、StudioやViewerが読み込むときに自動的に`v2`に移行されます — 特別な対応は必要ありません。自分で設定を生成する場合は、`v2`を書けば現在の仕様に合致します。

## 関連項目

- [Viewer / embedding](/user-manual/supersplat/viewer/embedding) — Viewerに`settings.json` URLを指定する方法
- [Viewer API](/user-manual/supersplat/viewer/api) — 自分のページで作成したビューアに設定を渡す
- [Viewer / self-hosting](/user-manual/supersplat/viewer/self-hosting) — これらの設定のコピーを同梱した自己完結型Viewerをエクスポートする
- [API & Integrations](/user-manual/supersplat/api-integrations) — 独自のコードからsuperspl.atへスプラットを公開する
