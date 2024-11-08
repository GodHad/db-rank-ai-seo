import { jsxs, jsx } from "react/jsx-runtime";
import "react";
import { useColorModeValue, Stack, Text } from "@chakra-ui/react";
import { Skeleton } from "@chakra-ui/skeleton";
function SidebarLinks(props) {
  let activeColor = useColorModeValue("gray.700", "white");
  let textColor = useColorModeValue("secondaryGray.500", "gray.400");
  const { categories, showingCategory, setShowingCategory } = props;
  const createLinks = (categories2) => {
    return categories2.map((category, index) => /* @__PURE__ */ jsx(
      Text,
      {
        fontSize: "md",
        color: index === showingCategory ? activeColor : textColor,
        fontWeight: "bold",
        mx: "auto",
        pt: "10px",
        pb: "10px",
        _hover: {
          color: activeColor
        },
        cursor: "pointer",
        onClick: () => setShowingCategory(index),
        children: category.label
      },
      index
    ));
  };
  if (categories) return createLinks(categories);
  return /* @__PURE__ */ jsxs(Stack, { gap: "3", children: [
    /* @__PURE__ */ jsx(Skeleton, { height: "30px", borderRadius: "12px" }),
    /* @__PURE__ */ jsx(Skeleton, { height: "30px", borderRadius: "12px" }),
    /* @__PURE__ */ jsx(Skeleton, { height: "30px", borderRadius: "12px" }),
    /* @__PURE__ */ jsx(Skeleton, { height: "30px", borderRadius: "12px" }),
    /* @__PURE__ */ jsx(Skeleton, { height: "30px", borderRadius: "12px" })
  ] });
}
export {
  SidebarLinks,
  SidebarLinks as default
};
