---
title: Scroll Views
description: Scroll content that is larger than its area by dragging, with the mouse wheel and with scrollbars, tune bouncing, friction and the drag threshold, size the content to fit a list, and scroll from code.
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

A scroll view shows part of a larger piece of content, and lets the user drag it, or turn the mouse wheel, to bring the rest into view. Lists, inventories, long text and maps all use one. It is made of several entities:

```none
scroll view              group element, and the scroll view component
├── viewport             image element that is a mask: the visible area
│   └── content          element larger than the viewport, with input enabled
│       └── …            the items being scrolled
└── scrollbar            image element, and a scrollbar component (optional)
    └── handle           image element with input enabled, dragged along the bar
```

The viewport is a [mask](/user-manual/user-interface/masks/), so the content is only drawn inside it. The content needs input enabled, so that it can be dragged by its empty areas too.

The scroll view moves the content by setting its local position, which is 0, 0 when the content is scrolled to its top-left. So anchor the content to the top-left corner of the viewport, or across its top edge, and give it a top-left pivot, `[0, 1]`. With any other pivot, part of the content starts out of view.

<EngineExample id="user-interface/scroll-view" title="Scroll View" />

## Creating a Scroll View {#creating-a-scroll-view}

This 300 × 400 scroll view scrolls a taller column vertically, with a scrollbar on its right:

<Tabs groupId="workflow" defaultValue="engine">
<TabItem value="engine" label="Engine">

```javascript
// The scroll view, 300 × 400 in the middle of the screen
const scrollView = new pc.Entity('scroll view');
scrollView.addComponent('element', {
    type: pc.ELEMENTTYPE_GROUP,
    anchor: [0.5, 0.5, 0.5, 0.5],
    pivot: [0.5, 0.5],
    width: 300,
    height: 400
});
screen.addChild(scrollView);

// The viewport fills the scroll view, apart from 20 units on the right for the scrollbar
const viewport = new pc.Entity('viewport');
viewport.addComponent('element', {
    type: pc.ELEMENTTYPE_IMAGE,
    anchor: [0, 0, 1, 1],
    margin: [0, 0, 20, 0],
    mask: true
});
scrollView.addChild(viewport);

// The content hangs from the top-left corner of the viewport
const content = new pc.Entity('content');
content.addComponent('element', {
    type: pc.ELEMENTTYPE_GROUP,
    anchor: [0, 1, 0, 1],
    pivot: [0, 1],
    width: 280,
    height: 1200,
    useInput: true
});
viewport.addChild(content);

// A scrollbar along the right edge, and its handle
const scrollbar = new pc.Entity('scrollbar');
scrollbar.addComponent('element', {
    type: pc.ELEMENTTYPE_IMAGE,
    anchor: [1, 0, 1, 1],
    pivot: [1, 1],
    margin: [0, 0, 0, 0],
    width: 20,
    color: new pc.Color(0.16, 0.18, 0.23)
});
scrollView.addChild(scrollbar);

const handle = new pc.Entity('handle');
handle.addComponent('element', {
    type: pc.ELEMENTTYPE_IMAGE,
    anchor: [0, 1, 1, 1],
    pivot: [1, 1],
    margin: [0, 0, 0, 0],
    color: new pc.Color(0.5, 0.55, 0.65),
    useInput: true
});
scrollbar.addChild(handle);
scrollbar.addComponent('scrollbar', {
    orientation: pc.ORIENTATION_VERTICAL,
    handleEntity: handle
});

scrollView.addComponent('scrollview', {
    viewportEntity: viewport,
    contentEntity: content,
    verticalScrollbarEntity: scrollbar,
    horizontal: false,
    vertical: true,
    scrollMode: pc.SCROLL_MODE_BOUNCE,
    bounceAmount: 0.1,
    friction: 0.05
});
```

Register `pc.ScrollViewComponentSystem` and `pc.ScrollbarComponentSystem` when you create the application, and give it a `pc.Mouse` for dragging with the mouse. A scroll view created from code has no settings of its own: it doesn't scroll on either axis until you set `horizontal` or `vertical`, and without a `scrollMode`, `bounceAmount` and `friction` it logs warnings, doesn't bounce back and stops dead when released. Pass all of them when you add it, as here.

</TabItem>
<TabItem value="editor" label="Editor">

In the Hierarchy, click **+** and choose **User Interface › Scroll View**. This creates the whole hierarchy: a `ScrollView` entity with the Scroll View component, a `Viewport` that is a mask, a `Content` entity with **Use Input** enabled, and a `HorizontalScrollbar` and a `VerticalScrollbar`, each with a `Handle`. The Scroll View component refers to all of them.

