import { Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import ComicsPage from './pages/ComicsPage';
import CreateComicPage from './pages/CreateComicPage';
import ComicDetailPage from './pages/ComicDetailPage';
import MangaAIPage from './pages/MangaAIPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="guide" element={<MangaAIPage />} />
        <Route path="manga-ai" element={<Navigate to="/guide" replace />} />
        <Route path="comics" element={<ComicsPage />} />
        <Route path="comics/create" element={<CreateComicPage />} />
        <Route path="comics/:id" element={<ComicDetailPage />} />
      </Route>
    </Routes>
  );
}

export default App;
