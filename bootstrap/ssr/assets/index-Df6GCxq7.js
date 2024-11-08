import { jsxs, jsx, Fragment } from "react/jsx-runtime";
import { useState } from "react";
import { useColorModeValue, useBreakpointValue, Box, Breadcrumb, BreadcrumbItem, Text, SimpleGrid, Card as Card$1, CardHeader, Flex, Avatar, Heading, CardBody, Image, HStack } from "@chakra-ui/react";
import { C as Card } from "./Card-M0XrdzyB.js";
import { g as getSponsors } from "./use-request-DISTMCmE.js";
import { useQuery } from "react-query";
import { Link } from "@inertiajs/react";
import { Skeleton } from "@chakra-ui/skeleton";
import { U as UserLayout } from "./index-D7V5_Wy3.js";
import SeoHeader from "./SeoHeader-DxzDf-f4.js";
import CustomCKEditor from "./CustomCKEditor-dDDE0_xj.js";
import "../ssr.js";
import "react-dom/server";
import "@inertiajs/inertia-react";
import "@inertiajs/react/server";
import "@chakra-ui/theme-tools";
import "axios";
import "react-icons/fa";
import "./SearchBar-Dsk0VtlP.js";
import "@chakra-ui/icons";
import "./statics-GI0iJz3l.js";
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
const SponsorPage = ({ content }) => {
  const textColor = useColorModeValue("secondaryGray.900", "white");
  let secondaryText = useColorModeValue("gray.700", "white");
  const columnCount = useBreakpointValue({
    xs: 1,
    sm: 1,
    md: 2,
    lg: 3,
    xl: 4
  });
  const { data: sponsors = null, isLoading } = useQuery("sponsors", () => getSponsors(true), { staleTime: 3e5 });
  const blogCardBg = useColorModeValue("gray.200", "navy.900");
  const [sponsor, setSponsor] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  return /* @__PURE__ */ jsxs(UserLayout, { children: [
    /* @__PURE__ */ jsx(SeoHeader, { content, title: "Sponsors" }),
    /* @__PURE__ */ jsx(
      Card,
      {
        w: "100%",
        px: "0px",
        minH: "calc(100vh - 150px)",
        children: /* @__PURE__ */ jsxs(Box, { width: "100%", px: "25px", children: [
          /* @__PURE__ */ jsxs(Breadcrumb, { children: [
            /* @__PURE__ */ jsx(BreadcrumbItem, { color: secondaryText, fontSize: "sm", mb: "5px", children: /* @__PURE__ */ jsx(Link, { href: "/", children: "Home" }) }),
            /* @__PURE__ */ jsx(BreadcrumbItem, { color: secondaryText, fontSize: "sm", mb: "5px", onClick: () => {
              setIsOpen(false), setSponsor(null);
            }, children: /* @__PURE__ */ jsx(Link, { href: "/sponsor", children: "Sponsor" }) }),
            isOpen && sponsor && /* @__PURE__ */ jsx(BreadcrumbItem, { color: secondaryText, fontSize: "sm", mb: "5px", children: /* @__PURE__ */ jsx(Text, { children: sponsor.title }) })
          ] }),
          /* @__PURE__ */ jsx(
            Text,
            {
              as: "h1",
              color: textColor,
              fontSize: "22px",
              mb: "30px",
              fontWeight: "700",
              lineHeight: "100%",
              children: "Sponsor"
            }
          ),
          /* @__PURE__ */ jsx(CustomCKEditor, { content: content.content }),
          /* @__PURE__ */ jsx(SimpleGrid, { columns: columnCount, spacing: 4, children: sponsors ? sponsors.map((sponsor2, index) => /* @__PURE__ */ jsx("a", { href: sponsor2.link, target: "_blank", children: /* @__PURE__ */ jsxs(Card$1, { maxW: "md", bg: blogCardBg, children: [
            /* @__PURE__ */ jsx(CardHeader, { children: /* @__PURE__ */ jsx(Flex, { spacing: "4", children: /* @__PURE__ */ jsxs(Flex, { flex: "1", gap: "4", alignItems: "center", flexWrap: "wrap", children: [
              /* @__PURE__ */ jsx(
                Avatar,
                {
                  bg: "green.600",
                  name: sponsor2.name,
                  src: `storage/${sponsor2.logo_url}`
                }
              ),
              /* @__PURE__ */ jsx(Box, { children: /* @__PURE__ */ jsx(Heading, { size: "sm", children: sponsor2.name }) })
            ] }) }) }),
            /* @__PURE__ */ jsx(CardBody, { children: /* @__PURE__ */ jsx(Text, { children: sponsor2.description }) }),
            /* @__PURE__ */ jsx(
              Image,
              {
                h: "250px",
                w: "100%",
                borderRadius: "xl",
                objectFit: "cover",
                objectPosition: "center",
                transition: "transform 0.2s ease-out",
                _hover: { transform: "scale(1.02)" },
                src: `storage/${sponsor2.banner}?w=1400&auto=compression,format`,
                alt: sponsor2.name
              }
            )
          ] }, index) })) : /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsxs(HStack, { gap: "6", maxW: "xs", display: "flex", children: [
            /* @__PURE__ */ jsx(Skeleton, { height: "460px", borderRadius: "21px" }),
            /* @__PURE__ */ jsx(Skeleton, { height: "460px", borderRadius: "21px" }),
            /* @__PURE__ */ jsx(Skeleton, { height: "460px", borderRadius: "21px" })
          ] }) }) })
        ] })
      }
    )
  ] });
};
export {
  SponsorPage as default
};
