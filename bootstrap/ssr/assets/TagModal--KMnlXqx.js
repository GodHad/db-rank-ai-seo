import { jsx, Fragment, jsxs } from "react/jsx-runtime";
import React__default, { useState } from "react";
import { useToast, useDisclosure, useColorModeValue, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, FormControl, FormLabel, Text, Input, ModalFooter, Button } from "@chakra-ui/react";
import "../ssr.js";
import axios from "axios";
import "react-dom/server";
import "@inertiajs/inertia-react";
import "@inertiajs/react/server";
import "@chakra-ui/theme-tools";
import "react-query";
function TagModal({ tag, onopen, handleOnClose, handleOnUpdate }) {
  const toast = useToast();
  const { id, name } = tag;
  const { isOpen, onOpen, onClose } = useDisclosure();
  const textColor = useColorModeValue("navy.700", "white");
  const brandStars = useColorModeValue("brand.500", "brand.400");
  const [form, setForm] = useState({
    id,
    name
  });
  const handleChangeForm = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const handleTag = async () => {
    if (!form.id) {
      const res = await axios.post("/api/blog/create-tag", form);
      if (res.data.success) {
        onClose();
        handleOnUpdate();
        toast({
          title: "Create new tag successfully",
          position: "top-right",
          status: "success",
          insert: "top",
          duration: 5e3,
          isClosable: true
        });
      } else {
        toast({
          title: "Failed to create new tag",
          position: "top-right",
          status: "error",
          insert: "top",
          duration: 5e3,
          isClosable: true
        });
      }
    } else {
      const res = await axios.post(`/api/blog/update-tag?id=${form.id}`, form);
      if (res.data.success) {
        onClose();
        handleOnUpdate();
        toast({
          title: "Update tag successfully",
          position: "top-right",
          status: "success",
          insert: "top",
          duration: 5e3,
          isClosable: true
        });
      } else {
        toast({
          title: "Failed to update tag",
          position: "top-right",
          status: "error",
          insert: "top",
          duration: 5e3,
          isClosable: true
        });
      }
    }
  };
  React__default.useEffect(() => {
    if (onopen > 0) onOpen();
  }, [onopen, onOpen]);
  React__default.useEffect(() => {
    setForm({ id, name });
  }, [tag]);
  const clearForm = () => {
    setForm({ id: null, name: "" });
  };
  const handleCloseModal = () => {
    onClose();
    clearForm();
    handleOnClose();
  };
  return /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsxs(Modal, { closeOnOverlayClick: false, isOpen, onClose: handleCloseModal, children: [
    /* @__PURE__ */ jsx(ModalOverlay, {}),
    /* @__PURE__ */ jsxs(ModalContent, { children: [
      /* @__PURE__ */ jsxs(ModalHeader, { children: [
        !tag.id ? "Create" : "Update",
        " Tag"
      ] }),
      /* @__PURE__ */ jsx(ModalCloseButton, {}),
      /* @__PURE__ */ jsx(ModalBody, { pb: 6, children: /* @__PURE__ */ jsxs(FormControl, { children: [
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
              "Name",
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
            placeholder: "e.g. Relational Database",
            mb: "24px",
            fontWeight: "500",
            size: "lg",
            name: "name",
            value: form.name,
            onChange: handleChangeForm
          }
        )
      ] }) }),
      /* @__PURE__ */ jsxs(ModalFooter, { children: [
        /* @__PURE__ */ jsx(Button, { variant: "brand", mr: 3, onClick: handleTag, children: "Save" }),
        /* @__PURE__ */ jsx(Button, { onClick: onClose, children: "Cancel" })
      ] })
    ] })
  ] }) });
}
export {
  TagModal as default
};
