import React from 'react'
import * as FaI from 'react-icons/fa'
import * as AiI from 'react-icons/ai'
import * as IoI from 'react-icons/io'
import * as RiI from 'react-icons/ri'
import * as HiI from 'react-icons/hi'

export const SideNavBarData = [
    {
        title: 'Trang chủ',
        path: '/Home',
        icon: <HiI.HiHome />,
    },
    {
        title: 'Reports',
        path: '/reports',
        icon: <IoI.IoIosPaper />,
    },
    {
        title: 'Products',
        path: '/products',
        icon: <FaI.FaCartPlus />
    },
];