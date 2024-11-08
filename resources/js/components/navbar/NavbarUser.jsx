import {
  Box,
  Flex,
  HStack,
  Text,
  IconButton,
  useDisclosure,
  useColorModeValue,
  Image,
  Stack,
  Icon,
} from '@chakra-ui/react'
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons'
import Logo from './components/Logo'
import NavbarLinks from './NavbarLinksUser'
import routes from '@/layouts/user/routes';
import { useContext, useMemo, useState } from 'react'
import { FeaturedProductSidebarContext } from '@/contexts/FeaturedProductsContext'
import { Skeleton } from '@chakra-ui/skeleton'
import { getBanners } from '@/Pages/admin/banner/requests/use-request';
import { useQuery } from 'react-query';
import Slider from 'react-slick';
import { APP_URL } from '@/variables/statics';
import { MdAutoAwesome } from 'react-icons/md';
import { UserContext } from '@/contexts/UserContext';
import { Link } from '@inertiajs/react';

const settings = {
  dots: true,
  arrows: false,
  fade: true,
  infinite: true,
  autoplay: true,
  speed: 500,
  autoplaySpeed: 3000,
  slidesToShow: 1,
  slidesToScroll: 1,
}

const NavLink = ({ _route, onClose }) => {
  const bg = useColorModeValue('gray.200', 'gray.700');
  let activeIcon = useColorModeValue("brand.500", "white");
  let textColor = useColorModeValue("secondaryGray.500", "white");
  return (
    _route.name !== 'Data Explorer' ?
      <Link href={_route.path}>
        <Box
          px={3}
          py={4}
          rounded={'md'}
          bg={(typeof window !== "undefined" && window.location.pathname.startsWith(_route.path)) ? bg : 'transparent'}
          _hover={{
            textDecoration: 'none',
            bg: bg
          }}
          onClick={onClose}
        >
          {_route.name}
        </Box>
      </Link> :
      <Link href={_route.path}>
        <Flex
          alignItems='center'
          justifyContent='center'
          bg={(typeof window !== "undefined" && window.location.pathname.startsWith(_route.path)) ? bg : 'transparent'}
          _hover={{
            textDecoration: 'none',
            bg: bg,
            color: 'white'
          }}
          rounded={'md'}
          px={3}
          py={3}
          onClick={onClose}
        >
          <Box
            color={
              (typeof window !== "undefined" && window.location.pathname.includes('explorer'))
                ? activeIcon
                : textColor
            }
            me='8px'
          >
            <Flex
              borderRadius="full"
              justify="center"
              align="center"
              // bg={'linear-gradient(15.46deg, #4A25E1 26.3%, #7B5AFF 86.4%)'}
              h="30px"
              minH="30px"
              minW="30px"
              bgGradient={"linear(to-r, #2ac349, #018cc1)"}
            >
              <Icon
                as={MdAutoAwesome}
                width="20px"
                height="20px"
                color="white"
              />
            </Flex>
          </Box>
          <Box>
            {_route.name}
          </Box>
        </Flex>
      </Link>
  )
}

