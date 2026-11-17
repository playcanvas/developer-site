---
title: Audio
description: "How PlayCanvas plays sound effects, music and positional audio with the sound component, sound slots, the audio listener and the Web Audio API, in the Engine, the Editor, React and Web Components."
---

PlayCanvas plays audio through the browser's [Web Audio API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API). An entity with a **sound component** is a sound source: it holds the sounds the entity can make, and plays them from where the entity is. An entity with an **audio listener** component is the ears of the scene, usually the camera.

<EngineExample id="sound/positional" title="Positional Sound" />

Load the example above, then click inside it: browsers keep audio off until you interact with a page. The robot's footsteps come from the robot, so they move from one ear to the other and fade as it walks around the camera. [On Each Surface](#on-each-surface) compares how each surface sets up the same thing.

## How Audio Works {#how-audio-works}

- **[Audio assets](/user-manual/audio/audio-assets/)** hold the sounds. An audio file is decoded in full when it loads, so it plays the instant you ask for it.
- **[The sound component](/user-manual/audio/getting-started/)** makes an entity a sound source. Its volume and pitch apply to everything the entity plays.
- **[Sound slots](/user-manual/audio/playing-sounds/)** are the named sounds of a sound component. Each slot plays one audio asset, or part of one, with a volume and pitch of its own, and can loop or play automatically.
- **[Sound instances](/user-manual/audio/controlling-playback/)** are sounds that are playing. Each time a slot plays, it creates an instance that you can pause, seek, fade and listen to for events.
- **[Positional audio](/user-manual/audio/positional-audio/)** pans a sound between the speakers and fades it with distance, by where its entity is relative to the audio listener.
- **[Master volume](/user-manual/audio/volume-and-mixing/)** scales every sound in the application, and **[effects](/user-manual/audio/effects/)** such as filters and reverb come from Web Audio nodes that you add to a slot's output.

One rule shapes every audio feature on the web: a page cannot make a sound until the user has interacted with it. PlayCanvas starts its audio on the first click or tap. [Autoplay and User Gestures](/user-manual/audio/autoplay/) explains what that means for music and for sounds that play on load.

## On Each Surface {#on-each-surface}

The sound component is the same everywhere, but the surfaces expose different amounts of it. Anything a surface has no markup or UI for, you can reach through the engine component from code.

| | Engine | Editor | React | Web Components |
| --- | --- | --- | --- | --- |
| Load a sound | An `audio` asset | Upload an audio file | An `audio` asset, from code | [`<pc-asset>`](/user-manual/web-components/tags/pc-asset/) |
| Make an entity a sound source | `entity.addComponent('sound')` | A Sound component | The engine API | [`<pc-sound>`](/user-manual/web-components/tags/pc-sound/) |
| Give it a sound | `entity.sound.addSlot()` | A slot in the Sound component | The engine API | [`<pc-sound-slot>`](/user-manual/web-components/tags/pc-sound-slot/) |
| Play, pause and stop | `entity.sound.play()` | From a script | The engine API | The engine API |
| Place the listener | `entity.addComponent('audiolistener')` | An Audio Listener component | The engine API | [`<pc-audio-listener>`](/user-manual/web-components/tags/pc-audio-listener/) |
| Master volume and effects | `app.systems.sound` | From a script | The engine API | The engine API |

:::note

PlayCanvas React has no sound components of its own yet. Its `<Application>` includes the engine's sound systems, so you add the sound component to an entity from a small component of your own. Each page in this section shows how.

:::

## In This Section {#in-this-section}

- [Getting Started](/user-manual/audio/getting-started/) - Loading a sound, adding a sound component and playing your first sound.
- [Audio Assets](/user-manual/audio/audio-assets/) - Formats, how much memory a sound uses, loops, long music and audio sprites.
- [Playing Sounds](/user-manual/audio/playing-sounds/) - Slots, looping, overlapping one-shots, playing part of a file, and volume and pitch.
- [Controlling Playback](/user-manual/audio/controlling-playback/) - Sound instances, pausing, seeking, events, fades and crossfades.
- [Positional Audio](/user-manual/audio/positional-audio/) - The audio listener, distance models and panning.
- [Volume and Mixing](/user-manual/audio/volume-and-mixing/) - Master volume, muting, mixing music against effects, and ducking.
- [Effects and Analysis](/user-manual/audio/effects/) - Filters, echo and reverb with Web Audio nodes, and reading the sound for visualizers.
- [Autoplay and User Gestures](/user-manual/audio/autoplay/) - Why audio waits for a click, and how to design around it.
- [Troubleshooting](/user-manual/audio/troubleshooting/) - What to check when you hear nothing, or something unexpected.

## See Also

- [Sound Component](/user-manual/editor/scenes/components/sound/) and [Audio Listener Component](/user-manual/editor/scenes/components/audiolistener/) - The Editor references for the components
- [Audio Asset](/user-manual/editor/assets/inspectors/audio/) - Previewing audio assets in the Editor
- [`<pc-sound>`](/user-manual/web-components/tags/pc-sound/), [`<pc-sound-slot>`](/user-manual/web-components/tags/pc-sound-slot/) and [`<pc-audio-listener>`](/user-manual/web-components/tags/pc-audio-listener/) - The Web Components references
- [Basic Audio](/tutorials/basic-audio/) - Tutorial that sets up sounds and a listener in the Editor
- [SoundComponent](https://api.playcanvas.com/engine/classes/SoundComponent.html), [SoundSlot](https://api.playcanvas.com/engine/classes/SoundSlot.html) and [SoundInstance](https://api.playcanvas.com/engine/classes/SoundInstance.html) - The engine API reference
