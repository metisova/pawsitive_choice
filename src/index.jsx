import React, { useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import './style.css';

import logo from './img/logo.png';
import logoWhite from './img/logo-white.png';
import rabbitImage from './img/rabbit_new.png';
import cageImage from './img/cage.png';

const NavLink = ({ href, text }) => {
  return (
    <a className="navlink" href={href}>
      {text}
    </a>
  );
};

const ThemeSwitch = ({ darkMode, handleThemeChange }) => {
  return (
    <div className="theme-switch-wrapper">
      <span className="theme-switch-text">
        {darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
      </span>
      <label className="theme-switch" htmlFor="checkbox">
        <input
          type="checkbox"
          id="checkbox"
          onChange={handleThemeChange}
          checked={darkMode}
        />
        <div className="slider round"></div>
      </label>
    </div>
  );
};

const RunningLine = ({ speed }) => {
  return (
    <p className="running-line">
      <span className={`running-line-text speed${speed}`}>
        this project aims to increase awareness about animal testing 3 this
        project aims to increase awareness about animal testing&nbsp;
      </span>
      <span className={`running-line-text speed${speed + 1}`}>
        this project aims to increase awareness about animal testing 3 this
        project aims to increase awareness about animal testing&nbsp;
      </span>
    </p>
  );
};

const App = () => {
  const [cage, setCage] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  const handleRabbitClick = () => {
    setCage(true);
    setTimeout(() => {
      setDarkMode(true);
    }, 1000);
  };

  const handleCageClick = () => {
    setCage(false);
    setDarkMode(false);
  };

  const handleThemeChange = (e) => {
    setDarkMode(e.target.checked);
    setCage(!cage);
  };

  const switchTheme = () => {
    if (darkMode) {
      document.documentElement.setAttribute('data-theme', 'dark');
    } else {
      document.documentElement.setAttribute('data-theme', 'light');
    }
  };

  useEffect(() => {
    switchTheme();
  }, [darkMode]);

  return (
    <>
      <header className="page-header">
        <nav className="navlink-wrapper">
          <NavLink href="#Home" text="Home" />
          <NavLink href="#about" text="About" />
        </nav>
        <div className="logo">
          <img src={darkMode ? logoWhite : logo} alt="positive choice logo" />
        </div>
        <ThemeSwitch
          darkMode={darkMode}
          handleThemeChange={handleThemeChange}
        />
      </header>
      <main>
        {/* RUNNING LINE */}
        <div className="running-line-container">
          <RunningLine speed={1} />
          <RunningLine speed={3} />
          <RunningLine speed={5} />
          <RunningLine speed={7} />
          <div className="intro-img">
            <img
              className="rabbit-img"
              src={rabbitImage}
              alt="Rabbit"
              onClick={handleRabbitClick}
            />
          </div>
          {cage && (
            <div className="intro-img-top">
              <img
                className="cage-img"
                src={cageImage}
                alt="Cage"
                onClick={handleCageClick}
              />
            </div>
          )}
        </div>
      </main>
    </>
  );
};

createRoot(document.querySelector('#app')).render(<App />);
