import { jsx, jsxs } from "react/jsx-runtime";
import { Box, Tabs, TabList, Tab, TabPanels, TabPanel } from "@chakra-ui/react";
import ColumnTable from "./index-CKosJwo5.js";
import { V as Vendor } from "./DBMSForm-DPscc44w.js";
import { D as Dashboard } from "./index-BOOBh0R-.js";
import "react-icons/md";
import "react";
import "@tanstack/react-table";
import "./Card-M0XrdzyB.js";
import "./CategoryModal-CI2Gehv1.js";
import "axios";
import "../ssr.js";
import "react-dom/server";
import "@inertiajs/inertia-react";
import "@inertiajs/react/server";
import "@chakra-ui/theme-tools";
import "react-query";
import "./use-request-Cf_Kil6_.js";
import "./CustomMultiSelect-CrKxktuE.js";
import "chakra-react-select";
import "./CustomInput-D8rT110g.js";
import "./statics-GI0iJz3l.js";
import "moment";
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
      /* @__PURE__ */ jsx(Tab, { children: "DBMS" }),
      /* @__PURE__ */ jsx(Tab, { children: "Categories" })
    ] }),
    /* @__PURE__ */ jsxs(TabPanels, { children: [
      /* @__PURE__ */ jsx(TabPanel, { children: /* @__PURE__ */ jsx(Vendor, {}) }),
      /* @__PURE__ */ jsx(TabPanel, { children: /* @__PURE__ */ jsx(ColumnTable, {}) })
    ] })
  ] }) }) });
}
export {
  Blog as default
};
