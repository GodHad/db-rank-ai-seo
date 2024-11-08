import { jsx, jsxs, Fragment } from "react/jsx-runtime";
import { useState, useMemo, useEffect } from "react";
import { useToast, useColorModeValue, Text, Box, Link, Icon, Flex, Tooltip, IconButton, NumberInput, NumberInputField, NumberInputStepper, NumberIncrementStepper, NumberDecrementStepper, Select, Button, Table, Thead, Tr, Th, Tbody, Td } from "@chakra-ui/react";
import { MdEdit, MdDelete, MdArrowLeft, MdChevronLeft, MdChevronRight, MdArrowRight, MdAdd } from "react-icons/md";
import { useReactTable, getSortedRowModel, getCoreRowModel, flexRender, createColumnHelper } from "@tanstack/react-table";
import { useQueryClient, useQuery, useMutation } from "react-query";
import { C as Card } from "./Card-M0XrdzyB.js";
import BlogForm from "./BlogForm-CmIAKaOl.js";
import { b as getBlogs, d as getBlog, e as deleteBlog } from "./use-request-DWBiJfY6.js";
import "./CustomMultiSelect-CrKxktuE.js";
import "chakra-react-select";
import "./CustomInput-D8rT110g.js";
/* empty css                   */
import "./statics-GI0iJz3l.js";
import "../ssr.js";
import "react-dom/server";
import "@inertiajs/inertia-react";
import "@inertiajs/react/server";
import "@chakra-ui/theme-tools";
import "axios";
const columnHelper = createColumnHelper();
const initialBlog = {
  id: null,
  title: "",
  description: "",
  content: "",
  tags: [],
  categories: [],
  featured_images: [],
  meta_title: "",
  meta_description: "",
  og_graph_image: "",
  twitter_graph_image: ""
};
const parse = (htmlString) => {
  const tempElement = document.createElement("div");
  tempElement.innerHTML = htmlString;
  const text = tempElement.textContent;
  return text;
};
const Blogs = () => {
  const toast = useToast();
  const queryClient = useQueryClient();
  const [sorting, setSorting] = useState([]);
  const textColor = useColorModeValue("secondaryGray.900", "white");
  const borderColor = useColorModeValue("gray.200", "whiteAlpha.100");
  const [openedPage, setOpenedPage] = useState(0);
  const [page, setPage] = useState(1);
  const [countPerPage, setCountPerPage] = useState(10);
  const { data: blogs = {} } = useQuery(["blogs", page, countPerPage], () => getBlogs({ page, countPerPage }), { staleTime: 3e4 });
  const memorizedData = useMemo(() => {
    if (Array.isArray(blogs.data)) {
      return blogs.data;
    }
    return [];
  }, [blogs.data]);
  const [blog, setBlog] = useState(initialBlog);
  const [blogId, setBlogId] = useState(null);
  const { data: _blog } = useQuery(
    ["blog", blogId],
    () => getBlog(blogId),
    {
      enabled: !!blogId
    }
  );
  useEffect(() => {
    if (_blog)
      setBlog({
        ..._blog,
        tags: _blog.tags.map((tag) => tag.id),
        categories: _blog.categories.map((category) => category.id)
      });
  }, [_blog]);
  const handleGetBlogAndOpenModal = async (id) => {
    setBlogId(id);
    setOpenedPage(1);
  };
  const handleDeleteBlog = useMutation(deleteBlog, {
    onSuccess: () => {
      queryClient.invalidateQueries("blogs");
      toast({
        title: "Delete Blog successfully",
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
        title: "Failed to Delete Blog",
        description: key,
        position: "top-right",
        status: "error",
        insert: "top",
        duration: 5e3,
        isClosable: true
      });
    }
  });
  const columns = [
    columnHelper.accessor("no", {
      id: "no",
      header: () => /* @__PURE__ */ jsx(
        Text,
        {
          justifyContent: "center",
          align: "center",
          fontSize: { sm: "10px", lg: "12px" },
          color: "gray.400",
          children: "No"
        }
      ),
      cell: (info) => /* @__PURE__ */ jsx(Text, { color: textColor, fontSize: "sm", fontWeight: "700", children: countPerPage * (page - 1) + info.row.index + 1 })
    }),
    columnHelper.accessor("title", {
      id: "title",
      header: () => /* @__PURE__ */ jsx(
        Text,
        {
          justifyContent: "center",
          align: "center",
          fontSize: { sm: "10px", lg: "12px" },
          color: "gray.400",
          children: "Title"
        }
      ),
      cell: (info) => /* @__PURE__ */ jsx(Text, { color: textColor, fontSize: "sm", fontWeight: "700", children: info.getValue() })
    }),
    columnHelper.accessor("content", {
      id: "content",
      header: () => /* @__PURE__ */ jsx(
        Text,
        {
          justifyContent: "center",
          align: "center",
          fontSize: { sm: "10px", lg: "12px" },
          color: "gray.400",
          children: "Content"
        }
      ),
      cell: (info) => {
        return /* @__PURE__ */ jsx(Box, { maxW: "400px", children: /* @__PURE__ */ jsx(Text, { color: textColor, fontSize: "sm", fontWeight: "700", isTruncated: true, children: parse(info.getValue()) }) });
      }
    }),
    columnHelper.accessor("action", {
      id: "action",
      header: () => /* @__PURE__ */ jsx(
        Text,
        {
          justifyContent: "space-between",
          align: "center",
          fontSize: { sm: "10px", lg: "12px" },
          color: "gray.400",
          children: "Actions"
        }
      ),
      cell: (info) => /* @__PURE__ */ jsxs(Fragment, { children: [
        /* @__PURE__ */ jsx(
          Link,
          {
            variant: "no-hover",
            me: "16px",
            ms: "auto",
            p: "0px !important",
            onClick: () => {
              handleGetBlogAndOpenModal(info.row.original.id);
            },
            children: /* @__PURE__ */ jsx(Icon, { as: MdEdit, color: "secondaryGray.500", h: "18px", w: "18px" })
          }
        ),
        /* @__PURE__ */ jsx(
          Link,
          {
            variant: "no-hover",
            me: "16px",
            ms: "auto",
            p: "0px !important",
            onClick: () => handleDeleteBlog.mutate(info.row.original.id),
            children: /* @__PURE__ */ jsx(Icon, { as: MdDelete, color: "secondaryGray.500", h: "18px", w: "18px" })
          }
        )
      ] })
    })
  ];
  const table = useReactTable({
    data: memorizedData || [],
    columns,
    state: {
      sorting
    },
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    getCoreRowModel: getCoreRowModel(),
    debugTable: false
  });
  const paginationControls = useMemo(() => /* @__PURE__ */ jsxs(Flex, { justifyContent: "space-between", m: 4, alignItems: "center", children: [
    /* @__PURE__ */ jsxs(Flex, { mr: 2, children: [
      /* @__PURE__ */ jsx(Tooltip, { label: "First Page", children: /* @__PURE__ */ jsx(
        IconButton,
        {
          onClick: () => setPage(1),
          isDisabled: blogs.current_page === 1,
          icon: /* @__PURE__ */ jsx(MdArrowLeft, { h: 3, w: 3 }),
          mr: 4
        }
      ) }),
      /* @__PURE__ */ jsx(Tooltip, { label: "Previous Page", children: /* @__PURE__ */ jsx(
        IconButton,
        {
          onClick: () => {
            if (page > 1) setPage(page - 1);
          },
          isDisabled: blogs.current_page === 1,
          icon: /* @__PURE__ */ jsx(MdChevronLeft, { h: 6, w: 6 })
        }
      ) })
    ] }),
    /* @__PURE__ */ jsxs(Flex, { alignItems: "center", children: [
      /* @__PURE__ */ jsxs(Text, { flexShrink: "0", mr: 4, children: [
        "Page",
        " ",
        /* @__PURE__ */ jsx(Text, { fontWeight: "bold", as: "span", children: blogs.current_page }),
        " ",
        "of",
        " ",
        /* @__PURE__ */ jsx(Text, { fontWeight: "bold", as: "span", children: blogs.last_page })
      ] }),
      /* @__PURE__ */ jsx(Text, { flexShrink: "0", children: "Go to" }),
      " ",
      /* @__PURE__ */ jsxs(
        NumberInput,
        {
          ml: 2,
          mr: 4,
          w: 20,
          min: 1,
          max: blogs.last_page,
          value: blogs.current_page,
          onChange: (_, value) => {
            if (value >= 1 && value <= blogs.last_page) {
              setPage(value);
            }
          },
          children: [
            /* @__PURE__ */ jsx(NumberInputField, {}),
            /* @__PURE__ */ jsxs(NumberInputStepper, { children: [
              /* @__PURE__ */ jsx(NumberIncrementStepper, {}),
              /* @__PURE__ */ jsx(NumberDecrementStepper, {})
            ] })
          ]
        }
      ),
      /* @__PURE__ */ jsx(
        Select,
        {
          w: 32,
          color: textColor,
          value: countPerPage,
          onChange: (e) => setCountPerPage(Number(e.target.value)),
          children: [10, 20, 30, 40, 50].map((pageSize) => /* @__PURE__ */ jsxs("option", { value: pageSize, children: [
            "Show ",
            pageSize
          ] }, pageSize))
        }
      )
    ] }),
    /* @__PURE__ */ jsxs(Flex, { children: [
      /* @__PURE__ */ jsx(Tooltip, { label: "Next Page", children: /* @__PURE__ */ jsx(
        IconButton,
        {
          onClick: () => {
            if (page < blogs.last_page) setPage(page + 1);
          },
          isDisabled: blogs.current_page === blogs.last_page,
          icon: /* @__PURE__ */ jsx(MdChevronRight, { h: 10, w: 10 })
        }
      ) }),
      /* @__PURE__ */ jsx(Tooltip, { label: "Last Page", children: /* @__PURE__ */ jsx(
        IconButton,
        {
          onClick: () => setPage(blogs.last_page),
          isDisabled: blogs.current_page === blogs.last_page,
          icon: /* @__PURE__ */ jsx(MdArrowRight, { h: 10, w: 10 }),
          ml: 4
        }
      ) })
    ] })
  ] }), [blogs]);
  return /* @__PURE__ */ jsxs(
    Card,
    {
      flexDirection: "column",
      w: "100%",
      px: "0px",
      overflowX: { sm: "scroll", lg: "hidden" },
      children: [
        openedPage === 0 && /* @__PURE__ */ jsxs(Fragment, { children: [
          /* @__PURE__ */ jsx(Flex, { w: "100%", children: /* @__PURE__ */ jsxs(
            Button,
            {
              mb: "50px",
              mt: { base: "20px" },
              ml: { base: "20px" },
              variant: "brand",
              fontWeight: "500",
              onClick: () => {
                setOpenedPage(1);
                setBlog(initialBlog);
              },
              children: [
                /* @__PURE__ */ jsx(Icon, { as: MdAdd, h: "18px", w: "18px" }),
                "New Blog"
              ]
            }
          ) }),
          /* @__PURE__ */ jsxs(Box, { children: [
            /* @__PURE__ */ jsxs(Table, { variant: "simple", color: "gray.500", mb: "24px", mt: "12px", children: [
              /* @__PURE__ */ jsx(Thead, { children: table.getHeaderGroups().map((headerGroup) => /* @__PURE__ */ jsx(Tr, { children: headerGroup.headers.map((header) => {
                return /* @__PURE__ */ jsx(
                  Th,
                  {
                    colSpan: header.colSpan,
                    pe: "10px",
                    borderColor,
                    cursor: "pointer",
                    onClick: header.column.getToggleSortingHandler(),
                    children: /* @__PURE__ */ jsxs(
                      Flex,
                      {
                        justifyContent: "space-between",
                        align: "center",
                        fontSize: { sm: "10px", lg: "12px" },
                        color: "gray.400",
                        children: [
                          flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          ),
                          {
                            asc: "",
                            desc: ""
                          }[header.column.getIsSorted()] ?? null
                        ]
                      }
                    )
                  },
                  header.id
                );
              }) }, headerGroup.id)) }),
              /* @__PURE__ */ jsx(Tbody, { children: table.getRowModel().rows.length !== 0 ? table.getRowModel().rows.map((row) => {
                return /* @__PURE__ */ jsx(Tr, { children: row.getVisibleCells().map((cell) => {
                  return /* @__PURE__ */ jsx(
                    Td,
                    {
                      fontSize: { sm: "14px" },
                      minW: { sm: "150px", md: "200px", lg: "auto" },
                      borderColor: "transparent",
                      children: flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )
                    },
                    cell.id
                  );
                }) }, row.id);
              }) : /* @__PURE__ */ jsx(Tr, { children: /* @__PURE__ */ jsx(
                Td,
                {
                  fontSize: { sm: "14px" },
                  minW: { sm: "150px", md: "200px", lg: "auto" },
                  borderColor: "transparent",
                  colSpan: 8,
                  children: /* @__PURE__ */ jsx(
                    Text,
                    {
                      color: textColor,
                      mb: "4px",
                      align: "center",
                      fontWeight: "700",
                      lineHeight: "100%",
                      children: "No Blogs"
                    }
                  )
                }
              ) }) })
            ] }),
            blogs.data && blogs.last_page > 1 && paginationControls
          ] })
        ] }),
        openedPage === 1 && /* @__PURE__ */ jsx(BlogForm, { blog, setOpenedPage: () => {
          setOpenedPage(0);
          setBlogId(null);
        } })
      ]
    }
  );
};
export {
  Blogs as default,
  initialBlog
};
