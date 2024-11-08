import { jsxs, jsx } from "react/jsx-runtime";
import { useState, useEffect, useRef } from "react";
import { useToast, useColorModeValue, Box, Text, FormControl, FormLabel, Textarea, Icon, Image, Input, Switch, Button } from "@chakra-ui/react";
import { MdUploadFile } from "react-icons/md";
import { useQueryClient, useMutation } from "react-query";
import { c as createSponsor, u as updateSponsor } from "./use-request-DISTMCmE.js";
import { A as APP_URL } from "./statics-GI0iJz3l.js";
import { C as CustomInput } from "./CustomInput-D8rT110g.js";
import "../ssr.js";
import "react-dom/server";
import "@inertiajs/inertia-react";
import "@inertiajs/react/server";
import "@chakra-ui/theme-tools";
import "axios";
function SponsorForm({ sponsor, setOpenedPage }) {
  const queryClient = useQueryClient();
  const toast = useToast();
  const textColor = useColorModeValue("navy.400", "white");
  const bgColor = useColorModeValue("white", "navy.800");
  const brandStars = useColorModeValue("brand.500", "brand.400");
  const {
    id,
    name,
    description,
    link,
    logo_url,
    banner,
    featured
  } = sponsor;
  const [form, setForm] = useState({
    id,
    name,
    description,
    link,
    logo_url,
    banner,
    logo_file: null,
    banner_file: null,
    featured
  });
  const createSponsorMutation = useMutation(createSponsor, {
    onSuccess: () => {
      queryClient.invalidateQueries("sponsors");
      setOpenedPage(0);
      toast({
        title: "Create new sponsor successfully",
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
        title: "Failed to create sponsor",
        description: key,
        position: "top-right",
        status: "error",
        insert: "top",
        duration: 5e3,
        isClosable: true
      });
    }
  });
  const updateSponsorMutation = useMutation(updateSponsor, {
    onSuccess: () => {
      queryClient.invalidateQueries("sponsors");
      setOpenedPage(0);
      toast({
        title: "Update sponsor successfully",
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
        title: "Failed to update sponsor successfully",
        description: key,
        position: "top-right",
        status: "error",
        insert: "top",
        duration: 5e3,
        isClosable: true
      });
    }
  });
  const handleSponsor = () => {
    const formData = new FormData();
    formData.append("id", form.id);
    formData.append("name", form.name);
    formData.append("description", form.description);
    formData.append("link", form.link);
    formData.append("featured", form.featured);
    if (form.logo_file) formData.append("logo_file", form.logo_file);
    if (form.banner_file) formData.append("banner_file", form.banner_file);
    if (!form.id) createSponsorMutation.mutate({ sponsor: formData });
    else updateSponsorMutation.mutate({ id: sponsor.id, sponsor: formData });
  };
  const handleChangeForm = (e) => {
    setForm((prevState) => ({ ...prevState, [e.target.name]: e.target.value }));
  };
  useEffect(() => {
    setForm((prevState) => ({
      ...prevState,
      id,
      name,
      description,
      logo_url,
      banner,
      featured
    }));
  }, [sponsor]);
  const [imagePreview, setImagePreview] = useState({
    logo_file: APP_URL + "storage/" + logo_url,
    banner_file: APP_URL + "storage/" + banner
  });
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setForm((prevState) => ({
      ...prevState,
      [event.target.name]: file
    }));
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview((prevState) => ({ ...prevState, [event.target.name]: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };
  const logoFileRef = useRef(null);
  const bannerFileRef = useRef(null);
  return /* @__PURE__ */ jsxs(Box, { p: "20px", children: [
    /* @__PURE__ */ jsxs(Text, { mb: "32px", fontSize: 22, children: [
      !sponsor.id ? "Create" : "Update",
      " Sponsor"
    ] }),
    /* @__PURE__ */ jsxs(FormControl, { children: [
      /* @__PURE__ */ jsx(CustomInput, { title: "Sponsor name", name: "name", value: form.name, handleChangeForm, textColor, brandStars }),
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
            "Description",
            /* @__PURE__ */ jsx(Text, { color: brandStars, children: "*" })
          ]
        }
      ),
      /* @__PURE__ */ jsx(
        Textarea,
        {
          isRequired: true,
          variant: "auth",
          fontSize: "sm",
          ms: { base: "0px", md: "0px" },
          placeholder: "",
          mb: "24px",
          fontWeight: "500",
          size: "lg",
          bgColor,
          border: "1px",
          borderColor: "grey",
          borderRadius: "16px",
          name: "description",
          value: form.description,
          onChange: handleChangeForm
        }
      ),
      /* @__PURE__ */ jsx(CustomInput, { title: "Website Link", name: "link", value: form.link, handleChangeForm, textColor, brandStars }),
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
            "Logo File",
            /* @__PURE__ */ jsx(Text, { color: brandStars, children: "*" })
          ]
        }
      ),
      /* @__PURE__ */ jsxs(
        Box,
        {
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          p: 4,
          border: "2px dashed",
          borderColor: "grey",
          borderRadius: "md",
          cursor: "pointer",
          _hover: { borderColor: "gray.400" },
          mb: "24px",
          children: [
            /* @__PURE__ */ jsxs(Box, { display: "flex", alignItems: "center", onClick: () => logoFileRef.current.click(), children: [
              /* @__PURE__ */ jsx(Icon, { as: MdUploadFile, mr: 2 }),
              /* @__PURE__ */ jsx(Text, { children: form.logo_file ? "Choose other file" : "Choose a file..." })
            ] }),
            (form.logo_url || form.logo_file) && /* @__PURE__ */ jsx(Box, { mt: 4, children: /* @__PURE__ */ jsx(Image, { src: imagePreview.logo_file, alt: "Image Preview", boxSize: "200px", objectFit: "cover" }) }),
            /* @__PURE__ */ jsx(
              Input,
              {
                ref: logoFileRef,
                type: "file",
                display: "none",
                accept: "image/*",
                name: "logo_file",
                onChange: handleFileChange
              }
            )
          ]
        }
      ),
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
            "Banner File",
            /* @__PURE__ */ jsx(Text, { color: brandStars, children: "*" })
          ]
        }
      ),
      /* @__PURE__ */ jsxs(
        Box,
        {
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          p: 4,
          mb: "24px",
          border: "2px dashed",
          borderColor: "grey",
          borderRadius: "md",
          cursor: "pointer",
          _hover: { borderColor: "gray.400" },
          children: [
            /* @__PURE__ */ jsxs(Box, { display: "flex", alignItems: "center", onClick: () => bannerFileRef.current.click(), children: [
              /* @__PURE__ */ jsx(Icon, { as: MdUploadFile, mr: 2 }),
              /* @__PURE__ */ jsx(Text, { children: form.banner_file ? "Choose other file" : "Choose a file..." })
            ] }),
            (form.banner || form.banner_file) && /* @__PURE__ */ jsx(Box, { mt: 4, children: /* @__PURE__ */ jsx(Image, { src: imagePreview.banner_file, alt: "Image Preview", boxSize: "200px", objectFit: "cover" }) }),
            /* @__PURE__ */ jsx(
              Input,
              {
                ref: bannerFileRef,
                type: "file",
                display: "none",
                accept: "image/*",
                name: "banner_file",
                onChange: handleFileChange
              }
            )
          ]
        }
      ),
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
            children: "Featured"
          }
        ),
        /* @__PURE__ */ jsx(
          Switch,
          {
            size: "lg",
            colorScheme: "brand",
            isChecked: form.featured === 1,
            onChange: () => {
              setForm((prevState) => ({
                ...prevState,
                featured: 1 - form.featured
              }));
            }
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsx(Button, { variant: "brand", mt: 3, mr: 3, onClick: handleSponsor, children: "Save" }),
    /* @__PURE__ */ jsx(Button, { mt: 3, onClick: () => setOpenedPage(0), children: "Cancel" })
  ] });
}
export {
  SponsorForm as default
};
