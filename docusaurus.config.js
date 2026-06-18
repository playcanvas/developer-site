// @ts-check
// `@type` JSDoc annotations allow editor autocompletion and type checking
// (when paired with `@ts-check`).
// There are various equivalent ways to declare your Docusaurus config.
// See: https://docusaurus.io/docs/api/docusaurus-config

import {themes as prismThemes} from 'prism-react-renderer';
import remarkTypedoc from './utils/plugins/remark-typedoc.mjs';
import pluginLlms from './utils/plugins/docusaurus-plugin-llms.mjs';
import pluginDedupeStatic from './utils/plugins/docusaurus-plugin-dedupe-static.mjs';

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'PlayCanvas Developer Site',
  tagline: 'Start learning PlayCanvas today!',
  favicon: 'img/favicon.ico',

  // Set the production url of your site here
  url: 'https://developer.playcanvas.com',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',

  // GitHub Pages deployment config (used by docusaurus deploy and the gh-pages workflow).
  organizationName: 'playcanvas',
  projectName: 'developer-site',

  trailingSlash: true,

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'ja']
  },

  // Shared static/ is copied only for the default locale. Non-default locales use
  // pathname:// URLs in Markdown (see utils/migrate-static-paths-to-pathname.mjs).
  staticDirectories:
    (process.env.DOCUSAURUS_CURRENT_LOCALE ?? 'en') === 'en'
      ? ['static']
      : [],

  future: {
    faster: true,
    v4: {
      removeLegacyPostBuildHeadAttribute: true,
    },
  },

  markdown: {
    mermaid: true,
  },

  themes: ['@docusaurus/theme-mermaid', '@docusaurus/theme-live-codeblock'],

  plugins: [
    [ '@docusaurus/plugin-client-redirects', {
      redirects: [
        { from: ['/api', '/en/api'], to: 'https://api.playcanvas.com' },
        // Retired Facebook docs (the Facebook Canvas web games platform was discontinued)
        { from: ['/tutorials/facebook-api/'], to: '/tutorials/' },
        { from: ['/user-manual/editor/publishing/web/facebook/'], to: '/user-manual/editor/publishing/web/' },
        { from: ['/user-manual/billing/'], to: '/user-manual/account-management/billing/' },
        { from: ['/user-manual/faq/'], to: '/user-manual/editor/faq/' },
        { from: ['/user-manual/getting-started/workflow/'], to: '/user-manual/editor/getting-started/workflow/' },
        { from: ['/user-manual/getting-started/your-first-app/'], to: '/user-manual/editor/getting-started/your-first-app/' },
        { from: ['/user-manual/graphics/gaussian-splatting/'], to: '/user-manual/gaussian-splatting/' },
        // WGSL Specifics renamed/split: shared resource reflection now lives on its own page
        { from: ['/user-manual/graphics/shaders/wgsl-specifics/'], to: '/user-manual/graphics/shaders/wgsl-reflection/' },
        // Gaussian splatting: unified-rendering merged into the rendering-architecture page (now its own section)
        { from: ['/user-manual/gaussian-splatting/building/unified-rendering/'], to: '/user-manual/gaussian-splatting/rendering-architecture/' },
        { from: ['/user-manual/gaussian-splatting/building/rendering-architecture/'], to: '/user-manual/gaussian-splatting/rendering-architecture/' },
        // Gaussian splatting: Draw Order and Sorting folded into the Renderers page
        { from: ['/user-manual/gaussian-splatting/building/draw-order/'], to: '/user-manual/gaussian-splatting/rendering-architecture/renderers/' },
        // Gaussian splatting: pipeline-internals topics now live under the Rendering Architecture section
        { from: ['/user-manual/gaussian-splatting/building/unified-rendering/splat-data-format/'], to: '/user-manual/gaussian-splatting/rendering-architecture/splat-data-format/' },
        { from: ['/user-manual/gaussian-splatting/building/unified-rendering/work-buffer-format/'], to: '/user-manual/gaussian-splatting/rendering-architecture/work-buffer-format/' },
        { from: ['/user-manual/gaussian-splatting/building/unified-rendering/work-buffer-rendering/'], to: '/user-manual/gaussian-splatting/rendering-architecture/work-buffer-rendering/' },
        { from: ['/user-manual/gaussian-splatting/building/unified-rendering/lod-streaming/'], to: '/user-manual/gaussian-splatting/building/lod-streaming/' },
        { from: ['/user-manual/gaussian-splatting/building/unified-rendering/splat-processing/'], to: '/user-manual/gaussian-splatting/rendering-architecture/splat-processing/' },
        { from: ['/user-manual/gaussian-splatting/building/unified-rendering/procedural-splats/'], to: '/user-manual/gaussian-splatting/building/procedural-splats/' },
        { from: ['/user-manual/gaussian-splatting/building/unified-rendering/procedural-splats/mesh/'], to: '/user-manual/gaussian-splatting/building/procedural-splats/mesh/' },
        { from: ['/user-manual/gaussian-splatting/building/unified-rendering/procedural-splats/image/'], to: '/user-manual/gaussian-splatting/building/procedural-splats/image/' },
        { from: ['/user-manual/gaussian-splatting/building/unified-rendering/procedural-splats/lines/'], to: '/user-manual/gaussian-splatting/building/procedural-splats/lines/' },
        { from: ['/user-manual/gaussian-splatting/building/unified-rendering/procedural-splats/text/'], to: '/user-manual/gaussian-splatting/building/procedural-splats/text/' },
        { from: ['/user-manual/graphics/shader-chunk-migrations/'], to: '/user-manual/graphics/shaders/migrations/' },
        { from: ['/user-manual/organizations/'], to: '/user-manual/account-management/organizations/' },
        { from: ['/user-manual/organizations/creating-organizations/'], to: '/user-manual/account-management/organizations/creating/' },
        { from: ['/user-manual/organizations/managing-organizations/'], to: '/user-manual/account-management/organizations/managing/' },
        { from: ['/user-manual/editor/keyboard-shortcuts/'], to: '/user-manual/editor/interface/keyboard-shortcuts/' },
        { from: ['/user-manual/editor/scene/settings/'], to: '/user-manual/editor/interface/settings/' },
        { from: ['/user-manual/scenes/entities/'], to: '/user-manual/ecs/entities/' },
        { from: ['/user-manual/scripting/loading-order/', '/en/user-manual/scripting/loading-order'], to: '/user-manual/editor/scripting/loading-order/' },
        // Legacy post effects moved to legacy subdirectory
        { from: ['/user-manual/graphics/posteffects/bloom/'], to: '/user-manual/graphics/posteffects/legacy/bloom/' },
        { from: ['/user-manual/graphics/posteffects/brightness_contrast/'], to: '/user-manual/graphics/posteffects/legacy/brightness_contrast/' },
        { from: ['/user-manual/graphics/posteffects/fxaa/'], to: '/user-manual/graphics/posteffects/legacy/fxaa/' },
        { from: ['/user-manual/graphics/posteffects/hue_saturation/'], to: '/user-manual/graphics/posteffects/legacy/hue_saturation/' },
        { from: ['/user-manual/graphics/posteffects/sepia/'], to: '/user-manual/graphics/posteffects/legacy/sepia/' },
        { from: ['/user-manual/graphics/posteffects/vignette/'], to: '/user-manual/graphics/posteffects/legacy/vignette/' },
        // Assets section reorganization - types moved to editor/assets/inspectors
        { from: ['/user-manual/assets/types/'], to: '/user-manual/editor/assets/inspectors/' },
        { from: ['/user-manual/assets/types/animation/'], to: '/user-manual/editor/assets/inspectors/animation/' },
        { from: ['/user-manual/assets/types/audio/'], to: '/user-manual/editor/assets/inspectors/audio/' },
        { from: ['/user-manual/assets/types/css/'], to: '/user-manual/editor/assets/inspectors/css/' },
        { from: ['/user-manual/assets/types/cubemap/'], to: '/user-manual/editor/assets/inspectors/cubemap/' },
        { from: ['/user-manual/assets/types/font/'], to: '/user-manual/editor/assets/inspectors/font/' },
        { from: ['/user-manual/assets/types/gsplat/'], to: '/user-manual/editor/assets/inspectors/gsplat/' },
        { from: ['/user-manual/assets/types/html/'], to: '/user-manual/editor/assets/inspectors/html/' },
        { from: ['/user-manual/assets/types/json/'], to: '/user-manual/editor/assets/inspectors/json/' },
        { from: ['/user-manual/assets/types/material/'], to: '/user-manual/editor/assets/inspectors/material/' },
        { from: ['/user-manual/assets/types/render/'], to: '/user-manual/editor/assets/inspectors/render/' },
        { from: ['/user-manual/assets/types/shader/'], to: '/user-manual/editor/assets/inspectors/shader/' },
        { from: ['/user-manual/assets/types/sprite/'], to: '/user-manual/editor/assets/inspectors/sprite/' },
        { from: ['/user-manual/assets/types/template/'], to: '/user-manual/editor/assets/inspectors/template/' },
        { from: ['/user-manual/assets/types/text/'], to: '/user-manual/editor/assets/inspectors/text/' },
        { from: ['/user-manual/assets/types/texture/'], to: '/user-manual/editor/assets/inspectors/texture/' },
        { from: ['/user-manual/assets/types/texture-atlas/'], to: '/user-manual/editor/assets/inspectors/texture-atlas/' },
        { from: ['/user-manual/assets/types/wasm/'], to: '/user-manual/editor/assets/inspectors/wasm/' },
        // Other assets pages moved to editor
        { from: ['/user-manual/assets/importing/'], to: '/user-manual/editor/assets/importing/' },
        { from: ['/user-manual/assets/import-pipeline/'], to: '/user-manual/editor/assets/import-pipeline/' },
        { from: ['/user-manual/assets/import-pipeline/import-hierarchy/'], to: '/user-manual/editor/assets/import-pipeline/import-hierarchy/' },
        { from: ['/user-manual/assets/asset-store/'], to: '/user-manual/editor/assets/asset-store/' },
        { from: ['/user-manual/assets/asset-store/sketchfab/'], to: '/user-manual/editor/assets/asset-store/sketchfab/' },
        { from: ['/user-manual/assets/viewers/'], to: '/user-manual/editor/assets/viewers/' },
        // Preloading renamed
        { from: ['/user-manual/assets/preloading-and-streaming/'], to: '/user-manual/assets/preloading/' },
        { from: ['/user-manual/api/project-archive/'], to: '/user-manual/api/project-export/' },
        { from: ['/user-manual/editor/projects/backup-archiving/'], to: '/user-manual/editor/projects/backup-and-export/' },
        // SplatTransform promoted from gaussian-splatting/editing/splat-transform/ to top-level Core Products
        { from: ['/user-manual/gaussian-splatting/editing/splat-transform/'], to: '/user-manual/splat-transform/' },
        // SuperSplat promoted from gaussian-splatting/editing/supersplat/ to top-level Core Products
        // and then again nested into supersplat/editor/ as the platform now covers Editor, Studio,
        // Viewer, Convert, etc. — see /user-manual/supersplat/
        { from: ['/user-manual/gaussian-splatting/editing/supersplat/'], to: '/user-manual/supersplat/' },
        { from: ['/user-manual/gaussian-splatting/editing/supersplat/interface/'], to: '/user-manual/supersplat/editor/interface/' },
        { from: ['/user-manual/gaussian-splatting/editing/supersplat/import-export/'], to: '/user-manual/supersplat/editor/import-export/' },
        { from: ['/user-manual/gaussian-splatting/editing/supersplat/managing-projects/'], to: '/user-manual/supersplat/editor/managing-projects/' },
        { from: ['/user-manual/gaussian-splatting/editing/supersplat/camera-controls/'], to: '/user-manual/supersplat/editor/camera-controls/' },
        { from: ['/user-manual/gaussian-splatting/editing/supersplat/editing-splats/'], to: '/user-manual/supersplat/editor/editing-splats/' },
        { from: ['/user-manual/gaussian-splatting/editing/supersplat/data-panel/'], to: '/user-manual/supersplat/editor/data-panel/' },
        { from: ['/user-manual/gaussian-splatting/editing/supersplat/timeline/'], to: '/user-manual/supersplat/editor/timeline/' },
        { from: ['/user-manual/gaussian-splatting/editing/supersplat/rendering/'], to: '/user-manual/supersplat/editor/rendering/' },
        { from: ['/user-manual/gaussian-splatting/editing/supersplat/publishing/'], to: '/user-manual/supersplat/editor/publishing/' },
        // Editor pages moved from supersplat/<page>/ to supersplat/editor/<page>/ as part of
        // restructuring the section into a full-platform overview (Editor + Studio + Viewer + Convert).
        { from: ['/user-manual/supersplat/interface/'], to: '/user-manual/supersplat/editor/interface/' },
        { from: ['/user-manual/supersplat/import-export/'], to: '/user-manual/supersplat/editor/import-export/' },
        { from: ['/user-manual/supersplat/managing-projects/'], to: '/user-manual/supersplat/editor/managing-projects/' },
        { from: ['/user-manual/supersplat/camera-controls/'], to: '/user-manual/supersplat/editor/camera-controls/' },
        { from: ['/user-manual/supersplat/editing-splats/'], to: '/user-manual/supersplat/editor/editing-splats/' },
        { from: ['/user-manual/supersplat/data-panel/'], to: '/user-manual/supersplat/editor/data-panel/' },
        { from: ['/user-manual/supersplat/timeline/'], to: '/user-manual/supersplat/editor/timeline/' },
        { from: ['/user-manual/supersplat/rendering/'], to: '/user-manual/supersplat/editor/rendering/' },
        { from: ['/user-manual/supersplat/publishing/'], to: '/user-manual/supersplat/editor/publishing/' },
      ],
      createRedirects: (existingPath) => {
        // Create redirects from old paths prefixed with /en
        const redirects = [
          `/en${existingPath}`
        ];

        if (existingPath.includes('/user-manual/editor/')) {
          const redirect = existingPath.replace('/user-manual/editor/', '/user-manual/designer/');
          redirects.push(redirect);
        }

        if (existingPath.includes('/user-manual/editor/scenes/')) {
          // Redirect from old /user-manual/scenes/ path
          const redirect = existingPath.replace('/user-manual/editor/scenes/', '/user-manual/scenes/');
          redirects.push(redirect);
          // Redirect from legacy /user-manual/packs/ path
          const packRedirect = existingPath.replace('/user-manual/editor/scenes/', '/user-manual/packs/');
          redirects.push(packRedirect);
        }

        // Redirect old hyphenated component names to new names matching the Editor
        if (existingPath.includes('/user-manual/editor/scenes/components/layoutgroup')) {
          redirects.push(existingPath.replace('layoutgroup', 'layout-group'));
        }
        if (existingPath.includes('/user-manual/editor/scenes/components/layoutchild')) {
          redirects.push(existingPath.replace('layoutchild', 'layout-child'));
        }

        if (existingPath.includes('/user-manual/editor/interface/hierarchy')) {
          const redirect = existingPath.replace('/user-manual/editor/interface/hierarchy', '/user-manual/editor/hierarchy');
          redirects.push(redirect);
        }

        if (existingPath.includes('/user-manual/editor/interface/inspector')) {
          const redirect = existingPath.replace('/user-manual/editor/interface/inspector', '/user-manual/editor/inspector');
          redirects.push(redirect);
        }

        if (existingPath.includes('/user-manual/editor/interface/toolbar')) {
          const redirect = existingPath.replace('/user-manual/editor/interface/toolbar', '/user-manual/editor/toolbar');
          redirects.push(redirect);
        }

        if (existingPath.includes('/user-manual/editor/interface/viewport')) {
          const redirect = existingPath.replace('/user-manual/editor/interface/viewport', '/user-manual/editor/viewport');
          redirects.push(redirect);
        }

        if (existingPath.includes('/user-manual/editor/interface/launch-page')) {
          const redirect = existingPath.replace('/user-manual/editor/interface/launch-page', '/user-manual/editor/launch-page');
          redirects.push(redirect);
        }

        if (existingPath.includes('/user-manual/editor/publishing/')) {
          const redirect = existingPath.replace('/user-manual/editor/publishing/', '/user-manual/publishing/');
          redirects.push(redirect);
        }

        if (existingPath.includes('/user-manual/editor/templates/')) {
          const redirect = existingPath.replace('/user-manual/editor/templates/', '/user-manual/templates/');
          redirects.push(redirect);
        }

        if (existingPath.includes('/user-manual/editor/version-control/')) {
          const redirect = existingPath.replace('/user-manual/editor/version-control/', '/user-manual/version-control/');
          redirects.push(redirect);
        }

        // Redirect old scripting/fundamentals/ paths to scripting/
        if (existingPath.includes('/user-manual/scripting/') && !existingPath.includes('/user-manual/scripting/fundamentals/')) {
          const redirect = existingPath.replace('/user-manual/scripting/', '/user-manual/scripting/fundamentals/');
          redirects.push(redirect);
        }

        // Redirect old scripting/editor-users/ paths to editor/scripting/
        if (existingPath.includes('/user-manual/editor/scripting/')) {
          const redirect = existingPath.replace('/user-manual/editor/scripting/', '/user-manual/scripting/editor-users/');
          redirects.push(redirect);
        }

        // Redirect old playcanvas-react paths to react
        if (existingPath.includes('/user-manual/react/')) {
          const redirect = existingPath.replace('/user-manual/react/', '/user-manual/playcanvas-react/');
          redirects.push(redirect);
        }

        return redirects;
      }
    }],
    'docusaurus-plugin-sass',
    pluginLlms,
    pluginDedupeStatic,
    'docusaurus-plugin-copy-page-button'
  ],

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          routeBasePath: '/', // Serve the docs at the site's root
          sidebarPath: './sidebars.js',
          remarkPlugins: [
            [remarkTypedoc, {
               typeResolver: ({ displayName, types, tags }) => {

                // If the type is ignored or internal, don't document it
                if (tags.has('ignore') || tags.has('internal')) {
                  return null;
                }
                
                // Resolve each type to a URL
                const resolvedTypes = types.map(type => {
                  if (type.moduleName === 'playcanvas') {
                    return {
                      name: type.name,
                      url: `https://api.playcanvas.com/engine/classes/${type.name}.html`
                    };
                  }

                  // No URL for this type
                  return { name: type.name, url: null };
                });
                
                return {
                  displayName,
                  types: resolvedTypes
                };
              }
            }]
          ],
          editUrl:
            'https://github.com/playcanvas/developer-site/tree/main/',
        },
        blog: false,
        theme: {
          customCss: './src/css/custom.scss',
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      algolia: {
        appId: '69QRBNV3NH',
        apiKey: '1a45aa069915da9c841ad1a9c225e815',
        indexName: 'developer-playcanvas',
        contextualSearch: true,
      },
      image: 'img/playcanvas-social-card.jpg',
      navbar: {
        title: 'PlayCanvas Docs',
        logo: {
          alt: 'PlayCanvas Logo',
          src: 'img/playcanvas.webp',
        },
        items: [
          {
            type: 'docSidebar',
            sidebarId: 'userManualSidebar',
            position: 'left',
            label: 'User Manual',
            path: '/user-manual',
          },
          {
            type: 'dropdown',
            label: 'Examples',
            position: 'left',
            items: [
              { label: 'Engine Examples', href: 'https://playcanvas.com/examples' },
              { label: 'Editor Tutorials', to: '/tutorials/' },
              { label: 'React Examples', to: '/user-manual/react/examples' },
              { label: 'Web Components Examples', href: 'https://playcanvas.github.io/web-components/examples/' },
            ],
          },
          {
            href: 'https://api.playcanvas.com',
            label: 'API',
            position: 'left',
          },
          {
            type: 'localeDropdown',
            position: 'right',
          },
          {
            'aria-label': 'Discord Invite',
            'className': 'navbar--discord-link',
            'href': 'https://discord.gg/RSaMRzg',
            'position': 'right',
          },
          {
            'aria-label': 'GitHub Repository',
            'className': 'navbar--github-link',
            'href': 'https://github.com/playcanvas/engine',
            'position': 'right',
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Docs',
            items: [
              {
                label: 'User Manual',
                to: '/user-manual/',
              },
              {
                label: 'Tutorials',
                to: '/tutorials/',
              },
              {
                label: 'API Reference',
                href: 'https://api.playcanvas.com',
              },
            ],
          },
          {
            title: 'Social',
            items: [
              {
                label: 'X',
                href: 'https://x.com/playcanvas',
              },
              {
                label: 'LinkedIn',
                href: 'https://www.linkedin.com/company/playcanvas',
              },
              {
                label: 'Facebook',
                href: 'https://www.facebook.com/playcanvas',
              },
            ],
          },
          {
            title: 'Community',
            items: [
              {
                label: 'Discord',
                href: 'https://discord.gg/RSaMRzg',
              },
              {
                label: 'Forum',
                href: 'https://forum.playcanvas.com',
              },
              {
                label: 'Reddit',
                href: 'https://www.reddit.com/r/PlayCanvas/',
              },
            ],
          },
          {
            title: 'Resources',
            items: [
              {
                label: 'Blog',
                href: 'https://blog.playcanvas.com',
              },
              {
                label: 'GitHub',
                href: 'https://github.com/playcanvas',
              },
              {
                label: 'YouTube',
                href: 'https://www.youtube.com/@playcanvas',
              },
            ],
          }
        ],
        copyright: `Copyright © ${new Date().getFullYear()} PlayCanvas Ltd.`,
      },
      prism: {
        theme: prismThemes.github,
        darkTheme: prismThemes.dracula,
        additionalLanguages: ['glsl', 'wgsl'],
      },
    }),
};

export default config;
