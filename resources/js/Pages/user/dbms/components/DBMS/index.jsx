import {
    Flex,
    Box,
    Table as ChakraTable,
    Tbody,
    Td,
    Text,
    Th,
    Tr,
    Image as ChakraImage,
    Icon,
    Breadcrumb,
    BreadcrumbItem,
    useColorModeValue,
    BreadcrumbLink,
    Button,
    IconButton,
    useBreakpointValue,
} from '@chakra-ui/react';
import { useState, useEffect, useContext, useMemo } from 'react'
import { MdCheckCircle, MdOutlineRemoveCircle, MdVisibility, MdEdit } from 'react-icons/md';
import Card from '@/components/card/Card';
import { Link as ReactLink } from '@inertiajs/react';
import { DBMSContext } from '@/contexts/DBMSContext';
import { APP_URL, generateSlug } from '@/variables/statics';
import { getVendors } from '@/Pages/admin/dbms/dbms/requests/use-request';
import { useQuery } from 'react-query';
import { Skeleton } from '@chakra-ui/skeleton';
import { UserContext } from '@/contexts/UserContext';
import VendorForm from '@/Pages/admin/dbms/dbms/components/DBMSForm';
import { getCategories } from '@/Pages/admin/dbms/dbms/requests/use-request';
import UserLayout from '@/layouts/user';
import { Inertia } from '@inertiajs/inertia';
import SeoHeader from '../../../components/SeoHeader';
import CustomCKEditor from '../../../components/CustomCKEditor';

export const headers = [
    { key: 'db_name', name: 'Name' },
    { key: 'description', name: 'Description' },
    { key: 'primary_category', name: 'Primary Database Model' },
    { key: 'secondary_category', name: 'Secondary Database Models' },
    { key: 'overall_ranking', name: 'DB Rank' },
    // { key: 'webisite_url', name: 'Website' },
    // { key: 'technical_doc', name: 'Technical Documentation' },
    // { key: 'developer', name: 'Developer' },
    // { key: 'initial_release', name: 'Initial Release' },
    // { key: 'current_release', name: 'Current Release' },
    // { key: 'license', name: 'License' },
    // { key: 'cloud_based_only', name: 'Cloud-based only', yes: true },
    // { key: 'dbaas_offerings', name: 'DBaas Offerings' },
    // { key: 'implementation_lang', name: 'Implementation Language' },
    // { key: 'server_os', name: 'Server Operating Systems' },
    // { key: 'data_scheme', name: 'Data Scheme' },
    // { key: 'typing', name: 'Typing', yes: true },
    // { key: 'xml_support', name: 'XML Support', yes: true },
    // { key: 'secondary_indexes', name: 'Secondary Indexes', yes: true },
    // { key: 'sql', name: 'SQL' },
    // { key: 'apis_access_method', name: 'APIS And Other Access Methods' },
    // { key: 'supported_programming_lang', name: 'Supported Programming Languages' },
    // { key: 'server_side_scripts', name: 'Server-side Scripts' },
    // { key: 'triggers', name: 'Triggers', yes: true },
    // { key: 'partitioning_methods', name: 'Partitioning Methods' },
    // { key: 'replication_methods', name: 'Replication Methods' },
    // { key: 'mapreduce', name: 'MapReduce' },
    // { key: 'consistency_concepts', name: 'Consistency Concepts' },
    // { key: 'foreign_keys', name: 'Foreign Keys', yes: true },
    // { key: 'transaction_concepts', name: 'Transcation Concepts' },
    // { key: 'concurrency', name: 'Concurrency', yes: true },
    // { key: 'durability', name: 'Durability', yes: true },
    // { key: 'in_memory_capabilities', name: 'In-memory capabilities', yes: true },
    // { key: 'user_concepts', name: 'User Concepts' },
]

