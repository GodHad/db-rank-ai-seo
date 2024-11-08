import { jsxs, jsx, Fragment } from "react/jsx-runtime";
import { useColorModeValue, Box, Breadcrumb, BreadcrumbItem, Text, Stack } from "@chakra-ui/react";
import { Link } from "@inertiajs/react";
import { Skeleton, SkeletonText } from "@chakra-ui/skeleton";
import { C as Card } from "./Card-M0XrdzyB.js";
import { U as UserLayout } from "./index-D7V5_Wy3.js";
import SeoHeader from "./SeoHeader-DxzDf-f4.js";
import CustomCKEditor from "./CustomCKEditor-dDDE0_xj.js";
import "react-icons/fa";
import "react";
import "./SearchBar-Dsk0VtlP.js";
import "@chakra-ui/icons";
import "react-query";
import "../ssr.js";
import "react-dom/server";
import "@inertiajs/inertia-react";
import "@inertiajs/react/server";
import "@chakra-ui/theme-tools";
import "axios";
import "./statics-GI0iJz3l.js";
import "react-custom-scrollbars-2";
import "prop-types";
import "react-icons/md";
import "react-icons/io";
import "@inertiajs/inertia";
import "./use-request-CXEg0apC.js";
import "react-slick";
import "react-lazyload";
import "react-helmet";
/* empty css                   */
function EncyclopediaForm({ encyclopedia }) {
  let secondaryText = useColorModeValue("gray.700", "white");
  return /* @__PURE__ */ jsxs(UserLayout, { children: [
    /* @__PURE__ */ jsx(SeoHeader, { content: encyclopedia, title: `Encyclopedia | ${encyclopedia.title}` }),
    /* @__PURE__ */ jsx(
      Card,
      {
        w: "100%",
        px: "0px",
        minH: "calc(100vh - 150px)",
        children: /* @__PURE__ */ jsxs(Box, { width: "100%", px: "25px", children: [
          /* @__PURE__ */ jsxs(Breadcrumb, { children: [
            /* @__PURE__ */ jsx(BreadcrumbItem, { color: secondaryText, fontSize: "sm", mb: "5px", children: /* @__PURE__ */ jsx(Link, { href: "/", children: "Home" }) }),
            /* @__PURE__ */ jsx(BreadcrumbItem, { color: secondaryText, fontSize: "sm", mb: "5px", children: /* @__PURE__ */ jsx(Link, { href: "/encyclopedia", children: "Encyclopedia" }) }),
            encyclopedia && /* @__PURE__ */ jsx(BreadcrumbItem, { color: secondaryText, fontSize: "sm", mb: "5px", children: /* @__PURE__ */ jsx(Text, { children: encyclopedia.title }) })
          ] }),
          encyclopedia ? /* @__PURE__ */ jsxs(Fragment, { children: [
            /* @__PURE__ */ jsx(Text, { mb: "32px", fontSize: 22, fontWeight: 600, children: encyclopedia.title }),
            /* @__PURE__ */ jsx(CustomCKEditor, { content: encyclopedia.content })
          ] }) : /* @__PURE__ */ jsxs(Stack, { spacing: 5, gap: 5, children: [
            /* @__PURE__ */ jsx(Skeleton, { height: "30px", width: "full", borderRadius: "30px" }),
            /* @__PURE__ */ jsx(SkeletonText, { height: "30px", width: "full" }),
            /* @__PURE__ */ jsx(SkeletonText, { height: "30px", width: "full" }),
            /* @__PURE__ */ jsx(SkeletonText, { height: "30px", width: "full" }),
            /* @__PURE__ */ jsx(SkeletonText, { height: "30px", width: "full" }),
            /* @__PURE__ */ jsx(SkeletonText, { height: "30px", width: "full" }),
            /* @__PURE__ */ jsx(SkeletonText, { height: "30px", width: "full" }),
            /* @__PURE__ */ jsx(SkeletonText, { height: "30px", width: "full" })
          ] })
        ] })
      }
    )
  ] });
}
export {
  EncyclopediaForm as default
};
