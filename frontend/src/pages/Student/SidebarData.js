import React from 'react';
import * as FaIcons from 'react-icons/fa';
import { GiTalk } from "react-icons/gi";

export const SidebarData = [
  {
    title: 'Home',
    path: '/student/dashboard',
    icon: <FaIcons.FaHome />,
    cName: 'nav-text'
  },
  {
    title: 'Academics',
    path: '/student/dashboard/academics',
    icon: <FaIcons.FaBook />,
    cName: 'nav-text'
  },
  {
    title: 'Events',
    path: '/student/dashboard/events',
    icon: <FaIcons.FaCalendar />,
    cName: 'nav-text'
  },
  {
    title: 'Notifications',
    path: '/student/dashboard/notifications',
    icon: <FaIcons.FaBell />,
    cName: 'nav-text'
  },
  {
    title: 'Community',
    path: '/student/dashboard/community',
    icon: <FaIcons.FaUsers />,
    cName: 'nav-text'
  },
  {
    title: 'TalkUMIT',
    path: '/student/dashboard/talk',
    icon: <GiTalk />,
    cName: 'nav-text'
  },
  {
    title: 'Payment and Fees',
    path: '/student/dashboard/payment',
    icon: <FaIcons.FaReceipt />,
    cName: 'nav-text'
  },
  {
    title: 'Results',
    path: '/student/dashboard/results',
    icon: <FaIcons.FaAward />,
    cName: 'nav-text'
  },
  {
    title: 'Raise a Ticket',
    path: '/student/dashboard/ticket',
    icon: <FaIcons.FaTicketAlt />,
    cName: 'nav-text'
  },
  {
    title: 'Sign Out',
    path: '/login',
    icon: <FaIcons.FaSignOutAlt />,
    cName: 'nav-text'
  }
];
