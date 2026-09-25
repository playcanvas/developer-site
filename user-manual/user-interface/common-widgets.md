# Common Widgets

The UI components are building blocks. This page puts them together into the widgets that most interfaces need. Each recipe shows the hierarchy to build, in the Editor or in code, and the code that makes it work.

## Progress and Health Bars

```none
health bar       image element: the background, 300 × 30
└── track        group element: Stretch anchor, margins of 4, the space the fill can take
    └── fill     image element: Stretch anchor, margins of 0, in the bar's color
```

The fill's right anchor follows the value, from 0 to 1, so the fill takes that share of the track, and the track keeps a border inside the bar:

```javascript
function setHealth(value) {
    fill.element.anchor = new pc.Vec4(0, 0, value, 1);
}
setHealth(0.7);
```

This squashes a textured fill. To crop the texture instead, anchor the fill to the track's left edge, with its pivot there too, and set its `width` and its `rect` together: `fill.element.width = value * 292`, the width of the track, and `fill.element.rect = new pc.Vec4(0, 0, value, 1)`. See the [progress bar](https://developer.playcanvas.com/tutorials/ui-elements-progress/) and [loading circle](https://developer.playcanvas.com/tutorials/loading-circle-ui/) tutorials for more.

## Sliders

A [scrollbar](https://developer.playcanvas.com/user-manual/user-interface/scroll-views.md#scrollbars) whose handle is smaller than its track is a slider. Its `value` goes from 0 to 1 as the handle is dragged, and on a vertical scrollbar, 0 is at the top.

```none
volume           image element: the track, 300 × 20, and a horizontal scrollbar component
└── handle       image element with input enabled: anchored to the track's height
```

```javascript
volume.scrollbar.handleSize = 0.1;
volume.scrollbar.value = 0.8;
volume.scrollbar.on('set:value', (value) => {
    app.systems.sound.volume = value;
});
```

## Toggles and Radio Groups

A toggle is a button whose look shows its state:

```none
music toggle     image element with input enabled, and a button component
└── check        image element: the tick, shown while the toggle is on
```

```javascript
let musicOn = true;
musicToggle.button.on('click', () => {
    musicOn = !musicOn;
    musicToggle.findByName('check').enabled = musicOn;
});
```

A radio group is a group element of such buttons, of which only one is on at a time:

```javascript
const options = difficulty.children;
for (const option of options) {
    option.button.on('click', () => {
        for (const other of options) {
            other.findByName('check').enabled = other === option;
        }
    });
}
```

## Modal Dialogs

A modal dialog covers the rest of the interface, and blocks its input until the dialog is closed:

```none
screen
├── hud          …
└── dialog       group element: Stretch anchor
    ├── backdrop image element: Stretch anchor, black, opacity 0.6, input enabled
    └── panel    image element with input enabled: the dialog, with its text and buttons
```

The dialog is last in the hierarchy, so it is drawn over the rest of the screen and receives input first. The backdrop fills the screen and has input enabled, so it catches every click that misses the panel, and the HUD below receives none. The panel has input enabled as well, so that clicks on its empty areas don't reach the backdrop. To keep clicks on the dialog from reaching the game too, stop them from propagating. See [Keeping UI Input from Reaching the Game](https://developer.playcanvas.com/user-manual/user-interface/input.md#blocking-game-input).

```javascript
function openDialog() {
    dialog.enabled = true;
}
function closeDialog() {
    dialog.enabled = false;
}

// Clicking outside the panel closes the dialog
dialog.findByName('backdrop').element.on('click', closeDialog);
```

To show a dialog over several screens, put it on a screen of its own with a higher [priority](https://developer.playcanvas.com/user-manual/user-interface/draw-order-and-performance.md#multiple-screens).

## Tooltips

A tooltip is a panel that is shown while the pointer is over an element:

```javascript
// The tooltip is a child of the icon, anchored above it
icon.element.useInput = true;
icon.element.on('mouseenter', () => {
    tooltip.enabled = true;
});
icon.element.on('mouseleave', () => {
    tooltip.enabled = false;
});
```

A child is drawn before the siblings that come after its parent, which can cover it. To draw a tooltip over everything, make it the last child of the screen instead, and move it to the element when you show it. Touch screens have no hover, so show tooltips on a long press there, or put the information on the screen.

## Dynamic Lists

A list whose items come from data, such as a leaderboard or an inventory, is a [layout group](https://developer.playcanvas.com/user-manual/user-interface/layout-groups.md) whose children are created from the data. Put it in a [scroll view](https://developer.playcanvas.com/user-manual/user-interface/scroll-views.md) when it can grow beyond its area.

**Engine**

```javascript
function showScores(scores) {
    // Remove the old rows, then add one for each score
    for (const row of [...list.children]) {
        row.destroy();
    }
    for (const { name, score } of scores) {
        const row = new pc.Entity(name);
        row.addComponent('element', {
            type: pc.ELEMENTTYPE_TEXT,
            fontAsset: font.id,
            text: `${name}   ${score}`,
            fontSize: 28
        });
        list.addChild(row);
    }
}

showScores([{ name: 'Ada', score: 1250 }, { name: 'Grace', score: 990 }]);
```

**Editor**

Build one row in the Hierarchy, with two text elements named `name` and `score` below it, and turn it into a [template](https://developer.playcanvas.com/user-manual/editor/templates.md). Then create the rows from a script:

```javascript
import { Asset, Entity, Script } from 'playcanvas';

export class Leaderboard extends Script {
    static scriptName = 'leaderboard';

    /**
     * The template of a row.
     *
     * @attribute
     * @type {Asset}
     * @resource template
     */
    rowTemplate;

    /**
     * The layout group to add the rows to.
     *
     * @attribute
     * @type {Entity}
     */
    list;

    showScores(scores) {
        for (const row of [...this.list.children]) {
            row.destroy();
        }
        for (const { name, score } of scores) {
            const row = this.rowTemplate.resource.instantiate();
            row.findByName('name').element.text = name;
            row.findByName('score').element.text = String(score);
            this.list.addChild(row);
        }
    }
}
```

**React**

Render an `<Entity>` for each item, with a stable `key`, inside a layout group:

```jsx
export function Scores({ font, scores }) {
  return (
    <Entity name="list">
      <Element type="group" anchor={[0.5, 0.5, 0.5, 0.5]} pivot={[0.5, 0.5]} width={300} height={400} />
      <LayoutGroup orientation={ORIENTATION_VERTICAL} spacing={[0, 10]} />
      {scores.map(({ name, score }) => (
        <Entity key={name} name={name}>
          <Element type="text" fontAsset={font} text={`${name}   ${score}`} fontSize={28} />
        </Entity>
      ))}
    </Entity>
  );
}
```

`LayoutGroup` is the component from [Creating a Layout Group](https://developer.playcanvas.com/user-manual/user-interface/layout-groups.md#creating-a-layout-group), which also explains how to keep the rows in order when items are inserted.

**Web Components**

Create the rows with the DOM API:

```javascript
function showScores(scores) {
    const list = document.querySelector('pc-entity[name="list"]');
    // Remove the old rows, but keep the list's own components
    list.querySelectorAll(':scope > pc-entity').forEach(row => row.remove());
    for (const { name, score } of scores) {
        const row = document.createElement('pc-entity');
        row.setAttribute('name', name);
        const text = document.createElement('pc-element');
        text.setAttribute('type', 'text');
        text.setAttribute('font-asset', 'arial');
        text.setAttribute('text', `${name}   ${score}`);
        text.setAttribute('font-size', '28');
        row.appendChild(text);
        list.appendChild(row);
    }
}
```

## Drag and Drop

[`ElementDragHelper`](https://api.playcanvas.com/engine/classes/ElementDragHelper.html) makes an element follow the pointer while it is dragged. The element needs input enabled, and the application a mouse or touch device:

```javascript
const drag = new pc.ElementDragHelper(card.element);
const home = card.getLocalPosition().clone();

// The bounds of an element, in CSS pixels from the top-left of the canvas
const bounds = (entity) => {
    const [bottomLeft, , topRight] = entity.element.canvasCorners;
    return { left: bottomLeft.x, right: topRight.x, top: topRight.y, bottom: bottomLeft.y };
};

drag.on('drag:end', () => {
    const a = bounds(card);
    const b = bounds(slot);
    const overSlot = a.left < b.right && a.right > b.left && a.top < b.bottom && a.bottom > b.top;
    // Snap the card into the slot, or back to where it came from
    if (overSlot) {
        card.setPosition(slot.getPosition());
    } else {
        card.setLocalPosition(home);
    }
});
```

Pass `'x'` or `'y'` as a second argument to drag along one axis only. `drag:start` and `drag:move` fire as the drag begins and continues.

## Text Fields

The UI system has no text input element. For text entry, place an HTML `<input>` over the canvas, which also gives the player the keyboard, selection, autocomplete and accessibility of the browser. See [HTML and CSS](https://developer.playcanvas.com/user-manual/user-interface/html-and-css.md#over-an-element), and the [UI Text Input](https://developer.playcanvas.com/tutorials/ui-text-input/) tutorial for a field that looks like the rest of an in-canvas interface.

## Animating UI

Elements are animated through their properties: the position, rotation and scale of their entity, and the color, opacity, anchor and margins of their element. Change them a little every frame, or with a tweening library:

```javascript
// Slide a panel in from the left over half a second
let t = 0;
const handle = app.on('update', (dt) => {
    t = Math.min(t + dt / 0.5, 1);
    const eased = 1 - Math.pow(1 - t, 3);
    panel.setLocalPosition(pc.math.lerp(-600, 0, eased), 0, 0);
    if (t === 1) handle.off();
});
```

Opacity doesn't cascade to children, so to fade a panel, fade every element below it:

```javascript
function setOpacity(entity, opacity) {
    if (entity.element && entity.element.type !== pc.ELEMENTTYPE_GROUP) {
        entity.element.opacity = opacity;
    }
    for (const child of entity.children) {
        setOpacity(child, opacity);
    }
}
```

This sets the same opacity on every element, so store the elements' own opacities first if they differ. Buttons fade between their tints with `fadeDuration`. See the [Tweening](https://developer.playcanvas.com/tutorials/tweening/) tutorial for a tween library.

## Loading Screens and Scene Changes

- **Loading screens.** An Editor project shows its loading screen before any scene, and so before any UI, has loaded, so the loading screen is HTML and CSS. See [Loading Screen](https://developer.playcanvas.com/user-manual/editor/interface/launch-page/loading-screen.md).
- **Scene changes.** An interface that belongs to a scene is destroyed with the scene. To keep a HUD across scene changes, load the new scene's hierarchy next to it rather than replacing everything. See [Loading Scenes](https://developer.playcanvas.com/user-manual/editor/scenes/loading-scenes.md) and the [Changing Scenes](https://developer.playcanvas.com/tutorials/changing-scenes/) tutorial.

## Touch Joysticks

On-screen joysticks and buttons for touch devices are elements that read touch events. The [Touchscreen Joypad Controls](https://developer.playcanvas.com/tutorials/touch-joypad/) tutorial builds a twin-stick layout that you can reuse.

## See Also

- [Buttons](https://developer.playcanvas.com/user-manual/user-interface/buttons.md) - States, tints and events
- [Layout Groups](https://developer.playcanvas.com/user-manual/user-interface/layout-groups.md) - Arranging lists and grids
- [Scroll Views](https://developer.playcanvas.com/user-manual/user-interface/scroll-views.md) - Scrolling content and scrollbars
- [HTML and CSS](https://developer.playcanvas.com/user-manual/user-interface/html-and-css.md) - Interfaces built with the DOM
