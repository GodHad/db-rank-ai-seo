import {
    Flex,
    Icon,
    IconButton,
    Text,
    Box,
    Breadcrumb,
    BreadcrumbItem,
    useColorModeValue,
    Tooltip,
} from '@chakra-ui/react';
import React, { useState, useEffect, useMemo, useContext } from 'react'
import { Select } from 'chakra-react-select';
import countryList from 'react-select-country-list';
import Card from '@/components/card/Card';
import { MdAutoGraph, MdTableView } from 'react-icons/md'
import { useQuery } from 'react-query';
import { Link as ReactLink } from '@inertiajs/react'
import { getVendors, getCategories } from '@/Pages/admin/dbms/dbms/requests/use-request';
import Sidebar, { SidebarResponsive } from './component/Sidebar/Sidebar';
import { DBMSContext } from '@/contexts/DBMSContext';
import UserLayout from '@/layouts/user';
import RankTable from './component/RankTable';
import RankChart from './component/RankCharts';
import SeoHeader from '../components/SeoHeader';
import CustomCKEditor from '../components/CustomCKEditor';

export default function Ranking({ content, route }) {
    const { vendors: data, setVendors: setData } = useContext(DBMSContext);
    const textColor = useColorModeValue('secondaryGray.900', 'white');
    let secondaryText = useColorModeValue('gray.700', 'white');

    const [country, setCountry] = useState({ value: ' ', label: 'WorldWide' });

    const handleChangeCountry = value => {
        setCountry(value);
    }

    const { data: vendors = [] } = useQuery(
        [`vendors`, country],
        () => getVendors(country.value),
        {
            enabled: !!country,
            staleTime: 300000
        }
    );
    const { data: categories, isLoadingCategory } = useQuery('categories', getCategories, { staleTime: 300000 });

    useEffect(() => {
        setData(vendors);
    }, [vendors])

    const bgButton = useColorModeValue("secondaryGray.300", "whiteAlpha.100");
    const bgHover = useColorModeValue(
        { bg: "secondaryGray.400" },
        { bg: "whiteAlpha.50" }
    );
    const bgFocus = useColorModeValue(
        { bg: "secondaryGray.300" },
        { bg: "whiteAlpha.100" }
    );

    const [showingCategory, setShowingCategory] = useState(0);

    useEffect(() => {
        if (showingCategory === 0) setData(vendors);
        else {
            const showingVendors = vendors.filter(vendor => vendor.primary_category.map(category => category.id).includes(showingCategory));

            const prevMonthOverallRanking = showingVendors.map(vendor => vendor.prev_month_overall_ranking).sort();
            const prevYearOverAllRanking = showingVendors.map(vendor => vendor.prev_year_overall_ranking).sort();

            setData(showingVendors.map(vendor => ({ ...vendor, prev_month_overall_ranking: prevMonthOverallRanking.indexOf(vendor.prev_month_overall_ranking) + 1, prev_year_overall_ranking: prevYearOverAllRanking.indexOf(vendor.prev_year_overall_ranking) + 1 })))
        }
    }, [showingCategory, setData, vendors])

    const [options, setOptions] = useState([{ id: 0, value: 'all', label: 'All DBMS' }]);

    useEffect(() => {
        if (categories) setOptions([{ id: 0, value: 'all', label: 'All DBMS' }].concat(categories.map(category => ({ id: category.id, label: category.title, value: category.title }))))
    }, [categories])

    const countryOptions = useMemo(() => [{ value: ' ', label: 'WorldWide' }].concat(countryList().getData()), [{ value: ' ', label: 'WorldWide' }])

    return (
        <UserLayout>
            <SeoHeader content={content} title={'DBMS Ranking'} />
            <Card
                flexDirection="column"
                w="100%"
                px="0px"
                minH="calc(100vh - 150px)"
                overflowX={{ sm: 'auto', lg: 'hidden' }}
            >
                <Sidebar categories={options} showingCategory={showingCategory} setShowingCategory={setShowingCategory} />
                <Flex justifyContent={"flex-end"}>
                    <Box width={{ xl: 'calc(100% - 290px)', base: '100%' }} float={"right"} position={'relative'} zIndex={10} overflow={'auto'}>
                        <Breadcrumb px="25px">
                            <BreadcrumbItem color={secondaryText} fontSize='sm' mb='5px'>
                                <ReactLink href='/'>
                                    Home
                                </ReactLink>
                            </BreadcrumbItem>

                            <BreadcrumbItem color={secondaryText} fontSize='sm' mb='5px'>
                                <ReactLink href='/ranking'>
                                    DB Rank
                                </ReactLink>
                            </BreadcrumbItem>
                        </Breadcrumb>
                        <Flex px="25px" mb="8px" gap={4} flexDir={{ base: 'column', md: 'row' }} justifyContent="space-between" align={{ base: 'inherit', md: "center" }}>
                            <Text
                                as={'h1'}
                                color={textColor}
                                fontSize="22px"
                                mb="4px"
                                fontWeight="700"
                                lineHeight="100%"
                            >
                                DB Ranking {options && ('for ' + options[showingCategory].label)}
                            </Text>
                            <Box display={"flex"} gap={2} alignItems={"center"} justifyContent={{ base: 'right', md: 'inherit' }}>
                                <Select
                                    options={countryOptions}
                                    value={country}
                                    onChange={handleChangeCountry}
                                    isSearchable
                                    chakraStyles={{
                                        container: (provided) => ({
                                            ...provided,
                                            width: '200px', // Set the container width here
                                        }),
                                    }}
                                />
                                <ReactLink href={route === 'table-view' ? '/ranking/chart-view' : '/ranking'}>
                                    <Tooltip label={route === 'table-view' ? 'Chart View' : 'Table View'}>
                                        <IconButton
                                            align='center'
                                            justifyContent='center'
                                            bg={bgButton}
                                            _hover={bgHover}
                                            _focus={bgFocus}
                                            _active={bgFocus}
                                            w='37px'
                                            h='37px'
                                            lineHeight='100%'
                                            borderRadius='10px'
                                        >
                                            <Icon as={route === 'table-view' ? MdAutoGraph : MdTableView} width={"20px"} height={"20px"} color="inherit" />
                                        </IconButton>
                                    </Tooltip>
                                </ReactLink>
                                <SidebarResponsive categories={options} showingCategory={showingCategory} setShowingCategory={setShowingCategory} />
                            </Box>
                        </Flex>
                        <Box px={'25px'}>
                            <CustomCKEditor content={content.content || ''} />
                        </Box>
                        {route === 'table-view' && <RankTable data={data} vendors={vendors} isLoadingCategory={isLoadingCategory} categories={categories} />}
                        {(route === 'chart-view' && typeof window !== 'undefined') && <RankChart showingCategory={options[showingCategory].id} country={country} />}
                    </Box>
                </Flex>
            </Card>
        </UserLayout>
    );
}
