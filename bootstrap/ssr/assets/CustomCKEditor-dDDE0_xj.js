import { jsx } from "react/jsx-runtime";
import { Box } from "@chakra-ui/react";
/* empty css                   */
const CustomCKEditor = ({ content }) => {
  return /* @__PURE__ */ jsx(Box, { className: "no-border-editor ck-content", dangerouslySetInnerHTML: { __html: content } });
};
export {
  CustomCKEditor as default
};
