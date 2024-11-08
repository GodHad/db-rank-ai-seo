import {
    Box,
    TabPanel,
    TabPanels,
    Tabs,
    TabList,
    Tab
} from '@chakra-ui/react';

import Sidebar from './sidebar';
import Top from './top';
import AdminLayout from '@/layouts/admin';

export default function FeaturedProduct() {
    return (
        <AdminLayout>
            <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
                <Tabs>
                    <TabList>
                        <Tab>Sidebar</Tab>
                        <Tab>Top</Tab>
                    </TabList>
                    <TabPanels>
                        <TabPanel>
                            <Sidebar />
                        </TabPanel>
                        <TabPanel>
                            <Top />
                        </TabPanel>
                    </TabPanels>
                </Tabs>
            </Box >
        </AdminLayout>
    );
}
