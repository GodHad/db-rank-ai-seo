import { jsx, jsxs, Fragment } from "react/jsx-runtime";
import { useToast, useColorModeValue, Text, Flex, Link, Icon, Box, Button, Table, Thead, Tr, Th, Tbody, Td } from "@chakra-ui/react";
import { MdEdit, MdDelete, MdAdd } from "react-icons/md";
import { useState, useEffect } from "react";
import { useReactTable, getSortedRowModel, getCoreRowModel, flexRender, createColumnHelper } from "@tanstack/react-table";
import { C as Card } from "./Card-M0XrdzyB.js";
import QuestionModal from "./QuestionModal-Cy92J0FO.js";
import "../ssr.js";
import { D as Dashboard } from "./index-BOOBh0R-.js";
import axios from "axios";
import "react-dom/server";
import "@inertiajs/inertia-react";
import "@inertiajs/react/server";
import "@chakra-ui/theme-tools";
import "react-query";
import "prop-types";
import "@inertiajs/react";
import "./SearchBar-Dsk0VtlP.js";
import "@chakra-ui/icons";
import "./statics-GI0iJz3l.js";
import "react-custom-scrollbars-2";
import "react-icons/io5";
import "react-icons/io";
import "react-icons/fa";
import "@inertiajs/inertia";
const columnHelper = createColumnHelper();
function Blog() {
  const toast = useToast();
  const [sorting, setSorting] = useState([]);
  const textColor = useColorModeValue("secondaryGray.900", "white");
  const borderColor = useColorModeValue("gray.200", "whiteAlpha.100");
  const [question, setQuestion] = useState({
    id: null,
    question: ""
  });
  const [onopen, setOnopen] = useState(0);
  const handleOnClose = () => {
    setOnopen(0);
  };
  const handleOnUpdate = () => {
    axios.get("/api/get-questions").then((res) => {
      setData(res.data.questions);
    }).catch((error) => {
      const errors = error.data.errors ? error.data.errors : { error: error.data.error };
      const key = errors[Object.keys(errors)[0]];
      toast({
        title: "Failed to get questions",
        description: key,
        position: "top-right",
        status: "error",
        insert: "top",
        duration: 5e3,
        isClosable: true
      });
    });
  };
  const handleDeleteQuestion = (id) => {
    axios.delete(`/api/delete-question?id=${id}`).then((res) => {
      handleOnUpdate();
      toast({
        title: "Delete question successfully",
        position: "top-right",
        status: "success",
        insert: "top",
        duration: 5e3,
        isClosable: true
      });
    }).catch((error) => {
      const errors = error.response.data.errors ? error.response.data.errors : { error: error.response.data.error };
      const key = errors[Object.keys(errors)[0]];
      toast({
        title: "Failed to delete question",
        description: key,
        position: "top-right",
        status: "error",
        insert: "top",
        duration: 5e3,
        isClosable: true
      });
    });
  };
  useEffect(() => {
    handleOnUpdate();
  }, []);
  const columns = [
    columnHelper.accessor("question", {
      id: "question",
      header: () => /* @__PURE__ */ jsx(
        Text,
        {
          justifyContent: "space-between",
          align: "center",
          fontSize: { sm: "10px", lg: "12px" },
          color: "gray.400",
          children: "Question"
        }
      ),
      cell: (info) => /* @__PURE__ */ jsx(Flex, { align: "center", children: /* @__PURE__ */ jsx(Text, { color: textColor, fontSize: "sm", fontWeight: "700", isTruncated: true, children: info.getValue() }) })
    }),
    columnHelper.accessor("action", {
      id: "action",
      header: () => /* @__PURE__ */ jsx(
        Text,
        {
          justifyContent: "space-between",
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
              setQuestion(info.row.original);
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
            onClick: () => handleDeleteQuestion(info.row.original.id),
            children: /* @__PURE__ */ jsx(Icon, { as: MdDelete, color: "secondaryGray.500", h: "18px", w: "18px" })
          }
        )
      ] })
    })
  ];
  const [data, setData] = useState([]);
  const table = useReactTable({
    data: data || [],
    columns,
    state: {
      sorting
    },
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    getCoreRowModel: getCoreRowModel(),
    debugTable: true
  });
  return /* @__PURE__ */ jsx(Dashboard, { children: /* @__PURE__ */ jsx(Box, { pt: { base: "130px", md: "80px", xl: "80px" }, children: /* @__PURE__ */ jsxs(
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
            w: "140px",
            minW: "140px",
            mt: { base: "20px" },
            ml: { base: "20px" },
            variant: "brand",
            fontWeight: "500",
            onClick: () => {
              setOnopen(onopen + 1);
              setQuestion({ id: null, question: "" });
            },
            children: [
              /* @__PURE__ */ jsx(Icon, { as: MdAdd, h: "18px", w: "18px" }),
              "Add Question"
            ]
          }
        ) }),
        /* @__PURE__ */ jsx(QuestionModal, { _question: question, onopen, handleOnClose, handleOnUpdate }),
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
                  children: "No Questions"
                }
              )
            }
          ) }) })
        ] }) })
      ]
    }
  ) }) });
}
export {
  Blog as default
};
