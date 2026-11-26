
import axios from 'axios';

const API_URL = (
  import.meta.env.VITE_API_URL || 'http://localhost:3000'
).replace(/\/+$/, '');

const api = axios.create({
  baseURL: API_URL,
  headers: {
    Accept: 'application/json',
  },
});

function unwrapList(payload) {
  if (Array.isArray(payload)) return payload;

  if (Array.isArray(payload?.data)) return payload.data;
  if (Array.isArray(payload?.books)) return payload.books;
  if (Array.isArray(payload?.items)) return payload.items;

  if (Array.isArray(payload?.data?.books)) {
    return payload.data.books;
  }

  return [];
}

export async function getBooks({
  genreId = '',
  search = '',
  signal,
} = {}) {
  const params = {};

  if (genreId) {
    params.genreId = genreId;
  }

  const searchTerm = search.trim();

  if (searchTerm) {
    params.search = searchTerm;
  }

  const response = await api.get('/books', {
    params,
    signal,
  });

  return unwrapList(response.data);
}

export async function getBookById(id) {
  const response = await api.get(
    `/books/${encodeURIComponent(id)}`
  );

  return (
    response.data?.data ??
    response.data?.book ??
    response.data
  );
}

export async function getGenres() {
  const response = await api.get('/genres');
  return unwrapList(response.data);
}

export function getErrorMessage(error) {
  if (error.response?.status === 404) {
    return 'The requested resource could not be found.';
  }

  if (error.response?.data?.message) {
    const message = error.response.data.message;

    return Array.isArray(message)
      ? message.join(' ')
      : message;
  }

  if (error.code === 'ERR_NETWORK') {
    return 'Could not reach the library API. Check that the NestJS server is running and VITE_API_URL is correct.';
  }

  return error.message || 'Something went wrong. Please try again.';
}
