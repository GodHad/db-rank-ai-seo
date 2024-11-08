import { jsxs, jsx } from "react/jsx-runtime";
import "react";
import { useColorModeValue, Box, Breadcrumb, BreadcrumbItem, Text } from "@chakra-ui/react";
import { C as Card } from "./Card-M0XrdzyB.js";
import { Link } from "@inertiajs/react";
import { U as UserLayout } from "./index-D7V5_Wy3.js";
import SeoHeader from "./SeoHeader-DxzDf-f4.js";
import CustomCKEditor from "./CustomCKEditor-dDDE0_xj.js";
import "react-icons/fa";
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
import "@chakra-ui/skeleton";
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
function Aboutus({ content }) {
  const textColor = useColorModeValue("secondaryGray.900", "white");
  let secondaryText = useColorModeValue("gray.700", "white");
  return /* @__PURE__ */ jsxs(UserLayout, { children: [
    /* @__PURE__ */ jsx(SeoHeader, { content, title: "About Us" }),
    /* @__PURE__ */ jsx(
      Card,
      {
        w: "100%",
        px: "0px",
        minH: "calc(100vh - 150px)",
        children: /* @__PURE__ */ jsxs(Box, { width: "100%", px: "25px", children: [
          /* @__PURE__ */ jsxs(Breadcrumb, { children: [
            /* @__PURE__ */ jsx(BreadcrumbItem, { color: secondaryText, fontSize: "sm", mb: "5px", children: /* @__PURE__ */ jsx(Link, { href: "/", children: "Home" }) }),
            /* @__PURE__ */ jsx(BreadcrumbItem, { color: secondaryText, fontSize: "sm", mb: "5px", children: /* @__PURE__ */ jsx(Link, { href: "/aboutus", children: "About us" }) })
          ] }),
          /* @__PURE__ */ jsx(
            Text,
            {
              as: "h1",
              color: textColor,
              fontSize: "22px",
              mb: "30px",
              fontWeight: "700",
              lineHeight: "100%",
              children: "About us"
            }
          ),
          /* @__PURE__ */ jsx(CustomCKEditor, { content: content.content })
        ] })
      }
    )
  ] });
}
export {
  Aboutus as default
};
