import React from 'react';
import './style.css';
import logo from '../../img/logo.png';
import logoWhite from '../../img/logo-white.png';
import { ThemeSwitch } from '../ThemeSwitch';
import { NavLink } from '../NavLink';

export const Header = ({ darkMode, setDarkMode }) => {
  const handleThemeChange = (e) => {
    setDarkMode(e.target.checked);
  };

  return (
    <header className="page-header">
      <nav className="navlink-wrapper">
        <NavLink href="/" text="Home" />
        <NavLink href="/scanning" text="Scan" />
      </nav>
        <a className="logo" href="/">
          <img src={darkMode ? logoWhite : logo} alt="positive choice logo" />
        </a>
      <ThemeSwitch darkMode={darkMode} handleThemeChange={handleThemeChange} />
    </header>
  );
};
