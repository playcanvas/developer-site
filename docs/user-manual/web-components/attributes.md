---
title: Attributes
description: "How PlayCanvas Web Component attributes parse values: shared defaults contract, booleans, numbers, enums, vectors, colors, and entity references."
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

## Entity References

Some attributes reference another entity in the document — for example, [`<pc-button>`](tags/pc-button.md)'s `image`, [`<pc-scrollbar>`](tags/pc-scrollbar.md)'s `handle` and [`<pc-scroll-view>`](tags/pc-scroll-view.md)'s `viewport`, `content` and scrollbar attributes. A reference can be any of:

* A CSS selector (e.g. `#my-id` or `pc-entity[name="Player"]`)
* An element `id` (e.g. `my-id`)
* An entity `name` (e.g. `Player`)

```html
<pc-scrollbar orientation="vertical" handle="#handle"></pc-scrollbar>
```

## Script Attributes

Scripts declare their own attributes, so [`<pc-script-instance>`](tags/pc-script-instance.md) extends these conventions with per-property attributes that are parsed based on each script attribute's declared type. See [Adding Behavior with Scripts](scripting.md) for details.
