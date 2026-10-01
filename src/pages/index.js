import { useEffect, useRef, useState } from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useBaseUrl from '@docusaurus/useBaseUrl';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Translate, { translate } from '@docusaurus/Translate';
import Layout from '@theme/Layout';

import editorImage from '@site/static/img/home/editor.webp';
import supersplatImage from '@site/static/img/home/supersplat.webp';
import engineExamplesImage from '@site/static/img/home/engine-examples.webp';
import editorTutorialsImage from '@site/static/img/home/editor-tutorials.webp';
import reactExamplesImage from '@site/static/img/home/react-examples.webp';
import webComponentsExamplesImage from '@site/static/img/user-manual/web-components/showcases/car-configurator.jpg';

import styles from './index.module.css';

const CREATE_COMMAND = 'npm create playcanvas@latest';
const SKILLS_COMMAND = 'npx skills add playcanvas/skills';

function Icon({ children, className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"
      strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
      {children}
    </svg>
  );
}

const ICONS = {
  engine: <><path d="M12 2.75 20.25 7.5v9L12 21.25 3.75 16.5v-9Z" /><path d="M3.75 7.5 12 12.25l8.25-4.75M12 12.25v9" /></>,
  editor: <><rect x="3" y="4" width="18" height="16" rx="2" /><path d="M3 8.5h18M8.5 8.5V20" /><path d="m12.75 11.75 5 2-2.2.8-.8 2.2Z" /></>,
  react: <><ellipse cx="12" cy="12" rx="9.75" ry="3.75" /><ellipse cx="12" cy="12" rx="9.75" ry="3.75" transform="rotate(60 12 12)" /><ellipse cx="12" cy="12" rx="9.75" ry="3.75" transform="rotate(-60 12 12)" /><circle cx="12" cy="12" r="1.5" fill="currentColor" stroke="none" /></>,
  webComponents: <path d="m7.5 7.5-4.5 4.5 4.5 4.5M16.5 7.5l4.5 4.5-4.5 4.5M13.5 4.5l-3 15" />,
  supersplat: <><path d="M10.5 3.75c.6 4.35 2.4 6.5 6.75 7.5-4.35 1-6.15 3.15-6.75 7.5-.6-4.35-2.4-6.5-6.75-7.5 4.35-1 6.15-3.15 6.75-7.5Z" /><path d="M18.5 14.75c.3 1.65 1 2.4 2.5 2.75-1.5.35-2.2 1.1-2.5 2.75-.3-1.65-1-2.4-2.5-2.75 1.5-.35 2.2-1.1 2.5-2.75Z" /></>,
  splatTransform: <><rect x="3" y="4" width="18" height="16" rx="2" /><path d="m7.5 9.5 3 2.5-3 2.5M13 15h3.5" /></>,
  clock: <><circle cx="12" cy="12" r="8.25" /><path d="M12 7.5V12l3 1.75" /></>,
  search: <><circle cx="10.5" cy="10.5" r="6.75" /><path d="m15.5 15.5 5 5" /></>,
  copy: <><rect x="8.25" y="8.25" width="12" height="12" rx="2" /><path d="M15.75 8.25v-2.5a2 2 0 0 0-2-2h-8a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h2.5" /></>,
  check: <path d="m5 12.5 4.5 4.5L19 7.5" />,
  skills: <path d="M13 2.75 5.5 13.25h6l-.75 8 7.75-10.5h-6Z" />,
  mcp: <><path d="M9 3.75v4.5M15 3.75v4.5" /><path d="M6.75 8.25h10.5v3a5.25 5.25 0 0 1-10.5 0Z" /><path d="M12 16.5v3.75" /></>,
  llms: <><path d="M14.25 3.75H7.5A2.25 2.25 0 0 0 5.25 6v12a2.25 2.25 0 0 0 2.25 2.25h9A2.25 2.25 0 0 0 18.75 18V8.25Z" /><path d="M14.25 3.75v4.5h4.5M8.75 12.75h6.5M8.75 16h4.5" /></>,
  guide: <><path d="M12 6.75c-1.9-1.5-4.4-2.25-7.5-2.25v13.5c3.1 0 5.6.75 7.5 2.25 1.9-1.5 4.4-2.25 7.5-2.25V4.5c-3.1 0-5.6.75-7.5 2.25Z" /><path d="M12 6.75v13.5" /></>,
  forum: <><path d="M20.25 12c0 4.14-3.69 7.5-8.25 7.5a9 9 0 0 1-3.6-.75L3.75 20.25l1.4-3.75A7 7 0 0 1 3.75 12c0-4.14 3.69-7.5 8.25-7.5s8.25 3.36 8.25 7.5Z" /><path d="M8.25 10.5h7.5M8.25 13.5h4.5" /></>,
  blog: <><rect x="3.75" y="4.5" width="16.5" height="15" rx="2" /><path d="M7.5 8.25h9M7.5 12h9M7.5 15.75h5.25" /></>
};

