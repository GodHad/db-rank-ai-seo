import {
  Box,
  chakra,
  Container,
  Stack,
  Text,
  useColorModeValue,
  VisuallyHidden,
} from '@chakra-ui/react'
import { FaLinkedin } from 'react-icons/fa'
import Logo from '@/components/navbar/components/Logo'
import { Link } from '@inertiajs/react';

const SocialButton = ({
  children,
  label,
  href,
}) => {
  return (
    <chakra.button
      bg={useColorModeValue('blackAlpha.100', 'whiteAlpha.100')}
      rounded={'full'}
      w={8}
      h={8}
      cursor={'pointer'}
      as={'a'}
      href={href}
      display={'inline-flex'}
      alignItems={'center'}
      justifyContent={'center'}
      transition={'background 0.3s ease'}
      _hover={{
        bg: useColorModeValue('blackAlpha.200', 'whiteAlpha.200'),
      }}>
      <VisuallyHidden>{label}</VisuallyHidden>
      {children}
    </chakra.button>
  )
}

export default function Footer() {
  return (
    <>
      <Container
        className='footer'
        as={Stack}
        maxW={'6xl'}
        py={4}
        spacing={4}
        justify={'center'}
        align={'center'}>
        <Logo />
        <Stack direction={'row'} spacing={6}>
          <Link href={'/'}>
            Home
          </Link>
          <Link href={'/aboutus'}>
            About us
          </Link>
          <Link href={'/blog'}>
            Blog
          </Link>
          <Link href={'/contact-us'}>
            Contact us
          </Link>
        </Stack>
      </Container>

      <Box
        borderTopWidth={1}
        borderStyle={'solid'}
        borderColor={useColorModeValue('gray.200', 'gray.700')}>
        <Container
          as={Stack}
          maxW={'6xl'}
          py={4}
          direction={{ base: 'column', md: 'row' }}
          spacing={4}
          justify={{ base: 'center', md: 'space-between' }}
          align={{ base: 'center', md: 'center' }}>
          <Text>© DB Rank AI 2024</Text>
          <Text>Powered by <a href='http://massreach.co.uk/' target={'_blank'} style={{ color: '#2b6cb0' }}>Mass Reach</a></Text>
          <Stack direction={'row'} spacing={6} position={'relative'} zIndex={1000}>
            <SocialButton label={'LinkedIn'} href={'https://linkedin.com/company/db-rank'}>
              <FaLinkedin />
            </SocialButton>
          </Stack>
        </Container>
      </Box>
    </>
  )
}