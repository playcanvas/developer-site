// Checks the Web Components tag reference against the library's Custom Elements Manifest.
//
// The manual documents every `<pc-*>` tag by hand in docs/user-manual/web-components/tags/
// and its Japanese mirror. @playcanvas/web-components ships a Custom Elements Manifest whose
// attribute names, types, defaults, enum values and events are derived from the library
// source, so diffing the two catches the drift a reader cannot see: an attribute added or
// renamed, a default that moved, an enum that gained a value, an event nobody wrote up.
//
// The manifest is fetched from jsDelivr at the version the live examples are pinned to
// (PWC_VERSION in src/components/LiveExample/shell.js), so the reference is checked against
// exactly the library the examples run. Bumping the pin re-checks the whole reference.
//
// Usage:
//   node utils/check-web-components-manifest.mjs
//   node utils/check-web-components-manifest.mjs --manifest ../web-components/dist/custom-elements.json
//   node utils/check-web-components-manifest.mjs --root /path/to/another/checkout
//
// Exits 1 when anything is out of step. Every line of the report names the locale, the tag
// and the attribute or event, so the fix is a one-line edit to the page it points at.

import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const TAGS_DIR = 'docs/user-manual/web-components/tags';
const JA_TAGS_DIR = 'i18n/ja/docusaurus-plugin-content-docs/current/user-manual/web-components/tags';
const SHELL_PATH = 'src/components/LiveExample/shell.js';
const SIDEBARS_PATH = 'sidebars.js';
const CDN = 'https://cdn.jsdelivr.net/npm/@playcanvas/web-components';

const LOCALES = [
    { name: 'en', dir: TAGS_DIR },
    { name: 'ja', dir: JA_TAGS_DIR }
];

// Manifest attributes the pages document as a pattern rather than one row each.
const DOCUMENTED_AS_PATTERN = [
    // pc-material: every texture map takes the same five modifiers, covered once under
    // "Texture Map Modifiers".
    /^(ao|diffuse|emissive|gloss|height|metalness|normal|opacity)-map-(channel|offset|rotation|tiling|uv)$/,
    // pc-entity, pc-model, pc-node: inline handlers for the synthesized pointer events, covered
    // under "Events" alongside the events themselves.
    /^on(click|pointer(down|up|move|enter|leave))$/
];

// Documented attributes the manifest does not list. `id` is a global HTML attribute. The rest
// are read once when the element connects rather than observed, so the manifest's list, which
// is derived from attributeChangedCallback, never sees them; each of those pages carries a
// "When these are read" note saying so. An entry here that no longer matches a row is reported,
// so the lists cannot go stale.
const READ_ONCE = {
    '*': ['id'],
    'pc-asset': ['src', 'type', 'data', 'atlas', 'frame-keys', 'render-mode', 'pixels-per-unit'],
    'pc-wasm': ['name', 'glue', 'wasm', 'fallback']
};

// Defaults whose Default cell deliberately differs from the manifest literal. Keyed by
// `tag.attribute`, valued by the exact cell text. (A manifest default of Infinity is handled
// generally: the pages phrase it in words, in each language.)
const ALIAS_DEFAULTS = {
    'pc-material.roughness': '-' // an alias of gloss that also sets gloss-invert; 0.25 is the gloss default
};

// The `ready` event is shared by every asynchronous element and documented once, on the tag
// index and in Programmatic Access, rather than on each page.
const SHARED_EVENTS = ['ready'];

// The vocabulary of the Type column, defined under "The Type Column" in attributes.md. Every
// row must use one of these, in every locale, so a translated or misspelt token is reported.
const TYPE_VOCABULARY = new Set([
    'Boolean', 'Number', 'Enum', 'String', 'Color', 'Vector2', 'Vector3', 'Vector4',
    'Asset ID', 'Material ID', 'Entity Reference'
]);

// Types whose value grammar is defined on the Attributes page link there from the Type cell, so
// the token itself answers "what do I write here". Every row of these types must carry exactly
// this link, and no other type is linked.
const TYPE_LINKS = {
    'Asset ID': '../attributes.md#asset-and-material-ids',
    'Material ID': '../attributes.md#asset-and-material-ids',
    'Entity Reference': '../attributes.md#entity-references'
};

