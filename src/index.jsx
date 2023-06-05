import React from 'react';
import { createRoot } from 'react-dom/client';
import './style.css';

import logo from './img/logo.png';
import rabbitImage from './img/rabbit_new.png';

const App = () => {
  return (
    <>
      <header className="page-header">
        <nav>
          <a className="navlink" href="#Home">
            Home
          </a>
          <a className="navlink" href="#about projekt">
            About
          </a>
        </nav>
        <div className="logo">
          <img src={logo} alt="positive choice logo" />
        </div>
        <div className="theme-switch-wrapper">
          <span>Switch to the dark mode</span>
          <label className="theme-switch" htmlFor="checkbox">
            <input type="checkbox" id="checkbox" />
            <div className="slider round"></div>
          </label>
        </div>
      </header>
      <main>
        {/* RUNNING LINE */}
        <div className="running-line-container">
          <p className="running-line">
            <span className="running-line-text speed1">
            this project aims to increase awareness about animal testing 3 this
            project aims to increase awareness about animal testing&nbsp;
            </span>
            <span className="running-line-text speed2">
            this project aims to increase awareness about animal testing 3 this
            project aims to increase awareness about animal testing&nbsp;
            </span>
          </p>
          <p className="running-line">
            <span className="running-line-text speed3">
            this project aims to increase awareness about animal testing 3 this
            project aims to increase awareness about animal testing&nbsp;
            </span>
            <span className="running-line-text speed4">
            this project aims to increase awareness about animal testing 3 this
            project aims to increase awareness about animal testing&nbsp;
            </span>
          </p>
          <p className="running-line">
            <span className="running-line-text speed5">
            this project aims to increase awareness about animal testing 3 this
            project aims to increase awareness about animal testing&nbsp;
            </span>
            <span className="running-line-text speed6">
            this project aims to increase awareness about animal testing 3 this
            project aims to increase awareness about animal testing&nbsp;
            </span>
          </p>
          <p className="running-line">
            <span className="running-line-text speed7">
            this project aims to increase awareness about animal testing 3 this
            project aims to increase awareness about animal testing&nbsp;
            </span>
            <span className="running-line-text speed8">
            this project aims to increase awareness about animal testing 3 this
            project aims to increase awareness about animal testing&nbsp;
            </span>
          </p>
          <div className="intro-img">
            <img src={rabbitImage} alt="Intro Image" />
          </div>
        </div>
      </main>
    </>
  );
};

createRoot(document.querySelector('#app')).render(<App />);
