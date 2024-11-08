import { jsx, jsxs, Fragment } from "react/jsx-runtime";
import { useContext, useState } from "react";
import { useColorModeValue, Flex, useColorMode, Button, Icon, Box, Text, useToast, Heading, FormControl, FormLabel, Input, InputGroup, InputRightElement } from "@chakra-ui/react";
import PropTypes from "prop-types";
import { IoMdMoon, IoMdSunny } from "react-icons/io";
import { FaChevronLeft } from "react-icons/fa";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { RiEyeCloseLine } from "react-icons/ri";
import { U as UserContext } from "../ssr.js";
import { Helmet } from "react-helmet";
import axios from "axios";
import "react-dom/server";
import "@inertiajs/inertia-react";
import "@inertiajs/react/server";
import "@chakra-ui/theme-tools";
import "react-query";
function Footer() {
  useColorModeValue("gray.400", "white");
  useColorModeValue({ base: "gray.400", lg: "white" }, "white");
  return /* @__PURE__ */ jsx(
    Flex,
    {
      zIndex: "3",
      flexDirection: {
        base: "column",
        lg: "row"
      },
      alignItems: {
        base: "center",
        xl: "start"
      },
      justifyContent: "space-between",
      px: { base: "30px", md: "0px" },
      pb: "30px"
    }
  );
}
function FixedPlugin(props) {
  const { ...rest } = props;
  const { colorMode, toggleColorMode } = useColorMode();
  let bgButton = "linear-gradient(135deg, #868CFF 0%, #4318FF 100%)";
  return /* @__PURE__ */ jsx(
    Button,
    {
      ...rest,
      h: "60px",
      w: "60px",
      zIndex: "99",
      bg: bgButton,
      position: "fixed",
      variant: "no-effects",
      bottom: "30px",
      right: "30px",
      border: "1px solid",
      borderColor: "#6A53FF",
      borderRadius: "50px",
      onClick: toggleColorMode,
      display: "flex",
      p: "0px",
      align: "center",
      justify: "center",
      children: /* @__PURE__ */ jsx(
        Icon,
        {
          h: "24px",
          w: "24px",
          color: "white",
          as: colorMode === "light" ? IoMdMoon : IoMdSunny
        }
      )
    }
  );
}
function AuthIllustration(props) {
  const { children, illustrationBackground } = props;
  return /* @__PURE__ */ jsxs(Flex, { position: "relative", h: "max-content", children: [
    /* @__PURE__ */ jsxs(
      Flex,
      {
        h: {
          sm: "initial",
          md: "unset",
          lg: "100vh",
          xl: "97vh"
        },
        w: "100%",
        maxW: { md: "66%", lg: "1313px" },
        mx: "auto",
        pt: { sm: "50px", md: "0px" },
        px: { lg: "30px", xl: "0px" },
        ps: { xl: "70px" },
        justifyContent: "start",
        direction: "column",
        children: [
          /* @__PURE__ */ jsx(
            Box,
            {
              onClick: () => {
                if (typeof window !== "undefined") window.history.back();
              },
              style: {
                width: "fit-content",
                marginTop: "40px"
              },
              children: /* @__PURE__ */ jsxs(
                Flex,
                {
                  align: "center",
                  ps: { base: "25px", lg: "0px" },
                  pt: { lg: "0px", xl: "0px" },
                  w: "fit-content",
                  children: [
                    /* @__PURE__ */ jsx(
                      Icon,
                      {
                        as: FaChevronLeft,
                        me: "12px",
                        h: "13px",
                        w: "8px",
                        color: "secondaryGray.600"
                      }
                    ),
                    /* @__PURE__ */ jsx(Text, { ms: "0px", fontSize: "sm", color: "secondaryGray.600", children: "Back" })
                  ]
                }
              )
            }
          ),
          children,
          /* @__PURE__ */ jsx(
            Box,
            {
              display: { base: "none", md: "block" },
              h: "100%",
              minH: "100vh",
              w: { lg: "50vw", "2xl": "44vw" },
              position: "absolute",
              right: "0px",
              children: /* @__PURE__ */ jsx(
                Flex,
                {
                  bg: `url(${illustrationBackground})`,
                  justify: "center",
                  align: "end",
                  w: "100%",
                  h: "100%",
                  bgSize: "cover",
                  bgPosition: "50%",
                  position: "absolute",
                  borderBottomLeftRadius: { lg: "120px", xl: "200px" }
                }
              )
            }
          ),
          /* @__PURE__ */ jsx(Footer, {})
        ]
      }
    ),
    /* @__PURE__ */ jsx(FixedPlugin, {})
  ] });
}
AuthIllustration.propTypes = {
  illustrationBackground: PropTypes.string,
  image: PropTypes.any
};
const illustration = "/build/assets/Demo-BW6MTgmx.jpg";
function SignIn() {
  const toast = useToast();
  const { setUser } = useContext(UserContext);
  const textColor = useColorModeValue("navy.700", "white");
  const textColorSecondary = "gray.400";
  const brandStars = useColorModeValue("brand.500", "brand.400");
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);
  const [form, setForm] = useState({
    email: "",
    password: ""
  });
  const handleChangeForm = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const handleLogin = async () => {
    const res = await axios.post("/api/login", form);
    if (!res.data.success) {
      const errors = res.data.errors ? res.data.errors : { error: res.data.error };
      const key = errors[Object.keys(errors)[0]];
      toast({
        title: "Sign in failed",
        description: key,
        position: "top-right",
        status: "error",
        insert: "top",
        duration: 5e3,
        isClosable: true
      });
    } else {
      toast({
        title: "You logged successfully",
        position: "top-right",
        status: "success",
        insert: "top",
        duration: 5e3,
        isClosable: true
      });
      setUser(res.data.user);
      if (typeof window === "undefined") return;
      if (res.data.user.admin) window.location.href = "/admin";
      else window.location.href = "/";
    }
  };
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(Helmet, { children: /* @__PURE__ */ jsx("title", { children: "DBMS Rank AI | Sign In" }) }),
    /* @__PURE__ */ jsx(AuthIllustration, { illustrationBackground: illustration, children: /* @__PURE__ */ jsxs(
      Flex,
      {
        maxW: { base: "100%", lg: "45%" },
        w: "100%",
        mx: { base: "auto", lg: "0px" },
        me: "auto",
        h: "100%",
        alignItems: "start",
        justifyContent: "center",
        mb: { base: "30px", md: "60px" },
        px: { base: "25px", md: "0px" },
        mt: { base: "40px", md: "14vh" },
        flexDirection: "column",
        children: [
          /* @__PURE__ */ jsxs(Box, { me: "auto", children: [
            /* @__PURE__ */ jsx(Heading, { color: "white", fontSize: "36px", mb: "10px", children: "Sign In" }),
            /* @__PURE__ */ jsxs(
              Text,
              {
                mb: "36px",
                ms: "4px",
                color: textColorSecondary,
                fontWeight: "400",
                fontSize: "md",
                children: [
                  "We invite representatives of DBMS vendors to ",
                  /* @__PURE__ */ jsx("a", { href: "/contact-us", children: /* @__PURE__ */ jsx("span", { style: { color: "#2b6cb0", textDecoration: "underline" }, children: "contact us" }) }),
                  " for getting a user account. This enables you to increase the coverage and visibility of your system on this site, see ",
                  /* @__PURE__ */ jsx("a", { href: "/services", children: /* @__PURE__ */ jsx("span", { style: { color: "#2b6cb0", textDecoration: "underline" }, children: "more details" }) }),
                  "."
                ]
              }
            )
          ] }),
          /* @__PURE__ */ jsx(
            Flex,
            {
              zIndex: "2",
              direction: "column",
              w: { base: "100%" },
              maxW: "100%",
              background: "transparent",
              borderRadius: "15px",
              mx: { base: "auto", lg: "unset" },
              me: "auto",
              mb: { base: "20px", md: "auto" },
              children: /* @__PURE__ */ jsxs(FormControl, { children: [
                /* @__PURE__ */ jsxs(
                  FormLabel,
                  {
                    display: "flex",
                    ms: "4px",
                    fontSize: "sm",
                    fontWeight: "500",
                    color: textColor,
                    mb: "8px",
                    children: [
                      "Email",
                      /* @__PURE__ */ jsx(Text, { color: brandStars, children: "*" })
                    ]
                  }
                ),
                /* @__PURE__ */ jsx(
                  Input,
                  {
                    isRequired: true,
                    variant: "auth",
                    fontSize: "sm",
                    ms: { base: "0px", md: "0px" },
                    type: "email",
                    placeholder: "mail@simmmple.com",
                    mb: "24px",
                    fontWeight: "500",
                    size: "lg",
                    name: "email",
                    value: form.email,
                    onChange: handleChangeForm
                  }
                ),
                /* @__PURE__ */ jsxs(
                  FormLabel,
                  {
                    ms: "4px",
                    fontSize: "sm",
                    fontWeight: "500",
                    color: textColor,
                    display: "flex",
                    children: [
                      "Password",
                      /* @__PURE__ */ jsx(Text, { color: brandStars, children: "*" })
                    ]
                  }
                ),
                /* @__PURE__ */ jsxs(InputGroup, { size: "md", children: [
                  /* @__PURE__ */ jsx(
                    Input,
                    {
                      isRequired: true,
                      fontSize: "sm",
                      placeholder: "Min. 8 characters",
                      mb: "24px",
                      size: "lg",
                      type: show ? "text" : "password",
                      variant: "auth",
                      name: "password",
                      value: form.password,
                      onChange: handleChangeForm
                    }
                  ),
                  /* @__PURE__ */ jsx(InputRightElement, { display: "flex", alignItems: "center", mt: "4px", children: /* @__PURE__ */ jsx(
                    Icon,
                    {
                      color: textColorSecondary,
                      _hover: { cursor: "pointer" },
                      as: show ? RiEyeCloseLine : MdOutlineRemoveRedEye,
                      onClick: handleClick
                    }
                  ) })
                ] }),
                /* @__PURE__ */ jsx(
                  Button,
                  {
                    fontSize: "sm",
                    variant: "brand",
                    fontWeight: "500",
                    w: "100%",
                    h: "50",
                    mb: "24px",
                    onClick: handleLogin,
                    children: "Sign In"
                  }
                )
              ] })
            }
          )
        ]
      }
    ) })
  ] });
}
export {
  SignIn as default
};
