# CONTRIBUTING

## How To Contribute

1. Looking for ideas? Check out ["good first PR"](https://github.com/playcanvas/developer-site/labels/good%20first%20PR) label.
2. Or start a conversation in [Issues](https://github.com/playcanvas/developer-site/issues) to get help and advice from the community on PR ideas.
3. Read the writing standards below.
4. Keep PRs simple and focused - one PR per feature with a screenshot of the changes on the site. [Example PR](https://github.com/playcanvas/developer-site/pull/624).
5. Make a Pull Request.
6. Happy Days! 🎉

### Tips

Feel free to contribute documentation fixes and new tutorials as a pull request.

If you are looking for ideas what to work on, head to [Issues](https://github.com/playcanvas/developer-site/issues) and check out open tickets or start a conversation. It is best to start a conversation if you are going to create a larger tutorial or refactor a section of the user manual. The [Forum](https://forum.playcanvas.com/) is a good place to have a chat with the community as well.

Try to keep your PR focused on a single subject or tutorial. Small PRs are easier to review and will get merged faster.

## Writing Standards

### General

Keep your target audience in mind and assume that they are completely new to the subject or PlayCanvas. Refer them to other pages or tutorials if you need prior knowledge to better understand the current content. For example, an FPS tutorial can refer to Basic Keyboard and Mouse Input as tutorials to complete before continuing.

Avoid using acronyms unless they are already defined on the page.

### Use International/American English spelling

For example, use "Initialize" instead of "Initialise", and "color" instead of "colour".

### Pages

Each page on [developer.playcanvas.com](https://developer.playcanvas.com) is generated from a Markdown file in [`docs`](https://github.com/playcanvas/developer-site/tree/main/docs).

The content layout for the User Manual mirrors the folder layout in [`docs/user-manual`](https://github.com/playcanvas/developer-site/tree/main/docs/user-manual).

Tutorials are grouped by tags that are listed at the top of each tutorial page in the metadata. The list of tags can be found on the left of our [tutorials page](https://developer.playcanvas.com/tutorials/).

Use inline links (`[link text](url)`) and minimize the use of HTML as much as possible. HTML usage is limited to:

- `<iframe>` for PlayCanvas project builds
- `<img>` to adjust sizes of images
- `<kbd>` for keyboard keys (see [Keyboard Keys](#keyboard-keys))
- alert style boxes

For `<iframe>` and `<img>`, use `loading="lazy"` attribute to reduce initial page load times and size.

Refer to existing pages to see examples of prior use.

### Images

Images should be placed in the [`static/img`](https://github.com/playcanvas/developer-site/tree/main/static/img) folder. The folder structure should mirror the same structure as the folder for the Markdown files mentioned in the [Pages section](#pages).

Use WebP for new images. It is smaller than PNG and JPEG for the same quality:

- **Lossless WebP** for Editor UI, diagrams and anything else with text or sharp edges. It keeps every pixel, like PNG, at a smaller size. For example, `cwebp -lossless input.png -o output.webp`.
- **Lossy WebP** for photographic content such as game screenshots and rendered scenes, where you would otherwise use JPEG. A quality of around 85 works well: `cwebp -q 85 input.png -o output.webp`.
- **Animated WebP** instead of animated GIF, which has poor compression and quality.

There's no need to convert existing PNG and JPEG images.

All images should be less than 2MB ideally.

### Code Blocks

When inserting code into a Markdown file, use backticks. For example:

```markdown
    ```javascript
    console.log('Hello World!');
    ```
```

Be sure to specify the relevant language to enable syntax highlighting. Valid values are: `css`, `glsl`, `html`, `javascript`, `json`, `sh` and `typescript`. Use `none` to disable syntax highlighting.

For any JavaScript code, please refer to the [PlayCanvas style guide](https://github.com/playcanvas/engine/blob/main/.github/CONTRIBUTING.md).

### Keyboard Keys

Write each key in its own `<kbd>` tag, not in backticks or bold:

```markdown
Press <kbd>F</kbd> to frame the selection.
```

- Join a key combination with `+` and no spaces: `<kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>Z</kbd>`.
- Write a mouse action in plain text after the key: `<kbd>Ctrl</kbd>-click`, `<kbd>Shift</kbd>-drag`, `<kbd>Alt</kbd> + mouse wheel`.
- Use these key names: `Ctrl`, `Shift`, `Alt`, `Cmd`, `Esc`, `Enter`, `Space`, `Tab`, `Delete` and `Backspace`.
- When a shortcut differs on macOS, give that version in parentheses: `<kbd>Ctrl</kbd>+<kbd>Z</kbd> (<kbd>Cmd</kbd>+<kbd>Z</kbd> on macOS)`.
- Write the `<` and `>` keys as `<kbd>&lt;</kbd>` and `<kbd>&gt;</kbd>`. Pages are parsed as MDX, where a bare `<` starts a tag.

Only keys go in `<kbd>`. Menu items, buttons and fields keep their usual formatting.

### Other files

Other files such as assets and zips can be placed in [`downloads`](https://github.com/playcanvas/developer-site/tree/main/static/downloads). As this is used very rarely, there is no folder structure to maintain.

### External projects

Usually, tutorials require a PlayCanvas project. Please transfer ownership of any related projects to user `playcanvas`. Steps to transfer projects can be [found here in the documentation](https://developer.playcanvas.com/user-manual/editor/projects/ownership-transfers/).
