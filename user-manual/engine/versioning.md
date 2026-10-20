# Versioning and Releases

The PlayCanvas Engine follows [semantic versioning](https://semver.org/). Every release has a version number of the form `major.minor.patch`, such as `2.23.3`.

:::important

In rare cases, a minor release has included a breaking change. For example, 2.5.0 changed how `ShaderMaterial` handles gamma correction, tone mapping and fog. We work hard to avoid this, and any such change is listed in [Engine Migrations](https://developer.playcanvas.com/user-manual/engine/migrations.md).

:::

## Choosing Which Updates to Accept

When you run `npm install playcanvas`, npm records the Engine in your `package.json` with a caret (`^`) range, such as `"playcanvas": "^2.23.3"`. A caret range accepts any later 2.x release, so updating your dependencies can move you to a new minor version. To accept fewer updates, install with a different range:

| Updates accepted | Command | `package.json` entry |
| --- | --- | --- |
| Minor and patch releases (npm's default) | `npm install playcanvas` | `"^2.23.3"` |
| Patch releases only | `npm install playcanvas@~2.23.3` | `"~2.23.3"` |
| None (one exact version) | `npm install playcanvas --save-exact` | `"2.23.3"` |

The range decides which version `npm update` can move to, and what a fresh install resolves to when there is no lockfile. `package-lock.json` still records the exact version you have installed, and `npm ci` installs that version. None of these ranges selects a beta, preview or alpha build, so you only get one of those by [asking for its tag](https://developer.playcanvas.com/user-manual/engine/versioning.md#npm-tags).

If you load the Engine from a CDN instead, put the version in the URL, for example `https://cdn.jsdelivr.net/npm/playcanvas@2.23.3/+esm`. A URL without a version always loads the latest release.

## Release Types

| Release | Example | Contents |
| --- | --- | --- |
| Patch | 2.23.2 → 2.23.3 | Bug fixes only. No API changes. |
| Minor | 2.22.6 → 2.23.0 | New features. Existing APIs may be deprecated: they keep working, and the debug Engine logs a warning when you use one. |
| Major | 1.x → 2.0.0 | Large API changes. Engine v2 removed WebGL 1 support and the legacy scripting system, along with many deprecated APIs. |

## npm Tags

As well as stable releases, the Engine publishes prerelease builds to npm. Each kind of build has its own tag:

| Tag | Version format | Contents |
| --- | --- | --- |
| `latest` | `X.Y.Z` | The current stable release. `npm install playcanvas` installs this. |
| `beta` | `X.Y.0-beta.N` | A build of the `main` branch toward the next minor release, made each night at 02:00 UTC if `main` has changed since the last beta. It contains merged features that have not been through release testing yet. |
| `preview` | `X.Y.Z-preview.N` | Published when a minor or patch release is being prepared on its `release-X.Y` branch, before the release is final. Recent releases have followed within minutes, so this tag often points at a version older than `latest`. |
| `alpha` | `X.Y.Z-alpha.PR.N` | An occasional build of a pull request, made so the change can be tested before it merges, for example on mobile devices. Don't use it in projects. |
| `lts` | `1.Y.Z` | The latest Engine v1 release. Engine v1 receives critical fixes only. See [Engine Compatibility](https://developer.playcanvas.com/user-manual/editor/engine-compatibility.md). |

To install a tagged build, add the tag to the package name:

```bash
npm install playcanvas@beta
```

To see which version each tag currently points at, run:

```bash
npm view playcanvas dist-tags
```

## Editor Projects

Editor projects don't install the Engine from npm. Instead, you choose which Engine release is used to launch, publish and download your project in the Editor's [Engine Settings](https://developer.playcanvas.com/user-manual/editor/interface/settings/engine.md).
