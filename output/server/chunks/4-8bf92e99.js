const load = async () => {
  let location = { id: 1, name: "Home", description: "Home Description" };
  return { location };
};

var _page_ts = /*#__PURE__*/Object.freeze({
  __proto__: null,
  load: load
});

const index = 4;
let component_cache;
const component = async () => component_cache ??= (await import('./_page.svelte-784c77a6.js')).default;
const universal_id = "src/routes/locations/[locationId=integer]/+page.ts";
const imports = ["_app/immutable/nodes/4.b00fb662.js","_app/immutable/chunks/scheduler.778706d8.js","_app/immutable/chunks/index.998260d7.js","_app/immutable/chunks/stores.03a9e028.js","_app/immutable/chunks/singletons.a15aa26d.js","_app/immutable/chunks/index.f93166ce.js","_app/immutable/chunks/api.9477e430.js","_app/immutable/chunks/CenteredHeader.3c7dcc87.js","_app/immutable/chunks/Indicator.svelte_svelte_type_style_lang.7922a51a.js","_app/immutable/chunks/Heading.5932af30.js"];
const stylesheets = ["_app/immutable/assets/Indicator.1d121e74.css"];
const fonts = [];

export { component, fonts, imports, index, stylesheets, _page_ts as universal, universal_id };
//# sourceMappingURL=4-8bf92e99.js.map
