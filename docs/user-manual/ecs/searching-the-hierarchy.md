---
title: Finding Entities
description: "Look entities up by name, path, tag, component or script, or with a test of your own, starting from any entity, and keep references rather than searching every frame, in the Engine, the Editor, React and Web Components."
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Your code often needs an entity that it did not create: the player, the door that a key opens, every enemy in the level. Every entity can search itself and its descendants for others, so you can search the whole scene from `app.root`, or a smaller part of it from any entity below.

## Search Methods {#search-methods}

| To find entities | The first match | Every match |
| --- | --- | --- |
| By name | `findByName('door')` | `find('name', 'door')` |
| By path | `findByPath('house/door')` | - |
| By tag | - | `findByTag('enemy')` |
| With a component | `findComponent('light')` | `findComponents('light')` |
| With a script | `findScript('health')` | `findScripts('health')` |
| That pass a test of your own | `findOne(entity => ...)` | `find(entity => ...)` |

The searches are depth-first: they visit an entity's first child and all of its descendants before its second child. They cover the entity you call them on as well as its descendants, except `findByTag()`, which only searches the descendants. The methods that look for the first match return `null` when there is none, apart from `findScript()`, which returns `undefined`. The ones that look for every match return an empty array.

`findComponent()` and `findComponents()` return components rather than entities, and `findScript()` and `findScripts()` return script instances. Each of these has an `entity` property for the entity it belongs to.

## By Name {#by-name}

```javascript
const door = app.root.findByName('door');
```

Names do not have to be unique, so `findByName()` returns whichever matching entity it reaches first. To get all the entities with a name, use `find('name', 'door')`. If you give entities unique names, `findByName()` is the simplest way to find them.

## By Path {#by-path}

A path names the entities on the way down to the one you want, separated by slashes, starting below the entity you search from. It picks out one entity even when names repeat elsewhere in the scene:

```javascript
const door = house.findByPath('ground-floor/door');
```

An entity's `path` property is its path from the root of the hierarchy. In a scene made in the Editor, every entity is below the scene's root entity, called `Root`, so paths from `app.root` start with it:

```javascript
const door = app.root.findByPath('Root/house/ground-floor/door');
console.log(door.path); // 'Root/house/ground-floor/door'
```

## By Tag {#by-tag}

[Tags](/user-manual/ecs/entities/#names-and-tags) label groups of entities, and `findByTag()` returns every descendant with a tag. Pass several tags to find entities with any of them, and an array of tags to find entities with all of them:

```javascript
const enemies = app.root.findByTag('enemy');

// entities tagged 'enemy' OR 'boss'
const hostile = app.root.findByTag('enemy', 'boss');

// entities tagged both 'enemy' AND 'flying'
const flyers = app.root.findByTag(['enemy', 'flying']);
```

To test a single entity, `entity.tags.has()` takes its arguments in the same way, so `goblin.tags.has('enemy', 'boss')` is `true` if the goblin has either tag.

## By Component or Script {#by-component-or-script}

```javascript
// every light in the scene
const lights = app.root.findComponents('light');
lights.forEach(light => light.enabled = false);

// the first instance of the Health script below the player, by class or by name
const health = player.findScript(Health);
```

## With a Test of Your Own {#with-a-test-of-your-own}

`find()` and `findOne()` take a function, which is called for each entity and returns `true` for the ones you want:

```javascript
const coins = level.find(entity => entity.name.startsWith('coin') && entity.enabled);
```

To visit every entity in a subtree without collecting them, use `forEach()`:

```javascript
level.forEach(entity => console.log(entity.path));
```

## On Each Surface {#on-each-surface}

<Tabs groupId="workflow" defaultValue="engine">
<TabItem value="engine" label="Engine">

Call the methods on `app.root` to search the whole scene, or on any entity to search the entities below it. In a script, `this.app.root` is the root and `this.entity` is the script's own entity:

```javascript
const wheels = this.entity.findByTag('wheel');
```

</TabItem>
<TabItem value="editor" label="Editor">

To find entities while you edit, type in the search box at the top of the Hierarchy. Click the magnifying glass to choose what it matches: **Name**, **Component Type**, **Script Name** or **Tags**, the same things the search methods look for. **Smart Search** also matches names that are close to what you type.

![The Hierarchy panel's search options: a Smart Search switch, and Search By checkboxes for Name, Component Type, Script Name and Tags](/img/user-manual/editor/hierarchy/hierarchy-search-options.png)

In scripts, you rarely need to search. Give the script an [entity attribute](/user-manual/scripting/script-attributes/esm/) and drag the entity onto it in the Inspector. The reference then survives renaming and moving the entity, which a search by name or path does not:

```javascript
import { Entity, Script } from 'playcanvas';

export class Key extends Script {
    static scriptName = 'key';

    /**
     * The door that this key opens.
     *
     * @attribute
     * @type {Entity}
     */
    door;

    open() {
        this.door.enabled = false;
    }
}
```

</TabItem>
<TabItem value="react" label="React">

You rarely need to search, because you rendered the entities yourself. Keep a ref to the ones your code needs:

```jsx
const door = useRef(null);

<Entity ref={door} name="door" />
```

To search the scene, start from the root of the application, in an effect so that the entities you rendered exist:

```jsx
import { useEffect } from 'react';
import { useApp } from '@playcanvas/react/hooks';

const app = useApp();

useEffect(() => {
  const enemies = app.root.findByTag('enemy');
}, [app]);
```

</TabItem>
<TabItem value="web-components" label="Web Components">

The document mirrors the hierarchy, so you can select an entity's element with the DOM and use its entity:

```javascript
const door = document.querySelector('pc-entity[name="door"]');
console.log(door.entity.getPosition().toString());
```

The DOM sees the markup, not the engine's state. For entities created from code, and for tags added at runtime, search the engine instead:

```javascript
import { whenReady } from '@playcanvas/web-components';

const { app } = await whenReady('pc-app');
const enemies = app.root.findByTag('enemy');
```

</TabItem>
</Tabs>

## Searching Efficiently {#searching-efficiently}

A search visits every entity it covers, so its cost grows with the size of the scene below it.

- **Search once.** Find the entities a script needs in its `initialize` method and keep them, rather than searching every frame.
- **Search close by.** Searching from the nearest entity that you know of visits fewer entities than searching from `app.root`.
- **Prefer references.** An entity attribute, a ref or an element you keep is faster than any search, and does not break when names change.

To browse the hierarchy of a running application, and to see what its entities and components are set to right now, use the [Inspector](/user-manual/scripting/debugging/inspector/) debug panel.

## See Also

- [Entities](/user-manual/ecs/entities/) - Naming and tagging entities
- [Script Attributes](/user-manual/scripting/script-attributes/) - Passing entity references to scripts
- [Hierarchy Panel](/user-manual/editor/interface/hierarchy/#searching-the-hierarchy) - Searching the hierarchy in the Editor
- [GraphNode](https://api.playcanvas.com/engine/classes/GraphNode.html), [Entity](https://api.playcanvas.com/engine/classes/Entity.html) and [Tags](https://api.playcanvas.com/engine/classes/Tags.html) - The engine API reference
