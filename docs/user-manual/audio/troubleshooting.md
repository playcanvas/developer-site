---
title: Troubleshooting
description: Find the cause of common audio problems, such as silence, sounds that are too quiet or do not fade with distance, sounds that cut each other off, a burst of sound at the first click, late or gapped playback, and high memory use.
---

Each section below starts from what you hear, lists the usual causes, most likely first, and links to the page that explains each one.

## No Sound {#no-sound}

### Nothing Plays at All {#nothing-plays-at-all}

- **Audio is locked.** Browsers keep audio off until the user clicks or taps the page. Sounds played before then start at the first click, and a key press does not count. See [Autoplay and User Gestures](/user-manual/audio/autoplay/).
- **The application has no sound system.** An Engine app built from `AppBase` needs a `SoundManager`, `SoundComponentSystem` and `AudioHandler`. Without the system, `addComponent('sound')` returns `null` and `entity.sound` is undefined. Without the handler, the asset fails with `No resource handler for asset type: 'audio'`. Without the sound manager, it fails with `Audio manager has no audio context`. See [Setting Up the Application](/user-manual/audio/getting-started/#setting-up-the-application).
- **The volume is 0.** Check the [master volume](/user-manual/audio/volume-and-mixing/#master-volume), and the volume of the component and of the slot. A saved mute setting is easy to forget.
- **The phone is set to silent.** On an iPhone, Web Audio is silent while the ring/silent switch is set to silent. See [Phones and Tablets](/user-manual/audio/autoplay/#phones-and-tablets).

### One Sound Doesn't Play {#one-sound-doesnt-play}

- **The slot name is wrong.** `play()` returns `null` for a name the component does not have. Names are case sensitive.
- **The component or its entity is disabled.** `play()` does nothing and returns `null`. See [Enabling and Disabling](/user-manual/audio/playing-sounds/#enabling-and-disabling).
- **The slot has no asset**, or its asset failed to load. Listen for the asset's `error` event. A file that the browser cannot decode fails with `Unable to decode audio data`.
- **The browser cannot decode the format.** A sound that plays in one browser and not in another is usually in a format that the second one does not support. See [Supported Formats](/user-manual/audio/audio-assets/#supported-formats).
- **The asset type was not recognized.** In Web Components, `<pc-asset>` only recognizes `.mp3` files as audio by their extension. Give other formats `type="audio"`.
- **It is too far away.** A positional sound beyond its `maxDistance` is silent with the linear distance model. See the next section.

## Positional Sounds {#positional-sounds}

### A Sound Is Silent or Too Quiet {#a-sound-is-silent-or-too-quiet}

- **The sound is positional, and should not be.** Sound components are positional by default. Music or an interface sound on a positional component fades as the camera moves away from its entity. Turn **Positional** off. See [Positional and Non-Positional Sounds](/user-manual/audio/positional-audio/#positional-and-non-positional-sounds).
- **The listener is not where you think.** With no audio listener, sounds are heard from the world origin, not from the camera. With several, only the one enabled most recently is used. A disabled listener goes on being heard from where it last was. See [The Audio Listener](/user-manual/audio/positional-audio/#the-audio-listener).
- **The source is beyond `maxDistance`.** With the linear model, a sound is silent from `maxDistance` outwards.

### A Sound Doesn't Fade with Distance {#a-sound-doesnt-fade-with-distance}

The default `maxDistance` is 10,000, which fades a sound so gradually that it seems not to fade at all. Set `maxDistance` to the distance at which the sound should be silent, or use the inverse distance model. See [Distance](/user-manual/audio/positional-audio/#distance).

### A Sound Doesn't Move Between the Speakers {#a-sound-doesnt-move-between-the-speakers}

- **The component is not positional.** Only positional sounds are panned.
- **The listener is on the sound's own entity**, or on one that moves with it. A sound at the listener's position is always in the middle.
- **The sound is in front or behind.** Sounds are panned left and right only, so a sound that crosses from front to back does not change. See [Panning](/user-manual/audio/positional-audio/#panning).

## Playback {#playback}

### Sounds Cut Each Other Off {#sounds-cut-each-other-off}

A slot plays one sound at a time, so playing it again restarts it. Turn **Overlap** on for sounds that should pile up, such as gunshots and footsteps. See [Overlapping Sounds](/user-manual/audio/playing-sounds/#overlapping-sounds).

### A Sound Goes On After Its Entity Is Destroyed {#a-sound-goes-on-after-its-entity-is-destroyed}

Sounds on an overlapping slot play to their end, even when the entity is destroyed or disabled. Stop the slot before you destroy the entity, or turn **Overlap** off.

### Changing Volume or Pitch Does Nothing {#changing-volume-or-pitch-does-nothing}

On an overlapping slot, changes to `volume`, `pitch`, `startTime` and `duration` apply to the next play, not to sounds that are already playing. To change a sound that is playing, set the property on its [sound instance](/user-manual/audio/controlling-playback/#volume-and-pitch).

### A Burst of Sound at the First Click {#a-burst-of-sound-at-the-first-click}

One-shot sounds that were played while audio was locked all start together when it unlocks. Skip them while the audio context is not running. See [Sounds Played While Locked](/user-manual/audio/autoplay/#sounds-played-while-locked).

### A Sound Is Late the First Time {#a-sound-is-late-the-first-time}

The asset had not loaded. A slot that is played before its asset is ready plays once the file has downloaded and decoded. Preload the asset, or load it before it is needed. See [When Audio Loads](/user-manual/audio/audio-assets/#when-audio-loads).

### A Loop Has a Gap or a Click {#a-loop-has-a-gap-or-a-click}

The engine loops without a gap, so the gap is in the file: silence at its ends, or a loop that is not cut on a musical boundary. See [Seamless Loops](/user-manual/audio/audio-assets/#seamless-loops).

### The `end` Event Never Fires {#the-end-event-never-fires}

- **The sound loops.** A looping sound never reaches its end.
- **The sound was stopped.** A sound that is stopped fires `stop`, not `end`. Listen for `stop` to act either way.
- **You listened on an old instance.** Each play creates a new [sound instance](/user-manual/audio/controlling-playback/#sound-instances). Listen on the slot or the component instead, which fire for every play.

## Effects {#effects}

### An Error When Clearing Effects {#an-error-when-clearing-effects}

`clearExternalNodes()` throws an `InvalidAccessError` when the slot shares its nodes with a slot that has already been cleared. Do not clear slots that share nodes. See [Sharing Effects](/user-manual/audio/effects/#sharing-effects).

### An Effect Does Nothing {#an-effect-does-nothing}

- **The nodes are not connected to each other.** With two nodes passed to `setExternalNodes()`, the engine connects the sound to the first and the last to the speakers. The connections between them are yours to make.
- **The nodes came from another audio context.** Create them from `app.systems.sound.context`.
- **The slot overlaps.** Nodes set on an overlapping slot apply to the next play.

## Memory {#memory}

### Audio Uses a Lot of Memory {#audio-uses-a-lot-of-memory}

Every loaded sound is held in memory decoded, at about 11 MB for each minute of mono audio, however small its file is. Use mono for sound effects, loop short sections of music rather than loading long tracks, and unload assets you have finished with. See [Memory](/user-manual/audio/audio-assets/#memory).

## See Also

- [Autoplay and User Gestures](/user-manual/audio/autoplay/) - Why audio waits for a click
- [Audio Assets](/user-manual/audio/audio-assets/) - Formats, loading and memory
- [Positional Audio](/user-manual/audio/positional-audio/) - The listener and distance models
