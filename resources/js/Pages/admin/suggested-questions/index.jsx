import {
    Flex,
    Box,
    Button,
    Icon,
    Table,
    Tbody,
    Td,
    Text,
    Th,
    Thead,
    Tr,
    useColorModeValue,
    Link,
    useToast,
} from '@chakra-ui/react';
import { MdDelete, MdEdit } from 'react-icons/md';
import { useState, useEffect } from 'react';

import {
    createColumnHelper,
    flexRender,
    getCoreRowModel,
    getSortedRowModel,
    useReactTable,
} from '@tanstack/react-table';

import Card from '@/components/card/Card';
import QuestionModal from './components/QuestionModal';
import axios from "@/variables/axiosConfig";
import { MdAdd } from 'react-icons/md'
import AdminLayout from '@/layouts/admin';

const columnHelper = createColumnHelper();

export default function Blog() {
    const toast = useToast();
    const [sorting, setSorting] = useState([]);
    const textColor = useColorModeValue('secondaryGray.900', 'white');
    const borderColor = useColorModeValue('gray.200', 'whiteAlpha.100');
    const [question, setQuestion] = useState({
        id: null,
        question: ''
    });

    const [onopen, setOnopen] = useState(0);

    const handleOnClose = () => {
        setOnopen(0)
    }

    const handleOnUpdate = () => {
        axios.get('/api/get-questions').then(res => {
            setData(res.data.questions);
        }).catch(error => {
            const errors = error.data.errors ? error.data.errors : { error: error.data.error };
            const key = errors[Object.keys(errors)[0]];
            toast({
                title: "Failed to get questions",
                description: key,
                position: 'top-right',
                status: "error",
                insert: "top",
                duration: 5000,
                isClosable: true
            })
        })
    }

    const handleDeleteQuestion = (id) => {
        axios.delete(`/api/delete-question?id=${id}`).then(res => {
            handleOnUpdate()
            toast({
                title: "Delete question successfully",
                position: 'top-right',
                status: "success",
                insert: "top",
                duration: 5000,
                isClosable: true
            })
        }).catch(error => {
            const errors = error.response.data.errors ? error.response.data.errors : { error: error.response.data.error };
            const key = errors[Object.keys(errors)[0]];
            toast({
                title: "Failed to delete question",
                description: key,
                position: 'top-right',
                status: "error",
                insert: "top",
                duration: 5000,
                isClosable: true
            })
        })
    }

    useEffect(() => {
        handleOnUpdate()
    }, [])

    const columns = [
        columnHelper.accessor('question', {
            id: 'question',
            header: () => (
                <Text
                    justifyContent="space-between"
                    align="center"
                    fontSize={{ sm: '10px', lg: '12px' }}
                    color="gray.400"
                >
                    Question
                </Text>
            ),
            cell: (info) => (
                <Flex align="center">
                    <Text color={textColor} fontSize="sm" fontWeight="700" isTruncated>
                        {info.getValue()}
                    </Text>
                </Flex>
            ),
        }),
        columnHelper.accessor('action', {
            id: 'action',
            header: () => (
                <Text
                    justifyContent="space-between"
                    fontSize={{ sm: '10px', lg: '12px' }}
                    color="gray.400"
                >
                    Actions
                </Text>
            ),
            cell: (info) => (
                <>
                    <Link
                        variant='no-hover'
                        me='16px'
                        ms='auto'
                        p='0px !important'
                        onClick={() => { setQuestion(info.row.original); setOnopen(onopen + 1) }}
                    >
                        <Icon as={MdEdit} color='secondaryGray.500' h='18px' w='18px' />
                    </Link>
                    <Link
                        variant='no-hover'
                        me='16px'
                        ms='auto'
                        p='0px !important'
                        onClick={() => handleDeleteQuestion(info.row.original.id)}
                    >
                        <Icon as={MdDelete} color='secondaryGray.500' h='18px' w='18px' />
                    </Link>
                </>
            ),
        }),
    ];
    const [data, setData] = useState([]);
    const table = useReactTable({
        data: data || [],
        columns,
        state: {
            sorting,
        },
        onSortingChange: setSorting,
        getSortedRowModel: getSortedRowModel(),
        getCoreRowModel: getCoreRowModel(),
        debugTable: true,
    });

    return (
        <AdminLayout>
            <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
                <Card
                    flexDirection="column"
                    w="100%"
                    px="0px"
                    overflowX={{ sm: 'scroll', lg: 'hidden' }}
                >
                    <Flex w='100%'>
                        <Button
                            me='100%'
                            mb='50px'
                            w='140px'
                            minW='140px'
                            mt={{ base: "20px" }}
                            ml={{ base: "20px" }}
                            variant='brand'
                            fontWeight='500'
                            onClick={() => { setOnopen(onopen + 1); setQuestion({ id: null, question: '' }) }}
                        >
                            <Icon as={MdAdd} h='18px' w='18px' />
                            Add Question
                        </Button>
                    </Flex>
                    <QuestionModal _question={question} onopen={onopen} handleOnClose={handleOnClose} handleOnUpdate={handleOnUpdate} />
                    <Box>
                        <Table variant="simple" color="gray.500" mb="24px" mt="12px">
                            <Thead>
                                {table.getHeaderGroups().map((headerGroup) => (
                                    <Tr key={headerGroup.id}>
                                        {headerGroup.headers.map((header) => {
                                            return (
                                                <Th
                                                    key={header.id}
                                                    colSpan={header.colSpan}
                                                    pe="10px"
                                                    borderColor={borderColor}
                                                    cursor="pointer"
                                                    onClick={header.column.getToggleSortingHandler()}
                                                >
                                                    <Flex
                                                        justifyContent="space-between"
                                                        align="center"
                                                        fontSize={{ sm: '10px', lg: '12px' }}
                                                        color="gray.400"
                                                    >
                                                        {flexRender(
                                                            header.column.columnDef.header,
                                                            header.getContext(),
                                                        )}
                                                        {{
                                                            asc: '',
                                                            desc: '',
                                                        }[header.column.getIsSorted()] ?? null}
                                                    </Flex>
                                                </Th>
                                            );
                                        })}
                                    </Tr>
                                ))}
                            </Thead>
                            <Tbody>
                                {table.getRowModel().rows.length !== 0 ? table
                                    .getRowModel()
                                    .rows
                                    .map((row) => {
                                        return (
                                            <Tr key={row.id}>
                                                {row.getVisibleCells().map((cell) => {
                                                    return (
                                                        <Td
                                                            key={cell.id}
                                                            fontSize={{ sm: '14px' }}
                                                            minW={{ sm: '150px', md: '200px', lg: 'auto' }}
                                                            borderColor="transparent"
                                                        >
                                                            {flexRender(
                                                                cell.column.columnDef.cell,
                                                                cell.getContext(),
                                                            )}
                                                        </Td>
                                                    );
                                                })}
                                            </Tr>
                                        );
                                    }) : (
                                    <Tr>
                                        <Td
                                            fontSize={{ sm: '14px' }}
                                            minW={{ sm: '150px', md: '200px', lg: 'auto' }}
                                            borderColor="transparent"
                                            colSpan={3}
                                        >
                                            <Text
                                                color={textColor}
                                                mb="4px"
                                                align={"center"}
                                                fontWeight="700"
                                                lineHeight="100%"
                                            >
                                                No Questions
                                            </Text>
                                        </Td>
                                    </Tr>
                                )}
                            </Tbody>
                        </Table>
                    </Box>
                </Card>
            </Box >
        </AdminLayout>
    );
}
