import React from 'react';
import * as FaIcons from 'react-icons/fa';

export const SidebarData = [
  {
    title: 'Home',
    path: '/faculty/dashboard',
    icon: <FaIcons.FaHome />,
    cName: 'nav-text'
  },
  {
    title: 'Academics',
    path: '/faculty/dashboard/academics',
    icon: <FaIcons.FaBook />,
    cName: 'nav-text'
  },
  {
    title: 'Events',
    path: '/faculty/dashboard/events',
    icon: <FaIcons.FaCalendar />,
    cName: 'nav-text'
  },
  {
    title: 'Notifications',
    path: '/faculty/dashboard/notifications',
    icon: <FaIcons.FaBell />,
    cName: 'nav-text'
  },
  {
    title: 'Payment and Fees',
    path: '/faculty/dashboard/payment',
    icon: <FaIcons.FaReceipt />,
    cName: 'nav-text'
  },
  {
    title: 'Results',
    path: '/faculty/dashboard/results',
    icon: <FaIcons.FaAward />,
    cName: 'nav-text'
  }
];