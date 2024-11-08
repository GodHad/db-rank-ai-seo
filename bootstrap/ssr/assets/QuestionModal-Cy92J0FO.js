import { jsx, Fragment, jsxs } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import { useToast, useDisclosure, useColorModeValue, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, FormControl, FormLabel, Text, Input, ModalFooter, Button } from "@chakra-ui/react";
import axios from "axios";
function QuestionModal({ _question, onopen, handleOnClose, handleOnUpdate }) {
  const toast = useToast();
  const { id, question } = _question;
  const { isOpen, onOpen, onClose } = useDisclosure();
  const textColor = useColorModeValue("navy.700", "white");
  const brandStars = useColorModeValue("brand.500", "brand.400");
  const [form, setForm] = useState({
    id,
    question
  });
  const handleChangeForm = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const handleQuestion = async () => {
    if (!form.id) {
      const res = await axios.post("/api/create-question", form);
      if (res.data.success) {
        onClose();
        clearForm();
        handleOnUpdate();
        toast({
          title: "You create new question successfully.",
          position: "top-right",
          status: "success",
          insert: "top",
          duration: 5e3,
          isClosable: true
        });
      } else {
        toast({
          title: "Failed to create new question.",
          position: "top-right",
          status: "error",
          insert: "top",
          duration: 5e3,
          isClosable: true
        });
      }
    } else {
      const res = await axios.post(`/api/update-question?id=${form.id}`, form);
      if (res.data.success) {
        onClose();
        clearForm();
        handleOnUpdate();
        toast({
          title: "Update question successfully.",
          position: "top-right",
          status: "success",
          insert: "top",
          duration: 5e3,
          isClosable: true
        });
      } else {
        toast({
          title: "Failed to update question.",
          position: "top-right",
          status: "error",
          insert: "top",
          duration: 5e3,
          isClosable: true
        });
      }
    }
  };
  useEffect(() => {
    if (onopen > 0) onOpen();
  }, [onopen, onOpen]);
  useEffect(() => {
    setForm({ id, question });
  }, [question]);
  const clearForm = () => {
    setForm({ id: null, question: "" });
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
        !question.id ? "Create" : "Update",
        " Question"
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
              "Question",
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
            type: "text",
            placeholder: "What's the best DBMS last month?",
            mb: "24px",
            fontWeight: "500",
            size: "lg",
            name: "question",
            value: form.question,
            onChange: handleChangeForm
          }
        )
      ] }) }),
      /* @__PURE__ */ jsxs(ModalFooter, { children: [
        /* @__PURE__ */ jsx(Button, { variant: "brand", mr: 3, onClick: handleQuestion, children: "Save" }),
        /* @__PURE__ */ jsx(Button, { onClick: onClose, children: "Cancel" })
      ] })
    ] })
  ] }) });
}
export {
  QuestionModal as default
};
