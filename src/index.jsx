import React, { useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import './style.css';
import { RunningLine } from './components/RunningLine';
import { Header } from './components/Header';
import rabbitImage from './img/rabbit_new.png';
import cageImage from './img/cage.png';

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
      <Header darkMode={darkMode} setDarkMode={setDarkMode}/>
      <main>
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
