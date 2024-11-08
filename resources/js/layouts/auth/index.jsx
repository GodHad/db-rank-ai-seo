import React, { useContext, useState, Suspense, lazy, useEffect } from 'react';
import { Box, Spinner, Flex, useColorModeValue } from '@chakra-ui/react';
import { SidebarContext } from '@/contexts/SidebarContext';
import { UserContext } from '@/contexts/UserContext';
const SignIn = lazy(() => import('@/Pages/auth/signIn'));

export default function Auth() {
  const [toggleSidebar, setToggleSidebar] = useState(false);
  const { user } = useContext(UserContext);

  useEffect(() => {
    if (typeof window === "undefined") return ;
    if (user && user.admin) window.location.href = '/admin';
    if (user) window.location.href = '/';
  }, [user])

  const authBg = useColorModeValue('white', 'navy.900');
  return (
    <Box>
      <SidebarContext.Provider
        value={{
          toggleSidebar,
          setToggleSidebar,
        }}
      >
        <Box
          bg={authBg}
          float="right"
          minHeight="100vh"
          height="100%"
          position="relative"
          w="100%"
          transition="all 0.33s cubic-bezier(0.685, 0.0473, 0.346, 1)"
          transitionDuration=".2s, .2s, .35s"
          transitionProperty="top, bottom, width"
          transitionTimingFunction="linear, linear, ease"
        >
          <Box mx="auto" minH="100vh">
            <Suspense fallback={<Flex justifyContent={'center'} minH="300px" alignItems="center"><Spinner /></Flex>}>
              <SignIn />
            </Suspense>
          </Box>
        </Box>
      </SidebarContext.Provider>
    </Box>
  );
}
