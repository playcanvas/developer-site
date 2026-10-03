// The sidebar never scrolls on its own, so a page deep in a long section can open with its entry
// out of sight, both in the desktop sidebar and in the mobile drawer (which is rendered while
// closed). After each navigation, scroll each sidebar so the current page is in view, but only
// when it isn't already: clicking an entry that is visible never moves the list. Hash-only
// changes keep the same page, so they are skipped.
//
// Categories open and close with a height transition, and opening one collapses its siblings
// (autoCollapseCategories), so the entry can still move after the first check. Keep checking for
// a second, and stop as soon as the reader scrolls, taps or types.
const WATCH_MS = 1000;
const INPUTS = ['wheel', 'touchstart', 'pointerdown', 'keydown'];

let stopWatching = null;

function revealCurrentPage() {
  for (const link of document.querySelectorAll('.theme-doc-sidebar-menu a.menu__link[aria-current="page"]')) {
    // the scrolling <nav> on desktop, or the drawer panel on mobile
    const list = link.closest('.menu');
    if (!list || list.clientHeight === 0) {
      continue;
    }
    const top = list.getBoundingClientRect().top + list.clientTop;
    const rect = link.getBoundingClientRect();
    if (rect.top >= top && rect.bottom <= top + list.clientHeight) {
      continue;
    }
    list.scrollTop += rect.top - top - (list.clientHeight - rect.height) / 2;
  }
}

export function onRouteDidUpdate({ previousLocation, location }) {
  if (previousLocation && previousLocation.pathname === location.pathname) {
    return;
  }
  stopWatching?.();

  const end = performance.now() + WATCH_MS;
  let frame = 0;
  const stop = () => {
    cancelAnimationFrame(frame);
    for (const type of INPUTS) {
      removeEventListener(type, stop, true);
    }
    if (stopWatching === stop) {
      stopWatching = null;
    }
  };
  const tick = () => {
    revealCurrentPage();
    if (performance.now() < end) {
      frame = requestAnimationFrame(tick);
    } else {
      stop();
    }
  };

  for (const type of INPUTS) {
    addEventListener(type, stop, { capture: true, passive: true });
  }
  stopWatching = stop;
  frame = requestAnimationFrame(tick);
}
