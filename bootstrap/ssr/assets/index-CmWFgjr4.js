import { jsx, jsxs } from "react/jsx-runtime";
import "react";
import { Box, Tabs, TabList, Tab, TabPanels, TabPanel } from "@chakra-ui/react";
import Blogs from "./index-CYRe_FvX.js";
import ColumnTable from "./index-DivdcM7u.js";
import ColumnTable$1 from "./index-B2Bv_HsS.js";
import { D as Dashboard } from "./index-BOOBh0R-.js";
import "react-icons/md";
import "@tanstack/react-table";
import "react-query";
import "./Card-M0XrdzyB.js";
import "./BlogForm-CmIAKaOl.js";
import "./use-request-DWBiJfY6.js";
import "../ssr.js";
import "react-dom/server";
import "@inertiajs/inertia-react";
import "@inertiajs/react/server";
import "@chakra-ui/theme-tools";
import "axios";
import "./CustomMultiSelect-CrKxktuE.js";
import "chakra-react-select";
import "./CustomInput-D8rT110g.js";
/* empty css                   */
import "./statics-GI0iJz3l.js";
import "./CategoryModal-DK7ZwDGD.js";
import "./TagModal--KMnlXqx.js";
import "prop-types";
import "@inertiajs/react";
import "./SearchBar-Dsk0VtlP.js";
import "@chakra-ui/icons";
import "react-custom-scrollbars-2";
import "react-icons/io5";
import "react-icons/io";
import "react-icons/fa";
import "@inertiajs/inertia";
function Blog() {
  return /* @__PURE__ */ jsx(Dashboard, { children: /* @__PURE__ */ jsx(Box, { pt: { base: "130px", md: "80px", xl: "80px" }, children: /* @__PURE__ */ jsxs(Tabs, { children: [
    /* @__PURE__ */ jsxs(TabList, { children: [
      /* @__PURE__ */ jsx(Tab, { children: "Blogs" }),
      /* @__PURE__ */ jsx(Tab, { children: "Categories" }),
      /* @__PURE__ */ jsx(Tab, { children: "Tags" })
    ] }),
    /* @__PURE__ */ jsxs(TabPanels, { children: [
      /* @__PURE__ */ jsx(TabPanel, { children: /* @__PURE__ */ jsx(Blogs, {}) }),
      /* @__PURE__ */ jsx(TabPanel, { children: /* @__PURE__ */ jsx(ColumnTable, {}) }),
      /* @__PURE__ */ jsx(TabPanel, { children: /* @__PURE__ */ jsx(ColumnTable$1, {}) })
    ] })
  ] }) }) });
}
export {
  Blog as default
};
