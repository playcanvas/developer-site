// docusaurus-plugin-copy-page-button's own client module inserts the button into the article or
// ToC as soon as the DOM is ready, which is often before React has hydrated them (React error
// #418). The plugin runs with injectButton: false and its client module is loaded here instead,
// once the first route has rendered. It handles later navigation itself.
let loaded = false;

export function onRouteDidUpdate() {
  if (!loaded) {
    loaded = true;
    import('docusaurus-plugin-copy-page-button/src/client.js');
  }
}
