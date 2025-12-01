# PlayCanvas Developer Site

This is the source repository for the [PlayCanvas Developer Site](https://developer.playcanvas.com/). It is made up of static web content generated from Markdown files using [Docusaurus](https://docusaurus.io).

## How to build

Building the site requires an installation of Node.js 18+.

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

Tutorials are regular markdown files and can be edited directly. However, if you change the front matter (i.e. the tags, title or thumbnail), you'll need to regenerate the tutorials index using `npm run generate-tutorial-data`. You'll also need to do this if you add or remove a tutorial.

## Update FAQ

The User Manual on the developer site has a FAQ page which can be found at `docs/user-manual/faq.md`. This is the only Markdown file that is generated from other files (located in the `faq` directory). If you would like to add additional FAQs, check them in to the `faq` directory and to regenerate `docs/user-manual/faq.md` run:

```sh
npm run faq
```

## Localization

The Developer Site is localized to Japanese using AI-powered translation via the [markdown-translator](https://github.com/playcanvas/markdown-translator) tool, which leverages Google Gemini AI to translate markdown files while preserving formatting and structure.

When documentation in `docs` is updated, translate the affected files to Japanese using the markdown-translator tool. The translated files should be placed in the appropriate `i18n/ja/` directory structure to be picked up by Docusaurus.

Submit a PR with both the updated English content and the new Japanese translations.

**Note:** We welcome PRs to fix any translation errors or improvements in the localized documentation. AI translation isn't perfect, and community contributions help ensure accuracy!
