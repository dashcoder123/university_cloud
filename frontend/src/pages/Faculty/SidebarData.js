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
    title: 'Teaching Material',
    path: '/faculty/dashboard/material',
    icon: <FaIcons.FaChalkboardTeacher />,
    cName: 'nav-text'
  },
  {
    title: 'Activities',
    path: '/faculty/dashboard/activity',
    icon: <FaIcons.FaDice />,
    cName: 'nav-text'
  },
  {
    title: 'Records',
    path: '/faculty/dashboard/records',
    icon: <FaIcons.FaRegClipboard />,
    cName: 'nav-text'
  },
  {
    title: 'Community', // 👈 New Entry
    path: '/faculty/dashboard/Community',
    icon: <FaIcons.FaComments />,
    cName: 'nav-text'
  },
  {
    title: 'Sign Out',
    path: '/login',
    icon: <FaIcons.FaSignOutAlt />,
    cName: 'nav-text'
  }
];