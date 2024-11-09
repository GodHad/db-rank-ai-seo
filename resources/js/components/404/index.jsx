import { Box, Heading, Text, Button } from '@chakra-ui/react'
import { Link } from '@inertiajs/react'

export default function NotFound() {
    return (
        <Box textAlign="center" py={10} px={6}>
            <Heading
                display="inline-block"
                as="h2"
                size="2xl"
                bgGradient='linear-gradient(15.46deg, #2ac349 26.3%, #018cc1 86.4%) !important'
                backgroundClip="text">
                404
            </Heading>
            <Text fontSize="18px" mt={3} mb={2}>
                Page Not Found
            </Text>
            <Text color={'gray.500'} mb={6}>
                The page you&apos;re looking for does not seem to exist
            </Text>
            <Link href={'/'}>
                <Button
                    colorScheme="teal"
                    bgGradient='linear-gradient(15.46deg, #2ac349 26.3%, #018cc1 86.4%) !important'
                    color="white"
                    variant="solid">
                    Go to Home
                </Button>
            </Link>
        </Box>
    )
}