export default function Navbar(props) {
  const [slider, setSlider] = useState(null);

  const { isOpen, onOpen, onClose } = useDisclosure()
  const { featuredProducts } = useContext(FeaturedProductSidebarContext);
  const textColor = useColorModeValue('secondaryGray.900', 'white');
  const { data: banners } = useQuery('banners', getBanners, { staleTime: 100000 });

  const topBanners = useMemo(() => {
    return banners ? banners.filter(banner => banner.type === 0) : [];
  }, [banners]);

  let navbarBg = useColorModeValue('rgba(244, 247, 254, 0.2)', 'rgba(11,20,55,0.5)');

  const { user } = useContext(UserContext);

  return (
    <>
      <Box bg={navbarBg} px={4} my={"10px"}>
        <Flex w="100%" display={'flex'} flexDir={{ base: 'column', sm: 'column', lg: 'row' }} alignItems={'center'} justifyContent={'center'}>
          <Box position={{ base: 'block', lg: 'absolute' }} left={'4'}>
            <Logo />
          </Box>
          <Box position={'relative'} height={'90px'} maxW={'728px'} width={{ base: '90%', lg: '80%' }} overflow={'hidden'}>
            <link
              rel="stylesheet"
              type="text/css"
              href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css"
            />
            <link
              rel="stylesheet"
              type="text/css"
              href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css"
            />

            {topBanners &&
              <Slider {...settings} ref={(slider) => setSlider(slider)}>
                {topBanners.map((image, index) => (
                  <Link href={image.link} target='_blank' key={image.id + image.url} style={{ display: 'flex', justifyContent: 'center' }}>
                    <Image
                      mb={5}
                      mx={'auto'}
                      height="90px"
                      maxW="100%"
                      width="auto"
                      borderRadius="xl"
                      objectFit="cover"
                      objectPosition="center"
                      srcSet={`${APP_URL}storage/${image.url}?w=600&auto=format 600w,
                                 ${APP_URL}storage/${image.url}?w=1200&auto=format 1200w,
                                 ${APP_URL}storage/${image.url}?w=1400&auto=format 1400w`}
                      sizes="(max-width: 600px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      src={`${APP_URL}storage/${image.url}?w=1400&auto=compression,format`}
                      alt={image.url}
                    />
                  </Link>
                ))}
              </Slider>
            }
          </Box>
        </Flex>

      </Box>
      <Box bg={navbarBg} px={4}>
        <Flex w="100%" h={16} alignItems={'center'} justifyContent={'space-between'}>
          <IconButton
            size={'md'}
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label={'Open Menu'}
            display={{ lg: 'none' }}
            onClick={isOpen ? onClose : onOpen}
          />
          <HStack alignItems={'center'} fontWeight={700}>
            <HStack display={{ base: 'none', lg: 'flex' }}>
              {routes.map((_route, index) => (
                <NavLink key={_route.path + index} _route={_route} onClose={onClose} />
              ))}
              {!user && <NavLink _route={{ path: '/sign-in', name: 'Login' }} onClose={onClose} />}
            </HStack>
          </HStack>
          <Flex alignItems={'center'}>
            <Box ms='auto' w={{ sm: '100%', md: 'unset' }}>
              <NavbarLinks
                onOpen={props.onOpen}
                logoText={props.logoText}
                secondary={props.secondary}
                fixed={props.fixed}
              />
            </Box>
          </Flex>
        </Flex>

        {isOpen ? (
          <Box pb={4} display={{ lg: 'none' }}>
            <Stack as={'nav'} spacing={4}>
              {routes.map((_route, index) => (
                <NavLink key={_route.path + index} _route={_route} onClose={onClose} />
              ))}
              {!user && <NavLink _route={{ path: '/sign-in', name: 'Login' }} onClose={onClose} />}
            </Stack>
          </Box>
        ) : null}
      </Box>
      <Box bg={navbarBg} px={4}>
        <Flex w="100%" h={16} alignItems={'center'} justifyContent={'center'}>
          <HStack alignItems={'center'} flexDir={{ base: 'column', '2sm': 'row' }}>
            <Text color={textColor} fontSize={{ md: "20px", "2sm": '16px', base: '14px' }} fontWeight={{ md: 'extrabold', '2sm': 'semibold', base: 'bold' }} mr={{ base: 2, md: 4 }}>
              Featured Products:
            </Text>
            <HStack>
              {(featuredProducts && featuredProducts.top) ? featuredProducts.top.map((product, index) => (
                <Link key={product.title + index} href={product.link} target='_blank'>
                  <Text
                    mr={{ base: 2, md: 4 }}
                    fontSize={{ md: "20px", "2sm": '16px', base: '14px' }}
                    color={'blue.500'}
                    textDecor={'underline'}
                  >
                    {product.title}
                  </Text>
                </Link>
              )) : <Skeleton height={'20px'} maxW={'md'} w={'120px'} />}
            </HStack>
          </HStack>
        </Flex>
      </Box>
    </>
  )
}