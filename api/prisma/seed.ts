
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const genres = [
  { name: 'Fiction', description: 'Literary and fictional stories.' },
  { name: 'Technology', description: 'Computing and software development.' },
  { name: 'Science', description: 'Scientific discoveries and research.' },
  { name: 'History', description: 'Historical events and civilizations.' },
];

const books = [
  { title: 'Things Fall Apart', author: 'Chinua Achebe', isbn: '9780007206473', publishedYear: 1958, genreName: 'Fiction' },
  { title: 'The River Between', author: 'Ngugi wa Thiong’o', isbn: '9780143106764', publishedYear: 1965, genreName: 'Fiction' },
  { title: 'Americanah', author: 'Chimamanda Ngozi Adichie', isbn: '9780307455925', publishedYear: 2013, genreName: 'Fiction' },
  { title: 'The Old Man and the Sea', author: 'Ernest Hemingway', isbn: '9780684801223', publishedYear: 1952, genreName: 'Fiction' },

  { title: 'Clean Code', author: 'Robert C. Martin', isbn: '9780132350884', publishedYear: 2008, genreName: 'Technology' },
  { title: 'The Pragmatic Programmer', author: 'David Thomas and Andrew Hunt', isbn: '9780135957059', publishedYear: 2019, genreName: 'Technology' },
  { title: 'Introduction to Algorithms', author: 'Thomas H. Cormen et al.', isbn: '9780262046305', publishedYear: 2022, genreName: 'Technology' },
  { title: 'Design Patterns', author: 'Erich Gamma et al.', isbn: '9780201633610', publishedYear: 1994, genreName: 'Technology' },

  { title: 'A Brief History of Time', author: 'Stephen Hawking', isbn: '9780553380163', publishedYear: 1988, genreName: 'Science' },
  { title: 'Cosmos', author: 'Carl Sagan', isbn: '9780345539434', publishedYear: 1980, genreName: 'Science' },
  { title: 'The Selfish Gene', author: 'Richard Dawkins', isbn: '9780198788607', publishedYear: 1976, genreName: 'Science' },
  { title: 'The Origin of Species', author: 'Charles Darwin', isbn: '9781509827695', publishedYear: 1859, genreName: 'Science' },

  { title: 'A History of Kenya', author: 'William Robert Ochieng', isbn: '9780435948115', publishedYear: 1985, genreName: 'History' },
  { title: 'Sapiens', author: 'Yuval Noah Harari', isbn: '9780062316097', publishedYear: 2015, genreName: 'History' },
  { title: 'The Art of War', author: 'Sun Tzu', isbn: '9781590302255', publishedYear: -500, genreName: 'History' },
  { title: 'Long Walk to Freedom', author: 'Nelson Mandela', isbn: '9780316548182', publishedYear: 1994, genreName: 'History' },
];

async function main() {
  console.log('Starting library seeding...');

  const genreIds = new Map<string, number>();

  for (const genre of genres) {
    const savedGenre = await prisma.genre.upsert({
      where: { name: genre.name },
      update: { description: genre.description },
      create: genre,
    });

    genreIds.set(savedGenre.name, savedGenre.id);
  }

  console.log('Genres created successfully.');

  for (const book of books) {
    const { genreName, ...bookData } = book;
    const genreId = genreIds.get(genreName);

    if (genreId === undefined) {
      throw new Error(`Genre not found: ${genreName}`);
    }

    await prisma.book.upsert({
      where: { isbn: book.isbn },
      update: { ...bookData, genreId },
      create: { ...bookData, genreId },
    });
  }

  console.log(`Successfully seeded ${genres.length} genres and ${books.length} books.`);
}

main()
  .catch((error) => {
    console.error('Seeding failed:', error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
