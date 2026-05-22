---
title: Docker バックエンド
description: "AWS GPU インスタンスや CPU 専用バリアントを含む、NVIDIA GPU 付きの Linux ホストでコンテナ化されたバックエンドとして splat-transform を実行します。"
---

このガイドでは、NVIDIA GPU 付きの Linux ホストで [splat-transform](/user-manual/splat-transform/) をコンテナ化されたバックエンドサービスとして実行する方法を説明します。

## このガイドが必要な場合

`splat-transform` は Node.js CLI で、公開された npm パッケージは Node 22+ が動作するところであればどこでも動作します — Docker は厳密には必要ありません。

いくつかの機能は **GPU 専用**で、WebGPU なしでは動作しません：

- `--filter-cluster` と `--filter-floaters`。
- `.voxel.json` 出力と `-K` / `--collision-mesh`（[コリジョンメッシュ](/user-manual/splat-transform/collision)ガイドを参照）。

いくつかは **GPU 加速されているがオプション**です：

- SOG / `meta.json` / `lod-meta.json` / `.html` ビューア出力（[SOG 圧縮オプション](/user-manual/splat-transform/#sog-compression-options)を参照）。このライター内で GPU を使用する唯一のステップは球面調和係数の k-means クラスタリングなので：
  - SH バンドを**持たない**入力（例：`.splat`、SH を取り除いた PLY、または `-H 0` / `--filter-harmonics 0` を経由したもの）は SOG を完全に CPU で書き込みます。
  - SH バンドを**持つ**入力も `-g cpu` で CPU で動作しますが、SH クラスタリングは GPU なしではおおよそ 5-10 倍遅くなります。

すべての GPU パスは WebGPU を経由し、Linux 上では Vulkan で実装されています。これが下記のホストおよびコンテナの要件を定めています。

GPU 専用機能を必要とせず、SH 圧縮の CPU コストを許容できる（または入力に SH がない）場合は、[CPU 専用バリアント](#cpu-only-variant) にスキップしてください。

## ホストの前提条件（Docker の外側）

これらはホストマシン上で構成する必要があります — コンテナ内からはインストールできません。コンテナはホストの NVIDIA ドライバと Vulkan ICD を再利用するためです。

1. Vulkan ICD を公開するドライバを持つ **NVIDIA GPU**（ほとんどのコンシューマドライバは公開していますが、一部のヘッドレスクラウドドライバはデフォルトで公開していません）。
2. **[NVIDIA Container Toolkit](https://docs.nvidia.com/datacenter/cloud-native/container-toolkit/latest/install-guide.html)** がインストールおよび構成された **Docker Engine**。これが `--gpus all` を機能させ、ランタイムにホストの NVIDIA ドライバライブラリ（Vulkan ICD JSON を含む）をコンテナに投影します。
3. **（オプション）ホスト上の `vulkan-tools`** — Docker の外側からドライバをサニティチェックするのに便利です（例：コンテナを起動する前にホストで `vulkaninfo --summary`）。コンテナは下記の Dockerfile でインストールされる `vulkan-tools` apt パッケージを介して独自の Vulkan ローダーを持ってきます。

### AWS GPU インスタンス

Amazon Linux 2023 を実行する AWS GPU インスタンス（`g4dn`、`g5`、`g6` など）では、デフォルトのドライバは*コンピュート専用*の Tesla ドライバで、Vulkan を含みません。WebGPU パスを使用するには、ホストに **NVIDIA GRID Driver v19.2 以降**をインストールする必要があります — GRID ドライバは Tesla ドライバには含まれていない Vulkan ICD を出荷します。

NVIDIA は GRID インストーラを S3 バケットでホストしているため、EC2 インスタンスロールに `AmazonS3ReadOnlyAccess` ポリシーがアタッチされている必要があります。

まず更新と再起動：

```bash
sudo dnf update -y
sudo reboot
```

再起動後、ドライバをインストールしてもう一度再起動：

```bash
sudo aws s3 cp --recursive s3://ec2-linux-nvidia-drivers/grid-19.2/ .   # v580.x.x をインストール
sudo chmod +x NVIDIA-Linux-x86_64*.run
sudo ./NVIDIA-Linux-x86_64*.run
sudo reboot
```

Vulkan ローダー、ツール、`libXext`（`vulkaninfo` がリンクする）をインストール：

```bash
sudo dnf install vulkan vulkan-tools libXext
```

ホストからドライバと Vulkan ICD を検証：

```bash
nvidia-smi             # ドライババージョン、GPU モデル
vulkaninfo --summary   # 物理デバイスを持つ NVIDIA Vulkan ICD
```

これはホスト/OS レベル — コンテナ内からは実行できません。次のセクションの Dockerfile は、ドライバと Vulkan パッケージが既にホストにインストールされていることを前提としています。

## 最小限の Dockerfile

NVIDIA CUDA + Vulkan ベースイメージの上に公開された CLI をインストールする、最小限のマルチステージ Dockerfile：

```dockerfile
# syntax=docker/dockerfile:1.4

# リモートインストールスクリプトを bash にパイプするのではなく
# 公式イメージから Node.js を取得します。
FROM node:22-slim AS node

FROM nvidia/cuda:12.8.1-devel-ubuntu22.04

# NVIDIA Container Toolkit がランタイムにホストの NVIDIA ドライバ
# ライブラリと Vulkan ICD をコンテナに投影できるように、
# compute + graphics + utility capabilities を公開します。
ENV NVIDIA_DRIVER_CAPABILITIES=compute,graphics,utility

RUN apt-get update \
    && apt-get install -y --no-install-recommends \
        ca-certificates \
        vulkan-tools \
        libgl1 libglvnd0 libglx0 libegl1 libxext6 \
    && rm -rf /var/lib/apt/lists/*

# 公式イメージから Node.js と npm を持ってきます。
COPY --from=node /usr/local/bin/ /usr/local/bin/
COPY --from=node /usr/local/lib/node_modules/ /usr/local/lib/node_modules/

RUN npm install -g @playcanvas/splat-transform

RUN useradd --create-home --uid 2000 splat
USER splat
WORKDIR /work

ENTRYPOINT ["splat-transform"]
```

各部分が何をしているかについてのいくつかのメモ：

- `nvidia/cuda:...-devel-ubuntu22.04` — NVIDIA Container Toolkit が認識する CUDA 対応のベースイメージを提供します。CUDA ツールキット自体は `splat-transform` では使用されません；`--gpus all` がホストの NVIDIA ドライバと Vulkan ICD を正しく投影するベースが必要なだけです。
- `NVIDIA_DRIVER_CAPABILITIES=compute,graphics,utility` — `graphics` が重要です；これなしではツールキットは Vulkan ICD をマウントしません。
- `vulkan-tools` — `vulkaninfo`（デバッグに役立つ）を提供し、コンテナが必要とする Vulkan ローダーをプルインします。
- `libgl1`、`libglvnd0`、`libglx0`、`libegl1`、`libxext6` — Vulkan/EGL ドライバが依存するランタイムライブラリ。
- `node:22-slim` ステージ + `COPY --from=node` — サードパーティのインストールスクリプトを `bash` にパイプすることなく Node.js と npm を提供します。
- `npm install -g @playcanvas/splat-transform` — 公開された CLI を `PATH` にインストールします。
- 非 root の `splat` ユーザーはバッチワーカーには良いデフォルトで、ホストにマウントされたディレクトリに書き込まれるファイルが root に所有されないようにします。

## ビルドと実行 {#build-and-run}

イメージをビルド：

```bash
docker build -t splat-transform .
```

現在のディレクトリを `/work` としてマウントして変換を実行：

```bash
docker run --rm --gpus all -v "$PWD":/work splat-transform \
    input.ply output.sog
```

イメージは非 root ユーザー（UID 2000）として実行されるため、ホストにマウントされたディレクトリに書き込まれるファイルはホストユーザーではなく UID 2000 に所有され、ホストディレクトリが UID 2000 によって書き込み可能でない場合、コンテナはまったく書き込みに失敗します。ポータブルな修正は `--user "$(id -u):$(id -g)"` を渡すことです：

```bash
docker run --rm --gpus all --user "$(id -u):$(id -g)" \
    -v "$PWD":/work splat-transform input.ply output.sog
```

残りの例は簡潔さのために `--user` を省略しています — ホストディレクトリをマウントする呼び出しには追加してください。

通常の `splat-transform` 呼び出しはすべて機能します — 完全な CLI サーフェスについては [CLI リファレンス](/user-manual/splat-transform/) を参照してください。例えば：

```bash
# GPU SOG 圧縮
docker run --rm --gpus all -v "$PWD":/work splat-transform \
    -i 20 input.ply output.sog

# ボクセル + コリジョンメッシュ
docker run --rm --gpus all -v "$PWD":/work splat-transform \
    room.ply --filter-cluster --seed-pos 0,1,0 \
    --voxel-external-fill --voxel-carve \
    -K room.voxel.json
```

## GPU アクセスの検証

2つの簡単なチェックで GPU が見えていることを確認できます。

CLI 経由で GPU アダプタを一覧表示：

```bash
docker run --rm --gpus all splat-transform --list-gpus
```

GPU の名前を持つ少なくとも1つの Vulkan アダプタが表示されるはずです（例：`NVIDIA L4`、`Tesla T4`）。

Vulkan を直接サニティチェック：

```bash
docker run --rm --gpus all --entrypoint vulkaninfo splat-transform --summary
```

`vulkaninfo` は NVIDIA の `driverID` を持つ `GPU0` セクションを出力するはずです。これが失敗した場合、問題はイメージではなくホストのセットアップ（ドライバ / NVIDIA Container Toolkit / Vulkan ICD）です。

## CPU 専用バリアント {#cpu-only-variant}

GPU 専用機能（`--filter-cluster`、`--filter-floaters`、`.voxel.json`、`-K`）が必要なければ、GPU のセットアップを完全にスキップして、はるかに小さいベースイメージを使用できます。SOG / `meta.json` / `lod-meta.json` / `.html` 出力もこのイメージで動作します — SH 圧縮ステップは CPU にフォールバックします：

```dockerfile
FROM node:22-slim
RUN npm install -g @playcanvas/splat-transform
WORKDIR /work
ENTRYPOINT ["splat-transform"]
```

`--gpus` なしで実行：

```bash
docker run --rm -v "$PWD":/work splat-transform input.ply output.ply
```

GPU イメージとは異なり、`node:22-slim` はデフォルトで root として実行されるため、`--user` なしではバインドマウントされたホストディレクトリに書き込まれるファイルはホストで root に所有されます。`--user "$(id -u):$(id -g)"` を渡す（[ビルドと実行](#build-and-run) で説明されているとおり）か、このイメージが共有用途であれば Dockerfile に非 root の `USER` 行を追加してください。

GPU イメージを維持しつつ、単一の実行で CPU モードを強制したい場合は、`-g cpu` を渡します：

```bash
docker run --rm -v "$PWD":/work splat-transform -g cpu input.ply output.sog
```

`-g cpu` は GPU 専用機能（`--filter-cluster`、`--filter-floaters`、`.voxel.json`、`-K`）と互換性がないことに注意してください。CPU 側の SH 圧縮も GPU よりおおよそ 5-10 倍遅くなります。

## トラブルシューティング

- **`--list-gpus` がアダプタを報告しない。** Vulkan ICD がコンテナに届いていません。`--gpus all` で実行したこと、`NVIDIA_DRIVER_CAPABILITIES` に `graphics` が含まれていること、NVIDIA Container Toolkit がホストにインストールおよび構成されていることを確認してください。
- **`vulkaninfo` が `Could not find a Vulkan ICD` を報告する。** ホストの NVIDIA ドライバが Vulkan を公開していません。AWS では Tesla ドライバから GRID ドライバ（v19.2+）に切り替えて再インストールし、ホストに `vulkan vulkan-tools libXext` をインストールしてください。
- **`vulkaninfo` がセグフォルトするか `libXext.so.6` のロードに失敗する。** `libxext6` がイメージから欠落しています — Dockerfile の `apt-get install` 行に含まれていること（および AWS では `libXext` がホストにもインストールされていること）を確認してください。
- **`docker: Error response from daemon: could not select device driver "" with capabilities: [[gpu]]`。** NVIDIA Container Toolkit がインストールされていないか、Docker デーモンが構成を取得していません。ツールキットを再インストールし、Docker を再起動してください。
- **バインドマウントされたディレクトリ内の出力がホストユーザーに所有されていない。** コンテナのデフォルトユーザー（GPU イメージでは UID 2000、slim イメージでは root）がホストの UID と一致しません。`--user "$(id -u):$(id -g)"` を `docker run` に渡してそれらを揃えるか、マウントする前にコンテナの UID に出力ディレクトリを `chown` してください。
- **バインドマウントされたディレクトリへの書き込みで `Permission denied`。** コンテナのデフォルトユーザーがホストディレクトリへの書き込みアクセス権を持ちません。`--user "$(id -u):$(id -g)"` を使用するか、コンテナユーザーが書き込めるようにホストディレクトリを `chown` してください。
- **コンテナ内で `splat-transform: command not found`。** ビルド中に `npm install -g @playcanvas/splat-transform` が正常に実行されたことを確認してください。デフォルトのエントリポイントはすでにバイナリを呼び出しているため、`splat-transform` を指定しなくても `docker run <image> --help` が動作するはずです。
