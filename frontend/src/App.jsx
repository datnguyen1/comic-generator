import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import ComicsPage from './pages/ComicsPage';
import CreateComicPage from './pages/CreateComicPage';
import ComicDetailPage from './pages/ComicDetailPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="comics" element={<ComicsPage />} />
        <Route path="comics/create" element={<CreateComicPage />} />
        <Route path="comics/:id" element={<ComicDetailPage />} />
      </Route>
    </Routes>
  );
}

export default App;
