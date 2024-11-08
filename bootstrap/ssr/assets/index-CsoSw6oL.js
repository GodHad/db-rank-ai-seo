import { jsx, jsxs } from "react/jsx-runtime";
import { useState, useEffect, useRef } from "react";
import { useColorModeValue, useToast, Box, FormLabel, Textarea, Icon, Text, Image as Image$1, Input, Button } from "@chakra-ui/react";
import { MdUploadFile } from "react-icons/md";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import { ClassicEditor, Alignment, Autoformat, BlockQuote, Bold, CloudServices, Code, CodeBlock, Essentials, Heading, HorizontalLine, Image, ImageCaption, ImageInsert, ImageResize, ImageStyle, ImageToolbar, ImageUpload, MediaEmbed, Base64UploadAdapter, Italic, Link, List, Underline, Mention, Paragraph, SourceEditing, Strikethrough, Table, TableToolbar, TableProperties, TableColumnResize, TextTransformation, TodoList } from "ckeditor5";
/* empty css                   */
import { C as Card } from "./Card-M0XrdzyB.js";
import { C as CustomInput } from "./CustomInput-D8rT110g.js";
import { g as getPageContent, s as savePageContent } from "./use-request-5uE4EmuI.js";
import { useQueryClient, useMutation } from "react-query";
import { A as APP_URL } from "./statics-GI0iJz3l.js";
import "../ssr.js";
import "react-dom/server";
import "@inertiajs/inertia-react";
import "@inertiajs/react/server";
import "@chakra-ui/theme-tools";
import "axios";
function Template() {
  const queryClient = useQueryClient();
  const textColor = useColorModeValue("grey", "white");
  const bgColor = useColorModeValue("white", "navy.800");
  const toast = useToast();
  const [form, setForm] = useState({
    page: "home",
    content: "",
    meta_title: "",
    meta_description: "",
    og_graph_image: null,
    twitter_graph_image: null
  });
  const [imagePreview, setImagePreview] = useState({
    og_graph_file: null,
    twitter_graph_file: null
  });
  useEffect(() => {
    getPageContent("home").then((data) => {
      const { content, meta_title, meta_description, og_graph_image, twitter_graph_image } = data;
      setForm((prev) => ({
        ...prev,
        content,
        meta_title,
        meta_description,
        og_graph_image,
        twitter_graph_image
      }));
      setImagePreview({
        og_graph_file: APP_URL + "storage/" + og_graph_image,
        twitter_graph_file: APP_URL + "storage/" + twitter_graph_image
      });
    });
  }, []);
  const handleChangeForm = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const handleSingleFileChange = (event) => {
    const file = event.target.files[0];
    const fieldName = event.target.name;
    setForm((prevState) => ({
      ...prevState,
      [fieldName]: file
    }));
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview((prev) => ({
          ...prev,
          [fieldName]: reader.result
        }));
      };
      reader.readAsDataURL(file);
    }
  };
  const handleSubmit = () => {
    const formData = new FormData();
    formData.append("page", "home");
    formData.append("content", form.content);
    formData.append("meta_title", form.meta_title);
    formData.append("meta_description", form.meta_description);
    if (form.og_graph_image) formData.append("og_graph_file", form.og_graph_image);
    if (form.twitter_graph_image) formData.append("twitter_graph_file", form.twitter_graph_image);
    savePageContentMutation.mutate(formData);
  };
  const savePageContentMutation = useMutation(savePageContent, {
    onSuccess: () => {
      queryClient.invalidateQueries("getServiceContenthome");
      toast({
        title: "Content saved successfully!",
        status: "success",
        duration: 5e3,
        isClosable: true
      });
    },
    onError: (error) => {
      var _a, _b;
      toast({
        title: "Error saving content",
        description: ((_b = (_a = error.response) == null ? void 0 : _a.data) == null ? void 0 : _b.message) || "An error occurred",
        status: "error",
        duration: 5e3,
        isClosable: true
      });
    }
  });
  const ogGraphFileRef = useRef(null);
  const twitterGraphFileRef = useRef(null);
  return /* @__PURE__ */ jsx(
    Card,
    {
      flexDirection: "column",
      w: "100%",
      px: "0px",
      overflowX: { sm: "scroll", lg: "hidden" },
      children: /* @__PURE__ */ jsxs(Box, { p: "20px", children: [
        /* @__PURE__ */ jsx(
          FormLabel,
          {
            display: "flex",
            ms: "4px",
            fontSize: "sm",
            fontWeight: "500",
            color: textColor,
            mb: "8px",
            children: "Content"
          }
        ),
        /* @__PURE__ */ jsx(
          CKEditor,
          {
            editor: ClassicEditor,
            config: {
              plugins: [
                Alignment,
                Autoformat,
                BlockQuote,
                Bold,
                CloudServices,
                Code,
                CodeBlock,
                Essentials,
                Heading,
                HorizontalLine,
                Image,
                ImageCaption,
                ImageInsert,
                ImageResize,
                ImageStyle,
                ImageToolbar,
                ImageUpload,
                MediaEmbed,
                Base64UploadAdapter,
                Italic,
                Link,
                List,
                Underline,
                Mention,
                Paragraph,
                SourceEditing,
                Strikethrough,
                Table,
                TableToolbar,
                TableProperties,
                TableColumnResize,
                TextTransformation,
                TodoList
              ],
              toolbar: [
                "undo",
                "redo",
                "|",
                "heading",
                "|",
                "bold",
                "italic",
                "alignment",
                "strikethrough",
                "underline",
                "code",
                "|",
                "bulletedList",
                "numberedList",
                "todoList",
                "|",
                "link",
                "uploadImage",
                "mediaEmbed",
                "insertTable",
                "blockQuote",
                "codeBlock",
                "horizontalLine"
              ],
              alignment: {
                options: ["left", "center", "right", "justify"]
                // Specify the alignment options
              },
              image: {
                resizeOptions: [
                  {
                    name: "resizeImage:original",
                    label: "Default image width",
                    value: null
                  },
                  {
                    name: "resizeImage:50",
                    label: "50% page width",
                    value: "50"
                  },
                  {
                    name: "resizeImage:75",
                    label: "75% page width",
                    value: "75"
                  }
                ],
                toolbar: [
                  "imageTextAlternative",
                  "toggleImageCaption",
                  "|",
                  "imageStyle:inline",
                  "imageStyle:wrapText",
                  "imageStyle:breakText",
                  "|",
                  "resizeImage"
                ],
                insert: {
                  integrations: ["url"]
                }
              },
              table: {
                contentToolbar: ["tableColumn", "tableRow", "mergeTableCells", "tableProperties"]
              }
            },
            data: form.content,
            onChange: (event, editor) => {
              const data = editor.getData();
              setForm((prev) => ({ ...prev, content: data }));
            }
          }
        ),
        /* @__PURE__ */ jsx(CustomInput, { title: "Meta title", name: "meta_title", value: form.meta_title, handleChangeForm, textColor }),
        /* @__PURE__ */ jsx(
          FormLabel,
          {
            display: "flex",
            ms: "4px",
            fontSize: "sm",
            fontWeight: "500",
            color: textColor,
            mb: "8px",
            children: "Meta description"
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
            name: "meta_description",
            value: form.meta_description,
            onChange: handleChangeForm
          }
        ),
        /* @__PURE__ */ jsx(
          FormLabel,
          {
            display: "flex",
            ms: "4px",
            fontSize: "sm",
            fontWeight: "500",
            color: textColor,
            mb: "8px",
            children: "Og Graph Image"
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
              /* @__PURE__ */ jsxs(Box, { display: "flex", alignItems: "center", onClick: () => ogGraphFileRef.current.click(), children: [
                /* @__PURE__ */ jsx(Icon, { as: MdUploadFile, mr: 2 }),
                /* @__PURE__ */ jsx(Text, { children: form.og_graph_file ? "Choose other file" : "Choose a file..." })
              ] }),
              (form.og_graph_file || form.og_graph_image) && /* @__PURE__ */ jsx(Box, { mt: 4, children: /* @__PURE__ */ jsx(Image$1, { src: imagePreview.og_graph_file, alt: "Image Preview", boxSize: "200px", objectFit: "cover" }) }),
              /* @__PURE__ */ jsx(
                Input,
                {
                  ref: ogGraphFileRef,
                  type: "file",
                  display: "none",
                  accept: "image/*",
                  name: "og_graph_file",
                  onChange: handleSingleFileChange
                }
              )
            ]
          }
        ),
        /* @__PURE__ */ jsx(
          FormLabel,
          {
            display: "flex",
            ms: "4px",
            fontSize: "sm",
            fontWeight: "500",
            color: textColor,
            mb: "8px",
            children: "Twitter Graph Image"
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
              /* @__PURE__ */ jsxs(Box, { display: "flex", alignItems: "center", onClick: () => twitterGraphFileRef.current.click(), children: [
                /* @__PURE__ */ jsx(Icon, { as: MdUploadFile, mr: 2 }),
                /* @__PURE__ */ jsx(Text, { children: form.twitter_graph_file ? "Choose other file" : "Choose a file..." })
              ] }),
              (form.twitter_graph_file || form.twitter_graph_image) && /* @__PURE__ */ jsx(Box, { mt: 4, children: /* @__PURE__ */ jsx(Image$1, { src: imagePreview.twitter_graph_file, alt: "Image Preview", boxSize: "200px", objectFit: "cover" }) }),
              /* @__PURE__ */ jsx(
                Input,
                {
                  ref: twitterGraphFileRef,
                  type: "file",
                  display: "none",
                  accept: "image/*",
                  name: "twitter_graph_file",
                  onChange: handleSingleFileChange
                }
              )
            ]
          }
        ),
        /* @__PURE__ */ jsx(Button, { variant: "brand", mt: 3, mr: 3, onClick: handleSubmit, children: "Save" })
      ] })
    }
  );
}
export {
  Template as default
};
