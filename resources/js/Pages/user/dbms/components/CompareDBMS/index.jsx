import {
  Flex,
  Box,
  Table as ChakraTable,
  Tbody,
  Td,
  Text,
  Th,
  Tr,
  FormControl,
  FormLabel,
  Breadcrumb,
  BreadcrumbItem,
  useColorModeValue,
  BreadcrumbLink,
} from '@chakra-ui/react';
import { useState, useEffect, useContext, useMemo, useRef } from 'react'
import { Select as MultiSelect } from 'chakra-react-select';
import Card from '@/components/card/Card';
import { Link as ReactLink } from '@inertiajs/react';
import { DBMSContext } from '@/contexts/DBMSContext';
import { generateSlug } from '@/variables/statics';
import { getVendors } from '@/Pages/admin/dbms/dbms/requests/use-request';
import { useQuery } from 'react-query';
import { headers } from '../DBMS';
import { Skeleton } from '@chakra-ui/skeleton';
import { Helmet } from 'react-helmet';
import { CKEditor } from '@ckeditor/ckeditor5-react';
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
  Markdown,
  Mention,
  Paragraph,
  MediaEmbed,
  SourceEditing,
  Strikethrough,
  Table,
  TableToolbar,
  TableColumnResize,
  TableProperties,
  TextTransformation,
  TodoList,
  ImageCaption,
  ImageInsert,
  ImageResize,
  ImageStyle,
} from 'ckeditor5'
import 'ckeditor5/ckeditor5.css';
import UserLayout from '@/layouts/user';
import { Inertia } from '@inertiajs/inertia';
import SeoHeader from '../../../components/SeoHeader';

