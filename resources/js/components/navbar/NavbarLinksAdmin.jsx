import {
  Avatar,
  Button,
  Flex,
  Icon,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
  useColorModeValue,
  useColorMode,
} from '@chakra-ui/react';
import { Link } from '@inertiajs/react';
import { SearchBar } from './searchBar/SearchBar';
import { SidebarResponsive } from '../sidebar/Sidebar';
import PropTypes from 'prop-types';
import React, { useContext } from 'react';
import { IoMdMoon, IoMdSunny } from 'react-icons/io';
import { FaEthereum } from 'react-icons/fa';
import routes from '@/layouts/admin/routes';
import { UserContext } from '@/contexts/UserContext';
import axios from '@/variables/axiosConfig';
import { Inertia } from '@inertiajs/inertia';

export default function HeaderLinks(props) {
  const { user, setUser } = useContext(UserContext);
  const { secondary } = props;
  const { colorMode, toggleColorMode } = useColorMode();
  // Chakra Color Mode
  const navbarIcon = useColorModeValue('gray.400', 'white');
  let menuBg = useColorModeValue('white', 'navy.800');
  const textColor = useColorModeValue('secondaryGray.900', 'white');
  const ethColor = useColorModeValue('gray.700', 'white');
  const borderColor = useColorModeValue('#E6ECFA', 'rgba(135, 140, 189, 0.3)');
  const ethBg = useColorModeValue('secondaryGray.300', 'navy.900');
  const ethBox = useColorModeValue('white', 'navy.800');
  const shadow = useColorModeValue(
    '14px 17px 40px 4px rgba(112, 144, 176, 0.18)',
    '14px 17px 40px 4px rgba(112, 144, 176, 0.06)',
  );

  const handleLogout = async () => {
    await axios.get('/api/logout');
    Inertia.visit('/')
    setUser(null)
  }

  return (
    <Flex
      w={{ sm: '100%', md: 'auto' }}
      alignItems="center"
      justifyContent={'right'}
      flexDirection="row"
      bg={menuBg}
      flexWrap={secondary ? { base: 'wrap', md: 'nowrap' } : 'unset'}
      p="10px"
      borderRadius="30px"
      boxShadow={shadow}
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
      <Flex
        bg={ethBg}
        display={secondary ? 'flex' : 'none'}
        borderRadius="30px"
        ms="auto"
        p="6px"
        align="center"
        me="6px"
      >
        <Flex
          align="center"
          justify="center"
          bg={ethBox}
          h="29px"
          w="29px"
          borderRadius="30px"
          me="7px"
        >
          <Icon color={ethColor} w="9px" h="14px" as={FaEthereum} />
        </Flex>
        <Text
          w="max-content"
          color={ethColor}
          fontSize="sm"
          fontWeight="700"
          me="6px"
        >
          1,924
          <Text as="span" display={{ base: 'none', md: 'unset' }}>
            {' '}
            ETH
          </Text>
        </Text>
      </Flex>
      <SidebarResponsive routes={routes} />

      <Button
        variant="no-hover"
        bg="transparent"
        p="0px"
        minW="unset"
        minH="unset"
        h="18px"
        w="max-content"
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
      <Menu>
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
        {user ? (
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
                  w="100%"
                  pb="10px"
                >
                  <Text fontSize="sm" w={'full'}>Profile</Text>
                </MenuItem>
              </Link>
            </Flex>
            <Flex flexDirection="column" p="10px">
              <MenuItem
                _hover={{ bg: 'none' }}
                bg={'transparent'}
                _focus={{ bg: 'none' }}
                color="red.400"
                borderRadius="8px"
                px="14px"
                onClick={handleLogout}
              >
                <Text fontSize="sm">Log out</Text>
              </MenuItem>
            </Flex>
          </MenuList>
        ) : (
          <MenuList
            boxShadow={shadow}
            p="0px"
            mt="10px"
            borderRadius="20px"
            bg={menuBg}
            border="none"
          >
            <Flex flexDirection="column" p="10px">

              <MenuItem
                _hover={{ bg: 'none' }}
                bg={'transparent'}
                _focus={{ bg: 'none' }}
                borderRadius="8px"
                px="14px"
              >
                <Link href='/sign-in'>
                  <Text fontSize="sm">Log in</Text>
                </Link>
              </MenuItem>
            </Flex>
          </MenuList>
        )}
      </Menu>
    </Flex>
  );
}

HeaderLinks.propTypes = {
  variant: PropTypes.string,
  fixed: PropTypes.bool,
  secondary: PropTypes.bool,
  onOpen: PropTypes.func,
};
