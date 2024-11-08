import { useState, useEffect, useRef } from 'react'
import {
    Button,
    FormControl,
    FormLabel,
    Input,
    Text,
    Box,
    Image as ChakraImage,
    Textarea,
    Icon,
    useToast,
    useColorModeValue
} from '@chakra-ui/react'
import { useQueryClient, useMutation } from 'react-query';
import { createEncyclopedia, updateEncyclopedia } from '../requests/use-request';;
import { MdUploadFile } from 'react-icons/md';
import { CustomInput } from '@/components/form/CustomInput';
import {
    ClassicEditor,
    Essentials,
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
    Alignment,
} from 'ckeditor5'
import 'ckeditor5/ckeditor5.css';
import { APP_URL } from '@/variables/statics';

export default function EncyclopediaForm({ encyclopedia, setOpenedPage }) {
    const queryClient = useQueryClient();
    const toast = useToast();
    const textColor = useColorModeValue("grey", "white");
    const brandStars = useColorModeValue("brand.500", "brand.400");
    const bgColor = useColorModeValue('white', 'navy.800')

    const {
        id,
        title,
        content,
        meta_title,
        meta_description,
        og_graph_image,
        twitter_graph_image
    } = encyclopedia;

    const [form, setForm] = useState({
        id,
        title,
        content,
        meta_title,
        meta_description,
        og_graph_image,
        twitter_graph_image,
        og_graph_file: null,
        twitter_graph_file: null,
    })

    const createEncyclopediaMutation = useMutation(createEncyclopedia, {
        onSuccess: () => {
            queryClient.invalidateQueries('encyclopedias');
            setOpenedPage(0)
            toast({
                title: "Create new Encyclopedia successfully",
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
                title: "Failed to create Encyclopedia",
                description: key,
                position: 'top-right',
                status: "success",
                insert: "top",
                duration: 5000,
                isClosable: true
            })
        }
    })

    const updateEncyclopediaMutation = useMutation(updateEncyclopedia, {
        onSuccess: () => {
            queryClient.invalidateQueries('encyclopedias');
            setOpenedPage(0)
            toast({
                title: "Update Encyclopedia successfully",
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
                title: "Failed to update Encyclopedia successfully",
                description: key,
                position: 'top-right',
                status: "error",
                insert: "top",
                duration: 5000,
                isClosable: true
            })
        }
    })

    const handleEncyclopedia = () => {
        const formData = new FormData();
        formData.append('id', form.id);
        formData.append('title', form.title);
        formData.append('content', form.content);
        formData.append('meta_title', form.meta_title);
        formData.append('meta_description', form.meta_description);
        if (form.twitter_graph_image) formData.append('twitter_graph_image', form.twitter_graph_image);
        if (form.og_graph_image) formData.append('og_graph_image', form.og_graph_image);
        if (form.og_graph_file) formData.append('og_graph_file', form.og_graph_file);
        if (form.twitter_graph_file) formData.append('twitter_graph_file', form.twitter_graph_file);
        if (!form.id) createEncyclopediaMutation.mutate({ encyclopedia: formData });
        else updateEncyclopediaMutation.mutate({ id, encyclopedia: formData });
    }

    const handleChangeForm = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    }

    useEffect(() => {
        setForm({
            id,
            title,
            content,
            meta_title,
            meta_description,
            og_graph_image,
            twitter_graph_image,
            og_graph_file: null,
            twitter_graph_file: null,
        });
    }, [encyclopedia])

    const [EditorComponent, setEditorComponent] = useState(null);
    useEffect(() => {
        if (typeof window !== 'undefined') {
            import('@ckeditor/ckeditor5-react').then(({ CKEditor }) => {
                setEditorComponent(() => CKEditor);
            });
        }
    }, []);

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

    const [imagePreview, setImagePreview] = useState({
        og_graph_file: APP_URL + 'storage/' + og_graph_image,
        twitter_graph_file: APP_URL + 'storage/' + twitter_graph_image,
    });

    useEffect(() => {
        setImagePreview({
            og_graph_file: APP_URL + 'storage/' + og_graph_image,
            twitter_graph_file: APP_URL + 'storage/' + twitter_graph_image,
        })
    }, [og_graph_image, twitter_graph_image])

    const ogGraphFileRef = useRef(null);
    const twitterGraphFileRef = useRef(null);

    return (
        <Box p={"20px"}>
            <Text mb={"32px"} fontSize={22}>{!encyclopedia.id ? "Create" : "Update"} Encyclopedia</Text>
            <FormControl>
                <CustomInput title="Encyclopedia Title" name="title" value={form.title} handleChangeForm={handleChangeForm} textColor={textColor} brandStars={brandStars} />
            </FormControl>
            <FormLabel
                display='flex'
                ms='4px'
                fontSize='sm'
                fontWeight='500'
                color={textColor}
                mb='8px'
            >
                Content<Text color={brandStars}>*</Text>
            </FormLabel>
            {EditorComponent &&
                <EditorComponent
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
                />}
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
            <Button variant={"brand"} mt={3} mr={3} onClick={handleEncyclopedia}>
                Save
            </Button>
            <Button mt={3} onClick={() => setOpenedPage(0)}>Cancel</Button>
        </Box>
    )
}
