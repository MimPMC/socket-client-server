import { MantineProvider } from '@mantine/core';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, createRoutesFromElements, Route } from '../node_modules/react-router-dom/dist/index';
import App from './App';
import { SocketProvider } from './context/SocketContext';
import './index.css';
import { HomePage } from './pages/HomePage';
import { LogInPage } from './pages/LogInPage';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index element={<LogInPage />} />
      <Route path="/homepage" element={<HomePage />} />
    </Route>
  )
)

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <MantineProvider>
    <SocketProvider>
      <App />
    </SocketProvider>
    </MantineProvider>
  </React.StrictMode>
);
