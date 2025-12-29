---
title: Anim
---

The anim component is used to connect an animstategraph asset and all of its required animation assets to a single entity.

Below you can see the anim component after it has been added to a component. It shows an available slot for an animstategraph asset to be selected.

![New Anim Component](/img/user-manual/animation/new-anim-component.png)

After selecting an animstategraph asset, the anim component will display a list of animation asset slots. There will be one slot for each animation state in every layer of the state graph asset. This is where actual animation data is connected to the previously created state graph. Multiple anim components can use the same animstategraph asset, each with their own set of animation assets.

![Anim Component With Graph](/img/user-manual/animation/anim-component-with-graph.png)

After all animation state slots have been filled, the anim component will become playable. At this point the anim component can either be played via script by calling `entity.anim.playing = true` or if the `Activate` option is selected, it will play automatically upon the launch of the PlayCanvas project.

The anim component also offers the option to alter the speed of the animation playback. This speed will affect every animation within the state graph.
