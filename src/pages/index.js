import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import HomepageFeatures from '@site/src/components/HomepageFeatures';

import Heading from '@theme/Heading';
import styles from './index.module.css';

import Translate, {translate} from '@docusaurus/Translate';

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <header className={clsx('hero hero--primary shadow-lg', styles.heroBanner)}>
      <div className="container">
        
        <iframe src="https://ghbtns.com/github-btn.html?user=playcanvas&repo=engine&type=star&count=true&size=large" frameBorder="0" scrolling="0" width="170" height="30" title="PlayCanvas" allow="camera; microphone; xr-spatial-tracking; fullscreen" allowfullscreen></iframe>
        <Heading as="h1" className={clsx('hero__title', styles.heroTitle)}>
          <Translate id="homepage.title" description="The homepage title">
            {siteConfig.title}
          </Translate>
        </Heading>
        <p className="hero__subtitle">
          <Translate id="homepage.tagline" description="The homepage subtitle">
            {siteConfig.tagline}
          </Translate>
        </p>
        <div className={styles.buttons}>
          <Link
            className="button button--secondary button--lg"
            to="/user-manual/editor/getting-started/your-first-app/">
            <Translate id="homepage.getStarted" description="Button text for creating the first app">
              Create your First App - 5min ⏱️
            </Translate>
          </Link>
        </div>
      </div>
    </header>
  );
}

export default function Home() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title={translate({
        id: 'homepage.layoutTitle',
        description: 'Title for the layout of the homepage',
        message: siteConfig.title
      })}
      description="Everything you need to make games and interactive experiences with PlayCanvas.">
      <HomepageHeader />
      <main>
        <HomepageFeatures />
      </main>
    </Layout>
  );
}
