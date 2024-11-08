import { jsxs, jsx, Fragment } from "react/jsx-runtime";
import { useColorModeValue, useBreakpointValue, Breadcrumb, BreadcrumbItem, Flex, Text, SimpleGrid, Stack, Box } from "@chakra-ui/react";
import { useContext, useState, useEffect } from "react";
import { Skeleton } from "@chakra-ui/skeleton";
import { C as Card } from "./Card-M0XrdzyB.js";
import { useQuery } from "react-query";
import { Link } from "@inertiajs/react";
import { g as getVendors } from "./use-request-Cf_Kil6_.js";
import { D as DBMSContext } from "../ssr.js";
import { g as generateSlug } from "./statics-GI0iJz3l.js";
import { U as UserLayout } from "./index-D7V5_Wy3.js";
import SeoHeader from "./SeoHeader-DxzDf-f4.js";
import CustomCKEditor from "./CustomCKEditor-dDDE0_xj.js";
import axios from "axios";
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
const chunkIntoColumns = (data, columnCount) => {
  const rowsPerColumn = Math.ceil(data.length / columnCount);
  const columns = Array.from({ length: columnCount }, () => []);
  data.forEach((item, index) => {
    const columnIndex = Math.floor(index / rowsPerColumn);
    columns[columnIndex].push(item);
  });
  return columns;
};
function Vendor({ content }) {
  const { vendors: data, setVendors: setData } = useContext(DBMSContext);
  const textColor = useColorModeValue("secondaryGray.900", "white");
  let secondaryText = useColorModeValue("gray.700", "white");
  const { data: vendors, isLoading } = useQuery(
    "user_vendors",
    () => getVendors(" "),
    {
      staleTime: 3e5,
      onSuccess: (data2) => {
        setData(data2);
      }
    }
  );
  const columnCount = useBreakpointValue({
    base: 4,
    xs: 1,
    sm: 2,
    md: 3,
    lg: 4,
    xl: 5
  });
  const [columns, setColumns] = useState(null);
  useEffect(() => {
    if (data) setColumns(chunkIntoColumns(data, columnCount));
  }, [data, columnCount]);
  const handleIncreaseViews = async (id) => {
    await axios.get(`/api/increase-views?id=${id}`);
  };
  return /* @__PURE__ */ jsxs(UserLayout, { children: [
    /* @__PURE__ */ jsx(SeoHeader, { content, title: "DBMS" }),
    /* @__PURE__ */ jsxs(
      Card,
      {
        flexDirection: "column",
        w: "100%",
        px: "0px",
        minH: "calc(100vh - 150px)",
        overflowX: { sm: "auto", lg: "hidden" },
        children: [
          /* @__PURE__ */ jsxs(Breadcrumb, { px: "25px", children: [
            /* @__PURE__ */ jsx(BreadcrumbItem, { color: secondaryText, fontSize: "sm", mb: "5px", children: /* @__PURE__ */ jsx(Link, { href: "/", children: "Home" }) }),
            /* @__PURE__ */ jsx(BreadcrumbItem, { color: secondaryText, fontSize: "sm", mb: "5px", children: /* @__PURE__ */ jsx(Link, { href: "/dbms", children: "DBMS" }) })
          ] }),
          /* @__PURE__ */ jsxs(Flex, { px: "25px", mb: "8px", gap: 4, flexDir: { base: "column" }, justifyContent: "space-between", align: { base: "inherit" }, children: [
            /* @__PURE__ */ jsx(
              Text,
              {
                color: textColor,
                fontSize: { md: "22px", base: "20px" },
                mb: "4px",
                fontWeight: "700",
                lineHeight: "100%",
                children: "DBMS"
              }
            ),
            /* @__PURE__ */ jsx(CustomCKEditor, { content: content.content }),
            /* @__PURE__ */ jsx(SimpleGrid, { columns: columnCount, spacing: 4, gap: 4, children: isLoading || !columns ? /* @__PURE__ */ jsxs(Fragment, { children: [
              /* @__PURE__ */ jsxs(Stack, { gap: "1", children: [
                /* @__PURE__ */ jsx(Skeleton, { height: "20px", borderRadius: "12px" }),
                /* @__PURE__ */ jsx(Skeleton, { height: "20px", borderRadius: "12px" }),
                /* @__PURE__ */ jsx(Skeleton, { height: "20px", borderRadius: "12px" }),
                /* @__PURE__ */ jsx(Skeleton, { height: "20px", borderRadius: "12px" })
              ] }),
              /* @__PURE__ */ jsxs(Stack, { gap: "1", children: [
                /* @__PURE__ */ jsx(Skeleton, { height: "20px", borderRadius: "12px" }),
                /* @__PURE__ */ jsx(Skeleton, { height: "20px", borderRadius: "12px" }),
                /* @__PURE__ */ jsx(Skeleton, { height: "20px", borderRadius: "12px" }),
                /* @__PURE__ */ jsx(Skeleton, { height: "20px", borderRadius: "12px" })
              ] }),
              /* @__PURE__ */ jsxs(Stack, { gap: "1", children: [
                /* @__PURE__ */ jsx(Skeleton, { height: "20px", borderRadius: "12px" }),
                /* @__PURE__ */ jsx(Skeleton, { height: "20px", borderRadius: "12px" }),
                /* @__PURE__ */ jsx(Skeleton, { height: "20px", borderRadius: "12px" }),
                /* @__PURE__ */ jsx(Skeleton, { height: "20px", borderRadius: "12px" })
              ] }),
              /* @__PURE__ */ jsxs(Stack, { gap: "1", children: [
                /* @__PURE__ */ jsx(Skeleton, { height: "20px", borderRadius: "12px" }),
                /* @__PURE__ */ jsx(Skeleton, { height: "20px", borderRadius: "12px" }),
                /* @__PURE__ */ jsx(Skeleton, { height: "20px", borderRadius: "12px" }),
                /* @__PURE__ */ jsx(Skeleton, { height: "20px", borderRadius: "12px" })
              ] })
            ] }) : columns.map((items, index) => /* @__PURE__ */ jsx(Box, { mb: 4, children: items.map((item) => /* @__PURE__ */ jsx(Link, { href: `/dbms/${generateSlug(item.db_name)}`, onClick: () => handleIncreaseViews(item.id), children: /* @__PURE__ */ jsx(Text, { color: "blue.500", cursor: "pointer", mb: "15px", _hover: { textDecor: "underline" }, children: item.db_name }) }, item.db_name)) }, index)) })
          ] })
        ]
      }
    )
  ] });
}
export {
  Vendor as default
};
