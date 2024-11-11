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
import SeoHeader from '../../user/components/SeoHeader';

export default function FeaturedProduct() {
    return (
        <AdminLayout>
            <SeoHeader />
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