function GitHubMark({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false">
      <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
    </svg>
  );
}

function DiscordMark({ className }) {
  return (
    <svg className={className} viewBox="0 -28.5 256 256" fill="currentColor" aria-hidden="true" focusable="false">
      <path d="M216.856339 16.5966031 C200.285002 8.84328665 182.566144 3.2084988 164.041564 0 C161.766523 4.11318106 159.108624 9.64549908 157.276099 14.0464379 C137.583995 11.0849896 118.072967 11.0849896 98.7430163 14.0464379 C96.9108417 9.64549908 94.1925838 4.11318106 91.8971895 0 C73.3526068 3.2084988 55.6133949 8.86399117 39.0420583 16.6376612 C5.61752293 67.146514 -3.4433191 116.400813 1.08711069 164.955721 C23.2560196 181.510915 44.7403634 191.567697 65.8621325 198.148576 C71.0772151 190.971126 75.7283628 183.341335 79.7352139 175.300261 C72.104019 172.400575 64.7949724 168.822202 57.8887866 164.667963 C59.7209612 163.310589 61.5131304 161.891452 63.2445898 160.431257 C105.36741 180.133187 151.134928 180.133187 192.754523 160.431257 C194.506336 161.891452 196.298154 163.310589 198.110326 164.667963 C191.183787 168.842556 183.854737 172.420929 176.223542 175.320965 C180.230393 183.341335 184.861538 190.991831 190.096624 198.16893 C211.238746 191.588051 232.743023 181.531619 254.911949 164.955721 C260.227747 108.668201 245.831087 59.8662432 216.856339 16.5966031 Z M85.4738752 135.09489 C72.8290281 135.09489 62.4592217 123.290155 62.4592217 108.914901 C62.4592217 94.5396472 72.607595 82.7145587 85.4738752 82.7145587 C98.3405064 82.7145587 108.709962 94.5189427 108.488529 108.914901 C108.508531 123.290155 98.3405064 135.09489 85.4738752 135.09489 Z M170.525237 135.09489 C157.88039 135.09489 147.510584 123.290155 147.510584 108.914901 C147.510584 94.5396472 157.658606 82.7145587 170.525237 82.7145587 C183.391518 82.7145587 193.761324 94.5189427 193.539891 108.914901 C193.539891 123.290155 183.391518 135.09489 170.525237 135.09489 Z" />
    </svg>
  );
}

function Arrow() {
  return <span className={styles.arrow} aria-hidden="true">→</span>;
}

function CopyButton({ text, className }) {
  const [copied, setCopied] = useState(false);
  const timer = useRef(undefined);

  useEffect(() => () => clearTimeout(timer.current), []);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      return;
    }
    setCopied(true);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      type="button"
      className={clsx(styles.copyButton, className)}
      onClick={copy}
      aria-label={translate({
        id: 'theme.CodeBlock.copyButtonAriaLabel',
        message: 'Copy code to clipboard',
        description: 'The ARIA label for copy code blocks button'
      })}>
      <Icon>{copied ? ICONS.check : ICONS.copy}</Icon>
      <span aria-live="polite">
        {copied
          ? translate({ id: 'theme.CodeBlock.copied', message: 'Copied', description: 'The copied button label on code blocks' })
          : translate({ id: 'theme.CodeBlock.copy', message: 'Copy', description: 'The copy button label on code blocks' })}
      </span>
    </button>
  );
}

// Opens the navbar's DocSearch modal, so the hero offers search without a second search instance
function SearchButton() {
  const searchPage = useBaseUrl('/search/');
  const [modifier, setModifier] = useState('Ctrl');

  useEffect(() => {
    if (/(Mac|iPhone|iPod|iPad)/i.test(navigator.platform)) {
      setModifier('⌘');
    }
  }, []);

  const openSearch = () => {
    const button = document.querySelector('.DocSearch-Button');
    if (button) {
      button.click();
    } else {
      window.location.assign(searchPage);
    }
  };

  return (
    <button type="button" className={styles.search} onClick={openSearch}>
      <Icon className={styles.searchIcon}>{ICONS.search}</Icon>
      <span className={styles.searchLabel}>
        <Translate id="homepage.hero.search" description="Label of the search button in the homepage hero">
          Search the docs
        </Translate>
      </span>
      <span className={styles.searchKeys} aria-hidden="true">
        <kbd>{modifier}</kbd>
        <kbd>K</kbd>
      </span>
    </button>
  );
}

