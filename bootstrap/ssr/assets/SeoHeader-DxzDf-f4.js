import { jsxs, Fragment, jsx } from "react/jsx-runtime";
import { InertiaHead } from "@inertiajs/inertia-react";
import { A as APP_URL } from "./statics-GI0iJz3l.js";
import { Helmet } from "react-helmet";
const SeoHeader = ({ content, title }) => {
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(Helmet, { children: /* @__PURE__ */ jsxs("title", { children: [
      "DB Rank AI | ",
      title
    ] }) }),
    /* @__PURE__ */ jsxs(InertiaHead, { children: [
      content && content.meta_description && /* @__PURE__ */ jsx("meta", { name: "description", content: content.meta_description }),
      content && content.meta_title && /* @__PURE__ */ jsx("meta", { property: "og:title", content: content.meta_title }),
      content && content.meta_description && /* @__PURE__ */ jsx("meta", { property: "og:description", content: content.meta_description }),
      content && content.og_graph_image && /* @__PURE__ */ jsx("meta", { property: "og:image", content: `${APP_URL}storage/${content.og_graph_image}` }),
      typeof window !== "undefined" && /* @__PURE__ */ jsx("meta", { property: "og:url", content: window.location.href }),
      /* @__PURE__ */ jsx("meta", { name: "twitter:card", content: "summary_large_image" }),
      content && content.meta_title && /* @__PURE__ */ jsx("meta", { name: "twitter:title", content: content.meta_title }),
      content && content.meta_description && /* @__PURE__ */ jsx("meta", { name: "twitter:description", content: content.meta_description }),
      content && content.twitter_graph_image && /* @__PURE__ */ jsx("meta", { name: "twitter:image", content: `${APP_URL}storage/${content.twitter_graph_image}` })
    ] })
  ] });
};
export {
  SeoHeader as default
};
