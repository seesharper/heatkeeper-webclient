const load = async () => {
  let locations = [
    { id: 1, name: "Home", description: "Home Description" },
    { id: 2, name: "Cabin", description: "Cabin Description" }
  ];
  return { result: locations };
};

var _page_ts = /*#__PURE__*/Object.freeze({
  __proto__: null,
  load: load
});

const index = 3;
let component_cache;
const component = async () => component_cache ??= (await import('./_page.svelte-d920b48e.js')).default;
const universal_id = "src/routes/locations/+page.ts";
const imports = ["_app/immutable/nodes/3.75d7cbe8.js","_app/immutable/chunks/scheduler.778706d8.js","_app/immutable/chunks/index.998260d7.js","_app/immutable/chunks/Heading.5932af30.js","_app/immutable/chunks/Indicator.svelte_svelte_type_style_lang.7922a51a.js"];
const stylesheets = ["_app/immutable/assets/Indicator.1d121e74.css"];
const fonts = [];

export { component, fonts, imports, index, stylesheets, _page_ts as universal, universal_id };
//# sourceMappingURL=3-6503ae1c.js.map
