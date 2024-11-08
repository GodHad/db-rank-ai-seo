import {
    Box,
    Breadcrumb,
    BreadcrumbItem,
    Text,
    Avatar,
    VStack,
    Grid,
    FormControl,
    FormLabel,
    Input,
    Heading,
    Button,
    useColorModeValue,
    useToast
} from "@chakra-ui/react";
import React, { useContext, useState } from "react";
import { Helmet } from "react-helmet";
import { Link } from "@inertiajs/react";
import Card from "@/components/card/Card";
import { UserContext } from "@/contexts/UserContext";
import { updateVendor } from "@/Pages/admin/users/requests/use-request";
import { useQueryClient, useMutation } from "react-query";
import UserLayout from '@/layouts/user';

export default function Overview() {
    const toast = useToast()
    const queryClient = useQueryClient();
    const textColor = useColorModeValue('secondaryGray.900', 'white');
    const secondaryText = useColorModeValue('gray.700', 'white');
    const borderColor = useColorModeValue('gray.200', 'whiteAlpha.100');

    const { user } = useContext(UserContext);

    const [form, setForm] = useState({
        name: '',
        surname: '',
        email: '',
        phone_number: '',
        job_title: '',
        company: '',
        password: '',
    });

    const handleChange = (e) => {
        setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
    }

    const updateVendorMutation = useMutation(updateVendor, {
        onSuccess: () => {
            queryClient.invalidateQueries('getUser');
            toast({
                title: "Update vendor successfully",
                position: 'top-right',
                status: "success",
                insert: "top",
                duration: 5000,
                isClosable: true
            })
        },
        onError: (error) => {
            const errors = error.response.data.errors ? error.response.data.errors : { error: error.response.data.error };
            const key = errors[Object.keys(errors)[0]];
            toast({
                title: "Failed to update vendor",
                description: key,
                position: 'top-right',
                status: "error",
                insert: "top",
                duration: 5000,
                isClosable: true
            })
        }
    })

    const handleUpdate = () => {
        updateVendorMutation.mutate({
            vendor: {
                id: user.id,
                name: form.name || user.name,
                surname: form.surname || user.surname,
                email: form.email || user.email,
                phone_number: form.phone_number || user.phone_number,
                job_title: form.job_title || user.job_title,
                company: form.company || user.company,
                password: form.password,
            }
        });
    }

    return (
        <UserLayout>
            <Helmet>
                <title>DBMS Rank AI | Profile</title>
            </Helmet>
            <Card
                w="100%"
                px="0px"
                minH="calc(100vh - 150px)"
            >
                <Box width={'100%'} px="25px">
                    <Breadcrumb>
                        <BreadcrumbItem color={secondaryText} fontSize='sm' mb='5px'>
                            <Link href='/'>
                                Home
                            </Link>
                        </BreadcrumbItem>

                        <BreadcrumbItem color={secondaryText} fontSize='sm' mb='5px'>
                            <Link href='/profile'>
                                Profile
                            </Link>
                        </BreadcrumbItem>
                    </Breadcrumb>
                    <Text
                        color={textColor}
                        fontSize="22px"
                        mb="30px"
                        fontWeight="700"
                        lineHeight="100%"
                    >
                        Profile
                    </Text>
                    <Box display={{ base: 'block', lg: 'flex' }}>
                        <Box
                            as="aside"
                            flex={1}
                            mr={{ base: 0, md: 5 }}
                            mb={{ base: 5, md: 0 }}
                            rounded="md"
                            borderWidth={1}
                            borderColor={borderColor}
                        >
                            <VStack spacing={3} py={5} borderBottomWidth={1} borderColor={borderColor}>
                                <Avatar
                                    bg="#11047A"
                                    size="2xl"
                                    color={'white'}
                                    name={`${user.name} ${user.surname}`}
                                    cursor="pointer"
                                />
                                <VStack spacing={1}>
                                    <Heading as="h3" fontSize="xl" color="brand.dark">
                                        {`${user.name} ${user.surname}`}
                                    </Heading>
                                    <Text color="brand.gray" fontSize="sm">
                                        {user.company}
                                    </Text>
                                </VStack>
                            </VStack>
                            <VStack as="ul" spacing={0} listStyleType="none">
                                <Box
                                    as="li"
                                    w="full"
                                    py={3}
                                    px={5}
                                    d="flex"
                                    alignItems="center"
                                    justifyContent="space-between"
                                    borderBottomWidth={1}
                                    borderColor={borderColor}
                                >
                                    <Text color="brand.dark">Email</Text>
                                    <Text fontWeight="bold">
                                        {user.email}
                                    </Text>
                                </Box>
                                <Box
                                    as="li"
                                    w="full"
                                    py={3}
                                    px={5}
                                    d="flex"
                                    alignItems="center"
                                    justifyContent="space-between"
                                    borderBottomWidth={1}
                                    borderColor={borderColor}
                                >
                                    <Text color="brand.dark">Phone Number</Text>
                                    <Text fontWeight="bold">
                                        {user.phone_number}
                                    </Text>
                                </Box>
                                <Box
                                    as="li"
                                    w="full"
                                    py={3}
                                    px={5}
                                    d="flex"
                                    alignItems="center"
                                    justifyContent="space-between"
                                    borderBottomWidth={1}
                                    borderColor={borderColor}
                                >
                                    <Text color="brand.dark">Job Title</Text>
                                    <Text fontWeight="bold">
                                        {user.job_title}
                                    </Text>
                                </Box>
                            </VStack>
                        </Box>
                        <Box
                            as="main"
                            flex={3}
                            d="flex"
                            flexDir="column"
                            justifyContent="space-between"
                            pt={5}
                            rounded="md"
                            px={3}
                            borderWidth={1}
                            borderColor={borderColor}
                        >
                            <Grid
                                templateColumns={{ base: 'repeat(1, 1fr)', md: 'repeat(2, 1fr)' }}
                                gap={6}
                            >
                                <FormControl id="firstName">
                                    <FormLabel>First Name</FormLabel>
                                    <Input
                                        type="text"
                                        name={'name'}
                                        value={form.name}
                                        placeholder={user.name}
                                        color={textColor}
                                        focusBorderColor={'blue.600'}
                                        onChange={handleChange}
                                    />
                                </FormControl>
                                <FormControl id="lastName">
                                    <FormLabel>Last Name</FormLabel>
                                    <Input
                                        type="text"
                                        name="surname"
                                        value={form.surname}
                                        placeholder={user.surname}
                                        color={textColor}
                                        focusBorderColor={'blue.600'}
                                        onChange={handleChange}
                                    />
                                </FormControl>
                                <FormControl id="phoneNumber">
                                    <FormLabel>Phone Number</FormLabel>
                                    <Input
                                        type="text"
                                        name="phone_number"
                                        value={form.phone_number}
                                        color={textColor}
                                        focusBorderColor={'blue.600'}
                                        placeholder={user.phone_number}
                                        onChange={handleChange}
                                    />
                                </FormControl>
                                <FormControl id="emailAddress">
                                    <FormLabel>Email Address</FormLabel>
                                    <Input
                                        type="email"
                                        name="email"
                                        value={form.email}
                                        placeholder={user.email}
                                        color={textColor}
                                        focusBorderColor={'blue.600'}
                                        onChange={handleChange}
                                    />
                                </FormControl>
                                <FormControl id="Company">
                                    <FormLabel>Company</FormLabel>
                                    <Input
                                        type="text"
                                        name="company"
                                        value={form.company}
                                        color={textColor}
                                        focusBorderColor={'blue.600'}
                                        placeholder={user.company}
                                        onChange={handleChange}
                                    />
                                </FormControl>
                                <FormControl id="jobTitle">
                                    <FormLabel>Job Title</FormLabel>
                                    <Input
                                        type="text"
                                        name="job_title"
                                        value={form.job_title}
                                        color={textColor}
                                        focusBorderColor={'blue.600'}
                                        placeholder={user.job_title}
                                        onChange={handleChange}
                                    />
                                </FormControl>
                                <FormControl id="password">
                                    <FormLabel>Password</FormLabel>
                                    <Input
                                        name="password"
                                        value={form.password}
                                        focusBorderColor={'blue.600'}
                                        type="password"
                                        onChange={handleChange}
                                    />
                                </FormControl>
                            </Grid>
                            <Box mt={5} py={5} borderTopWidth={1} borderColor={borderColor}>
                                <Button variant={'brand'} onClick={handleUpdate}>Update</Button>
                            </Box>
                        </Box>
                    </Box>
                </Box>
            </Card >
        </UserLayout>
    )
}
