/**
 * Creating a sidebar enables you to:
 - create an ordered group of docs
 - render a sidebar for each doc of that group
 - provide next/previous navigation

 The sidebars can be generated from the filesystem, or explicitly defined here.

 Create as many sidebars as you want.
 */

// @ts-check

/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  // User Manual sidebar with custom groupings
  userManualSidebar: [
    {
      type: 'html',
      value: '<div class="sidebar-section-header">Introduction</div>',
    },
    'user-manual/index',
    {
      type: 'category',
      label: 'Getting Started',
      key: 'general-getting-started',
      link: {
        type: 'doc',
        id: 'user-manual/getting-started/index',
      },
      items: [
        'user-manual/getting-started/community',
        'user-manual/getting-started/open-source',
        'user-manual/getting-started/supported-browsers',
        'user-manual/getting-started/made-with-playcanvas',
      ],
    },
    {
      type: 'category',
      label: 'Account Management',
      link: {
        type: 'doc',
        id: 'user-manual/account-management/index',
      },
      items: [
        {
          type: 'category',
          label: 'User Accounts',
          link: {
            type: 'doc',
            id: 'user-manual/account-management/user-accounts/index',
          },
          items: [
            'user-manual/account-management/user-accounts/account-creation',
            'user-manual/account-management/user-accounts/user-home',
            'user-manual/account-management/user-accounts/settings',
          ],
        },
        {
          type: 'category',
          label: 'Organizations',
          link: {
            type: 'doc',
            id: 'user-manual/account-management/organizations/index',
          },
          items: [
            'user-manual/account-management/organizations/creating',
            'user-manual/account-management/organizations/managing',
          ],
        },
        'user-manual/account-management/billing'
      ],
    },
    {
      type: 'html',
      value: '<div class="sidebar-section-header">Core Products</div>',
    },
    {
      type: 'category',
      label: 'PlayCanvas Engine',
      link: {
        type: 'doc',
        id: 'user-manual/engine/index',
      },
      items: [
        'user-manual/engine/standalone',
        'user-manual/engine/running-in-node',
        'user-manual/engine/migrations',
      ],
    },
    {
      type: 'category',
      label: 'PlayCanvas Editor',
      link: {
        type: 'doc',
        id: 'user-manual/editor/index',
      },
      items: [
        {
          type: 'category',
          label: 'Getting Started',
          key: 'editor-getting-started',
          link: {
            type: 'doc',
            id: 'user-manual/editor/getting-started/index',
          },
          items: [
            'user-manual/editor/getting-started/workflow',
            'user-manual/editor/getting-started/your-first-app',
          ],
        },
        {
          type: 'category',
          label: 'Projects',
          link: {
            type: 'doc',
            id: 'user-manual/editor/projects/index',
          },
          items: [
            'user-manual/editor/projects/creating',
            'user-manual/editor/projects/dashboard',
            'user-manual/editor/projects/settings',
            'user-manual/editor/projects/team-management',
            'user-manual/editor/projects/dev-logs',
            'user-manual/editor/projects/backup-archiving',
            'user-manual/editor/projects/ownership-transfers',
          ],
        },
        {
          type: 'category',
          label: 'Editor Interface',
          link: {
            type: 'doc',
            id: 'user-manual/editor/interface/index',
          },
          items: [
            'user-manual/editor/interface/toolbar',
            'user-manual/editor/interface/hierarchy',
            'user-manual/editor/interface/inspector',
            'user-manual/editor/interface/assets',
            'user-manual/editor/interface/viewport',
            {
              type: 'category',
              label: 'Launch Page',
              link: {
                type: 'doc',
                id: 'user-manual/editor/interface/launch-page/index',
              },
              items: [
                'user-manual/editor/interface/launch-page/custom-engine',
                'user-manual/editor/interface/launch-page/loading-screen',
              ],
            },
            'user-manual/editor/interface/keyboard-shortcuts',
            {
              type: 'category',
              label: 'Project Settings',
              link: {
                type: 'doc',
                id: 'user-manual/editor/interface/settings/index',
              },
              items: [
                'user-manual/editor/interface/settings/engine',
                'user-manual/editor/interface/settings/editor',
                'user-manual/editor/interface/settings/asset-import',
                'user-manual/editor/interface/settings/physics',
                'user-manual/editor/interface/settings/rendering',
                'user-manual/editor/interface/settings/layers',
                'user-manual/editor/interface/settings/lightmapping',
                'user-manual/editor/interface/settings/batch-groups',
                'user-manual/editor/interface/settings/launch-page',
                'user-manual/editor/interface/settings/input',
                'user-manual/editor/interface/settings/localization',
                'user-manual/editor/interface/settings/network',
              ],
            },
          ],
        },
        'user-manual/editor/realtime-collaboration',
        {
          type: 'category',
          label: 'Templates',
          link: {
            type: 'doc',
            id: 'user-manual/editor/templates/index',
          },
          items: [
            'user-manual/editor/templates/diff',
            'user-manual/editor/templates/nested',
          ],
        },
        {
          type: 'category',
          label: 'Version Control',
          link: {
            type: 'doc',
            id: 'user-manual/editor/version-control/index',
          },
          items: [
            'user-manual/editor/version-control/checkpoints',
            'user-manual/editor/version-control/branches',
            'user-manual/editor/version-control/merging',
            'user-manual/editor/version-control/changes',
            'user-manual/editor/version-control/branch-workflows',
            'user-manual/editor/version-control/graph-view',
            'user-manual/editor/version-control/item-history',
          ],
        },
        {
          type: 'category',
          label: 'Publishing',
          link: {
            type: 'doc',
            id: 'user-manual/editor/publishing/index',
          },
          items: [
            {
              type: 'category',
              label: 'Web',
              link: {
                type: 'doc',
                id: 'user-manual/editor/publishing/web/index',
              },
              items: [
                'user-manual/editor/publishing/web/playcanvas-hosting',
                'user-manual/editor/publishing/web/self-hosting',
                'user-manual/editor/publishing/web/self-hosting-for-beginners',
                'user-manual/editor/publishing/web/communicating-webpage',
                'user-manual/editor/publishing/web/hosting-cdn',
                'user-manual/editor/publishing/web/facebook',
                'user-manual/editor/publishing/web/hosting-heyvr',
              ],
            },
            {
              type: 'category',
              label: 'Mobile',
              link: {
                type: 'doc',
                id: 'user-manual/editor/publishing/mobile/index',
              },
              items: [
                'user-manual/editor/publishing/mobile/cordova',
                'user-manual/editor/publishing/mobile/gonative',
              ],
            },
            'user-manual/editor/publishing/desktop/index',
            {
              type: 'category',
              label: 'Playable Ads',
              link: {
                type: 'doc',
                id: 'user-manual/editor/publishing/playable-ads/index',
              },
              items: [
                'user-manual/editor/publishing/playable-ads/fb-playable-ads',
                'user-manual/editor/publishing/playable-ads/snapchat-playable-ads',
              ],
            },
          ],
        },
        'user-manual/editor/editor-api',
        'user-manual/editor/engine-compatibility',
        'user-manual/editor/faq',
        'user-manual/editor/troubleshooting',
      ],
    },
    {
      type: 'category',
      label: 'PlayCanvas React',
      link: {
        type: 'doc',
        id: 'user-manual/playcanvas-react/index',
      },
      items: [
        {
          type: 'category',
          label: 'Getting Started',
          key: 'react-getting-started',
          link: {
            type: 'doc',
            id: 'user-manual/playcanvas-react/getting-started/index',
          },
          items: [
            'user-manual/playcanvas-react/getting-started/installation',
          ]
        },
        'user-manual/playcanvas-react/building-a-scene',
        {
          type: 'category',
          label: 'Guide',
          link: {
            type: 'doc',
            id: 'user-manual/playcanvas-react/guide/index',
          },
          items: [
            'user-manual/playcanvas-react/guide/interactivity',
            'user-manual/playcanvas-react/guide/loading-assets',
            'user-manual/playcanvas-react/guide/physics',
            'user-manual/playcanvas-react/guide/materials'
          ]
        },
        {
          type: 'category',
          label: 'API',
          items: [
            'user-manual/playcanvas-react/api/application',
            'user-manual/playcanvas-react/api/entity',
            {
              type: 'category',
              label: 'Components',
              key: 'react-api-components',
              items: [
                'user-manual/playcanvas-react/api/anim',
                'user-manual/playcanvas-react/api/camera',
                'user-manual/playcanvas-react/api/collision',
                'user-manual/playcanvas-react/api/environment',
                'user-manual/playcanvas-react/api/gsplat',
                'user-manual/playcanvas-react/api/light',
                'user-manual/playcanvas-react/api/render',
                'user-manual/playcanvas-react/api/rigidbody',
                'user-manual/playcanvas-react/api/script',
              ]
            },
            {
              type: 'category',
              label: 'Hooks',
              key: 'react-api-hooks',
              link: {
                type: 'doc',
                id: 'user-manual/playcanvas-react/api/hooks/index',
              },
              items: [
                'user-manual/playcanvas-react/api/hooks/use-app',
                'user-manual/playcanvas-react/api/hooks/use-app-event',
                'user-manual/playcanvas-react/api/hooks/use-asset',
                'user-manual/playcanvas-react/api/hooks/use-material',
                'user-manual/playcanvas-react/api/hooks/use-parent',
                'user-manual/playcanvas-react/api/hooks/use-physics',
              ]
            }
          ]
        },
        
      ],
    },
    {
      type: 'category',
      label: 'PlayCanvas Web Components',
      link: {
        type: 'doc',
        id: 'user-manual/web-components/index',
      },
      items: [
        'user-manual/web-components/getting-started',
        'user-manual/web-components/building-a-scene',
        'user-manual/web-components/scripting',
        'user-manual/web-components/xr',
        {
          type: 'category',
          label: 'Tags',
          link: {
            type: 'doc',
            id: 'user-manual/web-components/tags/index',
          },
          items: [
            'user-manual/web-components/tags/pc-app',
            'user-manual/web-components/tags/pc-asset',
            'user-manual/web-components/tags/pc-camera',
            'user-manual/web-components/tags/pc-collision',
            'user-manual/web-components/tags/pc-element',
            'user-manual/web-components/tags/pc-entity',
            'user-manual/web-components/tags/pc-light',
            'user-manual/web-components/tags/pc-listener',
            'user-manual/web-components/tags/pc-model',
            'user-manual/web-components/tags/pc-module',
            'user-manual/web-components/tags/pc-particles',
            'user-manual/web-components/tags/pc-render',
            'user-manual/web-components/tags/pc-rigidbody',
            'user-manual/web-components/tags/pc-scene',
            'user-manual/web-components/tags/pc-screen',
            'user-manual/web-components/tags/pc-script',
            'user-manual/web-components/tags/pc-scripts',
            'user-manual/web-components/tags/pc-sky',
            'user-manual/web-components/tags/pc-sound',
            'user-manual/web-components/tags/pc-sounds',
            'user-manual/web-components/tags/pc-splat',
          ],
        },
      ],
    },
    {
      type: 'html',
      value: '<div class="sidebar-section-header">Common Topics</div>',
    },
    {
      type: 'category',
      label: 'Entity Component System',
      link: {
        type: 'doc',
        id: 'user-manual/ecs/index',
      },
      items: [
        'user-manual/ecs/entities',
        'user-manual/ecs/components',
        'user-manual/ecs/hierarchy-and-transformations',
        'user-manual/ecs/searching-the-hierarchy',
      ],
    },
    {
      type: 'category',
      label: 'Scenes',
      link: {
        type: 'doc',
        id: 'user-manual/scenes/index',
      },
      items: [
        {
          type: 'category',
          label: 'Components',
          link: {
            type: 'doc',
            id: 'user-manual/scenes/components/index',
          },
          items: [
            'user-manual/scenes/components/anim',
            'user-manual/scenes/components/animation',
            'user-manual/scenes/components/audiolistener',
            'user-manual/scenes/components/button',
            'user-manual/scenes/components/camera',
            'user-manual/scenes/components/collision',
            'user-manual/scenes/components/element',
            'user-manual/scenes/components/gsplat',
            'user-manual/scenes/components/layout-child',
            'user-manual/scenes/components/layout-group',
            'user-manual/scenes/components/light',
            'user-manual/scenes/components/model',
            'user-manual/scenes/components/particlesystem',
            'user-manual/scenes/components/render',
            'user-manual/scenes/components/rigidbody',
            'user-manual/scenes/components/screen',
            'user-manual/scenes/components/script',
            'user-manual/scenes/components/scrollbar',
            'user-manual/scenes/components/scrollview',
            'user-manual/scenes/components/sound',
            'user-manual/scenes/components/sprite',
          ],
        },
        'user-manual/scenes/loading-scenes',
        'user-manual/scenes/managing-scenes',
      ],
    },
    {
      type: 'category',
      label: 'Assets',
      link: {
        type: 'doc',
        id: 'user-manual/assets/index',
      },
      items: [
        {
          type: 'category',
          label: 'Types',
          link: {
            type: 'doc',
            id: 'user-manual/assets/types/index',
          },
          items: [
            'user-manual/assets/types/animation',
            'user-manual/assets/types/audio',
            'user-manual/assets/types/css',
            'user-manual/assets/types/cubemap',
            'user-manual/assets/types/font',
            'user-manual/assets/types/gsplat',
            'user-manual/assets/types/html',
            'user-manual/assets/types/json',
            'user-manual/assets/types/material',
            'user-manual/assets/types/render',
            'user-manual/assets/types/shader',
            'user-manual/assets/types/sprite',
            'user-manual/assets/types/template',
            'user-manual/assets/types/text',
            'user-manual/assets/types/texture',
            'user-manual/assets/types/texture-atlas',
            'user-manual/assets/types/wasm',
          ],
        },
        'user-manual/assets/importing',
        {
          type: 'category',
          label: 'Import Pipeline',
          link: {
            type: 'doc',
            id: 'user-manual/assets/import-pipeline/index',
          },
          items: [
            'user-manual/assets/import-pipeline/import-hierarchy',
          ],
        },
        {
          type: 'category',
          label: 'Models',
          link: {
            type: 'doc',
            id: 'user-manual/assets/models/index',
          },
          items: [
            'user-manual/assets/models/building',
            'user-manual/assets/models/exporting',
            'user-manual/assets/models/units',
          ],
        },
        {
          type: 'category',
          label: 'Asset Store',
          link: {
            type: 'doc',
            id: 'user-manual/assets/asset-store/index',
          },
          items: [
            'user-manual/assets/asset-store/sketchfab',
          ],
        },
        'user-manual/assets/finding',
        'user-manual/assets/preloading-and-streaming',
        'user-manual/assets/viewers',
      ],
    },
    {
      type: 'category',
      label: 'Scripting',
      link: {
        type: 'doc',
        id: 'user-manual/scripting/index',
      },
      items: [
        {
          type: 'category',
          label: 'Scripting Fundamentals',
          link: {
            type: 'doc',
            id: 'user-manual/scripting/fundamentals/index',
          },
          items: [
            'user-manual/scripting/fundamentals/getting-started',
            'user-manual/scripting/fundamentals/esm-scripts',
            'user-manual/scripting/fundamentals/script-lifecycle',
            'user-manual/scripting/fundamentals/application-lifecycle',
            {
              type: 'category',
              label: 'Script Attributes',
              link: {
                type: 'doc',
                id: 'user-manual/scripting/fundamentals/script-attributes/index',
              },
              items: [
                'user-manual/scripting/fundamentals/script-attributes/classic',
                'user-manual/scripting/fundamentals/script-attributes/esm',
              ],
            },
            'user-manual/scripting/fundamentals/engine-api',
            'user-manual/scripting/fundamentals/events'
          ],
        },
        {
          type: 'category',
          label: 'Scripting for Editor Users',
          link: {
            type: 'doc',
            id: 'user-manual/scripting/editor-users/index'
          },
          items: [
            'user-manual/scripting/editor-users/managing-scripts',
            'user-manual/scripting/editor-users/import-maps',
            'user-manual/scripting/editor-users/code-editor',
            'user-manual/scripting/editor-users/vscode-extension',
            'user-manual/scripting/editor-users/hot-reloading',
            'user-manual/scripting/editor-users/loading-order'
          ],
        },
        {
          type: 'category',
          label: 'Debugging',
          link: {
            type: 'doc',
            id: 'user-manual/scripting/debugging/index',
          },
          items: [
            'user-manual/scripting/debugging/console-logging',
            'user-manual/scripting/debugging/browser-dev-tools'
          ],
        },
        'user-manual/scripting/migration-guide'
      ],
    },
    {
      type: 'category',
      label: 'Graphics',
      link: {
        type: 'doc',
        id: 'user-manual/graphics/index',
      },
      items: [
        {
          type: 'category',
          label: 'Cameras',
          link: {
            type: 'doc',
            id: 'user-manual/graphics/cameras/index',
          },
          items: [
            'user-manual/graphics/cameras/depth-layer',
          ],
        },
        {
          type: 'category',
          label: 'Lighting',
          link: {
            type: 'doc',
            id: 'user-manual/graphics/lighting/index',
          },
          items: [
            'user-manual/graphics/lighting/lights',
            'user-manual/graphics/lighting/shadows',
            'user-manual/graphics/lighting/lightmapping',
            'user-manual/graphics/lighting/ambient-occlusion',
            'user-manual/graphics/lighting/runtime-lightmaps',
            'user-manual/graphics/lighting/clustered-lighting',
          ],
        },
        {
          type: 'category',
          label: 'Physically Based Rendering',
          link: {
            type: 'doc',
            id: 'user-manual/graphics/physical-rendering/index',
          },
          items: [
            'user-manual/graphics/physical-rendering/physical-materials',
            'user-manual/graphics/physical-rendering/image-based-lighting',
          ],
        },
        {
          type: 'category',
          label: 'Linear Workflow',
          link: {
            type: 'doc',
            id: 'user-manual/graphics/linear-workflow/index',
          },
          items: [
            'user-manual/graphics/linear-workflow/textures',
            'user-manual/graphics/linear-workflow/hdr-rendering',
          ],
        },
        {
          type: 'category',
          label: 'Shaders',
          link: {
            type: 'doc',
            id: 'user-manual/graphics/shaders/index',
          },
          items: [
            'user-manual/graphics/shaders/glsl-specifics',
            'user-manual/graphics/shaders/wgsl-specifics',
            'user-manual/graphics/shaders/migrations',
          ],
        },
        {
          type: 'category',
          label: 'Post Effects',
          link: {
            type: 'doc',
            id: 'user-manual/graphics/posteffects/index',
          },
          items: [
            {
              type: 'category',
              label: 'Modern Post Processing',
              link: {
                type: 'doc',
                id: 'user-manual/graphics/posteffects/cameraframe/index',
              },
              items: [
                'user-manual/graphics/posteffects/cameraframe/compose-shader',
                'user-manual/graphics/posteffects/cameraframe/extending-class',
                'user-manual/graphics/posteffects/cameraframe/custom-passes',
              ],
            },
            {
              type: 'category',
              label: 'Legacy Post Effects',
              link: {
                type: 'doc',
                id: 'user-manual/graphics/posteffects/legacy/index',
              },
              items: [
                'user-manual/graphics/posteffects/legacy/bloom',
                'user-manual/graphics/posteffects/legacy/brightness_contrast',
                'user-manual/graphics/posteffects/legacy/fxaa',
                'user-manual/graphics/posteffects/legacy/hue_saturation',
                'user-manual/graphics/posteffects/legacy/sepia',
                'user-manual/graphics/posteffects/legacy/vignette',
              ],
            },
          ],
        },
        'user-manual/graphics/particles',
        'user-manual/graphics/layers/index',
        {
          type: 'category',
          label: 'Advanced Rendering',
          link: {
            type: 'doc',
            id: 'user-manual/graphics/advanced-rendering/index',
          },
          items: [
            'user-manual/graphics/advanced-rendering/batching',
            'user-manual/graphics/advanced-rendering/hardware-instancing',
            'user-manual/graphics/advanced-rendering/multiple-render-targets',
            'user-manual/graphics/advanced-rendering/indirect-drawing',
          ],
        },
      ],
    },
    {
      type: 'category',
      label: 'Gaussian Splatting',
      link: {
        type: 'doc',
        id: 'user-manual/gaussian-splatting/index',
      },
      items: [
        'user-manual/gaussian-splatting/what-is-gaussian-splatting',
        {
          type: 'category',
          label: 'Splat File Formats',
          link: {
            type: 'doc',
            id: 'user-manual/gaussian-splatting/formats/index',
          },
          items: [
            'user-manual/gaussian-splatting/formats/ply',
            'user-manual/gaussian-splatting/formats/sog',
          ],
        },
        {
          type: 'category',
          label: 'Creating Splats',
          link: {
            type: 'doc',
            id: 'user-manual/gaussian-splatting/creating/index',
          },
          items: [
            'user-manual/gaussian-splatting/creating/taking-photos',
            'user-manual/gaussian-splatting/creating/recommended-tools',
          ],
        },
        'user-manual/gaussian-splatting/viewing',
        {
          type: 'category',
          label: 'Editing and Publishing Splats',
          link: {
            type: 'doc',
            id: 'user-manual/gaussian-splatting/editing/index',
          },
          items: [
            {
              type: 'category',
              label: 'SuperSplat',
              link: {
                type: 'doc',
                id: 'user-manual/gaussian-splatting/editing/supersplat/index',
              },
              items: [
                'user-manual/gaussian-splatting/editing/supersplat/interface',
                'user-manual/gaussian-splatting/editing/supersplat/managing-projects',
                'user-manual/gaussian-splatting/editing/supersplat/import-export',
                'user-manual/gaussian-splatting/editing/supersplat/camera-controls',
                'user-manual/gaussian-splatting/editing/supersplat/editing-splats',
                'user-manual/gaussian-splatting/editing/supersplat/data-panel',
                'user-manual/gaussian-splatting/editing/supersplat/timeline',
                'user-manual/gaussian-splatting/editing/supersplat/rendering',
                'user-manual/gaussian-splatting/editing/supersplat/publishing',
              ],
            },
            'user-manual/gaussian-splatting/editing/splat-transform',
          ],
        },
        {
          type: 'category',
          label: 'Building Splat Applications',
          link: {
            type: 'doc',
            id: 'user-manual/gaussian-splatting/building/index',
          },
          items: [
            {
              type: 'category',
              label: 'Your First Splat App',
              link: {
                type: 'doc',
                id: 'user-manual/gaussian-splatting/building/your-first-app/index',
              },
              items: [
                'user-manual/gaussian-splatting/building/your-first-app/engine',
                'user-manual/gaussian-splatting/building/your-first-app/editor',
                'user-manual/gaussian-splatting/building/your-first-app/react',
                'user-manual/gaussian-splatting/building/your-first-app/web-components',
              ],
            },
            'user-manual/gaussian-splatting/building/streaming-lod-editor',
            {
              type: 'category',
              label: 'Engine Features',
              link: {
                type: 'doc',
                id: 'user-manual/gaussian-splatting/building/engine-features/index',
              },
              items: [
                'user-manual/gaussian-splatting/building/engine-features/draw-order',
                'user-manual/gaussian-splatting/building/engine-features/global-sorting',
                'user-manual/gaussian-splatting/building/engine-features/lod-streaming',
                'user-manual/gaussian-splatting/building/engine-features/picking',
                'user-manual/gaussian-splatting/building/engine-features/shadows',
                'user-manual/gaussian-splatting/building/engine-features/custom-shaders',
                'user-manual/gaussian-splatting/building/engine-features/performance',
              ],
            },
          ],
        },
      ],
    },
    {
      type: 'category',
      label: 'Animation',
      link: {
        type: 'doc',
        id: 'user-manual/animation/index',
      },
      items: [
        'user-manual/animation/anim-component',
        'user-manual/animation/anim-animation-assets',
        'user-manual/animation/anim-state-graph-assets',
        'user-manual/animation/anim-layer-masking',
        'user-manual/animation/anim-events'
      ],
    },
    {
      type: 'category',
      label: 'Physics',
      link: {
        type: 'doc',
        id: 'user-manual/physics/index',
      },
      items: [
        'user-manual/physics/physics-basics',
        'user-manual/physics/forces-and-impulses',
        'user-manual/physics/trigger-volumes',
        'user-manual/physics/compound-shapes',
        'user-manual/physics/ray-casting',
        'user-manual/physics/calling-ammo',
        'user-manual/physics/physics-migration',
        'user-manual/physics/ammo-alternatives',
      ],
    },
    {
      type: 'category',
      label: '2D',
      link: {
        type: 'doc',
        id: 'user-manual/2D/index',
      },
      items: [
        'user-manual/2D/sprite-editor',
        'user-manual/2D/slicing',
        'user-manual/2D/texture-packing',
      ],
    },
    {
      type: 'category',
      label: 'User Interface',
      link: {
        type: 'doc',
        id: 'user-manual/user-interface/index',
      },
      items: [
        'user-manual/user-interface/user-interface-basics',
        'user-manual/user-interface/screens',
        'user-manual/user-interface/elements',
        'user-manual/user-interface/group-elements',
        'user-manual/user-interface/image-elements',
        'user-manual/user-interface/text-elements',
        'user-manual/user-interface/layout-groups',
        'user-manual/user-interface/input',
        'user-manual/user-interface/localization',
        'user-manual/user-interface/safe-area',
      ],
    },
    {
      type: 'category',
      label: 'XR',
      link: {
        type: 'doc',
        id: 'user-manual/xr/index',
      },
      items: [
        'user-manual/xr/using-webxr',
        'user-manual/xr/platforms',
        'user-manual/xr/capabilities',
        'user-manual/xr/input-sources',
        'user-manual/xr/hand-tracking',
        {
          type: 'category',
          label: 'AR',
          link: {
            type: 'doc',
            id: 'user-manual/xr/ar/index',
          },
          items: [
            'user-manual/xr/ar/anchors',
            'user-manual/xr/ar/camera-color',
            'user-manual/xr/ar/depth-sensing',
            'user-manual/xr/ar/dom-overlay',
            'user-manual/xr/ar/hit-testing',
            'user-manual/xr/ar/image-tracking',
            'user-manual/xr/ar/light-estimation',
            'user-manual/xr/ar/mesh-detection',
            'user-manual/xr/ar/plane-detection',
            'user-manual/xr/ar/8th-wall-integration',
            'user-manual/xr/ar/zappar-integration',
          ],
        },
        {
          type: 'category',
          label: 'VR',
          link: {
            type: 'doc',
            id: 'user-manual/xr/vr/index',
          },
          items: [
            'user-manual/xr/vr/types-of-vr',
          ],
        },
        'user-manual/xr/optimizing-webxr',
      ],
    },
    {
      type: 'category',
      label: 'Optimization',
      link: {
        type: 'doc',
        id: 'user-manual/optimization/index',
      },
      items: [
        'user-manual/optimization/guidelines',
        'user-manual/optimization/texture-compression',
        'user-manual/optimization/gpu-profiling',
        'user-manual/optimization/profiler',
        'user-manual/optimization/mini-stats',
        'user-manual/optimization/runtime-devicepixelratio',
        'user-manual/optimization/load-time',
        'user-manual/optimization/optimizing-scene-format',
        'user-manual/optimization/troubleshooting-performance',
      ],
    },
    {
      type: 'html',
      value: '<div class="sidebar-section-header">Foundational APIs</div>',
    },
    {
      type: 'category',
      label: 'REST API',
      link: {
        type: 'doc',
        id: 'user-manual/api/index',
      },
      items: [
        'user-manual/api/app-download',
        'user-manual/api/app-get',
        'user-manual/api/app-get-primary',
        'user-manual/api/app-get-project',
        'user-manual/api/asset-create',
        'user-manual/api/asset-delete',
        'user-manual/api/asset-file',
        'user-manual/api/asset-get',
        'user-manual/api/asset-list',
        'user-manual/api/asset-update',
        'user-manual/api/branch-list',
        'user-manual/api/job-get',
        'user-manual/api/project-archive',
        'user-manual/api/scene-list',
      ],
    },
    {
      type: 'category',
      label: 'PCUI',
      link: {
        type: 'doc',
        id: 'user-manual/pcui/index',
      },
      items: [
        'user-manual/pcui/getting-started',
        'user-manual/pcui/react',
        {
          type: 'category',
          label: 'Data Binding',
          link: {
            type: 'doc',
            id: 'user-manual/pcui/data-binding/index',
          },
          items: [
            'user-manual/pcui/data-binding/using-observers',
            'user-manual/pcui/data-binding/two-way-binding',
          ],
        },
        {
          type: 'category',
          label: 'Examples',
          link: {
            type: 'doc',
            id: 'user-manual/pcui/examples/index',
          },
          items: [
            'user-manual/pcui/examples/history',
            'user-manual/pcui/examples/todo-list',
          ],
        },
        {
          type: 'category',
          label: 'PCUI Graph',
          link: {
            type: 'doc',
            id: 'user-manual/pcui/pcui-graph/index',
          },
          items: [
            'user-manual/pcui/pcui-graph/getting-started',
            'user-manual/pcui/pcui-graph/context-menus',
            'user-manual/pcui/pcui-graph/events',
            'user-manual/pcui/pcui-graph/schema',
            'user-manual/pcui/pcui-graph/styling',
          ],
        },
      ],
    },
    {
      type: 'html',
      value: '<div class="sidebar-section-header">Additional Resources</div>',
    },
    'user-manual/glossary',
    'user-manual/press-pack',
  ],
  shaderEditorSidebar: [{type: 'autogenerated', dirName: 'shader-editor'}],
  tutorialsSidebar: [{type: 'autogenerated', dirName: 'tutorials'}],
};

export default sidebars;
