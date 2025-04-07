import React from 'react';
import * as FaIcons from 'react-icons/fa';

export const SidebarData = [
  {
    title: 'Home',
    path: '/staff/dashboard',
    icon: <FaIcons.FaHome />,
    cName: 'nav-text'
  },
  {
    title: 'Events',
    path: '/staff/dashboard/events',
    icon: <FaIcons.FaCalendar />,
    cName: 'nav-text'
  },
  {
    title: 'Notifications',
    path: '/staff/dashboard/notifications',
    icon: <FaIcons.FaBell />,
    cName: 'nav-text'
  },
  {
    title: 'Records',
    path: '/staff/dashboard/records',
    icon: <FaIcons.FaRegClipboard />,
    cName: 'nav-text'
  },
  {
    title: 'Sign Out',
    path: '/login',
    icon: <FaIcons.FaSignOutAlt />,
    cName: 'nav-text'
  }
];