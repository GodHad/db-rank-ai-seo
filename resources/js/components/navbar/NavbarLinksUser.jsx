import {
  Button,
  Flex,
  Icon,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Text,
  Avatar,
  useColorModeValue,
  useColorMode,
} from '@chakra-ui/react';
import { FeaturedProductsSidebarResponsive } from '../featuredProductSidebar/Sidebar';
import PropTypes from 'prop-types';
import React, { useContext } from 'react';
import { IoMdMoon, IoMdSunny } from 'react-icons/io';
import { SearchBar } from './searchBar/SearchBar';
import { UserContext } from '@/contexts/UserContext';
import axios from '@/variables/axiosConfig';
import { Link } from '@inertiajs/react';
import { Inertia } from '@inertiajs/inertia';

export default function HeaderLinks(props) {
  const { secondary } = props;
  const { colorMode, toggleColorMode } = useColorMode();
  const navbarIcon = useColorModeValue('gray.400', 'white');
  const shadow = useColorModeValue(
    '14px 17px 40px 4px rgba(112, 144, 176, 0.18)',
    '14px 17px 40px 4px rgba(112, 144, 176, 0.06)',
  );
  const textColor = useColorModeValue('secondaryGray.900', 'white');
  const borderColor = useColorModeValue('#E6ECFA', 'rgba(135, 140, 189, 0.3)');
  const menuBg = useColorModeValue('white', 'navy.800');

  const { user, setUser } = useContext(UserContext);

  const handleLogout = async () => {
    if (typeof window === 'undefined') return;
    await axios.get('/api/logout');
    Inertia.visit('/');
    setUser(null)
  }

  return (
    <Flex
      w={{ sm: '100%', md: 'auto' }}
      alignItems="center"
      flexDirection="row"
      flexWrap={secondary ? { base: 'wrap', md: 'nowrap' } : 'unset'}
      p="10px"
      borderRadius="30px"
    >
      <SearchBar
        mb={() => {
          if (secondary) {
            return { base: '10px', md: 'unset' };
          }
          return 'unset';
        }}
        me="10px"
        borderRadius="30px"
      />
      <Button
        variant="no-hover"
        bg="transparent"
        p="0px"
        minW="unset"
        minH="unset"
        h="18px"
        w="max-content"
        aria-label='Toggle Color Mode button'
        onClick={toggleColorMode}
      >
        <Icon
          me="10px"
          h="18px"
          w="18px"
          color={navbarIcon}
          as={colorMode === 'light' ? IoMdMoon : IoMdSunny}
        />
      </Button>
      <FeaturedProductsSidebarResponsive />
      {user && (<Menu>
        <MenuButton p="0px">
          <Avatar
            _hover={{ cursor: 'pointer' }}
            color="white"
            name={user ? user.name : ''}
            bg="#11047A"
            size="sm"
            w="40px"
            h="40px"
          />
        </MenuButton>
        <MenuList
          boxShadow={shadow}
          p="0px"
          mt="10px"
          borderRadius="20px"
          bg={menuBg}
          border="none"
          position={'relative'}
          zIndex={1000}
        >
          <Flex w="100%" mb="0px" flexDir={'column'} borderBottom="1px solid" borderColor={borderColor}>
            <Text
              ps="20px"
              pt="16px"
              pb="10px"
              w="100%"
              fontSize="sm"
              fontWeight="700"
              color={textColor}
            >
              👋&nbsp; Hey, {user.name}
            </Text>
            <Link href={'/profile'}>
              <MenuItem
                _hover={{ bg: 'none' }}
                _focus={{ bg: 'none' }}
                bg={'transparent'}
                borderRadius="8px"
                ps="20px"
                pb="10px"
              >
                <Text fontSize="sm">Profile</Text>
              </MenuItem>
            </Link>
          </Flex>
          <Flex flexDirection="column" p="10px">
            <MenuItem
              _hover={{ bg: 'none' }}
              _focus={{ bg: 'none' }}
              bg={'transparent'}
              color="red.400"
              borderRadius="8px"
              px="14px"
              onClick={handleLogout}
            >
              <Text fontSize="sm">Log out</Text>
            </MenuItem>
          </Flex>
        </MenuList>
      </Menu>
      )}
    </Flex>
  );
}

HeaderLinks.propTypes = {
  variant: PropTypes.string,
  fixed: PropTypes.bool,
  secondary: PropTypes.bool,
  onOpen: PropTypes.func,
};
