import React, { useEffect, useState } from "react";

// chakra imports
import {
  Box,
  Flex,
  Drawer,
  DrawerBody,
  Icon,
  useColorModeValue,
  DrawerOverlay,
  useDisclosure,
  DrawerContent,
  DrawerCloseButton,
} from "@chakra-ui/react";
import Content from "./components/Content";
import {
  renderThumb,
  renderTrack,
  renderView,
} from "../scrollbar/Scrollbar";
import Card from '../card/Card';
import { Scrollbars } from "react-custom-scrollbars-2";
import PropTypes from "prop-types";
import { MdFavoriteBorder } from "react-icons/md";

function FeaturedProductsSidebar() {

  let variantChange = "0.2s linear";
  let shadow = useColorModeValue(
    "14px 17px 40px 4px rgba(112, 144, 176, 0.08)",
    "unset"
  );
  let sidebarMargins = "0px";
  const borderColor = useColorModeValue('gray.200', 'whiteAlpha.100');

  // const [top, setTop] = useState(268);
  // useEffect(() => {
  //   const handleScroll = () => {
  //     const offset = window.scrollY;
  //     setTop(Math.max(268 - offset, 0));
  //   };

  //   window.addEventListener('scroll', handleScroll);

  //   return () => {
  //     window.removeEventListener('scroll', handleScroll);
  //   };
  // }, []);

  return (
    <Box
      display={{ lg: "block", base: 'none' }}
      position={"relative"}
      top={`${30}px`}
      right={2}
      overflow={'auto'}
      mb={'50px'}
      sx={{
        '&::-webkit-scrollbar': {
          width: '8px',
          height: '8px',
          backgroundColor: 'transparent', // Change to transparent or the desired color
        },
        '&::-webkit-scrollbar-thumb': {
          backgroundColor: borderColor, // Color for the scrollbar thumb
          borderRadius: '20px',
        },
        '&::-webkit-scrollbar-track': {
          backgroundColor: 'rgba(0, 0, 0, 0.15)', // Track color, adjust as needed
          borderRadius: '20px',
        },
      }}
      borderRadius='30px'
    >
      <Card
        transition={variantChange}
        w='300px'
        m={sidebarMargins}
        float={"right"}
        boxShadow={shadow}
      >
        <Content />
      </Card>
    </Box>
  );
}

export function FeaturedProductsSidebarResponsive() {
  let sidebarBackgroundColor = useColorModeValue("white", "navy.800");
  let menuColor = useColorModeValue("gray.400", "white");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef();

  return (
    <Flex display={{ sm: "flex", lg: "none" }} alignItems='center'>
      <Flex ref={btnRef} w='max-content' h='max-content' onClick={onOpen}>
        <Icon
          as={MdFavoriteBorder}
          color={menuColor}
          my='auto'
          w='20px'
          h='20px'
          me='10px'
          _hover={{ cursor: "pointer" }}
        />
      </Flex>
      <Drawer
        isOpen={isOpen}
        onClose={onClose}
        placement={"right"}
        finalFocusRef={btnRef}>
        <DrawerOverlay />
        <DrawerContent w='285px' maxW='285px' bg={sidebarBackgroundColor}>
          <DrawerCloseButton
            zIndex='3'
            onClose={onClose}
            _focus={{ boxShadow: "none" }}
            _hover={{ boxShadow: "none" }}
          />
          <DrawerBody maxW='285px' px='0rem' pb='0'>
            <Scrollbars
              autoHide
              renderTrackVertical={renderTrack}
              renderThumbVertical={renderThumb}
              renderView={renderView}>
              <Content />
            </Scrollbars>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Flex>
  );
}

FeaturedProductsSidebar.propTypes = {
  logoText: PropTypes.string,
  routes: PropTypes.arrayOf(PropTypes.object),
  variant: PropTypes.string,
};

export default FeaturedProductsSidebar;
