---
title: 単位
---

PlayCanvasのシーンでは、一般的に1ユニットを1メートルとして扱います。

PlayCanvas向けにアートワークを作成する際は、意図したスケールで作成することが重要です。これを行うには、お好みのモデリングアプリケーションでシーンの作業単位を確認する必要があります。任意の作業単位を選択できますが、それらの単位に従うことを確実にしてください。例えば、1メートルの大きさの立方体を作成するには、作業単位をメートルに設定し、1x1x1の立方体を作成できます。あるいは、作業単位をセンチメートルに設定し、100x100x100の立方体を作成することもできます。どちらのシーンもFBXにエクスポートし、PlayCanvasにインポートすると、1x1x1の立方体になります。

### Blender

Blenderから単位が正しくエクスポートされるようにするには、Scene Propertiesの単位システムが「metric」（メートル法）に設定されており、スケールが1.0に設定されていることを確認してください。

![Blender units](/img/user-manual/assets/models/units/blender-units.png)

さらに、FBX形式でエクスポートする際、「Apply Scaling」が「FBX All」に設定されていることを確認してください。

![Blender FBX Export](/img/user-manual/assets/models/units/blender-fbx-export.png)

### Autodesk 3D Studio Max

3D Studio Maxで作業単位を確認または設定するには、Units Setupダイアログを開き、System Unit Setupボタンをクリックします。

![3DS Max units](/img/user-manual/assets/models/units/max-units.png)

### Autodesk Maya

Mayaで作業単位を確認または設定するには、Preferencesダイアログを開きます。

![Maya units](/img/user-manual/assets/models/units/maya-units.png)
