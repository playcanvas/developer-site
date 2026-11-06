---
title: Docker Backend
description: "Run splat-transform as a containerised backend on a Linux host with an NVIDIA GPU, including AWS GPU instances and a CPU-only variant."
---

This guide explains how to run [splat-transform](/user-manual/splat-transform/) as a containerised backend service on a Linux host with an NVIDIA GPU.

## When you need this

`splat-transform` is a Node.js CLI and the published npm package runs anywhere Node 22+ runs — Docker is not strictly required.

A few features are **GPU-only** and will not run without WebGPU: `--filter-cluster`, `--filter-floaters`, `.voxel.json` output and `--collision-mesh` (see the [Collision Mesh](/user-manual/splat-transform/collision) guide), and `.webp` image output (see [Rendering Images](/user-manual/splat-transform/image-rendering)). Decimation and SOG output use the GPU by default but also run on the CPU; SOG output with spherical harmonics is roughly 5-10x slower that way. [Which Features Need a GPU](/user-manual/splat-transform/cli-reference#which-features-need-a-gpu) has the full breakdown.

All GPU paths go through WebGPU, which on Linux is implemented over Vulkan. That sets the host and container requirements below.

If you don't need the GPU-only features and you're happy paying the CPU cost for SH compression (or your inputs have no SH), skip to the [CPU-only variant](#cpu-only-variant).

## Host prerequisites (outside Docker)

These must be configured on the host machine — they cannot be installed from inside a container, because the container reuses the host's NVIDIA driver and Vulkan ICD.

1. **NVIDIA GPU** with a driver that exposes a Vulkan ICD (most consumer drivers do; some headless cloud drivers do not by default).
2. **Docker Engine** with the **[NVIDIA Container Toolkit](https://docs.nvidia.com/datacenter/cloud-native/container-toolkit/latest/install-guide.html)** installed and configured. This is what makes `--gpus all` work and what projects the host's NVIDIA driver libraries (including the Vulkan ICD JSON) into the container at runtime.
3. **(Optional) `vulkan-tools` on the host** — useful for sanity-checking the driver from outside Docker (e.g. `vulkaninfo --summary` on the host before launching containers). The container brings its own Vulkan loader via the `vulkan-tools` apt package installed in the Dockerfile below.

### AWS GPU instances

AWS GPU instances such as `g4dn`, `g5` and `g6` can run the Vulkan backend with a compatible NVIDIA driver. **A GRID driver is not required solely for Vulkan support**: [AWS lists Vulkan among the APIs supported by Tesla, GRID and gaming drivers](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/install-nvidia-driver.html). The installation steps depend on your AMI.

For **EKS**, the [Amazon Linux 2023 NVIDIA accelerated AMI](https://docs.aws.amazon.com/eks/latest/userguide/ml-eks-optimized-ami.html) (`AL2023_x86_64_NVIDIA`) includes the NVIDIA driver and NVIDIA Container Toolkit. PlayCanvas uses this AMI on `g5.4xlarge` and `g5.8xlarge` instances with NVIDIA A10G GPUs, without a separate GRID driver installation. Install the NVIDIA Kubernetes device plugin and request `nvidia.com/gpu: 1` for each GPU worker pod.

For **standalone Docker or other AMIs**, follow the host prerequisites above and the [AWS driver installation options](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/install-nvidia-driver.html) for your instance and operating system. EKS is not required. Check the existing driver and Vulkan support before replacing drivers; install `vulkan-tools` if the diagnostic command below is unavailable.

Verify the driver and Vulkan ICD from the host:

```bash
nvidia-smi             # driver version, GPU model
vulkaninfo --summary   # NVIDIA Vulkan ICD with a physical device
```

The NVIDIA driver and container runtime integration must be configured on the host. The Dockerfile below installs the container-side Vulkan loader and libraries; verify GPU access inside the container as well.

## Minimal Dockerfile

A minimal multi-stage Dockerfile that installs the published CLI and Vulkan dependencies on Ubuntu 22.04. The CUDA toolkit is not used by `splat-transform`, so a CUDA base image is unnecessary:

```dockerfile
# syntax=docker/dockerfile:1.4

# Pull Node.js from the official image rather than piping a remote
# install script to bash.
FROM node:22-slim AS node

FROM ubuntu:22.04

# Expose compute + graphics + utility caps so the NVIDIA Container Toolkit
# projects the host's NVIDIA driver libraries and Vulkan ICD into the
# container at runtime.
ENV NVIDIA_VISIBLE_DEVICES=all
ENV NVIDIA_DRIVER_CAPABILITIES=compute,graphics,utility

RUN apt-get update \
    && apt-get install -y --no-install-recommends \
        ca-certificates \
        vulkan-tools \
        libgl1 libglvnd0 libglx0 libegl1 libxext6 \
    && rm -rf /var/lib/apt/lists/*

# Bring in Node.js and npm from the official image.
COPY --from=node /usr/local/bin/ /usr/local/bin/
COPY --from=node /usr/local/lib/node_modules/ /usr/local/lib/node_modules/

RUN npm install -g @playcanvas/splat-transform

RUN useradd --create-home --uid 2000 splat
USER splat
WORKDIR /work

ENTRYPOINT ["splat-transform"]
```

A few notes on what each part is doing:

- `ubuntu:22.04` — provides the base operating system. The NVIDIA Container Toolkit supplies the host driver libraries at runtime.
- `NVIDIA_VISIBLE_DEVICES=all` — exposes the GPUs made available to the container by Docker or Kubernetes.
- `NVIDIA_DRIVER_CAPABILITIES=compute,graphics,utility` — `graphics` is the important one; without it the toolkit will not mount the Vulkan ICD.
- `vulkan-tools` — provides `vulkaninfo` (useful for debugging) and pulls in the Vulkan loader the container needs.
- `libgl1`, `libglvnd0`, `libglx0`, `libegl1`, `libxext6` — runtime libraries Vulkan/EGL drivers depend on.
- `node:22-slim` stage + `COPY --from=node` — provides Node.js and npm without piping a third-party install script to `bash`.
- `npm install -g @playcanvas/splat-transform` — installs the published CLI on the `PATH`.
- The non-root `splat` user is a good default for batch workers and means files written into a host-mounted directory aren't owned by root.

## Build and run

Build the image:

```bash
docker build -t splat-transform .
```

Run a conversion, mounting the current directory as `/work`:

```bash
docker run --rm --gpus all -v "$PWD":/work splat-transform \
    input.ply output.sog
```

The image runs as a non-root user (UID 2000), so any files written into a host-mounted directory will be owned by UID 2000 rather than your host user, and the container will fail to write at all if the host directory isn't writable by UID 2000. The portable fix is to pass `--user "$(id -u):$(id -g)"`:

```bash
docker run --rm --gpus all --user "$(id -u):$(id -g)" \
    -v "$PWD":/work splat-transform input.ply output.sog
```

The remaining examples omit `--user` for brevity — add it to any invocation that mounts a host directory.

Any normal `splat-transform` invocation works — see the [CLI Reference](/user-manual/splat-transform/cli-reference) for the full CLI surface. For example:

```bash
# GPU SOG compression
docker run --rm --gpus all -v "$PWD":/work splat-transform \
    -i 20 input.ply output.sog

# Voxel + collision mesh
docker run --rm --gpus all -v "$PWD":/work splat-transform \
    room.ply --filter-cluster --seed-pos 0,1,0 \
    --voxel-external-fill --voxel-carve \
    --collision-mesh room.voxel.json
```

## Verifying GPU access

Two quick checks confirm the GPU is visible.

List GPU adapters via the CLI:

```bash
docker run --rm --gpus all splat-transform --list-gpus
```

You should see at least one Vulkan adapter named after your GPU (e.g. `NVIDIA L4`, `Tesla T4`).

Sanity-check Vulkan directly:

```bash
docker run --rm --gpus all --entrypoint vulkaninfo splat-transform --summary
```

`vulkaninfo` should print a `GPU0` section with an NVIDIA `driverID`. If this fails, check Vulkan on the host first, then check the NVIDIA Container Toolkit configuration, GPU allocation and container libraries.

## CPU-only variant

If you don't need the GPU-only features (`--filter-cluster`, `--filter-floaters`, `.voxel.json`, `--collision-mesh`, `.webp`) you can skip the GPU setup entirely and use a much smaller base image. SOG / `meta.json` / `lod-meta.json` / `.html` outputs still work in this image — the SH compression step falls back to CPU:

```dockerfile
FROM node:22-slim
RUN npm install -g @playcanvas/splat-transform
WORKDIR /work
ENTRYPOINT ["splat-transform"]
```

Run it without `--gpus`:

```bash
docker run --rm -v "$PWD":/work splat-transform input.ply output.ply
```

Unlike the GPU image, `node:22-slim` runs as root by default, so without `--user` the files written into a bind-mounted host directory will be owned by root on the host. Pass `--user "$(id -u):$(id -g)"` (as described in [Build and run](#build-and-run)), or add a non-root `USER` line to the Dockerfile if this image is for shared use.

If you keep the GPU image but want to force CPU mode for a single run, pass `-g cpu`:

```bash
docker run --rm -v "$PWD":/work splat-transform -g cpu input.ply output.sog
```

Note that `-g cpu` is incompatible with the GPU-only features (`--filter-cluster`, `--filter-floaters`, `.voxel.json`, `--collision-mesh`, `.webp`). CPU-side SH compression also runs roughly 5-10x slower than GPU.

## Troubleshooting

- **`--list-gpus` reports no adapters.** The Vulkan ICD is not reaching the container. Check that you ran with `--gpus all`, that `NVIDIA_DRIVER_CAPABILITIES` includes `graphics`, and that the NVIDIA Container Toolkit is installed and configured on the host.
- **`vulkaninfo` reports `Could not find a Vulkan ICD`.** Check that the host has a working NVIDIA Vulkan driver. If Vulkan works on the host, check that the container has GPU access and `NVIDIA_DRIVER_CAPABILITIES` includes `graphics`. On AWS, use a suitable driver or accelerated AMI as described above; a GRID driver is not automatically required.
- **`vulkaninfo` segfaults or fails to load `libXext.so.6`.** `libxext6` is missing from the image — make sure the `apt-get install` line in the Dockerfile includes it (and on AWS, that `libXext` is also installed on the host).
- **`docker: Error response from daemon: could not select device driver "" with capabilities: [[gpu]]`.** The NVIDIA Container Toolkit is not installed or the Docker daemon has not picked up its config. Reinstall the toolkit and restart Docker.
- **Outputs in the bind-mounted directory aren't owned by my host user.** The container's default user (UID 2000 in the GPU image, root in the slim image) doesn't match your host UID. Pass `--user "$(id -u):$(id -g)"` to `docker run` to align them, or `chown` the output directory to the container UID before mounting.
- **`Permission denied` writing to the bind-mounted directory.** The container's default user has no write access to the host directory. Use `--user "$(id -u):$(id -g)"`, or `chown` the host directory so the container user can write.
- **`splat-transform: command not found` inside the container.** Make sure `npm install -g @playcanvas/splat-transform` ran successfully during the build. The default entrypoint already invokes the binary, so `docker run <image> --help` should work without specifying `splat-transform`.
