// @ts-check
// `@type` JSDoc annotations allow editor autocompletion and type checking
// (when paired with `@ts-check`).
// There are various equivalent ways to declare your Docusaurus config.
// See: https://docusaurus.io/docs/api/docusaurus-config

import {themes as prismThemes} from 'prism-react-renderer';
import remarkTypedoc from './utils/plugins/remark-typedoc.mjs';

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

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'playcanvas', // Usually your GitHub org/user name.
  projectName: 'developer.playcanvas.com', // Usually your repo name.

  trailingSlash: true,

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'ja']
  },

  markdown: {
    mermaid: true,
  },

  themes: ['@docusaurus/theme-mermaid', '@docusaurus/theme-live-codeblock'],

  plugins: [
    [ '@docusaurus/plugin-client-redirects', {
      redirects: [
        { from: ['/api', '/en/api'], to: 'https://api.playcanvas.com' },
        { from: ['/user-manual/billing/'], to: '/user-manual/account-management/billing/' },
        { from: ['/user-manual/faq/'], to: '/user-manual/editor/faq/' },
        { from: ['/user-manual/getting-started/workflow/'], to: '/user-manual/editor/getting-started/workflow/' },
        { from: ['/user-manual/getting-started/your-first-app/'], to: '/user-manual/editor/getting-started/your-first-app/' },
        { from: ['/user-manual/graphics/gaussian-splatting/'], to: '/user-manual/gaussian-splatting/' },
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

        if (existingPath.includes('/user-manual/editor/interface/assets')) {
          const redirect = existingPath.replace('/user-manual/editor/interface/assets', '/user-manual/editor/assets');
          redirects.push(redirect);
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

        return redirects;
      }
    }],
    'docusaurus-plugin-sass'
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
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/playcanvas/developer.playcanvas.com/tree/dev/',
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
      // Replace with your project's social card
      image: 'img/playcanvas-social-card.jpg',
      navbar: {
        title: 'PlayCanvas Docs',
        logo: {
          alt: 'PlayCanvas Logo',
          src: 'img/playcanvas.png',
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
            to: '/tutorials/',
            label: 'Tutorials',
            position: 'left',
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
        additionalLanguages: ['glsl'],
      },
    }),
};

export default config;
