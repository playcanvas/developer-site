# Audio

PlayCanvas plays audio through the browser's [Web Audio API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API). An entity with a **sound component** is a sound source: it holds the sounds the entity can make, and plays them from where the entity is. An entity with an **audio listener** component is the ears of the scene, usually the camera.

[Live example: Positional Sound](https://playcanvas.com/examples/#/sound/positional) ([source](https://github.com/playcanvas/engine/blob/main/examples/src/examples/sound/positional/example.mjs))

Load the example above, then click inside it: browsers keep audio off until you interact with a page. The robot's footsteps come from the robot, so they move from one ear to the other and fade as it walks around the camera. [On Each Surface](https://developer.playcanvas.com/user-manual/audio.md#on-each-surface) compares how each surface sets up the same thing.

## How Audio Works

- **[Audio assets](https://developer.playcanvas.com/user-manual/audio/audio-assets.md)** hold the sounds. An audio file is decoded in full when it loads, so it plays the instant you ask for it.
- **[The sound component](https://developer.playcanvas.com/user-manual/audio/getting-started.md)** makes an entity a sound source. Its volume and pitch apply to everything the entity plays.
- **[Sound slots](https://developer.playcanvas.com/user-manual/audio/playing-sounds.md)** are the named sounds of a sound component. Each slot plays one audio asset, or part of one, with a volume and pitch of its own, and can loop or play automatically.
- **[Sound instances](https://developer.playcanvas.com/user-manual/audio/controlling-playback.md)** are sounds that are playing. Each time a slot plays, it creates an instance that you can pause, seek, fade and listen to for events.
- **[Positional audio](https://developer.playcanvas.com/user-manual/audio/positional-audio.md)** pans a sound between the speakers and fades it with distance, by where its entity is relative to the audio listener.
- **[Master volume](https://developer.playcanvas.com/user-manual/audio/volume-and-mixing.md)** scales every sound in the application, and **[effects](https://developer.playcanvas.com/user-manual/audio/effects.md)** such as filters and reverb come from Web Audio nodes that you add to a slot's output.

One rule shapes every audio feature on the web: a page cannot make a sound until the user has interacted with it. PlayCanvas starts its audio on the first click or tap. [Autoplay and User Gestures](https://developer.playcanvas.com/user-manual/audio/autoplay.md) explains what that means for music and for sounds that play on load.

## On Each Surface

The sound component is the same everywhere, but the surfaces expose different amounts of it. Anything a surface has no markup or UI for, you can reach through the engine component from code.

| | Engine | Editor | React | Web Components |
| --- | --- | --- | --- | --- |
| Load a sound | An `audio` asset | Upload an audio file | An `audio` asset, from code | [`<pc-asset>`](https://developer.playcanvas.com/user-manual/web-components/tags/pc-asset.md) |
| Make an entity a sound source | `entity.addComponent('sound')` | A Sound component | The engine API | [`<pc-sound>`](https://developer.playcanvas.com/user-manual/web-components/tags/pc-sound.md) |
| Give it a sound | `entity.sound.addSlot()` | A slot in the Sound component | The engine API | [`<pc-sound-slot>`](https://developer.playcanvas.com/user-manual/web-components/tags/pc-sound-slot.md) |
| Play, pause and stop | `entity.sound.play()` | From a script | The engine API | The engine API |
| Place the listener | `entity.addComponent('audiolistener')` | An Audio Listener component | The engine API | [`<pc-audio-listener>`](https://developer.playcanvas.com/user-manual/web-components/tags/pc-audio-listener.md) |
| Master volume and effects | `app.systems.sound` | From a script | The engine API | The engine API |

:::note

PlayCanvas React has no sound components of its own yet. Its `<Application>` includes the engine's sound systems, so you add the sound component to an entity from a small component of your own. Each page in this section shows how.

:::

## In This Section

- [Getting Started](https://developer.playcanvas.com/user-manual/audio/getting-started.md) - Loading a sound, adding a sound component and playing your first sound.
- [Audio Assets](https://developer.playcanvas.com/user-manual/audio/audio-assets.md) - Formats, how much memory a sound uses, loops, long music and audio sprites.
- [Playing Sounds](https://developer.playcanvas.com/user-manual/audio/playing-sounds.md) - Slots, looping, overlapping one-shots, playing part of a file, and volume and pitch.
- [Controlling Playback](https://developer.playcanvas.com/user-manual/audio/controlling-playback.md) - Sound instances, pausing, seeking, events, fades and crossfades.
- [Positional Audio](https://developer.playcanvas.com/user-manual/audio/positional-audio.md) - The audio listener, distance models and panning.
- [Volume and Mixing](https://developer.playcanvas.com/user-manual/audio/volume-and-mixing.md) - Master volume, muting, mixing music against effects, and ducking.
- [Effects and Analysis](https://developer.playcanvas.com/user-manual/audio/effects.md) - Filters, echo and reverb with Web Audio nodes, and reading the sound for visualizers.
- [Autoplay and User Gestures](https://developer.playcanvas.com/user-manual/audio/autoplay.md) - Why audio waits for a click, and how to design around it.
- [Troubleshooting](https://developer.playcanvas.com/user-manual/audio/troubleshooting.md) - What to check when you hear nothing, or something unexpected.

## See Also

- [Sound Component](https://developer.playcanvas.com/user-manual/editor/scenes/components/sound.md) and [Audio Listener Component](https://developer.playcanvas.com/user-manual/editor/scenes/components/audiolistener.md) - The Editor references for the components
- [Audio Asset](https://developer.playcanvas.com/user-manual/editor/assets/inspectors/audio.md) - Previewing audio assets in the Editor
- [`<pc-sound>`](https://developer.playcanvas.com/user-manual/web-components/tags/pc-sound.md), [`<pc-sound-slot>`](https://developer.playcanvas.com/user-manual/web-components/tags/pc-sound-slot.md) and [`<pc-audio-listener>`](https://developer.playcanvas.com/user-manual/web-components/tags/pc-audio-listener.md) - The Web Components references
- [Basic Audio](https://developer.playcanvas.com/tutorials/basic-audio/) - Tutorial that sets up sounds and a listener in the Editor
- [SoundComponent](https://api.playcanvas.com/engine/classes/SoundComponent.html), [SoundSlot](https://api.playcanvas.com/engine/classes/SoundSlot.html) and [SoundInstance](https://api.playcanvas.com/engine/classes/SoundInstance.html) - The engine API reference
