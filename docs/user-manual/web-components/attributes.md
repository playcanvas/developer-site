---
title: Attributes
description: "How PlayCanvas Web Component attributes parse values: the shared defaults contract, the Type column, booleans, numbers, enums, vectors, colors, asset and material IDs, and entity references."
---

Every PlayCanvas Web Component is configured through HTML attributes. All attributes follow the same set of conventions, so once you have learned them, you can predict how any tag will behave.

## The Shared Contract

Every attribute obeys the same three rules:

| Markup | Result |
| --- | --- |
| Attribute set to a valid value | The value is applied |
| Attribute absent (or removed at runtime) | The engine default is applied |
| Attribute set to an invalid value | A console warning describes the problem and the engine default is applied |

The *Default* column in each tag's attribute table shows the value that applies when the attribute is absent. Because removing an attribute restores the default, you can freely toggle attributes at runtime (for example, from the browser's dev tools or with [`setAttribute()`](https://developer.mozilla.org/en-US/docs/Web/API/Element/setAttribute) and [`removeAttribute()`](https://developer.mozilla.org/en-US/docs/Web/API/Element/removeAttribute)) and the scene updates reactively.

Invalid values never reach the engine. Instead, you get a console warning naming the attribute and the expected format — keep the console open while authoring and typos surface immediately.

[`<pc-node>`](tags/pc-node.md) is the one exception to the middle row. Its attributes are overrides against a node inside a loaded model, so an absent attribute restores the value that model was authored with rather than the engine default.

## The Type Column

The *Type* column of each attribute table names how a value is written. Every type is defined on this page:

| Type | Written as |
| --- | --- |
| Boolean | `"true"`, `"false"`, or bare presence — see [Booleans](#booleans) |
| Number | Any finite number — see [Numbers](#numbers) |
| Enum | One of a fixed set of names, listed in the attribute's description — see [Enums](#enums) |
| Vector2, Vector3, Vector4 | Two, three or four space-separated numbers — see [Vectors](#vectors) |
| Color | A CSS color name, a hex code, or three or four numbers — see [Colors](#colors) |
| String | Free text: a name, a path, a JSON object |
| Asset ID, Material ID | The `id` of a [`<pc-asset>`](tags/pc-asset.md) or a [`<pc-material>`](tags/pc-material.md) — see [Asset and Material IDs](#asset-and-material-ids) |
| Entity Reference | An entity `name`, or a `#` selector — see [Entity References](#entity-references) |

## Booleans

A boolean attribute is `true` when present with any value other than `"false"` — including the empty value of a bare attribute — and `false` when set to `"false"`:

| Markup | Result |
| --- | --- |
| `cast-shadows` (bare presence) | `true` |
| `cast-shadows="true"` (or any value other than `"false"`) | `true` |
| `cast-shadows="false"` | `false` |
| Attribute absent or removed | Engine default |

```html
<!-- Bare presence enables a default-false option -->
<pc-light type="directional" cast-shadows></pc-light>

<!-- Setting "false" disables a default-true option -->
<pc-scroll-view horizontal="false"></pc-scroll-view>
```

## Numbers

Number attributes accept any finite number: integer, fractional, negative or scientific notation (`"1e3"`). Anything else — a value with units (`fov="60deg"`), an empty value (`intensity=""`) or `"Infinity"` — logs a warning and the default applies.

```html
<pc-camera fov="60" near-clip="0.1"></pc-camera>
```

## Enums

Enum attributes accept one of a fixed set of names. An invalid name logs a warning that lists the valid names, then the default applies:

```none
Invalid value 'bogus' for attribute 'scroll-mode'. Valid values: clamp, bounce, infinite. Using 'bounce'.
```

Numeric engine constants are not accepted — the declarative layer is names-only. This also applies to the JavaScript API: enum-typed element properties (such as `scrollbar.orientation`) accept and return string names, never engine numeric constants.

```html
<pc-camera tonemap="aces"></pc-camera>
```

## Vectors

Vector attributes take space-separated numbers — exactly as many as the type has components (2 for Vector2, 3 for Vector3, 4 for Vector4). Any amount of whitespace between components is fine. Commas are not part of the grammar and are rejected with a warning.

```html
<pc-entity position="0 1.5 0" scale="2 2 2"></pc-entity>
```

## Colors

Color attributes accept any of three formats:

| Format | Example |
| --- | --- |
| [CSS color name](https://github.com/playcanvas/web-components/blob/main/src/colors.ts) | `clear-color="rebeccapurple"` |
| Hex code (`#rgb`, `#rgba`, `#rrggbb` or `#rrggbbaa`) | `color="#f00"` or `color="#ff0000"` |
| 3 or 4 space-separated numbers in the range 0 to 1 | `color="1 0.5 0.5"` or `color="1 0.5 0.5 0.5"` |

```html
<pc-camera clear-color="#f0f8ff"></pc-camera>
<pc-light color="1 0.8 0.6"></pc-light>
```

## Asset and Material IDs

Resources are declared once, as direct children of [`<pc-app>`](tags/pc-app.md), and referenced by the `id` you give them. An Asset ID attribute names a [`<pc-asset>`](tags/pc-asset.md); a Material ID attribute names a [`<pc-material>`](tags/pc-material.md):

```html
<pc-asset id="tiles" src="tiles.png"></pc-asset>
<pc-material id="floor" diffuse-map="tiles"></pc-material>
<!-- ... -->
<pc-render type="plane" material="floor"></pc-render>
```

The value is the element's own `id`, written bare — no `#`, because it is a lookup in the application's registry rather than a CSS selector. Each attribute's description says which asset type it accepts. An `id` that matches no declared resource has no effect: the element keeps what it had, and [`<pc-model>`](tags/pc-model.md) additionally logs a warning naming the asset it could not find.

## Entity References

Some attributes reference another entity in the document — for example, [`<pc-button>`](tags/pc-button.md)'s `image`, [`<pc-scrollbar>`](tags/pc-scrollbar.md)'s `handle`, [`<pc-scroll-view>`](tags/pc-scroll-view.md)'s `viewport` and `content`, and [`<pc-joint>`](tags/pc-joint.md)'s `entity-a` and `entity-b`. A reference takes exactly one of two forms:

| Form | Meaning | Scope |
| --- | --- | --- |
| `handle` | The `name` of a [`<pc-entity>`](tags/pc-entity.md), [`<pc-model>`](tags/pc-model.md) or [`<pc-node>`](tags/pc-node.md) | Nearest enclosing entity first, then outward, then the whole document |
| `#handle`, `#hud pc-entity` | A CSS selector beginning with `#` — an element `id`, or any selector rooted in one | The whole document |

```html
<pc-scrollbar orientation="vertical" handle="#handle"></pc-scrollbar>
```

The grammar is closed: a bare value is always a name — never an element `id` and never a selector — and a selector that does not begin with `#` is not accepted. Which form a reference takes is visible at a glance, and adding or renaming elements elsewhere in the document can never change it.

### Names Resolve Nearest-First

A name is looked up through the enclosing entity hierarchy: first the nearest enclosing entity-fronting element — a [`<pc-entity>`](tags/pc-entity.md), [`<pc-model>`](tags/pc-model.md) or [`<pc-node>`](tags/pc-node.md), that element itself included — and its subtree, then each outer enclosing entity in turn, then the containing [`<pc-app>`](tags/pc-app.md), and finally the whole document. The first match wins, in document order within each scope. For a `<pc-node>`, the name matched is the glTF node name it binds.

Nearest-first is what makes names safe in repeated content: inside a [cloned `<template>`](templates.md), a reference finds its own instance's entities before the lookup could ever reach an earlier clone's — see [Reusable Scenes with Templates](templates.md).

### `#` References Are Document-Wide {#hash-references-are-document-wide}

A reference beginning with `#` is evaluated as a [CSS selector](https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelector) against the whole document, and it is authoritative: the name lookup never runs for it, so an entity that happens to be *named* `#body` can never shadow the element whose `id` is `body`. Use a `#` form to pin a reference to one specific element, regardless of where the referencing element sits.

### Unresolved References Warn

A non-empty reference that does not resolve logs a console warning naming the attribute and the cause: nothing in the document matches, the match is not backing an entity *yet* (usually timing — a [`<pc-node>`](tags/pc-node.md) whose model has not loaded resolves once you assign the attribute again), or the match can never back one (the reference points at the wrong kind of element). And if a bare reference matches nothing but does equal the `id` of an entity-fronting element, the warning suggests the `#id` spelling to use — escaped where the `id` needs it, such as `#a\:b` for an `id` of `a:b`.

[Script attributes](scripting.md#type-prefixes) follow the same grammar: `entity:body` references an entity named `body`, while `entity:#body` references the element with that `id`.

## Script Attributes

Scripts declare their own attributes, so [`<pc-script-instance>`](tags/pc-script-instance.md) extends these conventions with per-property attributes that are parsed based on each script attribute's declared type. See [Adding Behavior with Scripts](scripting.md) for details.
