// main.jsx
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ClerkProvider } from '@clerk/clerk-react'
import './index.css'
import App from './App.jsx'

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

// Completely disable CAPTCHA in development
const captchaDisabled = import.meta.env.DEV;

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ClerkProvider
      publishableKey={PUBLISHABLE_KEY}
      captchaOptions={{ enabled: !captchaDisabled }} // Updated this line
      appearance={{
        variables: {
          colorPrimary: '#3b82f6',
          colorText: '#1f2937',
          colorBackground: '#f9fafb',
        }
      }}
    >
      <App />
    </ClerkProvider>
  </StrictMode>
)