export default function CompareDBMS({ slug }) {
  const dbmsNames = decodeURIComponent(slug).split(';');
  const { vendors, setVendors } = useContext(DBMSContext);

  const { data: _vendors } = useQuery(
    'user_vendors',
    getVendors,
    {
      staleTime: 300000,
      enabled: vendors.length === 0,
      onSuccess: (data) => {
        setVendors(data)
      }
    }
  );

  const selectedDBMS = useMemo(() => {
    return vendors.filter(vendor => dbmsNames.includes(generateSlug(vendor.db_name)));
  }, [vendors, slug]);

  useEffect(() => {
    if (selectedDBMS.length !== dbmsNames.length && vendors.length !== 0 && _vendors) Inertia.visit('/not-found');
  }, [selectedDBMS, vendors, _vendors])

  const textColor = useColorModeValue('secondaryGray.900', 'white');
  const secondaryText = useColorModeValue('gray.700', 'white');
  const borderColor = useColorModeValue('gray.200', 'whiteAlpha.100');

  const [data, setData] = useState(null);
  const [options, setOptions] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState(null)
  const editorRefs = useRef([]);
  const [editorData, setEditorData] = useState([]);

  useEffect(() => {
    setData(selectedDBMS.map(dbms => {
      const primaryRanking = dbms.primary_ranking.split(' ');
      return {
        ...dbms,
        overall_ranking: `
          <span style="margin-right: 8px">Overall Avg. Score:</span> ${dbms.overall_avg_score}<br> 
          <span style="margin-right: 8px">Rank:</span> #${dbms.overall_ranking} Overall<br>
          ${dbms.primary_category.map((category, index) => (`<span style="margin-right: 8px; opacity: 0">Rank: </span> #${primaryRanking[index]} ${category.shortname}<br>`))}
      `,
        primary_category: dbms.primary_category.map(category => category.title).join('\n'),
        secondary_category: dbms.secondary_category.map(category => category.title).join('\n'),
      }
    }))

    setSelectedOptions(selectedDBMS.map(dbms => ({ label: dbms.db_name, value: dbms.id })))

    const updatedData = selectedDBMS.map(dbms => dbms.description || '');
    setEditorData(updatedData);
  }, [selectedDBMS])

  const handleEditorReady = (editor, index) => {
    editorRefs.current[index] = editor;
    editor.setData(editorData[index]);
  };

  useEffect(() => {
    if (vendors) setOptions(vendors.map(vendor => ({ label: vendor.db_name, value: vendor.id })))
  }, [vendors])

  const handleSelectChange = (value) => {
    const navigateUrl = value.map((option, index) => generateSlug(option.label)).join(';');
    const fullUrl = `/dbms/compare/${encodeURIComponent(navigateUrl)}`;
    if (typeof window !== "undefined")
      window.location.pathname = fullUrl;
  }

  return (
    <UserLayout>
      <Helmet>
        <title>DB Rank AI | Compare</title>
      </Helmet>
      <Box
        flexDirection="column"
        w="100%"
        px="0px"
        overflow={'hidden'}
      >
        <Card
          flexDirection="column"
          w="100%"
          px="0px"
          minH="calc(100vh - 150px)"
          overflowX={{ sm: 'auto', lg: 'hidden' }}
        >
          <Breadcrumb px="25px">
            <BreadcrumbItem color={secondaryText} fontSize='sm' mb='5px'>
              <ReactLink href='/'>
                Home
              </ReactLink>
            </BreadcrumbItem>

            <BreadcrumbItem color={secondaryText} fontSize='sm' mb='5px'>
              <ReactLink href='/dbms'>
                DBMS
              </ReactLink>
            </BreadcrumbItem>

            <BreadcrumbItem color={secondaryText} fontSize='sm' mb='5px'>
              <BreadcrumbLink>
                Compare
              </BreadcrumbLink>
            </BreadcrumbItem>

            <BreadcrumbItem color={secondaryText} fontSize='sm' mb='5px'>
              <BreadcrumbLink>
                {
                  selectedDBMS.length === 1 ?
                    selectedDBMS[0].db_name
                    : selectedDBMS.map((dbms, index) => (index === selectedDBMS.length - 1) ? dbms.db_name : `${dbms.db_name} vs. `)
                }
              </BreadcrumbLink>
            </BreadcrumbItem>
          </Breadcrumb>
          <Flex px="25px" mb="8px" gap={4} flexDir={{ base: 'column', md: 'row' }} justifyContent="space-between" align={{ base: 'inherit', md: "center" }}>
            <Text
              color={textColor}
              fontSize={{ md: "22px", base: '20px' }}
              mb="4px"
              fontWeight="700"
              lineHeight="100%"
            >
              {
                selectedDBMS.length === 1 ?
                  selectedDBMS[0].db_name
                  : selectedDBMS.map((dbms, index) => (index === selectedDBMS.length - 1) ? dbms.db_name : `${dbms.db_name} vs. `)
              }
            </Text>
          </Flex>
          <Box display={"flex"} gap={2} alignItems={"center"} px={6} w={'full'} justifyContent={{ base: 'right', md: 'inherit' }}>
            {options &&
              <FormControl mb={"24px"}>
                <FormLabel
                  display='flex'
                  ms='4px'
                  fontSize='sm'
                  fontWeight='500'
                  color={textColor}
                  mb='8px'
                >
                  Compare with:
                </FormLabel>
                <MultiSelect
                  isMulti
                  isSearchable
                  value={selectedOptions}
                  placeholder='Select categories'
                  variant='auth'
                  fontSize='sm'
                  ms={{ base: "0px", md: "0px" }}
                  type='text'
                  fontWeight='500'
                  size='lg'
                  options={options}
                  onChange={handleSelectChange}
                />
              </FormControl>
            }
          </Box>

          <Box
            overflow={'auto'}
            sx={{
              '&::-webkit-scrollbar': {
                width: '8px',
                height: '8px',
                backgroundColor: 'transparent', // Change to transparent or the desired color
              },
              '&::-webkit-scrollbar-thumb': {
                backgroundColor: borderColor, // Color for the scrollbar thumb
                borderRadius: '20px',
              },
              '&::-webkit-scrollbar-track': {
                backgroundColor: 'rgba(0, 0, 0, 0.15)', // Track color, adjust as needed
                borderRadius: '20px',
              },
            }}>
            <ChakraTable variant="simple" color="gray.500" mb="24px" mt="12px" style={{ tableLayout: 'fixed' }}>
              <Tbody>
                {headers.map(header => (
                  <Tr key={header.key}>
                    <Th
                      pe="10px"
                      borderColor={borderColor}
                      width={'150px'}
                    >
                      {header.name}
                    </Th>
                    {data && data.length > 0 ? data.map((dbms, index) => (
                      <Td
                        key={dbms.id}
                        pe="10px"
                        borderColor={borderColor}
                        width={'300px'}
                      >
                        {header.key === 'description' ?
                          <CKEditor
                            key={`editor-${dbms.id}`}
                            editor={ClassicEditor}
                            config={{
                              plugins: [
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
                                Markdown,
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
                              table: {
                                contentToolbar: ['tableColumn', 'tableRow', 'mergeTableCells', 'tableProperties'],
                              },
                              isReadOnly: true,
                              initialData: data[header.key]
                            }}
                            data={data[header.key] || ''}
                            disabled={true}
                            onReady={(editor) => handleEditorReady(editor, index)}
                          />
                          :
                          <Text
                            color={textColor}
                            mb="4px"
                            fontWeight="500"
                            lineHeight="120%"
                            dangerouslySetInnerHTML={{ __html: header.yes ? data[header.key] ? 'Yes' : 'No' : data[header.key] }}
                          />
                        }
                      </Td>
                    )) : (
                      <Td
                        pe="10px"
                        borderColor={borderColor}
                        width={'300px'}
                      >
                        <Skeleton width={'300px'} height={"30px"} borderRadius={"12px"} />
                      </Td>
                    )}
                  </Tr>
                ))}
                <Tr>
                  {data && data.length > 0 ? data.map((dbms, index) => (
                    <Td
                      key={dbms.id}
                      pe="10px"
                      borderColor={borderColor}
                      width={'300px'}
                      className='no-border-editor'
                      colSpan={2}
                    >
                      <CKEditor
                        editor={ClassicEditor}
                        config={{
                          plugins: [
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
                            Markdown,
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
                          table: {
                            contentToolbar: ['tableColumn', 'tableRow', 'mergeTableCells', 'tableProperties'],
                          },
                          isReadOnly: true,
                          initialData: dbms.extra_content
                        }}
                        disabled={true}
                      /></Td>))
                    : <Td colSpan={2}><Skeleton width={'300px'} height={"30px"} borderRadius={"12px"} /></Td>
                  }
                </Tr>
              </Tbody>
            </ChakraTable>
          </Box>
        </Card>
      </Box>
    </UserLayout>
  );
}
