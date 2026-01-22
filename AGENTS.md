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
faq/            # FAQ source files (auto-generates docs/user-manual/faq.md)
```

## Critical Rules

1. **Localization**: When updating `docs/`, also update the corresponding file in `i18n/ja/docusaurus-plugin-content-docs/current/`
2. **FAQ**: Do not edit `docs/user-manual/faq.md` directly - it is auto-generated from `faq/`. Run `npm run faq` after editing FAQ source files.
3. **File operations**: Use `git mv` and `git rm` for moving/deleting files to ensure proper version control tracking.

## Commands

```bash
npm run start   # Development server
npm run build   # Production build (slow - several minutes, avoid unless necessary)
npm run lint    # Lint Markdown files
npm run faq     # Regenerate FAQ page
```
