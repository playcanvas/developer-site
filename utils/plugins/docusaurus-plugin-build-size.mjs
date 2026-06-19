import fs from 'fs';
import path from 'path';

const LOG_PREFIX = '[Build Size Plugin]';

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
 * Logs per-locale build output size after the final locale build (Issue #880).
 *
 * @param {import('@docusaurus/types').LoadContext} context
 * @param {Object} [options]
 * @param {number} [options.warnBuildSizeMb=950]
 */
export default function pluginBuildSize(context, options = {}) {
    const { siteConfig } = context;
    const defaultLocale = siteConfig.i18n.defaultLocale;
    const warnBuildSizeMb = options.warnBuildSizeMb ?? 950;

    return {
        name: 'docusaurus-plugin-build-size',

        async postBuild({ outDir, i18n }) {
            const locale = i18n.currentLocale;
            const nonDefaultLocales = siteConfig.i18n.locales.filter((l) => l !== defaultLocale);
            const isLastLocaleBuild =
                nonDefaultLocales.length === 0
                    ? locale === defaultLocale
                    : locale === nonDefaultLocales[nonDefaultLocales.length - 1];

            if (!isLastLocaleBuild) {
                return;
            }

            const buildRoot =
                locale === defaultLocale ? outDir : path.dirname(outDir);
            const totalBytes = getDirectorySizeBytes(buildRoot);
            const totalMb = totalBytes / (1024 * 1024);

            console.log(`${LOG_PREFIX} Build output size: ${formatSizeMb(totalBytes)} (${buildRoot})`);

            for (const loc of siteConfig.i18n.locales) {
                const localeOutDir =
                    loc === defaultLocale ? buildRoot : path.join(buildRoot, loc);
                if (!fs.existsSync(localeOutDir)) {
                    continue;
                }
                console.log(
                    `${LOG_PREFIX}   [${loc}] ${formatSizeMb(getDirectorySizeBytes(localeOutDir))}`,
                );
            }

            if (totalMb > warnBuildSizeMb) {
                console.warn(
                    `${LOG_PREFIX} Build size ${totalMb.toFixed(1)} MB exceeds ${warnBuildSizeMb} MB GitHub Pages safety target`,
                );
            }
        },
    };
}
