// Pure string-building helpers for LiveExample. No DOM or React — safe to
// evaluate during SSR and easy to reason about in isolation.
//
// The versions below pin every live example on the site. Bump them together
// when the docs are updated to track a new @playcanvas/web-components release
// (the engine version should match the library's dev-pinned engine).
export const ENGINE_VERSION = '2.21.4';
export const PWC_VERSION = '0.17.0';

const CDN = 'https://cdn.jsdelivr.net/npm';

export const ENGINE_URL = `${CDN}/playcanvas@${ENGINE_VERSION}/build/playcanvas.mjs`;

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
 * @param {string} nonce - Per-component-instance token echoed in every message.
 * @returns {string} The inline relay script.
 */
function buildErrorRelay(nonce) {
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
    window.addEventListener('load', function () {
        send({ type: 'ready' });
    });
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
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
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
 * @param {string} fragment - The example markup.
 * @param {string} nonce - Per-instance token for the postMessage protocol.
 * @returns {string} A complete HTML document with the error relay installed.
 */
export function buildPreviewHtml(fragment, nonce) {
    let html = buildDocument(fragment, { errorRelayNonce: nonce });
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
 * @returns {Record<string, string>} Map of file path to file contents.
 */
export function buildProjectFiles(fragment, { title, slug, docUrl }) {
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
