import { jsxs, jsx } from "react/jsx-runtime";
import { useState, useEffect, useRef } from "react";
import { useToast, useColorModeValue, Box, Text, FormControl, FormLabel, Icon, Image, Input, Switch, Button } from "@chakra-ui/react";
import { MdUploadFile } from "react-icons/md";
import { useQueryClient, useMutation } from "react-query";
import { c as createFeaturedProduct, u as updateFeaturedProduct } from "./use-request-9Ex0rx8h.js";
import { A as APP_URL } from "./statics-GI0iJz3l.js";
import { C as CustomInput } from "./CustomInput-D8rT110g.js";
import { Editor } from "react-draft-wysiwyg";
import { EditorState, Modifier, convertFromHTML, ContentState, convertToRaw } from "draft-js";
import draftToHtml from "draftjs-to-html";
import "../ssr.js";
import "react-dom/server";
import "@inertiajs/inertia-react";
import "@inertiajs/react/server";
import "@chakra-ui/theme-tools";
import "axios";
function FeaturedProductForm({ featuredProduct, setOpenedPage }) {
  const queryClient = useQueryClient();
  const toast = useToast();
  const textColor = useColorModeValue("navy.400", "white");
  const brandStars = useColorModeValue("brand.500", "brand.400");
  const {
    id,
    title,
    content,
    link,
    banner,
    published
  } = featuredProduct;
  const [form, setForm] = useState({
    id,
    title,
    content,
    link,
    banner,
    published,
    banner_file: null
  });
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const onEditorStateChange = function(editorState2) {
    setEditorState(editorState2);
    setForm((prevState) => ({ ...prevState, content: draftToHtml(convertToRaw(editorState2.getCurrentContent())) }));
  };
  const createFeaturedProductMutation = useMutation(createFeaturedProduct, {
    onSuccess: () => {
      queryClient.invalidateQueries("side_featured_products");
      setOpenedPage(0);
      toast({
        title: "Create new featured product successfully",
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
        title: "Failed to create featured product",
        description: key,
        position: "top-right",
        status: "error",
        insert: "top",
        duration: 5e3,
        isClosable: true
      });
    }
  });
  const updateFeaturedProductMutation = useMutation(updateFeaturedProduct, {
    onSuccess: () => {
      queryClient.invalidateQueries("side_featured_products");
      setOpenedPage(0);
      toast({
        title: "Update featured product successfully",
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
        title: "Failed to update featured product successfully",
        description: key,
        position: "top-right",
        status: "error",
        insert: "top",
        duration: 5e3,
        isClosable: true
      });
    }
  });
  const handleFeaturedProduct = () => {
    const formData = new FormData();
    formData.append("id", form.id);
    formData.append("title", form.title);
    formData.append("content", form.content);
    formData.append("link", form.link);
    formData.append("banner", banner);
    formData.append("published", form.published);
    if (form.banner_file) formData.append("banner_file", form.banner_file);
    if (!form.id) createFeaturedProductMutation.mutate({ featuredProduct: formData, type: "sidebar" });
    else updateFeaturedProductMutation.mutate({ id: featuredProduct.id, featuredProduct: formData });
  };
  const handleChangeForm = (e) => {
    setForm((prevState) => ({ ...prevState, [e.target.name]: e.target.value }));
  };
  const handlePastedText = (text, html, editorState2) => {
    const contentState = editorState2.getCurrentContent();
    const selection = editorState2.getSelection();
    const newContentState = Modifier.insertText(contentState, selection, text);
    const newEditorState = EditorState.push(editorState2, newContentState, "insert-characters");
    setEditorState(newEditorState);
    return true;
  };
  useEffect(() => {
    const currentContent = editorState.getCurrentContent();
    const selection = editorState.getSelection();
    const contentWithColor = Modifier.applyInlineStyle(
      currentContent,
      selection,
      "COLOR_" + textColor
    );
    const newEditorState = EditorState.push(editorState, contentWithColor, "change-inline-style");
    setEditorState(newEditorState);
  }, [textColor, editorState]);
  useEffect(() => {
    setForm((prevState) => ({
      ...prevState,
      id,
      title,
      content,
      link,
      banner,
      published
    }));
  }, [featuredProduct]);
  useEffect(() => {
    if (content) {
      const blocksFromHTML = convertFromHTML(content);
      const contentState = ContentState.createFromBlockArray(blocksFromHTML.contentBlocks, blocksFromHTML.entityMap);
      setEditorState(EditorState.createWithContent(contentState));
    }
  }, [content]);
  const [imagePreview, setImagePreview] = useState({
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
  const bannerFileRef = useRef(null);
  return /* @__PURE__ */ jsxs(Box, { p: "20px", children: [
    /* @__PURE__ */ jsxs(Text, { mb: "32px", fontSize: 22, children: [
      !featuredProduct.id ? "Create" : "Update",
      " Featured Product"
    ] }),
    /* @__PURE__ */ jsxs(FormControl, { children: [
      /* @__PURE__ */ jsx(CustomInput, { title: "Title", name: "title", value: form.title, handleChangeForm, textColor, brandStars }),
      /* @__PURE__ */ jsxs(FormControl, { mb: "24px", children: [
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
              "Content",
              /* @__PURE__ */ jsx(Text, { color: brandStars, children: "*" })
            ]
          }
        ),
        /* @__PURE__ */ jsx(
          Editor,
          {
            editorState,
            toolbarClassName: "toolbarClassName",
            wrapperClassName: "wrapperClassName",
            editorClassName: "editorClassName",
            editorStyle: { color: textColor, minHeight: 300 },
            toolbarStyle: { backgroundColor: "white", color: "black" },
            onEditorStateChange,
            handlePastedText,
            toolbar: {
              options: ["inline", "blockType", "fontSize", "list", "textAlign", "colorPicker", "link", "history"],
              inline: { inDropdown: false },
              blockType: { inDropdown: true },
              fontSize: { inDropdown: true },
              list: { inDropdown: false },
              textAlign: { inDropdown: true },
              link: { inDropdown: false },
              history: { inDropdown: false },
              image: { visible: false },
              embed: { visible: false }
            }
          }
        )
      ] }),
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
            children: "Published"
          }
        ),
        /* @__PURE__ */ jsx(
          Switch,
          {
            size: "lg",
            colorScheme: "brand",
            isChecked: form.published === 1,
            onChange: () => {
              setForm((prevState) => ({
                ...prevState,
                published: 1 - form.published
              }));
            }
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsx(Button, { variant: "brand", mt: 3, mr: 3, onClick: handleFeaturedProduct, children: "Save" }),
    /* @__PURE__ */ jsx(Button, { mt: 3, onClick: () => setOpenedPage(0), children: "Cancel" })
  ] });
}
export {
  FeaturedProductForm as default
};
