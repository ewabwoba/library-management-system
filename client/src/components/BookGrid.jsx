
import { useCallback, useEffect, useState } from 'react';
import { BookOpen, RefreshCw } from 'lucide-react';
import BookCard from './BookCard.jsx';
import BookSkeleton from './BookSkeleton.jsx';
import { getBooks, getErrorMessage } from '../services/bookService.js';

export default function BookGrid({ genreId, search, sortBy }) {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const loadBooks = useCallback(async (signal) => {
    setLoading(true);
    setError('');

    try {
      const results = await getBooks({
        genreId,
        search,
        signal,
      });

      if (!signal?.aborted) {
        setBooks(results);
      }
    } catch (requestError) {
      if (
        !signal?.aborted &&
        requestError.code !== 'ERR_CANCELED'
      ) {
        setError(getErrorMessage(requestError));
      }
    } finally {
      if (!signal?.aborted) {
        setLoading(false);
      }
    }
  }, [genreId, search]);

  useEffect(() => {
    const controller = new AbortController();

    loadBooks(controller.signal);

    return () => controller.abort();
  }, [loadBooks]);

  const sortedBooks = [...books].sort((a, b) => {
    const field = sortBy === 'author' ? 'author' : 'title';

    return String(a[field] || '').localeCompare(
      String(b[field] || '')
    );
  });

  if (loading) {
    return <BookSkeleton />;
  }

  if (error) {
    return (
      <div className="state-panel error-panel" role="alert">
        <div className="state-icon">
          <RefreshCw size={23} />
        </div>

        <h3>We couldn't load the catalog</h3>
        <p>{error}</p>

        <button
          className="button button-primary"
          onClick={() => loadBooks(undefined)}
        >
          Try again
        </button>
      </div>
    );
  }

  if (sortedBooks.length === 0) {
    return (
      <div className="state-panel">
        <div className="state-icon">
          <BookOpen size={25} />
        </div>

        <h3>No books found</h3>
        <p>
          Try another search term or choose a different genre.
        </p>
      </div>
    );
  }

  return (
    <div className="book-grid">
      {sortedBooks.map((book) => (
        <BookCard key={book.id} book={book} />
      ))}
    </div>
  );
}
