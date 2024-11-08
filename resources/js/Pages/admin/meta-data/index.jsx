import {
    Box,
    TabPanels,
    Tabs,
    TabList,
    Tab,
    useColorModeValue,
    TabPanel
} from '@chakra-ui/react';

import AdminLayout from '@/layouts/admin';
import { useState, useEffect } from 'react';
import Template from './components/Template';

export default function MetaData() {

    const [page, setPage] = useState('home');
    const borderColor = useColorModeValue('gray.200', 'whiteAlpha.100');

    const handlePageChange = (newPage) => {
        if (page !== newPage) {
            setPage(newPage);
        }
    };

    return (
        <AdminLayout>
            <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
                <Tabs>
                    <TabList>
                        <Box
                            overflowX={{ base: 'scroll', md: 'auto' }} // Scrollable on smaller screens
                            overflowY={'hidden'}
                            display="flex"
                            maxW="100%"
                            sx={{
                                '&::-webkit-scrollbar': {
                                    width: '8px',
                                    height: '8px',
                                    backgroundColor: 'transparent',
                                },
                                '&::-webkit-scrollbar-thumb': {
                                    backgroundColor: borderColor,
                                    borderRadius: '20px',
                                },
                                '&::-webkit-scrollbar-track': {
                                    backgroundColor: 'rgba(0, 0, 0, 0.15)',
                                    borderRadius: '20px',
                                },
                            }}
                        >
                            <Tab onClick={() => handlePageChange('home')}>Home</Tab>
                            <Tab onClick={() => handlePageChange('data-explorer')}>Data Explorer</Tab>
                            <Tab onClick={() => handlePageChange('dbms-ranking')}>DBMS Ranking</Tab>
                            <Tab onClick={() => handlePageChange('dbms')}>DBMS</Tab>
                            <Tab onClick={() => handlePageChange('encyclopedia')}>Encyclopedia</Tab>
                            <Tab onClick={() => handlePageChange('blog')}>Blog</Tab>
                            <Tab onClick={() => handlePageChange('sponsor')}>Sponsor</Tab>
                            <Tab onClick={() => handlePageChange('services')}>Service</Tab>
                            <Tab onClick={() => handlePageChange('aboutus')}>About Us</Tab>
                            <Tab onClick={() => handlePageChange('contactus')}>Contact Us</Tab>
                        </Box>
                    </TabList>
                    <TabPanels>
                        <TabPanel><Template page={'home'} /></TabPanel>
                        <TabPanel><Template page={'data-explorer'} /></TabPanel>
                        <TabPanel><Template page={'dbms-ranking'} /></TabPanel>
                        <TabPanel><Template page={'dbms'} /></TabPanel>
                        <TabPanel><Template page={'encyclopedia'} /></TabPanel>
                        <TabPanel><Template page={'blog'} /></TabPanel>
                        <TabPanel><Template page={'sponsor'} /></TabPanel>
                        <TabPanel><Template page={'services'} /></TabPanel>
                        <TabPanel><Template page={'aboutus'} /></TabPanel>
                        <TabPanel><Template page={'contactus'} /></TabPanel>
                    </TabPanels>
                </Tabs>
            </Box >
        </AdminLayout>
    );
}
