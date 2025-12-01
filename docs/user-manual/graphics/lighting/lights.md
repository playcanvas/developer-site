---
title: Lights
---

In the real world, the environment around you is lit from many sources. The Sun, street lights, TV screens and so on. In a PlayCanvas scene, you have the ability to set up a number of different types of light sources and the shape of the light source to approximate the different types of light we find in reality.

Descriptions of each light type and light source shape are below and examples of different combinations of light types and given in [table](#use-cases) below.

## Light Types {#light-types}

There are three types of light in PlayCanvas:

* Directional lights
* Omni lights
* Spot lights

### Directional Lights {#directional-lights}

The most familiar light source to us is the Sun. Because the Sun is so far from Earth, light that hits the surface of our planet can be approximated as traveling in a single direction. In PlayCanvas, this type of light source is called a Directional light.

When unselected, a directional light is represented by the following icon in the Editor's 3D view:

![Directional light icon](/img/user-manual/graphics/lighting/lights/directional_icon.jpg)

Click this icon to select the light in the Hierarchy and Inspector panels.

A directional light lights an object like this:

![Directional light](/img/user-manual/graphics/lighting/lights/directional.jpg)

### Omni Lights {#omni-lights}

Omni lights are light sources that emit light in all directions. An example of this type of light source is a candle and other examples can be seen in the [table](#use-cases) below.

When unselected, a omni light is represented by the following icon in the Editor's 3D view:

![Omni light icon](/img/user-manual/graphics/lighting/lights/point_icon.jpg)

Click this icon to select the light in the Hierarchy and Inspector panels.

An omni light lights an object like this:

![Omni light](/img/user-manual/graphics/lighting/lights/point.jpg)

### Spot Lights {#spot-lights}

Spot lights, like omni lights, emit light in all directions. However, the light from the spot light is constrained to a cone shape.

When unselected, a spot light is represented by the following icon in the Editor's 3D view:

![Spot light icon](/img/user-manual/graphics/lighting/lights/spot_icon.jpg)

Click this icon to select the light in the Hierarchy and Inspector panels.

A spot light lights an object like this:

![Spot light](/img/user-manual/graphics/lighting/lights/spot.jpg)

## Light Shapes {#light-shapes}

There are four light source shapes:

* Punctual
* Rectangle
* Disk
* Sphere

### Punctual {#punctual}

The punctual light source shape is an infinitesimally small point. This is the default light source shape and is a less physically correct, but relatively low cost approximation of a light source. The other light source shapes are more costly to render but will give more correct lighting and specular reflections.

### Rectangle {#rectangle}

The rectangle light source shape is a flat 4 sided shape with a specified width and height.

### Disk {#disk}

The disk light source shape is a round and flat light shape with a specified radius.

### Sphere {#sphere}

The sphere light source shape is ball shaped with a specified radius.

![Shapes](/img/user-manual/graphics/lighting/lights/shapes.jpg)

## Use Cases {#use-cases}

Below is a table of some common use cases each light source shape and light type:

| Shape/Type    | Punctual      | Rectangle               | Disk                  | Sphere              |
| ------------- |---------------| ------------------------| ----------------------| --------------------|
| Directional   | sun           | ❌                      | sun or moon           | sun or moon         |
| Omni          | unshaded bulb | ❌                      | ❌                    | unshaded round bulb |
| Spot          | torch         | tv screen               | shaded bulb           | shaded round bulb   |

❌ = no common use cases - but still can be used for application/game specific lighting effects.

## Performance Considerations {#performance-considerations}

Light sources with Rectangle, Disk and Sphere shapes do cost more to render than Punctual lights, so use Punctual light source shapes if you have relatively small light sources or do not have reflective surfaces where Punctual lights would appear visibly incorrect.
