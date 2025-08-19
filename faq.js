const path = require("path");
const fs = require("fs");

// concatenate faq's into one file
const faqDir = path.join(__dirname, 'faq');
const files = fs.readdirSync(faqDir);
files.sort();

const outfile = path.join(__dirname, 'docs', 'user-manual', 'editor', 'faq.md');
const stream = fs.createWriteStream(outfile);

stream.once('open', () => {
    // write header
    stream.write('---\n');
    stream.write('title: Common Questions\n');
    stream.write('sidebar_position: 25\n');
    stream.write('---\n\n');

    const processFile = (content) => {
        let processed = content.replace(/font-icon/g, 'pc-icon');
        processed = processed.replace(/^---[\s\S]*?[\s\S]---/, '');

        processed = processed.replace(/^\n*/, '');
        return processed + '\n';
    };

    // write file content
    files.forEach((file) => {
        const content = fs.readFileSync(path.join(faqDir, file), 'utf8');
        const processed = processFile(content);
        stream.write(processed);
    });

    stream.end();
});
