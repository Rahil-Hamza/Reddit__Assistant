import React from 'react';
import ReactDOM from 'react-dom/client';
import './style.css';
import './utils/i18n';
import CredentialForm from './components/CredentialForm';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <CredentialForm />
  </React.StrictMode>
);
