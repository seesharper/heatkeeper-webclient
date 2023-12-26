import axios from 'axios';
import { c as currentUser } from './stores2-2f49b5e8.js';
import { g as get_store_value } from './utils-d634360b.js';
import './index-b3363d5c.js';

const baseUrl = "/";
async function getDashboardLocations() {
  console.log(get_store_value(currentUser));
  const config = {
    headers: { Authorization: "bearer " + get_store_value(currentUser).token }
  };
  const result = await axios.get(
    `${baseUrl}api/dashboard/locations`,
    config
  );
  console.log(result.data);
  return result.data;
}
const load = async () => {
  let result = await getDashboardLocations();
  return { result };
};

var _page_ts = /*#__PURE__*/Object.freeze({
  __proto__: null,
  load: load
});

const index = 2;
let component_cache;
const component = async () => component_cache ??= (await import('./_page.svelte-c7a6c0b6.js')).default;
const universal_id = "src/routes/+page.ts";
const imports = ["_app/immutable/nodes/2.58aed7de.js","_app/immutable/chunks/api.9477e430.js","_app/immutable/chunks/index.f93166ce.js","_app/immutable/chunks/scheduler.778706d8.js","_app/immutable/chunks/singletons.a15aa26d.js","_app/immutable/chunks/index.998260d7.js","_app/immutable/chunks/Indicator.svelte_svelte_type_style_lang.7922a51a.js","_app/immutable/chunks/Frame.821f6ae7.js"];
const stylesheets = ["_app/immutable/assets/Indicator.1d121e74.css"];
const fonts = [];

export { component, fonts, imports, index, stylesheets, _page_ts as universal, universal_id };
//# sourceMappingURL=2-1b32de68.js.map
