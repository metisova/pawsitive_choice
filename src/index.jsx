import React, { useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import './style.css';
import { Header } from './components/Header';
import { HomePage } from './components/HomePage';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { Scanner } from './components/Scanner';

const router = createBrowserRouter([
  { path: '/', element: <HomePage /> },
  { path: '/scanning', element: <Scanner /> }
]);

const App = () => {
  const [darkMode, setDarkMode] = useState(false);

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
      <Header darkMode={darkMode} setDarkMode={setDarkMode} />
      <RouterProvider router={router} />
    </>
  );
};

createRoot(document.querySelector('#app')).render(<App />);
