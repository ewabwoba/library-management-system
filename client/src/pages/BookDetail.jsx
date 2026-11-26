import { useEffect, useState } from 'react';
import { ArrowLeft, BookOpen, CalendarDays, Hash, UserRound } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import { getBookById, getErrorMessage } from '../services/bookService.js';

export default function BookDetail() {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let active = true;
    setLoading(true);
    setError('');
    getBookById(id)
      .then((result) => { if (active) setBook(result); })
      .catch((requestError) => { if (active) setError(getErrorMessage(requestError)); })
      .finally(() => { if (active) setLoading(false); });
    return () => { active = false; };
  }, [id]);

  return (
    <div className="app-shell detail-shell">
      <header className="site-header">
        <Link className="brand" to="/"><span className="brand-icon"><BookOpen size={21} /></span><span>stacks<span className="brand-period">.</span></span></Link>
        <Link className="back-link" to="/"><ArrowLeft size={16} /> Back to catalog</Link>
      </header>

      <main className="detail-main">
        {loading ? (
          <div className="state-panel detail-state"><div className="spinner" /><h3>Loading book details...</h3></div>
        ) : error ? (
          <div className="state-panel error-panel detail-state" role="alert"><h3>Unable to load this book</h3><p>{error}</p><Link className="button button-primary" to="/">Return to catalog</Link></div>
        ) : !book ? (
          <div className="state-panel detail-state"><h3>Book not found</h3><p>This book may have been removed from the catalog.</p><Link className="button button-primary" to="/">Return to catalog</Link></div>
        ) : (
          <div className="detail-layout">
            <div className="detail-cover">
              <div className="detail-cover-inner"><BookOpen size={42} /><span>{book.title}</span><small>THE LIBRARY COLLECTION</small></div>
            </div>
            <article className="detail-content">
              <span className="section-kicker">{book.genre?.name || book.genreName || 'LIBRARY COLLECTION'}</span>
              <h1>{book.title}</h1>
              <p className="detail-author">by {book.author || 'Unknown author'}</p>
              <div className="detail-availability"><span className={book.available === false ? 'status-dot unavailable-dot' : 'status-dot'} />{book.available === false ? 'Currently unavailable' : 'Available to borrow'}</div>
              <div className="detail-facts">
                {book.publishedYear && <div><CalendarDays size={17} /><span><small>Published</small>{book.publishedYear}</span></div>}
                {book.isbn && <div><Hash size={17} /><span><small>ISBN</small>{book.isbn}</span></div>}
                <div><UserRound size={17} /><span><small>Author</small>{book.author || 'Not specified'}</span></div>
              </div>
              <div className="detail-description">
                <h2>About this book</h2>
                <p>{book.description || 'No description has been added for this title yet.'}</p>
              </div>
              <Link className="button button-secondary" to="/"><ArrowLeft size={16} /> Back to all books</Link>
            </article>
          </div>
        )}
      </main>
      <footer className="site-footer"><span>© {new Date().getFullYear()} Stacks Library</span><span>Made for curious minds.</span></footer>
    </div>
  );
}
