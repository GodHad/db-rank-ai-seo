import { jsx, jsxs, Fragment } from "react/jsx-runtime";
import { useState } from "react";
import { useToast, useColorModeValue, Text, Flex, Icon, Link, Box, Button, Table, Thead, Tr, Th, Tbody, Td, Tooltip, IconButton, NumberInput, NumberInputField, NumberInputStepper, NumberIncrementStepper, NumberDecrementStepper, Select } from "@chakra-ui/react";
import { MdCheckCircle, MdOutlineRemoveCircle, MdEdit, MdDelete, MdAdd, MdArrowLeft, MdChevronLeft, MdChevronRight, MdArrowRight } from "react-icons/md";
import { useReactTable, getSortedRowModel, getCoreRowModel, getPaginationRowModel, flexRender, createColumnHelper } from "@tanstack/react-table";
import { C as Card } from "./Card-M0XrdzyB.js";
import FeaturedProductForm from "./FeaturedProductForm-DgETQoP1.js";
import { useQueryClient, useQuery, useMutation } from "react-query";
import { g as getFeaturedProducts, d as deleteFeaturedProduct } from "./use-request-9Ex0rx8h.js";
import "./statics-GI0iJz3l.js";
import "./CustomInput-D8rT110g.js";
import "react-draft-wysiwyg";
import "draft-js";
import "draftjs-to-html";
import "../ssr.js";
import "react-dom/server";
import "@inertiajs/inertia-react";
import "@inertiajs/react/server";
import "@chakra-ui/theme-tools";
import "axios";
const columnHelper = createColumnHelper();
const initialFeaturedProduct = {
  id: null,
  title: "",
  content: "",
  link: "",
  banner: "",
  published: 0
};
function FeaturedProduct() {
  const toast = useToast();
  const queryClient = useQueryClient();
  const [sorting, setSorting] = useState([]);
  const textColor = useColorModeValue("secondaryGray.900", "white");
  const borderColor = useColorModeValue("gray.200", "whiteAlpha.100");
  const [openedPage, setOpenedPage] = useState(0);
  const [featuredProduct, setFeaturedProduct] = useState(initialFeaturedProduct);
  const { data: featured_products } = useQuery("side_featured_products", () => getFeaturedProducts("sidebar"));
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10
  });
  const handleDeleteFeaturedProduct = useMutation(deleteFeaturedProduct, {
    onSuccess: () => {
      queryClient.invalidateQueries("side_featured_products");
      toast({
        title: "Delete featured product successfully",
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
        title: "Failed to delete featured product",
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
      cell: (info) => /* @__PURE__ */ jsx(Text, { color: textColor, fontSize: "sm", fontWeight: "700", children: info.row.index + 1 })
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
    columnHelper.accessor("link", {
      id: "link",
      header: () => /* @__PURE__ */ jsx(
        Text,
        {
          justifyContent: "center",
          align: "center",
          fontSize: { sm: "10px", lg: "12px" },
          color: "gray.400",
          children: "Link"
        }
      ),
      cell: (info) => /* @__PURE__ */ jsx("a", { href: info.getValue(), target: "_blank", children: /* @__PURE__ */ jsx(Text, { color: textColor, fontSize: "sm", fontWeight: "700", _hover: { color: "blue.500" }, children: info.getValue() }) })
    }),
    columnHelper.accessor("published", {
      id: "published",
      header: () => /* @__PURE__ */ jsx(
        Text,
        {
          justifyContent: "center",
          align: "center",
          fontSize: { sm: "10px", lg: "12px" },
          color: "gray.400",
          children: "Published"
        }
      ),
      cell: (info) => {
        return /* @__PURE__ */ jsx(Flex, { align: "center", children: /* @__PURE__ */ jsx(
          Icon,
          {
            w: "24px",
            h: "24px",
            me: "5px",
            color: info.getValue() === 1 ? "green.500" : "gray.500",
            as: info.getValue() === 1 ? MdCheckCircle : MdOutlineRemoveCircle
          }
        ) });
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
              setFeaturedProduct(info.row.original);
              setOpenedPage(1);
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
            onClick: () => handleDeleteFeaturedProduct.mutate(info.row.original.id),
            children: /* @__PURE__ */ jsx(Icon, { as: MdDelete, color: "secondaryGray.500", h: "18px", w: "18px" })
          }
        )
      ] })
    })
  ];
  const table = useReactTable({
    data: featured_products || [],
    columns,
    state: {
      sorting,
      pagination
    },
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onPaginationChange: setPagination,
    debugTable: true
  });
  return /* @__PURE__ */ jsx(Box, { children: /* @__PURE__ */ jsxs(
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
                setFeaturedProduct(initialFeaturedProduct);
              },
              children: [
                /* @__PURE__ */ jsx(Icon, { as: MdAdd, h: "18px", w: "18px" }),
                "New Featured Product"
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
                      children: "No Featured Products"
                    }
                  )
                }
              ) }) })
            ] }),
            table.getRowModel().rows.length !== 0 && /* @__PURE__ */ jsxs(Flex, { justifyContent: "space-between", m: 4, alignItems: "center", children: [
              /* @__PURE__ */ jsxs(Flex, { children: [
                /* @__PURE__ */ jsx(Tooltip, { label: "First Page", children: /* @__PURE__ */ jsx(
                  IconButton,
                  {
                    onClick: () => table.firstPage(),
                    isDisabled: !table.getCanPreviousPage(),
                    icon: /* @__PURE__ */ jsx(MdArrowLeft, { h: 3, w: 3 }),
                    mr: 4
                  }
                ) }),
                /* @__PURE__ */ jsx(Tooltip, { label: "Previous Page", children: /* @__PURE__ */ jsx(
                  IconButton,
                  {
                    onClick: () => table.previousPage(),
                    isDisabled: !table.getCanPreviousPage(),
                    icon: /* @__PURE__ */ jsx(MdChevronLeft, { h: 6, w: 6 })
                  }
                ) })
              ] }),
              /* @__PURE__ */ jsxs(Flex, { alignItems: "center", children: [
                /* @__PURE__ */ jsxs(Text, { flexShrink: "0", mr: 8, children: [
                  "Page",
                  " ",
                  /* @__PURE__ */ jsx(Text, { fontWeight: "bold", as: "span", children: table.getState().pagination.pageIndex + 1 }),
                  " ",
                  "of",
                  " ",
                  /* @__PURE__ */ jsx(Text, { fontWeight: "bold", as: "span", children: table.getPageCount().toLocaleString() })
                ] }),
                /* @__PURE__ */ jsx(Text, { flexShrink: "0", children: " Go to page: " }),
                " ",
                /* @__PURE__ */ jsxs(
                  NumberInput,
                  {
                    ml: 2,
                    mr: 8,
                    w: 28,
                    min: 1,
                    max: table.getPageCount(),
                    onChange: (value) => {
                      const page = Number(value) - 1;
                      table.setPageIndex(page);
                    },
                    defaultValue: table.getState().pagination.pageIndex + 1,
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
                    value: table.getState().pagination.pageSize,
                    onChange: (e) => {
                      table.setPageSize(Number(e.target.value));
                    },
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
                    onClick: () => table.nextPage(),
                    isDisabled: !table.getCanNextPage(),
                    icon: /* @__PURE__ */ jsx(MdChevronRight, { h: 10, w: 10 })
                  }
                ) }),
                /* @__PURE__ */ jsx(Tooltip, { label: "Last Page", children: /* @__PURE__ */ jsx(
                  IconButton,
                  {
                    onClick: () => table.lastPage(),
                    isDisabled: !table.getCanNextPage(),
                    icon: /* @__PURE__ */ jsx(MdArrowRight, { h: 10, w: 10 }),
                    ml: 4
                  }
                ) })
              ] })
            ] })
          ] })
        ] }),
        openedPage === 1 && /* @__PURE__ */ jsx(FeaturedProductForm, { featuredProduct, setOpenedPage: () => {
          setOpenedPage(0);
        } })
      ]
    }
  ) });
}
export {
  FeaturedProduct as default
};
