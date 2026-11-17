# Audio Assets

An **audio asset** is a sound file that a [sound slot](https://developer.playcanvas.com/user-manual/audio/playing-sounds.md) can play. PlayCanvas does not process audio when you import it or when you build your app. The file is downloaded as it is and decoded by the browser, which has two consequences that this page covers: the formats you can use are the formats browsers can decode, and a sound takes far more memory once it is loaded than its file size suggests.

## Supported Formats

PlayCanvas hands the file to the browser's decoder, so any format the browser can decode will load.

| Format | Extension | Notes |
| --- | --- | --- |
| MP3 | `.mp3` | Decodes in every browser. A good default for sound effects and music |
| AAC | `.m4a` | Decodes in every browser. Slightly smaller than MP3 at the same quality |
| WAV | `.wav` | Decodes in every browser. Uncompressed, so files are large, but nothing is lost |
| Ogg Vorbis | `.ogg` | Open format. Safari has only decoded it since version 18.4 |

Other formats, such as Opus and FLAC, load in the browsers that support them. [MDN's guide to media container formats](https://developer.mozilla.org/en-US/docs/Web/Media/Guides/Formats/Containers) lists what each browser plays.

:::tip

Use MP3 unless you have a reason not to. The engine loads the one file you give it and does not choose between formats for you, so a format that some browsers cannot decode means silence in those browsers.

:::

## Loading Audio

**Engine**

Create an asset of type `audio`. Its resource is a [`Sound`](https://api.playcanvas.com/engine/classes/Sound.html), which holds the decoded audio in its `buffer` and tells you its length:

```javascript
const asset = new Asset('music', 'audio', {
    url: 'https://developer.playcanvas.com/assets/music.mp3'
});
asset.ready(() => {
    console.log(asset.resource.duration); // 19.2 seconds
});
app.assets.add(asset);
app.assets.load(asset);
```

The URL does not need a file extension. If the browser cannot decode the file, the asset fires `error` with the message `Unable to decode audio data`.

**Editor**

Drag audio files into the Assets panel. The file is stored as you uploaded it, and the [asset inspector](https://developer.playcanvas.com/user-manual/editor/assets/inspectors/audio.md) shows its duration and lets you play it. To use an audio asset from a script, declare an [asset attribute](https://developer.playcanvas.com/user-manual/scripting/script-attributes/esm.md#asset-attribute) with `@resource audio`.

**React**

The `useAsset` hook does not load audio. Create the asset with the engine API, as the [`<Sound>` component](https://developer.playcanvas.com/user-manual/audio/getting-started.md#playing-a-sound) on the Getting Started page does:

```jsx
const app = useApp();

useEffect(() => {
  const asset = new Asset('music', 'audio', { url: src });
  app.assets.add(asset);
  app.assets.load(asset);

  return () => {
    app.assets.remove(asset);
    asset.unload();
  };
}, [app, src]);
```

**Web Components**

Declare the file with a [`<pc-asset>`](https://developer.playcanvas.com/user-manual/web-components/tags/pc-asset.md). The element works out the asset type from the file extension for `.mp3` files only, so give any other format a `type`:

```html
<pc-asset id="music" src="https://developer.playcanvas.com/assets/music.mp3"></pc-asset>
<pc-asset id="wind" src="assets/wind.ogg" type="audio"></pc-asset>
```

## Memory

A loaded sound is held in memory fully decoded, as 32-bit samples at the sample rate of the audio output, whatever the format and sample rate of the file. Its size depends only on its length and its number of channels:

```text
bytes = seconds × sample rate × channels × 4
```

At the usual output rate of 48,000 samples a second, that is about 11 MB for each minute of mono audio, and twice that for stereo. The music loop in this section's examples is a 301 KB MP3 that lasts 19.2 seconds, and it takes 7 MB once loaded. You can measure any loaded sound:

```javascript
const buffer = asset.resource.buffer; // an AudioBuffer
const bytes = buffer.length * buffer.numberOfChannels * 4;
console.log(`${(bytes / 1024 / 1024).toFixed(1)} MB`);
```

To use less memory:

- **Use mono for sound effects.** A mono file takes half the memory of a stereo one. [Positional sounds](https://developer.playcanvas.com/user-manual/audio/positional-audio.md) are placed between the speakers by the engine, so they gain nothing from a stereo file.
- **Keep sounds short.** Trim silence from the ends, and loop a short section rather than loading a long recording.
- **Unload what you have finished with.** `asset.unload()` frees the decoded audio. A slot that plays an unloaded asset loads it again.

Lowering the bitrate or the sample rate of a file makes the download smaller, but not the loaded sound: the browser converts every file to the output's sample rate as it decodes it.

## When Audio Loads

A sound has to be downloaded and decoded before it can play. A slot that is played before its asset is ready starts once the asset arrives, so nothing breaks, but the sound is late the first time.

- **Preloaded assets** load before the application starts. In the Editor, that is every asset with **Preload** turned on, which is the default. See [Preloading](https://developer.playcanvas.com/user-manual/assets/preloading.md).
- **Other assets** load when a sound component that uses them is enabled, or the first time one of their slots is played.

For sounds that must be on time, such as interface clicks and weapon fire, load the asset before you need it. For large files that are only needed later, such as the music for another level, turn preloading off and load them when the level starts.

## Seamless Loops

A slot with `loop` turned on repeats its sound with no gap, sample to sample. Whether the loop sounds seamless is down to the file:

- **Cut the loop on a musical boundary.** A loop of a whole number of bars joins up in time. To hide the join, crossfade the end of the loop into its start in your audio editor.
- **Watch for encoder padding.** MP3 and AAC encoders add a few milliseconds of silence to each end of a file. Browsers remove it when they decode the file, but if you hear a gap or a click at the loop point, use WAV or Ogg Vorbis, which have no padding, or loop a section inside the file with the slot's [start time and duration](https://developer.playcanvas.com/user-manual/audio/playing-sounds.md#playing-part-of-a-file).

## Long Music

The sound component does not stream. A three-minute stereo track takes about 66 MB once decoded, and none of it can play until all of it has downloaded. For music, prefer a loop of 10 to 30 seconds.

When you do need a long track, play it with an HTML audio element, which streams the file and uses very little memory:

```javascript
const music = new Audio('https://developer.playcanvas.com/assets/music.mp3');
music.loop = true;
music.volume = 0.5;

// like all audio, it can only start after a user gesture
window.addEventListener('click', () => music.play(), { once: true });
```

An audio element is not part of the PlayCanvas sound system. The [master volume](https://developer.playcanvas.com/user-manual/audio/volume-and-mixing.md) does not apply to it, so set its `volume` yourself, and its `loop` can leave a small gap at the loop point.

## Audio Sprites

An **audio sprite** is one file that holds several sounds, one after another. Each sound gets a slot that plays its part of the file, set by the slot's `startTime` and `duration` in seconds. One file means one download and one decode for a whole set of effects.

```javascript
// where each sound is in the file, in seconds
const sprites = {
    coin: { start: 0, duration: 0.7 },
    jump: { start: 1, duration: 0.8 },
    laser: { start: 2, duration: 0.7 },
    explosion: { start: 3, duration: 1.3 }
};

for (const [name, { start, duration }] of Object.entries(sprites)) {
    entity.sound.addSlot(name, {
        asset: asset.id,
        startTime: start,
        duration: duration,
        overlap: true
    });
}

entity.sound.play('laser');
```

Leave a short silence between the sounds in the file, 100 milliseconds or more, so that the end of one never leaks into the start of the next. The [example on the Playing Sounds page](https://developer.playcanvas.com/user-manual/audio/playing-sounds.md#example) plays this file.

## See Also

- [Playing Sounds](https://developer.playcanvas.com/user-manual/audio/playing-sounds.md) - Slots, and playing part of a file
- [Assets](https://developer.playcanvas.com/user-manual/assets.md) - How the asset registry loads and unloads assets
- [Supported Formats](https://developer.playcanvas.com/user-manual/assets/supported-formats.md) - Every asset format PlayCanvas loads
- [Audio Asset](https://developer.playcanvas.com/user-manual/editor/assets/inspectors/audio.md) - The Editor's audio asset inspector
- [Sound](https://api.playcanvas.com/engine/classes/Sound.html) - The engine API reference for the loaded resource
