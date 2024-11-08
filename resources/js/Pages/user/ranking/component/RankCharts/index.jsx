'use client'
import {
    Box,
    Flex,
    Icon,
    Text,
    Stack,
    useColorModeValue,
    useBreakpointValue
} from "@chakra-ui/react";
import Card from "../../../../../components/card/Card";
import React, { useEffect, useState } from "react";
import { MdOutlineCalendarToday } from "react-icons/md";

import axios from "../../../../../variables/axiosConfig";
import { useQuery } from "react-query";
import {
    Skeleton,
} from "@chakra-ui/skeleton";

const getTrendsDataAndXaxisValue = async (country) => {
    const res = await axios.get(`/api/get-trends-data-for-chart?country=${country}`);
    return res.data;
}

export default function RankChart(props) {
    const { showingCategory, country } = props;
    const legendPosition = useBreakpointValue({ base: 'bottom', md: 'right' });
    const [loading, setLoading] = useState(true);
    const textColorSecondary = useColorModeValue("secondaryGray.600", "white");

    const [AppexChart, setAppexChart] = useState(null);
    const [chartLoaded, setChartLoaded] = useState(false);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            import('react-apexcharts').then(module => {
                const ChartComponent = module.default || module;
                setAppexChart(() => ChartComponent);
                setChartLoaded(true);
            })
        }
    }, [])

    const [lineChartDataTotalSpent, setLineChartDataTotalSpent] = useState([{ name: "Sample", data: [0, 10, 20, 30, 40, 50] }]);
    const [lineChartOptionsTotalSpent, setLineChartOptionsTotalSpent] = useState({
        tooltip: {
            theme: "dark",
        },
        chart: {
            toolbar: {
                show: true,
            },
            height: 650,
            type: "line",
            id: "areachart-2",
        },
        legend: {
            showing: true,
            position: legendPosition,
            labels: {
                colors: "#A3AED0",
                fontSize: "12px",
                fontWeight: "500",
            }
        },
        dataLabels: {
            enabled: false,
        },
        grid: {
            padding: {
                right: 30,
                left: 20,
            },
        },

        labels: [],
        xaxis: {
            type: "datetime",
            labels: {
                style: {
                    colors: "#A3AED0",
                    fontSize: "12px",
                    fontWeight: "500",
                },
            },
        },
        yaxis: {
            labels: {
                style: {
                    colors: "#A3AED0",
                    fontSize: "12px",
                    fontWeight: "500",
                },
            },
        },
        stroke: {
            width: 3,
            curve: 'smooth'
        }
    });

    const { data } = useQuery(
        [`getTrends-${country}`, country],
        () => getTrendsDataAndXaxisValue(country.value),
        {
            enabled: !!country,
            staleTime: 300000,
        },
    );

    useEffect(() => {
        if (data && data.success) {
            const chartIds = data.chartData.map(_ => _.primary_category.map(category => category.id));
            const chartData = showingCategory === 0 ? data.chartData : data.chartData.filter((_, index) => chartIds[index].includes(showingCategory))
            setLineChartOptionsTotalSpent(prevState => ({
                ...prevState,
                labels: data.xaxis || ["SEP", "OCT", "NOV", "DEC", "JAN", "FEB"],
                xaxis: { ...prevState.xaxis, categories: data.xaxis || ["SEP", "OCT", "NOV", "DEC", "JAN", "FEB"] }
            }))
            setLineChartDataTotalSpent(chartData || [{ name: "Sample", data: [0, 10, 20, 30, 40, 50] }]);
            setLoading(false);
        }
    }, [showingCategory, country.value, data])

    return (
        <Box>
            <Card
                justifyContent='center'
                align='center'
                direction='column'
                w='100%'
                mb='0px'
            >
                <div style={{ display: 'flex', justifyContent: "space-between", marginTop: '20px', marginLeft: '20px', alignItems: 'center' }}>
                    <Text
                        fontSize='sm'
                        fontWeight='500'
                        color={textColorSecondary}
                        borderRadius='7px'>
                        <Icon
                            as={MdOutlineCalendarToday}
                            color={textColorSecondary}
                            me='4px'
                        />
                        Past a year
                    </Text>
                </div>
                <Flex w='100%' flexDirection={{ base: "column", lg: "row" }}>
                    <Box h={"650px"} w={"100%"} mt='auto'>
                        {(chartLoaded && AppexChart) ? (
                            <AppexChart
                                options={lineChartOptionsTotalSpent || {}}
                                series={lineChartDataTotalSpent || []}
                                type='line'
                                width='100%'
                                height='100%'
                            />
                        ) : (
                            <Stack mt="18px" gap="1">
                                <Skeleton height={"300px"} borderRadius={"12px"} />
                            </Stack>
                        )}
                    </Box>
                </Flex>
            </Card>
        </Box>
    );
}
