import {
    Text,
    Box,
    useColorModeValue,
    Stack,
    Breadcrumb,
    BreadcrumbItem
} from '@chakra-ui/react'
import { Link as ReactLink } from '@inertiajs/react';
import { Skeleton, SkeletonText } from '@chakra-ui/skeleton';
import Card from "@/components/card/Card";
import UserLayout from '@/layouts/user';
import SeoHeader from '../../components/SeoHeader';
import CustomCKEditor from '../../components/CustomCKEditor';

export default function EncyclopediaForm({ encyclopedia }) {
    let secondaryText = useColorModeValue('gray.700', 'white');
    return (
        <UserLayout>
            <SeoHeader content={encyclopedia} title={`Encyclopedia | ${encyclopedia.title}`} />
            <Card
                w="100%"
                px="0px"
                minH="calc(100vh - 150px)"
            >
                <Box width={'100%'} px="25px">
                    <Breadcrumb>
                        <BreadcrumbItem color={secondaryText} fontSize='sm' mb='5px'>
                            <ReactLink href='/'>
                                Home
                            </ReactLink>
                        </BreadcrumbItem>

                        <BreadcrumbItem color={secondaryText} fontSize='sm' mb='5px'>
                            <ReactLink href='/encyclopedia'>
                                Encyclopedia
                            </ReactLink>
                        </BreadcrumbItem>
                        {encyclopedia && (
                            <BreadcrumbItem color={secondaryText} fontSize='sm' mb='5px'>
                                <Text>{encyclopedia.title}</Text>
                            </BreadcrumbItem>
                        )}
                    </Breadcrumb>
                    {encyclopedia ?
                        <>
                            <Text mb={"32px"} fontSize={22} fontWeight={600}>{encyclopedia.title}</Text>
                            <CustomCKEditor content={encyclopedia.content} />
                        </>
                        :
                        <Stack spacing={5} gap={5}>
                            <Skeleton height={'30px'} width={'full'} borderRadius={'30px'} />
                            <SkeletonText height={'30px'} width={'full'} />
                            <SkeletonText height={'30px'} width={'full'} />
                            <SkeletonText height={'30px'} width={'full'} />
                            <SkeletonText height={'30px'} width={'full'} />
                            <SkeletonText height={'30px'} width={'full'} />
                            <SkeletonText height={'30px'} width={'full'} />
                            <SkeletonText height={'30px'} width={'full'} />
                        </Stack>
                    }
                </Box>
            </Card>
        </UserLayout>
    )
}
