---
title: リアルタイムマルチプレイヤー
description: Node.jsとSocket.IOのサーバーを自分のコンピューターで動かし、ブラウザ間でプレイヤーを同期します。その後サーバーをオンラインに公開します。ホスト型のマルチプレイヤーサービスは使いません。
tags: [multiplayer, networking]
thumb: https://s3-eu-west-1.amazonaws.com/images.playcanvas.com/projects/12/406048/507186-image-75.jpg
---

<video autoPlay muted loop controls playsInline src="/video/real-time-multiplayer-two-windows.mp4" style={{width: '100%', height: 'auto'}} />

*完成したプロジェクトを2つのブラウザウィンドウで実行しているところ。それぞれのウィンドウは白いカプセルを操作し、相手のプレイヤーは青で表示されます。*

このチュートリアルでは、小さなマルチプレイヤープロジェクトをゼロから作ります。各プレイヤーは<kbd>W</kbd>、<kbd>A</kbd>、<kbd>S</kbd>、<kbd>D</kbd>キーでカプセルを動かし、他のプレイヤーのカプセルがリアルタイムで動くのを見ることができます。

プロジェクトは2つの部分でできています。

- **サーバー**。[Node.js](https://nodejs.org/)と[Socket.IO](https://socket.io/)で書きます。プレイヤーの一覧を保持し、プレイヤー間でメッセージを受け渡します。最初は自分のコンピューターで動かし、最後にオンラインに公開します。
- **クライアント**。あなたのPlayCanvasプロジェクトです。プロジェクトを開いたすべてのブラウザが、サーバーに接続します。

:::info[はじめる前に]

コンピューターに[Node.js](https://nodejs.org/en/download)と、コマンドを実行するためのターミナルが必要です。エディターの使い方に慣れるために、先に[初めてのアプリ](/user-manual/editor/getting-started/your-first-app/)を終えておくとよいでしょう。自分の作業と比べるには、[完成したプロジェクト](https://playcanvas.com/project/406048/overview/tutorial-realtime-multiplayer)を開いてください。

:::

## 1. サーバーを作成する {#create-the-server}

1. サーバー用のフォルダーを作り、セットアップして、Socket.IOをインストールします。

    ```sh
    mkdir multiplayer-server
    cd multiplayer-server
    npm init -y
    npm install socket.io
    ```

2. そのフォルダーに `server.js` というファイルを作り、次のコードを書きます。

    ```javascript
    const http = require('http');
    const { Server } = require('socket.io');

    const server = http.createServer();

    const io = new Server(server, {
        cors: {
            // Any page may connect. Before you publish a game, list the addresses it is
            // served from instead, such as 'https://playcanv.as'.
            origin: '*'
        }
    });

    // Every connected player's last known position, keyed by socket ID
    const players = {};

    io.on('connection', (socket) => {
        console.log(`Player connected: ${socket.id}`);

        // A client sends this once it is ready to receive the list of players
        socket.on('initialize', () => {
            // Start each player at a random place on the ground
            players[socket.id] = {
                id: socket.id,
                x: Math.random() * 10 - 5,
                y: 1,
                z: Math.random() * 10 - 5
            };

            // Tell the new player its own ID and where everyone is
            socket.emit('playerData', { id: socket.id, players });

            // Tell everyone else that a new player has arrived
            socket.broadcast.emit('playerJoined', players[socket.id]);
        });

        // A client sends this whenever its player has moved
        socket.on('positionUpdate', (position) => {
            const player = players[socket.id];
            if (!player) return;

            player.x = position.x;
            player.y = position.y;
            player.z = position.z;

            socket.broadcast.emit('playerMoved', player);
        });

        socket.on('disconnect', () => {
            console.log(`Player disconnected: ${socket.id}`);
            if (!players[socket.id]) return;

            delete players[socket.id];
            socket.broadcast.emit('playerLeft', socket.id);
        });
    });

    const port = process.env.PORT || 3000;
    server.listen(port, () => {
        console.log(`Server listening on port ${port}`);
    });
    ```

3. サーバーを起動します。

    ```sh
    node server.js
    ```

    `Server listening on port 3000` と表示されます。チュートリアルの残りの間、このターミナルで実行したままにしておきます。後で停止するには、<kbd>Ctrl</kbd>+<kbd>C</kbd>を押します。

サーバーはゲームの中身を見ません。メッセージを受け取り、メッセージを送り出すだけです。メッセージについては、クライアントが動くようになってから、[メッセージの流れ](#how-the-messages-flow)で説明します。

## 2. シーンを作る {#build-the-scene}

**Blank Project** キットから新しいプロジェクトを作成し、エディターで開きます。シーンには、Camera、Light、Box、Planeがあります。

### 地面 {#the-ground}

1. ヒエラルキーで **Box** を選択し、<kbd>Delete</kbd>キーを押します。
2. **Plane** を選択します。インスペクターで **Name** を `Ground` に、**Scale** を `16`、`1`、`16` に変更します。
3. **ADD COMPONENT** > **Physics** > **Collision** を選択します。**Half Extents** を `8`、`0.1`、`8` に、**Position Offset** を `0`、`-0.1`、`0` に設定します。これで地面に、上に立つための薄いボックスができます。ボックスの上面は、平面の表面と同じ高さになります。
4. コンポーネントに **Ammo module not found** と表示されます。**IMPORT AMMO** を選択して、[物理エンジン](/user-manual/physics/)をプロジェクトに追加します。
5. **ADD COMPONENT** > **Physics** > **Rigid Body** を選択します。**Type** は **Static** のままにします。

### プレイヤー {#the-players}

シーンには2つのカプセルが必要です。`Player` は、このブラウザが操作するカプセルです。`Other` はテンプレートで、他のプレイヤーが参加するたびに、プロジェクトがそのコピーを作ります。

1. ヒエラルキーで **Root** を選択し、**+**（エンティティを追加）ボタン、**3D** > **Capsule** の順に選択します。
2. インスペクターで **Name** を `Player` に、**Position** を `0`、`1`、`0` に変更します。
3. **Player** を選択した状態で、ヒエラルキーの上部にある **Duplicate Entity** ボタンを選択します。コピーが選択された状態になり、その名前もPlayerです。
4. コピーの **Name** を `Other` に変更し、インスペクターの一番上にある **Enabled** をオフにします。他のプレイヤーは描画されるだけなので、`Other` に物理は必要ありません。
5. アセットパネルで **+**（アセットを追加）ボタンを選択し、**Material** を選択します。新しいマテリアルを選択し、**Name** を `Blue` に変更して、**Diffuse** を展開し、**Color** の色見本を選択します。16進数のフィールドに `2F80ED` と入力して、<kbd>Tab</kbd>キーを押します。
6. もう一度 **Other** を選択します。アセットパネルから `Blue` を、インスペクターの **Materials** の下にある空のマテリアルスロットにドラッグします。
7. **Player** を選択します。**Collision** コンポーネントを追加し、**Type** を **Capsule** に設定します。
8. **Rigid Body** コンポーネントを追加します。**Type** を **Dynamic** に、**Angular Factor** を `0`、`0`、`0` に設定します。これでカプセルが倒れなくなります。

![PlayerのRigid Bodyコンポーネント](/img/tutorials/real-time-multiplayer/rigid-body.webp)

### カメラとライト {#the-camera-and-the-light}

1. **Camera** を選択します。地面全体を見下ろすように、**Position** を `0`、`14`、`16` に、**Rotation** を `-42`、`0`、`0` に設定します。
2. **Light** を選択します。影が地面の奥まで届くように、**Cast Shadows** の下にある **Distance** を `40` に設定します。

![エディターで開いたシーン](/img/tutorials/real-time-multiplayer/scene.webp)

## 3. Socket.IOクライアントを追加する {#add-the-socket-io-client}

サーバーはSocket.IOライブラリを使っているので、クライアントにも、対応するブラウザ用のライブラリが必要です。PlayCanvasは、スクリプトを実行する前に、Webアドレスからライブラリを読み込むことができます。

1. ビューポートの上部のツールバーにある **Settings** ボタン（歯車）を選択します。
2. インスペクターで **External Scripts** を展開し、**Number of URLs** を `1` に設定します。
3. 次のアドレスを **URL** フィールドに貼り付けて、<kbd>Enter</kbd>キーを押します。

    ```none
    https://cdn.socket.io/4.8.4/socket.io.min.js
    ```

![External Scriptsの設定](/img/tutorials/real-time-multiplayer/external-scripts.webp)

## 4. プレイヤーを動かす {#move-the-player}

1. アセットパネルで **+**（アセットを追加）ボタンを選択し、**Script** を選択します。ファイル名に `movement.mjs` と入力して、<kbd>Enter</kbd>キーを押します。
2. `movement.mjs` をダブルクリックして、[Code Editor](/user-manual/editor/scripting/code-editor/)（コードエディター）で開きます。
3. ファイルの内容をすべて次のコードに置き換え、<kbd>Ctrl</kbd>+<kbd>S</kbd>（Macでは<kbd>Cmd</kbd>+<kbd>S</kbd>）で保存します。

```javascript
import { Script, Vec3, KEY_A, KEY_D, KEY_S, KEY_W } from 'playcanvas';

/**
 * Moves the player with the W, A, S and D keys, and returns it to the start if it falls
 * off the ground.
 */
export class Movement extends Script {
    static scriptName = 'movement';

    /**
     * How fast the player moves, in units per second.
     *
     * @attribute
     * @type {number}
     */
    speed = 5;

    initialize() {
        this.direction = new Vec3();
    }

    update(dt) {
        const keyboard = this.app.keyboard;
        const body = this.entity.rigidbody;

        // The camera looks along the negative Z axis, so W moves the player away from it
        const x = (keyboard.isPressed(KEY_D) ? 1 : 0) - (keyboard.isPressed(KEY_A) ? 1 : 0);
        const z = (keyboard.isPressed(KEY_S) ? 1 : 0) - (keyboard.isPressed(KEY_W) ? 1 : 0);
        this.direction.set(x, 0, z).normalize().mulScalar(this.speed);

        // Set the sideways speed and leave the vertical speed to gravity
        const velocity = body.linearVelocity;
        velocity.x = this.direction.x;
        velocity.z = this.direction.z;
        body.linearVelocity = velocity;

        // Fell off the edge: start again in the middle
        if (this.entity.getPosition().y < -10) {
            body.teleport(0, 1, 0);
            body.linearVelocity = Vec3.ZERO;
        }
    }
}
```

次に、スクリプトをプレイヤーにアタッチします。

1. エディターに戻り、**Player** を選択します。
2. **ADD COMPONENT** > **Script** を選択します。新しい[Scriptコンポーネント](/user-manual/editor/scenes/components/script/)はインスペクターの一番下に追加されるので、そこまでスクロールします。
3. **+ ADD SCRIPT** フィールドを選択し、`movement` を選びます。
4. `movement` スクリプトの **Parse** ボタンを選択します。**Edit** の隣にある、2つの矢印のボタンです。エディターがコードを読み取り、`speed` 属性を表示します。

ビューポートの右上にある **Launch** を選択します。プロジェクトが新しいタブで開き、<kbd>W</kbd>、<kbd>A</kbd>、<kbd>S</kbd>、<kbd>D</kbd>キーでカプセルが動きます。端から落ちると、中央からやり直しになります。

## 5. サーバーに接続する {#connect-to-the-server}

1. `movement.mjs` と同じ方法で、`network.mjs` という2つ目のスクリプトを作成します。
2. ファイルの内容をすべて次のコードに置き換えて、保存します。

```javascript
import { Script, Vec3 } from 'playcanvas';

/**
 * Connects to the multiplayer server, sends it this player's position and shows a capsule
 * for every other player.
 */
export class Network extends Script {
    static scriptName = 'network';

    /**
     * The address of the multiplayer server.
     *
     * @attribute
     * @type {string}
     */
    serverUrl = 'http://localhost:3000';

    initialize() {
        this.player = this.app.root.findByName('Player');
        this.other = this.app.root.findByName('Other');

        // The other players, keyed by ID. It stays null until the server sends the list.
        this.players = null;
        this.lastSent = new Vec3();

        // io is defined by the Socket.IO client library
        this.socket = io(this.serverUrl);

        this.socket.on('connect', () => {
            console.log(`Connected to ${this.serverUrl}`);
            this.socket.emit('initialize');
        });

        this.socket.on('playerData', (data) => {
            this.removeAll();
            this.players = {};
            for (const id in data.players) {
                const player = data.players[id];
                if (id === data.id) {
                    // This is us: move to the position the server chose
                    this.player.rigidbody.teleport(player.x, player.y, player.z);
                } else {
                    this.addPlayer(player);
                }
            }
        });

        this.socket.on('playerJoined', (data) => {
            if (this.players) {
                this.addPlayer(data);
            }
        });

        this.socket.on('playerMoved', (data) => {
            const entity = this.players?.[data.id];
            if (entity) {
                entity.setPosition(data.x, data.y, data.z);
            }
        });

        this.socket.on('playerLeft', (id) => {
            const entity = this.players?.[id];
            if (entity) {
                entity.destroy();
                delete this.players[id];
            }
        });

        // Close the connection when this script is destroyed
        this.once('destroy', () => {
            this.socket.disconnect();
        });
    }

    update(dt) {
        if (!this.players) return;

        // Tell the server where this player is, but only when it has moved
        const position = this.player.getPosition();
        if (!position.equals(this.lastSent)) {
            this.lastSent.copy(position);
            this.socket.emit('positionUpdate', { x: position.x, y: position.y, z: position.z });
        }
    }

    /**
     * Shows a capsule for another player.
     *
     * @param {{ id: string, x: number, y: number, z: number }} data - The player's ID and position.
     */
    addPlayer(data) {
        const entity = this.other.clone();
        this.other.parent.addChild(entity);
        entity.setPosition(data.x, data.y, data.z);
        entity.enabled = true;
        this.players[data.id] = entity;
    }

    /**
     * Removes every other player's capsule. The server sends the full list again each time
     * the connection is made, including after a dropped connection.
     */
    removeAll() {
        for (const id in this.players) {
            this.players[id].destroy();
        }
    }
}
```

スクリプトをシーンにアタッチします。

1. エディターで **Root** を選択します。
2. **Script** コンポーネントを追加して `network` スクリプトを追加し、その **Parse** ボタンを選択します。`serverUrl` 属性が表示され、自分のコンピューター上のサーバーのアドレスが設定されています。

![Rootエンティティのnetworkスクリプト](/img/tutorials/real-time-multiplayer/network-script.webp)

### 試してみる {#try-it}

1. [手順1](#create-the-server)のサーバーがまだ実行中であることを確認します。
2. プロジェクトを **Launch** します。
3. `launch.playcanvas.com` がデバイス上のアプリやサービスにアクセスしてよいかどうかを、ブラウザが確認する場合があります。**許可**（Allow）を選択します。ブラウザが確認するのは、インターネット上のページが、自分のコンピューター上のプログラムに接続しようとしているからです。
4. サーバーを実行しているターミナルに、`Player connected:` とIDが表示されます。
5. Launchタブのアドレスをコピーして、2つ目のブラウザウィンドウで開きます。2つのウィンドウを横に並べます。

それぞれのウィンドウに、2つのカプセルが表示されます。ウィンドウをクリックして白いカプセルを動かすと、もう一方のウィンドウの青いカプセルが同じように動きます。ウィンドウを閉じると、そのカプセルはもう一方のウィンドウから消えます。

:::note

Safariは、インターネット上のページが `localhost` に接続することを拒否する場合があります。サーバーに `Player connected:` が表示されない場合は、Chrome、Edge、Firefoxのいずれかでテストしてください。これは自分のコンピューター上のサーバーにだけ当てはまり、[オンライン](#put-the-server-online)のサーバーには影響しません。

:::

カプセルが1つしか表示されない場合は、ブラウザの開発者ツール（<kbd>F12</kbd>）を開いて、コンソールを確認します。

- `Connected to http://localhost:3000` と表示されていれば、クライアントはサーバーに到達しています。サーバーのターミナルにエラーが出ていないか確認してください。
- `localhost:3000` を含むエラーが表示されていれば、サーバーが実行されていないか、ブラウザがサーバーへのアクセスを許可されていません。もう一度確認を表示させるには、アドレスバーの左端にあるアイコンを選択してサイトの権限をリセットし、タブを再読み込みします。

## 6. メッセージの流れ {#how-the-messages-flow}

クライアントとサーバーは、名前の付いたメッセージを送り合って通信します。`socket.emit(name, data)` はメッセージを送信し、`socket.on(name, callback)` はメッセージが届いたときに関数を実行します。このプロジェクトでは6つのメッセージを使います。

| メッセージ | 送信元 | 意味 |
| --- | --- | --- |
| `initialize` | クライアント（接続時） | 「準備ができました。誰がプレイしていますか？」 |
| `playerData` | サーバー（そのクライアントへ） | そのクライアント自身のIDと、すべてのプレイヤーの位置。サーバーがそのクライアントのために選んだ開始位置も含みます |
| `playerJoined` | サーバー（他のすべてのクライアントへ） | 新しいプレイヤーとその位置 |
| `positionUpdate` | クライアント（自分のプレイヤーが動いたとき） | プレイヤーの新しい位置 |
| `playerMoved` | サーバー（他のすべてのクライアントへ） | プレイヤーのIDと新しい位置 |
| `playerLeft` | サーバー（他のすべてのクライアントへ） | 切断したプレイヤーのID |

サーバー側では、`socket.emit` はその `socket` が属する1つのクライアントに返信し、`socket.broadcast.emit` はそのクライアント以外のすべてのクライアントに送信します。

プロジェクトをシンプルに保っている点が2つあります。

- `network` スクリプトは、位置が変わったときにだけ位置を送信します。そのため、立ち止まっているプレイヤーは何も送信しません。
- `Other` のコピーには物理がありません。サーバーが伝えた他のプレイヤーの位置に、そのまま配置されます。

## 7. サーバーをオンラインに公開する {#put-the-server-online}

自分のコンピューター上のサーバーには、自分のコンピューターからしか接続できません。他の人とプレイするには、同じ `server.js` をホスティングサービスで実行します。次の条件を満たすサービスであれば、どれでも使えます。

- Node.jsのプログラムを継続して実行できること。要求があったときに短い関数を実行するだけのサービスでは、接続を開いたままにできません。
- WebSocket接続を受け付けること。
- サーバーに `https://` のアドレスが与えられること。パブリッシュしたPlayCanvasのゲームはHTTPSで配信されます。ブラウザは、HTTPSのページが安全でないアドレスに接続することを、自分のコンピューター上のアドレスを除いて許可しません。

ほとんどのサービスは、サーバーが待ち受けるポートを `PORT` 環境変数で伝えます。`server.js` はすでにこの変数を読み取っています。

手順はどのサービスでもほぼ同じです。

1. `server.js`、`package.json`、`package-lock.json` をGitリポジトリに入れます。`node_modules` フォルダーは含めません。
2. ホスティングサービスで、そのリポジトリからWebサービスを作成します。入力を求められた場合、ビルドコマンドは `npm install`、起動コマンドは `node server.js` です。
3. サービスから与えられたアドレスの後ろに `/socket.io/?EIO=4&transport=polling` を付けて、ブラウザで開きます。`0{"sid":` で始まる応答が返ってくれば、サーバーは実行されています。
4. エディターで **Root** を選択し、`network` スクリプトの `serverUrl` 属性をそのアドレスに変更します。たとえば `https://my-multiplayer-server.example.com` です。
5. プロジェクトを **Launch** して接続できることを確認してから、[パブリッシュ](/user-manual/editor/publishing/)します。

:::info[一例]

この記事を書いている2026年11月の時点では、[Render](https://render.com/docs/free)に、3つの条件をすべて満たす無料のWebサービスがあります。トラフィックのない状態が15分続くとスリープし、復帰には1分ほどかかります。そのため、最初に来たプレイヤーは、他のプレイヤーが表示されるまで待つことになります。ホスティングのプランは変わることがあるので、利用する前にサービスの内容を確認してください。

:::

ゲームをパブリッシュしたら、自分のページだけがサーバーを使えるようにします。`server.js` の `origin: '*'` を、ゲームが配信されるアドレスに置き換えます。

```javascript
cors: {
    origin: ['https://playcanv.as', 'https://launch.playcanvas.com']
}
```

## 次のステップ {#where-next}

試してみるとよいこと:

- 各プレイヤーに名前や色を付ける。サーバーが選び、`playerData` で送信します。
- 位置の送信を1秒間に最大20回までにし、更新の合間は他のカプセルを滑らかに動かす。
- サーバーで各 `positionUpdate` を確認し、前回の位置から、プレイヤーが移動できたはずの距離より離れているものは無視する。地面から落ちたプレイヤーは歩くときより速く動き、そのあと中央に戻るので、どちらも許容してください。

### ゲームをどこで実行するか {#where-the-game-runs}

このプロジェクトでは、各ブラウザが自分のプレイヤーの物理を実行し、そのプレイヤーの位置をサーバーに伝えます。サーバーは位置を確認せずにそのまま中継します。そのためサーバーは小さく済み、プレイヤーはキー操作にすぐ反応します。プレイヤー同士が協力するゲームや、勝ち負けが重要でないゲームにはこれで十分です。ただし、代償が3つあります。

- **簡単に不正ができる**。サーバーは、クライアントが送る位置をすべて信用します。
- **プレイヤー同士がすり抜ける**。各ブラウザは自分のカプセルだけをシミュレーションし、他のカプセルは描画するだけです。他のカプセルにRigid Bodyを追加しても完全な解決にはなりません。衝突はそれぞれのブラウザが別々に計算しますし、自分のプレイヤーの内側に現れたカプセルは、プレイヤーをシーンの向こうへ弾き飛ばします。
- **何も共有できない**。2人のプレイヤーが押したボールは、ウィンドウごとに違う場所に行き着きます。

これらの代償を受け入れられないゲームは、ゲームそのものをサーバーで実行します。これを権威サーバー（authoritative server）と呼びます。各クライアントはキー操作を送り、サーバーがすべてのプレイヤーの物理を実行して結果を返します。そのためにはサーバーにも独自の物理エンジンが必要で、各クライアントは遅延を隠すために自分の動きを予測しなければならないので、はるかに大きなプロジェクトになります。

これらをすべて自分で書く必要はありません。マルチプレイヤーのフレームワークやホスト型のサービスを使って作るには、[Colyseusを使ったリアルタイムマルチプレイヤー](/tutorials/real-time-multiplayer-colyseus/)と[Photonを使用したリアルタイムマルチプレイヤー](/tutorials/real-time-multiplayer-photon/)を参照してください。
