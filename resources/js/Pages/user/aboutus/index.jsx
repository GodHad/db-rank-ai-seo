import { useEffect, useRef } from 'react'
import {
    Box,
    Breadcrumb,
    BreadcrumbItem,
    Text as ChakraText,
    useColorModeValue
} from '@chakra-ui/react'
import Card from '@/components/card/Card';
import { Link as ReactLink } from '@inertiajs/react';
import UserLayout from '@/layouts/user';
import SeoHeader from '../components/SeoHeader';
import CustomCKEditor from '../components/CustomCKEditor';

export default function Aboutus({ content }) {

    const textColor = useColorModeValue('secondaryGray.900', 'white');
    let secondaryText = useColorModeValue('gray.700', 'white');

    return (
        <UserLayout>
            <SeoHeader content={content} title={'About Us'} />
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
                            <ReactLink href='/aboutus'>
                                About us
                            </ReactLink>
                        </BreadcrumbItem>
                    </Breadcrumb>
                    <ChakraText
                        as={'h1'}
                        color={textColor}
                        fontSize="22px"
                        mb="30px"
                        fontWeight="700"
                        lineHeight="100%"
                    >
                        About us
                    </ChakraText>
                    {content && content.content && <CustomCKEditor content={content.content} />}
                </Box>
            </Card>
        </UserLayout>
    )
}
