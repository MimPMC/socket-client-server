import { MantineProvider } from '@mantine/core';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from '../node_modules/react-router-dom/dist/index';
import App from './App';
import SocketProvider from './context/SocketContext';
import { UsernameProvider } from './context/UsernameContext';
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
      <UsernameProvider>
    <SocketProvider>
      <RouterProvider router={router} />
    </SocketProvider>
    </UsernameProvider>
    </MantineProvider>
  </React.StrictMode>
);
