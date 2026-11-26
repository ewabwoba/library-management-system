import { ArrowUpRight, BookOpen, CalendarDays } from 'lucide-react';
import { Link } from 'react-router-dom';

function initials(title = '') {
  return title.trim().split(/\s+/).slice(0, 2).map((part) => part[0]).join('').toUpperCase() || 'BK';
}

export default function BookCard({ book }) {
  const genreName = book.genre?.name || book.genreName || 'General';
  const year = book.publishedYear || book.publicationYear;

  return (
    <article className="book-card">
      <Link className="book-cover" to={`/books/${book.id}`} aria-label={`View ${book.title}`}>
        <span className="cover-mark"><BookOpen size={25} /></span>
        <span className="cover-initials">{initials(book.title)}</span>
        <span className="cover-caption">THE LIBRARY COLLECTION</span>
      </Link>
      <div className="book-card-content">
        <span className="eyebrow">{genreName}</span>
        <h3><Link to={`/books/${book.id}`}>{book.title}</Link></h3>
        <p className="book-author">by {book.author || 'Unknown author'}</p>
        <div className="book-card-meta">
          {year && <span><CalendarDays size={14} /> {year}</span>}
          <span className={book.available === false ? 'availability unavailable' : 'availability'}>
            {book.available === false ? 'Unavailable' : 'Available'}
          </span>
        </div>
        <Link className="card-link" to={`/books/${book.id}`}>
          View details <ArrowUpRight size={16} />
        </Link>
      </div>
    </article>
  );
}
