const path = require("path");
const fs = require("fs");
const { marked } = require("marked");

const usage = 'Usage: node faq_to_json.js --dir faq --out ../editor/static/json/howdoi.json';

const args = process.argv.slice(2);
if (args.length === 0) {
    console.log(usage);
    process.exit(-1);
}

let ind = args.indexOf('--dir');
if (ind === -1 || !args[ind + 1]) {
    console.log(usage);
    process.exit(-1);
}
const sourceDir = args[ind + 1];

ind = args.indexOf('--out');
if (ind === -1 || !args[ind + 1]) {
    console.log(usage);
    process.exit(-1);
}
const outfile = args[ind + 1];

// parse frontmatter from markdown content
const parseFrontmatter = (content) => {
    // normalize line endings to \n
    const normalized = content.replace(/\r\n/g, '\n');
    const match = normalized.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
    if (!match) {
        return { frontmatter: {}, body: normalized };
    }

    const frontmatter = {};
    match[1].split('\n').forEach(line => {
        const [key, ...valueParts] = line.split(':');
        if (key && valueParts.length) {
            frontmatter[key.trim()] = valueParts.join(':').trim();
        }
    });

    return { frontmatter, body: match[2] };
};

// read all markdown files from the source directory
const faqDir = path.join(__dirname, sourceDir);
const files = fs.readdirSync(faqDir).filter(f => f.endsWith('.md'));
files.sort();

const json = [];

for (const file of files) {
    const content = fs.readFileSync(path.join(faqDir, file), 'utf8');
    const { frontmatter, body } = parseFrontmatter(content);

    let html = marked.parse(body);

    // links clicked in the Editor should open a new tab
    html = html.replace(/<a href=/g, '<a target="_blank" href=');

    // style buttons in the Editor
    html = html.replace('>Learn more<', ' class="docs">View User Manual<');
    html = html.replace('>View tutorial<', ' class="docs">View Tutorial<');

    // add close button
    html += '\n<button class="close">GOT IT</button>';

    // add data to json
    const keywords = frontmatter.keywords
        ? frontmatter.keywords.replace(/\s+/g, '').split(',')
        : [];

    json.push({
        title: frontmatter.title || file.replace('.md', ''),
        html: html,
        keywords: keywords
    });
}

const jsonStr = JSON.stringify(json, null, 4);

// save json file
console.log(`Saving ${outfile}...`);
fs.writeFileSync(outfile, jsonStr);
console.log('Done.');
