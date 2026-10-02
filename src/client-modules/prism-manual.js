// redocusaurus provides the `prismjs` package for every free `Prism` reference in the bundle
// (webpack ProvidePlugin), so the Prism language components loaded for prism.additionalLanguages
// put Prism's core in the main bundle. By default that core highlights every code block on
// DOMContentLoaded, rewriting the server-rendered HTML before React hydrates it (React error #418).
// Docusaurus and Redoc both highlight explicitly, so automatic highlighting is never needed.
import Prism from 'prismjs';

Prism.manual = true;
