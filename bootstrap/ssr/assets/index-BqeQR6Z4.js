import { jsxs, jsx, Fragment } from "react/jsx-runtime";
import { useContext, useState, useEffect } from "react";
import { useColorModeValue, Stack, Flex, Box, Breadcrumb, BreadcrumbItem, Text, IconButton, Image, Heading, Avatar, Tag, Tooltip, NumberInput, NumberInputField, NumberInputStepper, NumberIncrementStepper, NumberDecrementStepper, Select } from "@chakra-ui/react";
import { C as Card } from "./Card-M0XrdzyB.js";
import { ArrowRightIcon } from "@chakra-ui/icons";
import { MdAdd, MdChevronLeft, MdChevronRight } from "react-icons/md";
import { b as getBlogs, g as getCategories, a as getTags } from "./use-request-DWBiJfY6.js";
import { useQuery } from "react-query";
import { Link } from "@inertiajs/react";
import moment from "moment";
import { Skeleton, SkeletonCircle } from "@chakra-ui/skeleton";
import Sidebar, { SidebarResponsive } from "./Sidebar-BhRlx3Vl.js";
import { g as generateSlug } from "./statics-GI0iJz3l.js";
import { U as UserContext } from "../ssr.js";
import { U as UserLayout } from "./index-D7V5_Wy3.js";
import SeoHeader from "./SeoHeader-DxzDf-f4.js";
import CustomCKEditor from "./CustomCKEditor-dDDE0_xj.js";
import "axios";
import "./Content-C2L3CSaR.js";
import "chakra-react-select";
import "prop-types";
import "react-icons/io5";
import "react-dom/server";
import "@inertiajs/inertia-react";
import "@inertiajs/react/server";
import "@chakra-ui/theme-tools";
import "react-icons/fa";
import "./SearchBar-Dsk0VtlP.js";
import "react-custom-scrollbars-2";
import "react-icons/io";
import "@inertiajs/inertia";
import "./use-request-CXEg0apC.js";
import "react-slick";
import "react-lazyload";
import "react-helmet";
/* empty css                   */
const index = ({ content }) => {
  const textColor = useColorModeValue("secondaryGray.900", "white");
  let secondaryText = useColorModeValue("gray.700", "white");
  const blogCardBg = useColorModeValue("gray.200", "navy.900");
  const { user } = useContext(UserContext);
  const [page, setPage] = useState(1);
  const [countPerPage, setCountPerPage] = useState(10);
  const [showingCategories, setShowingCategories] = useState([]);
  const [showingTags, setShowingTags] = useState([]);
  const { data: blogs } = useQuery(["blogs", showingCategories, showingTags, page, countPerPage], () => getBlogs({ categories: showingCategories, tags: showingTags.map((tag) => tag.id), page, countPerPage }), { staleTime: 3e5 });
  const { data: categories } = useQuery("bcategories", getCategories, { staleTime: 3e5 });
  const { data: tags, isLoadingTag } = useQuery("tags", getTags, { staleTime: 3e5 });
  const [options, setOptions] = useState(null);
  useEffect(() => {
    if (!isLoadingTag && tags) setOptions(tags.map((tag) => ({ id: tag.id, label: tag.name, value: tag.name })));
  }, [tags, isLoadingTag]);
  return /* @__PURE__ */ jsxs(UserLayout, { children: [
    /* @__PURE__ */ jsx(SeoHeader, { content, title: "Blog" }),
    /* @__PURE__ */ jsxs(
      Card,
      {
        w: "100%",
        px: "0px",
        minH: "calc(100vh - 150px)",
        children: [
          categories && tags ? /* @__PURE__ */ jsx(Sidebar, { categories, showingCategories, setShowingCategories, tags: options, showingTags, setShowingTags }) : /* @__PURE__ */ jsxs(Fragment, { children: [
            /* @__PURE__ */ jsx(Card, { h: "100%", display: "flex", flexDir: "column", justifyContent: "space-between", mb: "10px", bg: blogCardBg, children: /* @__PURE__ */ jsxs(Stack, { gap: "1", children: [
              /* @__PURE__ */ jsx(Skeleton, { height: "300px", borderRadius: "12px" }),
              /* @__PURE__ */ jsx(Skeleton, { height: "20px", borderRadius: "12px" }),
              /* @__PURE__ */ jsx(SkeletonCircle, { size: 10 }),
              /* @__PURE__ */ jsx(Skeleton, { height: "12px", borderRadius: "12px" })
            ] }) }),
            /* @__PURE__ */ jsx(Card, { h: "100%", display: "flex", flexDir: "column", justifyContent: "space-between", mb: "10px", bg: blogCardBg, children: /* @__PURE__ */ jsxs(Stack, { gap: "1", children: [
              /* @__PURE__ */ jsx(Skeleton, { height: "300px", borderRadius: "12px" }),
              /* @__PURE__ */ jsx(Skeleton, { height: "20px", borderRadius: "12px" }),
              /* @__PURE__ */ jsx(SkeletonCircle, { size: 10 }),
              /* @__PURE__ */ jsx(Skeleton, { height: "12px", borderRadius: "12px" })
            ] }) }),
            /* @__PURE__ */ jsx(Card, { h: "100%", display: "flex", flexDir: "column", justifyContent: "space-between", mb: "10px", bg: blogCardBg, children: /* @__PURE__ */ jsxs(Stack, { gap: "1", children: [
              /* @__PURE__ */ jsx(Skeleton, { height: "300px", borderRadius: "12px" }),
              /* @__PURE__ */ jsx(Skeleton, { height: "20px", borderRadius: "12px" }),
              /* @__PURE__ */ jsx(SkeletonCircle, { size: 10 }),
              /* @__PURE__ */ jsx(Skeleton, { height: "12px", borderRadius: "12px" })
            ] }) })
          ] }),
          /* @__PURE__ */ jsx(Flex, { justifyContent: "flex-end", children: /* @__PURE__ */ jsxs(Box, { width: { xl: "calc(100% - 290px)", base: "100%" }, float: "right", px: "25px", children: [
            /* @__PURE__ */ jsxs(Breadcrumb, { children: [
              /* @__PURE__ */ jsx(BreadcrumbItem, { color: secondaryText, fontSize: "sm", mb: "5px", children: /* @__PURE__ */ jsx(Link, { href: "/", children: "Home" }) }),
              /* @__PURE__ */ jsx(BreadcrumbItem, { color: secondaryText, fontSize: "sm", mb: "5px", children: /* @__PURE__ */ jsx(Link, { href: "/blog", children: "Blog" }) })
            ] }),
            /* @__PURE__ */ jsxs(Flex, { justify: "space-between", alignItems: "center", children: [
              /* @__PURE__ */ jsx(
                Text,
                {
                  color: textColor,
                  fontSize: "22px",
                  mb: "30px",
                  fontWeight: "700",
                  lineHeight: "100%",
                  children: "Blog"
                }
              ),
              categories && tags && /* @__PURE__ */ jsx(SidebarResponsive, { categories, showingCategories, setShowingCategories, tags: options, showingTags, setShowingTags }),
              user && (user.author || user.admin) ? /* @__PURE__ */ jsx(Link, { href: "/blog/create-blog", children: /* @__PURE__ */ jsx(
                IconButton,
                {
                  "aria-label": "Add",
                  icon: /* @__PURE__ */ jsx(MdAdd, {}),
                  colorScheme: "blue",
                  variant: "outline",
                  isRound: true,
                  size: "md",
                  ml: 2
                }
              ) }) : /* @__PURE__ */ jsx(Fragment, {})
            ] }),
            /* @__PURE__ */ jsx(CustomCKEditor, { content: content.content }),
            /* @__PURE__ */ jsx(Box, { children: blogs && blogs.data ? blogs.data.length > 0 ? blogs.data.map((blog, index2) => !blog ? /* @__PURE__ */ jsx(Fragment, {}) : /* @__PURE__ */ jsx(Link, { href: `/blog/${generateSlug(blog.title)}`, children: /* @__PURE__ */ jsxs(Card, { h: "100%", display: "flex", flexDir: "column", justifyContent: "space-between", mb: "10px", bg: blogCardBg, children: [
              /* @__PURE__ */ jsxs(Box, { children: [
                /* @__PURE__ */ jsx(
                  Image,
                  {
                    mb: 5,
                    h: "250px",
                    w: "100%",
                    borderRadius: "xl",
                    objectFit: "cover",
                    objectPosition: "center",
                    transition: "transform 0.2s ease-out",
                    _hover: { transform: "scale(1.02)" },
                    src: `storage/${blog.featured_images[0].url}?w=1400&auto=compression,format`,
                    alt: blog.title
                  }
                ),
                /* @__PURE__ */ jsx(
                  Heading,
                  {
                    as: "h2",
                    pb: 3,
                    fontSize: { md: "25px", "2sm": "21px", base: "19px" },
                    fontWeight: 700,
                    color: "gray.800",
                    _dark: { color: "gray.200" },
                    children: blog.title
                  }
                )
              ] }),
              /* @__PURE__ */ jsxs(Box, { children: [
                /* @__PURE__ */ jsxs(Flex, { direction: "column", justify: "space-between", mb: 4, gap: 2, children: [
                  /* @__PURE__ */ jsxs(Flex, { align: "center", color: "gray.500", _dark: { color: "gray.400" }, fontSize: { md: "14px", "2sm": "12px", base: "10px" }, gap: 2, children: [
                    /* @__PURE__ */ jsx(
                      Avatar,
                      {
                        _hover: { cursor: "pointer" },
                        color: "white",
                        name: blog.user.name + " " + blog.user.surname,
                        bg: "#11047A",
                        size: { md: "14px", "2sm": "12px", base: "10px" },
                        w: "40px",
                        h: "40px"
                      }
                    ),
                    "By ",
                    /* @__PURE__ */ jsx(Text, { color: "blue.500", _dark: { color: "green.200" }, fontSize: { md: "14px", "2sm": "12px", base: "10px" }, children: ` ${blog.user.name} ${blog.user.surname ? blog.user.surname : ""}` }),
                    " on ",
                    moment(blog.created_at).format("MMM D, YYYY")
                  ] }),
                  /* @__PURE__ */ jsxs(
                    Flex,
                    {
                      justify: "start",
                      gap: 1,
                      children: [
                        blog.tags && blog.tags.slice(0, 2).map((category) => /* @__PURE__ */ jsx(Tag, { fontSize: { md: "14px", "2sm": "12px", base: "10px" }, color: "white", bgColor: "blue.500", _dark: { bgColor: "green.500" }, children: category.name }, category.name)),
                        blog.tags.length > 2 && /* @__PURE__ */ jsxs(Text, { children: [
                          `+${blog.tags.length - 2}`,
                          " more"
                        ] })
                      ]
                    }
                  )
                ] }),
                /* @__PURE__ */ jsx(Flex, { justify: "space-between", fontWeight: "medium", color: "blue.500", _dark: { color: "green.200" }, children: /* @__PURE__ */ jsxs(Flex, { align: "center", children: [
                  /* @__PURE__ */ jsx(Text, { fontSize: { md: "14px", "2sm": "12px", base: "10px" }, children: "Read article" }),
                  /* @__PURE__ */ jsx(ArrowRightIcon, { w: { md: 4, "2sm": 3, base: 2 }, h: 4, mx: 2 })
                ] }) })
              ] })
            ] }) }, index2)) : /* @__PURE__ */ jsx(
              Text,
              {
                color: textColor,
                mb: "4px",
                align: "center",
                fontWeight: "700",
                lineHeight: "100%",
                children: "No blogs"
              }
            ) : /* @__PURE__ */ jsxs(Fragment, { children: [
              /* @__PURE__ */ jsx(Card, { h: "100%", display: "flex", flexDir: "column", justifyContent: "space-between", mb: "10px", bg: blogCardBg, children: /* @__PURE__ */ jsxs(Stack, { gap: "1", children: [
                /* @__PURE__ */ jsx(Skeleton, { height: "300px", borderRadius: "12px" }),
                /* @__PURE__ */ jsx(Skeleton, { height: "20px", borderRadius: "12px" }),
                /* @__PURE__ */ jsx(SkeletonCircle, { size: 10 }),
                /* @__PURE__ */ jsx(Skeleton, { height: "12px", borderRadius: "12px" })
              ] }) }),
              /* @__PURE__ */ jsx(Card, { h: "100%", display: "flex", flexDir: "column", justifyContent: "space-between", mb: "10px", bg: blogCardBg, children: /* @__PURE__ */ jsxs(Stack, { gap: "1", children: [
                /* @__PURE__ */ jsx(Skeleton, { height: "300px", borderRadius: "12px" }),
                /* @__PURE__ */ jsx(Skeleton, { height: "20px", borderRadius: "12px" }),
                /* @__PURE__ */ jsx(SkeletonCircle, { size: 10 }),
                /* @__PURE__ */ jsx(Skeleton, { height: "12px", borderRadius: "12px" })
              ] }) }),
              /* @__PURE__ */ jsx(Card, { h: "100%", display: "flex", flexDir: "column", justifyContent: "space-between", mb: "10px", bg: blogCardBg, children: /* @__PURE__ */ jsxs(Stack, { gap: "1", children: [
                /* @__PURE__ */ jsx(Skeleton, { height: "300px", borderRadius: "12px" }),
                /* @__PURE__ */ jsx(Skeleton, { height: "20px", borderRadius: "12px" }),
                /* @__PURE__ */ jsx(SkeletonCircle, { size: 10 }),
                /* @__PURE__ */ jsx(Skeleton, { height: "12px", borderRadius: "12px" })
              ] }) })
            ] }) }),
            blogs && blogs.last_page > 1 && /* @__PURE__ */ jsxs(Flex, { justifyContent: "space-between", m: 4, alignItems: "center", children: [
              /* @__PURE__ */ jsx(Flex, { mr: 2, children: /* @__PURE__ */ jsx(Tooltip, { label: "Previous Page", children: /* @__PURE__ */ jsx(
                IconButton,
                {
                  onClick: () => setPage((prev) => prev - 1),
                  isDisabled: page === 1,
                  icon: /* @__PURE__ */ jsx(MdChevronLeft, { h: 6, w: 6 })
                }
              ) }) }),
              /* @__PURE__ */ jsxs(Flex, { alignItems: "center", children: [
                /* @__PURE__ */ jsxs(Text, { flexShrink: "0", mr: 4, children: [
                  "Page",
                  " ",
                  /* @__PURE__ */ jsx(Text, { fontWeight: "bold", as: "span", children: page }),
                  " ",
                  "of",
                  " ",
                  /* @__PURE__ */ jsx(Text, { fontWeight: "bold", as: "span", children: Math.ceil(blogs.total / countPerPage) })
                ] }),
                /* @__PURE__ */ jsx(Text, { flexShrink: "0", children: " Go to " }),
                " ",
                /* @__PURE__ */ jsxs(
                  NumberInput,
                  {
                    ml: 2,
                    mr: 4,
                    w: 20,
                    min: 1,
                    max: Math.ceil(blogs.total / countPerPage),
                    onChange: (value) => {
                      if (value <= Math.ceil(blogs.total / countPerPage)) setPage(Number(value));
                    },
                    defaultValue: page,
                    value: page,
                    children: [
                      /* @__PURE__ */ jsx(NumberInputField, {}),
                      /* @__PURE__ */ jsxs(NumberInputStepper, { children: [
                        /* @__PURE__ */ jsx(NumberIncrementStepper, {}),
                        /* @__PURE__ */ jsx(NumberDecrementStepper, {})
                      ] })
                    ]
                  }
                ),
                /* @__PURE__ */ jsx(
                  Select,
                  {
                    w: 32,
                    color: textColor,
                    value: Math.ceil(blogs.total / countPerPage),
                    onChange: (e) => {
                      setCountPerPage(e.target.value);
                    },
                    children: [10, 20, 30, 40, 50].map((pageSize) => /* @__PURE__ */ jsxs("option", { value: pageSize, children: [
                      "Show ",
                      pageSize
                    ] }, pageSize))
                  }
                )
              ] }),
              /* @__PURE__ */ jsx(Flex, { children: /* @__PURE__ */ jsx(Tooltip, { label: "Next Page", children: /* @__PURE__ */ jsx(
                IconButton,
                {
                  onClick: () => setPage((prev) => prev + 1),
                  isDisabled: page === Math.ceil(blogs.total / countPerPage),
                  icon: /* @__PURE__ */ jsx(MdChevronRight, { h: 10, w: 10 })
                }
              ) }) })
            ] })
          ] }) })
        ]
      }
    )
  ] });
};
export {
  index as default
};
