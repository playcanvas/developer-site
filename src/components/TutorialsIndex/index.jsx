import { useEffect, useMemo, useState } from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import { useHistory, useLocation } from '@docusaurus/router';
import Translate, { translate } from '@docusaurus/Translate';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Heading from '@theme/Heading';
import Layout from '@theme/Layout';

import styles from './styles.module.css';

// The tutorials index page, at /tutorials/. The list of pages is built by
// utils/plugins/docusaurus-plugin-tutorials.mjs and arrives as the `tutorials` prop.
//
// The filters live in the query string, so a filtered view can be linked to:
//   ?q=<text>  ?kind=tutorial|sample  ?sort=title  ?tags=<tag>,<tag>

const KINDS = ['tutorial', 'sample'];
const DEFAULT_SORT = 'plays';

const KIND_LABELS = {
  tutorial: () => translate({ id: 'tutorials.kind.tutorial', message: 'Tutorials' }),
  sample: () => translate({ id: 'tutorials.kind.sample', message: 'Sample projects' }),
};

const KIND_LEADS = {
  tutorial: () => translate({
    id: 'tutorials.kind.tutorial.lead',
    message: 'Step-by-step guides that explain how something is built.',
  }),
  sample: () => translate({
    id: 'tutorials.kind.sample.lead',
    message: 'Working projects to open in the Editor, read and fork.',
  }),
};

function readFilters(search) {
  const params = new URLSearchParams(search);
  const kind = params.get('kind');
  return {
    query: params.get('q') ?? '',
    kind: KINDS.includes(kind) ? kind : 'all',
    sort: params.get('sort') === 'title' ? 'title' : DEFAULT_SORT,
    tags: (params.get('tags') ?? '').split(',').filter(Boolean),
  };
}

function writeFilters({ query, kind, sort, tags }) {
  const params = new URLSearchParams();
  if (query) params.set('q', query);
  if (kind !== 'all') params.set('kind', kind);
  if (sort !== DEFAULT_SORT) params.set('sort', sort);
  if (tags.length > 0) params.set('tags', [...tags].sort().join(','));
  // Commas are safe in a query string and read better unescaped
  return params.toString().replaceAll('%2C', ',');
}

