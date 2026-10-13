import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import {BrowserRouter} from 'react-router-dom';
import {MotionConfig} from 'motion/react';
import {Analytics} from '@vercel/analytics/react';
import App from './App.tsx';
import {ThemeProvider} from './context/ThemeContext';
import {loadClarity} from './lib/clarity';
import './index.css';

// Microsoft Clarity project for mansi-modi.vercel.app. The ID is public (it ships in the page
// either way); VITE_CLARITY_PROJECT_ID can override it, e.g. to point at a test project.
const CLARITY_PROJECT_ID = import.meta.env.VITE_CLARITY_PROJECT_ID || 'ywtpw4qf2p';

// Only track the production site, so local development and preview builds don't add noise.
if (window.location.hostname === 'mansi-modi.vercel.app') loadClarity(CLARITY_PROJECT_ID);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <ThemeProvider>
        {/* Skip movement for visitors who ask their OS for reduced motion. */}
        <MotionConfig reducedMotion="user">
          <App />
        </MotionConfig>
        {/* Page views, referrers, countries, devices; no cookies. Enable it in the Vercel dashboard. */}
        <Analytics />
      </ThemeProvider>
    </BrowserRouter>
  </StrictMode>,
);
