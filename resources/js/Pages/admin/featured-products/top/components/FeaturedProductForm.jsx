import { useState, useEffect } from 'react'
import {
    Button,
    FormControl,
    FormLabel,
    Text,
    Box,
    Switch,
    useToast,
    useColorModeValue
} from '@chakra-ui/react'
import { useQueryClient, useMutation } from 'react-query';
import { createFeaturedProduct, updateFeaturedProduct } from '../../requests/use-request';
import { CustomInput } from '@/components/form/CustomInput';

export default function FeaturedProductForm({ featuredProduct, setOpenedPage }) {
    const queryClient = useQueryClient();
    const toast = useToast();
    const textColor = useColorModeValue("navy.400", "white");
    const brandStars = useColorModeValue("brand.500", "brand.400");

    const {
        id,
        title,
        link,
        published,
    } = featuredProduct;

    const [form, setForm] = useState({
        id,
        title,
        link,
        published,
        banner_file: null,
    })

    const createFeaturedProductMutation = useMutation(createFeaturedProduct, {
        onSuccess: () => {
            queryClient.invalidateQueries('top_featured_products');
            setOpenedPage(0)
            toast({
                title: "Create new featured product successfully",
                position: 'top-right',
                status: "success",
                insert: "top",
                duration: 5000,
                isClosable: true
            })
        },
        onError: (error) => {
            const errors = error.response.data.errors ? error.response.data.errors : {error: error.response.data.error};
            const key = errors[Object.keys(errors)[0]];
            toast({
                title: "Failed to create featured product",
                description: key,
                position: 'top-right',
                status: "error",
                insert: "top",
                duration: 5000,
                isClosable: true
            })
        }
    })

    const updateFeaturedProductMutation = useMutation(updateFeaturedProduct, {
        onSuccess: () => {
            queryClient.invalidateQueries('top_featured_products');
            setOpenedPage(0)
            toast({
                title: "Update featured product successfully",
                position: 'top-right',
                status: "success",
                insert: "top",
                duration: 5000,
                isClosable: true
            })
        },
        onError: (error) => {
            const errors = error.response.data.errors ? error.response.data.errors : {error: error.response.data.error};
            const key = errors[Object.keys(errors)[0]];
            toast({
                title: "Failed to update featured product successfully",
                description: key,
                position: 'top-right',
                status: "error",
                insert: "top",
                duration: 5000,
                isClosable: true
            })
        }
    })

    const handleFeaturedProduct = () => {
        const formData = new FormData();
        formData.append('id', form.id);
        formData.append('title', form.title);
        formData.append('link', form.link);
        formData.append('published', form.published);
        if (form.banner_file) formData.append('banner_file', form.banner_file);
        if (!form.id) createFeaturedProductMutation.mutate({ featuredProduct: formData, type: 'top' });
        else updateFeaturedProductMutation.mutate({ id: featuredProduct.id, featuredProduct: formData });
    }

    const handleChangeForm = (e) => {
        setForm(prevState => ({ ...prevState, [e.target.name]: e.target.value }));
    }

    useEffect(() => {
        setForm(prevState => ({
            ...prevState,
            id,
            title,
            link,
            published
        }));
    }, [featuredProduct])

    return (
        <Box p={"20px"}>
            <Text mb={"32px"} fontSize={22}>{!featuredProduct.id ? "Create" : "Update"} Featured Product</Text>
            <FormControl>
                <CustomInput title="Title" name="title" value={form.title} handleChangeForm={handleChangeForm} textColor={textColor} brandStars={brandStars} />
                <CustomInput title="Website Link" name="link" value={form.link} handleChangeForm={handleChangeForm} textColor={textColor} brandStars={brandStars} />
                <FormControl display='flex' alignItems='center' mb={'24px'}>
                    <FormLabel
                        display='flex'
                        ms='4px'
                        mb={0}
                        fontSize='sm'
                        fontWeight='500'
                        color={textColor}
                    >
                        Published
                    </FormLabel>
                    <Switch
                        size={'lg'}
                        colorScheme={"brand"}
                        isChecked={form.published === 1}
                        onChange={() => {
                            setForm(prevState => ({
                                ...prevState,
                                published: 1 - form.published
                            }))
                        }}
                    />
                </FormControl>

            </FormControl>
            <Button variant={"brand"} mt={3} mr={3} onClick={handleFeaturedProduct}>
                Save
            </Button>
            <Button mt={3} onClick={() => setOpenedPage(0)}>Cancel</Button>
        </Box>
    )
}