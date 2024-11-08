import { jsxs, jsx, Fragment } from "react/jsx-runtime";
import { useToast, useColorModeValue, Box, Breadcrumb, BreadcrumbItem, BreadcrumbLink, Flex, Text, SimpleGrid, FormControl, FormLabel, InputGroup, Input, InputLeftElement, Textarea, Button } from "@chakra-ui/react";
import { useContext, useMemo, useState, useEffect } from "react";
import { MdPhone, MdOutlineEmail, MdOutlineBusiness } from "react-icons/md";
import { C as Card } from "./Card-M0XrdzyB.js";
import { Link } from "@inertiajs/react";
import { D as DBMSContext } from "../ssr.js";
import { g as generateSlug } from "./statics-GI0iJz3l.js";
import { g as getVendors } from "./use-request-Cf_Kil6_.js";
import { useQuery, useMutation } from "react-query";
import { Skeleton } from "@chakra-ui/skeleton";
import { Helmet } from "react-helmet";
import { sendRequest } from "./use-request-DTvMmiIy.js";
import { Inertia } from "@inertiajs/inertia";
import { U as UserLayout } from "./index-D7V5_Wy3.js";
import "react-dom/server";
import "@inertiajs/inertia-react";
import "@inertiajs/react/server";
import "@chakra-ui/theme-tools";
import "axios";
import "react-icons/fa";
import "./SearchBar-Dsk0VtlP.js";
import "@chakra-ui/icons";
import "react-custom-scrollbars-2";
import "prop-types";
import "react-icons/io";
import "./use-request-CXEg0apC.js";
import "react-slick";
import "react-lazyload";
function DBMS({ slug }) {
  const toast = useToast();
  const { vendors, setVendors } = useContext(DBMSContext);
  const { data: _vendors } = useQuery(
    "vendors",
    () => getVendors(" "),
    {
      staleTime: 3e5,
      enabled: vendors.length === 0,
      onSuccess: (data) => {
        setVendors(data);
      }
    }
  );
  const selectedDBMS = useMemo(() => {
    const dbmsNames = decodeURIComponent(slug).split(";");
    return vendors.filter((vendor) => dbmsNames.includes(generateSlug(vendor.db_name)));
  }, [vendors, slug]);
  const [form, setForm] = useState({
    firstname: "",
    lastname: "",
    mobile: "",
    email: "",
    company: "",
    jobtitle: "",
    content: "",
    dbms_id: 0
  });
  useEffect(() => {
    if (selectedDBMS.length === 0 && vendors.length !== 0 && _vendors) Inertia.visit("/not-found");
    if (selectedDBMS.length > 0) setForm((prev) => ({ ...prev, dbms_id: selectedDBMS[0].id }));
  }, [selectedDBMS]);
  const textColor = useColorModeValue("secondaryGray.900", "white");
  let secondaryText = useColorModeValue("gray.700", "white");
  const borderColor = useColorModeValue("gray.200", "whiteAlpha.100");
  const formTextColor = useColorModeValue("secondaryGray.900", "white");
  const formCardBg = useColorModeValue("gray.200", "navy.900");
  const [success, setSuccess] = useState(false);
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
    /* @__PURE__ */ jsxs(Helmet, { children: [
      "(",
      /* @__PURE__ */ jsx("title", { children: `DBMS Rank AI | Claim DBMS | ${selectedDBMS && selectedDBMS.length > 0 && selectedDBMS[0].db_name}` }),
      ")"
    ] }),
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
                /* @__PURE__ */ jsx(BreadcrumbItem, { color: secondaryText, fontSize: "sm", mb: "5px", children: /* @__PURE__ */ jsx(BreadcrumbLink, { children: "Claim DBMS" }) }),
                /* @__PURE__ */ jsx(BreadcrumbItem, { color: secondaryText, fontSize: "sm", mb: "5px", children: /* @__PURE__ */ jsx(BreadcrumbLink, { children: selectedDBMS.length > 0 && selectedDBMS[0].db_name }) })
              ] }),
              /* @__PURE__ */ jsx(Flex, { px: "25px", mb: "20px", gap: 4, flexDir: { base: "column", md: "row" }, justifyContent: "space-between", align: { base: "inherit", md: "center" }, children: /* @__PURE__ */ jsxs(
                Text,
                {
                  color: textColor,
                  fontSize: { md: "22px", base: "20px" },
                  mb: "4px",
                  fontWeight: "700",
                  lineHeight: "100%",
                  children: [
                    "Claim ",
                    selectedDBMS.length > 0 && selectedDBMS[0].db_name
                  ]
                }
              ) }),
              !success ? selectedDBMS.length > 0 ? /* @__PURE__ */ jsx(Box, { p: 4, children: /* @__PURE__ */ jsx(Flex, { spacing: { base: 20, sm: 3, md: 5, lg: 20 }, flexDir: "column", children: /* @__PURE__ */ jsx(Box, { bg: formCardBg, borderRadius: "lg", children: /* @__PURE__ */ jsxs(Box, { m: 8, color: formTextColor, children: [
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
                /* @__PURE__ */ jsx(FormControl, { float: "right", mt: 5, mb: 5, children: /* @__PURE__ */ jsx(Button, { variant: "solid", bgGradient: "linear(to-r, green.400, blue.800)", color: "white", _hover: {}, onClick: handleSubmit, children: "Request Claim" }) })
              ] }) }) }) }) : /* @__PURE__ */ jsxs(Fragment, { children: [
                /* @__PURE__ */ jsx(Skeleton, { height: "300px", borderRadius: "12px", mb: 5 }),
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
                    /* @__PURE__ */ jsx(Skeleton, { width: "200px", height: "30px", borderRadius: "12px" }),
                    /* @__PURE__ */ jsx(Skeleton, { width: "200px", height: "30px", borderRadius: "12px" }),
                    /* @__PURE__ */ jsx(Skeleton, { width: "200px", height: "30px", borderRadius: "12px" }),
                    /* @__PURE__ */ jsx(Skeleton, { width: "200px", height: "30px", borderRadius: "12px" })
                  ] })
                ] })
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
      }
    )
  ] });
}
export {
  DBMS as default
};
