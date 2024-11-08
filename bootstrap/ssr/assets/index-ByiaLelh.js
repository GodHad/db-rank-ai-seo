import { jsxs, jsx } from "react/jsx-runtime";
import { useColorModeValue, Box, SimpleGrid, Card, Flex, Text } from "@chakra-ui/react";
/* empty css                   */
import Vendor from "./TopDBMSTable-BybeUt4D.js";
import RecentBlogs from "./RecentBlogs-C4I8xETR.js";
import { U as UserLayout } from "./index-D7V5_Wy3.js";
import CustomCKEditor from "./CustomCKEditor-dDDE0_xj.js";
import SeoHeader from "./SeoHeader-DxzDf-f4.js";
import "react";
import "@tanstack/react-table";
import "react-query";
import "./use-request-DSS9fKx4.js";
import "../ssr.js";
import "react-dom/server";
import "@inertiajs/inertia-react";
import "@inertiajs/react/server";
import "@chakra-ui/theme-tools";
import "axios";
import "@chakra-ui/skeleton";
import "./statics-GI0iJz3l.js";
import "@inertiajs/react";
import "moment";
import "@chakra-ui/icons";
import "./Card-M0XrdzyB.js";
import "react-icons/fa";
import "./SearchBar-Dsk0VtlP.js";
import "react-custom-scrollbars-2";
import "prop-types";
import "react-icons/md";
import "react-icons/io";
import "@inertiajs/inertia";
import "./use-request-CXEg0apC.js";
import "react-slick";
import "react-lazyload";
import "react-helmet";
function Home({ content }) {
  const textColor = useColorModeValue("secondaryGray.900", "white");
  return /* @__PURE__ */ jsxs(UserLayout, { children: [
    /* @__PURE__ */ jsx(SeoHeader, { content, title: "Home" }),
    /* @__PURE__ */ jsxs(Box, { children: [
      /* @__PURE__ */ jsxs(SimpleGrid, { columns: { base: 1, lg: 2, xl: 2 }, gap: "20px", mb: "20px", justifyContent: "center", children: [
        /* @__PURE__ */ jsx(
          Card,
          {
            flexDirection: "column",
            bgColor: "transparent",
            w: "100%",
            px: "0px",
            overflow: "hidden",
            shadow: "none",
            children: /* @__PURE__ */ jsxs(Flex, { px: "25px", mb: "8px", flexDirection: "column", justifyContent: "space-between", children: [
              /* @__PURE__ */ jsx(
                Text,
                {
                  color: textColor,
                  fontSize: { md: "40px", "2sm": "32px", base: "24px" },
                  fontWeight: "800",
                  lineHeight: "48px",
                  mb: "10px",
                  bgClip: "text",
                  bgGradient: "linear(to-r, #2ac349, #018cc1)",
                  children: "DB Rank AI"
                }
              ),
              /* @__PURE__ */ jsx(CustomCKEditor, { content: content.content })
            ] })
          }
        ),
        /* @__PURE__ */ jsx(Vendor, {})
      ] }),
      /* @__PURE__ */ jsx(RecentBlogs, {})
    ] })
  ] });
}
export {
  Home as default
};
