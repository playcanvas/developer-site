---
title: Units
---

PlayCanvas scenes generally treat 1 unit as 1 meter.

When authoring artwork for PlayCanvas, it is important to ensure you do so to the desired scale. To do this, you should check the working units for your scene in your modelling application of choice. You can choose whatever working units you like, but just ensure you respect them. For example, to make a cube that is 1 meter in dimension, you could set your working units to meters and create a 1x1x1 cube. Alternatively, you could set working units to centimeters and create a 100x100x100 cube. Exporting either scene to FBX and importing it to PlayCanvas will result in a cube which is 1x1x1.

### Blender

To ensure units are exported correctly from Blender, check that Scene Properties unit system is set to metric and that scale is set to 1.0:

![Blender units](/img/user-manual/assets/models/units/blender-units.png)

In addition, when exporting to FBX format, check that "Apply Scaling" is set to "FBX All":

![Blender FBX Export](/img/user-manual/assets/models/units/blender-fbx-export.png)

### Autodesk 3D Studio Max

To check or set working units in 3D Studio Max, open the Units Setup dialog and click the System Unit Setup button:

![3DS Max units](/img/user-manual/assets/models/units/max-units.png)

### Autodesk Maya

To check or set working units in Maya, open the Preferences dialog:

![Maya units](/img/user-manual/assets/models/units/maya-units.png)
