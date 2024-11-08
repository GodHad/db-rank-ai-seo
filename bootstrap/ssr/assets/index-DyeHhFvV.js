import { jsxs, jsx, Fragment } from "react/jsx-runtime";
import { useColorModeValue, useBreakpointValue, Box, Flex, Breadcrumb, BreadcrumbItem, BreadcrumbLink, Text, Image, IconButton, Icon, Button, Table, Tbody, Tr, Th, Td } from "@chakra-ui/react";
import { useContext, useState } from "react";
import { MdEdit, MdCheckCircle, MdOutlineRemoveCircle, MdVisibility } from "react-icons/md";
import { C as Card } from "./Card-M0XrdzyB.js";
import { Link } from "@inertiajs/react";
import { U as UserContext } from "../ssr.js";
import { A as APP_URL, g as generateSlug } from "./statics-GI0iJz3l.js";
import { a as getCategories } from "./use-request-Cf_Kil6_.js";
import { useQuery } from "react-query";
import { Skeleton } from "@chakra-ui/skeleton";
import { a as VendorForm } from "./DBMSForm-DPscc44w.js";
import { U as UserLayout } from "./index-D7V5_Wy3.js";
import "@inertiajs/inertia";
import SeoHeader from "./SeoHeader-DxzDf-f4.js";
import CustomCKEditor from "./CustomCKEditor-dDDE0_xj.js";
import "react-dom/server";
import "@inertiajs/inertia-react";
import "@inertiajs/react/server";
import "@chakra-ui/theme-tools";
import "axios";
import "./CustomMultiSelect-CrKxktuE.js";
import "chakra-react-select";
import "./CustomInput-D8rT110g.js";
import "@tanstack/react-table";
import "moment";
import "react-icons/fa";
import "./SearchBar-Dsk0VtlP.js";
import "@chakra-ui/icons";
import "react-custom-scrollbars-2";
import "prop-types";
import "react-icons/io";
import "./use-request-CXEg0apC.js";
import "react-slick";
import "react-lazyload";
import "react-helmet";
/* empty css                   */
const headers = [
  { key: "db_name", name: "Name" },
  { key: "description", name: "Description" },
  { key: "primary_category", name: "Primary Database Model" },
  { key: "secondary_category", name: "Secondary Database Models" },
  { key: "overall_ranking", name: "DB Rank" }
  // { key: 'webisite_url', name: 'Website' },
  // { key: 'technical_doc', name: 'Technical Documentation' },
  // { key: 'developer', name: 'Developer' },
  // { key: 'initial_release', name: 'Initial Release' },
  // { key: 'current_release', name: 'Current Release' },
  // { key: 'license', name: 'License' },
  // { key: 'cloud_based_only', name: 'Cloud-based only', yes: true },
  // { key: 'dbaas_offerings', name: 'DBaas Offerings' },
  // { key: 'implementation_lang', name: 'Implementation Language' },
  // { key: 'server_os', name: 'Server Operating Systems' },
  // { key: 'data_scheme', name: 'Data Scheme' },
  // { key: 'typing', name: 'Typing', yes: true },
  // { key: 'xml_support', name: 'XML Support', yes: true },
  // { key: 'secondary_indexes', name: 'Secondary Indexes', yes: true },
  // { key: 'sql', name: 'SQL' },
  // { key: 'apis_access_method', name: 'APIS And Other Access Methods' },
  // { key: 'supported_programming_lang', name: 'Supported Programming Languages' },
  // { key: 'server_side_scripts', name: 'Server-side Scripts' },
  // { key: 'triggers', name: 'Triggers', yes: true },
  // { key: 'partitioning_methods', name: 'Partitioning Methods' },
  // { key: 'replication_methods', name: 'Replication Methods' },
  // { key: 'mapreduce', name: 'MapReduce' },
  // { key: 'consistency_concepts', name: 'Consistency Concepts' },
  // { key: 'foreign_keys', name: 'Foreign Keys', yes: true },
  // { key: 'transaction_concepts', name: 'Transcation Concepts' },
  // { key: 'concurrency', name: 'Concurrency', yes: true },
  // { key: 'durability', name: 'Durability', yes: true },
  // { key: 'in_memory_capabilities', name: 'In-memory capabilities', yes: true },
  // { key: 'user_concepts', name: 'User Concepts' },
];
function DBMS({ selectedDBMS, slug }) {
  const { user } = useContext(UserContext);
  const { data: categories } = useQuery("categories", getCategories);
  const textColor = useColorModeValue("secondaryGray.900", "white");
  let secondaryText = useColorModeValue("gray.700", "white");
  const borderColor = useColorModeValue("gray.200", "whiteAlpha.100");
  const viewsColor = useColorModeValue("green.500", "green.300");
  const contactCTAColor = useColorModeValue("green.500", "green.400");
  const compareText = useBreakpointValue({ base: "Compare", md: "Compare with others" });
  const [editing, setEditing] = useState(false);
  return /* @__PURE__ */ jsxs(UserLayout, { children: [
    /* @__PURE__ */ jsx(SeoHeader, { content: selectedDBMS, title: `DBMS | ${selectedDBMS ? selectedDBMS.db_name : ""}` }),
    /* @__PURE__ */ jsx(
      Box,
      {
        flexDirection: "column",
        w: "100%",
        px: "0px",
        overflow: "hidden",
        children: /* @__PURE__ */ jsxs(
          Card,
          {
            flexDirection: "column",
            w: "100%",
            px: "0px",
            minH: "calc(100vh - 150px)",
            overflowX: { sm: "auto", lg: "hidden" },
            children: [
              /* @__PURE__ */ jsxs(Flex, { px: "25px", mb: "20px", gap: 4, flexDir: { base: "column", sm: "row" }, justifyContent: "space-between", align: { base: "inherit", md: "center" }, children: [
                /* @__PURE__ */ jsxs(Breadcrumb, { children: [
                  /* @__PURE__ */ jsx(BreadcrumbItem, { color: secondaryText, fontSize: "sm", mb: "5px", children: /* @__PURE__ */ jsx(Link, { href: "/", children: "Home" }) }),
                  /* @__PURE__ */ jsx(BreadcrumbItem, { color: secondaryText, fontSize: "sm", mb: "5px", children: /* @__PURE__ */ jsx(Link, { href: "/dbms", children: "DBMS" }) }),
                  /* @__PURE__ */ jsx(BreadcrumbItem, { color: secondaryText, fontSize: "sm", mb: "5px", children: /* @__PURE__ */ jsx(BreadcrumbLink, { children: selectedDBMS && selectedDBMS.db_name }) })
                ] }),
                /* @__PURE__ */ jsx(Flex, { gap: 4, alignItems: "center", justifyContent: "right", children: /* @__PURE__ */ jsx(Link, { href: `/dbms/compare/${slug}`, children: /* @__PURE__ */ jsx(
                  Text,
                  {
                    color: "green.500",
                    fontSize: { md: "14px", base: "12px" },
                    mb: "4px",
                    fontWeight: "400",
                    lineHeight: "100%",
                    children: compareText
                  }
                ) }) })
              ] }),
              editing ? /* @__PURE__ */ jsx(VendorForm, { vendor: selectedDBMS, setOpenedPage: setEditing, categories }) : /* @__PURE__ */ jsxs(Fragment, { children: [
                selectedDBMS ? /* @__PURE__ */ jsxs(Fragment, { children: [
                  /* @__PURE__ */ jsx(
                    Image,
                    {
                      mb: 5,
                      w: "100%",
                      maxH: "191px",
                      objectFit: "cover",
                      objectPosition: "center",
                      src: `${APP_URL}storage/${selectedDBMS.banner}?w=1400&auto=compression,format`,
                      alt: selectedDBMS.db_name
                    }
                  ),
                  /* @__PURE__ */ jsxs(Flex, { alignItems: "center", justifyContent: "space-between", gap: 10, children: [
                    /* @__PURE__ */ jsxs(Flex, { flexDir: "column", children: [
                      /* @__PURE__ */ jsxs(Flex, { align: "center", gap: 2, mx: 5, mb: 5, display: { base: "flex", lg: "none" }, children: [
                        /* @__PURE__ */ jsx(
                          Text,
                          {
                            color: textColor,
                            mb: "4px",
                            fontWeight: "700",
                            lineHeight: "120%",
                            fontSize: { md: "20px", "2sm": "18px", sm: "16px" },
                            children: selectedDBMS.db_name
                          }
                        ),
                        user && selectedDBMS && selectedDBMS.user.length && user.id === selectedDBMS.user[0].id && !editing ? /* @__PURE__ */ jsx(
                          IconButton,
                          {
                            "aria-label": "Edit",
                            icon: /* @__PURE__ */ jsx(MdEdit, {}),
                            colorScheme: "blue",
                            variant: "outline",
                            isRound: true,
                            size: "sm",
                            float: "right",
                            onClick: () => setEditing(true)
                          }
                        ) : /* @__PURE__ */ jsx(Fragment, {})
                      ] }),
                      /* @__PURE__ */ jsx(
                        Image,
                        {
                          mb: 5,
                          mx: 5,
                          w: "172px",
                          h: "172px",
                          objectFit: "cover",
                          objectPosition: "center",
                          border: borderColor,
                          borderStyle: "solid",
                          borderWidth: 1,
                          src: `${APP_URL}storage/${selectedDBMS.logo_url}?w=1400&auto=compression,format`,
                          alt: selectedDBMS.db_name
                        }
                      ),
                      /* @__PURE__ */ jsxs(Flex, { align: "center", mx: 5, display: { base: "flex", lg: "none" }, children: [
                        /* @__PURE__ */ jsx(
                          Icon,
                          {
                            w: "24px",
                            h: "24px",
                            me: "5px",
                            color: selectedDBMS.approved === 1 ? "green.500" : "gray.500",
                            as: selectedDBMS.approved === 1 ? MdCheckCircle : MdOutlineRemoveCircle
                          }
                        ),
                        /* @__PURE__ */ jsx(Text, { color: selectedDBMS.approved === 1 ? "green.500" : "gray.500", fontSize: { md: "14px", "2sm": "12px", sm: "10px" }, fontWeight: "700", children: selectedDBMS.approved === 1 ? "Claimed" : "Unclaimed" }),
                        selectedDBMS.approved === 0 && /* @__PURE__ */ jsx(Link, { href: `/claim-dbms/${generateSlug(selectedDBMS.db_name)}`, children: /* @__PURE__ */ jsx(Text, { color: "blue.500", ms: 1, fontSize: { md: "14px", "2sm": "12px", sm: "10px" }, fontWeight: "700", textDecor: "underline", children: "(Claim)" }) })
                      ] })
                    ] }),
                    /* @__PURE__ */ jsxs(
                      Flex,
                      {
                        justifyContent: "space-between",
                        flexDir: { base: "column", lg: "row" },
                        w: "full",
                        mx: "16px",
                        gap: 4,
                        maxWidth: { base: "200px", md: "300px", lg: "100vw" },
                        children: [
                          /* @__PURE__ */ jsxs(
                            Flex,
                            {
                              flexDir: "column",
                              gap: { md: 2, "2sm": 1, base: 0 },
                              children: [
                                /* @__PURE__ */ jsxs(Flex, { align: "center", gap: 2, display: { base: "none", lg: "flex" }, children: [
                                  /* @__PURE__ */ jsx(
                                    Text,
                                    {
                                      color: textColor,
                                      mb: "4px",
                                      fontWeight: "700",
                                      lineHeight: "120%",
                                      fontSize: { md: "20px", "2sm": "18px", sm: "16px" },
                                      children: selectedDBMS.db_name
                                    }
                                  ),
                                  user && selectedDBMS && selectedDBMS.user.length && user.id === selectedDBMS.user[0].id && !editing ? /* @__PURE__ */ jsx(
                                    IconButton,
                                    {
                                      "aria-label": "Edit",
                                      icon: /* @__PURE__ */ jsx(MdEdit, {}),
                                      colorScheme: "blue",
                                      variant: "outline",
                                      isRound: true,
                                      size: "sm",
                                      float: "right",
                                      onClick: () => setEditing(true)
                                    }
                                  ) : /* @__PURE__ */ jsx(Fragment, {})
                                ] }),
                                /* @__PURE__ */ jsxs(Flex, { align: "center", children: [
                                  /* @__PURE__ */ jsx(
                                    Icon,
                                    {
                                      w: "24px",
                                      h: "24px",
                                      me: "5px",
                                      color: viewsColor,
                                      as: MdVisibility
                                    }
                                  ),
                                  /* @__PURE__ */ jsxs(
                                    Text,
                                    {
                                      color: viewsColor,
                                      fontWeight: "600",
                                      lineHeight: "120%",
                                      fontSize: { md: "18px", "2sm": "16px", sm: "14px" },
                                      children: [
                                        selectedDBMS.profile_views,
                                        " views"
                                      ]
                                    }
                                  )
                                ] }),
                                selectedDBMS && /* @__PURE__ */ jsx(
                                  Text,
                                  {
                                    color: textColor,
                                    fontWeight: "400",
                                    lineHeight: "120%",
                                    display: "inline",
                                    fontSize: { md: "16px", "2sm": "14px", sm: "12px" },
                                    dangerouslySetInnerHTML: { __html: selectedDBMS.overall_ranking }
                                  }
                                )
                              ]
                            }
                          ),
                          /* @__PURE__ */ jsxs(Flex, { flexDir: "column", maxWidth: { base: "200px", md: "100vh" }, children: [
                            /* @__PURE__ */ jsxs(Flex, { gap: 2, flexDir: { base: "column", md: "row" }, children: [
                              /* @__PURE__ */ jsx("a", { href: "mailto:office@dbrank.ai", target: "_blank", children: /* @__PURE__ */ jsx(
                                Button,
                                {
                                  fontSize: "sm",
                                  variant: "solid",
                                  fontWeight: "500",
                                  minW: "120px",
                                  w: "100%",
                                  color: "white",
                                  bg: contactCTAColor,
                                  h: { md: "50px", "2sm": "40px", base: "30px" },
                                  mb: { base: "10px", md: "24px" },
                                  children: "Contact"
                                }
                              ) }),
                              /* @__PURE__ */ jsx("a", { href: selectedDBMS.website_url, target: "_blank", children: /* @__PURE__ */ jsx(
                                Button,
                                {
                                  fontSize: "sm",
                                  variant: "brand",
                                  fontWeight: "500",
                                  minW: "120px",
                                  w: "100%",
                                  h: { md: "50px", "2sm": "40px", base: "30px" },
                                  mb: { base: "10px", md: "24px" },
                                  children: "Website"
                                }
                              ) })
                            ] }),
                            /* @__PURE__ */ jsxs(Flex, { align: "center", display: { base: "none", lg: "flex" }, children: [
                              /* @__PURE__ */ jsx(
                                Icon,
                                {
                                  w: "24px",
                                  h: "24px",
                                  me: "5px",
                                  color: selectedDBMS.approved === 1 ? "green.500" : "gray.500",
                                  as: selectedDBMS.approved === 1 ? MdCheckCircle : MdOutlineRemoveCircle
                                }
                              ),
                              /* @__PURE__ */ jsx(Text, { color: selectedDBMS.approved === 1 ? "green.500" : "gray.500", fontSize: { md: "14px", "2sm": "12px", sm: "10px" }, fontWeight: "700", children: selectedDBMS.approved === 1 ? "Claimed" : "Unclaimed" }),
                              selectedDBMS.approved === 0 && /* @__PURE__ */ jsx(Link, { href: `/dbms/claim-dbms/${generateSlug(selectedDBMS.db_name)}`, children: /* @__PURE__ */ jsx(Text, { color: "blue.500", fontSize: { md: "14px", "2sm": "12px", sm: "10px" }, ms: 1, fontWeight: "700", textDecor: "underline", children: "(Claim DBMS)" }) })
                            ] })
                          ] })
                        ]
                      }
                    )
                  ] })
                ] }) : /* @__PURE__ */ jsxs(Fragment, { children: [
                  /* @__PURE__ */ jsx(Skeleton, { height: "300px", borderRadius: "12px", mb: 5, mx: 5 }),
                  /* @__PURE__ */ jsxs(Flex, { alignItems: "center", children: [
                    /* @__PURE__ */ jsx(
                      Skeleton,
                      {
                        mb: 5,
                        mx: 5,
                        w: "172px",
                        h: "172px",
                        objectFit: "cover",
                        objectPosition: "center",
                        border: borderColor,
                        borderStyle: "solid",
                        borderWidth: 1
                      }
                    ),
                    /* @__PURE__ */ jsxs(Flex, { flexDir: "column", gap: 2, children: [
                      /* @__PURE__ */ jsx(Skeleton, { w: "full", maxW: "200px", height: "30px", borderRadius: "12px" }),
                      /* @__PURE__ */ jsx(Skeleton, { w: "full", maxW: "200px", height: "30px", borderRadius: "12px" }),
                      /* @__PURE__ */ jsx(Skeleton, { w: "full", maxW: "200px", height: "30px", borderRadius: "12px" }),
                      /* @__PURE__ */ jsx(Skeleton, { w: "full", maxW: "200px", height: "30px", borderRadius: "12px" })
                    ] })
                  ] })
                ] }),
                /* @__PURE__ */ jsx(
                  Box,
                  {
                    overflow: "auto",
                    sx: {
                      "&::-webkit-scrollbar": {
                        width: "8px",
                        height: "8px",
                        backgroundColor: "transparent"
                        // Change to transparent or the desired color
                      },
                      "&::-webkit-scrollbar-thumb": {
                        backgroundColor: borderColor,
                        // Color for the scrollbar thumb
                        borderRadius: "20px"
                      },
                      "&::-webkit-scrollbar-track": {
                        backgroundColor: "rgba(0, 0, 0, 0.15)",
                        // Track color, adjust as needed
                        borderRadius: "20px"
                      }
                    },
                    children: /* @__PURE__ */ jsx(Table, { variant: "simple", color: "gray.500", mb: "24px", mt: "12px", style: { tableLayout: "fixed" }, children: /* @__PURE__ */ jsxs(Tbody, { children: [
                      headers.map((header) => /* @__PURE__ */ jsxs(Tr, { children: [
                        /* @__PURE__ */ jsx(
                          Th,
                          {
                            pe: "10px",
                            borderColor,
                            width: "150px",
                            children: header.name
                          }
                        ),
                        selectedDBMS ? /* @__PURE__ */ jsx(
                          Td,
                          {
                            pe: "10px",
                            borderColor,
                            width: "300px",
                            children: /* @__PURE__ */ jsx(
                              Text,
                              {
                                color: textColor,
                                mb: "4px",
                                fontWeight: "500",
                                lineHeight: "120%",
                                dangerouslySetInnerHTML: { __html: header.yes ? selectedDBMS[header.key] ? "Yes" : "No" : selectedDBMS[header.key] }
                              }
                            )
                          },
                          selectedDBMS.id
                        ) : /* @__PURE__ */ jsx(
                          Td,
                          {
                            pe: "10px",
                            borderColor,
                            width: "300px",
                            children: /* @__PURE__ */ jsx(Skeleton, { w: "full", maxW: "300px", height: "30px", borderRadius: "12px" })
                          }
                        )
                      ] }, header.key)),
                      /* @__PURE__ */ jsx(Tr, { children: selectedDBMS ? /* @__PURE__ */ jsx(
                        Td,
                        {
                          pe: "10px",
                          borderColor,
                          width: "300px",
                          className: "no-border-editor",
                          colSpan: 2,
                          children: /* @__PURE__ */ jsx(CustomCKEditor, { content: selectedDBMS.extra_content })
                        }
                      ) : /* @__PURE__ */ jsx(Td, { colSpan: 2, children: /* @__PURE__ */ jsx(Skeleton, { w: "full", maxW: "600px", height: "30px", borderRadius: "12px" }) }) })
                    ] }) })
                  }
                )
              ] })
            ]
          }
        )
      }
    )
  ] });
}
export {
  DBMS as default,
  headers
};
