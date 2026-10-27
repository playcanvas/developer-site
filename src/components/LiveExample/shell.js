// Pure string-building helpers for LiveExample. No DOM or React — safe to
// evaluate during SSR and easy to reason about in isolation.
//
// The versions below pin every live example on the site, Web Components scenes
// and Engine apps alike. Bump them together when the docs are updated to track
// a new @playcanvas/web-components release (the engine version should match
// the library's dev-pinned engine).
export const ENGINE_VERSION = '2.23.0';
export const PWC_VERSION = '0.28.1';

// The Vite version that Engine examples opened in StackBlitz install, matching
// the create-playcanvas starters.
const VITE_VERSION = '^8.3.1';

const CDN = 'https://cdn.jsdelivr.net/npm';

// The root of the pinned engine package, which Engine examples import subpaths
// from, such as playcanvas/scripts/esm/camera-controls.mjs.
const ENGINE_PACKAGE_URL = `${CDN}/playcanvas@${ENGINE_VERSION}`;

export const ENGINE_URL = `${ENGINE_PACKAGE_URL}/build/playcanvas.mjs`;

// The package's `jsdelivr` field resolves to the UMD build, so the ESM dist
// path must be spelled out explicitly.
export const PWC_URL = `${CDN}/@playcanvas/web-components@${PWC_VERSION}/dist/pwc.min.mjs`;

// Base URL for engine helper scripts referenced from <pc-asset> tags in
// example fragments (camera-controls.mjs etc.).
export const ENGINE_SCRIPTS_URL = `${CDN}/playcanvas@${ENGINE_VERSION}/scripts`;

/**
 * Relays uncaught errors, unhandled rejections and resource load failures to
 * the parent document. Runs before any other script so it catches importmap
 * and module loading problems too. The capture-phase error listener is what
 * picks up resource failures (bad asset URLs), which do not bubble.
 *
 * A Web Components scene reports ready on the window load event. An Engine
 * app creates its graphics device with top-level await, which the load event
 * does not wait for, so its document reports ready itself by calling
 * window.__pcLiveExampleReady() once the module has run.
 *
 * @param {string} nonce - Per-component-instance token echoed in every message.
 * @param {object} [options] - Options.
 * @param {boolean} [options.readyOnLoad] - Report ready on the load event.
 * @returns {string} The inline relay script.
 */
function buildErrorRelay(nonce, { readyOnLoad = true } = {}) {
    return `<script>
(function () {
    var NONCE = ${JSON.stringify(nonce)};
    function send(msg) {
        msg.source = 'pc-live-example';
        msg.nonce = NONCE;
        parent.postMessage(msg, '*');
    }
    window.addEventListener('error', function (e) {
        if (e.target && e.target !== window && e.target.tagName) {
            send({ type: 'error', message: 'Failed to load: ' + (e.target.src || e.target.href || e.target.tagName) });
        } else {
            send({ type: 'error', message: e.message || String(e.error) });
        }
    }, true);
    window.addEventListener('unhandledrejection', function (e) {
        send({ type: 'error', message: (e.reason && (e.reason.message || String(e.reason))) || 'Unhandled promise rejection' });
    });
    ${readyOnLoad ? `window.addEventListener('load', function () {
        send({ type: 'ready' });
    });` : `window.__pcLiveExampleReady = function () {
        send({ type: 'ready' });
    };`}
})();
</script>`;
}

/**
 * Wraps an example fragment in the full HTML document that runs it. The same
 * shell backs the preview iframe and the StackBlitz export so what you see is
 * exactly what you get.
 *
 * @param {string} fragment - The example markup (a complete <pc-app> scene).
 * @param {object} [options] - Options.
 * @param {string} [options.title] - Document title.
 * @param {string} [options.errorRelayNonce] - When set, injects the error
 * relay script (preview only — exports stay pristine).
 * @returns {string} A complete HTML document.
 */
export function buildDocument(fragment, { title = 'PlayCanvas Web Components Example', errorRelayNonce = null } = {}) {
    return `<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${escapeHtml(title)}</title>
        ${errorRelayNonce ? buildErrorRelay(errorRelayNonce) : ''}<script type="importmap">
            {
                "imports": {
                    "playcanvas": "${ENGINE_URL}",
                    "@playcanvas/web-components": "${PWC_URL}"
                }
            }
        </script>
        <script type="module" src="${PWC_URL}"></script>
        <style>
            body {
                margin: 0;
                overflow: hidden;
            }
            pc-app {
                width: 100%;
                height: 100vh;
                height: 100dvh;
            }
        </style>
    </head>
    <body>
${fragment}
    </body>
</html>`;
}

