import React from 'react';
import ReactDOM from 'react-dom/client';
import { io } from 'socket.io-client';
import App from './App.tsx';
import './index.css';

export const socket = io();

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
