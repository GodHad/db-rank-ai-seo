import { jsx, jsxs, Fragment } from "react/jsx-runtime";
import { useState, useEffect, useRef } from "react";
import { useToast, useColorModeValue, Text, Icon, Flex, Link, Button, FormControl, Box, Table, Thead, Tr, Th, Tbody, Td, Tooltip, IconButton, NumberInput, NumberInputField, NumberInputStepper, NumberIncrementStepper, NumberDecrementStepper, Select as Select$1, FormLabel, Image, Input, Textarea } from "@chakra-ui/react";
import { MdArrowUpward, MdArrowDownward, MdRemove, MdAdd, MdEdit, MdDelete, MdArrowLeft, MdChevronLeft, MdChevronRight, MdArrowRight, MdUploadFile } from "react-icons/md";
import { useQueryClient, useQuery, useMutation } from "react-query";
import { g as getVendors, a as getCategories, d as deleteVendor, c as createVendor, u as updateVendor } from "./use-request-Cf_Kil6_.js";
import { C as CustomMultiSelect } from "./CustomMultiSelect-CrKxktuE.js";
import { C as CustomInput } from "./CustomInput-D8rT110g.js";
import { A as APP_URL } from "./statics-GI0iJz3l.js";
import { Select } from "chakra-react-select";
import { useReactTable, getCoreRowModel, getPaginationRowModel, flexRender, createColumnHelper } from "@tanstack/react-table";
import { C as Card } from "./Card-M0XrdzyB.js";
import moment from "moment";
const columnHelper = createColumnHelper();
const initialVendor = {
  id: null,
  company_name: "",
  description: "",
  primary_category: [],
  secondary_category: [],
  contact_info: "",
  website_url: "",
  technical_doc: "",
  developer: "",
  initial_release: "",
  current_release: "",
  license: "",
  cloud_based_only: 0,
  dbaas_offerings: "",
  implementation_lang: "",
  server_os: "",
  data_scheme: "",
  typing: 0,
  xml_support: 0,
  secondary_indexes: 0,
  sql: "",
  apis_access_method: "",
  supported_programming_lang: "",
  server_side_scripts: "",
  triggers: 0,
  partitioning_methods: "",
  replication_methods: "",
  mapreduce: "",
  consistency_concepts: 0,
  foreign_keys: 0,
  trasaction_concepts: "",
  concurrency: 0,
  durability: 0,
  in_memory_capabilities: 0,
  user_concepts: "",
  db_name: "",
  logo_url: "",
  banner: "",
  meta_title: "",
  meta_description: "",
  og_graph_image: null,
  twitter_graph_image: null,
  extra_content: ""
};
function Vendor() {
  const toast = useToast();
  const queryClient = useQueryClient();
  const textColor = useColorModeValue("secondaryGray.900", "white");
  const borderColor = useColorModeValue("gray.200", "whiteAlpha.100");
  const [showingCategory, setShowingCategory] = useState(0);
  const [data, setData] = useState([]);
  const [openedPage, setOpenedPage] = useState(0);
  const [vendor, setVendor] = useState(initialVendor);
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10
  });
  const { data: vendors, isLoadingVendor } = useQuery(
    ["vendors"],
    () => getVendors(" ")
  );
  const { data: categories, isLoadingCategory } = useQuery("categories", getCategories);
  const deleteUser = useMutation(deleteVendor, {
    onSuccess: () => {
      queryClient.invalidateQueries("vendors");
      toast({
        title: "Delete vendor successfully",
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
        title: "Failed to delete vendor",
        description: key,
        position: "top-right",
        status: "error",
        insert: "top",
        duration: 5e3,
        isClosable: true
      });
    }
  });
  useEffect(() => {
    if (isLoadingVendor) return;
    if (showingCategory === 0) setData(vendors);
    else {
      const showingVendors = vendors.filter((vendor2) => vendor2.primary_category.map((category) => category.id).includes(showingCategory));
      const prevMonthOverallRanking = showingVendors.map((vendor2) => vendor2.prev_month_overall_ranking).sort();
      const prevYearOverAllRanking = showingVendors.map((vendor2) => vendor2.prev_year_overall_ranking).sort();
      setData(showingVendors.map((vendor2) => ({ ...vendor2, prev_month_overall_ranking: prevMonthOverallRanking.indexOf(vendor2.prev_month_overall_ranking) + 1, prev_year_overall_ranking: prevYearOverAllRanking.indexOf(vendor2.prev_year_overall_ranking) + 1 })));
    }
  }, [showingCategory, setData, isLoadingVendor, vendors]);
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
            const currentRank = info.row.original.overall_ranking;
            return /* @__PURE__ */ jsx("div", { style: { display: "flex", alignItems: "center", justifyContent: "center", gap: 6, position: "relative" }, children: /* @__PURE__ */ jsxs(Text, { color: textColor, fontSize: "sm", fontWeight: "700", children: [
              currentRank < info.getValue() && /* @__PURE__ */ jsx(Icon, { position: "absolute", left: "-12px", as: MdArrowUpward, h: "18px", w: "18px", color: "green.300", boxSize: 5 }),
              currentRank > info.getValue() && /* @__PURE__ */ jsx(Icon, { position: "absolute", as: MdArrowDownward, left: "-12px", h: "18px", w: "18px", color: "red.600", boxSize: 5 }),
              info.getValue()
            ] }) });
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
            const currentRank = info.row.original.overall_ranking;
            return /* @__PURE__ */ jsx("div", { style: { display: "flex", alignItems: "center", justifyContent: "center", gap: 6, position: "relative" }, children: /* @__PURE__ */ jsxs(Text, { color: textColor, fontSize: "sm", fontWeight: "700", children: [
              currentRank < info.getValue() && /* @__PURE__ */ jsx(Icon, { position: "absolute", left: "-12px", as: MdArrowUpward, h: "18px", w: "18px", color: "green.300", boxSize: 5 }),
              currentRank > info.getValue() && /* @__PURE__ */ jsx(Icon, { position: "absolute", left: "-12px", as: MdArrowDownward, h: "18px", w: "18px", color: "red.600", boxSize: 5 }),
              info.getValue()
            ] }) });
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
          cell: (info) => /* @__PURE__ */ jsx(Flex, { align: "center", children: /* @__PURE__ */ jsx(Text, { color: textColor, fontSize: "sm", fontWeight: "700", children: info.getValue() }) })
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
            if (!info.getValue())
              return /* @__PURE__ */ jsx(Fragment, {});
            const primary_categories = info.getValue().map((category) => category.shortname);
            let text;
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
            return /* @__PURE__ */ jsxs("div", { style: { display: "flex", alignItems: "center", justifyContent: "center", gap: 6 }, children: [
              overall_avg_score < info.getValue() && /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsxs(Text, { color: "red.600", fontSize: "sm", fontWeight: "700", position: "relative", children: [
                /* @__PURE__ */ jsx(Icon, { as: MdRemove, h: "18px", w: "18px", color: "red.600", boxSize: 5, position: "absolute", left: "-20px" }),
                Number(info.getValue() - overall_avg_score).toFixed(2)
              ] }) }),
              overall_avg_score > info.getValue() && /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsxs(Text, { color: "green.300", fontSize: "sm", fontWeight: "700", position: "relative", children: [
                /* @__PURE__ */ jsx(Icon, { as: MdAdd, h: "18px", w: "18px", color: "green.300", boxSize: 5, position: "absolute", left: "-20px" }),
                Number(overall_avg_score - info.getValue()).toFixed(2)
              ] }) })
            ] });
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
            return /* @__PURE__ */ jsxs("div", { style: { display: "flex", alignItems: "center", justifyContent: "center", gap: 6 }, children: [
              overall_avg_score < info.getValue() && /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsxs(Text, { color: "red.600", fontSize: "sm", fontWeight: "700", position: "relative", children: [
                /* @__PURE__ */ jsx(Icon, { as: MdRemove, h: "18px", w: "18px", color: "red.600", boxSize: 5, position: "absolute", left: "-20px" }),
                Number(info.getValue() - overall_avg_score).toFixed(2)
              ] }) }),
              overall_avg_score > info.getValue() && /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsxs(Text, { color: "green.300", fontSize: "sm", fontWeight: "700", position: "relative", children: [
                /* @__PURE__ */ jsx(Icon, { as: MdAdd, h: "18px", w: "18px", color: "green.300", boxSize: 5, position: "absolute", left: "-20px" }),
                Number(overall_avg_score - info.getValue()).toFixed(2)
              ] }) })
            ] });
          }
        })
      ]
    }),
    columnHelper.group({
      header: "Actions",
      columns: [
        columnHelper.accessor("action", {
          id: "action",
          header: () => /* @__PURE__ */ jsx(
            Text,
            {
              justifyContent: "space-between",
              align: "center",
              fontSize: { sm: "10px", lg: "12px" },
              color: "gray.400"
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
                  setVendor(info.row.original);
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
                onClick: () => deleteUser.mutate(info.row.original.id),
                children: /* @__PURE__ */ jsx(Icon, { as: MdDelete, color: "secondaryGray.500", h: "18px", w: "18px" })
              }
            )
          ] })
        })
      ]
    })
  ];
  const table = useReactTable({
    data: data || [],
    columns,
    state: {
      pagination
    },
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onPaginationChange: setPagination,
    debugTable: true
  });
  const [options, setOptions] = useState([{ id: 0, value: "all", label: "All" }]);
  useEffect(() => {
    if (!isLoadingCategory && categories) setOptions([{ id: 0, value: "all", label: "All DBMS" }].concat(categories.map((category) => ({ id: category.id, label: category.title, value: category.title }))));
  }, [categories, isLoadingCategory]);
  return /* @__PURE__ */ jsxs(
    Card,
    {
      flexDirection: "column",
      w: "100%",
      px: "0px",
      overflowX: { sm: "scroll", lg: "hidden" },
      children: [
        openedPage === 0 && /* @__PURE__ */ jsxs(Fragment, { children: [
          /* @__PURE__ */ jsxs("div", { style: { display: "flex", justifyContent: "space-between", marginTop: "20px", marginLeft: "20px", alignItems: "center" }, children: [
            /* @__PURE__ */ jsx(Flex, { w: "100%", children: /* @__PURE__ */ jsxs(
              Button,
              {
                me: "100%",
                w: "140px",
                minW: "140px",
                variant: "brand",
                fontWeight: "500",
                onClick: () => {
                  setOpenedPage(1);
                  setVendor(initialVendor);
                },
                children: [
                  /* @__PURE__ */ jsx(Icon, { as: MdAdd, h: "18px", w: "18px" }),
                  "New DBMS"
                ]
              }
            ) }),
            /* @__PURE__ */ jsx(FormControl, { p: 4, w: "50%", minW: "200px", maxW: "300px", children: /* @__PURE__ */ jsx(
              Select,
              {
                id: "color-select",
                name: "colors",
                options,
                defaultValue: { id: 0, value: "all", label: "All" },
                closeMenuOnSelect: false,
                size: "lg",
                onChange: (e) => setShowingCategory(e.id)
              }
            ) })
          ] }),
          /* @__PURE__ */ jsx(Flex, { w: "100%" }),
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
                      children: "No Categories"
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
                  Select$1,
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
        openedPage === 1 && /* @__PURE__ */ jsx(VendorForm, { vendor, categories, setOpenedPage: () => {
          setOpenedPage(0);
        } })
      ]
    }
  );
}
const index = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Vendor,
  initialVendor
}, Symbol.toStringTag, { value: "Module" }));
function VendorForm({ vendor, categories, setOpenedPage }) {
  const toast = useToast();
  const queryClient = useQueryClient();
  const bgColor = useColorModeValue("white", "navy.800");
  const {
    id,
    company_name,
    description,
    primary_category,
    secondary_category,
    contact_info,
    website_url,
    technical_doc,
    developer,
    initial_release,
    current_release,
    license,
    cloud_based_only,
    dbaas_offerings,
    implementation_lang,
    server_os,
    data_scheme,
    typing,
    xml_support,
    secondary_indexes,
    sql,
    apis_access_method,
    supported_programming_lang,
    server_side_scripts,
    triggers,
    partitioning_methods,
    replication_methods,
    mapreduce,
    consistency_concepts,
    foreign_keys,
    trasaction_concepts,
    concurrency,
    durability,
    in_memory_capabilities,
    user_concepts,
    db_name,
    logo_url,
    banner,
    meta_title,
    meta_description,
    og_graph_image,
    twitter_graph_image,
    extra_content
  } = vendor;
  const textColor = useColorModeValue("navy.700", "white");
  const brandStars = useColorModeValue("brand.500", "brand.400");
  const [form, setForm] = useState({
    id,
    company_name,
    description,
    primary_category: primary_category.map((category) => category.id),
    secondary_category: secondary_category.map((category) => category.id),
    contact_info,
    website_url,
    technical_doc,
    developer,
    initial_release,
    current_release,
    license,
    cloud_based_only,
    dbaas_offerings,
    implementation_lang,
    server_os,
    data_scheme,
    typing,
    xml_support,
    secondary_indexes,
    sql,
    apis_access_method,
    supported_programming_lang,
    server_side_scripts,
    triggers,
    partitioning_methods,
    replication_methods,
    mapreduce,
    consistency_concepts,
    foreign_keys,
    trasaction_concepts,
    concurrency,
    durability,
    in_memory_capabilities,
    user_concepts,
    db_name,
    logo_url,
    banner,
    logo_file: null,
    banner_file: null,
    meta_title,
    meta_description,
    og_graph_image,
    twitter_graph_image,
    og_graph_file: null,
    twitter_graph_file: null,
    extra_content
  });
  useEffect(() => {
    setForm({
      id,
      company_name,
      description,
      primary_category: primary_category.map((category) => category.id),
      secondary_category: secondary_category.map((category) => category.id),
      contact_info,
      website_url,
      technical_doc,
      developer,
      initial_release,
      current_release,
      license,
      cloud_based_only,
      dbaas_offerings,
      implementation_lang,
      server_os,
      data_scheme,
      typing,
      xml_support,
      secondary_indexes,
      sql,
      apis_access_method,
      supported_programming_lang,
      server_side_scripts,
      triggers,
      partitioning_methods,
      replication_methods,
      mapreduce,
      consistency_concepts,
      foreign_keys,
      trasaction_concepts,
      concurrency,
      durability,
      in_memory_capabilities,
      user_concepts,
      db_name,
      logo_url,
      banner,
      logo_file: null,
      banner_file: null,
      meta_title,
      meta_description,
      og_graph_image,
      twitter_graph_image,
      og_graph_file: null,
      twitter_graph_file: null,
      extra_content
    });
  }, [vendor]);
  const createVendorMutation = useMutation(createVendor, {
    onSuccess: (data) => {
      queryClient.invalidateQueries("vendors");
      setOpenedPage(0);
      toast({
        title: "Create vendor successfully",
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
        title: "Failed to create vendor successfully",
        description: key,
        position: "top-right",
        status: "error",
        insert: "top",
        duration: 5e3,
        isClosable: true
      });
    }
  });
  const updateVendorMutation = useMutation(updateVendor, {
    onSuccess: (data) => {
      queryClient.invalidateQueries("vendors");
      setOpenedPage(0);
      toast({
        title: "Update vendor successfully",
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
        title: "Failed to create vendor successfully",
        description: key,
        position: "top-right",
        status: "error",
        insert: "top",
        duration: 5e3,
        isClosable: true
      });
    }
  });
  const handleVendor = () => {
    const formData = new FormData();
    Object.keys(initialVendor).forEach((key) => {
      if (form[key]) formData.append(key, form[key]);
    });
    formData.delete("primary_category");
    formData.delete("secondary_category");
    form.primary_category.forEach((element) => {
      formData.append("primary_category[]", element);
    });
    form.secondary_category.forEach((element) => {
      formData.append("secondary_category[]", element);
    });
    if (form.logo_file) formData.append("logo_file", form.logo_file);
    if (form.banner_file) formData.append("banner_file", form.banner_file);
    if (form.twitter_graph_image) formData.append("twitter_graph_image", form.twitter_graph_image);
    if (form.og_graph_image) formData.append("og_graph_image", form.og_graph_image);
    if (form.og_graph_file) formData.append("og_graph_file", form.og_graph_file);
    if (form.twitter_graph_file) formData.append("twitter_graph_file", form.twitter_graph_file);
    if (!form.id) createVendorMutation.mutate({ vendor: formData });
    else updateVendorMutation.mutate({ id: form.id, vendor: formData });
  };
  const handleChangeForm = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const handleChangeMultiSelect = (name, value) => {
    setForm({ ...form, [name]: value });
  };
  const [imagePreview, setImagePreview] = useState({
    logo_file: APP_URL + "storage/" + logo_url,
    banner_file: APP_URL + "storage/" + banner,
    og_graph_file: APP_URL + "storage/" + og_graph_image,
    twitter_graph_file: APP_URL + "storage/" + twitter_graph_image
  });
  useEffect(() => {
    setImagePreview({
      logo_file: APP_URL + "storage/" + logo_url,
      banner_file: APP_URL + "storage/" + banner,
      og_graph_file: APP_URL + "storage/" + og_graph_image,
      twitter_graph_file: APP_URL + "storage/" + twitter_graph_image
    });
  }, [logo_url, banner, og_graph_image, twitter_graph_image]);
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
  const logoFileRef = useRef(null);
  const bannerFileRef = useRef(null);
  const ogGraphFileRef = useRef(null);
  const twitterGraphFileRef = useRef(null);
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
      !vendor.id ? "Create" : "Update",
      " DBMS"
    ] }),
    /* @__PURE__ */ jsxs(FormControl, { children: [
      /* @__PURE__ */ jsxs(FormControl, { display: "flex", justifyContent: "space-between", flexDir: { base: "column", md: "row" }, gap: { md: 6, base: 2 }, alignItems: "center", children: [
        /* @__PURE__ */ jsx(CustomInput, { title: "Company Name", name: "company_name", value: form.company_name || "", handleChangeForm, textColor, brandStars }),
        /* @__PURE__ */ jsx(CustomInput, { title: "Database Name", name: "db_name", value: form.db_name || "", handleChangeForm, textColor, brandStars })
      ] }),
      /* @__PURE__ */ jsxs(FormControl, { display: "flex", justifyContent: "space-between", flexDir: { base: "column", md: "row" }, gap: { md: 6, base: 2 }, alignItems: "center", children: [
        /* @__PURE__ */ jsx(CustomMultiSelect, { title: "Primary Categories", name: "primary_category", value: form.primary_category, handleChangeMultiSelect, options: categories.map((category) => ({ id: category.id, value: category.title || "", label: category.title })) }),
        /* @__PURE__ */ jsx(CustomMultiSelect, { title: "Secondary Categories", name: "secondary_category", value: form.secondary_category, handleChangeMultiSelect, options: categories.map((category) => ({ id: category.id, value: category.title || "", label: category.title })) })
      ] }),
      /* @__PURE__ */ jsx(FormControl, { display: "flex", justifyContent: "space-between", flexDir: { base: "column", md: "row" }, gap: { md: 6, base: 2 }, alignItems: "center", children: /* @__PURE__ */ jsx(CustomInput, { type: "url", title: "Website URL", name: "website_url", value: form.website_url || "", handleChangeForm, textColor, brandStars }) }),
      /* @__PURE__ */ jsxs(FormControl, { mb: "24px", children: [
        /* @__PURE__ */ jsx(
          FormLabel,
          {
            display: "flex",
            ms: "4px",
            fontSize: "sm",
            fontWeight: "500",
            color: textColor,
            mb: "8px",
            children: "Extra Content"
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
            data: form.extra_content,
            onChange: (event, editor) => {
              const data = editor.getData();
              setForm((prev) => ({ ...prev, extra_content: data }));
            }
          }
        )
      ] }),
      /* @__PURE__ */ jsxs(FormControl, { display: "flex", justifyContent: "space-between", flexDir: { base: "column", md: "row" }, gap: { md: 6, base: 2 }, alignItems: "center", children: [
        /* @__PURE__ */ jsxs(Box, { w: "full", children: [
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
                "Logo File",
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
                /* @__PURE__ */ jsxs(Box, { display: "flex", alignItems: "center", onClick: () => logoFileRef.current.click(), children: [
                  /* @__PURE__ */ jsx(Icon, { as: MdUploadFile, mr: 2 }),
                  /* @__PURE__ */ jsx(Text, { children: form.logo_file ? "Choose other file" : "Choose a file..." })
                ] }),
                (form.logo_url || form.logo_file) && /* @__PURE__ */ jsx(Box, { mt: 4, children: /* @__PURE__ */ jsx(Image, { src: imagePreview.logo_file, alt: "Image Preview", boxSize: "200px", objectFit: "cover" }) }),
                /* @__PURE__ */ jsx(
                  Input,
                  {
                    ref: logoFileRef,
                    type: "file",
                    display: "none",
                    accept: "image/*",
                    name: "logo_file",
                    onChange: handleFileChange
                  }
                )
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsxs(Box, { w: "full", children: [
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
                (form.banner || form.banner_file) && /* @__PURE__ */ jsx(Box, { mt: 4, children: /* @__PURE__ */ jsx(Image, { src: imagePreview.banner_file, alt: "Image Preview", width: "full", height: "200px", objectFit: "cover" }) }),
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
          )
        ] })
      ] }),
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
            (form.og_graph_file || form.og_graph_image) && /* @__PURE__ */ jsx(Box, { mt: 4, children: /* @__PURE__ */ jsx(Image, { src: imagePreview.og_graph_file, alt: "Image Preview", boxSize: "200px", objectFit: "cover" }) }),
            /* @__PURE__ */ jsx(
              Input,
              {
                ref: ogGraphFileRef,
                type: "file",
                display: "none",
                accept: "image/*",
                name: "og_graph_file",
                onChange: handleFileChange
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
            (form.twitter_graph_file || form.twitter_graph_image) && /* @__PURE__ */ jsx(Box, { mt: 4, children: /* @__PURE__ */ jsx(Image, { src: imagePreview.twitter_graph_file, alt: "Image Preview", boxSize: "200px", objectFit: "cover" }) }),
            /* @__PURE__ */ jsx(
              Input,
              {
                ref: twitterGraphFileRef,
                type: "file",
                display: "none",
                accept: "image/*",
                name: "twitter_graph_file",
                onChange: handleFileChange
              }
            )
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsx(Button, { variant: "brand", mr: 3, onClick: handleVendor, children: "Save" }),
    /* @__PURE__ */ jsx(Button, { onClick: () => setOpenedPage(0), children: "Cancel" })
  ] });
}
const DBMSForm = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: VendorForm
}, Symbol.toStringTag, { value: "Module" }));
export {
  DBMSForm as D,
  Vendor as V,
  VendorForm as a,
  index as i
};
