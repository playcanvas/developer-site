// docusaurus-plugin-copy-page-button's own client module inserts the button into the article or
// ToC as soon as the DOM is ready, which is often before React has hydrated them (React error
// #418). The plugin runs with injectButton: false and its client module is loaded here instead,
// once the first route has rendered.
//
// After that, the plugin re-checks the button whenever the URL changes, but Docusaurus is still
// showing the old page at that point, so the button goes when the new page replaces it. The
// plugin also re-checks on a docusaurus-route-update event, which Docusaurus never sends, so it
// is sent here once the new page is in the DOM. Hash-only changes keep the same page, so they are
// skipped.
let loaded = false;

export function onRouteDidUpdate({ previousLocation, location }) {
  if (!loaded) {
    loaded = true;
    import('docusaurus-plugin-copy-page-button/src/client.js');
  } else if (previousLocation && previousLocation.pathname !== location.pathname) {
    document.dispatchEvent(new Event('docusaurus-route-update'));
  }
}
