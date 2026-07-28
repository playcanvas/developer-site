import React, { useEffect } from 'react';
import clsx from 'clsx';
import Translate from '@docusaurus/Translate';
import Heading from '@theme/Heading';
import { useLocation } from '@docusaurus/router';

const RedirectRoutes = ({ from, to }) => {
  const { pathname } = useLocation();

  useEffect(_ => {
    const match = pathname.match(from);
    if (match) {
      const redirectTo = to.replace("$1", encodeURIComponent(match[1]));
      window.location.href = redirectTo;
    }

  }, [pathname, from, to])
}

export default function NotFoundContent({className}) {
  return (
    <>
      <RedirectRoutes 
        from={/\/en\/api\/pc\.(.*)/}
        to={"https://api.playcanvas.com/classes/Engine.$1"} />
      <main className={clsx('container margin-vert--xl', className)}>
        <div className="row">
          <div className="col col--6 col--offset-3">
            <Heading as="h1" className="hero__title">
              <Translate
                id="theme.NotFound.title"
                description="The title of the 404 page">
                Page Not Found
              </Translate>
            </Heading>
            <p>
              <Translate
                id="theme.NotFound.p1"
                description="The first paragraph of the 404 page">
                We could not find what you were looking for.
              </Translate>
            </p>
            <p>
              <Translate
                id="theme.NotFound.p2"
                description="The 2nd paragraph of the 404 page">
                Please contact the owner of the site that linked you to the
                original URL and let them know their link is broken.
              </Translate>
            </p>
          </div>
        </div>
      </main>
    </>
  );
}
