import {
    Table,
    Tbody,
    Td,
    Th,
    Thead,
    Tr,
    Stack,
    useColorModeValue,
    Flex,
    Text,
    Icon
} from '@chakra-ui/react'
import {
    Skeleton,
} from "@chakra-ui/skeleton"
import { generateSlug } from '../../../../../variables/statics';
import {
    createColumnHelper,
    flexRender,
    getCoreRowModel,
    useReactTable,
} from '@tanstack/react-table';
import { MdAdd, MdArrowUpward, MdArrowDownward, MdRemove } from 'react-icons/md'
import moment from 'moment';
import { Link } from '@inertiajs/react'

const columnHelper = createColumnHelper();

const RankTableCellContent = ({ currentRank, prevRank }) => {
    const textColor = useColorModeValue('secondaryGray.900', 'white');

    return (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, position: "relative" }}>
            {currentRank < prevRank ?
                (<Text color={'green.300'} fontSize="sm" fontWeight="700" position={"relative"}>
                    <Icon as={MdArrowUpward} h='18px' w='18px' color={'green.300'} boxSize={5} position={"absolute"} left={"-20px"} />
                    {prevRank}
                </Text>) : currentRank > prevRank ?
                    (<Text color={'red.600'} fontSize="sm" fontWeight="700" position={"relative"}>
                        <Icon as={MdArrowDownward} h='18px' w='18px' color={'red.600'} boxSize={5} position={"absolute"} left={"-20px"} />
                        {prevRank}
                    </Text>) : (<Text color={textColor} fontSize="sm" fontWeight="700" position={"relative"}>
                        {prevRank}
                    </Text>)
            }
        </div>
    )
}

const ScoreTableCellContent = ({ currentScore, prevScore }) => (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}>
        {
            currentScore < prevScore ?
                <Text color={'red.600'} fontSize="sm" fontWeight="700" position={"relative"}>
                    <Icon as={MdRemove} h='18px' w='18px' color={'red.600'} boxSize={5} position={"absolute"} left={"-20px"} />
                    {Number(prevScore - currentScore).toFixed(2)}
                </Text>
                : currentScore > prevScore ?
                    <Text color={'green.300'} fontSize="sm" fontWeight="700" position={"relative"}>
                        <Icon as={MdAdd} h='18px' w='18px' color={'green.300'} boxSize={5} position={"absolute"} left={"-20px"} />
                        {Number(currentScore - prevScore).toFixed(2)}
                    </Text>
                    : <Text fontSize="sm" fontWeight="700" position={"relative"}>0.00</Text>
        }
    </div>
)

