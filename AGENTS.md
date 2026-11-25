# Agent Guidelines for PlayCanvas Developer Site

## Project Overview

Documentation site for PlayCanvas built with Docusaurus 3.

- **Language**: Markdown/MDX
- **Framework**: Docusaurus 3
- **License**: MIT

## Directory Structure

```
docs/           # English documentation (source of truth)
i18n/ja/        # Japanese translations
static/img/     # Images (mirrors docs/ structure)
faq/            # FAQ source files (auto-generates docs/user-manual/editor/faq.md)
llms/           # Hand-written llms.txt indexes for AI agents (mirrors their published paths)
```

## Critical Rules

1. **Localization**: When updating `docs/`, also update the corresponding file in `i18n/ja/docusaurus-plugin-content-docs/current/`. Every page needs a Japanese file at the same path, case included: `npm run check:i18n` and CI fail otherwise.
2. **FAQ**: Do not edit `docs/user-manual/editor/faq.md` directly - it is auto-generated from `faq/`. Run `npm run faq` after editing FAQ source files.
3. **File operations**: Use `git mv` and `git rm` for moving/deleting files to ensure proper version control tracking.
4. **LLM indexes**: When you move, rename or remove a page, update any `llms/` index that links it. A new top-level User Manual section must be added to the `covers` list of one index. `npm test` and CI builds fail until both hold (local builds only warn).
5. **Tutorials**: Every page in `docs/tutorials/` sets `kind` and `topic` in its front matter (see [Update Tutorials](README.md#update-tutorials)). `npm test` and builds fail otherwise.

## Writing Style

Follow the [Writing Standards](.github/CONTRIBUTING.md#writing-standards).

## Commands

```bash
npm run start   # Development server
npm run build   # Production build (slow - several minutes, avoid unless necessary)
npm run lint    # Lint Markdown files
npm test        # Test the LLM file generation, including every llms/ index, and the tutorials front matter
npm run faq     # Regenerate FAQ page
npm run check:i18n    # Check every page has a Japanese counterpart at the same path
npm run check:links   # Check external links still resolve (slow - also runs weekly in CI)
npm run check:static  # Check static/ has no GIFs, oversized images or unused files
```