// A ground grid receding to the horizon, like the one in the Editor's viewport
function HeroGrid() {
  const width = 1600;
  const height = 280;
  const vanishingY = -40;
  const lines = [];
  for (let i = -16; i <= 16; i++) {
    const x = width / 2 + i * 120;
    const t = height / (height - vanishingY);
    lines.push(<line key={`x${i}`} x1={x} y1={height} x2={x + (width / 2 - x) * t} y2={0} />);
  }
  // Evenly spaced rows on the ground plane get closer together with distance
  for (let row = 0; row < 18; row++) {
    const y = vanishingY + (height - vanishingY) / (1 + 0.3 * row);
    lines.push(<line key={`z${row}`} x1={0} y1={y} x2={width} y2={y} />);
  }
  return (
    <svg className={styles.heroGrid} viewBox={`0 0 ${width} ${height}`} preserveAspectRatio="xMidYMax slice"
      aria-hidden="true" focusable="false">
      <g stroke="currentColor" strokeWidth="1">{lines}</g>
    </svg>
  );
}

function Hero() {
  return (
    <header className={styles.hero}>
      <HeroGrid />
      <div className={clsx(styles.wrap, styles.heroInner)}>
        <p className={styles.eyebrow}>
          <Translate id="homepage.hero.eyebrow" description="Small label above the homepage title">
            PlayCanvas Developer Site
          </Translate>
        </p>
        <h1 className={styles.heroTitle}>
          <Translate id="homepage.hero.title" description="The homepage title">
            Build interactive 3D for the web
          </Translate>
        </h1>
        <p className={styles.heroSubtitle}>
          <Translate id="homepage.hero.subtitle" description="The homepage subtitle">
            Guides, tutorials, examples and API references for the PlayCanvas Engine, Editor, React, Web Components, SuperSplat and SplatTransform.
          </Translate>
        </p>
        <div className={styles.heroActions}>
          <SearchButton />
          <iframe
            className={styles.githubStars}
            src="https://ghbtns.com/github-btn.html?user=playcanvas&repo=engine&type=star&count=true&size=large"
            width="170"
            height="30"
            scrolling="no"
            title={translate({
              id: 'homepage.hero.githubStars',
              message: 'Star the PlayCanvas Engine on GitHub',
              description: 'Title of the GitHub star button in the homepage hero'
            })} />
        </div>
      </div>
    </header>
  );
}

function CreateTerminal() {
  return (
    <div className={styles.terminal}>
      <div className={styles.terminalBar} aria-hidden="true">
        <span className={styles.terminalDot} />
        <span className={styles.terminalDot} />
        <span className={styles.terminalDot} />
      </div>
      <div className={styles.terminalBody}>
        <div className={styles.terminalCommand}>
          <code>
            <span className={styles.terminalPrompt} aria-hidden="true">$ </span>
            {CREATE_COMMAND}
          </code>
          <CopyButton text={CREATE_COMMAND} />
        </div>
        {/* The first create-playcanvas prompt, as the CLI draws it */}
        <div className={styles.terminalOutput} aria-hidden="true">
          <div><span className={styles.ansiCyan}>◆</span>  Select a format:</div>
          <div>
            <span className={styles.ansiCyan}>│</span>  <span className={styles.ansiGreen}>●</span> <span className={styles.ansiYellow}>Engine</span>
          </div>
          <div>
            <span className={styles.ansiCyan}>│</span>  <span className={styles.ansiDim}>○ <span className={styles.ansiCyan}>React</span></span>
          </div>
          <div>
            <span className={styles.ansiCyan}>│</span>  <span className={styles.ansiDim}>○ <span className={styles.ansiMagenta}>Web Components</span></span>
          </div>
          <div><span className={styles.ansiCyan}>└</span></div>
        </div>
      </div>
    </div>
  );
}

