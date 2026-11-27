# PlayCanvas Developer Site

This is the source repository for the [PlayCanvas Developer Site](https://developer.playcanvas.com/). It is made up of static web content generated from Markdown files using [Docusaurus](https://docusaurus.io).

## How to build

Building the site requires an installation of Node.js 22+.

```sh
cd developer.playcanvas.com
npm i
npm run build
```

## How to serve

To serve the built site locally:

```sh
npm run serve
```

This will automatically open the built site in your browser.

## Use 'start' for quick iteration

The `start` build command will automatically rebuild the site when changes are made in the `docs`, `src` or `static` folders.

```sh
npm run start
```

## Update Tutorials

Tutorials are regular Markdown files in `docs/tutorials`. The index page at `/tutorials/` and the tutorials sidebar are built from each page's front matter, so there is nothing to regenerate when you add, remove or edit one. Every tutorial sets these fields:

| Field | Value |
| --- | --- |
| `title`, `description` | Shown on the index page |
| `tags` | The tag filters on the index page |
| `thumb` | A square thumbnail image, stored on this site (`/img/tutorials/<page>/thumbnail.webp`) |
| `kind` | `tutorial` for a step-by-step guide, or `sample` for a project with little or no write-up |
| `topic` | The sidebar group, one of the topics listed in `utils/plugins/tutorials/data.mjs` |

`kind` and `topic` are read from the English page only, so leave them out of the Japanese translation. The build fails if either is missing or misspelled.

The **Most played** order on the index page uses a snapshot of how often each tutorial's project has been played. Refresh it with `npm run sync:tutorial-plays`.

Most thumbnails are copies of the tutorial project's own thumbnail, and `utils/plugins/tutorials/thumbs.json` records which project each one came from. When a project's thumbnail changes, the copy keeps showing the old one until you run `npm run sync:tutorial-thumbs`, which replaces the out-of-date copies (it needs `cwebp`, see [Images](.github/CONTRIBUTING.md#images)). `npm run sync:tutorial-thumbs -- --check` lists them without changing anything, and a weekly workflow runs the same check and opens an issue when there is something to do. For a new tutorial, save its project's thumbnail as `static/img/tutorials/<page>/thumbnail.webp` and add the page to `thumbs.json` with its project ID and the image URL, or use a thumbnail of your own and leave the page out of `thumbs.json`.

## Update FAQ

The User Manual on the developer site has a FAQ page which can be found at `docs/user-manual/editor/faq.md`. This is the only Markdown file that is generated from other files (located in the `faq` directory). If you would like to add additional FAQs, check them in to the `faq` directory and to regenerate `docs/user-manual/editor/faq.md` run:

```sh
npm run faq
```

## Localization

The Developer Site is localized to Japanese using AI-powered translation via the [markdown-translator](https://github.com/playcanvas/markdown-translator) tool, which leverages Google Gemini AI to translate markdown files while preserving formatting and structure.

When documentation in `docs` is updated, translate the affected files to Japanese using the markdown-translator tool. The translated files should be placed in the appropriate `i18n/ja/` directory structure to be picked up by Docusaurus.

Submit a PR with both the updated English content and the new Japanese translations. Every page in `docs` needs a translation at the same path, or the Japanese site serves that page in English. CI checks this, and you can run the check yourself with `npm run check:i18n`.

**Note:** We welcome PRs to fix any translation errors or improvements in the localized documentation. AI translation isn't perfect, and community contributions help ensure accuracy!
