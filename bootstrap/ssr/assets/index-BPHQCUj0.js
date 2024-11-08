import { jsxs, jsx } from "react/jsx-runtime";
import { useToast, useColorModeValue, Box, Breadcrumb, BreadcrumbItem, Text, VStack, Avatar, Heading, Grid, FormControl, FormLabel, Input, Button } from "@chakra-ui/react";
import { useContext, useState } from "react";
import { Helmet } from "react-helmet";
import { Link } from "@inertiajs/react";
import { C as Card } from "./Card-M0XrdzyB.js";
import { U as UserContext } from "../ssr.js";
import { u as updateVendor } from "./use-request-C9PCfFl0.js";
import { useQueryClient, useMutation } from "react-query";
import { U as UserLayout } from "./index-D7V5_Wy3.js";
import "react-dom/server";
import "@inertiajs/inertia-react";
import "@inertiajs/react/server";
import "@chakra-ui/theme-tools";
import "axios";
import "react-icons/fa";
import "./SearchBar-Dsk0VtlP.js";
import "@chakra-ui/icons";
import "./statics-GI0iJz3l.js";
import "@chakra-ui/skeleton";
import "react-custom-scrollbars-2";
import "prop-types";
import "react-icons/md";
import "react-icons/io";
import "@inertiajs/inertia";
import "./use-request-CXEg0apC.js";
import "react-slick";
import "react-lazyload";
function Overview() {
  const toast = useToast();
  const queryClient = useQueryClient();
  const textColor = useColorModeValue("secondaryGray.900", "white");
  const secondaryText = useColorModeValue("gray.700", "white");
  const borderColor = useColorModeValue("gray.200", "whiteAlpha.100");
  const { user } = useContext(UserContext);
  const [form, setForm] = useState({
    name: "",
    surname: "",
    email: "",
    phone_number: "",
    job_title: "",
    company: "",
    password: ""
  });
  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const updateVendorMutation = useMutation(updateVendor, {
    onSuccess: () => {
      queryClient.invalidateQueries("getUser");
      toast({
        title: "Update vendor successfully",
        position: "top-right",
        status: "success",
        insert: "top",
        duration: 5e3,
        isClosable: true
      });
    },
    onError: (error) => {
      const errors = error.response.data.errors ? error.response.data.errors : { error: error.response.data.error };
      const key = errors[Object.keys(errors)[0]];
      toast({
        title: "Failed to update vendor",
        description: key,
        position: "top-right",
        status: "error",
        insert: "top",
        duration: 5e3,
        isClosable: true
      });
    }
  });
  const handleUpdate = () => {
    updateVendorMutation.mutate({
      vendor: {
        id: user.id,
        name: form.name || user.name,
        surname: form.surname || user.surname,
        email: form.email || user.email,
        phone_number: form.phone_number || user.phone_number,
        job_title: form.job_title || user.job_title,
        company: form.company || user.company,
        password: form.password
      }
    });
  };
  return /* @__PURE__ */ jsxs(UserLayout, { children: [
    /* @__PURE__ */ jsx(Helmet, { children: /* @__PURE__ */ jsx("title", { children: "DBMS Rank AI | Profile" }) }),
    /* @__PURE__ */ jsx(
      Card,
      {
        w: "100%",
        px: "0px",
        minH: "calc(100vh - 150px)",
        children: /* @__PURE__ */ jsxs(Box, { width: "100%", px: "25px", children: [
          /* @__PURE__ */ jsxs(Breadcrumb, { children: [
            /* @__PURE__ */ jsx(BreadcrumbItem, { color: secondaryText, fontSize: "sm", mb: "5px", children: /* @__PURE__ */ jsx(Link, { href: "/", children: "Home" }) }),
            /* @__PURE__ */ jsx(BreadcrumbItem, { color: secondaryText, fontSize: "sm", mb: "5px", children: /* @__PURE__ */ jsx(Link, { href: "/profile", children: "Profile" }) })
          ] }),
          /* @__PURE__ */ jsx(
            Text,
            {
              color: textColor,
              fontSize: "22px",
              mb: "30px",
              fontWeight: "700",
              lineHeight: "100%",
              children: "Profile"
            }
          ),
          /* @__PURE__ */ jsxs(Box, { display: { base: "block", lg: "flex" }, children: [
            /* @__PURE__ */ jsxs(
              Box,
              {
                as: "aside",
                flex: 1,
                mr: { base: 0, md: 5 },
                mb: { base: 5, md: 0 },
                rounded: "md",
                borderWidth: 1,
                borderColor,
                children: [
                  /* @__PURE__ */ jsxs(VStack, { spacing: 3, py: 5, borderBottomWidth: 1, borderColor, children: [
                    /* @__PURE__ */ jsx(
                      Avatar,
                      {
                        bg: "#11047A",
                        size: "2xl",
                        color: "white",
                        name: `${user.name} ${user.surname}`,
                        cursor: "pointer"
                      }
                    ),
                    /* @__PURE__ */ jsxs(VStack, { spacing: 1, children: [
                      /* @__PURE__ */ jsx(Heading, { as: "h3", fontSize: "xl", color: "brand.dark", children: `${user.name} ${user.surname}` }),
                      /* @__PURE__ */ jsx(Text, { color: "brand.gray", fontSize: "sm", children: user.company })
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxs(VStack, { as: "ul", spacing: 0, listStyleType: "none", children: [
                    /* @__PURE__ */ jsxs(
                      Box,
                      {
                        as: "li",
                        w: "full",
                        py: 3,
                        px: 5,
                        d: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        borderBottomWidth: 1,
                        borderColor,
                        children: [
                          /* @__PURE__ */ jsx(Text, { color: "brand.dark", children: "Email" }),
                          /* @__PURE__ */ jsx(Text, { fontWeight: "bold", children: user.email })
                        ]
                      }
                    ),
                    /* @__PURE__ */ jsxs(
                      Box,
                      {
                        as: "li",
                        w: "full",
                        py: 3,
                        px: 5,
                        d: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        borderBottomWidth: 1,
                        borderColor,
                        children: [
                          /* @__PURE__ */ jsx(Text, { color: "brand.dark", children: "Phone Number" }),
                          /* @__PURE__ */ jsx(Text, { fontWeight: "bold", children: user.phone_number })
                        ]
                      }
                    ),
                    /* @__PURE__ */ jsxs(
                      Box,
                      {
                        as: "li",
                        w: "full",
                        py: 3,
                        px: 5,
                        d: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        borderBottomWidth: 1,
                        borderColor,
                        children: [
                          /* @__PURE__ */ jsx(Text, { color: "brand.dark", children: "Job Title" }),
                          /* @__PURE__ */ jsx(Text, { fontWeight: "bold", children: user.job_title })
                        ]
                      }
                    )
                  ] })
                ]
              }
            ),
            /* @__PURE__ */ jsxs(
              Box,
              {
                as: "main",
                flex: 3,
                d: "flex",
                flexDir: "column",
                justifyContent: "space-between",
                pt: 5,
                rounded: "md",
                px: 3,
                borderWidth: 1,
                borderColor,
                children: [
                  /* @__PURE__ */ jsxs(
                    Grid,
                    {
                      templateColumns: { base: "repeat(1, 1fr)", md: "repeat(2, 1fr)" },
                      gap: 6,
                      children: [
                        /* @__PURE__ */ jsxs(FormControl, { id: "firstName", children: [
                          /* @__PURE__ */ jsx(FormLabel, { children: "First Name" }),
                          /* @__PURE__ */ jsx(
                            Input,
                            {
                              type: "text",
                              name: "name",
                              value: form.name,
                              placeholder: user.name,
                              color: textColor,
                              focusBorderColor: "blue.600",
                              onChange: handleChange
                            }
                          )
                        ] }),
                        /* @__PURE__ */ jsxs(FormControl, { id: "lastName", children: [
                          /* @__PURE__ */ jsx(FormLabel, { children: "Last Name" }),
                          /* @__PURE__ */ jsx(
                            Input,
                            {
                              type: "text",
                              name: "surname",
                              value: form.surname,
                              placeholder: user.surname,
                              color: textColor,
                              focusBorderColor: "blue.600",
                              onChange: handleChange
                            }
                          )
                        ] }),
                        /* @__PURE__ */ jsxs(FormControl, { id: "phoneNumber", children: [
                          /* @__PURE__ */ jsx(FormLabel, { children: "Phone Number" }),
                          /* @__PURE__ */ jsx(
                            Input,
                            {
                              type: "text",
                              name: "phone_number",
                              value: form.phone_number,
                              color: textColor,
                              focusBorderColor: "blue.600",
                              placeholder: user.phone_number,
                              onChange: handleChange
                            }
                          )
                        ] }),
                        /* @__PURE__ */ jsxs(FormControl, { id: "emailAddress", children: [
                          /* @__PURE__ */ jsx(FormLabel, { children: "Email Address" }),
                          /* @__PURE__ */ jsx(
                            Input,
                            {
                              type: "email",
                              name: "email",
                              value: form.email,
                              placeholder: user.email,
                              color: textColor,
                              focusBorderColor: "blue.600",
                              onChange: handleChange
                            }
                          )
                        ] }),
                        /* @__PURE__ */ jsxs(FormControl, { id: "Company", children: [
                          /* @__PURE__ */ jsx(FormLabel, { children: "Company" }),
                          /* @__PURE__ */ jsx(
                            Input,
                            {
                              type: "text",
                              name: "company",
                              value: form.company,
                              color: textColor,
                              focusBorderColor: "blue.600",
                              placeholder: user.company,
                              onChange: handleChange
                            }
                          )
                        ] }),
                        /* @__PURE__ */ jsxs(FormControl, { id: "jobTitle", children: [
                          /* @__PURE__ */ jsx(FormLabel, { children: "Job Title" }),
                          /* @__PURE__ */ jsx(
                            Input,
                            {
                              type: "text",
                              name: "job_title",
                              value: form.job_title,
                              color: textColor,
                              focusBorderColor: "blue.600",
                              placeholder: user.job_title,
                              onChange: handleChange
                            }
                          )
                        ] }),
                        /* @__PURE__ */ jsxs(FormControl, { id: "password", children: [
                          /* @__PURE__ */ jsx(FormLabel, { children: "Password" }),
                          /* @__PURE__ */ jsx(
                            Input,
                            {
                              name: "password",
                              value: form.password,
                              focusBorderColor: "blue.600",
                              type: "password",
                              onChange: handleChange
                            }
                          )
                        ] })
                      ]
                    }
                  ),
                  /* @__PURE__ */ jsx(Box, { mt: 5, py: 5, borderTopWidth: 1, borderColor, children: /* @__PURE__ */ jsx(Button, { variant: "brand", onClick: handleUpdate, children: "Update" }) })
                ]
              }
            )
          ] })
        ] })
      }
    )
  ] });
}
export {
  Overview as default
};
