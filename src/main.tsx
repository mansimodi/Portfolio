import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import {BrowserRouter} from 'react-router-dom';
import {MotionConfig} from 'motion/react';
import {Analytics} from '@vercel/analytics/react';
import App from './App.tsx';
import {ThemeProvider} from './context/ThemeContext';
import {loadClarity} from './lib/clarity';
import './index.css';

loadClarity(import.meta.env.VITE_CLARITY_PROJECT_ID);

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
