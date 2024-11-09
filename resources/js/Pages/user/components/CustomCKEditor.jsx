import { Box } from '@chakra-ui/react';
import 'ckeditor5/ckeditor5.css';

export default ({ content }) => {

    return (
        <Box className='no-border-editor ck-content'>
            <Box className='ck-editor__editable_inline' dangerouslySetInnerHTML={{__html: content}} />
        </Box> 
    )
}