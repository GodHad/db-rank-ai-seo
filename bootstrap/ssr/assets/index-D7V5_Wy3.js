import { jsx, jsxs, Fragment } from "react/jsx-runtime";
import { useColorMode, Flex, Box, Container, Stack, useColorModeValue, Text, chakra, VisuallyHidden, Image, useDisclosure, Icon, Drawer, DrawerOverlay, DrawerContent, DrawerCloseButton, DrawerBody, Button, Menu, MenuButton, Avatar, MenuList, MenuItem, IconButton, HStack } from "@chakra-ui/react";
import { FaLinkedin } from "react-icons/fa";
import React__default, { useContext, useState, useMemo } from "react";
import { l as logo_black_text, a as logo, r as renderTrack, b as renderThumb, c as renderView, S as SearchBar } from "./SearchBar-Dsk0VtlP.js";
import { Link } from "@inertiajs/react";
import { CloseIcon, HamburgerIcon } from "@chakra-ui/icons";
import { Skeleton } from "@chakra-ui/skeleton";
import { F as FeaturedProductSidebarContext, U as UserContext } from "../ssr.js";
import { A as APP_URL } from "./statics-GI0iJz3l.js";
import { C as Card } from "./Card-M0XrdzyB.js";
import { Scrollbars } from "react-custom-scrollbars-2";
import PropTypes from "prop-types";
import { MdFavoriteBorder, MdAutoAwesome } from "react-icons/md";
import { IoMdMoon, IoMdSunny } from "react-icons/io";
import { Inertia } from "@inertiajs/inertia";
import axios from "axios";
import { g as getBanners } from "./use-request-CXEg0apC.js";
import { useQuery } from "react-query";
import Slider from "react-slick";
import LazyLoad from "react-lazyload";
function Logo() {
  const { colorMode } = useColorMode();
  return /* @__PURE__ */ jsx(Flex, { align: "center", direction: "column", children: /* @__PURE__ */ jsx(Link, { href: "/", "aria-label": "Go to homepage", children: /* @__PURE__ */ jsx(
    Box,
    {
      bg: `url(${colorMode === "light" ? logo_black_text : logo})`,
      bgSize: "cover",
      borderRadius: "16px",
      h: "100px",
      w: "100px"
    }
  ) }) });
}
const SocialButton = ({
  children,
  label,
  href
}) => {
  return /* @__PURE__ */ jsxs(
    chakra.button,
    {
      bg: useColorModeValue("blackAlpha.100", "whiteAlpha.100"),
      rounded: "full",
      w: 8,
      h: 8,
      cursor: "pointer",
      as: "a",
      href,
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      transition: "background 0.3s ease",
      _hover: {
        bg: useColorModeValue("blackAlpha.200", "whiteAlpha.200")
      },
      children: [
        /* @__PURE__ */ jsx(VisuallyHidden, { children: label }),
        children
      ]
    }
  );
};
function Footer() {
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsxs(
      Container,
      {
        className: "footer",
        as: Stack,
        maxW: "6xl",
        py: 4,
        spacing: 4,
        justify: "center",
        align: "center",
        children: [
          /* @__PURE__ */ jsx(Logo, {}),
          /* @__PURE__ */ jsxs(Stack, { direction: "row", spacing: 6, children: [
            /* @__PURE__ */ jsx(Link, { href: "/", children: "Home" }),
            /* @__PURE__ */ jsx(Link, { href: "/aboutus", children: "About us" }),
            /* @__PURE__ */ jsx(Link, { href: "/blog", children: "Blog" }),
            /* @__PURE__ */ jsx(Link, { href: "/contact-us", children: "Contact us" })
          ] })
        ]
      }
    ),
    /* @__PURE__ */ jsx(
      Box,
      {
        borderTopWidth: 1,
        borderStyle: "solid",
        borderColor: useColorModeValue("gray.200", "gray.700"),
        children: /* @__PURE__ */ jsxs(
          Container,
          {
            as: Stack,
            maxW: "6xl",
            py: 4,
            direction: { base: "column", md: "row" },
            spacing: 4,
            justify: { base: "center", md: "space-between" },
            align: { base: "center", md: "center" },
            children: [
              /* @__PURE__ */ jsx(Text, { children: "© DB Rank AI 2024" }),
              /* @__PURE__ */ jsxs(Text, { children: [
                "Powered by ",
                /* @__PURE__ */ jsx("a", { href: "http://massreach.co.uk/", target: "_blank", style: { color: "#2b6cb0" }, children: "Mass Reach" })
              ] }),
              /* @__PURE__ */ jsx(Stack, { direction: "row", spacing: 6, position: "relative", zIndex: 1e3, children: /* @__PURE__ */ jsx(SocialButton, { label: "LinkedIn", href: "https://linkedin.com/company/db-rank", children: /* @__PURE__ */ jsx(FaLinkedin, {}) }) })
            ]
          }
        )
      }
    )
  ] });
}
function SidebarContent() {
  const { featuredProducts } = useContext(FeaturedProductSidebarContext);
  const textColor = useColorModeValue("secondaryGray.900", "white");
  return /* @__PURE__ */ jsx(Flex, { direction: "column", height: "100%", px: "8px", position: "relative", children: /* @__PURE__ */ jsxs(Stack, { direction: "column", mb: "auto", mt: "8px", children: [
    /* @__PURE__ */ jsx(Flex, { px: "10px", mb: "8px", justifyContent: "space-between", align: "center", children: /* @__PURE__ */ jsx(
      Text,
      {
        color: textColor,
        fontSize: "20px",
        fontWeight: "700",
        lineHeight: "100%",
        children: "Featured Products"
      }
    ) }),
    /* @__PURE__ */ jsx(Box, { children: featuredProducts && featuredProducts.side ? featuredProducts.side.length > 0 ? featuredProducts.side.map((product, index) => /* @__PURE__ */ jsx(FeaturedProduct, { product }, index)) : /* @__PURE__ */ jsx(
      Text,
      {
        color: textColor,
        mb: "4px",
        align: "center",
        fontWeight: "700",
        lineHeight: "100%",
        children: "No featured products"
      }
    ) : /* @__PURE__ */ jsxs(Stack, { gap: "6", maxW: "xs", children: [
      /* @__PURE__ */ jsx(Skeleton, { height: "300px", borderRadius: "21px" }),
      /* @__PURE__ */ jsx(Skeleton, { height: "300px", borderRadius: "21px" }),
      /* @__PURE__ */ jsx(Skeleton, { height: "300px", borderRadius: "21px" })
    ] }) })
  ] }) });
}
function FeaturedProduct({ product }) {
  return /* @__PURE__ */ jsx("a", { href: product.link, target: "_blank", children: /* @__PURE__ */ jsxs(
    Box,
    {
      maxW: "445px",
      w: "full",
      bg: useColorModeValue("white", "navy.800"),
      boxShadow: "2xl",
      rounded: "md",
      p: 6,
      mb: 5,
      overflow: "hidden",
      children: [
        /* @__PURE__ */ jsx(Box, { bg: "navy.700", mt: -6, mx: -6, mb: 6, pos: "relative", children: /* @__PURE__ */ jsx(
          Image,
          {
            src: APP_URL + `storage/${product.banner}`,
            w: "100%",
            h: "100px",
            alt: "banner",
            borderRadius: "xl",
            objectFit: "cover",
            objectPosition: "center",
            transition: "transform 0.2s ease-out",
            _hover: { transform: "scale(1.02)" }
          }
        ) }),
        /* @__PURE__ */ jsx(Stack, { children: /* @__PURE__ */ jsx(Text, { textAlign: "center", color: "gray.500", dangerouslySetInnerHTML: { __html: product.content } }) })
      ]
    }
  ) });
}
function FeaturedProductsSidebar() {
  let variantChange = "0.2s linear";
  let shadow = useColorModeValue(
    "14px 17px 40px 4px rgba(112, 144, 176, 0.08)",
    "unset"
  );
  let sidebarMargins = "0px";
  const borderColor = useColorModeValue("gray.200", "whiteAlpha.100");
  return /* @__PURE__ */ jsx(
    Box,
    {
      display: { lg: "block", base: "none" },
      position: "relative",
      top: `${30}px`,
      right: 2,
      overflow: "auto",
      mb: "50px",
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
      borderRadius: "30px",
      children: /* @__PURE__ */ jsx(
        Card,
        {
          transition: variantChange,
          w: "300px",
          m: sidebarMargins,
          float: "right",
          boxShadow: shadow,
          children: /* @__PURE__ */ jsx(SidebarContent, {})
        }
      )
    }
  );
}
function FeaturedProductsSidebarResponsive() {
  let sidebarBackgroundColor = useColorModeValue("white", "navy.800");
  let menuColor = useColorModeValue("gray.400", "white");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React__default.useRef();
  return /* @__PURE__ */ jsxs(Flex, { display: { sm: "flex", lg: "none" }, alignItems: "center", children: [
    /* @__PURE__ */ jsx(Flex, { ref: btnRef, w: "max-content", h: "max-content", onClick: onOpen, children: /* @__PURE__ */ jsx(
      Icon,
      {
        as: MdFavoriteBorder,
        color: menuColor,
        my: "auto",
        w: "20px",
        h: "20px",
        me: "10px",
        _hover: { cursor: "pointer" }
      }
    ) }),
    /* @__PURE__ */ jsxs(
      Drawer,
      {
        isOpen,
        onClose,
        placement: "right",
        finalFocusRef: btnRef,
        children: [
          /* @__PURE__ */ jsx(DrawerOverlay, {}),
          /* @__PURE__ */ jsxs(DrawerContent, { w: "285px", maxW: "285px", bg: sidebarBackgroundColor, children: [
            /* @__PURE__ */ jsx(
              DrawerCloseButton,
              {
                zIndex: "3",
                onClose,
                _focus: { boxShadow: "none" },
                _hover: { boxShadow: "none" }
              }
            ),
            /* @__PURE__ */ jsx(DrawerBody, { maxW: "285px", px: "0rem", pb: "0", children: /* @__PURE__ */ jsx(
              Scrollbars,
              {
                autoHide: true,
                renderTrackVertical: renderTrack,
                renderThumbVertical: renderThumb,
                renderView,
                children: /* @__PURE__ */ jsx(SidebarContent, {})
              }
            ) })
          ] })
        ]
      }
    )
  ] });
}
FeaturedProductsSidebar.propTypes = {
  logoText: PropTypes.string,
  routes: PropTypes.arrayOf(PropTypes.object),
  variant: PropTypes.string
};
function HeaderLinks(props) {
  const { secondary } = props;
  const { colorMode, toggleColorMode } = useColorMode();
  const navbarIcon = useColorModeValue("gray.400", "white");
  const shadow = useColorModeValue(
    "14px 17px 40px 4px rgba(112, 144, 176, 0.18)",
    "14px 17px 40px 4px rgba(112, 144, 176, 0.06)"
  );
  const textColor = useColorModeValue("secondaryGray.900", "white");
  const borderColor = useColorModeValue("#E6ECFA", "rgba(135, 140, 189, 0.3)");
  const menuBg = useColorModeValue("white", "navy.800");
  const { user, setUser } = useContext(UserContext);
  const handleLogout = async () => {
    if (typeof window === "undefined") return;
    await axios.get("/api/logout");
    Inertia.visit("/");
    setUser(null);
  };
  return /* @__PURE__ */ jsxs(
    Flex,
    {
      w: { sm: "100%", md: "auto" },
      alignItems: "center",
      flexDirection: "row",
      flexWrap: secondary ? { base: "wrap", md: "nowrap" } : "unset",
      p: "10px",
      borderRadius: "30px",
      children: [
        /* @__PURE__ */ jsx(
          SearchBar,
          {
            mb: () => {
              if (secondary) {
                return { base: "10px", md: "unset" };
              }
              return "unset";
            },
            me: "10px",
            borderRadius: "30px"
          }
        ),
        /* @__PURE__ */ jsx(
          Button,
          {
            variant: "no-hover",
            bg: "transparent",
            p: "0px",
            minW: "unset",
            minH: "unset",
            h: "18px",
            w: "max-content",
            "aria-label": "Toggle Color Mode button",
            onClick: toggleColorMode,
            children: /* @__PURE__ */ jsx(
              Icon,
              {
                me: "10px",
                h: "18px",
                w: "18px",
                color: navbarIcon,
                as: colorMode === "light" ? IoMdMoon : IoMdSunny
              }
            )
          }
        ),
        /* @__PURE__ */ jsx(FeaturedProductsSidebarResponsive, {}),
        user && /* @__PURE__ */ jsxs(Menu, { children: [
          /* @__PURE__ */ jsx(MenuButton, { p: "0px", children: /* @__PURE__ */ jsx(
            Avatar,
            {
              _hover: { cursor: "pointer" },
              color: "white",
              name: user ? user.name : "",
              bg: "#11047A",
              size: "sm",
              w: "40px",
              h: "40px"
            }
          ) }),
          /* @__PURE__ */ jsxs(
            MenuList,
            {
              boxShadow: shadow,
              p: "0px",
              mt: "10px",
              borderRadius: "20px",
              bg: menuBg,
              border: "none",
              position: "relative",
              zIndex: 1e3,
              children: [
                /* @__PURE__ */ jsxs(Flex, { w: "100%", mb: "0px", flexDir: "column", borderBottom: "1px solid", borderColor, children: [
                  /* @__PURE__ */ jsxs(
                    Text,
                    {
                      ps: "20px",
                      pt: "16px",
                      pb: "10px",
                      w: "100%",
                      fontSize: "sm",
                      fontWeight: "700",
                      color: textColor,
                      children: [
                        "👋  Hey, ",
                        user.name
                      ]
                    }
                  ),
                  /* @__PURE__ */ jsx(Link, { href: "/profile", children: /* @__PURE__ */ jsx(
                    MenuItem,
                    {
                      _hover: { bg: "none" },
                      _focus: { bg: "none" },
                      bg: "transparent",
                      borderRadius: "8px",
                      ps: "20px",
                      pb: "10px",
                      children: /* @__PURE__ */ jsx(Text, { fontSize: "sm", children: "Profile" })
                    }
                  ) })
                ] }),
                /* @__PURE__ */ jsx(Flex, { flexDirection: "column", p: "10px", children: /* @__PURE__ */ jsx(
                  MenuItem,
                  {
                    _hover: { bg: "none" },
                    _focus: { bg: "none" },
                    bg: "transparent",
                    color: "red.400",
                    borderRadius: "8px",
                    px: "14px",
                    onClick: handleLogout,
                    children: /* @__PURE__ */ jsx(Text, { fontSize: "sm", children: "Log out" })
                  }
                ) })
              ]
            }
          )
        ] })
      ]
    }
  );
}
HeaderLinks.propTypes = {
  variant: PropTypes.string,
  fixed: PropTypes.bool,
  secondary: PropTypes.bool,
  onOpen: PropTypes.func
};
const routes = [
  {
    name: "Data Explorer",
    path: "/explorer"
  },
  {
    name: "Home",
    path: "/home"
  },
  {
    name: "DBMS Ranking",
    path: "/ranking"
  },
  {
    name: "DBMS",
    path: "/dbms"
  },
  {
    name: "Encyclopedia",
    path: "/encyclopedia"
  },
  {
    name: "Blog",
    path: "/blog"
  },
  {
    name: "Sponsors",
    path: "/sponsors"
  },
  {
    name: "Services",
    path: "/services"
  }
];
const settings = {
  dots: true,
  arrows: false,
  fade: true,
  infinite: true,
  autoplay: true,
  speed: 500,
  autoplaySpeed: 3e3,
  slidesToShow: 1,
  slidesToScroll: 1
};
const NavLink = ({ _route, onClose }) => {
  const bg = useColorModeValue("gray.200", "gray.700");
  let activeIcon = useColorModeValue("brand.500", "white");
  let textColor = useColorModeValue("secondaryGray.500", "white");
  return _route.name !== "Data Explorer" ? /* @__PURE__ */ jsx(Link, { href: _route.path, children: /* @__PURE__ */ jsx(
    Box,
    {
      px: 3,
      py: 4,
      rounded: "md",
      bg: typeof window !== "undefined" && window.location.pathname.startsWith(_route.path) ? bg : "transparent",
      _hover: {
        textDecoration: "none",
        bg
      },
      onClick: onClose,
      children: _route.name
    }
  ) }) : /* @__PURE__ */ jsx(Link, { href: _route.path, children: /* @__PURE__ */ jsxs(
    Flex,
    {
      alignItems: "center",
      justifyContent: "center",
      bg: typeof window !== "undefined" && window.location.pathname.startsWith(_route.path) ? bg : "transparent",
      _hover: {
        textDecoration: "none",
        bg,
        color: "white"
      },
      rounded: "md",
      px: 3,
      py: 3,
      onClick: onClose,
      children: [
        /* @__PURE__ */ jsx(
          Box,
          {
            color: typeof window !== "undefined" && window.location.pathname.includes("explorer") ? activeIcon : textColor,
            me: "8px",
            children: /* @__PURE__ */ jsx(
              Flex,
              {
                borderRadius: "full",
                justify: "center",
                align: "center",
                h: "30px",
                minH: "30px",
                minW: "30px",
                bgGradient: "linear(to-r, #2ac349, #018cc1)",
                children: /* @__PURE__ */ jsx(
                  Icon,
                  {
                    as: MdAutoAwesome,
                    width: "20px",
                    height: "20px",
                    color: "white"
                  }
                )
              }
            )
          }
        ),
        /* @__PURE__ */ jsx(Box, { children: _route.name })
      ]
    }
  ) });
};
function Navbar(props) {
  const [slider, setSlider] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { featuredProducts } = useContext(FeaturedProductSidebarContext);
  const textColor = useColorModeValue("secondaryGray.900", "white");
  const { data: banners } = useQuery("banners", getBanners, { staleTime: 1e5 });
  const topBanners = useMemo(() => {
    return banners ? banners.filter((banner) => banner.type === 0) : [];
  }, [banners]);
  let navbarBg = useColorModeValue("rgba(244, 247, 254, 0.2)", "rgba(11,20,55,0.5)");
  const { user } = useContext(UserContext);
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(Box, { bg: navbarBg, px: 4, my: "10px", children: /* @__PURE__ */ jsxs(Flex, { w: "100%", display: "flex", flexDir: { base: "column", sm: "column", lg: "row" }, alignItems: "center", justifyContent: "center", children: [
      /* @__PURE__ */ jsx(Box, { position: { base: "block", lg: "absolute" }, left: "4", children: /* @__PURE__ */ jsx(Logo, {}) }),
      /* @__PURE__ */ jsxs(Box, { position: "relative", height: "90px", maxW: "728px", width: { base: "90%", lg: "80%" }, overflow: "hidden", children: [
        /* @__PURE__ */ jsx(
          "link",
          {
            rel: "stylesheet",
            type: "text/css",
            href: "https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css"
          }
        ),
        /* @__PURE__ */ jsx(
          "link",
          {
            rel: "stylesheet",
            type: "text/css",
            href: "https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css"
          }
        ),
        topBanners && /* @__PURE__ */ jsx(Slider, { ...settings, ref: (slider2) => setSlider(slider2), children: topBanners.map((image, index) => /* @__PURE__ */ jsx(Link, { href: image.link, target: "_blank", style: { display: "flex", justifyContent: "center" }, children: /* @__PURE__ */ jsx(
          Image,
          {
            mb: 5,
            mx: "auto",
            height: "90px",
            maxW: "100%",
            width: "auto",
            borderRadius: "xl",
            objectFit: "cover",
            objectPosition: "center",
            srcSet: `${APP_URL}storage/${image.url}?w=600&auto=format 600w,
                                 ${APP_URL}storage/${image.url}?w=1200&auto=format 1200w,
                                 ${APP_URL}storage/${image.url}?w=1400&auto=format 1400w`,
            sizes: "(max-width: 600px) 100vw, (max-width: 1200px) 50vw, 33vw",
            src: `${APP_URL}storage/${image.url}?w=1400&auto=compression,format`,
            alt: image.url
          }
        ) }, image.id + image.url)) })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxs(Box, { bg: navbarBg, px: 4, children: [
      /* @__PURE__ */ jsxs(Flex, { w: "100%", h: 16, alignItems: "center", justifyContent: "space-between", children: [
        /* @__PURE__ */ jsx(
          IconButton,
          {
            size: "md",
            icon: isOpen ? /* @__PURE__ */ jsx(CloseIcon, {}) : /* @__PURE__ */ jsx(HamburgerIcon, {}),
            "aria-label": "Open Menu",
            display: { lg: "none" },
            onClick: isOpen ? onClose : onOpen
          }
        ),
        /* @__PURE__ */ jsx(HStack, { alignItems: "center", fontWeight: 700, children: /* @__PURE__ */ jsxs(HStack, { display: { base: "none", lg: "flex" }, children: [
          routes.map((_route, index) => /* @__PURE__ */ jsx(NavLink, { _route, onClose }, _route.path + index)),
          !user && /* @__PURE__ */ jsx(NavLink, { _route: { path: "/sign-in", name: "Login" }, onClose })
        ] }) }),
        /* @__PURE__ */ jsx(Flex, { alignItems: "center", children: /* @__PURE__ */ jsx(Box, { ms: "auto", w: { sm: "100%", md: "unset" }, children: /* @__PURE__ */ jsx(
          HeaderLinks,
          {
            onOpen: props.onOpen,
            logoText: props.logoText,
            secondary: props.secondary,
            fixed: props.fixed
          }
        ) }) })
      ] }),
      isOpen ? /* @__PURE__ */ jsx(Box, { pb: 4, display: { lg: "none" }, children: /* @__PURE__ */ jsxs(Stack, { as: "nav", spacing: 4, children: [
        routes.map((_route, index) => /* @__PURE__ */ jsx(NavLink, { _route, onClose }, _route.path + index)),
        !user && /* @__PURE__ */ jsx(NavLink, { _route: { path: "/sign-in", name: "Login" }, onClose })
      ] }) }) : null
    ] }),
    /* @__PURE__ */ jsx(Box, { bg: navbarBg, px: 4, children: /* @__PURE__ */ jsx(Flex, { w: "100%", h: 16, alignItems: "center", justifyContent: "center", children: /* @__PURE__ */ jsxs(HStack, { alignItems: "center", flexDir: { base: "column", "2sm": "row" }, children: [
      /* @__PURE__ */ jsx(Text, { color: textColor, fontSize: { md: "20px", "2sm": "16px", base: "14px" }, fontWeight: { md: "extrabold", "2sm": "semibold", base: "bold" }, mr: { base: 2, md: 4 }, children: "Featured Products:" }),
      /* @__PURE__ */ jsx(HStack, { children: featuredProducts && featuredProducts.top ? featuredProducts.top.map((product, index) => /* @__PURE__ */ jsx(Link, { href: product.link, target: "_blank", children: /* @__PURE__ */ jsx(
        Text,
        {
          mr: { base: 2, md: 4 },
          fontSize: { md: "20px", "2sm": "16px", base: "14px" },
          color: "blue.500",
          textDecor: "underline",
          children: product.title
        }
      ) }, product.title + index)) : /* @__PURE__ */ jsx(Skeleton, { height: "20px", maxW: "md", w: "120px" }) })
    ] }) }) })
  ] });
}
function UserLayout(props) {
  const { children, ...rest } = props;
  const [fixed] = useState(false);
  const getActiveRoute = (routes2) => {
    let activeRoute = "DB Rank AI";
    if (typeof window === "undefined") return activeRoute;
    for (let i = 0; i < routes2.length; i++) {
      if (routes2[i].collapse) {
        let collapseActiveRoute = getActiveRoute(routes2[i].items);
        if (collapseActiveRoute !== activeRoute) {
          return collapseActiveRoute;
        }
      } else if (routes2[i].category) {
        let categoryActiveRoute = getActiveRoute(routes2[i].items);
        if (categoryActiveRoute !== activeRoute) {
          return categoryActiveRoute;
        }
      } else {
        if (window.location.pathname.indexOf(routes2[i].path) !== -1) {
          return routes2[i].name;
        }
      }
    }
    return activeRoute;
  };
  const getActiveNavbar = (routes2) => {
    let activeNavbar = false;
    if (typeof window === "undefined") return activeNavbar;
    for (let i = 0; i < routes2.length; i++) {
      if (routes2[i].collapse) {
        let collapseActiveNavbar = getActiveNavbar(routes2[i].items);
        if (collapseActiveNavbar !== activeNavbar) {
          return collapseActiveNavbar;
        }
      } else if (routes2[i].category) {
        let categoryActiveNavbar = getActiveNavbar(routes2[i].items);
        if (categoryActiveNavbar !== activeNavbar) {
          return categoryActiveNavbar;
        }
      } else {
        if (window.location.pathname.indexOf(routes2[i].path) !== -1) {
          return routes2[i].secondary;
        }
      }
    }
    return activeNavbar;
  };
  const getActiveNavbarText = (routes2) => {
    let activeNavbar = false;
    if (typeof window === "undefined") return activeNavbar;
    for (let i = 0; i < routes2.length; i++) {
      if (routes2[i].collapse) {
        let collapseActiveNavbar = getActiveNavbarText(routes2[i].items);
        if (collapseActiveNavbar !== activeNavbar) {
          return collapseActiveNavbar;
        }
      } else if (routes2[i].category) {
        let categoryActiveNavbar = getActiveNavbarText(routes2[i].items);
        if (categoryActiveNavbar !== activeNavbar) {
          return categoryActiveNavbar;
        }
      } else {
        if (window.location.pathname.indexOf(routes2[i].path) !== -1) {
          return routes2[i].messageNavbar;
        }
      }
    }
    return activeNavbar;
  };
  const { onOpen } = useDisclosure();
  const { data: banners } = useQuery("banners", getBanners, { staleTime: 1e5 });
  const bottomBanners = useMemo(() => {
    return banners ? banners.filter((banner) => banner.type === 1) : [];
  }, [banners]);
  return /* @__PURE__ */ jsx(Box, { children: /* @__PURE__ */ jsxs(
    Box,
    {
      float: "right",
      minHeight: "100vh",
      height: "100%",
      overflow: "hidden",
      position: "relative",
      maxHeight: "100%",
      w: "100%",
      maxWidth: "100%",
      transition: "all 0.33s cubic-bezier(0.685, 0.0473, 0.346, 1)",
      transitionDuration: ".2s, .2s, .35s",
      transitionProperty: "top, bottom, width",
      transitionTimingFunction: "linear, linear, ease",
      children: [
        typeof window !== "undefined" && /* @__PURE__ */ jsx(
          Navbar,
          {
            onOpen,
            logoText: "DB Rank AI",
            brandText: getActiveRoute(routes),
            secondary: getActiveNavbar(routes),
            message: getActiveNavbarText(routes),
            fixed,
            ...rest
          }
        ),
        /* @__PURE__ */ jsxs(
          Box,
          {
            mx: "auto",
            p: { base: "20px", md: "30px" },
            pe: "20px",
            w: { base: "100%", lg: "calc( 100% - 290px )" },
            maxWidth: { base: "100%", lg: "calc( 100% - 290px )" },
            float: "left",
            position: "relative",
            zIndex: 101,
            children: [
              children,
              /* @__PURE__ */ jsx(Box, { width: "full", children: typeof window !== "undefined" && window.location.pathname === "/" && bottomBanners.map((image, index) => /* @__PURE__ */ jsx("a", { href: image.link, target: "_blank", style: { display: "flex", justifyContent: "center", width: "100%" }, children: /* @__PURE__ */ jsx(LazyLoad, { height: "90px", offset: 300, children: /* @__PURE__ */ jsx(
                Image,
                {
                  mb: 5,
                  h: "auto",
                  maxH: "90px",
                  maxW: "728px",
                  w: "100%",
                  borderRadius: "xl",
                  src: `${APP_URL}storage/${image.url}`,
                  alt: image.url
                }
              ) }) }, image.id + image.url)) }),
              /* @__PURE__ */ jsx(Footer, {})
            ]
          }
        ),
        /* @__PURE__ */ jsx(FeaturedProductsSidebar, { display: "none", ...rest })
      ]
    }
  ) });
}
export {
  UserLayout as U
};
