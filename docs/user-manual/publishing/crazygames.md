---
title: Publishing on CrazyGames
description: "Publishing a PlayCanvas game on CrazyGames from an Editor, Engine, React or Web Components project: adding the CrazyGames HTML5 SDK, reporting gameplay, testing with demo ads, submitting the game, showing video ads and meeting CrazyGames' requirements."
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

[CrazyGames](https://www.crazygames.com) is a platform for browser games. It hosts your game and shares the revenue from the ads in it with you. Its SDK adds video ads, banners, player accounts and cloud saves.

CrazyGames' [SDK documentation](https://docs.crazygames.com/sdk/intro/) has guides for several engines. A PlayCanvas game uses the HTML5 SDK, and this page shows how for projects built with the Editor, the Engine, React and Web Components.

## Publishing Flow {#publishing-flow}

To publish your game on CrazyGames, follow these steps:

1. Create a developer account
2. Add the CrazyGames SDK
3. Report gameplay
4. Build your project
5. Test your game
6. Submit your game

### 1. Create a developer account {#create-a-developer-account}

Sign up in the CrazyGames [Developer Portal](https://developer.crazygames.com), where you submit your game and follow its progress.

### 2. Add the CrazyGames SDK {#add-the-sdk}

The SDK is a script that loads from CrazyGames before your game's code and defines a global `window.CrazyGames.SDK` object:

- **Editor:** open the [Settings](/user-manual/editor/interface/settings/) panel and expand **External Scripts**. Set **Number of URLs** to 1, and enter `https://sdk.crazygames.com/crazygames-sdk-v3.js` in the field that appears. External scripts load before your project's scripts, in builds and on the [Launch Page](/user-manual/editor/interface/launch-page/).
- **Engine, React and Web Components:** add the script to the `<head>` of your `index.html`, before the script that loads your game:

  ```html
  <script src="https://sdk.crazygames.com/crazygames-sdk-v3.js"></script>
  ```

The SDK only works on CrazyGames and on `localhost`. On any other site, such as [PlayCanvas Hosting](/user-manual/editor/publishing/playcanvas-hosting/) or the Launch Page, it's disabled and every call to it throws an error. To keep a single build that runs everywhere, use the SDK through a small module that initializes it and gives you `null` where it's disabled.

Save the module as `crazygames.mjs`, or as `crazygames.ts` in a TypeScript project such as one made with [create-playcanvas](/user-manual/getting-started/start-with-create-playcanvas/). In the Editor, create it as a script asset in the same folder as the scripts that import it.

<Tabs groupId="language">
<TabItem value="javascript" label="JavaScript">

```javascript
async function init() {
    const sdk = window.CrazyGames?.SDK;
    if (!sdk) {
        return null;
    }
    await sdk.init();

    // Everywhere except CrazyGames and localhost, the SDK is disabled and every call throws an error
    return sdk.environment === 'disabled' ? null : sdk;
}

// Resolves to the SDK once it's ready, or to null where it's disabled
export const crazyGames = init();

// Shows a video ad, pausing and muting the app while it plays. Resolves to true if the ad played
// to the end
export async function showAd(app, type) {
    const sdk = await crazyGames;
    if (!sdk) {
        return false;
    }

    const sound = app.systems.sound;
    const { timeScale } = app;
    const { volume } = sound;

    const finished = await new Promise((resolve) => {
        sdk.ad.requestAd(type, {
            adStarted: () => {
                app.timeScale = 0;
                sound.volume = 0;
            },
            adFinished: () => resolve(true),
            adError: () => resolve(false)
        });
    });

    app.timeScale = timeScale;
    sound.volume = volume;
    return finished;
}
```

</TabItem>
<TabItem value="typescript" label="TypeScript">

```typescript
import type { AppBase } from 'playcanvas';

declare global {
    interface Window {
        // Added by the SDK script, which has no TypeScript types
        CrazyGames?: { SDK: any };
    }
}

async function init() {
    const sdk = window.CrazyGames?.SDK;
    if (!sdk) {
        return null;
    }
    await sdk.init();

    // Everywhere except CrazyGames and localhost, the SDK is disabled and every call throws an error
    return sdk.environment === 'disabled' ? null : sdk;
}

// Resolves to the SDK once it's ready, or to null where it's disabled
export const crazyGames = init();

// Shows a video ad, pausing and muting the app while it plays. Resolves to true if the ad played
// to the end
export async function showAd(app: AppBase, type: 'midgame' | 'rewarded') {
    const sdk = await crazyGames;
    if (!sdk) {
        return false;
    }

    const sound = app.systems.sound!;
    const { timeScale } = app;
    const { volume } = sound;

    const finished = await new Promise<boolean>((resolve) => {
        sdk.ad.requestAd(type, {
            adStarted: () => {
                app.timeScale = 0;
                sound.volume = 0;
            },
            adFinished: () => resolve(true),
            adError: () => resolve(false)
        });
    });

    app.timeScale = timeScale;
    sound.volume = volume;
    return finished;
}
```

</TabItem>
</Tabs>

`init()` also loads the player's saved data, which can take a moment, so the module starts it as soon as it's imported rather than waiting for your game to load. [Showing Video Ads](#showing-video-ads) explains `showAd()`.

### 3. Report gameplay {#report-gameplay}

CrazyGames needs to know when the player is playing. Call `gameplayStart()` when play starts or resumes, and `gameplayStop()` whenever it stops, such as for a pause menu or at the end of a level. CrazyGames measures your game's initial download up to the first `gameplayStart()`.

If your game starts as soon as it has loaded, call `gameplayStart()` once the assets for your first scene are ready. If it opens on a menu, call it when the player leaves the menu instead.

<Tabs groupId="workflow">
<TabItem value="editor" label="Editor">

Create a script with the following code and attach it to an entity in your first scene, such as the Root entity:

```javascript
import { Script } from 'playcanvas';
import { crazyGames } from './crazygames.mjs';

export class CrazyGamesGameplay extends Script {
    static scriptName = 'crazyGamesGameplay';

    initialize() {
        crazyGames.then((sdk) => sdk?.game.gameplayStart());
    }
}
```

`initialize()` runs after the preloaded assets have loaded and the scene has been created.

</TabItem>
<TabItem value="engine" label="Engine">

Call it after the assets for your first scene have loaded, for example in the callback of the [`AssetListLoader`](https://api.playcanvas.com/engine/classes/AssetListLoader.html) that loads them:

```javascript
import { crazyGames } from './crazygames';

const loader = new AssetListLoader(Object.values(assets), app.assets);
loader.load(() => {
    // create your scene from the loaded assets, then start the app
    app.start();
    crazyGames.then((sdk) => sdk?.game.gameplayStart());
});
```

</TabItem>
<TabItem value="react" label="React">

Call it from an effect once the [asset hooks](/user-manual/react/guide/loading-assets/) for your first scene have finished loading:

```tsx
import { useEffect } from 'react';
import { Gltf } from '@playcanvas/react';
import { useModel } from '@playcanvas/react/hooks';
import { crazyGames } from './crazygames';

export function Level() {
    const { asset, loading } = useModel('level.glb');

    useEffect(() => {
        if (!loading) {
            crazyGames.then((sdk) => sdk?.game.gameplayStart());
        }
    }, [loading]);

    if (loading) return null;
    return <Gltf asset={asset} key={asset.id} />;
}
```

</TabItem>
<TabItem value="web-components" label="Web Components">

Wait for `<pc-app>` to become ready, which happens once it has preloaded its assets and started, using [`whenReady`](/user-manual/web-components/programmatic-access/):

```html
<script type="module">
    import { whenReady } from '@playcanvas/web-components';
    import { crazyGames } from './crazygames.mjs';

    await whenReady('pc-app');
    const sdk = await crazyGames;
    sdk?.game.gameplayStart();
</script>
```

</TabItem>
</Tabs>

When play stops and starts again later, report both:

```javascript
// the player paused, opened a menu or finished a level
crazyGames.then((sdk) => sdk?.game.gameplayStop());

// the player carries on playing
crazyGames.then((sdk) => sdk?.game.gameplayStart());
```

There's no need to report the player switching to another tab or window, because CrazyGames does that for you.

### 4. Build your project {#build-your-project}

CrazyGames serves your game from its own folder, so the build must load its files with relative URLs:

- **Editor:** [download a build](/user-manual/editor/publishing/downloading/) with the **Download Format** set to **Static Website**, and extract the zip file. Editor builds already use relative URLs.
- **Engine, React and Web Components:** set Vite's [`base`](https://vite.dev/config/shared-options#base) option to `'./'`, which projects made with create-playcanvas already do, and run `npm run build`. Vite writes the build to the `dist` folder.
- **Without a bundler:** the build is the folder that contains your `index.html`.

### 5. Test your game {#test-your-game}

- **On your computer:** [serve the build locally](web-hosting.md#testing-a-build-locally) and open it at a `localhost` address. There the SDK runs in a demo mode, which shows a placeholder in place of each ad and logs SDK calls to the browser console.
- **On any other address:** add `useLocalSdk=true` to the URL's query string to turn on the same demo mode. For example, on the Launch Page, open `https://launch.playcanvas.com/<scene_id>?useLocalSdk=true`.
- **On CrazyGames:** once you've uploaded your build in the Developer Portal, its preview tool runs your game on `crazygames.com/preview`, which is the closest test to the real site.

### 6. Submit your game {#submit-your-game}

In the Developer Portal, select **Submit a game**, upload your build and fill in your game's details, such as its description, controls, thumbnails and trailer. CrazyGames then launches it in stages, and emails you about each one:

1. **Quality check:** CrazyGames checks that the build works.
2. **Basic Launch:** your game goes live with ads turned off, so it must work without them, while CrazyGames measures how players respond to it. This lasts at least 7 days and 500 plays, and ends after 21 days at most.
3. **Full Launch:** after a full check against CrazyGames' [requirements](#requirements), your game goes live with ads.

To update your game later, upload the new files in the Developer Portal and submit them for approval.

## Showing Video Ads {#showing-video-ads}

Your game can request two kinds of video ad:

- **Midgame** ads play at natural breaks, such as between levels. CrazyGames shows at most one every 3 minutes.
- **Rewarded** ads play when the player chooses to watch one in return for a reward, such as an extra life.

CrazyGames requires your game to be paused and muted while an ad plays. The `showAd()` function in the module from [step 2](#add-the-sdk) does both: it sets the app's `timeScale` and the sound system's `volume` to 0 while the ad plays, then restores them. A `timeScale` of 0 passes a `dt` of 0 to every `update()`, which stops everything that moves by `dt`, including animation and physics. Pause anything your game times in other ways, such as with `setTimeout()`.

`showAd()` resolves to `true` if the ad played to the end. It resolves to `false` if no ad played, which is common: the player may use an ad blocker, there may be no ad to show, and ads are off during Basic Launch and on other sites. Give a reward only when it resolves to `true`:

```javascript
// at the end of a level
await showAd(app, 'midgame');

// when the player chooses to watch an ad for an extra life
if (await showAd(app, 'rewarded')) {
    lives++;
}
```

How you get the `app` to pass in depends on how you build your game:

- **Editor:** `this.app` in a script.
- **Engine:** the app that you created.
- **React:** the [`useApp`](/user-manual/react/api/hooks/use-app/) hook.
- **Web Components:** the `app` property of the `<pc-app>` element, for example `const { app } = await whenReady('pc-app');`.

## Resuming Audio on iOS {#resuming-audio-on-ios}

When the player switches to another app on an iPhone or iPad, iOS suspends your game's audio, and only a tap can resume it. CrazyGames requires mobile games to resume their audio, so add this listener once your app exists, getting `app` as described in [Showing Video Ads](#showing-video-ads). In the Editor, add it to the `initialize()` method of a script in your first scene.

```javascript
// iOS suspends audio when the player switches apps, and only a tap can resume it
document.addEventListener('touchend', () => {
    const context = app.systems.sound?.context;
    if (context && context.state !== 'running') {
        context.resume();
    }
});
```

## Requirements {#requirements}

CrazyGames checks every game against its [requirements](https://docs.crazygames.com/requirements/intro/). These are the ones that most often affect a PlayCanvas game:

- **Download size.** The files your game loads before the first `gameplayStart()` must add up to 50 MB at most, or 20 MB to be shown on CrazyGames' mobile homepage. The whole build can be up to 250 MB, in no more than 1,500 files. [Texture compression](/user-manual/optimization/texture-compression/) and the other [load-time tips](/user-manual/optimization/load-time/) help you stay inside these limits.
- **Performance.** Your game must work in Chrome and Edge, and run smoothly on a Chromebook with 4 GB of RAM. CrazyGames turns off games on Safari if they don't work well there.
- **No fullscreen button.** CrazyGames adds its own, and games may not have one.
- **Ads from the SDK only.** Your game can't show ads from anywhere else, and it must work when no ad is shown.
- **English.** Your game must be available in English.

## SDK Features (optional) {#sdk-features}

The SDK object that `crazyGames` resolves to also gives your code access to the rest of the [HTML5 SDK](https://docs.crazygames.com/sdk/intro/), including:

- Banner ads
- Player accounts
- Cloud saves, with the same API as `localStorage`. To use them, turn on **Progress Save** when you submit your game.
- The player's settings on CrazyGames, such as muting audio, which should take priority over your game's own settings
- Invite links for multiplayer games

## Useful Links {#useful-links}

- [CrazyGames Developer Portal](https://developer.crazygames.com)
- [CrazyGames developer documentation](https://docs.crazygames.com)
- [CrazyGames game requirements](https://docs.crazygames.com/requirements/intro/)
- [CrazyGames developer support](https://developer.crazygames.com/support)
