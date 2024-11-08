import { jsxs, jsx, Fragment } from "react/jsx-runtime";
import { useColorModeValue, Box, Flex, Text, SimpleGrid, Image, Heading, Avatar, Tag } from "@chakra-ui/react";
import { useQuery } from "react-query";
import moment from "moment";
import { ArrowRightIcon } from "@chakra-ui/icons";
import { C as Card } from "./Card-M0XrdzyB.js";
import { g as getRecentlyBlogs } from "./use-request-DSS9fKx4.js";
import { Skeleton } from "@chakra-ui/skeleton";
import { Link } from "@inertiajs/react";
import "../ssr.js";
import "react-dom/server";
import "@inertiajs/inertia-react";
import "@inertiajs/react/server";
import "@chakra-ui/theme-tools";
import "react";
import "axios";
function generateSlug(title) {
  return title.toLowerCase().trim().replace(/[\s\W-]+/g, "-").replace(/^-+|-+$/g, "");
}
const RecentBlogs = () => {
  const textColor = useColorModeValue("secondaryGray.900", "white");
  const blogCardBg = useColorModeValue("gray.200", "navy.900");
  const { data: blogs, isLoadingBlog } = useQuery("blogs", getRecentlyBlogs, { staleTime: 3e5 });
  return /* @__PURE__ */ jsxs(
    Box,
    {
      flexDirection: "column",
      w: "100%",
      px: "10px",
      children: [
        /* @__PURE__ */ jsx(Flex, { px: "25px", mb: "8px", justifyContent: "space-between", align: "center", children: /* @__PURE__ */ jsx(
          Text,
          {
            color: textColor,
            fontSize: { md: "22px", "2sm": "18px", base: "16px" },
            mb: "4px",
            fontWeight: "700",
            lineHeight: "100%",
            children: "Recently Blogs"
          }
        ) }),
        /* @__PURE__ */ jsx(SimpleGrid, { columns: { base: 1, lg: 3 }, gap: "20px", mb: "20px", justifyContent: "center", children: !blogs || isLoadingBlog ? /* @__PURE__ */ jsxs(Fragment, { children: [
          /* @__PURE__ */ jsx(Box, { maxW: "xs", display: "flex", gap: 8, justifyContent: "space-between", children: /* @__PURE__ */ jsx(Skeleton, { width: "400px", height: "460px", borderRadius: "21px" }) }),
          /* @__PURE__ */ jsx(Box, { maxW: "xs", display: "flex", gap: 8, justifyContent: "space-between", children: /* @__PURE__ */ jsx(Skeleton, { width: "400px", height: "460px", borderRadius: "21px" }) }),
          /* @__PURE__ */ jsx(Box, { maxW: "xs", display: "flex", gap: 8, justifyContent: "space-between", children: /* @__PURE__ */ jsx(Skeleton, { width: "400px", height: "460px", borderRadius: "21px" }) })
        ] }) : blogs.data.length > 0 ? blogs.data.map((blog, index) => !blog ? /* @__PURE__ */ jsx(Fragment, {}) : /* @__PURE__ */ jsx(Link, { href: `/blog/${generateSlug(blog.title)}`, children: /* @__PURE__ */ jsxs(Card, { h: "100%", display: "flex", flexDir: "column", justifyContent: "space-between", mb: "10px", bg: blogCardBg, children: [
          /* @__PURE__ */ jsxs(Box, { children: [
            /* @__PURE__ */ jsx(
              Image,
              {
                mb: 5,
                h: "200px",
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
                fontSize: { md: "21px", "2sm": "19px", base: "16px" },
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
        ] }) }, index)) : /* @__PURE__ */ jsx(
          Text,
          {
            color: textColor,
            mb: "4px",
            align: "center",
            fontWeight: "700",
            lineHeight: "100%",
            children: "No recently blogs"
          }
        ) })
      ]
    }
  );
};
export {
  RecentBlogs as default
};
