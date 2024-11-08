import React, { Suspense, lazy, useContext, useEffect, useRef, useState } from 'react';
import {
    Box,
    Avatar,
    Text as ChakraText,
    Flex,
    Breadcrumb,
    BreadcrumbItem,
    Image as ChakraImage,
    Tag,
    IconButton,
    useColorModeValue
} from '@chakra-ui/react';
import Card from "@/components/card/Card";
import moment from 'moment';
import { APP_URL, generateSlug } from '@/variables/statics';
import { UserContext } from '@/contexts/UserContext';
import { MdEdit } from 'react-icons/md';
const BlogForm = lazy(() => import('@/Pages/admin/blog/components/blogs/components/BlogForm'))
import UserLayout from '@/layouts/user';
import { Link as ReactLink } from '@inertiajs/react';
import CustomCKEditor from '../../components/CustomCKEditor';
import SeoHeader from '../../components/SeoHeader';

export default ({ blog, route }) => {
    let secondaryText = useColorModeValue('gray.700', 'white');

    const { user } = useContext(UserContext);

    const editorRef = useRef();

    useEffect(() => {
        if (editorRef.current) {
            editorRef.current.setData(blog?.content || '');
        }
    }, [blog]);

    return (
        <UserLayout>
            {blog && (
                <SeoHeader content={blog} title={`Blog | ${blog.title}`} />
            )}
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
                            <ReactLink href='/blog'>
                                Blog
                            </ReactLink>
                        </BreadcrumbItem>
                        {blog && (
                            <BreadcrumbItem color={secondaryText} fontSize='sm' mb='5px'>
                                <ChakraText isTruncated maxW={{ '2sm': '200px', md: 'full', base: '120px' }}>{blog.title}</ChakraText>
                            </BreadcrumbItem>
                        )}
                    </Breadcrumb>
                    {route === 'blog-show' &&
                        <Box p={"20px"}>
                            <ChakraImage
                                mb={5}
                                w="100%"
                                h={{ md: '300px', base: '250px' }}
                                borderRadius="xl"
                                objectFit="cover"
                                objectPosition="center"
                                src={`${APP_URL}storage/${blog.featured_images[0].url}?w=1400&auhref=compression,format`}
                                alt={blog.title}
                            />
                            <ChakraText mb={"32px"} fontSize={{ md: '30px', '2sm': '26px', base: '24px' }} fontWeight={700}>
                                {blog.title}
                                {(user && (user.admin || (user.author && user.id === blog.user_id))) ? (
                                    <ReactLink href={`/blog/edit/${generateSlug(blog.title)}`}>
                                        <IconButton
                                            aria-label="Edit"
                                            icon={<MdEdit />}
                                            colorScheme="blue"
                                            variant="outline"
                                            isRound
                                            size="md"
                                            ml={2}
                                            onClick={() => setEditing(true)}
                                        />
                                    </ReactLink>
                                ) : <></>}
                            </ChakraText>
                            <Box>
                                <Flex direction={{ base: "column", md: "row" }} justify="space-between" alignItems={'center'} mb={4} gap={2}>
                                    <Flex align="center" color="gray.500" _dark={{ color: "gray.400" }} gap={2}>
                                        <Avatar
                                            _hover={{ cursor: 'pointer' }}
                                            color="white"
                                            name={blog.user.name + ' ' + blog.user.surname}
                                            bg="#11047A"
                                            size="sm"
                                            w="40px"
                                            h="40px"
                                        />
                                        By <ChakraText color="blue.500" _dark={{ color: "green.200" }}>{` ${blog.user.name} ${blog.user.surname ? blog.user.surname : ''}`}</ChakraText> on {moment(blog.created_at).format('MMM D, YYYY')}
                                    </Flex>
                                    <Flex
                                        justify={'start'}
                                        gap={1}
                                    >
                                        {blog.tags &&
                                            blog.tags.slice(0, 2).map((category) => (
                                                <Tag key={category.name} color="white" bgColor="blue.500" _dark={{ bgColor: "green.500" }}>{category.name}</Tag>
                                            ))}
                                        {blog.tags.length > 2 && <ChakraText>{`+${blog.tags.length - 2}`} more</ChakraText>}
                                    </Flex>
                                </Flex>
                            </Box>
                            {blog && blog.content && <CustomCKEditor content={blog.content} />}
                        </Box>
                    }
                    {route === 'blog-edit' &&
                        <BlogForm blog={{ ...blog, tags: blog.tags.map(tag => tag.id), categories: blog.categories.map(category => category.id) }} setOpenedPage={() => { window.location.href = '/blog' }} />
                    }
                </Box>
            </Card >
        </UserLayout >
    )
};