function Duration({ minutes }) {
  return (
    <span className={styles.duration}>
      <Icon>{ICONS.clock}</Icon>
      {translate({
        id: 'homepage.start.duration',
        message: '{minutes} min',
        description: 'Estimated time to finish a quick start, shown on its button'
      }, { minutes })}
    </span>
  );
}

function StartBuilding() {
  return (
    <section className={styles.lanes} aria-labelledby="start-building">
      <div className={styles.wrap}>
        <h2 id="start-building" className={styles.lanesTitle}>
          <Translate id="homepage.start.title" description="Heading above the three quick starts on the homepage">
            Start building
          </Translate>
        </h2>
        <div className={styles.laneGrid}>
          <div className={styles.laneCard}>
            <div className={styles.laneMedia}>
              <img
                src={editorImage}
                width="960"
                height="540"
                alt={translate({
                  id: 'homepage.start.editor.imageAlt',
                  message: 'The PlayCanvas Editor with a chess scene open in the viewport'
                })} />
            </div>
            <div className={styles.laneText}>
              <p className={styles.laneKicker}>PlayCanvas Editor</p>
              <h3 className={styles.laneTitle}>
                <Translate id="homepage.start.editor.title">Build visually</Translate>
              </h3>
              <p className={styles.laneDescription}>
                <Translate id="homepage.start.editor.description">
                  Assemble scenes, add scripts and publish from a collaborative editor that runs in your browser. There is nothing to install.
                </Translate>
              </p>
            </div>
            <div className={styles.laneActions}>
              <Link className={styles.primaryButton} to="/user-manual/editor/getting-started/your-first-app/">
                <Translate id="homepage.start.editor.action">Create your first app</Translate>
                <Duration minutes={5} />
              </Link>
              <Link className={styles.textLink} to="/tutorials/">
                <Translate id="homepage.start.editor.secondary">Editor tutorials</Translate>
                <Arrow />
              </Link>
            </div>
          </div>

          <div className={styles.laneCard}>
            <div className={styles.laneMedia}>
              <CreateTerminal />
            </div>
            <div className={styles.laneText}>
              <p className={styles.laneKicker}>create-playcanvas</p>
              <h3 className={styles.laneTitle}>
                <Translate id="homepage.start.code.title">Build with code</Translate>
              </h3>
              <p className={styles.laneDescription}>
                <Translate id="homepage.start.code.description">
                  Scaffold a Vite and TypeScript project for the Engine, React or Web Components from one of 12 runnable starters.
                </Translate>
              </p>
            </div>
            <div className={styles.laneActions}>
              <Link className={styles.primaryButton} to="/user-manual/getting-started/start-with-create-playcanvas/">
                <Translate id="homepage.start.code.action">Create your first project</Translate>
              </Link>
              <p className={styles.laneAlt}>
                <Translate id="homepage.start.code.manual" description="Followed by links to the Engine, React and Web Components getting started guides">
                  Or set up by hand:
                </Translate>{' '}
                <Link to="/user-manual/engine/standalone/">Engine</Link>
                {' · '}
                <Link to="/user-manual/react/getting-started/">React</Link>
                {' · '}
                <Link to="/user-manual/web-components/getting-started/">Web Components</Link>
              </p>
            </div>
          </div>

          <div className={styles.laneCard}>
            <div className={styles.laneMedia}>
              <img
                src={supersplatImage}
                width="960"
                height="540"
                alt={translate({
                  id: 'homepage.start.splats.imageAlt',
                  message: 'A Gaussian splat of a honeybee, published on superspl.at'
                })} />
            </div>
            <div className={styles.laneText}>
              <p className={styles.laneKicker}>SuperSplat</p>
              <h3 className={styles.laneTitle}>
                <Translate id="homepage.start.splats.title">Publish Gaussian splats</Translate>
              </h3>
              <p className={styles.laneDescription}>
                <Translate id="homepage.start.splats.description">
                  Clean up a splat capture in your browser, publish it to superspl.at and share it with anyone, on any device.
                </Translate>
              </p>
            </div>
            <div className={styles.laneActions}>
              <Link className={styles.primaryButton} to="/user-manual/supersplat/getting-started/">
                <Translate id="homepage.start.splats.action">Publish your first splat</Translate>
                <Duration minutes={10} />
              </Link>
              <Link className={styles.textLink} to="/user-manual/gaussian-splatting/building/your-first-app/">
                <Translate id="homepage.start.splats.secondary">Splats in your own app</Translate>
                <Arrow />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function SectionHeader({ id, title, subtitle, link }) {
  return (
    <div className={styles.sectionHeader}>
      <div>
        <h2 id={id} className={styles.sectionTitle}>{title}</h2>
        {subtitle && <p className={styles.sectionSubtitle}>{subtitle}</p>}
      </div>
      {link}
    </div>
  );
}

function Platform() {
  const labels = {
    getStarted: translate({ id: 'homepage.products.link.getStarted', message: 'Get started' }),
    examples: translate({ id: 'homepage.products.link.examples', message: 'Examples' }),
    api: translate({ id: 'homepage.products.link.api', message: 'API reference' }),
    tutorials: translate({ id: 'homepage.products.link.tutorials', message: 'Tutorials' }),
    tags: translate({ id: 'homepage.products.link.tags', message: 'Tag reference' }),
    cli: translate({ id: 'homepage.products.link.cli', message: 'CLI reference' })
  };

  const products = [
    {
      title: 'Engine',
      to: '/user-manual/engine/',
      icon: ICONS.engine,
      description: translate({
        id: 'homepage.products.engine.description',
        message: 'The open-source engine every other product is built on, rendering with WebGL2 or WebGPU. Use it from npm or a CDN.'
      }),
      links: [
        { label: labels.getStarted, to: '/user-manual/engine/standalone/' },
        { label: labels.examples, to: 'https://playcanvas.com/examples' },
        { label: labels.api, to: 'https://api.playcanvas.com/engine/' }
      ]
    },
    {
      title: 'Editor',
      to: '/user-manual/editor/',
      icon: ICONS.editor,
      description: translate({
        id: 'homepage.products.editor.description',
        message: 'A browser-based, collaborative editor for building scenes, managing assets and publishing apps.'
      }),
      links: [
        { label: labels.getStarted, to: '/user-manual/editor/getting-started/' },
        { label: labels.tutorials, to: '/tutorials/' },
        { label: 'Editor API', to: 'https://api.playcanvas.com/editor/' }
      ]
    },
    {
      title: 'React',
      to: '/user-manual/react/',
      icon: ICONS.react,
      description: translate({
        id: 'homepage.products.react.description',
        message: 'Build scenes declaratively from React components and hooks with @playcanvas/react.'
      }),
      links: [
        { label: labels.getStarted, to: '/user-manual/react/getting-started/' },
        { label: labels.examples, to: '/user-manual/react/examples/' }
      ]
    },
    {
      title: 'Web Components',
      to: '/user-manual/web-components/',
      icon: ICONS.webComponents,
      description: translate({
        id: 'homepage.products.webComponents.description',
        message: 'Build scenes in plain HTML with <pc-*> custom elements. No build step required.'
      }),
      links: [
        { label: labels.getStarted, to: '/user-manual/web-components/getting-started/' },
        { label: labels.tags, to: '/user-manual/web-components/tags/' },
        { label: labels.examples, to: 'https://playcanvas.github.io/web-components/examples/' }
      ]
    },
    {
      title: 'SuperSplat',
      to: '/user-manual/supersplat/',
      icon: ICONS.supersplat,
      description: translate({
        id: 'homepage.products.supersplat.description',
        message: 'Clean up, publish and share 3D Gaussian splats, then curate them in Studio and embed them anywhere.'
      }),
      links: [
        { label: labels.getStarted, to: '/user-manual/supersplat/getting-started/' },
        { label: 'superspl.at', to: 'https://superspl.at' }
      ]
    },
    {
      title: 'SplatTransform',
      to: '/user-manual/splat-transform/',
      icon: ICONS.splatTransform,
      description: translate({
        id: 'homepage.products.splatTransform.description',
        message: 'A CLI and library that converts, filters and merges splat files and generates streamed LODs.'
      }),
      links: [
        { label: labels.cli, to: '/user-manual/splat-transform/cli-reference/' },
        { label: labels.api, to: 'https://api.playcanvas.com/splat-transform/' }
      ]
    }
  ];

  return (
    <section className={styles.section} aria-labelledby="platform">
      <div className={styles.wrap}>
        <SectionHeader
          id="platform"
          title={<Translate id="homepage.products.title">Explore the platform</Translate>}
          subtitle={
            <Translate id="homepage.products.subtitle">
              From the engine at its core to the tools built on it, every product has its own guide.
            </Translate>
          } />
        <div className={styles.productGrid}>
          {products.map(product => (
            <div key={product.title} className={styles.productCard}>
              <div className={styles.productIcon}><Icon>{product.icon}</Icon></div>
              <h3 className={styles.productTitle}>
                <Link className={styles.stretchedLink} to={product.to}>{product.title}</Link>
              </h3>
              <p className={styles.productDescription}>{product.description}</p>
              <ul className={styles.productLinks}>
                {product.links.map(link => (
                  <li key={link.to}><Link to={link.to}>{link.label}</Link></li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Concepts() {
  const topics = [
    {
      to: '/user-manual/ecs/',
      title: translate({ id: 'homepage.topics.ecs.title', message: 'Entity Component System' }),
      description: translate({ id: 'homepage.topics.ecs.description', message: 'Entities, components and the scene hierarchy.' })
    },
    {
      to: '/user-manual/scripting/',
      title: translate({ id: 'homepage.topics.scripting.title', message: 'Scripting' }),
      description: translate({ id: 'homepage.topics.scripting.description', message: 'Add behavior with ESM scripts and attributes.' })
    },
    {
      to: '/user-manual/assets/',
      title: translate({ id: 'homepage.topics.assets.title', message: 'Assets' }),
      description: translate({ id: 'homepage.topics.assets.description', message: 'Load, preload and unload models, textures and more.' })
    },
    {
      to: '/user-manual/graphics/',
      title: translate({ id: 'homepage.topics.graphics.title', message: 'Graphics' }),
      description: translate({ id: 'homepage.topics.graphics.description', message: 'Cameras, lighting, materials, shaders and post effects.' })
    },
    {
      to: '/user-manual/gaussian-splatting/',
      title: translate({ id: 'homepage.topics.gaussianSplatting.title', message: 'Gaussian Splatting' }),
      description: translate({ id: 'homepage.topics.gaussianSplatting.description', message: 'Capture, render and build apps with 3D Gaussian splats.' })
    },
    {
      to: '/user-manual/animation/',
      title: translate({ id: 'homepage.topics.animation.title', message: 'Animation' }),
      description: translate({ id: 'homepage.topics.animation.description', message: 'State graphs, blending, layer masks and events.' })
    },
    {
      to: '/user-manual/physics/',
      title: translate({ id: 'homepage.topics.physics.title', message: 'Physics' }),
      description: translate({ id: 'homepage.topics.physics.description', message: 'Rigid bodies, collisions, triggers, joints and ray casts.' })
    },
    {
      to: '/user-manual/user-interface/',
      title: translate({ id: 'homepage.topics.userInterface.title', message: 'User Interface' }),
      description: translate({ id: 'homepage.topics.userInterface.description', message: 'Screens, elements, text, buttons and scroll views.' })
    },
    {
      to: '/user-manual/2D/',
      title: '2D',
      description: translate({ id: 'homepage.topics.twoD.description', message: 'Sprites, 9-slicing and texture packing.' })
    },
    {
      to: '/user-manual/xr/',
      title: 'XR',
      description: translate({ id: 'homepage.topics.xr.description', message: 'Immersive VR and AR experiences with WebXR.' })
    },
    {
      to: '/user-manual/optimization/',
      title: translate({ id: 'homepage.topics.optimization.title', message: 'Optimization' }),
      description: translate({ id: 'homepage.topics.optimization.description', message: 'Profile and speed up loading and rendering.' })
    }
  ];

  return (
    <section className={styles.section} aria-labelledby="concepts">
      <div className={styles.wrap}>
        <SectionHeader
          id="concepts"
          title={<Translate id="homepage.topics.title">Core concepts</Translate>}
          subtitle={
            <Translate id="homepage.topics.subtitle">
              These topics apply however you build: in the Editor or with the Engine, React or Web Components.
            </Translate>
          } />
        <div className={styles.topicGrid}>
          {topics.map(topic => (
            <Link key={topic.to} className={styles.topicCard} to={topic.to}>
              <span className={styles.topicTitle}>{topic.title}</span>
              <span className={styles.topicDescription}>{topic.description}</span>
            </Link>
          ))}
          <Link className={clsx(styles.topicCard, styles.topicCardAll)} to="/user-manual/">
            <span className={styles.topicTitle}>
              <Translate id="homepage.topics.all">Browse the User Manual</Translate>
              <Arrow />
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}

function Examples() {
  const examples = [
    {
      to: 'https://playcanvas.com/examples',
      image: engineExamplesImage,
      alt: translate({ id: 'homepage.examples.engine.imageAlt', message: 'The Engine Examples browser running a clustered area lights example beside its source code' }),
      title: translate({ id: 'homepage.examples.engine.title', message: 'Engine Examples' }),
      description: translate({ id: 'homepage.examples.engine.description', message: 'Hundreds of live examples with full source, from rendering and physics to splats and XR.' })
    },
    {
      to: '/tutorials/',
      image: editorTutorialsImage,
      alt: translate({ id: 'homepage.examples.tutorials.imageAlt', message: 'A grid of Editor tutorial thumbnails' }),
      title: translate({ id: 'homepage.examples.tutorials.title', message: 'Editor Tutorials' }),
      description: translate({ id: 'homepage.examples.tutorials.description', message: 'Step-by-step guides to building games and interactive apps in the Editor.' })
    },
    {
      to: '/user-manual/react/examples/',
      image: reactExamplesImage,
      alt: translate({ id: 'homepage.examples.react.imageAlt', message: 'Orange and white spheres and capsules tumbling in a physics simulation' }),
      title: translate({ id: 'homepage.examples.react.title', message: 'React Examples' }),
      description: translate({ id: 'homepage.examples.react.description', message: 'Model viewers, physics, motion and text, built with @playcanvas/react.' })
    },
    {
      to: 'https://playcanvas.github.io/web-components/examples/',
      image: webComponentsExamplesImage,
      alt: translate({ id: 'homepage.examples.webComponents.imageAlt', message: 'A silver sports car above a row of paint swatches' }),
      title: translate({ id: 'homepage.examples.webComponents.title', message: 'Web Components Examples' }),
      description: translate({ id: 'homepage.examples.webComponents.description', message: 'Live HTML pages to explore, from a first scene to complete showcases.' })
    }
  ];

  const apis = [
    { label: 'Engine', to: 'https://api.playcanvas.com/engine/' },
    { label: 'Editor API', to: 'https://api.playcanvas.com/editor/' },
    { label: 'Web Components', to: 'https://api.playcanvas.com/web-components/' },
    { label: 'SplatTransform', to: 'https://api.playcanvas.com/splat-transform/' },
    { label: 'PCUI', to: 'https://api.playcanvas.com/pcui/' },
    { label: 'PCUI Graph', to: 'https://api.playcanvas.com/pcui-graph/' },
    { label: 'Observer', to: 'https://api.playcanvas.com/observer/' },
    { label: 'REST API', to: '/user-manual/api/' },
    { label: 'SuperSplat API', to: '/user-manual/api/supersplat/' }
  ];

  return (
    <section className={styles.section} aria-labelledby="examples">
      <div className={styles.wrap}>
        <SectionHeader
          id="examples"
          title={<Translate id="homepage.examples.title">Learn by example</Translate>}
          subtitle={
            <Translate id="homepage.examples.subtitle">
              Run live examples, read their source and adapt them to your own project.
            </Translate>
          } />
        <div className={styles.exampleGrid}>
          {examples.map(example => (
            <Link key={example.to} className={styles.exampleCard} to={example.to}>
              <img src={example.image} alt={example.alt} width="960" height="540" loading="lazy" />
              <span className={styles.exampleBody}>
                <span className={styles.exampleTitle}>{example.title}</span>
                <span className={styles.exampleDescription}>{example.description}</span>
              </span>
            </Link>
          ))}
        </div>
        <div className={styles.apiRow}>
          <h3 className={styles.apiTitle}>
            <Translate id="homepage.api.title">API reference</Translate>
          </h3>
          <ul className={styles.apiList}>
            {apis.map(api => (
              <li key={api.to}><Link className={styles.apiChip} to={api.to}>{api.label}</Link></li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

function BuildWithAI() {
  const resources = [
    {
      to: '/user-manual/getting-started/use-playcanvas-skills/',
      icon: ICONS.skills,
      title: 'PlayCanvas Skills',
      description: translate({ id: 'homepage.ai.skills.description', message: 'Workflows for building and verifying Engine, React and Web Components apps.' })
    },
    {
      to: '/user-manual/editor/mcp-server/',
      icon: ICONS.mcp,
      title: translate({ id: 'homepage.ai.mcp.title', message: 'Editor MCP Server' }),
      description: translate({ id: 'homepage.ai.mcp.description', message: 'Connect an agent to the Editor to modify and verify your project.' })
    },
    {
      to: '/user-manual/engine/developing-with-ai/',
      icon: ICONS.guide,
      title: translate({ id: 'homepage.ai.guide.title', message: 'Developing with AI' }),
      description: translate({ id: 'homepage.ai.guide.description', message: 'Set up a coding agent on an Engine project and check its changes.' })
    },
    {
      // llms.txt is only generated at the site root, so it must not get the locale prefix
      to: 'pathname:///llms.txt',
      autoAddBaseUrl: false,
      icon: ICONS.llms,
      title: 'llms.txt',
      description: translate({ id: 'homepage.ai.llms.description', message: 'Indexes that point agents to a Markdown version of every page.' })
    }
  ];

  return (
    <section className={styles.section} aria-labelledby="ai">
      <div className={styles.wrap}>
        <div className={styles.aiPanel}>
          <div className={styles.aiIntro}>
            <h2 id="ai" className={styles.sectionTitle}>
              <Translate id="homepage.ai.title">Build with AI</Translate>
            </h2>
            <p className={styles.sectionSubtitle}>
              <Translate id="homepage.ai.description">
                Give your coding agent PlayCanvas know-how. Skills, the Editor MCP server and agent-ready docs help Claude Code, Codex, Cursor and other agents build and verify PlayCanvas apps.
              </Translate>
            </p>
            <div className={styles.aiCommand}>
              <code>{SKILLS_COMMAND}</code>
              <CopyButton text={SKILLS_COMMAND} />
            </div>
          </div>
          <ul className={styles.aiLinks}>
            {resources.map(resource => (
              <li key={resource.to}>
                <Link className={styles.aiLink} to={resource.to} autoAddBaseUrl={resource.autoAddBaseUrl}>
                  <span className={styles.aiLinkIcon}><Icon>{resource.icon}</Icon></span>
                  <span>
                    <span className={styles.aiLinkTitle}>{resource.title}</span>
                    <span className={styles.aiLinkDescription}>{resource.description}</span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

function Community() {
  const channels = [
    {
      to: 'https://discord.gg/RSaMRzg',
      icon: <DiscordMark className={clsx(styles.communityIcon, styles.discordIcon)} />,
      title: 'Discord',
      description: translate({ id: 'homepage.community.discord.description', message: 'Chat with the PlayCanvas team and community.' })
    },
    {
      to: 'https://forum.playcanvas.com',
      icon: <Icon className={styles.communityIcon}>{ICONS.forum}</Icon>,
      title: translate({ id: 'homepage.community.forum.title', message: 'Forum' }),
      description: translate({ id: 'homepage.community.forum.description', message: 'Search past answers and ask detailed questions.' })
    },
    {
      to: 'https://github.com/playcanvas',
      icon: <GitHubMark className={styles.communityIcon} />,
      title: 'GitHub',
      description: translate({ id: 'homepage.community.github.description', message: 'Star the repositories, report issues and contribute.' })
    },
    {
      to: 'https://blog.playcanvas.com',
      icon: <Icon className={styles.communityIcon}>{ICONS.blog}</Icon>,
      title: translate({ id: 'homepage.community.blog.title', message: 'Blog' }),
      description: translate({ id: 'homepage.community.blog.description', message: 'Release notes, tutorials and news.' })
    }
  ];

  return (
    <section className={clsx(styles.section, styles.lastSection)} aria-labelledby="community">
      <div className={styles.wrap}>
        <SectionHeader
          id="community"
          title={<Translate id="homepage.community.title">Join the community</Translate>}
          subtitle={
            <Translate id="homepage.community.subtitle">
              Get help, share what you make and keep up with what is new.
            </Translate>
          } />
        <div className={styles.communityGrid}>
          {channels.map(channel => (
            <Link key={channel.to} className={styles.communityCard} to={channel.to}>
              {channel.icon}
              <span>
                <span className={styles.communityTitle}>{channel.title}</span>
                <span className={styles.communityDescription}>{channel.description}</span>
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout
      title={translate({
        id: 'homepage.layoutTitle',
        description: 'Title for the layout of the homepage',
        message: siteConfig.title
      })}
      description={translate({
        id: 'homepage.metaDescription',
        description: 'Meta description of the homepage',
        message: 'Guides, tutorials, examples and API references for PlayCanvas, the open-source 3D engine for the web, and for the Editor, React, Web Components, SuperSplat and SplatTransform.'
      })}>
      <div className={styles.page}>
        <Hero />
        <main>
          <StartBuilding />
          <Platform />
          <Concepts />
          <Examples />
          <BuildWithAI />
          <Community />
        </main>
      </div>
    </Layout>
  );
}
