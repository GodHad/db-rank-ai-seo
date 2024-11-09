import React from "react";

import { Flex, Box } from "@chakra-ui/react";
import { HSeparator } from "../../separator/Separator";
import logo from '../../../assets/img/auth/logo.png';
import logo_black_text from '../../../assets/img/auth/logo_black_letter.png';
import { useColorMode } from "@chakra-ui/react";
import { Link } from "react-router-dom";

export function SidebarBrand() {
  const { colorMode } = useColorMode();
  return (
    <Flex align='center' direction='column'>
      <Link to={"/"}>
        <Box
          bg={`url(${colorMode === 'light' ? logo_black_text : logo})`}
          bgSize='cover'
          borderRadius='16px'
          h='175px'
          w='175px'
          my='32px'
        />
      </Link>
      <HSeparator mb='20px' />
    </Flex>
  );
}

export default SidebarBrand;
