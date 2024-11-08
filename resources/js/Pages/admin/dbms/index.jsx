import {
    Box,
    TabPanel,
    TabPanels,
    Tabs,
    TabList,
    Tab
} from '@chakra-ui/react';

import Category from './Categories';
import DBMS from './dbms';
import AdminLayout from '@/layouts/admin';

export default function Blog() {
    return (
        <AdminLayout>
            <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
                <Tabs>
                    <TabList>
                        <Tab>DBMS</Tab>
                        <Tab>Categories</Tab>
                    </TabList>
                    <TabPanels>
                        <TabPanel>
                            <DBMS />
                        </TabPanel>
                        <TabPanel>
                            <Category />
                        </TabPanel>
                    </TabPanels>
                </Tabs>
            </Box >
        </AdminLayout>
    );
}
