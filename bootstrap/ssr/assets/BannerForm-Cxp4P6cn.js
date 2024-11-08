import { jsxs, jsx } from "react/jsx-runtime";
import { useState, useEffect, useRef } from "react";
import { useToast, useColorModeValue, Box, Text, FormControl, FormLabel, Icon, Image, Input, Select, Button } from "@chakra-ui/react";
import { MdUploadFile } from "react-icons/md";
import { useQueryClient, useMutation } from "react-query";
import { c as createBanner, u as updateBanner } from "./use-request-CXEg0apC.js";
import { A as APP_URL } from "./statics-GI0iJz3l.js";
import { C as CustomInput } from "./CustomInput-D8rT110g.js";
import "../ssr.js";
import "react-dom/server";
import "@inertiajs/inertia-react";
import "@inertiajs/react/server";
import "@chakra-ui/theme-tools";
import "axios";
function BannerForm({ banner, setOpenedPage }) {
  const queryClient = useQueryClient();
  const toast = useToast();
  const textColor = useColorModeValue("navy.400", "white");
  const brandStars = useColorModeValue("brand.500", "brand.400");
  const {
    id,
    link,
    url,
    type
  } = banner;
  const [form, setForm] = useState({
    id,
    link,
    url,
    file: null,
    type
  });
  const createBannerMutation = useMutation(createBanner, {
    onSuccess: () => {
      queryClient.invalidateQueries("banners");
      setOpenedPage(0);
      toast({
        title: "Create new banner successfully",
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
        title: "Failed to create banner",
        description: key,
        position: "top-right",
        status: "error",
        insert: "top",
        duration: 5e3,
        isClosable: true
      });
    }
  });
  const updateBannerMutation = useMutation(updateBanner, {
    onSuccess: () => {
      queryClient.invalidateQueries("banners");
      setOpenedPage(0);
      toast({
        title: "Update banner successfully",
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
        title: "Failed to update banner successfully",
        description: key,
        position: "top-right",
        status: "error",
        insert: "top",
        duration: 5e3,
        isClosable: true
      });
    }
  });
  const handleBanner = () => {
    const formData = new FormData();
    formData.append("id", form.id);
    formData.append("link", form.link);
    formData.append("url", form.url);
    formData.append("type", form.type);
    if (form.file) formData.append("file", form.file);
    if (!form.id) createBannerMutation.mutate({ banner: formData });
    else updateBannerMutation.mutate({ id: banner.id, banner: formData });
  };
  const handleChangeForm = (e) => {
    setForm((prevState) => ({ ...prevState, [e.target.name]: e.target.value }));
  };
  useEffect(() => {
    setForm((prevState) => ({
      ...prevState,
      id,
      link,
      url,
      type
    }));
  }, [banner]);
  const [imagePreview, setImagePreview] = useState({
    file: APP_URL + "storage/" + url
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
  const fileRef = useRef(null);
  return /* @__PURE__ */ jsxs(Box, { p: "20px", children: [
    /* @__PURE__ */ jsxs(Text, { mb: "32px", fontSize: 22, children: [
      !banner.id ? "Create" : "Update",
      " Banner"
    ] }),
    /* @__PURE__ */ jsxs(FormControl, { children: [
      /* @__PURE__ */ jsx(CustomInput, { title: "Banner Link", name: "link", value: form.link, handleChangeForm, textColor, brandStars }),
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
            "Image",
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
            /* @__PURE__ */ jsxs(Box, { display: "flex", alignItems: "center", onClick: () => fileRef.current.click(), children: [
              /* @__PURE__ */ jsx(Icon, { as: MdUploadFile, mr: 2 }),
              /* @__PURE__ */ jsx(Text, { children: form.file ? "Choose other file" : "Choose a file..." })
            ] }),
            (form.url || form.file) && /* @__PURE__ */ jsx(Box, { mt: 4, width: "80%", display: "flex", justifyContent: "right", children: /* @__PURE__ */ jsx(Image, { src: imagePreview.file, alt: "Image Preview", width: "80%", height: "100px", objectFit: "cover" }) }),
            /* @__PURE__ */ jsx(
              Input,
              {
                ref: fileRef,
                type: "file",
                display: "none",
                accept: "image/*",
                name: "file",
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
            "Type",
            /* @__PURE__ */ jsx(Text, { color: brandStars, children: "*" })
          ]
        }
      ),
      /* @__PURE__ */ jsxs(
        Select,
        {
          placeholder: "Select option",
          variant: "auth",
          fontSize: "sm",
          ms: { base: "0px", md: "0px" },
          type: "text",
          mb: "24px",
          fontWeight: "500",
          size: "lg",
          borderColor: "gray",
          value: form.type,
          name: "type",
          onChange: handleChangeForm,
          children: [
            /* @__PURE__ */ jsx("option", { value: 0, children: "Top" }),
            /* @__PURE__ */ jsx("option", { value: 1, children: "Bottom" })
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsx(Button, { variant: "brand", mt: 3, mr: 3, onClick: handleBanner, children: "Save" }),
    /* @__PURE__ */ jsx(Button, { mt: 3, onClick: () => setOpenedPage(0), children: "Cancel" })
  ] });
}
export {
  BannerForm as default
};