// Events a page documents by deferring to another page's table. The event name must still be
// mentioned on the page; it just need not have a row of its own.
const EVENTS_BY_REFERENCE = {
    // pc-model fires the six pointer events exactly as pc-entity does, and says so under Events.
    'pc-model': /^(click|pointer(down|up|move|enter|leave))$/
};

const args = process.argv.slice(2);
const option = (flag) => {
    const index = args.indexOf(flag);
    return index >= 0 ? args[index + 1] : null;
};
const root = path.resolve(option('--root') ?? path.join(path.dirname(fileURLToPath(import.meta.url)), '..'));
const read = (relative) => fs.readFile(path.join(root, relative), 'utf8');
const exists = (relative) => fs.access(path.join(root, relative)).then(() => true, () => false);

// ---------------------------------------------------------------------------------------------
// Manifest
// ---------------------------------------------------------------------------------------------

async function loadManifest() {
    const local = option('--manifest');
    if (local) {
        console.log(`Manifest: ${local}`);
        return JSON.parse(await fs.readFile(path.resolve(local), 'utf8'));
    }
    const shell = await read(SHELL_PATH);
    const version = shell.match(/export const PWC_VERSION = '([^']+)'/)?.[1];
    if (!version) {
        throw new Error(`Could not find PWC_VERSION in ${SHELL_PATH}`);
    }
    const url = `${CDN}@${version}/dist/custom-elements.json`;
    console.log(`Manifest: ${url}`);
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error(`Failed to fetch ${url}: ${response.status} ${response.statusText}`);
    }
    return response.json();
}

/**
 * Collects every custom element declaration in the manifest.
 *
 * @param {object} manifest - The parsed custom-elements.json.
 * @returns {Map<string, { attributes: object[], events: object[] }>} Declarations keyed by tag name.
 */
function collectElements(manifest) {
    const elements = new Map();
    for (const module of manifest.modules ?? []) {
        for (const declaration of module.declarations ?? []) {
            if (declaration.tagName) {
                elements.set(declaration.tagName, {
                    attributes: declaration.attributes ?? [],
                    events: declaration.events ?? []
                });
            }
        }
    }
    if (elements.size === 0) {
        throw new Error('The manifest declares no custom elements');
    }
    return elements;
}

// ---------------------------------------------------------------------------------------------
// Pages
// ---------------------------------------------------------------------------------------------

/**
 * Splits a Markdown table row into trimmed cells, honoring escaped pipes inside cells.
 *
 * @param {string} line - A line starting and ending with `|`.
 * @returns {string[]} The cells.
 */
const splitRow = (line) => line.trim().slice(1, -1).split(/(?<!\\)\|/).map((cell) => cell.trim());

/**
 * Parses the attribute table of a tag page: the rows between the Attributes heading and the next
 * second-level heading whose first cell is a single backticked attribute name. Restricting the
 * scan to that section keeps the JavaScript Interface property tables out of the comparison.
 *
 * A Type cell is either a bare token or a Markdown link around one; `type` is always the token
 * and `typeLink` the link target, or null.
 *
 * @param {string} markdown - The page source.
 * @returns {Map<string, { type: string, typeLink: string | null, default: string, description: string }>} Rows by attribute.
 */
function parseAttributeTable(markdown) {
    const rows = new Map();
    let inSection = false;
    for (const line of markdown.split(/\r?\n/)) {
        if (/^## /.test(line)) {
            inSection = /^## (Attributes\b|.*\{#attributes\})/.test(line);
            continue;
        }
        if (!inSection || !/^\| `[a-z][a-z0-9-]*` \|/.test(line)) {
            continue;
        }
        const cells = splitRow(line);
        if (cells.length < 4) {
            continue;
        }
        const link = cells[1].match(/^\[([^\]]+)\]\(([^)]+)\)$/);
        rows.set(cells[0].replace(/`/g, ''), {
            type: link ? link[1] : cells[1],
            typeLink: link ? link[2] : null,
            default: cells[2].replace(/^`|`$/g, '').replace(/^"|"$/g, '').trim(),
            description: cells[3]
        });
    }
    return rows;
}

/**
 * Extracts the enum values a description lists as backticked quoted names.
 *
 * @param {string} description - A Description cell.
 * @returns {Set<string>} The values.
 */
const enumValuesIn = (description) => new Set([...description.matchAll(/`"([^"`]+)"`/g)].map((match) => match[1]));

