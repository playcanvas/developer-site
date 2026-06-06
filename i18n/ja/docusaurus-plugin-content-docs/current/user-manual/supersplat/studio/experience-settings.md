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
        skyboxUrl?: string;              // optional .webp/.jpg/.png URL
    };

    postEffectSettings: {
        sharpness:  { enabled: boolean; amount: number };
        bloom:      { enabled: boolean; intensity: number; blurLevel: number };
        grading:    { enabled: boolean; brightness: number; contrast: number; saturation: number; tint: [number, number, number] };
        vignette:   { enabled: boolean; intensity: number; inner: number; outer: number; curvature: number };
        fringing:   { enabled: boolean; intensity: number };
    };

    cameras: Array<{
        initial: {
            position: [number, number, number];
            target:   [number, number, number];
            fov:      number; // degrees
        };
    }>;

    animTracks: Array<{
        name: string;
        duration: number;       // seconds
        frameRate: number;
        loopMode: 'none' | 'repeat' | 'pingpong';
        interpolation: 'step' | 'spline';
        smoothness: number;     // 0-1
        keyframes: {
            times: number[];
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
        text: string;                          // sanitized HTML
        camera: { initial: { position: [number, number, number]; target: [number, number, number]; fov: number } };
        extras: Record<string, unknown>;
    }>;

    // 'default'   — start at the first camera in `cameras`
    // 'animTrack' — start by playing the first track in `animTracks`
    // 'annotation' — start positioned at the first annotation's camera pose
    startMode: 'default' | 'animTrack' | 'annotation';

    hasStartPose?: boolean;
};
```

各フィールドはStudioのパネルやコントロールに対応します — 詳細はクロスリファレンスをたどってください。

| フィールド | 作成場所 |
|-------|-------------|
| `tonemapping`, `highPrecisionRendering` | [Post Effects](/user-manual/supersplat/studio/post-effects) |
| `background.color`, `background.skyboxUrl` | [Skybox & Background](/user-manual/supersplat/studio/skybox) |
| `postEffectSettings` | [Post Effects](/user-manual/supersplat/studio/post-effects) |
| `cameras` | [Cameras](/user-manual/supersplat/studio/cameras) |
| `animTracks` | [エディターのタイムライン](/user-manual/supersplat/editor/timeline)（公開時にベイクされます） |
| `annotations` | [Annotations](/user-manual/supersplat/studio/annotations) |
| `startMode`, `hasStartPose` | Studioのヘッダ／スタートアップ設定 |
| コリジョンボクセルデータ | このJSONではなく、[シーンアセット](/user-manual/supersplat/studio/collision)として別に格納 |

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
- [Viewer / self-hosting](/user-manual/supersplat/viewer/self-hosting) — これらの設定のコピーを同梱した自己完結型Viewerをエクスポートする
- [Splat Publishing API](/user-manual/api/splat-publish/) — 公開と設定更新へのプログラム的なアクセス