// The id of the canvas an Engine example renders into, as on the Using the
// Engine Standalone page.
const ENGINE_CANVAS_ID = 'application';

/**
 * Wraps an Engine example, a JavaScript module, in the HTML document that runs
 * it: a canvas for the code to render into, and an import map that resolves
 * `playcanvas` and its subpaths to the pinned engine. Backs the preview iframe
 * only; the StackBlitz export is a Vite project (see buildEngineProjectFiles).
 *
 * @param {string} code - The example module source.
 * @param {object} [options] - Options.
 * @param {string} [options.title] - Document title.
 * @param {string} [options.errorRelayNonce] - When set, injects the error
 * relay script and reports ready once the module has run.
 * @returns {string} A complete HTML document.
 */
export function buildEngineDocument(code, { title = 'PlayCanvas Engine Example', errorRelayNonce = null } = {}) {
    // A literal </script> would end the inline module early.
    const source = code.replace(/<\/script/gi, '<\\/script');
    const ready = errorRelayNonce ? '\n;window.__pcLiveExampleReady();' : '';
    return `<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${escapeHtml(title)}</title>
        ${errorRelayNonce ? buildErrorRelay(errorRelayNonce, { readyOnLoad: false }) : ''}<script type="importmap">
            {
                "imports": {
                    "playcanvas": "${ENGINE_URL}",
                    "playcanvas/": "${ENGINE_PACKAGE_URL}/"
                }
            }
        </script>
        <style>
            body {
                margin: 0;
                overflow: hidden;
            }
        </style>
    </head>
    <body>
        <canvas id="${ENGINE_CANVAS_ID}"></canvas>
        <script type="module">
${source}${ready}
        </script>
    </body>
</html>`;
}

// Where the site's own example assets live in production. Documented example
// code always uses this absolute base so copy-paste and StackBlitz exports
// work anywhere.
export const SITE_ASSETS_ORIGIN = 'https://developer.playcanvas.com';

/**
 * Builds the srcdoc for the preview iframe.
 *
 * When the site is served from anywhere other than production (local dev, a
 * deploy preview), site-hosted asset URLs are rewritten to the current origin
 * so previews exercise the local copies in static/assets/ — including assets
 * added in the same commit that are not deployed yet. In production this is
 * an identity transform. Exports are never rewritten.
 *
 * @param {string} fragment - The example markup, or module source for an Engine example.
 * @param {string} nonce - Per-instance token for the postMessage protocol.
 * @param {'html'|'js'} [language] - The example language: a Web Components
 * scene or an Engine app.
 * @returns {string} A complete HTML document with the error relay installed.
 */
export function buildPreviewHtml(fragment, nonce, language = 'html') {
    const build = language === 'js' ? buildEngineDocument : buildDocument;
    let html = build(fragment, { errorRelayNonce: nonce });
    if (typeof window !== 'undefined' && window.location.origin !== SITE_ASSETS_ORIGIN) {
        html = html.replaceAll(`${SITE_ASSETS_ORIGIN}/assets/`, `${window.location.origin}/assets/`);
    }
    return html;
}

const escapeHtml = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

