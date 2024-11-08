import { jsxs, jsx } from "react/jsx-runtime";
import { useColorModeValue, Flex, Box, Breadcrumb, BreadcrumbItem, Text, Tooltip, IconButton, Icon } from "@chakra-ui/react";
import { useContext, useState, useEffect, useMemo } from "react";
import { Select } from "chakra-react-select";
import countryList from "react-select-country-list";
import { C as Card } from "./Card-M0XrdzyB.js";
import { MdAutoGraph, MdTableView } from "react-icons/md";
import { useQuery } from "react-query";
import { Link } from "@inertiajs/react";
import { g as getVendors, a as getCategories } from "./use-request-Cf_Kil6_.js";
import Sidebar, { SidebarResponsive } from "./Sidebar-BLgUQ7y6.js";
import { D as DBMSContext } from "../ssr.js";
import { U as UserLayout } from "./index-D7V5_Wy3.js";
import RankTable from "./index-OH0jKulo.js";
import RankChart from "./index-CNR3fgOg.js";
import SeoHeader from "./SeoHeader-DxzDf-f4.js";
import CustomCKEditor from "./CustomCKEditor-dDDE0_xj.js";
import "axios";
import "./Content-C88Gv5cb.js";
import "./Links-DfSt9t9W.js";
import "@chakra-ui/skeleton";
import "prop-types";
import "react-icons/io5";
import "react-dom/server";
import "@inertiajs/inertia-react";
import "@inertiajs/react/server";
import "@chakra-ui/theme-tools";
import "react-icons/fa";
import "./SearchBar-Dsk0VtlP.js";
import "@chakra-ui/icons";
import "./statics-GI0iJz3l.js";
import "react-custom-scrollbars-2";
import "react-icons/io";
import "@inertiajs/inertia";
import "./use-request-CXEg0apC.js";
import "react-slick";
import "react-lazyload";
import "@tanstack/react-table";
import "moment";
import "react-helmet";
/* empty css                   */
function Ranking({ content, route }) {
  const { vendors: data, setVendors: setData } = useContext(DBMSContext);
  const textColor = useColorModeValue("secondaryGray.900", "white");
  let secondaryText = useColorModeValue("gray.700", "white");
  const [country, setCountry] = useState({ value: " ", label: "WorldWide" });
  const handleChangeCountry = (value) => {
    setCountry(value);
  };
  const { data: vendors = [] } = useQuery(
    [`vendors`, country],
    () => getVendors(country.value),
    {
      enabled: !!country,
      staleTime: 3e5
    }
  );
  const { data: categories, isLoadingCategory } = useQuery("categories", getCategories, { staleTime: 3e5 });
  useEffect(() => {
    setData(vendors);
  }, [vendors]);
  const bgButton = useColorModeValue("secondaryGray.300", "whiteAlpha.100");
  const bgHover = useColorModeValue(
    { bg: "secondaryGray.400" },
    { bg: "whiteAlpha.50" }
  );
  const bgFocus = useColorModeValue(
    { bg: "secondaryGray.300" },
    { bg: "whiteAlpha.100" }
  );
  const [showingCategory, setShowingCategory] = useState(0);
  useEffect(() => {
    if (showingCategory === 0) setData(vendors);
    else {
      const showingVendors = vendors.filter((vendor) => vendor.primary_category.map((category) => category.id).includes(showingCategory));
      const prevMonthOverallRanking = showingVendors.map((vendor) => vendor.prev_month_overall_ranking).sort();
      const prevYearOverAllRanking = showingVendors.map((vendor) => vendor.prev_year_overall_ranking).sort();
      setData(showingVendors.map((vendor) => ({ ...vendor, prev_month_overall_ranking: prevMonthOverallRanking.indexOf(vendor.prev_month_overall_ranking) + 1, prev_year_overall_ranking: prevYearOverAllRanking.indexOf(vendor.prev_year_overall_ranking) + 1 })));
    }
  }, [showingCategory, setData, vendors]);
  const [options, setOptions] = useState([{ id: 0, value: "all", label: "All DBMS" }]);
  useEffect(() => {
    if (categories) setOptions([{ id: 0, value: "all", label: "All DBMS" }].concat(categories.map((category) => ({ id: category.id, label: category.title, value: category.title }))));
  }, [categories]);
  const countryOptions = useMemo(() => [{ value: " ", label: "WorldWide" }].concat(countryList().getData()), [{ value: " ", label: "WorldWide" }]);
  return /* @__PURE__ */ jsxs(UserLayout, { children: [
    /* @__PURE__ */ jsx(SeoHeader, { content, title: "DBMS Ranking" }),
    /* @__PURE__ */ jsxs(
      Card,
      {
        flexDirection: "column",
        w: "100%",
        px: "0px",
        minH: "calc(100vh - 150px)",
        overflowX: { sm: "auto", lg: "hidden" },
        children: [
          /* @__PURE__ */ jsx(Sidebar, { categories: options, showingCategory, setShowingCategory }),
          /* @__PURE__ */ jsx(Flex, { justifyContent: "flex-end", children: /* @__PURE__ */ jsxs(Box, { width: { xl: "calc(100% - 290px)", base: "100%" }, float: "right", position: "relative", zIndex: 10, overflow: "auto", children: [
            /* @__PURE__ */ jsxs(Breadcrumb, { px: "25px", children: [
              /* @__PURE__ */ jsx(BreadcrumbItem, { color: secondaryText, fontSize: "sm", mb: "5px", children: /* @__PURE__ */ jsx(Link, { href: "/", children: "Home" }) }),
              /* @__PURE__ */ jsx(BreadcrumbItem, { color: secondaryText, fontSize: "sm", mb: "5px", children: /* @__PURE__ */ jsx(Link, { href: "/ranking", children: "DB Rank" }) })
            ] }),
            /* @__PURE__ */ jsxs(Flex, { px: "25px", mb: "8px", gap: 4, flexDir: { base: "column", md: "row" }, justifyContent: "space-between", align: { base: "inherit", md: "center" }, children: [
              /* @__PURE__ */ jsxs(
                Text,
                {
                  as: "h1",
                  color: textColor,
                  fontSize: "22px",
                  mb: "4px",
                  fontWeight: "700",
                  lineHeight: "100%",
                  children: [
                    "DB Ranking ",
                    options && "for " + options[showingCategory].label
                  ]
                }
              ),
              /* @__PURE__ */ jsxs(Box, { display: "flex", gap: 2, alignItems: "center", justifyContent: { base: "right", md: "inherit" }, children: [
                /* @__PURE__ */ jsx(
                  Select,
                  {
                    options: countryOptions,
                    value: country,
                    onChange: handleChangeCountry,
                    isSearchable: true,
                    chakraStyles: {
                      container: (provided) => ({
                        ...provided,
                        width: "200px"
                        // Set the container width here
                      })
                    }
                  }
                ),
                /* @__PURE__ */ jsx(Link, { href: route === "table-view" ? "/ranking/chart-view" : "/ranking", children: /* @__PURE__ */ jsx(Tooltip, { label: route === "table-view" ? "Chart View" : "Table View", children: /* @__PURE__ */ jsx(
                  IconButton,
                  {
                    align: "center",
                    justifyContent: "center",
                    bg: bgButton,
                    _hover: bgHover,
                    _focus: bgFocus,
                    _active: bgFocus,
                    w: "37px",
                    h: "37px",
                    lineHeight: "100%",
                    borderRadius: "10px",
                    children: /* @__PURE__ */ jsx(Icon, { as: route === "table-view" ? MdAutoGraph : MdTableView, width: "20px", height: "20px", color: "inherit" })
                  }
                ) }) }),
                /* @__PURE__ */ jsx(SidebarResponsive, { categories: options, showingCategory, setShowingCategory })
              ] })
            ] }),
            /* @__PURE__ */ jsx(Box, { px: "25px", children: /* @__PURE__ */ jsx(CustomCKEditor, { content: content.content || "" }) }),
            route === "table-view" && /* @__PURE__ */ jsx(RankTable, { data, vendors, isLoadingCategory, categories }),
            route === "chart-view" && typeof window !== "undefined" && /* @__PURE__ */ jsx(RankChart, { showingCategory: options[showingCategory].id, country })
          ] }) })
        ]
      }
    )
  ] });
}
export {
  Ranking as default
};
