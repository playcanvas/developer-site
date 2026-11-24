---
title: CrazyGamesでの公開
description: "Editor、Engine、React、Web ComponentsのプロジェクトからPlayCanvasのゲームをCrazyGamesで公開する方法：CrazyGamesのHTML5 SDKの追加、ゲームプレイの報告、デモ広告でのテスト、ゲームの提出、動画広告の表示、CrazyGamesの要件。"
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

[CrazyGames](https://www.crazygames.com)は、ブラウザゲームのプラットフォームです。ゲームをホストし、ゲーム内の広告による収益を開発者に分配します。そのSDKで、動画広告、バナー、プレイヤーアカウント、クラウドセーブを追加できます。

CrazyGamesの[SDKドキュメント](https://docs.crazygames.com/sdk/intro/)には、いくつかのエンジン向けのガイドがあります。PlayCanvasのゲームはHTML5 SDKを使います。このページでは、Editor、Engine、React、Web Componentsで作成したプロジェクトでの使い方を説明します。

## 公開フロー {#publishing-flow}

CrazyGamesでゲームを公開するには、次の手順に従います：

1. 開発者アカウントを作成する
2. CrazyGames SDKを追加する
3. ゲームプレイを報告する
4. プロジェクトをビルドする
5. ゲームをテストする
6. ゲームを提出する

### 1. 開発者アカウントを作成する {#create-a-developer-account}

CrazyGamesの[Developer Portal](https://developer.crazygames.com)で登録します。ゲームの提出や進行状況の確認は、ここで行います。

### 2. CrazyGames SDKを追加する {#add-the-sdk}

SDKは、ゲームのコードより前にCrazyGamesから読み込むスクリプトで、グローバルな`window.CrazyGames.SDK`オブジェクトを定義します：

- **Editor:** [設定](/user-manual/editor/interface/settings/)パネルを開き、**External Scripts**を展開します。**Number of URLs**を1にして、表示された欄に`https://sdk.crazygames.com/crazygames-sdk-v3.js`を入力します。外部スクリプトは、ビルドでも[起動ページ](/user-manual/editor/interface/launch-page/)でも、プロジェクトのスクリプトより前に読み込まれます。
- **Engine、React、Web Components:** `index.html`の`<head>`の中、ゲームを読み込むスクリプトより前にスクリプトを追加します：

  ```html
  <script src="https://sdk.crazygames.com/crazygames-sdk-v3.js"></script>
  ```

SDKが動作するのは、CrazyGames上と`localhost`だけです。[PlayCanvasホスティング](/user-manual/editor/publishing/playcanvas-hosting/)や起動ページなど、それ以外のサイトではSDKが無効になり、SDKの呼び出しはすべてエラーを投げます。1つのビルドをどこでも動かせるように、SDKは小さなモジュールを通して使います。このモジュールはSDKを初期化し、SDKが無効な場所では`null`を返します。

モジュールは`crazygames.mjs`として保存します。[create-playcanvas](/user-manual/getting-started/start-with-create-playcanvas/)で作ったプロジェクトなど、TypeScriptのプロジェクトでは`crazygames.ts`として保存します。Editorでは、モジュールをインポートするスクリプトと同じフォルダーに、スクリプトアセットとして作成します。

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

`init()`はプレイヤーのセーブデータも読み込むので、少し時間がかかることがあります。そのためモジュールは、ゲームの読み込みを待たずに、インポートされた時点で初期化を始めます。`showAd()`については[動画広告の表示](#showing-video-ads)で説明します。

### 3. ゲームプレイを報告する {#report-gameplay}

CrazyGamesは、プレイヤーがいつプレイしているかを知る必要があります。プレイが始まるか再開したときに`gameplayStart()`を、ポーズメニューやレベルの終わりなどでプレイが止まるたびに`gameplayStop()`を呼び出してください。CrazyGamesは、最初の`gameplayStart()`までをゲームの初回ダウンロードとして計測します。

読み込みが終わるとすぐにゲームが始まる場合は、最初のシーンのアセットの準備ができたら`gameplayStart()`を呼び出します。ゲームがメニューから始まる場合は、代わりにプレイヤーがメニューを離れたときに呼び出します。

<Tabs groupId="workflow">
<TabItem value="editor" label="Editor">

次のコードでスクリプトを作成し、Rootエンティティなど、最初のシーンのエンティティにアタッチします：

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

`initialize()`は、プリロードするアセットの読み込みが終わり、シーンが作成された後に実行されます。

</TabItem>
<TabItem value="engine" label="Engine">

最初のシーンのアセットを読み込んだ後に呼び出します。たとえば、それらを読み込む[`AssetListLoader`](https://api.playcanvas.com/engine/classes/AssetListLoader.html)のコールバックの中で呼び出します：

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

最初のシーンの[アセットフック](/user-manual/react/guide/loading-assets/)が読み込みを終えたら、エフェクトから呼び出します：

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

[`whenReady`](/user-manual/web-components/programmatic-access/)を使って、`<pc-app>`の準備ができるのを待ちます。準備ができるのは、アセットをプリロードして起動した後です：

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

プレイが止まり、後で再開するときは、両方を報告します：

```javascript
// the player paused, opened a menu or finished a level
crazyGames.then((sdk) => sdk?.game.gameplayStop());

// the player carries on playing
crazyGames.then((sdk) => sdk?.game.gameplayStart());
```

プレイヤーが別のタブやウィンドウに切り替えたことは、CrazyGamesが代わりに扱うので、報告する必要はありません。

### 4. プロジェクトをビルドする {#build-your-project}

CrazyGamesはゲームを専用のフォルダーから配信するので、ビルドは相対URLでファイルを読み込む必要があります：

- **Editor:** **Download Format**を**Static Website**にして[ビルドをダウンロード](/user-manual/editor/publishing/downloading/)し、zipファイルを展開します。Editorのビルドは、すでに相対URLを使っています。
- **Engine、React、Web Components:** Viteの[`base`](https://vite.dev/config/shared-options#base)オプションを`'./'`に設定し（create-playcanvasで作ったプロジェクトは、すでにそうなっています）、`npm run build`を実行します。Viteはビルドを`dist`フォルダーに書き出します。
- **バンドラーを使わない場合:** `index.html`を含むフォルダーがビルドです。

### 5. ゲームをテストする {#test-your-game}

- **自分のコンピューターで:** [ビルドをローカルで配信](web-hosting.md#testing-a-build-locally)し、`localhost`のアドレスで開きます。そこではSDKがデモモードで動作し、各広告の代わりにプレースホルダーを表示して、SDKの呼び出しをブラウザーのコンソールに記録します。
- **ほかのアドレスで:** URLのクエリ文字列に`useLocalSdk=true`を加えると、同じデモモードになります。たとえば起動ページでは、`https://launch.playcanvas.com/<scene_id>?useLocalSdk=true`を開きます。
- **CrazyGamesで:** Developer Portalでビルドをアップロードすると、そのプレビューツールが`crazygames.com/preview`でゲームを実行します。これが、実際のサイトに最も近いテストです。

### 6. ゲームを提出する {#submit-your-game}

Developer Portalで**Submit a game**を選び、ビルドをアップロードして、説明、操作方法、サムネイル、トレーラーなどのゲームの詳細を入力します。その後CrazyGamesは段階的にゲームを公開し、各段階をメールで知らせます：

1. **品質チェック:** CrazyGamesが、ビルドが動作することを確認します。
2. **Basic Launch:** 広告をオフにした状態でゲームが公開され、CrazyGamesがプレイヤーの反応を計測します。そのため、ゲームは広告なしでも動作する必要があります。この段階は少なくとも7日間と500プレイ続き、長くても21日で終わります。
3. **Full Launch:** CrazyGamesの[要件](#requirements)に対する完全なチェックの後、広告付きでゲームが公開されます。

後でゲームを更新するには、Developer Portalで新しいファイルをアップロードし、承認を申請します。

## 動画広告の表示 {#showing-video-ads}

ゲームは、2種類の動画広告をリクエストできます：

- **Midgame**広告は、レベルの合間など、自然な区切りで再生されます。CrazyGamesが表示するのは、最大で3分に1回です。
- **Rewarded**広告は、追加のライフなどの報酬と引き換えに、プレイヤーが自分で選んで視聴するときに再生されます。

CrazyGamesは、広告の再生中にゲームを一時停止してミュートすることを求めています。[手順2](#add-the-sdk)のモジュールの`showAd()`関数は、その両方を行います。広告の再生中はアプリの`timeScale`とサウンドシステムの`volume`を0にし、終わったら元に戻します。`timeScale`が0のときは、すべての`update()`に0の`dt`が渡されるので、アニメーションや物理演算など、`dt`で動くものはすべて止まります。`setTimeout()`など、ゲームがほかの方法で計っている時間は、別に一時停止してください。

`showAd()`は、広告が最後まで再生されると`true`で解決されます。広告が再生されなかった場合は`false`で解決されますが、これはよくあることです。プレイヤーが広告ブロッカーを使っている場合や、表示する広告がない場合があり、Basic Launchの間とほかのサイトでは広告がオフになります。報酬は、`true`で解決されたときだけ与えてください：

```javascript
// at the end of a level
await showAd(app, 'midgame');

// when the player chooses to watch an ad for an extra life
if (await showAd(app, 'rewarded')) {
    lives++;
}
```

渡す`app`の取得方法は、ゲームの作り方によって異なります：

- **Editor:** スクリプトの中の`this.app`。
- **Engine:** 自分で作成したアプリ。
- **React:** [`useApp`](/user-manual/react/api/hooks/use-app/)フック。
- **Web Components:** `<pc-app>`要素の`app`プロパティ。たとえば`const { app } = await whenReady('pc-app');`。

## iOSでのオーディオの再開 {#resuming-audio-on-ios}

iPhoneやiPadでプレイヤーが別のアプリに切り替えると、iOSはゲームのオーディオを停止し、タップでしか再開できなくなります。CrazyGamesはモバイルゲームにオーディオの再開を求めているので、アプリができたら、このリスナーを一度だけ追加してください。`app`は[動画広告の表示](#showing-video-ads)で説明した方法で取得します。Editorでは、最初のシーンにあるスクリプトの`initialize()`メソッドに追加します。

```javascript
// iOS suspends audio when the player switches apps, and only a tap can resume it
document.addEventListener('touchend', () => {
    const context = app.systems.sound?.context;
    if (context && context.state !== 'running') {
        context.resume();
    }
});
```

## 要件 {#requirements}

CrazyGamesは、すべてのゲームを[要件](https://docs.crazygames.com/requirements/intro/)に照らしてチェックします。PlayCanvasのゲームに特に関係が深いのは、次の要件です：

- **ダウンロードサイズ。** 最初の`gameplayStart()`までにゲームが読み込むファイルは、合計50 MB以下である必要があります。CrazyGamesのモバイル版ホームページに表示されるには20 MB以下です。ビルド全体は250 MBまで、ファイル数は1,500個までです。[テクスチャ圧縮](/user-manual/optimization/texture-compression/)やほかの[読み込み時間のヒント](/user-manual/optimization/load-time/)が、これらの制限に収めるのに役立ちます。
- **パフォーマンス。** ゲームはChromeとEdgeで動作し、RAMが4 GBのChromebookで快適に動く必要があります。Safariでうまく動かないゲームは、CrazyGamesがSafariで無効にします。
- **フルスクリーンボタンなし。** CrazyGamesが独自のボタンを追加するので、ゲームが独自のボタンを持つことはできません。
- **広告はSDKからのみ。** ゲームはほかの広告を表示できず、広告が表示されないときも動作する必要があります。
- **英語。** ゲームは英語でプレイできる必要があります。

## SDKの機能（オプション） {#sdk-features}

`crazyGames`が解決するSDKオブジェクトを通して、コードから[HTML5 SDK](https://docs.crazygames.com/sdk/intro/)のほかの機能も使えます：

- バナー広告
- プレイヤーアカウント
- `localStorage`と同じAPIのクラウドセーブ。使うには、ゲームを提出するときに**Progress Save**をオンにします。
- オーディオのミュートなど、CrazyGamesでのプレイヤーの設定。ゲーム自身の設定より優先する必要があります。
- マルチプレイヤーゲームの招待リンク

## 役立つリンク {#useful-links}

- [CrazyGames Developer Portal](https://developer.crazygames.com)
- [CrazyGames開発者ドキュメント](https://docs.crazygames.com)
- [CrazyGamesのゲーム要件](https://docs.crazygames.com/requirements/intro/)
- [CrazyGamesの開発者サポート](https://developer.crazygames.com/support)
