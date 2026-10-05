import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Work from './pages/Work';
import LifePage from './pages/LifePage';
import ContactPage from './pages/ContactPage';
import TalkPage from './pages/TalkPage';

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="work" element={<Work />} />
        <Route path="life" element={<LifePage />} />
        <Route path="contact" element={<ContactPage />} />
        <Route path="talks/:slug" element={<TalkPage />} />
        <Route path="*" element={<Home />} />
      </Route>
    </Routes>
  );
}
