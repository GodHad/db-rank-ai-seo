import { jsxs, jsx } from "react/jsx-runtime";
import { useColorModeValue, Box, Breadcrumb, BreadcrumbItem, BreadcrumbLink, Flex, Text, FormControl, FormLabel, Table, Tbody, Tr, Th, Td } from "@chakra-ui/react";
import { useContext, useMemo, useEffect, useState, useRef } from "react";
import { Select } from "chakra-react-select";
import { C as Card } from "./Card-M0XrdzyB.js";
import { Link } from "@inertiajs/react";
import { D as DBMSContext } from "../ssr.js";
import { g as generateSlug } from "./statics-GI0iJz3l.js";
import { g as getVendors } from "./use-request-Cf_Kil6_.js";
import { useQuery } from "react-query";
import { headers } from "./index-DyeHhFvV.js";
import { Skeleton } from "@chakra-ui/skeleton";
import { Helmet } from "react-helmet";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import { ClassicEditor, Autoformat, BlockQuote, Bold, CloudServices, Code, CodeBlock, Essentials, Heading, HorizontalLine, Image, ImageCaption, ImageInsert, ImageResize, ImageStyle, ImageToolbar, ImageUpload, MediaEmbed, Base64UploadAdapter, Italic, Link as Link$1, List, Markdown, Mention, Paragraph, SourceEditing, Strikethrough, Table as Table$1, TableToolbar, TableProperties, TableColumnResize, TextTransformation, TodoList } from "ckeditor5";
/* empty css                   */
import { U as UserLayout } from "./index-D7V5_Wy3.js";
import { Inertia } from "@inertiajs/inertia";
import "@inertiajs/inertia-react";
import "react-dom/server";
import "@inertiajs/react/server";
import "@chakra-ui/theme-tools";
import "axios";
import "react-icons/md";
import "./DBMSForm-DPscc44w.js";
import "./CustomMultiSelect-CrKxktuE.js";
import "./CustomInput-D8rT110g.js";
import "@tanstack/react-table";
import "moment";
import "./SeoHeader-DxzDf-f4.js";
import "./CustomCKEditor-dDDE0_xj.js";
import "react-icons/fa";
import "./SearchBar-Dsk0VtlP.js";
import "@chakra-ui/icons";
import "react-custom-scrollbars-2";
import "prop-types";
import "react-icons/io";
import "./use-request-CXEg0apC.js";
import "react-slick";
import "react-lazyload";
function CompareDBMS({ slug }) {
  const dbmsNames = decodeURIComponent(slug).split(";");
  const { vendors, setVendors } = useContext(DBMSContext);
  const { data: _vendors } = useQuery(
    "user_vendors",
    getVendors,
    {
      staleTime: 3e5,
      enabled: vendors.length === 0,
      onSuccess: (data2) => {
        setVendors(data2);
      }
    }
  );
  const selectedDBMS = useMemo(() => {
    return vendors.filter((vendor) => dbmsNames.includes(generateSlug(vendor.db_name)));
  }, [vendors, slug]);
  useEffect(() => {
    if (selectedDBMS.length !== dbmsNames.length && vendors.length !== 0 && _vendors) Inertia.visit("/not-found");
  }, [selectedDBMS, vendors, _vendors]);
  const textColor = useColorModeValue("secondaryGray.900", "white");
  const secondaryText = useColorModeValue("gray.700", "white");
  const borderColor = useColorModeValue("gray.200", "whiteAlpha.100");
  const [data, setData] = useState(null);
  const [options, setOptions] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState(null);
  const editorRefs = useRef([]);
  const [editorData, setEditorData] = useState([]);
  useEffect(() => {
    setData(selectedDBMS.map((dbms) => {
      const primaryRanking = dbms.primary_ranking.split(" ");
      return {
        ...dbms,
        overall_ranking: `
          <span style="margin-right: 8px">Overall Avg. Score:</span> ${dbms.overall_avg_score}<br> 
          <span style="margin-right: 8px">Rank:</span> #${dbms.overall_ranking} Overall<br>
          ${dbms.primary_category.map((category, index) => `<span style="margin-right: 8px; opacity: 0">Rank: </span> #${primaryRanking[index]} ${category.shortname}<br>`)}
      `,
        primary_category: dbms.primary_category.map((category) => category.title).join("\n"),
        secondary_category: dbms.secondary_category.map((category) => category.title).join("\n")
      };
    }));
    setSelectedOptions(selectedDBMS.map((dbms) => ({ label: dbms.db_name, value: dbms.id })));
    const updatedData = selectedDBMS.map((dbms) => dbms.description || "");
    setEditorData(updatedData);
  }, [selectedDBMS]);
  const handleEditorReady = (editor, index) => {
    editorRefs.current[index] = editor;
    editor.setData(editorData[index]);
  };
  useEffect(() => {
    if (vendors) setOptions(vendors.map((vendor) => ({ label: vendor.db_name, value: vendor.id })));
  }, [vendors]);
  const handleSelectChange = (value) => {
    const navigateUrl = value.map((option, index) => generateSlug(option.label)).join(";");
    const fullUrl = `/dbms/compare/${encodeURIComponent(navigateUrl)}`;
    if (typeof window !== "undefined")
      window.location.pathname = fullUrl;
  };
  return /* @__PURE__ */ jsxs(UserLayout, { children: [
    /* @__PURE__ */ jsx(Helmet, { children: /* @__PURE__ */ jsx("title", { children: "DB Rank AI | Compare" }) }),
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
              /* @__PURE__ */ jsxs(Breadcrumb, { px: "25px", children: [
                /* @__PURE__ */ jsx(BreadcrumbItem, { color: secondaryText, fontSize: "sm", mb: "5px", children: /* @__PURE__ */ jsx(Link, { href: "/", children: "Home" }) }),
                /* @__PURE__ */ jsx(BreadcrumbItem, { color: secondaryText, fontSize: "sm", mb: "5px", children: /* @__PURE__ */ jsx(Link, { href: "/dbms", children: "DBMS" }) }),
                /* @__PURE__ */ jsx(BreadcrumbItem, { color: secondaryText, fontSize: "sm", mb: "5px", children: /* @__PURE__ */ jsx(BreadcrumbLink, { children: "Compare" }) }),
                /* @__PURE__ */ jsx(BreadcrumbItem, { color: secondaryText, fontSize: "sm", mb: "5px", children: /* @__PURE__ */ jsx(BreadcrumbLink, { children: selectedDBMS.length === 1 ? selectedDBMS[0].db_name : selectedDBMS.map((dbms, index) => index === selectedDBMS.length - 1 ? dbms.db_name : `${dbms.db_name} vs. `) }) })
              ] }),
              /* @__PURE__ */ jsx(Flex, { px: "25px", mb: "8px", gap: 4, flexDir: { base: "column", md: "row" }, justifyContent: "space-between", align: { base: "inherit", md: "center" }, children: /* @__PURE__ */ jsx(
                Text,
                {
                  color: textColor,
                  fontSize: { md: "22px", base: "20px" },
                  mb: "4px",
                  fontWeight: "700",
                  lineHeight: "100%",
                  children: selectedDBMS.length === 1 ? selectedDBMS[0].db_name : selectedDBMS.map((dbms, index) => index === selectedDBMS.length - 1 ? dbms.db_name : `${dbms.db_name} vs. `)
                }
              ) }),
              /* @__PURE__ */ jsx(Box, { display: "flex", gap: 2, alignItems: "center", px: 6, w: "full", justifyContent: { base: "right", md: "inherit" }, children: options && /* @__PURE__ */ jsxs(FormControl, { mb: "24px", children: [
                /* @__PURE__ */ jsx(
                  FormLabel,
                  {
                    display: "flex",
                    ms: "4px",
                    fontSize: "sm",
                    fontWeight: "500",
                    color: textColor,
                    mb: "8px",
                    children: "Compare with:"
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
                    onChange: handleSelectChange
                  }
                )
              ] }) }),
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
                      data && data.length > 0 ? data.map((dbms, index) => /* @__PURE__ */ jsx(
                        Td,
                        {
                          pe: "10px",
                          borderColor,
                          width: "300px",
                          children: header.key === "description" ? /* @__PURE__ */ jsx(
                            CKEditor,
                            {
                              editor: ClassicEditor,
                              config: {
                                plugins: [
                                  Autoformat,
                                  BlockQuote,
                                  Bold,
                                  CloudServices,
                                  Code,
                                  CodeBlock,
                                  Essentials,
                                  Heading,
                                  HorizontalLine,
                                  Image,
                                  ImageCaption,
                                  ImageInsert,
                                  ImageResize,
                                  ImageStyle,
                                  ImageToolbar,
                                  ImageUpload,
                                  MediaEmbed,
                                  Base64UploadAdapter,
                                  Italic,
                                  Link$1,
                                  List,
                                  Markdown,
                                  Mention,
                                  Paragraph,
                                  SourceEditing,
                                  Strikethrough,
                                  Table$1,
                                  TableToolbar,
                                  TableProperties,
                                  TableColumnResize,
                                  TextTransformation,
                                  TodoList
                                ],
                                table: {
                                  contentToolbar: ["tableColumn", "tableRow", "mergeTableCells", "tableProperties"]
                                },
                                isReadOnly: true,
                                initialData: data[header.key]
                              },
                              data: data[header.key] || "",
                              disabled: true,
                              onReady: (editor) => handleEditorReady(editor, index)
                            },
                            `editor-${dbms.id}`
                          ) : /* @__PURE__ */ jsx(
                            Text,
                            {
                              color: textColor,
                              mb: "4px",
                              fontWeight: "500",
                              lineHeight: "120%",
                              dangerouslySetInnerHTML: { __html: header.yes ? data[header.key] ? "Yes" : "No" : data[header.key] }
                            }
                          )
                        },
                        dbms.id
                      )) : /* @__PURE__ */ jsx(
                        Td,
                        {
                          pe: "10px",
                          borderColor,
                          width: "300px",
                          children: /* @__PURE__ */ jsx(Skeleton, { width: "300px", height: "30px", borderRadius: "12px" })
                        }
                      )
                    ] }, header.key)),
                    /* @__PURE__ */ jsx(Tr, { children: data && data.length > 0 ? data.map((dbms, index) => /* @__PURE__ */ jsx(
                      Td,
                      {
                        pe: "10px",
                        borderColor,
                        width: "300px",
                        className: "no-border-editor",
                        colSpan: 2,
                        children: /* @__PURE__ */ jsx(
                          CKEditor,
                          {
                            editor: ClassicEditor,
                            config: {
                              plugins: [
                                Autoformat,
                                BlockQuote,
                                Bold,
                                CloudServices,
                                Code,
                                CodeBlock,
                                Essentials,
                                Heading,
                                HorizontalLine,
                                Image,
                                ImageCaption,
                                ImageInsert,
                                ImageResize,
                                ImageStyle,
                                ImageToolbar,
                                ImageUpload,
                                MediaEmbed,
                                Base64UploadAdapter,
                                Italic,
                                Link$1,
                                List,
                                Markdown,
                                Mention,
                                Paragraph,
                                SourceEditing,
                                Strikethrough,
                                Table$1,
                                TableToolbar,
                                TableProperties,
                                TableColumnResize,
                                TextTransformation,
                                TodoList
                              ],
                              table: {
                                contentToolbar: ["tableColumn", "tableRow", "mergeTableCells", "tableProperties"]
                              },
                              isReadOnly: true,
                              initialData: dbms.extra_content
                            },
                            disabled: true
                          }
                        )
                      },
                      dbms.id
                    )) : /* @__PURE__ */ jsx(Td, { colSpan: 2, children: /* @__PURE__ */ jsx(Skeleton, { width: "300px", height: "30px", borderRadius: "12px" }) }) })
                  ] }) })
                }
              )
            ]
          }
        )
      }
    )
  ] });
}
export {
  CompareDBMS as default
};
