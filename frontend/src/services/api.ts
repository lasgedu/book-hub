import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:4000/api"
});

export interface Book {
  id: number;
  title: string;
  author: string;
  genre: string;
  description: string;
  publication_year: number;
  rating: number;
  cover_url: string;
}

export const fetchBooks = async (params: {
  search?: string;
  genre?: string;
  sort?: string;
  page?: number;
  limit?: number;
}) => {
  const response = await api.get("/books", { params });
  return response.data;
};

export const fetchBook = async (id: string) => {
  const response = await api.get(`/books/${id}`);
  return response.data as Book;
};

export const login = async (email: string, password: string) => {
  const response = await api.post("/auth/login", { email, password });
  return response.data;
};

export const createBook = async (book: Partial<Book>, token: string) => {
  const response = await api.post("/books", book, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return response.data as Book;
};