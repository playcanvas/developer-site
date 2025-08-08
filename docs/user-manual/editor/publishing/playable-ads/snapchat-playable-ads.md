---
title: Snapchat Playable Ad
---

PlayCanvas supports the Snapchat Playable Ad format and requirements via an [official external tool on GitHub][2].

Snapchat playable ads uses the [MRAID 2.0 API][mraid-api] standard and requires the assets for the ad to be external from the `index.html` rather than embedded.

The external assets will need to be in a folder that is uniquely named (which the tool handles for you) so that they can be uploaded to Snapchat's CDN servers.

There are some limitations to be aware of with the tool which can be found in the documentation from [GitHub][2].

## Example project

The [Cube Jump project][5] is ready to be exported to the Snapchat Playable Ad format and the expected HTML output can be found [here][6].

<div className="iframe-container">
    <iframe src="https://playcanv.as/e/p/X1nwbUGA/" title="Cube Jump Playable Ad" allow="camera; microphone; xr-spatial-tracking; fullscreen" allowfullscreen></iframe>
</div>

## File size tips

As there is a soft limit of 5MB (uncompressed), you will have to plan and budget the usage of assets for the ad.

The minified PlayCanvas Engine code is **\~1.2MB** uncompressed and due to the need to encode the asset files into Base64 strings, it adds **\~30%** to the size of each asset file.

This means that you would have about \~3MB for assets before the Base64 encoding.

Try to keep images as small as possible in dimensions and use tools like [TinyPNG][4] to reduce file size even further.

## Playable ad checklist

The Snapchat ad network requires the call to action function to be in the `index.html` where the network can replace it with a unique tracking version when it is served to the user. The URL will be set in the Snapchat Ad campaign tool.

The tool wraps this logic in a global function: `snapchatCta();` that should be called in the playable ad project.

* Have you called the function `snapchatCta();` as part of the call to action callback?

## How to export

Follow the [setup steps][7] from the readme in the GitHub repo.

### Dry run test

As Snapchat does not yet have an official tool to test with, we will have to do a dry run to test with first before exporting in a format that the Snapchat ad network expects.

Set the following options in the `config.json` as shown below. This will produce a ZIP file with the asset data and PlayCanvas Engine code as separate files from the `index.html`.

```json
    "one_page": {
        "patch_xhr_out": false,
        "inline_game_scripts": true,
        "extern_files": {
            "enabled": true,
            "folder_name": "78fb9255-3033-4fe2-b9e1-355b149229a1",
            "external_url_prefix": ""
        },
        "mraid_support": true,
        "snapchat_cta": true
    }
```

The `folder_name` needs to be a unique string. For this purpose, you can use a random GUID from a [GUID generator][guid-generator] or your Snapchat representative may have a specific string that you should use.

And run the command:

```sh
npm run one-page
```

Full details of options and commands can be found in the readme section for '[Converting a project into a single HTML file][2]'.

To test the ad on a device, we can use the Android app [Creative Preview][creative-preview] but we need to host the ad on a https server.

Our recommended approach is to [host locally][host-locally] and use [ngrok][ngrok] to create a https tunnel to your computer that the app can access.

<img loading="lazy" src="/img/user-manual/editor/publishing/playable-ads/snapchat-playable-ads/ngrok.png" width="600" />

Once this is setup, open Creative Preview app and create a new 'Display' ad with the following settings:

<img loading="lazy" src="/img/user-manual/editor/publishing/playable-ads/snapchat-playable-ads/creative-preview.png" width="300" />

### Export for Snapchat

When the ad is ready to be uploaded for Snapchat, we need to add Snapchat's CDN URL prefix to the asset references in `index.html`. We can do this via the options in `config.json` via the `external_url_prefix` property:

```json
    "one_page": {
        "patch_xhr_out": false,
        "inline_game_scripts": true,
        "extern_files": {
            "enabled": true,
            "folder_name": "78fb9255-3033-4fe2-b9e1-355b149229a1",
            "external_url_prefix": "https://rtb-ads.shadow.snapads.com/html5"
        },
        "mraid_support": true,
        "snapchat_cta": true
    }
```

The ZIP can then be given to your Snapchat representative to upload to the ad network.

[2]: https://github.com/playcanvas/playcanvas-rest-api-tools#converting-a-project-into-a-single-html-file
[4]: https://tinypng.com/
[5]: https://playcanvas.com/project/796932/overview/cube-jump-snapchat-ad
[6]: pathname:///downloads/sc-playable-ad-cube-jump.zip
[7]: https://github.com/playcanvas/playcanvas-rest-api-tools#setup
[mraid-api]: https://www.iab.com/guidelines/mraid/
[guid-generator]: https://www.guidgenerator.com/
[creative-preview]: https://play.google.com/store/apps/details?id=com.google.android.apps.audition&hl=en_GB&gl=US
[host-locally]: /user-manual/editor/publishing/web/self-hosting/#running-a-downloaded-build
[ngrok]: https://ngrok.com/
