---
title: Animated Textures
tags: [animation, textures]
thumb: https://s3-eu-west-1.amazonaws.com/images.playcanvas.com/projects/12/405882/831708-image-75.jpg
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<div className='iframe-container'>
    <iframe src="https://playcanv.as/p/BM93v05L/" title="Animated Textures" allow="camera; microphone; xr-spatial-tracking; fullscreen" allowfullscreen></iframe>
</div>

*See the [full project](https://playcanvas.com/project/405882).*

It can be very useful to animate a material that has been applied to a surface. The example shown here is scrolling a texture to simulate some movement.

## Scrolling a material with map offset

The square plane in the example uses the script `scrolling-texture.js` to constantly move the UV offset every frame. For example, this can be used to simulate flowing water. The update loop is displayed below.

<Tabs defaultValue="classic" groupId='script-code'>
<TabItem value="classic" label="Classic">

```javascript
ScrollingTexture.prototype.update = function(dt) {
    var velocity = ScrollingTexture.tmpVec2;
    var offset = ScrollingTexture.tmpOffset;

    // Calculate how much to offset the texture
    // Speed * dt
    velocity.set(this.speed.x, this.speed.y);
    velocity.scale(dt);

    // Update the diffuse and normal map offset values
    offset.copy(this.material.diffuseMapOffset);
    offset.add(velocity);

    this.material.diffuseMapOffset = offset;
    this.material.normalMapOffset = offset;
    this.material.update();
};
```

</TabItem>
<TabItem  value="esm" label="ESM">

```javascript
update(dt) {
    const velocity = ScrollingTexture.tmpVec2;
    const offset = ScrollingTexture.tmpOffset;

    // Calculate how much to offset the texture
    // Speed * dt
    velocity.set(this.speed.x, this.speed.y);
    velocity.scale(dt);

    // Update the diffuse and normal map offset values
    offset.copy(this.material.diffuseMapOffset);
    offset.add(velocity);

    this.material.diffuseMapOffset = offset;
    this.material.normalMapOffset = offset;
    this.material.update();
};
```

</TabItem>
</Tabs>

We calculate the required offset into a temporary vector `tmp`. This is simply: `speed * timeStep`. Then we add this offset to the offset property for both the diffuse map and the normal map by modifying the `diffuseMapOffset` and `normalMapOffset` properties. These values are `pc.Vec2`s which shift the UV co-ordinates used to map the texture to the surface. If you are using other maps (e.g. emissive) you will also need to update these offset properties as well. Finally we call `material.update()` to propagate the changes into the shader.

This is a simple straightforward method to modify a material's offset and scroll a texture. It does have one downside which is this code modifies the actual material's properties. So if you have multiple models in a scene with the same material, they will all be affected.
