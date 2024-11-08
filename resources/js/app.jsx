import './bootstrap';
import '@/assets/css/App.css';
import { createRoot } from 'react-dom/client';
// import { hydrateRoot } from 'react-dom/client';
import { createInertiaApp } from '@inertiajs/inertia-react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { InertiaProgress } from '@inertiajs/progress';
InertiaProgress.init();

import { ChakraProvider } from '@chakra-ui/react';
import initialTheme from '@/theme/theme';
const appName = import.meta.env.VITE_APP_NAME || 'DB rank AI';
import { QueryClient, QueryClientProvider } from 'react-query';

import { UserContextProvider } from '@/contexts/UserContext';
import { DBMSContextProvider } from '@/contexts/DBMSContext';
import { FeaturedProductSidebarContextProvider } from '@/contexts/FeaturedProductsContext';

const queryClient = new QueryClient();

createInertiaApp({
    title: (title) => `${appName} | ${title}`,
    resolve: (name) => resolvePageComponent(`./Pages/${name}/index.jsx`, import.meta.glob('./Pages/**/*.jsx')),
    setup({ el, App, props }) {
        const root = createRoot(el);
        // const root = hydrateRoot(el);

        root.render(
            <QueryClientProvider client={queryClient}>
                <UserContextProvider>
                    <DBMSContextProvider>
                        <FeaturedProductSidebarContextProvider>
                            <ChakraProvider theme={initialTheme}>
                                <App {...props} />
                            </ChakraProvider>
                        </FeaturedProductSidebarContextProvider>
                    </DBMSContextProvider>
                </UserContextProvider>
            </QueryClientProvider>
        );
    },
    progress: {
        color: '#4B5563',
    },
});