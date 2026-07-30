import React from 'react';
import ReactDOM from 'react-dom/client';
import './style.css';
import './utils/i18n';
import CredentialForm from './components/CredentialForm';
import { Toaster } from 'react-hot-toast';
import { toasterConfig } from './utils/toastStyling.ts'; 
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Toaster {...toasterConfig} />
    <CredentialForm />
  </React.StrictMode>
);
