import React from 'react';
import './style.css';

export const ThemeSwitch = ({ darkMode, handleThemeChange }) => {
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
