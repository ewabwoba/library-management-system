import { Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage.jsx';
import BookDetail from './pages/BookDetail.jsx';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/books/:id" element={<BookDetail />} />
      <Route path="*" element={<HomePage />} />
    </Routes>
  );
}
