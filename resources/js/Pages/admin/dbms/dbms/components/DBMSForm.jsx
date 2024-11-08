import { useState, useRef, useEffect } from 'react'
import {
    Button,
    FormControl,
    Text,
    Box,
    FormLabel,
    Icon,
    Input,
    Image as ChakraImage,
    Textarea,
    useToast,
    useColorModeValue
} from '@chakra-ui/react'
import { MdUploadFile } from 'react-icons/md';
import { useQueryClient, useMutation } from 'react-query';
import { createVendor, updateVendor } from '../requests/use-request';
import { CustomMultiSelect } from '@/components/form/CustomMultiSelect';
import { CustomInput } from '@/components/form/CustomInput';
import { APP_URL } from '@/variables/statics';
import { initialVendor } from '..';

export default function VendorForm({ vendor, categories, setOpenedPage }) {
    const toast = useToast();
    const queryClient = useQueryClient();
    const bgColor = useColorModeValue('white', 'navy.800')

    const {
        id,
        company_name,
        description,
        primary_category,
        secondary_category,
        contact_info,
        website_url,
        technical_doc,
        developer,
        initial_release,
        current_release,
        license,
        cloud_based_only,
        dbaas_offerings,
        implementation_lang,
        server_os,
        data_scheme,
        typing,
        xml_support,
        secondary_indexes,
        sql,
        apis_access_method,
        supported_programming_lang,
        server_side_scripts,
        triggers,
        partitioning_methods,
        replication_methods,
        mapreduce,
        consistency_concepts,
        foreign_keys,
        trasaction_concepts,
        concurrency,
        durability,
        in_memory_capabilities,
        user_concepts,
        db_name,
        logo_url,
        banner,
        meta_title,
        meta_description,
        og_graph_image,
        twitter_graph_image,
        extra_content
    } = vendor;

    const textColor = useColorModeValue("navy.700", "white");
    const brandStars = useColorModeValue("brand.500", "brand.400");

    const [form, setForm] = useState({
        id,
        company_name,
        description,
        primary_category: primary_category.map(category => category.id),
        secondary_category: secondary_category.map(category => category.id),
        contact_info,
        website_url,
        technical_doc,
        developer,
        initial_release,
        current_release,
        license,
        cloud_based_only,
        dbaas_offerings,
        implementation_lang,
        server_os,
        data_scheme,
        typing,
        xml_support,
        secondary_indexes,
        sql,
        apis_access_method,
        supported_programming_lang,
        server_side_scripts,
        triggers,
        partitioning_methods,
        replication_methods,
        mapreduce,
        consistency_concepts,
        foreign_keys,
        trasaction_concepts,
        concurrency,
        durability,
        in_memory_capabilities,
        user_concepts,
        db_name,
        logo_url,
        banner,
        logo_file: null,
        banner_file: null,
        meta_title,
        meta_description,
        og_graph_image,
        twitter_graph_image,
        og_graph_file: null,
        twitter_graph_file: null,
        extra_content
    })

    useEffect(() => {
        setForm({
            id,
            company_name,
            description,
            primary_category: primary_category.map(category => category.id),
            secondary_category: secondary_category.map(category => category.id),
            contact_info,
            website_url,
            technical_doc,
            developer,
            initial_release,
            current_release,
            license,
            cloud_based_only,
            dbaas_offerings,
            implementation_lang,
            server_os,
            data_scheme,
            typing,
            xml_support,
            secondary_indexes,
            sql,
            apis_access_method,
            supported_programming_lang,
            server_side_scripts,
            triggers,
            partitioning_methods,
            replication_methods,
            mapreduce,
            consistency_concepts,
            foreign_keys,
            trasaction_concepts,
            concurrency,
            durability,
            in_memory_capabilities,
            user_concepts,
            db_name,
            logo_url,
            banner,
            logo_file: null,
            banner_file: null,
            meta_title,
            meta_description,
            og_graph_image,
            twitter_graph_image,
            og_graph_file: null,
            twitter_graph_file: null,
            extra_content
        });
    }, [vendor])

    const createVendorMutation = useMutation(createVendor, {
        onSuccess: (data) => {
            queryClient.invalidateQueries('vendors');
            setOpenedPage(0)
            toast({
                title: "Create vendor successfully",
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
                title: "Failed to create vendor successfully",
                description: key,
                position: 'top-right',
                status: "error",
                insert: "top",
                duration: 5000,
                isClosable: true
            })
        }
    })

    const updateVendorMutation = useMutation(updateVendor, {
        onSuccess: (data) => {
            queryClient.invalidateQueries('vendors');
            setOpenedPage(0)
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
                title: "Failed to create vendor successfully",
                description: key,
                position: 'top-right',
                status: "error",
                insert: "top",
                duration: 5000,
                isClosable: true
            })
        }
    })
    const handleVendor = () => {
        const formData = new FormData();
        Object.keys(initialVendor).forEach(key => {
            if (form[key]) formData.append(key, form[key]);
        });
        formData.delete('primary_category');
        formData.delete('secondary_category');
        form.primary_category.forEach(element => {
            formData.append('primary_category[]', element)
        });
        form.secondary_category.forEach(element => {
            formData.append('secondary_category[]', element)
        })
        if (form.logo_file) formData.append('logo_file', form.logo_file);
        if (form.banner_file) formData.append('banner_file', form.banner_file);
        if (form.twitter_graph_image) formData.append('twitter_graph_image', form.twitter_graph_image);
        if (form.og_graph_image) formData.append('og_graph_image', form.og_graph_image);
        if (form.og_graph_file) formData.append('og_graph_file', form.og_graph_file);
        if (form.twitter_graph_file) formData.append('twitter_graph_file', form.twitter_graph_file);
        if (!form.id) createVendorMutation.mutate({ vendor: formData })
        else updateVendorMutation.mutate({ id: form.id, vendor: formData });
    }

    const handleChangeForm = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    }

    const handleChangeMultiSelect = (name, value) => {
        setForm({ ...form, [name]: value })
    }

    const [imagePreview, setImagePreview] = useState({
        logo_file: APP_URL + 'storage/' + logo_url,
        banner_file: APP_URL + 'storage/' + banner,
        og_graph_file: APP_URL + 'storage/' + og_graph_image,
        twitter_graph_file: APP_URL + 'storage/' + twitter_graph_image,
    });

    useEffect(() => {
        setImagePreview({
            logo_file: APP_URL + 'storage/' + logo_url,
            banner_file: APP_URL + 'storage/' + banner,
            og_graph_file: APP_URL + 'storage/' + og_graph_image,
            twitter_graph_file: APP_URL + 'storage/' + twitter_graph_image,
        })
    }, [logo_url, banner, og_graph_image, twitter_graph_image])

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        setForm(prevState => ({
            ...prevState,
            [event.target.name]: file
        }))
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(prevState => ({ ...prevState, [event.target.name]: reader.result }));
            };
            reader.readAsDataURL(file);
        }
    };

    const logoFileRef = useRef(null);
    const bannerFileRef = useRef(null);
    const ogGraphFileRef = useRef(null);
    const twitterGraphFileRef = useRef(null);

    const [Editor, setEditor] = useState(null);
    const [editorLoaded, setEditorLoaded] = useState(false);

    useEffect(() => {
        // Ensure this only runs in the browser
        if (typeof window !== "undefined") {
            // Dynamically import CKEditor and all plugins
            Promise.all([
                import('@ckeditor/ckeditor5-react').then(module => module.CKEditor),
                import('ckeditor5').then(ckModules => ({
                    ClassicEditor: ckModules.ClassicEditor,
                    Essentials: ckModules.Essentials,
                    Alignment: ckModules.Alignment,
                    Autoformat: ckModules.Autoformat,
                    BlockQuote: ckModules.BlockQuote,
                    Bold: ckModules.Bold,
                    CloudServices: ckModules.CloudServices,
                    Code: ckModules.Code,
                    CodeBlock: ckModules.CodeBlock,
                    Heading: ckModules.Heading,
                    HorizontalLine: ckModules.HorizontalLine,
                    Image: ckModules.Image,
                    ImageToolbar: ckModules.ImageToolbar,
                    ImageUpload: ckModules.ImageUpload,
                    Base64UploadAdapter: ckModules.Base64UploadAdapter,
                    Italic: ckModules.Italic,
                    Link: ckModules.Link,
                    List: ckModules.List,
                    Mention: ckModules.Mention,
                    Paragraph: ckModules.Paragraph,
                    MediaEmbed: ckModules.MediaEmbed,
                    SourceEditing: ckModules.SourceEditing,
                    Strikethrough: ckModules.Strikethrough,
                    Underline: ckModules.Underline,
                    Table: ckModules.Table,
                    TableToolbar: ckModules.TableToolbar,
                    TableColumnResize: ckModules.TableColumnResize,
                    TableProperties: ckModules.TableProperties,
                    TextTransformation: ckModules.TextTransformation,
                    TodoList: ckModules.TodoList,
                    ImageCaption: ckModules.ImageCaption,
                    ImageInsert: ckModules.ImageInsert,
                    ImageResize: ckModules.ImageResize,
                    ImageStyle: ckModules.ImageStyle,
                }))
            ]).then(([CKEditorComponent, ckModules]) => {
                setEditor(() => ({
                    CKEditor: CKEditorComponent,
                    ...ckModules,
                }));
                setEditorLoaded(true);
            });
        }
    }, []);

    return (
        <Box p={"20px"}>
            <Text mb={"32px"} fontSize={22}>{!vendor.id ? "Create" : "Update"} DBMS</Text>
            <FormControl>
                <FormControl display={'flex'} justifyContent={'space-between'} flexDir={{ base: 'column', md: 'row' }} gap={{ md: 6, base: 2 }} alignItems={'center'}>
                    <CustomInput title="Company Name" name="company_name" value={form.company_name || ''} handleChangeForm={handleChangeForm} textColor={textColor} brandStars={brandStars} />
                    <CustomInput title="Database Name" name="db_name" value={form.db_name || ''} handleChangeForm={handleChangeForm} textColor={textColor} brandStars={brandStars} />
                </FormControl>
                <FormControl display={'flex'} justifyContent={'space-between'} flexDir={{ base: 'column', md: 'row' }} gap={{ md: 6, base: 2 }} alignItems={'center'}>
                    <CustomMultiSelect title="Primary Categories" name="primary_category" value={form.primary_category} handleChangeMultiSelect={handleChangeMultiSelect} options={categories.map(category => ({ id: category.id, value: category.title || '', label: category.title }))} />
                    <CustomMultiSelect title="Secondary Categories" name="secondary_category" value={form.secondary_category} handleChangeMultiSelect={handleChangeMultiSelect} options={categories.map(category => ({ id: category.id, value: category.title || '', label: category.title }))} />
                </FormControl>
                <FormControl display={'flex'} justifyContent={'space-between'} flexDir={{ base: 'column', md: 'row' }} gap={{ md: 6, base: 2 }} alignItems={'center'}>
                    <CustomInput type="url" title="Website URL" name="website_url" value={form.website_url || ''} handleChangeForm={handleChangeForm} textColor={textColor} brandStars={brandStars} />
                </FormControl>
                <FormControl mb={'24px'}>
                    <FormLabel
                        display='flex'
                        ms='4px'
                        fontSize='sm'
                        fontWeight='500'
                        color={textColor}
                        mb='8px'
                    >
                        Extra Content
                    </FormLabel>
                    {editorLoaded &&
                        <Editor.CKEditor
                            editor={Editor.ClassicEditor}
                            config={{
                                plugins: [
                                    Editor.ClassicEditor,
                                    Editor.Essentials,
                                    Editor.Alignment,
                                    Editor.Autoformat,
                                    Editor.BlockQuote,
                                    Editor.Bold,
                                    Editor.CloudServices,
                                    Editor.Code,
                                    Editor.CodeBlock,
                                    Editor.Heading,
                                    Editor.HorizontalLine,
                                    Editor.Image,
                                    Editor.ImageToolbar,
                                    Editor.ImageUpload,
                                    Editor.Base64UploadAdapter,
                                    Editor.Italic,
                                    Editor.Link,
                                    Editor.List,
                                    Editor.Mention,
                                    Editor.Paragraph,
                                    Editor.MediaEmbed,
                                    Editor.SourceEditing,
                                    Editor.Strikethrough,
                                    Editor.Underline,
                                    Editor.Table,
                                    Editor.TableToolbar,
                                    Editor.TableColumnResize,
                                    Editor.TableProperties,
                                    Editor.TextTransformation,
                                    Editor.TodoList,
                                    Editor.ImageCaption,
                                    Editor.ImageInsert,
                                    Editor.ImageResize,
                                    Editor.ImageStyle,
                                ],
                                toolbar: [
                                    'undo',
                                    'redo',
                                    '|',
                                    'heading',
                                    '|',
                                    'bold',
                                    'italic',
                                    'alignment',
                                    'strikethrough',
                                    'underline',
                                    'code',
                                    '|',
                                    'bulletedList',
                                    'numberedList',
                                    'todoList',
                                    '|',
                                    'link',
                                    'uploadImage',
                                    'mediaEmbed',
                                    'insertTable',
                                    'blockQuote',
                                    'codeBlock',
                                    'horizontalLine',
                                ],
                                alignment: {
                                    options: ['left', 'center', 'right', 'justify'] // Specify the alignment options
                                },
                                image: {
                                    resizeOptions: [
                                        {
                                            name: 'resizeImage:original',
                                            label: 'Default image width',
                                            value: null,
                                        },
                                        {
                                            name: 'resizeImage:50',
                                            label: '50% page width',
                                            value: '50',
                                        },
                                        {
                                            name: 'resizeImage:75',
                                            label: '75% page width',
                                            value: '75',
                                        },
                                    ],
                                    toolbar: [
                                        'imageTextAlternative',
                                        'toggleImageCaption',
                                        '|',
                                        'imageStyle:inline',
                                        'imageStyle:wrapText',
                                        'imageStyle:breakText',
                                        '|',
                                        'resizeImage',
                                    ],
                                    insert: {
                                        integrations: ['url'],
                                    },
                                },
                                table: {
                                    contentToolbar: ['tableColumn', 'tableRow', 'mergeTableCells', 'tableProperties'],
                                }
                            }}
                            data={form.extra_content}
                            onChange={(event, editor) => {
                                const data = editor.getData()
                                setForm(prev => ({ ...prev, extra_content: data }))
                            }}
                        />
                    }
                </FormControl>
                <FormControl display={'flex'} justifyContent={'space-between'} flexDir={{ base: 'column', md: 'row' }} gap={{ md: 6, base: 2 }} alignItems={'center'}>
                    <Box w={'full'}>
                        <FormLabel
                            display='flex'
                            ms='4px'
                            fontSize='sm'
                            fontWeight='500'
                            color={textColor}
                            mb='8px'
                        >
                            Logo File<Text color={brandStars}>*</Text>
                        </FormLabel>
                        <Box
                            display="flex"
                            alignItems="center"
                            justifyContent="space-between"
                            p={4}
                            border="2px dashed"
                            borderColor="grey"
                            borderRadius="md"
                            cursor="pointer"
                            _hover={{ borderColor: 'gray.400' }}
                            mb='24px'
                        >
                            <Box display="flex" alignItems="center" onClick={() => logoFileRef.current.click()}>
                                <Icon as={MdUploadFile} mr={2} />
                                <Text>{form.logo_file ? 'Choose other file' : 'Choose a file...'}</Text>
                            </Box>
                            {(form.logo_url || form.logo_file) && (
                                <Box mt={4}>
                                    <ChakraImage src={imagePreview.logo_file} alt="Image Preview" boxSize="200px" objectFit="cover" />
                                </Box>
                            )}
                            <Input
                                ref={logoFileRef}
                                type="file"
                                display="none"
                                accept='image/*'
                                name='logo_file'
                                onChange={handleFileChange}
                            />
                        </Box>
                    </Box>
                    <Box w={'full'}>
                        <FormLabel
                            display='flex'
                            ms='4px'
                            fontSize='sm'
                            fontWeight='500'
                            color={textColor}
                            mb='8px'
                        >
                            Banner File<Text color={brandStars}>*</Text>
                        </FormLabel>
                        <Box
                            display="flex"
                            alignItems="center"
                            justifyContent="space-between"
                            p={4}
                            mb={"24px"}
                            border="2px dashed"
                            borderColor="grey"
                            borderRadius="md"
                            cursor="pointer"
                            _hover={{ borderColor: 'gray.400' }}
                        >
                            <Box display="flex" alignItems="center" onClick={() => bannerFileRef.current.click()}>
                                <Icon as={MdUploadFile} mr={2} />
                                <Text>{form.banner_file ? 'Choose other file' : 'Choose a file...'}</Text>
                            </Box>
                            {(form.banner || form.banner_file) && (
                                <Box mt={4}>
                                    <ChakraImage src={imagePreview.banner_file} alt="Image Preview" width={'full'} height="200px" objectFit="cover" />
                                </Box>
                            )}
                            <Input
                                ref={bannerFileRef}
                                type="file"
                                display="none"
                                accept='image/*'
                                name='banner_file'
                                onChange={handleFileChange}
                            />
                        </Box>
                    </Box>
                </FormControl>
                <CustomInput title="Meta title" name="meta_title" value={form.meta_title} handleChangeForm={handleChangeForm} textColor={textColor} />
                <FormLabel
                    display='flex'
                    ms='4px'
                    fontSize='sm'
                    fontWeight='500'
                    color={textColor}
                    mb='8px'
                >
                    Meta description
                </FormLabel>
                <Textarea
                    isRequired={true}
                    variant='auth'
                    fontSize='sm'
                    ms={{ base: "0px", md: "0px" }}
                    placeholder=''
                    mb='24px'
                    fontWeight='500'
                    size='lg'
                    bgColor={bgColor}
                    border={'1px'}
                    borderColor={"grey"}
                    borderRadius={'16px'}
                    name="meta_description"
                    value={form.meta_description}
                    onChange={handleChangeForm}
                />
                <FormLabel
                    display='flex'
                    ms='4px'
                    fontSize='sm'
                    fontWeight='500'
                    color={textColor}
                    mb='8px'
                >
                    Og Graph Image
                </FormLabel>
                <Box
                    display="flex"
                    alignItems="center"
                    justifyContent="space-between"
                    p={4}
                    border="2px dashed"
                    borderColor="grey"
                    borderRadius="md"
                    cursor="pointer"
                    _hover={{ borderColor: 'gray.400' }}
                    mb='24px'
                >
                    <Box display="flex" alignItems="center" onClick={() => ogGraphFileRef.current.click()}>
                        <Icon as={MdUploadFile} mr={2} />
                        <Text>{form.og_graph_file ? 'Choose other file' : 'Choose a file...'}</Text>
                    </Box>
                    {(form.og_graph_file || form.og_graph_image) && (
                        <Box mt={4}>
                            <ChakraImage src={imagePreview.og_graph_file} alt="Image Preview" boxSize="200px" objectFit="cover" />
                        </Box>
                    )}
                    <Input
                        ref={ogGraphFileRef}
                        type="file"
                        display="none"
                        accept='image/*'
                        name='og_graph_file'
                        onChange={handleFileChange}
                    />
                </Box>
                <FormLabel
                    display='flex'
                    ms='4px'
                    fontSize='sm'
                    fontWeight='500'
                    color={textColor}
                    mb='8px'
                >
                    Twitter Graph Image
                </FormLabel>
                <Box
                    display="flex"
                    alignItems="center"
                    justifyContent="space-between"
                    p={4}
                    mb={"24px"}
                    border="2px dashed"
                    borderColor="grey"
                    borderRadius="md"
                    cursor="pointer"
                    _hover={{ borderColor: 'gray.400' }}
                >
                    <Box display="flex" alignItems="center" onClick={() => twitterGraphFileRef.current.click()}>
                        <Icon as={MdUploadFile} mr={2} />
                        <Text>{form.twitter_graph_file ? 'Choose other file' : 'Choose a file...'}</Text>
                    </Box>
                    {(form.twitter_graph_file || form.twitter_graph_image) && (
                        <Box mt={4}>
                            <ChakraImage src={imagePreview.twitter_graph_file} alt="Image Preview" boxSize="200px" objectFit="cover" />
                        </Box>
                    )}
                    <Input
                        ref={twitterGraphFileRef}
                        type="file"
                        display="none"
                        accept='image/*'
                        name='twitter_graph_file'
                        onChange={handleFileChange}
                    />
                </Box>
            </FormControl>
            <Button variant={"brand"} mr={3} onClick={handleVendor}>
                Save
            </Button>
            <Button onClick={() => setOpenedPage(0)}>Cancel</Button>
        </Box>
    )
}
