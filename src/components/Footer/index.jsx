import React from 'react';
import './style.css';
import heart from '../../img/heart_icon.png';

export const Footer = () => (
  <footer>
    <div className="footer-container">
      <p class="footer-text">Made with <img src={heart} class="icon-heart" /> by Anna Kopylova © 2023 </p>
    </div>
  </footer>
);
