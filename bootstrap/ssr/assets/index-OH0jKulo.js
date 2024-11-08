import { jsx, Fragment, jsxs } from "react/jsx-runtime";
import { useColorModeValue, Text, Flex, Table, Thead, Tr, Th, Tbody, Td, Stack, Icon } from "@chakra-ui/react";
import { Skeleton } from "@chakra-ui/skeleton";
import { g as generateSlug } from "./statics-GI0iJz3l.js";
import { useReactTable, getCoreRowModel, flexRender, createColumnHelper } from "@tanstack/react-table";
import { MdArrowUpward, MdArrowDownward, MdRemove, MdAdd } from "react-icons/md";
import moment from "moment";
import { Link } from "@inertiajs/react";
const columnHelper = createColumnHelper();
const RankTableCellContent = ({ currentRank, prevRank }) => {
  const textColor = useColorModeValue("secondaryGray.900", "white");
  return /* @__PURE__ */ jsx("div", { style: { display: "flex", alignItems: "center", justifyContent: "center", gap: 6, position: "relative" }, children: currentRank < prevRank ? /* @__PURE__ */ jsxs(Text, { color: "green.300", fontSize: "sm", fontWeight: "700", position: "relative", children: [
    /* @__PURE__ */ jsx(Icon, { as: MdArrowUpward, h: "18px", w: "18px", color: "green.300", boxSize: 5, position: "absolute", left: "-20px" }),
    prevRank
  ] }) : currentRank > prevRank ? /* @__PURE__ */ jsxs(Text, { color: "red.600", fontSize: "sm", fontWeight: "700", position: "relative", children: [
    /* @__PURE__ */ jsx(Icon, { as: MdArrowDownward, h: "18px", w: "18px", color: "red.600", boxSize: 5, position: "absolute", left: "-20px" }),
    prevRank
  ] }) : /* @__PURE__ */ jsx(Text, { color: textColor, fontSize: "sm", fontWeight: "700", position: "relative", children: prevRank }) });
};
const ScoreTableCellContent = ({ currentScore, prevScore }) => /* @__PURE__ */ jsx("div", { style: { display: "flex", alignItems: "center", justifyContent: "center", gap: 6 }, children: currentScore < prevScore ? /* @__PURE__ */ jsxs(Text, { color: "red.600", fontSize: "sm", fontWeight: "700", position: "relative", children: [
  /* @__PURE__ */ jsx(Icon, { as: MdRemove, h: "18px", w: "18px", color: "red.600", boxSize: 5, position: "absolute", left: "-20px" }),
  Number(prevScore - currentScore).toFixed(2)
] }) : currentScore > prevScore ? /* @__PURE__ */ jsxs(Text, { color: "green.300", fontSize: "sm", fontWeight: "700", position: "relative", children: [
  /* @__PURE__ */ jsx(Icon, { as: MdAdd, h: "18px", w: "18px", color: "green.300", boxSize: 5, position: "absolute", left: "-20px" }),
  Number(currentScore - prevScore).toFixed(2)
] }) : /* @__PURE__ */ jsx(Text, { fontSize: "sm", fontWeight: "700", position: "relative", children: "0.00" }) });
function RankTable({ data, vendors, isLoadingCategory, categories }) {
  const textColor = useColorModeValue("secondaryGray.900", "white");
  const borderColor = useColorModeValue("gray.200", "whiteAlpha.100");
  const columns = [
    columnHelper.group({
      header: "Rank",
      // Main header
      columns: [
        columnHelper.accessor("overall_ranking", {
          id: "current_ranking",
          header: () => /* @__PURE__ */ jsx(
            Text,
            {
              justifyContent: "center",
              align: "center",
              fontSize: { sm: "10px", lg: "12px" },
              color: "gray.400",
              children: moment().subtract(1, "months").format("MMM YYYY")
            }
          ),
          cell: (info) => /* @__PURE__ */ jsx("div", { style: { display: "flex", alignItems: "center", gap: 6 }, children: /* @__PURE__ */ jsx(Text, { color: textColor, fontSize: "sm", fontWeight: "700", children: info.getValue() === "10000000" ? "N/A" : info.row.index + 1 }) })
        }),
        columnHelper.accessor("prev_month_overall_ranking", {
          id: "prev_month_ranking",
          header: () => /* @__PURE__ */ jsx(
            Text,
            {
              justifyContent: "center",
              align: "center",
              fontSize: { sm: "10px", lg: "12px" },
              color: "gray.400",
              children: moment().subtract(2, "months").format("MMM YYYY")
            }
          ),
          cell: (info) => {
            const currentRank = info.row.index + 1;
            return /* @__PURE__ */ jsx(RankTableCellContent, { currentRank, prevRank: info.getValue() });
          }
        }),
        columnHelper.accessor("prev_year_overall_ranking", {
          id: "prev_year_ranking",
          header: () => /* @__PURE__ */ jsx(
            Text,
            {
              justifyContent: "center",
              align: "center",
              fontSize: { sm: "10px", lg: "12px" },
              color: "gray.400",
              children: moment().subtract(13, "months").format("MMM YYYY")
            }
          ),
          cell: (info) => {
            const currentRank = info.row.index + 1;
            return /* @__PURE__ */ jsx(RankTableCellContent, { currentRank, prevRank: info.getValue() });
          }
        })
      ]
    }),
    columnHelper.group({
      id: "name",
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
      columns: [
        columnHelper.accessor("db_name", {
          id: "db_name",
          header: null,
          cell: (info) => /* @__PURE__ */ jsx(Flex, { align: "center", children: /* @__PURE__ */ jsx(Link, { href: `/dbms/${generateSlug(info.getValue())}`, children: /* @__PURE__ */ jsx(Text, { color: textColor, fontSize: "sm", fontWeight: "700", _hover: { color: "blue.600" }, cursor: "pointer", children: info.getValue() }) }) })
        })
      ]
    }),
    columnHelper.group({
      id: "db_model",
      header: () => /* @__PURE__ */ jsx(
        Text,
        {
          justifyContent: "space-between",
          align: "center",
          fontSize: { sm: "10px", lg: "12px" },
          color: "gray.400",
          children: "Database Model"
        }
      ),
      columns: [
        columnHelper.accessor("primary_category", {
          id: "primary_category",
          header: null,
          cell: (info) => {
            const primary_categories = info.getValue().map((category) => category.shortname);
            let text;
            if (!primary_categories)
              return /* @__PURE__ */ jsx(Fragment, {});
            if (isLoadingCategory || !categories) text = "";
            else text = primary_categories.join(", ");
            return /* @__PURE__ */ jsx(Flex, { align: "center", children: /* @__PURE__ */ jsxs(Text, { color: textColor, fontSize: "sm", fontWeight: "700", children: [
              text,
              primary_categories.length > 1 && ", Multi-Model"
            ] }) });
          }
        })
      ]
    }),
    columnHelper.group({
      header: "Score",
      columns: [
        columnHelper.accessor("overall_avg_score", {
          id: "overall_avg_score",
          header: () => /* @__PURE__ */ jsx(
            Text,
            {
              justifyContent: "space-between",
              align: "center",
              fontSize: { sm: "10px", lg: "12px" },
              color: "gray.400",
              children: moment().subtract(1, "months").format("MMM YYYY")
            }
          ),
          cell: (info) => /* @__PURE__ */ jsx(Text, { color: textColor, fontSize: "sm", fontWeight: "700", children: info.getValue() === "10000000" ? "N/A" : Number(info.getValue()).toFixed(2) })
        }),
        columnHelper.accessor("prev_month_overall_avg_score", {
          id: "prev_month_overall_avg_score",
          header: () => /* @__PURE__ */ jsx(
            Text,
            {
              justifyContent: "space-between",
              align: "center",
              fontSize: { sm: "10px", lg: "12px" },
              color: "gray.400",
              children: moment().subtract(2, "months").format("MMM YYYY")
            }
          ),
          cell: (info) => {
            const overall_avg_score = info.row.original.overall_avg_score;
            return /* @__PURE__ */ jsx(ScoreTableCellContent, { currentScore: overall_avg_score, prevScore: info.getValue() });
          }
        }),
        columnHelper.accessor("prev_year_overall_avg_score", {
          id: "prev_year_overall_avg_score",
          header: () => /* @__PURE__ */ jsx(
            Text,
            {
              justifyContent: "space-between",
              align: "center",
              fontSize: { sm: "10px", lg: "12px" },
              color: "gray.400",
              children: moment().subtract(13, "months").format("MMM YYYY")
            }
          ),
          cell: (info) => {
            const overall_avg_score = info.row.original.overall_avg_score;
            return /* @__PURE__ */ jsx(ScoreTableCellContent, { currentScore: overall_avg_score, prevScore: info.getValue() });
          }
        })
      ]
    })
  ];
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    debugTable: true
  });
  const rowModel = table.getRowModel();
  return /* @__PURE__ */ jsxs(Table, { variant: "simple", color: "gray.500", mb: "24px", mt: "12px", children: [
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
    /* @__PURE__ */ jsx(Tbody, { children: vendors && vendors.length === 0 ? /* @__PURE__ */ jsx(Tr, { children: /* @__PURE__ */ jsx(Td, { colSpan: 100, children: /* @__PURE__ */ jsxs(Stack, { gap: "6", children: [
      /* @__PURE__ */ jsx(Skeleton, { height: "50px", borderRadius: "12px" }),
      /* @__PURE__ */ jsx(Skeleton, { height: "50px", borderRadius: "12px" }),
      /* @__PURE__ */ jsx(Skeleton, { height: "50px", borderRadius: "12px" }),
      /* @__PURE__ */ jsx(Skeleton, { height: "50px", borderRadius: "12px" }),
      /* @__PURE__ */ jsx(Skeleton, { height: "50px", borderRadius: "12px" }),
      /* @__PURE__ */ jsx(Skeleton, { height: "50px", borderRadius: "12px" }),
      /* @__PURE__ */ jsx(Skeleton, { height: "50px", borderRadius: "12px" }),
      /* @__PURE__ */ jsx(Skeleton, { height: "50px", borderRadius: "12px" }),
      /* @__PURE__ */ jsx(Skeleton, { height: "50px", borderRadius: "12px" })
    ] }) }) }) : rowModel && rowModel.rows.length !== 0 ? rowModel.rows.map((row) => {
      return /* @__PURE__ */ jsx(Tr, { children: row.getVisibleCells().map((cell) => {
        return /* @__PURE__ */ jsx(
          Td,
          {
            fontSize: { sm: "14px" },
            minW: { sm: "70px", md: "70px", lg: "auto" },
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
  ] });
}
export {
  RankTable as default
};
