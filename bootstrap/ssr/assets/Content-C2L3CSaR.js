import { jsxs, Fragment, jsx } from "react/jsx-runtime";
import { useColorModeValue, Box, Text, CheckboxGroup, VStack, Checkbox } from "@chakra-ui/react";
import { Select } from "chakra-react-select";
function SidebarContent(props) {
  const { categories, showingCategories, setShowingCategories, tags, showingTags, setShowingTags } = props;
  const textColor = useColorModeValue("secondaryGray.900", "white");
  const handleCategoryChange = (values) => {
    setShowingCategories(values.map(Number));
  };
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsxs(Box, { mb: "20px", children: [
      /* @__PURE__ */ jsx(
        Text,
        {
          color: textColor,
          fontSize: "18px",
          mb: "20px",
          fontWeight: "600",
          lineHeight: "100%",
          children: "Categories"
        }
      ),
      /* @__PURE__ */ jsx(CheckboxGroup, { value: showingCategories, onChange: handleCategoryChange, children: /* @__PURE__ */ jsx(VStack, { align: "start", children: categories.map((category) => /* @__PURE__ */ jsx(Checkbox, { value: category.id, children: category.name }, category.id)) }) })
    ] }),
    /* @__PURE__ */ jsxs(Box, { w: "90%", minH: "500px", children: [
      /* @__PURE__ */ jsx(
        Text,
        {
          color: textColor,
          fontSize: "18px",
          mb: "20px",
          fontWeight: "600",
          lineHeight: "100%",
          children: "Tags"
        }
      ),
      /* @__PURE__ */ jsx(
        Select,
        {
          isMulti: true,
          isSearchable: true,
          placeholder: "Select categories",
          variant: "auth",
          fontSize: "sm",
          defaultValue: showingTags,
          ms: { base: "0px", md: "0px" },
          type: "text",
          fontWeight: "500",
          size: "lg",
          options: tags,
          onChange: setShowingTags
        }
      )
    ] })
  ] });
}
export {
  SidebarContent as default
};
