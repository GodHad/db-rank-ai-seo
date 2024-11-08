import React from "react";

import { Flex, Box } from "@chakra-ui/react";

import logo from '../../../assets/img/auth/logo.png';
import logo_black_text from '../../../assets/img/auth/logo_black_letter.png';
import { useColorMode } from "@chakra-ui/react";
import { Link } from '@inertiajs/react';

export function Logo() {
  const { colorMode } = useColorMode();
  return (
    <Flex align='center' direction='column'>
      <Link href={"/"} aria-label="Go to homepage">
        <Box
          bg={`url(${colorMode === 'light' ? logo_black_text : logo})`}
          bgSize='cover'
          borderRadius='16px'
          h='100px'
          w='100px'
        />
      </Link>
    </Flex>
  );
}

export default Logo;