Put your items below `Content`, and set the size of `Content` to fit them. To scroll on one axis only, untick **Horizontal** or **Vertical** on the Scroll View component, delete the scrollbar you don't need, and clear its field in the component.

</TabItem>
<TabItem value="react" label="React">

`@playcanvas/react` has no scroll view or scrollbar components yet, so the `ScrollView` and `Scrollbar` defined here add the engine's components, with refs to the entities they use:

```jsx
import { useEffect, useRef } from 'react';
import { ORIENTATION_VERTICAL, SCROLL_MODE_BOUNCE } from 'playcanvas';
import { Entity } from '@playcanvas/react';
import { Element } from '@playcanvas/react/components';
import { useParent } from '@playcanvas/react/hooks';

function ScrollView({ viewport, content, verticalScrollbar, ...options }) {
  const entity = useParent();
  useEffect(() => {
    entity.addComponent('scrollview', {
      viewportEntity: viewport.current,
      contentEntity: content.current,
      verticalScrollbarEntity: verticalScrollbar?.current ?? null,
      ...options
    });
    return () => entity.removeComponent('scrollview');
  }, [entity]);
  return null;
}

function Scrollbar({ handle, ...options }) {
  const entity = useParent();
  useEffect(() => {
    entity.addComponent('scrollbar', { handleEntity: handle.current, ...options });
    return () => entity.removeComponent('scrollbar');
  }, [entity]);
  return null;
}

export function ItemList({ items }) {
  const viewport = useRef(null);
  const content = useRef(null);
  const scrollbar = useRef(null);
  const handle = useRef(null);

  return (
    <Entity name="scroll view">
      <Element type="group" anchor={[0.5, 0.5, 0.5, 0.5]} pivot={[0.5, 0.5]} width={300} height={400} />
      <Entity name="viewport" ref={viewport}>
        <Element type="image" anchor={[0, 0, 1, 1]} margin={[0, 0, 20, 0]} mask />
        <Entity name="content" ref={content}>
          <Element type="group" anchor={[0, 1, 0, 1]} pivot={[0, 1]} width={280} height={items.length * 70} useInput />
          {items.map((item, i) => (
            <Entity key={item.id} name={item.name} position={[10, -10 - i * 70, 0]}>
              <Element type="image" anchor={[0, 1, 0, 1]} pivot={[0, 1]} width={260} height={60} color="#3a8cff" />
            </Entity>
          ))}
        </Entity>
      </Entity>
      <Entity name="scrollbar" ref={scrollbar}>
        <Element type="image" anchor={[1, 0, 1, 1]} pivot={[1, 1]} margin={[0, 0, 0, 0]} width={20} color="#292e3b" />
        <Entity name="handle" ref={handle}>
          <Element type="image" anchor={[0, 1, 1, 1]} pivot={[1, 1]} margin={[0, 0, 0, 0]} color="#808ca6" useInput />
        </Entity>
        <Scrollbar handle={handle} orientation={ORIENTATION_VERTICAL} />
      </Entity>
      <ScrollView viewport={viewport} content={content} verticalScrollbar={scrollbar}
        horizontal={false} vertical scrollMode={SCROLL_MODE_BOUNCE} bounceAmount={0.1} friction={0.05} />
    </Entity>
  );
}
```

`ItemList` also fills the content with a row for each of its `items`, and makes the content as tall as the rows.

</TabItem>
<TabItem value="web-components" label="Web Components">

```html
<pc-entity name="scroll view">
    <pc-element type="group" anchor="0.5 0.5 0.5 0.5" pivot="0.5 0.5" width="300" height="400"></pc-element>
    <pc-scroll-view viewport="viewport" content="content" vertical-scrollbar="scrollbar" horizontal="false"></pc-scroll-view>
    <pc-entity name="viewport">
        <pc-element type="image" anchor="0 0 1 1" margin="0 0 20 0" mask></pc-element>
        <pc-entity name="content">
            <pc-element type="group" anchor="0 1 0 1" pivot="0 1" width="280" height="1200" use-input></pc-element>
        </pc-entity>
    </pc-entity>
    <pc-entity name="scrollbar">
        <pc-element type="image" anchor="1 0 1 1" pivot="1 1" margin="0 0 0 0" width="20" color="#292e3b"></pc-element>
        <pc-scrollbar orientation="vertical" handle="handle"></pc-scrollbar>
        <pc-entity name="handle">
            <pc-element type="image" anchor="0 1 1 1" pivot="1 1" margin="0 0 0 0" color="#808ca6" use-input></pc-element>
        </pc-entity>
    </pc-entity>
</pc-entity>
```

