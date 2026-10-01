---
title: Loading Models
description: "Load a glTF or GLB model with pc-asset and pc-model, decode its compressed meshes, light it with its environment, discover its hierarchy with hierarchy(), then reach inside it with pc-node to hide, re-pose, reskin and extend it."
---

[Building a Scene](building-a-scene.md) built everything from primitives. Real projects load models, and this page is about the workflow around that: getting a GLB onto the page, finding out what is actually inside it, and then adjusting it — without opening a 3D tool.

The model used throughout is the [Porsche 911 Carrera 4S by Lionsharp Studios](https://sketchfab.com/3d-models/free-porsche-911-carrera-4s-d01b254483794de3819786d93e0e1ebf) (CC BY-SA 4.0), the same asset behind the [Car Configurator example](https://playcanvas.github.io/web-components/examples/#car-configurator.html). It is a real Sketchfab model, warts and all, which turns out to be the point.

## What to Export

Both glTF flavors work: `.gltf` (JSON, with textures and geometry alongside it) and `.glb` (everything in one binary file). Prefer `.glb` for the web — one request, no broken relative paths.

Two things are worth caring about at export time, because they become the vocabulary you use later:

* **Node names.** [`<pc-node>`](tags/pc-node.md) finds parts of the model by name. If your exporter emits `Object_12`, that is what you will be typing.
* **Material names.** They are how you target materials for replacement, and they often survive meaningful even when node names do not.

Neither is fatal if it goes wrong — `hierarchy()` below tells you what you actually got — but a few minutes spent naming things in Blender saves more than that later.

## Loading and Instantiating

Loading takes two tags. [`<pc-asset>`](tags/pc-asset.md) declares the file, and [`<pc-model>`](tags/pc-model.md) instantiates it into the scene:

```html {2,7}
<pc-app>
    <pc-asset id="car" src="assets/porsche-911-carrera-4s.glb"></pc-asset>
    <pc-scene>
        <pc-entity name="camera" position="3.2 0.9 3.6" rotation="-12 42 0">
            <pc-camera clear-color="#dfe4ea"></pc-camera>
        </pc-entity>
        <pc-model asset="car"></pc-model>
    </pc-scene>
</pc-app>
```

For many models that is the whole job. This car needs two more tags before it looks right — a decoder for its compressed meshes, and an environment for its paint to reflect — which the next two sections add.

A GLB is a *container* asset, holding meshes, materials, textures, skins and animations together, and `<pc-model>` instantiates its hierarchy from that container. `<pc-asset>` infers the `container` type from a `.glb` or `.gltf` extension, so the markup only has to say `type="container"` when the URL does not end in one, as with a query string (`car.glb?v=2`) or an extension-less download link. Apart from instantiating a container, `<pc-model>` behaves like a [`<pc-entity>`](tags/pc-entity.md): it takes `position`, `rotation` and `scale`, and it can be nested inside another entity.

A model becomes ready once its content is in the scene, and it fires `load`. A failed load also settles readiness — with a `null` `contentEntity` — and fires an [`error` event](tags/pc-model.md#events), so that is the one to listen for if the file might not arrive:

```javascript
document.querySelector('pc-model').addEventListener('error', (event) => {
    console.warn(`the model did not load: ${event.message}`);
});
```

:::note[Model origins are wherever the artist left them]

Nothing normalizes a model's pivot or scale. This car's origin sits at the middle of the body, so its wheels are *below* y=0 and it will sink through a ground plane placed at the origin. Set `position` on the `<pc-model>` to lift it, or move your ground — but expect to do this per asset rather than assume a convention.

:::

### Compressed Meshes

Models are often shipped with Draco-compressed meshes to cut their download size, and this one is. Draco needs a WebAssembly decoder, declared with [`<pc-wasm>`](tags/pc-wasm.md) as a child of `<pc-app>`:

```html
<pc-wasm name="DracoDecoderModule"
         glue="modules/draco/draco.wasm.js"
         wasm="modules/draco/draco.wasm.wasm"></pc-wasm>
```

The two files are a [Draco](https://google.github.io/draco/) decoder build: the glue script and the `.wasm` binary. They are not part of the engine's npm package, so you serve them yourself: take them from a [Draco release](https://github.com/google/draco/releases) or copy the set vendored in the [Web Components examples](https://github.com/playcanvas/web-components/tree/main/examples/modules/draco), then point the attributes at wherever you put them.

`<pc-app>` waits for every `<pc-wasm>` among its children before it starts, so by the time your scene runs the decoder is in place. Without it, the model fails to load, and the console shows the engine trying to fetch a `draco.wasm.js` from next to your page instead.

The same mechanism supplies `Basis` for transcoding compressed textures, which models using `KHR_texture_basisu` need.

### Lighting the Model

The car's paint is a metal, and a metal has no diffuse color: everything you see of it is reflection. A scene with nothing around the car but a clear color gives the paint nothing to reflect, so the body renders close to black, however bright its lights. Most models authored for physically based rendering (PBR) need an environment to reflect, and metals need it most.

[`<pc-sky>`](tags/pc-sky.md) supplies one. Point it at an image and add `lighting`, and the scene is lit by that image, reflections included. `type="none"` keeps the image out of the background, so it lights the car without showing up behind it:

```html
<pc-asset id="chapel" src="assets/sepulchral-chapel-rotunda-4k.webp"></pc-asset>
<!-- ... -->
<pc-scene>
    <pc-sky asset="chapel" type="none" lighting></pc-sky>
    <!-- ... -->
</pc-scene>
```

Here is the car with both additions, running live. It is the markup from [Loading and Instantiating](#loading-and-instantiating) plus the `<pc-wasm>` and the `<pc-sky>`, with the files served from this site:

```html live-example
<pc-app>
    <pc-wasm name="DracoDecoderModule" glue="https://developer.playcanvas.com/assets/modules/draco/draco.wasm.js" wasm="https://developer.playcanvas.com/assets/modules/draco/draco.wasm.wasm"></pc-wasm>
    <pc-asset id="car" src="https://developer.playcanvas.com/assets/porsche-911-carrera-4s.glb"></pc-asset>
    <pc-asset id="chapel" src="https://developer.playcanvas.com/assets/sepulchral-chapel-rotunda-4k.webp"></pc-asset>
    <pc-scene>
        <pc-sky asset="chapel" type="none" lighting></pc-sky>
        <pc-entity name="camera" position="3.2 0.9 3.6" rotation="-12 42 0">
            <pc-camera clear-color="#dfe4ea"></pc-camera>
        </pc-entity>
        <pc-model asset="car"></pc-model>
    </pc-scene>
</pc-app>
```

Some things to try:

* Delete `lighting` from the `<pc-sky>` and watch the paint go dark.
* Delete `type="none"` to see the environment the car is reflecting.
* Delete the `<pc-wasm>`: the car never appears, and the console fills with failed requests for `draco.wasm.js`.

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
   ├─ Plane.003
   │  └─ Plane.003_0 (render) {paint}
   ├─ Plane.004
   │  └─ Plane.004_0 (render) {paint}
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
   ├─ bumper_front.007
   │  └─ bumper_front.007_0 (render) {glass}
   ⋮
   ├─ boot.005
   │  └─ boot.005_0 (render) {paint}
   ⋮
   ├─ boot.011
   │  ├─ boot.011_0 (render) {coat}
   │  └─ boot.011_01 (render) {coat}
   └─ Cube.002
      └─ Cube.002_0 (render) {full_black}
```

That is abridged at each `⋮` — `Root` really has 32 children — but otherwise it is verbatim.

Each line is a node: its name, `(render)` and any other components in parentheses, and the materials of a render component in braces. Read the real output above and several things become obvious that no amount of guessing would have told you:

* **The node names are meaningless.** `boot.011`, `Plane.002`, `Cylinder.000` — this is what the export produced. The *material* names, though, are meaningful: `paint`, `glass`, `rubber`, `silver`, `window`, `lights`. On this model, materials are the better handle, and that is common.
* **Render components live on the leaves.** `windshield` itself has no geometry; its child `windshield_0` does. A `<pc-node>` that wants to change a material has to bind the node the `(render)` marker is on, not the friendly-looking parent.
* **`Cylinder.000` is a pair of wheels** — both wheels on one axle, with a child node each for their rims, plastic, tyres and brakes.
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

`enabled="false"` disables the node and everything under it, which is the declarative way to drop content you did not want without editing the file. The live example under [Reskin a Part](#reskin-a-part) has the plane hidden.

### Re-pose a Part

`position`, `rotation` and `scale` on a `<pc-node>` replace the authored transform rather than adding to it:

```html
<pc-model asset="car">
    <!-- Lift a front wing clear of the body, leaving its rotation and scale as exported -->
    <pc-node name="boot.005_0" position="0 0 0.5"></pc-node>
</pc-model>
```

Which node is the part you had in mind is a question for `hierarchy()` — on this export, `boot.005_0` is one of the nodes carrying the `paint` material, and it turns out to be a front wing.

Why does `0 0 0.5` lift it, rather than `0 0.5 0`? A node's transform is local to its parent, and so inherits every rotation above it. This car's root node, `Sketchfab_model`, is turned −90° about X to stand the Z-up source upright, so inside it Z points up and −Y points forward. Many exported models do something similar, so check which way a part moves before assuming Y is up.

Because these are replacements, removing the attribute at runtime — or assigning `null` to the matching JavaScript property — puts the authored value back, which makes them convenient to flip between two states.

### Reskin a Part

`material-overrides` maps selectors to [`<pc-material>`](tags/pc-material.md) ids. Give it a `name:` selector and it replaces every mesh instance on that node whose material carries that name. Here the car is resprayed candy red, with the baked plane hidden too:

```html live-example
<pc-app>
    <pc-wasm name="DracoDecoderModule" glue="https://developer.playcanvas.com/assets/modules/draco/draco.wasm.js" wasm="https://developer.playcanvas.com/assets/modules/draco/draco.wasm.wasm"></pc-wasm>
    <pc-asset id="car" src="https://developer.playcanvas.com/assets/porsche-911-carrera-4s.glb"></pc-asset>
    <pc-asset id="chapel" src="https://developer.playcanvas.com/assets/sepulchral-chapel-rotunda-4k.webp"></pc-asset>
    <pc-material id="candy-red" name="Candy Red" diffuse="#c8102e" metalness="1" roughness="0.25"></pc-material>
    <pc-scene>
        <pc-sky asset="chapel" type="none" lighting></pc-sky>
        <pc-entity name="camera" position="3.2 0.9 3.6" rotation="-12 42 0">
            <pc-camera clear-color="#dfe4ea"></pc-camera>
        </pc-entity>
        <pc-model asset="car">
            <pc-node name="Plane" enabled="false"></pc-node>
            <pc-node name="Plane.002_0" material-overrides='{"name:paint": "candy-red"}'></pc-node>
            <pc-node name="Plane.003_0" material-overrides='{"name:paint": "candy-red"}'></pc-node>
            <pc-node name="Plane.004_0" material-overrides='{"name:paint": "candy-red"}'></pc-node>
            <pc-node name="boot.001_0" material-overrides='{"name:paint": "candy-red"}'></pc-node>
            <pc-node name="boot.002_0" material-overrides='{"name:paint": "candy-red"}'></pc-node>
            <pc-node name="boot.005_0" material-overrides='{"name:paint": "candy-red"}'></pc-node>
            <pc-node name="boot.008_0" material-overrides='{"name:paint": "candy-red"}'></pc-node>
        </pc-model>
    </pc-scene>
</pc-app>
```

Note the shape of that: **one `<pc-node>` per node that carries the paint**. `material-overrides` applies to the render component of the node it is on, and on this model the `paint` material is spread across seven different nodes — so a full respray is seven bindings. That is fine when you know the list (the search under [Seeing What You Loaded](#seeing-what-you-loaded) gives it to you), and the ids let several nodes share one material declaration.

Some things to try:

* Change the `diffuse` color, or raise `roughness` to `0.6` for a satin finish.
* Delete the `boot.005_0` binding: that front wing keeps its original paint.
* Add `position="0 0 0.5"` to the `boot.005_0` binding to lift the wing as well. A node can only be bound once, so every override for a node goes on its one `<pc-node>`.

If you would rather sweep a whole model in one go, or cross-fade between finishes, that is a job for a script — which is what the [Car Configurator example](https://playcanvas.github.io/web-components/examples/#car-configurator.html) does. The declarative route is for the fixed set of parts you know up front.

Set `name` on your replacement `<pc-material>` if you want to recognize it later: it is the label `hierarchy()` reports, and an unnamed material reads as `Untitled` there. The full selector grammar, including `index:` for multi-material meshes and how invalid rules are reported, is in [Overriding Materials](tags/pc-node.md#overriding-materials).

### Attach Something to a Part

A `<pc-node>` can have [`<pc-entity>`](tags/pc-entity.md) children, which are created and parented under the bound node. That turns any node into an attachment point, inheriting its transform:

```html
<pc-model asset="car">
    <pc-node name="bumper_front.004">
        <!-- A headlight beam, dipped towards the road -->
        <pc-entity position="0 -2.96 0.05" rotation="10 0 0">
            <pc-light type="spot" color="#fff6e0" intensity="12" inner-cone-angle="20" outer-cone-angle="34"></pc-light>
        </pc-entity>
    </pc-node>
</pc-model>
```

The child entity's transform is local to the node, so it follows the part if the part moves. It is also in the node's terms, which on this export are not what you might expect: every part node sits at the model's origin, with its geometry baked in place, and inherits the root's turned axes from [Re-pose a Part](#re-pose-a-part). So the light's `position` is measured from the middle of the car, with −Y pointing forward, and `0 -2.96 0.05` is out at the headlights. A light shines along its entity's negative Y axis, which here already points forward, and `rotation="10 0 0"` dips the beam towards the road. Expect to tune an attachment against what you see rather than reason it out.

### Give a Part a Component

A `<pc-node>` takes the same component tags a `<pc-entity>` does, adding that component to the bound node. The common case is physics — a mesh collider takes its shape from the node's own render component, so a rigid body plus a collider makes exported geometry solid:

```html
<pc-model asset="car">
    <pc-node name="underbody_0">
        <pc-rigid-body type="static"></pc-rigid-body>
        <pc-collision type="mesh"></pc-collision>
    </pc-node>
</pc-model>
```

Physics needs the `Ammo` module declared the same way Draco was — see [`<pc-wasm>`](tags/pc-wasm.md). A component the node already has is not added a second time: a `<pc-render>` on a node that renders geometry logs a warning and does nothing.

### Make a Part Interactive

Binding a node is what makes it a pick target, so pointer events are available on any `<pc-node>` — which is how one part of a model becomes clickable while the rest is inert:

```html
<pc-model asset="car">
    <pc-node name="boot.005_0" onclick="this.setAttribute('position', '0 0 0.5')"></pc-node>
</pc-model>
```

In an inline handler `this` is the `<pc-node>` element, and going through `setAttribute` keeps the markup and the scene in agreement. The equivalent JavaScript properties are typed — `position` and `rotation` take a `Vec3`, not a string — so prefer attributes from inline handlers and properties from real script files.

The events and their inline attribute forms are listed in the [`<pc-node>` reference](tags/pc-node.md#events).

## Animation

A container's animations are played by a [`<pc-anim>`](tags/pc-anim.md) placed directly inside the model. Empty, it assigns every animation the container holds — each named after its track — and starts the first one, which covers "play what the file came with" in a single tag. This T-rex comes with a walk cycle:

```html live-example
<pc-app>
    <pc-asset id="t-rex" src="https://developer.playcanvas.com/assets/t-rex.glb"></pc-asset>
    <pc-scene>
        <pc-entity name="camera" position="3 1.1 2.4" rotation="-10 55 0">
            <pc-camera clear-color="#dfe4ea"></pc-camera>
        </pc-entity>
        <pc-entity name="light" rotation="45 30 0">
            <pc-light intensity="1.5"></pc-light>
        </pc-entity>
        <pc-model asset="t-rex">
            <pc-anim></pc-anim>
        </pc-model>
    </pc-scene>
</pc-app>
```

No wrapper entity is involved. `<pc-model>` is an entity host in its own right, so a component placed inside it attaches to the model — the same way it would attach to a [`<pc-entity>`](tags/pc-entity.md). That also means the model can carry its own name, transform and pointer handlers, and can host child entities alongside its content.

To see which animations came through the export, ask the component:

```javascript
const anim = await whenReady('pc-anim');
console.log(anim.clips); // ['Animation']
```

Track names are worth a look, because the engine reserves `.` in clip names for blend tree paths. An empty `<pc-anim>` skips any track whose name contains one, and says so in the console. That catches plenty of real files: the walking robot among the Web Components examples' models has a single track called `Armature|mixamo.com|Layer0`, the name animations from Mixamo typically arrive with.

Declaring a clip yourself gets around it. A [`<pc-anim-clip>`](tags/pc-anim-clip.md) names the clip it declares, and a file holding a single track supplies it under whatever name you choose:

```html
<pc-model asset="robot">
    <pc-anim>
        <pc-anim-clip name="walk"></pc-anim-clip>
    </pc-anim>
</pc-model>
```

Declared clips are also where per-clip speed and looping live, and how clips from other files get mixed in. In a file with several tracks, each clip's `name` has to match its track exactly, case included:

```html
<pc-model asset="hero">
    <pc-anim clip="Idle" transition-time="0.3">
        <pc-anim-clip name="Idle"></pc-anim-clip>
        <pc-anim-clip name="Run" speed="1.2"></pc-anim-clip>
        <pc-anim-clip name="wave" asset="wave-glb" loop="false"></pc-anim-clip>
    </pc-anim>
</pc-model>
```

There, `Idle` and `Run` come from the hero's own GLB, while `wave` comes from a single-track `wave-glb` asset declared alongside it. Switching clips is then a matter of setting `clip`, which cross-fades over `transition-time`:

```javascript
document.querySelector('pc-anim').setAttribute('clip', 'Run');
```

Tracks bind to nodes **by name**, which is why a clip from a separate file only animates a model whose node names match it — and why a plain hierarchy of rigid parts animates just as well as a skinned skeleton. See [`<pc-anim>`](tags/pc-anim.md) for the full picture, including cross-fades, pausing and the fact that the engine reports no clip completion.

## Troubleshooting

**Nothing appears, and the console mentions Draco or Basis.** The model is compressed and the decoder module is missing — see [Compressed Meshes](#compressed-meshes).

**Nothing appears, and there is no warning at all.** Check the model's scale and origin. A model exported in centimetres arrives a hundred times too big, and one whose origin is far from its geometry can sit entirely outside the camera's view.

**The model appears, but black or much darker than in your 3D tool.** Its materials have no environment to reflect, which metals need most of all. Light the scene with a `<pc-sky>` that has `lighting` — see [Lighting the Model](#lighting-the-model).

**A `<pc-node>` warns that the name is ambiguous.** Two or more nodes share that name, so the element refuses to guess. The warning lists the candidates; pick one with `index`.

**A `<pc-node>` warns that the name matched nothing.** When a node's name is within two edits of the one you wrote, the warning suggests it, which is usually enough to spot the typo. If not, print `hierarchy()` — the name you want may have been renamed on export.

**`material-overrides` says the node has no authored render component.** You bound a grouping node rather than the leaf that holds the geometry. Look for the `(render)` marker in the `hierarchy()` output.

**A material name appears as `Untitled` or `defaultGlbMaterial`.** Those are engine defaults for an unnamed glTF material and for a primitive exported with no material at all. Neither is a unique handle, so select those by `index:` instead. A name ending in `-flatShaded` is a copy the engine made for a primitive exported without normals, and a `name:` selector has to include the suffix.

**The model loads but nothing animates.** A model plays nothing until a [`<pc-anim>`](tags/pc-anim.md) inside it asks it to, as [Animation](#animation) describes. If one is there, check `anim.clips` and the console. An empty list with a warning about the model having no animations means they did not survive the export. A warning that a track was skipped means its name contains a `.`: declare the clip with a `<pc-anim-clip>` to give it a name of your own.

**A clip from a separate file animates nothing.** Its tracks bind by node name, so the clip and the model have to agree on those names. Print the model's `hierarchy()` and compare.

## Next Steps

* [`<pc-model>`](tags/pc-model.md) and [`<pc-node>`](tags/pc-node.md) — the full attribute and method reference for both tags.
* [`<pc-anim>`](tags/pc-anim.md) and [`<pc-anim-clip>`](tags/pc-anim-clip.md) — clip libraries, cross-fades and playback control.
* [`<pc-sky>`](tags/pc-sky.md) — the environment that lights and surrounds a scene.
* [Adding Behavior with Scripts](scripting.md) — for logic that outgrows markup, such as sweeping materials across a whole model.
* [Programmatic Access](programmatic-access.md) — reaching the engine objects behind these elements.
* [Examples](https://playcanvas.github.io/web-components/examples/) — see [GLB Loader](https://playcanvas.github.io/web-components/examples/#glb-loader.html), [GLB Animation](https://playcanvas.github.io/web-components/examples/#glb-animation.html), [Robot Arm](https://playcanvas.github.io/web-components/examples/#robot-arm.html) and [Car Configurator](https://playcanvas.github.io/web-components/examples/#car-configurator.html).
