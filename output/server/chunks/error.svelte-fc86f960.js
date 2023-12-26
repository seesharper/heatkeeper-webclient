import { s as subscribe } from './utils-d634360b.js';
import { c as create_ssr_component, f as escape } from './ssr-fb83eaae.js';
import { p as page } from './stores-7dbb318a.js';

const Error = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $page, $$unsubscribe_page;
  $$unsubscribe_page = subscribe(page, (value) => $page = value);
  $$unsubscribe_page();
  return `<h1>${escape($page.status)}</h1> <p>${escape($page.error?.message)}</p>`;
});

export { Error as default };
//# sourceMappingURL=error.svelte-fc86f960.js.map
