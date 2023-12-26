import { s as subscribe } from './utils-d634360b.js';
import { c as create_ssr_component, v as validate_component } from './ssr-fb83eaae.js';
import { c as currentUser } from './stores2-2f49b5e8.js';
import { C as CenteredHeader, G as Grid, T as TextInput, S as SaveButton } from './CenteredHeader-be444d7d.js';
import './index-b3363d5c.js';
import './tw-merge-63ee20bd.js';
import './Heading-808c317f.js';

const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$unsubscribe_currentUser;
  $$unsubscribe_currentUser = subscribe(currentUser, (value) => value);
  let email = "";
  let password = "";
  let $$settled;
  let $$rendered;
  do {
    $$settled = true;
    $$rendered = `${validate_component(CenteredHeader, "CenteredHeader").$$render($$result, {}, {}, {
      default: () => {
        return `Login`;
      }
    })} ${validate_component(Grid, "Grid").$$render($$result, {}, {}, {
      default: () => {
        return `${validate_component(TextInput, "TextInput").$$render(
          $$result,
          {
            id: "user_name",
            label: "Username",
            required: true,
            value: email
          },
          {
            value: ($$value) => {
              email = $$value;
              $$settled = false;
            }
          },
          {}
        )} ${validate_component(TextInput, "TextInput").$$render(
          $$result,
          {
            id: "password",
            label: "Password",
            type: "password",
            value: password
          },
          {
            value: ($$value) => {
              password = $$value;
              $$settled = false;
            }
          },
          {}
        )} ${validate_component(SaveButton, "SaveButton").$$render($$result, {}, {}, {})}`;
      }
    })}`;
  } while (!$$settled);
  $$unsubscribe_currentUser();
  return $$rendered;
});

export { Page as default };
//# sourceMappingURL=_page.svelte-b15a08ff.js.map
