import { useState, useRef, useEffect } from 'react'
import {
    Button,
    Box,
    useToast,
    FormLabel,
    Textarea,
    Icon,
    Input,
    Text,
    Image as ChakraImage,
    useColorModeValue
} from '@chakra-ui/react'
import { MdUploadFile } from 'react-icons/md';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import {
    ClassicEditor,
    Essentials,
    Alignment,
    Autoformat,
    BlockQuote,
    Bold,
    CloudServices,
    Code,
    CodeBlock,
    Heading,
    HorizontalLine,
    Image,
    ImageToolbar,
    ImageUpload,
    Base64UploadAdapter,
    Italic,
    Link,
    List,
    Mention,
    Paragraph,
    MediaEmbed,
    SourceEditing,
    Strikethrough,
    Underline,
    Table,
    TableToolbar,
    TableProperties,
    TableColumnResize,
    TextTransformation,
    TodoList,
    ImageCaption,
    ImageInsert,
    ImageResize,
    ImageStyle,
} from 'ckeditor5'
import 'ckeditor5/ckeditor5.css';
import Card from '@/components/card/Card';
import { CustomInput } from '@/components/form/CustomInput';
import { getPageContent, savePageContent } from '../requests/use-request';
import { useMutation, useQueryClient } from 'react-query';
import { APP_URL } from '@/variables/statics';

export default function Template() {
    const queryClient = useQueryClient();
    const textColor = useColorModeValue("grey", "white");
    const bgColor = useColorModeValue('white', 'navy.800')
    const toast = useToast();

    const [form, setForm] = useState({
        page: 'home',
        content: '',
        meta_title: '',
        meta_description: '',
        og_graph_image: null,
        twitter_graph_image: null,
    });
    
    const [imagePreview, setImagePreview] = useState({
        og_graph_file: null,
        twitter_graph_file: null,
    });
    
    useEffect(() => {
        getPageContent('home').then(data => {
            const { content, meta_title, meta_description, og_graph_image, twitter_graph_image } = data;
            setForm((prev) => ({
                ...prev,
                content,
                meta_title,
                meta_description,
                og_graph_image,
                twitter_graph_image,
            }));
    
            // Update image previews only once after fetching data
            setImagePreview({
                og_graph_file: APP_URL + 'storage/' + og_graph_image,
                twitter_graph_file: APP_URL + 'storage/' + twitter_graph_image,
            });
        }) ;
    }, [])

    
    // Handle form input changes (text fields)
    const handleChangeForm = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };
    
    // Handle file input changes
    const handleSingleFileChange = (event) => {
        const file = event.target.files[0];
        const fieldName = event.target.name;
    
        setForm((prevState) => ({
            ...prevState,
            [fieldName]: file,
        }));
    
        // Update preview immediately upon file selection
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview((prev) => ({
                    ...prev,
                    [fieldName]: reader.result,
                }));
            };
            reader.readAsDataURL(file);
        }
    };
    
    // Submit form data to save content
    const handleSubmit = () => {
        const formData = new FormData();
        formData.append('page', 'home');
        formData.append('content', form.content);
        formData.append('meta_title', form.meta_title);
        formData.append('meta_description', form.meta_description);
        
        if (form.og_graph_image) formData.append('og_graph_file', form.og_graph_image);
        if (form.twitter_graph_image) formData.append('twitter_graph_file', form.twitter_graph_image);
    
        savePageContentMutation.mutate(formData);
    };
    
    // Mutation to save page content
    const savePageContentMutation = useMutation(savePageContent, {
        onSuccess: () => {
            queryClient.invalidateQueries('getServiceContent' + 'home');
            toast({
                title: "Content saved successfully!",
                status: "success",
                duration: 5000,
                isClosable: true,
            });
        },
        onError: (error) => {
            toast({
                title: "Error saving content",
                description: error.response?.data?.message || "An error occurred",
                status: "error",
                duration: 5000,
                isClosable: true,
            });
        },
    });    

    const ogGraphFileRef = useRef(null);
    const twitterGraphFileRef = useRef(null);

    return (
        <Card
            flexDirection="column"
            w="100%"
            px="0px"
            overflowX={{ sm: 'scroll', lg: 'hidden' }}
        >
            <Box p={"20px"}>
                <FormLabel
                    display='flex'
                    ms='4px'
                    fontSize='sm'
                    fontWeight='500'
                    color={textColor}
                    mb='8px'
                >
                    Content
                </FormLabel>
                <CKEditor
                    editor={ClassicEditor}
                    config={{
                        plugins: [
                            Alignment,
                            Autoformat,
                            BlockQuote,
                            Bold,
                            CloudServices,
                            Code,
                            CodeBlock,
                            Essentials,
                            Heading,
                            HorizontalLine,
                            Image,
                            ImageCaption,
                            ImageInsert,
                            ImageResize,
                            ImageStyle,
                            ImageToolbar,
                            ImageUpload,
                            MediaEmbed,
                            Base64UploadAdapter,
                            Italic,
                            Link,
                            List,
                            Underline,
                            Mention,
                            Paragraph,
                            SourceEditing,
                            Strikethrough,
                            Table,
                            TableToolbar,
                            TableProperties,
                            TableColumnResize,
                            TextTransformation,
                            TodoList,
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
                    data={form.content}
                    onChange={(event, editor) => {
                        const data = editor.getData();
                        setForm(prev => ({ ...prev, content: data }))
                    }}
                />
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
                        onChange={handleSingleFileChange}
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
                        onChange={handleSingleFileChange}
                    />
                </Box>
                <Button variant={"brand"} mt={3} mr={3} onClick={handleSubmit}>
                    Save
                </Button>
            </Box>
        </Card>
    )
}