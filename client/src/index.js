import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { SidebarProvider } from './context/SidebarContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <SidebarProvider>
    <App />
    </SidebarProvider>
  </React.StrictMode>
);