// ---------------------------------------------------------------------------------------------
// Comparisons
// ---------------------------------------------------------------------------------------------

/**
 * Parses a space-separated numeric value such as `"0.75 0.75 0.75 1"` or `"45"`.
 *
 * @param {string} text - The value.
 * @returns {number[] | null} The components, or null when the value is not numeric.
 */
function numbers(text) {
    const parts = text.trim().split(/\s+/);
    if (!parts.every((part) => /^-?(\d+\.?\d*|\.\d+)(e-?\d+)?$/i.test(part))) {
        return null;
    }
    return parts.map(Number);
}

/**
 * Compares a page's Default cell with the manifest's default.
 *
 * @param {string} documented - The normalized Default cell.
 * @param {string} declared - The manifest default.
 * @returns {boolean} Whether they agree.
 */
function sameDefault(documented, declared) {
    if (documented === declared) {
        return true;
    }
    if (declared === '') {
        return documented === '-';
    }
    if (declared === 'Infinity') {
        // No page prints "Infinity"; each locale says "uncapped" or "never breaks" in its own words.
        return documented !== '-' && documented !== '' && numbers(documented) === null;
    }
    const a = numbers(documented);
    const b = numbers(declared);
    if (!a || !b) {
        return false;
    }
    if (a.length === b.length) {
        return a.every((value, index) => value === b[index]);
    }
    // The manifest writes the engine's Color.WHITE and Color.BLACK without their alpha of 1, while
    // the pages spell out all four components.
    const [long, short] = a.length > b.length ? [a, b] : [b, a];
    return long.length === 4 && short.length === 3 && long[3] === 1 && short.every((value, index) => value === long[index]);
}

/**
 * Derives the Type the page should show from the manifest's type and its description hints.
 *
 * @param {object} attribute - A manifest attribute.
 * @returns {string | null} `Boolean`, `Number`, `Enum`, `Color`, `Vector2`..`Vector4`, or null when
 * the manifest only knows it is a string.
 */
function expectedType(attribute) {
    const text = attribute.type?.text ?? '';
    const description = attribute.description ?? '';
    if (text === 'boolean') return 'Boolean';
    if (text === 'number') return 'Number';
    if (text.includes('|')) return 'Enum';
    if (/Accepts a CSS color name/.test(description)) return 'Color';
    const vector = description.match(/Accepts (\d) space-separated/);
    return vector ? `Vector${vector[1]}` : null;
}

const enumValuesOf = (attribute) => new Set(attribute.type.text.split('|').map((value) => value.trim().replace(/^'|'$/g, '')));

const sameSet = (a, b) => a.size === b.size && [...a].every((value) => b.has(value));

// ---------------------------------------------------------------------------------------------
// Run
// ---------------------------------------------------------------------------------------------

const elements = collectElements(await loadManifest());
const problems = [];
const report = (locale, tag, message) => problems.push(`[${locale}] ${tag}: ${message}`);
let rowsChecked = 0;
let eventsChecked = 0;

const sidebars = await read(SIDEBARS_PATH);

