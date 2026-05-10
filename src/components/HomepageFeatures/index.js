import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

import UserManualImage from '@site/static/img/playcanvas-user-manual.webp';
import TutorialsImage from '@site/static/img/playcanvas-tutorials.webp';
import ApiReferenceImage from '@site/static/img/playcanvas-api-reference.webp';
import Link from '@docusaurus/Link';

import Translate from '@docusaurus/Translate';

const FeatureList = [
  {
    title: 'userManual.title',
    defaultTitle: 'User Manual',
    Image: UserManualImage,
    Url: './user-manual',
    Icon: _ => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25" />
    </svg>,  
    description: 'userManual.description',
    defaultDescription: 'Learn about every aspect of PlayCanvas, from the basics to advanced.',
  },
  {
    title: 'tutorials.title',
    defaultTitle: 'Tutorials',
    Image: TutorialsImage,
    Url: './tutorials',
    Icon: _ => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
      <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342M6.75 15a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm0 0v-3.675A55.378 55.378 0 0 1 12 8.443m-7.007 11.55A5.981 5.981 0 0 0 6.75 15.75v-1.5" />
    </svg>,
    description: 'tutorials.description',
    defaultDescription: 'Real world applications of PlayCanvas that make learning both fun and easy.',
  },
  {
    title: 'apiReference.title',
    defaultTitle: 'API Reference',
    Url: 'https://api.playcanvas.com',
    Image: ApiReferenceImage,
    Icon: _ => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
      <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75 22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3-4.5 16.5" />
    </svg>,
    description: 'apiReference.description',
    defaultDescription: 'Get to know the PlayCanvas API and how to build your own interactive web apps.',
  },
];

function Feature({ Image, title, description, Url, Icon, defaultTitle, defaultDescription }) {
  return (
    <div className={clsx('col col--4', styles.feature)}>
      <Link to={Url}>
        <div className={clsx('text--center shadow', styles.featureImgContainer )}>
          <img src={Image} alt={title} className={styles.featureImg} />
        </div>
        <div className="text--left padding-horiz--md">
          <div className={styles.featureTitleContainer}>
            {Icon && <Icon />}
            <Heading as="h3">
              <Translate id={title}>
                {defaultTitle}
              </Translate>
            </Heading>
          </div>
          <p>
            <Translate id={description}>
              {defaultDescription}
            </Translate>
          </p>
        </div>
      </Link>
    </div>
  );
}

export default function HomepageFeatures() {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
