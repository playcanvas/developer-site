// Ejected from @docusaurus/theme-classic (npm run swizzle @docusaurus/theme-classic
// prism-include-languages -- --eject).
//
// docusaurus-theme-redoc (from the redocusaurus preset) provides the `prismjs` package for every
// free `Prism` reference in the bundle (webpack ProvidePlugin), so the Prism language components
// loaded here register their grammars on prismjs. Code blocks are highlighted with
// prism-react-renderer's own Prism instance, which Docusaurus' version of this file mounts on
// globalThis.Prism for the components to find, but the provided variable bypasses it. The grammars
// are copied across instead. Components that also register Prism hooks (php, for example) need
// more than that.
import siteConfig from '@generated/docusaurus.config';
import Prism from 'prismjs';

// Importing prismjs puts its core in the main bundle, and by default that core highlights every
// code block on DOMContentLoaded, rewriting the server-rendered HTML before React hydrates it
// (React error #418). Docusaurus and Redoc both highlight explicitly, so automatic highlighting is
// never needed.
Prism.manual = true;

export default function prismIncludeLanguages(PrismObject) {
  siteConfig.themeConfig.prism.additionalLanguages.forEach((lang) => {
    const existing = new Set(Object.keys(Prism.languages));
    require(`prismjs/components/prism-${lang}`);
    // The language and any aliases it added (prism-bash also adds sh and shell, for example)
    Object.keys(Prism.languages)
      .filter((name) => name === lang || !existing.has(name))
      .forEach((name) => {
        PrismObject.languages[name] = Prism.languages[name];
      });
  });
}
