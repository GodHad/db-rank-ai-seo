import { jsxs, jsx } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import { FormControl, FormLabel, Text } from "@chakra-ui/react";
import { Select } from "chakra-react-select";
const CustomMultiSelect = ({ title, name, value, handleChangeMultiSelect, textColor, brandStars, options }) => {
  const handleChange = (selected) => {
    handleChangeMultiSelect(name, selected.map((category) => category.id));
    setSelectedOptions(selected);
  };
  const [selectedOptions, setSelectedOptions] = useState([]);
  useEffect(() => {
    const selected = value.map((id) => options.find((option) => option.id == id)).filter((option) => option);
    setSelectedOptions(selected);
  }, [value, options]);
  return /* @__PURE__ */ jsxs(FormControl, { mb: "24px", children: [
    /* @__PURE__ */ jsxs(
      FormLabel,
      {
        display: "flex",
        ms: "4px",
        fontSize: "sm",
        fontWeight: "500",
        color: textColor,
        mb: "8px",
        children: [
          title,
          /* @__PURE__ */ jsx(Text, { color: brandStars, children: "*" })
        ]
      }
    ),
    /* @__PURE__ */ jsx(
      Select,
      {
        isMulti: true,
        isSearchable: true,
        value: selectedOptions,
        placeholder: "Select categories",
        variant: "auth",
        fontSize: "sm",
        ms: { base: "0px", md: "0px" },
        type: "text",
        fontWeight: "500",
        size: "lg",
        options,
        onChange: handleChange
      }
    )
  ] });
};
export {
  CustomMultiSelect as C
};
