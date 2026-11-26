export default function GenreFilter({ genres, selectedGenre, onGenreChange, loading = false }) {
  return (
    <div className="filter-control">
      <label htmlFor="genre-filter">Browse genre</label>
      <select
        id="genre-filter"
        value={selectedGenre}
        onChange={(event) => onGenreChange(event.target.value)}
        disabled={loading}
      >
        <option value="">All genres</option>
        {genres.map((genre) => (
          <option key={genre.id} value={genre.id}>{genre.name}</option>
        ))}
      </select>
    </div>
  );
}
