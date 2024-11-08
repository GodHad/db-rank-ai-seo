import { jsxs, jsx } from "react/jsx-runtime";
import "react";
import { useColorModeValue, Flex, Box, Breadcrumb, BreadcrumbItem, BreadcrumbLink } from "@chakra-ui/react";
import { C as Card } from "./Card-M0XrdzyB.js";
import { Link } from "@inertiajs/react";
import { Helmet } from "react-helmet";
import { initialBlog } from "./index-CYRe_FvX.js";
import BlogForm from "./BlogForm-CmIAKaOl.js";
import { U as UserLayout } from "./index-D7V5_Wy3.js";
import "react-icons/md";
import "@tanstack/react-table";
import "react-query";
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
import "react-icons/fa";
import "./SearchBar-Dsk0VtlP.js";
import "@chakra-ui/icons";
import "@chakra-ui/skeleton";
import "react-custom-scrollbars-2";
import "prop-types";
import "react-icons/io";
import "@inertiajs/inertia";
import "./use-request-CXEg0apC.js";
import "react-slick";
import "react-lazyload";
const index = () => {
  let secondaryText = useColorModeValue("gray.700", "white");
  return /* @__PURE__ */ jsxs(UserLayout, { children: [
    /* @__PURE__ */ jsx(Helmet, { children: /* @__PURE__ */ jsx("title", { children: "DBMS Rank AI | Create Blog" }) }),
    /* @__PURE__ */ jsx(
      Card,
      {
        w: "100%",
        px: "0px",
        minH: "calc(100vh - 150px)",
        children: /* @__PURE__ */ jsx(Flex, { justifyContent: "flex-end", children: /* @__PURE__ */ jsxs(Box, { width: { base: "100%" }, px: "25px", children: [
          /* @__PURE__ */ jsxs(Breadcrumb, { children: [
            /* @__PURE__ */ jsx(BreadcrumbItem, { color: secondaryText, fontSize: "sm", mb: "5px", children: /* @__PURE__ */ jsx(Link, { href: "/", children: "Home" }) }),
            /* @__PURE__ */ jsx(BreadcrumbItem, { color: secondaryText, fontSize: "sm", mb: "5px", children: /* @__PURE__ */ jsx(Link, { href: "/blog", children: "Blog" }) }),
            /* @__PURE__ */ jsx(BreadcrumbItem, { color: secondaryText, fontSize: "sm", mb: "5px", children: /* @__PURE__ */ jsx(BreadcrumbLink, { children: "Blog" }) })
          ] }),
          /* @__PURE__ */ jsx(BlogForm, { blog: initialBlog, setOpenedPage: () => {
            if (typeof window !== "undefined") {
              window.location.href = "/blog";
            }
          } })
        ] }) })
      }
    )
  ] });
};
export {
  index as default
};
