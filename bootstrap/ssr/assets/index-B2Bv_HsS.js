import { jsx, jsxs, Fragment } from "react/jsx-runtime";
import { useToast, useColorModeValue, Text, Flex, Link, Icon, Button, Box, Table, Thead, Tr, Th, Tbody, Td } from "@chakra-ui/react";
import { MdEdit, MdDelete, MdAdd } from "react-icons/md";
import * as React from "react";
import { useReactTable, getSortedRowModel, getCoreRowModel, flexRender, createColumnHelper } from "@tanstack/react-table";
import { C as Card } from "./Card-M0XrdzyB.js";
import TagModal from "./TagModal--KMnlXqx.js";
import "../ssr.js";
import axios from "axios";
import "react-dom/server";
import "@inertiajs/inertia-react";
import "@inertiajs/react/server";
import "@chakra-ui/theme-tools";
import "react-query";
const columnHelper = createColumnHelper();
function ColumnTable() {
  const toast = useToast();
  const [sorting, setSorting] = React.useState([]);
  const textColor = useColorModeValue("secondaryGray.900", "white");
  const borderColor = useColorModeValue("gray.200", "whiteAlpha.100");
  const [tag, setTag] = React.useState({
    id: null,
    name: ""
  });
  const [onopen, setOnopen] = React.useState(0);
  const handleOnClose = () => {
    setOnopen(0);
  };
  const handleOnUpdate = () => {
    axios.get("/api/blog/get-tags").then((res) => {
      if (res.data.success) setData(res.data.tags);
      else {
        toast({
          title: "Failed to get tags",
          position: "top-right",
          status: "error",
          insert: "top",
          duration: 5e3,
          isClosable: true
        });
      }
    }).catch((err) => {
      toast({
        title: "Failed to get tags",
        position: "top-right",
        status: "error",
        insert: "top",
        duration: 5e3,
        isClosable: true
      });
    });
  };
  const handleDeleteTag = (id) => {
    axios.delete(`/api/blog/delete-tag?id=${id}`).then((res) => {
      if (res.data.success) {
        handleOnUpdate();
        toast({
          title: "Delete tag successfully",
          position: "top-right",
          status: "success",
          insert: "top",
          duration: 5e3,
          isClosable: true
        });
      } else {
        toast({
          title: "Failed to delete tag",
          position: "top-right",
          status: "error",
          insert: "top",
          duration: 5e3,
          isClosable: true
        });
      }
    }).catch((err) => {
      toast({
        title: "Failed to delete tag",
        position: "top-right",
        status: "error",
        insert: "top",
        duration: 5e3,
        isClosable: true
      });
    });
  };
  React.useEffect(() => {
    handleOnUpdate();
  }, []);
  const columns = [
    columnHelper.accessor("name", {
      id: "name",
      header: () => /* @__PURE__ */ jsx(
        Text,
        {
          justifyContent: "space-between",
          align: "center",
          fontSize: { sm: "10px", lg: "12px" },
          color: "gray.400",
          children: "NAME"
        }
      ),
      cell: (info) => /* @__PURE__ */ jsx(Flex, { align: "center", children: /* @__PURE__ */ jsx(Text, { color: textColor, fontSize: "sm", fontWeight: "700", children: info.getValue() }) })
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
              setTag(info.row.original);
              setOnopen(onopen + 1);
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
            onClick: () => handleDeleteTag(info.row.original.id),
            children: /* @__PURE__ */ jsx(Icon, { as: MdDelete, color: "secondaryGray.500", h: "18px", w: "18px" })
          }
        )
      ] })
    })
  ];
  const [data, setData] = React.useState([]);
  const table = useReactTable({
    data,
    columns,
    state: {
      sorting
    },
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    getCoreRowModel: getCoreRowModel(),
    debugTable: true
  });
  return /* @__PURE__ */ jsxs(
    Card,
    {
      flexDirection: "column",
      w: "100%",
      px: "0px",
      overflowX: { sm: "scroll", lg: "hidden" },
      children: [
        /* @__PURE__ */ jsx(Flex, { w: "100%", children: /* @__PURE__ */ jsxs(
          Button,
          {
            me: "100%",
            mb: "50px",
            w: "120px",
            minW: "120px",
            mt: { base: "20px" },
            ml: { base: "20px" },
            variant: "brand",
            fontWeight: "500",
            onClick: () => {
              setOnopen(onopen + 1);
              setTag({ id: null, name: "" });
            },
            children: [
              /* @__PURE__ */ jsx(Icon, { as: MdAdd, h: "18px", w: "18px" }),
              "Add Tag"
            ]
          }
        ) }),
        /* @__PURE__ */ jsx(TagModal, { tag, onopen, handleOnClose, handleOnUpdate }),
        /* @__PURE__ */ jsx(Box, { children: /* @__PURE__ */ jsxs(Table, { variant: "simple", color: "gray.500", mb: "24px", mt: "12px", children: [
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
              colSpan: 3,
              children: /* @__PURE__ */ jsx(
                Text,
                {
                  color: textColor,
                  mb: "4px",
                  align: "center",
                  fontWeight: "700",
                  lineHeight: "100%",
                  children: "No Tags"
                }
              )
            }
          ) }) })
        ] }) })
      ]
    }
  );
}
export {
  ColumnTable as default
};