export default function RankTable({ data, vendors, isLoadingCategory, categories }) {
    const textColor = useColorModeValue('secondaryGray.900', 'white');
    const borderColor = useColorModeValue('gray.200', 'whiteAlpha.100');

    const columns = [
        columnHelper.group({
            header: 'Rank',  // Main header
            columns: [
                columnHelper.accessor('overall_ranking', {
                    id: 'current_ranking',
                    header: () => (
                        <Text
                            justifyContent="center"
                            align="center"
                            fontSize={{ sm: '10px', lg: '12px' }}
                            color="gray.400"
                        >
                            {moment().subtract(1, 'months').format('MMM YYYY')}
                        </Text>
                    ),
                    cell: (info) => (
                        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                            <Text color={textColor} fontSize="sm" fontWeight="700">
                                {info.getValue() === '10000000' ? 'N/A' : info.row.index + 1}
                            </Text>
                        </div>
                    ),
                }),
                columnHelper.accessor('prev_month_overall_ranking', {
                    id: 'prev_month_ranking',
                    header: () => (
                        <Text
                            justifyContent="center"
                            align="center"
                            fontSize={{ sm: '10px', lg: '12px' }}
                            color="gray.400"
                        >
                            {moment().subtract(2, 'months').format('MMM YYYY')}
                        </Text>
                    ),
                    cell: (info) => {
                        const currentRank = info.row.index + 1;
                        return <RankTableCellContent currentRank={currentRank} prevRank={info.getValue()} />
                    }
                }),
                columnHelper.accessor('prev_year_overall_ranking', {
                    id: 'prev_year_ranking',
                    header: () => (
                        <Text
                            justifyContent="center"
                            align="center"
                            fontSize={{ sm: '10px', lg: '12px' }}
                            color="gray.400"
                        >
                            {moment().subtract(13, 'months').format('MMM YYYY')}
                        </Text>
                    ),
                    cell: (info) => {
                        const currentRank = info.row.index + 1;
                        return <RankTableCellContent currentRank={currentRank} prevRank={info.getValue()} />
                    },
                }),
            ],
        }),
        columnHelper.group({
            id: 'name',
            header: () => (
                <Text
                    justifyContent="space-between"
                    align="center"
                    fontSize={{ sm: '10px', lg: '12px' }}
                    color="gray.400"
                >
                    Name
                </Text>
            ),
            columns: [
                columnHelper.accessor('db_name', {
                    id: 'db_name',
                    header: null,
                    cell: (info) => (
                        <Flex align="center">
                            <Link href={`/dbms/${generateSlug(info.getValue())}`}>
                                <Text color={textColor} fontSize="sm" fontWeight="700" _hover={{ color: 'blue.600' }} cursor={'pointer'}>
                                    {info.getValue()}
                                </Text>
                            </Link>
                        </Flex>
                    ),
                }),
            ]
        }),
        columnHelper.group({
            id: 'db_model',
            header: () => (
                <Text
                    justifyContent="space-between"
                    align="center"
                    fontSize={{ sm: '10px', lg: '12px' }}
                    color="gray.400"
                >
                    Database Model
                </Text>
            ),
            columns: [
                columnHelper.accessor('primary_category', {
                    id: 'primary_category',
                    header: null,
                    cell: (info) => {
                        const primary_categories = info.getValue().map(category => category.shortname);
                        let text;
                        if (!primary_categories)
                            return <></>
                        if (isLoadingCategory || !categories) text = ''
                        else text = primary_categories.join(', ');
                        return (
                            <Flex align="center">
                                <Text color={textColor} fontSize="sm" fontWeight="700">
                                    {text}
                                    {primary_categories.length > 1 && ", Multi-Model"}
                                </Text>
                            </Flex>
                        )
                    },
                }),
            ],
        }),
        columnHelper.group({
            header: 'Score',
            columns: [
                columnHelper.accessor('overall_avg_score', {
                    id: 'overall_avg_score',
                    header: () => (
                        <Text
                            justifyContent="space-between"
                            align="center"
                            fontSize={{ sm: '10px', lg: '12px' }}
                            color="gray.400"
                        >
                            {moment().subtract(1, 'months').format('MMM YYYY')}
                        </Text>
                    ),
                    cell: (info) => (
                        <Text color={textColor} fontSize="sm" fontWeight="700">
                            {info.getValue() === '10000000' ? 'N/A' : Number(info.getValue()).toFixed(2)}
                        </Text>
                    )
                }),
                columnHelper.accessor('prev_month_overall_avg_score', {
                    id: 'prev_month_overall_avg_score',
                    header: () => (
                        <Text
                            justifyContent="space-between"
                            align="center"
                            fontSize={{ sm: '10px', lg: '12px' }}
                            color="gray.400"
                        >
                            {moment().subtract(2, 'months').format('MMM YYYY')}
                        </Text>
                    ),
                    cell: (info) => {
                        const overall_avg_score = info.row.original.overall_avg_score
                        return <ScoreTableCellContent currentScore={overall_avg_score} prevScore={info.getValue()} />
                    }
                }),
                columnHelper.accessor('prev_year_overall_avg_score', {
                    id: 'prev_year_overall_avg_score',
                    header: () => (
                        <Text
                            justifyContent="space-between"
                            align="center"
                            fontSize={{ sm: '10px', lg: '12px' }}
                            color="gray.400"
                        >
                            {moment().subtract(13, 'months').format('MMM YYYY')}
                        </Text>
                    ),
                    cell: (info) => {
                        const overall_avg_score = info.row.original.overall_avg_score
                        return <ScoreTableCellContent currentScore={overall_avg_score} prevScore={info.getValue()} />
                    }
                }),
            ]
        }),
    ];

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        debugTable: true,
    });

    const rowModel = table.getRowModel()

    return (
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
                {
                    (vendors && vendors.length === 0) ?
                        <Tr>
                            <Td colSpan={100}>
                                <Stack gap="6">
                                    <Skeleton height={"50px"} borderRadius={"12px"} />
                                    <Skeleton height={"50px"} borderRadius={"12px"} />
                                    <Skeleton height={"50px"} borderRadius={"12px"} />
                                    <Skeleton height={"50px"} borderRadius={"12px"} />
                                    <Skeleton height={"50px"} borderRadius={"12px"} />
                                    <Skeleton height={"50px"} borderRadius={"12px"} />
                                    <Skeleton height={"50px"} borderRadius={"12px"} />
                                    <Skeleton height={"50px"} borderRadius={"12px"} />
                                    <Skeleton height={"50px"} borderRadius={"12px"} />
                                </Stack>
                            </Td>
                        </Tr> :
                        (rowModel && rowModel.rows.length !== 0) ?
                            rowModel
                                .rows
                                .map((row) => {
                                    return (
                                        <Tr key={row.id}>
                                            {row.getVisibleCells().map((cell) => {
                                                return (
                                                    <Td
                                                        key={cell.id}
                                                        fontSize={{ sm: '14px' }}
                                                        minW={{ sm: '70px', md: '70px', lg: 'auto' }}
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
                                        colSpan={8}
                                    >
                                        <Text
                                            color={textColor}
                                            mb="4px"
                                            align={"center"}
                                            fontWeight="700"
                                            lineHeight="100%"
                                        >
                                            No Databases
                                        </Text>
                                    </Td>
                                </Tr>
                            )}
            </Tbody>
        </Table>
    )
}