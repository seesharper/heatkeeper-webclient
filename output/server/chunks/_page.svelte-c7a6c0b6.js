import { c as create_ssr_component, v as validate_component, f as escape, a as add_attribute } from './ssr-fb83eaae.js';
import { c as compute_rest_props } from './utils-d634360b.js';
import { F as Frame } from './Frame-9c0f9d36.js';
import { t as twMerge } from './tw-merge-63ee20bd.js';

const Card = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let innerPadding;
  let $$restProps = compute_rest_props($$props, ["href", "horizontal", "reverse", "img", "padding", "size"]);
  let { href = void 0 } = $$props;
  let { horizontal = false } = $$props;
  let { reverse = false } = $$props;
  let { img = void 0 } = $$props;
  let { padding = "lg" } = $$props;
  let { size = "sm" } = $$props;
  const paddings = {
    none: "p-0",
    sm: "p-4 sm:p-6 md:p-8",
    md: "p-4 sm:p-5",
    lg: "p-4 sm:p-6",
    xl: "p-4 sm:p-8"
  };
  const sizes = {
    xs: "max-w-xs",
    sm: "max-w-sm",
    md: "max-w-lg",
    lg: "max-w-2xl",
    xl: "max-w-screen-xl"
  };
  let cardClass;
  let imgClass;
  if ($$props.href === void 0 && $$bindings.href && href !== void 0)
    $$bindings.href(href);
  if ($$props.horizontal === void 0 && $$bindings.horizontal && horizontal !== void 0)
    $$bindings.horizontal(horizontal);
  if ($$props.reverse === void 0 && $$bindings.reverse && reverse !== void 0)
    $$bindings.reverse(reverse);
  if ($$props.img === void 0 && $$bindings.img && img !== void 0)
    $$bindings.img(img);
  if ($$props.padding === void 0 && $$bindings.padding && padding !== void 0)
    $$bindings.padding(padding);
  if ($$props.size === void 0 && $$bindings.size && size !== void 0)
    $$bindings.size(size);
  innerPadding = paddings[padding];
  cardClass = twMerge(
    "flex",
    sizes[size],
    reverse ? "flex-col-reverse" : "flex-col",
    horizontal && (reverse ? "md:flex-row-reverse md:max-w-xl" : "md:flex-row md:max-w-xl"),
    href && "hover:bg-gray-100 dark:hover:bg-gray-700",
    !img && innerPadding,
    $$props.class
  );
  imgClass = twMerge(reverse ? "rounded-b-lg" : "rounded-t-lg", horizontal && "object-cover w-full h-96 md:h-auto md:w-48 md:rounded-none", horizontal && (reverse ? "md:rounded-r-lg" : "md:rounded-l-lg"));
  return `${validate_component(Frame, "Frame").$$render($$result, Object.assign({}, { tag: href ? "a" : "div" }, { rounded: true }, { shadow: true }, { border: true }, { href }, $$restProps, { class: cardClass }), {}, {
    default: () => {
      return `${img ? `<img${add_attribute("class", imgClass, 0)}${add_attribute("src", img, 0)} alt=""> <div${add_attribute("class", innerPadding, 0)}>${slots.default ? slots.default({}) : ``}</div>` : `${slots.default ? slots.default({}) : ``}`}`;
    }
  })} `;
});
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { data } = $$props;
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  return `<main><div class="flex justify-center items-center mb-10 m-10">${validate_component(Card, "Card").$$render($$result, { href: "/cards" }, {}, {
    default: () => {
      return `<h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Noteworthy technology acquisitions 2021 ${escape(data.result[1].insideHumidity)}</h5> <p class="font-normal text-gray-700 dark:text-gray-400 leading-tight" data-svelte-h="svelte-smq5sw">Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse
				chronological order.</p>`;
    }
  })}</div> <div class="flex justify-center items-center mb-10 m-10">${validate_component(Card, "Card").$$render($$result, { href: "/cards" }, {}, {
    default: () => {
      return `<h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white" data-svelte-h="svelte-1roch2n">Noteworthy technology acquisitions 2021</h5> <p class="font-normal text-gray-700 dark:text-gray-400 leading-tight" data-svelte-h="svelte-smq5sw">Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse
				chronological order.</p>`;
    }
  })}</div></main>`;
});

export { Page as default };
//# sourceMappingURL=_page.svelte-c7a6c0b6.js.map
