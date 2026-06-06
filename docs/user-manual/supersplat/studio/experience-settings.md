---
title: Experience Settings
description: "The Experience Settings v2 JSON schema — the canonical contract between SuperSplat Studio (writer) and SuperSplat Viewer (reader)."
---

**Experience Settings** is the JSON document that defines a published splat's viewing experience — tonemapping, post effects, background, cameras, animations, annotations, and the scene's start mode. It's the single contract between two products:

- **Writer** — [Studio](/user-manual/supersplat/studio/) saves it whenever you hit Save.
- **Reader** — the [SuperSplat Viewer](/user-manual/supersplat/viewer/) loads it at runtime, both on the [scene page](/user-manual/supersplat/scene-page) and when [embedded](/user-manual/supersplat/viewer/embedding) or [self-hosted](/user-manual/supersplat/viewer/self-hosting).

You don't normally edit this JSON by hand — Studio is the supported authoring surface. But if you're embedding the Viewer in your own application, generating settings from a build pipeline, or consuming the published settings directly, the schema below is what to write against.

## Current schema (v2)

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

Each field corresponds to a panel or control in Studio — follow the cross-references for details.

| Field | Authored in |
|-------|-------------|
| `tonemapping`, `highPrecisionRendering` | [Post Effects](/user-manual/supersplat/studio/post-effects) |
| `background.color`, `background.skyboxUrl` | [Skybox & Background](/user-manual/supersplat/studio/skybox) |
| `postEffectSettings` | [Post Effects](/user-manual/supersplat/studio/post-effects) |
| `cameras` | [Cameras](/user-manual/supersplat/studio/cameras) |
| `animTracks` | [Editor Timeline](/user-manual/supersplat/editor/timeline) (baked in when publishing) |
| `annotations` | [Annotations](/user-manual/supersplat/studio/annotations) |
| `startMode`, `hasStartPose` | The Studio header / startup configuration |
| Collision voxel data | Stored separately as a [Scene Asset](/user-manual/supersplat/studio/collision), not in this JSON |

## Defaults

A freshly-published splat is given a sensible default JSON:

- **Tonemapping** `linear`, **high precision** off
- **Background** `[0, 0, 0]` (black), no skybox
- **Post effects** all disabled
- **One camera** with FOV `75` — for environment-style scenes the default pose is position `[0, 2, 0]`, target `[2, 2, 0]`; for object-style scenes it's position `[2, 2, -2]`, target `[0, 0, 0]`
- **No animation tracks** and **no annotations**
- **Start mode** `default`

Studio surfaces these defaults the first time you open a scene; tweak as needed.

## Schema versioning

Older `v1` settings are migrated to `v2` automatically when loaded by Studio or the Viewer — you don't need to do anything special. If you're generating settings yourself, write `v2` and you're current.

## See also

- [Viewer / embedding](/user-manual/supersplat/viewer/embedding) — how to point a Viewer at a `settings.json` URL
- [Viewer / self-hosting](/user-manual/supersplat/viewer/self-hosting) — exporting a self-contained Viewer that bundles a copy of these settings
- [Splat Publishing API](/user-manual/api/splat-publish/) — programmatic access to publishing and updating settings
