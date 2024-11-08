import { jsxs, jsx, Fragment } from "react/jsx-runtime";
import { useContext, useRef, useEffect, lazy } from "react";
import { useColorModeValue, Box, Breadcrumb, BreadcrumbItem, Text, Image, IconButton, Flex, Avatar, Tag } from "@chakra-ui/react";
import { C as Card } from "./Card-M0XrdzyB.js";
import moment from "moment";
import { A as APP_URL, g as generateSlug } from "./statics-GI0iJz3l.js";
import { U as UserContext } from "../ssr.js";
import { MdEdit } from "react-icons/md";
import { U as UserLayout } from "./index-D7V5_Wy3.js";
import { Link } from "@inertiajs/react";
import CustomCKEditor from "./CustomCKEditor-dDDE0_xj.js";
import SeoHeader from "./SeoHeader-DxzDf-f4.js";
import "react-dom/server";
import "@inertiajs/inertia-react";
import "@inertiajs/react/server";
import "@chakra-ui/theme-tools";
import "react-query";
import "axios";
import "react-icons/fa";
import "./SearchBar-Dsk0VtlP.js";
import "@chakra-ui/icons";
import "@chakra-ui/skeleton";
import "react-custom-scrollbars-2";
import "prop-types";
import "react-icons/io";
import "@inertiajs/inertia";
import "./use-request-CXEg0apC.js";
import "react-slick";
import "react-lazyload";
/* empty css                   */
import "react-helmet";
const BlogForm = lazy(() => import("./BlogForm-CmIAKaOl.js"));
const index = ({ blog, route }) => {
  let secondaryText = useColorModeValue("gray.700", "white");
  const { user } = useContext(UserContext);
  const editorRef = useRef();
  useEffect(() => {
    if (editorRef.current) {
      editorRef.current.setData((blog == null ? void 0 : blog.content) || "");
    }
  }, [blog]);
  return /* @__PURE__ */ jsxs(UserLayout, { children: [
    blog && /* @__PURE__ */ jsx(SeoHeader, { content: blog, title: `Blog | ${blog.title}` }),
    /* @__PURE__ */ jsx(
      Card,
      {
        w: "100%",
        px: "0px",
        minH: "calc(100vh - 150px)",
        children: /* @__PURE__ */ jsxs(Box, { width: "100%", px: "25px", children: [
          /* @__PURE__ */ jsxs(Breadcrumb, { children: [
            /* @__PURE__ */ jsx(BreadcrumbItem, { color: secondaryText, fontSize: "sm", mb: "5px", children: /* @__PURE__ */ jsx(Link, { href: "/", children: "Home" }) }),
            /* @__PURE__ */ jsx(BreadcrumbItem, { color: secondaryText, fontSize: "sm", mb: "5px", children: /* @__PURE__ */ jsx(Link, { href: "/blog", children: "Blog" }) }),
            blog && /* @__PURE__ */ jsx(BreadcrumbItem, { color: secondaryText, fontSize: "sm", mb: "5px", children: /* @__PURE__ */ jsx(Text, { isTruncated: true, maxW: { "2sm": "200px", md: "full", base: "120px" }, children: blog.title }) })
          ] }),
          route === "blog-show" && /* @__PURE__ */ jsxs(Box, { p: "20px", children: [
            /* @__PURE__ */ jsx(
              Image,
              {
                mb: 5,
                w: "100%",
                h: { md: "300px", base: "250px" },
                borderRadius: "xl",
                objectFit: "cover",
                objectPosition: "center",
                src: `${APP_URL}storage/${blog.featured_images[0].url}?w=1400&auhref=compression,format`,
                alt: blog.title
              }
            ),
            /* @__PURE__ */ jsxs(Text, { mb: "32px", fontSize: { md: "30px", "2sm": "26px", base: "24px" }, fontWeight: 700, children: [
              blog.title,
              user && (user.admin || user.author && user.id === blog.user_id) ? /* @__PURE__ */ jsx(Link, { href: `/blog/edit/${generateSlug(blog.title)}`, children: /* @__PURE__ */ jsx(
                IconButton,
                {
                  "aria-label": "Edit",
                  icon: /* @__PURE__ */ jsx(MdEdit, {}),
                  colorScheme: "blue",
                  variant: "outline",
                  isRound: true,
                  size: "md",
                  ml: 2,
                  onClick: () => setEditing(true)
                }
              ) }) : /* @__PURE__ */ jsx(Fragment, {})
            ] }),
            /* @__PURE__ */ jsx(Box, { children: /* @__PURE__ */ jsxs(Flex, { direction: { base: "column", md: "row" }, justify: "space-between", alignItems: "center", mb: 4, gap: 2, children: [
              /* @__PURE__ */ jsxs(Flex, { align: "center", color: "gray.500", _dark: { color: "gray.400" }, gap: 2, children: [
                /* @__PURE__ */ jsx(
                  Avatar,
                  {
                    _hover: { cursor: "pointer" },
                    color: "white",
                    name: blog.user.name + " " + blog.user.surname,
                    bg: "#11047A",
                    size: "sm",
                    w: "40px",
                    h: "40px"
                  }
                ),
                "By ",
                /* @__PURE__ */ jsx(Text, { color: "blue.500", _dark: { color: "green.200" }, children: ` ${blog.user.name} ${blog.user.surname ? blog.user.surname : ""}` }),
                " on ",
                moment(blog.created_at).format("MMM D, YYYY")
              ] }),
              /* @__PURE__ */ jsxs(
                Flex,
                {
                  justify: "start",
                  gap: 1,
                  children: [
                    blog.tags && blog.tags.slice(0, 2).map((category) => /* @__PURE__ */ jsx(Tag, { color: "white", bgColor: "blue.500", _dark: { bgColor: "green.500" }, children: category.name }, category.name)),
                    blog.tags.length > 2 && /* @__PURE__ */ jsxs(Text, { children: [
                      `+${blog.tags.length - 2}`,
                      " more"
                    ] })
                  ]
                }
              )
            ] }) }),
            /* @__PURE__ */ jsx(CustomCKEditor, { content: blog.content })
          ] }),
          route === "blog-edit" && /* @__PURE__ */ jsx(BlogForm, { blog: { ...blog, tags: blog.tags.map((tag) => tag.id), categories: blog.categories.map((category) => category.id) }, setOpenedPage: () => {
            window.location.href = "/blog";
          } })
        ] })
      }
    )
  ] });
};
export {
  index as default
};
