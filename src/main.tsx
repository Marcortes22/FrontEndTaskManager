import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css';
import AppProvider from './Providers/AppProvider';
import Auth from './Auth/Auth';
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AppProvider>
      <Auth>
        <App />
      </Auth>
    </AppProvider>
  </StrictMode>,
);
