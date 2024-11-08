import { jsx, jsxs, Fragment } from "react/jsx-runtime";
import { useColorModeValue, useColorMode, Flex, Box, Text, HStack, Stack, useDisclosure, Icon, Drawer, DrawerOverlay, DrawerContent, DrawerCloseButton, DrawerBody, Button, Menu, MenuButton, Avatar, MenuList, MenuItem, Breadcrumb, BreadcrumbItem, BreadcrumbLink, Link as Link$1, Portal } from "@chakra-ui/react";
import React__default, { useContext, useState, useEffect, createContext } from "react";
import PropTypes from "prop-types";
import { Link } from "@inertiajs/react";
import { l as logo_black_text, a as logo, r as renderTrack, b as renderThumb, c as renderView, S as SearchBar } from "./SearchBar-Dsk0VtlP.js";
import { Scrollbars } from "react-custom-scrollbars-2";
import { IoMenuOutline } from "react-icons/io5";
import { IoMdMoon, IoMdSunny } from "react-icons/io";
import { FaEthereum } from "react-icons/fa";
import { MdOutlineImage, MdPersonOutline, MdOutlineStorage, MdTranslate, MdOutlineCommentBank, MdAttachMoney, MdOutlineFavoriteBorder, MdSearch, MdOutlineQuestionAnswer, MdLockOutline } from "react-icons/md";
import { U as UserContext } from "../ssr.js";
import { Inertia } from "@inertiajs/inertia";
import axios from "axios";
function Footer() {
  useColorModeValue("gray.400", "white");
  useColorMode();
  return /* @__PURE__ */ jsx(
    Flex,
    {
      zIndex: "3",
      flexDirection: {
        base: "column",
        xl: "row"
      },
      alignItems: {
        base: "center",
        xl: "start"
      },
      justifyContent: "space-between",
      px: { base: "30px", md: "50px" },
      pb: "30px"
    }
  );
}
const HSeparator = (props) => {
  const { variant, children, ...rest } = props;
  return /* @__PURE__ */ jsx(Flex, { h: "1px", w: "100%", bg: "rgba(135, 140, 189, 0.3)", ...rest });
};
function SidebarBrand() {
  const { colorMode } = useColorMode();
  return /* @__PURE__ */ jsxs(Flex, { align: "center", direction: "column", children: [
    /* @__PURE__ */ jsx(Link, { href: "/", children: /* @__PURE__ */ jsx(
      Box,
      {
        bg: `url(${colorMode === "light" ? logo_black_text : logo})`,
        bgSize: "cover",
        borderRadius: "16px",
        h: "175px",
        w: "175px",
        my: "32px"
      }
    ) }),
    /* @__PURE__ */ jsx(HSeparator, { mb: "20px" })
  ] });
}
function SidebarLinks(props) {
  let activeColor = useColorModeValue("gray.700", "white");
  let inactiveColor = useColorModeValue(
    "secondaryGray.600",
    "secondaryGray.600"
  );
  let activeIcon = useColorModeValue("brand.500", "white");
  let textColor = useColorModeValue("secondaryGray.500", "white");
  let brandColor = useColorModeValue("brand.500", "brand.400");
  const { routes: routes2 } = props;
  const activeRoute = (routeName) => {
    if (typeof window === "undefined") return false;
    return window.location.pathname.includes(routeName);
  };
  const createLinks = (routes22) => {
    return routes22.map((route, index) => {
      if (route.category) {
        return /* @__PURE__ */ jsxs(Fragment, { children: [
          /* @__PURE__ */ jsx(
            Text,
            {
              fontSize: "md",
              color: activeColor,
              fontWeight: "bold",
              mx: "auto",
              ps: {
                sm: "10px",
                xl: "16px"
              },
              pt: "18px",
              pb: "12px",
              children: route.name
            },
            index
          ),
          createLinks(route.items)
        ] });
      } else if (route.layout === "/admin") {
        return /* @__PURE__ */ jsx(Link, { href: route.layout + route.path, children: route.icon ? /* @__PURE__ */ jsx(Box, { children: /* @__PURE__ */ jsxs(
          HStack,
          {
            spacing: activeRoute(route.path.toLowerCase()) ? "22px" : "26px",
            py: "5px",
            ps: "10px",
            children: [
              /* @__PURE__ */ jsxs(Flex, { w: "100%", alignItems: "center", justifyContent: "center", children: [
                /* @__PURE__ */ jsx(
                  Box,
                  {
                    color: activeRoute(route.path.toLowerCase()) ? activeIcon : textColor,
                    me: "18px",
                    children: route.icon
                  }
                ),
                /* @__PURE__ */ jsx(
                  Text,
                  {
                    me: "auto",
                    color: activeRoute(route.path.toLowerCase()) ? activeColor : textColor,
                    fontWeight: activeRoute(route.path.toLowerCase()) ? "bold" : "normal",
                    children: route.name
                  }
                )
              ] }),
              /* @__PURE__ */ jsx(
                Box,
                {
                  h: "36px",
                  w: "4px",
                  bg: activeRoute(route.path.toLowerCase()) ? brandColor : "transparent",
                  borderRadius: "5px"
                }
              )
            ]
          }
        ) }) : /* @__PURE__ */ jsx(Box, { children: /* @__PURE__ */ jsxs(
          HStack,
          {
            spacing: activeRoute(route.path.toLowerCase()) ? "22px" : "26px",
            py: "5px",
            ps: "10px",
            children: [
              /* @__PURE__ */ jsx(
                Text,
                {
                  me: "auto",
                  color: activeRoute(route.path.toLowerCase()) ? activeColor : inactiveColor,
                  fontWeight: activeRoute(route.path.toLowerCase()) ? "bold" : "normal",
                  children: route.name
                }
              ),
              /* @__PURE__ */ jsx(Box, { h: "36px", w: "4px", bg: "brand.400", borderRadius: "5px" })
            ]
          }
        ) }) }, index);
      }
    });
  };
  return createLinks(routes2);
}
function SidebarContent(props) {
  const { routes: routes2 } = props;
  return /* @__PURE__ */ jsxs(Flex, { direction: "column", height: "100%", pt: "25px", px: "16px", borderRadius: "30px", children: [
    /* @__PURE__ */ jsx(SidebarBrand, {}),
    /* @__PURE__ */ jsx(Stack, { direction: "column", mb: "auto", mt: "8px", children: /* @__PURE__ */ jsx(Box, { ps: "20px", pe: { md: "16px", "2xl": "1px" }, children: /* @__PURE__ */ jsx(SidebarLinks, { routes: routes2 }) }) })
  ] });
}
function Sidebar(props) {
  const { routes: routes2 } = props;
  let variantChange = "0.2s linear";
  let shadow = useColorModeValue(
    "14px 17px 40px 4px rgba(112, 144, 176, 0.08)",
    "unset"
  );
  let sidebarBg = useColorModeValue("white", "navy.800");
  let sidebarMargins = "0px";
  return /* @__PURE__ */ jsx(Box, { display: { sm: "none", xl: "block" }, w: "100%", position: "fixed", minH: "100%", children: /* @__PURE__ */ jsx(
    Box,
    {
      bg: sidebarBg,
      transition: variantChange,
      w: "300px",
      h: "100vh",
      m: sidebarMargins,
      minH: "100%",
      overflowX: "hidden",
      boxShadow: shadow,
      children: /* @__PURE__ */ jsx(
        Scrollbars,
        {
          autoHide: true,
          renderTrackVertical: renderTrack,
          renderThumbVertical: renderThumb,
          renderView,
          children: /* @__PURE__ */ jsx(SidebarContent, { routes: routes2 })
        }
      )
    }
  ) });
}
function SidebarResponsive(props) {
  let sidebarBackgroundColor = useColorModeValue("white", "navy.800");
  let menuColor = useColorModeValue("gray.400", "white");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React__default.useRef();
  const { routes: routes2 } = props;
  return /* @__PURE__ */ jsxs(Flex, { display: { sm: "flex", xl: "none" }, alignItems: "center", children: [
    /* @__PURE__ */ jsx(Flex, { ref: btnRef, w: "max-content", h: "max-content", onClick: onOpen, children: /* @__PURE__ */ jsx(
      Icon,
      {
        as: IoMenuOutline,
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
        placement: "left",
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
                children: /* @__PURE__ */ jsx(SidebarContent, { routes: routes2 })
              }
            ) })
          ] })
        ]
      }
    )
  ] });
}
Sidebar.propTypes = {
  logoText: PropTypes.string,
  routes: PropTypes.arrayOf(PropTypes.object),
  variant: PropTypes.string
};
const routes = [
  {
    name: "Banners",
    layout: "/admin",
    path: "/banner",
    icon: /* @__PURE__ */ jsx(Icon, { as: MdOutlineImage, width: "20px", height: "20px", color: "inherit" })
  },
  {
    name: "Vendors",
    layout: "/admin",
    path: "/vendors",
    icon: /* @__PURE__ */ jsx(Icon, { as: MdPersonOutline, width: "20px", height: "20px", color: "inherit" })
  },
  {
    name: "DBMS",
    layout: "/admin",
    path: "/default",
    icon: /* @__PURE__ */ jsx(Icon, { as: MdOutlineStorage, width: "20px", height: "20px", color: "inherit" })
  },
  {
    name: "Encyclopedias",
    layout: "/admin",
    path: "/encyclopedia",
    icon: /* @__PURE__ */ jsx(Icon, { as: MdTranslate, width: "20px", height: "20px", color: "inherit" })
  },
  {
    name: "Blogs",
    layout: "/admin",
    path: "/blog",
    icon: /* @__PURE__ */ jsx(Icon, { as: MdOutlineCommentBank, width: "20px", height: "20px", color: "inherit" })
  },
  {
    name: "Sponsors",
    layout: "/admin",
    path: "/sponsor",
    icon: /* @__PURE__ */ jsx(Icon, { as: MdAttachMoney, width: "20px", height: "20px", color: "inherit" })
  },
  {
    name: "Featured Products",
    layout: "/admin",
    path: "/featured-products",
    icon: /* @__PURE__ */ jsx(Icon, { as: MdOutlineFavoriteBorder, width: "20px", height: "20px", color: "inherit" })
  },
  {
    name: "Meta Data",
    layout: "/admin",
    path: "/meta-data",
    icon: /* @__PURE__ */ jsx(Icon, { as: MdSearch, width: "20px", height: "20px", color: "inherit" })
  },
  {
    name: "Suggested Questions",
    layout: "/admin",
    path: "/suggested-questions",
    icon: /* @__PURE__ */ jsx(Icon, { as: MdOutlineQuestionAnswer, width: "20px", height: "20px", color: "inherit" })
  },
  {
    name: "Sign In",
    path: "sign-in",
    icon: /* @__PURE__ */ jsx(Icon, { as: MdLockOutline, width: "20px", height: "20px", color: "inherit" })
  }
];
function HeaderLinks(props) {
  const { user, setUser } = useContext(UserContext);
  const { secondary } = props;
  const { colorMode, toggleColorMode } = useColorMode();
  const navbarIcon = useColorModeValue("gray.400", "white");
  let menuBg = useColorModeValue("white", "navy.800");
  const textColor = useColorModeValue("secondaryGray.900", "white");
  const ethColor = useColorModeValue("gray.700", "white");
  const borderColor = useColorModeValue("#E6ECFA", "rgba(135, 140, 189, 0.3)");
  const ethBg = useColorModeValue("secondaryGray.300", "navy.900");
  const ethBox = useColorModeValue("white", "navy.800");
  const shadow = useColorModeValue(
    "14px 17px 40px 4px rgba(112, 144, 176, 0.18)",
    "14px 17px 40px 4px rgba(112, 144, 176, 0.06)"
  );
  const handleLogout = async () => {
    await axios.get("/api/logout");
    Inertia.visit("/");
    setUser(null);
  };
  return /* @__PURE__ */ jsxs(
    Flex,
    {
      w: { sm: "100%", md: "auto" },
      alignItems: "center",
      justifyContent: "right",
      flexDirection: "row",
      bg: menuBg,
      flexWrap: secondary ? { base: "wrap", md: "nowrap" } : "unset",
      p: "10px",
      borderRadius: "30px",
      boxShadow: shadow,
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
        /* @__PURE__ */ jsxs(
          Flex,
          {
            bg: ethBg,
            display: secondary ? "flex" : "none",
            borderRadius: "30px",
            ms: "auto",
            p: "6px",
            align: "center",
            me: "6px",
            children: [
              /* @__PURE__ */ jsx(
                Flex,
                {
                  align: "center",
                  justify: "center",
                  bg: ethBox,
                  h: "29px",
                  w: "29px",
                  borderRadius: "30px",
                  me: "7px",
                  children: /* @__PURE__ */ jsx(Icon, { color: ethColor, w: "9px", h: "14px", as: FaEthereum })
                }
              ),
              /* @__PURE__ */ jsxs(
                Text,
                {
                  w: "max-content",
                  color: ethColor,
                  fontSize: "sm",
                  fontWeight: "700",
                  me: "6px",
                  children: [
                    "1,924",
                    /* @__PURE__ */ jsxs(Text, { as: "span", display: { base: "none", md: "unset" }, children: [
                      " ",
                      "ETH"
                    ] })
                  ]
                }
              )
            ]
          }
        ),
        /* @__PURE__ */ jsx(SidebarResponsive, { routes }),
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
        /* @__PURE__ */ jsxs(Menu, { children: [
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
          user ? /* @__PURE__ */ jsxs(
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
                      w: "100%",
                      pb: "10px",
                      children: /* @__PURE__ */ jsx(Text, { fontSize: "sm", w: "full", children: "Profile" })
                    }
                  ) })
                ] }),
                /* @__PURE__ */ jsx(Flex, { flexDirection: "column", p: "10px", children: /* @__PURE__ */ jsx(
                  MenuItem,
                  {
                    _hover: { bg: "none" },
                    bg: "transparent",
                    _focus: { bg: "none" },
                    color: "red.400",
                    borderRadius: "8px",
                    px: "14px",
                    onClick: handleLogout,
                    children: /* @__PURE__ */ jsx(Text, { fontSize: "sm", children: "Log out" })
                  }
                ) })
              ]
            }
          ) : /* @__PURE__ */ jsx(
            MenuList,
            {
              boxShadow: shadow,
              p: "0px",
              mt: "10px",
              borderRadius: "20px",
              bg: menuBg,
              border: "none",
              children: /* @__PURE__ */ jsx(Flex, { flexDirection: "column", p: "10px", children: /* @__PURE__ */ jsx(
                MenuItem,
                {
                  _hover: { bg: "none" },
                  bg: "transparent",
                  _focus: { bg: "none" },
                  borderRadius: "8px",
                  px: "14px",
                  children: /* @__PURE__ */ jsx(Link, { href: "/sign-in", children: /* @__PURE__ */ jsx(Text, { fontSize: "sm", children: "Log in" }) })
                }
              ) })
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
function AdminNavbar(props) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    if (typeof window === "undefined") return () => {
    };
    window.addEventListener("scroll", changeNavbar);
    return () => {
      window.removeEventListener("scroll", changeNavbar);
    };
  });
  const { secondary, message, brandText } = props;
  let mainText = useColorModeValue("navy.700", "white");
  let secondaryText = useColorModeValue("gray.700", "white");
  let navbarPosition = "fixed";
  let navbarFilter = "none";
  let navbarBackdrop = "blur(20px)";
  let navbarShadow = "none";
  let navbarBg = useColorModeValue("rgba(244, 247, 254, 0.2)", "rgba(11,20,55,0.5)");
  let navbarBorder = "transparent";
  let secondaryMargin = "0px";
  let paddingX = "15px";
  let gap = "0px";
  const changeNavbar = () => {
    if (typeof window === "undefined") return;
    if (window.scrollY > 1) {
      setScrolled(true);
    } else {
      setScrolled(false);
    }
  };
  return /* @__PURE__ */ jsxs(
    Box,
    {
      position: navbarPosition,
      boxShadow: navbarShadow,
      bg: navbarBg,
      borderColor: navbarBorder,
      filter: navbarFilter,
      backdropFilter: navbarBackdrop,
      backgroundPosition: "center",
      backgroundSize: "cover",
      borderRadius: "16px",
      borderWidth: "1.5px",
      borderStyle: "solid",
      transitionDelay: "0s, 0s, 0s, 0s",
      transitionDuration: " 0.25s, 0.25s, 0.25s, 0s",
      "transition-property": "box-shadow, background-color, filter, border",
      transitionTimingFunction: "linear, linear, linear, linear",
      alignItems: { xl: "center" },
      display: secondary ? "block" : "flex",
      minH: "75px",
      justifyContent: { xl: "center" },
      lineHeight: "25.6px",
      mx: "auto",
      mt: secondaryMargin,
      pb: "8px",
      right: { base: "12px", md: "30px", lg: "30px", xl: "30px" },
      px: {
        sm: paddingX,
        md: "10px"
      },
      ps: {
        xl: "12px"
      },
      pt: "8px",
      top: { base: "12px", md: "16px", lg: "20px", xl: "20px" },
      zIndex: 1e3,
      w: {
        base: "calc(100vw - 6%)",
        md: "calc(100vw - 8%)",
        lg: "calc(100vw - 6%)",
        xl: "calc(100vw - 350px)",
        "2xl": "calc(100vw - 365px)"
      },
      children: [
        /* @__PURE__ */ jsxs(
          Flex,
          {
            w: "100%",
            flexDirection: {
              sm: "column",
              md: "row"
            },
            alignItems: { xl: "center" },
            mb: gap,
            children: [
              /* @__PURE__ */ jsxs(Box, { mb: { sm: "8px", md: "0px" }, children: [
                /* @__PURE__ */ jsxs(Breadcrumb, { children: [
                  /* @__PURE__ */ jsx(BreadcrumbItem, { color: secondaryText, fontSize: "sm", mb: "5px", children: /* @__PURE__ */ jsx(BreadcrumbLink, { color: secondaryText, children: "Pages" }) }),
                  /* @__PURE__ */ jsx(BreadcrumbItem, { color: secondaryText, fontSize: "sm", mb: "5px", children: /* @__PURE__ */ jsx(BreadcrumbLink, { color: secondaryText, children: brandText }) })
                ] }),
                /* @__PURE__ */ jsx(
                  Link$1,
                  {
                    color: mainText,
                    bg: "inherit",
                    borderRadius: "inherit",
                    fontWeight: "bold",
                    fontSize: "34px",
                    _hover: { color: { mainText } },
                    _active: {
                      bg: "inherit",
                      transform: "none",
                      borderColor: "transparent"
                    },
                    _focus: {
                      boxShadow: "none"
                    },
                    children: brandText
                  }
                )
              ] }),
              /* @__PURE__ */ jsx(Box, { ms: "auto", w: { sm: "100%", md: "unset" }, display: "flex", justifyContent: "right", children: /* @__PURE__ */ jsx(
                HeaderLinks,
                {
                  onOpen: props.onOpen,
                  logoText: props.logoText,
                  secondary: props.secondary,
                  fixed: props.fixed,
                  scrolled
                }
              ) })
            ]
          }
        ),
        secondary ? /* @__PURE__ */ jsx(Text, { color: "white", children: message }) : null
      ]
    }
  );
}
AdminNavbar.propTypes = {
  brandText: PropTypes.string,
  variant: PropTypes.string,
  secondary: PropTypes.bool,
  fixed: PropTypes.bool,
  onOpen: PropTypes.func
};
const SidebarContext = createContext();
function Dashboard(props) {
  const { children, ...rest } = props;
  const [fixed] = useState(false);
  const [toggleSidebar, setToggleSidebar] = useState(false);
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
        if (window.location.pathname.indexOf(routes2[i].layout + routes2[i].path) !== -1) {
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
        if (window.location.pathname.indexOf(routes2[i].layout + routes2[i].path) !== -1) {
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
        if (window.location.pathname.indexOf(routes2[i].layout + routes2[i].path) !== -1) {
          return routes2[i].messageNavbar;
        }
      }
    }
    return activeNavbar;
  };
  const { onOpen } = useDisclosure();
  return /* @__PURE__ */ jsx(Box, { children: /* @__PURE__ */ jsx(Box, { children: /* @__PURE__ */ jsxs(
    SidebarContext.Provider,
    {
      value: {
        toggleSidebar,
        setToggleSidebar
      },
      children: [
        /* @__PURE__ */ jsx(Sidebar, { routes, display: "none", ...rest }),
        /* @__PURE__ */ jsxs(
          Box,
          {
            float: "right",
            minHeight: "100vh",
            height: "100%",
            overflow: "auto",
            position: "relative",
            maxHeight: "100%",
            w: { base: "100%", xl: "calc( 100% - 290px )" },
            maxWidth: { base: "100%", xl: "calc( 100% - 290px )" },
            transition: "all 0.33s cubic-bezier(0.685, 0.0473, 0.346, 1)",
            transitionDuration: ".2s, .2s, .35s",
            transitionProperty: "top, bottom, width",
            transitionTimingFunction: "linear, linear, ease",
            children: [
              /* @__PURE__ */ jsx(Portal, { children: /* @__PURE__ */ jsx(Box, { children: /* @__PURE__ */ jsx(
                AdminNavbar,
                {
                  onOpen,
                  logoText: "Horizon UI Dashboard PRO",
                  brandText: getActiveRoute(routes),
                  secondary: getActiveNavbar(routes),
                  message: getActiveNavbarText(routes),
                  fixed,
                  ...rest
                }
              ) }) }),
              /* @__PURE__ */ jsx(
                Box,
                {
                  mx: "auto",
                  p: { base: "20px", md: "30px" },
                  pe: "20px",
                  minH: "100vh",
                  pt: "50px",
                  children
                }
              ),
              /* @__PURE__ */ jsx(Box, { children: /* @__PURE__ */ jsx(Footer, {}) })
            ]
          }
        )
      ]
    }
  ) }) });
}
export {
  Dashboard as D
};
