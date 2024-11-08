import { jsxs, jsx } from "react/jsx-runtime";
import { U as UserLayout } from "./index-D7V5_Wy3.js";
import { Box, Heading, Text, Button } from "@chakra-ui/react";
import { Link } from "@inertiajs/react";
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
import "@chakra-ui/skeleton";
import "./Card-M0XrdzyB.js";
import "react-custom-scrollbars-2";
import "prop-types";
import "react-icons/md";
import "react-icons/io";
import "@inertiajs/inertia";
import "./use-request-CXEg0apC.js";
import "react-slick";
import "react-lazyload";
function NotFound() {
  return /* @__PURE__ */ jsxs(Box, { textAlign: "center", py: 10, px: 6, children: [
    /* @__PURE__ */ jsx(
      Heading,
      {
        display: "inline-block",
        as: "h2",
        size: "2xl",
        bgGradient: "linear(to-r, green.400, blue.800)",
        backgroundClip: "text",
        children: "404"
      }
    ),
    /* @__PURE__ */ jsx(Text, { fontSize: "18px", mt: 3, mb: 2, children: "Page Not Found" }),
    /* @__PURE__ */ jsx(Text, { color: "gray.500", mb: 6, children: "The page you're looking for does not seem to exist" }),
    /* @__PURE__ */ jsx(Link, { href: "/", children: /* @__PURE__ */ jsx(
      Button,
      {
        colorScheme: "teal",
        bgGradient: "linear(to-r, green.400, blue.800)",
        color: "white",
        variant: "solid",
        children: "Go to Home"
      }
    ) })
  ] });
}
const index = () => /* @__PURE__ */ jsx(UserLayout, { children: /* @__PURE__ */ jsx(NotFound, {}) });
export {
  index as default
};
