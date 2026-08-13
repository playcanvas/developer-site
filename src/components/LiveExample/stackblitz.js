/**
 * Opens a project in StackBlitz via their form-POST API. Everything is built
 * in memory, so the form can be submitted synchronously inside the click
 * handler — the new tab is attributed to the user gesture and popup blockers
 * stay quiet. Same mechanism as the web-components repo's own exporter.
 *
 * @param {object} project - The project to open.
 * @param {Record<string, string>} project.files - Map of file path to contents.
 * @param {string} project.title - Project title shown in StackBlitz.
 * @param {string} project.description - Project description.
 */
export function openInStackBlitz({ files, title, description }) {
    const form = document.createElement('form');
    form.method = 'POST';
    form.action = 'https://stackblitz.com/run?file=index.html';
    form.target = '_blank';
    form.style.display = 'none';

    const add = (name, value) => {
        const input = document.createElement('input');
        input.type = 'hidden';
        input.name = name;
        input.value = value;
        form.appendChild(input);
    };

    add('project[title]', title);
    add('project[description]', description);
    add('project[template]', 'node');
    for (const [path, contents] of Object.entries(files)) {
        add(`project[files][${path}]`, contents);
    }

    document.body.appendChild(form);
    form.submit();
    form.remove();
}
