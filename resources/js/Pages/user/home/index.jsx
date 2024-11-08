import {
  Box,
  Flex,
  Text,
  SimpleGrid,
  Card,
  useColorModeValue,
} from "@chakra-ui/react";

import 'ckeditor5/ckeditor5.css';
import TopDBMSTable from "./components/TopDBMSTable";
import RecentBlogs from "./components/RecentBlogs";
import UserLayout from '@/layouts/user';
import CustomCKEditor from "../components/CustomCKEditor";
import SeoHeader from "../components/SeoHeader";

export default function Home({ content }) {

  const textColor = useColorModeValue('secondaryGray.900', 'white');

  return (
    <UserLayout>
      <SeoHeader content={content} title={'Home'} />
      <Box>
        <SimpleGrid columns={{ base: 1, lg: 2, xl: 2 }} gap='20px' mb='20px' justifyContent={"center"}>
          <Card
            flexDirection="column"
            bgColor={"transparent"}
            w="100%"
            px="0px"
            overflow={'hidden'}
            shadow={"none"}
          >
            <Flex px="25px" mb="8px" flexDirection={"column"} justifyContent="space-between">
              <Text
                color={textColor}
                fontSize={{ md: "40px", "2sm": '32px', base: '24px' }}
                fontWeight="800"
                lineHeight="48px"
                mb={'10px'}
                bgClip="text"
                bgGradient={"linear(to-r, #2ac349, #018cc1)"}
              >
                DB Rank AI
              </Text>
              <CustomCKEditor content={content.content} />
            </Flex>
          </Card>
          <TopDBMSTable />
        </SimpleGrid>
        <RecentBlogs />
      </Box >
    </UserLayout>
  );
}
