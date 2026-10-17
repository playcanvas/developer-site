---
title: Semantic Versioning
sidebar_position: 3
---

The engine supports both prereleases and releases. This page outlines the hierarchy of each version type and what they represent.

<!-- ### `alpha`

An alpha prerelease is the most unstable type of release purely for testing features in a branch for a PR. This is useful for mobile debugging and profiling new ideas without having to deploy a full release. -->

### `beta`

A beta prerelease represents all the latest features that have been approved from the PR stage and have been merged into `main` the main development branch. These features have been initially tested but not gone through a more thorough testing process like for an official minor release. This is useful if you have some new API you want to take advantage for in other projects but do not want to build the engine from source as a submodule.

### `preview`

A preview prerelease is the last type of prerelease which contains all the latest features or breaking changes prior to a minor release or bug fixes prior to a patch release. This is useful for testing large and complex projects in the Editor and additionally mobile testing and profiling.

### `patch`

This is the smallest type of release following [semantic versioning](https://semver.org/). The Editor will only show the latest patch version for any particular minor release.

### `minor`

This type of release follows the standard outlined by [semantic versioning](https://semver.org/). Occasionally we may have **breaking changes in minor releases** but these are rare and will be notified of in advance. As such the Editor supports both the latest minor and the previous minor to allow for migrations in API to occur across larger projects.

:::important

If you are using the engine with NPM it is recommended to use the `~X.X.X` notation to pin the major and minor version numbers and only update to the latest patch.

:::

### `major`

This type of release is reserved for large changes or additions to the engine API. A recent example of such was the addition of full WebGPU support and the removal of WebGL 1.0 support moving from v1.x.x to v2.x.x.
