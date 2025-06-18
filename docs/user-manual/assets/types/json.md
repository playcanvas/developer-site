---
title: JSON
---

[JSON](https://en.wikipedia.org/wiki/JSON) (JavaScript Object Notation) is a lightweight data-interchange format that is easy for humans to read and write and easy for machines to parse and generate.

In PlayCanvas, JSON assets are used to store various types of structured data. Some example use cases are:

- Configuration files
- Data for procedural generation
- Storing game settings
- Level design data

## Accessing JSON Data in Scripts

To access data from a JSON asset in a script:

1. Add the JSON asset to the script as an attribute.
2. Access the JSON asset's resource which is the object parsed from the JSON data.

Example:

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs defaultValue="classic" groupId='script-code'>
<TabItem  value="esm" label="ESM">

```javascript
import { Script } from 'playcanvas';

export class JsonScript extends Script {
    static scriptName = "jsonScript";

    /**
     * @attribute
     * @title Json Asset
     * @type {Asset}
     * @resource json
     */
    jsonAsset = null;

    initialize() {
        if (this.jsonAsset) {
            // Get the JSON asset's resource (an object)
            var jsonData = this.jsonAsset.resource;

            // Example: Accessing data from the JSON object
            if (jsonData.someDataField) {
                console.log("Data from JSON:", jsonData.someDataField);
            }
        }
    }
}
```

</TabItem>
<TabItem value="classic" label="Classic">

```javascript
var JsonScript = pc.createScript('jsonScript');

// Define an attribute to hold the JSON asset
JsonScript.attributes.add('jsonAsset', { type: 'asset', assetType: 'json' });

JsonScript.prototype.initialize = function () {
    if (this.jsonAsset) {
        // Get the JSON asset's resource (an object)
        const jsonData = this.jsonAsset.resource;

        // Example: Accessing data from the JSON object
        if (jsonData.someDataField) {
            console.log("Data from JSON:", jsonData.someDataField);
        }
    }
};
```

</TabItem>
</Tabs>
