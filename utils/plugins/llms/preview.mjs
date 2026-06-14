// Usage: node utils/plugins/llms/preview.mjs [outDir]
// Generates llms.txt + llms-full.txt without a full Docusaurus build.
import fs from 'fs';
import os from 'os';
import path from 'path';
import { fileURLToPath } from 'url';

import pluginLlms from '../docusaurus-plugin-llms.mjs';

const siteDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', '..', '..');
const outDir = process.argv[2] ?? fs.mkdtempSync(path.join(os.tmpdir(), 'llms-preview-'));
fs.mkdirSync(outDir, { recursive: true });

const plugin = pluginLlms(
    { siteDir, siteConfig: { url: 'https://developer.playcanvas.com' } },
    { failOnError: true }
);
await plugin.postBuild({ outDir });
console.log(`\nPreview written to: ${outDir}`);
