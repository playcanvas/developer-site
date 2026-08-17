---
title: Loading Models
description: "Load a glTF or GLB model with pc-asset and pc-model, discover its hierarchy with hierarchy(), then reach inside it with pc-node to hide, re-pose, reskin and extend what the artist exported."
---

[Building a Scene](building-a-scene.md) built everything from primitives. Real projects load models, and this page is about the workflow around that: getting a GLB onto the page, finding out what is actually inside it, and then adjusting it — without opening a 3D tool.

The model used throughout is the [Porsche 911 Carrera 4S by Lionsharp Studios](https://sketchfab.com/3d-models/free-porsche-911-carrera-4s-d01b254483794de3819786d93e0e1ebf) (CC BY 4.0), the same asset behind the [Car Configurator example](https://playcanvas.github.io/web-components/examples/car-configurator.html). It is a normal Sketchfab download, warts and all, which turns out to be the point.

## What to Export

Both glTF flavors work: `.gltf` (JSON, with textures and geometry alongside it) and `.glb` (everything in one binary file). Prefer `.glb` for the web — one request, no broken relative paths.

Two things are worth caring about at export time, because they become the vocabulary you use later:

* **Node names.** [`<pc-node>`](tags/pc-node.md) finds parts of the model by name. If your exporter emits `Object_12`, that is what you will be typing.
* **Material names.** They are how you target materials for replacement, and they often survive meaningful even when node names do not.

Neither is fatal if it goes wrong — `hierarchy()` below tells you what you actually got — but a few minutes spent naming things in Blender saves more than that later.

## Loading and Instantiating

Loading takes two tags. [`<pc-asset>`](tags/pc-asset.md) declares the file, and [`<pc-model>`](tags/pc-model.md) instantiates it into the scene:

```html
<pc-app>
    <pc-asset id="car" type="container" src="assets/porsche-911-carrera-4s.glb"></pc-asset>
    <pc-scene>
        <pc-entity name="camera" position="3.4 1 3.8" rotation="-10 42 0">
            <pc-camera clear-color="#dfe4ea"></pc-camera>
        </pc-entity>
        <pc-entity name="light" rotation="52 30 0">
            <pc-light type="directional" cast-shadows></pc-light>
        </pc-entity>
        <pc-model asset="car"></pc-model>
    </pc-scene>
</pc-app>
```

![A silver Porsche 911 rendered from a three-quarter front view](/img/user-manual/web-components/loading-models/car-loaded.jpg)

The `type="container"` matters: a GLB is a *container* asset, holding meshes, materials, textures, skins and animations together, and `<pc-model>` instantiates its hierarchy from that container. Point it at an asset of another type and the load fails at instantiation rather than with a tidy message, so it is worth getting right. `<pc-model>` behaves like a [`<pc-entity>`](tags/pc-entity.md) otherwise, so it takes `position`, `rotation` and `scale`, and it can be nested inside another entity.

A model becomes ready once its hierarchy is in the scene, and it fires `load`. A failed load also settles readiness with a `null` entity and fires an [`error` event](tags/pc-model.md#events), so that is the one to listen for if the file might not arrive:

```javascript
document.querySelector('pc-model').addEventListener('error', (event) => {
    console.warn(`the model did not load: ${event.message}`);
});
```

:::note[Model origins are wherever the artist left them]

Nothing normalizes a model's pivot or scale. This car's origin sits at the middle of the body, so its wheels are *below* y=0 and it will sink through a ground plane placed at the origin. Set `position` on the `<pc-model>` to lift it, or move your ground — but expect to do this per asset rather than assume a convention.

:::

### Compressed Meshes

Most models from asset sites are Draco-compressed, and this one is. Draco needs a WebAssembly decoder, declared with [`<pc-module>`](tags/pc-module.md) as a child of `<pc-app>`:

```html
<pc-module name="DracoDecoderModule"
           glue="modules/draco/draco.wasm.js"
           wasm="modules/draco/draco.wasm.wasm"
           fallback="modules/draco/draco.js"></pc-module>
```

The three files are a [Draco](https://google.github.io/draco/) decoder build — the glue script, the `.wasm` binary, and a pure-JavaScript fallback for browsers without WebAssembly. They are not part of the engine's npm package, so you serve them yourself: take them from a [Draco release](https://github.com/google/draco/releases) or copy the set vendored in the [Web Components examples](https://github.com/playcanvas/web-components/tree/main/examples/modules/draco), then point the attributes at wherever you put them.

`<pc-app>` waits for every module declared beneath it before it starts, so by the time your scene runs the decoder is in place. Without it, a Draco-compressed model fails to load and the console says so.

The same mechanism supplies `Basis` for transcoding compressed textures, which models using `KHR_texture_basisu` need.

## Seeing What You Loaded

Here is the awkward truth about model files: the names in your 3D tool are frequently not the names that reach the engine. Exporters rename things, and the engine's parser then synthesizes names for unnamed nodes and suffixes identically named siblings apart as it builds the hierarchy.

So do not guess. [`<pc-model>`](tags/pc-model.md) has a `hierarchy()` method that reports the tree as it actually exists, and printing it is one line:

```javascript
import { whenReady } from '@playcanvas/web-components';

const model = await whenReady('pc-model');
console.log(String(model.hierarchy()));
```

```none
Sketchfab_model
└─ Root
   ├─ window_rear
   │  └─ window_rear_0 (render) {window}
   ├─ windshield
   │  ├─ windshield_0 (render) {window}
   │  └─ windshield_1 (render) {plastic}
   ├─ Plane.002
   │  └─ Plane.002_0 (render) {paint}
   ├─ boot
   │  └─ boot_0 (render) {full_black}
   ├─ underbody
   │  └─ underbody_0 (render) {full_black}
   ├─ Cylinder.000
   │  ├─ Cylinder.000_0 (render) {silver}
   │  ├─ Cylinder.000_1 (render) {plastic}
   │  ├─ Cylinder.000_2 (render) {rubber}
   │  └─ Cylinder.000_3 (render) {Material.001}
   ├─ Plane
   │  └─ Plane_0 (render) {Material}
   ⋮
   ├─ bumper_front.004
   │  ├─ bumper_front.004_0 (render) {silver}
   │  ├─ bumper_front.004_1 (render) {lights}
   │  └─ bumper_front.004_2 (render) {plastic}
   ⋮
   ├─ boot.001
   │  └─ boot.001_0 (render) {paint}
   ⋮
   └─ boot.011
      ├─ boot.011_0 (render) {coat}
      └─ boot.011_01 (render) {coat}
```

That is abridged at the `⋮` — `Root` really has 32 children — but otherwise it is verbatim, and the nodes the recipes below use are all in it.

Each line is a node: its name, `(render)` and any other components in parentheses, and the materials of a render component in braces. Read the real output above and several things become obvious that no amount of guessing would have told you:

* **The node names are meaningless.** `boot.011`, `Plane.002`, `Cylinder.000` — this is what the export produced. The *material* names, though, are meaningful: `paint`, `glass`, `rubber`, `silver`, `window`, `lights`. On this model, materials are the better handle, and that is common.
* **Render components live on the leaves.** `windshield` itself has no geometry; its child `windshield_0` does. A `<pc-node>` that wants to change a material has to bind the node the `(render)` marker is on, not the friendly-looking parent.
* **`Cylinder.000` is a wheel** — four child nodes covering rim, plastic, tyre and brake.
* **`boot.011_01` was renamed by the engine.** The GLB has two children both called `boot.011_0`; identically named siblings get suffixed apart as the hierarchy is built.

`hierarchy()` returns plain data — `name`, `path`, `index`, `components`, `materials`, `children` — so you can also search it rather than read it. The full field reference is in [Inspecting the Hierarchy](tags/pc-model.md#inspecting-the-hierarchy).

```javascript
// Every node that has geometry painted with the 'paint' material
const painted = [];
const walk = (node) => {
    if (node.materials.some(m => m.name === 'paint')) painted.push(node.name);
    node.children.forEach(walk);
};
walk(model.hierarchy());
console.log(painted); // ['Plane.002_0', 'Plane.003_0', 'Plane.004_0', ...]
```

## Adjusting What You Loaded

[`<pc-node>`](tags/pc-node.md) binds to a node inside the loaded hierarchy and declares overrides against it. Nest one inside `<pc-model>` for each part you want to change. It is a lookup, never a rename, and an attribute you leave off keeps whatever the model was authored with.

### Hide a Part

Sketchfab models routinely ship with a baked shadow plane, and this one also has the artist's watermark baked into it. Both are one attribute away from gone:

```html {2}
<pc-model asset="car">
    <pc-node name="Plane" enabled="false"></pc-node>
</pc-model>
```

![The same Porsche with the baked ground plane and watermark removed](/img/user-manual/web-components/loading-models/car-plane-hidden.jpg)

`enabled="false"` disables the node and everything under it, which is the declarative way to drop content you did not want without editing the file.

### Re-pose a Part

`position`, `rotation` and `scale` on a `<pc-node>` replace the authored transform rather than adding to it:

```html
<pc-model asset="car">
    <!-- Lift one painted body panel clear of the car, leaving its rotation and scale as exported -->
    <pc-node name="boot.001_0" position="0 0.4 0"></pc-node>
</pc-model>
```

Which node is the part you had in mind is a question for `hierarchy()` — on this export, `boot.001_0` is simply one of the nodes carrying the `paint` material.

Because these are replacements, removing the attribute at runtime — or assigning `null` to the matching JavaScript property — puts the authored value back, which makes them convenient to flip between two states.

### Reskin a Part

`material-overrides` maps selectors to [`<pc-material>`](tags/pc-material.md) ids. Give it a `name:` selector and it replaces every mesh instance on that node whose material carries that name:

```html {2,5-7}
<pc-app>
    <pc-material id="candy-red" name="Candy Red" diffuse="#c8102e" metalness="1" roughness="0.25"></pc-material>
    <pc-scene>
        <pc-model asset="car">
            <pc-node name="Plane" enabled="false"></pc-node>
            <pc-node name="Plane.002_0" material-overrides='{"name:paint": "candy-red"}'></pc-node>
            <pc-node name="boot.001_0" material-overrides='{"name:paint": "candy-red"}'></pc-node>
        </pc-model>
    </pc-scene>
</pc-app>
```

![The Porsche repainted in candy red](/img/user-manual/web-components/loading-models/car-repainted.jpg)

Note the shape of that: **one `<pc-node>` per node that carries the paint**. `material-overrides` applies to the render component of the node it is on, and on this model the `paint` material is spread across seven different nodes — so a full respray is seven bindings. That is fine when you know the list (`hierarchy()` gave it to you above), and the ids let several nodes share one material declaration.

If you would rather sweep a whole model in one go, or cross-fade between finishes, that is a job for a script — which is what the [Car Configurator example](https://playcanvas.github.io/web-components/examples/car-configurator.html) does. The declarative route is for the fixed set of parts you know up front.

Set `name` on your replacement `<pc-material>` if you want to recognize it later: it is the label `hierarchy()` reports, and an unnamed material reads as `Untitled` there. The full selector grammar, including `index:` for multi-material meshes and how invalid rules are reported, is in [Overriding Materials](tags/pc-node.md#overriding-materials).

### Attach Something to a Part

A `<pc-node>` can have [`<pc-entity>`](tags/pc-entity.md) children, which are created and parented under the bound node. That turns any node into an attachment point, inheriting its transform:

```html
<pc-model asset="car">
    <pc-node name="bumper_front.004">
        <pc-entity position="0 0 0.3">
            <pc-light type="spot" color="#fff6e0" intensity="12" outer-cone-angle="34"></pc-light>
        </pc-entity>
    </pc-node>
</pc-model>
```

The child entity's transform is local to the node, so it follows the part if the part moves. Remember that lights shine along their entity's negative Y axis, and that a node deep inside a glTF hierarchy usually carries inherited rotations — so expect to tune the child's `rotation` against what you see rather than reason it out.

### Give a Part a Component

A `<pc-node>` takes the same component tags a `<pc-entity>` does, adding that component to the bound node. The common case is physics — a mesh collider takes its shape from the node's own render component, so a rigid body plus a collider makes exported geometry solid:

```html
<pc-model asset="car">
    <pc-node name="underbody_0">
        <pc-rigidbody type="static"></pc-rigidbody>
        <pc-collision type="mesh"></pc-collision>
    </pc-node>
</pc-model>
```

Physics needs the `Ammo` module declared the same way Draco was — see [`<pc-module>`](tags/pc-module.md).

### Make a Part Interactive

Binding a node is what makes it a pick target, so pointer events are available on any `<pc-node>` — which is how one part of a model becomes clickable while the rest is inert:

```html
<pc-model asset="car">
    <pc-node name="boot.001_0" onpointerdown="this.setAttribute('position', '0 0.4 0')"></pc-node>
</pc-model>
```

In an inline handler `this` is the `<pc-node>` element, and going through `setAttribute` keeps the markup and the scene in agreement. The equivalent JavaScript properties are typed — `position` and `rotation` take a `Vec3`, not a string — so prefer attributes from inline handlers and properties from real script files.

The events and their inline attribute forms are listed in the [`<pc-node>` reference](tags/pc-node.md#events).

## Animation

If a container holds animations, `<pc-model>` adds an `anim` component to the instantiated root and plays the first one. There is no attribute for this and nothing to switch on:

```html
<pc-asset id="robot" type="container" src="assets/walking-robot.glb"></pc-asset>
<pc-scene>
    <pc-model asset="robot"></pc-model>
</pc-scene>
```

![A robot character mid-stride, its walk animation playing](/img/user-manual/web-components/loading-models/robot-animation.jpg)

`hierarchy()` shows the component that got added, which is the quickest way to confirm a model's animations came through the export:

```none
Armature (anim)
├─ Alpha_Joints (render) {Alpha_Joints_MAT}
├─ Alpha_Surface (render) {Alpha_Body_MAT}
└─ mixamorig:Hips
   ⋮
```

Only the *first* animation is assigned, and markup gives you no way to pick another, pause it or blend between clips. For anything beyond "play what the file came with", reach the component from JavaScript and drive it through the engine's [AnimComponent](https://api.playcanvas.com/engine/classes/AnimComponent.html) API:

```javascript
const { entity } = await whenReady('pc-model');
entity.anim.baseLayer.pause();
```

## Troubleshooting

**Nothing appears, and the console mentions Draco or Basis.** The model is compressed and the decoder module is missing — see [Compressed Meshes](#compressed-meshes).

**Nothing appears, and there is no warning at all.** Check the model's scale and origin. A model exported in centimetres arrives a hundred times too big, and one whose origin is far from its geometry can sit entirely outside the camera's view.

**A `<pc-node>` warns that the name is ambiguous.** Two or more nodes share that name, so the element refuses to guess. The warning lists the candidates; pick one with `index`.

**A `<pc-node>` warns that the name matched nothing.** The warning includes the closest name it did find, which is usually enough to spot the typo. If not, print `hierarchy()` — the name you want may have been renamed on export.

**`material-overrides` says the node has no authored render component.** You bound a grouping node rather than the leaf that holds the geometry. Look for the `(render)` marker in the `hierarchy()` output.

**A material name appears as `Untitled` or `defaultGlbMaterial`.** Those are engine defaults for an unnamed glTF material and for a primitive exported with no material at all. Neither is a unique handle, so select those by `index:` instead.

## Next Steps

* [`<pc-model>`](tags/pc-model.md) and [`<pc-node>`](tags/pc-node.md) — the full attribute and method reference for both tags.
* [Adding Behavior with Scripts](scripting.md) — for logic that outgrows markup, such as sweeping materials across a whole model.
* [Programmatic Access](programmatic-access.md) — reaching the engine objects behind these elements.
* [Examples](https://playcanvas.github.io/web-components/examples/) — see [GLB Loader](https://playcanvas.github.io/web-components/examples/glb-loader.html), [GLB Animation](https://playcanvas.github.io/web-components/examples/glb-animation.html) and [Car Configurator](https://playcanvas.github.io/web-components/examples/car-configurator.html).
