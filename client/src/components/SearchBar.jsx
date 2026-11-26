
import { useEffect, useState } from 'react';
import { Search, X } from 'lucide-react';

export default function SearchBar({ onSearch, initialValue = '' }) {
  const [value, setValue] = useState(initialValue);

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      onSearch(value.trim());
    }, 350);

    return () => window.clearTimeout(timeoutId);
  }, [value, onSearch]);

  function clearSearch() {
    setValue('');
  }

  return (
    <label className="search-box">
      <Search size={19} aria-hidden="true" />

      <input
        type="search"
        value={value}
        onChange={(event) => setValue(event.target.value)}
        placeholder="Search by title or author..."
        aria-label="Search books by title or author"
      />

      {value && (
        <button
          className="icon-button"
          type="button"
          onClick={clearSearch}
          aria-label="Clear search"
        >
          <X size={17} />
        </button>
      )}
    </label>
  );
}
