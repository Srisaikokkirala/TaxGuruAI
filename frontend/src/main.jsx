import React from 'react';
import ReactDOM from 'react-dom/client';
import { Toaster } from 'react-hot-toast';
import { ClerkProvider } from '@clerk/clerk-react';
import App from './App';
import ClerkSetupScreen from './components/ClerkSetupScreen';
import './index.css';

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;
const isPlaceholderKey = !PUBLISHABLE_KEY || 
  PUBLISHABLE_KEY.trim() === '' || 
  PUBLISHABLE_KEY === 'pk_test_YOUR_CLERK_PUBLISHABLE_KEY' || 
  PUBLISHABLE_KEY.includes('YOUR_CLERK_');

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {isPlaceholderKey ? (
      <ClerkSetupScreen />
    ) : (
      <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl="/">
        <App />
      </ClerkProvider>
    )}
    <Toaster
      position="top-right"
      toastOptions={{
        duration: 3200,
        style: {
          background: '#10182b',
          color: '#f5f7fb',
          border: '1px solid rgba(148, 163, 184, 0.18)',
        },
      }}
    />
  </React.StrictMode>
);
