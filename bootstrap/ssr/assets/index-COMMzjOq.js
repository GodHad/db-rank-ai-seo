import { jsxs, jsx, Fragment } from "react/jsx-runtime";
import { useState } from "react";
import { useToast, useColorModeValue, Box, Breadcrumb, BreadcrumbItem, BreadcrumbLink, Heading, Flex, HStack, Button, Text, SimpleGrid, FormControl, FormLabel, InputGroup, Input, InputLeftElement, Textarea } from "@chakra-ui/react";
import { MdEmail, MdPhone, MdOutlineEmail, MdOutlineBusiness } from "react-icons/md";
import { useMutation } from "react-query";
import "../ssr.js";
import axios from "axios";
import { Helmet } from "react-helmet";
import { Link } from "@inertiajs/react";
import { FaLinkedin } from "react-icons/fa";
import { U as UserLayout } from "./index-D7V5_Wy3.js";
import "react-dom/server";
import "@inertiajs/inertia-react";
import "@inertiajs/react/server";
import "@chakra-ui/theme-tools";
import "./SearchBar-Dsk0VtlP.js";
import "@chakra-ui/icons";
import "./statics-GI0iJz3l.js";
import "@chakra-ui/skeleton";
import "./Card-M0XrdzyB.js";
import "react-custom-scrollbars-2";
import "prop-types";
import "react-icons/io";
import "@inertiajs/inertia";
import "./use-request-CXEg0apC.js";
import "react-slick";
import "react-lazyload";
const sendRequest = async (form) => {
  const res = await axios.post("/api/send-request", form);
  return res.data;
};
function Contact() {
  const toast = useToast();
  const textColor = useColorModeValue("secondaryGray.900", "white");
  let buttonText = useColorModeValue("gray.700", "gray.300");
  const formTextColor = useColorModeValue("secondaryGray.900", "white");
  const formCardBg = useColorModeValue("gray.200", "navy.900");
  const [success, setSuccess] = useState(false);
  const [form, setForm] = useState({
    firstname: "",
    lastname: "",
    mobile: "",
    email: "",
    company: "",
    jobtitle: "",
    content: ""
  });
  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const mutation = useMutation(sendRequest, {
    onSuccess: () => {
      toast({
        title: "Send request successfully",
        position: "top-right",
        status: "success",
        insert: "top",
        duration: 5e3,
        isClosable: true
      });
      setForm({
        firstname: "",
        lastname: "",
        mobile: "",
        email: "",
        company: "",
        jobtitle: "",
        content: ""
      });
      setSuccess(true);
    },
    onError: (error) => {
      const errors = error.response.data.errors ? error.response.data.errors : { error: error.response.data.error };
      const key = errors[Object.keys(errors)[0]];
      toast({
        title: "Failed to send request.",
        description: key,
        position: "top-right",
        status: "error",
        insert: "top",
        duration: 5e3,
        isClosable: true
      });
    }
  });
  const handleSubmit = () => {
    mutation.mutate(form);
  };
  return /* @__PURE__ */ jsxs(UserLayout, { children: [
    /* @__PURE__ */ jsx(Helmet, { children: /* @__PURE__ */ jsx("title", { children: "DB Rank AI | Contact us" }) }),
    /* @__PURE__ */ jsxs(
      Box,
      {
        color: textColor,
        borderRadius: "lg",
        mx: { sm: 4, md: 16, lg: 10 },
        px: { sm: 5, md: 5, lg: 16 },
        children: [
          /* @__PURE__ */ jsxs(Breadcrumb, { children: [
            /* @__PURE__ */ jsx(BreadcrumbItem, { color: textColor, fontSize: "sm", mb: "5px", children: /* @__PURE__ */ jsx(Link, { href: "/", children: "Home" }) }),
            /* @__PURE__ */ jsx(BreadcrumbItem, { color: textColor, fontSize: "sm", mb: "5px", onClick: () => setSuccess(false), children: /* @__PURE__ */ jsx(Link, { href: "/contact-us", children: "Contact us" }) }),
            success && /* @__PURE__ */ jsx(BreadcrumbItem, { color: textColor, fontSize: "sm", mb: "5px", children: /* @__PURE__ */ jsx(BreadcrumbLink, { children: "Thank You" }) })
          ] }),
          /* @__PURE__ */ jsx(Heading, { children: "Contact us" }),
          !success ? /* @__PURE__ */ jsxs(Fragment, { children: [
            /* @__PURE__ */ jsx(Flex, { children: /* @__PURE__ */ jsx(Box, { py: { base: 5, sm: 5, md: 8, lg: 10 }, children: /* @__PURE__ */ jsxs(HStack, { pl: 0, spacing: 3, alignItems: "flex-start", justifyContent: "flex-start", children: [
              /* @__PURE__ */ jsx("a", { href: "mailto:office@dbrank.ai", target: "_blank", children: /* @__PURE__ */ jsx(
                Button,
                {
                  size: "md",
                  height: "48px",
                  width: "100%",
                  variant: "ghost",
                  color: buttonText,
                  justifyContent: "flex-start",
                  _hover: { border: "2px solid #1C6FEB" },
                  leftIcon: /* @__PURE__ */ jsx(MdEmail, { color: "#1970F1", size: "20px" }),
                  children: "office@dbrank.ai"
                }
              ) }),
              /* @__PURE__ */ jsx("a", { href: "https://linkedIn.com/company/db-rank", target: "_blank", children: /* @__PURE__ */ jsx(
                Button,
                {
                  size: "md",
                  height: "48px",
                  width: "100%",
                  variant: "ghost",
                  color: buttonText,
                  justifyContent: "flex-start",
                  _hover: { border: "2px solid #1C6FEB" },
                  leftIcon: /* @__PURE__ */ jsx(FaLinkedin, { color: "#1970F1", size: "20px" }),
                  children: "LinkedIn"
                }
              ) })
            ] }) }) }),
            /* @__PURE__ */ jsx(Text, { mt: { sm: 3, md: 3, lg: 5 }, color: textColor, children: "Please fill in the form below and one of our colleagues will get back to you as soon as possible." }),
            /* @__PURE__ */ jsx(Box, { p: 4, children: /* @__PURE__ */ jsx(Flex, { spacing: { base: 20, sm: 3, md: 5, lg: 20 }, flexDir: "column", children: /* @__PURE__ */ jsx(Box, { bg: formCardBg, borderRadius: "lg", children: /* @__PURE__ */ jsxs(Box, { m: 8, color: formTextColor, children: [
              /* @__PURE__ */ jsxs(SimpleGrid, { columns: { base: 1, md: 2 }, gap: 5, children: [
                /* @__PURE__ */ jsxs(FormControl, { children: [
                  /* @__PURE__ */ jsx(FormLabel, { children: "First Name" }),
                  /* @__PURE__ */ jsx(InputGroup, { borderColor: "#E0E1E7", children: /* @__PURE__ */ jsx(Input, { borderColor: "gray.300", color: textColor, type: "text", size: "md", name: "firstname", value: form.firstname, onChange: handleChange }) })
                ] }),
                /* @__PURE__ */ jsxs(FormControl, { children: [
                  /* @__PURE__ */ jsx(FormLabel, { children: "Last Name" }),
                  /* @__PURE__ */ jsx(InputGroup, { borderColor: "#E0E1E7", children: /* @__PURE__ */ jsx(Input, { borderColor: "gray.300", color: textColor, type: "text", size: "md", name: "lastname", value: form.lastname, onChange: handleChange }) })
                ] }),
                /* @__PURE__ */ jsxs(FormControl, { children: [
                  /* @__PURE__ */ jsx(FormLabel, { children: "Mobile" }),
                  /* @__PURE__ */ jsxs(InputGroup, { borderColor: "#E0E1E7", children: [
                    /* @__PURE__ */ jsx(InputLeftElement, { pointerEvents: "none", children: /* @__PURE__ */ jsx(MdPhone, { color: "gray.800" }) }),
                    /* @__PURE__ */ jsx(Input, { borderColor: "gray.300", color: textColor, type: "text", size: "md", name: "mobile", value: form.mobile, onChange: handleChange })
                  ] })
                ] }),
                /* @__PURE__ */ jsxs(FormControl, { children: [
                  /* @__PURE__ */ jsx(FormLabel, { children: "Email" }),
                  /* @__PURE__ */ jsxs(InputGroup, { borderColor: "#E0E1E7", children: [
                    /* @__PURE__ */ jsx(InputLeftElement, { pointerEvents: "none", children: /* @__PURE__ */ jsx(MdOutlineEmail, { color: "gray.800" }) }),
                    /* @__PURE__ */ jsx(Input, { borderColor: "gray.300", color: textColor, type: "email", size: "md", name: "email", value: form.email, onChange: handleChange })
                  ] })
                ] }),
                /* @__PURE__ */ jsxs(FormControl, { children: [
                  /* @__PURE__ */ jsx(FormLabel, { children: "Company" }),
                  /* @__PURE__ */ jsxs(InputGroup, { borderColor: "#E0E1E7", children: [
                    /* @__PURE__ */ jsx(InputLeftElement, { pointerEvents: "none", children: /* @__PURE__ */ jsx(MdOutlineBusiness, { color: "gray.800" }) }),
                    /* @__PURE__ */ jsx(Input, { borderColor: "gray.300", color: textColor, type: "text", size: "md", name: "company", value: form.company, onChange: handleChange })
                  ] })
                ] }),
                /* @__PURE__ */ jsxs(FormControl, { children: [
                  /* @__PURE__ */ jsx(FormLabel, { children: "Job Title" }),
                  /* @__PURE__ */ jsx(InputGroup, { borderColor: "#E0E1E7", children: /* @__PURE__ */ jsx(Input, { borderColor: "gray.300", color: textColor, type: "text", size: "md", name: "jobtitle", value: form.jobtitle, onChange: handleChange }) })
                ] })
              ] }),
              /* @__PURE__ */ jsxs(FormControl, { mt: 5, children: [
                /* @__PURE__ */ jsx(FormLabel, { children: "Message" }),
                /* @__PURE__ */ jsx(
                  Textarea,
                  {
                    borderColor: "gray.300",
                    _hover: {
                      borderRadius: "gray.300"
                    },
                    placeholder: "message",
                    name: "content",
                    value: form.content,
                    onChange: handleChange
                  }
                )
              ] }),
              /* @__PURE__ */ jsx(FormControl, { float: "right", mt: 5, mb: 5, children: /* @__PURE__ */ jsx(Button, { variant: "solid", bgGradient: "linear(to-r, green.400, blue.800)", color: "white", _hover: {}, onClick: handleSubmit, children: "Send Message" }) })
            ] }) }) }) })
          ] }) : /* @__PURE__ */ jsxs(Flex, { flexDir: "column", justifyContent: "center", alignItems: "center", minH: "300px", children: [
            /* @__PURE__ */ jsx(Text, { mt: { sm: 3, md: 3, lg: 5 }, color: textColor, fontSize: "18px", children: "Message received, thank you!" }),
            /* @__PURE__ */ jsx(Text, { mt: { sm: 3, md: 3, lg: 5 }, color: textColor, fontSize: "18px", children: "One of our colleagues will be in touch soon…" }),
            /* @__PURE__ */ jsx(Link, { href: "/", children: /* @__PURE__ */ jsx(
              Button,
              {
                mt: { sm: 12, md: 12, lg: 20 },
                colorScheme: "teal",
                bgGradient: "linear(to-r, green.400, blue.800)",
                color: "white",
                variant: "solid",
                children: "Return to Home"
              }
            ) })
          ] })
        ]
      }
    )
  ] });
}
export {
  Contact as default
};
