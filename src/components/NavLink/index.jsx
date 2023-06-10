import React from 'react';
import './style.css';

export const NavLink = ({ href, text }) => {
  return (
    <a className="navlink" href={href}>
      {text}
    </a>
  );
};
