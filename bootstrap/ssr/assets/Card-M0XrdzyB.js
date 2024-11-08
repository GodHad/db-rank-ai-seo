import { jsx } from "react/jsx-runtime";
import { useStyleConfig, Box } from "@chakra-ui/react";
function Card(props) {
  const { variant, children, ...rest } = props;
  const styles = useStyleConfig("Card", { variant });
  return /* @__PURE__ */ jsx(Box, { __css: styles, ...rest, children });
}
export {
  Card as C
};
