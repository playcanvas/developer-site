import fs from 'fs';
import path from 'path';

const LOG_PREFIX = '[Dedupe Static Plugin]';

/**
 * Top-level static/ directories that should not be duplicated under non-default
 * locale outputs (e.g. build/ja/img/). Excludes "assets" because webpack may
 * emit hashed bundles into build/<locale>/assets/.
 *
 * @see https://github.com/playcanvas/developer-site/issues/880
 */
const DEFAULT_SHARED_STATIC_DIRS = ['img', 'video', 'downloads'];

/**
 * Recursively sum file sizes under a directory (bytes).
 *
 * @param {string} dirPath
 * @returns {number}
 */
function getDirectorySizeBytes(dirPath) {
    if (!fs.existsSync(dirPath)) {
        return 0;
    }

    let total = 0;
    for (const entry of fs.readdirSync(dirPath, { withFileTypes: true })) {
        const entryPath = path.join(dirPath, entry.name);
        if (entry.isDirectory()) {
            total += getDirectorySizeBytes(entryPath);
        } else if (entry.isFile()) {
            total += fs.statSync(entryPath).size;
        }
    }
    return total;
}

/**
 * @param {number} bytes
 * @returns {string}
 */
function formatSizeMb(bytes) {
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

/**
 * Docusaurus plugin to remove duplicated static directories from non-default
 * locale build outputs and report build size (Issue #880).
 *
 * Docusaurus copies static/ into each locale output unless staticDirectories is
 * scoped to the default locale (see docusaurus.config.js). Markdown uses pathname://
 * so non-default locales load shared files from the site root. This plugin removes
 * any leftover duplicated static trees and reports build size.
 *
 * @param {import('@docusaurus/types').LoadContext} context
 * @param {Object} [options]
 * @param {string[]} [options.sharedStaticDirs] - Dirs under static/ to strip from non-default locales
 * @param {number} [options.warnBuildSizeMb=950] - Warn when total build/ exceeds this size (MiB)
 * @param {boolean} [options.failOnSizeExceeded=false] - Fail the build when size limit exceeded
 */
export default function pluginDedupeStatic(context, options = {}) {
    const { siteConfig } = context;
    const defaultLocale = siteConfig.i18n.defaultLocale;
    const sharedStaticDirs = options.sharedStaticDirs ?? DEFAULT_SHARED_STATIC_DIRS;
    const warnBuildSizeMb = options.warnBuildSizeMb ?? 950;
    const failOnSizeExceeded = options.failOnSizeExceeded ?? false;

    return {
        name: 'docusaurus-plugin-dedupe-static',

        async postBuild({ outDir, i18n, siteDir }) {
            const locale = i18n.currentLocale;
            const buildRoot =
                locale === defaultLocale ? outDir : path.dirname(outDir);

            if (locale !== defaultLocale) {
                for (const dir of sharedStaticDirs) {
                    const target = path.join(outDir, dir);
                    if (!fs.existsSync(target)) {
                        continue;
                    }
                    fs.rmSync(target, { recursive: true, force: true });
                    console.log(
                        `${LOG_PREFIX} Removed duplicated static directory: ${path.relative(process.cwd(), target)}`,
                    );
                }
            }

            const nonDefaultLocales = siteConfig.i18n.locales.filter((l) => l !== defaultLocale);
            const isLastLocaleBuild =
                nonDefaultLocales.length === 0
                    ? locale === defaultLocale
                    : locale === nonDefaultLocales[nonDefaultLocales.length - 1];

            if (!isLastLocaleBuild) {
                return;
            }

            const totalBytes = getDirectorySizeBytes(buildRoot);
            const totalMb = totalBytes / (1024 * 1024);

            console.log(`${LOG_PREFIX} Build output size: ${formatSizeMb(totalBytes)} (${buildRoot})`);

            for (const loc of siteConfig.i18n.locales) {
                const localeOutDir =
                    loc === defaultLocale ? buildRoot : path.join(buildRoot, loc);
                if (!fs.existsSync(localeOutDir)) {
                    continue;
                }
                const localeBytes = getDirectorySizeBytes(localeOutDir);
                console.log(
                    `${LOG_PREFIX}   [${loc}] ${formatSizeMb(localeBytes)}`,
                );
            }

            if (totalMb <= warnBuildSizeMb) {
                return;
            }

            const message =
                `${LOG_PREFIX} Build size ${totalMb.toFixed(1)} MB exceeds ${warnBuildSizeMb} MB limit`;

            if (failOnSizeExceeded) {
                throw new Error(message);
            }

            console.warn(`${message} (warning only; set failOnSizeExceeded to fail the build)`);
        },
    };
}