for (const locale of LOCALES) {
    const index = await read(path.join(locale.dir, 'index.md'));
    const pages = (await fs.readdir(path.join(root, locale.dir))).filter((file) => /^pc-.*\.md$/.test(file));

    // Every page must describe a tag the library registers, which catches a rename in the library
    // that the manual has not followed.
    for (const file of pages) {
        const tag = file.replace(/\.md$/, '');
        if (!elements.has(tag)) {
            report(locale.name, tag, 'page exists but the manifest declares no such tag');
        }
    }

    for (const [tag, element] of elements) {
        const pagePath = path.join(locale.dir, `${tag}.md`);
        if (!(await exists(pagePath))) {
            report(locale.name, tag, 'no page');
            continue;
        }
        if (!index.includes(`](${tag})`)) {
            report(locale.name, tag, 'not listed in the tag index');
        }
        if (locale.name === 'en' && !sidebars.includes(`'user-manual/web-components/tags/${tag}'`)) {
            report(locale.name, tag, 'not listed in sidebars.js');
        }

        const markdown = await read(pagePath);
        const rows = parseAttributeTable(markdown);
        const declaredNames = new Set(element.attributes.map((attribute) => attribute.name));

        for (const attribute of element.attributes) {
            if (DOCUMENTED_AS_PATTERN.some((pattern) => pattern.test(attribute.name))) {
                continue;
            }
            const row = rows.get(attribute.name);
            if (!row) {
                report(locale.name, tag, `attribute \`${attribute.name}\` is not in the attribute table`);
                continue;
            }
            rowsChecked++;

            const type = expectedType(attribute);
            if (type && !row.type.startsWith(type)) {
                report(locale.name, tag, `\`${attribute.name}\` type is ${row.type}, manifest says ${type}`);
            }

            if (attribute.default !== undefined && attribute.default !== null) {
                const declared = String(attribute.default);
                const alias = ALIAS_DEFAULTS[`${tag}.${attribute.name}`];
                if (alias !== undefined ? row.default !== alias : !sameDefault(row.default, declared)) {
                    report(locale.name, tag, `\`${attribute.name}\` default is "${row.default}", manifest says "${declared}"`);
                }
            }

            if (type === 'Enum') {
                const declared = enumValuesOf(attribute);
                const documented = enumValuesIn(row.description);
                if (documented.size === 0) {
                    report(locale.name, tag, `\`${attribute.name}\` row does not list its values (${[...declared].join(', ')})`);
                } else if (!sameSet(documented, declared)) {
                    report(locale.name, tag, `\`${attribute.name}\` values are ${[...documented].join(', ')}; manifest says ${[...declared].join(', ')}`);
                }
            }
        }

        // Rows the manifest knows nothing about are either read-once attributes on the allowlist or
        // a rename the page has not followed. Allowlist entries with no row are reported too. Every
        // row's Type must come from the vocabulary, and link to the Attributes page exactly when the
        // vocabulary says so.
        const readOnce = [...READ_ONCE['*'], ...(READ_ONCE[tag] ?? [])];
        for (const [name, row] of rows) {
            if (!declaredNames.has(name) && !readOnce.includes(name)) {
                report(locale.name, tag, `attribute table has \`${name}\`, which the manifest does not declare`);
            }
            if (!TYPE_VOCABULARY.has(row.type)) {
                report(locale.name, tag, `\`${name}\` type "${row.type}" is not in the Type vocabulary (${[...TYPE_VOCABULARY].join(', ')})`);
            } else if (TYPE_LINKS[row.type] && row.typeLink !== TYPE_LINKS[row.type]) {
                report(locale.name, tag, `\`${name}\` type ${row.type} must link to ${TYPE_LINKS[row.type]}`);
            } else if (!TYPE_LINKS[row.type] && row.typeLink) {
                report(locale.name, tag, `\`${name}\` type ${row.type} must not be a link`);
            }
        }
        for (const name of READ_ONCE[tag] ?? []) {
            if (!rows.has(name)) {
                report(locale.name, tag, `READ_ONCE lists \`${name}\`, which is not in the attribute table`);
            }
        }

        for (const event of element.events) {
            if (SHARED_EVENTS.includes(event.name)) {
                continue;
            }
            eventsChecked++;
            const byReference = EVENTS_BY_REFERENCE[tag]?.test(event.name);
            const documented = byReference ?
                markdown.includes(`\`${event.name}\``) :
                new RegExp(`^\\| \`${event.name}\` \\|`, 'm').test(markdown);
            if (!documented) {
                report(locale.name, tag, `event \`${event.name}\` ${byReference ? 'is not mentioned' : 'has no row in an Events table'}`);
            }
        }
    }
}

console.log(`Checked ${elements.size} tags, ${rowsChecked} attribute rows and ${eventsChecked} events across ${LOCALES.map((locale) => locale.name).join(' and ')}.`);
if (problems.length) {
    console.log('');
    for (const problem of problems.sort()) {
        console.log(`  ${problem}`);
    }
    console.log(`\n${problems.length} problem${problems.length === 1 ? '' : 's'}.`);
    process.exit(1);
}
console.log('The tag reference matches the manifest.');
