import React from 'react';
import { Box, Flex, Breadcrumb, BreadcrumbItem, useColorModeValue, BreadcrumbLink } from '@chakra-ui/react';
import Card from "@/components/card/Card";
import { Link } from '@inertiajs/react';
import { Helmet } from 'react-helmet';
import { initialBlog } from '@/Pages/admin/blog/components/blogs';
import BlogForm from '@/Pages/admin/blog/components/blogs/components/BlogForm';
import UserLayout from '@/layouts/user';

export default () => {

    let secondaryText = useColorModeValue('gray.700', 'white');

    return (
        <UserLayout>
            <Helmet>
                <title>DBMS Rank AI | Create Blog</title>
            </Helmet>
            <Card
                w="100%"
                px="0px"
                minH="calc(100vh - 150px)"
            >
                <Flex justifyContent={"flex-end"}>
                    <Box width={{ base: '100%' }} px="25px">
                        <Breadcrumb>
                            <BreadcrumbItem color={secondaryText} fontSize='sm' mb='5px'>
                                <Link href='/'>
                                    Home
                                </Link>
                            </BreadcrumbItem>

                            <BreadcrumbItem color={secondaryText} fontSize='sm' mb='5px'>
                                <Link href='/blog'>
                                    Blog
                                </Link>
                            </BreadcrumbItem>

                            <BreadcrumbItem color={secondaryText} fontSize='sm' mb='5px'>
                                <BreadcrumbLink>
                                    Blog
                                </BreadcrumbLink>
                            </BreadcrumbItem>
                        </Breadcrumb>
                        <BlogForm blog={initialBlog} setOpenedPage={() => {if (typeof window !== "undefined") {window.location.href = '/blog'}}} />
                    </Box>
                </Flex>
            </Card >
        </UserLayout>
    )
};
