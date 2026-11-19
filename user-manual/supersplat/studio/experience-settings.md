# Experience Settings

**Experience Settings** is the JSON document that defines a published splat's viewing experience — tonemapping, post effects, background, cameras, animations, annotations, and the scene's start mode. It's the single contract between two products:

- **Writer** — [Studio](https://developer.playcanvas.com/user-manual/supersplat/studio.md) saves it whenever you hit Save.
- **Reader** — the [SuperSplat Viewer](https://developer.playcanvas.com/user-manual/supersplat/viewer.md) loads it at runtime, both on the [scene page](https://developer.playcanvas.com/user-manual/supersplat/scene-page.md) and when [embedded](https://developer.playcanvas.com/user-manual/supersplat/viewer/embedding.md) or [self-hosted](https://developer.playcanvas.com/user-manual/supersplat/viewer/self-hosting.md).

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

Most fields are authored in a Studio control. The camera animation can also come from the SuperSplat Editor's Timeline, baked in at publish time. Follow the cross-references for details.

| Field | Authored in |
|-------|-------------|
| `tonemapping`, `highPrecisionRendering` | [Look & Tone](https://developer.playcanvas.com/user-manual/supersplat/studio/look-and-tone.md) |
| `background.color`, `background.skyboxUrl` | [Look & Tone](https://developer.playcanvas.com/user-manual/supersplat/studio/look-and-tone.md) |
| `postEffectSettings` | [Post Effects](https://developer.playcanvas.com/user-manual/supersplat/studio/post-effects.md) |
| `cameras` | [Cameras](https://developer.playcanvas.com/user-manual/supersplat/studio/cameras.md) |
| `animTracks` | [Camera Animation](https://developer.playcanvas.com/user-manual/supersplat/studio/animation.md), or the [Editor Timeline](https://developer.playcanvas.com/user-manual/supersplat/editor/timeline.md) (baked in when publishing). Studio saves only a track that has keyframes. |
| `annotations` | [Annotations](https://developer.playcanvas.com/user-manual/supersplat/studio/annotations.md) |
| `startMode` | **Play animation on open** in the [Animation](https://developer.playcanvas.com/user-manual/supersplat/studio/animation.md#playing-on-open) section: `animTrack` when it is on, `default` when it is off. The initial value is set when publishing from the Editor. |
| `hasStartPose` | Set when publishing from the Editor |
| Collision voxel data | Stored separately as a [Scene Asset](https://developer.playcanvas.com/user-manual/supersplat/studio/collision.md), not in this JSON |

## How the viewer reads it

A few fields behave in ways the schema alone doesn't show:

- **`background.skyboxUrl`** — the viewer doesn't load the skybox from the settings. When you host the viewer yourself, pass the image with the `skybox` [URL parameter](https://developer.playcanvas.com/user-manual/supersplat/viewer/embedding.md#url-parameters) or the `skyboxUrl` option.
- **`soundUrl`** — the sound starts on the visitor's first click in the viewer, since browsers block audio that plays on its own.
- **`cameras` and `animTracks`** — the format allows several, but the viewer uses only the first camera and plays only the first track.
- **`annotations[].text`** — shown as plain text, so HTML markup isn't rendered.
- **`startMode: 'annotation'`** — accepted, but the viewer starts as it does for `default`.
- **`antiAlias`** — not part of the schema above, but Studio adds it: its [Anti-aliasing](https://developer.playcanvas.com/user-manual/supersplat/studio/look-and-tone.md#anti-aliasing) switch stores `antiAlias: false` when turned off. The viewer doesn't read it. Each splat file's own anti-aliasing tag decides, and the `aa` [URL parameter](https://developer.playcanvas.com/user-manual/supersplat/viewer/embedding.md#url-parameters) overrides that.

## Authoring limits

The viewer renders whatever the schema allows, but tools that write settings should keep to these bounds, which `validateSettings(settings, { limits: true })` checks:

| Field | Limit |
|-------|-------|
| Camera and annotation `fov` | 10 to 120 degrees |
| `annotations` | At most 50, each with a `title` of up to 60 characters and `text` of up to 280 |
| `animTracks` | At most 10, each with a `name` of up to 120 characters, a `duration` of 0.1 to 600 seconds, a whole `frameRate` of 1 to 120, a `smoothness` of 0 to 1, and 1 to 1,000 keyframes at whole, ascending frame numbers |
| `sharpness.amount` | 0 to 1 |
| `bloom.intensity` / `bloom.blurLevel` | 0 to 0.1 / 1 to 16 |
| `grading.brightness` / `contrast` / `saturation` | 0 to 3 / 0.5 to 1.5 / 0 to 2 |
| `vignette.intensity` / `inner` / `outer` / `curvature` | 0 to 1 / 0 to 3 / 0 to 3 / 0.01 to 10 |
| `fringing.intensity` | 0 to 100 |

Some settings already published fall outside these bounds, such as a `bloom.intensity` of `1` from older defaults, so the viewer doesn't enforce these limits when it loads a file.

## Generating and validating settings

The viewer's npm package exports the schema types and helpers from its `/settings` entry, so a pipeline can write settings the viewer accepts:

```ts
import {
    defaultSettings,
    importSettings,
    validateSettings,
    POST_EFFECT_RANGES,
    type ExperienceSettings
} from '@playcanvas/supersplat-viewer/settings';

// a complete settings object; pass 'object' to frame a subject from outside
const settings: ExperienceSettings = defaultSettings();

// throws on invalid input, naming the offending field
validateSettings(json);

// also check the authoring limits
validateSettings(json, { limits: true });

// migrates v1 settings to v2, without changing its argument
const migrated = importSettings(json);

// the bounds are data, so an editor UI can drive its sliders from them
const { min, max, step } = POST_EFFECT_RANGES.bloom.intensity;
```

`CAMERA_FOV_RANGE`, `POST_EFFECT_RANGES`, `ANIM_TRACK_LIMITS` and `ANNOTATION_LIMITS` export the limits above as data. `defaultSettings()` gives the camera an `85` degree field of view, at position `[0, 2, 0]` looking at `[2, 2, 0]`, or with `'object'`, at `[2, 2, -2]` looking at `[0, 0, 0]`.

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

- [Viewer / embedding](https://developer.playcanvas.com/user-manual/supersplat/viewer/embedding.md) — how to point a Viewer at a `settings.json` URL
- [Viewer API](https://developer.playcanvas.com/user-manual/supersplat/viewer/api.md) — pass settings to a viewer you create in your own page
- [Viewer / self-hosting](https://developer.playcanvas.com/user-manual/supersplat/viewer/self-hosting.md) — exporting a self-contained Viewer that bundles a copy of these settings
- [API & Integrations](https://developer.playcanvas.com/user-manual/supersplat/api-integrations.md) — publish splats to superspl.at from your own code
