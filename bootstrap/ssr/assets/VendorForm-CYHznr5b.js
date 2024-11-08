import { jsxs, jsx } from "react/jsx-runtime";
import { useContext, useMemo, useState, useEffect } from "react";
import { useToast, useColorModeValue, Box, Text, FormControl, Flex, FormLabel, Switch, Button } from "@chakra-ui/react";
import { Select } from "chakra-react-select";
import { useQuery, useQueryClient, useMutation } from "react-query";
import { c as createVendor, u as updateVendor } from "./use-request-C9PCfFl0.js";
import { C as CustomInput } from "./CustomInput-D8rT110g.js";
import { D as DBMSContext } from "../ssr.js";
import { g as getVendors } from "./use-request-Cf_Kil6_.js";
import "axios";
import "react-dom/server";
import "@inertiajs/inertia-react";
import "@inertiajs/react/server";
import "@chakra-ui/theme-tools";
function VendorForm({ vendor, setOpenedPage }) {
  const { vendors, setVendors } = useContext(DBMSContext);
  const { data: dbmss = [] } = useQuery(
    "user_vendors",
    () => getVendors(" "),
    {
      staleTime: 3e5,
      onSuccess: (data) => {
        setVendors(data);
      }
    }
  );
  const dbmsOptions = useMemo(() => dbmss.map((dbms) => ({ value: dbms.id, label: dbms.db_name })), [vendors]);
  const queryClient = useQueryClient();
  const toast = useToast();
  const textColor = useColorModeValue("navy.400", "white");
  const brandStars = useColorModeValue("brand.500", "brand.400");
  const {
    id,
    name,
    surname,
    email,
    phone_number,
    job_title,
    company,
    approved,
    userRoleId,
    author
  } = vendor;
  const [form, setForm] = useState({
    id,
    name,
    surname,
    email,
    phone_number,
    job_title,
    company,
    password: "",
    approved,
    author,
    userRoleId,
    vendor: vendor.vendor ? { value: vendor.vendor[0].id, label: vendor.vendor[0].db_name } : null
  });
  const createVendorMutation = useMutation(createVendor, {
    onSuccess: () => {
      queryClient.invalidateQueries("vendors");
      setOpenedPage(0);
      toast({
        title: "Create new vendor successfully",
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
        title: "Failed to create vendor",
        description: key,
        position: "top-right",
        status: "error",
        insert: "top",
        duration: 5e3,
        isClosable: true
      });
    }
  });
  const updateVendorMutation = useMutation(updateVendor, {
    onSuccess: () => {
      queryClient.invalidateQueries("vendors");
      setOpenedPage(0);
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
  const handleVendor = () => {
    if (!form.id) createVendorMutation.mutate({ vendor: { ...form, dbms_id: form.vendor.value } });
    else updateVendorMutation.mutate({ vendor: { ...form, dbms_id: form.vendor.value } });
  };
  const handleChangeForm = (e) => {
    setForm((prevState) => ({ ...prevState, [e.target.name]: e.target.value }));
  };
  useEffect(() => {
    console.log({ value: vendor.vendor[0].id, label: vendor.vendor[0].db_name });
    setForm((prevState) => ({
      ...prevState,
      id,
      name,
      surname,
      email,
      phone_number,
      job_title,
      company,
      approved,
      author,
      userRoleId,
      vendor: vendor.vendor ? { value: vendor.vendor[0].id, label: vendor.vendor[0].db_name } : null
    }));
  }, [vendor]);
  const handleChangeVendor = (value) => {
    setForm((prev) => ({ ...prev, vendor: value }));
  };
  return /* @__PURE__ */ jsxs(Box, { p: "20px", children: [
    /* @__PURE__ */ jsxs(Text, { mb: "32px", fontSize: 22, children: [
      !vendor.id ? "Create" : "Update",
      " Vendor"
    ] }),
    /* @__PURE__ */ jsxs(FormControl, { children: [
      /* @__PURE__ */ jsxs(Flex, { gap: 4, flexDir: { base: "column", md: "row" }, children: [
        /* @__PURE__ */ jsx(CustomInput, { title: "First Name", name: "name", value: form.name, handleChangeForm, textColor, brandStars }),
        /* @__PURE__ */ jsx(CustomInput, { title: "Last Name", name: "surname", value: form.surname, handleChangeForm, textColor, brandStars })
      ] }),
      /* @__PURE__ */ jsxs(Flex, { gap: 4, flexDir: { base: "column", md: "row" }, children: [
        /* @__PURE__ */ jsx(CustomInput, { title: "Email", name: "email", type: "email", value: form.email, handleChangeForm, textColor, brandStars }),
        /* @__PURE__ */ jsx(CustomInput, { title: "Phone Number", name: "phone_number", value: form.phone_number, handleChangeForm, textColor, brandStars })
      ] }),
      /* @__PURE__ */ jsxs(Flex, { gap: 4, flexDir: { base: "column", md: "row" }, children: [
        /* @__PURE__ */ jsx(CustomInput, { title: "Job Title", name: "job_title", value: form.job_title, handleChangeForm, textColor, brandStars }),
        /* @__PURE__ */ jsx(CustomInput, { title: "Company", name: "company", value: form.company, handleChangeForm, textColor, brandStars })
      ] }),
      !vendor.id && /* @__PURE__ */ jsx(CustomInput, { title: "Password", name: "password", type: "password", value: form.password, handleChangeForm, textColor, brandStars }),
      /* @__PURE__ */ jsxs(Flex, { children: [
        /* @__PURE__ */ jsxs(FormControl, { display: "flex", alignItems: "center", mb: "24px", children: [
          /* @__PURE__ */ jsx(
            FormLabel,
            {
              display: "flex",
              ms: "4px",
              mb: 0,
              fontSize: "sm",
              fontWeight: "500",
              color: textColor,
              children: "Approved"
            }
          ),
          /* @__PURE__ */ jsx(
            Switch,
            {
              size: "lg",
              colorScheme: "brand",
              isChecked: form.approved === 1,
              onChange: () => {
                setForm((prevState) => ({
                  ...prevState,
                  approved: 1 - form.approved
                }));
              }
            }
          )
        ] }),
        /* @__PURE__ */ jsxs(FormControl, { display: "flex", alignItems: "center", mb: "24px", children: [
          /* @__PURE__ */ jsx(
            FormLabel,
            {
              display: "flex",
              ms: "4px",
              mb: 0,
              fontSize: "sm",
              fontWeight: "500",
              color: textColor,
              children: "Author Permission"
            }
          ),
          /* @__PURE__ */ jsx(
            Switch,
            {
              size: "lg",
              colorScheme: "brand",
              isChecked: form.author === 1,
              onChange: () => {
                setForm((prevState) => ({
                  ...prevState,
                  author: 1 - form.author
                }));
              }
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsxs(Box, { w: "full", children: [
        /* @__PURE__ */ jsx(
          FormLabel,
          {
            display: "flex",
            ms: "4px",
            fontSize: "sm",
            fontWeight: "500",
            color: textColor,
            mb: "8px",
            children: "Request to claim DBMS"
          }
        ),
        /* @__PURE__ */ jsx(
          Select,
          {
            options: dbmsOptions,
            value: form.vendor,
            onChange: handleChangeVendor,
            isSearchable: true,
            chakraStyles: {
              container: (provided) => ({
                ...provided
              })
            }
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsx(Button, { variant: "brand", mt: 3, mr: 3, onClick: handleVendor, children: "Save" }),
    /* @__PURE__ */ jsx(Button, { mt: 3, onClick: () => setOpenedPage(0), children: "Cancel" })
  ] });
}
export {
  VendorForm as default
};
