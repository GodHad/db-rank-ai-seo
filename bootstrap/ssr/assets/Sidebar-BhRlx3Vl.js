import { jsx, jsxs } from "react/jsx-runtime";
import { useRef } from "react";
import { useColorModeValue, Box, useDisclosure, Flex, Icon, Popover, PopoverContent, PopoverBody } from "@chakra-ui/react";
import SidebarContent from "./Content-C2L3CSaR.js";
import PropTypes from "prop-types";
import { IoMenuOutline } from "react-icons/io5";
import "chakra-react-select";
function Sidebar(props) {
  const { categories, showingCategories, setShowingCategories, tags, showingTags, setShowingTags } = props;
  let variantChange = "0.2s linear";
  let shadow = useColorModeValue(
    "14px 17px 40px 4px rgba(112, 144, 176, 0.08)",
    "unset"
  );
  let sidebarMargins = "0px";
  return /* @__PURE__ */ jsx(Box, { display: { sm: "none", xl: "block" }, w: "100%", position: "absolute", px: "25px", children: /* @__PURE__ */ jsx(
    Box,
    {
      transition: variantChange,
      w: "280px",
      m: sidebarMargins,
      minH: "100%",
      overflowX: "hidden",
      mb: "30px",
      boxShadow: shadow,
      children: /* @__PURE__ */ jsx(SidebarContent, { categories, showingCategories, setShowingCategories, tags, showingTags, setShowingTags })
    }
  ) });
}
function SidebarResponsive(props) {
  let sidebarBackgroundColor = useColorModeValue("white", "navy.800");
  let menuColor = useColorModeValue("gray.400", "white");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef();
  const { categories, showingCategories, setShowingCategories, tags, showingTags, setShowingTags } = props;
  return /* @__PURE__ */ jsxs(Flex, { display: { sm: "flex", xl: "none" }, alignItems: "center", children: [
    /* @__PURE__ */ jsx(Flex, { ref: btnRef, w: "max-content", h: "max-content", onClick: onOpen, children: /* @__PURE__ */ jsx(
      Icon,
      {
        as: IoMenuOutline,
        color: menuColor,
        my: "auto",
        w: "20px",
        h: "20px",
        me: "10px",
        _hover: { cursor: "pointer" }
      }
    ) }),
    /* @__PURE__ */ jsx(
      Popover,
      {
        isOpen,
        onClose,
        children: /* @__PURE__ */ jsx(PopoverContent, { w: "285px", maxW: "285px", bg: sidebarBackgroundColor, top: "100px", children: /* @__PURE__ */ jsx(PopoverBody, { maxW: "285px", px: "0rem", pb: "0", p: "5", children: /* @__PURE__ */ jsx(SidebarContent, { categories, showingCategories, setShowingCategories, tags, showingTags, setShowingTags }) }) })
      }
    )
  ] });
}
Sidebar.propTypes = {
  logoText: PropTypes.string,
  categories: PropTypes.arrayOf(PropTypes.object),
  variant: PropTypes.string
};
export {
  SidebarResponsive,
  Sidebar as default
};
