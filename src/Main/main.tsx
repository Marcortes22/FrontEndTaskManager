import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from '../App/App';
import './index.css';
// import AppProvider from './Providers/AppProvider';

import { Toaster } from 'react-hot-toast';
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Toaster />
    <App />
  </StrictMode>,
);
