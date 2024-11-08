import {
    Flex,
    Text,
    Box,
    SimpleGrid,
    Breadcrumb,
    BreadcrumbItem,
    Stack,
    useColorModeValue,
    useBreakpointValue,
} from '@chakra-ui/react';
import { useState, useEffect, useContext } from 'react';
import { Skeleton } from "@chakra-ui/skeleton";
import Card from '@/components/card/Card';
import { useQuery } from 'react-query';
import { Link } from '@inertiajs/react';
import { getVendors } from '@/Pages/admin/dbms/dbms/requests/use-request';
import { DBMSContext } from '@/contexts/DBMSContext';
import { generateSlug } from '@/variables/statics';
import axios from '@/variables/axiosConfig';
import UserLayout from '@/layouts/user';
import SeoHeader from '../components/SeoHeader';
import CustomCKEditor from '../components/CustomCKEditor';

const chunkIntoColumns = (data, columnCount) => {
    const rowsPerColumn = Math.ceil(data.length / columnCount);
    const columns = Array.from({ length: columnCount }, () => []);

    data.forEach((item, index) => {
        const columnIndex = Math.floor(index / rowsPerColumn);
        columns[columnIndex].push(item);
    });

    return columns;
};

export default function Vendor({ content }) {
    const { vendors: data, setVendors: setData } = useContext(DBMSContext);
    const textColor = useColorModeValue('secondaryGray.900', 'white');
    let secondaryText = useColorModeValue('gray.700', 'white');

    const { data: vendors, isLoading } = useQuery(
        'user_vendors',
        () => getVendors(' '),
        {
            staleTime: 300000,
            onSuccess: (data) => {
                setData(data);
            }
        }
    );

    const columnCount = useBreakpointValue({
        base: 4,
        xs: 1,
        sm: 2,
        md: 3,
        lg: 4,
        xl: 5,
    });

    const [columns, setColumns] = useState(null);

    useEffect(() => {
        if (data) setColumns(chunkIntoColumns(data, columnCount));
    }, [data, columnCount]);

    const handleIncreaseViews = async (id) => {
        await axios.get(`/api/increase-views?id=${id}`);
    }

    return (
        <UserLayout>
            <SeoHeader content={content} title={'DBMS'} />
            <Card
                flexDirection="column"
                w="100%"
                px="0px"
                minH="calc(100vh - 150px)"
                overflowX={{ sm: 'auto', lg: 'hidden' }}
            >
                <Breadcrumb px="25px">
                    <BreadcrumbItem color={secondaryText} fontSize='sm' mb='5px'>
                        <Link href='/'>
                            Home
                        </Link>
                    </BreadcrumbItem>
                    <BreadcrumbItem color={secondaryText} fontSize='sm' mb='5px'>
                        <Link href='/dbms'>
                            DBMS
                        </Link>
                    </BreadcrumbItem>
                </Breadcrumb>
                <Flex px="25px" mb="8px" gap={4} flexDir={{ base: 'column' }} justifyContent="space-between" align={{ base: 'inherit' }}>
                    <Text
                        color={textColor}
                        fontSize={{ md: "22px", base: '20px' }}
                        mb="4px"
                        fontWeight="700"
                        lineHeight="100%"
                    >
                        DBMS
                    </Text>
                    <CustomCKEditor content={content.content} />
                    <SimpleGrid columns={columnCount} spacing={4} gap={4}>
                        {isLoading || !columns ? (
                            <>
                                <Stack gap="1">
                                    <Skeleton height={"20px"} borderRadius={"12px"} />
                                    <Skeleton height={"20px"} borderRadius={"12px"} />
                                    <Skeleton height={"20px"} borderRadius={"12px"} />
                                    <Skeleton height={"20px"} borderRadius={"12px"} />
                                </Stack>
                                <Stack gap="1">
                                    <Skeleton height={"20px"} borderRadius={"12px"} />
                                    <Skeleton height={"20px"} borderRadius={"12px"} />
                                    <Skeleton height={"20px"} borderRadius={"12px"} />
                                    <Skeleton height={"20px"} borderRadius={"12px"} />
                                </Stack>
                                <Stack gap="1">
                                    <Skeleton height={"20px"} borderRadius={"12px"} />
                                    <Skeleton height={"20px"} borderRadius={"12px"} />
                                    <Skeleton height={"20px"} borderRadius={"12px"} />
                                    <Skeleton height={"20px"} borderRadius={"12px"} />
                                </Stack>
                                <Stack gap="1">
                                    <Skeleton height={"20px"} borderRadius={"12px"} />
                                    <Skeleton height={"20px"} borderRadius={"12px"} />
                                    <Skeleton height={"20px"} borderRadius={"12px"} />
                                    <Skeleton height={"20px"} borderRadius={"12px"} />
                                </Stack>
                            </>
                        ) : (
                            columns.map((items, index) => (
                                <Box key={index} mb={4}>
                                    {items.map((item) => (
                                        <Link href={`/dbms/${generateSlug(item.db_name)}`} key={item.db_name} onClick={() => handleIncreaseViews(item.id)}>
                                            <Text color={'blue.500'} cursor={"pointer"} mb="15px" _hover={{ textDecor: 'underline' }}>
                                                {item.db_name}
                                            </Text>
                                        </Link>
                                    ))}
                                </Box>
                            ))
                        )}
                    </SimpleGrid>
                </Flex>
            </Card>
        </UserLayout>
    );
}
