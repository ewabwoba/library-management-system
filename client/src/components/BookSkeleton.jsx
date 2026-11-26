export default function BookSkeleton() {
  return (
    <div className="book-grid" aria-label="Loading books" aria-busy="true">
      {Array.from({ length: 8 }, (_, index) => (
        <div className="book-card skeleton-card" key={index}>
          <div className="skeleton skeleton-cover" />
          <div className="book-card-content">
            <div className="skeleton skeleton-line short" />
            <div className="skeleton skeleton-line title-line" />
            <div className="skeleton skeleton-line" />
            <div className="skeleton skeleton-line small" />
          </div>
        </div>
      ))}
    </div>
  );
}
