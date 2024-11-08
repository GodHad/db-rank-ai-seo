import {
  Flex,
  Box,
  Image,
  Tag,
  Heading,
  Text,
  SimpleGrid,
  useColorModeValue,
  Avatar,
} from '@chakra-ui/react';
import { useQuery } from 'react-query';
import moment from 'moment';
import { ArrowRightIcon } from "@chakra-ui/icons";
import Card from '@/components/card/Card';
import { getRecentlyBlogs } from '../requests/use-request';
import {
  Skeleton,
} from "@chakra-ui/skeleton"
import { Link } from '@inertiajs/react';

function generateSlug(title) {
  return title
    .toLowerCase()
    .trim()
    .replace(/[\s\W-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export default () => {
  const textColor = useColorModeValue('secondaryGray.900', 'white');
  const blogCardBg = useColorModeValue("gray.200", "navy.900");
  const { data: blogs, isLoadingBlog } = useQuery('blogs', getRecentlyBlogs, { staleTime: 300000 });
  return (
    <Box
      flexDirection="column"
      w="100%"
      px="10px"
    >
      <Flex px="25px" mb="8px" justifyContent="space-between" align="center">
        <Text
          color={textColor}
          fontSize={{ md: "22px", "2sm": '18px', base: '16px' }}
          mb="4px"
          fontWeight="700"
          lineHeight="100%"
        >
          Recently Blogs
        </Text>
      </Flex>
      <SimpleGrid columns={{ base: 1, lg: 3 }} gap='20px' mb='20px' justifyContent={"center"}>
        {
          (!blogs || isLoadingBlog) ?
            <>
              <Box maxW="xs" display="flex" gap={8} justifyContent={'space-between'}>
                <Skeleton width={'400px'} height="460px" borderRadius={"21px"} />
              </Box>
              <Box maxW="xs" display="flex" gap={8} justifyContent={'space-between'}>
                <Skeleton width={'400px'} height="460px" borderRadius={"21px"} />
              </Box>
              <Box maxW="xs" display="flex" gap={8} justifyContent={'space-between'}>
                <Skeleton width={'400px'} height="460px" borderRadius={"21px"} />
              </Box>
            </>
            :
            blogs.data.length > 0 ? blogs.data.map((blog, index) => (
              !blog ? <></> :
                <Link href={`/blog/${generateSlug(blog.title)}`} key={index}>
                  <Card h={'100%'} display="flex" flexDir={"column"} justifyContent={"space-between"} mb={"10px"} bg={blogCardBg}>
                    <Box>
                      <Image
                        mb={5}
                        h="200px"
                        w="100%"
                        borderRadius="xl"
                        objectFit="cover"
                        objectPosition="center"
                        transition="transform 0.2s ease-out"
                        _hover={{ transform: "scale(1.02)" }}
                        src={`storage/${blog.featured_images[0].url}?w=1400&auto=compression,format`}
                        alt={blog.title}
                      />
                      <Heading
                        as="h2"
                        pb={3}
                        fontSize={{ md: "21px", '2sm': '19px', base: '16px' }}
                        fontWeight={700}
                        color="gray.800"
                        _dark={{ color: "gray.200" }}
                      >
                        {blog.title}
                      </Heading>
                    </Box>

                    <Box>
                      <Flex direction={"column"} justify="space-between" mb={4} gap={2}>
                        <Flex align="center" color="gray.500" _dark={{ color: "gray.400" }} fontSize={{ md: "14px", '2sm': '12px', base: '10px' }} gap={2}>
                          <Avatar
                            _hover={{ cursor: 'pointer' }}
                            color="white"
                            name={blog.user.name + ' ' + blog.user.surname}
                            bg="#11047A"
                            size={{ md: "14px", '2sm': '12px', base: '10px' }}
                            w="40px"
                            h="40px"
                          />
                          By <Text color="blue.500" _dark={{ color: "green.200" }} fontSize={{ md: "14px", '2sm': '12px', base: '10px' }}>{` ${blog.user.name} ${blog.user.surname ? blog.user.surname : ''}`}</Text> on {moment(blog.created_at).format('MMM D, YYYY')}
                        </Flex>
                        <Flex
                          justify={'start'}
                          gap={1}
                        >
                          {blog.tags &&
                            blog.tags.slice(0, 2).map((category) => (
                              <Tag key={category.name} fontSize={{ md: "14px", '2sm': '12px', base: '10px' }} color="white" bgColor="blue.500" _dark={{ bgColor: "green.500" }}>{category.name}</Tag>
                            ))}
                          {blog.tags.length > 2 && <Text>{`+${blog.tags.length - 2}`} more</Text>}
                        </Flex>
                      </Flex>

                      <Flex justify="space-between" fontWeight="medium" color="blue.500" _dark={{ color: "green.200" }}>
                        <Flex align="center">
                          <Text fontSize={{ md: "14px", '2sm': '12px', base: '10px' }}>Read article</Text>
                          <ArrowRightIcon w={{ md: 4, '2sm': 3, base: 2 }} h={4} mx={2} />
                        </Flex>
                      </Flex>
                    </Box>
                  </Card>
                </Link>
            )) : (
              <Text
                color={textColor}
                mb="4px"
                align={"center"}
                fontWeight="700"
                lineHeight="100%"
              >
                No recently blogs
              </Text>
            )}
      </SimpleGrid>
    </Box>
  )
}