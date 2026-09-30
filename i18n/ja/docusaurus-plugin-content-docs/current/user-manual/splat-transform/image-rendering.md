---
title: 画像のレンダリング
description: "splat-transformでGaussian splatシーンをロスレスWebP画像にレンダリング：カメラの設定、360°パノラマ、被写界深度、モーションブラー、カメラアニメーションの連番フレーム。"
---

[SplatTransform](/user-manual/splat-transform/) は、指定したカメラビューからスプラットシーンをロスレスWebP画像にレンダリングできます。出力に `.webp` 拡張子を付けると、シーンはスプラットデータとして書き込まれる代わりにGPUでラスタライズされます。サムネイル、プレビュー、パノラマ、カメラアニメーションの連番フレームなどに使用できます。

レンダリングにはGPUが必要で、`-g cpu` では実行できません。[GPUが必要な機能](/user-manual/splat-transform/cli-reference#which-features-need-a-gpu)と、サーバーで実行する場合は[Docker バックエンド](/user-manual/splat-transform/docker)ガイドを参照してください。

## カメラの設定 {#setting-up-the-camera}

デフォルトでは、カメラは `2,1,-2` に置かれ、垂直視野角60°で原点を向き、不透明な黒い背景で1280x720のサイズでレンダリングします：

```bash
# デフォルトの 1280x720 でレンダリング
splat-transform input.ply view.webp

# カスタムカメラと解像度
splat-transform input.ply view.webp \
    --camera-pos 2,1,-2 --camera-target 0,0,0 \
    --camera-fov 50 --resolution 1920x1080

# 透明な背景
splat-transform input.ply view.webp --background 0,0,0,0
```

`--camera-up` はワールドの上方向ベクトルを設定します（デフォルトは `0,1,0`）。`--camera-near` はニアクリップ距離を設定します（デフォルトは `0.2` で、リファレンスの3DGSラスタライザと同じです）。カメラからこの距離より近いスプラットはカリングされます。

## 360°パノラマ {#360-panoramas}

`--projection equirect` は、`--camera-pos` から見た360°×180°の正距円筒図法パノラマ全体をレンダリングします。`--camera-target` は画像の中央に来る視線方向を決めます。解像度は2:1である必要があり（デフォルトは2048x1024）、`--camera-fov` は省略する必要があります：

```bash
# カメラ位置からの360°正距円筒図法パノラマ
splat-transform input.ply pano.webp \
    --projection equirect --camera-pos 0,1,0 --camera-target 0,1,1
```

この投影法では被写界深度は使用できません。

## 被写界深度 {#depth-of-field}

`--f-stop` はデフォーカスブラーを有効にし、カメラをその絞り値を持つレンズとして扱います。数値が小さいほどぼけが強くなります。焦点面のデフォルトは `--camera-target` までの距離です。別の位置に焦点を合わせるには `--focus-distance` を設定します。

```bash
# デフォーカスブラー（--camera-target に焦点、f/2.8 の絞り）
splat-transform input.ply view.webp --f-stop 2.8

# 強くぼけたエッジのために、より滑らかな絞りサンプリング
splat-transform input.ply view.webp --f-stop 1 --dof-samples 64

# 明示的な焦点距離と、より小さいワールドスケールでのデフォーカス
splat-transform input.ply view.webp \
    --f-stop 2.8 --focus-distance 3 --sensor-size 0.1
```

F値はセンサーサイズとの関係で初めて意味を持ちます。`--sensor-size` はワールド単位でのセンサーの垂直方向の高さで、デフォルトの `0.024` は1ワールド単位が1メートルの場合の35mmフルサイズセンサーに相当します。シーンの単位に合わせて調整してください。1ワールド単位がデシメートルなら `0.24`、ミリメートルなら `24` です。

各画像は、絞り全体にわたる `--dof-samples` 個のビューを平均します（デフォルトは32）。サンプル数を増やすと、強くぼけた領域のサンプリングアーティファクトが減りますが、レンダリングパスが増えます。

## モーションブラー {#motion-blur}

`--camera-pos-end` を設定すると、カメラのモーションブラーが有効になります。カメラはシャッターが開くときの開始ポーズ（`--camera-pos`、`--camera-target`、`--camera-up`）からシャッターが閉じるときの終了ポーズまで移動し、画像はシャッター期間中の `--motion-samples` 個の瞬間のレンダリングを平均します。`--camera-target-end` と `--camera-up-end` のデフォルトは開始時の値です。

```bash
# カメラモーションブラー（180°シャッターで開始ポーズから終了ポーズへドリー移動、16の瞬間を平均）
splat-transform input.ply view.webp \
    --camera-pos 2,1,-2 --camera-pos-end 3,1,-2 \
    --shutter 0.5 --motion-samples 16
```

`--shutter` は、開始→終了の移動のうち平均される割合で、その中点を中心とします。`1.0` で移動全体をカバーし、デフォルトの `0.5` は180°シャッターです。レンダリングのコストは `--motion-samples` に比例して増えます。サンプル数が少なすぎると、瞬間間の動きが数ピクセルを超える部分が離散的な複製として見えます。

### 効果の組み合わせ {#combining-effects}

被写界深度とモーションブラーは、サンプルごとに可視性を個別に解決してから、最終画像をエンコードする前にリニア空間で平均します。再構成されたスプラットの色はsRGBとして扱われ、透明な出力では平均化の際にプリマルチプライされたリニアカラーが使用されます。両方の効果を有効にすると、シャッターの各瞬間で `--dof-samples` 個の絞りビューが使用されるため、コストは掛け算で増えます。

## カメラアニメーション {#camera-animations}

`--camera-track` は、単一のビューの代わりに、カメラアニメーションを連番のフレームシーケンスとしてレンダリングします。トラックには、[SuperSplat](/user-manual/supersplat/)エディターのプロジェクト、`animTracks` を含む[ビューア設定](https://github.com/playcanvas/supersplat-viewer?tab=readme-ov-file#settings-schema)の `settings.json`、またはプレーンなフレームリストを使用できます。保存された `.ssproj` はZIPアーカイブなので、先に展開し、展開したディレクトリまたはその `document.json` を渡してください。フレームリストは次のようになります：

```json
{
    "frameRate": 30,
    "frames": [
        { "position": [2, 1, -2], "target": [0, 0, 0], "fov": 60 },
        { "position": [2.1, 1, -1.9], "target": [0, 0, 0], "fov": 60, "up": [0, 1, 0] }
    ]
}
```

エディターのプロジェクトとビューア設定は、エディターやビューアでの再生と同じ方法で評価されます。フレームリストはエントリ間で線形補間されます。`frameRate` のデフォルトは30で、`fov` のないフレームは `--camera-fov` を、`up` のないフレームは `--camera-up` を使用します。各フレームは `<name>.NNNN.webp` として書き込まれ、トラック内のフレームインデックスで番号付けされます。

```bash
# 展開したSuperSplatプロジェクトのカメラアニメーションの全フレームをレンダリング
# （view.0000.webp、view.0001.webp、... を書き込みます）
splat-transform scene.ply view.webp --camera-track scene-project/

# フレーム0〜47を1920x1080でレンダリングし、各フレーム間隔の半分にわたってモーションブラーを適用
splat-transform scene.ply view.webp --camera-track track.json \
    --frames 0-47 --resolution 1920x1080 --shutter 0.5
```

トラックは `--camera-pos` と `--camera-target` を置き換え、トラックのターゲットは被写界深度の焦点にもなります。トラックのモーションブラーは `--shutter` だけで制御されます。デフォルトではオフで、設定すると各フレームがフレーム間隔のその割合にわたってブラーされます。`--camera-pos-end` はトラックと組み合わせられません。

## 関連項目 {#see-also}

- [画像出力オプション](/user-manual/splat-transform/cli-reference#image-output-options) — すべてのレンダリングオプションとそのデフォルト値。
- [SuperSplat エディター → タイムライン](/user-manual/supersplat/editor/timeline) — `--camera-track` でレンダリングするカメラアニメーションの作成。
- [ライブラリの使用](/user-manual/splat-transform/library) — `writeImage` と `loadCameraTrack` を使ったJavaScriptからのレンダリング。
