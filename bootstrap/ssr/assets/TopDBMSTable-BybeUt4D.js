import { jsx, jsxs } from "react/jsx-runtime";
import { useColorModeValue, Text, Flex, Box, Table, Thead, Tr, Th, Tbody, Td, Stack } from "@chakra-ui/react";
import { useState, useMemo } from "react";
import { useReactTable, getCoreRowModel, getPaginationRowModel, flexRender, createColumnHelper } from "@tanstack/react-table";
import { useQuery } from "react-query";
import { a as getVendors } from "./use-request-DSS9fKx4.js";
import { SkeletonText } from "@chakra-ui/skeleton";
import { g as generateSlug } from "./statics-GI0iJz3l.js";
import { Link } from "@inertiajs/react";
import "../ssr.js";
import "react-dom/server";
import "@inertiajs/inertia-react";
import "@inertiajs/react/server";
import "@chakra-ui/theme-tools";
import "axios";
const columnHelper = createColumnHelper();
function Vendor() {
  const textColor = useColorModeValue("secondaryGray.900", "white");
  const borderColor = useColorModeValue("gray.200", "whiteAlpha.100");
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10
  });
  const { data: vendors = [] } = useQuery("top_vendors", getVendors, { staleTime: 3e5 });
  const columns = [
    columnHelper.accessor("overall_ranking", {
      id: "current_ranking",
      header: () => /* @__PURE__ */ jsx(
        Text,
        {
          justifyContent: "center",
          align: "center",
          fontSize: { sm: "10px", lg: "12px" },
          color: "gray.400",
          children: "Rank"
        }
      ),
      cell: (info) => /* @__PURE__ */ jsx("div", { style: { display: "flex", alignItems: "center", gap: 6 }, children: /* @__PURE__ */ jsx(Text, { color: textColor, fontSize: { md: "18px", "2sm": "16px", base: "12px" }, fontWeight: "700", children: info.getValue() === "10000000" ? "N/A" : info.getValue() }) })
    }),
    columnHelper.accessor("db_name", {
      id: "db_name",
      header: () => /* @__PURE__ */ jsx(
        Text,
        {
          justifyContent: "space-between",
          align: "center",
          fontSize: { sm: "10px", lg: "12px" },
          color: "gray.400",
          children: "Name"
        }
      ),
      cell: (info) => /* @__PURE__ */ jsx(Flex, { align: "center", children: /* @__PURE__ */ jsx(Link, { href: `/dbms/${generateSlug(info.getValue())}`, children: /* @__PURE__ */ jsx(Text, { color: textColor, fontSize: "sm", fontWeight: "700", _hover: { color: "blue.600" }, cursor: "pointer", children: info.getValue() }) }) })
    }),
    columnHelper.accessor("overall_avg_score", {
      id: "overall_avg_score",
      header: () => /* @__PURE__ */ jsx(
        Text,
        {
          justifyContent: "space-between",
          align: "center",
          fontSize: { sm: "10px", lg: "12px" },
          color: "gray.400",
          children: "Score"
        }
      ),
      cell: (info) => /* @__PURE__ */ jsx(Text, { color: textColor, fontSize: { md: "18px", "2sm": "16px", base: "12px" }, fontWeight: "700", children: info.getValue() === "10000000" ? "N/A" : Number(info.getValue()).toFixed(2) })
    })
  ];
  const elements = useMemo(() => vendors.slice(0, 5), [vendors]);
  const table = useReactTable({
    data: elements,
    columns,
    state: {
      pagination
    },
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onPaginationChange: setPagination,
    debugTable: true
  });
  const rowModel = table.getRowModel();
  return /* @__PURE__ */ jsxs(
    Box,
    {
      flexDirection: "column",
      w: "100%",
      px: "0px",
      overflow: "hidden",
      children: [
        /* @__PURE__ */ jsx(Flex, { px: "25px", mb: "8px", justifyContent: "space-between", align: "center", children: /* @__PURE__ */ jsx(
          Text,
          {
            color: textColor,
            fontSize: { md: "22px", "2sm": "18px", base: "16px" },
            mb: "4px",
            fontWeight: "700",
            lineHeight: "100%",
            children: "Top Rated Databases"
          }
        ) }),
        /* @__PURE__ */ jsx(Box, { overflowX: "auto", children: /* @__PURE__ */ jsxs(Table, { variant: "simple", color: "gray.500", mb: "24px", mt: "12px", children: [
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
          /* @__PURE__ */ jsx(Tbody, { children: !vendors.length ? /* @__PURE__ */ jsx(Tr, { children: /* @__PURE__ */ jsx(Td, { colSpan: 3, children: /* @__PURE__ */ jsxs(Stack, { gap: "6", children: [
            /* @__PURE__ */ jsx(SkeletonText, { borderRadius: "12px" }),
            /* @__PURE__ */ jsx(SkeletonText, { borderRadius: "12px" }),
            /* @__PURE__ */ jsx(SkeletonText, { borderRadius: "12px" }),
            /* @__PURE__ */ jsx(SkeletonText, { borderRadius: "12px" }),
            /* @__PURE__ */ jsx(SkeletonText, { borderRadius: "12px" })
          ] }) }) }) : rowModel && rowModel.rows.length !== 0 ? rowModel.rows.map((row) => {
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
                  children: "No Databases"
                }
              )
            }
          ) }) })
        ] }) }),
        /* @__PURE__ */ jsx(Link, { href: "/ranking", children: /* @__PURE__ */ jsx(
          Text,
          {
            px: "25px",
            color: "navy.300",
            fontSize: "12px",
            mb: "4px",
            fontWeight: "400",
            lineHeight: "100%",
            children: "More"
          }
        ) })
      ]
    }
  );
}
export {
  Vendor as default
};
