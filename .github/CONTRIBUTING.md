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
- `<video>` for screen recordings and other animations (see [Videos](#videos))
- alert style boxes

For `<iframe>` and `<img>`, use `loading="lazy"` attribute to reduce initial page load times and size.

Refer to existing pages to see examples of prior use.

### Images

Images should be placed in the [`static/img`](https://github.com/playcanvas/developer-site/tree/main/static/img) folder. The folder structure should mirror the same structure as the folder for the Markdown files mentioned in the [Pages section](#pages).

Use WebP for new images. It is smaller than PNG and JPEG for the same quality:

- **Lossless WebP** for Editor UI, diagrams and anything else with text or sharp edges. It keeps every pixel, like PNG, at a smaller size. For example, `cwebp -lossless input.png -o output.webp`.
- **Lossy WebP** for photographic content such as game screenshots and rendered scenes, where you would otherwise use JPEG. A quality of around 85 works well: `cwebp -q 85 input.png -o output.webp`.

There's no need to convert existing PNG and JPEG images.

Don't use animated images. Use a [video](#videos) instead.

### Screenshots

Screenshots of the Editor, the Project Dashboard and other PlayCanvas tools should show the interface at the size it appears in a browser at 100% zoom. Then a button looks the same size in every screenshot, however much of the screen the screenshot shows.

- **One image pixel per screen pixel.** Capture with a device pixel ratio of 1. A screenshot taken on a Retina Mac (2x), or on Windows with display scaling above 100% (1.25x to 2x), has more pixels than the screen area it shows, so it appears enlarged on the page.
- **Use a 1600 × 900 window.** A screenshot of the whole window is then 1600 × 900, and every full-window screenshot shrinks to fit the page by the same amount.
- **Keep other screenshots at most 800 pixels wide**, so they display at full size in the text column. If the part you want to show is wider, crop to less of it, or make the window narrower so the layout reflows.
- **Crop, don't resize.** Don't scale a screenshot up or down after capturing it, and don't set a `width` on it.
- **Save as lossless WebP** (see [Images](#images)).

Chrome DevTools can capture to these rules on any computer:

1. Open DevTools and select **Toggle device toolbar** (<kbd>Ctrl</kbd> + <kbd>Shift</kbd> + <kbd>M</kbd>, or <kbd>Cmd</kbd> + <kbd>Shift</kbd> + <kbd>M</kbd> on a Mac).
2. Choose **Responsive** and set the size to 1600 × 900.
3. In the toolbar's **⋮** menu, select **Add device pixel ratio** and **Add device type**. Set the pixel ratio to 1 and the type to **Desktop**.
4. Capture:
   - The whole window: **⋮** > **Capture screenshot**.
   - One panel, dialog or menu: right-click its element in the **Elements** panel and select **Capture node screenshot**.
   - Any other area: open the Command Menu (<kbd>Ctrl</kbd> + <kbd>Shift</kbd> + <kbd>P</kbd>) and run **Capture area screenshot**.

Existing screenshots don't need to change until their page is next updated.

### Videos

Use MP4 video for anything that moves, such as screen recordings and animations. Avoid animated WebP and animated GIF. Safari plays animated WebP slower and slower as it goes, and GIF has poor compression and quality.

Put videos in the [`static/video`](https://github.com/playcanvas/developer-site/tree/main/static/video) folder and embed them with a `<video>` tag:

```html
<video autoPlay muted loop controls playsInline src="/video/my-feature.mp4" style={{width: '100%', height: 'auto'}} />
```

Encode with H.264, without an audio track, and with the index at the start of the file so playback can begin before the download finishes. 1600 × 900 is plenty for the width of a page. For example:

```sh
ffmpeg -i input.mov -vf scale=1600:-2 -c:v libx264 -crf 26 -preset slow -pix_fmt yuv420p -movflags +faststart -an output.mp4
```

On a page with several videos, the `StepVideo` component plays each one only while it's on screen. See [Your First App](https://github.com/playcanvas/developer-site/blob/main/docs/user-manual/editor/getting-started/your-first-app.md) for an example.

CI checks `static/` and fails on an animated GIF, an image over 1 MB, a video over 25 MB, or a file that no page or component uses. When a page stops using an image, delete the image too. Run the check yourself with `npm run check:static`.

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
