import { Routes, Route, Navigate, useParams } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Work from './pages/Work';
import LifePage from './pages/LifePage';
import ContactPage from './pages/ContactPage';
import SpeakingPage from './pages/SpeakingPage';
import TalkPage from './pages/TalkPage';

/** Talks first shipped under /talks/:slug — keep those links working. */
function LegacyTalkRedirect() {
  const { slug } = useParams();
  return <Navigate to={`/speaking/${slug ?? ''}`} replace />;
}

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="work" element={<Work />} />
        <Route path="life" element={<LifePage />} />
        <Route path="contact" element={<ContactPage />} />
        <Route path="speaking" element={<SpeakingPage />} />
        <Route path="speaking/:slug" element={<TalkPage />} />
        <Route path="talks/:slug" element={<LegacyTalkRedirect />} />
        <Route path="*" element={<Home />} />
      </Route>
    </Routes>
  );
}
