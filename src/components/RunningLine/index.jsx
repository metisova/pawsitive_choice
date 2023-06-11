import React from 'react';
import './style.css';

export const RunningLine = ({ speed }) => {
  const runningText =
    'this project aims to increase awareness about animal testing this project aims to increase awareness about animal testing\u00A0';

  return (
    <p className="running-line">
      <span className={`running-line-text speed${speed}`}>{runningText}</span>
      <span className={`running-line-text speed${speed + 1}`}>
        {runningText}
      </span>
    </p>
  );
};