function SearchIcon() {
  return (
    <svg className={styles.searchIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
      strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-3.5-3.5" />
    </svg>
  );
}

function Thumbnail({ src }) {
  return src
    ? <img className={styles.thumbnail} src={src} alt="" loading="lazy" decoding="async" width="180" height="180" />
    : <div className={styles.thumbnail} />;
}

function TutorialCard({ tutorial }) {
  return (
    <Link to={tutorial.permalink} className={styles.tutorialCard}>
      <Thumbnail src={tutorial.thumb} />
      <span className={styles.tutorialText}>
        <span className={styles.cardTitle}>{tutorial.title}</span>
        <span className={styles.cardDescription}>{tutorial.description}</span>
      </span>
    </Link>
  );
}

function SampleCard({ tutorial }) {
  return (
    <Link to={tutorial.permalink} className={styles.sampleCard}>
      <Thumbnail src={tutorial.thumb} />
      <span className={styles.cardTitle}>{tutorial.title}</span>
    </Link>
  );
}

export default function TutorialsIndex({ tutorials }) {
  const { i18n: { currentLocale } } = useDocusaurusContext();
  const { search } = useLocation();
  const history = useHistory();

  // The page is prerendered without a query string, so the filters are applied after it
  // hydrates rather than during the first render.
  const [filters, setFilters] = useState(() => readFilters(''));
  useEffect(() => setFilters(readFilters(search)), [search]);

  const update = (change, { replace = false } = {}) => {
    const next = { ...filters, ...change };
    setFilters(next);
    history[replace ? 'replace' : 'push']({ search: writeFilters(next) });
  };

  const toggleTag = (tag) => update({
    tags: filters.tags.includes(tag) ? filters.tags.filter((other) => other !== tag) : [...filters.tags, tag],
  });

  const allTags = useMemo(
    () => [...new Set(tutorials.flatMap((tutorial) => tutorial.tags))].sort(),
    [tutorials],
  );

  const visible = useMemo(() => {
    const terms = filters.query.toLowerCase().split(/\s+/).filter(Boolean);
    const collator = new Intl.Collator(currentLocale, { numeric: true, sensitivity: 'base' });
    const byTitle = (a, b) => collator.compare(a.title, b.title);
    return tutorials
      .filter((tutorial) => filters.kind === 'all' || tutorial.kind === filters.kind)
      .filter((tutorial) => filters.tags.length === 0 || tutorial.tags.some((tag) => filters.tags.includes(tag)))
      .filter((tutorial) => {
        const text = [tutorial.title, tutorial.description, tutorial.topic, ...tutorial.tags].join(' ').toLowerCase();
        return terms.every((term) => text.includes(term));
      })
      .sort(filters.sort === 'title' ? byTitle : (a, b) => b.plays - a.plays || byTitle(a, b));
  }, [tutorials, filters, currentLocale]);

  const filtered = filters.query !== '' || filters.kind !== 'all' || filters.tags.length > 0;

  return (
    <Layout
      title={translate({ id: 'tutorials.title', message: 'Tutorials' })}
      description={translate({
        id: 'tutorials.description',
        message: 'Step-by-step tutorials and sample projects for the PlayCanvas Editor.',
      })}
    >
      <main className={styles.page}>
        <header className={styles.header}>
          <Heading as="h1" className={styles.title}>
            <Translate id="tutorials.title">Tutorials</Translate>
          </Heading>
          <p className={styles.lead}>
            <Translate id="tutorials.lead">
              Learn the PlayCanvas Editor with step-by-step tutorials, or open a sample project to see how it is built.
            </Translate>
          </p>
        </header>

        <div className={styles.controls}>
          <label className={styles.search}>
            <SearchIcon />
            <input
              type="search"
              value={filters.query}
              onChange={(event) => update({ query: event.target.value }, { replace: true })}
              placeholder={translate({ id: 'tutorials.search.placeholder', message: 'Search tutorials' })}
              aria-label={translate({ id: 'tutorials.search.placeholder', message: 'Search tutorials' })}
            />
          </label>

          <div
            className={styles.kinds}
            role="group"
            aria-label={translate({ id: 'tutorials.kind.label', message: 'Show' })}
          >
            {['all', ...KINDS].map((kind) => (
              <button
                key={kind}
                type="button"
                className={clsx(styles.kind, filters.kind === kind && styles.kindActive)}
                aria-pressed={filters.kind === kind}
                onClick={() => update({ kind })}
              >
                {kind === 'all' ? translate({ id: 'tutorials.kind.all', message: 'All' }) : KIND_LABELS[kind]()}
                <span className={styles.kindCount}>
                  {kind === 'all' ? tutorials.length : tutorials.filter((tutorial) => tutorial.kind === kind).length}
                </span>
              </button>
            ))}
          </div>

          <label className={styles.sort}>
            <Translate id="tutorials.sort.label">Sort by</Translate>
            <select value={filters.sort} onChange={(event) => update({ sort: event.target.value })}>
              <option value="plays">{translate({ id: 'tutorials.sort.plays', message: 'Most played' })}</option>
              <option value="title">{translate({ id: 'tutorials.sort.title', message: 'Title' })}</option>
            </select>
          </label>
        </div>

        <div
          className={styles.tags}
          role="group"
          aria-label={translate({ id: 'tutorials.tags.label', message: 'Filter by tag' })}
        >
          {allTags.map((tag) => (
            <button
              key={tag}
              type="button"
              className={clsx(styles.tag, filters.tags.includes(tag) && styles.tagActive)}
              aria-pressed={filters.tags.includes(tag)}
              onClick={() => toggleTag(tag)}
            >
              {tag}
            </button>
          ))}
        </div>

        <p className={styles.count} aria-live="polite">
          {filtered && (
            <>
              <Translate id="tutorials.count" values={{ count: visible.length, total: tutorials.length }}>
                {'Showing {count} of {total}'}
              </Translate>
              <button
                type="button"
                className={styles.clear}
                onClick={() => update({ query: '', kind: 'all', tags: [] })}
              >
                <Translate id="tutorials.clear">Clear filters</Translate>
              </button>
            </>
          )}
        </p>

        {visible.length === 0 && (
          <p className={styles.empty}>
            <Translate id="tutorials.empty">Nothing matches these filters.</Translate>
          </p>
        )}

        {KINDS.map((kind) => {
          const items = visible.filter((tutorial) => tutorial.kind === kind);
          if (items.length === 0) {
            return null;
          }
          const Card = kind === 'tutorial' ? TutorialCard : SampleCard;
          return (
            <section key={kind} className={styles.section}>
              <Heading as="h2" className={styles.sectionTitle}>
                {KIND_LABELS[kind]()}
                <span className={styles.sectionCount}>{items.length}</span>
              </Heading>
              <p className={styles.sectionLead}>{KIND_LEADS[kind]()}</p>
              <div className={kind === 'tutorial' ? styles.tutorialGrid : styles.sampleGrid}>
                {items.map((tutorial) => <Card key={tutorial.id} tutorial={tutorial} />)}
              </div>
            </section>
          );
        })}
      </main>
    </Layout>
  );
}
