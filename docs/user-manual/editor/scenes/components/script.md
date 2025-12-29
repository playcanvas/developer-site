---
title: Script
---

The Script component enables an entity to run user-supplied scripts. In this way, the user can write script (using the JavaScript language) that runs when the entity is instantiated and updated on a per-frame basis.

The Script component can be enabled or disabled using the toggle in the top right of the component panel. If enabled, all of the assigned scripts will have their update functions called every frame.

![Script component](/img/user-manual/editor/scenes/components/component-script.png)

To create a new script, click on the **`+`** button in the Assets Panel and select New Script. Then type the name of the script in the popup and hit Enter.

<img loading="lazy" src="/img/user-manual/editor/scenes/components/new-script.jpg" />

You can then drag the new script on a script component or you can click the Add Script button in the script component Inspector and then select it from the Assets Panel.

To edit the script in the PlayCanvas Code Editor you can either click on the hyperlinked script name, or you can select the script from the Assets Panel and click Edit.

## Scripting Interface

The Script component's scripting interface is [here][2].

[2]: https://api.playcanvas.com/engine/classes/ScriptComponent.html
