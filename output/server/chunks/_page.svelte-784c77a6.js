import { s as subscribe } from './utils-d634360b.js';
import { c as create_ssr_component, v as validate_component, f as escape } from './ssr-fb83eaae.js';
import { p as page } from './stores-7dbb318a.js';
import { C as CenteredHeader, G as Grid, T as TextInput, S as SaveButton } from './CenteredHeader-be444d7d.js';
import './tw-merge-63ee20bd.js';
import './Heading-808c317f.js';

const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $page, $$unsubscribe_page;
  $$unsubscribe_page = subscribe(page, (value) => $page = value);
  let { data } = $$props;
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  let $$settled;
  let $$rendered;
  do {
    $$settled = true;
    $$rendered = `${validate_component(CenteredHeader, "CenteredHeader").$$render($$result, {}, {}, {
      default: () => {
        return `Edit location ${escape($page.params.locationId)}`;
      }
    })} ${validate_component(Grid, "Grid").$$render($$result, {}, {}, {
      default: () => {
        return `${validate_component(TextInput, "TextInput").$$render(
          $$result,
          {
            id: "name",
            label: "Name",
            required: true,
            value: data.location.name
          },
          {
            value: ($$value) => {
              data.location.name = $$value;
              $$settled = false;
            }
          },
          {}
        )} ${validate_component(TextInput, "TextInput").$$render(
          $$result,
          {
            id: "description",
            label: "Description",
            value: data.location.description
          },
          {
            value: ($$value) => {
              data.location.description = $$value;
              $$settled = false;
            }
          },
          {}
        )} ${validate_component(SaveButton, "SaveButton").$$render($$result, {}, {}, {})}`;
      }
    })}`;
  } while (!$$settled);
  $$unsubscribe_page();
  return $$rendered;
});

export { Page as default };
//# sourceMappingURL=_page.svelte-784c77a6.js.map
