// Chakra Imports
import {
    Button,
    Flex,
    Icon,
    Image,
    Menu,
    MenuButton,
    MenuList,
    useColorModeValue,
    useColorMode,
  } from '@chakra-ui/react';
  // Custom Components
  import PropTypes from 'prop-types';
  import React from 'react';
  // Assets
  import navImage from '../../assets/img/layout/Navbar.png';
  import { MdInfoOutline } from 'react-icons/md';
  import { IoMdMoon, IoMdSunny } from 'react-icons/io';
  export default function HeaderLinks(props) {
    const { secondary } = props;
    const { colorMode, toggleColorMode } = useColorMode();
    // Chakra Color Mode
    const navbarIcon = useColorModeValue('gray.400', 'white');
    let menuBg = useColorModeValue('white', 'navy.800');
    const shadow = useColorModeValue(
      '14px 17px 40px 4px rgba(112, 144, 176, 0.18)',
      '14px 17px 40px 4px rgba(112, 144, 176, 0.06)',
    );
  
    return (
      <Flex
        w={{ sm: '100%', md: 'auto' }}
        alignItems="center"
        flexDirection="row"
        bg={menuBg}
        flexWrap={secondary ? { base: 'wrap', md: 'nowrap' } : 'unset'}
        p="10px"
        borderRadius="30px"
        boxShadow={shadow}
      >

        <Menu>
          <MenuButton p="0px">
            <Icon
              mt="6px"
              as={MdInfoOutline}
              color={navbarIcon}
              w="18px"
              h="18px"
              me="10px"
            />
          </MenuButton>
          <MenuList
            boxShadow={shadow}
            p="20px"
            me={{ base: '30px', md: 'unset' }}
            borderRadius="20px"
            bg={menuBg}
            border="none"
            mt="22px"
            minW={{ base: 'unset' }}
            maxW={{ base: '360px', md: 'unset' }}
          >
            <Image src={navImage} borderRadius="16px" mb="28px" />
          </MenuList>
        </Menu>
  
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
      </Flex>
    );
  }
  
  HeaderLinks.propTypes = {
    variant: PropTypes.string,
    fixed: PropTypes.bool,
    secondary: PropTypes.bool,
    onOpen: PropTypes.func,
  };
  