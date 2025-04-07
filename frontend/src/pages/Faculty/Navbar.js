import React, { useState, useEffect } from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import { LuMenu } from "react-icons/lu";
import { Link } from 'react-router-dom';
import { SidebarData } from './SidebarData';
import './Navbar.css';
import { IconContext } from 'react-icons';
import umit from '../../assets/logowhite.png';

function Navbar() {
  const [sidebar, setSidebar] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  const showSidebar = () => setSidebar(!sidebar);

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
  }, [darkMode]);

  return (
    <>
      <IconContext.Provider value={{ color: '#fff' }}>
        <div className='navbar'>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <Link to='#' className='menu-bars'>
              <LuMenu onClick={showSidebar} />
            </Link>
            {/* 🌙/☀️ Toggle button */}
            <button className='toggle-btn' onClick={() => setDarkMode(!darkMode)}>
              {darkMode ? "☀️" : "🌙"}
            </button>
          </div>
          <img
            src={umit}
            alt="UMIT"
            className="umit-img"
          />
        </div>

        <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
          <ul className='nav-menu-items' onClick={showSidebar}>
            <li className='navbar-toggle'>
              <Link to='#' className='menu-bars'>
                <AiOutlineClose />
              </Link>
            </li>
            {SidebarData.map((item, index) => {
              return (
                <li key={index} className={item.cName}>
                  <Link to={item.path}>
                    {item.icon}
                    <span>{item.title}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </IconContext.Provider>
    </>
  );
}

export default Navbar;
