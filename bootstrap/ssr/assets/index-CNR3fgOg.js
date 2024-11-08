import { jsx, jsxs } from "react/jsx-runtime";
import { useBreakpointValue, useColorModeValue, Box, Text, Icon, Flex, Stack } from "@chakra-ui/react";
import { C as Card } from "./Card-M0XrdzyB.js";
import { useState, useEffect } from "react";
import { MdOutlineCalendarToday } from "react-icons/md";
import "../ssr.js";
import { useQuery } from "react-query";
import { Skeleton } from "@chakra-ui/skeleton";
import axios from "axios";
import "react-dom/server";
import "@inertiajs/inertia-react";
import "@inertiajs/react/server";
import "@chakra-ui/theme-tools";
const getTrendsDataAndXaxisValue = async (country) => {
  const res = await axios.get(`/api/get-trends-data-for-chart?country=${country}`);
  return res.data;
};
function RankChart(props) {
  const { showingCategory, country } = props;
  const legendPosition = useBreakpointValue({ base: "bottom", md: "right" });
  const [loading, setLoading] = useState(true);
  const textColorSecondary = useColorModeValue("secondaryGray.600", "white");
  const [AppexChart, setAppexChart] = useState(null);
  const [chartLoaded, setChartLoaded] = useState(false);
  useEffect(() => {
    if (typeof window !== "undefined") {
      import("react-apexcharts").then((module) => {
        const ChartComponent = module.default || module;
        setAppexChart(() => ChartComponent);
        setChartLoaded(true);
      });
    }
  }, []);
  const [lineChartDataTotalSpent, setLineChartDataTotalSpent] = useState([{ name: "Sample", data: [0, 10, 20, 30, 40, 50] }]);
  const [lineChartOptionsTotalSpent, setLineChartOptionsTotalSpent] = useState({
    tooltip: {
      theme: "dark"
    },
    chart: {
      toolbar: {
        show: true
      },
      height: 650,
      type: "line",
      id: "areachart-2"
    },
    legend: {
      showing: true,
      position: legendPosition,
      labels: {
        colors: "#A3AED0",
        fontSize: "12px",
        fontWeight: "500"
      }
    },
    dataLabels: {
      enabled: false
    },
    grid: {
      padding: {
        right: 30,
        left: 20
      }
    },
    labels: [],
    xaxis: {
      type: "datetime",
      labels: {
        style: {
          colors: "#A3AED0",
          fontSize: "12px",
          fontWeight: "500"
        }
      }
    },
    yaxis: {
      labels: {
        style: {
          colors: "#A3AED0",
          fontSize: "12px",
          fontWeight: "500"
        }
      }
    },
    stroke: {
      width: 3,
      curve: "smooth"
    }
  });
  const { data } = useQuery(
    [`getTrends-${country}`, country],
    () => getTrendsDataAndXaxisValue(country.value),
    {
      enabled: !!country,
      staleTime: 3e5
    }
  );
  useEffect(() => {
    if (data && data.success) {
      const chartIds = data.chartData.map((_) => _.primary_category.map((category) => category.id));
      const chartData = showingCategory === 0 ? data.chartData : data.chartData.filter((_, index) => chartIds[index].includes(showingCategory));
      setLineChartOptionsTotalSpent((prevState) => ({
        ...prevState,
        labels: data.xaxis || ["SEP", "OCT", "NOV", "DEC", "JAN", "FEB"],
        xaxis: { ...prevState.xaxis, categories: data.xaxis || ["SEP", "OCT", "NOV", "DEC", "JAN", "FEB"] }
      }));
      setLineChartDataTotalSpent(chartData || [{ name: "Sample", data: [0, 10, 20, 30, 40, 50] }]);
      setLoading(false);
    }
  }, [showingCategory, country.value, data]);
  return /* @__PURE__ */ jsx(Box, { children: /* @__PURE__ */ jsxs(
    Card,
    {
      justifyContent: "center",
      align: "center",
      direction: "column",
      w: "100%",
      mb: "0px",
      children: [
        /* @__PURE__ */ jsx("div", { style: { display: "flex", justifyContent: "space-between", marginTop: "20px", marginLeft: "20px", alignItems: "center" }, children: /* @__PURE__ */ jsxs(
          Text,
          {
            fontSize: "sm",
            fontWeight: "500",
            color: textColorSecondary,
            borderRadius: "7px",
            children: [
              /* @__PURE__ */ jsx(
                Icon,
                {
                  as: MdOutlineCalendarToday,
                  color: textColorSecondary,
                  me: "4px"
                }
              ),
              "Past a year"
            ]
          }
        ) }),
        /* @__PURE__ */ jsx(Flex, { w: "100%", flexDirection: { base: "column", lg: "row" }, children: /* @__PURE__ */ jsx(Box, { h: "650px", w: "100%", mt: "auto", children: chartLoaded && AppexChart ? /* @__PURE__ */ jsx(
          AppexChart,
          {
            options: lineChartOptionsTotalSpent || {},
            series: lineChartDataTotalSpent || [],
            type: "line",
            width: "100%",
            height: "100%"
          }
        ) : /* @__PURE__ */ jsx(Stack, { mt: "18px", gap: "1", children: /* @__PURE__ */ jsx(Skeleton, { height: "300px", borderRadius: "12px" }) }) }) })
      ]
    }
  ) });
}
export {
  RankChart as default
};