`<pc-scroll-view>` scrolls on both axes with the Bounce mode by default, so `horizontal="false"` limits it to vertical scrolling. It finds the entities it uses by name.

</TabItem>
</Tabs>

## Scrolling Behavior {#scrolling-behavior}

| Property | Effect |
| --- | --- |
| `horizontal`, `vertical` | The axes the content can scroll on |
| `scrollMode` | **Clamp** stops the content at its edges. **Bounce** lets it go past them and springs it back. **Infinite** lets it scroll forever |
| `bounceAmount` | How slowly the content springs back in Bounce mode. 0 snaps it back at once, 0.1 feels like scrolling on a phone, and larger values are slower |
| `friction` | How quickly the content slows down after it is flung, from 0 to 1. At 1 it stops at once |
| `dragThreshold` | How far, in screen units, the content moves in a drag before the elements inside it stop receiving input. 10 by default |
| `useMouseWheel`, `mouseWheelSensitivity` | Whether the mouse wheel scrolls the content, and how fast on each axis |

The content follows the pointer as soon as a drag starts. Once it has moved further than `dragThreshold`, the elements inside it stop receiving input until the drag ends, so dragging a list doesn't press the buttons in it, while a press that barely moves still does. The mouse wheel scrolls the content when the pointer is over an input-enabled element in the scroll view, such as the content, and doesn't bounce.

## Scrollbars {#scrollbars}

A scrollbar is an image element, the track, with a scrollbar component and a handle child. The scroll view sets the size of the handle to show how much of the content is visible, and its position to show the scroll position, and dragging the handle scrolls the content. Its **Visibility** (`horizontalScrollbarVisibility` and `verticalScrollbarVisibility`) can hide it when the content fits the viewport:

- `pc.SCROLLBAR_VISIBILITY_SHOW_ALWAYS` shows the scrollbar all the time. This is the default.
- `pc.SCROLLBAR_VISIBILITY_SHOW_WHEN_REQUIRED` hides it when the content isn't larger than the viewport.

A scrollbar also works on its own, as a slider. See [Sliders](/user-manual/user-interface/common-widgets/#sliders).

## Sizing the Content {#sizing-the-content}

The content's size decides how far it can scroll, and a scroll view never changes it for you. A list whose content is shorter than its items can't be scrolled to its end. When a [layout group](/user-manual/user-interface/layout-groups/) arranges the content's children, size the content from the layout group's `reflow` event, which fires with the bounds of the children after each layout:

```javascript
content.addComponent('layoutgroup', {
    orientation: pc.ORIENTATION_VERTICAL,
    spacing: [0, 10],
    padding: [10, 10, 10, 10],
    widthFitting: pc.FITTING_STRETCH
});
content.layoutgroup.on('reflow', ({ bounds }) => {
    // Make the content as tall as its rows, plus the top and bottom padding
    content.element.height = bounds.w + 20;
});
```

With the content anchored to the top of the viewport and a top pivot, as above, a taller content grows downwards, and the first rows stay in place.

## Scrolling from Code {#scrolling-from-code}

`scroll` is the scroll position, a `pc.Vec2` whose values go from 0 to 1 on each axis. On the vertical axis, 0 is the top of the content and 1 is the bottom:

```javascript
// Scroll to the end of a chat log
scrollView.scrollview.scroll = new pc.Vec2(0, 1);

// React to the user scrolling
scrollView.scrollview.on('set:scroll', (scroll) => {
    loadMoreButton.enabled = scroll.y > 0.95;
});
```

## See Also

- [Masks](/user-manual/user-interface/masks/) - How the viewport clips the content
- [Layout Groups](/user-manual/user-interface/layout-groups/) - Arranging the items of a list
- [Dynamic UI Scroll View](/tutorials/dynamic-ui-scroll-view/) - Tutorial that adds and removes items at runtime
- [Scroll View Component](/user-manual/editor/scenes/components/scrollview/), [`<pc-scroll-view>`](/user-manual/web-components/tags/pc-scroll-view/) and [ScrollViewComponent](https://api.playcanvas.com/engine/classes/ScrollViewComponent.html) - Reference for every scroll view property
- [Scrollbar Component](/user-manual/editor/scenes/components/scrollbar/), [`<pc-scrollbar>`](/user-manual/web-components/tags/pc-scrollbar/) and [ScrollbarComponent](https://api.playcanvas.com/engine/classes/ScrollbarComponent.html) - Reference for every scrollbar property
