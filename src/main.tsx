import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { LandingPage } from './components/LandingPage.tsx'
import { LanguageProvider } from './context/LanguageContext'

// Route based on host:
// djtechnyc.com (or www.djtechnyc.com) -> LandingPage
// park.djtechnyc.com or any other subdomain -> Full StreetParkingNYC App
// Also supports ?view=landing or ?view=app for local testing
const urlParams = typeof window !== 'undefined' ? new URLSearchParams(window.location.search) : null;
const forceView = urlParams?.get('view');
const host = typeof window !== 'undefined' ? window.location.hostname.toLowerCase() : '';
const isRootLandingDomain = (host === 'djtechnyc.com' || host === 'www.djtechnyc.com' || forceView === 'landing') && forceView !== 'app';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {isRootLandingDomain ? (
      <LandingPage />
    ) : (
      <LanguageProvider>
        <App />
      </LanguageProvider>
    )}
  </StrictMode>,
)

