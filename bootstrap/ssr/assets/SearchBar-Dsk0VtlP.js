import { jsx, jsxs } from "react/jsx-runtime";
import { Box, useColorModeValue, VStack, InputGroup, InputLeftElement, IconButton, Input, Text, Spinner } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { SearchIcon } from "@chakra-ui/icons";
import { useMutation } from "react-query";
import "../ssr.js";
import { g as generateSlug } from "./statics-GI0iJz3l.js";
import { Link } from "@inertiajs/react";
import axios from "axios";
const logo = "/build/assets/logo-AIyaFRz0.png";
const logo_black_text = "/build/assets/logo_black_letter-DufqLMNR.png";
const renderTrack = ({ style, ...props }) => {
  const trackStyle = {
    position: "absolute",
    maxWidth: "100%",
    width: 6,
    transition: "opacity 200ms ease 0s",
    opacity: 0,
    background: "transparent",
    bottom: 2,
    top: 2,
    borderRadius: 3,
    right: 0
  };
  return /* @__PURE__ */ jsx("div", { style: { ...style, ...trackStyle }, ...props });
};
const renderThumb = ({ style, ...props }) => {
  const thumbStyle = {
    borderRadius: 15,
    background: "rgba(222, 222, 222, .1)"
  };
  return /* @__PURE__ */ jsx("div", { style: { ...style, ...thumbStyle }, ...props });
};
const renderView = ({ style, ...props }) => {
  const viewStyle = {
    marginBottom: -22
  };
  return /* @__PURE__ */ jsx(
    Box,
    {
      me: { base: "0px !important", lg: "-16px !important" },
      style: { ...style, ...viewStyle },
      ...props
    }
  );
};
function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);
  return debouncedValue;
}
const searchDBMSAndBlogEncyclopedia = async (searchTerm) => {
  const res = await axios.post("/api/search", { searchTerm });
  return res.data;
};
function SearchBar(props) {
  const { variant, background, children, placeholder, borderRadius, ...rest } = props;
  const [loading, setLoading] = useState(false);
  const searchIconColor = useColorModeValue("gray.700", "white");
  const inputBg = useColorModeValue("secondaryGray.300", "navy.900");
  const inputText = useColorModeValue("gray.700", "gray.100");
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchTerm = useDebounce(searchTerm, 300);
  const [searchResult, setSearchResult] = useState({
    dbms: [],
    blog: []
  });
  const searchMutation = useMutation(searchDBMSAndBlogEncyclopedia, {
    onSuccess: (data) => {
      setSearchResult(data);
      setLoading(false);
    }
  });
  useEffect(() => {
    if (debouncedSearchTerm) {
      setLoading(true);
      searchMutation.mutate(debouncedSearchTerm);
    }
  }, [debouncedSearchTerm]);
  return /* @__PURE__ */ jsxs(VStack, { gap: 2, position: "relative", children: [
    /* @__PURE__ */ jsxs(InputGroup, { w: { base: "100%", md: "200px" }, ...rest, children: [
      /* @__PURE__ */ jsx(
        InputLeftElement,
        {
          children: /* @__PURE__ */ jsx(
            IconButton,
            {
              bg: "inherit",
              borderRadius: "inherit",
              _hover: "none",
              _active: {
                bg: "inherit",
                transform: "none",
                borderColor: "transparent"
              },
              _focus: {
                boxShadow: "none"
              },
              "aria-label": "search icon button",
              icon: /* @__PURE__ */ jsx(SearchIcon, { color: searchIconColor, w: "15px", h: "15px" })
            }
          )
        }
      ),
      /* @__PURE__ */ jsx(
        Input,
        {
          variant: "search",
          fontSize: "sm",
          bg: background ? background : inputBg,
          color: inputText,
          fontWeight: "500",
          _placeholder: { color: "gray.400", fontSize: "14px" },
          borderRadius: borderRadius ? borderRadius : "30px",
          placeholder: placeholder ? placeholder : "Search...",
          onChange: (e) => setSearchTerm(e.target.value)
        }
      )
    ] }),
    searchTerm && (searchResult.blog.length > 0 || searchResult.dbms.length > 0 ? /* @__PURE__ */ jsxs(Box, { width: "300px", borderWidth: "1px", borderRadius: "md", p: 4, position: "absolute", top: 9, zIndex: 10, bg: inputBg, children: [
      searchResult.blog.length > 0 && searchResult.blog.map((result, index) => /* @__PURE__ */ jsx(Link, { href: `/blog/${result.id}/${generateSlug(result.title)}`, onClick: () => setSearchTerm(""), children: /* @__PURE__ */ jsxs(Text, { isTruncated: true, maxWidth: "100%", children: [
        "Blog: ",
        result.title
      ] }) }, `blog-${index}`)),
      searchResult.dbms.length > 0 && searchResult.dbms.map((result, index) => /* @__PURE__ */ jsx(Link, { href: `/dbms/${generateSlug(result.db_name)}`, onClick: () => setSearchTerm(""), children: /* @__PURE__ */ jsxs(Text, { children: [
        "DBMS: ",
        result.db_name
      ] }) }, `dbms-${index}`))
    ] }) : !loading ? /* @__PURE__ */ jsx(Box, { width: "300px", borderWidth: "1px", borderRadius: "md", p: 4, position: "absolute", top: 9, zIndex: 10, bg: inputBg, children: /* @__PURE__ */ jsx(Text, { children: "No results" }) }) : /* @__PURE__ */ jsx(Box, { width: "300px", borderWidth: "1px", borderRadius: "md", p: 4, position: "absolute", top: 9, zIndex: 10, bg: inputBg, children: /* @__PURE__ */ jsx(Spinner, {}) }))
  ] });
}
export {
  SearchBar as S,
  logo as a,
  renderThumb as b,
  renderView as c,
  logo_black_text as l,
  renderTrack as r
};
