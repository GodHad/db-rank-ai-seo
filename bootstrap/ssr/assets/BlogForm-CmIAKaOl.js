import { jsx, jsxs } from "react/jsx-runtime";
import { useRef, useState, useEffect } from "react";
import { useToast, useColorModeValue, Flex, Spinner, Box, Text, FormControl, FormLabel, Icon, Image, Input, Textarea, Button } from "@chakra-ui/react";
import { MdUploadFile, MdClose } from "react-icons/md";
import { useQueryClient, useQuery, useMutation } from "react-query";
import { g as getCategories, a as getTags, c as createBlog, u as updateBlog } from "./use-request-DWBiJfY6.js";
import { C as CustomMultiSelect } from "./CustomMultiSelect-CrKxktuE.js";
import { C as CustomInput } from "./CustomInput-D8rT110g.js";
/* empty css                   */
import { A as APP_URL } from "./statics-GI0iJz3l.js";
import "../ssr.js";
import "react-dom/server";
import "@inertiajs/inertia-react";
import "@inertiajs/react/server";
import "@chakra-ui/theme-tools";
import "axios";
import "chakra-react-select";
function BlogForm({ blog, setOpenedPage }) {
  const queryClient = useQueryClient();
  const toast = useToast();
  const textColor = useColorModeValue("grey", "white");
  const brandStars = useColorModeValue("brand.500", "brand.400");
  const bgColor = useColorModeValue("white", "navy.800");
  const { data: bCategories, isLoadingCategories } = useQuery("bcategories", getCategories);
  const { data: bTags, isLoadingTags } = useQuery("tags", getTags);
  const featuredImagesRef = useRef(null);
  const {
    id,
    title,
    description,
    content,
    tags,
    categories,
    featured_images,
    meta_title,
    meta_description,
    og_graph_image,
    twitter_graph_image
  } = blog;
  const [form, setForm] = useState({
    id,
    title,
    description,
    content,
    tags,
    categories,
    featured_files: [],
    featured_images: featured_images.map((image) => APP_URL + "storage/" + image.url),
    meta_title,
    meta_description,
    og_graph_image,
    twitter_graph_image,
    og_graph_file: null,
    twitter_graph_file: null
  });
  const createBlogMutation = useMutation(createBlog, {
    onSuccess: () => {
      queryClient.invalidateQueries("blogs");
      setOpenedPage(0);
      toast({
        title: "Create new Blog successfully",
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
        title: "Failed to create Blog",
        description: key,
        position: "top-right",
        status: "error",
        insert: "top",
        duration: 5e3,
        isClosable: true
      });
    }
  });
  const updateBlogMutation = useMutation(updateBlog, {
    onSuccess: () => {
      queryClient.invalidateQueries("blogs");
      setOpenedPage(0);
      toast({
        title: "Update Blog successfully",
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
        title: "Failed to update Blog",
        description: key,
        position: "top-right",
        status: "error",
        insert: "top",
        duration: 5e3,
        isClosable: true
      });
    }
  });
  const handleBlog = () => {
    const formData = new FormData();
    formData.append("title", form.title);
    formData.append("description", form.description);
    formData.append("content", form.content);
    formData.append("categories", form.categories);
    formData.append("tags", form.tags);
    formData.append("meta_title", form.meta_title);
    formData.append("meta_description", form.meta_description);
    if (form.twitter_graph_image) formData.append("twitter_graph_image", form.twitter_graph_image);
    if (form.og_graph_image) formData.append("og_graph_image", form.og_graph_image);
    if (form.og_graph_file) formData.append("og_graph_file", form.og_graph_file);
    if (form.twitter_graph_file) formData.append("twitter_graph_file", form.twitter_graph_file);
    form.featured_files.forEach((file) => {
      formData.append("featured_files[]", file);
    });
    if (!form.id) {
      createBlogMutation.mutate({ blog: formData });
    } else {
      if (form.featured_images.length > 0)
        formData.append("featured_images[]", form.featured_images);
      if (removedImages.length > 0)
        formData.append("removed_images[]", removedImages);
      updateBlogMutation.mutate({ id: form.id, blog: formData });
    }
  };
  const handleChangeForm = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  useEffect(() => {
    setForm((prev) => ({
      ...prev,
      id,
      title,
      content,
      description,
      tags,
      categories,
      featured_files: [],
      featured_images: featured_images.map((image) => APP_URL + "storage/" + image.url),
      meta_title,
      meta_description,
      og_graph_image,
      twitter_graph_image
    }));
    setImagePreview((prev) => ({
      ...prev,
      og_graph_file: APP_URL + "storage/" + og_graph_image,
      twitter_graph_file: APP_URL + "storage/" + twitter_graph_image
    }));
  }, [blog]);
  const handleChangeMultiSelect = (name, value) => {
    setForm({ ...form, [name]: value });
  };
  const [imagePreview, setImagePreview] = useState({
    featured_file: [],
    og_graph_file: APP_URL + "storage/" + og_graph_image,
    twitter_graph_file: APP_URL + "storage/" + twitter_graph_image
  });
  const handleSingleFileChange = (event) => {
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
  const ogGraphFileRef = useRef(null);
  const twitterGraphFileRef = useRef(null);
  const [removedImages, setRemovedImages] = useState([]);
  const handleFileChange = (event) => {
    const files = Array.from(event.target.files);
    const newPreviews = [];
    files.forEach((file) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        newPreviews.push(reader.result);
        if (newPreviews.length === files.length) {
          setImagePreview((prev) => ({ ...prev, featured_file: [...prev.featured_file, ...newPreviews] }));
        }
      };
      reader.readAsDataURL(file);
    });
    setForm((prevState) => ({
      ...prevState,
      [event.target.name]: [...prevState[event.target.name] || [], ...files]
    }));
  };
  const handleRemoveNewImage = (index) => {
    setImagePreview((prev) => ({ ...prev, featured_file: prev.featured_file.filter((_, i) => i !== index) }));
    setForm((prevState) => ({
      ...prevState,
      featured_files: prevState.featured_images.filter((_, i) => i !== index)
    }));
  };
  const handleRemoveExistingImage = (index) => {
    setForm((prev) => ({ ...prev, featured_images: prev.featured_images.filter((_, i) => i !== index) }));
    setRemovedImages((prev) => [...prev, featured_images[index].id]);
  };
  if (isLoadingCategories || isLoadingTags || !bCategories || !bTags) {
    return /* @__PURE__ */ jsx(Flex, { justifyContent: "center", minH: "300px", alignItems: "center", children: /* @__PURE__ */ jsx(Spinner, {}) });
  }
  const [Editor, setEditor] = useState(null);
  const [editorLoaded, setEditorLoaded] = useState(false);
  useEffect(() => {
    if (typeof window !== "undefined") {
      Promise.all([
        import("@ckeditor/ckeditor5-react").then((module) => module.CKEditor),
        import("ckeditor5").then((ckModules) => ({
          ClassicEditor: ckModules.ClassicEditor,
          Essentials: ckModules.Essentials,
          Alignment: ckModules.Alignment,
          Autoformat: ckModules.Autoformat,
          BlockQuote: ckModules.BlockQuote,
          Bold: ckModules.Bold,
          CloudServices: ckModules.CloudServices,
          Code: ckModules.Code,
          CodeBlock: ckModules.CodeBlock,
          Heading: ckModules.Heading,
          HorizontalLine: ckModules.HorizontalLine,
          Image: ckModules.Image,
          ImageToolbar: ckModules.ImageToolbar,
          ImageUpload: ckModules.ImageUpload,
          Base64UploadAdapter: ckModules.Base64UploadAdapter,
          Italic: ckModules.Italic,
          Link: ckModules.Link,
          List: ckModules.List,
          Mention: ckModules.Mention,
          Paragraph: ckModules.Paragraph,
          MediaEmbed: ckModules.MediaEmbed,
          SourceEditing: ckModules.SourceEditing,
          Strikethrough: ckModules.Strikethrough,
          Underline: ckModules.Underline,
          Table: ckModules.Table,
          TableToolbar: ckModules.TableToolbar,
          TableColumnResize: ckModules.TableColumnResize,
          TableProperties: ckModules.TableProperties,
          TextTransformation: ckModules.TextTransformation,
          TodoList: ckModules.TodoList,
          ImageCaption: ckModules.ImageCaption,
          ImageInsert: ckModules.ImageInsert,
          ImageResize: ckModules.ImageResize,
          ImageStyle: ckModules.ImageStyle
        }))
      ]).then(([CKEditorComponent, ckModules]) => {
        setEditor(() => ({
          CKEditor: CKEditorComponent,
          ...ckModules
        }));
        setEditorLoaded(true);
      });
    }
  }, []);
  return /* @__PURE__ */ jsxs(Box, { p: "20px", children: [
    /* @__PURE__ */ jsxs(Text, { mb: "32px", fontSize: 22, children: [
      !blog.id ? "Create" : "Update",
      " Blog"
    ] }),
    /* @__PURE__ */ jsx(FormControl, { children: /* @__PURE__ */ jsx(CustomInput, { title: "Title", name: "title", value: form.title, handleChangeForm, textColor, brandStars }) }),
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
      editorLoaded && /* @__PURE__ */ jsx(
        Editor.CKEditor,
        {
          editor: Editor.ClassicEditor,
          config: {
            plugins: [
              Editor.ClassicEditor,
              Editor.Essentials,
              Editor.Alignment,
              Editor.Autoformat,
              Editor.BlockQuote,
              Editor.Bold,
              Editor.CloudServices,
              Editor.Code,
              Editor.CodeBlock,
              Editor.Heading,
              Editor.HorizontalLine,
              Editor.Image,
              Editor.ImageToolbar,
              Editor.ImageUpload,
              Editor.Base64UploadAdapter,
              Editor.Italic,
              Editor.Link,
              Editor.List,
              Editor.Mention,
              Editor.Paragraph,
              Editor.MediaEmbed,
              Editor.SourceEditing,
              Editor.Strikethrough,
              Editor.Underline,
              Editor.Table,
              Editor.TableToolbar,
              Editor.TableColumnResize,
              Editor.TableProperties,
              Editor.TextTransformation,
              Editor.TodoList,
              Editor.ImageCaption,
              Editor.ImageInsert,
              Editor.ImageResize,
              Editor.ImageStyle
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
      )
    ] }),
    /* @__PURE__ */ jsxs(FormControl, { children: [
      /* @__PURE__ */ jsx(CustomMultiSelect, { title: "Categories", name: "categories", value: form.categories, handleChangeMultiSelect, brandStars, options: isLoadingCategories || !bCategories ? [] : bCategories.map((category) => ({ id: category.id, value: category.name, label: category.name })) }),
      /* @__PURE__ */ jsx(CustomMultiSelect, { title: "Tags", name: "tags", value: form.tags, handleChangeMultiSelect, brandStars, options: isLoadingTags || !bTags ? [] : bTags.map((tag) => ({ id: tag.id, value: tag.name, label: tag.name })) })
    ] }),
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
            "Featured Images",
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
          _hover: { borderColor: "gray.400" },
          children: [
            /* @__PURE__ */ jsxs(Box, { display: "flex", alignItems: "center", children: [
              /* @__PURE__ */ jsx(Icon, { as: MdUploadFile, mr: 2 }),
              /* @__PURE__ */ jsx(Text, { cursor: "pointer", onClick: () => featuredImagesRef.current.click(), children: form.featured_images && form.featured_images.length > 0 ? "Choose more files" : "Choose a file..." })
            ] }),
            /* @__PURE__ */ jsxs(Box, { mt: 4, display: "flex", flexWrap: "wrap", children: [
              form.featured_images && form.featured_images.length > 0 && form.featured_images.map((image, index) => /* @__PURE__ */ jsxs(Box, { position: "relative", mr: 2, mb: 2, children: [
                /* @__PURE__ */ jsx(Image, { src: image, alt: `Existing Image ${index}`, boxSize: "100px", objectFit: "cover" }),
                /* @__PURE__ */ jsx(
                  Icon,
                  {
                    as: MdClose,
                    position: "absolute",
                    top: "0",
                    right: "0",
                    cursor: "pointer",
                    color: "gray.100",
                    backgroundColor: "gray.800",
                    borderRadius: "50%",
                    onClick: () => handleRemoveExistingImage(index)
                  }
                )
              ] }, index)),
              imagePreview.featured_file && imagePreview.featured_file.length > 0 && imagePreview.featured_file.map((image, index) => /* @__PURE__ */ jsxs(Box, { position: "relative", mr: 2, mb: 2, children: [
                /* @__PURE__ */ jsx(Image, { src: image, alt: `New Image Preview ${index}`, boxSize: "100px", objectFit: "cover" }),
                /* @__PURE__ */ jsx(
                  Icon,
                  {
                    as: MdClose,
                    position: "absolute",
                    top: "0",
                    right: "0",
                    cursor: "pointer",
                    backgroundColor: "gray.800",
                    color: "gray.100",
                    borderRadius: "50%",
                    onClick: () => handleRemoveNewImage(index)
                  }
                )
              ] }, index))
            ] }),
            /* @__PURE__ */ jsx(
              Input,
              {
                ref: featuredImagesRef,
                type: "file",
                display: "none",
                multiple: true,
                accept: "image/*",
                name: "featured_files",
                onChange: handleFileChange
              }
            )
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsx(CustomInput, { title: "Meta title", name: "meta_title", value: form.meta_title, handleChangeForm, textColor, brandStars }),
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
          "Meta description",
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
        name: "meta_description",
        value: form.meta_description,
        onChange: handleChangeForm
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
          "Og Graph Image ",
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
          /* @__PURE__ */ jsxs(Box, { display: "flex", alignItems: "center", onClick: () => ogGraphFileRef.current.click(), children: [
            /* @__PURE__ */ jsx(Icon, { as: MdUploadFile, mr: 2 }),
            /* @__PURE__ */ jsx(Text, { children: form.og_graph_file ? "Choose other file" : "Choose a file..." })
          ] }),
          (form.og_graph_file || form.og_graph_image) && /* @__PURE__ */ jsx(Box, { mt: 4, children: /* @__PURE__ */ jsx(Image, { src: imagePreview.og_graph_file, alt: "Image Preview", boxSize: "200px", objectFit: "cover" }) }),
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
          "Twitter Graph Image",
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
          /* @__PURE__ */ jsxs(Box, { display: "flex", alignItems: "center", onClick: () => twitterGraphFileRef.current.click(), children: [
            /* @__PURE__ */ jsx(Icon, { as: MdUploadFile, mr: 2 }),
            /* @__PURE__ */ jsx(Text, { children: form.twitter_graph_file ? "Choose other file" : "Choose a file..." })
          ] }),
          (form.twitter_graph_file || form.twitter_graph_image) && /* @__PURE__ */ jsx(Box, { mt: 4, children: /* @__PURE__ */ jsx(Image, { src: imagePreview.twitter_graph_file, alt: "Image Preview", boxSize: "200px", objectFit: "cover" }) }),
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
    /* @__PURE__ */ jsx(Button, { variant: "brand", mt: 3, mr: 3, onClick: handleBlog, children: "Save" }),
    /* @__PURE__ */ jsx(Button, { mt: 3, onClick: () => setOpenedPage(0), children: "Cancel" })
  ] });
}
export {
  BlogForm as default
};
