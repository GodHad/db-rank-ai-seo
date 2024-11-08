import { jsxs, jsx, Fragment } from "react/jsx-runtime";
import { useContext, useState, useEffect } from "react";
import { useColorModeValue, useBreakpointValue, Box, Breadcrumb, BreadcrumbItem, Text, SimpleGrid, Heading, Stack } from "@chakra-ui/react";
import { C as Card } from "./Card-M0XrdzyB.js";
import { g as getEncyclopedias } from "./use-request-DzdpIW3X.js";
import { useQuery } from "react-query";
import { Link } from "@inertiajs/react";
import { SkeletonCircle, Skeleton } from "@chakra-ui/skeleton";
import { g as generateSlug } from "./statics-GI0iJz3l.js";
import { D as DBMSContext } from "../ssr.js";
import { U as UserLayout } from "./index-D7V5_Wy3.js";
import SeoHeader from "./SeoHeader-DxzDf-f4.js";
import CustomCKEditor from "./CustomCKEditor-dDDE0_xj.js";
import "axios";
import "react-dom/server";
import "@inertiajs/inertia-react";
import "@inertiajs/react/server";
import "@chakra-ui/theme-tools";
import "react-icons/fa";
import "./SearchBar-Dsk0VtlP.js";
import "@chakra-ui/icons";
import "react-custom-scrollbars-2";
import "prop-types";
import "react-icons/md";
import "react-icons/io";
import "@inertiajs/inertia";
import "./use-request-CXEg0apC.js";
import "react-slick";
import "react-lazyload";
import "react-helmet";
/* empty css                   */
const groupByFirstLetter = (data) => {
  const groupedData = {};
  data.forEach((item) => {
    const firstLetter = item.title[0].toUpperCase();
    if (!groupedData[firstLetter]) {
      groupedData[firstLetter] = [];
    }
    groupedData[firstLetter].push(item);
  });
  return groupedData;
};
const sortAlphabetically = (groupedData) => {
  return Object.keys(groupedData).sort().map((letter) => ({
    letter,
    items: groupedData[letter]
  }));
};
const chunkIntoColumns = (data, columnCount) => {
  const rowsPerColumn = Math.ceil(data.length / columnCount);
  const columns = Array.from({ length: columnCount }, () => []);
  data.forEach((item, index) => {
    const columnIndex = Math.floor(index / rowsPerColumn);
    columns[columnIndex].push(item);
  });
  return columns;
};
const EncyclopediaPage = ({ content }) => {
  const { encyclopedias: data, setEncyclopedias: setData } = useContext(DBMSContext);
  const textColor = useColorModeValue("secondaryGray.900", "white");
  let secondaryText = useColorModeValue("gray.700", "white");
  const columnCount = useBreakpointValue({
    base: 4,
    xs: 1,
    sm: 2,
    md: 3,
    lg: 4,
    xl: 5
  });
  const { data: encyclopedias = [], isLoading } = useQuery(
    "encyclopedias",
    getEncyclopedias,
    {
      staleTime: 3e5,
      enabled: data.length === 0,
      onSuccess: (data2) => {
        if (data2.length !== setData.length)
          setData(data2);
      }
    }
  );
  const [columns, setColumns] = useState(null);
  useEffect(() => {
    if (encyclopedias.length > 0) {
      const groupedData = groupByFirstLetter(encyclopedias);
      const sortedData = sortAlphabetically(groupedData);
      setColumns(chunkIntoColumns(sortedData, columnCount));
    }
  }, [encyclopedias, columnCount]);
  return /* @__PURE__ */ jsxs(UserLayout, { children: [
    /* @__PURE__ */ jsx(SeoHeader, { content, title: "Encyclopedia" }),
    /* @__PURE__ */ jsx(
      Card,
      {
        w: "100%",
        px: "0px",
        minH: "calc(100vh - 150px)",
        children: /* @__PURE__ */ jsxs(Box, { width: "100%", px: "25px", children: [
          /* @__PURE__ */ jsxs(Breadcrumb, { children: [
            /* @__PURE__ */ jsx(BreadcrumbItem, { color: secondaryText, fontSize: "sm", mb: "5px", children: /* @__PURE__ */ jsx(Link, { href: "/", children: "Home" }) }),
            /* @__PURE__ */ jsx(BreadcrumbItem, { color: secondaryText, fontSize: "sm", mb: "5px", children: /* @__PURE__ */ jsx(Link, { href: "/encyclopedia", children: "Encyclopedia" }) })
          ] }),
          /* @__PURE__ */ jsx(
            Text,
            {
              color: textColor,
              fontSize: "22px",
              mb: "30px",
              fontWeight: "700",
              lineHeight: "100%",
              children: "Encyclopedia"
            }
          ),
          /* @__PURE__ */ jsx(CustomCKEditor, { content: content.content }),
          /* @__PURE__ */ jsx(SimpleGrid, { columns: columnCount, spacing: 4, children: columns ? columns.map((column, index) => /* @__PURE__ */ jsx(Box, { children: column.map(({ letter, items }) => /* @__PURE__ */ jsxs(Box, { mb: 4, children: [
            /* @__PURE__ */ jsx(Heading, { size: "md", mb: "18px", children: letter }),
            items.map((item) => /* @__PURE__ */ jsx(Link, { href: `/encyclopedia/${generateSlug(item.title)}`, children: /* @__PURE__ */ jsx(Text, { color: "blue.500", cursor: "pointer", mb: "5px", _hover: { textDecor: "underline" }, children: item.title }) }, item.title))
          ] }, letter)) }, index)) : /* @__PURE__ */ jsxs(Fragment, { children: [
            /* @__PURE__ */ jsxs(Stack, { gap: "1", children: [
              /* @__PURE__ */ jsx(SkeletonCircle, { size: 10 }),
              /* @__PURE__ */ jsx(Skeleton, { height: "20px", borderRadius: "12px" }),
              /* @__PURE__ */ jsx(Skeleton, { height: "20px", borderRadius: "12px" })
            ] }),
            /* @__PURE__ */ jsxs(Stack, { gap: "1", children: [
              /* @__PURE__ */ jsx(SkeletonCircle, { size: 10 }),
              /* @__PURE__ */ jsx(Skeleton, { height: "20px", borderRadius: "12px" }),
              /* @__PURE__ */ jsx(Skeleton, { height: "20px", borderRadius: "12px" })
            ] }),
            /* @__PURE__ */ jsxs(Stack, { gap: "1", children: [
              /* @__PURE__ */ jsx(SkeletonCircle, { size: 10 }),
              /* @__PURE__ */ jsx(Skeleton, { height: "20px", borderRadius: "12px" }),
              /* @__PURE__ */ jsx(Skeleton, { height: "20px", borderRadius: "12px" })
            ] }),
            /* @__PURE__ */ jsxs(Stack, { gap: "1", children: [
              /* @__PURE__ */ jsx(SkeletonCircle, { size: 10 }),
              /* @__PURE__ */ jsx(Skeleton, { height: "20px", borderRadius: "12px" }),
              /* @__PURE__ */ jsx(Skeleton, { height: "20px", borderRadius: "12px" })
            ] })
          ] }) })
        ] })
      }
    )
  ] });
};
export {
  EncyclopediaPage as default
};
