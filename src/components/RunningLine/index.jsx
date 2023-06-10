import React from 'react';
import './style.css';

export const RunningLine = ({ speed }) => {
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
