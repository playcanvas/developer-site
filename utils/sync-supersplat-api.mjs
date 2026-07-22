import fs from 'node:fs/promises';

const sourceUrl = 'https://playcanvas.com/api/supersplat/openapi.json';
const targetUrl = new URL('../openapi/supersplat-v1.json', import.meta.url);

const response = await fetch(sourceUrl);

if (!response.ok) {
    throw new Error(`Failed to fetch ${sourceUrl}: ${response.status} ${response.statusText}`);
}

const specification = await response.json();

if (!specification || typeof specification.openapi !== 'string') {
    throw new Error(`${sourceUrl} did not return an OpenAPI specification`);
}

const currentContents = await fs.readFile(targetUrl, 'utf8');
const nextContents = `${JSON.stringify(specification, null, 4)}\n`;

if (currentContents === nextContents) {
    console.log('SuperSplat OpenAPI specification is already up to date.');
} else {
    await fs.writeFile(targetUrl, nextContents);
    console.log('Updated openapi/supersplat-v1.json.');
}
