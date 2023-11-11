import React from 'react';
// import { BrowserRouter } from 'react-router-dom';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import styles from './styles/style.css';

const root = createRoot(document.querySelector('#root'));
root.render(
  <React.StrictMode>
      <App/>
  </React.StrictMode>
)