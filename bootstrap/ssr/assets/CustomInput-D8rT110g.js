import { jsxs, jsx } from "react/jsx-runtime";
import { Box, FormLabel, Text, Input } from "@chakra-ui/react";
const CustomInput = ({ type = "text", title, name, value, handleChangeForm, textColor, brandStars }) => {
  return /* @__PURE__ */ jsxs(Box, { w: "full", children: [
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
      Input,
      {
        isRequired: true,
        variant: "auth",
        fontSize: "sm",
        ms: { base: "0px", md: "0px" },
        type,
        placeholder: "",
        mb: "24px",
        fontWeight: "500",
        size: "lg",
        borderColor: "gray",
        name,
        value,
        onChange: handleChangeForm
      }
    )
  ] });
};
export {
  CustomInput as C
};
