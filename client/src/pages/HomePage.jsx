import { useCallback, useEffect, useState } from 'react';
import { BookOpen, LibraryBig, SlidersHorizontal } from 'lucide-react';
import SearchBar from '../components/SearchBar.jsx';
import GenreFilter from '../components/GenreFilter.jsx';
import BookGrid from '../components/BookGrid.jsx';
import { getGenres, getErrorMessage } from '../services/bookService.js';

export default function HomePage() {
  const [search, setSearch] = useState('');
  const [genreId, setGenreId] = useState('');
  const [sortBy, setSortBy] = useState('title');
  const [genres, setGenres] = useState([]);
  const [genreError, setGenreError] = useState('');

  const handleSearch = useCallback((value) => setSearch(value), []);

  useEffect(() => {
    let active = true;
    getGenres()
      .then((items) => { if (active) setGenres(items); })
      .catch((error) => { if (active) setGenreError(getErrorMessage(error)); });
    return () => { active = false; };
  }, []);

  return (
    <div className="app-shell">
      <header className="site-header">
        <a className="brand" href="/" aria-label="Stacks home">
          <span className="brand-icon"><BookOpen size={21} /></span>
          <span>stacks<span className="brand-period">.</span></span>
        </a>
        <div className="header-note"><LibraryBig size={16} /> Your community library</div>
      </header>

      <main>
        <section className="hero">
          <div className="hero-content">
            <span className="hero-kicker">DISCOVER YOUR NEXT READ</span>
            <h1>Stories worth<br /><em>staying for.</em></h1>
            <p>Explore the collection, find a new perspective, and let your next chapter begin here.</p>
            <div className="hero-search"><SearchBar onSearch={handleSearch} /></div>
          </div>
          <div className="hero-art" aria-hidden="true">
            <div className="art-circle circle-one" />
            <div className="art-circle circle-two" />
            <div className="art-book book-one"><span>THE<br />ART OF<br />READING</span></div>
            <div className="art-book book-two"><span>WIDE<br />OPEN<br />WORLDS</span></div>
            <div className="art-book book-three"><span>FIND<br />YOUR<br />STORY</span></div>
            <div className="art-spark">✳</div>
          </div>
        </section>

        <section className="catalog-section">
          <div className="section-heading">
            <div>
              <span className="section-kicker">THE COLLECTION</span>
              <h2>Explore the library</h2>
              <p>Find something good to get lost in.</p>
            </div>
            <div className="catalog-count"><BookOpen size={16} /> Browse all books</div>
          </div>

          <div className="catalog-toolbar">
            <div className="toolbar-left">
              <GenreFilter
                genres={genres}
                selectedGenre={genreId}
                onGenreChange={setGenreId}
              />
              {genreError && <span className="inline-warning" title={genreError}>Genre list unavailable</span>}
            </div>
            <label className="sort-control">
              <SlidersHorizontal size={16} />
              <span>Sort by</span>
              <select value={sortBy} onChange={(event) => setSortBy(event.target.value)}>
                <option value="title">Title</option>
                <option value="author">Author</option>
              </select>
            </label>
          </div>

          <BookGrid genreId={genreId} search={search} sortBy={sortBy} />
        </section>
      </main>

      <footer className="site-footer">
        <a className="brand footer-brand" href="/"><span className="brand-icon"><BookOpen size={18} /></span><span>stacks<span className="brand-period">.</span></span></a>
        <span>Good books. New perspectives. Always.</span>
      </footer>
    </div>
  );
}