// Matches jsDelivr npm URLs, capturing the (possibly scoped) package name,
// the version, and the file path within the package.
const JSDELIVR_REGEX = /https:\/\/cdn\.jsdelivr\.net\/npm\/((?:@[\w.-]+\/)?[\w.-]+)@([^/"'\s]+)\/([^"'\s)]+)/g;

/**
 * Rewrites jsDelivr URLs to local /node_modules/ paths and collects the
 * referenced packages, turning the CDN flavor of an example into the npm
 * flavor documented in the Getting Started guide.
 *
 * @param {string} html - The full CDN-flavored document.
 * @returns {{ html: string, dependencies: Record<string, string> }} The
 * transformed document and the package versions it references.
 */
export function toNpmProject(html) {
    const dependencies = {};
    let out = html.replace(JSDELIVR_REGEX, (match, pkg, version, path) => {
        dependencies[pkg] = version;
        return `/node_modules/${pkg}/${path}`;
    });
    // npm projects use the readable (unminified) ESM build, matching the npm
    // tab in the Getting Started guide.
    out = out.replaceAll('/node_modules/@playcanvas/web-components/dist/pwc.min.mjs', '/node_modules/@playcanvas/web-components/dist/pwc.mjs');
    return { html: out, dependencies };
}

/**
 * Builds the file set for a StackBlitz project from the current example code.
 * The project installs @playcanvas/web-components from npm and serves the
 * page statically — the workflow the manual recommends for real apps.
 *
 * @param {string} fragment - The example markup (current editor contents).
 * @param {object} meta - Project metadata.
 * @param {string} meta.title - Human-readable example title.
 * @param {string} meta.slug - Slug used for the package name.
 * @param {string} meta.docUrl - URL of the docs page the example came from.
 * @param {'html'|'js'} [meta.language] - The example language. Engine apps
 * become a Vite project instead (see buildEngineProjectFiles).
 * @returns {Record<string, string>} Map of file path to file contents.
 */
export function buildProjectFiles(fragment, { title, slug, docUrl, language = 'html' }) {
    if (language === 'js') {
        return buildEngineProjectFiles(fragment, { title, slug, docUrl });
    }

    const { html, dependencies } = toNpmProject(buildDocument(fragment, { title }));

    // The shell always references both packages; make the pins explicit and
    // give the engine an exact version so StackBlitz matches the preview.
    dependencies.playcanvas = ENGINE_VERSION;
    dependencies['@playcanvas/web-components'] = `^${PWC_VERSION}`;

    const packageJson = {
        name: `pwc-example-${slug}`,
        private: true,
        description: title,
        scripts: {
            start: 'serve .'
        },
        dependencies,
        devDependencies: {
            serve: '^14.2.6'
        },
        stackblitz: {
            startCommand: 'npm start'
        }
    };

    const readme = `# ${title}

A live example from the [PlayCanvas Web Components documentation](${docUrl}).

Run it with:

\`\`\`bash
npm install
npm start
\`\`\`

## Links

- [\`@playcanvas/web-components\` on npm](https://www.npmjs.com/package/@playcanvas/web-components)
- [User Manual](https://developer.playcanvas.com/user-manual/web-components/)
- [API Reference](https://api.playcanvas.com/web-components/)
`;

    return {
        'index.html': html,
        'package.json': `${JSON.stringify(packageJson, null, 2)}\n`,
        'README.md': readme
    };
}

/**
 * Builds the file set for a StackBlitz project from an Engine example: a Vite
 * project that installs playcanvas from npm, the setup recommended on the
 * Using the Engine Standalone page. The example code becomes main.js as is,
 * since Vite resolves its playcanvas imports from node_modules.
 *
 * @param {string} code - The example module source (current editor contents).
 * @param {object} meta - Project metadata.
 * @param {string} meta.title - Human-readable example title.
 * @param {string} meta.slug - Slug used for the package name.
 * @param {string} meta.docUrl - URL of the docs page the example came from.
 * @returns {Record<string, string>} Map of file path to file contents.
 */
function buildEngineProjectFiles(code, { title, slug, docUrl }) {
    const html = `<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${escapeHtml(title)}</title>
        <style>
            body {
                margin: 0;
                overflow: hidden;
            }
        </style>
    </head>
    <body>
        <canvas id="${ENGINE_CANVAS_ID}"></canvas>
        <script type="module" src="/main.js"></script>
    </body>
</html>
`;

    const packageJson = {
        name: `pc-engine-example-${slug}`,
        private: true,
        description: title,
        type: 'module',
        scripts: {
            dev: 'vite',
            build: 'vite build',
            preview: 'vite preview'
        },
        dependencies: {
            playcanvas: ENGINE_VERSION
        },
        devDependencies: {
            vite: VITE_VERSION
        },
        stackblitz: {
            startCommand: 'npm run dev'
        }
    };

    const readme = `# ${title}

A live example from the [PlayCanvas Engine documentation](${docUrl}).

Run it with:

\`\`\`bash
npm install
npm run dev
\`\`\`

## Links

- [\`playcanvas\` on npm](https://www.npmjs.com/package/playcanvas)
- [User Manual](https://developer.playcanvas.com/user-manual/engine/)
- [API Reference](https://api.playcanvas.com/engine/)
- [Examples](https://playcanvas.com/examples/)
`;

    return {
        'index.html': html,
        'main.js': code.endsWith('\n') ? code : `${code}\n`,
        'package.json': `${JSON.stringify(packageJson, null, 2)}\n`,
        'README.md': readme
    };
}
