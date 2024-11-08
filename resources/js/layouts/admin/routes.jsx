import React from 'react';

import { Icon } from '@chakra-ui/react';
import {
  MdPersonOutline,
  MdTranslate,
  MdAttachMoney,
  MdSearch,
  MdOutlineQuestionAnswer,
  MdOutlineImage,
  MdOutlineStorage,
  MdOutlineCommentBank,
  MdLockOutline,
  MdOutlineFavoriteBorder
} from 'react-icons/md';

const routes = [
  {
    name: 'Banners',
    layout: '/admin',
    path: '/banner',
    icon: <Icon as={MdOutlineImage} width={'20px'} height={'20px'} color='inherit' />,
  },
  {
    name: 'Vendors',
    layout: '/admin',
    path: '/vendors',
    icon: <Icon as={MdPersonOutline} width="20px" height="20px" color="inherit" />,
  },
  {
    name: 'DBMS',
    layout: '/admin',
    path: '/default',
    icon: <Icon as={MdOutlineStorage} width={"20px"} height={"20px"} color="inherit" />,
  },
  {
    name: 'Encyclopedias',
    layout: '/admin',
    path: '/encyclopedia',
    icon: <Icon as={MdTranslate} width={"20px"} height={"20px"} color="inherit" />,
  },
  {
    name: 'Blogs',
    layout: '/admin',
    path: '/blog',
    icon: <Icon as={MdOutlineCommentBank} width={"20px"} height={"20px"} color="inherit" />,
  },
  {
    name: 'Sponsors',
    layout: '/admin',
    path: '/sponsor',
    icon: <Icon as={MdAttachMoney} width={"20px"} height={"20px"} color="inherit" />,
  },
  {
    name: 'Featured Products',
    layout: '/admin',
    path: '/featured-products',
    icon: <Icon as={MdOutlineFavoriteBorder} width="20px" height="20px" color="inherit" />,
  },
  {
    name: 'Meta Data',
    layout: '/admin',
    path: '/meta-data',
    icon: <Icon as={MdSearch} width="20px" height="20px" color="inherit" />,
  },
  {
    name: 'Suggested Questions',
    layout: '/admin',
    path: '/suggested-questions',
    icon: <Icon as={MdOutlineQuestionAnswer} width="20px" height="20px" color="inherit" />,
  },
  {
    name: 'Sign In',
    path: 'sign-in',
    icon: <Icon as={MdLockOutline} width="20px" height="20px" color="inherit" />,
  },
];

export default routes;
