import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css';
import AppProvider from './Providers/AppProvider';
import Auth from './Auth/Auth';
import { Toaster } from 'react-hot-toast';
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AppProvider>
      <Auth>
        <Toaster />
        <App />
      </Auth>
    </AppProvider>
  </StrictMode>,
);
