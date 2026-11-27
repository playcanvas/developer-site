// Where the tutorial thumbnails copied from PlayCanvas projects live. Kept free of dependencies,
// so the scheduled thumbnail check can import it without installing anything.

// The pages whose thumbnail is a copy of a PlayCanvas project's thumbnail, with the project and
// the image the copy was made from. `npm run sync:tutorial-thumbs` keeps the copies up to date.
export const THUMBS_PATH = 'utils/plugins/tutorials/thumbs.json';

/**
 * The path a page's thumbnail is served at, when the thumbnail comes from its project.
 *
 * @param {string} slug - The page's file name without its extension.
 * @returns {string} The path, relative to static/.
 */
export function thumbnailPath(slug) {
    return `img/tutorials/${slug}/thumbnail.webp`;
}
