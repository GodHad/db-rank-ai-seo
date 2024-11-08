import { Box } from '@chakra-ui/react';
import 'ckeditor5/ckeditor5.css';

export default ({ content }) => {

    return (
        <Box className='no-border-editor ck-content' dangerouslySetInnerHTML={{__html: content}} />
    )
}