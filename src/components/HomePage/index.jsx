import React from 'react';
import './style.css';
import { RunningLine } from '../RunningLine';
import rabbitImage from '../../img/rabbit_new.png';

export const HomePage = ({ setDarkMode }) => {
  const handleRabbitClick = () => {
    setTimeout(() => {
      setDarkMode(true);
    }, 1000);
  };

  return (
    <>
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
        </div>
      </main>
    </>
  );
};
