import { Box, useDisclosure, Image } from '@chakra-ui/react';
import Footer from './Footer/Footer';
import Navbar from '@/components/navbar/NavbarUser';
import React, { useState, useMemo } from 'react';
import routes from './routes';
import FeaturedProductsSidebar from '@/components/featuredProductSidebar/Sidebar';
import { APP_URL } from '@/variables/statics';
import { getBanners } from '@/Pages/admin/banner/requests/use-request';
import { useQuery } from 'react-query';
import LazyLoad from 'react-lazyload';

export default function UserLayout(props) {
  const { children, ...rest } = props;
  const [fixed] = useState(false);
  const getActiveRoute = (routes) => {
    let activeRoute = 'DB Rank AI';
    if (typeof window === "undefined") return activeRoute;
    for (let i = 0; i < routes.length; i++) {
      if (routes[i].collapse) {
        let collapseActiveRoute = getActiveRoute(routes[i].items);
        if (collapseActiveRoute !== activeRoute) {
          return collapseActiveRoute;
        }
      } else if (routes[i].category) {
        let categoryActiveRoute = getActiveRoute(routes[i].items);
        if (categoryActiveRoute !== activeRoute) {
          return categoryActiveRoute;
        }
      } else {
        if (
          window.location.pathname.indexOf(routes[i].path) !== -1
        ) {
          return routes[i].name;
        }
      }
    }
    return activeRoute;
  };
  const getActiveNavbar = (routes) => {
    let activeNavbar = false;
    if (typeof window === "undefined") return activeNavbar;
    for (let i = 0; i < routes.length; i++) {
      if (routes[i].collapse) {
        let collapseActiveNavbar = getActiveNavbar(routes[i].items);
        if (collapseActiveNavbar !== activeNavbar) {
          return collapseActiveNavbar;
        }
      } else if (routes[i].category) {
        let categoryActiveNavbar = getActiveNavbar(routes[i].items);
        if (categoryActiveNavbar !== activeNavbar) {
          return categoryActiveNavbar;
        }
      } else {
        if (
          window.location.pathname.indexOf(routes[i].path) !== -1
        ) {
          return routes[i].secondary;
        }
      }
    }
    return activeNavbar;
  };
  const getActiveNavbarText = (routes) => {
    let activeNavbar = false;
    if (typeof window === "undefined") return activeNavbar;
    for (let i = 0; i < routes.length; i++) {
      if (routes[i].collapse) {
        let collapseActiveNavbar = getActiveNavbarText(routes[i].items);
        if (collapseActiveNavbar !== activeNavbar) {
          return collapseActiveNavbar;
        }
      } else if (routes[i].category) {
        let categoryActiveNavbar = getActiveNavbarText(routes[i].items);
        if (categoryActiveNavbar !== activeNavbar) {
          return categoryActiveNavbar;
        }
      } else {
        if (
          window.location.pathname.indexOf(routes[i].path) !== -1
        ) {
          return routes[i].messageNavbar;
        }
      }
    }
    return activeNavbar;
  };
  const { onOpen } = useDisclosure();

  const { data: banners } = useQuery('banners', getBanners, { staleTime: 100000 });

  const bottomBanners = useMemo(() => {
    return banners ? banners.filter(banner => banner.type === 1) : [];
  }, [banners]);



  return (
    <Box>
      <Box
        float="right"
        minHeight="100vh"
        height="100%"
        overflow="hidden"
        position="relative"
        maxHeight="100%"
        w={"100%"}
        maxWidth={"100%"}
        transition="all 0.33s cubic-bezier(0.685, 0.0473, 0.346, 1)"
        transitionDuration=".2s, .2s, .35s"
        transitionProperty="top, bottom, width"
        transitionTimingFunction="linear, linear, ease"
      >
        {typeof window !== 'undefined' &&
          <Navbar
            onOpen={onOpen}
            logoText={'DB Rank AI'}
            brandText={getActiveRoute(routes)}
            secondary={getActiveNavbar(routes)}
            message={getActiveNavbarText(routes)}
            fixed={fixed}
            {...rest}
          />
        }
        <Box
          mx="auto"
          p={{ base: '20px', md: '30px' }}
          pe="20px"
          w={{ base: '100%', lg: 'calc( 100% - 290px )' }}
          maxWidth={{ base: '100%', lg: 'calc( 100% - 290px )' }}
          float="left"
          position={'relative'}
          zIndex={101}
        >
          {children}
          <Box width={'full'}>
            {typeof window !== "undefined" && window.location.pathname === '/' && bottomBanners.map((image, index) => (
              <a key={image.id + image.url} href={image.link} target='_blank' style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
                <LazyLoad height={'90px'} offset={300}>
                  <Image
                    mb={5}
                    h="auto"
                    maxH={'90px'}
                    maxW="728px"
                    w="100%"
                    borderRadius="xl"
                    src={`${APP_URL}storage/${image.url}`}
                    alt={image.url}
                  />
                </LazyLoad>
              </a>
            ))}
          </Box>
          <Footer />
        </Box>
        <FeaturedProductsSidebar display="none" {...rest} />
      </Box>
    </Box>
  );
}
