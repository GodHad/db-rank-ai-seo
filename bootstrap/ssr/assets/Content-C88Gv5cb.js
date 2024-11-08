import { jsx } from "react/jsx-runtime";
import { Flex, Stack, Box } from "@chakra-ui/react";
import { SidebarLinks } from "./Links-DfSt9t9W.js";
import "react";
import "@chakra-ui/skeleton";
function SidebarContent(props) {
  const { categories, showingCategory, setShowingCategory } = props;
  return /* @__PURE__ */ jsx(Flex, { direction: "column", height: "100%", pt: "25px", px: "16px", borderRadius: "30px", children: /* @__PURE__ */ jsx(Stack, { direction: "column", mb: "auto", mt: "8px", children: /* @__PURE__ */ jsx(Box, { ps: "20px", pe: { md: "16px", "2xl": "1px" }, children: /* @__PURE__ */ jsx(SidebarLinks, { categories, showingCategory, setShowingCategory }) }) }) });
}
export {
  SidebarContent as default
};
