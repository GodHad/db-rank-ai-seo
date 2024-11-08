import ReactDOMServer from 'react-dom/server';
import { createInertiaApp } from '@inertiajs/inertia-react';
import createServer from '@inertiajs/react/server';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
// import { route } from '../../vendor/tightenco/ziggy/src/js';

import { ChakraProvider } from '@chakra-ui/react';
import initialTheme from '@/theme/theme';
import { QueryClient, QueryClientProvider } from 'react-query';
import { UserContextProvider } from '@/contexts/UserContext';
import { DBMSContextProvider } from '@/contexts/DBMSContext';
import { FeaturedProductSidebarContextProvider } from '@/contexts/FeaturedProductsContext';
const queryClient = new QueryClient();

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

createServer((page) =>
    createInertiaApp({
        page,
        render: ReactDOMServer.renderToString,
        title: (title) => `${appName} | ${title}`,
        resolve: (name) => resolvePageComponent(`./Pages/${name}/index.jsx`, import.meta.glob('./Pages/**/*.jsx')),
        setup: ({ App, props }) => {
            // global.route = (name, params, absolute) =>
            //     route(name, params, absolute, {
            //         ...page.props.ziggy,
            //         location: new URL(page.props.ziggy.location),
            //     });

            return (
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
            )
        },
    })
);