export default function DBMS({ selectedDBMS, slug }) {
    const { user } = useContext(UserContext);
    const { data: categories } = useQuery('categories', getCategories);

    const textColor = useColorModeValue('secondaryGray.900', 'white');
    let secondaryText = useColorModeValue('gray.700', 'white');
    const borderColor = useColorModeValue('gray.200', 'whiteAlpha.100');
    const viewsColor = useColorModeValue('green.500', 'green.300');
    const contactCTAColor = useColorModeValue('green.500', 'green.400');

    const compareText = useBreakpointValue({ base: 'Compare', md: 'Compare with others' });

    const [editing, setEditing] = useState(false);

    return (
        <UserLayout>
            <SeoHeader content={selectedDBMS} title={`DBMS | ${selectedDBMS ? selectedDBMS.db_name : ''}`} />
            <Box
                flexDirection="column"
                w="100%"
                px="0px"
                overflow={'hidden'}
            >
                <Card
                    flexDirection="column"
                    w="100%"
                    px="0px"
                    minH="calc(100vh - 150px)"
                    overflowX={{ sm: 'auto', lg: 'hidden' }}
                >
                    <Flex px="25px" mb="20px" gap={4} flexDir={{ base: 'column', sm: 'row' }} justifyContent="space-between" align={{ base: 'inherit', md: "center" }}>
                        <Breadcrumb>
                            <BreadcrumbItem color={secondaryText} fontSize='sm' mb='5px'>
                                <ReactLink href='/'>
                                    Home
                                </ReactLink>
                            </BreadcrumbItem>

                            <BreadcrumbItem color={secondaryText} fontSize='sm' mb='5px'>
                                <ReactLink href='/dbms'>
                                    DBMS
                                </ReactLink>
                            </BreadcrumbItem>

                            <BreadcrumbItem color={secondaryText} fontSize='sm' mb='5px'>
                                <BreadcrumbLink>
                                    {selectedDBMS && selectedDBMS.db_name}
                                </BreadcrumbLink>
                            </BreadcrumbItem>
                        </Breadcrumb>
                        <Flex gap={4} alignItems={'center'} justifyContent={'right'}>
                            <ReactLink href={`/dbms/compare/${slug}`}>
                                <Text
                                    color={'green.500'}
                                    fontSize={{ md: "14px", base: '12px' }}
                                    mb="4px"
                                    fontWeight="400"
                                    lineHeight="100%"
                                >
                                    {compareText}
                                </Text>
                            </ReactLink>
                        </Flex>
                    </Flex>
                    {editing ? <VendorForm vendor={selectedDBMS} setOpenedPage={setEditing} categories={categories} /> :
                        <>
                            {selectedDBMS ?
                                <>
                                    <ChakraImage
                                        mb={5}
                                        w="100%"
                                        maxH={'191px'}
                                        objectFit="cover"
                                        objectPosition="center"
                                        src={`${APP_URL}storage/${selectedDBMS.banner}?w=1400&auto=compression,format`}
                                        alt={selectedDBMS.db_name}
                                    />
                                    <Flex alignItems={'center'} justifyContent={'space-between'} gap={10}>
                                        <Flex flexDir={'column'}>
                                            <Flex align={'center'} gap={2} mx={5} mb={5} display={{ base: 'flex', lg: 'none' }}>
                                                <Text
                                                    color={textColor}
                                                    mb="4px"
                                                    fontWeight="700"
                                                    lineHeight="120%"
                                                    fontSize={{ md: '20px', "2sm": '18px', sm: '16px' }}
                                                >{selectedDBMS.db_name}</Text>
                                                {(user && selectedDBMS && selectedDBMS.user.length && user.id === selectedDBMS.user[0].id) && !editing ? (
                                                    <IconButton
                                                        aria-label="Edit"
                                                        icon={<MdEdit />}
                                                        colorScheme="blue"
                                                        variant="outline"
                                                        isRound
                                                        size="sm"
                                                        float={'right'}
                                                        onClick={() => setEditing(true)}
                                                    />
                                                ) : <></>}
                                            </Flex>
                                            <ChakraImage
                                                mb={5}
                                                mx={5}
                                                w="172px"
                                                h={'172px'}
                                                objectFit="cover"
                                                objectPosition="center"
                                                border={borderColor}
                                                borderStyle={'solid'}
                                                borderWidth={1}
                                                src={`${APP_URL}storage/${selectedDBMS.logo_url}?w=1400&auto=compression,format`}
                                                alt={selectedDBMS.db_name}
                                            />
                                            <Flex align="center" mx={5} display={{ base: 'flex', lg: 'none' }}>
                                                <Icon
                                                    w="24px"
                                                    h="24px"
                                                    me="5px"
                                                    color={selectedDBMS.approved === 1 ? 'green.500' : 'gray.500'}
                                                    as={selectedDBMS.approved === 1 ? MdCheckCircle : MdOutlineRemoveCircle}
                                                />
                                                <Text color={selectedDBMS.approved === 1 ? 'green.500' : 'gray.500'} fontSize={{ md: "14px", '2sm': '12px', sm: '10px' }} fontWeight="700">
                                                    {selectedDBMS.approved === 1 ? 'Claimed' : 'Unclaimed'}
                                                </Text>
                                                {selectedDBMS.approved === 0 &&
                                                    <ReactLink href={`/claim-dbms/${generateSlug(selectedDBMS.db_name)}`}>
                                                        <Text color={'blue.500'} ms={1} fontSize={{ md: "14px", '2sm': '12px', sm: '10px' }} fontWeight="700" textDecor={'underline'}>
                                                            (Claim)
                                                        </Text>
                                                    </ReactLink>
                                                }
                                            </Flex>
                                        </Flex>
                                        <Flex justifyContent={'space-between'} flexDir={{ base: 'column', lg: 'row' }} w='full' mx={'16px'} gap={4}
                                            maxWidth={{ base: '200px', md: '300px', lg: '100vw' }}>
                                            <Flex
                                                flexDir={'column'}
                                                gap={{ md: 2, '2sm': 1, base: 0 }}
                                            >
                                                <Flex align={'center'} gap={2} display={{ base: 'none', lg: 'flex' }}>
                                                    <Text
                                                        color={textColor}
                                                        mb="4px"
                                                        fontWeight="700"
                                                        lineHeight="120%"
                                                        fontSize={{ md: '20px', "2sm": '18px', sm: '16px' }}
                                                    >{selectedDBMS.db_name}</Text>
                                                    {(user && selectedDBMS && selectedDBMS.user.length && user.id === selectedDBMS.user[0].id) && !editing ? (
                                                        <IconButton
                                                            aria-label="Edit"
                                                            icon={<MdEdit />}
                                                            colorScheme="blue"
                                                            variant="outline"
                                                            isRound
                                                            size="sm"
                                                            float={'right'}
                                                            onClick={() => setEditing(true)}
                                                        />
                                                    ) : <></>}
                                                </Flex>
                                                <Flex align="center">
                                                    <Icon
                                                        w="24px"
                                                        h="24px"
                                                        me="5px"
                                                        color={viewsColor}
                                                        as={MdVisibility}
                                                    />
                                                    <Text
                                                        color={viewsColor}
                                                        fontWeight="600"
                                                        lineHeight="120%"
                                                        fontSize={{ md: '18px', '2sm': '16px', sm: '14px' }}
                                                    >
                                                        {selectedDBMS.profile_views} views
                                                    </Text>
                                                </Flex>
                                                {selectedDBMS &&
                                                    <Text
                                                        color={textColor}
                                                        fontWeight="400"
                                                        lineHeight="120%"
                                                        display={'inline'}
                                                        fontSize={{ md: '16px', '2sm': '14px', sm: '12px' }}
                                                        dangerouslySetInnerHTML={{ __html: selectedDBMS.overall_ranking }}
                                                    />
                                                }
                                            </Flex>
                                            <Flex flexDir={'column'} maxWidth={{ base: '200px', md: '100vh' }}>
                                                <Flex gap={2} flexDir={{ base: 'column', md: 'row' }}>
                                                    <a href={'mailto:office@dbrank.ai'} target='_blank'>
                                                        <Button
                                                            fontSize='sm'
                                                            variant='solid'
                                                            fontWeight='500'
                                                            minW={'120px'}
                                                            w='100%'
                                                            color={'white'}
                                                            bg={contactCTAColor}
                                                            h={{ md: '50px', '2sm': '40px', base: '30px' }}
                                                            mb={{ base: '10px', md: '24px' }}
                                                        >
                                                            Contact
                                                        </Button>
                                                    </a>
                                                    <a href={selectedDBMS.website_url} target='_blank'>
                                                        <Button
                                                            fontSize='sm'
                                                            variant='brand'
                                                            fontWeight='500'
                                                            minW={'120px'}
                                                            w='100%'
                                                            h={{ md: '50px', '2sm': '40px', base: '30px' }}
                                                            mb={{ base: '10px', md: '24px' }}
                                                        >
                                                            Website
                                                        </Button>
                                                    </a>
                                                </Flex>
                                                <Flex align="center" display={{ base: 'none', lg: 'flex' }}>
                                                    <Icon
                                                        w="24px"
                                                        h="24px"
                                                        me="5px"
                                                        color={selectedDBMS.approved === 1 ? 'green.500' : 'gray.500'}
                                                        as={selectedDBMS.approved === 1 ? MdCheckCircle : MdOutlineRemoveCircle}
                                                    />
                                                    <Text color={selectedDBMS.approved === 1 ? 'green.500' : 'gray.500'} fontSize={{ md: "14px", '2sm': '12px', sm: '10px' }} fontWeight="700">
                                                        {selectedDBMS.approved === 1 ? 'Claimed' : 'Unclaimed'}
                                                    </Text>
                                                    {selectedDBMS.approved === 0 &&
                                                        <ReactLink href={`/dbms/claim-dbms/${generateSlug(selectedDBMS.db_name)}`}>
                                                            <Text color={'blue.500'} fontSize={{ md: "14px", '2sm': '12px', sm: '10px' }} ms={1} fontWeight="700" textDecor={'underline'}>
                                                                (Claim DBMS)
                                                            </Text>
                                                        </ReactLink>
                                                    }
                                                </Flex>
                                            </Flex>
                                        </Flex>
                                    </Flex>
                                </>
                                :
                                <>
                                    <Skeleton height={"300px"} borderRadius={"12px"} mb={5} mx={5} />
                                    <Flex alignItems={'center'}>
                                        <Skeleton
                                            mb={5}
                                            mx={5}
                                            w="172px"
                                            h={'172px'}
                                            objectFit="cover"
                                            objectPosition="center"
                                            border={borderColor}
                                            borderStyle={'solid'}
                                            borderWidth={1} />
                                        <Flex flexDir={'column'} gap={2}>
                                            <Skeleton w={'full'} maxW={'200px'} height={"30px"} borderRadius={"12px"} />
                                            <Skeleton w={'full'} maxW={'200px'} height={"30px"} borderRadius={"12px"} />
                                            <Skeleton w={'full'} maxW={'200px'} height={"30px"} borderRadius={"12px"} />
                                            <Skeleton w={'full'} maxW={'200px'} height={"30px"} borderRadius={"12px"} />
                                        </Flex>
                                    </Flex>
                                </>
                            }
                            <Box
                                overflow={'auto'}
                                sx={{
                                    '&::-webkit-scrollbar': {
                                        width: '8px',
                                        height: '8px',
                                        backgroundColor: 'transparent', // Change to transparent or the desired color
                                    },
                                    '&::-webkit-scrollbar-thumb': {
                                        backgroundColor: borderColor, // Color for the scrollbar thumb
                                        borderRadius: '20px',
                                    },
                                    '&::-webkit-scrollbar-track': {
                                        backgroundColor: 'rgba(0, 0, 0, 0.15)', // Track color, adjust as needed
                                        borderRadius: '20px',
                                    },
                                }}>
                                <ChakraTable variant="simple" color="gray.500" mb="24px" mt="12px" style={{ tableLayout: 'fixed' }}>
                                    <Tbody>
                                        {headers.map(header => (
                                            <Tr key={header.key}>
                                                <Th
                                                    pe="10px"
                                                    borderColor={borderColor}
                                                    width={'150px'}
                                                >
                                                    {header.name}
                                                </Th>
                                                {selectedDBMS ? (
                                                    <Td
                                                        key={selectedDBMS.id}
                                                        pe="10px"
                                                        borderColor={borderColor}
                                                        width={'300px'}
                                                    >
                                                        <Text
                                                            color={textColor}
                                                            mb="4px"
                                                            fontWeight="500"
                                                            lineHeight="120%"
                                                            dangerouslySetInnerHTML={{ __html: header.yes ? selectedDBMS[header.key] ? 'Yes' : 'No' : selectedDBMS[header.key] }}
                                                        />
                                                    </Td>
                                                ) : (
                                                    <Td
                                                        pe="10px"
                                                        borderColor={borderColor}
                                                        width={'300px'}
                                                    >
                                                        <Skeleton w={'full'} maxW={'300px'} height={"30px"} borderRadius={"12px"} />
                                                    </Td>
                                                )}
                                            </Tr>
                                        ))}
                                        <Tr>
                                            {selectedDBMS ?
                                                <Td
                                                    pe="10px"
                                                    borderColor={borderColor}
                                                    width={'300px'}
                                                    className='no-border-editor'
                                                    colSpan={2}
                                                >
                                                    <CustomCKEditor content={selectedDBMS.extra_content} />
                                                </Td>
                                                : <Td colSpan={2}><Skeleton w={'full'} maxW={'600px'} height={"30px"} borderRadius={"12px"} /></Td>
                                            }
                                        </Tr>
                                    </Tbody>
                                </ChakraTable>
                            </Box>
                        </>
                    }
                </Card>
            </Box>
        </UserLayout>
    );
}
