---
title: Audio
---

Audio assets are sound files which can be played back using the [Sound Component](/user-manual/editor/scenes/components/sound/).

Any audio format that is supported by the web browser is supported by PlayCanvas. No processing is done to the audio file on import.

Common formats like MP3, AAC, Ogg Vorbis, and WAV are supported across all modern browsers.

:::tip
MP3 is recommended as it offers good compression and [universal compatibility](https://caniuse.com/mp3).
:::

## Inspector

![Audio Asset Inspector](/img/user-manual/editor/assets/inspectors/asset-inspector-audio.png)

The Audio asset inspector displays audio information and provides playback controls to preview the sound.

## Properties

| Property | Description |
|----------|-------------|
| Duration | The length of the audio file in seconds (read-only). |

The inspector also includes playback controls (play/pause button and timeline) to preview the audio.

:::tip
To use this asset in scripts, see [Asset Attributes](/user-manual/scripting/script-attributes/esm/#asset-attribute).
:::
