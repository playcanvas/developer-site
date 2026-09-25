# HTML and CSS

An interface doesn't have to be drawn in the canvas. HTML and CSS over the canvas give an interface the browser's text rendering and layout, form controls with text input and autocomplete, accessibility, CSS animation and every web font and emoji. PlayCanvas applications often mix the two: an HTML menu and settings screen, and an in-canvas HUD.

## When to Use HTML

HTML suits menus, settings, forms, chat, text entry, long text and anything that needs to be accessible. In-canvas UI suits HUDs and interfaces in the scene or in XR, anything that must be drawn in the same frame as the scene or appear in a capture of the canvas, and interfaces built in the Editor. See [the comparison in User Interface](https://developer.playcanvas.com/user-manual/user-interface.md#two-ways-to-build-ui).

## Layering HTML over the Canvas

Put the HTML in a container over the canvas, with the same position and size:

**Engine**

```javascript
// A full-window overlay, for a canvas that fills the window
const overlay = document.createElement('div');
overlay.className = 'overlay';
overlay.innerHTML = `
    <div class="score">Score: <span id="score">0</span></div>
    <button id="pause">Pause</button>
`;
document.body.appendChild(overlay);

const style = document.createElement('style');
style.textContent = `
    .overlay { position: fixed; inset: 0; pointer-events: none; font-family: sans-serif; color: white; }
    .overlay .score { position: absolute; top: 16px; left: 16px; font-size: 24px; }
    .overlay button { position: absolute; top: 16px; right: 16px; pointer-events: auto; }
`;
document.head.appendChild(style);

document.getElementById('pause').addEventListener('click', () => {
    app.timeScale = app.timeScale === 0 ? 1 : 0;
});
```

**Editor**

Upload the HTML and CSS as `.html` and `.css` assets, and add them to the page from a script:

```javascript
import { Asset, Script } from 'playcanvas';

export class HtmlOverlay extends Script {
    static scriptName = 'htmlOverlay';

    /**
     * @attribute
     * @type {Asset}
     * @resource html
     */
    html;

    /**
     * @attribute
     * @type {Asset}
     * @resource css
     */
    css;

    initialize() {
        const style = document.createElement('style');
        style.textContent = this.css.resource;
        document.head.appendChild(style);

        this.overlay = document.createElement('div');
        this.overlay.className = 'overlay';
        this.overlay.innerHTML = this.html.resource;
        document.body.appendChild(this.overlay);

        this.once('destroy', () => {
            this.overlay.remove();
            style.remove();
        });
    }
}
```

See the [HTML/CSS UI](https://developer.playcanvas.com/tutorials/htmlcss-ui/) tutorial.

**React**

Render the HTML next to `<Application>`, in a container that both fill:

```jsx
import { useState } from 'react';
import { Application } from '@playcanvas/react';

export function Game() {
  const [paused, setPaused] = useState(false);

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%' }}>
      <Application>
        {/* the scene */}
      </Application>
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', color: 'white' }}>
        <button style={{ position: 'absolute', top: 16, right: 16, pointerEvents: 'auto' }}
          onClick={() => setPaused(p => !p)}>
          {paused ? 'Resume' : 'Pause'}
        </button>
      </div>
    </div>
  );
}
```

State in the HTML and in the scene is ordinary React state. The HTML is outside `<Application>`, so it can't call `useApp()`: keep what both need in state above them.

**Web Components**

```html
<div class="game">
    <pc-app>
        <!-- the scene -->
    </pc-app>
    <div class="overlay">
        <button id="pause">Pause</button>
    </div>
</div>

<style>
    .game { position: relative; width: 100vw; height: 100dvh; }
    .game pc-app { width: 100%; height: 100%; }
    .overlay { position: absolute; inset: 0; pointer-events: none; }
    .overlay button { position: absolute; top: 16px; right: 16px; pointer-events: auto; }
</style>

<script type="module">
    import { whenReady } from '@playcanvas/web-components';

    const { app } = await whenReady('pc-app');
    document.getElementById('pause').addEventListener('click', () => {
        app.timeScale = app.timeScale === 0 ? 1 : 0;
    });
</script>
```

`pointer-events: none` on the overlay lets the pointer reach the canvas through its empty areas, and `pointer-events: auto` on its controls lets them receive it.

## Keeping HTML Input Away from the Game

The mouse and keyboard devices listen to the whole page, so a click on an HTML button over the canvas also reaches the game: `app.mouse.wasPressed()` reports it, and so does in-canvas UI under the button. Typing into an HTML text field sends its keys to `app.keyboard`, so a player typing their name can also walk forwards. Stop the events at the overlay:

```javascript
// Clicks, wheel turns and key presses on the overlay's controls don't reach the game
for (const type of ['mousedown', 'mouseup', 'wheel', 'keydown', 'keyup']) {
    overlay.addEventListener(type, event => event.stopPropagation());
}
```

Events on the overlay's empty areas pass through to the canvas as usual, as `pointer-events: none` sends them to it directly.

## Positioning HTML

### Over a 3D Point

The camera's `worldToScreen()` returns CSS pixels from the canvas's top-left corner, the coordinates HTML needs:

```javascript
const onCanvas = new pc.Vec3();
app.on('update', () => {
    camera.camera.worldToScreen(character.getPosition(), onCanvas);
    // Hide the tag when the point is behind the camera
    tag.style.display = onCanvas.z > 0 ? '' : 'none';
    tag.style.transform = `translate(${onCanvas.x}px, ${onCanvas.y}px) translate(-50%, -100%)`;
});
```

This assumes that the tag's container covers the canvas, with the tag at its top-left corner. See [Labels Over Characters](https://developer.playcanvas.com/user-manual/user-interface/world-space-ui.md#labels-over-characters) for the same with in-canvas elements. The engine's `annotations` script builds labeled hotspots on a model this way:

[Live example: Annotations](https://playcanvas.com/examples/#/misc/annotations) ([source](https://github.com/playcanvas/engine/blob/main/examples/src/examples/misc/annotations.example.mjs))

### Over an Element

An element's `canvasCorners` are its corners in CSS pixels from the canvas's top-left corner, in the order bottom-left, bottom-right, top-right, top-left. They place HTML exactly over an in-canvas element, for example a text field over an element that is styled as one:

```javascript
function placeOver(element, html) {
    const [bottomLeft, , topRight] = element.canvasCorners;
    const canvasRect = app.graphicsDevice.canvas.getBoundingClientRect();
    html.style.position = 'fixed';
    html.style.left = `${canvasRect.left + bottomLeft.x}px`;
    html.style.top = `${canvasRect.top + topRight.y}px`;
    html.style.width = `${topRight.x - bottomLeft.x}px`;
    html.style.height = `${bottomLeft.y - topRight.y}px`;
}
```

Call it again when the canvas or the element changes size. `canvasCorners` is for elements on screen-space screens. The [UI Text Input](https://developer.playcanvas.com/tutorials/ui-text-input/) tutorial builds a complete text field this way.

## Performance

The browser lays out and paints HTML on its own, alongside the canvas. Changing text and styles every frame costs time, most of all when it changes the layout, as a new width or height does. For HTML that moves every frame, such as a label that follows a character, change only `transform`, which the browser can apply without laying the page out again. Large semi-transparent HTML over the canvas also costs compositing time on mobile devices.

## Accessibility

In-canvas UI is pixels: screen readers can't read it, and keyboard users can't reach its controls with Tab. HTML controls are accessible by default when they use the right elements, such as `<button>`, `<input>` and `<label>`. Use HTML for menus, settings and anything else that has to be accessible, and give every control a visible focus state.

## HTML in the Canvas

An experimental browser API, HTML-in-Canvas, draws HTML into a texture that can be used in the scene, for example on a world-space panel. Few browsers support it yet, so treat it as an experiment and keep a fallback:

[Live example: HTML Texture](https://playcanvas.com/examples/#/misc/html-texture) ([source](https://github.com/playcanvas/engine/blob/main/examples/src/examples/misc/html-texture.example.mjs))

## PCUI for Tools

For editors and tools rather than games, [PCUI](https://playcanvas.github.io/pcui/) is the HTML component library that the PlayCanvas Editor is built with: panels, inspectors, tree views, inputs and more, in plain JavaScript or React.

## See Also

- [User Interface](https://developer.playcanvas.com/user-manual/user-interface.md) - In-canvas UI and HTML compared
- [World-Space UI](https://developer.playcanvas.com/user-manual/user-interface/world-space-ui.md) - Labels over characters and screen positions
- [Safe Areas](https://developer.playcanvas.com/user-manual/user-interface/safe-area.md) - Keeping HTML clear of notches with `env()`
- [HTML/CSS UI](https://developer.playcanvas.com/tutorials/htmlcss-ui/) - Tutorial that builds an HTML interface in the Editor
